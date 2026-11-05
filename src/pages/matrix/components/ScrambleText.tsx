import { useCallback, useEffect, useRef } from "react";

const SCRAMBLE_CHARS = "アカサタナハマヤラワ01<>/{}#$%&*+=";
// Las letras al azar no necesitan 60 cuadros por segundo: a ~30 se ve igual
// y se repinta la mitad de veces un título grande con brillo
const FRAME_MS = 33;

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type ScrambleTextProps = {
  text: string;
  className?: string;
  // Milisegundos que tarda en descifrarse el texto completo
  duration?: number;
  delay?: number;
  // Vuelve a descifrarse al pasar el mouse
  replayOnHover?: boolean;
};

// Texto que aparece "descifrándose": cada letra muestra caracteres al azar
// hasta que se fija en la correcta, de izquierda a derecha. Escribe directo
// en el DOM (sin estado de React) para no re-renderizar en cada cuadro.
const ScrambleText = ({
  text,
  className,
  duration = 900,
  delay = 0,
  replayOnHover = false,
}: ScrambleTextProps) => {
  const outputRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef(0);
  const timeoutRef = useRef<number>();

  const play = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
    const output = outputRef.current;
    if (!output) return;
    if (prefersReducedMotion()) {
      output.textContent = text;
      return;
    }

    const start = performance.now();
    let last = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      if (now - last >= FRAME_MS || progress === 1) {
        last = now;
        const revealed = Math.floor(progress * text.length);
        let next = "";
        for (let i = 0; i < text.length; i++) {
          const char = text[i];
          next +=
            i < revealed || char === " "
              ? char
              : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
        output.textContent = next;
      }
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
  }, [text, duration]);

  useEffect(() => {
    timeoutRef.current = window.setTimeout(play, delay);
    return () => {
      window.clearTimeout(timeoutRef.current);
      cancelAnimationFrame(frameRef.current);
    };
  }, [play, delay]);

  return (
    <span className={className} onMouseEnter={replayOnHover ? play : undefined}>
      {/* Los lectores de pantalla leen el texto real, no la animación */}
      <span className="sr-only">{text}</span>
      <span ref={outputRef} aria-hidden="true">
        {text}
      </span>
    </span>
  );
};

export default ScrambleText;
