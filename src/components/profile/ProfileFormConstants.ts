export const safeCargos = [
  'Promotor de Justiça', 'Procurador de Justiça', 'Analista Ministerial',
  'Técnico Ministerial', 'Assessor', 'Estagiário'
];

export const safeFuncoes = [
  'Coordenador', 'Assessor Técnico', 'Chefe de Seção', 'Supervisor'
];

export const safeUnidades = [
  'Procuradoria-Geral de Justiça', 'Subprocuradoria-Geral de Justiça de Assuntos Administrativos',
  'Corregedoria-Geral do Ministério Público', 'Centro de Apoio Operacional',
  'Promotoria de Justiça', 'Procuradoria de Justiça'
];

export const safeCertificacoes = [
  'PMP - Project Management Professional', 'ITIL Foundation',
  'ISO 27001', 'Scrum Master', 'Product Owner'
];

export const safeTiposColaboracao = [
  'Consultoria interna',
  'Parecer técnico',
  'Capacitação/treinamento',
  'Projeto especial',
  'Mentoria',
  'Coaching',
  'Grupo de trabalho',
  'Comissão',
  'Grupo de Atuação Especializada'
];

export const safeDisponibilidadeEstimada = [
  'Até 1h/semana',
  'Até 2h/semana',
  'Até 3h/semana',
  'Até 4h/semana'
];

export const safeFormasContato = [
  'E-mail',
  'Telefone', 
  'Microsoft Teams',
  'WhatsApp',
  'Presencial'
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
