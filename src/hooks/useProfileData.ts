
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '../types';
import { 
  tipoColaboracaoReverseMap, 
  formaContatoReverseMap 
} from '../components/profile/ProfileFormConstants';

export const useProfileData = (profileId?: string) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      
      // Obter o auth.uid() diretamente do Supabase
      const { data: { user: authUser } } = await supabase.auth.getUser();
      const authUserId = authUser?.id;
      
      console.log('[useProfileData] Iniciando carregamento. States:', { 
        profileId, 
        authUserId,
        contextUserId: user?.id, 
        userEmail: user?.email,
        userName: user?.name,
        authUserEmail: authUser?.email
      });
      
      let profile;
      
      if (profileId) {
        // Modo admin: buscar perfil específico por ID do perfil
        console.log('[useProfileData] Buscando perfil específico por ID:', profileId);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', profileId)
          .single();
          
        if (error) {
          console.error('[useProfileData] Erro ao buscar perfil por ID:', error);
          throw error;
        }
        
        profile = data;
        console.log('[useProfileData] Perfil encontrado por ID:', profile);
      } else {
        // Modo usuário: buscar próprio perfil
        // Estratégia: priorizar busca por e-mail (robusta contra user_id inconsistente), depois fallback por user_id
        const targetEmail = authUser?.email || user?.email;
        const targetUserId = authUserId || user?.id;

        let data: any = null;
        let error: any = null;

        if (targetEmail) {
          console.log('[useProfileData] Buscando perfil pelo e-mail (prioritário):', targetEmail);
          const byEmailRes = await supabase
            .from('profiles')
            .select('*')
            .eq('email', targetEmail)
            .order('updated_at', { ascending: false })
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();

          data = byEmailRes.data as any;
          error = byEmailRes.error;
          console.log('[useProfileData] Resultado da busca por e-mail:', { found: !!data, error });
        }

        if (!data && targetUserId) {
          console.log('[useProfileData] Fallback: buscando perfil por user_id:', targetUserId);
          const byUserIdRes = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', targetUserId)
            .maybeSingle();

          data = byUserIdRes.data as any;
          error = byUserIdRes.error;
          console.log('[useProfileData] Resultado da busca por user_id (fallback):', { found: !!data, error });
        }

        if (error && error.code !== 'PGRST116') {
          console.error('[useProfileData] Erro ao buscar perfil do usuário:', error);
          throw error;
        }

        profile = data;
      }

      if (!profile) {
        console.log('Perfil não encontrado, retornando null para criar novo perfil');
        setUserProfile(null);
        setLoading(false);
        return null;
      }

      console.log('Perfil encontrado:', profile);

      // Buscar dados relacionados usando o profile.id
      const [projectsRes, academicRes, experiencesRes, availabilityRes, disabilitiesRes] = await Promise.all([
        supabase.from('projects').select('*').eq('profile_id', profile.id),
        supabase.from('academic_formations').select('*').eq('profile_id', profile.id),
        supabase.from('professional_experiences').select('*').eq('profile_id', profile.id),
        supabase.from('availability').select('*').eq('profile_id', profile.id),
        supabase.from('profile_disabilities').select(`
          *,
          disability_type:disability_types(*)
        `).eq('profile_id', profile.id)
      ]);

      console.log('Dados relacionados carregados:', {
        projects: projectsRes.data?.length || 0,
        academic: academicRes.data?.length || 0,
        experiences: experiencesRes.data?.length || 0,
        availability: availabilityRes.data?.length || 0,
        disabilities: disabilitiesRes.data?.length || 0
      });

      // Combinar os resultados
      const enrichedProfile = {
        ...profile,
        projects: projectsRes.data || [],
        academic_formations: academicRes.data || [],
        professional_experiences: experiencesRes.data || [],
        availability: availabilityRes.data || [],
        disabilities: disabilitiesRes.data || []
      };

      const transformedProfile: Profile = {
        id: enrichedProfile.id,
        userId: enrichedProfile.user_id || '',
        name: enrichedProfile.name,
        matricula: enrichedProfile.matricula,
        cargo: enrichedProfile.cargo || [],
        funcao: enrichedProfile.funcao || [],
        unidade: enrichedProfile.unidade || [],
        telefone: enrichedProfile.telefone || '',
        email: enrichedProfile.email,
        biografia: enrichedProfile.biografia || '',
        temasInteresse: enrichedProfile.temas_interesse || [],
        idiomas: enrichedProfile.idiomas || [],
        linkCurriculo: enrichedProfile.link_curriculo || '',
        fotoUrl: enrichedProfile.foto_url || '',
        certificacoes: enrichedProfile.certificacoes || [],
        publicacoes: enrichedProfile.publicacoes || '',
        role: enrichedProfile.role as 'admin' | 'user',
        isActive: enrichedProfile.is_active ?? true,
        aceiteTermos: enrichedProfile.aceite_termos ?? false,
        updatedByAdmin: enrichedProfile.updated_by_admin ?? false,
        lastUpdated: new Date(enrichedProfile.updated_at || enrichedProfile.created_at || new Date()),
        projetos: enrichedProfile.projects?.map((p: any) => ({
          id: p.id,
          nome: p.nome,
          dataInicio: new Date(p.data_inicio),
          dataFim: p.data_fim ? new Date(p.data_fim) : undefined,
          observacoes: p.observacoes || ''
        })) || [],
        formacaoAcademica: enrichedProfile.academic_formations?.map((f: any) => ({
          id: f.id,
          nivel: f.nivel,
          instituicao: f.instituicao,
          curso: f.curso,
          ano: f.ano
        })) || [],
        experienciasProfissionais: enrichedProfile.professional_experiences?.map((e: any) => ({
          id: e.id,
          empresaInstituicao: e.empresa_instituicao || '',
          cargoFuncao: e.cargo_funcao || '',
          dataInicio: e.data_inicio || '',
          dataFim: e.data_fim || '',
          atividades: e.atividades || ''
        })) || [],
        disponibilidade: enrichedProfile.availability?.[0] ? {
          tipoColaboracao: (enrichedProfile.availability[0].tipo_colaboracao || []).map((tipo: string) => 
            tipoColaboracaoReverseMap[tipo] || tipo
          ),
          disponibilidadeEstimada: enrichedProfile.availability[0].disponibilidade_estimada || ''
        } : {
          tipoColaboracao: [],
          disponibilidadeEstimada: ''
        },
        contato: enrichedProfile.availability?.[0] ? {
          formaContato: formaContatoReverseMap[enrichedProfile.availability[0].forma_contato] || enrichedProfile.availability[0].forma_contato || 'E-mail',
          horarioPreferencial: enrichedProfile.availability[0].horario_preferencial || ''
        } : {
          formaContato: 'E-mail',
          horarioPreferencial: ''
        },
        informacoesComplementares: enrichedProfile.informacoes_complementares || '',
        isPcd: enrichedProfile.is_pcd || false,
        pcdVisibilityLevel: enrichedProfile.pcd_visibility_level || 'logged_users',
        disabilities: enrichedProfile.disabilities || []
      };

      console.log('Profile transformado final:', transformedProfile);
      setUserProfile(transformedProfile);
      return transformedProfile;
    } catch (err: any) {
      console.error('Error loading profile:', err);
      setError('Erro ao carregar perfil: ' + err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    userProfile,
    loadUserProfile,
    setError,
    setUserProfile
  };
};
