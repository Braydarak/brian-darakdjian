import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TransitionContext } from "./context";
import { scrollToTop } from "../../lib/smoothScroll";

// Transición entre experiencias, con un estilo por experiencia:
// - Simpsons: tele vieja que se apaga en una línea y se vuelve a encender.
// - Matrix: columnas de código que caen y tapan la pantalla, y siguen cayendo.
// - Star Wars: barrido lateral de un lado a otro, como en las películas.
// Al entrar se usa la de la experiencia destino; al volver, la de origen.
const CLOSE_MS = 600;
const OPEN_MS = 600;

type Stage = "idle" | "closing" | "opening";
type Theme = "tv" | "matrix" | "starWars";

const themeFor = (path: string): Theme | null => {
  if (path.startsWith("/experience/matrix")) return "matrix";
  if (path.startsWith("/experience/star-wars")) return "starWars";
  if (path.startsWith("/experience/simpsons")) return "tv";
  return null;
};

const GLYPHS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ0123456789";
const MATRIX_COLUMNS = 26;

const randomGlyphs = (length: number) =>
  Array.from({ length }, () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]).join("");

const TvOverlay = () => (
  <>
    <div className="page-transition__bar page-transition__bar--top" />
    <div className="page-transition__bar page-transition__bar--bottom" />
    <div className="page-transition__line" />
  </>
);

const MatrixOverlay = () => {
  // Cada columna cae con un retraso distinto y un texto distinto
  const columns = useMemo(
    () =>
      Array.from({ length: MATRIX_COLUMNS }, (_, i) => ({
        id: i,
        delay: Math.round(Math.random() * 220),
        glyphs: randomGlyphs(40),
      })),
    []
  );

  return (
    <div className="absolute inset-0 flex overflow-hidden">
      {columns.map((column) => (
        <div key={column.id} className="relative h-full flex-1 overflow-hidden">
          <div
            className="pt-matrix-column absolute inset-0"
            style={{ animationDelay: `${column.delay}ms` }}
          >
            <span className="pt-matrix-glyphs">{column.glyphs}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

const StarWarsOverlay = () => (
  <div className="pt-sw-wipe absolute inset-0">
    <div className="sw-intro-stars absolute inset-0" />
  </div>
);

export const PageTransitionProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [stage, setStage] = useState<Stage>("idle");
  const [theme, setTheme] = useState<Theme>("tv");
  const busy = useRef(false);
  const timers = useRef<number[]>([]);
  const pathRef = useRef(location.pathname);
  pathRef.current = location.pathname;

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  const transitionTo = useCallback(
    (to: string) => {
      if (busy.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        navigate(to);
        return;
      }
      busy.current = true;
      setTheme(themeFor(to) ?? themeFor(pathRef.current) ?? "tv");
      setStage("closing");
      timers.current.push(
        window.setTimeout(() => {
          navigate(to);
          scrollToTop();
          setStage("opening");
        }, CLOSE_MS),
        window.setTimeout(() => {
          setStage("idle");
          busy.current = false;
        }, CLOSE_MS + OPEN_MS)
      );
    },
    [navigate]
  );

  return (
    <TransitionContext.Provider value={transitionTo}>
      {children}
      {stage !== "idle" && (
        <div
          className={`page-transition page-transition--${stage} page-transition--${theme} fixed inset-0 z-[100]`}
          style={{ ["--pt-ms" as string]: `${stage === "closing" ? CLOSE_MS : OPEN_MS}ms` }}
          aria-hidden="true"
        >
          {theme === "tv" && <TvOverlay />}
          {theme === "matrix" && <MatrixOverlay />}
          {theme === "starWars" && <StarWarsOverlay />}
        </div>
      )}
    </TransitionContext.Provider>
  );
};
