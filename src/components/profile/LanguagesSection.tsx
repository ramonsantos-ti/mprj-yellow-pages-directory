import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { X, Languages } from 'lucide-react';
import { IDIOMAS } from '../../data/constants';

interface LanguagesSectionProps {
  form: UseFormReturn<any>;
}

const LanguagesSection: React.FC<LanguagesSectionProps> = ({ form }) => {
  const [selectedIdioma, setSelectedIdioma] = React.useState<string>('');
  const idiomas = form.watch('idiomas') || [];

  // Ordenar lista de idiomas alfabeticamente antes de exibir no select
  const idiomasDisponiveis = IDIOMAS
    .filter((idioma: string) => !idiomas.includes(idioma))
    .slice()
    .sort((a: string, b: string) => a.localeCompare(b, 'pt-BR'));

  const addIdioma = () => {
    if (selectedIdioma && !idiomas.includes(selectedIdioma)) {
      form.setValue('idiomas', [...idiomas, selectedIdioma]);
      setSelectedIdioma('');
    }
  };

  const removeIdioma = (idioma: string) => {
    form.setValue('idiomas', idiomas.filter((i: string) => i !== idioma));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Languages className="w-5 h-5 text-black" />
          <span>Idiomas</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Select value={selectedIdioma} onValueChange={setSelectedIdioma}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Selecione um idioma" />
            </SelectTrigger>
            <SelectContent>
              {idiomasDisponiveis.map((idioma: string) => (
                <SelectItem key={idioma} value={idioma}>
                  {idioma}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="button" onClick={addIdioma} disabled={!selectedIdioma} variant="logo-brown">
            Adicionar
          </Button>
        </div>
        {/* Lista de idiomas selecionados */}
        {idiomas.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {idiomas.map((idioma: string) => (
              <Badge key={idioma} variant="secondary" className="flex items-center gap-1">
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
        <FormMessage />
      </CardContent>
    </Card>
  );
};

export default LanguagesSection;
