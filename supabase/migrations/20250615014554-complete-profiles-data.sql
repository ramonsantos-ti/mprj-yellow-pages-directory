
-- Inserir formações acadêmicas para os novos perfis
INSERT INTO public.academic_formations (profile_id, nivel, instituicao, curso, ano) VALUES
-- Maria Silva Santos
((SELECT id FROM public.profiles WHERE matricula = 'MAT001'), 'Graduação', 'Universidade Federal do Rio de Janeiro', 'Direito', 2012),
((SELECT id FROM public.profiles WHERE matricula = 'MAT001'), 'Especialização', 'Universidade do Estado do Rio de Janeiro', 'Direito Penal e Processo Penal', 2015),

-- Dr. Carlos Eduardo Mendes
((SELECT id FROM public.profiles WHERE matricula = 'MAT002'), 'Graduação', 'Pontifícia Universidade Católica do Rio de Janeiro', 'Direito', 2005),
((SELECT id FROM public.profiles WHERE matricula = 'MAT002'), 'Mestrado', 'Universidade Federal do Rio de Janeiro', 'Direito Administrativo', 2010),

-- Ana Lucia Rodriguez
((SELECT id FROM public.profiles WHERE matricula = 'MAT003'), 'Graduação', 'Universidade Federal Fluminense', 'Direito', 2015),
((SELECT id FROM public.profiles WHERE matricula = 'MAT003'), 'Especialização', 'Fundação Getúlio Vargas', 'Direito Ambiental e Urbanístico', 2018),

-- Prof. Hiroshi Tanaka
((SELECT id FROM public.profiles WHERE matricula = 'MAT004'), 'Graduação', 'Universidade de São Paulo', 'Direito', 2008),
((SELECT id FROM public.profiles WHERE matricula = 'MAT004'), 'Mestrado', 'Universidade de São Paulo', 'Direito Penal', 2012),
((SELECT id FROM public.profiles WHERE matricula = 'MAT004'), 'Doutorado', 'Universidade de São Paulo', 'Direito Penal Econômico', 2016),

-- Lucas Gabriel Oliveira
((SELECT id FROM public.profiles WHERE matricula = 'MAT005'), 'Graduação', 'Universidade Federal do Rio de Janeiro', 'Sistemas de Informação', 2018),
((SELECT id FROM public.profiles WHERE matricula = 'MAT005'), 'Especialização', 'Pontifícia Universidade Católica do Rio de Janeiro', 'Segurança da Informação', 2020),

-- Dra. Fernanda Costa Lima
((SELECT id FROM public.profiles WHERE matricula = 'MAT006'), 'Graduação', 'Universidade do Estado do Rio de Janeiro', 'Direito', 2011),
((SELECT id FROM public.profiles WHERE matricula = 'MAT006'), 'Mestrado', 'Pontifícia Universidade Católica do Rio de Janeiro', 'Direitos da Criança e Adolescente', 2015),

-- Dr. André Martins Santos
((SELECT id FROM public.profiles WHERE matricula = 'MAT007'), 'Graduação', 'Universidade Federal do Rio de Janeiro', 'Administração', 2013),
((SELECT id FROM public.profiles WHERE matricula = 'MAT007'), 'Especialização', 'Fundação Getúlio Vargas', 'Auditoria e Controle Interno', 2016),

-- Dr. Roberto Silva Mendoza
((SELECT id FROM public.profiles WHERE matricula = 'MAT008'), 'Graduação', 'Universidade de Brasília', 'Direito', 2002),
((SELECT id FROM public.profiles WHERE matricula = 'MAT008'), 'Mestrado', 'Universidade de Brasília', 'Direito Constitucional', 2007),
((SELECT id FROM public.profiles WHERE matricula = 'MAT008'), 'Doutorado', 'Universidade de Brasília', 'Direito Constitucional', 2012),

