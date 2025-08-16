import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  cargoFilter: string;
  setCargoFilter: (value: string) => void;
  unidadeFilter: string;
  setUnidadeFilter: (value: string) => void;
  matriculaFilter: string;
  setMatriculaFilter: (value: string) => void;
  areaInteresseFilter: string;
  setAreaInteresseFilter: (value: string) => void;
}

export const SearchFiltersComponent: React.FC<SearchFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  cargoFilter,
  setCargoFilter,
  unidadeFilter,
  setUnidadeFilter,
  matriculaFilter,
  setMatriculaFilter,
  areaInteresseFilter,
  setAreaInteresseFilter,
}) => {
  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        {/* Busca livre */}
        <div>
          <Label>Busca livre</Label>
          <Input
            placeholder="Digite nome, email, matrícula, cargo, unidade ou área de interesse (use 'e' ou 'ou')"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Cargo */}
        <div>
          <Label>Cargo</Label>
          <Input
            placeholder="Filtrar por cargo"
            value={cargoFilter}
            onChange={(e) => setCargoFilter(e.target.value)}
          />
        </div>

        {/* Unidade */}
        <div>
          <Label>Unidade</Label>
          <Input
            placeholder="Filtrar por unidade"
            value={unidadeFilter}
            onChange={(e) => setUnidadeFilter(e.target.value)}
          />
        </div>

        {/* Matrícula */}
        <div>
          <Label>Matrícula</Label>
          <Input
            placeholder="Filtrar por matrícula"
            value={matriculaFilter}
            onChange={(e) => setMatriculaFilter(e.target.value)}
          />
        </div>

        {/* Área de Interesse */}
        <div>
          <Label>Área de interesse</Label>
          <Input
            placeholder="Filtrar por áreas de interesse"
            value={areaInteresseFilter}
            onChange={(e) => setAreaInteresseFilter(e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
};
