
export interface KnowledgeArea {
  id: string;
  name: string;
  specificAreas: string[];
}

export const KNOWLEDGE_AREAS: KnowledgeArea[] = [
  {
    id: 'direito',
    name: 'Direito',
    specificAreas: [
      'Direito Civil',
      'Direito Penal',
      'Direito Constitucional',
      'Direito Administrativo',
      'Direito Tributário',
      'Direito do Trabalho',
      'Direito Processual Civil',
      'Direito Processual Penal',
      'Direito Ambiental',
      'Direito do Consumidor',
      'Direito de Família',
      'Direito Empresarial',
      'Direito Internacional',
      'Direitos Humanos'
    ]
  },
  {
    id: 'tecnologia',
    name: 'Tecnologia da Informação',
    specificAreas: [
      'Desenvolvimento de Sistemas',
      'Análise de Sistemas',
      'Banco de Dados',
      'Redes de Computadores',
      'Segurança da Informação',
      'Inteligência Artificial',
      'Ciência de Dados',
      'DevOps',
      'Cloud Computing',
      'Mobile Development',
      'Web Development',
      'Blockchain',
      'IoT (Internet das Coisas)',
      'Big Data'
    ]
  },
  {
    id: 'administracao',
    name: 'Administração',
    specificAreas: [
      'Gestão de Pessoas',
      'Finanças Corporativas',
      'Marketing',
      'Logística',
      'Gestão de Projetos',
      'Planejamento Estratégico',
      'Recursos Humanos',
      'Controladoria',
      'Auditoria',
      'Gestão da Qualidade',
      'Gestão de Processos',
      'Empreendedorismo',
      'Gestão Pública',
      'Compliance'
    ]
  },
  {
    id: 'contabilidade',
    name: 'Contabilidade',
    specificAreas: [
      'Contabilidade Geral',
      'Contabilidade Pública',
      'Contabilidade Fiscal',
      'Controladoria',
      'Auditoria Interna',
      'Auditoria Externa',
      'Perícia Contábil',
      'Planejamento Tributário',
      'Análise Financeira',
      'Orçamento Público',
      'Custos',
      'Compliance Fiscal'
    ]
  },
  {
    id: 'comunicacao',
    name: 'Comunicação',
    specificAreas: [
      'Jornalismo',
      'Relações Públicas',
      'Marketing Digital',
      'Publicidade',
      'Comunicação Institucional',
      'Assessoria de Imprensa',
      'Comunicação Interna',
      'Design Gráfico',
      'Fotografia',
      'Produção Audiovisual',
      'Mídias Sociais',
      'Comunicação de Crise'
    ]
  },
  {
    id: 'psicologia',
    name: 'Psicologia',
    specificAreas: [
      'Psicologia Organizacional',
      'Psicologia Clínica',
      'Psicologia Social',
      'Psicologia Jurídica',
      'Neuropsicologia',
      'Psicologia do Desenvolvimento',
      'Psicologia Educacional',
      'Avaliação Psicológica',
      'Psicoterapia',
      'Psicologia do Trabalho'
    ]
  },
  {
    id: 'medicina',
    name: 'Medicina',
    specificAreas: [
      'Medicina do Trabalho',
      'Medicina Legal',
      'Clínica Médica',
      'Cardiologia',
      'Neurologia',
      'Psiquiatria',
      'Pediatria',
      'Ginecologia',
      'Ortopedia',
      'Radiologia',
      'Patologia',
      'Medicina Preventiva'
    ]
  },
  {
    id: 'engenharia',
    name: 'Engenharia',
    specificAreas: [
      'Engenharia Civil',
      'Engenharia Elétrica',
      'Engenharia Mecânica',
      'Engenharia de Produção',
      'Engenharia de Segurança',
      'Engenharia Ambiental',
      'Engenharia de Software',
      'Engenharia Química',
      'Arquitetura',
      'Urbanismo'
    ]
  },
  {
    id: 'educacao',
    name: 'Educação',
    specificAreas: [
      'Pedagogia',
      'Educação Corporativa',
      'Treinamento e Desenvolvimento',
      'Educação a Distância',
      'Gestão Educacional',
      'Psicopedagogia',
      'Educação Especial',
      'Metodologias Ativas',
      'Avaliação Educacional',
      'Currículo e Ensino'
    ]
  },
  {
    id: 'outros',
    name: 'Outros',
    specificAreas: [
      'Arquivologia',
      'Biblioteconomia',
      'Serviço Social',
      'Estatística',
      'Economia',
      'Filosofia',
      'Sociologia',
      'História',
      'Geografia',
      'Letras',
      'Tradução',
      'Relações Internacionais'
    ]
  }
];
