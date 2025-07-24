-- Phase 1: Expand audit_logs table with new fields
ALTER TABLE public.audit_logs 
ADD COLUMN IF NOT EXISTS severity_level TEXT DEFAULT 'MEDIUM' CHECK (severity_level IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
ADD COLUMN IF NOT EXISTS ip_address INET,
ADD COLUMN IF NOT EXISTS user_agent TEXT,
ADD COLUMN IF NOT EXISTS session_id TEXT,
ADD COLUMN IF NOT EXISTS changes_summary JSONB,
ADD COLUMN IF NOT EXISTS affected_fields TEXT[],
ADD COLUMN IF NOT EXISTS operation_type TEXT DEFAULT 'UPDATE' CHECK (operation_type IN ('CREATE', 'READ', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT')),
ADD COLUMN IF NOT EXISTS module TEXT DEFAULT 'PROFILE' CHECK (module IN ('PROFILE', 'ADMIN', 'AUTH', 'REPORT', 'NOTIFICATION')),
ADD COLUMN IF NOT EXISTS success BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS error_message TEXT;

-- Create audit_categories table
CREATE TABLE IF NOT EXISTS public.audit_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    severity_level TEXT NOT NULL CHECK (severity_level IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
    description TEXT,
    notify_admins BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create audit_settings table
CREATE TABLE IF NOT EXISTS public.audit_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    setting_key TEXT NOT NULL UNIQUE,
    setting_value JSONB NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create audit_alerts table
CREATE TABLE IF NOT EXISTS public.audit_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    audit_log_id UUID REFERENCES public.audit_logs(id) ON DELETE CASCADE,
    alert_type TEXT NOT NULL CHECK (alert_type IN ('SECURITY', 'SUSPICIOUS', 'ERROR', 'POLICY_VIOLATION')),
    message TEXT NOT NULL,
    severity TEXT NOT NULL CHECK (severity IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    acknowledged_by UUID,
    acknowledged_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS on new tables
ALTER TABLE public.audit_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_alerts ENABLE ROW LEVEL SECURITY;

-- Create policies for audit_categories
CREATE POLICY "Only admins can manage audit categories" ON public.audit_categories
FOR ALL USING (is_admin(auth.uid()));

-- Create policies for audit_settings
CREATE POLICY "Only admins can manage audit settings" ON public.audit_settings
FOR ALL USING (is_admin(auth.uid()));

-- Create policies for audit_alerts
CREATE POLICY "Only admins can view audit alerts" ON public.audit_alerts
FOR SELECT USING (is_admin(auth.uid()));

CREATE POLICY "Only admins can update audit alerts" ON public.audit_alerts
FOR UPDATE USING (is_admin(auth.uid()));

-- Insert default audit categories
INSERT INTO public.audit_categories (name, severity_level, description, notify_admins) VALUES
('SECURITY', 'CRITICAL', 'Login/logout e alterações de segurança', true),
('ADMINISTRATION', 'HIGH', 'Operações administrativas', true),
('PROFILE_CHANGES', 'MEDIUM', 'Alterações em perfis', false),
('GENERAL_OPERATIONS', 'LOW', 'Operações gerais do sistema', false);

-- Insert default audit settings
INSERT INTO public.audit_settings (setting_key, setting_value, description) VALUES
('retention_days', '365', 'Dias para manter logs de auditoria'),
('auto_archive', 'true', 'Arquivar logs automaticamente'),
('notify_critical', 'true', 'Notificar administradores para eventos críticos'),
('max_logs_per_day', '10000', 'Limite máximo de logs por dia');

-- Create function to automatically create audit logs
CREATE OR REPLACE FUNCTION public.create_audit_log(
    p_action TEXT,
    p_entity_type TEXT,
    p_entity_id UUID DEFAULT NULL,
    p_user_name TEXT DEFAULT NULL,
    p_user_matricula TEXT DEFAULT NULL,
    p_details TEXT DEFAULT NULL,
    p_previous_value TEXT DEFAULT NULL,
    p_new_value TEXT DEFAULT NULL,
    p_severity_level TEXT DEFAULT 'MEDIUM',
    p_operation_type TEXT DEFAULT 'UPDATE',
    p_module TEXT DEFAULT 'PROFILE',
    p_changes_summary JSONB DEFAULT NULL,
    p_affected_fields TEXT[] DEFAULT NULL,
    p_success BOOLEAN DEFAULT true,
    p_error_message TEXT DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
    log_id UUID;
BEGIN
    INSERT INTO public.audit_logs (
        action, entity_type, entity_id, user_name, user_matricula, details,
        previous_value, new_value, severity_level, operation_type, module,
        changes_summary, affected_fields, success, error_message
    ) VALUES (
        p_action, p_entity_type, p_entity_id, p_user_name, p_user_matricula, p_details,
        p_previous_value, p_new_value, p_severity_level, p_operation_type, p_module,
        p_changes_summary, p_affected_fields, p_success, p_error_message
    ) RETURNING id INTO log_id;
    
    -- Create alert for critical events
    IF p_severity_level = 'CRITICAL' THEN
        INSERT INTO public.audit_alerts (audit_log_id, alert_type, message, severity)
        VALUES (log_id, 'SECURITY', p_details, p_severity_level);
    END IF;
    
    RETURN log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers for automatic auditing on profiles table
CREATE OR REPLACE FUNCTION public.audit_profiles_trigger() RETURNS TRIGGER AS $$
DECLARE
    current_user_profile RECORD;
    changes_json JSONB := '{}'::jsonb;
    affected_fields_array TEXT[] := ARRAY[]::TEXT[];
    operation_type TEXT;
    severity_level TEXT := 'MEDIUM';
BEGIN
    -- Get current user profile for context
    SELECT name, matricula INTO current_user_profile
    FROM public.profiles WHERE user_id = auth.uid();
    
    -- Determine operation type
    IF TG_OP = 'INSERT' THEN
        operation_type := 'CREATE';
        changes_json := to_jsonb(NEW);
        affected_fields_array := ARRAY['all_fields'];
    ELSIF TG_OP = 'UPDATE' THEN
        operation_type := 'UPDATE';
        -- Build changes summary
        IF OLD.name != NEW.name THEN
            changes_json := changes_json || jsonb_build_object('name', jsonb_build_object('old', OLD.name, 'new', NEW.name));
            affected_fields_array := affected_fields_array || 'name';
        END IF;
        IF OLD.email != NEW.email THEN
            changes_json := changes_json || jsonb_build_object('email', jsonb_build_object('old', OLD.email, 'new', NEW.email));
            affected_fields_array := affected_fields_array || 'email';
            severity_level := 'HIGH'; -- Email changes are important
        END IF;
        IF OLD.role != NEW.role THEN
            changes_json := changes_json || jsonb_build_object('role', jsonb_build_object('old', OLD.role, 'new', NEW.role));
            affected_fields_array := affected_fields_array || 'role';
            severity_level := 'CRITICAL'; -- Role changes are critical
        END IF;
        IF OLD.is_active != NEW.is_active THEN
            changes_json := changes_json || jsonb_build_object('is_active', jsonb_build_object('old', OLD.is_active, 'new', NEW.is_active));
            affected_fields_array := affected_fields_array || 'is_active';
            severity_level := 'HIGH';
        END IF;
        -- Add more fields as needed
        IF OLD.cargo != NEW.cargo THEN
            affected_fields_array := affected_fields_array || 'cargo';
        END IF;
        IF OLD.unidade != NEW.unidade THEN
            affected_fields_array := affected_fields_array || 'unidade';
        END IF;
    ELSIF TG_OP = 'DELETE' THEN
        operation_type := 'DELETE';
        changes_json := to_jsonb(OLD);
        affected_fields_array := ARRAY['all_fields'];
        severity_level := 'HIGH';
    END IF;
    
    -- Create audit log
    PERFORM public.create_audit_log(
        p_action := TG_OP || ' Profile',
        p_entity_type := 'Profile',
        p_entity_id := COALESCE(NEW.id, OLD.id),
        p_user_name := COALESCE(current_user_profile.name, 'Sistema'),
        p_user_matricula := current_user_profile.matricula,
        p_details := 'Perfil ' || TG_OP || ' por ' || COALESCE(current_user_profile.name, 'Sistema'),
        p_previous_value := CASE WHEN TG_OP != 'INSERT' THEN OLD::TEXT END,
        p_new_value := CASE WHEN TG_OP != 'DELETE' THEN NEW::TEXT END,
        p_severity_level := severity_level,
        p_operation_type := operation_type,
        p_module := 'PROFILE',
        p_changes_summary := changes_json,
        p_affected_fields := affected_fields_array,
        p_success := true
    );
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers
DROP TRIGGER IF EXISTS audit_profiles_trigger ON public.profiles;
CREATE TRIGGER audit_profiles_trigger
    AFTER INSERT OR UPDATE OR DELETE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.audit_profiles_trigger();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_audit_logs_severity_level ON public.audit_logs(severity_level);
CREATE INDEX IF NOT EXISTS idx_audit_logs_operation_type ON public.audit_logs(operation_type);
CREATE INDEX IF NOT EXISTS idx_audit_logs_module ON public.audit_logs(module);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity_type ON public.audit_logs(entity_type);
CREATE INDEX IF NOT EXISTS idx_audit_alerts_is_read ON public.audit_alerts(is_read);

-- Update trigger for audit_settings
CREATE TRIGGER update_audit_settings_updated_at
    BEFORE UPDATE ON public.audit_settings
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();