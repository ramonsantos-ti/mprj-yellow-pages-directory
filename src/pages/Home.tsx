
import React, { useState, useMemo } from 'react';
import { useProfiles } from '../hooks/useProfiles';
import ProfileCard from '../components/ProfileCard';
import SearchFilters from '../components/SearchFilters';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
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
        profile.especializacoes.toLowerCase().includes(searchTerm.toLowerCase());

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

      <SearchFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedAreas={selectedAreas}
        setSelectedAreas={setSelectedAreas}
        selectedCargos={selectedCargos}
        setSelectedCargos={setSelectedCargos}
        selectedUnidades={selectedUnidades}
        setSelectedUnidades={setSelectedUnidades}
        allAreas={allAreas}
        allCargos={allCargos}
        allUnidades={allUnidades}
      />

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
