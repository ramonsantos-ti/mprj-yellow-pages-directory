import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Eye, Crown, Medal, Award } from 'lucide-react';
import { useTopProfiles } from '@/hooks/useTopProfiles';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

const TopProfilesRanking: React.FC = () => {
  const { data: topProfiles, isLoading, error } = useTopProfiles(10);

  const getRankIcon = (position: number) => {
    switch(position) {
      case 1: return <Crown className="w-4 h-4 text-yellow-500" />;
      case 2: return <Medal className="w-4 h-4 text-gray-400" />;
      case 3: return <Award className="w-4 h-4 text-orange-600" />;
      default: return null;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  if (isLoading) {
    return (
      <Card className="sticky top-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="w-5 h-5" />
            Top 10 Perfis Mais Acessados
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return null;
  }

  if (!topProfiles?.length) {
    return (
      <Card className="sticky top-4 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="w-5 h-5 text-primary" />
            Top 10 Perfis Mais Acessados
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center">
          <Eye className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
          <p className="text-sm text-muted-foreground">
            Nenhum perfil visualizado ainda.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            O ranking será atualizado conforme os perfis forem acessados.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="sticky top-4 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="w-5 h-5 text-primary" />
          Top 10 Perfis Mais Acessados
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          {topProfiles.map((profile, index) => {
            const position = index + 1;
            return (
              <Link
                key={profile.profile_id}
                to={`/profile/${profile.profile_id}`}
                className="block group"
              >
                <div className={`
                  flex items-center gap-3 p-2 rounded-lg transition-all
                  hover:bg-primary/5 hover:shadow-md
                  ${position <= 3 ? 'bg-gradient-to-r from-primary/5 to-transparent' : ''}
                `}>
                  <div className="flex items-center gap-2 min-w-[40px]">
                    <span className={`
                      font-bold text-sm
                      ${position === 1 ? 'text-yellow-600' : ''}
                      ${position === 2 ? 'text-gray-500' : ''}
                      ${position === 3 ? 'text-orange-600' : 'text-muted-foreground'}
                    `}>
                      {position}º
                    </span>
                    {getRankIcon(position)}
                  </div>

                  <Avatar className="w-10 h-10 border-2 border-background shadow">
                    <AvatarImage src={profile.foto_url || undefined} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {getInitials(profile.name)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors">
                      {profile.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {profile.matricula}
                      </span>
                      {profile.cargo?.[0] && (
                        <Badge variant="outline" className="text-xs px-1 py-0">
                          {profile.cargo[0]}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Eye className="w-3 h-3" />
                    <span className="font-medium">{profile.view_count}</span>
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

export default TopProfilesRanking;
