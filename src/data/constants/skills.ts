
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

const rawHabilidadesTecnicasAdministrativas = [
  'Gestão de processos administrativos (BPM)',
  'Mapeamento e melhoria de processos',
  'Planejamento estratégico (BSC, SWOT, GUT)',
  'Definição e acompanhamento de indicadores (KPIs)',
  'Elaboração e execução orçamentária (PPA, LDO, LOA)',
  'Análise e controle financeiro',
  'Gestão de contratos administrativos (Lei nº 14.133/2021)',
  'Gestão documental e arquivística',
  'Redação de ofícios, memorandos e relatórios técnicos',
  'Atendimento ao público e comunicação institucional',
  'Administração de pessoal (recrutamento, avaliação e capacitação)',
  'Gestão de almoxarifado e patrimônio público',
  'Elaboração de planos de trabalho e cronogramas',
  'Utilização de sistemas administrativos (ex: SEI, SIPAC, Sigepe)',
  'Domínio de Excel avançado e Power BI',
  'Conhecimento de governança e controle interno',
  'Gestão da qualidade (5S, PDCA, ISO)',
  'Gestão do conhecimento organizacional',
  'Ética e responsabilidade na administração pública',
  'Noções de licitação e contratos administrativos'
];

const rawHabilidadesTecnicasJuridicas = [
  'Redação jurídica (petições, pareceres, contratos)',
  'Interpretação de leis, jurisprudência e doutrina',
  'Elaboração e análise de contratos públicos e privados',
  'Atuação em processos judiciais e administrativos',
  'Pesquisa jurídica em bases como Jusbrasil, STF, STJ',
  'Conhecimento dos ritos processuais (CPC, CPP, CLT, etc.)',
  'Elaboração de normas, regulamentos e projetos de lei',
  'Atendimento e orientação jurídica institucional',
  'Análise de constitucionalidade e legalidade',
  'Direito Administrativo e Constitucional aplicado',
  'Atuação em processos disciplinares e sindicâncias',
  'Conhecimento em licitações e contratos (Nova Lei)',
  'Noções de Direito Tributário, Civil e Penal',
  'Conhecimento da Lei Geral de Proteção de Dados (LGPD)',
  'Implantação de programas de integridade e compliance',
  'Utilização de sistemas jurídicos (PJe, e-SAJ, Projudi)',
  'Técnicas de conciliação e mediação (alternativas ao litígio)',
  'Ética profissional e responsabilidade funcional',
  'Controle da legalidade de atos administrativos',
  'Domínio das competências dos órgãos públicos e entes federativos'
];

const rawHabilidadesTecnicasTI = [
  'Lógica de programação',
  'Desenvolvimento de sistemas (Java, Python, Spring Boot etc.)',
  'Banco de dados (modelagem, SQL, MySQL, PostgreSQL, H2)',
  'Administração de redes e sistemas (configuração, segurança, backup)',
  'Gestão de sistemas de informação (ERP, SEI, e-SIC)',
  'Análise de dados e BI (Excel avançado, Power BI, dashboards)',
  'Segurança da informação (LGPD, criptografia, ISO/IEC 27001)',
  'Gestão de projetos de TI (Scrum, Kanban, PMBOK)',
  'Automação de processos (RPA, Power Automate, scripts)',
  'Computação em nuvem (AWS, Azure, Google Cloud)'
];

const rawHabilidadesComportamentais = [
  'Liderança',
  'Comunicação',
  'Trabalho em equipe',
  'Resolução de problemas',
  'Pensamento crítico',
  'Criatividade',
  'Adaptabilidade',
  'Gestão do tempo',
  'Organização',
  'Iniciativa',
  'Proatividade',
  'Responsabilidade',
  'Comprometimento',
  'Ética profissional',
  'Inteligência emocional',
  'Empatia',
  'Flexibilidade',
  'Resiliência',
  'Capacidade de aprendizado',
  'Visão estratégica',
  'Negociação',
  'Persuasão',
  'Mentoria',
  'Coaching',
  'Facilitação',
  'Mediação',
  'Networking',
  'Apresentação',
  'Escrita técnica',
  'Análise de dados',
  'Tomada de decisão',
  'Gestão de conflitos',
  'Orientação para resultados',
  'Foco no cliente',
  'Inovação',
  'Pensamento analítico',
  'Multitarefa',
  'Atenção aos detalhes',
  'Paciência',
  'Diplomacia'
];

export const HABILIDADES_TECNICAS_ADMINISTRATIVAS = filterAndValidate(rawHabilidadesTecnicasAdministrativas, 'HABILIDADES_TECNICAS_ADMINISTRATIVAS');
export const HABILIDADES_TECNICAS_JURIDICAS = filterAndValidate(rawHabilidadesTecnicasJuridicas, 'HABILIDADES_TECNICAS_JURIDICAS');
export const HABILIDADES_TECNICAS_TI = filterAndValidate(rawHabilidadesTecnicasTI, 'HABILIDADES_TECNICAS_TI');
export const HABILIDADES_COMPORTAMENTAIS = filterAndValidate(rawHabilidadesComportamentais, 'HABILIDADES_COMPORTAMENTAIS');

// Combined technical skills for backward compatibility
export const HABILIDADES_TECNICAS = [
  ...HABILIDADES_TECNICAS_ADMINISTRATIVAS,
  ...HABILIDADES_TECNICAS_JURIDICAS,
  ...HABILIDADES_TECNICAS_TI
];
