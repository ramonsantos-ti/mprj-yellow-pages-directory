import React, { useState, useMemo } from 'react';
import { useProfiles } from '../hooks/useProfiles';
import ProfileCard from '../components/ProfileCard';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Search, Users, Loader2, AlertCircle } from 'lucide-react';

const Home: React.FC = () => {
  const { profiles, loading, error } = useProfiles();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectedCargos, setSelectedCargos] = useState<string[]>([]);
  const [selectedUnidades, setSelectedUnidades] = useState<string[]>([]);

  const filteredProfiles = useMemo(() => {
    return profiles.filter(profile => {
      const matchesSearch = !searchTerm || 
        profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.matricula.includes(searchTerm) ||
        profile.areasConhecimento.some(area => 
          area.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        (profile.especializacoes && profile.especializacoes.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesAreas = selectedAreas.length === 0 || 
        selectedAreas.some(area => profile.areasConhecimento.includes(area));

      const matchesCargos = selectedCargos.length === 0 || 
        selectedCargos.some(cargo => profile.cargo.includes(cargo));

      const matchesUnidades = selectedUnidades.length === 0 || 
        selectedUnidades.some(unidade => profile.unidade.includes(unidade));

      return matchesSearch && matchesAreas && matchesCargos && matchesUnidades;
    });
  }, [profiles, searchTerm, selectedAreas, selectedCargos, selectedUnidades]);

  // Get unique values for filters
  const allAreas = [...new Set(profiles.flatMap(p => p.areasConhecimento))];
  const allCargos = [...new Set(profiles.flatMap(p => p.cargo))];
  const allUnidades = [...new Set(profiles.flatMap(p => p.unidade))];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin text-red-600" />
          <p className="text-gray-600">Carregando perfis...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertCircle className="w-8 h-8 mx-auto mb-4 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Erro ao carregar perfis</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Tentar novamente
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        {/* Logo Secundária */}
        <div className="flex justify-center mb-6">
          <img 
            src="/lovable-uploads/2aae1185-7d52-453a-942a-1ef1876196b1.jpg" 
            alt="MPRJ Logo Secundária" 
            className="h-40 w-auto"
          />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900">
          Sistema de Especialistas
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Encontre especialistas do MPRJ por área de conhecimento, cargo ou unidade de trabalho
        </p>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <Users className="w-4 h-4" />
          <span>{profiles.length} especialistas cadastrados</span>
          <span>•</span>
          <span>{filteredProfiles.length} encontrados</span>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nome, email, matrícula ou área de conhecimento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Filter badges */}
            <div className="space-y-3">
              {allAreas.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Áreas de Conhecimento:</h4>
                  <div className="flex flex-wrap gap-2">
                    {allAreas.slice(0, 10).map((area) => (
                      <Badge
                        key={area}
                        variant={selectedAreas.includes(area) ? "default" : "outline"}
                        className={`cursor-pointer ${selectedAreas.includes(area) ? 'bg-red-600' : ''}`}
                        onClick={() => {
                          setSelectedAreas(prev => 
                            prev.includes(area) 
                              ? prev.filter(a => a !== area)
                              : [...prev, area]
                          );
                        }}
                      >
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {allCargos.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Cargos:</h4>
                  <div className="flex flex-wrap gap-2">
                    {allCargos.slice(0, 10).map((cargo) => (
                      <Badge
                        key={cargo}
                        variant={selectedCargos.includes(cargo) ? "default" : "outline"}
                        className={`cursor-pointer ${selectedCargos.includes(cargo) ? 'bg-red-600' : ''}`}
                        onClick={() => {
                          setSelectedCargos(prev => 
                            prev.includes(cargo) 
                              ? prev.filter(c => c !== cargo)
                              : [...prev, cargo]
                          );
                        }}
                      >
                        {cargo}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {allUnidades.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Unidades:</h4>
                  <div className="flex flex-wrap gap-2">
                    {allUnidades.slice(0, 10).map((unidade) => (
                      <Badge
                        key={unidade}
                        variant={selectedUnidades.includes(unidade) ? "default" : "outline"}
                        className={`cursor-pointer ${selectedUnidades.includes(unidade) ? 'bg-red-600' : ''}`}
                        onClick={() => {
                          setSelectedUnidades(prev => 
                            prev.includes(unidade) 
                              ? prev.filter(u => u !== unidade)
                              : [...prev, unidade]
                          );
                        }}
                      >
                        {unidade}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {filteredProfiles.length === 0 ? (
        <div className="text-center py-12">
          <Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Nenhum especialista encontrado
          </h3>
          <p className="text-gray-600 mb-4">
            Tente ajustar os filtros de busca ou termos utilizados
          </p>
          {(searchTerm || selectedAreas.length > 0 || selectedCargos.length > 0 || selectedUnidades.length > 0) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedAreas([]);
                setSelectedCargos([]);
                setSelectedUnidades([]);
              }}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Limpar filtros
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProfiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
