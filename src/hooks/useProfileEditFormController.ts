
import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, defaultFormValues } from '../components/profile/ProfileFormSchema';
import { useProfileEdit } from '../hooks/useProfileEdit';
import { useProfileFormHandler } from '../components/profile/ProfileFormHandler';

export function useProfileEditFormController() {
  const { user } = useAuth();
  const {
    loading,
    saving,
    error,
    successMessage,
    userProfile,
    saveProfile
  } = useProfileEdit();

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
  const hasLoadedProfileRef = useRef(false);

  useEffect(() => {
    console.log("[DEBUG] userProfile carregado do banco:", userProfile);
    if (userProfile && !hasLoadedProfileRef.current) {
      populateFormWithProfile(userProfile);
      hasLoadedProfileRef.current = true;
      console.log("[DEBUG] populateFormWithProfile executado");
    } else if (user && !userProfile && !hasLoadedProfileRef.current) {
      form.setValue('name', user?.email || '');
      form.setValue('email', user?.email || '');
      form.setValue('matricula', '');
      hasLoadedProfileRef.current = true;
      console.log("[DEBUG] Form setado para dados mínimos");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile, user]);

  // Resetar controle se mudar o perfil
  useEffect(() => {
    hasLoadedProfileRef.current = false;
  }, [userProfile?.id]);

  // Log debug após populate
  useEffect(() => {
    if (userProfile) {
      setTimeout(() => {
        console.log("[DEBUG] Campos do formulário preenchidos após populate:", form.getValues());
      }, 100);
    }
  }, [userProfile, form]);

  // Log de erros do form
  useEffect(() => {
    if (Object.keys(form.formState.errors).length > 0) {
      console.log("[DEBUG] Erros no formulário:", form.formState.errors);
    }
  }, [form.formState.errors]);

  const handleSave = async (data: any) => {
    console.log('[DEBUG][FORM BEFORE SUBMIT]:', {
      biografia: data.biografia,
      publicacoes: data.publicacoes
    });
    const formacaoAcademica = data.formacaoAcademica || [];
    await saveProfile(data, fotoPreview, formacaoAcademica, projetos, disponibilidade);
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
