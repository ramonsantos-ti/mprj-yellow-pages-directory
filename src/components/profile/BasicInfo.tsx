
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { User } from 'lucide-react';

interface BasicInfoProps {
  form: UseFormReturn<any>;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ form }) => {
  const { register, formState: { errors } } = form;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="w-5 h-5" />
          <span>Informações Básicas</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="name">Nome Completo *</Label>
          <Input
            id="name"
            {...register('name', { required: 'Nome é obrigatório' })}
            placeholder="Digite seu nome completo"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message as string}</p>
          )}
        </div>

        <div>
          <Label htmlFor="matricula">Matrícula *</Label>
          <Input
            id="matricula"
            {...register('matricula', { required: 'Matrícula é obrigatória' })}
            placeholder="Digite sua matrícula"
          />
          {errors.matricula && (
            <p className="text-red-500 text-sm mt-1">{errors.matricula.message as string}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">E-mail *</Label>
          <Input
            id="email"
            type="email"
            {...register('email', { required: 'E-mail é obrigatório' })}
            placeholder="Digite seu e-mail"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message as string}</p>
          )}
        </div>

        <div>
          <Label htmlFor="telefone">Telefone</Label>
          <Input
            id="telefone"
            {...register('telefone')}
            placeholder="Digite seu telefone"
          />
        </div>

        <div>
          <Label htmlFor="biografia">Biografia</Label>
          <Textarea
            id="biografia"
            {...register('biografia')}
            placeholder="Conte um pouco sobre você, sua experiência e interesses profissionais"
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInfo;
