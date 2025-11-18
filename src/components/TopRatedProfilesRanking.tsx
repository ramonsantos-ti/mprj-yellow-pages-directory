import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
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
  const positions: number[] = [];
  profiles.forEach((profile, index) => {
    if (index === 0) {
      positions.push(1);
    } else if (
      profile.average_rating === profiles[index - 1].average_rating &&
      profile.review_count === profiles[index - 1].review_count
    ) {
      // Tie: keep same position as previous
      positions.push(positions[index - 1]);
    } else {
      // No tie: previous position + 1
      positions.push(positions[index - 1] + 1);
    }
  });

  const getBackgroundColor = (pos: number) => {
    switch (pos) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400/40 to-yellow-300/20'; // Gold
      case 2:
        return 'bg-gradient-to-r from-gray-300/40 to-gray-200/20'; // Silver
      case 3:
        return 'bg-gradient-to-r from-orange-400/40 to-orange-300/20'; // Bronze
      default:
        return 'bg-white';
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
          {profiles.map((profile, index) => {
            const position = positions[index];

            return (
              <Link
                key={profile.profile_id}
                to={`/profile/${profile.profile_id}`}
                className="block group"
              >
                <div
                  className={`
                    flex items-center gap-3 p-2 rounded-lg transition-all
                    hover:shadow-md
                    ${getBackgroundColor(position)}
                  `}
                >
                  <div className="flex items-center gap-2 min-w-[40px]">
                    <span className="font-bold text-sm text-black">
                      {position}º
                    </span>
                  </div>

                  <Avatar className="w-10 h-10 border-2 border-background shadow">
                    <AvatarImage src={profile.foto_url || undefined} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {getInitials(profile.name)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-black truncate">
                      {profile.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-black">
                        {profile.matricula}
                      </span>
                      {profile.cargo?.[0] && (
                        <Badge variant="outline" className="text-xs px-1 py-0 text-black border-black/20">
                          {profile.cargo[0]}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-black">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{profile.average_rating.toFixed(2)}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopRatedProfilesRanking;
