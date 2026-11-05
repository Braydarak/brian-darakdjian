import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import matrixLogo from "../../assets/matrix.png";
import starWarsLogo from "../../assets/star-wars.svg";
import simpsonsLogo from "../../assets/The-Simpsons.png";
import matrixBrian from "../../assets/matrix-brian.png";
import starWarsBrian from "../../assets/starWars-brian.png";
import simpsonsBrian from "../../assets/brian.avif";
import { useTransitionNavigate } from "../../components/pageTransition/context";
import { useBodyBackground } from "../../hooks/useReveal";
import { MatrixPreview, SimpsonsPreview, StarWarsPreview } from "./Previews";

type Experience = {
  id: "matrix" | "starWars" | "simpsons";
  to: string;
  logo: string;
  // Ajuste opcional del tamaño del logo
  logoClass?: string;
  portrait: string;
  Preview: () => JSX.Element;
  // Estilos propios de cada universo
  panel: string;
  text: string;
  portraitFrame: string;
  portraitImg: string;
  cta: string;
};

const EXPERIENCES: Experience[] = [
  {
    id: "matrix",
    to: "/experience/matrix",
    logo: matrixLogo,
    portrait: matrixBrian,
    Preview: MatrixPreview,
    panel: "border-[#00ff41]/25 hover:border-[#00ff41]/70 data-[active=true]:border-[#00ff41]/70 focus-visible:ring-[#00ff41]",
    text: "text-[#b9ffc9] font-IBM",
    portraitFrame: "rounded-full border-2 border-[#00ff41]/70 shadow-[0_0_30px_rgba(0,255,65,0.35)]",
    portraitImg: "",
    cta: "border border-[#00ff41] text-[#00ff41] font-IBM group-hover:bg-[#00ff41] group-hover:text-black group-data-[active=true]:bg-[#00ff41] group-data-[active=true]:text-black",
  },
  {
    id: "starWars",
    to: "/experience/star-wars",
    logo: starWarsLogo,
    portrait: starWarsBrian,
    Preview: StarWarsPreview,
    panel: "border-white/15 hover:border-[#ffe81f]/60 data-[active=true]:border-[#ffe81f]/60 focus-visible:ring-[#ffe81f]",
    text: "text-white/85 font-Raleway",
    portraitFrame: "rounded-full border border-[#4fc3f7]/60 shadow-[0_0_34px_rgba(79,195,247,0.4)]",
    portraitImg: "grayscale",
    cta: "sw-btn sw-btn--primary !py-3",
  },
  {
    id: "simpsons",
    to: "/experience/simpsons",
    logo: simpsonsLogo,
    portrait: simpsonsBrian,
    Preview: SimpsonsPreview,
    panel: "border-[3px] border-black hover:shadow-[0_0_0_4px_#ffd90f] data-[active=true]:shadow-[0_0_0_4px_#ffd90f] focus-visible:ring-[#ffd90f]",
    text: "text-black font-Raleway font-semibold",
    portraitFrame: "rounded-full border-[3px] border-black bg-white shadow-[4px_4px_0_#000]",
    portraitImg: "",
    cta: "rounded-full border-[3px] border-black bg-[#ffd90f] font-Raleway font-black text-black shadow-[4px_4px_0_#000]",
  },
];

