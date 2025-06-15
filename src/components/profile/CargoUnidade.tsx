import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge as BadgeIcon } from 'lucide-react'; // Ícone de crachá
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { UseFormReturn } from 'react-hook-form';
import { X } from 'lucide-react';

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
          <BadgeIcon className="w-5 h-5 text-red-900" />
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
                <Select onValueChange={(value) => {
                  console.log('Cargo selected:', value, 'Type:', typeof value);
                  if (isValidSelectValue(value) && !field.value.includes(value)) {
                    field.onChange([...field.value, value]);
                  }
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um cargo" />
                  </SelectTrigger>
                  <SelectContent>
                    {safeCargos.map((cargo, index) => (
                      <SelectItem key={`cargo-${index}-${cargo}`} value={cargo}>
                        {cargo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2">
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
                <Select onValueChange={(value) => {
                  console.log('Funcao selected:', value, 'Type:', typeof value);
                  if (isValidSelectValue(value) && !field.value.includes(value)) {
                    field.onChange([...field.value, value]);
                  }
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma função (opcional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {safeFuncoes.map((funcao, index) => (
                      <SelectItem key={`funcao-${index}-${funcao}`} value={funcao}>
                        {funcao}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2">
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
                <Select onValueChange={(value) => {
                  console.log('Unidade selected:', value, 'Type:', typeof value);
                  if (isValidSelectValue(value) && !field.value.includes(value)) {
                    field.onChange([...field.value, value]);
                  }
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma unidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {safeUnidades.map((unidade, index) => (
                      <SelectItem key={`unidade-${index}-${unidade}`} value={unidade}>
                        {unidade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2">
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
