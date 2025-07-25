-- Fix security warnings: Add search_path to functions
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;