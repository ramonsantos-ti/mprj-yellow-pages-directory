import React from 'react';
import { Profile } from '../../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';

interface DataQualityMetricsProps {
  profiles: Profile[];
}

const DataQualityMetrics: React.FC<DataQualityMetricsProps> = ({ profiles }) => {
  const activeProfiles = profiles.filter(p => p.isActive !== false);

  // Função para calcular score de completude
  const calculateCompletenessScore = (profile: Profile) => {
    const fields = [
      { field: 'name', weight: 15, value: profile.name },
      { field: 'email', weight: 15, value: profile.email },
      { field: 'cargo', weight: 10, value: profile.cargo?.length > 0 },
      { field: 'unidade', weight: 10, value: profile.unidade?.length > 0 },
      { field: 'temasInteresse', weight: 15, value: profile.temasInteresse?.length > 0 },
      { field: 'biografia', weight: 8, value: profile.biografia },
      { field: 'telefone', weight: 5, value: profile.telefone },
      { field: 'formacaoAcademica', weight: 10, value: profile.formacaoAcademica?.length > 0 },
      { field: 'experienciasProfissionais', weight: 8, value: profile.experienciasProfissionais?.length > 0 },
      { field: 'disponibilidade', weight: 4, value: profile.disponibilidade?.tipoColaboracao?.length > 0 }
    ];

    const completedWeight = fields.reduce((acc, field) => {
      return field.value ? acc + field.weight : acc;
    }, 0);

    return Math.round(completedWeight);
  };

  // Análise de completude
  const completenessAnalysis = activeProfiles.map(profile => ({
    id: profile.id,
    name: profile.name,
    score: calculateCompletenessScore(profile)
  }));

  const averageCompleteness = Math.round(
    completenessAnalysis.reduce((acc, item) => acc + item.score, 0) / completenessAnalysis.length
  );

  // Distribuição por faixas de completude
  const completenessDistribution = {
    excellent: completenessAnalysis.filter(p => p.score >= 90).length,
    good: completenessAnalysis.filter(p => p.score >= 70 && p.score < 90).length,
    fair: completenessAnalysis.filter(p => p.score >= 50 && p.score < 70).length,
    poor: completenessAnalysis.filter(p => p.score < 50).length
  };

  // Campos críticos em falta
  const criticalFieldsAnalysis = {
    missingEmail: activeProfiles.filter(p => !p.email).length,
    missingCargo: activeProfiles.filter(p => !p.cargo?.length).length,
    missingUnidade: activeProfiles.filter(p => !p.unidade?.length).length,
    missingTemasInteresse: activeProfiles.filter(p => !p.temasInteresse?.length).length,
    missingFormacao: activeProfiles.filter(p => !p.formacaoAcademica?.length).length,
    missingDisponibilidade: activeProfiles.filter(p => !p.disponibilidade?.tipoColaboracao?.length).length
  };

  // Validação de formatos
  const formatValidation = {
    invalidEmails: activeProfiles.filter(p => 
      p.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)
    ).length,
    invalidPhones: activeProfiles.filter(p => 
      p.telefone && !/^[\d\s\-\(\)\+]+$/.test(p.telefone)
    ).length,
    invalidUrls: activeProfiles.filter(p => 
      p.linkCurriculo && !/^https?:\/\/.+/.test(p.linkCurriculo)
    ).length
  };

  // Consistência temporal
  const temporalConsistency = {
    futureFormationDates: activeProfiles.filter(p => 
      p.formacaoAcademica?.some(f => f.ano > new Date().getFullYear())
    ).length,
    invalidProjectDates: activeProfiles.filter(p => 
      p.projetos?.some(proj => 
        proj.dataFim && proj.dataInicio && new Date(proj.dataFim) < new Date(proj.dataInicio)
      )
    ).length
  };

  // Análise de perfis por unidade
  const allUnidades = [...new Set(activeProfiles.flatMap(p => p.unidade || []))];
  const unitQualityAnalysis = allUnidades.map(unit => {
    const unitProfiles = activeProfiles.filter(p => p.unidade?.includes(unit));
    const unitCompleteness = unitProfiles.map(p => calculateCompletenessScore(p));
    const avgCompleteness = unitCompleteness.length > 0 
      ? Math.round(unitCompleteness.reduce((acc, score) => acc + score, 0) / unitCompleteness.length)
      : 0;
    
    return {
      unit,
      profileCount: unitProfiles.length,
      avgCompleteness,
      excellentProfiles: unitProfiles.filter(p => calculateCompletenessScore(p) >= 90).length
    };
  }).sort((a, b) => b.avgCompleteness - a.avgCompleteness);

  return (
    <div className="space-y-6">
      {/* Overview da Qualidade */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Completude Média</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{averageCompleteness}%</div>
            <div className="text-xs text-muted-foreground">Score médio de qualidade</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              <span>Perfis Incompletos</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {completenessDistribution.fair + completenessDistribution.poor}
            </div>
            <div className="text-xs text-muted-foreground">
              {Math.round(((completenessDistribution.fair + completenessDistribution.poor) / activeProfiles.length) * 100)}% do total
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <XCircle className="w-4 h-4 text-red-600" />
              <span>Erros de Formato</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatValidation.invalidEmails + formatValidation.invalidPhones + formatValidation.invalidUrls}
            </div>
            <div className="text-xs text-muted-foreground">Dados com formato inválido</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <Info className="w-4 h-4 text-blue-600" />
              <span>Perfis Excelentes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{completenessDistribution.excellent}</div>
            <div className="text-xs text-muted-foreground">
              {Math.round((completenessDistribution.excellent / activeProfiles.length) * 100)}% com score ≥ 90%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Distribuição de Completude */}
      <Card>
        <CardHeader>
          <CardTitle>Distribuição de Qualidade dos Perfis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-green-700">Excelente (90-100%)</span>
                <Badge variant="default">{completenessDistribution.excellent} perfis</Badge>
              </div>
              <Progress value={(completenessDistribution.excellent / activeProfiles.length) * 100} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-blue-700">Bom (70-89%)</span>
                <Badge variant="secondary">{completenessDistribution.good} perfis</Badge>
              </div>
              <Progress value={(completenessDistribution.good / activeProfiles.length) * 100} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-yellow-700">Regular (50-69%)</span>
                <Badge variant="outline">{completenessDistribution.fair} perfis</Badge>
              </div>
              <Progress value={(completenessDistribution.fair / activeProfiles.length) * 100} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-red-700">Ruim (0-49%)</span>
                <Badge variant="destructive">{completenessDistribution.poor} perfis</Badge>
              </div>
              <Progress value={(completenessDistribution.poor / activeProfiles.length) * 100} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Campos Críticos Ausentes */}
      <Card>
        <CardHeader>
          <CardTitle>Campos Críticos Ausentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-red-600">{criticalFieldsAnalysis.missingTemasInteresse}</div>
              <div className="text-sm text-muted-foreground">Sem temas de interesse</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-orange-600">{criticalFieldsAnalysis.missingFormacao}</div>
              <div className="text-sm text-muted-foreground">Sem formação acadêmica</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-yellow-600">{criticalFieldsAnalysis.missingCargo}</div>
              <div className="text-sm text-muted-foreground">Sem cargo definido</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">{criticalFieldsAnalysis.missingUnidade}</div>
              <div className="text-sm text-muted-foreground">Sem unidade definida</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">{criticalFieldsAnalysis.missingDisponibilidade}</div>
              <div className="text-sm text-muted-foreground">Sem disponibilidade</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-pink-600">{formatValidation.invalidEmails}</div>
              <div className="text-sm text-muted-foreground">Emails inválidos</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Qualidade por Unidade */}
      <Card>
        <CardHeader>
          <CardTitle>Qualidade dos Dados por Unidade</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {unitQualityAnalysis.slice(0, 8).map((unit, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{unit.unit}</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant={unit.avgCompleteness >= 80 ? "default" : unit.avgCompleteness >= 60 ? "secondary" : "destructive"}>
                      {unit.avgCompleteness}%
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {unit.excellentProfiles}/{unit.profileCount} excelentes
                    </span>
                  </div>
                </div>
                <Progress 
                  value={unit.avgCompleteness} 
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

export default DataQualityMetrics;