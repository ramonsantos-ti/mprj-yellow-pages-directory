import React, { createContext, useState, ReactNode } from 'react';

type FontSize = 'base' | 'lg' | 'xl';
type Contrast = 'normal' | 'high';

interface AccessibilityContextType {
  contrast: Contrast;
  fontSize: FontSize;
  toggleContrast: () => void;
  increaseFont: () => void;
  decreaseFont: () => void;
}

export const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const [contrast, setContrast] = useState<Contrast>('normal');
  const [fontSize, setFontSize] = useState<FontSize>('base');

  const toggleContrast = () => setContrast(c => c === 'normal' ? 'high' : 'normal');
  const increaseFont = () => setFontSize(f => f === 'base' ? 'lg' : f === 'lg' ? 'xl' : 'xl');
  const decreaseFont = () => setFontSize(f => f === 'xl' ? 'lg' : f === 'lg' ? 'base' : 'base');

  return (
    <AccessibilityContext.Provider value={{ contrast, fontSize, toggleContrast, increaseFont, decreaseFont }}>
      {children}
    </AccessibilityContext.Provider>
  );
};
