
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Briefcase } from 'lucide-react';

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
  
  // Se não há nem áreas nem temas, não renderiza
  if (!hasAreas && !hasTemas) {
    console.log('🧠 KnowledgeAreas: sem dados, não renderizando');
    return null;
  }

  console.log('🧠 KnowledgeAreas: renderizando');
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {hasAreas && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Briefcase className="w-5 h-5" />
              <span>Áreas de Conhecimento</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {areasConhecimento.map((area, index) => (
                <Badge key={index} className="bg-red-100 text-red-800">
                  {area}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {hasTemas && (
        <Card>
          <CardHeader>
            <CardTitle>Temas de Interesse</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {temasInteresse.map((tema, index) => (
                <Badge key={index} variant="outline">{tema}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default KnowledgeAreas;
