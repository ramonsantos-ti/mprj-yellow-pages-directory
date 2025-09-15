import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Users, Globe, Lock } from 'lucide-react';
import { usePcdPermissions } from '@/hooks/usePcdPermissions';
import { PcdVisibilityLevel } from '@/types';
import { ProfileFormData } from './ProfileFormSchema';

interface PcdVisibilityControlProps {
  form: UseFormReturn<any>;
}

const VISIBILITY_OPTIONS: { 
  value: PcdVisibilityLevel; 
  label: string; 
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    value: 'public',
    label: 'Público',
    description: 'Qualquer pessoa pode ver suas informações de deficiência',
    icon: <Globe className="h-4 w-4" />
  },
  {
    value: 'logged_users',
    label: 'Usuários logados',
    description: 'Apenas usuários logados no sistema podem ver',
    icon: <Users className="h-4 w-4" />
  },
  {
    value: 'admin_only',
    label: 'Apenas administradores',
    description: 'Somente administradores do sistema podem ver',
    icon: <Lock className="h-4 w-4" />
  }
];

export const PcdVisibilityControl: React.FC<PcdVisibilityControlProps> = ({ form }) => {
  const { getVisibilityDescription } = usePcdPermissions();
  const currentVisibility = form.watch('pcdVisibilityLevel') || 'logged_users';

  return (
    <Card className="bg-muted/30">
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Privacidade das Informações</span>
          </div>
          
          <FormField
            control={form.control}
            name="pcdVisibilityLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">
                  Quem pode ver suas informações de deficiência?
                </FormLabel>
                <Select 
                  value={field.value || 'logged_users'} 
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o nível de privacidade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {VISIBILITY_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          {option.icon}
                          <span>{option.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Descrição da opção selecionada */}
          <div className="text-xs text-muted-foreground bg-background rounded-md p-3 border">
            {getVisibilityDescription(currentVisibility)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};