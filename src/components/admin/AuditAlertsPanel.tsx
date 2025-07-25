import React from 'react';
import { AuditAlert } from '@/types/admin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Bell, CheckCircle, Clock } from 'lucide-react';

interface AuditAlertsPanelProps {
  alerts: AuditAlert[];
  onMarkAsRead: (alertId: string) => void;
  loading: boolean;
}

const getAlertIcon = (type: string) => {
  switch (type) {
    case 'SECURITY': return <AlertTriangle className="h-4 w-4 text-red-500" />;
    case 'SUSPICIOUS': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
    case 'ERROR': return <AlertTriangle className="h-4 w-4 text-red-500" />;
    case 'POLICY_VIOLATION': return <AlertTriangle className="h-4 w-4 text-purple-500" />;
    default: return <Bell className="h-4 w-4" />;
  }
};

const getSeverityBadge = (severity: string) => {
  switch (severity) {
    case 'CRITICAL': return <Badge variant="destructive">Crítico</Badge>;
    case 'HIGH': return <Badge className="bg-orange-100 text-orange-800">Alto</Badge>;
    case 'MEDIUM': return <Badge className="bg-yellow-100 text-yellow-800">Médio</Badge>;
    case 'LOW': return <Badge className="bg-green-100 text-green-800">Baixo</Badge>;
    default: return <Badge variant="secondary">{severity}</Badge>;
  }
};

export const AuditAlertsPanel: React.FC<AuditAlertsPanelProps> = ({ alerts, onMarkAsRead, loading }) => {
  const unreadAlerts = alerts.filter(alert => !alert.isRead);
  const readAlerts = alerts.filter(alert => alert.isRead);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <Clock className="h-4 w-4 animate-spin mr-2" />
            Carregando alertas...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Unread Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Alertas Não Lidos
            {unreadAlerts.length > 0 && (
              <Badge variant="destructive">{unreadAlerts.length}</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {unreadAlerts.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              <CheckCircle className="h-8 w-8 mx-auto mb-2" />
              Nenhum alerta não lido
            </div>
          ) : (
            unreadAlerts.map(alert => (
              <div key={alert.id} className="border rounded-lg p-4 bg-card">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    {getAlertIcon(alert.alertType)}
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        {getSeverityBadge(alert.severity)}
                        <Badge variant="outline">{alert.alertType}</Badge>
                      </div>
                      <p className="text-sm font-medium">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {alert.createdAt.toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onMarkAsRead(alert.id)}
                  >
                    Marcar como lido
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Read Alerts */}
      {readAlerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Alertas Lidos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {readAlerts.map(alert => (
              <div key={alert.id} className="border rounded-lg p-3 bg-muted/50 opacity-75">
                <div className="flex items-start gap-3">
                  {getAlertIcon(alert.alertType)}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      {getSeverityBadge(alert.severity)}
                      <Badge variant="outline">{alert.alertType}</Badge>
                    </div>
                    <p className="text-sm">{alert.message}</p>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>Criado: {alert.createdAt.toLocaleString('pt-BR')}</p>
                      {alert.acknowledgedAt && (
                        <p>Lido: {alert.acknowledgedAt.toLocaleString('pt-BR')}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};