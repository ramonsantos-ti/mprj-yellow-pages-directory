
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Target } from 'lucide-react';

interface KnowledgeAreasProps {
  temasInteresse: string[];
}

const KnowledgeAreas: React.FC<KnowledgeAreasProps> = ({ temasInteresse }) => {
  const hasTemas = temasInteresse && temasInteresse.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="w-5 h-5" />
          <span>Temas de Interesse</span>
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
          <p className="text-gray-500 italic">Nenhum tema de interesse informado</p>
        )}
      </CardContent>
    </Card>
  );
};

export default KnowledgeAreas;
