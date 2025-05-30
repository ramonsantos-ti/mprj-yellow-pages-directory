
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

const rawHabilidadesTecnicas = [
  'Microsoft Office',
  'Power BI',
  'Excel Avançado',
  'SQL',
  'Python',
  'R',
  'Tableau',
  'SPSS',
  'AutoCAD',
  'Photoshop',
  'Illustrator',
  'InDesign',
  'Premiere',
  'After Effects',
  'WordPress',
  'HTML/CSS',
  'JavaScript',
  'Java',
  'C#',
  'PHP',
  'SAP',
  'Oracle',
  'SharePoint',
  'Teams',
  'Zoom',
  'Slack',
  'Trello',
  'Asana',
  'Monday',
  'Jira',
  'Git',
  'GitHub',
  'Docker',
  'Kubernetes',
  'AWS',
  'Azure',
  'Google Cloud',
  'Salesforce',
  'HubSpot',
  'Mailchimp',
  'Google Analytics',
  'Facebook Ads',
  'LinkedIn Ads',
  'SEO/SEM',
  'Adobe Acrobat',
  'Figma',
  'Sketch',
  'InVision',
  'Zeplin'
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

// Export filtered and validated arrays
export const AREAS_JURIDICAS = filterAndValidate(rawAreasJuridicas, 'AREAS_JURIDICAS');
export const AREAS_ADMINISTRATIVAS = filterAndValidate(rawAreasAdministrativas, 'AREAS_ADMINISTRATIVAS');
export const HABILIDADES_TECNICAS = filterAndValidate(rawHabilidadesTecnicas, 'HABILIDADES_TECNICAS');
export const HABILIDADES_COMPORTAMENTAIS = filterAndValidate(rawHabilidadesComportamentais, 'HABILIDADES_COMPORTAMENTAIS');
export const IDIOMAS = filterAndValidate(rawIdiomas, 'IDIOMAS');
export const CARGOS = filterAndValidate(rawCargos, 'CARGOS');
export const UNIDADES = filterAndValidate(rawUnidades, 'UNIDADES');
export const NIVEIS_FORMACAO = filterAndValidate(rawNiveisFormacao, 'NIVEIS_FORMACAO');
export const TIPOS_COLABORACAO = filterAndValidate(rawTiposColaboracao, 'TIPOS_COLABORACAO');
export const DISPONIBILIDADE_ESTIMADA = filterAndValidate(rawDisponibilidadeEstimada, 'DISPONIBILIDADE_ESTIMADA');
export const FORMAS_CONTATO = filterAndValidate(rawFormasContato, 'FORMAS_CONTATO');
