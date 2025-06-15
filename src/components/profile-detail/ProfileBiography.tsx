
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { User } from 'lucide-react';

interface ProfileBiographyProps {
  biografia: string;
}

const ProfileBiography: React.FC<ProfileBiographyProps> = ({ biografia }) => {
  if (!biografia) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="w-5 h-5" />
          <span>Biografia</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 leading-relaxed">{biografia}</p>
      </CardContent>
    </Card>
  );
};

export default ProfileBiography;
