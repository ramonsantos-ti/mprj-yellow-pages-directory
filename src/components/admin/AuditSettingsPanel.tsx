import React, { useState } from 'react';
import { AuditSettings } from '@/types/admin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Settings, Save, Clock } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface AuditSettingsPanelProps {
  settings: AuditSettings[];
  loading: boolean;
  onUpdateSetting: (key: string, value: any) => void;
}

export const AuditSettingsPanel: React.FC<AuditSettingsPanelProps> = ({ 
  settings, 
  loading, 
  onUpdateSetting 
}) => {
  const [localSettings, setLocalSettings] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);

  React.useEffect(() => {
    const settingsMap = settings.reduce((acc, setting) => {
      acc[setting.settingKey] = setting.settingValue;
      return acc;
    }, {} as Record<string, any>);
    setLocalSettings(settingsMap);
  }, [settings]);

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const [key, value] of Object.entries(localSettings)) {
        await onUpdateSetting(key, value);
      }
      toast.success('Configurações salvas com sucesso!');
    } catch (error) {
      toast.error('Erro ao salvar configurações');
    } finally {
      setSaving(false);
    }
  };

  const updateLocalSetting = (key: string, value: any) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <Clock className="h-4 w-4 animate-spin mr-2" />
            Carregando configurações...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Configurações de Auditoria
        </CardTitle>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? 'Salvando...' : 'Salvar'}
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="retention_days">Dias de Retenção de Logs</Label>
            <Input
              id="retention_days"
              type="number"
              value={localSettings.retention_days || 365}
              onChange={(e) => updateLocalSetting('retention_days', parseInt(e.target.value))}
              placeholder="365"
            />
            <p className="text-sm text-muted-foreground">
              Número de dias para manter os logs de auditoria antes do arquivamento automático
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="max_logs_per_day">Limite Máximo de Logs por Dia</Label>
            <Input
              id="max_logs_per_day"
              type="number"
              value={localSettings.max_logs_per_day || 10000}
              onChange={(e) => updateLocalSetting('max_logs_per_day', parseInt(e.target.value))}
              placeholder="10000"
            />
            <p className="text-sm text-muted-foreground">
              Limite máximo de logs que podem ser criados por dia
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="auto_archive"
              checked={localSettings.auto_archive === 'true' || localSettings.auto_archive === true}
              onCheckedChange={(checked) => updateLocalSetting('auto_archive', checked)}
            />
            <Label htmlFor="auto_archive">Arquivamento Automático</Label>
          </div>
          <p className="text-sm text-muted-foreground ml-6">
            Arquivar automaticamente logs antigos conforme a política de retenção
          </p>

          <div className="flex items-center space-x-2">
            <Switch
              id="notify_critical"
              checked={localSettings.notify_critical === 'true' || localSettings.notify_critical === true}
              onCheckedChange={(checked) => updateLocalSetting('notify_critical', checked)}
            />
            <Label htmlFor="notify_critical">Notificar Eventos Críticos</Label>
          </div>
          <p className="text-sm text-muted-foreground ml-6">
            Enviar notificações automáticas para administradores sobre eventos críticos
          </p>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-medium mb-2">Informações do Sistema</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Total de Configurações:</span>
              <span className="ml-2 font-medium">{settings.length}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Última Atualização:</span>
              <span className="ml-2 font-medium">
                {settings.length > 0 
                  ? new Date(Math.max(...settings.map(s => s.updatedAt.getTime()))).toLocaleString('pt-BR')
                  : 'N/A'
                }
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};