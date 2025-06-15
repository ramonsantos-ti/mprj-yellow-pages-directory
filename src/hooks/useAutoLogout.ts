
import { useEffect, useRef } from "react";

type OnTimeoutFn = () => void;

const ACTIVITY_EVENTS = [
  "mousemove", "mousedown", "keydown", "touchstart", "scroll"
];

/**
 * useAutoLogout
 * @param timeoutMs tempo limite em milissegundos
 * @param onTimeout callback disparada ao atingir o timeout de inatividade
 */
export function useAutoLogout(timeoutMs: number, onTimeout: OnTimeoutFn) {
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const resetTimer = () => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(onTimeout, timeoutMs);
    };
    // Inicia o timer ao montar
    resetTimer();

    ACTIVITY_EVENTS.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    return () => {
      if (timer.current) clearTimeout(timer.current);
      ACTIVITY_EVENTS.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [timeoutMs, onTimeout]);
}
