
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { FileText } from 'lucide-react';
import { formatText } from '../../utils/formatText';

interface ProfilePublicationsProps {
  publicacoes: string;
}

const ProfilePublications: React.FC<ProfilePublicationsProps> = ({ publicacoes }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <FileText className="w-5 h-5 text-red-800" />
        Publicações
      </CardTitle>
    </CardHeader>
    <CardContent>
      {typeof publicacoes === "string" && publicacoes.trim() !== "" ? (
        <p className="text-gray-700 leading-relaxed">{formatText(publicacoes)}</p>
      ) : (
        <span className="text-gray-500 italic">Nenhuma publicação informada</span>
      )}
    </CardContent>
  </Card>
);

export default ProfilePublications;
