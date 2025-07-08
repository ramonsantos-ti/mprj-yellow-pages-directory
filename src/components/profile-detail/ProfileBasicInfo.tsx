
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { User, MessageSquare } from 'lucide-react';
import { Badge } from '../ui/badge';
import { formatText } from '../../utils/formatText';
import { Profile } from '../../types';

interface ProfileBasicInfoProps {
  profile: Profile;
}

const ProfileBasicInfo: React.FC<ProfileBasicInfoProps> = ({ profile }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <Card>
      <CardContent>
        <div className="flex flex-col md:flex-row items-start md:space-x-6 space-y-4 md:space-y-0">
          {/* Foto */}
          <div className="w-32 h-40 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border">
            {profile.fotoUrl ? (
              <img
                src={profile.fotoUrl}
                alt={formatText(profile.name)}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-full h-full bg-red-100 flex items-center justify-center">
                <span className="text-red-900 font-semibold text-xl">
                  {getInitials(formatText(profile.name))}
                </span>
              </div>
            )}
          </div>
          {/* Informação básica */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <User className="w-6 h-6 text-red-800" /> {formatText(profile.name)}
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Matrícula: {formatText(profile.matricula)}
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-600">
                <MessageSquare className="w-4 h-4" />
                <span>{formatText(profile.email)}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <MessageSquare className="w-4 h-4" />
                <span>{profile.telefone ? formatText(profile.telefone) : <span className="italic text-gray-400">Telefone não informado</span>}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileBasicInfo;
