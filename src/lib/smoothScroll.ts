import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";

// Scroll suave de toda la app. Usa el ticker de GSAP como único bucle, en vez
// de un requestAnimationFrame propio que además actualizaba ScrollTrigger
// en cada cuadro. Con "menos movimiento" no se activa y queda el scroll nativo.
//
// Desactivado: el scroll nativo lo mueve el compositor del navegador (otro
// hilo), así no se traba cuando JavaScript está ocupado (canvas, React) y las
// animaciones CSS ligadas al scroll quedan sincronizadas exactas. Lenis mueve
// la página desde el hilo principal y su inercia se sentía pesada.
// Poner en true para volver a probarlo.
const SMOOTH_SCROLL = false;

let lenis: Lenis | null = null;
let locks = 0;

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const tick = (time: number) => lenis?.raf(time * 1000);

export const startSmoothScroll = () => {
  if (!SMOOTH_SCROLL || lenis || reducedMotion()) return () => {};

  lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 1,
    smoothWheel: true,
  });
  // Los efectos de los hijos corren antes que el de App: si una intro ya
  // bloqueó el scroll antes de que exista Lenis, hay que respetarlo.
  if (locks > 0) lenis.stop();
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  };
};

// Altura del menú fijo, para que la sección no quede tapada
const HEADER_OFFSET = -72;

export const scrollToElement = (el: HTMLElement | null) => {
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, {
      offset: HEADER_OFFSET,
      duration: 1.2,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET;
    window.scrollTo({ top, behavior: reducedMotion() ? "auto" : "smooth" });
  }
};

export const scrollToTop = () => {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
  else window.scrollTo(0, 0);
};

// Bloquea el scroll (por ej. durante una intro). Admite bloqueos anidados.
export const lockScroll = () => {
  locks += 1;
  if (locks > 1) return;
  lenis?.stop();
  document.documentElement.style.overflow = "hidden";
};

export const unlockScroll = () => {
  locks = Math.max(0, locks - 1);
  if (locks > 0) return;
  document.documentElement.style.overflow = "";
  lenis?.start();
};
