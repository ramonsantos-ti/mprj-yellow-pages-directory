import React from 'react';
import { Profile } from '../../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';

interface AdvancedVisualizationProps {
  profiles: Profile[];
}

const AdvancedVisualization: React.FC<AdvancedVisualizationProps> = ({ profiles }) => {
  const activeProfiles = profiles.filter(p => p.isActive !== false);

  // Cores para os gráficos
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#ff7c7c'];

  // Dados para gráfico de pizza - Distribuição por Unidades
  const unitData = [...new Set(activeProfiles.flatMap(p => p.unidade || []))]
    .map(unit => ({
      name: unit.length > 20 ? unit.substring(0, 20) + '...' : unit,
      value: activeProfiles.filter(p => p.unidade?.includes(unit)).length,
      fullName: unit
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  // Dados para gráfico de barras - Top 10 Áreas de Conhecimento
  const areasData = [...new Set(activeProfiles.flatMap(p => p.temasInteresse || []))]
    .map(area => ({
      name: area.length > 15 ? area.substring(0, 15) + '...' : area,
      especialistas: activeProfiles.filter(p => p.temasInteresse?.includes(area)).length,
      fullName: area
    }))
    .sort((a, b) => b.especialistas - a.especialistas)
    .slice(0, 10);

  // Dados para linha temporal - Perfis criados por mês (simulado)
  const timelineData = React.useMemo(() => {
    const months = [];
    for (let i = 11; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthYear = date.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' });
      
      // Simulação de crescimento (na aplicação real, usar dados reais)
      const baseCount = Math.max(1, activeProfiles.length - (i * 2));
      const variance = Math.random() * 3;
      
      months.push({
        month: monthYear,
        novos: Math.floor(baseCount * 0.1 + variance),
        total: Math.floor(baseCount + variance),
        atualizacoes: Math.floor(baseCount * 0.3 + variance)
      });
    }
    return months;
  }, [activeProfiles.length]);

  // Dados para matriz de competências (heatmap simulado)
  const competencyMatrix = React.useMemo(() => {
    const topUnits = unitData.slice(0, 5);
    const topAreas = areasData.slice(0, 6);
    
    return topUnits.map(unit => {
      const unitProfiles = activeProfiles.filter(p => p.unidade?.includes(unit.fullName));
      
      return {
        unit: unit.name,
        areas: topAreas.map(area => ({
          area: area.name,
          count: unitProfiles.filter(p => p.temasInteresse?.some(tema => tema.includes(area.fullName))).length
        }))
      };
    });
  }, [activeProfiles, unitData, areasData]);

  // Distribuição de formação acadêmica
  const educationData = activeProfiles.reduce((acc, profile) => {
    profile.formacaoAcademica?.forEach(formation => {
      const level = formation.nivel.toLowerCase();
      let category = 'Outros';
      
      if (level.includes('doutorado') || level.includes('phd')) {
        category = 'Doutorado';
      } else if (level.includes('mestrado') || level.includes('master')) {
        category = 'Mestrado';
      } else if (level.includes('especialização') || level.includes('pós')) {
        category = 'Especialização';
      } else if (level.includes('graduação') || level.includes('bacharelado') || level.includes('licenciatura')) {
        category = 'Graduação';
      }
      
      acc[category] = (acc[category] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const educationChartData = Object.entries(educationData)
    .map(([level, count]) => ({ name: level, value: count }))
    .sort((a, b) => b.value - a.value);

  // Dados de engajamento por unidade
  const engagementData = unitData.slice(0, 6).map(unit => {
    const unitProfiles = activeProfiles.filter(p => p.unidade?.includes(unit.fullName));
    const withAvailability = unitProfiles.filter(p => 
      p.disponibilidade?.tipoColaboracao && p.disponibilidade.tipoColaboracao.length > 0
    ).length;
    
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const recentlyUpdated = unitProfiles.filter(p => 
      new Date(p.lastUpdated) > oneMonthAgo
    ).length;

    return {
      name: unit.name,
      disponibilidade: Math.round((withAvailability / unitProfiles.length) * 100) || 0,
      atualizacoes: Math.round((recentlyUpdated / unitProfiles.length) * 100) || 0,
      total: unitProfiles.length
    };
  });

  return (
    <div className="space-y-6">
      {/* Primeira linha - Gráficos principais */}
      <div className="grid grid-cols-1 gap-6">
        {/* Distribuição por Unidades */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Unidades</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={500}>
              <PieChart>
                <Pie
                  data={unitData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ fullName, percent }) => `${fullName}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {unitData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name, props) => [value, props.payload.fullName]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Áreas de Conhecimento */}
        <Card>
          <CardHeader>
            <CardTitle>Top 10 Áreas de Conhecimento</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={500}>
              <BarChart data={areasData} margin={{ top: 5, right: 30, left: 20, bottom: 120 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="fullName" 
                  angle={-45}
                  textAnchor="end"
                  height={120}
                  fontSize={11}
                  interval={0}
                />
                <YAxis />
                <Tooltip formatter={(value, name, props) => [value, `Especialistas em ${props.payload.fullName}`]} />
                <Bar dataKey="especialistas" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Segunda linha - Formação e Timeline */}
      <div className="grid grid-cols-1 gap-6">
        {/* Distribuição de Formação */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Formação Acadêmica</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={educationChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {educationChartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Timeline de Crescimento */}
        <Card>
          <CardHeader>
            <CardTitle>Evolução da Base de Conhecimento</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={timelineData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="total" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="novos" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Terceira linha - Engajamento e Matriz de Competências */}
      <div className="grid grid-cols-1 gap-6">
        {/* Engajamento por Unidade */}
        <Card>
          <CardHeader>
            <CardTitle>Engajamento por Unidade</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={450}>
              <BarChart data={engagementData.map(d => ({ ...d, fullName: unitData.find(u => u.name === d.name)?.fullName || d.name }))} margin={{ top: 5, right: 30, left: 20, bottom: 120 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fullName" angle={-45} textAnchor="end" height={120} fontSize={11} interval={0} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="disponibilidade" fill="#00C49F" name="% Disponível para Colaboração" />
                <Bar dataKey="atualizacoes" fill="#FFBB28" name="% Atualizações Recentes" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Matriz de Competências */}
        <Card>
          <CardHeader>
            <CardTitle>Matriz de Competências (Unidade x Área)</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Esta matriz mostra a distribuição de especialistas por área de conhecimento em cada unidade. 
              Cada célula representa a quantidade de profissionais que atuam em uma área específica dentro da unidade.
              Cores mais intensas indicam maior concentração de especialistas.
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {/* Cabeçalho com áreas */}
              <div className="flex space-x-1 pl-32">
                {areasData.slice(0, 6).map((area, idx) => (
                  <div key={idx} className="flex-1 text-xs text-center font-medium text-muted-foreground">
                    <div className="transform -rotate-45 origin-left">{area.name}</div>
                  </div>
                ))}
              </div>
              
              {/* Linhas da matriz */}
              {competencyMatrix.map((unit, unitIndex) => (
                <div key={unitIndex} className="flex space-x-1 items-center">
                  <div className="text-sm font-medium w-32 truncate" title={unit.unit}>{unit.unit}</div>
                  <div className="flex space-x-1 flex-1">
                    {unit.areas.map((area, areaIndex) => (
                      <div 
                        key={areaIndex}
                        className="flex-1 h-8 rounded text-xs flex items-center justify-center text-white font-medium cursor-help"
                        style={{
                          backgroundColor: area.count === 0 ? '#e5e7eb' : 
                                         area.count <= 2 ? '#fbbf24' :
                                         area.count <= 5 ? '#3b82f6' : '#10b981'
                        }}
                        title={`${area.area}: ${area.count} especialistas`}
                      >
                        {area.count > 0 ? area.count : '-'}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              {/* Legenda */}
              <div className="flex justify-center space-x-4 text-xs mt-4 pt-4 border-t">
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-gray-300 rounded"></div>
                  <span>Nenhum</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                  <span>1-2 especialistas</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span>3-5 especialistas</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span>6+ especialistas</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdvancedVisualization;