
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form';
import { UseFormReturn } from 'react-hook-form';

interface AdditionalInfoProps {
  form: UseFormReturn<any>;
}

const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ form }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações Adicionais</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="aceiteTermos"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  id="aceiteTermos"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel htmlFor="aceiteTermos">
                  Declaro que as informações prestadas neste formulário são verdadeiras, 
                  atualizadas e de minha responsabilidade. Comprometo-me a atualizá-las 
                  sempre que houver mudanças relevantes. *
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default AdditionalInfo;
