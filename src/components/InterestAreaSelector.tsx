
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { INTEREST_AREAS, MainInterestArea } from '../data/interestAreas';
import { UseFormReturn } from 'react-hook-form';
import SelectedAreasList from './interest-area/SelectedAreasList';
import AreaInput from './interest-area/AreaInput';

interface InterestAreaSelectorProps {
  form: UseFormReturn<any>;
  fieldName: string;
}

const InterestAreaSelector: React.FC<InterestAreaSelectorProps> = ({ form, fieldName }) => {
  // Criar lista de todas as áreas (gerais + específicas) para autocompletar
  const allAreas = [
    ...(Object.keys(INTEREST_AREAS) as MainInterestArea[]),
    ...Object.values(INTEREST_AREAS).flat()
  ];

  const addArea = (area: string, field: any) => {
    if (!field.value.includes(area)) {
      field.onChange([...field.value, area]);
    }
  };

  const removeArea = (areaToRemove: string, field: any) => {
    field.onChange(field.value.filter((area: string) => area !== areaToRemove));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Áreas de Interesse</CardTitle>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name={fieldName}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Áreas de Interesse *</FormLabel>
              
              <SelectedAreasList 
                selectedAreas={field.value}
                onRemoveArea={(area) => removeArea(area, field)}
              />

              <AreaInput 
                allAreas={allAreas}
                selectedAreas={field.value}
                onAddArea={(area) => addArea(area, field)}
              />
              
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default InterestAreaSelector;
