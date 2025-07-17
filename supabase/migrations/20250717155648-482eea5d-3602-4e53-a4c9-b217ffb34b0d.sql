
-- Add new columns to professional_experiences table
ALTER TABLE professional_experiences 
ADD COLUMN empresa_instituicao TEXT,
ADD COLUMN cargo_funcao TEXT,
ADD COLUMN data_inicio DATE,
ADD COLUMN data_fim DATE,
ADD COLUMN atividades TEXT;

-- Remove old columns from professional_experiences table
ALTER TABLE professional_experiences 
DROP COLUMN tempo_mprj,
DROP COLUMN experiencia_anterior,
DROP COLUMN projetos_internos,
DROP COLUMN publicacoes;
