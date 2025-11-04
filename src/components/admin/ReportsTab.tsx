
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { FileText, Download } from 'lucide-react';
import { Profile } from '../../types';

interface ReportsTabProps {
  allCargos: string[];
  allUnidades: string[];
  allAreas: string[];
  generateReport: (reportType: string) => void;
  profiles: Profile[];
  generateDetailedReport: (profiles: Profile[]) => void;
}

const ReportsTab: React.FC<ReportsTabProps> = ({
  allCargos,
  allUnidades,
  allAreas,
  generateReport,
  profiles,
  generateDetailedReport
}) => {
  const [selectedCargo, setSelectedCargo] = useState<string>('all');
  const [selectedUnidade, setSelectedUnidade] = useState<string>('all');
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<string>('all');
  const [selectedComplete, setSelectedComplete] = useState<string>('all');
  const [selectedRecent, setSelectedRecent] = useState<string>('all');

  const getFilteredProfiles = (): Profile[] => {
    return profiles.filter(profile => {
      // Filter by cargo
      if (selectedCargo !== 'all' && !profile.cargo?.includes(selectedCargo)) {
        return false;
      }

      // Filter by unidade
      if (selectedUnidade !== 'all' && !profile.unidade?.includes(selectedUnidade)) {
        return false;
      }

      // Filter by area
      if (selectedArea !== 'all' && !profile.temasInteresse?.includes(selectedArea)) {
        return false;
      }

      // Filter by status
      if (selectedStatus === 'active' && profile.isActive === false) {
        return false;
      }
      if (selectedStatus === 'inactive' && profile.isActive !== false) {
        return false;
      }

      // Filter by photo
      if (selectedPhoto === 'with_photo' && !profile.fotoUrl) {
        return false;
      }
      if (selectedPhoto === 'without_photo' && profile.fotoUrl) {
        return false;
      }

      // Filter by profile completeness
      if (selectedComplete === 'complete') {
        const isComplete = profile.biografia && 
                          profile.cargo?.length > 0 && 
                          profile.unidade?.length > 0 &&
                          profile.formacaoAcademica?.length > 0;
        if (!isComplete) return false;
      }
      if (selectedComplete === 'incomplete') {
        const isComplete = profile.biografia && 
                          profile.cargo?.length > 0 && 
                          profile.unidade?.length > 0 &&
                          profile.formacaoAcademica?.length > 0;
        if (isComplete) return false;
      }

      // Filter by recent updates (last 30 days)
      if (selectedRecent === 'recent') {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const lastUpdated = new Date(profile.lastUpdated);
        if (lastUpdated < thirtyDaysAgo) return false;
      }
      if (selectedRecent === 'old') {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const lastUpdated = new Date(profile.lastUpdated);
        if (lastUpdated >= thirtyDaysAgo) return false;
      }

      return true;
    });
  };

  const handleGenerateDetailedReport = () => {
    const filteredProfiles = getFilteredProfiles();
    if (filteredProfiles.length === 0) {
      alert('Nenhum perfil encontrado com os filtros selecionados.');
      return;
    }
    generateDetailedReport(filteredProfiles);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="w-5 h-5" />
          <span>Relatórios Personalizados</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Filtrar por cargo</label>
              <Select value={selectedCargo} onValueChange={setSelectedCargo}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os cargos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {allCargos.map(cargo => (
                    <SelectItem key={cargo} value={cargo}>{cargo}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Filtrar por unidade</label>
              <Select value={selectedUnidade} onValueChange={setSelectedUnidade}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas as unidades" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {allUnidades.map(unidade => (
                    <SelectItem key={unidade} value={unidade}>{unidade}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Área de conhecimento</label>
              <Select value={selectedArea} onValueChange={setSelectedArea}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas as áreas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {allAreas.map(area => (
                    <SelectItem key={area} value={area}>{area}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="active">Ativos</SelectItem>
                  <SelectItem value="inactive">Inativos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Possui foto</label>
              <Select value={selectedPhoto} onValueChange={setSelectedPhoto}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="with_photo">Com foto</SelectItem>
                  <SelectItem value="without_photo">Sem foto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Perfil completo</label>
              <Select value={selectedComplete} onValueChange={setSelectedComplete}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="complete">Completos</SelectItem>
                  <SelectItem value="incomplete">Incompletos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Atualizado nos últimos 30 dias</label>
              <Select value={selectedRecent} onValueChange={setSelectedRecent}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="recent">Atualizados</SelectItem>
                  <SelectItem value="old">Não atualizados</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>Perfis encontrados:</strong> {getFilteredProfiles().length} de {profiles.length}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button 
              onClick={handleGenerateDetailedReport}
              className="bg-red-900 hover:bg-red-800"
            >
              <Download className="w-4 h-4 mr-2" />
              Gerar Relatório Detalhado (PDF)
            </Button>
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Exportar Excel
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportsTab;
