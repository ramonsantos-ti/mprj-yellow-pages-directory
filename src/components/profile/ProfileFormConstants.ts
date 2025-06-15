
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
  'Consultoria', 'Treinamento', 'Projetos', 'Palestras', 'Pesquisa'
];

export const safeDisponibilidadeEstimada = [
  'Até 5 horas/semana', '5-10 horas/semana', '10-20 horas/semana', 'Mais de 20 horas/semana'
];

export const safeFormasContato = ['email', 'telefone', 'teams', 'presencial'];

export const isValidSelectValue = (value: any): boolean => {
  return typeof value === 'string' && value.trim().length > 0;
};
