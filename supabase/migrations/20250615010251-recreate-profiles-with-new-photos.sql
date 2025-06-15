
-- Limpar todos os dados existentes
DELETE FROM public.availability;
DELETE FROM public.projects;
DELETE FROM public.academic_formations;
DELETE FROM public.professional_experiences;
DELETE FROM public.profiles;

-- Criar novos perfis com as fotos anexadas
-- Usando a estratégia de nomear as imagens com base na matrícula para facilitar identificação

INSERT INTO public.profiles (
  name, matricula, email, cargo, funcao, unidade, telefone, biografia,
  areas_conhecimento, especializacoes, temas_interesse, idiomas,
  foto_url, certificacoes, publicacoes, role, aceite_termos, is_active
) VALUES 
(
  'Juliana Santos Oliveira',
  'MAT001',
  'juliana.santos@mprj.mp.br',
  ARRAY['Promotora de Justiça'],
  ARRAY['Coordenadora de Área'],
  ARRAY['1ª Promotoria de Justiça Criminal', 'CAO Criminal'],
  '(21) 98765-4321',
  'Promotora de Justiça com mais de 10 anos de experiência em direito criminal e combate à corrupção. Especialista em investigações complexas e coordenação de operações especiais.',
  ARRAY['Direito Criminal', 'Combate à Corrupção', 'Investigações Complexas', 'Direitos Humanos'],
  'Pós-graduada em Direito Penal e Processual Penal',
  ARRAY['Combate ao Crime Organizado', 'Lavagem de Dinheiro', 'Direitos da Mulher'],
  ARRAY['Português', 'Inglês', 'Espanhol'],
  '/lovable-uploads/215a355a-9b86-463f-9f4b-1679b0df79d9.png',
  ARRAY['Certificação em Combate à Corrupção', 'Curso de Investigação Digital'],
  'Autora de diversos artigos sobre direito criminal e combate à corrupção',
  'user',
  true,
  true
),
(
  'Roberto Silva Mendes',
  'MAT002', 
  'roberto.mendes@mprj.mp.br',
  ARRAY['Procurador de Justiça'],
  ARRAY['Assessor Especial'],
  ARRAY['Procuradoria-Geral de Justiça', 'Gabinete do Procurador-Geral'],
  '(21) 99876-5432',
  'Procurador de Justiça com vasta experiência em direito constitucional e administrativo. Atua como assessor especial em questões de alta complexidade jurídica.',
  ARRAY['Direito Constitucional', 'Direito Administrativo', 'Direito Tributário', 'Gestão Pública'],
  'Doutor em Direito Constitucional',
  ARRAY['Controle de Constitucionalidade', 'Reforma Administrativa', 'Transparência Pública'],
  ARRAY['Português', 'Inglês', 'Francês'],
  '/lovable-uploads/847f2741-30e1-40ac-91e9-d161f2d0071a.png',
  ARRAY['Doutorado em Direito', 'Especialização em Gestão Pública'],
  'Autor de livros sobre direito constitucional e artigos acadêmicos',
  'user',
  true,
  true
),
(
  'Ana Lucia Chen',
  'MAT003',
  'ana.chen@mprj.mp.br', 
  ARRAY['Promotora de Justiça'],
  ARRAY['Especialista em Tecnologia'],
  ARRAY['GAECO', 'Núcleo de Tecnologia'],
  '(21) 97654-3210',
  'Promotora especializada em crimes cibernéticos e proteção de dados. Pioneira na implementação de tecnologias digitais no MPRJ.',
  ARRAY['Crimes Cibernéticos', 'Proteção de Dados', 'Tecnologia da Informação', 'Direito Digital'],
  'Especialista em Direito Digital e Proteção de Dados',
  ARRAY['Cibersegurança', 'LGPD', 'Investigação Digital', 'Inteligência Artificial'],
  ARRAY['Português', 'Inglês', 'Mandarim'],
  '/lovable-uploads/13a55e2d-515e-46dd-b2e3-f04b95840f02.png',
  ARRAY['Certificação em Cibersegurança', 'Especialização em LGPD'],
  'Artigos sobre direito digital e proteção de dados',
  'user',
  true,
  true
),
(
  'Hiroshi Tanaka',
  'MAT004',
  'hiroshi.tanaka@mprj.mp.br',
  ARRAY['Procurador de Justiça'],
  ARRAY['Consultor Jurídico'],
  ARRAY['Consultoria Jurídica', 'CAO Constitucional'],
  '(21) 96543-2109',
  'Procurador com especialização em direito internacional e relações diplomáticas. Atua em casos de cooperação jurídica internacional.',
  ARRAY['Direito Internacional', 'Cooperação Jurídica', 'Direitos Humanos', 'Relações Diplomáticas'],
  'Mestre em Direito Internacional',
  ARRAY['Tratados Internacionais', 'Extradição', 'Cooperação Jurídica Internacional'],
  ARRAY['Português', 'Inglês', 'Japonês', 'Espanhol'],
  '/lovable-uploads/0c45f747-99db-40a2-92a7-da4751428f2c.png',
  ARRAY['Mestrado em Direito Internacional', 'Curso de Diplomacia'],
  'Publicações sobre cooperação jurídica internacional',
  'user',
  true,
  true
),
(
  'Lucas Rodrigues Almeida',
  'MAT005',
  'lucas.almeida@mprj.mp.br',
  ARRAY['Promotor de Justiça'],
  ARRAY['Coordenador de Projetos'],
  ARRAY['CAO Meio Ambiente', 'Promotoria de Meio Ambiente'],
  '(21) 95432-1098',
  'Promotor especializado em direito ambiental e sustentabilidade. Coordena projetos de preservação ambiental e desenvolvimento sustentável.',
  ARRAY['Direito Ambiental', 'Sustentabilidade', 'Políticas Públicas Ambientais', 'Mudanças Climáticas'],
  'Especialista em Direito Ambiental e Sustentabilidade',
  ARRAY['Preservação Ambiental', 'Energia Renovável', 'Gestão de Recursos Naturais'],
  ARRAY['Português', 'Inglês'],
  '/lovable-uploads/70320c48-34fe-4c4a-a071-25eac7cbe225.png',
  ARRAY['Especialização em Direito Ambiental', 'Curso de Sustentabilidade'],
  'Artigos sobre direito ambiental e sustentabilidade',
  'user',
  true,
  true
),
(
  'Fernanda Costa Lima',
  'MAT006',
  'fernanda.lima@mprj.mp.br',
  ARRAY['Promotora de Justiça'],
  ARRAY['Especialista em Direitos da Infância'],
  ARRAY['Promotoria da Infância e Juventude', 'CAO Infância'],
  '(21) 94321-0987',
  'Promotora dedicada à proteção dos direitos da criança e do adolescente. Atua em casos de adoção, guarda e proteção integral.',
  ARRAY['Direitos da Criança e Adolescente', 'Adoção', 'Proteção Integral', 'Políticas Sociais'],
  'Especialista em Direitos da Infância e Juventude',
  ARRAY['Proteção da Infância', 'Adoção Internacional', 'Políticas de Proteção Social'],
  ARRAY['Português', 'Inglês', 'Francês'],
  '/lovable-uploads/46c8d519-9632-4d7d-b820-803e93938e50.png',
  ARRAY['Especialização em Direitos da Criança', 'Curso de Mediação Familiar'],
  'Publicações sobre direitos da infância e juventude',
  'user',
  true,
  true
),
(
  'André Martins Santos',
  'MAT007',
  'andre.santos@mprj.mp.br',
  ARRAY['Promotor de Justiça'],
  ARRAY['Especialista em Compliance'],
  ARRAY['CAO Cível', 'Núcleo de Compliance'],
  '(21) 93210-9876',
  'Promotor especializado em compliance e governança corporativa. Atua na prevenção e combate a práticas anticoncorrenciais.',
  ARRAY['Compliance', 'Governança Corporativa', 'Direito Empresarial', 'Anticorrupção'],
  'Especialista em Compliance e Governança',
  ARRAY['Programas de Compliance', 'Auditoria Interna', 'Gestão de Riscos'],
  ARRAY['Português', 'Inglês'],
  '/lovable-uploads/90a0dd9a-b326-4c59-a82d-4b5e543b37b2.png',
  ARRAY['Certificação em Compliance', 'Especialização em Governança'],
  'Artigos sobre compliance e governança corporativa',
  'user',
  true,
  true
),
(
  'Carlos Mendoza Pereira',
  'MAT008',
  'carlos.pereira@mprj.mp.br',
  ARRAY['Procurador de Justiça'],
  ARRAY['Coordenador Regional'],
  ARRAY['Procuradoria Regional', 'Coordenadoria Regional Interior'],
  '(21) 92109-8765',
  'Procurador com ampla experiência em gestão e coordenação regional. Especialista em implementação de políticas públicas no interior.',
  ARRAY['Gestão Pública', 'Políticas Regionais', 'Desenvolvimento Local', 'Administração Judiciária'],
  'Especialista em Gestão Pública e Desenvolvimento Regional',
  ARRAY['Descentralização', 'Desenvolvimento Regional', 'Gestão de Equipes'],
  ARRAY['Português', 'Espanhol'],
  '/lovable-uploads/b5ebd17c-330a-4fb2-8ce2-39f146112c40.png',
  ARRAY['MBA em Gestão Pública', 'Curso de Liderança'],
  'Estudos sobre desenvolvimento regional e gestão pública',
  'user',
  true,
  true
),
(
  'Aisha Al-Rahman Silva',
  'MAT009',
  'aisha.silva@mprj.mp.br',
  ARRAY['Promotora de Justiça'],
  ARRAY['Especialista em Direitos Humanos'],
  ARRAY['CAO Direitos Humanos', 'Núcleo de Combate à Discriminação'],
  '(21) 91098-7654',
  'Promotora especializada em direitos humanos e combate à discriminação. Atua na proteção de minorias e promoção da igualdade.',
  ARRAY['Direitos Humanos', 'Combate à Discriminação', 'Igualdade Racial', 'Direitos das Minorias'],
  'Especialista em Direitos Humanos e Igualdade',
  ARRAY['Combate ao Racismo', 'Direitos Religiosos', 'Inclusão Social'],
  ARRAY['Português', 'Árabe', 'Inglês'],
  '/lovable-uploads/37b11ece-fa9d-43c7-9617-4f1b131750a8.png',
  ARRAY['Especialização em Direitos Humanos', 'Curso de Mediação Intercultural'],
  'Artigos sobre direitos humanos e combate à discriminação',
  'user',
  true,
  true
),
(
  'Rajesh Patel Kumar',
  'MAT010',
  'rajesh.kumar@mprj.mp.br',
  ARRAY['Procurador de Justiça'],
  ARRAY['Especialista em Direito Tributário'],
  ARRAY['CAO Tributário', 'Fazenda Pública'],
  '(21) 90987-6543',
  'Procurador especializado em direito tributário e fiscal. Atua em questões complexas de arrecadação e planejamento tributário.',
  ARRAY['Direito Tributário', 'Direito Fiscal', 'Planejamento Tributário', 'Arrecadação'],
  'Doutor em Direito Tributário',
  ARRAY['Reforma Tributária', 'Compliance Fiscal', 'Auditoria Tributária'],
  ARRAY['Português', 'Hindi', 'Inglês'],
  '/lovable-uploads/d8fec5c2-72a9-4deb-9936-1d96842e61f1.png',
  ARRAY['Doutorado em Direito Tributário', 'Especialização em Auditoria'],
  'Livros e artigos sobre direito tributário brasileiro',
  'user',
  true,
  true
);

