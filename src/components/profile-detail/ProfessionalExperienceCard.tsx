
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Briefcase } from 'lucide-react';
import { Profile } from '../../types';

interface ProfessionalExperienceCardProps {
  experienciasProfissionais: Profile['experienciasProfissionais'];
}

const ProfessionalExperienceCard: React.FC<ProfessionalExperienceCardProps> = ({ experienciasProfissionais }) => {
  const hasExperiences = experienciasProfissionais && experienciasProfissionais.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Briefcase className="w-5 h-5" />
          <span>Experiência Profissional</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {hasExperiences ? (
          <div className="space-y-4">
            {experienciasProfissionais.map((exp, index) => (
              <div key={index} className="border-l-4 border-green-200 pl-4">
                {exp.empresaInstituicao && (
                  <div className="mb-2">
                    <h4 className="font-semibold text-gray-900">Empresa/Instituição</h4>
                    <p className="text-gray-700">{exp.empresaInstituicao}</p>
                  </div>
                )}
                {exp.cargoFuncao && (
                  <div className="mb-2">
                    <h4 className="font-semibold text-gray-900">Cargo/Função</h4>
                    <p className="text-gray-700">{exp.cargoFuncao}</p>
                  </div>
                )}
                {(exp.dataInicio || exp.dataFim) && (
                  <div className="mb-2">
                    <h4 className="font-semibold text-gray-900">Período</h4>
                    <p className="text-gray-700">
                      {exp.dataInicio} {exp.dataFim ? `- ${exp.dataFim}` : '- Atual'}
                    </p>
                  </div>
                )}
                {exp.atividades && (
                  <div className="mb-2">
                    <h4 className="font-semibold text-gray-900">Atividades</h4>
                    <p className="text-gray-700">{exp.atividades}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">Nenhuma experiência profissional informada</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfessionalExperienceCard;
