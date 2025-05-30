
import React, { useState, useMemo } from 'react';
import { mockProfiles } from '../data/mockData';
import { Profile, SearchFilters } from '../types';
import ProfileCard from '../components/ProfileCard';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { Search, Filter, Download, X, Users } from 'lucide-react';
import { AREAS_JURIDICAS, AREAS_ADMINISTRATIVAS, CARGOS, UNIDADES, HABILIDADES_TECNICAS, IDIOMAS } from '../data/constants';
import { generateProfileReport } from '../utils/pdfReports';

const PROFILES_PER_PAGE = 6;

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [exportCount, setExportCount] = useState<number | 'all'>('all');
  const [includeFilters, setIncludeFilters] = useState(true);

  // Ordenar perfis por data de atualização (mais recente primeiro)
  const sortedProfiles = useMemo(() => {
    return [...mockProfiles].sort((a, b) => 
      new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    );
  }, []);

  // Filtrar perfis
  const filteredProfiles = useMemo(() => {
    return sortedProfiles.filter(profile => {
      // Busca por termo livre
      const matchesSearch = !searchTerm || 
        profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.areasConhecimento.some(area => 
          area.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        profile.habilidadesTecnicas.some(skill => 
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        profile.biografia?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.especializacoes?.toLowerCase().includes(searchTerm.toLowerCase());

      // Filtros específicos
      const matchesCargo = !filters.cargo || 
        profile.cargo.some(cargo => cargo === filters.cargo);
      
      const matchesUnidade = !filters.unidade || 
        profile.unidade.some(unidade => unidade === filters.unidade);
      
      const matchesArea = !filters.areaConhecimento || 
        profile.areasConhecimento.includes(filters.areaConhecimento);
      
      const matchesHabilidade = !filters.habilidadeTecnica || 
        profile.habilidadesTecnicas.includes(filters.habilidadeTecnica);
      
      const matchesIdioma = !filters.idioma || 
        profile.idiomas.includes(filters.idioma);

      return matchesSearch && matchesCargo && matchesUnidade && 
             matchesArea && matchesHabilidade && matchesIdioma;
    });
  }, [sortedProfiles, searchTerm, filters]);

  // Paginação
  const totalPages = Math.ceil(filteredProfiles.length / PROFILES_PER_PAGE);
  const startIndex = (currentPage - 1) * PROFILES_PER_PAGE;
  const paginatedProfiles = filteredProfiles.slice(startIndex, startIndex + PROFILES_PER_PAGE);

  // Reset página quando filtros mudam
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleExport = () => {
    const profilesToExport = exportCount === 'all' 
      ? filteredProfiles 
      : filteredProfiles.slice(0, Number(exportCount));
    
    // Generate PDF report with filtered profiles
    generateProfileReport(profilesToExport, 'geral');
    setIsExportOpen(false);
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Páginas Amarelas do MPRJ
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Encontre especialistas e colaboradores em diversas áreas do conhecimento 
          no Ministério Público do Estado do Rio de Janeiro
        </p>
      </div>

      {/* Busca e Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="w-5 h-5" />
            <span>Buscar Especialistas</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Barra de busca */}
          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Busque por nome, área de conhecimento, habilidades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span>Filtros</span>
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Filtros de Busca</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Cargo</label>
                    <Select
                      value={filters.cargo || ''}
                      onValueChange={(value) => 
                        setFilters(prev => ({ ...prev, cargo: value || undefined }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um cargo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Todos</SelectItem>
                        {CARGOS.map(cargo => (
                          <SelectItem key={cargo} value={cargo}>{cargo}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Unidade</label>
                    <Select
                      value={filters.unidade || ''}
                      onValueChange={(value) => 
                        setFilters(prev => ({ ...prev, unidade: value || undefined }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma unidade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Todas</SelectItem>
                        {UNIDADES.map(unidade => (
                          <SelectItem key={unidade} value={unidade}>{unidade}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Área de Conhecimento</label>
                    <Select
                      value={filters.areaConhecimento || ''}
                      onValueChange={(value) => 
                        setFilters(prev => ({ ...prev, areaConhecimento: value || undefined }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma área" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Todas</SelectItem>
                        {[...AREAS_JURIDICAS, ...AREAS_ADMINISTRATIVAS].map(area => (
                          <SelectItem key={area} value={area}>{area}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Habilidade Técnica</label>
                    <Select
                      value={filters.habilidadeTecnica || ''}
                      onValueChange={(value) => 
                        setFilters(prev => ({ ...prev, habilidadeTecnica: value || undefined }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma habilidade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Todas</SelectItem>
                        {HABILIDADES_TECNICAS.map(habilidade => (
                          <SelectItem key={habilidade} value={habilidade}>{habilidade}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Idioma</label>
                    <Select
                      value={filters.idioma || ''}
                      onValueChange={(value) => 
                        setFilters(prev => ({ ...prev, idioma: value || undefined }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um idioma" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Todos</SelectItem>
                        {IDIOMAS.map(idioma => (
                          <SelectItem key={idioma} value={idioma}>{idioma}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={clearFilters}>
                    Limpar Filtros
                  </Button>
                  <Button onClick={() => setIsFilterOpen(false)}>
                    Aplicar Filtros
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isExportOpen} onOpenChange={setIsExportOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center space-x-2">
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
                    <Select
                      value={exportCount.toString()}
                      onValueChange={(value) => 
                        setExportCount(value === 'all' ? 'all' : Number(value))
                      }
                    >
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
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="includeFilters"
                      checked={includeFilters}
                      onChange={(e) => setIncludeFilters(e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor="includeFilters" className="text-sm">
                      Incluir informações sobre filtros aplicados
                    </label>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsExportOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleExport}>
                    Exportar Excel
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Filtros ativos */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-600">Filtros ativos:</span>
              {Object.entries(filters).map(([key, value]) => 
                value && (
                  <Badge key={key} variant="secondary" className="flex items-center space-x-1">
                    <span>{value}</span>
                    <X 
                      className="w-3 h-3 cursor-pointer" 
                      onClick={() => setFilters(prev => ({ ...prev, [key]: undefined }))}
                    />
                  </Badge>
                )
              )}
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Limpar todos
              </Button>
            </div>
          )}
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
            Tente ajustar os filtros ou termos de busca
          </p>
          <Button variant="outline" onClick={clearFilters}>
            Limpar filtros
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
                className={page === currentPage ? "bg-amber-900 hover:bg-amber-800" : ""}
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
