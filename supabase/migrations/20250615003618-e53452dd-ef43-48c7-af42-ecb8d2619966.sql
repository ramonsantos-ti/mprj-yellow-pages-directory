
-- Inserir perfis de exemplo no banco de dados
INSERT INTO public.profiles (
  id,
  name,
  matricula,
  cargo,
  funcao,
  unidade,
  telefone,
  email,
  biografia,
  areas_conhecimento,
  especializacoes,
  temas_interesse,
  idiomas,
  link_curriculo,
  foto_url,
  certificacoes,
  publicacoes,
  role,
  is_active,
  aceite_termos
) VALUES 
-- Perfil 1: Ana Silva
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Ana Carolina Silva',
  'MAT123456',
  ARRAY['Promotor de Justiça'],
  ARRAY['Coordenador de Área'],
  ARRAY['1ª Promotoria de Justiça Criminal'],
  '(21) 98765-4321',
  'ana.silva@mprj.mp.br',
  'Promotora de Justiça com mais de 15 anos de experiência em direito penal e processual penal. Especialista em crimes contra o patrimônio e lavagem de dinheiro.',
  ARRAY['Direito Penal', 'Processo Penal', 'Lavagem de Dinheiro', 'Crimes Patrimoniais'],
  'Especialização em Direito Penal Econômico pela FGV',
  ARRAY['Combate à Corrupção', 'Direitos Humanos', 'Justiça Restaurativa'],
  ARRAY['Português', 'Inglês', 'Espanhol'],
  'http://lattes.cnpq.br/ana-silva',
  'https://images.unsplash.com/photo-1494790108755-2616b612d0bd?w=400&h=600&fit=crop&crop=face',
  ARRAY['Certificação em Investigação Financeira', 'Curso de Lavagem de Dinheiro - COAF'],
  'Autora de diversos artigos sobre direito penal econômico',
  'user',
  true,
  true
),
-- Perfil 2: Carlos Oliveira
(
  'b2c3d4e5-f6a7-8901-bcde-f23456789012',
  'Carlos Eduardo Oliveira',
  'MAT234567',
  ARRAY['Procurador de Justiça'],
  ARRAY['Procurador-Geral Adjunto'],
  ARRAY['Procuradoria-Geral de Justiça'],
  '(21) 99876-5432',
  'carlos.oliveira@mprj.mp.br',
  'Procurador de Justiça com vasta experiência em direito constitucional e administrativo. Atuou em importantes casos de improbidade administrativa.',
  ARRAY['Direito Constitucional', 'Direito Administrativo', 'Improbidade Administrativa', 'Controle Externo'],
  'Mestrado em Direito Constitucional pela UERJ',
  ARRAY['Transparência Pública', 'Controle de Constitucionalidade', 'Gestão Pública'],
  ARRAY['Português', 'Inglês', 'Francês'],
  'http://lattes.cnpq.br/carlos-oliveira',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face',
  ARRAY['Especialização em Gestão Pública', 'Curso de Controle Externo - TCU'],
  'Coordenador de publicações sobre controle da administração pública',
  'user',
  true,
  true
),
-- Perfil 3: Maria Santos
(
  'c3d4e5f6-a7b8-9012-cdef-345678901234',
  'Maria Fernanda Santos',
  'MAT345678',
  ARRAY['Promotor de Justiça'],
  ARRAY['Coordenador de Infância e Juventude'],
  ARRAY['Promotoria de Justiça da Infância e Juventude'],
  '(21) 97654-3210',
  'maria.santos@mprj.mp.br',
  'Promotora especializada em direitos da criança e do adolescente, com atuação destacada em casos de adoção e proteção integral.',
  ARRAY['Direito da Criança e Adolescente', 'Direito de Família', 'Adoção', 'Violência Doméstica'],
  'Especialização em Direitos da Criança e Adolescente pela PUC-Rio',
  ARRAY['Proteção Integral', 'Políticas Públicas para Infância', 'Mediação Familiar'],
  ARRAY['Português', 'Inglês'],
  'http://lattes.cnpq.br/maria-santos',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face',
  ARRAY['Mediação de Conflitos', 'Curso de Violência Doméstica - CNJ'],
  'Palestrante em seminários sobre direitos da criança',
  'user',
  true,
  true
),
-- Perfil 4: João Pereira
(
  'd4e5f6a7-b8c9-0123-def4-56789012345a',
  'João Carlos Pereira',
  'MAT456789',
  ARRAY['Promotor de Justiça'],
  ARRAY['Promotor de Meio Ambiente'],
  ARRAY['Promotoria de Justiça de Tutela Coletiva'],
  '(21) 96543-2109',
  'joao.pereira@mprj.mp.br',
  'Promotor com expertise em direito ambiental e urbanístico. Coordena ações de proteção ao meio ambiente na região metropolitana.',
  ARRAY['Direito Ambiental', 'Direito Urbanístico', 'Tutela Coletiva', 'Licenciamento Ambiental'],
  'Mestrado em Direito Ambiental pela UFRJ',
  ARRAY['Sustentabilidade', 'Mudanças Climáticas', 'Preservação Ambiental'],
  ARRAY['Português', 'Inglês', 'Alemão'],
  'http://lattes.cnpq.br/joao-pereira',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face',
  ARRAY['Auditoria Ambiental', 'Gestão de Recursos Hídricos'],
  'Autor de livro sobre licenciamento ambiental',
  'user',
  true,
  true
),
-- Perfil 5: Patricia Lima
(
  'e5f6a7b8-c9d0-1234-ef56-789012345bcd',
  'Patricia Regina Lima',
  'MAT567890',
  ARRAY['Promotor de Justiça'],
  ARRAY['Promotor do Consumidor'],
  ARRAY['Promotoria de Justiça de Defesa do Consumidor'],
  '(21) 95432-1098',
  'patricia.lima@mprj.mp.br',
  'Promotora especializada em defesa do consumidor com foco em relações de consumo digitais e proteção de dados.',
  ARRAY['Direito do Consumidor', 'Proteção de Dados', 'Comércio Eletrônico', 'Telecomunicações'],
  'Especialização em Direito Digital pela FGV',
  ARRAY['Economia Digital', 'Proteção de Dados Pessoais', 'Direitos Digitais'],
  ARRAY['Português', 'Inglês', 'Italiano'],
  'http://lattes.cnpq.br/patricia-lima',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=face',
  ARRAY['LGPD - Lei Geral de Proteção de Dados', 'Comércio Eletrônico'],
  'Coordenadora de pesquisas sobre direitos digitais',
  'user',
  true,
  true
);

