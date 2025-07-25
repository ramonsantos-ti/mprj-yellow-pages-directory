import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuditAlert, AuditCategory, AuditSettings } from '@/types/admin';
import { useAuth } from '@/contexts/AuthContext';

export const useEnhancedAudit = () => {
  const [alerts, setAlerts] = useState<AuditAlert[]>([]);
  const [categories, setCategories] = useState<AuditCategory[]>([]);
  const [settings, setSettings] = useState<AuditSettings[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Get browser/session context
  const getAuditContext = useCallback(() => {
    return {
      ipAddress: null, // Would need backend to capture this
      userAgent: navigator.userAgent,
      sessionId: sessionStorage.getItem('sessionId') || crypto.randomUUID(),
    };
  }, []);

  // Enhanced audit log creation
  const createEnhancedAuditLog = useCallback(async (
    action: string,
    entityType: string,
    entityId?: string,
    details?: string,
    previousValue?: string,
    newValue?: string,
    severityLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'MEDIUM',
    operationType: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT' = 'UPDATE',
    module: 'PROFILE' | 'ADMIN' | 'AUTH' | 'REPORT' | 'NOTIFICATION' = 'PROFILE',
    changesSummary?: Record<string, any>,
    affectedFields?: string[],
    success: boolean = true,
    errorMessage?: string
  ) => {
    try {
      const context = getAuditContext();
      
      const auditData = {
        action,
        entity_type: entityType,
        entity_id: entityId,
        user_name: user?.email || 'Unknown',
        user_matricula: null,
        details: details || `${action} executado por ${user?.email || 'usuário'}`,
        previous_value: previousValue,
        new_value: newValue,
        severity_level: severityLevel,
        user_agent: context.userAgent,
        session_id: context.sessionId,
        operation_type: operationType,
        module: module,
        changes_summary: changesSummary,
        affected_fields: affectedFields,
        success,
        error_message: errorMessage
      };

      const { error } = await supabase.from('audit_logs').insert(auditData);
      
      if (error) {
        console.error('Error creating enhanced audit log:', error);
        throw error;
      }

      return true;
    } catch (err: any) {
      console.error('Error in createEnhancedAuditLog:', err);
      return false;
    }
  }, [user, getAuditContext]);

  // Fetch alerts
  const fetchAlerts = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('audit_alerts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const transformedAlerts: AuditAlert[] = data.map(alert => ({
        id: alert.id,
        auditLogId: alert.audit_log_id,
        alertType: alert.alert_type as 'SECURITY' | 'SUSPICIOUS' | 'ERROR' | 'POLICY_VIOLATION',
        message: alert.message,
        severity: alert.severity as 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL',
        isRead: alert.is_read,
        createdAt: new Date(alert.created_at),
        acknowledgedBy: alert.acknowledged_by,
        acknowledgedAt: alert.acknowledged_at ? new Date(alert.acknowledged_at) : undefined
      }));

      setAlerts(transformedAlerts);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Mark alert as read
  const markAlertAsRead = useCallback(async (alertId: string) => {
    try {
      const { error } = await supabase
        .from('audit_alerts')
        .update({ 
          is_read: true,
          acknowledged_by: user?.id,
          acknowledged_at: new Date().toISOString()
        })
        .eq('id', alertId);

      if (error) throw error;
      await fetchAlerts(); // Refresh alerts
    } catch (err: any) {
      console.error('Error marking alert as read:', err);
    }
  }, [user?.id, fetchAlerts]);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('audit_categories')
        .select('*')
        .order('name');

      if (error) throw error;

      const transformedCategories: AuditCategory[] = data.map(cat => ({
        id: cat.id,
        name: cat.name,
        severityLevel: cat.severity_level as 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL',
        description: cat.description,
        notifyAdmins: cat.notify_admins,
        createdAt: new Date(cat.created_at)
      }));

      setCategories(transformedCategories);
    } catch (err: any) {
      setError(err.message);
    }
  }, []);

  // Fetch settings
  const fetchSettings = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('audit_settings')
        .select('*')
        .order('setting_key');

      if (error) throw error;

      const transformedSettings: AuditSettings[] = data.map(setting => ({
        id: setting.id,
        settingKey: setting.setting_key,
        settingValue: setting.setting_value,
        description: setting.description,
        createdAt: new Date(setting.created_at),
        updatedAt: new Date(setting.updated_at)
      }));

      setSettings(transformedSettings);
    } catch (err: any) {
      setError(err.message);
    }
  }, []);

  // Update setting
  const updateSetting = useCallback(async (key: string, value: any) => {
    try {
      const { error } = await supabase
        .from('audit_settings')
        .update({ setting_value: value, updated_at: new Date().toISOString() })
        .eq('setting_key', key);

      if (error) throw error;
      await fetchSettings(); // Refresh settings
    } catch (err: any) {
      console.error('Error updating setting:', err);
    }
  }, [fetchSettings]);

  return {
    alerts,
    categories,
    settings,
    loading,
    error,
    createEnhancedAuditLog,
    fetchAlerts,
    markAlertAsRead,
    fetchCategories,
    fetchSettings,
    updateSetting
  };
};