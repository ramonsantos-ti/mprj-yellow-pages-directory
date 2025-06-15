
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form';
import { UseFormReturn } from 'react-hook-form';

interface PublicationsSectionProps {
  form: UseFormReturn<any>;
}

const PublicationsSection: React.FC<PublicationsSectionProps> = ({ form }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Publicações, Cursos Ministrados e Trabalhos de Destaque</CardTitle>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="publicacoes"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="publicacoes">Publicações e Trabalhos de Destaque</FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  id="publicacoes"
                  rows={5} 
                  placeholder="Liste suas publicações, cursos ministrados, trabalhos de destaque, etc..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default PublicationsSection;
