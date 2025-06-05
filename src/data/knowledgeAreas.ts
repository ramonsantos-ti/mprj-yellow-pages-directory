
export const KNOWLEDGE_AREAS = {
  'Direito': [
    'Direito Civil',
    'Direito Penal',
    'Direito Constitucional',
    'Direito Administrativo',
    'Direito Tributário',
    'Direito do Trabalho',
    'Direito Empresarial',
    'Direito do Consumidor',
    'Direito Ambiental',
    'Direito da Criança e do Adolescente',
    'Direito Eleitoral',
    'Direito Processual Civil',
    'Direito Processual Penal',
    'Direitos Humanos',
    'Direito Internacional',
    'Direito Digital',
    'Direito Bancário',
    'Direito Imobiliário'
  ],
  'Tecnologia da Informação': [
    'Desenvolvimento de Sistemas',
    'Análise de Sistemas',
    'Banco de Dados',
    'Redes e Infraestrutura',
    'Segurança da Informação',
    'Business Intelligence',
    'Gestão de Projetos de TI',
    'Arquitetura de Software',
    'DevOps',
    'Cloud Computing',
    'Inteligência Artificial',
    'Machine Learning',
    'Data Science',
    'Cybersecurity',
    'Mobile Development',
    'Web Development',
    'UX/UI Design',
    'Quality Assurance'
  ],
  'Administração': [
    'Gestão de Pessoas',
    'Finanças Corporativas',
    'Contabilidade',
    'Planejamento Estratégico',
    'Gestão de Projetos',
    'Marketing',
    'Logística',
    'Compras e Suprimentos',
    'Qualidade',
    'Auditoria',
    'Controladoria',
    'Orçamento',
    'Gestão de Contratos',
    'Compliance',
    'Gestão de Riscos',
    'Governança Corporativa',
    'Gestão Documental',
    'Patrimônio'
  ],
  'Comunicação': [
    'Jornalismo',
    'Relações Públicas',
    'Marketing Digital',
    'Comunicação Interna',
    'Assessoria de Imprensa',
    'Produção de Conteúdo',
    'Design Gráfico',
    'Fotografia',
    'Audiovisual',
    'Eventos',
    'Redes Sociais',
    'Comunicação Institucional'
  ],
  'Psicologia': [
    'Psicologia Organizacional',
    'Psicologia Jurídica',
    'Psicologia Clínica',
    'Psicologia Social',
    'Neuropsicologia',
    'Psicopedagogia',
    'Terapia Familiar',
    'Avaliação Psicológica'
  ],
  'Serviço Social': [
    'Assistência Social',
    'Políticas Públicas',
    'Direitos Sociais',
    'Proteção Social',
    'Terceiro Setor',
    'Desenvolvimento Comunitário'
  ]
};

export const MAJOR_AREAS = Object.keys(KNOWLEDGE_AREAS);

export const getSpecificAreas = (majorArea: string): string[] => {
  return KNOWLEDGE_AREAS[majorArea as keyof typeof KNOWLEDGE_AREAS] || [];
};
