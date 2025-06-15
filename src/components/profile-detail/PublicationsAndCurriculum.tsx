
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
  return (
    <>
      {/* Publications and Curriculum Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Publicações</CardTitle>
          </CardHeader>
          <CardContent>
            {publicacoes && publicacoes.trim() !== '' ? (
              <p className="text-gray-700 leading-relaxed">{publicacoes}</p>
            ) : (
              <p className="text-gray-500 italic">Nenhuma publicação informada</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Currículo</CardTitle>
          </CardHeader>
          <CardContent>
            {linkCurriculo && linkCurriculo.trim() !== '' ? (
              <a
                href={linkCurriculo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:text-red-700 underline"
              >
                Acessar Currículo Completo
              </a>
            ) : (
              <p className="text-gray-500 italic">Link do currículo não informado</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Specializations */}
      <Card>
        <CardHeader>
          <CardTitle>Especializações</CardTitle>
        </CardHeader>
        <CardContent>
          {especializacoes && especializacoes.trim() !== '' ? (
            <p className="text-gray-700 leading-relaxed">{especializacoes}</p>
          ) : (
            <p className="text-gray-500 italic">Nenhuma especialização informada</p>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default PublicationsAndCurriculum;
