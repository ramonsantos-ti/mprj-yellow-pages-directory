
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Target } from 'lucide-react';
import { formatText } from '../../utils/formatText';

interface ProfileInterestAreasProps {
  temasInteresse: string[];
}

const ProfileInterestAreas: React.FC<ProfileInterestAreasProps> = ({ temasInteresse }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Target className="w-5 h-5 text-red-800" />
        Áreas de Interesse
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-2">
        {Array.isArray(temasInteresse) && temasInteresse.length > 0 ? (
          temasInteresse.map((tema, i) => (
            <Badge key={i} variant="outline">{formatText(tema)}</Badge>
          ))
        ) : (
          <span className="text-gray-500 italic">Nenhuma área de interesse informada</span>
        )}
      </div>
    </CardContent>
  </Card>
);

export default ProfileInterestAreas;
