
import React from 'react';
import { UseFormRegister, FieldErrors, Control, useFieldArray } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';

interface AcademicFormationProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  control: Control<any>;
}

const AcademicFormation: React.FC<AcademicFormationProps> = ({ register, errors, control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'formacaoAcademica'
  });

  const addFormation = () => {
    append({
      nivel: '',
      instituicao: '',
      curso: '',
      ano: new Date().getFullYear()
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-5 h-5" />
            <span>Formação Acadêmica</span>
          </div>
          <Button type="button" onClick={addFormation} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {fields.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Nenhuma formação acadêmica adicionada</p>
            <Button type="button" onClick={addFormation} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Primeira Formação
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {fields.map((field, index) => (
              <div key={field.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">Formação {index + 1}</h4>
                  <Button
                    type="button"
                    onClick={() => remove(index)}
                    variant="outline"
                    size="sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor={`formacaoAcademica.${index}.nivel`}>Nível</Label>
                    <Select onValueChange={(value) => {
                      register(`formacaoAcademica.${index}.nivel`).onChange({
                        target: { value, name: `formacaoAcademica.${index}.nivel` }
                      });
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o nível" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ensino Médio">Ensino Médio</SelectItem>
                        <SelectItem value="Técnico">Técnico</SelectItem>
                        <SelectItem value="Graduação">Graduação</SelectItem>
                        <SelectItem value="Especialização">Especialização</SelectItem>
                        <SelectItem value="Mestrado">Mestrado</SelectItem>
                        <SelectItem value="Doutorado">Doutorado</SelectItem>
                        <SelectItem value="Pós-Doutorado">Pós-Doutorado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor={`formacaoAcademica.${index}.ano`}>Ano de Conclusão</Label>
                    <Input
                      type="number"
                      {...register(`formacaoAcademica.${index}.ano`, { valueAsNumber: true })}
                      placeholder="Ano"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`formacaoAcademica.${index}.instituicao`}>Instituição</Label>
                    <Input
                      {...register(`formacaoAcademica.${index}.instituicao`)}
                      placeholder="Nome da instituição"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`formacaoAcademica.${index}.curso`}>Curso</Label>
                    <Input
                      {...register(`formacaoAcademica.${index}.curso`)}
                      placeholder="Nome do curso"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AcademicFormation;
