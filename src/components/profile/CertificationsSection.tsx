
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Award, Plus, X } from 'lucide-react';

interface CertificationsSectionProps {
  form: UseFormReturn<any>;
}

const CertificationsSection: React.FC<CertificationsSectionProps> = ({ form }) => {
  const { register, setValue, watch } = form;
  const [newCertification, setNewCertification] = useState('');
  const certificacoes = watch('certificacoes') || [];

  const addCertification = () => {
    if (newCertification.trim()) {
      const updatedCertifications = [...certificacoes, newCertification.trim()];
      setValue('certificacoes', updatedCertifications);
      setNewCertification('');
    }
  };

  const removeCertification = (index: number) => {
    const updatedCertifications = certificacoes.filter((_: any, i: number) => i !== index);
    setValue('certificacoes', updatedCertifications);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCertification();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Award className="w-5 h-5" />
          <span>Certificações</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <Label htmlFor="newCertification">Adicionar Certificação</Label>
            <Input
              id="newCertification"
              value={newCertification}
              onChange={(e) => setNewCertification(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite o nome da certificação"
            />
          </div>
          <div className="flex items-end">
            <Button type="button" onClick={addCertification} variant="logo-brown">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {certificacoes.length > 0 ? (
          <div>
            <Label>Certificações Adicionadas</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {certificacoes.map((cert: string, index: number) => (
                <Badge key={index} variant="outline" className="flex items-center gap-1">
                  {cert}
                  <button
                    type="button"
                    onClick={() => removeCertification(index)}
                    className="ml-1 hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-500 text-sm">Nenhuma certificação adicionada</p>
          </div>
        )}

        {/* Removido input oculto que serializava o array e causava problemas no submit */}
      </CardContent>
    </Card>
  );
};

export default CertificationsSection;

