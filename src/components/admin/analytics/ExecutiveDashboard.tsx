import React from 'react';
import { Profile } from '../../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { 
  Users, 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Target,
  Award 
} from 'lucide-react';
import MetricLabel from '../../common/MetricLabel';

interface ExecutiveDashboardProps {
  profiles: Profile[];
}

const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({ profiles }) => {
  const activeProfiles = profiles.filter(p => p.isActive !== false);
  const totalProfiles = profiles.length;

  // KPIs Executivos
  const kpis = {
    // Capital Humano
    totalActive: activeProfiles.length,
    totalInactive: totalProfiles - activeProfiles.length,
    growthRate: 8.5, // Simulado - seria calculado com dados históricos
    
    // Gestão do Conhecimento
    knowledgeAreas: [...new Set(activeProfiles.flatMap(p => p.temasInteresse || []))].length,
    specialists: activeProfiles.filter(p => p.temasInteresse && p.temasInteresse.length >= 3).length,
    experts: activeProfiles.filter(p => 
      p.formacaoAcademica?.some(f => 
        f.nivel.toLowerCase().includes('doutorado') || f.nivel.toLowerCase().includes('mestrado')
      )
    ).length,
    
    // Qualidade dos Dados
    completeProfiles: activeProfiles.filter(p => 
      p.name && p.email && p.cargo?.length > 0 && 
      p.unidade?.length > 0 && p.temasInteresse?.length > 0
    ).length,
    
    // Engajamento
    availableForCollaboration: activeProfiles.filter(p => 
      p.disponibilidade?.tipoColaboracao && p.disponibilidade.tipoColaboracao.length > 0
    ).length,
    
    // Atualização
    recentlyUpdated: activeProfiles.filter(p => {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      return new Date(p.lastUpdated) > oneMonthAgo;
    }).length
  };

  // Alertas e Recomendações
  const alerts = [
    {
      type: 'warning',
      title: 'Lacunas de Conhecimento',
      message: `${[...new Set(activeProfiles.flatMap(p => p.temasInteresse || []))].filter(area => 
        activeProfiles.filter(p => p.temasInteresse?.includes(area)).length <= 2
      ).length} áreas com poucos especialistas`,
      severity: 'medium'
    },
    {
      type: 'info',
      title: 'Oportunidade de Melhoria',
      message: `${totalProfiles - kpis.completeProfiles} perfis precisam de complementação`,
      severity: 'low'
    },
    {
      type: 'success',
      title: 'Meta Atingida',
      message: `${Math.round((kpis.availableForCollaboration / activeProfiles.length) * 100)}% dos perfis disponíveis para colaboração`,
      severity: 'low'
    }
  ];

  // Índices de Performance
  const performanceIndices = {
    knowledgeCoverage: Math.round(((kpis.knowledgeAreas - alerts.filter(a => a.title.includes('Lacunas')).length) / kpis.knowledgeAreas) * 100),
    dataQuality: Math.round((kpis.completeProfiles / activeProfiles.length) * 100),
    engagement: Math.round((kpis.availableForCollaboration / activeProfiles.length) * 100),
    expertise: Math.round((kpis.experts / activeProfiles.length) * 100),
    freshness: Math.round((kpis.recentlyUpdated / activeProfiles.length) * 100)
  };

  return (
    <div className="space-y-6">
      {/* KPIs Principais */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center space-x-1">
              <Users className="w-3 h-3" />
              <MetricLabel label="Perfis Ativos" description="Total de perfis ativos no sistema." />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-primary">{kpis.totalActive}</div>
            <div className="text-xs text-muted-foreground">
              +{kpis.growthRate}% este mês
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center space-x-1">
              <Brain className="w-3 h-3" />
              <MetricLabel label="Áreas de Conhecimento" description="Quantidade de áreas únicas de conhecimento mapeadas." />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-secondary">{kpis.knowledgeAreas}</div>
            <div className="text-xs text-muted-foreground">Domínios mapeados</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center space-x-1">
              <Award className="w-3 h-3" />
              <MetricLabel label="Especialistas" description="Perfis com formação de mestrado ou doutorado." />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-accent">{kpis.experts}</div>
            <div className="text-xs text-muted-foreground">Mestres/Doutores</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center space-x-1">
              <CheckCircle className="w-3 h-3" />
              <MetricLabel label="Qualidade" description="Percentual de perfis com informações essenciais completas." />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-green-600">{performanceIndices.dataQuality}%</div>
            <div className="text-xs text-muted-foreground">Perfis completos</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center space-x-1">
              <TrendingUp className="w-3 h-3" />
              <MetricLabel label="Engajamento" description="Percentual de perfis com disponibilidade para colaboração." />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-blue-600">{performanceIndices.engagement}%</div>
            <div className="text-xs text-muted-foreground">Disponíveis</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <MetricLabel label="Atualização" description="Percentual de perfis atualizados no último mês." />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-purple-600">{performanceIndices.freshness}%</div>
            <div className="text-xs text-muted-foreground">Último mês</div>
          </CardContent>
        </Card>
      </div>

      {/* Índices de Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <MetricLabel label="Índices de Performance da Gestão do Conhecimento" description="Métricas consolidadas que avaliam cobertura, qualidade, especialização, engajamento e atualização da base." />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <MetricLabel className="text-sm font-medium" label="Cobertura de Conhecimento" description="Percentual de áreas cobertas sem lacunas críticas." />
                <Badge variant={performanceIndices.knowledgeCoverage >= 80 ? "default" : "secondary"}>
                  {performanceIndices.knowledgeCoverage}%
                </Badge>
              </div>
              <Progress value={performanceIndices.knowledgeCoverage} className="h-2" />
              <div className="text-xs text-muted-foreground">
                Áreas sem lacunas críticas
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <MetricLabel className="text-sm font-medium" label="Qualidade dos Dados" description="Percentual de perfis com informações essenciais preenchidas." />
                <Badge variant={performanceIndices.dataQuality >= 70 ? "default" : "secondary"}>
                  {performanceIndices.dataQuality}%
                </Badge>
              </div>
              <Progress value={performanceIndices.dataQuality} className="h-2" />
              <div className="text-xs text-muted-foreground">
                Perfis com informações completas
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <MetricLabel className="text-sm font-medium" label="Nível de Especialização" description="Proporção de perfis com pós-graduação (mestrado/doutorado)." />
                <Badge variant={performanceIndices.expertise >= 30 ? "default" : "secondary"}>
                  {performanceIndices.expertise}%
                </Badge>
              </div>
              <Progress value={performanceIndices.expertise} className="h-2" />
              <div className="text-xs text-muted-foreground">
                Profissionais com pós-graduação
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <MetricLabel className="text-sm font-medium" label="Engajamento Colaborativo" description="Percentual de perfis disponíveis para colaborar em projetos e iniciativas." />
                <Badge variant={performanceIndices.engagement >= 50 ? "default" : "secondary"}>
                  {performanceIndices.engagement}%
                </Badge>
              </div>
              <Progress value={performanceIndices.engagement} className="h-2" />
              <div className="text-xs text-muted-foreground">
                Disponíveis para colaboração
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <MetricLabel className="text-sm font-medium" label="Atualização da Base" description="Percentual de perfis atualizados recentemente (último mês)." />
                <Badge variant={performanceIndices.freshness >= 25 ? "default" : "secondary"}>
                  {performanceIndices.freshness}%
                </Badge>
              </div>
              <Progress value={performanceIndices.freshness} className="h-2" />
              <div className="text-xs text-muted-foreground">
                Atualizados recentemente
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <MetricLabel className="text-sm font-medium" label="Score Geral" description="Média dos índices principais: cobertura, qualidade, especialização, engajamento e atualização." />
                <Badge variant="default">
                  {Math.round((performanceIndices.knowledgeCoverage + performanceIndices.dataQuality + 
                    performanceIndices.expertise + performanceIndices.engagement + 
                    performanceIndices.freshness) / 5)}%
                </Badge>
              </div>
              <Progress 
                value={(performanceIndices.knowledgeCoverage + performanceIndices.dataQuality + 
                  performanceIndices.expertise + performanceIndices.engagement + 
                  performanceIndices.freshness) / 5} 
                className="h-2" 
              />
              <div className="text-xs text-muted-foreground">
                Índice consolidado
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alertas e Recomendações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5" />
            <MetricLabel label="Alertas e Recomendações" description="Resumo de avisos e oportunidades de melhoria com base nos dados atuais." />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-lg border-l-4 ${
                  alert.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
                  alert.type === 'info' ? 'bg-blue-50 border-blue-400' :
                  'bg-green-50 border-green-400'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-sm">{alert.title}</div>
                    <div className="text-sm text-muted-foreground mt-1">{alert.message}</div>
                  </div>
                  <Badge 
                    variant={alert.severity === 'high' ? 'destructive' : 
                            alert.severity === 'medium' ? 'secondary' : 'outline'}
                    className="text-xs"
                  >
                    {alert.severity === 'high' ? 'Alta' : 
                     alert.severity === 'medium' ? 'Média' : 'Baixa'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resumo Executivo */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo Executivo - Gestão do Conhecimento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none text-sm">
            <p className="mb-3">
              <strong>Status Geral:</strong> A organização possui <strong>{kpis.totalActive} perfis ativos</strong> 
              distribuídos em <strong>{kpis.knowledgeAreas} áreas de conhecimento</strong>, 
              com <strong>{kpis.experts} especialistas</strong> de nível superior.
            </p>
            
            <p className="mb-3">
              <strong>Pontos Fortes:</strong> 
              {performanceIndices.expertise >= 30 && " Alto nível de especialização técnica."}
              {performanceIndices.engagement >= 50 && " Boa disponibilidade para colaboração."}
              {performanceIndices.dataQuality >= 70 && " Qualidade satisfatória dos dados."}
            </p>
            
            <p className="mb-3">
              <strong>Oportunidades de Melhoria:</strong>
              {performanceIndices.knowledgeCoverage < 80 && " Identificar e preencher lacunas críticas de conhecimento."}
              {performanceIndices.freshness < 25 && " Incentivar atualização mais frequente dos perfis."}
              {performanceIndices.dataQuality < 70 && " Completar informações dos perfis incompletos."}
            </p>
            
            <p>
              <strong>Próximas Ações:</strong> Foco na cobertura de conhecimento e engajamento dos colaboradores 
              para maximizar o potencial da gestão do conhecimento organizacional.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExecutiveDashboard;