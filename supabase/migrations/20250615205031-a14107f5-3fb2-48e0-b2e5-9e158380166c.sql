
-- Passo 1: Mesclar areas_conhecimento em temas_interesse para cada perfil, removendo duplicidades
UPDATE public.profiles
SET temas_interesse = (
  SELECT ARRAY(
    SELECT DISTINCT TRIM(valor)
    FROM UNNEST(
      COALESCE(public.profiles.temas_interesse, '{}') || COALESCE(public.profiles.areas_conhecimento, '{}')
    ) AS valor
    WHERE valor IS NOT NULL AND TRIM(valor) <> ''
  )
);

-- Passo 2: Remover coluna areas_conhecimento pois agora tudo estará em temas_interesse
ALTER TABLE public.profiles DROP COLUMN areas_conhecimento;
