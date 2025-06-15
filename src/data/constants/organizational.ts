
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

// Updated cargo list as requested
const rawCargos = [
  'Procurador de Justiça',
  'Promotor de Justiça',
  'Técnico',
  'Analista',
  'Assessor',
  'Auxiliar',
  'Estagiário',
  'Residente',
  'Cedido (Médio)',
  'Cedido (Superior)',
  'Cedido (Fundamental)'
];

// New functions list as requested
const rawFuncoes = [
  'Procurador-Geral de Justiça',
  'Subprocurador-Geral de Justiça',
  'Corregedor-Geral',
  'Subcorregedor-Geral',
  'Conselheiro',
  'Diretor',
  'Gerente',
  'Chefe',
  'Secretário',
  'Coordenador',
  'Supervisor'
];

const rawUnidades = [
  'Procuradoria-Geral de Justiça',
  'Corregedoria-Geral do Ministério Público',
  'Colégio de Procuradores de Justiça',
  'Conselho Superior do Ministério Público',
  'Órgão Especial do Colégio de Procuradores',
  '1ª Procuradoria de Justiça',
  '2ª Procuradoria de Justiça',
  '3ª Procuradoria de Justiça',
  '4ª Procuradoria de Justiça',
  '5ª Procuradoria de Justiça',
  '6ª Procuradoria de Justiça',
  '7ª Procuradoria de Justiça',
  '8ª Procuradoria de Justiça',
  '9ª Procuradoria de Justiça',
  '10ª Procuradoria de Justiça',
  'Procuradoria de Justiça de Tutela Coletiva',
  'Procuradoria de Justiça junto ao Tribunal do Júri',
  'Promotoria de Justiça da Capital',
  'Promotoria de Justiça Regional',
  'Promotoria de Justiça de Tutela Coletiva',
  'Promotoria de Justiça Criminal',
  'Promotoria de Justiça Cível',
  'Promotoria de Justiça da Infância e Juventude',
  'Promotoria de Justiça do Meio Ambiente',
  'Promotoria de Justiça do Consumidor',
  'Promotoria de Justiça Eleitoral',
  'Promotoria de Justiça do Trabalho',
  'Centro de Apoio Operacional',
  'Escola Superior do Ministério Público',
  'Secretaria-Geral',
  'Diretoria-Geral de Administração',
  'Diretoria de Recursos Humanos',
  'Diretoria de Orçamento e Finanças',
  'Diretoria de Tecnologia da Informação',
  'Diretoria de Comunicação Social',
  'Assessoria de Segurança Institucional',
  'Assessoria Jurídica',
  'Ouvidoria',
  'Arquivo Geral',
  'Biblioteca'
];

export const CARGOS = filterAndValidate(rawCargos, 'CARGOS');
export const FUNCOES = filterAndValidate(rawFuncoes, 'FUNCOES');
export const UNIDADES = filterAndValidate(rawUnidades, 'UNIDADES');
