
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Plus, X } from 'lucide-react';

interface Formation {
  nivel: string;
  instituicao: string;
  curso: string;
  ano: number;
}

interface AcademicFormationProps {
  formacoes: Formation[];
  setFormacoes: React.Dispatch<React.SetStateAction<Formation[]>>;
  safeNiveisFormacao: string[];
  isValidSelectValue: (value: any) => boolean;
}

const AcademicFormation: React.FC<AcademicFormationProps> = ({ 
  formacoes, 
  setFormacoes, 
  safeNiveisFormacao, 
  isValidSelectValue 
}) => {
  const adicionarFormacao = () => {
    setFormacoes([...formacoes, { nivel: '', instituicao: '', curso: '', ano: new Date().getFullYear() }]);
  };

  const removerFormacao = (index: number) => {
    setFormacoes(formacoes.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Formação Acadêmica</span>
          <Button type="button" onClick={adicionarFormacao} size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {formacoes.map((formacao, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-start">
              <h4 className="font-medium">Formação {index + 1}</h4>
              <Button
                type="button"
                onClick={() => removerFormacao(index)}
                size="sm"
                variant="ghost"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <Select
                value={formacao.nivel}
                onValueChange={(value) => {
                  console.log('Formacao nivel selected:', value, 'Type:', typeof value);
                  if (isValidSelectValue(value)) {
                    const novas = [...formacoes];
                    novas[index].nivel = value;
                    setFormacoes(novas);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Nível" />
                </SelectTrigger>
                <SelectContent>
                  {safeNiveisFormacao.map((nivel, nivelIndex) => (
                    <SelectItem key={`nivel-${nivelIndex}-${nivel}`} value={nivel}>
                      {nivel}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="Instituição"
                value={formacao.instituicao}
                onChange={(e) => {
                  const novas = [...formacoes];
                  novas[index].instituicao = e.target.value;
                  setFormacoes(novas);
                }}
              />
              <Input
                placeholder="Curso"
                value={formacao.curso}
                onChange={(e) => {
                  const novas = [...formacoes];
                  novas[index].curso = e.target.value;
                  setFormacoes(novas);
                }}
              />
              <Input
                type="number"
                placeholder="Ano"
                value={formacao.ano}
                onChange={(e) => {
                  const novas = [...formacoes];
                  novas[index].ano = parseInt(e.target.value);
                  setFormacoes(novas);
                }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AcademicFormation;
