import { useTranslation } from "react-i18next";
import CV from "../../../assets/brian-darakdjian-cv.pdf";
import { works } from "../../../data/works";
import RetroTV from "./RetroTV";
import { scrollToSection } from "./sections";

const STACK = ["React", "TypeScript", "Tailwind"];

const SimpsonsHero = ({ ready }: { ready: boolean }) => {
  const { t } = useTranslation();
  const devCount = works.filter((work) => work.status === "dev").length;
  const doneCount = works.length - devCount;

  return (
    <section
      id="simpsons-home"
      className="relative flex min-h-screen-safe scroll-mt-20 items-center px-4 pb-12 pt-24 sm:px-6 sm:pb-24 sm:pt-28"
    >
      <div className="mx-auto grid grid-cols-1 w-full max-w-7xl items-center gap-8 sm:gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="scroll-exit order-2 text-center lg:order-1 lg:text-left">
          <p
            data-reveal
            className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-white px-4 py-1 font-Raleway text-xs font-black uppercase tracking-[0.2em] text-black shadow-[3px_3px_0_#000]"
          >
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#ff3b3b]" />
            {t("simpsons.hero.kicker")}
          </p>

          <h1
            data-reveal
            className="mt-6 font-RockSalt text-4xl leading-[1.35] text-[#ffd90f] [-webkit-text-stroke:1.5px_#000] [text-shadow:4px_4px_0_#000] sm:text-6xl lg:text-7xl"
          >
            Brian
            <br />
            Darakdjian
          </h1>

          <p
            data-reveal
            className="mt-4 font-RockSalt text-xl text-black sm:text-2xl"
          >
            {t("simpsons.hero.role")}
          </p>

          <p
            data-reveal
            className="mx-auto mt-6 max-w-xl font-Raleway text-base font-medium leading-relaxed text-black/80 lg:mx-0 sm:text-lg"
          >
            {t("homeDescription")}
          </p>

          <div
            data-reveal
            className="mx-auto mt-8 flex max-w-xl flex-wrap justify-center gap-3 font-Raleway lg:mx-0 lg:justify-start"
          >
            <div className="rounded-2xl border-[3px] border-black bg-white px-4 py-2 text-left shadow-[4px_4px_0_#000]">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/50">
                {t("simpsons.hero.stack")}
              </p>
              <p className="text-sm font-bold text-black">{STACK.join(" · ")}</p>
            </div>
            <div className="rounded-2xl border-[3px] border-black bg-[#ffd90f] px-4 py-2 text-left shadow-[4px_4px_0_#000]">
              <p className="text-2xl font-black leading-none text-black">{doneCount}</p>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/70">
                {t("simpsons.hero.stats.done")}
              </p>
            </div>
            <div className="rounded-2xl border-[3px] border-black bg-[#ff7eb6] px-4 py-2 text-left shadow-[4px_4px_0_#000]">
              <p className="text-2xl font-black leading-none text-black">{devCount}</p>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/70">
                {t("simpsons.hero.stats.dev")}
              </p>
            </div>
          </div>

          <div
            data-reveal
            className="mt-10 flex flex-col items-center gap-4 font-Raleway sm:flex-row sm:justify-center lg:justify-start"
          >
            <button
              type="button"
              onClick={() => scrollToSection("work")}
              className="simpsons-btn w-full max-w-xs rounded-full border-[3px] border-black bg-[#ffd90f] px-8 py-3 text-base font-black text-black sm:w-auto"
            >
              {t("simpsons.hero.ctaWork")}
            </button>
            <a
              href={CV}
              target="_blank"
              rel="noopener noreferrer"
              className="simpsons-btn w-full max-w-xs rounded-full border-[3px] border-black bg-white px-8 py-3 text-center text-base font-black text-black sm:w-auto"
            >
              {t("simpsons.hero.ctaCv")}
            </a>
          </div>
        </div>

        <div data-reveal className="order-1 flex justify-center lg:order-2">
          <div className="scroll-parallax">
            <RetroTV on={ready} />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollToSection("work")}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 font-Raleway text-sm font-black text-black/60 transition-colors hover:text-black sm:flex"
      >
        {t("simpsons.hero.scroll")}
        <span className="animate-bounce text-xl">↓</span>
      </button>
    </section>
  );
};

export default SimpsonsHero;
