import { useMemo } from "react";
import cloud from "../../assets/cloud.svg";

// Fondos animados livianos (solo CSS) para cada portal del selector.

const GLYPHS = "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789";

export const MatrixPreview = () => {
  const columns = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        duration: 5 + Math.random() * 6,
        delay: -Math.random() * 10,
        glyphs: Array.from({ length: 30 }, () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]).join(""),
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden bg-black" aria-hidden="true">
      <div className="absolute inset-0 flex justify-between px-2">
        {columns.map((column) => (
          <span
            key={column.id}
            className="exp-rain font-IBM text-sm leading-none text-[#00ff41]"
            style={{ animationDuration: `${column.duration}s`, animationDelay: `${column.delay}s` }}
          >
            {column.glyphs}
          </span>
        ))}
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.85)_100%)]" />
    </div>
  );
};

export const StarWarsPreview = () => (
  <div className="absolute inset-0 overflow-hidden bg-[#02030a]" aria-hidden="true">
    <div className="exp-stars sw-intro-stars absolute inset-0" />
    <div className="exp-stars exp-stars--far sw-intro-stars absolute inset-0 opacity-40" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(79,195,247,0.22),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(255,232,31,0.12),transparent_60%)]" />
  </div>
);

export const SimpsonsPreview = () => (
  <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-sky-300 to-sky-100" aria-hidden="true">
    {[
      { top: "8%", width: "55%", duration: 26, delay: -4 },
      { top: "38%", width: "45%", duration: 34, delay: -20 },
      { top: "68%", width: "60%", duration: 30, delay: -12 },
    ].map((c) => (
      <img
        key={c.top}
        src={cloud}
        alt=""
        className="exp-cloud absolute left-0 opacity-80"
        style={{
          top: c.top,
          width: c.width,
          animationDuration: `${c.duration}s`,
          animationDelay: `${c.delay}s`,
        }}
      />
    ))}
  </div>
);
