
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Award, Languages } from 'lucide-react';

interface LanguagesAndCertificationsProps {
  idiomas: string[];
  certificacoes: string[];
}

const LanguagesAndCertifications: React.FC<LanguagesAndCertificationsProps> = ({ idiomas, certificacoes }) => {
  const hasIdiomas = idiomas && idiomas.length > 0;
  const hasCertificacoes = certificacoes && certificacoes.length > 0;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Languages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Languages className="w-5 h-5 text-[#7B3F00]" />
            <span>Idiomas</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {hasIdiomas ? (
            <div className="flex flex-wrap gap-2">
              {idiomas.map((idioma, index) => (
                <Badge key={index} variant="outline">{idioma}</Badge>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">Nenhum idioma informado</p>
          )}
        </CardContent>
      </Card>

      {/* Certifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-[#7B3F00]" />
            <span>Certificações</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {hasCertificacoes ? (
            <div className="space-y-2">
              {certificacoes.map((cert, index) => (
                <div key={index} className="text-sm text-gray-700">
                  • {cert}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">Nenhuma certificação informada</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LanguagesAndCertifications;

