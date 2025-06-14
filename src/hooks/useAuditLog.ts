
import { useState, useEffect } from 'react';
import { AuditLog } from '../types/admin';

export const useAuditLog = () => {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  // Load audit logs from localStorage on initialization
  useEffect(() => {
    const savedLogs = localStorage.getItem('mprj_audit_logs');
    if (savedLogs) {
      const parsedLogs = JSON.parse(savedLogs);
      // Convert timestamp strings back to Date objects and sort by most recent first
      const logsWithDates = parsedLogs.map((log: any) => ({
        ...log,
        timestamp: new Date(log.timestamp)
      })).sort((a: AuditLog, b: AuditLog) => b.timestamp.getTime() - a.timestamp.getTime());
      
      setAuditLogs(logsWithDates);
    }
  }, []);

  const addAuditLog = (
    action: string,
    user: string,
    details: string,
    entityType: string,
    entityId?: string,
    previousValue?: string,
    newValue?: string
  ) => {
    const newLog: AuditLog = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      action,
      user,
      details,
      previousValue,
      newValue,
      timestamp: new Date(),
      entityType,
      entityId
    };

    setAuditLogs(prev => {
      const updatedLogs = [newLog, ...prev];
      // Save to localStorage
      localStorage.setItem('mprj_audit_logs', JSON.stringify(updatedLogs));
      return updatedLogs;
    });
  };

  return { auditLogs, addAuditLog };
};
