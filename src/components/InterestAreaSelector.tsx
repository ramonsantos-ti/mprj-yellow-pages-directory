
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { INTEREST_AREAS, MainInterestArea } from '../data/interestAreas';
import { UseFormReturn } from 'react-hook-form';
import { X, Plus } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface InterestAreaSelectorProps {
  form: UseFormReturn<any>;
  fieldName: string;
}

const InterestAreaSelector: React.FC<InterestAreaSelectorProps> = ({ form, fieldName }) => {
  const [customArea, setCustomArea] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [open, setOpen] = useState(false);

  // Criar lista de todas as áreas (gerais + específicas) para autocompletar
  const allAreas = [
    ...(Object.keys(INTEREST_AREAS) as MainInterestArea[]),
    ...Object.values(INTEREST_AREAS).flat()
  ];

  const addCustomArea = (field: any) => {
    if (customArea.trim() && !field.value.includes(customArea.trim())) {
      field.onChange([...field.value, customArea.trim()]);
      setCustomArea('');
      setShowCustomInput(false);
    }
  };

  const selectFromList = (area: string, field: any) => {
    if (!field.value.includes(area)) {
      field.onChange([...field.value, area]);
    }
    setOpen(false);
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
              
              {/* Áreas Selecionadas */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 min-h-[2.5rem] p-3 border border-gray-200 rounded-md bg-gray-50">
                  {field.value.length === 0 ? (
                    <span className="text-gray-500 text-sm">Nenhuma área selecionada</span>
                  ) : (
                    field.value.map((area: string, index: number) => (
                      <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                        <span>{area}</span>
                        <X 
                          className="w-3 h-3 cursor-pointer hover:text-red-600" 
                          onClick={() => removeArea(area, field)}
                        />
                      </Badge>
                    ))
                  )}
                </div>
              </div>

              {/* Campo de inserção com autocompletar */}
              <div className="space-y-3">
                <h5 className="text-sm font-medium text-gray-700">Insira as áreas aqui</h5>
                
                {!showCustomInput ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowCustomInput(true)}
                    className="flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Adicionar área</span>
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <div className="flex-1">
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Input
                              placeholder="Digite uma área de interesse..."
                              value={customArea}
                              onChange={(e) => {
                                setCustomArea(e.target.value);
                                setOpen(e.target.value.length > 0);
                              }}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  addCustomArea(field);
                                }
                              }}
                            />
                          </PopoverTrigger>
                          {open && customArea.length > 0 && (
                            <PopoverContent className="w-full p-0" align="start">
                              <Command>
                                <CommandList>
                                  <CommandEmpty>Nenhuma área encontrada.</CommandEmpty>
                                  <CommandGroup>
                                    {allAreas
                                      .filter(area => 
                                        area.toLowerCase().includes(customArea.toLowerCase()) &&
                                        !field.value.includes(area)
                                      )
                                      .slice(0, 10)
                                      .map((area) => (
                                        <CommandItem
                                          key={area}
                                          onSelect={() => selectFromList(area, field)}
                                        >
                                          {area}
                                        </CommandItem>
                                      ))
                                    }
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          )}
                        </Popover>
                      </div>
                      <Button
                        type="button"
                        onClick={() => addCustomArea(field)}
                        disabled={!customArea.trim()}
                      >
                        Adicionar
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setShowCustomInput(false);
                          setCustomArea('');
                          setOpen(false);
                        }}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default InterestAreaSelector;
