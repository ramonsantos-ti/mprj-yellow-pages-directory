
import React, { useState, useEffect } from 'react';
import { KNOWLEDGE_AREAS } from '../data/knowledgeAreas';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { X } from 'lucide-react';

interface KnowledgeAreaSelectorProps {
  selectedAreas: string[];
  onChange: (areas: string[]) => void;
}

const KnowledgeAreaSelector: React.FC<KnowledgeAreaSelectorProps> = ({
  selectedAreas,
  onChange
}) => {
  const [selectedMainArea, setSelectedMainArea] = useState<string>('');
  const [availableSpecificAreas, setAvailableSpecificAreas] = useState<string[]>([]);

  useEffect(() => {
    if (selectedMainArea) {
      const mainArea = KNOWLEDGE_AREAS.find(area => area.id === selectedMainArea);
      setAvailableSpecificAreas(mainArea?.specificAreas || []);
    } else {
      setAvailableSpecificAreas([]);
    }
  }, [selectedMainArea]);

  const handleAddSpecificArea = (specificArea: string) => {
    if (!selectedAreas.includes(specificArea)) {
      onChange([...selectedAreas, specificArea]);
    }
    setSelectedMainArea('');
  };

  const handleRemoveArea = (areaToRemove: string) => {
    onChange(selectedAreas.filter(area => area !== areaToRemove));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Seleção da área principal */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Área Principal
          </label>
          <Select value={selectedMainArea} onValueChange={setSelectedMainArea}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma área principal" />
            </SelectTrigger>
            <SelectContent>
              {KNOWLEDGE_AREAS.map((area) => (
                <SelectItem key={area.id} value={area.id}>
                  {area.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Seleção da área específica */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Área Específica
          </label>
          <Select 
            value="" 
            onValueChange={handleAddSpecificArea}
            disabled={!selectedMainArea}
          >
            <SelectTrigger>
              <SelectValue placeholder={
                selectedMainArea 
                  ? "Selecione uma área específica" 
                  : "Primeiro selecione uma área principal"
              } />
            </SelectTrigger>
            <SelectContent>
              {availableSpecificAreas.map((specificArea) => (
                <SelectItem 
                  key={specificArea} 
                  value={specificArea}
                  disabled={selectedAreas.includes(specificArea)}
                >
                  {specificArea}
                  {selectedAreas.includes(specificArea) && " (já selecionada)"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Áreas selecionadas */}
      {selectedAreas.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Áreas Selecionadas
          </label>
          <div className="flex flex-wrap gap-2">
            {selectedAreas.map((area) => (
              <Badge key={area} variant="secondary" className="flex items-center gap-1">
                {area}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => handleRemoveArea(area)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgeAreaSelector;
