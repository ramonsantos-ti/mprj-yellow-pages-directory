
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { User } from 'lucide-react';
import { formatText } from '../../utils/formatText';

interface ProfileBioProps {
  biografia: string;
}

const ProfileBio: React.FC<ProfileBioProps> = ({ biografia }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <User className="w-5 h-5 text-red-800" />
        Biografia
      </CardTitle>
    </CardHeader>
    <CardContent>
      {typeof biografia === "string" && biografia.trim() !== "" ? (
        <p className="text-gray-700 leading-relaxed">{formatText(biografia)}</p>
      ) : (
        <span className="text-gray-500 italic">Biografia não informada</span>
      )}
    </CardContent>
  </Card>
);

export default ProfileBio;
