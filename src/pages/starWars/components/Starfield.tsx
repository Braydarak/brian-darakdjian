import { useEffect, useRef } from "react";

type Star = { x: number; y: number; z: number; pz: number };

const STAR_COUNT = 260;
const SPEED = 0.0018;
const LEVELS = 6;

// Campo de estrellas que avanza lento hacia la cámara, como en vuelo.
// Se pausa con la pestaña oculta y queda fijo si se pidió menos movimiento.
const Starfield = ({ warp = false }: { warp?: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const warpRef = useRef(warp);
  warpRef.current = warp;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    let width = 0;
    let height = 0;
    let frame = 0;
    let speed = SPEED;

    const newStar = (z = Math.random()): Star => ({
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
      z,
      pz: z,
    });
    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => newStar());
    const buckets: number[][] = Array.from({ length: LEVELS }, () => []);

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
    };

    const project = (v: number, z: number, half: number) => (v / z) * half * 0.5 + half;

    const draw = () => {
      const cx = width / 2;
      const cy = height / 2;
      ctx.fillStyle = "#02030a";
      ctx.fillRect(0, 0, width, height);

      // Acelera o frena suave hacia la velocidad objetivo
      const target = warpRef.current ? SPEED * 18 : SPEED;
      speed += (target - speed) * 0.05;

      // Agrupa las estrellas en pocos niveles de brillo y dibuja un solo trazo
      // por nivel (6 strokes por cuadro en vez de uno por estrella)
      for (const bucket of buckets) bucket.length = 0;

      for (const star of stars) {
        star.pz = star.z;
        star.z -= reduceMotion ? 0 : speed;
        if (star.z <= 0.02) Object.assign(star, newStar(1));

        const sx = project(star.x, star.z, cx * 2);
        const sy = project(star.y, star.z, cy * 2);
        if (sx < 0 || sx > width || sy < 0 || sy > height) {
          Object.assign(star, newStar(1));
          continue;
        }
        const px = project(star.x, star.pz, cx * 2);
        const py = project(star.y, star.pz, cy * 2);
        const level = Math.min(LEVELS - 1, Math.floor((1 - star.z) * 1.4 * LEVELS));
        buckets[level].push(px, py, sx + 0.1, sy + 0.1);
      }

      buckets.forEach((segments, level) => {
        if (!segments.length) return;
        const t = (level + 1) / LEVELS;
        ctx.strokeStyle = `rgba(220, 235, 255, ${t})`;
        ctx.lineWidth = Math.max(0.5, t * 2.2);
        ctx.beginPath();
        for (let i = 0; i < segments.length; i += 4) {
          ctx.moveTo(segments[i], segments[i + 1]);
          ctx.lineTo(segments[i + 2], segments[i + 3]);
        }
        ctx.stroke();
      });
    };

    const loop = () => {
      draw();
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(frame);
      if (reduceMotion) draw();
      else frame = requestAnimationFrame(loop);
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
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
};

export default Starfield;
