
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form';
import { Link as LinkIcon } from 'lucide-react';

interface CurriculumSectionProps {
  form: UseFormReturn<any>;
}

const CurriculumSection: React.FC<CurriculumSectionProps> = ({ form }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <LinkIcon className="w-5 h-5" />
          <span>Currículo</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="linkCurriculo"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="linkCurriculo">Link do Currículo</FormLabel>
              <FormControl>
                <Input
                  id="linkCurriculo"
                  type="url"
                  {...field}
                  placeholder="https://exemplo.com/curriculo"
                />
              </FormControl>
              <p className="text-sm text-gray-500 mt-1">
                Link para seu currículo completo (Lattes, LinkedIn, etc.)
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default CurriculumSection;
