
-- Lista final de unidades permitidas, em ordem alfabética (convertidas para checagem literal)
DO $$
DECLARE
  unidades_validas text[] := ARRAY[
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
  rec RECORD;
  unidades_corrigidas text[];
BEGIN
  FOR rec IN SELECT id, unidade FROM profiles WHERE unidade IS NOT NULL LOOP
    unidades_corrigidas := ARRAY(
      SELECT 
        CASE
          WHEN f = ANY(unidades_validas) THEN f
          ELSE 'Promotoria de Justiça'
        END
      FROM unnest(rec.unidade) AS f
    );
    UPDATE profiles SET unidade = unidades_corrigidas WHERE id = rec.id;
  END LOOP;
END$$;
