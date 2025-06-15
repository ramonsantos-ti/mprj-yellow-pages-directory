
-- Atualizar as URLs das fotos para usar as imagens que realmente existem no projeto
UPDATE public.profiles 
SET foto_url = CASE 
  WHEN name = 'Juliana Santos Oliveira' THEN '/lovable-uploads/2ee6157e-fd08-4e0b-9189-84fa52673c3b.jpg'
  WHEN name = 'Roberto Silva Mendes' THEN '/lovable-uploads/c07ab9f3-3adc-43c4-83c8-dac05c9c9fc3.jpg'
  WHEN name = 'Ana Lucia Chen' THEN '/lovable-uploads/43e938c7-f896-452b-a284-3c9df63f213f.png'
  WHEN name = 'Hiroshi Tanaka' THEN '/lovable-uploads/67816a9d-4783-48d7-a5ea-020683c86e12.png'
  WHEN name = 'Lucas Rodrigues Almeida' THEN '/lovable-uploads/9bdb3a99-0580-4f1a-90fd-bca0f42a713d.png'
  WHEN name = 'Fernanda Costa Lima' THEN '/lovable-uploads/0727d710-b656-4d7c-860a-26b792b10a84.png'
  WHEN name = 'André Martins Santos' THEN '/lovable-uploads/252819a5-bbb7-47c1-9299-20befdcf4b35.png'
  WHEN name = 'Carlos Mendoza Pereira' THEN '/lovable-uploads/5785e26a-35aa-4cb7-8756-8076d98ebaf2.png'
  WHEN name = 'Aisha Al-Rahman Silva' THEN '/lovable-uploads/82b4eaed-3b82-4477-9ce5-bf0e9ef57f64.png'
  WHEN name = 'Rajesh Patel Kumar' THEN '/lovable-uploads/9d9e158c-6b10-4a90-9722-25ab82516e04.png'
  ELSE foto_url
END
WHERE name IN (
  'Juliana Santos Oliveira', 'Roberto Silva Mendes', 'Ana Lucia Chen', 'Hiroshi Tanaka',
  'Lucas Rodrigues Almeida', 'Fernanda Costa Lima', 'André Martins Santos', 
  'Carlos Mendoza Pereira', 'Aisha Al-Rahman Silva', 'Rajesh Patel Kumar'
);