-- Dra. Aisha Al-Rahman Silva
((SELECT id FROM public.profiles WHERE matricula = 'MAT009'), 'Graduação', 'Universidade Federal do Rio de Janeiro', 'Direito', 2014),
((SELECT id FROM public.profiles WHERE matricula = 'MAT009'), 'Mestrado', 'Universidade do Estado do Rio de Janeiro', 'Direitos Humanos e Diversidade', 2017),

-- Dr. Rajesh Patel Kumar
((SELECT id FROM public.profiles WHERE matricula = 'MAT010'), 'Graduação', 'Universidade Federal do Rio de Janeiro', 'Ciências Contábeis', 2010),
((SELECT id FROM public.profiles WHERE matricula = 'MAT010'), 'Mestrado', 'Fundação Getúlio Vargas', 'Administração Pública', 2014);

-- Inserir experiências profissionais
INSERT INTO public.professional_experiences (profile_id, tempo_mprj, experiencia_anterior, projetos_internos, publicacoes) VALUES
-- Maria Silva Santos
((SELECT id FROM public.profiles WHERE matricula = 'MAT001'), '10 anos', 'Advogada especializada em direito de família por 3 anos', 'Coordenação do Núcleo de Proteção à Mulher', 'Artigos sobre implementação da Lei Maria da Penha'),

-- Dr. Carlos Eduardo Mendes
((SELECT id FROM public.profiles WHERE matricula = 'MAT002'), '18 anos', 'Consultor jurídico em empresa pública por 5 anos', 'Projeto de modernização do controle externo', 'Livro sobre controle da administração pública'),

-- Ana Lucia Rodriguez
((SELECT id FROM public.profiles WHERE matricula = 'MAT003'), '8 anos', 'Analista ambiental em órgão estadual por 4 anos', 'Força-tarefa de proteção ambiental', 'Pesquisa sobre impactos ambientais na Baía de Guanabara'),

-- Prof. Hiroshi Tanaka
((SELECT id FROM public.profiles WHERE matricula = 'MAT004'), '15 anos', 'Professor universitário e consultor em compliance por 6 anos', 'Núcleo de combate à lavagem de dinheiro', 'Tese sobre crimes financeiros no sistema bancário'),

-- Lucas Gabriel Oliveira
((SELECT id FROM public.profiles WHERE matricula = 'MAT005'), '5 anos', 'Desenvolvedor de sistemas em empresa privada por 3 anos', 'Projeto de transformação digital do MP', 'Artigos sobre inovação tecnológica no setor público'),

-- Dra. Fernanda Costa Lima
((SELECT id FROM public.profiles WHERE matricula = 'MAT006'), '12 anos', 'Defensora Pública por 2 anos', 'Programa de proteção integral à criança', 'Manual de boas práticas em proteção infantil'),

-- Dr. André Martins Santos
((SELECT id FROM public.profiles WHERE matricula = 'MAT007'), '9 anos', 'Auditor interno em empresa privada por 4 anos', 'Sistema de controle interno e compliance', 'Estudos sobre governança no setor público'),

-- Dr. Roberto Silva Mendoza
((SELECT id FROM public.profiles WHERE matricula = 'MAT008'), '21 anos', 'Assessor jurídico no Tribunal Superior Eleitoral por 3 anos', 'Coordenação de eleições transparentes', 'Livro sobre democracia e ministério público'),

-- Dra. Aisha Al-Rahman Silva
((SELECT id FROM public.profiles WHERE matricula = 'MAT009'), '7 anos', 'Advogada em ONGs de direitos humanos por 3 anos', 'Núcleo de diversidade e inclusão', 'Pesquisa sobre proteção de minorias religiosas'),

-- Dr. Rajesh Patel Kumar
((SELECT id FROM public.profiles WHERE matricula = 'MAT010'), '13 anos', 'Contador e consultor financeiro por 5 anos', 'Sistema de gestão orçamentária', 'Manual de gestão financeira para o MP');

