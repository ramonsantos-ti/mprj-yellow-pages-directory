
-- Inserir 10 novos perfis de especialistas do MPRJ com as fotos fornecidas
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
-- Perfil 1: Juliana Santos (Foto 1 - Mulher negra)
(
  gen_random_uuid(),
  'Juliana Santos Oliveira',
  'MAT001234',
  ARRAY['Promotor de Justiça'],
  ARRAY['Coordenador de Área'],
  ARRAY['Promotoria de Justiça de Defesa dos Direitos Humanos'],
  '(21) 98765-1111',
  'juliana.santos@mprj.mp.br',
  'Promotora de Justiça especializada em direitos humanos e igualdade racial. Atua na defesa de minorias e no combate à discriminação.',
  ARRAY['Direitos Humanos', 'Igualdade Racial', 'Direito Antidiscriminação', 'Direitos Fundamentais'],
  'Especialização em Direitos Humanos pela UERJ',
  ARRAY['Igualdade Racial', 'Justiça Social', 'Direitos das Minorias'],
  ARRAY['Português', 'Inglês', 'Francês'],
  'http://lattes.cnpq.br/juliana-santos',
  '/lovable-uploads/2c165f66-a0bf-41a8-a633-256a9855065d.png',
  ARRAY['Curso de Direitos Humanos - ONU', 'Especialização em Igualdade Racial'],
  'Autora de artigos sobre igualdade racial no sistema de justiça',
  'user',
  true,
  true
),
-- Perfil 2: Roberto Silva (Foto 2 - Homem branco maduro)
(
  gen_random_uuid(),
  'Roberto Silva Mendes',
  'MAT002345',
  ARRAY['Procurador de Justiça'],
  ARRAY['Procurador-Geral Adjunto'],
  ARRAY['Procuradoria-Geral de Justiça'],
  '(21) 98765-2222',
  'roberto.silva@mprj.mp.br',
  'Procurador de Justiça com mais de 25 anos de experiência em direito administrativo e controle da administração pública.',
  ARRAY['Direito Administrativo', 'Controle Externo', 'Licitações', 'Improbidade Administrativa'],
  'Mestrado em Direito Administrativo pela UFF',
  ARRAY['Transparência Pública', 'Controle de Gastos Públicos', 'Modernização Administrativa'],
  ARRAY['Português', 'Inglês'],
  'http://lattes.cnpq.br/roberto-silva',
  '/lovable-uploads/bf7974fe-8f0f-4b57-bec3-db2e4819d10d.png',
  ARRAY['Curso de Controle Externo - TCU', 'Especialização em Licitações'],
  'Coordenador de manual sobre controle da administração pública',
  'user',
  true,
  true
),
-- Perfil 3: Ana Lucia Chen (Foto 3 - Mulher asiática)
(
  gen_random_uuid(),
  'Ana Lucia Chen',
  'MAT003456',
  ARRAY['Promotor de Justiça'],
  ARRAY['Promotor de Defesa do Consumidor'],
  ARRAY['Promotoria de Justiça de Defesa do Consumidor'],
  '(21) 98765-3333',
  'ana.chen@mprj.mp.br',
  'Promotora especializada em direito do consumidor e comércio eletrônico, com foco em proteção de dados e relações digitais.',
  ARRAY['Direito do Consumidor', 'Comércio Eletrônico', 'Proteção de Dados', 'Direito Digital'],
  'Especialização em Direito Digital pela FGV',
  ARRAY['E-commerce', 'Proteção de Dados Pessoais', 'Direitos Digitais'],
  ARRAY['Português', 'Inglês', 'Mandarim'],
  'http://lattes.cnpq.br/ana-chen',
  '/lovable-uploads/1cdbabe0-34a9-4bf2-96ec-723f2faf2ae6.png',
  ARRAY['LGPD - Lei Geral de Proteção de Dados', 'Certificação em Comércio Eletrônico'],
  'Palestrante sobre direitos do consumidor no ambiente digital',
  'user',
  true,
  true
),
-- Perfil 4: Dr. Hiroshi Tanaka (Foto 4 - Homem asiático idoso)
(
  gen_random_uuid(),
  'Hiroshi Tanaka',
  'MAT004567',
  ARRAY['Procurador de Justiça'],
  ARRAY['Consultor Jurídico'],
  ARRAY['Centro de Apoio Operacional Criminal'],
  '(21) 98765-4444',
  'hiroshi.tanaka@mprj.mp.br',
  'Procurador de Justiça com vasta experiência em direito penal econômico e crimes financeiros. Especialista em lavagem de dinheiro.',
  ARRAY['Direito Penal Econômico', 'Lavagem de Dinheiro', 'Crimes Financeiros', 'Cooperação Internacional'],
  'Doutorado em Direito Penal pela USP',
  ARRAY['Crimes Econômicos', 'Cooperação Internacional', 'Combate à Corrupção'],
  ARRAY['Português', 'Inglês', 'Japonês', 'Espanhol'],
  'http://lattes.cnpq.br/hiroshi-tanaka',
  '/lovable-uploads/e22f6d5f-1b06-4af3-a6b3-d9ad8c39d299.png',
  ARRAY['Curso de Lavagem de Dinheiro - COAF', 'Especialização em Cooperação Internacional'],
  'Autor de livro sobre crimes financeiros internacionais',
  'user',
  true,
  true
),
-- Perfil 5: Lucas Rodrigues (Foto 5 - Homem jovem)
(
  gen_random_uuid(),
  'Lucas Rodrigues Almeida',
  'MAT005678',
  ARRAY['Promotor de Justiça'],
  ARRAY['Promotor de Meio Ambiente'],
  ARRAY['Promotoria de Justiça de Tutela Coletiva'],
  '(21) 98765-5555',
  'lucas.rodrigues@mprj.mp.br',
  'Promotor jovem especializado em direito ambiental e sustentabilidade, com foco em mudanças climáticas e energias renováveis.',
  ARRAY['Direito Ambiental', 'Mudanças Climáticas', 'Energias Renováveis', 'Sustentabilidade'],
  'Mestrado em Direito Ambiental pela PUC-Rio',
  ARRAY['Sustentabilidade', 'Mudanças Climáticas', 'Energias Limpas'],
  ARRAY['Português', 'Inglês', 'Alemão'],
  'http://lattes.cnpq.br/lucas-rodrigues',
  '/lovable-uploads/16665cb2-cc32-42ac-8e98-8f3b5e9b6c3f.png',
  ARRAY['Certificação em Sustentabilidade', 'Curso de Mudanças Climáticas - ONU'],
  'Pesquisador sobre energias renováveis no sistema jurídico',
  'user',
  true,
  true
),
-- Perfil 6: Fernanda Costa (Foto 6 - Mulher branca)
(
  gen_random_uuid(),
  'Fernanda Costa Lima',
  'MAT006789',
  ARRAY['Promotor de Justiça'],
  ARRAY['Coordenador de Infância e Juventude'],
  ARRAY['Promotoria de Justiça da Infância e Juventude'],
  '(21) 98765-6666',
  'fernanda.costa@mprj.mp.br',
  'Promotora especializada em direitos da criança e adolescente, com atuação em casos de adoção e proteção integral.',
  ARRAY['Direito da Criança e Adolescente', 'Adoção', 'Proteção Integral', 'Direito de Família'],
  'Especialização em Direitos da Criança pela UERJ',
  ARRAY['Proteção Integral', 'Adoção Responsável', 'Direitos da Criança'],
  ARRAY['Português', 'Inglês', 'Espanhol'],
  'http://lattes.cnpq.br/fernanda-costa',
  '/lovable-uploads/dd845c3c-fc46-4771-afb0-30acbf12b448.png',
  ARRAY['Curso de Adoção - CNJ', 'Especialização em Direito de Família'],
  'Coordenadora de cartilhas sobre direitos da criança',
  'user',
  true,
  true
),
-- Perfil 7: André Martins (Foto 7 - Homem negro)
(
  gen_random_uuid(),
  'André Martins Santos',
  'MAT007890',
  ARRAY['Promotor de Justiça'],
  ARRAY['Promotor Criminal'],
  ARRAY['1ª Promotoria de Justiça Criminal'],
  '(21) 98765-7777',
  'andre.martins@mprj.mp.br',
  'Promotor de Justiça especializado em direito penal e processo penal, com foco em crimes violentos e júri popular.',
  ARRAY['Direito Penal', 'Processo Penal', 'Júri Popular', 'Crimes Violentos'],
  'Especialização em Direito Penal pela EMERJ',
  ARRAY['Júri Popular', 'Crimes Violentos', 'Processo Penal'],
  ARRAY['Português', 'Inglês'],
  'http://lattes.cnpq.br/andre-martins',
  '/lovable-uploads/2ab5e35e-b789-4d10-ad58-b21e14098dd3.png',
  ARRAY['Curso de Júri Popular - EMERJ', 'Especialização em Crimes Violentos'],
  'Palestrante sobre técnicas de júri popular',
  'user',
  true,
  true
),
-- Perfil 8: Carlos Mendoza (Foto 8 - Homem hispânico)
(
  gen_random_uuid(),
  'Carlos Mendoza Pereira',
  'MAT008901',
  ARRAY['Promotor de Justiça'],
  ARRAY['Promotor de Família'],
  ARRAY['Promotoria de Justiça de Família'],
  '(21) 98765-8888',
  'carlos.mendoza@mprj.mp.br',
  'Promotor especializado em direito de família e violência doméstica, com atuação em mediação de conflitos familiares.',
  ARRAY['Direito de Família', 'Violência Doméstica', 'Mediação Familiar', 'Guarda de Menores'],
  'Especialização em Direito de Família pela PUC-Rio',
  ARRAY['Violência Doméstica', 'Mediação Familiar', 'Proteção da Mulher'],
  ARRAY['Português', 'Espanhol', 'Inglês'],
  'http://lattes.cnpq.br/carlos-mendoza',
  '/lovable-uploads/aea22d46-7502-4a57-916e-8e2814025aa8.png',
  ARRAY['Curso de Violência Doméstica - CNJ', 'Mediação de Conflitos Familiares'],
  'Coordenador de programa de prevenção à violência doméstica',
  'user',
  true,
  true
),
-- Perfil 9: Aisha Al-Rahman (Foto 9 - Mulher com hijab)
(
  gen_random_uuid(),
  'Aisha Al-Rahman Silva',
  'MAT009012',
  ARRAY['Promotor de Justiça'],
  ARRAY['Promotor de Direitos Humanos'],
  ARRAY['Promotoria de Justiça de Defesa dos Direitos Humanos'],
  '(21) 98765-9999',
  'aisha.rahman@mprj.mp.br',
  'Promotora especializada em direitos humanos e liberdade religiosa, com atuação na defesa de minorias religiosas e culturais.',
  ARRAY['Direitos Humanos', 'Liberdade Religiosa', 'Direitos Culturais', 'Tolerância Religiosa'],
  'Mestrado em Direitos Humanos pela UFRJ',
  ARRAY['Liberdade Religiosa', 'Direitos das Minorias', 'Diversidade Cultural'],
  ARRAY['Português', 'Árabe', 'Inglês', 'Francês'],
  'http://lattes.cnpq.br/aisha-rahman',
  '/lovable-uploads/2480519a-8201-4000-b0a0-05c76c48ea0f.png',
  ARRAY['Curso de Liberdade Religiosa - UNESCO', 'Especialização em Direitos Culturais'],
  'Autora de pesquisas sobre liberdade religiosa no Brasil',
  'user',
  true,
  true
),
-- Perfil 10: Dr. Rajesh Patel (Foto 10 - Homem indiano)
(
  gen_random_uuid(),
  'Rajesh Patel Kumar',
  'MAT010123',
  ARRAY['Procurador de Justiça'],
  ARRAY['Assessor Técnico'],
  ARRAY['Centro de Apoio Operacional de Saúde'],
  '(21) 98765-0000',
  'rajesh.patel@mprj.mp.br',
  'Procurador especializado em direito sanitário e bioética, com atuação na defesa do direito à saúde e regulamentação de biotecnologia.',
  ARRAY['Direito Sanitário', 'Bioética', 'Direito à Saúde', 'Biotecnologia'],
  'Doutorado em Bioética pela FIOCRUZ',
  ARRAY['Bioética', 'Direito à Saúde', 'Biotecnologia'],
  ARRAY['Português', 'Hindi', 'Inglês'],
  'http://lattes.cnpq.br/rajesh-patel',
  '/lovable-uploads/2a2fb240-38f5-4398-9a95-76013a887d36.png',
  ARRAY['Especialização em Bioética - FIOCRUZ', 'Curso de Direito Sanitário'],
  'Coordenador de pesquisas em bioética e direito sanitário',
  'user',
  true,
  true
);

