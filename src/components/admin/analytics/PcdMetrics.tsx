import React from 'react';
import { Profile } from '../../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { 
  Users, 
  Accessibility, 
  GraduationCap, 
  HandHeart, 
  Building2,
  Target,
  Eye,
  Ear,
  Brain,
  Heart
} from 'lucide-react';
import MetricLabel from '../../common/MetricLabel';
import { usePcdPermissions } from '../../../hooks/usePcdPermissions';

interface PcdMetricsProps {
  profiles: Profile[];
}

const PcdMetrics: React.FC<PcdMetricsProps> = ({ profiles }) => {
  const { canViewPcdInfo } = usePcdPermissions();
  const activeProfiles = profiles.filter(p => p.isActive !== false);
  
  // Filtrar apenas perfis PcD que o usuário pode visualizar
  const pcdProfiles = activeProfiles.filter(p => {
    if (!p.isPcd || !p.disabilities || p.disabilities.length === 0) return false;
    
    // Verificar se pode visualizar baseado no nível de visibilidade
    const visibilityLevel = p.pcdVisibilityLevel || 'logged_users';
    return canViewPcdInfo(visibilityLevel);
  });

  const totalPcd = pcdProfiles.length;
  const pcdPercentage = activeProfiles.length > 0 ? Math.round((totalPcd / activeProfiles.length) * 100) : 0;

  // Distribuição por tipo de deficiência
  const disabilityTypeStats = pcdProfiles.reduce((acc, profile) => {
    profile.disabilities?.forEach(disability => {
      if (disability.disability_type) {
        const category = disability.disability_type.category;
        acc[category] = (acc[category] || 0) + 1;
      }
    });
    return acc;
  }, {} as Record<string, number>);

  // Mapeamento de categorias para ícones e cores
  const categoryMapping = {
    'fisica': { icon: Accessibility, label: 'Física', color: 'bg-blue-500' },
    'visual': { icon: Eye, label: 'Visual', color: 'bg-green-500' },
    'auditiva': { icon: Ear, label: 'Auditiva', color: 'bg-yellow-500' },
    'intelectual': { icon: Brain, label: 'Intelectual', color: 'bg-purple-500' },
    'multipla': { icon: Heart, label: 'Múltipla', color: 'bg-red-500' }
  };

  // Distribuição por unidade
  const unitStats = pcdProfiles.reduce((acc, profile) => {
    profile.unidade?.forEach(unit => {
      acc[unit] = (acc[unit] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const topUnits = Object.entries(unitStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 6);

  // Formação acadêmica dos PcD
  const educationStats = pcdProfiles.reduce((acc, profile) => {
    profile.formacaoAcademica?.forEach(formation => {
      const level = formation.nivel.toLowerCase();
      if (level.includes('doutorado') || level.includes('phd')) {
        acc.doutorado = (acc.doutorado || 0) + 1;
      } else if (level.includes('mestrado') || level.includes('master')) {
        acc.mestrado = (acc.mestrado || 0) + 1;
      } else if (level.includes('especialização') || level.includes('pós')) {
        acc.especializacao = (acc.especializacao || 0) + 1;
      } else if (level.includes('graduação') || level.includes('bacharelado') || level.includes('licenciatura')) {
        acc.graduacao = (acc.graduacao || 0) + 1;
      }
    });
    return acc;
  }, {} as Record<string, number>);

  // Competências dos profissionais PcD
  const competenciesStats = pcdProfiles.reduce((acc, profile) => {
    profile.temasInteresse?.forEach(area => {
      acc[area] = (acc[area] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const topCompetencies = Object.entries(competenciesStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 8);

  // Disponibilidade para colaboração
  const availableForCollaboration = pcdProfiles.filter(p => 
    p.disponibilidade?.tipoColaboracao && p.disponibilidade.tipoColaboracao.length > 0
  ).length;

  const collaborationRate = totalPcd > 0 ? Math.round((availableForCollaboration / totalPcd) * 100) : 0;

  // Índice de inclusão por unidade
  const inclusionIndex = Object.entries(unitStats).map(([unit, pcdCount]) => {
    const totalInUnit = activeProfiles.filter(p => p.unidade?.includes(unit)).length;
    const inclusionRate = totalInUnit > 0 ? Math.round((pcdCount / totalInUnit) * 100) : 0;
    return { unit, pcdCount, totalInUnit, inclusionRate };
  }).sort((a, b) => b.inclusionRate - a.inclusionRate);

  if (!canViewPcdInfo('public')) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-muted-foreground">
              <Accessibility className="w-8 h-8 mx-auto mb-2" />
              <p>Acesso restrito. Faça login para visualizar os indicadores de acessibilidade.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <MetricLabel label="Total PcD" description="Número total de pessoas com deficiência cadastradas." />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">{totalPcd}</div>
            <div className="text-xs text-muted-foreground">
              {pcdPercentage}% do total de perfis
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <Accessibility className="w-4 h-4" />
              <MetricLabel label="Tipos de Deficiência" description="Quantidade de categorias diferentes de deficiência." />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">{Object.keys(disabilityTypeStats).length}</div>
            <div className="text-xs text-muted-foreground">Categorias identificadas</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <HandHeart className="w-4 h-4" />
              <MetricLabel label="Disponibilidade" description="Percentual de PcD disponíveis para colaboração." />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{collaborationRate}%</div>
            <div className="text-xs text-muted-foreground">
              {availableForCollaboration} de {totalPcd} disponíveis
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <GraduationCap className="w-4 h-4" />
              <MetricLabel label="Alta Qualificação" description="PcD com mestrado ou doutorado." />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {(educationStats.mestrado || 0) + (educationStats.doutorado || 0)}
            </div>
            <div className="text-xs text-muted-foreground">Mestres e doutores</div>
          </CardContent>
        </Card>
      </div>

      {/* Distribuição por Tipo de Deficiência */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Accessibility className="w-5 h-5" />
            <MetricLabel label="Distribuição por Tipo de Deficiência" description="Quantidade de pessoas por categoria de deficiência." />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {Object.entries(categoryMapping).map(([category, config]) => {
              const count = disabilityTypeStats[category] || 0;
              const percentage = totalPcd > 0 ? Math.round((count / totalPcd) * 100) : 0;
              const Icon = config.icon;
              
              return (
                <div key={category} className="text-center space-y-2">
                  <div className={`w-12 h-12 rounded-full ${config.color} flex items-center justify-center mx-auto`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold">{count}</div>
                    <div className="text-sm text-muted-foreground">{config.label}</div>
                    <div className="text-xs text-muted-foreground">{percentage}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Distribuição por Unidade */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building2 className="w-5 h-5" />
            <MetricLabel label="PcD por Unidade Organizacional" description="Distribuição de pessoas com deficiência por unidade." />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topUnits.map(([unit, count], index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{unit}</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">{count} pessoas</Badge>
                    <span className="text-xs text-muted-foreground">
                      {Math.round((count / totalPcd) * 100)}%
                    </span>
                  </div>
                </div>
                <Progress 
                  value={(count / totalPcd) * 100} 
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Competências e Formação */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Principais Competências */}
        <Card>
          <CardHeader>
            <CardTitle>
              <MetricLabel label="Principais Áreas de Atuação" description="Competências mais comuns entre profissionais PcD." />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topCompetencies.map(([competency, count], index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm">{competency}</span>
                  <Badge variant="outline">{count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Formação Acadêmica */}
        <Card>
          <CardHeader>
            <CardTitle>
              <MetricLabel label="Níveis de Formação" description="Distribuição por nível educacional dos profissionais PcD." />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(educationStats)
                .sort(([,a], [,b]) => b - a)
                .map(([level, count]) => {
                  const levelLabels: Record<string, string> = {
                    'doutorado': 'Doutorado',
                    'mestrado': 'Mestrado', 
                    'especializacao': 'Especialização',
                    'graduacao': 'Graduação'
                  };
                  
                  return (
                    <div key={level} className="flex justify-between items-center">
                      <span className="text-sm">{levelLabels[level] || level}</span>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">{count}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {Math.round((count / totalPcd) * 100)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Índice de Inclusão */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <MetricLabel label="Índice de Inclusão por Unidade" description="Percentual de PcD em relação ao total de cada unidade." />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {inclusionIndex.slice(0, 8).map((unit, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{unit.unit}</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant={unit.inclusionRate >= 5 ? "default" : unit.inclusionRate >= 2 ? "secondary" : "outline"}>
                      {unit.inclusionRate}%
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {unit.pcdCount}/{unit.totalInUnit}
                    </span>
                  </div>
                </div>
                <Progress 
                  value={Math.min(unit.inclusionRate, 100)} 
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PcdMetrics;