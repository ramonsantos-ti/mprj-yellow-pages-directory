import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useProfileData } from '@/hooks/useProfileData';
import { useProfileView } from '@/hooks/useProfileView';
import { useProfileReviews } from '@/hooks/useProfileReviews';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import ProfileHeader from './ProfileHeader';
import AcademicFormationCard from './AcademicFormationCard';
import ProfessionalExperienceCard from './ProfessionalExperienceCard';
import ProjectsCard from './ProjectsCard';
import AvailabilityCard from './AvailabilityCard';
import ProfileAdditionalInfo from './ProfileAdditionalInfo';
import LanguagesAndCertifications from './LanguagesAndCertifications';
import ProfileInterestAreas from './ProfileInterestAreas';
import PublicationsAndCurriculum from './PublicationsAndCurriculum';
import { ProfileDisabilityCard } from './ProfileDisabilityCard';
import { ReviewForm } from '@/components/ReviewForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { format } from 'date-fns';

interface ProfileDetailViewProps {
  profileId: string;
}

const ProfileDetailView: React.FC<ProfileDetailViewProps> = ({ profileId }) => {
  const { user } = useAuth();
  const { userProfile, loading, error, loadUserProfile } = useProfileData(profileId);
  const { reviews, hasReviewed, createReview, isCreating } = useProfileReviews(profileId);
  
  // Registrar visualização do perfil
  useProfileView(profileId);

  const isOwnProfile = user?.profileId === profileId;

  // Debug logs
  useEffect(() => {
    console.log('[ProfileDetailView] Debug info:', {
      user: user?.id,
      userEmail: user?.email,
      userProfileId: userProfile?.userId,
      isOwnProfile,
      hasReviewed,
      profileId,
      reviewsCount: reviews.length
    });
  }, [user, userProfile, isOwnProfile, hasReviewed, reviews]);

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

      {/* Reviews Section */}
      <div className="space-y-6">
        {/* Approved Reviews */}
        {reviews.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Avaliações ({reviews.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b last:border-b-0 pb-4 last:pb-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold">{review.reviewer?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(review.created_at), 'dd/MM/yyyy')}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Review Form */}
        {user && !isOwnProfile && !hasReviewed && (
          <ReviewForm
            onSubmit={(data) => createReview({ rating: data.rating, comment: data.comment })}
            isSubmitting={isCreating}
          />
        )}

        {user && !isOwnProfile && hasReviewed && (
          <Card className="p-6">
            <p className="text-center text-muted-foreground">
              Você já avaliou este perfil. Aguardando aprovação do administrador.
            </p>
          </Card>
        )}

        {!user && (
          <Card className="p-6">
            <p className="text-center text-muted-foreground">
              Faça login para avaliar este perfil
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProfileDetailView;
