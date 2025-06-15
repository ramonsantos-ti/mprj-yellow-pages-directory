
import { useAuditLogs } from './useAuditLogs';

// Re-export the new hook for backward compatibility
export const useAuditLog = () => {
  return useAuditLogs();
};
