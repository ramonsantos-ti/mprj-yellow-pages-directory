import { createContext, useContext, useState } from "react";

type IndicadoresType = {
  visitas: number;
  cadastros: number;
  especialistas: number;
};

type IndicadoresContextType = {
  indicadores: IndicadoresType;
  setIndicadores: React.Dispatch<React.SetStateAction<IndicadoresType>>;
};

const IndicadoresContext = createContext<IndicadoresContextType | undefined>(undefined);

export function IndicadoresProvider({ children }: { children: React.ReactNode }) {
  const [indicadores, setIndicadores] = useState<IndicadoresType>({
    visitas: 0,
    cadastros: 0,
    especialistas: 0,
  });

  return (
    <IndicadoresContext.Provider value={{ indicadores, setIndicadores }}>
      {children}
    </IndicadoresContext.Provider>
  );
}

export function useIndicadores() {
  const context = useContext(IndicadoresContext);
  if (!context) throw new Error("useIndicadores deve ser usado dentro de IndicadoresProvider");
  return context;
}