-- Criar registros de disponibilidade para cada perfil
INSERT INTO public.availability (profile_id, tipo_colaboracao, disponibilidade_estimada, forma_contato, horario_preferencial)
SELECT 
  p.id,
  ARRAY['consultoria', 'parecer']::collaboration_type[],
  '20 horas por semana',
  'email'::contact_preference,
  'Manhã (9h às 12h)'
FROM public.profiles p WHERE p.matricula IN ('MAT001', 'MAT002', 'MAT003', 'MAT004', 'MAT005', 'MAT006', 'MAT007', 'MAT008', 'MAT009', 'MAT010');

-- Criar algumas formações acadêmicas de exemplo
INSERT INTO public.academic_formations (profile_id, nivel, instituicao, curso, ano)
SELECT 
  p.id,
  'Graduação',
  'Universidade Federal do Rio de Janeiro',
  'Direito',
  2010
FROM public.profiles p WHERE p.matricula IN ('MAT001', 'MAT002', 'MAT003', 'MAT004', 'MAT005', 'MAT006', 'MAT007', 'MAT008', 'MAT009', 'MAT010');

-- Criar registros de experiência profissional
INSERT INTO public.professional_experiences (profile_id, tempo_mprj, experiencia_anterior, projetos_internos, publicacoes)
SELECT 
  p.id,
  '10 anos',
  'Advocacia privada',
  'Participação em diversos projetos institucionais',
  'Artigos em revistas especializadas'
FROM public.profiles p WHERE p.matricula IN ('MAT001', 'MAT002', 'MAT003', 'MAT004', 'MAT005', 'MAT006', 'MAT007', 'MAT008', 'MAT009', 'MAT010');

-- Criar alguns projetos de exemplo
INSERT INTO public.projects (profile_id, nome, data_inicio, data_fim, observacoes)
SELECT 
  p.id,
  'Projeto de Modernização ' || p.name,
  '2023-01-01'::date,
  '2024-12-31'::date,
  'Projeto voltado para modernização dos processos na área de atuação'
FROM public.profiles p WHERE p.matricula IN ('MAT001', 'MAT002', 'MAT003', 'MAT004', 'MAT005', 'MAT006', 'MAT007', 'MAT008', 'MAT009', 'MAT010');
