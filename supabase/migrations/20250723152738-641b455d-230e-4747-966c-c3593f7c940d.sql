-- Recriar as foreign keys para garantir que o relacionamento funcione corretamente
ALTER TABLE professional_experiences 
DROP CONSTRAINT IF EXISTS professional_experiences_profile_id_fkey;

ALTER TABLE professional_experiences 
ADD CONSTRAINT professional_experiences_profile_id_fkey 
FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE;