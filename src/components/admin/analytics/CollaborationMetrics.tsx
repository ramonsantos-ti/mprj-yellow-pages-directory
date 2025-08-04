import React from 'react';
import { Profile } from '../../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { HandHeart, Clock, MessageSquare, Calendar } from 'lucide-react';

interface CollaborationMetricsProps {
  profiles: Profile[];
}

const CollaborationMetrics: React.FC<CollaborationMetricsProps> = ({ profiles }) => {
  const activeProfiles = profiles.filter(p => p.isActive !== false);
  
  // Disponibilidade para Colaboração
  const collaborationTypes = activeProfiles.reduce((acc, profile) => {
    profile.disponibilidade?.tipoColaboracao?.forEach(tipo => {
      acc[tipo] = (acc[tipo] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const totalWithAvailability = activeProfiles.filter(p => 
    p.disponibilidade?.tipoColaboracao && p.disponibilidade.tipoColaboracao.length > 0
  ).length;

  const availabilityRate = activeProfiles.length > 0 
    ? Math.round((totalWithAvailability / activeProfiles.length) * 100) 
    : 0;

  // Preferências de Contato
  const contactPreferences = activeProfiles.reduce((acc, profile) => {
    const contact = profile.contato?.formaContato || 'email';
    acc[contact] = (acc[contact] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Perfis desatualizados (mais de 6 meses)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  
  const outdatedProfiles = activeProfiles.filter(p => 
    new Date(p.lastUpdated) < sixMonthsAgo
  );

  const outdatedRate = activeProfiles.length > 0 
    ? Math.round((outdatedProfiles.length / activeProfiles.length) * 100) 
    : 0;

  // Atualizações recentes (último mês)
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  
  const recentlyUpdated = activeProfiles.filter(p => 
    new Date(p.lastUpdated) > oneMonthAgo
  );

  const updateRate = activeProfiles.length > 0 
    ? Math.round((recentlyUpdated.length / activeProfiles.length) * 100) 
    : 0;

  // Análise por unidade - taxa de atualização
  const allUnidades = [...new Set(activeProfiles.flatMap(p => p.unidade || []))];
  const unitUpdateRates = allUnidades.map(unit => {
    const unitProfiles = activeProfiles.filter(p => p.unidade?.includes(unit));
    const unitRecentlyUpdated = unitProfiles.filter(p => 
      new Date(p.lastUpdated) > oneMonthAgo
    );
    
    return {
      unit,
      totalProfiles: unitProfiles.length,
      recentlyUpdated: unitRecentlyUpdated.length,
      updateRate: unitProfiles.length > 0 
        ? Math.round((unitRecentlyUpdated.length / unitProfiles.length) * 100) 
        : 0
    };
  }).sort((a, b) => b.updateRate - a.updateRate);

  return (
    <div className="space-y-6">
      {/* Métricas de Engajamento */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <HandHeart className="w-4 h-4" />
              <span>Disponíveis para Colaboração</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{availabilityRate}%</div>
            <div className="text-xs text-muted-foreground">
              {totalWithAvailability} de {activeProfiles.length} perfis
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Atualizações Recentes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{updateRate}%</div>
            <div className="text-xs text-muted-foreground">
              {recentlyUpdated.length} perfis no último mês
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Perfis Desatualizados</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{outdatedRate}%</div>
            <div className="text-xs text-muted-foreground">
              {outdatedProfiles.length} perfis há +6 meses
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>Tipos de Colaboração</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {Object.keys(collaborationTypes).length}
            </div>
            <div className="text-xs text-muted-foreground">Modalidades oferecidas</div>
          </CardContent>
        </Card>
      </div>

      {/* Tipos de Colaboração Detalhados */}
      <Card>
        <CardHeader>
          <CardTitle>Disponibilidade por Tipo de Colaboração</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(collaborationTypes)
              .sort(([,a], [,b]) => b - a)
              .map(([tipo, count]) => (
                <div key={tipo} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{tipo}</span>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">{count} pessoas</Badge>
                      <span className="text-xs text-muted-foreground">
                        {Math.round((count / totalWithAvailability) * 100)}%
                      </span>
                    </div>
                  </div>
                  <Progress 
                    value={(count / totalWithAvailability) * 100} 
                    className="h-2"
                  />
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Preferências de Contato */}
      <Card>
        <CardHeader>
          <CardTitle>Preferências de Contato</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(contactPreferences)
              .sort(([,a], [,b]) => b - a)
              .map(([preference, count]) => (
                <div key={preference} className="text-center">
                  <div className="text-xl font-bold text-primary">{count}</div>
                  <div className="text-sm text-muted-foreground capitalize">{preference}</div>
                  <div className="text-xs text-muted-foreground">
                    {Math.round((count / activeProfiles.length) * 100)}%
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Taxa de Atualização por Unidade */}
      <Card>
        <CardHeader>
          <CardTitle>Engajamento por Unidade (Taxa de Atualização)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {unitUpdateRates.slice(0, 8).map((unit, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{unit.unit}</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant={unit.updateRate >= 50 ? "default" : unit.updateRate >= 25 ? "secondary" : "destructive"}>
                      {unit.updateRate}%
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {unit.recentlyUpdated}/{unit.totalProfiles}
                    </span>
                  </div>
                </div>
                <Progress 
                  value={unit.updateRate} 
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

export default CollaborationMetrics;