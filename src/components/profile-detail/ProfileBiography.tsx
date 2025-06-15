
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { User } from 'lucide-react';

interface ProfileBiographyProps {
  biografia: string;
}

const ProfileBiography: React.FC<ProfileBiographyProps> = ({ biografia }) => {
  console.log('📝 ProfileBiography - biografia recebida:', biografia);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="w-5 h-5" />
          <span>Biografia</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {biografia && biografia.trim() !== '' ? (
          <p className="text-gray-700 leading-relaxed">{biografia}</p>
        ) : (
          <p className="text-gray-500 italic">Biografia não informada</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileBiography;
