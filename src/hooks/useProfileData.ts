
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '../types';
import { 
  tipoColaboracaoReverseMap, 
  formaContatoReverseMap 
} from '../components/profile/ProfileFormConstants';

export const useProfileData = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      
      const { data: profile, error } = await supabase
        .from('profiles')
        .select(`
          *,
          projects(*),
          academic_formations(*),
          professional_experiences(*),
          availability(*)
        `)
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (profile) {
        // Transform Supabase data to Profile interface
        const transformedProfile: Profile = {
          id: profile.id,
          userId: profile.user_id || '',
          name: profile.name,
          matricula: profile.matricula,
          cargo: profile.cargo || [],
          funcao: profile.funcao || [],
          unidade: profile.unidade || [],
          telefone: profile.telefone || '',
          email: profile.email,
          biografia: profile.biografia || '',
          areasConhecimento: profile.areas_conhecimento || [],
          especializacoes: profile.especializacoes || '',
          temasInteresse: profile.temas_interesse || [],
          idiomas: profile.idiomas || [],
          linkCurriculo: profile.link_curriculo || '',
          fotoUrl: profile.foto_url || '',
          certificacoes: profile.certificacoes || [],
          publicacoes: profile.publicacoes || '',
          role: profile.role as 'admin' | 'user',
          isActive: profile.is_active ?? true,
          aceiteTermos: profile.aceite_termos ?? false,
          updatedByAdmin: profile.updated_by_admin ?? false,
          lastUpdated: new Date(profile.updated_at || profile.created_at || new Date()),
          projetos: profile.projects?.map((p: any) => ({
            id: p.id,
            nome: p.nome,
            dataInicio: new Date(p.data_inicio),
            dataFim: p.data_fim ? new Date(p.data_fim) : undefined,
            observacoes: p.observacoes || ''
          })) || [],
          formacaoAcademica: profile.academic_formations?.map((f: any) => ({
            id: f.id,
            nivel: f.nivel,
            instituicao: f.instituicao,
            curso: f.curso,
            ano: f.ano
          })) || [],
          experienciasProfissionais: profile.professional_experiences?.map((e: any) => ({
            tempoMPRJ: e.tempo_mprj || '',
            experienciaAnterior: e.experiencia_anterior || '',
            projetosInternos: e.projetos_internos || '',
            publicacoes: e.publicacoes || ''
          })) || [],
          disponibilidade: profile.availability?.[0] ? {
            tipoColaboracao: (profile.availability[0].tipo_colaboracao || []).map((tipo: string) => 
              tipoColaboracaoReverseMap[tipo] || tipo
            ),
            disponibilidadeEstimada: profile.availability[0].disponibilidade_estimada || ''
          } : {
            tipoColaboracao: [],
            disponibilidadeEstimada: ''
          },
          contato: profile.availability?.[0] ? {
            formaContato: formaContatoReverseMap[profile.availability[0].forma_contato] || profile.availability[0].forma_contato || 'E-mail',
            horarioPreferencial: profile.availability[0].horario_preferencial || ''
          } : {
            formaContato: 'E-mail',
            horarioPreferencial: ''
          }
        };

        setUserProfile(transformedProfile);
        return transformedProfile;
      } else {
        return null;
      }
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
