
-- Apagar todos os dados das tabelas em ordem para evitar conflitos de chave estrangeira
DELETE FROM public.projects;
DELETE FROM public.availability;
DELETE FROM public.professional_experiences;
DELETE FROM public.academic_formations;
DELETE FROM public.profiles;
DELETE FROM public.audit_logs;

-- Verificar se todas as tabelas estão vazias
SELECT 'profiles' as tabela, COUNT(*) as registros FROM public.profiles
UNION ALL
SELECT 'projects' as tabela, COUNT(*) as registros FROM public.projects
UNION ALL
SELECT 'availability' as tabela, COUNT(*) as registros FROM public.availability
UNION ALL
SELECT 'professional_experiences' as tabela, COUNT(*) as registros FROM public.professional_experiences
UNION ALL
SELECT 'academic_formations' as tabela, COUNT(*) as registros FROM public.academic_formations
UNION ALL
SELECT 'audit_logs' as tabela, COUNT(*) as registros FROM public.audit_logs;
