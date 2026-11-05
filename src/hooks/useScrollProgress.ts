import { RefObject, useEffect } from "react";

// Barra de progreso de lectura. Escribe el transform directo en el elemento
// (una vez por cuadro como máximo) en vez de guardar el valor en el estado,
// así el menú no se vuelve a renderizar en cada evento de scroll.
export const useScrollProgress = (bar: RefObject<HTMLElement>) => {
  useEffect(() => {
    let frame = 0;
    // Medir scrollHeight fuerza un layout: se mide solo cuando cambia el
    // tamaño del contenido o de la ventana, no en cada cuadro de scroll.
    let max = 0;
    const measure = () => {
      max = document.documentElement.scrollHeight - window.innerHeight;
      schedule();
    };
    const update = () => {
      frame = 0;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${progress})`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(document.body);
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
    };
  }, [bar]);
};
