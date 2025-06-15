
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form';
import { FileText } from 'lucide-react';

interface PublicationsSectionProps {
  form: UseFormReturn<any>;
}

const PublicationsSection: React.FC<PublicationsSectionProps> = ({ form }) => {
  // LOGA o valor atual sempre que mudar
  React.useEffect(() => {
    console.log('[DEBUG][Publications] publicacoes value:', form.watch('publicacoes'));
  }, [form.watch('publicacoes')]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="w-5 h-5" />
          <span>Publicações</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="publicacoes"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="publicacoes">Publicações Relevantes</FormLabel>
              <FormControl>
                <Textarea
                  id="publicacoes"
                  {...field}
                  placeholder="Liste suas publicações, artigos, livros ou trabalhos acadêmicos relevantes"
                  rows={6}
                  value={field.value ?? ""}
                />
              </FormControl>
              <span className="text-xs text-gray-400">[DEBUG] publicacoes: {field.value && field.value.length > 0 ? `"${field.value}"` : "(vazio)"}</span>
              <p className="text-sm text-gray-500 mt-1">
                Descreva suas principais publicações e contribuições acadêmicas
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default PublicationsSection;

