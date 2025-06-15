
-- Primeiro, vamos verificar as matrículas atuais dos perfis
SELECT name, matricula, foto_url FROM public.profiles ORDER BY name;

-- Agora vamos corrigir as matrículas e URLs das fotos para os 10 perfis principais
-- Padronizando as matrículas como MAT001 a MAT010 e mapeando com as imagens corretas

UPDATE public.profiles 
SET 
  matricula = 'MAT001',
  foto_url = '/lovable-uploads/215a355a-9b86-463f-9f4b-1679b0df79d9.png'
WHERE name = 'Juliana Santos Oliveira';

UPDATE public.profiles 
SET 
  matricula = 'MAT002',
  foto_url = '/lovable-uploads/847f2741-30e1-40ac-91e9-d161f2d0071a.png'
WHERE name = 'Roberto Silva Mendes';

UPDATE public.profiles 
SET 
  matricula = 'MAT003',
  foto_url = '/lovable-uploads/13a55e2d-515e-46dd-b2e3-f04b95840f02.png'
WHERE name = 'Ana Lucia Chen';

UPDATE public.profiles 
SET 
  matricula = 'MAT004',
  foto_url = '/lovable-uploads/0c45f747-99db-40a2-92a7-da4751428f2c.png'
WHERE name = 'Hiroshi Tanaka';

UPDATE public.profiles 
SET 
  matricula = 'MAT005',
  foto_url = '/lovable-uploads/70320c48-34fe-4c4a-a071-25eac7cbe225.png'
WHERE name = 'Lucas Rodrigues Almeida';

UPDATE public.profiles 
SET 
  matricula = 'MAT006',
  foto_url = '/lovable-uploads/46c8d519-9632-4d7d-b820-803e93938e50.png'
WHERE name = 'Fernanda Costa Lima';

UPDATE public.profiles 
SET 
  matricula = 'MAT007',
  foto_url = '/lovable-uploads/90a0dd9a-b326-4c59-a82d-4b5e543b37b2.png'
WHERE name = 'André Martins Santos';

UPDATE public.profiles 
SET 
  matricula = 'MAT008',
  foto_url = '/lovable-uploads/b5ebd17c-330a-4fb2-8ce2-39f146112c40.png'
WHERE name = 'Carlos Mendoza Pereira';

UPDATE public.profiles 
SET 
  matricula = 'MAT009',
  foto_url = '/lovable-uploads/37b11ece-fa9d-43c7-9617-4f1b131750a8.png'
WHERE name = 'Aisha Al-Rahman Silva';

UPDATE public.profiles 
SET 
  matricula = 'MAT010',
  foto_url = '/lovable-uploads/d8fec5c2-72a9-4deb-9936-1d96842e61f1.png'
WHERE name = 'Rajesh Patel Kumar';

-- Verificar o resultado final
SELECT name, matricula, foto_url FROM public.profiles WHERE name IN (
  'Juliana Santos Oliveira', 'Roberto Silva Mendes', 'Ana Lucia Chen', 'Hiroshi Tanaka',
  'Lucas Rodrigues Almeida', 'Fernanda Costa Lima', 'André Martins Santos', 
  'Carlos Mendoza Pereira', 'Aisha Al-Rahman Silva', 'Rajesh Patel Kumar'
) ORDER BY matricula;
