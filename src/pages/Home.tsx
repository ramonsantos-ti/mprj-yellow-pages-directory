import React, { useState, useMemo } from "react";
import { SearchFiltersComponent } from "./SearchFiltersComponent";
import { Card, CardContent } from "@/components/ui/card";

interface Profile {
  name?: string;
  email?: string;
  matricula?: string;
  cargo?: string;
  unidade?: string;
  temasInteresse?: string[];
}

interface HomeProps {
  profiles: Profile[];
}

// Função para quebrar o termo de busca em "E" ou "OU"
const parseSearch = (term: string) => {
  const lower = (term || "").toLowerCase().trim();
  if (!lower) return { type: "or" as const, terms: [] };

  if (lower.includes(" ou ")) {
    return {
      type: "or" as const,
      terms: lower.split(" ou ").map((t) => t.trim()).filter(Boolean),
    };
  }
  if (lower.includes(" e ")) {
    return {
      type: "and" as const,
      terms: lower.split(" e ").map((t) => t.trim()).filter(Boolean),
    };
  }
  return { type: "or" as const, terms: [lower] };
};

export const Home: React.FC<HomeProps> = ({ profiles }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cargoFilter, setCargoFilter] = useState("");
  const [unidadeFilter, setUnidadeFilter] = useState("");
  const [matriculaFilter, setMatriculaFilter] = useState("");
  const [areaInteresseFilter, setAreaInteresseFilter] = useState("");

  const filteredProfiles = useMemo(() => {
    const safeProfiles = Array.isArray(profiles) ? profiles : [];
    const { type, terms } = parseSearch(searchTerm);

    return safeProfiles.filter((profile) => {
      // Normaliza campos (evita undefined)
      const name = (profile?.name || "").toLowerCase();
      const email = (profile?.email || "").toLowerCase();
      const matricula = (profile?.matricula || "").toLowerCase();
      const cargo = (profile?.cargo || "").toLowerCase();
      const unidade = (profile?.unidade || "").toLowerCase();
      const interesses: string[] = Array.isArray(profile?.temasInteresse)
        ? profile.temasInteresse
        : [];
      const interessesLower = interesses.map((a) => (a || "").toLowerCase());

      // 🔎 Busca principal (com conectivos)
      const searchMatch =
        terms.length === 0
          ? true
          : type === "or"
          ? terms.some(
              (term) =>
                name.includes(term) ||
                email.includes(term) ||
                matricula.includes(term) ||
                cargo.includes(term) ||
                unidade.includes(term) ||
                interessesLower.some((a) => a.includes(term))
            )
          : terms.every(
              (term) =>
                name.includes(term) ||
                email.includes(term) ||
                matricula.includes(term) ||
                cargo.includes(term) ||
                unidade.includes(term) ||
                interessesLower.some((a) => a.includes(term))
            );

      // Filtros individuais
      const cargoMatch = !cargoFilter || cargo.includes(cargoFilter.toLowerCase());
      const unidadeMatch = !unidadeFilter || unidade.includes(unidadeFilter.toLowerCase());
      const matriculaMatch = !matriculaFilter || matricula.includes(matriculaFilter.toLowerCase());
      const areaMatch =
        !areaInteresseFilter ||
        interessesLower.some((a) =>
          a.includes(areaInteresseFilter.toLowerCase())
        );

      return searchMatch && cargoMatch && unidadeMatch && matriculaMatch && areaMatch;
    });
  }, [profiles, searchTerm, cargoFilter, unidadeFilter, matriculaFilter, areaInteresseFilter]);

  return (
    <div className="grid grid-cols-4 gap-4">
      {/* Filtros */}
      <div className="col-span-1">
        <SearchFiltersComponent
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          cargoFilter={cargoFilter}
          setCargoFilter={setCargoFilter}
          unidadeFilter={unidadeFilter}
          setUnidadeFilter={setUnidadeFilter}
          matriculaFilter={matriculaFilter}
          setMatriculaFilter={setMatriculaFilter}
          areaInteresseFilter={areaInteresseFilter}
          setAreaInteresseFilter={setAreaInteresseFilter}
        />
      </div>

      {/* Resultados */}
      <div className="col-span-3 space-y-4">
        {filteredProfiles.map((profile, idx) => (
          <Card key={idx}>
            <CardContent className="p-4">
              <h3 className="font-bold">{profile.name}</h3>
              <p>Email: {profile.email}</p>
              <p>Matrícula: {profile.matricula}</p>
              <p>Cargo: {profile.cargo}</p>
              <p>Unidade: {profile.unidade}</p>
              <p>
                Áreas de interesse:{" "}
                {profile.temasInteresse?.join(", ") || "Não informado"}
              </p>
            </CardContent>
          </Card>
        ))}

        {filteredProfiles.length === 0 && (
          <p className="text-gray-500">Nenhum resultado encontrado.</p>
        )}
      </div>
    </div>
  );
};
