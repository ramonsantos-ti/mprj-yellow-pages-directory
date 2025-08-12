BEGIN;

-- Guarda os perfis inseridos nesta migração para popular tabelas relacionadas
CREATE TEMP TABLE tmp_new_profiles (id uuid, i int) ON COMMIT DROP;

WITH gen AS (
  SELECT generate_series(1,50) AS i
),

to_insert AS (
  SELECT
    ('Profissional MPRJ ' || i)::text AS name,
    ('MPRJ-' || lpad(i::text,4,'0'))::text AS matricula,
    ('profissional' || i || '@mprj.mp.br')::text AS email,
    CASE
      WHEN i % 6 = 1 THEN ARRAY['Promotor de Justiça']::text[]
      WHEN i % 6 = 2 THEN ARRAY['Procurador de Justiça']::text[]
      WHEN i % 6 = 3 THEN ARRAY['Analista do MP']::text[]
      WHEN i % 6 = 4 THEN ARRAY['Técnico do MP']::text[]
      WHEN i % 6 = 5 THEN ARRAY['Assessor Jurídico']::text[]
      ELSE ARRAY['Servidor']::text[] END AS cargo,
    CASE
      WHEN i % 6 = 1 THEN ARRAY['Promotoria de Justiça']::text[]
      WHEN i % 6 = 2 THEN ARRAY['Subprocuradoria']::text[]
      WHEN i % 6 = 3 THEN ARRAY['CIAD']::text[]
      WHEN i % 6 = 4 THEN ARRAY['GAECO']::text[]
      WHEN i % 6 = 5 THEN ARRAY['Ouvidoria']::text[]
      ELSE ARRAY['GAB/PGJ']::text[] END AS funcao,
    CASE
      WHEN i % 6 = 1 THEN ARRAY['Promotoria de Justiça da Capital']::text[]
      WHEN i % 6 = 2 THEN ARRAY['Procuradoria de Justiça - Capital']::text[]
      WHEN i % 6 = 3 THEN ARRAY['Núcleo Niterói']::text[]
      WHEN i % 6 = 4 THEN ARRAY['Campos dos Goytacazes']::text[]
      WHEN i % 6 = 5 THEN ARRAY['Duque de Caxias']::text[]
      ELSE ARRAY['São Gonçalo']::text[] END AS unidade,
    ('(21) 3' || lpad(((1000 + (i % 9000))::text), 4, '0') || '-' || lpad(((1000 + ((i*37) % 9000))::text), 4, '0')))::text AS telefone,
    ('Profissional do MPRJ com experiência em áreas finalísticas e de apoio. Perfil gerado para testes.')::text AS biografia,
    CASE
      WHEN i % 5 = 0 THEN ARRAY['Combate à corrupção','Criminal']::text[]
      WHEN i % 5 = 1 THEN ARRAY['Meio ambiente','Direitos Humanos']::text[]
      WHEN i % 5 = 2 THEN ARRAY['Execução Penal','Cível']::text[]
      WHEN i % 5 = 3 THEN ARRAY['LGPD','Transformação Digital']::text[]
      ELSE ARRAY['Análise de Dados','Transparência']::text[]
    END AS temas_interesse,
    CASE
      WHEN i % 4 = 0 THEN ARRAY['Português','Inglês']::text[]
      WHEN i % 4 = 1 THEN ARRAY['Português']::text[]
      WHEN i % 4 = 2 THEN ARRAY['Português','Espanhol']::text[]
      ELSE ARRAY['Português','Inglês','Espanhol']::text[]
    END AS idiomas,
    NULL::text AS link_curriculo,
    NULL::text AS foto_url,
    CASE
      WHEN i % 4 = 0 THEN ARRAY['LGPD','Compliance']::text[]
      WHEN i % 4 = 1 THEN ARRAY['Mediação']::text[]
      WHEN i % 4 = 2 THEN ARRAY['Gestão de Projetos (PMI)']::text[]
      ELSE ARRAY[]::text[]
    END AS certificacoes,
    NULL::text AS publicacoes,
    'Disponível para projetos interinstitucionais no MPRJ.'::text AS informacoes_complementares,
    true AS aceite_termos,
    true AS is_active
  FROM gen
),

