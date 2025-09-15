-- Create disability types table
CREATE TABLE public.disability_types (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('fisica', 'visual', 'auditiva', 'intelectual', 'multipla')),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create profile disabilities junction table
CREATE TABLE public.profile_disabilities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID NOT NULL,
  disability_type_id UUID NOT NULL REFERENCES public.disability_types(id) ON DELETE CASCADE,
  additional_info TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(profile_id, disability_type_id)
);

-- Add PcD fields to profiles table
ALTER TABLE public.profiles 
ADD COLUMN is_pcd BOOLEAN DEFAULT false,
ADD COLUMN pcd_visibility_level TEXT DEFAULT 'logged_users' CHECK (pcd_visibility_level IN ('public', 'logged_users', 'admin_only'));

-- Enable RLS on new tables
ALTER TABLE public.disability_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_disabilities ENABLE ROW LEVEL SECURITY;

-- RLS policies for disability_types (public read)
CREATE POLICY "Anyone can read disability types" 
ON public.disability_types 
FOR SELECT 
USING (true);

-- RLS policies for profile_disabilities
CREATE POLICY "Users can manage own disabilities" 
ON public.profile_disabilities 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE profiles.id = profile_disabilities.profile_id 
  AND profiles.user_id = auth.uid()
));

CREATE POLICY "Admins can manage all disabilities" 
ON public.profile_disabilities 
FOR ALL 
USING (is_admin(auth.uid()));

CREATE POLICY "Public can read disabilities of active profiles with public visibility" 
ON public.profile_disabilities 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE profiles.id = profile_disabilities.profile_id 
  AND profiles.is_active = true 
  AND profiles.pcd_visibility_level = 'public'
));

CREATE POLICY "Logged users can read disabilities with logged_users visibility" 
ON public.profile_disabilities 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL 
  AND EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = profile_disabilities.profile_id 
    AND profiles.is_active = true 
    AND profiles.pcd_visibility_level IN ('public', 'logged_users')
  )
);

-- Insert disability types data
INSERT INTO public.disability_types (name, category, description) VALUES
-- Deficiência Física
('Paraplegia', 'fisica', 'Paralisia dos membros inferiores'),
('Tetraplegia', 'fisica', 'Paralisia dos quatro membros'),
('Hemiplegia', 'fisica', 'Paralisia de um lado do corpo'),
('Triplegia', 'fisica', 'Paralisia de três membros'),
('Monoplegia', 'fisica', 'Paralisia de um membro'),
('Paralisia Cerebral', 'fisica', 'Distúrbio neuromotor'),
('Amputação de Membros', 'fisica', 'Perda de membros por amputação'),
('Nanismo', 'fisica', 'Baixa estatura'),
('Malformação Congênita', 'fisica', 'Malformações presentes desde o nascimento'),
('Deformidades Osteoarticulares', 'fisica', 'Alterações no sistema musculoesquelético'),

-- Deficiência Visual
('Cegueira Total', 'visual', 'Ausência total de visão'),
('Baixa Visão', 'visual', 'Visão subnormal ou reduzida'),
('Visão Monocular', 'visual', 'Visão em apenas um olho'),

-- Deficiência Auditiva
('Surdez Leve (26-40 dB)', 'auditiva', 'Perda auditiva leve'),
('Surdez Moderada (41-55 dB)', 'auditiva', 'Perda auditiva moderada'),
('Surdez Moderadamente Severa (56-70 dB)', 'auditiva', 'Perda auditiva moderadamente severa'),
('Surdez Severa (71-90 dB)', 'auditiva', 'Perda auditiva severa'),
('Surdez Profunda (>90 dB)', 'auditiva', 'Perda auditiva profunda'),
('Surdocegueira', 'auditiva', 'Perda simultânea da audição e visão'),

-- Deficiência Intelectual
('Deficiência Intelectual Leve', 'intelectual', 'Limitações intelectuais leves'),
('Deficiência Intelectual Moderada', 'intelectual', 'Limitações intelectuais moderadas'),
('Deficiência Intelectual Severa', 'intelectual', 'Limitações intelectuais severas'),
('Deficiência Intelectual Profunda', 'intelectual', 'Limitações intelectuais profundas'),

-- Deficiência Múltipla
('Deficiência Múltipla', 'multipla', 'Associação de duas ou mais deficiências');