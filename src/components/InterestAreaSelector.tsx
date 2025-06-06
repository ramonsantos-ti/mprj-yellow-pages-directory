
import React from 'react';
import { FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Checkbox } from './ui/checkbox';
import { Separator } from './ui/separator';
import { INTEREST_AREAS, MainInterestArea } from '../data/interestAreas';
import { UseFormReturn } from 'react-hook-form';

interface InterestAreaSelectorProps {
  form: UseFormReturn<any>;
  fieldName: string;
}

const InterestAreaSelector: React.FC<InterestAreaSelectorProps> = ({ form, fieldName }) => {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Áreas de Interesse *</FormLabel>
          <div className="space-y-6">
            {(Object.keys(INTEREST_AREAS) as MainInterestArea[]).map((mainArea, index) => (
              <div key={mainArea}>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">{mainArea}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {INTEREST_AREAS[mainArea].map(specificArea => (
                      <div key={specificArea} className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value.includes(specificArea)}
                          onCheckedChange={() => {
                            if (field.value.includes(specificArea)) {
                              field.onChange(field.value.filter((area: string) => area !== specificArea));
                            } else {
                              field.onChange([...field.value, specificArea]);
                            }
                          }}
                        />
                        <span className="text-sm">{specificArea}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {index < Object.keys(INTEREST_AREAS).length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InterestAreaSelector;
