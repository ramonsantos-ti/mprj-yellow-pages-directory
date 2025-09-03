
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

  const toArray = (value: any): string[] => {
    // Accept already-valid arrays of strings
    if (Array.isArray(value)) {
      return value
        .filter((v) => typeof v === 'string')
        .map((v: string) => v.trim())
        .filter((v) => v.length > 0);
    }

    // If it's a JSON-like string array, try to parse it
    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
        try {
          const parsed = JSON.parse(trimmed);
          if (Array.isArray(parsed)) {
            return parsed
              .filter((v: any) => typeof v === 'string')
              .map((v: string) => v.trim())
              .filter((v) => v.length > 0);
          }
        } catch {/* ignore parse errors */}
      }
      // For any other plain string (e.g., "cargo"), return empty to avoid malformed array literal
      return [];
    }

    return [];
  };

  const saveProfile = async (
    data: any,
    fotoPreview: string,
    formacaoAcademica: any[],
    projetos: any[],
    disponibilidade: any,
    userProfile?: Profile | null,
    onSuccess?: () => void,
    targetProfileId?: string
  ) => {
    try {
      setSaving(true);

      const safeBiografia = typeof data.biografia === 'string'
        ? data.biografia
        : (data.biografia ? String(data.biografia) : "");

      const safePublicacoes = typeof data.publicacoes === 'string'
        ? data.publicacoes
        : (data.publicacoes ? String(data.publicacoes) : "");

      const informacoesComplementares =
        typeof data.informacoesComplementares === 'string'
          ? data.informacoesComplementares
          : (data.informacoesComplementares ? String(data.informacoesComplementares) : "");

      const profileData = {
        user_id: userProfile?.userId || user?.id, // Mantém o user_id original do perfil
        name: data.name,
        matricula: data.matricula,
        email: data.email,
        telefone: data.telefone || null,
        biografia: safeBiografia || "",
        cargo: toArray(data.cargo),
        funcao: toArray(data.funcao),
        unidade: toArray(data.unidade),
        informacoes_complementares: informacoesComplementares || "",
        temas_interesse: toArray(data.temasInteresse),
        idiomas: toArray(data.idiomas),
        link_curriculo: data.linkCurriculo || "",
        foto_url: typeof fotoPreview === 'string' ? fotoPreview : '',
        certificacoes: toArray(data.certificacoes),
        publicacoes: safePublicacoes || "",
        aceite_termos: data.aceiteTermos || false,
        updated_at: new Date().toISOString(),
        updated_by_admin: userProfile && userProfile.userId !== user?.id // Marca como editado por admin se for diferente
      };

      console.log('[DEBUG][useProfileSave] Dados a serem salvos:', {
        profileId: userProfile?.id,
        originalUserId: userProfile?.userId,
        currentUserId: user?.id,
        updatedByAdmin: profileData.updated_by_admin,
        profileData
      });

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
            temas_interesse,
            idiomas,
            link_curriculo,
            foto_url,
            certificacoes,
            publicacoes,
            aceite_termos,
            updated_at,
            updated_by_admin
          `);

        if (error) {
          console.error('[DEBUG][useProfileSave] Erro ao atualizar perfil:', error);
          throw error;
        }

        console.log('[DEBUG][useProfileSave] Perfil atualizado com sucesso para ID:', userProfile.id);
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
            temas_interesse,
            idiomas,
            link_curriculo,
            foto_url,
            certificacoes,
            publicacoes,
            aceite_termos,
            updated_at,
            updated_by_admin
          `)
          .single();

        if (error) {
          console.error('[DEBUG][useProfileSave] Erro ao criar perfil:', error);
          throw error;
        }
        profileId = newProfile.id;
        console.log('[DEBUG][useProfileSave] Novo perfil criado com ID:', profileId);
      }

      // Salva dados relacionados usando funções separadas
      if (profileId) {
        await saveAcademicFormations(profileId, formacaoAcademica);
        await saveProjects(profileId, projetos);
        await saveProfessionalExperiences(profileId, data.experienciasProfissionais);
        await saveAvailability(profileId, disponibilidade);
        console.log('[DEBUG][useProfileSave] Dados relacionados salvos para perfil ID:', profileId);
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
