
// Helper function to filter and validate arrays
const filterAndValidate = (array: string[], arrayName: string) => {
  console.log(`Processing ${arrayName}:`, array);
  
  const filtered = array.filter(item => {
    if (item == null) {
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
    return true;
  });
  
  console.log(`${arrayName} final result:`, filtered);
  
  // Additional validation - ensure no empty strings made it through
  const hasEmpty = filtered.some(item => !item || item.trim() === '');
  if (hasEmpty) {
    console.error(`WARNING: ${arrayName} still contains empty values after filtering!`);
  }
  
  return filtered;
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

// New technical skills as requested
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

const rawCargos = [
  'Procurador-Geral de Justiça',
  'Subprocurador-Geral de Justiça',
  'Procurador de Justiça',
  'Promotor de Justiça',
  'Promotor de Justiça Substituto',
  'Servidor Efetivo - Nível Superior',
  'Servidor Efetivo - Nível Médio',
  'Servidor Comissionado - CJ-1',
  'Servidor Comissionado - CJ-2',
  'Servidor Comissionado - CJ-3',
  'Servidor Comissionado - CJ-4',
  'Servidor Comissionado - CJ-5',
  'Assessor Especial',
  'Chefe de Gabinete',
  'Secretário Geral',
  'Diretor',
  'Coordenador',
  'Gerente',
  'Supervisor',
  'Analista',
  'Técnico',
  'Assistente',
  'Auxiliar'
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
  'Mentoria'
];

const rawDisponibilidadeEstimada = [
  'Até 2h/semana',
  '2h a 4h/semana',
  'Sob demanda (caso a caso)'
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

// Export filtered and validated arrays
export const AREAS_JURIDICAS = filterAndValidate(rawAreasJuridicas, 'AREAS_JURIDICAS');
export const AREAS_ADMINISTRATIVAS = filterAndValidate(rawAreasAdministrativas, 'AREAS_ADMINISTRATIVAS');
export const HABILIDADES_TECNICAS_ADMINISTRATIVAS = filterAndValidate(rawHabilidadesTecnicasAdministrativas, 'HABILIDADES_TECNICAS_ADMINISTRATIVAS');
export const HABILIDADES_TECNICAS_JURIDICAS = filterAndValidate(rawHabilidadesTecnicasJuridicas, 'HABILIDADES_TECNICAS_JURIDICAS');
export const HABILIDADES_TECNICAS_TI = filterAndValidate(rawHabilidadesTecnicasTI, 'HABILIDADES_TECNICAS_TI');
export const HABILIDADES_COMPORTAMENTAIS = filterAndValidate(rawHabilidadesComportamentais, 'HABILIDADES_COMPORTAMENTAIS');
export const IDIOMAS = filterAndValidate(rawIdiomas, 'IDIOMAS');
export const CARGOS = filterAndValidate(rawCargos, 'CARGOS');
export const UNIDADES = filterAndValidate(rawUnidades, 'UNIDADES');
export const NIVEIS_FORMACAO = filterAndValidate(rawNiveisFormacao, 'NIVEIS_FORMACAO');
export const TIPOS_COLABORACAO = filterAndValidate(rawTiposColaboracao, 'TIPOS_COLABORACAO');
export const DISPONIBILIDADE_ESTIMADA = filterAndValidate(rawDisponibilidadeEstimada, 'DISPONIBILIDADE_ESTIMADA');
export const FORMAS_CONTATO = filterAndValidate(rawFormasContato, 'FORMAS_CONTATO');
export const CERTIFICACOES = filterAndValidate(rawCertificacoes, 'CERTIFICACOES');

// Combined technical skills for backward compatibility
export const HABILIDADES_TECNICAS = [
  ...HABILIDADES_TECNICAS_ADMINISTRATIVAS,
  ...HABILIDADES_TECNICAS_JURIDICAS,
  ...HABILIDADES_TECNICAS_TI
];
