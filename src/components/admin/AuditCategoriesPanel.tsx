import React from 'react';
import { AuditCategory } from '@/types/admin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Settings, AlertTriangle, CheckCircle, Clock, Eye } from 'lucide-react';

interface AuditCategoriesPanelProps {
  categories: AuditCategory[];
  loading: boolean;
}

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case 'CRITICAL': return <AlertTriangle className="h-4 w-4 text-red-500" />;
    case 'HIGH': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
    case 'MEDIUM': return <Clock className="h-4 w-4 text-yellow-500" />;
    case 'LOW': return <CheckCircle className="h-4 w-4 text-green-500" />;
    default: return <Eye className="h-4 w-4" />;
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

export const AuditCategoriesPanel: React.FC<AuditCategoriesPanelProps> = ({ categories, loading }) => {
  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <Clock className="h-4 w-4 animate-spin mr-2" />
            Carregando categorias...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Categorias de Auditoria
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {categories.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            Nenhuma categoria encontrada
          </div>
        ) : (
          categories.map(category => (
            <div key={category.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getSeverityIcon(category.severityLevel)}
                  <div>
                    <h4 className="font-medium">{category.name}</h4>
                    {category.description && (
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getSeverityBadge(category.severityLevel)}
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Notificar Admins</span>
                    <Switch checked={category.notifyAdmins} disabled />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};