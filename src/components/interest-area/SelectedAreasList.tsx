
import React from 'react';
import { Badge } from '../ui/badge';
import { X } from 'lucide-react';

interface SelectedAreasListProps {
  selectedAreas: string[];
  onRemoveArea: (area: string) => void;
}

const SelectedAreasList: React.FC<SelectedAreasListProps> = ({ selectedAreas, onRemoveArea }) => {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2 min-h-[2.5rem] p-3 border border-gray-200 rounded-md bg-gray-50">
        {selectedAreas.length === 0 ? (
          <span className="text-gray-500 text-sm">Nenhuma área selecionada</span>
        ) : (
          selectedAreas.map((area: string, index: number) => (
            <Badge key={index} variant="secondary" className="flex items-center space-x-1">
              <span>{area}</span>
              <X 
                className="w-3 h-3 cursor-pointer hover:text-red-600" 
                onClick={() => onRemoveArea(area)}
              />
            </Badge>
          ))
        )}
      </div>
    </div>
  );
};

export default SelectedAreasList;
