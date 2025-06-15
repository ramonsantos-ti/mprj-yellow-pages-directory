
-- Promover o usuário a administrador
UPDATE public.profiles 
SET role = 'admin',
    updated_at = NOW()
WHERE id = '0d2f29fe-844d-4490-a8fd-c77bce07e06b';

-- Verificar se a atualização foi bem-sucedida
SELECT id, name, email, role, updated_at 
FROM public.profiles 
WHERE id = '0d2f29fe-844d-4490-a8fd-c77bce07e06b';
