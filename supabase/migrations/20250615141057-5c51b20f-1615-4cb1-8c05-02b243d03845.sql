
-- Lista de cargos permitidos
DO $$
DECLARE
  cargos_validos text[] := ARRAY[
    'Procurador de Justiça',
    'Promotor de Justiça',
    'Promotor de Justiça Substituto',
    'Analista',
    'Técnico',
    'Auxiliar',
    'Cedido (superior)',
    'Cedido (médio)',
    'Estagiário (superior)',
    'Estagiário (médio)',
    'Terceirizado',
    'Comissionado',
    'Residente Jurídico',
    'Residente Técnico'
  ];
  rec RECORD;
  cargos_corrigidos text[];
BEGIN
  FOR rec IN SELECT id, cargo FROM profiles WHERE cargo IS NOT NULL LOOP
    cargos_corrigidos := ARRAY(
      SELECT 
        CASE WHEN c = ANY(cargos_validos) THEN c ELSE 'Analista' END
      FROM unnest(rec.cargo) AS c
    );
    UPDATE profiles SET cargo = cargos_corrigidos WHERE id = rec.id;
  END LOOP;
END$$;
