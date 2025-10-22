import { Profile } from '../types';

// Escala hierárquica de níveis de formação
export enum EducationLevel {
  FUNDAMENTAL = 1,
  MEDIO = 2,
  SUPERIOR = 3,
  POS_GRADUACAO = 4,
  MESTRADO = 5,
  DOUTORADO = 6,
  POS_DOUTORADO = 7,
}

// Mapeamento de labels para exibição
export const EDUCATION_LEVEL_LABELS: Record<EducationLevel, string> = {
  [EducationLevel.FUNDAMENTAL]: 'Fundamental',
  [EducationLevel.MEDIO]: 'Médio',
  [EducationLevel.SUPERIOR]: 'Graduação',
  [EducationLevel.POS_GRADUACAO]: 'Especialização',
  [EducationLevel.MESTRADO]: 'Mestrado',
  [EducationLevel.DOUTORADO]: 'Doutorado',
  [EducationLevel.POS_DOUTORADO]: 'Pós-Doutorado',
};

/**
 * Determina o nível de formação acadêmica baseado em uma string
 * @param nivel String contendo o nível de formação
 * @returns O enum EducationLevel correspondente
 */
export function parseEducationLevel(nivel: string): EducationLevel {
  const lowerNivel = nivel.toLowerCase();
  
  // Pós-Doutorado (mais alto)
  if (lowerNivel.includes('pós-doutorado') || lowerNivel.includes('pos-doutorado') || 
      lowerNivel.includes('pós doutorado') || lowerNivel.includes('postdoctoral')) {
    return EducationLevel.POS_DOUTORADO;
  }
  
  // Doutorado
  if (lowerNivel.includes('doutorado') || lowerNivel.includes('phd') || 
      lowerNivel.includes('ph.d') || lowerNivel.includes('doctorate')) {
    return EducationLevel.DOUTORADO;
  }
  
  // Mestrado
  if (lowerNivel.includes('mestrado') || lowerNivel.includes('master') || 
      lowerNivel.includes('msc') || lowerNivel.includes('m.sc')) {
    return EducationLevel.MESTRADO;
  }
  
  // Pós-graduação/MBA/Especialização
  if (lowerNivel.includes('pós-graduação') || lowerNivel.includes('pos-graduacao') ||
      lowerNivel.includes('pós graduação') || lowerNivel.includes('especialização') || 
      lowerNivel.includes('especializacao') || lowerNivel.includes('mba') ||
      lowerNivel.includes('lato sensu')) {
    return EducationLevel.POS_GRADUACAO;
  }
  
  // Graduação/Superior
  if (lowerNivel.includes('graduação') || lowerNivel.includes('graduacao') ||
      lowerNivel.includes('bacharelado') || lowerNivel.includes('licenciatura') ||
      lowerNivel.includes('superior') || lowerNivel.includes('bachelor')) {
    return EducationLevel.SUPERIOR;
  }
  
  // Médio
  if (lowerNivel.includes('médio') || lowerNivel.includes('medio') ||
      lowerNivel.includes('ensino médio') || lowerNivel.includes('high school') ||
      lowerNivel.includes('secundário') || lowerNivel.includes('secundario')) {
    return EducationLevel.MEDIO;
  }
  
  // Fundamental
  if (lowerNivel.includes('fundamental') || lowerNivel.includes('elementary') ||
      lowerNivel.includes('primário') || lowerNivel.includes('primario')) {
    return EducationLevel.FUNDAMENTAL;
  }
  
  // Padrão: considera como graduação se não identificar
  return EducationLevel.SUPERIOR;
}

/**
 * Obtém o maior nível de formação acadêmica de um perfil
 * Conta apenas a formação mais alta para evitar duplicidade
 * @param profile Perfil do profissional
 * @returns O nível mais alto de formação ou null se não houver formações
 */
export function getHighestEducationLevel(profile: Profile): EducationLevel | null {
  if (!profile.formacaoAcademica || profile.formacaoAcademica.length === 0) {
    return null;
  }
  
  const levels = profile.formacaoAcademica.map(f => parseEducationLevel(f.nivel));
  return Math.max(...levels) as EducationLevel;
}

/**
 * Conta profissionais por nível de formação, considerando apenas a maior formação de cada um
 * @param profiles Lista de perfis
 * @returns Objeto com contagem por nível de formação
 */
export function countProfilesByHighestEducation(profiles: Profile[]): Record<string, number> {
  const counts: Record<string, number> = {};
  
  profiles.forEach(profile => {
    const highestLevel = getHighestEducationLevel(profile);
    
    if (highestLevel !== null) {
      const label = EDUCATION_LEVEL_LABELS[highestLevel];
      counts[label] = (counts[label] || 0) + 1;
    }
  });
  
  return counts;
}
