
export interface AuditLog {
  id: string;
  action: string;
  user: string;
  details: string;
  timestamp: Date;
}

export interface StandardMessage {
  id: string;
  title: string;
  content: string;
}
