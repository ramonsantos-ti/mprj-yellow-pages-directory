
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface PublicationsAndCurriculumProps {
  publicacoes?: string;
  linkCurriculo?: string;
  especializacoes?: string;
}

const PublicationsAndCurriculum: React.FC<PublicationsAndCurriculumProps> = ({ 
  publicacoes, 
  linkCurriculo, 
  especializacoes 
}) => {
  const hasContent = publicacoes || linkCurriculo || especializacoes;

  if (!hasContent) return null;

  return (
    <>
      {/* Publications and Curriculum Grid */}
      {(publicacoes || linkCurriculo) && (
        <div className="grid gap-6 md:grid-cols-2">
          {publicacoes && (
            <Card>
              <CardHeader>
                <CardTitle>Publicações</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{publicacoes}</p>
              </CardContent>
            </Card>
          )}

          {linkCurriculo && (
            <Card>
              <CardHeader>
                <CardTitle>Currículo</CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href={linkCurriculo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:text-red-700 underline"
                >
                  Acessar Currículo Completo
                </a>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Specializations */}
      {especializacoes && (
        <Card>
          <CardHeader>
            <CardTitle>Especializações</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{especializacoes}</p>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default PublicationsAndCurriculum;
