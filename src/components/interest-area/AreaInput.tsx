
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
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
  const [open, setOpen] = useState(false);

  const addCustomArea = () => {
    if (customArea.trim() && !selectedAreas.includes(customArea.trim())) {
      onAddArea(customArea.trim());
      setCustomArea('');
      setShowCustomInput(false);
    }
  };

  const selectFromList = (area: string) => {
    if (!selectedAreas.includes(area)) {
      onAddArea(area);
    }
    setOpen(false);
  };

  const handleCancel = () => {
    setShowCustomInput(false);
    setCustomArea('');
    setOpen(false);
  };

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
        <div className="space-y-2">
          <div className="flex space-x-2">
            <div className="flex-1">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Input
                    placeholder="Digite uma área de interesse..."
                    value={customArea}
                    onChange={(e) => {
                      setCustomArea(e.target.value);
                      setOpen(e.target.value.length > 0);
                    }}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addCustomArea();
                      }
                    }}
                  />
                </PopoverTrigger>
                {open && customArea.length > 0 && (
                  <PopoverContent className="w-full p-0" align="start">
                    <Command>
                      <CommandList>
                        <CommandEmpty>Nenhuma área encontrada.</CommandEmpty>
                        <CommandGroup>
                          {allAreas
                            .filter(area => 
                              area.toLowerCase().includes(customArea.toLowerCase()) &&
                              !selectedAreas.includes(area)
                            )
                            .slice(0, 10)
                            .map((area) => (
                              <CommandItem
                                key={area}
                                onSelect={() => selectFromList(area)}
                              >
                                {area}
                              </CommandItem>
                            ))
                          }
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                )}
              </Popover>
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
