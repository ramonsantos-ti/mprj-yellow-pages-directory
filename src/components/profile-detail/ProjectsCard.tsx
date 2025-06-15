
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { FileText, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Profile } from '../../types';

interface ProjectsCardProps {
  projetos: Profile['projetos'];
}

const ProjectsCard: React.FC<ProjectsCardProps> = ({ projetos }) => {
  if (!projetos?.length) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="w-5 h-5" />
          <span>Projetos</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projetos.map((projeto, index) => (
            <div key={projeto.id || index} className="border-l-4 border-blue-200 pl-4">
              <h4 className="font-semibold text-gray-900">{projeto.nome}</h4>
              <p className="text-sm text-gray-600 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                {format(new Date(projeto.dataInicio), 'dd/MM/yyyy', { locale: ptBR })}
                {projeto.dataFim && (
                  <> - {format(new Date(projeto.dataFim), 'dd/MM/yyyy', { locale: ptBR })}</>
                )}
              </p>
              {projeto.observacoes && (
                <p className="text-gray-700 text-sm">{projeto.observacoes}</p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectsCard;
