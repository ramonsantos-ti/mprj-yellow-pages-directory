
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { FileText } from 'lucide-react';

interface ProfileAdditionalInfoProps {
  informacoesComplementares: string;
}

const ProfileAdditionalInfo: React.FC<ProfileAdditionalInfoProps> = ({ informacoesComplementares }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-[#7B3F00]" />
          <span>Informações Complementares</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {informacoesComplementares ? (
          <div className="whitespace-pre-wrap text-gray-700">
            {informacoesComplementares}
          </div>
        ) : (
          <p className="text-gray-500 italic">Nenhuma informação complementar informada</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileAdditionalInfo;
