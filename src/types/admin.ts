
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
}

export interface StandardMessage {
  id: string;
  title: string;
  content: string;
}
