
import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Loader2 } from 'lucide-react';
import BasicInfo from '../components/profile/BasicInfo';
import CargoUnidade from '../components/profile/CargoUnidade';
import AdditionalInfo from '../components/profile/AdditionalInfo';
import AcademicFormation from '../components/profile/AcademicFormation';
import ProjectsManager from '../components/profile/ProjectsManager';
import CertificationsSection from '../components/profile/CertificationsSection';
import PublicationsSection from '../components/profile/PublicationsSection';
import AvailabilitySection from '../components/profile/AvailabilitySection';
import ContactPreferences from '../components/profile/ContactPreferences';
import PhotoUpload from '../components/profile/PhotoUpload';
import CurriculumSection from '../components/profile/CurriculumSection';
import ProfessionalExperienceSection from '../components/profile/ProfessionalExperienceSection';
import StatusMessages from '../components/profile/StatusMessages';
import InterestAreaSelector from '../components/InterestAreaSelector';
import LanguagesSection from '../components/profile/LanguagesSection';
import { Form } from '../components/ui/form';
import { safeCargos, safeFuncoes, safeUnidades, safeTiposColaboracao, safeDisponibilidadeEstimada, safeFormasContato, isValidSelectValue } from '../components/profile/ProfileFormConstants';
import { useProfileEditFormController } from '../hooks/useProfileEditFormController';

interface ProfileEditFormProps {
  profileId?: string;
  isAdminEdit?: boolean;
}

// Componente apenas para renderizar o formulário, lógica ficou separada
const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ profileId, isAdminEdit }) => {
  const {
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
    setDisponibilidade
  } = useProfileEditFormController(profileId, isAdminEdit);

  function renderFormErrors() {
    const errors = form.formState.errors;
    if (Object.keys(errors).length === 0) return null;
    return <div className="bg-red-100 border-l-4 border-red-500 text-red-800 p-3 mb-2 rounded" data-testid="validation-errors">
        <strong>Corrija os campos obrigatórios:</strong>
        <ul className="list-disc ml-5 mt-1">
          {Object.entries(errors).map(([field, err]: any) => {
          if (field === "formacaoAcademica" && err?.message) {
            return <li key={field}>
                  <span className="font-bold text-red-700">{err.message}</span>
                  <div className="text-xs text-red-600 mt-1">
                    Dica: Revise cada linha da formação acadêmica. Complete todos os campos ("Nível", "Instituição", "Curso" e "Ano") OU clique em excluir para remover entradas incompletas.
                  </div>
                </li>;
          }
          return <li key={field}>
                {err?.message || field + " inválido"}
              </li>;
        })}
        </ul>
      </div>;
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin text-red-600" />
          <p className="text-gray-600">Carregando perfil...</p>
        </div>
      </div>;
  }


  return <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-4">
         <h1 className="text-3xl font-bold text-gray-900">
           {isAdminEdit && userProfile ? `Editando Perfil: ${userProfile.name}` : 
            (userProfile || (!profileId && loading === false)) ? 'Editar Perfil' : 'Criar Perfil'}
         </h1>
        <p className="text-lg text-gray-600">
          {isAdminEdit ? 'Editando perfil como administrador' : 'Complete suas informações para aparecer nas buscas públicas'}
        </p>
        {isAdminEdit && (
          <div className="bg-orange-100 border border-orange-300 text-orange-800 p-3 rounded-lg">
            <strong>Modo Administrador:</strong> Você está editando o perfil de outro usuário. 
            {userProfile && ` (ID: ${userProfile.id})`}
          </div>
        )}
      </div>

      <StatusMessages error={error} successMessage={successMessage} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
          <PhotoUpload fotoPreview={fotoPreview} onFileUpload={handleFileUpload} />

          <BasicInfo form={form} />

          <CargoUnidade form={form} safeCargos={safeCargos} safeFuncoes={safeFuncoes} safeUnidades={safeUnidades} isValidSelectValue={isValidSelectValue} />

          <InterestAreaSelector form={form} fieldName="temasInteresse" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AcademicFormation form={form} />
            <ProfessionalExperienceSection form={form} />
          </div>

          <ProjectsManager projetos={projetos} setProjetos={setProjetos} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CertificationsSection form={form} />
            <PublicationsSection form={form} />
          </div>

          <CurriculumSection form={form} />

          <AvailabilitySection tipoColaboracao={disponibilidade.tipoColaboracao || []} setTipoColaboracao={value => setDisponibilidade({
          ...disponibilidade,
          tipoColaboracao: value
        })} disponibilidadeEstimada={disponibilidade.disponibilidadeEstimada || ''} setDisponibilidadeEstimada={value => setDisponibilidade({
          ...disponibilidade,
          disponibilidadeEstimada: value
        })} safeTiposColaboracao={safeTiposColaboracao} safeDisponibilidadeEstimada={safeDisponibilidadeEstimada} isValidSelectValue={isValidSelectValue} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ContactPreferences formaContato={disponibilidade.formaContato || 'email'} setFormaContato={value => setDisponibilidade({
            ...disponibilidade,
            formaContato: value
          })} horarioPreferencial={disponibilidade.horarioPreferencial || ''} setHorarioPreferencial={value => setDisponibilidade({
            ...disponibilidade,
            horarioPreferencial: value
          })} safeFormasContato={safeFormasContato} isValidSelectValue={isValidSelectValue} />
            <LanguagesSection form={form} />
          </div>

          <AdditionalInfo form={form} />

          {renderFormErrors()}

          <Card>
            <CardContent className="pt-6">
              <div className="flex space-x-4">
                <Button type="submit" disabled={saving} variant="logo-brown" className="flex-1 text-xl">
                  {saving ? <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Salvando...
                    </> : 'Salvar Perfil'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>;
};

export default ProfileEditForm;
