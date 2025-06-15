
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Briefcase } from 'lucide-react';
import { Profile } from '../../types';

interface ProfessionalExperienceCardProps {
  experienciasProfissionais: Profile['experienciasProfissionais'];
}

const ProfessionalExperienceCard: React.FC<ProfessionalExperienceCardProps> = ({ experienciasProfissionais }) => {
  if (!experienciasProfissionais?.length) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Briefcase className="w-5 h-5" />
          <span>Experiência Profissional</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {experienciasProfissionais.map((exp, index) => (
            <div key={index} className="border-l-4 border-green-200 pl-4">
              {exp.tempoMPRJ && (
                <div className="mb-2">
                  <h4 className="font-semibold text-gray-900">Tempo no MPRJ</h4>
                  <p className="text-gray-700">{exp.tempoMPRJ}</p>
                </div>
              )}
              {exp.experienciaAnterior && (
                <div className="mb-2">
                  <h4 className="font-semibold text-gray-900">Experiência Anterior</h4>
                  <p className="text-gray-700">{exp.experienciaAnterior}</p>
                </div>
              )}
              {exp.projetosInternos && (
                <div className="mb-2">
                  <h4 className="font-semibold text-gray-900">Projetos Internos</h4>
                  <p className="text-gray-700">{exp.projetosInternos}</p>
                </div>
              )}
              {exp.publicacoes && (
                <div className="mb-2">
                  <h4 className="font-semibold text-gray-900">Publicações</h4>
                  <p className="text-gray-700">{exp.publicacoes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfessionalExperienceCard;