-- Inserir formações acadêmicas para os perfis
INSERT INTO public.academic_formations (profile_id, nivel, instituicao, curso, ano) VALUES
-- Ana Silva
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Graduação', 'Universidade do Estado do Rio de Janeiro', 'Direito', 2008),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Especialização', 'Fundação Getúlio Vargas', 'Direito Penal Econômico', 2012),
-- Carlos Oliveira
('b2c3d4e5-f6a7-8901-bcde-f23456789012', 'Graduação', 'Universidade Federal do Rio de Janeiro', 'Direito', 2005),
('b2c3d4e5-f6a7-8901-bcde-f23456789012', 'Mestrado', 'Universidade do Estado do Rio de Janeiro', 'Direito Constitucional', 2010),
-- Maria Santos
('c3d4e5f6-a7b8-9012-cdef-345678901234', 'Graduação', 'Pontifícia Universidade Católica do Rio de Janeiro', 'Direito', 2010),
('c3d4e5f6-a7b8-9012-cdef-345678901234', 'Especialização', 'Pontifícia Universidade Católica do Rio de Janeiro', 'Direitos da Criança e Adolescente', 2014),
-- João Pereira
('d4e5f6a7-b8c9-0123-def4-56789012345a', 'Graduação', 'Universidade Federal Fluminense', 'Direito', 2007),
('d4e5f6a7-b8c9-0123-def4-56789012345a', 'Mestrado', 'Universidade Federal do Rio de Janeiro', 'Direito Ambiental', 2013),
-- Patricia Lima
('e5f6a7b8-c9d0-1234-ef56-789012345bcd', 'Graduação', 'Universidade Candido Mendes', 'Direito', 2009),
('e5f6a7b8-c9d0-1234-ef56-789012345bcd', 'Especialização', 'Fundação Getúlio Vargas', 'Direito Digital', 2016);

