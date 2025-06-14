
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuditLog } from '../types/admin';

export const useAuditLogs = () => {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAuditLogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('audit_logs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const transformedLogs: AuditLog[] = data.map(log => ({
        id: log.id,
        action: log.action,
        user: log.user_name,
        userMatricula: log.user_matricula,
        details: log.details,
        previousValue: log.previous_value,
        newValue: log.new_value,
        timestamp: new Date(log.created_at || new Date()),
        entityType: log.entity_type,
        entityId: log.entity_id
      }));

      setAuditLogs(transformedLogs);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching audit logs:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addAuditLog = async (
    action: string,
    user: string,
    details: string,
    entityType: string,
    entityId?: string,
    previousValue?: string,
    newValue?: string,
    userMatricula?: string
  ) => {
    try {
      const { error } = await supabase
        .from('audit_logs')
        .insert({
          action,
          user_name: user,
          user_matricula: userMatricula,
          details,
          previous_value: previousValue,
          new_value: newValue,
          entity_type: entityType,
          entity_id: entityId
        });

      if (error) throw error;
      await fetchAuditLogs(); // Refresh logs
    } catch (err: any) {
      console.error('Error adding audit log:', err);
    }
  };

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  return { auditLogs, loading, error, addAuditLog, refetch: fetchAuditLogs };
};
