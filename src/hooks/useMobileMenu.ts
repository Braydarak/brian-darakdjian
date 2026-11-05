import { useCallback, useEffect, useRef, useState } from "react";
import { lockScroll, unlockScroll } from "../lib/smoothScroll";

export type MenuState = "closed" | "open" | "closing";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Menú desplegable del celular con animación de entrada y de salida.
// - "closing" mantiene el panel montado mientras corre la animación de cierre.
// - Bloquea el scroll solo mientras está abierto: al cerrar se libera enseguida,
//   así el salto a una sección empieza mientras el panel se va.
// - Esc cierra, el foco va al primer link al abrir y vuelve al botón al cerrar.
// - Si la ventana pasa a desktop (minWidth), se cierra sin animación.
export const useMobileMenu = (closeMs: number, minWidth: number) => {
  const [state, setState] = useState<MenuState>("closed");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number>();

  const open = useCallback(() => {
    window.clearTimeout(timer.current);
    setState("open");
  }, []);

  const close = useCallback(
    (returnFocus = true) => {
      setState((current) => (current === "open" ? "closing" : current));
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(
        () => setState("closed"),
        reducedMotion() ? 0 : closeMs
      );
      if (returnFocus) toggleRef.current?.focus({ preventScroll: true });
    },
    [closeMs]
  );

  const toggle = useCallback(() => {
    if (state === "open") close();
    else open();
  }, [state, open, close]);

  useEffect(() => {
    if (state !== "open") return;
    lockScroll();
    panelRef.current
      ?.querySelector<HTMLElement>("button, a[href]")
      ?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const desktop = window.matchMedia(`(min-width: ${minWidth}px)`);
    const onDesktop = () => {
      if (desktop.matches) setState("closed");
    };
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);
    return () => {
      unlockScroll();
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [state, close, minWidth]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return {
    state,
    isOpen: state === "open",
    mounted: state !== "closed",
    toggle,
    close,
    toggleRef,
    panelRef,
  };
};