const ExperienceSelection = () => {
  const { t, i18n } = useTranslation();
  const navigate = useTransitionNavigate();
  const [active, setActive] = useState<number | null>(null);
  const activeRef = useRef<number | null>(null);
  activeRef.current = active;
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const scroller = useRef<HTMLElement>(null);
  useBodyBackground("#050505");

  // En celular los universos son un carrusel horizontal (como elegir personaje)
  const isCarousel = () => window.matchMedia("(max-width: 767px)").matches;

  const goTo = useCallback((index: number) => {
    const i = (index + EXPERIENCES.length) % EXPERIENCES.length;
    setActive(i);
    const panel = buttons.current[i];
    if (!panel) return;
    const list = scroller.current;
    if (isCarousel() && list) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      list.scrollTo({
        left: panel.offsetLeft - (list.clientWidth - panel.clientWidth) / 2,
        behavior: reduce ? "auto" : "smooth",
      });
    }
    panel.focus({ preventScroll: true });
  }, []);

  // Flechas del teclado en cualquier momento (sin tener que hacer foco antes)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.metaKey || e.ctrlKey) return;
      const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (step) {
        e.preventDefault();
        const current = activeRef.current ?? (step > 0 ? -1 : 0);
        goTo(current + step);
      } else if (
        e.key === "Enter" &&
        activeRef.current !== null &&
        !(document.activeElement instanceof HTMLButtonElement)
      ) {
        navigate(EXPERIENCES[activeRef.current].to);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, navigate]);

  // Carrusel: el universo centrado es el activo (se actualiza al deslizar)
  useEffect(() => {
    const list = scroller.current;
    if (!list) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!isCarousel()) return;
      const center = list.scrollLeft + list.clientWidth / 2;
      let nearest = 0;
      let best = Infinity;
      buttons.current.forEach((panel, i) => {
        if (!panel) return;
        const distance = Math.abs(panel.offsetLeft + panel.clientWidth / 2 - center);
        if (distance < best) {
          best = distance;
          nearest = i;
        }
      });
      setActive((current) => (current === nearest ? current : nearest));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    list.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      list.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const title = t("selector.title");
  const toggleLanguage = () => i18n.changeLanguage(i18n.language === "es" ? "en" : "es");

  return (
    <main
      className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-[#050505] px-4 py-5 text-white sm:px-8 sm:py-8 md:h-auto md:min-h-screen-safe"
    >
      {/* Fondo: grilla tenue y brillo de los tres universos */}
      <div className="exp-grid pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_45%,rgba(0,255,65,0.09),transparent_35%),radial-gradient(circle_at_50%_0%,rgba(79,195,247,0.1),transparent_40%),radial-gradient(circle_at_100%_100%,rgba(255,217,15,0.08),transparent_40%)]"
        aria-hidden="true"
      />

      <header className="exp-enter relative z-10 mx-auto flex w-full max-w-7xl items-start justify-between gap-4">
        <div>
          <p className="font-IBM text-xs uppercase tracking-[0.3em] text-white/45">
            {t("selector.kicker")}
          </p>
          <h1 className="mt-2 font-Raleway text-4xl font-black tracking-tight sm:mt-3 sm:text-5xl lg:text-6xl max-md:[@media(max-height:700px)]:text-3xl">
            {/* El cursor va pegado a la última palabra para no quedar solo en otra línea */}
            {title.slice(0, title.lastIndexOf(" ") + 1)}
            <span className="whitespace-nowrap">
              {title.slice(title.lastIndexOf(" ") + 1)}
              <span className="ml-1 inline-block animate-pulse text-white/40">_</span>
            </span>
          </h1>
          <p className="mt-3 max-w-xl font-Raleway text-base text-white/60 sm:text-lg max-md:[@media(max-height:700px)]:hidden">
            {t("selector.subtitle")}
          </p>
        </div>
        <button
          type="button"
          onClick={toggleLanguage}
          aria-label={i18n.language === "es" ? "Switch to English" : "Cambiar a español"}
          className="shrink-0 rounded-full border border-white/15 px-3 py-1.5 font-IBM text-xs font-bold transition-colors hover:border-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <span className={i18n.language === "es" ? "text-white" : "text-white/35"}>ES</span>
          <span className="text-white/30"> / </span>
          <span className={i18n.language === "en" ? "text-white" : "text-white/35"}>EN</span>
        </button>
      </header>

      <section
        ref={scroller}
        aria-roledescription="carousel"
        className="exp-list no-scrollbar relative z-10 -mx-4 mt-6 flex min-h-0 flex-1 snap-x snap-mandatory gap-4 overflow-x-auto px-[9vw] py-3 sm:-mx-8 md:mx-auto md:mt-10 md:w-full md:max-w-7xl md:min-h-[540px] md:snap-none md:gap-5 md:overflow-visible md:px-0 md:py-0"
        onMouseLeave={() => !isCarousel() && setActive(null)}
        data-has-active={active !== null}
      >
        {EXPERIENCES.map((exp, index) => {
          const isActive = active === index;
          return (
            <button
              key={exp.id}
              ref={(el) => (buttons.current[index] = el)}
              type="button"
              onClick={() => navigate(exp.to)}
              onMouseEnter={() => !isCarousel() && setActive(index)}
              onFocus={() => setActive(index)}
              data-active={isActive}
              aria-label={`${t(`selector.items.${exp.id}.name`)}: ${t(`selector.items.${exp.id}.tagline`)}`}
              style={{ animationDelay: `${150 + index * 120}ms` } as CSSProperties}
              className={`exp-panel exp-enter group relative min-h-0 w-[82vw] shrink-0 snap-center overflow-hidden rounded-2xl border text-left md:w-auto md:shrink focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] md:min-h-0 ${exp.panel}`}
            >
              <exp.Preview />
              <div className="exp-dim pointer-events-none absolute inset-0 z-20 bg-black" aria-hidden="true" />

              <div className={`relative z-10 flex h-full flex-col p-5 sm:p-6 ${exp.text}`}>
                <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.25em] opacity-70">
                  <span>CH {String(index + 1).padStart(2, "0")}</span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
                    On air
                  </span>
                </div>

                <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 py-2 text-center [@media(min-height:740px)]:gap-5 [@media(min-height:740px)]:py-4">
                  <div className="flex h-16 w-full items-center justify-center sm:h-24 lg:h-28 [@media(min-height:740px)]:h-20">
                    <img
                      src={exp.logo}
                      alt={t(`selector.items.${exp.id}.name`)}
                      className={`w-full object-contain transition-transform duration-500 will-change-transform group-hover:scale-105 group-data-[active=true]:scale-105 ${exp.logoClass ?? "max-h-full max-w-[200px] lg:max-w-[230px]"}`}
                    />
                  </div>
                  <div
                    className={`relative isolate h-20 w-20 overflow-hidden [@media(min-height:740px)]:h-24 [@media(min-height:740px)]:w-24 transition-transform duration-500 will-change-transform group-hover:scale-110 group-data-[active=true]:scale-110 sm:h-28 sm:w-28 ${exp.portraitFrame}`}
                  >
                    <img
                      src={exp.portrait}
                      alt=""
                      className={`h-full w-full object-cover ${exp.portraitImg}`}
                    />
                    {exp.id === "starWars" && (
                      <div className="pointer-events-none absolute inset-0 bg-[#4fc3f7] mix-blend-multiply" />
                    )}
                  </div>
                  <p className="max-w-xs text-sm leading-relaxed max-md:[@media(max-height:640px)]:hidden md:opacity-70 md:transition-opacity md:duration-500 md:group-hover:opacity-100 md:group-data-[active=true]:opacity-100">
                    {t(`selector.items.${exp.id}.tagline`)}
                  </p>
                </div>

                <span
                  className={`mx-auto inline-flex items-center gap-3 px-6 py-2.5 text-xs font-bold uppercase tracking-[0.25em] transition-[transform,opacity,border-color,background-color,color] duration-300 ${exp.cta}`}
                >
                  {t("selector.enter")}
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </button>
          );
        })}
      </section>

      {/* Controles tipo videojuego para el carrusel (solo celular) */}
      <div
        className="exp-enter relative z-10 mt-4 flex items-center justify-between gap-4 md:hidden"
        style={{ animationDelay: "500ms" }}
      >
        <button
          type="button"
          onClick={() => goTo((active ?? 0) - 1)}
          aria-label={t("selector.prev")}
          className="exp-arrow"
        >
          ◀
        </button>
        <div className="flex flex-col items-center gap-2">
          <span className="font-IBM text-xs font-bold uppercase tracking-[0.3em] text-white/80" aria-live="polite">
            {t(`selector.items.${EXPERIENCES[active ?? 0].id}.name`)}
          </span>
          <div className="flex items-center gap-2">
            {EXPERIENCES.map((exp, index) => (
              <button
                key={exp.id}
                type="button"
                onClick={() => goTo(index)}
                aria-label={t(`selector.items.${exp.id}.name`)}
                aria-current={(active ?? 0) === index ? "true" : undefined}
                className={`h-2 rounded-full transition-[width,background-color] duration-300 ${
                  (active ?? 0) === index ? "w-7 bg-white" : "w-2 bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={() => goTo((active ?? 0) + 1)}
          aria-label={t("selector.next")}
          className="exp-arrow"
        >
          ▶
        </button>
      </div>

      <footer className="exp-enter relative z-10 mx-auto mt-4 flex w-full max-w-7xl flex-col items-center justify-between gap-2 md:mt-6 font-IBM text-[11px] uppercase tracking-[0.2em] text-white/35 sm:flex-row" style={{ animationDelay: "600ms" }}>
        <span className="hidden md:inline">{t("selector.hint")}</span>
        <span className="md:hidden">{t("selector.hintTouch")}</span>
        <span className="hidden md:inline">{t("selector.footer")}</span>
      </footer>
    </main>
  );
};

export default ExperienceSelection;
