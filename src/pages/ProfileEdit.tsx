
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
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
import StatusMessages from '../components/profile/StatusMessages';
import InterestAreaSelector from '../components/InterestAreaSelector';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '../components/ui/form';
import { useProfileEdit } from '../hooks/useProfileEdit';
import { useProfileFormHandler } from '../components/profile/ProfileFormHandler';
import { profileSchema, defaultFormValues } from '../components/profile/ProfileFormSchema';
import {
  safeCargos,
  safeFuncoes,
  safeUnidades,
  safeTiposColaboracao,
  safeDisponibilidadeEstimada,
  safeFormasContato,
  isValidSelectValue
} from '../components/profile/ProfileFormConstants';

const ProfileEdit: React.FC = () => {
  const { user } = useAuth();
  const {
    loading,
    saving,
    error,
    successMessage,
    userProfile,
    saveProfile
  } = useProfileEdit();

  // Additional state for complex data structures
  const [fotoPreview, setFotoPreview] = useState('');
  const [formacaoAcademica, setFormacaoAcademica] = useState<any[]>([]);
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
    formacaoAcademica,
    setFormacaoAcademica,
    projetos,
    setProjetos,
    disponibilidade,
    setDisponibilidade
  });

  useEffect(() => {
    if (userProfile) {
      populateFormWithProfile(userProfile);
    } else if (user) {
      // New profile - set defaults
      form.setValue('name', user?.email || '');
      form.setValue('email', user?.email || '');
      form.setValue('matricula', '');
    }
  }, [userProfile, user]);

  const handleSave = async (data: any) => {
    await saveProfile(data, fotoPreview, formacaoAcademica, projetos, disponibilidade);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin text-red-600" />
          <p className="text-gray-600">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          {userProfile ? 'Editar Perfil' : 'Criar Perfil'}
        </h1>
        <p className="text-lg text-gray-600">
          Complete suas informações para aparecer nas buscas públicas
        </p>
      </div>

      <StatusMessages error={error} successMessage={successMessage} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
          <PhotoUpload 
            fotoPreview={fotoPreview}
            onFileUpload={handleFileUpload}
          />

          <BasicInfo form={form} />

          <CargoUnidade
            form={form}
            safeCargos={safeCargos}
            safeFuncoes={safeFuncoes}
            safeUnidades={safeUnidades}
            isValidSelectValue={isValidSelectValue}
          />

          <InterestAreaSelector form={form} fieldName="areasConhecimento" />

          {/* Seção Formação Acadêmica e Projetos lado a lado */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AcademicFormation form={form} />
            
            <Card>
              <CardContent>
                <ProjectsManager
                  projetos={projetos}
                  setProjetos={setProjetos}
                />
              </CardContent>
            </Card>
          </div>

          {/* Seção Certificações e Publicações lado a lado */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CertificationsSection form={form} />
            <PublicationsSection form={form} />
          </div>

          <AvailabilitySection
            tipoColaboracao={disponibilidade.tipoColaboracao || []}
            setTipoColaboracao={(value) => setDisponibilidade({...disponibilidade, tipoColaboracao: value})}
            disponibilidadeEstimada={disponibilidade.disponibilidadeEstimada || ''}
            setDisponibilidadeEstimada={(value) => setDisponibilidade({...disponibilidade, disponibilidadeEstimada: value})}
            safeTiposColaboracao={safeTiposColaboracao}
            safeDisponibilidadeEstimada={safeDisponibilidadeEstimada}
            isValidSelectValue={isValidSelectValue}
          />

          <ContactPreferences
            formaContato={disponibilidade.formaContato || 'email'}
            setFormaContato={(value) => setDisponibilidade({...disponibilidade, formaContato: value})}
            horarioPreferencial={disponibilidade.horarioPreferencial || ''}
            setHorarioPreferencial={(value) => setDisponibilidade({...disponibilidade, horarioPreferencial: value})}
            safeFormasContato={safeFormasContato}
            isValidSelectValue={isValidSelectValue}
          />

          <CurriculumSection form={form} />

          <AdditionalInfo form={form} />

          <Card>
            <CardContent className="pt-6">
              <div className="flex space-x-4">
                <Button
                  type="submit"
                  disabled={saving}
                  className="flex-1"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    'Salvar Perfil'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default ProfileEdit;
