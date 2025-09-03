
import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, defaultFormValues } from '../components/profile/ProfileFormSchema';
import { useProfileEdit } from '../hooks/useProfileEdit';
import { useProfileFormHandler } from '../components/profile/ProfileFormHandler';

export function useProfileEditFormController(profileId?: string, isAdminEdit?: boolean) {
  const { user } = useAuth();
  const {
    loading,
    saving,
    error,
    successMessage,
    userProfile,
    saveProfile
  } = useProfileEdit(profileId); // Passando profileId para o hook

  const [fotoPreview, setFotoPreview] = useState('');
  const [projetos, setProjetos] = useState<any[]>([]);
  const [disponibilidade, setDisponibilidade] = useState<any>({});

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: defaultFormValues
  });

  const { populateFormWithProfile, handleFileUpload } = useProfileFormHandler({
    form,
    profile: userProfile,
    fotoPreview,
    setFotoPreview,
    formacaoAcademica: [],
    setFormacaoAcademica: () => {},
    projetos,
    setProjetos,
    disponibilidade,
    setDisponibilidade
  });

  // Controle de carregamento do perfil
  const hasPopulatedProfile = useRef(false);

  useEffect(() => {
    if (userProfile && !hasPopulatedProfile.current) {
      console.log("[DEBUG] Populando formulário com userProfile:", userProfile);
      console.log("[DEBUG] Profile ID sendo editado:", profileId || "próprio usuário");
      console.log("[DEBUG] É edição admin?", isAdminEdit);
      populateFormWithProfile(userProfile);
      hasPopulatedProfile.current = true;
    } else if (!userProfile && user && !profileId && !hasPopulatedProfile.current) {
      // Novo usuário ou profile não existente, popular valores mínimos
      form.setValue('name', user.email || '');
      form.setValue('email', user.email || '');
      form.setValue('matricula', '');
      hasPopulatedProfile.current = true;
      console.log("[DEBUG] Form setado para dados mínimos");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile, user, profileId]);

  // Resetar controle se mudar o profile (novo login/etc)
  useEffect(() => {
    hasPopulatedProfile.current = false;
  }, [userProfile?.id, profileId]);

  useEffect(() => {
    if (userProfile) {
      setTimeout(() => {
        console.log("[DEBUG] Valores do formulário após populate:", form.getValues());
      }, 100);
    }
  }, [userProfile, form]);

  useEffect(() => {
    if (Object.keys(form.formState.errors).length > 0) {
      console.log("[DEBUG] Erros no formulário:", form.formState.errors);
    }
  }, [form.formState.errors]);

  const handleSave = async (data: any) => {
    // Garantir que os campos venham como string
    const biografia = typeof data.biografia === 'string' ? data.biografia : (data.biografia ? String(data.biografia) : '');
    const publicacoes = typeof data.publicacoes === 'string' ? data.publicacoes : (data.publicacoes ? String(data.publicacoes) : '');

    const ensureArray = (v: any) => Array.isArray(v) ? v : (typeof v === 'string' && v.trim().startsWith('[') ? (() => { try { const p = JSON.parse(v); return Array.isArray(p) ? p : []; } catch { return []; } })() : []);

    const cleanedData = {
      ...data,
      biografia,
      publicacoes,
      cargo: ensureArray(data.cargo),
      funcao: ensureArray(data.funcao),
      unidade: ensureArray(data.unidade),
      temasInteresse: ensureArray(data.temasInteresse),
      idiomas: ensureArray(data.idiomas),
      certificacoes: ensureArray(data.certificacoes),
    };

    console.log('[DEBUG][FORM BEFORE SUBMIT]:', {
      biografia,
      publicacoes,
      formData: cleanedData,
      types: {
        cargo: typeof cleanedData.cargo,
        funcao: typeof cleanedData.funcao,
        unidade: typeof cleanedData.unidade,
        temasInteresse: typeof cleanedData.temasInteresse,
        idiomas: typeof cleanedData.idiomas,
        certificacoes: typeof cleanedData.certificacoes,
      },
      profileIdBeingEdited: profileId,
      isAdminEdit,
      targetProfileId: userProfile?.id
    });

    // Atualizar os campos de biografia e publicacoes antes do submit
    await saveProfile(
      cleanedData,
      fotoPreview,
      cleanedData.formacaoAcademica || [],
      projetos,
      disponibilidade,
      profileId // Passando o profileId específico para o saveProfile
    );
  };

  return {
    userProfile,
    loading,
    saving,
    error,
    successMessage,
    form,
    handleSave,
    fotoPreview,
    setFotoPreview,
    handleFileUpload,
    projetos,
    setProjetos,
    disponibilidade,
    setDisponibilidade,
  };
}
