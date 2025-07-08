
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { User } from 'lucide-react';
import { formatText } from '../../utils/formatText';
import { Profile } from '../../types';

interface ProfileBasicInfoProps {
  profile: Profile;
}

const ProfileBasicInfo: React.FC<ProfileBasicInfoProps> = ({ profile }) => {
  return (
    <Card>
      <CardContent>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <User className="w-6 h-6 text-red-800" /> {formatText(profile.name)}
          </h1>
          <p className="text-lg text-gray-600">
            Matrícula: {formatText(profile.matricula)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileBasicInfo;
