import React, { useState } from "react";
import { Menu, X, ALargeSmall, Contrast } from "lucide-react"; // Importamos os novos ícones
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

export default function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [isHighContrast, setIsHighContrast] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const increaseFont = () => setFontSize((prev) => prev + 2);
  const decreaseFont = () => setFontSize((prev) => Math.max(12, prev - 2));
  const toggleContrast = () => setIsHighContrast(!isHighContrast);

  return (
    <div
      className={cn(
        "fixed top-4 right-4 z-50 flex flex-col items-end gap-2",
        isHighContrast && "bg-black text-yellow-300 p-2 rounded-lg"
      )}
      style={{ fontSize: `${fontSize}px` }}
    >
      {/* Botões de Acessibilidade: Aumentar/Reduzir Fonte e Contraste */}
      <div className="flex items-center gap-2">
        <Button
          size="icon"
          variant="outline"
          className="rounded-full w-12 h-12"
          onClick={toggleMenu}
        >
          <div className="flex gap-1">
            <ALargeSmall size={22} />
            <Contrast size={22} />
          </div>
        </Button>
      </div>

      {/* Menu de Acessibilidade */}
      {isOpen && (
        <div className="flex flex-col gap-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3">
          <Button
            onClick={increaseFont}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ALargeSmall size={18} /> Aumentar Fonte
          </Button>
          <Button
            onClick={decreaseFont}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ALargeSmall size={18} /> Reduzir Fonte
          </Button>
          <Button
            onClick={toggleContrast}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Contrast size={18} /> Alternar Contraste
          </Button>
        </div>
      )}
    </div>
  );
}
