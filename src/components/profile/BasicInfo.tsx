
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form';
import { UseFormReturn } from 'react-hook-form';

interface BasicInfoProps {
  form: UseFormReturn<any>;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ form }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações Básicas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Completo *</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="matricula"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Matrícula *</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    disabled 
                    placeholder="Matrícula como informada no cadastro"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Institucional * (@mprj.mp.br)</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="nome@mprj.mp.br" />
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
                <FormLabel>Telefone Institucional</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="(21) 9999-9999" />
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
              <FormLabel>Biografia/Apresentação</FormLabel>
              <FormControl>
                <Textarea {...field} rows={4} placeholder="Fale um pouco sobre você..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default BasicInfo;
