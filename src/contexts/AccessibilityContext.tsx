import React, { createContext, useState, ReactNode, useEffect } from 'react';

type FontSize = 'small' | 'medium' | 'large';
type Theme = 'original' | 'dark' | 'light';

interface AccessibilityContextType {
  theme: Theme;
  fontSize: FontSize;
  setTheme: (theme: Theme) => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
}

export const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('accessibility-theme');
    return (saved as Theme) || 'original';
  });
  
  const [fontSize, setFontSizeState] = useState<FontSize>(() => {
    const saved = localStorage.getItem('accessibility-font-size');
    return (saved as FontSize) || 'medium';
  });

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('accessibility-theme', newTheme);
  };

  const increaseFontSize = () => {
    const newSize = fontSize === 'small' ? 'medium' : fontSize === 'medium' ? 'large' : 'large';
    setFontSizeState(newSize);
    localStorage.setItem('accessibility-font-size', newSize);
  };

  const decreaseFontSize = () => {
    const newSize = fontSize === 'large' ? 'medium' : fontSize === 'medium' ? 'small' : 'small';
    setFontSizeState(newSize);
    localStorage.setItem('accessibility-font-size', newSize);
  };

  const resetFontSize = () => {
    setFontSizeState('medium');
    localStorage.setItem('accessibility-font-size', 'medium');
  };

  // Apply theme and font size to document
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    
    // Remove existing theme classes
    html.classList.remove('accessibility-dark', 'accessibility-light');
    body.classList.remove('accessibility-dark', 'accessibility-light');
    
    // Apply new theme to both html and body for better coverage
    if (theme === 'dark') {
      html.classList.add('accessibility-dark');
      body.classList.add('accessibility-dark');
    } else if (theme === 'light') {
      html.classList.add('accessibility-light');
      body.classList.add('accessibility-light');
    }
    
    // Apply font size
    html.setAttribute('data-font-size', fontSize);
    
    // Force repaint
    html.style.display = 'none';
    html.offsetHeight; // trigger reflow
    html.style.display = '';
  }, [theme, fontSize]);

  return (
    <AccessibilityContext.Provider value={{ 
      theme, 
      fontSize, 
      setTheme, 
      increaseFontSize, 
      decreaseFontSize, 
      resetFontSize 
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};
