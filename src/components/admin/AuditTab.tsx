
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { History } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AuditLog } from '../../types/admin';

interface AuditTabProps {
  auditLogs: AuditLog[];
}

const AuditTab: React.FC<AuditTabProps> = ({ auditLogs }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <History className="w-5 h-5" />
          <span>Logs de Auditoria</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <Input placeholder="Buscar por usuário ou ação..." className="flex-1" />
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Tipo de ação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="status_change">Mudança de Status</SelectItem>
                <SelectItem value="role_change">Mudança de Papel</SelectItem>
                <SelectItem value="delete">Exclusão</SelectItem>
                <SelectItem value="notification_sent">Notificação Enviada</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="border rounded-lg">
            {auditLogs.length > 0 ? (
              <div className="divide-y">
                {auditLogs.map(log => (
                  <div key={log.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{log.action}</p>
                        <p className="text-sm text-gray-600">{log.details}</p>
                        <p className="text-xs text-gray-400">Por: {log.user}</p>
                      </div>
                      <span className="text-xs text-gray-400">
                        {format(log.timestamp, "dd/MM/yyyy HH:mm", { locale: ptBR })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500">
                Nenhum log de auditoria encontrado
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuditTab;
