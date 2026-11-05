import { useCallback, useEffect, useRef, useState } from "react";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Carrusel horizontal con scroll-snap (la lista de proyectos en el celular).
// Sigue qué tarjeta quedó centrada para los puntitos y permite saltar a una.
// resetKey: al cambiar (por ej. la pestaña) vuelve a la primera tarjeta.
export const useCarousel = <T extends HTMLElement>(resetKey: unknown) => {
  const ref = useRef<T>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    ref.current?.scrollTo({ left: 0 });
    setActive(0);
  }, [resetKey]);

  useEffect(() => {
    const list = ref.current;
    if (!list) return;
    let frame = 0;
    // Un cálculo por cuadro como máximo, aunque el scroll dispare más eventos
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const center = list.scrollLeft + list.clientWidth / 2;
        let best = 0;
        let bestDistance = Infinity;
        Array.from(list.children).forEach((child, i) => {
          const item = child as HTMLElement;
          const distance = Math.abs(item.offsetLeft + item.offsetWidth / 2 - center);
          if (distance < bestDistance) {
            bestDistance = distance;
            best = i;
          }
        });
        setActive(best);
      });
    };
    list.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      list.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const goTo = useCallback((index: number) => {
    const list = ref.current;
    const item = list?.children[index] as HTMLElement | undefined;
    if (!list || !item) return;
    list.scrollTo({
      left: item.offsetLeft - (list.clientWidth - item.offsetWidth) / 2,
      behavior: reducedMotion() ? "auto" : "smooth",
    });
  }, []);

  return { ref, active, goTo };
};
