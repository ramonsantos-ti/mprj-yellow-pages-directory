
import React from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Briefcase, Plus, Trash2 } from 'lucide-react';

interface ProfessionalExperienceSectionProps {
  form: UseFormReturn<any>;
}

const ProfessionalExperienceSection: React.FC<ProfessionalExperienceSectionProps> = ({ form }) => {
  const { control, watch, setValue } = form;
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experienciasProfissionais'
  });

  const addExperience = () => {
    append({
      empresaInstituicao: '',
      cargoFuncao: '',
      dataInicio: '',
      dataFim: '',
      atividades: ''
    });
  };

  const watchedFields = watch('experienciasProfissionais');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Briefcase className="w-5 h-5" />
            <span>Experiência Profissional</span>
          </div>
          <Button
            type="button"
            onClick={addExperience}
            size="sm"
            variant="logo-brown"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {fields.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Nenhuma experiência profissional adicionada</p>
            <Button
              type="button"
              onClick={addExperience}
              variant="logo-brown"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Primeira Experiência
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {fields.map((field, index) => (
              <div key={field.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">Experiência {index + 1}</h4>
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
                    <Label htmlFor={`experienciasProfissionais.${index}.empresaInstituicao`}>Empresa/Instituição</Label>
                    <Input
                      value={watchedFields?.[index]?.empresaInstituicao || ''}
                      onChange={(e) => setValue(`experienciasProfissionais.${index}.empresaInstituicao`, e.target.value)}
                      placeholder="Nome da empresa/instituição"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`experienciasProfissionais.${index}.cargoFuncao`}>Cargo/Função</Label>
                    <Input
                      value={watchedFields?.[index]?.cargoFuncao || ''}
                      onChange={(e) => setValue(`experienciasProfissionais.${index}.cargoFuncao`, e.target.value)}
                      placeholder="Cargo ou função exercida"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`experienciasProfissionais.${index}.dataInicio`}>Data de Início</Label>
                    <Input
                      type="date"
                      value={watchedFields?.[index]?.dataInicio || ''}
                      onChange={(e) => setValue(`experienciasProfissionais.${index}.dataInicio`, e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor={`experienciasProfissionais.${index}.dataFim`}>Data de Término</Label>
                    <Input
                      type="date"
                      value={watchedFields?.[index]?.dataFim || ''}
                      onChange={(e) => setValue(`experienciasProfissionais.${index}.dataFim`, e.target.value)}
                      placeholder="Deixe vazio se ainda trabalha"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor={`experienciasProfissionais.${index}.atividades`}>Atividades</Label>
                    <Textarea
                      value={watchedFields?.[index]?.atividades || ''}
                      onChange={(e) => setValue(`experienciasProfissionais.${index}.atividades`, e.target.value)}
                      placeholder="Descreva as principais atividades desenvolvidas"
                      rows={3}
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

export default ProfessionalExperienceSection;
