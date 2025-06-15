
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Award } from 'lucide-react';

interface LanguagesAndCertificationsProps {
  idiomas: string[];
  certificacoes: string[];
}

const LanguagesAndCertifications: React.FC<LanguagesAndCertificationsProps> = ({ idiomas, certificacoes }) => {
  if (!idiomas?.length && !certificacoes?.length) return null;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Languages */}
      {idiomas && idiomas.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Idiomas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {idiomas.map((idioma, index) => (
                <Badge key={index} variant="outline">{idioma}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Certifications */}
      {certificacoes && certificacoes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="w-5 h-5" />
              <span>Certificações</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {certificacoes.map((cert, index) => (
                <div key={index} className="text-sm text-gray-700">
                  • {cert}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LanguagesAndCertifications;
