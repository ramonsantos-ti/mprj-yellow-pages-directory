-- Fix malformed array literal errors in audit_profiles_trigger by using array_append for affected_fields_array
CREATE OR REPLACE FUNCTION public.audit_profiles_trigger()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
        IF OLD.name IS DISTINCT FROM NEW.name THEN
            changes_json := changes_json || jsonb_build_object('name', jsonb_build_object('old', OLD.name, 'new', NEW.name));
            affected_fields_array := array_append(affected_fields_array, 'name');
        END IF;
        IF OLD.email IS DISTINCT FROM NEW.email THEN
            changes_json := changes_json || jsonb_build_object('email', jsonb_build_object('old', OLD.email, 'new', NEW.email));
            affected_fields_array := array_append(affected_fields_array, 'email');
            severity_level := 'HIGH'; -- Email changes are important
        END IF;
        IF OLD.role IS DISTINCT FROM NEW.role THEN
            changes_json := changes_json || jsonb_build_object('role', jsonb_build_object('old', OLD.role, 'new', NEW.role));
            affected_fields_array := array_append(affected_fields_array, 'role');
            severity_level := 'CRITICAL'; -- Role changes are critical
        END IF;
        IF OLD.is_active IS DISTINCT FROM NEW.is_active THEN
            changes_json := changes_json || jsonb_build_object('is_active', jsonb_build_object('old', OLD.is_active, 'new', NEW.is_active));
            affected_fields_array := array_append(affected_fields_array, 'is_active');
            severity_level := 'HIGH';
        END IF;
        -- Additional fields
        IF OLD.cargo IS DISTINCT FROM NEW.cargo THEN
            affected_fields_array := array_append(affected_fields_array, 'cargo');
        END IF;
        IF OLD.unidade IS DISTINCT FROM NEW.unidade THEN
            affected_fields_array := array_append(affected_fields_array, 'unidade');
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
$function$;