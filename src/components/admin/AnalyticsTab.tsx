
import React from 'react';
import { Profile } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { PieChart, TrendingUp } from 'lucide-react';

interface AnalyticsTabProps {
  profiles: Profile[];
}

const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ profiles }) => {
  const activeProfiles = profiles.filter(p => p.isActive !== false);
  const inactiveProfiles = profiles.filter(p => p.isActive === false);
  const totalProfiles = profiles.length;
  
  const completeProfiles = profiles.filter(p => 
    p.name && 
    p.email && 
    p.cargo?.length > 0 && 
    p.unidade?.length > 0 && 
    p.areasConhecimento?.length > 0
  );
  
  const completionRate = totalProfiles > 0 ? Math.round((completeProfiles.length / totalProfiles) * 100) : 0;
  
  const recentlyUpdated = profiles.filter(p => {
    const oneDayAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    return new Date(p.lastUpdated) > oneDayAgo;
  });
  
  const updateRate = totalProfiles > 0 ? Math.round((recentlyUpdated.length / totalProfiles) * 100) : 0;

  const allAreas = [...new Set(profiles.flatMap(p => p.areasConhecimento || []))];
  const allUnidades = [...new Set(profiles.flatMap(p => p.unidade || []))];

  const specialistsByArea = allAreas.map(area => ({
    area,
    count: profiles.filter(p => p.areasConhecimento?.includes(area)).length
  })).sort((a, b) => b.count - a.count);

  const specialistsByUnit = allUnidades.map(unit => ({
    unit,
    count: profiles.filter(p => p.unidade?.includes(unit)).length
  })).sort((a, b) => b.count - a.count);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total de Perfis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalProfiles}</div>
          <div className="flex text-xs text-gray-500">
            <span className="text-green-600">{activeProfiles.length} ativos</span>
            <span className="mx-2">•</span>
            <span className="text-red-600">{inactiveProfiles.length} inativos</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Perfis Completos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completionRate}%</div>
          <div className="text-xs text-gray-500">{completeProfiles.length} de {totalProfiles} perfis</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Atualizações (30 dias)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{updateRate}%</div>
          <div className="text-xs text-gray-500">{recentlyUpdated.length} perfis atualizados</div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PieChart className="w-5 h-5" />
            <span>Especialistas por Área</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {specialistsByArea.slice(0, 5).map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm">{item.area}</span>
                <Badge variant="secondary">{item.count}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Unidades</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {specialistsByUnit.slice(0, 3).map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-xs">{item.unit}</span>
                <Badge variant="outline" className="text-xs">{item.count}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsTab;
