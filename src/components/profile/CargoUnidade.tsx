
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { BriefcaseBusiness } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { UseFormReturn } from 'react-hook-form';
import { X } from 'lucide-react';
import { ComboboxInput } from '../ui/combobox-input';

interface CargoUnidadeProps {
  form: UseFormReturn<any>;
  safeCargos: string[];
  safeFuncoes: string[];
  safeUnidades: string[];
  isValidSelectValue: (value: any) => boolean;
}

const CargoUnidade: React.FC<CargoUnidadeProps> = ({ 
  form, 
  safeCargos, 
  safeFuncoes,
  safeUnidades, 
  isValidSelectValue 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BriefcaseBusiness className="w-5 h-5 text-black" />
          <span>Cargo, Função e Lotação</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="cargo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cargos *</FormLabel>
              <div className="space-y-2">
                <ComboboxInput
                  options={safeCargos}
                  placeholder="Selecione ou digite um cargo"
                  onValueAdd={(value) => {
                    if (isValidSelectValue(value) && !field.value.includes(value)) {
                      field.onChange([...field.value, value]);
                    }
                  }}
                />
                <div className="flex flex-wrap gap-2 max-h-20 overflow-auto">
                  {field.value.map((cargo, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                      <span>{cargo}</span>
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => field.onChange(field.value.filter((_, i) => i !== index))}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="funcao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Função</FormLabel>
              <div className="space-y-2">
                <ComboboxInput
                  options={safeFuncoes}
                  placeholder="Selecione ou digite uma função (opcional)"
                  onValueAdd={(value) => {
                    if (isValidSelectValue(value) && !field.value.includes(value)) {
                      field.onChange([...field.value, value]);
                    }
                  }}
                />
                <div className="flex flex-wrap gap-2 max-h-20 overflow-auto">
                  {field.value.map((funcao, index) => (
                    <Badge key={index} variant="outline" className="flex items-center space-x-1">
                      <span>{funcao}</span>
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => field.onChange(field.value.filter((_, i) => i !== index))}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="unidade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unidades *</FormLabel>
              <div className="space-y-2">
                <ComboboxInput
                  options={safeUnidades}
                  placeholder="Selecione ou digite uma unidade"
                  onValueAdd={(value) => {
                    if (isValidSelectValue(value) && !field.value.includes(value)) {
                      field.onChange([...field.value, value]);
                    }
                  }}
                />
                <div className="flex flex-wrap gap-2 max-h-20 overflow-auto">
                  {field.value.map((unidade, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                      <span>{unidade}</span>
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => field.onChange(field.value.filter((_, i) => i !== index))}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default CargoUnidade;
