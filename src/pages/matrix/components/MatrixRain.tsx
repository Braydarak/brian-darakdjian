import { useEffect, useRef } from "react";

const GLYPHS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン0123456789<>{}[]/=+*";
const FONT_SIZE = 16;
const FRAME_MS = 50;

const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

// Lluvia de código de fondo. Se dibuja en un canvas fijo detrás del contenido,
// se pausa con la pestaña oculta y queda quieta si el usuario pidió menos movimiento.
const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    let width = 0;
    let height = 0;
    let drops: number[] = [];
    let frame = 0;
    let lastTime = 0;

    const resize = () => {
      // Fondo decorativo: a 1x alcanza y dibuja 4 veces menos píxeles en pantallas retina
      const dpr = 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drops = Array.from(
        { length: Math.ceil(width / FONT_SIZE) },
        () => (Math.random() * -height) / FONT_SIZE
      );
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, width, height);
    };

    const step = () => {
      // El negro semitransparente deja la estela de cada columna
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${FONT_SIZE}px "IBM Plex Mono", monospace`;

      drops.forEach((drop, i) => {
        const y = drop * FONT_SIZE;
        ctx.fillStyle = Math.random() > 0.975 ? "#d1ffd9" : "#00ff41";
        ctx.fillText(randomGlyph(), i * FONT_SIZE, y);
        drops[i] = y > height && Math.random() > 0.975 ? 0 : drop + 1;
      });
    };

    const loop = (time: number) => {
      frame = requestAnimationFrame(loop);
      if (time - lastTime < FRAME_MS) return;
      lastTime = time;
      step();
    };

    const start = () => {
      cancelAnimationFrame(frame);
      if (reduceMotion) {
        // Un cuadro fijo con la lluvia ya "caída"
        for (let i = 0; i < 120; i++) step();
        return;
      }
      frame = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(frame);
      else start();
    };

    const onResize = () => {
      resize();
      start();
    };

    resize();
    start();
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none opacity-40"
    />
  );
};

export default MatrixRain;