-- Inserir experiências profissionais
INSERT INTO public.professional_experiences (profile_id, tempo_mprj, experiencia_anterior, projetos_internos, publicacoes) VALUES
-- Ana Silva
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '15 anos', 'Advogada em escritório especializado em direito penal por 2 anos', 'Coordenação do projeto de combate à lavagem de dinheiro', 'Artigos sobre direito penal econômico em revista jurídica'),
-- Carlos Oliveira
('b2c3d4e5-f6a7-8901-bcde-f23456789012', '18 anos', 'Assessor jurídico na Prefeitura do Rio de Janeiro por 3 anos', 'Projeto de modernização do controle interno', 'Livro sobre controle da administração pública'),
-- Maria Santos
('c3d4e5f6-a7b8-9012-cdef-345678901234', '13 anos', 'Defensora Pública por 1 ano', 'Programa de capacitação em direitos da criança', 'Cartilha sobre adoção responsável'),
-- João Pereira
('d4e5f6a7-b8c9-0123-def4-56789012345a', '16 anos', 'Consultor ambiental em empresa de consultoria por 4 anos', 'Força-tarefa ambiental da Baía de Guanabara', 'Manual de licenciamento ambiental'),
-- Patricia Lima
('e5f6a7b8-c9d0-1234-ef56-789012345bcd', '14 anos', 'Advogada em escritório de direito empresarial por 2 anos', 'Núcleo de proteção de dados pessoais', 'Guia prático sobre LGPD para o MP');

-- Inserir disponibilidade para os perfis
INSERT INTO public.availability (profile_id, tipo_colaboracao, disponibilidade_estimada, forma_contato, horario_preferencial) VALUES
-- Ana Silva
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', ARRAY['consultoria', 'parecer']::collaboration_type[], '5 horas por semana', 'email'::contact_preference, 'Manhã (9h às 12h)'),
-- Carlos Oliveira
('b2c3d4e5-f6a7-8901-bcde-f23456789012', ARRAY['consultoria', 'capacitacao']::collaboration_type[], '3 horas por semana', 'telefone'::contact_preference, 'Tarde (14h às 17h)'),
-- Maria Santos
('c3d4e5f6-a7b8-9012-cdef-345678901234', ARRAY['parecer', 'capacitacao']::collaboration_type[], '4 horas por semana', 'teams'::contact_preference, 'Manhã (8h às 11h)'),
-- João Pereira
('d4e5f6a7-b8c9-0123-def4-56789012345a', ARRAY['consultoria', 'projeto']::collaboration_type[], '6 horas por semana', 'email'::contact_preference, 'Qualquer horário'),
-- Patricia Lima
('e5f6a7b8-c9d0-1234-ef56-789012345bcd', ARRAY['parecer', 'capacitacao']::collaboration_type[], '4 horas por semana', 'teams'::contact_preference, 'Tarde (13h às 16h)');

-- Inserir alguns projetos para os perfis
INSERT INTO public.projects (profile_id, nome, data_inicio, data_fim, observacoes) VALUES
-- Ana Silva
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Operação Lava Jato Regional', '2019-01-15', '2021-12-30', 'Coordenação de investigações sobre lavagem de dinheiro'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Capacitação em Crimes Financeiros', '2022-03-01', NULL, 'Projeto em andamento para capacitação de promotores'),
-- Carlos Oliveira
('b2c3d4e5-f6a7-8901-bcde-f23456789012', 'Modernização do Controle Interno', '2020-06-01', '2022-05-31', 'Implementação de novos procedimentos de controle'),
-- Maria Santos
('c3d4e5f6-a7b8-9012-cdef-345678901234', 'Programa Família Acolhedora', '2021-01-10', NULL, 'Desenvolvimento de políticas para acolhimento familiar'),
-- João Pereira
('d4e5f6a7-b8c9-0123-def4-56789012345a', 'Força-tarefa Baía de Guanabara', '2018-04-01', '2020-12-31', 'Combate à poluição da Baía de Guanabara'),
-- Patricia Lima
('e5f6a7b8-c9d0-1234-ef56-789012345bcd', 'Implementação LGPD no MP', '2020-08-01', '2021-07-31', 'Adequação do MP à Lei Geral de Proteção de Dados');
