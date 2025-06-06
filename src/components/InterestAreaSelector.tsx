
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { INTEREST_AREAS, MainInterestArea } from '../data/interestAreas';
import { UseFormReturn } from 'react-hook-form';
import { X, ChevronDown, ChevronUp, Plus } from 'lucide-react';

interface InterestAreaSelectorProps {
  form: UseFormReturn<any>;
  fieldName: string;
}

const InterestAreaSelector: React.FC<InterestAreaSelectorProps> = ({ form, fieldName }) => {
  const [expandedAreas, setExpandedAreas] = useState<Set<MainInterestArea>>(new Set());
  const [customArea, setCustomArea] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const toggleAreaExpansion = (area: MainInterestArea) => {
    const newExpanded = new Set(expandedAreas);
    if (newExpanded.has(area)) {
      newExpanded.delete(area);
    } else {
      newExpanded.add(area);
    }
    setExpandedAreas(newExpanded);
  };

  const addMainArea = (mainArea: MainInterestArea, field: any) => {
    if (!field.value.includes(mainArea)) {
      field.onChange([...field.value, mainArea]);
    }
  };

  const addSpecificArea = (specificArea: string, field: any) => {
    if (!field.value.includes(specificArea)) {
      field.onChange([...field.value, specificArea]);
    }
  };

  const addCustomArea = (field: any) => {
    if (customArea.trim() && !field.value.includes(customArea.trim())) {
      field.onChange([...field.value, customArea.trim()]);
      setCustomArea('');
      setShowCustomInput(false);
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
              
              {/* Áreas Selecionadas */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Áreas Selecionadas</h4>
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

              {/* Áreas Principais */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-900">Selecione as Áreas de Interesse</h4>
                
                {/* Áreas Gerais */}
                <div className="space-y-3">
                  <h5 className="text-sm font-medium text-gray-700">Áreas Gerais</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {(Object.keys(INTEREST_AREAS) as MainInterestArea[]).map(mainArea => (
                      <div key={mainArea} className="space-y-2">
                        <div className="flex items-center justify-between p-2 border border-gray-200 rounded-md bg-white hover:bg-gray-50">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={field.value.includes(mainArea)}
                              onCheckedChange={() => addMainArea(mainArea, field)}
                            />
                            <span className="text-sm font-medium">{mainArea}</span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleAreaExpansion(mainArea)}
                            className="h-6 w-6 p-0"
                          >
                            {expandedAreas.has(mainArea) ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                        
                        {/* Subáreas */}
                        {expandedAreas.has(mainArea) && (
                          <div className="ml-4 p-3 border border-gray-100 rounded-md bg-gray-50">
                            <div className="grid grid-cols-1 gap-2">
                              {INTEREST_AREAS[mainArea].map(specificArea => (
                                <div key={specificArea} className="flex items-center space-x-2">
                                  <Checkbox
                                    checked={field.value.includes(specificArea)}
                                    onCheckedChange={() => addSpecificArea(specificArea, field)}
                                  />
                                  <span className="text-sm">{specificArea}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Área Personalizada */}
                <div className="space-y-3">
                  <h5 className="text-sm font-medium text-gray-700">Área Personalizada</h5>
                  
                  {!showCustomInput ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowCustomInput(true)}
                      className="flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Adicionar Área Personalizada</span>
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Digite uma área de interesse..."
                        value={customArea}
                        onChange={(e) => setCustomArea(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addCustomArea(field);
                          }
                        }}
                      />
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
                        }}
                      >
                        Cancelar
                      </Button>
                    </div>
                  )}
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

export default InterestAreaSelector;
