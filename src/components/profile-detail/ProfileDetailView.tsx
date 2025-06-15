
import React from "react";
import { useParams } from "react-router-dom";
import { useProfileData } from "@/hooks/useProfileData";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import ProfileHeader from "./ProfileHeader";
import ProfileBasicInfo from "./ProfileBasicInfo";
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
  const { userProfile, loading, error } = useProfileData(profileId);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!userProfile) return <ErrorState message="Perfil não encontrado." />;

  return (
    <div className="space-y-6">
      <ProfileHeader profile={userProfile} />
      <ProfileBasicInfo profile={userProfile} />
      <AcademicFormationCard formacoes={userProfile.formacaoAcademica} />
      <ProfessionalExperienceCard experiencias={userProfile.experiencias} />
      <ProjectsCard projetos={userProfile.projetos} />
      <AvailabilityCard
        disponibilidade={userProfile.disponibilidade}
        contato={userProfile.contato}
      />
      <ProfileAdditionalInfo adicionais={userProfile.infoAdicional} />
      <LanguagesAndCertifications profile={userProfile} />
      <ProfileInterestAreas areas={userProfile.temasInteresse} />
      <PublicationsAndCurriculum
        publicacoes={userProfile.publicacoes}
        curriculumUrl={userProfile.curriculumUrl}
      />
    </div>
  );
};

export default ProfileDetailView;

