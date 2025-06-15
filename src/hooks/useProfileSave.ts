import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '../types';
import { 
  tipoColaboracaoMap, 
  formaContatoMap 
} from '../components/profile/ProfileFormConstants';

export const useProfileSave = () => {
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);

  const saveProfile = async (
    data: any, 
    fotoPreview: string, 
    formacaoAcademica: any[], 
    projetos: any[], 
    disponibilidade: any,
    userProfile?: Profile | null,
    onSuccess?: () => void
  ) => {
    try {
      setSaving(true);

      // Logs detalhados: Mostre todos os valores no objeto antes de salvar
      console.log('[DEBUG] DATA para salvar perfil:', data);
      // Logs linha a linha para campos problemáticos
      console.log('[DEBUG] Valor de biografia recebido (bruto):', data.biografia, 'typeof:', typeof data.biografia, 'null?', data.biografia === null, 'undefined?', data.biografia === undefined);
      console.log('[DEBUG] Valor de publicacoes recebido (bruto):', data.publicacoes, 'typeof:', typeof data.publicacoes, 'null?', data.publicacoes === null, 'undefined?', data.publicacoes === undefined);

      // Forçar sempre string (inclusive se vier undefined/null)
      const safeBiografia = typeof data.biografia === 'string'
        ? data.biografia
        : (data.biografia ? String(data.biografia) : '');
      const safePublicacoes = typeof data.publicacoes === 'string'
        ? data.publicacoes
        : (data.publicacoes ? String(data.publicacoes) : '');

      // Log teste após "saneamento"
      console.log('[DEBUG] Valor de biografia SANEADO:', safeBiografia);
      console.log('[DEBUG] Valor de publicacoes SANEADO:', safePublicacoes);

      const profileData = {
        user_id: user?.id,
        name: data.name,
        matricula: data.matricula,
        email: data.email,
        telefone: data.telefone || null,
        biografia: safeBiografia,
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
        publicacoes: safePublicacoes,
        aceite_termos: data.aceiteTermos || false,
        updated_at: new Date().toISOString()
      };

      // Log do objeto final
      console.log('[DEBUG] profileData pronto para banco:', profileData);

      let profileId = userProfile?.id;
      if (userProfile) {
        const { error, data: updateRet } = await supabase
          .from('profiles')
          .update(profileData)
          .eq('id', userProfile.id)
          .select(); // forçar retorno para log

        console.log('[DEBUG] RESPOSTA UPDATE:', updateRet, error);

        if (error) throw error;
      } else {
        const { data: newProfile, error } = await supabase
          .from('profiles')
          .insert(profileData)
          .select()
          .single();

        console.log('[DEBUG] RESPOSTA INSERT:', newProfile, error);

        if (error) throw error;
        profileId = newProfile.id;
      }

      // Save related data
      if (profileId) {
        await saveRelatedData(profileId, formacaoAcademica, projetos, data, disponibilidade);
      }

      onSuccess?.();

    } catch (err: any) {
      console.error('Error saving profile:', err);
      throw new Error('Erro ao salvar perfil: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const saveRelatedData = async (
    profileId: string,
    formacaoAcademica: any[],
    projetos: any[],
    data: any,
    disponibilidade: any
  ) => {
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

    // Availability
    await saveAvailability(profileId, disponibilidade);
  };

  const saveAvailability = async (profileId: string, disponibilidade: any) => {
    await supabase.from('availability').delete().eq('profile_id', profileId);
    if (disponibilidade && (disponibilidade.tipoColaboracao?.length > 0 || disponibilidade.disponibilidadeEstimada || disponibilidade.formaContato)) {
      console.log('Saving availability data:', disponibilidade);
      
      const tipoColaboracaoMapped = disponibilidade.tipoColaboracao?.map((tipo: string) => 
        tipoColaboracaoMap[tipo] || tipo.toLowerCase().replace(/\s+/g, '_')
      ) || [];

      const formaContatoMapped = formaContatoMap[disponibilidade.formaContato] || 'email';

      const availabilityData = {
        profile_id: profileId,
        tipo_colaboracao: tipoColaboracaoMapped,
        disponibilidade_estimada: disponibilidade.disponibilidadeEstimada || null,
        forma_contato: formaContatoMapped as 'email' | 'telefone' | 'teams' | 'presencial',
        horario_preferencial: disponibilidade.horarioPreferencial || null
      };

      console.log('Mapped availability data for database:', availabilityData);

      const { error: availError } = await supabase.from('availability').insert(availabilityData);
      if (availError) {
        console.error('Error saving availability:', availError);
        throw new Error('Erro ao salvar disponibilidade: ' + availError.message);
      }
    }
  };

  return {
    saving,
    saveProfile
  };
};
