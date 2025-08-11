import React from 'react';
import { Profile } from '../../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { GraduationCap, Users, Brain, Target } from 'lucide-react';
import MetricLabel from '../../common/MetricLabel';

interface KnowledgeMetricsProps {
  profiles: Profile[];
}

const KnowledgeMetrics: React.FC<KnowledgeMetricsProps> = ({ profiles }) => {
  const activeProfiles = profiles.filter(p => p.isActive !== false);
  
  // Capital Intelectual
  const educationLevels = activeProfiles.reduce((acc, profile) => {
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

  // Diversidade de Conhecimento
  const allAreas = [...new Set(activeProfiles.flatMap(p => p.temasInteresse || []))];
  const totalKnowledgeAreas = allAreas.length;
  
  // Especialistas por área (densidade)
  const areaSpecialists = allAreas.map(area => ({
    area,
    count: activeProfiles.filter(p => p.temasInteresse?.includes(area)).length,
    density: (activeProfiles.filter(p => p.temasInteresse?.includes(area)).length / activeProfiles.length) * 100
  })).sort((a, b) => b.count - a.count);

  // Lacunas de conhecimento (áreas com poucos especialistas)
  const knowledgeGaps = areaSpecialists.filter(area => area.count <= 2);
  
  // Cobertura de conhecimento organizacional
  const coverageScore = Math.round(((totalKnowledgeAreas - knowledgeGaps.length) / totalKnowledgeAreas) * 100);

  // Índice de diversidade por unidade
  const allUnidades = [...new Set(activeProfiles.flatMap(p => p.unidade || []))];
  const unitDiversity = allUnidades.map(unit => {
    const unitProfiles = activeProfiles.filter(p => p.unidade?.includes(unit));
    const unitAreas = [...new Set(unitProfiles.flatMap(p => p.temasInteresse || []))];
    return {
      unit,
      profileCount: unitProfiles.length,
      areasCount: unitAreas.length,
      diversityIndex: unitProfiles.length > 0 ? Math.round((unitAreas.length / unitProfiles.length) * 100) / 100 : 0
    };
  }).sort((a, b) => b.diversityIndex - a.diversityIndex);

  return (
    <div className="space-y-6">
      {/* Capital Intelectual */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <GraduationCap className="w-4 h-4" />
              <MetricLabel label="Doutores" description="Perfis com doutorado (PhD) cadastrados." />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{educationLevels.doutorado || 0}</div>
            <div className="text-xs text-muted-foreground">
              {Math.round(((educationLevels.doutorado || 0) / activeProfiles.length) * 100)}% do total
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <GraduationCap className="w-4 h-4" />
              <MetricLabel label="Mestres" description="Perfis com formação de mestrado cadastrada." />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{educationLevels.mestrado || 0}</div>
            <div className="text-xs text-muted-foreground">
              {Math.round(((educationLevels.mestrado || 0) / activeProfiles.length) * 100)}% do total
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <Brain className="w-4 h-4" />
              <MetricLabel label="Áreas de Conhecimento" description="Número de temas únicos de conhecimento mapeados na base." />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{totalKnowledgeAreas}</div>
            <div className="text-xs text-muted-foreground">Temas únicos mapeados</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <MetricLabel label="Cobertura de Conhecimento" description="Percentual de áreas sem lacunas críticas (com especialistas suficientes)." />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{coverageScore}%</div>
            <div className="text-xs text-muted-foreground">
              {knowledgeGaps.length} lacunas identificadas
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Densidade de Especialistas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <MetricLabel label="Densidade de Especialistas por Área" description="Quantidade relativa de especialistas por tema de conhecimento." />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {areaSpecialists.slice(0, 8).map((area, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{area.area}</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant={area.count <= 2 ? "destructive" : area.count <= 5 ? "secondary" : "default"}>
                      {area.count} especialistas
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {Math.round(area.density)}%
                    </span>
                  </div>
                </div>
                <Progress 
                  value={Math.min(area.density, 100)} 
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Diversidade por Unidade */}
      <Card>
        <CardHeader>
          <CardTitle>
            <MetricLabel label="Índice de Diversidade de Conhecimento por Unidade" description="Áreas únicas por pessoa em cada unidade (maior = maior diversidade)." />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {unitDiversity.slice(0, 6).map((unit, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="font-medium text-sm">{unit.unit}</div>
                  <div className="text-xs text-muted-foreground">
                    {unit.profileCount} perfis • {unit.areasCount} áreas
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold">
                    {unit.diversityIndex.toFixed(2)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    áreas/pessoa
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KnowledgeMetrics;