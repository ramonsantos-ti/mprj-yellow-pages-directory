
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { User } from 'lucide-react';

interface ProfileBiographyProps {
  biografia: string;
}

const ProfileBiography: React.FC<ProfileBiographyProps> = ({ biografia }) => {
  console.log('📝 ProfileBiography renderizando com biografia:', biografia ? 'SIM' : 'NÃO', biografia?.length || 0, 'caracteres');
  console.log('📝 Biografia recebida:', JSON.stringify(biografia));
  
  // Verificar se biografia existe e não é apenas string vazia
  if (!biografia || biografia.trim() === '' || biografia === null || biografia === undefined) {
    console.log('📝 ProfileBiography: biografia vazia ou nula, não renderizando');
    return null;
  }

  console.log('📝 ProfileBiography: renderizando biografia completa');
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
