import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { useTopRatedProfiles } from '@/hooks/useTopRatedProfiles';

const TopRatedProfilesRanking: React.FC = () => {
  const { data: profiles, isLoading, error } = useTopRatedProfiles(10);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (isLoading) {
    return (
      <Card className="shadow-lg">
        <CardHeader className="bg-red-900 border-b rounded-t-lg">
          <CardTitle className="flex items-center gap-2 text-lg text-white">
            <Trophy className="w-5 h-5 text-white" />
            TOP 10 Mais Bem Avaliados
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="w-8 h-8 rounded" />
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) return null;

  if (!profiles || profiles.length === 0) {
    return (
      <Card className="shadow-lg">
        <CardHeader className="bg-red-900 border-b rounded-t-lg">
          <CardTitle className="flex items-center gap-2 text-lg text-white">
            <Trophy className="w-5 h-5 text-white" />
            TOP 10 Mais Bem Avaliados
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <p className="text-muted-foreground text-sm text-center py-4">
            Nenhum perfil avaliado ainda
          </p>
        </CardContent>
      </Card>
    );
  }

  // Calculate ranking positions with tie handling
  let currentRank = 1;
  const rankedProfiles = profiles.map((profile, index) => {
    if (index > 0) {
      const prevProfile = profiles[index - 1];
      if (
        profile.average_rating !== prevProfile.average_rating ||
        profile.review_count !== prevProfile.review_count
      ) {
        currentRank = index + 1;
      }
    }
    return { ...profile, rank: currentRank };
  });

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900 font-bold shadow-lg';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-900 font-semibold shadow-md';
      case 3:
        return 'bg-gradient-to-r from-orange-400 to-orange-600 text-orange-900 font-semibold shadow-md';
      default:
        return 'bg-muted text-muted-foreground font-medium';
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-red-900 border-b rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-lg text-white">
          <Trophy className="w-5 h-5 text-white" />
          TOP 10 Mais Bem Avaliados
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          {rankedProfiles.map((profile) => (
            <Link
              key={profile.profile_id}
              to={`/profile/${profile.profile_id}`}
              className="block"
            >
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors">
                <div
                  className={`w-8 h-8 rounded flex items-center justify-center text-sm ${getRankStyle(
                    profile.rank
                  )}`}
                >
                  {profile.rank}º
                </div>

                <Avatar className="h-10 w-10 border-2 border-border">
                  <AvatarImage src={profile.foto_url || undefined} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {getInitials(profile.name)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">
                    {profile.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {profile.matricula}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-semibold text-yellow-600">
                      {profile.average_rating.toFixed(2)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({profile.review_count} {profile.review_count === 1 ? 'avaliação' : 'avaliações'})
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopRatedProfilesRanking;
