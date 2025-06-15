
import React, { useState, useMemo } from 'react';
import { useProfiles } from '../hooks/useProfiles';
import ProfileCard from '../components/ProfileCard';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Search, Users, Loader2, AlertCircle } from 'lucide-react';

const Home: React.FC = () => {
  const { profiles, loading, error } = useProfiles();
  const [searchTerm, setSearchTerm] = useState('');

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

      return matchesSearch;
    });
  }, [profiles, searchTerm]);

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

      {/* Search Only */}
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
            Tente ajustar os termos de busca utilizados
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Limpar busca
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
