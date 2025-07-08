
import React, { useEffect } from "react";
import { useProfileData } from "@/hooks/useProfileData";
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

interface ProfileDetailViewProps {
  profileId: string;
}

const ProfileDetailView: React.FC<ProfileDetailViewProps> = ({ profileId }) => {
  const { userProfile, loading, error, loadUserProfile } = useProfileData(profileId);

  useEffect(() => {
    loadUserProfile();
  }, [profileId]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (!userProfile) return <ErrorState error="Perfil não encontrado." />;

  return (
    <div className="space-y-6">
      <ProfileHeader profile={userProfile} />
      <AcademicFormationCard formacaoAcademica={userProfile.formacaoAcademica || []} />
      <ProfessionalExperienceCard experienciasProfissionais={userProfile.experienciasProfissionais || []} />
      <ProjectsCard projetos={userProfile.projetos || []} />
      <AvailabilityCard
        disponibilidade={userProfile.disponibilidade}
        contato={userProfile.contato}
      />
      <ProfileAdditionalInfo informacoesComplementares={userProfile.informacoesComplementares || ""} />
      <LanguagesAndCertifications idiomas={userProfile.idiomas || []} certificacoes={userProfile.certificacoes || []} />
      <ProfileInterestAreas temasInteresse={userProfile.temasInteresse || []} />
      <PublicationsAndCurriculum
        publicacoes={userProfile.publicacoes || ""}
        linkCurriculo={userProfile.linkCurriculo || ""}
      />
    </div>
  );
};

export default ProfileDetailView;
