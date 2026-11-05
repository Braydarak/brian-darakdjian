import { useTranslation } from "react-i18next";
import BrianStarWars from "../../../assets/starWars-brian.png";
import RealPhoto from "../../../components/realPhoto";
import { useRealPhoto } from "../../../components/realPhoto/useRealPhoto";
import CV from "../../../assets/brian-darakdjian-cv.pdf";
import { works } from "../../../data/works";
import { scrollToSection } from "./sections";

const STACK = ["React", "TypeScript", "Tailwind"];

const SWHero = () => {
  const { t } = useTranslation();
  const devCount = works.filter((work) => work.status === "dev").length;
  const doneCount = works.length - devCount;
  const realPhoto = useRealPhoto();

  return (
    <section
      id="sw-home"
      className="relative flex min-h-screen-safe scroll-mt-16 items-center px-4 pb-12 pt-24 sm:px-6 sm:pb-24 sm:pt-28"
    >
      <div className="mx-auto grid grid-cols-1 w-full max-w-6xl items-center gap-8 sm:gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="scroll-exit order-2 text-center lg:order-1 lg:text-left">
          <p
            data-reveal
            className="inline-flex items-center gap-2 font-Raleway text-xs font-bold uppercase tracking-[0.35em] text-[#4fc3f7]"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#4fc3f7] shadow-[0_0_8px_#4fc3f7]" />
            {t("starWars.hero.kicker")}
          </p>

          <h1
            data-reveal
            className="mt-5 font-Raleway text-[clamp(2.25rem,12.5vw,3rem)] font-black uppercase leading-[0.95] tracking-[0.08em] text-[#ffe81f] [text-shadow:0_0_24px_rgba(255,232,31,0.25)] sm:text-6xl lg:text-7xl"
          >
            Brian
            <br />
            <span className="text-transparent [-webkit-text-stroke:2px_#ffe81f]">
              Darakdjian
            </span>
          </h1>

          <p
            data-reveal
            className="mt-5 font-Raleway text-lg font-semibold uppercase tracking-[0.3em] text-white/85 sm:text-xl"
          >
            {t("starWars.hero.role")}
          </p>

          <p
            data-reveal
            className="mx-auto mt-6 max-w-xl font-Raleway text-base leading-relaxed text-white/70 lg:mx-0 sm:text-lg"
          >
            {t("homeDescription")}
          </p>

          <dl
            data-reveal
            className="mx-auto mt-8 grid max-w-xl grid-cols-3 font-Raleway divide-x divide-white/10 border-y border-white/10 py-4 text-center lg:mx-0"
          >
            <div className="px-2">
              <dt className="text-[10px] uppercase tracking-[0.25em] text-white/45">
                {t("starWars.hero.stack")}
              </dt>
              <dd className="mt-1 text-xs font-bold text-white sm:text-sm">
                {STACK.join(" · ")}
              </dd>
            </div>
            <div className="px-2">
              <dt className="text-[10px] uppercase tracking-[0.25em] text-white/45">
                {t("starWars.hero.stats.done")}
              </dt>
              <dd className="mt-1 text-2xl font-black text-[#ffe81f]">{doneCount}</dd>
            </div>
            <div className="px-2">
              <dt className="text-[10px] uppercase tracking-[0.25em] text-white/45">
                {t("starWars.hero.stats.dev")}
              </dt>
              <dd className="mt-1 text-2xl font-black text-[#4fc3f7]">{devCount}</dd>
            </div>
          </dl>

          <div
            data-reveal
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:items-start lg:justify-start"
          >
            <button
              type="button"
              onClick={() => scrollToSection("work")}
              className="sw-btn sw-btn--primary w-full max-w-xs sm:w-auto"
            >
              {t("starWars.hero.ctaWork")}
              <span aria-hidden="true">→</span>
            </button>
            <a
              href={CV}
              target="_blank"
              rel="noopener noreferrer"
              className="sw-btn sw-btn--ghost w-full max-w-xs sm:w-auto"
            >
              {t("starWars.hero.ctaCv")}
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        {/* Foto como holograma azul; al pasar el mouse se "apaga" y se ve real */}
        <div data-reveal className="order-1 flex justify-center lg:order-2">
          <figure {...realPhoto} className="scroll-parallax group relative w-44 sm:w-72 lg:w-80">
            <div className="sw-hologram relative isolate aspect-square overflow-hidden rounded-full border border-[#4fc3f7]/60 shadow-[0_0_50px_rgba(79,195,247,0.35)] transition-shadow duration-500 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] group-data-[real=true]:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              <img
                src={BrianStarWars}
                alt="Brian Darakdjian"
                className="h-full w-full object-cover grayscale"
              />
              <div className="absolute inset-0 bg-[#4fc3f7] mix-blend-multiply" />
              <div className="sw-hologram-lines absolute inset-0" />
              <RealPhoto />
            </div>
            {/* Base del proyector */}
            <div className="mx-auto mt-4 h-3 w-32 rounded-[50%] bg-[#4fc3f7]/40 blur-sm transition-opacity duration-700 group-hover:opacity-0 group-data-[real=true]:opacity-0" />
            <figcaption className="mt-3 hidden text-center font-Raleway text-xs uppercase tracking-[0.2em] text-white/40 lg:block">
              {t("starWars.hero.photoHint")}
            </figcaption>
          </figure>
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollToSection("work")}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex font-Raleway text-xs font-bold uppercase tracking-[0.3em] text-white/50 transition-colors hover:text-[#ffe81f]"
      >
        {t("starWars.hero.scroll")}
        <span className="animate-bounce text-lg">↓</span>
      </button>
    </section>
  );
};

export default SWHero;