-- Inserir formações acadêmicas para os novos perfis
INSERT INTO public.academic_formations (profile_id, nivel, instituicao, curso, ano) 
SELECT 
  p.id,
  'Graduação',
  CASE 
    WHEN p.name = 'Juliana Santos Oliveira' THEN 'Universidade do Estado do Rio de Janeiro'
    WHEN p.name = 'Roberto Silva Mendes' THEN 'Universidade Federal Fluminense'
    WHEN p.name = 'Ana Lucia Chen' THEN 'Pontifícia Universidade Católica do Rio de Janeiro'
    WHEN p.name = 'Hiroshi Tanaka' THEN 'Universidade de São Paulo'
    WHEN p.name = 'Lucas Rodrigues Almeida' THEN 'Pontifícia Universidade Católica do Rio de Janeiro'
    WHEN p.name = 'Fernanda Costa Lima' THEN 'Universidade do Estado do Rio de Janeiro'
    WHEN p.name = 'André Martins Santos' THEN 'Universidade Federal do Rio de Janeiro'
    WHEN p.name = 'Carlos Mendoza Pereira' THEN 'Pontifícia Universidade Católica do Rio de Janeiro'
    WHEN p.name = 'Aisha Al-Rahman Silva' THEN 'Universidade Federal do Rio de Janeiro'
    WHEN p.name = 'Rajesh Patel Kumar' THEN 'Universidade Federal do Rio de Janeiro'
  END,
  'Direito',
  CASE 
    WHEN p.name = 'Juliana Santos Oliveira' THEN 2012
    WHEN p.name = 'Roberto Silva Mendes' THEN 1998
    WHEN p.name = 'Ana Lucia Chen' THEN 2010
    WHEN p.name = 'Hiroshi Tanaka' THEN 1985
    WHEN p.name = 'Lucas Rodrigues Almeida' THEN 2018
    WHEN p.name = 'Fernanda Costa Lima' THEN 2008
    WHEN p.name = 'André Martins Santos' THEN 2015
    WHEN p.name = 'Carlos Mendoza Pereira' THEN 2006
    WHEN p.name = 'Aisha Al-Rahman Silva' THEN 2011
    WHEN p.name = 'Rajesh Patel Kumar' THEN 1995
  END
