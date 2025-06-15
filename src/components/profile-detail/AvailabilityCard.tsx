
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Clock } from 'lucide-react';
import { Profile } from '../../types';

interface AvailabilityCardProps {
  disponibilidade: Profile['disponibilidade'];
  contato: Profile['contato'];
}

const AvailabilityCard: React.FC<AvailabilityCardProps> = ({ disponibilidade, contato }) => {
  const hasAvailabilityInfo = disponibilidade?.tipoColaboracao?.length > 0 || 
                             disponibilidade?.disponibilidadeEstimada || 
                             contato?.horarioPreferencial;

  if (!hasAvailabilityInfo) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="w-5 h-5" />
          <span>Disponibilidade</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {disponibilidade?.tipoColaboracao && disponibilidade.tipoColaboracao.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Tipos de Colaboração</h4>
              <div className="flex flex-wrap gap-1">
                {disponibilidade.tipoColaboracao.map((tipo, index) => (
                  <Badge key={index} variant="outline">{tipo}</Badge>
                ))}
              </div>
            </div>
          )}
          
          {disponibilidade?.disponibilidadeEstimada && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Disponibilidade Estimada</h4>
              <p className="text-gray-700">{disponibilidade.disponibilidadeEstimada}</p>
            </div>
          )}
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Forma de Contato Preferencial</h4>
            <Badge variant="outline">{contato?.formaContato || 'email'}</Badge>
          </div>
          
          {contato?.horarioPreferencial && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Horário Preferencial</h4>
              <p className="text-gray-700">{contato.horarioPreferencial}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AvailabilityCard;
