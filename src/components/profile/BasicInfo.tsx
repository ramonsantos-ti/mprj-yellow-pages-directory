
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { User } from 'lucide-react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form';

interface BasicInfoProps {
  form: UseFormReturn<any>;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ form }) => {
  // LOGA o valor atual sempre que mudar
  React.useEffect(() => {
    console.log('[DEBUG][BasicInfo] biografia value:', form.watch('biografia'));
  }, [form.watch('biografia')]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="w-5 h-5" />
          <span>Informações Básicas</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Completo *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Digite seu nome completo"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="matricula"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Matrícula *</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Digite sua matrícula"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail *</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Digite seu e-mail"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="telefone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Digite seu telefone"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="biografia"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Biografia</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Conte um pouco sobre você, sua experiência e interesses profissionais"
                  rows={4}
                  value={field.value ?? ""} // previne undefined
                />
              </FormControl>
              <span className="text-xs text-gray-400">[DEBUG] biografia: {field.value && field.value.length > 0 ? `"${field.value}"` : "(vazio)"}</span>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default BasicInfo;

