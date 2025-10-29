import React, { useState, useMemo, useEffect } from 'react';
import { useProfiles } from '../hooks/useProfiles';
import ProfileCard from '../components/ProfileCard';
import TopProfilesRanking from '../components/TopProfilesRanking';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Search, Users, Loader2, AlertCircle, ChevronsLeft, ChevronsRight } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '../components/ui/pagination';

const Home: React.FC = () => {
  const { profiles, loading, error } = useProfiles();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProfiles = useMemo(() => {
    return profiles.filter(profile => {
      const matchesSearch =
        !searchTerm ||
        profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.matricula.includes(searchTerm) ||
        profile.temasInteresse.some(area =>
          area.toLowerCase().includes(searchTerm.toLowerCase())
        );
      return matchesSearch;
    });
  }, [profiles, searchTerm]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(filteredProfiles.length / pageSize));

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages]);

  const handlePageChange = (page: number) => {
    const next = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(next);
  };

  const paginatedProfiles = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProfiles.slice(start, start + pageSize);
  }, [filteredProfiles, currentPage]);

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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Erro ao carregar perfis
              </h3>
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
      <div className="text-center space-y-3 bg-white rounded-xl shadow-md p-5">
        <div className="flex justify-center mb-4">
          <img
            src="/lovable-uploads/2aae1185-7d52-453a-942a-1ef1876196b1.jpg"
            alt="MPRJ Logo Secundária"
            className="h-32 w-auto rounded-xl border border-gray-200 shadow-sm"
          />
        </div>

        <h1 className="text-3xl font-bold text-gray-900">
          Sistema de Especialistas
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Encontre especialistas do MPRJ por área de conhecimento, cargo ou unidade de trabalho
        </p>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <Users className="w-4 h-4" />
          <span>{profiles.length} especialistas cadastrados</span>
          <span>•</span>
          <span>{filteredProfiles.length} encontrados</span>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nome, email, matrícula ou tema de interesse..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-6">
        <div className="flex-1 min-w-0">
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
            <>
              <div className="grid gap-6 grid-cols-1">
                {paginatedProfiles.map(profile => (
                  <ProfileCard key={profile.id} profile={profile} />
                ))}
              </div>
              <Pagination className="mt-4">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      size="default"
                      className="gap-1 pl-2.5"
                      onClick={e => {
                        e.preventDefault();
                        handlePageChange(1);
                      }}
                    >
                      <ChevronsLeft className="h-4 w-4" />
                      <span>Primeira página</span>
                    </PaginationLink>
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={e => {
                        e.preventDefault();
                        handlePageChange(currentPage - 1);
                      }}
                    />
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === 1}
                      onClick={e => {
                        e.preventDefault();
                        handlePageChange(1);
                      }}
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>

                  {currentPage > 3 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  {Array.from({ length: 3 }, (_, i) => currentPage - 1 + i).map(page =>
                    page > 1 && page < totalPages ? (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          isActive={currentPage === page}
                          onClick={e => {
                            e.preventDefault();
                            handlePageChange(page);
                          }}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ) : null
                  )}

                  {currentPage < totalPages - 2 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  {totalPages > 1 && (
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        isActive={currentPage === totalPages}
                        onClick={e => {
                          e.preventDefault();
                          handlePageChange(totalPages);
                        }}
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={e => {
                        e.preventDefault();
                        handlePageChange(currentPage + 1);
                      }}
                    />
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      size="default"
                      className="gap-1 pr-2.5"
                      onClick={e => {
                        e.preventDefault();
                        handlePageChange(totalPages);
                      }}
                    >
                      <span>Última página</span>
                      <ChevronsRight className="h-4 w-4" />
                    </PaginationLink>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </>
          )}
        </div>

        <div className="hidden lg:block w-80 flex-shrink-0">
          <TopProfilesRanking />
        </div>
      </div>
    </div>
  );
};

export default Home;
