-- Primeiro, vamos corrigir os user_ids duplicados
-- Criar novos UUIDs únicos para cada perfil, exceto para o perfil real do usuário logado

-- Identificar o perfil real do email que está fazendo login
DO $$
DECLARE
    correct_profile_id UUID;
    temp_user_id UUID;
    profile_record RECORD;
BEGIN
    -- Encontrar o perfil correto para ramon.santos@mprj.mp.br
    SELECT id INTO correct_profile_id 
    FROM profiles 
    WHERE email = 'ramon.santos@mprj.mp.br' 
    LIMIT 1;
    
    -- Se encontrou o perfil, manter o user_id atual apenas para ele
    IF correct_profile_id IS NOT NULL THEN
        RAISE NOTICE 'Perfil correto encontrado: %', correct_profile_id;
        
        -- Atualizar todos os outros perfis com o mesmo user_id para ter user_ids únicos
        FOR profile_record IN 
            SELECT id, email FROM profiles 
            WHERE user_id = 'c89298df-a00a-47a5-a63a-8e2beeb5b9f4' 
            AND id != correct_profile_id
        LOOP
            -- Gerar um novo UUID para cada perfil duplicado
            temp_user_id := gen_random_uuid();
            
            UPDATE profiles 
            SET user_id = temp_user_id 
            WHERE id = profile_record.id;
            
            RAISE NOTICE 'Updated profile % (%) with new user_id: %', 
                profile_record.email, profile_record.id, temp_user_id;
        END LOOP;
    END IF;
END $$;