ins AS (
  INSERT INTO public.profiles (
    name, matricula, email, cargo, funcao, unidade, telefone, biografia,
    temas_interesse, idiomas, link_curriculo, foto_url, certificacoes, publicacoes,
    informacoes_complementares, aceite_termos, is_active, role
  )
  SELECT
    name, matricula, email, cargo, funcao, unidade, telefone, biografia,
    temas_interesse, idiomas, link_curriculo, foto_url, certificacoes, publicacoes,
    informacoes_complementares, aceite_termos, is_active, 'user'::app_role
  FROM to_insert t
  WHERE NOT EXISTS (SELECT 1 FROM public.profiles p WHERE p.email = t.email)
  RETURNING id, email
)
INSERT INTO tmp_new_profiles (id, i)
SELECT id, (regexp_matches(email, 'profissional([0-9]+)@'))[1]::int AS i
FROM ins;

-- Disponibilidade
INSERT INTO public.availability (profile_id, disponibilidade_estimada, horario_preferencial)
SELECT id,
  CASE WHEN i % 3 = 0 THEN 'Até 4h/semana'
       WHEN i % 3 = 1 THEN '4–8h/semana'
       ELSE '8–12h/semana' END,
  CASE WHEN i % 2 = 0 THEN 'Manhã' ELSE 'Tarde' END
FROM tmp_new_profiles;

-- Formação acadêmica (1 por perfil)
INSERT INTO public.academic_formations (profile_id, nivel, instituicao, curso, ano)
SELECT id,
  CASE WHEN i % 4 = 0 THEN 'Mestrado'
       WHEN i % 4 = 1 THEN 'Graduação'
       WHEN i % 4 = 2 THEN 'Especialização'
       ELSE 'Doutorado' END,
  CASE WHEN i % 4 = 0 THEN 'UFRJ'
       WHEN i % 4 = 1 THEN 'UERJ'
       WHEN i % 4 = 2 THEN 'FGV-Rio'
       ELSE 'UFF' END,
  CASE WHEN i % 5 = 0 THEN 'Direito'
       WHEN i % 5 = 1 THEN 'Administração'
       WHEN i % 5 = 2 THEN 'Ciência de Dados'
       WHEN i % 5 = 3 THEN 'Gestão Pública'
       ELSE 'Ciências Contábeis' END,
  (2000 + ((i*7) % 23))
FROM tmp_new_profiles;

-- Experiência profissional (1 por perfil)
INSERT INTO public.professional_experiences (profile_id, empresa_instituicao, cargo_funcao, atividades, data_inicio, data_fim)
SELECT id,
  'MPRJ',
  CASE WHEN i % 6 = 1 THEN 'Promotor de Justiça'
       WHEN i % 6 = 2 THEN 'Procurador de Justiça'
       WHEN i % 6 = 3 THEN 'Analista do MP'
       WHEN i % 6 = 4 THEN 'Técnico do MP'
       WHEN i % 6 = 5 THEN 'Assessor Jurídico'
       ELSE 'Servidor' END,
  'Atuação em procedimentos, projetos e suporte institucional no MPRJ.',
  (DATE '2008-01-01' + ((i*53) % 4000)),
  CASE WHEN i % 4 = 0 THEN NULL ELSE (DATE '2018-01-01' + ((i*17) % 2000)) END
FROM tmp_new_profiles;

-- Projetos (1 por perfil)
INSERT INTO public.projects (profile_id, nome, data_inicio, data_fim, observacoes)
SELECT id,
  CASE WHEN i % 5 = 0 THEN 'Projeto Transparência Ativa'
       WHEN i % 5 = 1 THEN 'Projeto GAECO Integrado'
       WHEN i % 5 = 2 THEN 'Projeto LGPD no MPRJ'
       WHEN i % 5 = 3 THEN 'Projeto Transformação Digital'
       ELSE 'Projeto Observatório de Dados' END,
  (DATE '2020-01-01' + ((i*11) % 1000)),
  CASE WHEN i % 3 = 0 THEN NULL ELSE (DATE '2021-06-01' + ((i*13) % 600)) END,
  'Projeto institucional do MPRJ.'
FROM tmp_new_profiles;

COMMIT;