
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
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="w-5 h-5" />
          <span>Disponibilidade e Contato</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Tipos de Colaboração</h4>
            {disponibilidade?.tipoColaboracao && disponibilidade.tipoColaboracao.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {disponibilidade.tipoColaboracao.map((tipo, index) => (
                  <Badge key={index} variant="outline">{tipo}</Badge>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">Não informado</p>
            )}
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Disponibilidade Estimada</h4>
            {disponibilidade?.disponibilidadeEstimada ? (
              <p className="text-gray-700">{disponibilidade.disponibilidadeEstimada}</p>
            ) : (
              <p className="text-gray-500 italic">Não informado</p>
            )}
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Forma de Contato Preferencial</h4>
            <Badge variant="outline">{contato?.formaContato || 'E-mail'}</Badge>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Horário Preferencial</h4>
            {contato?.horarioPreferencial ? (
              <p className="text-gray-700">{contato.horarioPreferencial}</p>
            ) : (
              <p className="text-gray-500 italic">Não informado</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AvailabilityCard;
