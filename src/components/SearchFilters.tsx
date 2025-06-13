
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { SearchFilters as SearchFiltersType } from '../types';
import { 
  CARGOS,
  FUNCOES,
  UNIDADES,
  AREAS_JURIDICAS,
  AREAS_ADMINISTRATIVAS,
  HABILIDADES_TECNICAS,
  NIVEIS_FORMACAO,
  IDIOMAS,
  DISPONIBILIDADE_ESTIMADA
} from '../data/constants';
import { Search, X } from 'lucide-react';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFiltersChange: (filters: SearchFiltersType) => void;
  onClearFilters: () => void;
}

const SearchFiltersComponent: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters
}) => {
  const handleFilterChange = (key: keyof SearchFiltersType, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value || undefined
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value && value.length > 0);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center space-x-2">
          <Search className="w-5 h-5" />
          <span>Filtros de Busca</span>
        </CardTitle>
        {hasActiveFilters && (
          <Button variant="outline" size="sm" onClick={onClearFilters}>
            <X className="w-4 h-4 mr-2" />
            Limpar Filtros
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Cargo</label>
            <Select value={filters.cargo || ''} onValueChange={(value) => handleFilterChange('cargo', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um cargo" />
              </SelectTrigger>
              <SelectContent>
                {CARGOS.map((cargo) => (
                  <SelectItem key={cargo} value={cargo}>
                    {cargo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Função</label>
            <Select value={filters.funcao || ''} onValueChange={(value) => handleFilterChange('funcao', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma função" />
              </SelectTrigger>
              <SelectContent>
                {FUNCOES.map((funcao) => (
                  <SelectItem key={funcao} value={funcao}>
                    {funcao}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Unidade</label>
            <Select value={filters.unidade || ''} onValueChange={(value) => handleFilterChange('unidade', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma unidade" />
              </SelectTrigger>
              <SelectContent>
                {UNIDADES.map((unidade) => (
                  <SelectItem key={unidade} value={unidade}>
                    {unidade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Área de Conhecimento</label>
            <Select value={filters.areaConhecimento || ''} onValueChange={(value) => handleFilterChange('areaConhecimento', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma área" />
              </SelectTrigger>
              <SelectContent>
                {[...AREAS_JURIDICAS, ...AREAS_ADMINISTRATIVAS].map((area) => (
                  <SelectItem key={area} value={area}>
                    {area}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Habilidade Técnica</label>
            <Select value={filters.habilidadeTecnica || ''} onValueChange={(value) => handleFilterChange('habilidadeTecnica', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma habilidade" />
              </SelectTrigger>
              <SelectContent>
                {HABILIDADES_TECNICAS.map((habilidade) => (
                  <SelectItem key={habilidade} value={habilidade}>
                    {habilidade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Formação</label>
            <Select value={filters.formacao || ''} onValueChange={(value) => handleFilterChange('formacao', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma formação" />
              </SelectTrigger>
              <SelectContent>
                {NIVEIS_FORMACAO.map((nivel) => (
                  <SelectItem key={nivel} value={nivel}>
                    {nivel}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Idioma</label>
            <Select value={filters.idioma || ''} onValueChange={(value) => handleFilterChange('idioma', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um idioma" />
              </SelectTrigger>
              <SelectContent>
                {IDIOMAS.map((idioma) => (
                  <SelectItem key={idioma} value={idioma}>
                    {idioma}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Disponibilidade</label>
            <Select value={filters.disponibilidade || ''} onValueChange={(value) => handleFilterChange('disponibilidade', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione disponibilidade" />
              </SelectTrigger>
              <SelectContent>
                {DISPONIBILIDADE_ESTIMADA.map((disp) => (
                  <SelectItem key={disp} value={disp}>
                    {disp}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchFiltersComponent;
