
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { X } from 'lucide-react';
import { IDIOMAS } from '../../data/constants';

interface AdditionalInfoProps {
  form: UseFormReturn<any>;
}

const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ form }) => {
  const [selectedIdioma, setSelectedIdioma] = React.useState<string>('');
  
  const idiomas = form.watch('idiomas') || [];

  const addIdioma = () => {
    if (selectedIdioma && !idiomas.includes(selectedIdioma)) {
      const newIdiomas = [...idiomas, selectedIdioma];
      form.setValue('idiomas', newIdiomas);
      setSelectedIdioma('');
    }
  };

  const removeIdioma = (idiomaToRemove: string) => {
    const newIdiomas = idiomas.filter((idioma: string) => idioma !== idiomaToRemove);
    form.setValue('idiomas', newIdiomas);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações Complementares</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Biografia */}
        <FormField
          control={form.control}
          name="biografia"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Biografia</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Conte um pouco sobre você e sua experiência profissional..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Especializações */}
        <FormField
          control={form.control}
          name="especializacoes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Especializações</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva suas principais especializações..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Idiomas */}
        <div className="space-y-4">
          <FormLabel>Idiomas</FormLabel>
          
          <div className="flex gap-2">
            <Select value={selectedIdioma} onValueChange={setSelectedIdioma}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Selecione um idioma" />
              </SelectTrigger>
              <SelectContent>
                {IDIOMAS.filter(idioma => !idiomas.includes(idioma)).map((idioma) => (
                  <SelectItem key={idioma} value={idioma}>
                    {idioma}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              type="button" 
              onClick={addIdioma}
              disabled={!selectedIdioma}
              variant="outline"
            >
              Adicionar
            </Button>
          </div>

          {/* Lista de idiomas selecionados */}
          {idiomas.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {idiomas.map((idioma: string, index: number) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {idioma}
                  <button
                    type="button"
                    onClick={() => removeIdioma(idioma)}
                    className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Publicações */}
        <FormField
          control={form.control}
          name="publicacoes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Publicações</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Liste suas principais publicações, artigos, livros..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Termos */}
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
