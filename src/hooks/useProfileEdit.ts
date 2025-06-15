import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '../types';
import { 
  tipoColaboracaoMap, 
  tipoColaboracaoReverseMap, 
  formaContatoMap, 
  formaContatoReverseMap 
} from '../components/profile/ProfileFormConstants';

export const useProfileEdit = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
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

  const saveProfile = async (data: any, fotoPreview: string, formacaoAcademica: any[], projetos: any[], disponibilidade: any) => {
    try {
      setSaving(true);
      setError(null);
      setSuccessMessage(null);

      console.log('Saving profile data:', {
        data,
        formacaoAcademica,
        projetos,
        disponibilidade
      });

      const profileData = {
        user_id: user?.id,
        name: data.name,
        matricula: data.matricula,
        email: data.email,
        telefone: data.telefone || null,
        biografia: data.biografia || null,
        cargo: data.cargo || [],
        funcao: data.funcao || [],
        unidade: data.unidade || [],
        areas_conhecimento: data.areasConhecimento || [],
        especializacoes: data.especializacoes || null,
        temas_interesse: data.temasInteresse || [],
        idiomas: data.idiomas || [],
        link_curriculo: data.linkCurriculo || null,
        foto_url: fotoPreview || null,
        certificacoes: data.certificacoes || [],
        publicacoes: data.publicacoes || null,
        aceite_termos: data.aceiteTermos || false,
        updated_at: new Date().toISOString()
      };

      let profileId = userProfile?.id;

      if (userProfile) {
        const { error } = await supabase
          .from('profiles')
          .update(profileData)
          .eq('id', userProfile.id);

        if (error) throw error;
      } else {
        const { data: newProfile, error } = await supabase
          .from('profiles')
          .insert(profileData)
          .select()
          .single();

        if (error) throw error;
        profileId = newProfile.id;
      }

      // Save related data
      if (profileId) {
        // Academic formations
        await supabase.from('academic_formations').delete().eq('profile_id', profileId);
        if (formacaoAcademica && formacaoAcademica.length > 0) {
          const formations = formacaoAcademica.map(f => ({
            profile_id: profileId,
            nivel: f.nivel,
            instituicao: f.instituicao,
            curso: f.curso,
            ano: parseInt(f.ano)
          }));
          const { error: formError } = await supabase.from('academic_formations').insert(formations);
          if (formError) {
            console.error('Error saving formations:', formError);
          }
        }

        // Projects
        await supabase.from('projects').delete().eq('profile_id', profileId);
        if (projetos && projetos.length > 0) {
          const projects = projetos.map(p => ({
            profile_id: profileId,
            nome: p.nome,
            data_inicio: p.dataInicio instanceof Date ? p.dataInicio.toISOString().split('T')[0] : p.dataInicio,
            data_fim: p.dataFim ? (p.dataFim instanceof Date ? p.dataFim.toISOString().split('T')[0] : p.dataFim) : null,
            observacoes: p.observacoes || null
          }));
          const { error: projError } = await supabase.from('projects').insert(projects);
          if (projError) {
            console.error('Error saving projects:', projError);
          }
        }

        // Professional experiences
        await supabase.from('professional_experiences').delete().eq('profile_id', profileId);
        if (data.experienciasProfissionais && data.experienciasProfissionais.length > 0) {
          const experiences = data.experienciasProfissionais.map((exp: any) => ({
            profile_id: profileId,
            tempo_mprj: exp.tempoMPRJ || null,
            experiencia_anterior: exp.experienciaAnterior || null,
            projetos_internos: exp.projetosInternos || null,
            publicacoes: exp.publicacoes || null
          }));
          const { error: expError } = await supabase.from('professional_experiences').insert(experiences);
          if (expError) {
            console.error('Error saving experiences:', expError);
          }
        }

        // Availability - usando os mappings corretos
        await supabase.from('availability').delete().eq('profile_id', profileId);
        if (disponibilidade && (disponibilidade.tipoColaboracao?.length > 0 || disponibilidade.disponibilidadeEstimada || disponibilidade.formaContato)) {
          console.log('Saving availability data:', disponibilidade);
          
          // Mapear os valores usando as constantes
          const tipoColaboracaoMapped = disponibilidade.tipoColaboracao?.map((tipo: string) => 
            tipoColaboracaoMap[tipo] || tipo.toLowerCase().replace(/\s+/g, '_')
          ) || [];

          const formaContatoMapped = formaContatoMap[disponibilidade.formaContato] || 'email';

          const availabilityData = {
            profile_id: profileId,
            tipo_colaboracao: tipoColaboracaoMapped,
            disponibilidade_estimada: disponibilidade.disponibilidadeEstimada || null,
            forma_contato: formaContatoMapped,
            horario_preferencial: disponibilidade.horarioPreferencial || null
          };

          console.log('Mapped availability data for database:', availabilityData);

          const { error: availError } = await supabase.from('availability').insert(availabilityData);
          if (availError) {
            console.error('Error saving availability:', availError);
            throw new Error('Erro ao salvar disponibilidade: ' + availError.message);
          }
        }
      }

      setSuccessMessage('Perfil salvo com sucesso!');
      setTimeout(() => setSuccessMessage(null), 3000);
      
      await loadUserProfile();
      
    } catch (err: any) {
      console.error('Error saving profile:', err);
      setError('Erro ao salvar perfil: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadUserProfile();
    }
  }, [user]);

  return {
    loading,
    saving,
    error,
    successMessage,
    userProfile,
    loadUserProfile,
    saveProfile,
    setError,
    setSuccessMessage
  };
};
