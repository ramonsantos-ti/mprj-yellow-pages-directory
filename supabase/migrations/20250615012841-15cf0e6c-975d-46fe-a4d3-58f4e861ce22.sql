
-- Corrigir as URLs das fotos para usar apenas as imagens que realmente existem
-- Baseado nos arquivos disponíveis na pasta public/lovable-uploads/

UPDATE public.profiles 
SET foto_url = '/lovable-uploads/43e938c7-f896-452b-a284-3c9df63f213f.png'
WHERE name = 'Juliana Santos Oliveira';

UPDATE public.profiles 
SET foto_url = '/lovable-uploads/67816a9d-4783-48d7-a5ea-020683c86e12.png'
WHERE name = 'Roberto Silva Mendes';

UPDATE public.profiles 
SET foto_url = '/lovable-uploads/2ee6157e-fd08-4e0b-9189-84fa52673c3b.jpg'
WHERE name = 'Ana Lucia Chen';

UPDATE public.profiles 
SET foto_url = '/lovable-uploads/c07ab9f3-3adc-43c4-83c8-dac05c9c9fc3.jpg'
WHERE name = 'Hiroshi Tanaka';

UPDATE public.profiles 
SET foto_url = '/lovable-uploads/9bdb3a99-0580-4f1a-90fd-bca0f42a713d.png'
WHERE name = 'Lucas Rodrigues Almeida';

UPDATE public.profiles 
SET foto_url = '/lovable-uploads/0727d710-b656-4d7c-860a-26b792b10a84.png'
WHERE name = 'Fernanda Costa Lima';

UPDATE public.profiles 
SET foto_url = '/lovable-uploads/252819a5-bbb7-47c1-9299-20befdcf4b35.png'
WHERE name = 'André Martins Santos';

UPDATE public.profiles 
SET foto_url = '/lovable-uploads/5785e26a-35aa-4cb7-8756-8076d98ebaf2.png'
WHERE name = 'Carlos Mendoza Pereira';

UPDATE public.profiles 
SET foto_url = '/lovable-uploads/82b4eaed-3b82-4477-9ce5-bf0e9ef57f64.png'
WHERE name = 'Aisha Al-Rahman Silva';

UPDATE public.profiles 
SET foto_url = '/lovable-uploads/9d9e158c-6b10-4a90-9722-25ab82516e04.png'
WHERE name = 'Rajesh Patel Kumar';

-- Verificar o resultado
SELECT name, matricula, foto_url FROM public.profiles WHERE name IN (
  'Juliana Santos Oliveira', 'Roberto Silva Mendes', 'Ana Lucia Chen', 'Hiroshi Tanaka',
  'Lucas Rodrigues Almeida', 'Fernanda Costa Lima', 'André Martins Santos', 
  'Carlos Mendoza Pereira', 'Aisha Al-Rahman Silva', 'Rajesh Patel Kumar'
) ORDER BY matricula;
