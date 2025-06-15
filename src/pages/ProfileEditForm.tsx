import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useProfileData } from '@/hooks/useProfileData';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import BasicInfo from '@/components/profile/BasicInfo';
import CargoUnidade from '@/components/profile/CargoUnidade';
// import AreasConhecimento from '@/components/profile/AreasConhecimento';
// import ProfessionalExperience from '@/components/profile/ProfessionalExperience';
import AcademicFormation from '@/components/profile/AcademicFormation';
import AvailabilitySection from '@/components/profile/AvailabilitySection';
import ContactPreferences from '@/components/profile/ContactPreferences';
import CertificationsSection from '@/components/profile/CertificationsSection';
import PublicationsSection from '@/components/profile/PublicationsSection';
import AdditionalInfo from '@/components/profile/AdditionalInfo';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import ProfilePhotoSection from '@/components/profile/ProfilePhotoSection';
import { useProfilePhoto } from "@/hooks/useProfilePhoto";
import {
  tipoColaboracaoMap,
  formaContatoMap,
  safeCargos,
  safeFuncoes,
  safeUnidades,
  // safeAreasConhecimento,
  // safeTemasInteresse,
  // safeIdiomas,
  safeTiposColaboracao,
  safeDisponibilidadeEstimada,
  safeFormasContato
} from '@/components/profile/ProfileFormConstants';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Edit, Loader2 } from 'lucide-react';