FROM public.profiles p 
WHERE p.name IN (
  'Juliana Santos Oliveira', 'Roberto Silva Mendes', 'Ana Lucia Chen', 'Hiroshi Tanaka',
  'Lucas Rodrigues Almeida', 'Fernanda Costa Lima', 'André Martins Santos', 
  'Carlos Mendoza Pereira', 'Aisha Al-Rahman Silva', 'Rajesh Patel Kumar'
);

-- Inserir especializações/mestrados/doutorados
INSERT INTO public.academic_formations (profile_id, nivel, instituicao, curso, ano) 
SELECT 
  p.id,
  CASE 
    WHEN p.name = 'Roberto Silva Mendes' THEN 'Mestrado'
    WHEN p.name = 'Hiroshi Tanaka' THEN 'Doutorado'
    WHEN p.name = 'Lucas Rodrigues Almeida' THEN 'Mestrado'
    WHEN p.name = 'Aisha Al-Rahman Silva' THEN 'Mestrado'
    WHEN p.name = 'Rajesh Patel Kumar' THEN 'Doutorado'
    ELSE 'Especialização'
  END,
  CASE 
    WHEN p.name = 'Juliana Santos Oliveira' THEN 'Universidade do Estado do Rio de Janeiro'
    WHEN p.name = 'Roberto Silva Mendes' THEN 'Universidade Federal Fluminense'
    WHEN p.name = 'Ana Lucia Chen' THEN 'Fundação Getúlio Vargas'
    WHEN p.name = 'Hiroshi Tanaka' THEN 'Universidade de São Paulo'
    WHEN p.name = 'Lucas Rodrigues Almeida' THEN 'Pontifícia Universidade Católica do Rio de Janeiro'
    WHEN p.name = 'Fernanda Costa Lima' THEN 'Universidade do Estado do Rio de Janeiro'
    WHEN p.name = 'André Martins Santos' THEN 'Escola da Magistratura do Estado do Rio de Janeiro'
    WHEN p.name = 'Carlos Mendoza Pereira' THEN 'Pontifícia Universidade Católica do Rio de Janeiro'
    WHEN p.name = 'Aisha Al-Rahman Silva' THEN 'Universidade Federal do Rio de Janeiro'
    WHEN p.name = 'Rajesh Patel Kumar' THEN 'Fundação Oswaldo Cruz'
  END,
  CASE 
    WHEN p.name = 'Juliana Santos Oliveira' THEN 'Direitos Humanos'
    WHEN p.name = 'Roberto Silva Mendes' THEN 'Direito Administrativo'
    WHEN p.name = 'Ana Lucia Chen' THEN 'Direito Digital'
    WHEN p.name = 'Hiroshi Tanaka' THEN 'Direito Penal'
    WHEN p.name = 'Lucas Rodrigues Almeida' THEN 'Direito Ambiental'
    WHEN p.name = 'Fernanda Costa Lima' THEN 'Direitos da Criança'
    WHEN p.name = 'André Martins Santos' THEN 'Direito Penal'
    WHEN p.name = 'Carlos Mendoza Pereira' THEN 'Direito de Família'
    WHEN p.name = 'Aisha Al-Rahman Silva' THEN 'Direitos Humanos'
    WHEN p.name = 'Rajesh Patel Kumar' THEN 'Bioética'
  END,
  CASE 
    WHEN p.name = 'Juliana Santos Oliveira' THEN 2016
    WHEN p.name = 'Roberto Silva Mendes' THEN 2005
    WHEN p.name = 'Ana Lucia Chen' THEN 2018
    WHEN p.name = 'Hiroshi Tanaka' THEN 1992
    WHEN p.name = 'Lucas Rodrigues Almeida' THEN 2022
    WHEN p.name = 'Fernanda Costa Lima' THEN 2012
    WHEN p.name = 'André Martins Santos' THEN 2019
    WHEN p.name = 'Carlos Mendoza Pereira' THEN 2010
    WHEN p.name = 'Aisha Al-Rahman Silva' THEN 2015
    WHEN p.name = 'Rajesh Patel Kumar' THEN 2000
  END
