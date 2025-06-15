
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
  'Formação de equipes',
  'Capacitações/tutoria',
  'Grupos de trabalho',
  'Mentoria',
  'Coaching',
  'Grupo de trabalho',
  'Grupo de atuação'
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

export const isValidSelectValue = (value: any): boolean => {
  return typeof value === 'string' && value.trim().length > 0;
};
