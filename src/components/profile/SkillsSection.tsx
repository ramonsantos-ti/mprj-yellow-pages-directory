
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Separator } from '../ui/separator';
import { FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { UseFormReturn } from 'react-hook-form';
import { 
  HABILIDADES_TECNICAS_ADMINISTRATIVAS,
  HABILIDADES_TECNICAS_JURIDICAS,
  HABILIDADES_TECNICAS_TI,
  HABILIDADES_COMPORTAMENTAIS,
  IDIOMAS
} from '../../data/constants';

interface SkillsSectionProps {
  form: UseFormReturn<any>;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ form }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Habilidades</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="habilidadesTecnicas"
          render={({ field }) => (
            <FormItem>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Área Administrativa</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {HABILIDADES_TECNICAS_ADMINISTRATIVAS.map(habilidade => (
                      <div key={habilidade} className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value.includes(habilidade)}
                          onCheckedChange={() => {
                            if (field.value.includes(habilidade)) {
                              field.onChange(field.value.filter(h => h !== habilidade));
                            } else {
                              field.onChange([...field.value, habilidade]);
                            }
                          }}
                        />
                        <span className="text-sm">{habilidade}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Área Jurídica</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {HABILIDADES_TECNICAS_JURIDICAS.map(habilidade => (
                      <div key={habilidade} className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value.includes(habilidade)}
                          onCheckedChange={() => {
                            if (field.value.includes(habilidade)) {
                              field.onChange(field.value.filter(h => h !== habilidade));
                            } else {
                              field.onChange([...field.value, habilidade]);
                            }
                          }}
                        />
                        <span className="text-sm">{habilidade}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />
                
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Tecnologia da Informação</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {HABILIDADES_TECNICAS_TI.map(habilidade => (
                      <div key={habilidade} className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value.includes(habilidade)}
                          onCheckedChange={() => {
                            if (field.value.includes(habilidade)) {
                              field.onChange(field.value.filter(h => h !== habilidade));
                            } else {
                              field.onChange([...field.value, habilidade]);
                            }
                          }}
                        />
                        <span className="text-sm">{habilidade}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="habilidadesComportamentais"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Habilidades Comportamentais</FormLabel>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {HABILIDADES_COMPORTAMENTAIS.map(habilidade => (
                  <div key={habilidade} className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.value.includes(habilidade)}
                      onCheckedChange={() => {
                        if (field.value.includes(habilidade)) {
                          field.onChange(field.value.filter(h => h !== habilidade));
                        } else {
                          field.onChange([...field.value, habilidade]);
                        }
                      }}
                    />
                    <span className="text-sm">{habilidade}</span>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="idiomas"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Idiomas</FormLabel>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {IDIOMAS.map(idioma => (
                  <div key={idioma} className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.value.includes(idioma)}
                      onCheckedChange={() => {
                        if (field.value.includes(idioma)) {
                          field.onChange(field.value.filter(i => i !== idioma));
                        } else {
                          field.onChange([...field.value, idioma]);
                        }
                      }}
                    />
                    <span className="text-sm">{idioma}</span>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default SkillsSection;
