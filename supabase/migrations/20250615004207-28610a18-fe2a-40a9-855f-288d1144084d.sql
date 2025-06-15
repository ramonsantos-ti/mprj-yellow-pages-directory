
-- Remover todos os dados de exemplo inseridos anteriormente
DELETE FROM public.projects WHERE profile_id IN (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'b2c3d4e5-f6a7-8901-bcde-f23456789012', 
  'c3d4e5f6-a7b8-9012-cdef-345678901234',
  'd4e5f6a7-b8c9-0123-def4-56789012345a',
  'e5f6a7b8-c9d0-1234-ef56-789012345bcd'
);

DELETE FROM public.availability WHERE profile_id IN (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'b2c3d4e5-f6a7-8901-bcde-f23456789012',
  'c3d4e5f6-a7b8-9012-cdef-345678901234', 
  'd4e5f6a7-b8c9-0123-def4-56789012345a',
  'e5f6a7b8-c9d0-1234-ef56-789012345bcd'
);

DELETE FROM public.professional_experiences WHERE profile_id IN (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'b2c3d4e5-f6a7-8901-bcde-f23456789012',
  'c3d4e5f6-a7b8-9012-cdef-345678901234',
  'd4e5f6a7-b8c9-0123-def4-56789012345a', 
  'e5f6a7b8-c9d0-1234-ef56-789012345bcd'
);

DELETE FROM public.academic_formations WHERE profile_id IN (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'b2c3d4e5-f6a7-8901-bcde-f23456789012',
  'c3d4e5f6-a7b8-9012-cdef-345678901234',
  'd4e5f6a7-b8c9-0123-def4-56789012345a',
  'e5f6a7b8-c9d0-1234-ef56-789012345bcd'
);

DELETE FROM public.profiles WHERE id IN (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'b2c3d4e5-f6a7-8901-bcde-f23456789012',
  'c3d4e5f6-a7b8-9012-cdef-345678901234',
  'd4e5f6a7-b8c9-0123-def4-56789012345a',
  'e5f6a7b8-c9d0-1234-ef56-789012345bcd'
);
