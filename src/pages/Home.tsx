
import React, { useState, useMemo, useEffect } from 'react';
import { mockProfiles } from '../data/mockData';
import { Profile } from '../types';
import ProfileCard from '../components/ProfileCard';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Search, Download, Users } from 'lucide-react';
import { generateProfileReport } from '../utils/pdfReports';

const PROFILES_PER_PAGE = 6;

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [exportCount, setExportCount] = useState<number | 'all'>('all');
  const [profiles, setProfiles] = useState<Profile[]>([]);

  // Load profiles from localStorage or use mock data
  useEffect(() => {
    const savedProfiles = localStorage.getItem('mprj_profiles');
    if (savedProfiles) {
      setProfiles(JSON.parse(savedProfiles));
    } else {
      setProfiles(mockProfiles);
    }
  }, []);

  // Filtrar apenas perfis ativos e ordenar por data de atualização (mais recente primeiro)
  const activeProfiles = useMemo(() => {
    return profiles.filter(profile => profile.isActive !== false);
  }, [profiles]);

  const sortedProfiles = useMemo(() => {
    return [...activeProfiles].sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
  }, [activeProfiles]);

  // Filtrar perfis apenas por termo de busca
  const filteredProfiles = useMemo(() => {
    return sortedProfiles.filter(profile => {
      if (!searchTerm) return true;
      const searchLower = searchTerm.toLowerCase();
      return profile.name.toLowerCase().includes(searchLower) || 
             profile.areasConhecimento.some(area => area.toLowerCase().includes(searchLower)) || 
             profile.biografia?.toLowerCase().includes(searchLower) || 
             profile.especializacoes?.toLowerCase().includes(searchLower);
    });
  }, [sortedProfiles, searchTerm]);

  // Paginação
  const totalPages = Math.ceil(filteredProfiles.length / PROFILES_PER_PAGE);
  const startIndex = (currentPage - 1) * PROFILES_PER_PAGE;
  const paginatedProfiles = filteredProfiles.slice(startIndex, startIndex + PROFILES_PER_PAGE);

  // Reset página quando busca muda
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const clearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleExport = () => {
    const profilesToExport = exportCount === 'all' ? filteredProfiles : filteredProfiles.slice(0, Number(exportCount));
    generateProfileReport(profilesToExport, 'geral');
    setIsExportOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center mb-4">
          <img 
            src="/lovable-uploads/58d2655c-30b5-4f5f-9d74-c9e6c62b7b21.png" 
            alt="Páginas Amarelas do MPRJ" 
            className="h-40 w-auto"
          />
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Encontre especialistas e colaboradores em diversas áreas do conhecimento 
          no Ministério Público do Estado do Rio de Janeiro
        </p>
      </div>

      {/* Busca */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="w-5 h-5" />
            <span>Buscar Especialistas</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Busque por nome, área de interesse..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Dialog open={isExportOpen} onOpenChange={setIsExportOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center space-x-2 font-normal">
                  <Download className="w-4 h-4" />
                  <span>Exportar</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Exportar Perfis</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Quantidade de perfis</label>
                    <Select value={exportCount.toString()} onValueChange={value => setExportCount(value === 'all' ? 'all' : Number(value))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos ({filteredProfiles.length})</SelectItem>
                        <SelectItem value="10">10 primeiros</SelectItem>
                        <SelectItem value="25">25 primeiros</SelectItem>
                        <SelectItem value="50">50 primeiros</SelectItem>
                        <SelectItem value="100">100 primeiros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsExportOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleExport}>
                    Exportar PDF
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Resultados */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-600">
            {filteredProfiles.length} especialista{filteredProfiles.length !== 1 ? 's' : ''} encontrado{filteredProfiles.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Grid de perfis */}
      {paginatedProfiles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProfiles.map(profile => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum especialista encontrado
          </h3>
          <p className="text-gray-600 mb-4">
            Tente ajustar os termos de busca
          </p>
          <Button variant="outline" onClick={clearSearch}>
            Limpar busca
          </Button>
        </div>
      )}

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <Button 
            variant="outline" 
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} 
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          
          <div className="flex space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <Button 
                key={page} 
                variant={page === currentPage ? "default" : "outline"} 
                size="sm" 
                onClick={() => setCurrentPage(page)}
                className={page === currentPage ? "bg-red-900 hover:bg-red-800" : ""}
              >
                {page}
              </Button>
            ))}
          </div>

          <Button 
            variant="outline" 
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} 
            disabled={currentPage === totalPages}
          >
            Próxima
          </Button>
        </div>
      )}
    </div>
  );
};

export default Home;
