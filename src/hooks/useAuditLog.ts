
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
    newValue?: string,
    userMatricula?: string
  ) => {
    // Get current user info to ensure we have the real name
    const currentUser = JSON.parse(localStorage.getItem('mprj_user') || '{}');
    const profiles = JSON.parse(localStorage.getItem('mprj_profiles') || '[]');
    const currentUserProfile = profiles.find((p: any) => 
      p.userId === currentUser.id || 
      p.matricula === currentUser.matricula ||
      p.email === currentUser.email
    );
    
    // Use the profile name or current user name, never "admin" or fallback values
    const actualUserName = currentUserProfile?.name || currentUser.name || user;
    const actualUserMatricula = currentUserProfile?.matricula || currentUser.matricula || userMatricula;

    const newLog: AuditLog = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      action,
      user: actualUserName,
      userMatricula: actualUserMatricula,
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
