import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useDisabilityTypes } from '@/hooks/useDisabilityTypes';
import { PcdVisibilityControl } from './PcdVisibilityControl';
import { ProfileFormData } from './ProfileFormSchema';

interface DisabilitySectionProps {
  form: UseFormReturn<any>;
}

const CATEGORY_LABELS = {
  fisica: '🦽 Deficiência Física',
  visual: '👁️ Deficiência Visual',
  auditiva: '👂 Deficiência Auditiva',
  intelectual: '🧠 Deficiência Intelectual',
  multipla: '🔗 Deficiência Múltipla'
};

export const DisabilitySection: React.FC<DisabilitySectionProps> = ({ form }) => {
  const { disabilityTypes, loading } = useDisabilityTypes();
  const isPcd = form.watch('isPcd');
  const selectedDisabilities = form.watch('disabilities') || [];

  const handleDisabilityChange = (disabilityId: string, checked: boolean) => {
    const current = selectedDisabilities;
    
    if (checked) {
      // Adicionar deficiência
      const newDisabilities = [...current, { disabilityTypeId: disabilityId, additionalInfo: '' }];
      form.setValue('disabilities', newDisabilities);
    } else {
      // Remover deficiência
      const newDisabilities = current.filter(d => d.disabilityTypeId !== disabilityId);
      form.setValue('disabilities', newDisabilities);
    }
  };

  const handleAdditionalInfoChange = (disabilityId: string, additionalInfo: string) => {
    const current = selectedDisabilities;
    const newDisabilities = current.map(d => 
      d.disabilityTypeId === disabilityId 
        ? { ...d, additionalInfo }
        : d
    );
    form.setValue('disabilities', newDisabilities);
  };

  const getDisabilitiesByCategory = (category: string) => {
    return disabilityTypes.filter(disability => disability.category === category);
  };

  const isDisabilitySelected = (disabilityId: string) => {
    return selectedDisabilities.some(d => d.disabilityTypeId === disabilityId);
  };

  const getAdditionalInfo = (disabilityId: string) => {
    return selectedDisabilities.find(d => d.disabilityTypeId === disabilityId)?.additionalInfo || '';
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Informações sobre Deficiência</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground">Carregando tipos de deficiência...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações sobre Deficiência</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Checkbox principal PcD */}
        <FormField
          control={form.control}
          name="isPcd"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    if (!checked) {
                      form.setValue('disabilities', []);
                      form.setValue('pcdVisibilityLevel', 'logged_users');
                    }
                  }}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-base font-medium">
                  Sou Pessoa com Deficiência (PcD)
                </FormLabel>
                <p className="text-sm text-muted-foreground">
                  Marque esta opção se você possui algum tipo de deficiência
                </p>
              </div>
            </FormItem>
          )}
        />

        {/* Controle de visibilidade */}
        {isPcd && (
          <PcdVisibilityControl form={form} />
        )}

        {/* Seleção de deficiências */}
        {isPcd && (
          <div className="space-y-6">
            <Separator />
            <div>
              <h4 className="text-lg font-medium mb-4">Selecione o(s) tipo(s) de deficiência:</h4>
              
              {Object.entries(CATEGORY_LABELS).map(([category, label]) => {
                const categoryDisabilities = getDisabilitiesByCategory(category);
                
                if (categoryDisabilities.length === 0) return null;
                
                return (
                  <div key={category} className="space-y-3 mb-6">
                    <h5 className="font-medium text-base text-foreground">{label}</h5>
                    <div className="grid grid-cols-1 gap-3 ml-4">
                      {categoryDisabilities.map((disability) => {
                        const isSelected = isDisabilitySelected(disability.id);
                        const additionalInfo = getAdditionalInfo(disability.id);
                        
                        return (
                          <div key={disability.id} className="space-y-2">
                            <div className="flex items-start space-x-3">
                              <Checkbox
                                id={`disability-${disability.id}`}
                                checked={isSelected}
                                onCheckedChange={(checked) => 
                                  handleDisabilityChange(disability.id, checked as boolean)
                                }
                              />
                              <div className="grid gap-1.5 leading-none">
                                <Label 
                                  htmlFor={`disability-${disability.id}`}
                                  className="text-sm font-normal cursor-pointer"
                                >
                                  {disability.name}
                                </Label>
                                {disability.description && (
                                  <p className="text-xs text-muted-foreground">
                                    {disability.description}
                                  </p>
                                )}
                              </div>
                            </div>
                            
                            {/* Campo de informações adicionais */}
                            {isSelected && (
                              <div className="ml-6">
                                <Label className="text-xs text-muted-foreground">
                                  Informações adicionais (opcional)
                                </Label>
                                <Textarea
                                  placeholder="Descreva detalhes específicos sobre esta deficiência..."
                                  value={additionalInfo}
                                  onChange={(e) => 
                                    handleAdditionalInfoChange(disability.id, e.target.value)
                                  }
                                  className="mt-1 min-h-[60px] text-sm"
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};