-- Inserir disponibilidade para os perfis
INSERT INTO public.availability (profile_id, tipo_colaboracao, disponibilidade_estimada, forma_contato, horario_preferencial) VALUES
-- Maria Silva Santos
((SELECT id FROM public.profiles WHERE matricula = 'MAT001'), ARRAY['consultoria', 'capacitacao']::collaboration_type[], '4 horas por semana', 'email'::contact_preference, 'Manhã (9h às 12h)'),

-- Dr. Carlos Eduardo Mendes
((SELECT id FROM public.profiles WHERE matricula = 'MAT002'), ARRAY['consultoria', 'parecer']::collaboration_type[], '6 horas por semana', 'telefone'::contact_preference, 'Tarde (14h às 17h)'),

-- Ana Lucia Rodriguez
((SELECT id FROM public.profiles WHERE matricula = 'MAT003'), ARRAY['parecer', 'projeto']::collaboration_type[], '5 horas por semana', 'teams'::contact_preference, 'Manhã (8h às 11h)'),

-- Prof. Hiroshi Tanaka
((SELECT id FROM public.profiles WHERE matricula = 'MAT004'), ARRAY['consultoria', 'capacitacao']::collaboration_type[], '3 horas por semana', 'email'::contact_preference, 'Qualquer horário'),

-- Lucas Gabriel Oliveira
((SELECT id FROM public.profiles WHERE matricula = 'MAT005'), ARRAY['projeto', 'consultoria']::collaboration_type[], '8 horas por semana', 'teams'::contact_preference, 'Tarde (13h às 18h)'),

-- Dra. Fernanda Costa Lima
((SELECT id FROM public.profiles WHERE matricula = 'MAT006'), ARRAY['parecer', 'capacitacao']::collaboration_type[], '4 horas por semana', 'email'::contact_preference, 'Manhã (9h às 12h)'),

-- Dr. André Martins Santos
((SELECT id FROM public.profiles WHERE matricula = 'MAT007'), ARRAY['consultoria', 'parecer']::collaboration_type[], '5 horas por semana', 'telefone'::contact_preference, 'Tarde (14h às 16h)'),

-- Dr. Roberto Silva Mendoza
((SELECT id FROM public.profiles WHERE matricula = 'MAT008'), ARRAY['consultoria', 'capacitacao']::collaboration_type[], '4 horas por semana', 'email'::contact_preference, 'Manhã (10h às 12h)'),

-- Dra. Aisha Al-Rahman Silva
((SELECT id FROM public.profiles WHERE matricula = 'MAT009'), ARRAY['parecer', 'capacitacao']::collaboration_type[], '3 horas por semana', 'teams'::contact_preference, 'Tarde (15h às 17h)'),

-- Dr. Rajesh Patel Kumar
((SELECT id FROM public.profiles WHERE matricula = 'MAT010'), ARRAY['consultoria', 'projeto']::collaboration_type[], '6 horas por semana', 'telefone'::contact_preference, 'Manhã (8h às 12h)');

-- Inserir alguns projetos para os perfis
INSERT INTO public.projects (profile_id, nome, data_inicio, data_fim, observacoes) VALUES
-- Maria Silva Santos
((SELECT id FROM public.profiles WHERE matricula = 'MAT001'), 'Implementação da Casa da Mulher Brasileira', '2020-03-01', '2022-12-31', 'Coordenação da implantação do serviço integrado'),
((SELECT id FROM public.profiles WHERE matricula = 'MAT001'), 'Capacitação em Violência Doméstica', '2023-01-15', NULL, 'Projeto em andamento de capacitação de servidores'),

-- Dr. Carlos Eduardo Mendes
((SELECT id FROM public.profiles WHERE matricula = 'MAT002'), 'Modernização do Controle Externo', '2019-06-01', '2021-12-31', 'Implementação de novos procedimentos de auditoria'),
((SELECT id FROM public.profiles WHERE matricula = 'MAT002'), 'Sistema de Transparência Pública', '2022-01-01', NULL, 'Desenvolvimento de portal de transparência'),

-- Ana Lucia Rodriguez
((SELECT id FROM public.profiles WHERE matricula = 'MAT003'), 'Proteção da Baía de Guanabara', '2020-08-01', '2023-07-31', 'Força-tarefa para combate à poluição'),

