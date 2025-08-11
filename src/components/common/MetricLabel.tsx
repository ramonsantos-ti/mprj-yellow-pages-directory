import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface MetricLabelProps {
  label: string;
  description: string;
  className?: string;
}

const MetricLabel: React.FC<MetricLabelProps> = ({ label, description, className }) => {
  return (
    <span className={`inline-flex items-center gap-1 ${className ?? ''}`}>
      <span>{label}</span>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button type="button" aria-label={`Ajuda: ${label}`} className="text-muted-foreground hover:text-foreground align-middle">
              <HelpCircle className="w-3.5 h-3.5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p className="max-w-xs leading-snug">{description}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </span>
  );
};

export default MetricLabel;
