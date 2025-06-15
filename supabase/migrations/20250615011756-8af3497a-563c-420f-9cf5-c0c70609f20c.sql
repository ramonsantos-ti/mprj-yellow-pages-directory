
-- Primeiro, vamos verificar os perfis atuais
SELECT name, matricula, foto_url FROM public.profiles ORDER BY matricula;

-- Atualizar as URLs das fotos com as corretas das imagens anexadas
UPDATE public.profiles SET foto_url = '/lovable-uploads/215a355a-9b86-463f-9f4b-1679b0df79d9.png' WHERE matricula = 'MAT001';
UPDATE public.profiles SET foto_url = '/lovable-uploads/847f2741-30e1-40ac-91e9-d161f2d0071a.png' WHERE matricula = 'MAT002';
UPDATE public.profiles SET foto_url = '/lovable-uploads/13a55e2d-515e-46dd-b2e3-f04b95840f02.png' WHERE matricula = 'MAT003';
UPDATE public.profiles SET foto_url = '/lovable-uploads/0c45f747-99db-40a2-92a7-da4751428f2c.png' WHERE matricula = 'MAT004';
UPDATE public.profiles SET foto_url = '/lovable-uploads/70320c48-34fe-4c4a-a071-25eac7cbe225.png' WHERE matricula = 'MAT005';
UPDATE public.profiles SET foto_url = '/lovable-uploads/46c8d519-9632-4d7d-b820-803e93938e50.png' WHERE matricula = 'MAT006';
UPDATE public.profiles SET foto_url = '/lovable-uploads/90a0dd9a-b326-4c59-a82d-4b5e543b37b2.png' WHERE matricula = 'MAT007';
UPDATE public.profiles SET foto_url = '/lovable-uploads/b5ebd17c-330a-4fb2-8ce2-39f146112c40.png' WHERE matricula = 'MAT008';
UPDATE public.profiles SET foto_url = '/lovable-uploads/37b11ece-fa9d-43c7-9617-4f1b131750a8.png' WHERE matricula = 'MAT009';
UPDATE public.profiles SET foto_url = '/lovable-uploads/d8fec5c2-72a9-4deb-9936-1d96842e61f1.png' WHERE matricula = 'MAT010';
