import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertCircle } from 'lucide-react';
import { ProfileDisability, PcdVisibilityLevel } from '@/types';
import { usePcdPermissions } from '@/hooks/usePcdPermissions';

interface ProfileDisabilityCardProps {
  disabilities: ProfileDisability[];
  visibilityLevel: PcdVisibilityLevel;
  showVisibilityInfo?: boolean;
}

const CATEGORY_LABELS = {
  fisica: '🦽 Deficiência Física',
  visual: '👁️ Deficiência Visual',
  auditiva: '👂 Deficiência Auditiva',
  intelectual: '🧠 Deficiência Intelectual',
  multipla: '🔗 Deficiência Múltipla'
};

const CATEGORY_COLORS = {
  fisica: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  visual: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  auditiva: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  intelectual: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  multipla: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
};

export const ProfileDisabilityCard: React.FC<ProfileDisabilityCardProps> = ({ 
  disabilities, 
  visibilityLevel,
  showVisibilityInfo = false 
}) => {
  const { getVisibilityLabel, canViewPcdInfo } = usePcdPermissions();

  // Verificar se o usuário atual pode ver as informações
  if (!canViewPcdInfo(visibilityLevel)) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Informações sobre Deficiência
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-muted-foreground">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">
              Informações restritas - {getVisibilityLabel(visibilityLevel).toLowerCase()}
            </span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!disabilities || disabilities.length === 0) {
    return null;
  }

  // Agrupar deficiências por categoria
  const disabilitiesByCategory = disabilities.reduce((acc, disability) => {
    if (!disability.disability_type) return acc;
    
    const category = disability.disability_type.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(disability);
    return acc;
  }, {} as Record<string, ProfileDisability[]>);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Informações sobre Deficiência
          </CardTitle>
          {showVisibilityInfo && (
            <Badge variant="outline" className="text-xs">
              {getVisibilityLabel(visibilityLevel)}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(disabilitiesByCategory).map(([category, categoryDisabilities]) => (
          <div key={category} className="space-y-3">
            <h4 className="font-medium text-sm flex items-center gap-2">
              {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS] || category}
            </h4>
            <div className="space-y-3 ml-4">
              {categoryDisabilities.map((disability) => (
                <div key={disability.id} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="secondary" 
                      className={CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS]}
                    >
                      {disability.disability_type?.name}
                    </Badge>
                  </div>
                  
                  {disability.disability_type?.description && (
                    <p className="text-xs text-muted-foreground ml-0">
                      {disability.disability_type.description}
                    </p>
                  )}
                  
                  {disability.additional_info && (
                    <div className="bg-muted/50 rounded-md p-3 ml-0">
                      <p className="text-sm">
                        <span className="font-medium">Informações adicionais:</span>
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {disability.additional_info}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};