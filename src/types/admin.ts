
export interface AuditLog {
  id: string;
  action: string;
  user: string;
  userMatricula?: string;
  details: string;
  previousValue?: string;
  newValue?: string;
  timestamp: Date;
  entityType: string;
  entityId?: string;
  // New enhanced fields
  severityLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  ipAddress?: string;
  userAgent?: string;
  sessionId?: string;
  changesSummary?: Record<string, any>;
  affectedFields?: string[];
  operationType: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT';
  module: 'PROFILE' | 'ADMIN' | 'AUTH' | 'REPORT' | 'NOTIFICATION';
  success: boolean;
  errorMessage?: string;
}

export interface AuditCategory {
  id: string;
  name: string;
  severityLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description?: string;
  notifyAdmins: boolean;
  createdAt: Date;
}

export interface AuditSettings {
  id: string;
  settingKey: string;
  settingValue: any;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuditAlert {
  id: string;
  auditLogId: string;
  alertType: 'SECURITY' | 'SUSPICIOUS' | 'ERROR' | 'POLICY_VIOLATION';
  message: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  isRead: boolean;
  createdAt: Date;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
}

export interface StandardMessage {
  id: string;
  title: string;
  content: string;
}
