import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Input } from './input';
import { Button } from './button';
import { Plus, X } from 'lucide-react';

interface ComboboxInputProps {
  options: string[];
  placeholder: string;
  onValueAdd: (value: string) => void;
  className?: string;
}

export const ComboboxInput: React.FC<ComboboxInputProps> = ({ 
  options, 
  placeholder, 
  onValueAdd, 
  className 
}) => {
  const [customInput, setCustomInput] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleSelectChange = (value: string) => {
    if (value === '__custom__') {
      setShowCustomInput(true);
    } else {
      onValueAdd(value);
    }
  };

  const handleCustomAdd = () => {
    if (customInput.trim()) {
      onValueAdd(customInput.trim());
      setCustomInput('');
      setShowCustomInput(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCustomAdd();
    }
    if (e.key === 'Escape') {
      setShowCustomInput(false);
      setCustomInput('');
    }
  };

  if (showCustomInput) {
    return (
      <div className={`flex gap-2 ${className || ''}`}>
        <Input
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          placeholder="Digite uma nova opção"
          onKeyDown={handleKeyPress}
          className="flex-1"
          autoFocus
        />
        <Button 
          type="button"
          onClick={handleCustomAdd}
          variant="outline"
          size="sm"
          disabled={!customInput.trim()}
        >
          <Plus className="w-4 h-4" />
        </Button>
        <Button 
          type="button"
          onClick={() => {
            setShowCustomInput(false);
            setCustomInput('');
          }}
          variant="outline"
          size="sm"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <Select onValueChange={handleSelectChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="max-h-56 overflow-y-auto">
        {options.map((option, index) => (
          <SelectItem key={`option-${index}-${option}`} value={option}>
            {option}
          </SelectItem>
        ))}
        <SelectItem value="__custom__" className="font-medium text-primary border-t">
          + Adicionar nova opção
        </SelectItem>
      </SelectContent>
    </Select>
  );
};