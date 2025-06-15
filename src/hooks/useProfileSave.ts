import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '../types';
import { saveAcademicFormations } from './profileSave/saveAcademicFormations';
import { saveProjects } from './profileSave/saveProjects';
import { saveProfessionalExperiences } from './profileSave/saveProfessionalExperiences';
import { saveAvailability } from './profileSave/saveAvailability';

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

      const safeBiografia = typeof data.biografia === 'string'
        ? data.biografia
        : (data.biografia ? String(data.biografia) : "");

      const safePublicacoes = typeof data.publicacoes === 'string'
        ? data.publicacoes
        : (data.publicacoes ? String(data.publicacoes) : "");

      const safeEspecializacoes = typeof data.especializacoes === 'string'
        ? data.especializacoes
        : (data.especializacoes ? String(data.especializacoes) : "");

      // INFO: Agora ignoramos informacoesComplementares no campo especializacoes!
      const informacoesComplementares =
        typeof data.informacoesComplementares === 'string'
          ? data.informacoesComplementares
          : (data.informacoesComplementares ? String(data.informacoesComplementares) : "");

      const profileData = {
        user_id: user?.id,
        name: data.name,
        matricula: data.matricula,
        email: data.email,
        telefone: data.telefone || null,
        biografia: safeBiografia || "",
        cargo: data.cargo || [],
        funcao: data.funcao || [],
        unidade: data.unidade || [],
        especializacoes: safeEspecializacoes || "",
        informacoes_complementares: informacoesComplementares || "",
        temas_interesse: data.temasInteresse || [],
        idiomas: data.idiomas || [],
        link_curriculo: data.linkCurriculo || "",
        foto_url: fotoPreview || "",
        certificacoes: data.certificacoes || [],
        publicacoes: safePublicacoes || "",
        aceite_termos: data.aceiteTermos || false,
        updated_at: new Date().toISOString()
      };

      let profileId = userProfile?.id;
      if (userProfile) {
        const { error } = await supabase
          .from('profiles')
          .update(profileData)
          .eq('id', userProfile.id)
          .select(`
            id,
            user_id,
            name,
            matricula,
            email,
            telefone,
            biografia,
            cargo,
            funcao,
            unidade,
            especializacoes,
            temas_interesse,
            idiomas,
            link_curriculo,
            foto_url,
            certificacoes,
            publicacoes,
            aceite_termos,
            updated_at
          `);

        if (error) throw error;
      } else {
        const { data: newProfile, error } = await supabase
          .from('profiles')
          .insert(profileData)
          .select(`
            id,
            user_id,
            name,
            matricula,
            email,
            telefone,
            biografia,
            cargo,
            funcao,
            unidade,
            especializacoes,
            temas_interesse,
            idiomas,
            link_curriculo,
            foto_url,
            certificacoes,
            publicacoes,
            aceite_termos,
            updated_at
          `)
          .single();

        if (error) throw error;
        profileId = newProfile.id;
      }

      // Salva dados relacionados usando funções separadas
      if (profileId) {
        await saveAcademicFormations(profileId, formacaoAcademica);
        await saveProjects(profileId, projetos);
        await saveProfessionalExperiences(profileId, data.experienciasProfissionais);
        await saveAvailability(profileId, disponibilidade);
      }
      onSuccess?.();

    } catch (err: any) {
      console.error('Error saving profile:', err);
      throw new Error('Erro ao salvar perfil: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return {
    saving,
    saveProfile
  };
};