const ProfileEditForm = () => {
  const { userProfile, loading, error, loadUserProfile, setError, setUserProfile } = useProfileData();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isInitialized = useRef(false);

  const form = useForm({
    defaultValues: {
      name: '',
      matricula: '',
      cargo: [],
      funcao: [],
      unidade: [],
      telefone: '',
      email: '',
      biografia: '',
      // areasConhecimento: [],
      especializacoes: '',
      // temasInteresse: [],
      // idiomas: [],
      linkCurriculo: '',
      fotoUrl: '',
      certificacoes: [],
      publicacoes: '',
      disponibilidade: {
        tipoColaboracao: [],
        disponibilidadeEstimada: ''
      },
      contato: {
        formaContato: 'email',
        horarioPreferencial: ''
      },
      formacaoAcademica: [],
      experienciasProfissionais: [],
      informacoesComplementares: '',
      aceiteTermos: false
    }
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting }
  } = form;

  const { fotoUrl, setFotoUrl, uploading, uploadFoto } = useProfilePhoto(setValue);

  const [tipoColaboracao, setTipoColaboracao] = React.useState<string[]>([]);
  const [disponibilidadeEstimada, setDisponibilidadeEstimada] = React.useState('');
  const [formaContato, setFormaContato] = React.useState('email');
  const [horarioPreferencial, setHorarioPreferencial] = React.useState('');
  // const [selectedAreasConhecimento, setSelectedAreasConhecimento] = React.useState<string[]>([]);
  // const [selectedTemasInteresse, setSelectedTemasInteresse] = React.useState<string[]>([]);
  // const [selectedIdiomas, setSelectedIdiomas] = React.useState<string[]>([]);
  // const [fotoUrl, setFotoUrl] = React.useState<string | null>(null);
  // const [uploading, setUploading] = React.useState(false);

  useEffect(() => {
    if (userProfile) {
      setTipoColaboracao(userProfile.disponibilidade?.tipoColaboracao || []);
      setDisponibilidadeEstimada(userProfile.disponibilidade?.disponibilidadeEstimada || '');
      setFormaContato(userProfile.contato?.formaContato || 'email');
      setHorarioPreferencial(userProfile.contato?.horarioPreferencial || '');
      // setSelectedAreasConhecimento(userProfile.areasConhecimento || []);
      // setSelectedTemasInteresse(userProfile.temasInteresse || []);
      // setSelectedIdiomas(userProfile.idiomas || []);
      setFotoUrl(userProfile.fotoUrl || null);
    }
  }, [userProfile]);

  // Seta os dados do perfil SOMENTE no primeiro carregamento
  useEffect(() => {
    if (userProfile && !isInitialized.current) {
      form.reset({
        ...userProfile,
        cargo: userProfile.cargo || [],
        funcao: userProfile.funcao || [],
        unidade: userProfile.unidade || [],
        // areasConhecimento: userProfile.areasConhecimento || [],
        // temasInteresse: userProfile.temasInteresse || [],
        // idiomas: userProfile.idiomas || [],
        disponibilidade: {
          tipoColaboracao: userProfile.disponibilidade?.tipoColaboracao || [],
          disponibilidadeEstimada: userProfile.disponibilidade?.disponibilidadeEstimada || ''
        },
        contato: {
          formaContato: userProfile.contato?.formaContato || 'email',
          horarioPreferencial: userProfile.contato?.horarioPreferencial || ''
        },
        formacaoAcademica: userProfile.formacaoAcademica || [],
        experienciasProfissionais: userProfile.experienciasProfissionais || [],
        certificacoes: userProfile.certificacoes || [],
      });
      isInitialized.current = true;
      setFotoUrl(userProfile.fotoUrl || null);
    }
    // Não inclui form como dependência para evitar reset ao digitar
    // eslint-disable-next-line
  }, [userProfile, form, setFotoUrl]);

  const onSubmit = async (data: any) => {
    try {
      const transformedTipoColaboracao = tipoColaboracao.map(tipo => tipoColaboracaoMap[tipo] || tipo);
      const transformedFormaContato = formaContatoMap[formaContato] || formaContato;

      const updates = {
        ...data,
        // areas_conhecimento: selectedAreasConhecimento,
        // temas_interesse: selectedTemasInteresse,
        // idiomas: selectedIdiomas,
        disponibilidade: {
          tipo_colaboracao: transformedTipoColaboracao,
          disponibilidade_estimada: disponibilidadeEstimada
        },
        contato: {
          forma_contato: transformedFormaContato,
          horario_preferencial: horarioPreferencial
        },
        foto_url: fotoUrl,
        updated_at: new Date().toISOString()
      };

      delete updates.disponibilidadeEstimada;
      delete updates.formaContato;
      delete updates.horarioPreferencial;
      delete updates.tipoColaboracao;
      delete updates.id;
      delete updates.userId;
      delete updates.role;
      delete updates.isActive;
      delete updates.updatedByAdmin;
      delete updates.lastUpdated;
      delete updates.formacaoAcademica;
      delete updates.experienciasProfissionais;

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', userProfile?.userId);

      if (error) {
        throw error;
      }

      // Atualiza o estado local do perfil
      const updatedProfile: Profile = {
        ...userProfile,
        ...data,
        // areasConhecimento: selectedAreasConhecimento,
        // temasInteresse: selectedTemasInteresse,
        // idiomas: selectedIdiomas,
        disponibilidade: {
          tipoColaboracao: tipoColaboracao,
          disponibilidadeEstimada: disponibilidadeEstimada
        },
        contato: {
          formaContato: formaContato,
          horarioPreferencial: horarioPreferencial
        },
        fotoUrl: fotoUrl || '',
        lastUpdated: new Date()
      };

      setUserProfile(updatedProfile);

      toast({
        title: "Perfil atualizado!",
        description: "Suas informações foram atualizadas com sucesso.",
      });
      navigate(`/profile/${userProfile?.id}`);
    } catch (error: any) {
      console.error("Error updating profile:", error);
      setError("Erro ao atualizar o perfil: " + error.message);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar!",
        description: "Houve um problema ao atualizar suas informações.",
      });
    }
  };

  const isValidSelectValue = (value: any): value is string => {
    return typeof value === 'string';
  };

  if (loading) return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="w-8 h-8 animate-spin" /></div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardContent>
          <ProfilePhotoSection
            fotoUrl={fotoUrl}
            uploading={uploading}
            userName={userProfile?.name}
            uploadFoto={uploadFoto}
          />
        </CardContent>
      </Card>

      <BasicInfo form={form} />
      <CargoUnidade form={form} safeCargos={safeCargos} safeFuncoes={safeFuncoes} safeUnidades={safeUnidades} isValidSelectValue={isValidSelectValue} />
      {/* <AreasConhecimento
        selectedAreasConhecimento={selectedAreasConhecimento}
        setSelectedAreasConhecimento={setSelectedAreasConhecimento}
        selectedTemasInteresse={selectedTemasInteresse}
        setSelectedTemasInteresse={setSelectedTemasInteresse}
        selectedIdiomas={selectedIdiomas}
        setSelectedIdiomas={setSelectedIdiomas}
        safeAreasConhecimento={safeAreasConhecimento}
        safeTemasInteresse={safeTemasInteresse}
        safeIdiomas={safeIdiomas}
      /> */}
      <AcademicFormation form={form} />
      {/* <ProfessionalExperience form={form} /> */}
      <AvailabilitySection
        tipoColaboracao={tipoColaboracao}
        setTipoColaboracao={setTipoColaboracao}
        disponibilidadeEstimada={disponibilidadeEstimada}
        setDisponibilidadeEstimada={setDisponibilidadeEstimada}
        safeTiposColaboracao={safeTiposColaboracao}
        safeDisponibilidadeEstimada={safeDisponibilidadeEstimada}
        isValidSelectValue={isValidSelectValue}
      />
      <ContactPreferences
        formaContato={formaContato}
        setFormaContato={setFormaContato}
        horarioPreferencial={horarioPreferencial}
        setHorarioPreferencial={setHorarioPreferencial}
        safeFormasContato={safeFormasContato}
        isValidSelectValue={isValidSelectValue}
      />
      <CertificationsSection form={form} />
      <PublicationsSection form={form} />
      <AdditionalInfo form={form} />

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting} variant="logo-brown">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Aguarde...
            </>
          ) : (
            <>
              <Edit className="mr-2 h-4 w-4" />
              Salvar Alterações
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default ProfileEditForm;
