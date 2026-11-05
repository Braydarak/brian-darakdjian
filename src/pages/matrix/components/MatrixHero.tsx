import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import BrianMatrix from "../../../assets/matrix-brian.png";
import RealPhoto from "../../../components/realPhoto";
import { useRealPhoto } from "../../../components/realPhoto/useRealPhoto";
import CV from "../../../assets/brian-darakdjian-cv.pdf";
import { works } from "../../../data/works";
import ScrambleText from "./ScrambleText";
import { scrollToSection } from "./sections";

const STACK = ["React", "TypeScript", "Tailwind"];

// Escribe el texto letra por letra, como en una terminal
const useTypewriter = (text: string, startDelay = 0, speed = 55) => {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(text);
      return;
    }
    setTyped("");
    let i = 0;
    let interval: number | undefined;
    const timeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        i += 1;
        setTyped(text.slice(0, i));
        if (i >= text.length) window.clearInterval(interval);
      }, speed);
    }, startDelay);
    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [text, startDelay, speed]);

  return typed;
};

// Solo esta línea se re-renderiza con cada letra, no todo el hero
const TypedRole = ({ text }: { text: string }) => {
  const typed = useTypewriter(text, 900);
  return (
    <span aria-hidden="true">
      &gt; {typed}
      <span className="ml-1 inline-block h-5 w-2.5 translate-y-0.5 animate-pulse bg-[#00ff41]" />
    </span>
  );
};

const MatrixHero = () => {
  const { t } = useTranslation();
  const role = t("matrix.hero.role");
  const devCount = works.filter((work) => work.status === "dev").length;
  const doneCount = works.length - devCount;
  const realPhoto = useRealPhoto();

  return (
    <section
      id="matrix-home"
      className="relative flex min-h-screen-safe scroll-mt-16 items-center px-4 pb-12 pt-24 sm:px-6 sm:pb-24 sm:pt-28"
    >
      <div className="mx-auto grid grid-cols-1 w-full max-w-6xl items-center gap-8 sm:gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="scroll-exit order-2 text-center md:order-1 md:text-left">
          <p data-reveal className="text-sm text-[#00ff41]/70 sm:text-base">
            <span className="text-[#00ff41]">$</span> {t("matrix.hero.prompt")}
          </p>

          <h1
            data-reveal
            className="mt-4 text-4xl font-bold uppercase leading-tight tracking-wider text-[#00ff41] [text-shadow:0_0_18px_rgba(0,255,65,0.55)] sm:text-5xl lg:text-7xl"
          >
            <ScrambleText text="Brian Darakdjian" duration={1400} delay={200} replayOnHover />
          </h1>

          <p
            data-reveal
            className="mt-4 h-8 text-xl text-[#d1ffd9] sm:text-2xl"
            aria-label={role}
          >
            <TypedRole text={role} />
          </p>

          <p
            data-reveal
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#00ff41]/80 md:mx-0 sm:text-lg"
          >
            {t("homeDescription")}
          </p>

          <div
            data-reveal
            className="mx-auto mt-6 grid max-w-xl gap-1 text-left text-sm text-[#00ff41]/70 md:mx-0"
          >
            <p>
              <span className="text-[#00ff41]/50">{t("matrix.hero.stack")}:</span>{" "}
              <span className="text-[#d1ffd9]">{STACK.join(" · ")}</span>
            </p>
            <p className="flex flex-wrap gap-x-4">
              <span>
                <span className="text-[#00ff41]">●</span> {doneCount} {t("matrix.hero.stats.done")}
              </span>
              <span>
                <span className="text-yellow-300">●</span> {devCount} {t("matrix.hero.stats.dev")}
              </span>
            </p>
          </div>

          <div data-reveal className="mt-10">
            <p className="text-xs uppercase tracking-[0.3em] text-[#00ff41]/50">
              {t("matrix.hero.choose")}
            </p>
            <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center md:items-start md:justify-start">
              <button
                type="button"
                onClick={() => scrollToSection("work")}
                className="group flex w-full max-w-xs items-center justify-center gap-3 whitespace-nowrap rounded-full border border-red-500 bg-red-600/90 px-6 py-3 font-bold text-white shadow-[0_0_20px_rgba(239,68,68,0.45)] transition-[transform,opacity,border-color,background-color,color] duration-300 hover:-translate-y-0.5 hover:bg-red-500 hover:shadow-[0_0_32px_rgba(239,68,68,0.8)] focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300 sm:w-auto"
              >
                <span className="h-3 w-6 rounded-full bg-gradient-to-r from-red-300 to-red-700 shadow-inner" />
                {t("matrix.hero.redPill")}
              </button>
              <a
                href={CV}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full max-w-xs items-center justify-center gap-3 whitespace-nowrap rounded-full border border-blue-500 bg-blue-600/90 px-6 py-3 font-bold text-white shadow-[0_0_20px_rgba(59,130,246,0.45)] transition-[transform,opacity,border-color,background-color,color] duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_0_32px_rgba(59,130,246,0.8)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 sm:w-auto"
              >
                <span className="h-3 w-6 rounded-full bg-gradient-to-r from-blue-300 to-blue-700 shadow-inner" />
                {t("matrix.hero.bluePill")}
              </a>
            </div>
          </div>
        </div>

        {/* Foto: en verde "dentro de la Matrix"; al pasar el mouse se ve real */}
        <div data-reveal className="order-1 flex justify-center md:order-2">
          <figure {...realPhoto} className="scroll-parallax group relative w-44 sm:w-72 lg:w-80">
            <div className="relative isolate aspect-square overflow-hidden rounded-full border-2 border-[#00ff41]/70 shadow-[0_0_40px_rgba(0,255,65,0.35)] transition-shadow duration-500 group-hover:shadow-[0_0_60px_rgba(0,255,65,0.6)] group-data-[real=true]:shadow-[0_0_60px_rgba(0,255,65,0.6)]">
              <img
                src={BrianMatrix}
                alt="Brian Darakdjian"
                className="h-full w-full object-cover"
              />
              <div className="matrix-scanlines absolute inset-0 opacity-60" />
              <RealPhoto />
            </div>
            <figcaption className="mt-4 hidden text-center text-xs text-[#00ff41]/50 md:block">
              {t("matrix.hero.photoHint")}
            </figcaption>
          </figure>
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollToSection("work")}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex text-xs uppercase tracking-[0.25em] text-[#00ff41]/60 transition-colors hover:text-[#00ff41]"
      >
        {t("matrix.hero.scroll")}
        <span className="animate-bounce text-lg">↓</span>
      </button>
    </section>
  );
};

export default MatrixHero;
