
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface AvailabilitySectionProps {
  tipoColaboracao: string[];
  setTipoColaboracao: React.Dispatch<React.SetStateAction<string[]>>;
  disponibilidadeEstimada: string;
  setDisponibilidadeEstimada: React.Dispatch<React.SetStateAction<string>>;
  safeTiposColaboracao: string[];
  safeDisponibilidadeEstimada: string[];
  isValidSelectValue: (value: any) => boolean;
}

const AvailabilitySection: React.FC<AvailabilitySectionProps> = ({
  tipoColaboracao,
  setTipoColaboracao,
  disponibilidadeEstimada,
  setDisponibilidadeEstimada,
  safeTiposColaboracao,
  safeDisponibilidadeEstimada,
  isValidSelectValue
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Disponibilidade para Colaboração</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-900">Tipo de Colaboração</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            {safeTiposColaboracao.map((tipo, index) => (
              <div key={tipo} className="flex items-center space-x-2">
                <Checkbox
                  id={`tipo-${index}`}
                  checked={tipoColaboracao.includes(tipo)}
                  onCheckedChange={() => {
                    if (tipoColaboracao.includes(tipo)) {
                      setTipoColaboracao(tipoColaboracao.filter(t => t !== tipo));
                    } else {
                      setTipoColaboracao([...tipoColaboracao, tipo]);
                    }
                  }}
                />
                <label htmlFor={`tipo-${index}`} className="text-sm">{tipo}</label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="disponibilidadeEstimada" className="text-sm font-medium text-gray-900">Disponibilidade Estimada</label>
          <Select value={disponibilidadeEstimada} onValueChange={(value) => {
            console.log('Disponibilidade selected:', value, 'Type:', typeof value);
            if (isValidSelectValue(value)) {
              setDisponibilidadeEstimada(value);
            }
          }}>
            <SelectTrigger id="disponibilidadeEstimada" className="mt-2">
              <SelectValue placeholder="Selecione sua disponibilidade" />
            </SelectTrigger>
            <SelectContent>
              {safeDisponibilidadeEstimada.map((disponibilidade, dispIndex) => (
                <SelectItem key={`disp-${dispIndex}-${disponibilidade}`} value={disponibilidade}>
                  {disponibilidade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default AvailabilitySection;
