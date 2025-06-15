
-- Atualizar as URLs das fotos dos perfis para usar imagens placeholder válidas
UPDATE public.profiles 
SET foto_url = CASE 
  WHEN matricula = 'MAT001' THEN '/placeholder.svg'
  WHEN matricula = 'MAT002' THEN '/placeholder.svg'
  WHEN matricula = 'MAT003' THEN '/placeholder.svg'
  WHEN matricula = 'MAT004' THEN '/placeholder.svg'
  WHEN matricula = 'MAT005' THEN '/placeholder.svg'
  WHEN matricula = 'MAT006' THEN '/placeholder.svg'
  WHEN matricula = 'MAT007' THEN '/placeholder.svg'
  WHEN matricula = 'MAT008' THEN '/placeholder.svg'
  WHEN matricula = 'MAT009' THEN '/placeholder.svg'
  WHEN matricula = 'MAT010' THEN '/placeholder.svg'
  ELSE foto_url
END
WHERE matricula IN ('MAT001', 'MAT002', 'MAT003', 'MAT004', 'MAT005', 'MAT006', 'MAT007', 'MAT008', 'MAT009', 'MAT010');
