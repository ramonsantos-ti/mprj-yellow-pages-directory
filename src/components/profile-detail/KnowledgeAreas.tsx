
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Briefcase } from 'lucide-react';

interface KnowledgeAreasProps {
  areasConhecimento: string[];
  temasInteresse: string[];
}

const KnowledgeAreas: React.FC<KnowledgeAreasProps> = ({ areasConhecimento, temasInteresse }) => {
  if (!areasConhecimento?.length && !temasInteresse?.length) return null;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Areas de Conhecimento */}
      {areasConhecimento && areasConhecimento.length > 0 && (
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

      {/* Temas de Interesse */}
      {temasInteresse && temasInteresse.length > 0 && (
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