FROM public.profiles p 
WHERE p.name IN (
  'Juliana Santos Oliveira', 'Roberto Silva Mendes', 'Ana Lucia Chen', 'Hiroshi Tanaka',
  'Lucas Rodrigues Almeida', 'Fernanda Costa Lima', 'André Martins Santos', 
  'Carlos Mendoza Pereira', 'Aisha Al-Rahman Silva', 'Rajesh Patel Kumar'
);

-- Inserir experiências profissionais
INSERT INTO public.professional_experiences (profile_id, tempo_mprj, experiencia_anterior, projetos_internos, publicacoes) 
SELECT 
  p.id,
  CASE 
    WHEN p.name = 'Juliana Santos Oliveira' THEN '8 anos'
    WHEN p.name = 'Roberto Silva Mendes' THEN '25 anos'
    WHEN p.name = 'Ana Lucia Chen' THEN '12 anos'
    WHEN p.name = 'Hiroshi Tanaka' THEN '35 anos'
    WHEN p.name = 'Lucas Rodrigues Almeida' THEN '5 anos'
    WHEN p.name = 'Fernanda Costa Lima' THEN '14 anos'
    WHEN p.name = 'André Martins Santos' THEN '7 anos'
    WHEN p.name = 'Carlos Mendoza Pereira' THEN '16 anos'
    WHEN p.name = 'Aisha Al-Rahman Silva' THEN '11 anos'
    WHEN p.name = 'Rajesh Patel Kumar' THEN '28 anos'
  END,
  CASE 
    WHEN p.name = 'Juliana Santos Oliveira' THEN 'Defensora Pública por 2 anos'
    WHEN p.name = 'Roberto Silva Mendes' THEN 'Advogado em escritório de direito administrativo por 3 anos'
    WHEN p.name = 'Ana Lucia Chen' THEN 'Consultora jurídica em empresa de tecnologia por 3 anos'
    WHEN p.name = 'Hiroshi Tanaka' THEN 'Professor universitário e consultor por 5 anos'
    WHEN p.name = 'Lucas Rodrigues Almeida' THEN 'Consultor ambiental por 1 ano'
    WHEN p.name = 'Fernanda Costa Lima' THEN 'Advogada em escritório de família por 2 anos'
    WHEN p.name = 'André Martins Santos' THEN 'Defensor Público por 1 ano'
    WHEN p.name = 'Carlos Mendoza Pereira' THEN 'Advogado em escritório de família por 4 anos'
    WHEN p.name = 'Aisha Al-Rahman Silva' THEN 'Consultora em direitos humanos por 2 anos'
    WHEN p.name = 'Rajesh Patel Kumar' THEN 'Pesquisador na FIOCRUZ por 3 anos'
  END,
  CASE 
    WHEN p.name = 'Juliana Santos Oliveira' THEN 'Coordenação do programa de igualdade racial'
    WHEN p.name = 'Roberto Silva Mendes' THEN 'Modernização do controle administrativo'
    WHEN p.name = 'Ana Lucia Chen' THEN 'Núcleo de proteção do consumidor digital'
    WHEN p.name = 'Hiroshi Tanaka' THEN 'Força-tarefa de crimes financeiros'
    WHEN p.name = 'Lucas Rodrigues Almeida' THEN 'Projeto de sustentabilidade ambiental'
    WHEN p.name = 'Fernanda Costa Lima' THEN 'Programa de adoção responsável'
    WHEN p.name = 'André Martins Santos' THEN 'Capacitação em júri popular'
    WHEN p.name = 'Carlos Mendoza Pereira' THEN 'Programa de combate à violência doméstica'
    WHEN p.name = 'Aisha Al-Rahman Silva' THEN 'Núcleo de liberdade religiosa'
    WHEN p.name = 'Rajesh Patel Kumar' THEN 'Centro de bioética e direito sanitário'
  END,
  CASE 
    WHEN p.name = 'Juliana Santos Oliveira' THEN 'Artigos sobre igualdade racial na justiça'
    WHEN p.name = 'Roberto Silva Mendes' THEN 'Manual de controle administrativo'
    WHEN p.name = 'Ana Lucia Chen' THEN 'Guia sobre proteção do consumidor digital'
    WHEN p.name = 'Hiroshi Tanaka' THEN 'Livro sobre crimes financeiros internacionais'
    WHEN p.name = 'Lucas Rodrigues Almeida' THEN 'Pesquisas sobre direito ambiental climático'
    WHEN p.name = 'Fernanda Costa Lima' THEN 'Cartilha sobre direitos da criança'
    WHEN p.name = 'André Martins Santos' THEN 'Manual de técnicas de júri popular'
    WHEN p.name = 'Carlos Mendoza Pereira' THEN 'Protocolo de atendimento em violência doméstica'
    WHEN p.name = 'Aisha Al-Rahman Silva' THEN 'Pesquisa sobre liberdade religiosa no Brasil'
    WHEN p.name = 'Rajesh Patel Kumar' THEN 'Estudos em bioética e direito sanitário'
  END
