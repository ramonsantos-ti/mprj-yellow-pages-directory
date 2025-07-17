
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form';
import { Briefcase } from 'lucide-react';

interface ProfessionalExperienceSectionProps {
  form: UseFormReturn<any>;
}

const ProfessionalExperienceSection: React.FC<ProfessionalExperienceSectionProps> = ({ form }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Briefcase className="w-5 h-5" />
          <span>Experiência Profissional</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="experienciasProfissionais.0.tempoMPRJ"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="tempoMPRJ">Tempo no MPRJ</FormLabel>
              <FormControl>
                <Textarea
                  id="tempoMPRJ"
                  {...field}
                  placeholder="Descreva seu tempo de atuação no MPRJ"
                  rows={3}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="experienciasProfissionais.0.experienciaAnterior"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="experienciaAnterior">Experiência Anterior</FormLabel>
              <FormControl>
                <Textarea
                  id="experienciaAnterior"
                  {...field}
                  placeholder="Descreva sua experiência profissional anterior"
                  rows={3}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="experienciasProfissionais.0.projetosInternos"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="projetosInternos">Projetos Internos</FormLabel>
              <FormControl>
                <Textarea
                  id="projetosInternos"
                  {...field}
                  placeholder="Descreva projetos internos dos quais participou"
                  rows={3}
                  value={field.value || ''}
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

export default ProfessionalExperienceSection;
