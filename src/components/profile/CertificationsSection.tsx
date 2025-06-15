
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { UseFormReturn } from 'react-hook-form';
import { X } from 'lucide-react';

interface CertificationsSectionProps {
  form: UseFormReturn<any>;
  safeCertificacoes: string[];
  isValidSelectValue: (value: any) => boolean;
}

const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  form,
  safeCertificacoes,
  isValidSelectValue
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Certificações Relevantes</CardTitle>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="certificacoes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Certificações (PMP, ITIL, ISO, etc.)</FormLabel>
              <div className="space-y-2">
                <Select onValueChange={(value) => {
                  if (isValidSelectValue(value) && !field.value?.includes(value)) {
                    field.onChange([...(field.value || []), value]);
                  }
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma certificação" />
                  </SelectTrigger>
                  <SelectContent>
                    {safeCertificacoes.map((cert, index) => (
                      <SelectItem key={`cert-${index}-${cert}`} value={cert}>
                        {cert}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2">
                  {field.value?.map((cert, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                      <span>{cert}</span>
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => field.onChange(field.value?.filter((_, i) => i !== index))}
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

export default CertificationsSection;
