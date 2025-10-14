
import React, { useState } from 'react';
import { Profile } from '../../types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import ExecutiveDashboard from './analytics/ExecutiveDashboard';
import KnowledgeMetrics from './analytics/KnowledgeMetrics';
import CollaborationMetrics from './analytics/CollaborationMetrics';
import DataQualityMetrics from './analytics/DataQualityMetrics';
import AdvancedVisualization from './analytics/AdvancedVisualization';
import TrendAnalysis from './analytics/TrendAnalysis';
import PcdMetrics from './analytics/PcdMetrics';

interface AnalyticsTabProps {
  profiles: Profile[];
}

const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ profiles }) => {
  return (
    <Tabs defaultValue="visualization" className="w-full">
      <TabsList className="grid w-full grid-cols-7 gap-1">
        <TabsTrigger value="visualization" className="text-xs px-2">Visualizações</TabsTrigger>
        <TabsTrigger value="knowledge" className="text-xs px-2">Conhecimento</TabsTrigger>
        <TabsTrigger value="collaboration" className="text-xs px-2">Colaboração</TabsTrigger>
        <TabsTrigger value="executive" className="text-xs px-2">Executivo</TabsTrigger>
        <TabsTrigger value="quality" className="text-xs px-2">Qualidade</TabsTrigger>
        <TabsTrigger value="pcd" className="text-xs px-2">PcD</TabsTrigger>
        <TabsTrigger value="trends" className="text-xs px-2">Tendências</TabsTrigger>
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
      
      <TabsContent value="pcd" className="mt-6">
        <PcdMetrics profiles={profiles} />
      </TabsContent>
      
      <TabsContent value="trends" className="mt-6">
        <TrendAnalysis profiles={profiles} />
      </TabsContent>
    </Tabs>
  );
};

export default AnalyticsTab;
