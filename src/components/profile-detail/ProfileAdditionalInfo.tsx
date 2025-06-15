
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Info } from 'lucide-react';
import { formatText } from '../../utils/formatText';

interface ProfileAdditionalInfoProps {
  especializacoes: string;
}

const ProfileAdditionalInfo: React.FC<ProfileAdditionalInfoProps> = ({ especializacoes }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Info className="w-5 h-5 text-red-800" />
        Informações Complementares
      </CardTitle>
    </CardHeader>
    <CardContent>
      {typeof especializacoes === "string" && especializacoes.trim() !== "" ? (
        <p className="text-gray-700">{formatText(especializacoes)}</p>
      ) : (
        <span className="text-gray-500 italic">Nenhuma informação complementar informada</span>
      )}
    </CardContent>
  </Card>
);

export default ProfileAdditionalInfo;
