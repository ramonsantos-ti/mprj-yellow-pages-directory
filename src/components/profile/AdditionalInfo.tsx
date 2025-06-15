
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form';
import { Textarea } from '../ui/textarea';
import { CircleHelp } from 'lucide-react';

interface AdditionalInfoProps {
  form: UseFormReturn<any>;
}

const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ form }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CircleHelp className="w-5 h-5 text-black" />
          <span>Informações Complementares</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Campo livre de informações complementares */}
        <FormField
          control={form.control}
          name="informacoesComplementares"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Informações Adicionais</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Inclua aqui qualquer informação complementar relevante…"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Aceite dos termos */}
        <FormField
          control={form.control}
          name="aceiteTermos"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                  className="mt-1"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Aceito os termos e condições de uso da plataforma
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default AdditionalInfo;
