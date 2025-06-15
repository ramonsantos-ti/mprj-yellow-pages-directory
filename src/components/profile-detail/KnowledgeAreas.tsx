
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Briefcase, Target } from 'lucide-react';

interface KnowledgeAreasProps {
  areasConhecimento: string[];
  temasInteresse: string[];
}

const KnowledgeAreas: React.FC<KnowledgeAreasProps> = ({ areasConhecimento, temasInteresse }) => {
  console.log('🧠 KnowledgeAreas - dados recebidos:');
  console.log('- areasConhecimento:', areasConhecimento);
  console.log('- temasInteresse:', temasInteresse);
  
  const hasAreas = areasConhecimento && areasConhecimento.length > 0;
  const hasTemas = temasInteresse && temasInteresse.length > 0;
  
  console.log('- hasAreas:', hasAreas, 'hasTemas:', hasTemas);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Briefcase className="w-5 h-5" />
            <span>Áreas de Conhecimento</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {hasAreas ? (
            <div className="flex flex-wrap gap-2">
              {areasConhecimento.map((area, index) => (
                <Badge key={index} className="bg-red-100 text-red-800">
                  {area}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">Nenhuma área de conhecimento informada</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>Área de Interesse</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {hasTemas ? (
            <div className="flex flex-wrap gap-2">
              {temasInteresse.map((tema, index) => (
                <Badge key={index} variant="outline">{tema}</Badge>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">Nenhuma área de interesse informada</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default KnowledgeAreas;
