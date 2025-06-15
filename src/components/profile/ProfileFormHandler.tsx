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
    form.setValue('informacoesComplementares', profile.informacoesComplementares ?? "");

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
