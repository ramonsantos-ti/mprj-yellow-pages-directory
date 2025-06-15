
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Briefcase } from 'lucide-react';

interface KnowledgeAreasProps {
  areasConhecimento: string[];
  temasInteresse: string[];
}

const KnowledgeAreas: React.FC<KnowledgeAreasProps> = ({ areasConhecimento, temasInteresse }) => {
  console.log('🧠 KnowledgeAreas renderizando:');
  console.log('- Áreas conhecimento recebidas:', areasConhecimento);
  console.log('- Temas interesse recebidos:', temasInteresse);
  console.log('- Tipo áreas:', typeof areasConhecimento, Array.isArray(areasConhecimento));
  console.log('- Tipo temas:', typeof temasInteresse, Array.isArray(temasInteresse));
  
  // Garantir que são arrays válidos
  const areas = Array.isArray(areasConhecimento) ? areasConhecimento : [];
  const temas = Array.isArray(temasInteresse) ? temasInteresse : [];
  
  const hasAreas = areas.length > 0;
  const hasTemas = temas.length > 0;
  
  console.log('- hasAreas:', hasAreas, 'hasTemas:', hasTemas);
  
  if (!hasAreas && !hasTemas) {
    console.log('🧠 KnowledgeAreas: sem dados válidos, não renderizando');
    return null;
  }

  console.log('🧠 KnowledgeAreas: renderizando com dados válidos');
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
              {areas.map((area, index) => (
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
              {temas.map((tema, index) => (
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
