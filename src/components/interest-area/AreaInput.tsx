
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '../ui/command';
import { Plus } from 'lucide-react';

interface AreaInputProps {
  allAreas: string[];
  selectedAreas: string[];
  onAddArea: (area: string) => void;
}

const AreaInput: React.FC<AreaInputProps> = ({ allAreas, selectedAreas, onAddArea }) => {
  const [customArea, setCustomArea] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const addCustomArea = () => {
    if (customArea.trim() && !selectedAreas.includes(customArea.trim())) {
      onAddArea(customArea.trim());
      setCustomArea('');
      setShowCustomInput(false);
      setShowSuggestions(false);
    }
  };

  const selectFromList = (area: string) => {
    if (!selectedAreas.includes(area)) {
      onAddArea(area);
    }
    setCustomArea('');
    setShowSuggestions(false);
    setShowCustomInput(false);
  };

  const handleCancel = () => {
    setShowCustomInput(false);
    setCustomArea('');
    setShowSuggestions(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomArea(value);
    setShowSuggestions(value.length > 0);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCustomArea();
    }
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredAreas = allAreas
    .filter(area => 
      area.toLowerCase().includes(customArea.toLowerCase()) &&
      !selectedAreas.includes(area)
    )
    .slice(0, 10);

  return (
    <div className="space-y-3">
      <h5 className="text-sm font-medium text-gray-700">Insira as áreas aqui</h5>
      
      {!showCustomInput ? (
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowCustomInput(true)}
          className="flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Adicionar área</span>
        </Button>
      ) : (
        <div className="space-y-2 relative">
          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                placeholder="Digite uma área de interesse..."
                value={customArea}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                onFocus={() => customArea.length > 0 && setShowSuggestions(true)}
                autoFocus
              />
              
              {showSuggestions && customArea.length > 0 && filteredAreas.length > 0 && (
                <div 
                  ref={suggestionsRef}
                  className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg"
                >
                  <Command>
                    <CommandList>
                      <CommandEmpty>Nenhuma área encontrada.</CommandEmpty>
                      <CommandGroup>
                        {filteredAreas.map((area) => (
                          <CommandItem
                            key={area}
                            onSelect={() => selectFromList(area)}
                            className="cursor-pointer"
                          >
                            {area}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </div>
              )}
            </div>
            <Button
              type="button"
              onClick={addCustomArea}
              disabled={!customArea.trim()}
            >
              Adicionar
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
            >
              Cancelar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AreaInput;
