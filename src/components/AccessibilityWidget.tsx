import React, { useState } from 'react';
import { Plus, Minus, RotateCcw, Sun, Moon, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useAccessibility } from '@/hooks/useAccessibility';

// SVG customizado para símbolo universal de acessibilidade
const AccessibilityIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 512 512"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm0 80a40 40 0 1 1 0 80 40 40 0 1 1 0-80zm0 352c-97 0-176-79-176-176S159 128 256 128s176 79 176 176-79 176-176 176zm120-224h-64v192h-48V304h-16v144h-48V256h-64v-32h96V160h48v64h96v32z" />
  </svg>
);

export const AccessibilityWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, fontSize, setTheme, increaseFontSize, decreaseFontSize, resetFontSize } = useAccessibility();

  const getFontSizeLabel = () => {
    switch (fontSize) {
      case 'small': return 'A-';
      case 'medium': return 'A';
      case 'large': return 'A+';
    }
  };

  return (
    <TooltipProvider>
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50">
        {/* Main Toggle Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg border-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Abrir configurações de acessibilidade"
            >
              <AccessibilityIcon className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Configurações de Acessibilidade</p>
          </TooltipContent>
        </Tooltip>

        {/* Accessibility Panel */}
        {isOpen && (
          <Card className="absolute bottom-16 left-0 w-64 shadow-xl animate-in slide-in-from-left-2">
            <CardContent className="p-4 space-y-4">
              {/* Font Size Controls */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Tamanho da Fonte</h3>
                <div className="flex items-center justify-between">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={decreaseFontSize}
                        disabled={fontSize === 'small'}
                        aria-label="Diminuir fonte"
                      >
                        <Minus className="h-4 w-4" />
                        A-
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Diminuir fonte</p>
                    </TooltipContent>
                  </Tooltip>

                  <span className="px-3 py-1 bg-muted rounded text-sm font-medium">
                    {getFontSizeLabel()}
                  </span>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={increaseFontSize}
                        disabled={fontSize === 'large'}
                        aria-label="Aumentar fonte"
                      >
                        <Plus className="h-4 w-4" />
                        A+
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Aumentar fonte</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetFontSize}
                      className="w-full"
                      aria-label="Resetar fonte para tamanho padrão"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Resetar Fonte
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Voltar ao tamanho padrão</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              {/* Theme Controls */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Tema</h3>
                <div className="grid grid-cols-3 gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={theme === 'original' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setTheme('original')}
                        className="flex flex-col gap-1 h-12"
                        aria-label="Tema original"
                      >
                        <Palette className="h-4 w-4" />
                        <span className="text-xs">Original</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Cores originais do sistema</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={theme === 'dark' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setTheme('dark')}
                        className="flex flex-col gap-1 h-12"
                        aria-label="Tema escuro"
                      >
                        <Moon className="h-4 w-4" />
                        <span className="text-xs">Escuro</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Fundo preto, texto branco</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={theme === 'light' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setTheme('light')}
                        className="flex flex-col gap-1 h-12"
                        aria-label="Tema claro"
                      >
                        <Sun className="h-4 w-4" />
                        <span className="text-xs">Claro</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Fundo branco, texto preto</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </TooltipProvider>
  );
};
