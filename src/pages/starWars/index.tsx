import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTransitionNavigate } from "../../components/pageTransition/context";
import { useBodyBackground, useReveal } from "../../hooks/useReveal";
import { lockScroll, unlockScroll } from "../../lib/smoothScroll";
import Starfield from "./components/Starfield";
import SWNav from "./components/SWNav";
import SWHero from "./components/SWHero";
import SWWork from "./components/SWWork";
import SWContact from "./components/SWContact";

// Cuánto dura el salto al hiperespacio antes de que se apague la tele
const WARP_MS = 700;
// Intro: el título se aleja entre las estrellas y después la cámara "baja"
// (el contenido sube desde abajo) hasta mostrar la web.
const TITLE_MS = 3400;
const PAN_MS = 2200;

type IntroStage = "title" | "pan" | "done";

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const StarWars = () => {
  const { t } = useTranslation();
  const navigate = useTransitionNavigate();
  const rootRef = useRef<HTMLElement>(null);
  const [warping, setWarping] = useState(false);
  const [stage, setStage] = useState<IntroStage>(() =>
    prefersReducedMotion() ? "done" : "title"
  );
  useReveal(rootRef);
  useBodyBackground("#02030a");

  // Secuencia de la intro; click, toque o tecla la saltan
  useEffect(() => {
    if (stage === "done") return;

    const timer =
      stage === "title"
        ? window.setTimeout(() => setStage("pan"), TITLE_MS)
        : window.setTimeout(() => setStage("done"), PAN_MS);

    const skip = () => setStage("done");
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);

    // Sin scroll mientras corre la intro
    lockScroll();

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
      unlockScroll();
    };
  }, [stage]);

  // "Saltar al hiperespacio": las estrellas se estiran y volvemos al selector
  useEffect(() => {
    if (!warping) return;
    const timer = window.setTimeout(
      () => navigate("/"),
      prefersReducedMotion() ? 0 : WARP_MS
    );
    return () => window.clearTimeout(timer);
  }, [warping, navigate]);

  const introPlaying = stage !== "done";

  return (
    <main
      ref={rootRef}
      className="sw-page relative min-h-screen-safe w-full overflow-x-hidden bg-[#02030a] text-white"
    >
      <Starfield warp={warping} />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,rgba(79,195,247,0.12),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(255,232,31,0.06),transparent_60%)]" />

      {stage === "title" && (
        <div
          className="sw-title pointer-events-none fixed inset-0 z-30 flex items-center justify-center px-4 text-center"
          aria-hidden="true"
        >
          <span className="font-Raleway text-[8vw] font-black uppercase leading-[0.95] tracking-[0.12em] text-transparent [-webkit-text-stroke:2px_#ffe81f] sm:text-8xl">
            Brian
            <br />
            Darakdjian
          </span>
        </div>
      )}

      {introPlaying && (
        <p className="pointer-events-none fixed inset-x-0 bottom-6 z-30 text-center font-Raleway text-xs uppercase tracking-[0.25em] text-white/40">
          {t("starWars.intro.skip")}
        </p>
      )}

      <div
        className={`transition-opacity duration-700 ${
          introPlaying ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <SWNav onExit={() => setWarping(true)} />
      </div>

      <div
        className={`relative z-10 transition-opacity duration-700 ${
          warping ? "opacity-0" : "opacity-100"
        } ${introPlaying ? "h-screen overflow-hidden" : ""} ${stage === "title" ? "sw-camera-up" : ""} ${
          stage === "pan" ? "sw-camera-pan" : ""
        }`}
        style={stage === "pan" ? { animationDuration: `${PAN_MS}ms` } : undefined}
      >
        <SWHero />
        <SWWork />
        <SWContact />

        <footer className="border-t border-white/10 px-4 py-10 text-center font-Raleway sm:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#ffe81f]/80">
            {t("starWars.footer.force")}
          </p>
          <p className="mt-3 text-xs text-white/40">
            © {new Date().getFullYear()} Brian Darakdjian. {t("starWars.footer.rights")}
          </p>
        </footer>
      </div>
    </main>
  );
};

export default StarWars;
