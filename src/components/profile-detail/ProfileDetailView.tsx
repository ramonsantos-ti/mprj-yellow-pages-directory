
import React, { useEffect } from "react";
import { useProfileData } from "@/hooks/useProfileData";
import { useProfileView } from "@/hooks/useProfileView";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import ProfileHeader from "./ProfileHeader";
import AcademicFormationCard from "./AcademicFormationCard";
import ProfessionalExperienceCard from "./ProfessionalExperienceCard";
import ProjectsCard from "./ProjectsCard";
import AvailabilityCard from "./AvailabilityCard";
import ProfileAdditionalInfo from "./ProfileAdditionalInfo";
import LanguagesAndCertifications from "./LanguagesAndCertifications";
import ProfileInterestAreas from "./ProfileInterestAreas";
import PublicationsAndCurriculum from "./PublicationsAndCurriculum";
import { ProfileDisabilityCard } from "./ProfileDisabilityCard";

interface ProfileDetailViewProps {
  profileId: string;
}

const ProfileDetailView: React.FC<ProfileDetailViewProps> = ({ profileId }) => {
  const { userProfile, loading, error, loadUserProfile } = useProfileData(profileId);
  
  // Registrar visualização do perfil
  useProfileView(profileId);

  useEffect(() => {
    loadUserProfile();
  }, [profileId]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (!userProfile) return <ErrorState error="Perfil não encontrado." />;

  return (
    <div className="space-y-6">
      <ProfileHeader profile={userProfile} />
      
      {/* Formação Acadêmica e Experiência Profissional lado a lado */}
      <div className="grid gap-6 md:grid-cols-2">
        <AcademicFormationCard formacaoAcademica={userProfile.formacaoAcademica || []} />
        <ProfessionalExperienceCard experienciasProfissionais={userProfile.experienciasProfissionais || []} />
      </div>

      {/* Disponibilidade e Contato e Projetos lado a lado */}
      <div className="grid gap-6 md:grid-cols-2">
        <AvailabilityCard
          disponibilidade={userProfile.disponibilidade}
          contato={userProfile.contato}
        />
        <ProjectsCard projetos={userProfile.projetos || []} />
      </div>

      {/* Áreas de Interesse e Informações Complementares lado a lado */}
      <div className="grid gap-6 md:grid-cols-2">
        <ProfileInterestAreas temasInteresse={userProfile.temasInteresse || []} />
        <ProfileAdditionalInfo informacoesComplementares={userProfile.informacoesComplementares || ""} />
      </div>

      {/* Informações sobre Deficiência */}
      {userProfile.isPcd && userProfile.disabilities && userProfile.disabilities.length > 0 && (
        <ProfileDisabilityCard 
          disabilities={userProfile.disabilities} 
          visibilityLevel={userProfile.pcdVisibilityLevel || 'logged_users'}
          showVisibilityInfo={true}
        />
      )}

      <LanguagesAndCertifications idiomas={userProfile.idiomas || []} certificacoes={userProfile.certificacoes || []} />
      <PublicationsAndCurriculum
        publicacoes={userProfile.publicacoes || ""}
        linkCurriculo={userProfile.linkCurriculo || ""}
      />
    </div>
  );
};

export default ProfileDetailView;
