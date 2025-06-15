
// Helper function to filter and validate arrays
const filterAndValidate = (array: string[], arrayName: string) => {
  console.log(`Processing ${arrayName}:`, array);
  
  const filtered = array.filter(item => {
    // More strict validation
    if (item == null || item === undefined) {
      console.log(`Filtered out null/undefined in ${arrayName}:`, item);
      return false;
    }
    if (typeof item !== 'string') {
      console.log(`Filtered out non-string in ${arrayName}:`, item, typeof item);
      return false;
    }
    const trimmed = item.trim();
    if (trimmed === '' || trimmed.length === 0) {
      console.log(`Filtered out empty/whitespace in ${arrayName}:`, JSON.stringify(item));
      return false;
    }
    // Additional check for purely whitespace strings
    if (!/\S/.test(trimmed)) {
      console.log(`Filtered out whitespace-only in ${arrayName}:`, JSON.stringify(item));
      return false;
    }
    return true;
  }).map(item => item.trim()); // Ensure all items are trimmed
  
  console.log(`${arrayName} final result:`, filtered);
  
  // Final validation - double check no empty strings made it through
  const finalFiltered = filtered.filter(item => item && item.length > 0 && /\S/.test(item));
  
  if (finalFiltered.length !== filtered.length) {
    console.error(`WARNING: ${arrayName} had additional empty values removed in final filter!`);
  }
  
  return finalFiltered;
};

const rawIdiomas = [
  'Português',
  'Inglês',
  'Espanhol',
  'Francês',
  'Alemão',
  'Italiano',
  'Chinês',
  'Japonês',
  'Russo',
  'Árabe',
  'Coreano',
  'Hindi',
  'Holandês',
  'Sueco',
  'Norueguês',
  'Dinamarquês',
  'Finlandês',
  'Polaco',
  'Tcheco',
  'Húngaro',
  'Grego',
  'Turco',
  'Hebraico',
  'Tailandês',
  'Vietnamita'
];

const rawNiveisFormacao = [
  'Ensino Fundamental',
  'Ensino Médio',
  'Tecnólogo',
  'Graduação',
  'Especialização',
  'MBA',
  'Mestrado',
  'Doutorado',
  'Pós-Doutorado'
];

const rawTiposColaboracao = [
  'Consultoria interna',
  'Formação de equipes',
  'Capacitações/tutoria',
  'Grupos de trabalho',
  'Mentoria',
  'Coaching',
  'Grupo de trabalho',
  'Grupo de atuação'
];

const rawDisponibilidadeEstimada = [
  'Até 1h/semana',
  'Até 2h/semana',
  'Até 3h/semana',
  'Até 4h/semana'
];

const rawFormasContato = [
  'E-mail',
  'Telefone',
  'Microsoft Teams',
  'WhatsApp',
  'Presencial'
];

// New constants for certifications
const rawCertificacoes = [
  'PMP (Project Management Professional)',
  'ITIL (Information Technology Infrastructure Library)',
  'ISO 9001 (Sistema de Gestão da Qualidade)',
  'ISO 27001 (Sistema de Gestão de Segurança da Informação)',
  'COBIT (Control Objectives for Information and Related Technologies)',
  'Six Sigma',
  'Scrum Master',
  'Product Owner',
  'CISSP (Certified Information Systems Security Professional)',
  'CISA (Certified Information Systems Auditor)',
  'CGEIT (Certified in the Governance of Enterprise IT)',
  'CRISC (Certified in Risk and Information Systems Control)',
  'CompTIA Security+',
  'AWS Certified Solutions Architect',
  'Microsoft Azure Fundamentals',
  'Google Cloud Platform',
  'Certificação OAB',
  'Certificações em Línguas Estrangeiras',
  'Outro'
];

export const IDIOMAS = filterAndValidate(rawIdiomas, 'IDIOMAS');
export const NIVEIS_FORMACAO = filterAndValidate(rawNiveisFormacao, 'NIVEIS_FORMACAO');
export const TIPOS_COLABORACAO = filterAndValidate(rawTiposColaboracao, 'TIPOS_COLABORACAO');
export const DISPONIBILIDADE_ESTIMADA = filterAndValidate(rawDisponibilidadeEstimada, 'DISPONIBILIDADE_ESTIMADA');
export const FORMAS_CONTATO = filterAndValidate(rawFormasContato, 'FORMAS_CONTATO');
export const CERTIFICACOES = filterAndValidate(rawCertificacoes, 'CERTIFICACOES');
