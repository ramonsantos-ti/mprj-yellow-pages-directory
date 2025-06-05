
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { X } from 'lucide-react';
import { MAJOR_AREAS, getSpecificAreas } from '../data/knowledgeAreas';

interface KnowledgeAreaSelectorProps {
  selectedAreas: string[];
  onAreasChange: (areas: string[]) => void;
  especializacoes?: string;
  onEspecializacoesChange?: (text: string) => void;
}

const KnowledgeAreaSelector: React.FC<KnowledgeAreaSelectorProps> = ({
  selectedAreas,
  onAreasChange,
  especializacoes,
  onEspecializacoesChange
}) => {
  const [selectedMajorArea, setSelectedMajorArea] = React.useState<string>('');

  const handleSpecificAreaToggle = (area: string) => {
    if (selectedAreas.includes(area)) {
      onAreasChange(selectedAreas.filter(a => a !== area));
    } else {
      onAreasChange([...selectedAreas, area]);
    }
  };

  const removeArea = (area: string) => {
    onAreasChange(selectedAreas.filter(a => a !== area));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conhecimentos e Especialização</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Seleção de Grande Área */}
        <div className="space-y-2">
          <Label>Selecione uma Grande Área</Label>
          <Select value={selectedMajorArea} onValueChange={setSelectedMajorArea}>
            <SelectTrigger>
              <SelectValue placeholder="Escolha uma grande área" />
            </SelectTrigger>
            <SelectContent>
              {MAJOR_AREAS.map(area => (
                <SelectItem key={area} value={area}>
                  {area}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Seleção de Áreas Específicas */}
        {selectedMajorArea && (
          <div className="space-y-3">
            <Label>Áreas Específicas de {selectedMajorArea}</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto border rounded-lg p-3">
              {getSpecificAreas(selectedMajorArea).map(area => (
                <div key={area} className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedAreas.includes(area)}
                    onCheckedChange={() => handleSpecificAreaToggle(area)}
                  />
                  <span className="text-sm">{area}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Áreas Selecionadas */}
        {selectedAreas.length > 0 && (
          <div className="space-y-2">
            <Label>Áreas de Conhecimento Selecionadas</Label>
            <div className="flex flex-wrap gap-2">
              {selectedAreas.map((area, index) => (
                <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                  <span>{area}</span>
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => removeArea(area)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        )}

        <Separator />

        {/* Campo de Especializações */}
        {onEspecializacoesChange && (
          <div className="space-y-2">
            <Label>Especializações e Temas Específicos</Label>
            <Textarea
              value={especializacoes || ''}
              onChange={(e) => onEspecializacoesChange(e.target.value)}
              placeholder="Descreva especializações ou temas específicos que não estão listados acima..."
              rows={3}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KnowledgeAreaSelector;
