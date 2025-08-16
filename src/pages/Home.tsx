import React, { useState, useMemo, useEffect } from 'react';
import { useProfiles } from '../hooks/useProfiles';
import ProfileCard from '../components/ProfileCard';
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

// Função auxiliar para aplicar os conectivos "e" / "ou"
const parseSearch = (term: string) => {
  if (!term) return [];
  const lower = term.toLowerCase();

  if (lower.includes(" ou ")) {
    return { type: "or", terms: lower.split(" ou ").map(t => t.trim()).filter(Boolean) };
  }
  if (lower.includes(" e ")) {
    return { type: "and", terms: lower.split(" e ").map(t => t.trim()).filter(Boolean) };
  }
  return { type: "or", terms: [lower] }; // padrão é OR com 1 termo
};

const Home: React.FC = () => {
  const { profiles, loading, error } = useProfiles();

  const [searchTerm, setSearchTerm] = useState('');

  // Filtros avançados
  const [cargoFilter, setCargoFilter] = useState('');
  const [unidadeFilter, setUnidadeFilter] = useState('');
  const [matriculaFilter, setMatriculaFilter] = useState('');
  const [areaInteresseFilter, setAreaInteresseFilter] = useState('');

  const filteredProfiles = useMemo(() => {
    const parsed = parseSearch(searchTerm);

    return profiles.filter(profile => {
      // ---- Busca no campo principal (com "e" e "ou") ----
      const searchMatch = parsed.terms.length === 0
        ? true
        : parsed.type === "or"
          ? parsed.terms.some(term =>
              profile.name.toLowerCase().includes(term) ||
              profile.email.toLowerCase().includes(term) ||
              profile.matricula.toLowerCase().includes(term) ||
              profile.cargo?.toLowerCase().includes(term) ||
              profile.unidade?.toLowerCase().includes(term) ||
              profile.temasInteresse?.some(area =>
                area.toLowerCase().includes(term)
              )
            )
          : parsed.terms.every(term =>
              profile.name.toLowerCase().includes(term) ||
              profile.email.toLowerCase().includes(term) ||
              profile.matricula.toLowerCase().includes(term) ||
              profile.cargo?.toLowerCase().includes(term) ||
              profile.unidade?.toLowerCase().includes(term) ||
              profile.temasInteresse?.some(area =>
                area.toLowerCase().includes(term)
              )
            );

      // ---- Filtros individuais ----
      const cargoMatch = !cargoFilter || profile.cargo?.toLowerCase().includes(cargoFilter.toLowerCase());
      const unidadeMatch = !unidadeFilter || profile.unidade?.toLowerCase().includes(unidadeFilter.toLowerCase());
      const matriculaMatch = !matriculaFilter || profile.matricula.toLowerCase().includes(matriculaFilter.toLowerCase());
      const areaMatch = !areaInteresseFilter || profile.temasInteresse?.some(area =>
        area.toLowerCase().includes(areaInteresseFilter.toLowerCase())
      );

      return searchMatch && cargoMatch && unidadeMatch && matriculaMatch && areaMatch;
    });
  }, [profiles, searchTerm, cargoFilter, unidadeFilter, matriculaFilter, areaInteresseFilter]);

  // Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(filteredProfiles.length / pageSize));

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, cargoFilter, unidadeFilter, matriculaFilter, areaInteresseFilter]);

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
      {/* Header */}
      <div className="text-center space-y-4 bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-center mb-6">
          <img
            src="/lovable-uploads/2aae1185-7d52-453a-942a-1ef1876196b1.jpg"
            alt="MPRJ Logo Secundária"
            className="h-40 w-auto rounded-xl border border-gray-200 shadow-sm"
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

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          {/* Busca principal */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por nome, email, matrícula, cargo, unidade ou interesse (use 'e' / 'ou')"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filtros adicionais */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Input
              placeholder="Filtrar por Cargo"
              value={cargoFilter}
              onChange={(e) => setCargoFilter(e.target.value)}
            />
            <Input
              placeholder="Filtrar por Unidade"
              value={unidadeFilter}
              onChange={(e) => setUnidadeFilter(e.target.value)}
            />
            <Input
              placeholder="Filtrar por Matrícula"
              value={matriculaFilter}
              onChange={(e) => setMatriculaFilter(e.target.value)}
            />
            <Input
              placeholder="Filtrar por Área de Interesse"
              value={areaInteresseFilter}
              onChange={(e) => setAreaInteresseFilter(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista de resultados */}
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paginatedProfiles.map(profile => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
          {/* Paginação */}
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
  );
};

export default Home;
