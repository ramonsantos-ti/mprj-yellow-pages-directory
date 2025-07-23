
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
      
      // Se não tem profileId, usa o usuário logado
      const targetUserId = profileId || user?.id;
      
      if (!targetUserId) {
        setError('Usuário não encontrado');
        return null;
      }

      // Primeiro busca o perfil básico
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq(profileId ? 'id' : 'user_id', targetUserId)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (!profile) {
        return null;
      }

      // Depois busca os dados relacionados em consultas separadas
      const [projectsRes, academicRes, experiencesRes, availabilityRes] = await Promise.all([
        supabase.from('projects').select('*').eq('profile_id', profile.id),
        supabase.from('academic_formations').select('*').eq('profile_id', profile.id),
        supabase.from('professional_experiences').select('*').eq('profile_id', profile.id),
        supabase.from('availability').select('*').eq('profile_id', profile.id)
      ]);

      // Combina os resultados
      const enrichedProfile = {
        ...profile,
        projects: projectsRes.data || [],
        academic_formations: academicRes.data || [],
        professional_experiences: experiencesRes.data || [],
        availability: availabilityRes.data || []
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
      };

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
