export const safeCargos = [
  'Analista',
  'Auxiliar',
  'Cedido (médio)',
  'Cedido (superior)',
  'Comissionado',
  'Estagiário (médio)',
  'Estagiário (superior)',
  'Oficial do MP',
  'Procurador de Justiça',
  'Promotor de Justiça',
  'Promotor de Justiça Substituto',
  'Residente Jurídico',
  'Residente Técnico',
  'Técnico',
  'Terceirizado'
];

export const safeFuncoes = [
  'Assessor',
  'Auditor',
  'Chefe',
  'Consultor',
  'Conselheiro',
  'Coordenador',
  'Corregedor-geral',
  'Diretor',
  'Gerente',
  'Perito',
  'Procurador-Geral de Justiça',
  'Secretário',
  'Subcorregedor-geral',
  'Subprocurador-geral de Justiça',
  'Supervisor'
];

export const safeUnidades = [
  'Centro de Apoio Operacional',
  'Centro Regional de Apoio Administrativo e Institucional',
  'Comitês/Comissão',
  'Consultoria Especial',
  'Coordenadoria de Atuação integrada Regional',
  'Coordenadoria de Inteligência da Investigação',
  'Coordenadoria de Segurança e Inteligência',
  'Coordenadoria-Geral de Movimentação dos Membros do MP',
  'Gabinete do Procurador-Geral de Justiça',
  'Grupo de Apoio Técnico Especializado',
  'Núcleo de Investigação Penal',
  'Ouvidoria',
  'Procuradoria de Justiça',
  'Procuradoria-Geral de Justiça do Estado do RJ',
  'Promotoria de Justiça',
  'Secretaria-Geral de Modernização Tecnológica e Inovação',
  'Subprocuradoria-Geral de Justiça de Administração',
  'Subprocuradoria-Geral de Justiça de Atribuição Originária',
  'Subprocuradoria-Geral de Justiça de Atuação Especializada',
  'Subprocuradoria-Geral de Justiça de Direitos Humanos e Proteção à Vítima',
  'Subprocuradoria-Geral de Justiça de Planejamento Institucional',
  'Subprocuradoria-Geral de Justiça de Recursos Constitucionais',
  'Subprocuradoria-Geral de Relações Institucionais e Defesa de Prerrogativas'
];

export const safeCertificacoes = [
  'ISO 27001',
  'ITIL Foundation',
  'PMP - Project Management Professional',
  'Product Owner',
  'Scrum Master'
];

export const safeTiposColaboracao = [
  'Capacitação/treinamento',
  'Coaching',
  'Comissão',
  'Consultoria interna',
  'Grupo de Atuação Especializada',
  'Grupo de trabalho',
  'Mentoria',
  'Parecer técnico',
  'Projeto especial'
];

export const safeDisponibilidadeEstimada = [
  'Até 1h/semana',
  'Até 2h/semana',
  'Até 3h/semana',
  'Até 4h/semana'
];

export const safeFormasContato = [
  'E-mail',
  'Microsoft Teams',
  'Presencial',
  'Telefone', 
  'WhatsApp'
];

// Mapeamento para valores do banco de dados - usando os enum values corretos
export const tipoColaboracaoMap: { [key: string]: string } = {
  'Consultoria interna': 'consultoria',
  'Parecer técnico': 'parecer',
  'Capacitação/treinamento': 'capacitacao',
  'Projeto especial': 'projeto',
  'Mentoria': 'mentoria',
  'Coaching': 'coaching',
  'Grupo de trabalho': 'grupo_trabalho',
  'Comissão': 'comissao',
  'Grupo de Atuação Especializada': 'grupo_atuacao'
};

// Mapeamento reverso para exibição
export const tipoColaboracaoReverseMap: { [key: string]: string } = {
  'consultoria': 'Consultoria interna',
  'parecer': 'Parecer técnico',
  'capacitacao': 'Capacitação/treinamento',
  'projeto': 'Projeto especial',
  'mentoria': 'Mentoria',
  'coaching': 'Coaching',
  'grupo_trabalho': 'Grupo de trabalho',
  'comissao': 'Comissão',
  'grupo_atuacao': 'Grupo de Atuação Especializada'
};

// Mapeamento que garante compatibilidade com os enums do banco de dados
export const formaContatoMap: { [key: string]: 'email' | 'telefone' | 'teams' | 'presencial' } = {
  'E-mail': 'email',
  'Telefone': 'telefone',
  'Microsoft Teams': 'teams',
  'WhatsApp': 'telefone', // WhatsApp mapeia para telefone no banco
  'Presencial': 'presencial'
};

export const formaContatoReverseMap: { [key: string]: string } = {
  'email': 'E-mail',
  'telefone': 'Telefone',
  'teams': 'Microsoft Teams',
  'presencial': 'Presencial'
};

export const isValidSelectValue = (value: any): boolean => {
  return typeof value === 'string' && value.trim().length > 0;
};
