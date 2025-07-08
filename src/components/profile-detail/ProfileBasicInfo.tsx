
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Profile } from '../../types';

interface ProfileBasicInfoProps {
  profile: Profile;
}

const ProfileBasicInfo: React.FC<ProfileBasicInfoProps> = ({ profile }) => {
  return (
    <Card>
      <CardContent>
        {/* Este componente agora está vazio pois as informações básicas são exibidas no ProfileHeader */}
        <div className="text-center text-gray-500 italic p-4">
          Informações básicas exibidas no cabeçalho acima
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileBasicInfo;
