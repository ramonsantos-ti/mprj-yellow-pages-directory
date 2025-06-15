
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Plus, X, Construction } from 'lucide-react';

interface Project {
  nome: string;
  dataInicio: string;
  dataFim?: string;
  observacoes?: string;
}

interface ProjectsManagerProps {
  projetos: Project[];
  setProjetos: React.Dispatch<React.SetStateAction<Project[]>>;
}

const ProjectsManager: React.FC<ProjectsManagerProps> = ({ projetos, setProjetos }) => {
  const adicionarProjeto = () => {
    setProjetos([...projetos, { nome: '', dataInicio: '' }]);
  };

  const removerProjeto = (index: number) => {
    setProjetos(projetos.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center space-x-2">
            <Construction className="w-5 h-5" />
            <span>Projetos</span>
          </span>
          <Button type="button" onClick={adicionarProjeto} size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {projetos.map((projeto, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-start">
              <h4 className="font-medium">Projeto {index + 1}</h4>
              <Button
                type="button"
                onClick={() => removerProjeto(index)}
                size="sm"
                variant="ghost"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input
                placeholder="Nome do projeto"
                value={projeto.nome}
                onChange={(e) => {
                  const novos = [...projetos];
                  novos[index].nome = e.target.value;
                  setProjetos(novos);
                }}
              />
              <Input
                type="date"
                placeholder="Data início"
                value={projeto.dataInicio}
                onChange={(e) => {
                  const novos = [...projetos];
                  novos[index].dataInicio = e.target.value;
                  setProjetos(novos);
                }}
              />
              <Input
                type="date"
                placeholder="Data fim (opcional)"
                value={projeto.dataFim || ''}
                onChange={(e) => {
                  const novos = [...projetos];
                  novos[index].dataFim = e.target.value;
                  setProjetos(novos);
                }}
              />
            </div>
            <Textarea
              placeholder="Observações sobre o projeto"
              value={projeto.observacoes || ''}
              onChange={(e) => {
                const novos = [...projetos];
                novos[index].observacoes = e.target.value;
                setProjetos(novos);
              }}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ProjectsManager;