FROM public.profiles p 
WHERE p.name IN (
  'Juliana Santos Oliveira', 'Roberto Silva Mendes', 'Ana Lucia Chen', 'Hiroshi Tanaka',
  'Lucas Rodrigues Almeida', 'Fernanda Costa Lima', 'André Martins Santos', 
  'Carlos Mendoza Pereira', 'Aisha Al-Rahman Silva', 'Rajesh Patel Kumar'
);

-- Inserir disponibilidade para os perfis
INSERT INTO public.availability (profile_id, tipo_colaboracao, disponibilidade_estimada, forma_contato, horario_preferencial) 
SELECT 
  p.id,
  CASE 
    WHEN p.name = 'Juliana Santos Oliveira' THEN ARRAY['consultoria', 'capacitacao']::collaboration_type[]
    WHEN p.name = 'Roberto Silva Mendes' THEN ARRAY['consultoria', 'parecer']::collaboration_type[]
    WHEN p.name = 'Ana Lucia Chen' THEN ARRAY['parecer', 'capacitacao']::collaboration_type[]
    WHEN p.name = 'Hiroshi Tanaka' THEN ARRAY['consultoria', 'projeto']::collaboration_type[]
    WHEN p.name = 'Lucas Rodrigues Almeida' THEN ARRAY['projeto', 'capacitacao']::collaboration_type[]
    WHEN p.name = 'Fernanda Costa Lima' THEN ARRAY['parecer', 'capacitacao']::collaboration_type[]
    WHEN p.name = 'André Martins Santos' THEN ARRAY['consultoria', 'capacitacao']::collaboration_type[]
    WHEN p.name = 'Carlos Mendoza Pereira' THEN ARRAY['parecer', 'capacitacao']::collaboration_type[]
    WHEN p.name = 'Aisha Al-Rahman Silva' THEN ARRAY['consultoria', 'parecer']::collaboration_type[]
    WHEN p.name = 'Rajesh Patel Kumar' THEN ARRAY['consultoria', 'projeto']::collaboration_type[]
  END,
  CASE 
    WHEN p.name = 'Juliana Santos Oliveira' THEN '6 horas por semana'
    WHEN p.name = 'Roberto Silva Mendes' THEN '4 horas por semana'
    WHEN p.name = 'Ana Lucia Chen' THEN '5 horas por semana'
    WHEN p.name = 'Hiroshi Tanaka' THEN '3 horas por semana'
    WHEN p.name = 'Lucas Rodrigues Almeida' THEN '8 horas por semana'
    WHEN p.name = 'Fernanda Costa Lima' THEN '4 horas por semana'
    WHEN p.name = 'André Martins Santos' THEN '5 horas por semana'
    WHEN p.name = 'Carlos Mendoza Pereira' THEN '6 horas por semana'
    WHEN p.name = 'Aisha Al-Rahman Silva' THEN '4 horas por semana'
    WHEN p.name = 'Rajesh Patel Kumar' THEN '3 horas por semana'
  END,
  CASE 
    WHEN p.name IN ('Juliana Santos Oliveira', 'Ana Lucia Chen', 'Lucas Rodrigues Almeida') THEN 'email'::contact_preference
    WHEN p.name IN ('Roberto Silva Mendes', 'André Martins Santos') THEN 'telefone'::contact_preference
    WHEN p.name IN ('Hiroshi Tanaka', 'Fernanda Costa Lima', 'Carlos Mendoza Pereira', 'Aisha Al-Rahman Silva', 'Rajesh Patel Kumar') THEN 'teams'::contact_preference
  END,
  CASE 
    WHEN p.name = 'Juliana Santos Oliveira' THEN 'Manhã (9h às 12h)'
    WHEN p.name = 'Roberto Silva Mendes' THEN 'Tarde (14h às 17h)'
    WHEN p.name = 'Ana Lucia Chen' THEN 'Tarde (13h às 16h)'
    WHEN p.name = 'Hiroshi Tanaka' THEN 'Manhã (8h às 11h)'
    WHEN p.name = 'Lucas Rodrigues Almeida' THEN 'Qualquer horário'
    WHEN p.name = 'Fernanda Costa Lima' THEN 'Manhã (8h às 11h)'
    WHEN p.name = 'André Martins Santos' THEN 'Tarde (14h às 18h)'
    WHEN p.name = 'Carlos Mendoza Pereira' THEN 'Manhã (9h às 12h)'
    WHEN p.name = 'Aisha Al-Rahman Silva' THEN 'Tarde (13h às 16h)'
    WHEN p.name = 'Rajesh Patel Kumar' THEN 'Manhã (8h às 12h)'
  END
