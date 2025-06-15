
-- Altera todas as funções dos perfis para serem apenas as permitidas.
DO $$
DECLARE
  funcoes_validas text[] := ARRAY[
    'Procurador-Geral de Justiça',
    'Subprocurador-geral de Justiça',
    'Corregedor-geral',
    'Subcorregedor-geral',
    'Conselheiro',
    'Coordenador',
    'Diretor',
    'Gerente',
    'Assessor',
    'Chefe',
    'Secretário',
    'Supervisor',
    'Perito',
    'Consultor',
    'Auditor'
  ];
  rec RECORD;
  funcoes_corrigidas text[];
BEGIN
  FOR rec IN SELECT id, funcao FROM profiles WHERE funcao IS NOT NULL LOOP
    funcoes_corrigidas := ARRAY(
      SELECT 
        CASE
          WHEN f = ANY(funcoes_validas) THEN f
          ELSE 'Chefe'
        END
      FROM unnest(rec.funcao) AS f
    );
    UPDATE profiles SET funcao = funcoes_corrigidas WHERE id = rec.id;
  END LOOP;
END$$;
