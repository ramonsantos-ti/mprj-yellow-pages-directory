
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Award } from 'lucide-react';
import { formatText } from '../../utils/formatText';

interface ProfileCertificationsProps {
  certificacoes: string[];
}

const ProfileCertifications: React.FC<ProfileCertificationsProps> = ({ certificacoes }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Award className="w-5 h-5 text-red-800" />
        Certificações
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        {certificacoes && certificacoes.length > 0 ? (
          certificacoes.map((cert, index) => (
            <div key={index} className="text-sm text-gray-700">
              • {formatText(cert)}
            </div>
          ))
        ) : (
          <span className="text-gray-500 italic">Nenhuma certificação informada</span>
        )}
      </div>
    </CardContent>
  </Card>
);

export default ProfileCertifications;
