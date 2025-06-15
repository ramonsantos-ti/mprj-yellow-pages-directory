
import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { FileText, Link as LinkIcon } from 'lucide-react';

interface PublicationsSectionProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

const PublicationsSection: React.FC<PublicationsSectionProps> = ({ register, errors }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Publicações</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="publicacoes">Publicações Relevantes</Label>
            <Textarea
              id="publicacoes"
              {...register('publicacoes')}
              placeholder="Liste suas publicações, artigos, livros ou trabalhos acadêmicos relevantes"
              rows={6}
            />
            <p className="text-sm text-gray-500 mt-1">
              Descreva suas principais publicações e contribuições acadêmicas
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <LinkIcon className="w-5 h-5" />
            <span>Currículo e Especializações</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="linkCurriculo">Link do Currículo</Label>
            <Input
              id="linkCurriculo"
              type="url"
              {...register('linkCurriculo')}
              placeholder="https://exemplo.com/curriculo"
            />
            <p className="text-sm text-gray-500 mt-1">
              Link para seu currículo completo (Lattes, LinkedIn, etc.)
            </p>
          </div>

          <div>
            <Label htmlFor="especializacoes">Especializações</Label>
            <Textarea
              id="especializacoes"
              {...register('especializacoes')}
              placeholder="Descreva suas principais especializações e áreas de expertise"
              rows={4}
            />
            <p className="text-sm text-gray-500 mt-1">
              Detalhe suas especializações técnicas e áreas de conhecimento específico
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PublicationsSection;