-- Prof. Hiroshi Tanaka
((SELECT id FROM public.profiles WHERE matricula = 'MAT004'), 'Combate à Lavagem de Dinheiro', '2018-01-01', '2020-12-31', 'Coordenação de operações especiais'),
((SELECT id FROM public.profiles WHERE matricula = 'MAT004'), 'Capacitação em Crimes Financeiros', '2021-03-01', NULL, 'Programa de treinamento em andamento'),

-- Lucas Gabriel Oliveira
((SELECT id FROM public.profiles WHERE matricula = 'MAT005'), 'Transformação Digital do MP', '2021-01-01', NULL, 'Modernização dos sistemas internos'),

-- Dra. Fernanda Costa Lima
((SELECT id FROM public.profiles WHERE matricula = 'MAT006'), 'Programa Família Acolhedora', '2019-05-01', NULL, 'Desenvolvimento de políticas de acolhimento'),

-- Dr. André Martins Santos
((SELECT id FROM public.profiles WHERE matricula = 'MAT007'), 'Sistema de Compliance Institucional', '2020-01-01', '2022-06-30', 'Implementação de controles internos'),

-- Dr. Roberto Silva Mendoza
((SELECT id FROM public.profiles WHERE matricula = 'MAT008'), 'Eleições Transparentes 2020', '2019-08-01', '2020-12-31', 'Coordenação do processo eleitoral'),

-- Dra. Aisha Al-Rahman Silva
((SELECT id FROM public.profiles WHERE matricula = 'MAT009'), 'Núcleo de Diversidade e Inclusão', '2021-06-01', NULL, 'Promoção da diversidade institucional'),

-- Dr. Rajesh Patel Kumar
((SELECT id FROM public.profiles WHERE matricula = 'MAT010'), 'Sistema de Gestão Orçamentária', '2020-01-01', '2021-12-31', 'Modernização da gestão financeira');

-- Inserir logs de auditoria para a criação dos perfis
INSERT INTO public.audit_logs (action, user_name, user_matricula, details, entity_type, entity_id) VALUES
('CREATE', 'Administrador do Sistema', 'ADM001', 'Perfil criado com dados completos', 'profile', (SELECT id FROM public.profiles WHERE matricula = 'MAT001')),
('CREATE', 'Administrador do Sistema', 'ADM001', 'Perfil criado com dados completos', 'profile', (SELECT id FROM public.profiles WHERE matricula = 'MAT002')),
('CREATE', 'Administrador do Sistema', 'ADM001', 'Perfil criado com dados completos', 'profile', (SELECT id FROM public.profiles WHERE matricula = 'MAT003')),
('CREATE', 'Administrador do Sistema', 'ADM001', 'Perfil criado com dados completos', 'profile', (SELECT id FROM public.profiles WHERE matricula = 'MAT004')),
('CREATE', 'Administrador do Sistema', 'ADM001', 'Perfil criado com dados completos', 'profile', (SELECT id FROM public.profiles WHERE matricula = 'MAT005')),
('CREATE', 'Administrador do Sistema', 'ADM001', 'Perfil criado com dados completos', 'profile', (SELECT id FROM public.profiles WHERE matricula = 'MAT006')),
('CREATE', 'Administrador do Sistema', 'ADM001', 'Perfil criado com dados completos', 'profile', (SELECT id FROM public.profiles WHERE matricula = 'MAT007')),
('CREATE', 'Administrador do Sistema', 'ADM001', 'Perfil criado com dados completos', 'profile', (SELECT id FROM public.profiles WHERE matricula = 'MAT008')),
('CREATE', 'Administrador do Sistema', 'ADM001', 'Perfil criado com dados completos', 'profile', (SELECT id FROM public.profiles WHERE matricula = 'MAT009')),
('CREATE', 'Administrador do Sistema', 'ADM001', 'Perfil criado com dados completos', 'profile', (SELECT id FROM public.profiles WHERE matricula = 'MAT010'));
