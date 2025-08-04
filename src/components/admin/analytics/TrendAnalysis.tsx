import React from 'react';
import { Profile } from '../../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, Activity, Zap, Users, Brain } from 'lucide-react';

interface TrendAnalysisProps {
  profiles: Profile[];
}

const TrendAnalysis: React.FC<TrendAnalysisProps> = ({ profiles }) => {
  const activeProfiles = profiles.filter(p => p.isActive !== false);

  // Simulação de dados temporais (em uma aplicação real, seria obtido do banco de dados)
  const monthlyTrends = React.useMemo(() => {
    const months = [];
    const currentDate = new Date();
    
    for (let i = 11; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setMonth(date.getMonth() - i);
      const monthYear = date.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' });
      
      // Simulação de crescimento orgânico
      const baseGrowth = Math.max(0, 12 - i);
      const variance = Math.random() * 5;
      
      months.push({
        month: monthYear,
        novosPerfis: Math.floor(baseGrowth + variance),
        perfilsAtualizados: Math.floor((baseGrowth + variance) * 2.5),
        colaboracoesIniciais: Math.floor((baseGrowth + variance) * 0.8),
        novasCompetencias: Math.floor((baseGrowth + variance) * 1.2),
        scoreMedioQualidade: Math.min(100, 60 + (baseGrowth * 2) + variance)
      });
    }
    return months;
  }, []);

  // Análise de tendências
  const trends = {
    profileGrowth: {
      current: monthlyTrends[monthlyTrends.length - 1]?.novosPerfis || 0,
      previous: monthlyTrends[monthlyTrends.length - 2]?.novosPerfis || 0,
      direction: 'up' as 'up' | 'down' | 'stable'
    },
    qualityScore: {
      current: monthlyTrends[monthlyTrends.length - 1]?.scoreMedioQualidade || 0,
      previous: monthlyTrends[monthlyTrends.length - 2]?.scoreMedioQualidade || 0,
      direction: 'up' as 'up' | 'down' | 'stable'
    },
    competencyGrowth: {
      current: monthlyTrends[monthlyTrends.length - 1]?.novasCompetencias || 0,
      previous: monthlyTrends[monthlyTrends.length - 2]?.novasCompetencias || 0,
      direction: 'up' as 'up' | 'down' | 'stable'
    },
    engagement: {
      current: monthlyTrends[monthlyTrends.length - 1]?.perfilsAtualizados || 0,
      previous: monthlyTrends[monthlyTrends.length - 2]?.perfilsAtualizados || 0,
      direction: 'up' as 'up' | 'down' | 'stable'
    }
  };

  // Calcular direções das tendências
  Object.keys(trends).forEach(key => {
    const trend = trends[key as keyof typeof trends];
    const change = ((trend.current - trend.previous) / trend.previous) * 100;
    if (change > 5) trend.direction = 'up';
    else if (change < -5) trend.direction = 'down';
    else trend.direction = 'stable';
  });

  // Previsões simples (tendência linear)
  const predictions = {
    nextMonthProfiles: Math.round(trends.profileGrowth.current * 1.1),
    nextMonthQuality: Math.min(100, Math.round(trends.qualityScore.current * 1.02)),
    quarterlyGrowth: Math.round(trends.profileGrowth.current * 3.2),
    yearlyProjection: Math.round(activeProfiles.length * 1.25)
  };

  // Áreas de crescimento emergente
  const emergingAreas = React.useMemo(() => {
    const areaGrowth = [...new Set(activeProfiles.flatMap(p => p.temasInteresse || []))]
      .map(area => {
        const specialistCount = activeProfiles.filter(p => p.temasInteresse?.includes(area)).length;
        // Simular tendência de crescimento
        const growthRate = Math.random() * 30 + 5; // Entre 5% e 35%
        
        return {
          area: area.length > 30 ? area.substring(0, 30) + '...' : area,
          fullArea: area,
          specialists: specialistCount,
          growthRate: Math.round(growthRate),
          trend: growthRate > 20 ? 'high' : growthRate > 10 ? 'medium' : 'low'
        };
      })
      .sort((a, b) => b.growthRate - a.growthRate)
      .slice(0, 8);
    
    return areaGrowth;
  }, [activeProfiles]);

  // Unidades com maior crescimento
  const unitGrowth = React.useMemo(() => {
    const allUnits = [...new Set(activeProfiles.flatMap(p => p.unidade || []))];
    
    return allUnits.map(unit => {
      const unitProfiles = activeProfiles.filter(p => p.unidade?.includes(unit));
      const growthRate = Math.random() * 25 + 2; // Entre 2% e 27%
      
      return {
        unit: unit.length > 25 ? unit.substring(0, 25) + '...' : unit,
        fullUnit: unit,
        profiles: unitProfiles.length,
        growthRate: Math.round(growthRate),
        trend: growthRate > 15 ? 'high' : growthRate > 8 ? 'medium' : 'low'
      };
    })
    .sort((a, b) => b.growthRate - a.growthRate)
    .slice(0, 6);
  }, [activeProfiles]);

  const getTrendIcon = (direction: 'up' | 'down' | 'stable') => {
    switch (direction) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendColor = (direction: 'up' | 'down' | 'stable') => {
    switch (direction) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Tendências Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Crescimento de Perfis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-xl font-bold">{trends.profileGrowth.current}</div>
              {getTrendIcon(trends.profileGrowth.direction)}
            </div>
            <div className={`text-xs ${getTrendColor(trends.profileGrowth.direction)}`}>
              {Math.round(((trends.profileGrowth.current - trends.profileGrowth.previous) / trends.profileGrowth.previous) * 100)}% vs mês anterior
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>Score de Qualidade</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-xl font-bold">{Math.round(trends.qualityScore.current)}%</div>
              {getTrendIcon(trends.qualityScore.direction)}
            </div>
            <div className={`text-xs ${getTrendColor(trends.qualityScore.direction)}`}>
              {Math.round(((trends.qualityScore.current - trends.qualityScore.previous) / trends.qualityScore.previous) * 100)}% vs mês anterior
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <Brain className="w-4 h-4" />
              <span>Novas Competências</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-xl font-bold">{trends.competencyGrowth.current}</div>
              {getTrendIcon(trends.competencyGrowth.direction)}
            </div>
            <div className={`text-xs ${getTrendColor(trends.competencyGrowth.direction)}`}>
              {Math.round(((trends.competencyGrowth.current - trends.competencyGrowth.previous) / trends.competencyGrowth.previous) * 100)}% vs mês anterior
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span>Engajamento</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-xl font-bold">{trends.engagement.current}</div>
              {getTrendIcon(trends.engagement.direction)}
            </div>
            <div className={`text-xs ${getTrendColor(trends.engagement.direction)}`}>
              Atualizações mensais
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Tendências Temporais */}
      <Card>
        <CardHeader>
          <CardTitle>Evolução Temporal dos Indicadores</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrends} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="novosPerfis" stroke="#0088FE" name="Novos Perfis" strokeWidth={2} />
              <Line type="monotone" dataKey="novasCompetencias" stroke="#00C49F" name="Novas Competências" strokeWidth={2} />
              <Line type="monotone" dataKey="colaboracoesIniciais" stroke="#FFBB28" name="Colaborações" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Previsões e Projeções */}
      <Card>
        <CardHeader>
          <CardTitle>Previsões e Projeções</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{predictions.nextMonthProfiles}</div>
              <div className="text-sm text-muted-foreground">Novos perfis próximo mês</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{predictions.nextMonthQuality}%</div>
              <div className="text-sm text-muted-foreground">Score qualidade previsto</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{predictions.quarterlyGrowth}</div>
              <div className="text-sm text-muted-foreground">Crescimento trimestral</div>
            </div>
            
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{predictions.yearlyProjection}</div>
              <div className="text-sm text-muted-foreground">Projeção anual</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Áreas Emergentes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Áreas de Conhecimento em Crescimento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {emergingAreas.map((area, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium" title={area.fullArea}>{area.area}</span>
                    <div className="flex items-center space-x-2">
                      <Badge variant={area.trend === 'high' ? 'default' : area.trend === 'medium' ? 'secondary' : 'outline'}>
                        +{area.growthRate}%
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {area.specialists} esp.
                      </span>
                    </div>
                  </div>
                  <Progress value={Math.min(area.growthRate, 100)} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Unidades com Maior Crescimento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {unitGrowth.map((unit, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium" title={unit.fullUnit}>{unit.unit}</span>
                    <div className="flex items-center space-x-2">
                      <Badge variant={unit.trend === 'high' ? 'default' : unit.trend === 'medium' ? 'secondary' : 'outline'}>
                        +{unit.growthRate}%
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {unit.profiles} perfis
                      </span>
                    </div>
                  </div>
                  <Progress value={Math.min(unit.growthRate, 100)} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Qualidade Temporal */}
      <Card>
        <CardHeader>
          <CardTitle>Evolução da Qualidade dos Dados</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={monthlyTrends} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Tooltip formatter={(value) => [`${value}%`, 'Score de Qualidade']} />
              <Area type="monotone" dataKey="scoreMedioQualidade" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrendAnalysis;