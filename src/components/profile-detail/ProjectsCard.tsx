
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { construction } from 'lucide-react';
import { Profile } from '../../types';

interface ProjectsCardProps {
  projetos: Profile['projetos'];
}

const LucideConstruction = construction;

const ProjectsCard: React.FC<ProjectsCardProps> = ({ projetos }) => {
  const hasProjects = projetos && projetos.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <LucideConstruction className="w-5 h-5" />
          <span>Projetos</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {hasProjects ? (
          <div className="space-y-4">
            {projetos.map((projeto, index) => (
              <div key={projeto.id || index} className="border-l-4 border-yellow-300 pl-4">
                <h4 className="font-semibold text-gray-900">{projeto.nome}</h4>
                <p className="text-sm text-gray-600 mb-2">
                  {projeto.dataInicio &&
                    <span>
                      Início: {projeto.dataInicio instanceof Date
                        ? projeto.dataInicio.toLocaleDateString("pt-BR")
                        : new Date(projeto.dataInicio).toLocaleDateString("pt-BR")}
                    </span>
                  }
                  {projeto.dataFim && (
                    <span>
                      {" • Fim: "}
                      {projeto.dataFim instanceof Date
                        ? projeto.dataFim.toLocaleDateString("pt-BR")
                        : new Date(projeto.dataFim).toLocaleDateString("pt-BR")}
                    </span>
                  )}
                </p>
                {projeto.observacoes && (
                  <p className="text-gray-700 text-sm">{projeto.observacoes}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">Nenhum projeto informado</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectsCard;
