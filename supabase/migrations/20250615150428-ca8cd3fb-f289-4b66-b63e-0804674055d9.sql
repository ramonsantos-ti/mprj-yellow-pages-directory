
-- Adiciona o campo 'informacoes_complementares' ao perfil do usuário.
ALTER TABLE public.profiles
ADD COLUMN informacoes_complementares TEXT;