FROM public.profiles p 
WHERE p.name IN (
  'Juliana Santos Oliveira', 'Roberto Silva Mendes', 'Ana Lucia Chen', 'Hiroshi Tanaka',
  'Lucas Rodrigues Almeida', 'Fernanda Costa Lima', 'André Martins Santos', 
  'Carlos Mendoza Pereira', 'Aisha Al-Rahman Silva', 'Rajesh Patel Kumar'
);

-- Inserir alguns projetos relevantes para cada perfil (corrigindo tipos de data)
INSERT INTO public.projects (profile_id, nome, data_inicio, data_fim, observacoes) 
SELECT 
  p.id,
  projeto.nome,
  projeto.data_inicio::DATE,
  projeto.data_fim::DATE,
  projeto.observacoes
FROM public.profiles p 
CROSS JOIN LATERAL (
  VALUES 
    ('Programa de Igualdade Racial no MP', '2022-01-15', NULL, 'Implementação de políticas de igualdade racial'),
    ('Modernização do Controle Administrativo', '2020-03-01', '2023-02-28', 'Atualização de procedimentos de controle'),
    ('Núcleo de Proteção Digital', '2021-06-01', NULL, 'Proteção do consumidor no ambiente digital'),
    ('Força-tarefa Crimes Financeiros', '2019-01-01', '2022-12-31', 'Combate a crimes financeiros complexos'),
    ('Projeto Sustentabilidade Verde', '2023-01-01', NULL, 'Iniciativas de sustentabilidade ambiental'),
    ('Programa Adoção Responsável', '2020-08-01', NULL, 'Facilitação de processos de adoção'),
    ('Capacitação Júri Popular', '2021-03-01', '2023-06-30', 'Treinamento em técnicas de júri'),
    ('Combate à Violência Doméstica', '2020-05-01', NULL, 'Prevenção e combate à violência doméstica'),
    ('Núcleo Liberdade Religiosa', '2021-01-01', NULL, 'Defesa da liberdade religiosa e tolerância'),
    ('Centro de Bioética Aplicada', '2019-07-01', NULL, 'Pesquisa e aplicação de bioética no direito')
) AS projeto(nome, data_inicio, data_fim, observacoes)
WHERE (p.name = 'Juliana Santos Oliveira' AND projeto.nome = 'Programa de Igualdade Racial no MP')
   OR (p.name = 'Roberto Silva Mendes' AND projeto.nome = 'Modernização do Controle Administrativo')
   OR (p.name = 'Ana Lucia Chen' AND projeto.nome = 'Núcleo de Proteção Digital')
   OR (p.name = 'Hiroshi Tanaka' AND projeto.nome = 'Força-tarefa Crimes Financeiros')
   OR (p.name = 'Lucas Rodrigues Almeida' AND projeto.nome = 'Projeto Sustentabilidade Verde')
   OR (p.name = 'Fernanda Costa Lima' AND projeto.nome = 'Programa Adoção Responsável')
   OR (p.name = 'André Martins Santos' AND projeto.nome = 'Capacitação Júri Popular')
   OR (p.name = 'Carlos Mendoza Pereira' AND projeto.nome = 'Combate à Violência Doméstica')
   OR (p.name = 'Aisha Al-Rahman Silva' AND projeto.nome = 'Núcleo Liberdade Religiosa')
   OR (p.name = 'Rajesh Patel Kumar' AND projeto.nome = 'Centro de Bioética Aplicada');
