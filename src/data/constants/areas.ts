
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

const rawAreasJuridicas = [
  'Direito Constitucional',
  'Direito Administrativo',
  'Direito Civil',
  'Direito Processual Civil',
  'Direito Penal',
  'Direito Processual Penal',
  'Direito da Infância e Juventude',
  'Direito do Consumidor',
  'Direito Ambiental',
  'Direito Urbanístico',
  'Direito Tributário',
  'Direito Financeiro',
  'Direito Eleitoral',
  'Direito do Trabalho',
  'Direito Previdenciário',
  'Direito Empresarial',
  'Direito Internacional Público e Privado',
  'Direitos Humanos',
  'Direito à Saúde',
  'Direito Educacional',
  'Direito Digital e Cibernético',
  'Criminologia e Política Criminal',
  'Direito Notarial e Registral',
  'Execução Penal e Sistema Prisional',
  'Legislação Institucional do Ministério Público',
  'Outro'
];

const rawAreasAdministrativas = [
  'Administração Pública',
  'Gestão Pública',
  'Gestão de Pessoas / Recursos Humanos',
  'Gestão Estratégica e Governança',
  'Gestão de Projetos',
  'Gestão de Processos',
  'Gestão da Informação',
  'Gestão do Conhecimento',
  'Gestão Documental / Arquivologia',
  'Planejamento e Orçamento',
  'Contabilidade Pública',
  'Execução Orçamentária e Financeira',
  'Controladoria e Auditoria',
  'Licitações e Contratos',
  'Tecnologia da Informação e Comunicação (TIC)',
  'Segurança da Informação',
  'Ciência de Dados e Business Intelligence',
  'Infraestrutura e Suporte Técnico em TI',
  'Engenharia e Arquitetura',
  'Serviços Gerais e Logística',
  'Comunicação Social',
  'Design Gráfico e Produção Audiovisual',
  'Marketing Institucional',
  'Psicologia Organizacional',
  'Serviço Social',
  'Educação Corporativa / Capacitação',
  'Qualidade de Vida no Trabalho',
  'Sustentabilidade e Responsabilidade Socioambiental',
  'Ouvidoria e Atendimento ao Cidadão',
  'Compliance e Integridade',
  'Inovação no Setor Público',
  'Outro'
];

export const AREAS_JURIDICAS = filterAndValidate(rawAreasJuridicas, 'AREAS_JURIDICAS');
export const AREAS_ADMINISTRATIVAS = filterAndValidate(rawAreasAdministrativas, 'AREAS_ADMINISTRATIVAS');
