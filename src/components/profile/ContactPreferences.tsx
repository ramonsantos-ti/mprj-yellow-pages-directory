
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { formaContatoMap } from './ProfileFormConstants';

interface ContactPreferencesProps {
  formaContato: string;
  setFormaContato: React.Dispatch<React.SetStateAction<string>>;
  horarioPreferencial: string;
  setHorarioPreferencial: React.Dispatch<React.SetStateAction<string>>;
  safeFormasContato: string[];
  isValidSelectValue: (value: any) => boolean;
}

const ContactPreferences: React.FC<ContactPreferencesProps> = ({
  formaContato,
  setFormaContato,
  horarioPreferencial,
  setHorarioPreferencial,
  safeFormasContato,
  isValidSelectValue
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferências de Contato</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="formaContato" className="text-sm font-medium text-gray-900">Forma Preferencial de Contato</label>
          <Select value={formaContato} onValueChange={(value) => {
            console.log('Forma contato selected:', value, 'Type:', typeof value);
            if (isValidSelectValue(value)) {
              setFormaContato(value);
            }
          }}>
            <SelectTrigger id="formaContato" className="mt-2">
              <SelectValue placeholder="Selecione a forma de contato" />
            </SelectTrigger>
            <SelectContent>
              {safeFormasContato.map((forma, formaIndex) => (
                <SelectItem key={`forma-${formaIndex}-${forma}`} value={forma}>
                  {forma}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="horarioPreferencial" className="text-sm font-medium text-gray-900">Horário Preferencial</label>
          <Input
            id="horarioPreferencial"
            className="mt-2"
            placeholder="Ex: manhã, tarde, 14h às 16h"
            value={horarioPreferencial}
            onChange={(e) => setHorarioPreferencial(e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactPreferences;
