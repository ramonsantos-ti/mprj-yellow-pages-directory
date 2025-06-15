
-- Remover o campo "especializacoes" da tabela profiles
ALTER TABLE public.profiles DROP COLUMN IF EXISTS especializacoes;

-- Opcionalmente, remover qualquer índice ou dependência relacionada se existir
