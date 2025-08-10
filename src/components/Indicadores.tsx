import { useIndicadores } from "../context/IndicadoresContext";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export default function Indicadores() {
  const { indicadores } = useIndicadores();

  const campos = [
    { label: "Visitas", valor: indicadores.visitas, descricao: "Número de acessos únicos ao sistema" },
    { label: "Cadastros", valor: indicadores.cadastros, descricao: "Total de usuários cadastrados" },
    { label: "Especialistas", valor: indicadores.especialistas, descricao: "Número de especialistas registrados" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {campos.map((campo) => (
        <div
          key={campo.label}
          className="bg-white p-4 rounded shadow flex flex-col items-center border border-gray-200"
        >
          <div className="flex items-center gap-1 text-lg font-bold">
            {campo.label}
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="cursor-pointer text-blue-500 font-bold">?</span>
              </TooltipTrigger>
              <TooltipContent>{campo.descricao}</TooltipContent>
            </Tooltip>
          </div>
          <div className="text-2xl">{campo.valor}</div>
        </div>
      ))}
    </div>
  );
}
