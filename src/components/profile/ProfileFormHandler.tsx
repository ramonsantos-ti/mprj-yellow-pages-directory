import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Profile } from '../../types';

interface ProfileFormHandlerProps {
  form: UseFormReturn<any>;
  profile?: Profile | null;
  fotoPreview: string;
  setFotoPreview: (url: string) => void;
  formacaoAcademica: any[];
  setFormacaoAcademica: (value: any[]) => void;
  projetos: any[];
  setProjetos: (value: any[]) => void;
  disponibilidade: any;
  setDisponibilidade: (value: any) => void;
}

export const useProfileFormHandler = ({
  form,
  profile,
  fotoPreview,
  setFotoPreview,
  formacaoAcademica,
  setFormacaoAcademica,
  projetos,
  setProjetos,
  disponibilidade,
  setDisponibilidade
}: ProfileFormHandlerProps) => {

  const populateFormWithProfile = (profile: Profile) => {
    console.log('[ProfileFormHandler] Populando formulário com perfil:', profile);
    console.log('[ProfileFormHandler] Dados específicos recebidos:', {
      name: profile.name,
      email: profile.email,
      cargo: profile.cargo,
      funcao: profile.funcao,
      unidade: profile.unidade,
      telefone: profile.telefone,
      biografia: profile.biografia,
      temasInteresse: profile.temasInteresse,
      idiomas: profile.idiomas,
      certificacoes: profile.certificacoes
    });
    setFotoPreview(profile.fotoUrl || '');
    form.setValue('name', profile.name || '');
    form.setValue('matricula', profile.matricula || '');
    form.setValue('email', profile.email || '');
    form.setValue('telefone', profile.telefone || '');
    form.setValue('biografia', profile.biografia ?? "");
    form.setValue('cargo', profile.cargo || []);
    form.setValue('funcao', profile.funcao || []);
    form.setValue('unidade', profile.unidade || []);
    // form.setValue('especializacoes', profile.especializacoes ?? ""); // REMOVIDO
    form.setValue('temasInteresse', profile.temasInteresse || []);
    form.setValue('idiomas', profile.idiomas || []);
    form.setValue('linkCurriculo', profile.linkCurriculo ?? "");
    form.setValue('certificacoes', profile.certificacoes || []);
    form.setValue('publicacoes', profile.publicacoes ?? "");
    form.setValue('aceiteTermos', profile.aceiteTermos || false);
    form.setValue('formacaoAcademica', profile.formacaoAcademica || []);
    form.setValue('experienciasProfissionais', profile.experienciasProfissionais || []);
    form.setValue('informacoesComplementares', profile.informacoesComplementares ?? "");

    console.log('[ProfileFormHandler] Valores definidos no formulário:', {
      name: form.getValues('name'),
      email: form.getValues('email'),
      cargo: form.getValues('cargo'),
      funcao: form.getValues('funcao'),
      unidade: form.getValues('unidade'),
      telefone: form.getValues('telefone'),
      biografia: form.getValues('biografia'),
      temasInteresse: form.getValues('temasInteresse'),
      idiomas: form.getValues('idiomas'),
      certificacoes: form.getValues('certificacoes')
    });

    setProjetos(profile.projetos || []);

    if (profile.disponibilidade && profile.contato) {
      setDisponibilidade({
        tipoColaboracao: profile.disponibilidade.tipoColaboracao || [],
        disponibilidadeEstimada: profile.disponibilidade.disponibilidadeEstimada || '',
        formaContato: profile.contato.formaContato || 'email',
        horarioPreferencial: profile.contato.horarioPreferencial || ''
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return {
    populateFormWithProfile,
    handleFileUpload
  };
};
