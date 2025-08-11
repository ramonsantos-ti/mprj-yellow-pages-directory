
import React, { useState } from 'react';
import { Profile } from '../../types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import ExecutiveDashboard from './analytics/ExecutiveDashboard';
import KnowledgeMetrics from './analytics/KnowledgeMetrics';
import CollaborationMetrics from './analytics/CollaborationMetrics';
import DataQualityMetrics from './analytics/DataQualityMetrics';
import AdvancedVisualization from './analytics/AdvancedVisualization';
import TrendAnalysis from './analytics/TrendAnalysis';

interface AnalyticsTabProps {
  profiles: Profile[];
}

const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ profiles }) => {
  return (
    <Tabs defaultValue="visualization" className="w-full">
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger value="visualization">Visualizações</TabsTrigger>
        <TabsTrigger value="knowledge">Conhecimento</TabsTrigger>
        <TabsTrigger value="collaboration">Colaboração</TabsTrigger>
        <TabsTrigger value="executive">Executivo</TabsTrigger>
        <TabsTrigger value="quality">Qualidade</TabsTrigger>
        <TabsTrigger value="trends">Tendências</TabsTrigger>
      </TabsList>
      
      <TabsContent value="executive" className="mt-6">
        <ExecutiveDashboard profiles={profiles} />
      </TabsContent>
      
      <TabsContent value="knowledge" className="mt-6">
        <KnowledgeMetrics profiles={profiles} />
      </TabsContent>
      
      <TabsContent value="collaboration" className="mt-6">
        <CollaborationMetrics profiles={profiles} />
      </TabsContent>
      
      <TabsContent value="quality" className="mt-6">
        <DataQualityMetrics profiles={profiles} />
      </TabsContent>
      
      <TabsContent value="visualization" className="mt-6">
        <AdvancedVisualization profiles={profiles} />
      </TabsContent>
      
      <TabsContent value="trends" className="mt-6">
        <TrendAnalysis profiles={profiles} />
      </TabsContent>
    </Tabs>
  );
};

export default AnalyticsTab;
