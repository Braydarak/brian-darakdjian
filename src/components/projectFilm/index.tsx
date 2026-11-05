import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import type { WorkItem } from "../../data/works";
import { lockScroll, unlockScroll } from "../../lib/smoothScroll";
import { THEMES, type FilmTheme } from "./themes";

type ProjectFilmProps = {
  work: WorkItem;
  theme: FilmTheme;
  onClose: () => void;
};

const CLOSE_MS = 250;

const pad = (n: number) => String(n).padStart(2, "0");

// Visor tipo "película" de un proyecto: ficha (título, sinopsis, género...)
// y las capturas como escenas. Se abre encima de la página, sin cambiar de
// ruta. Va en un portal al <body> porque las tarjetas tienen transform (las
// animaciones de aparición) y eso rompería el position: fixed.
const ProjectFilm = ({ work, theme, onClose }: ProjectFilmProps) => {
  const { t, i18n } = useTranslation();
  const film = work.film!;
  const k = film.filmKey;
  const s = THEMES[theme];
  const total = film.scenes.length;

  const [index, setIndex] = useState(0);
  const [closing, setClosing] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const thumbsRef = useRef<HTMLOListElement>(null);
  const closingRef = useRef(false);
  const [zoom, setZoom] = useState(false);
  const zoomCloseRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);

  // Deslizar la captura con el dedo pasa de escena
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
  };

  const scene = film.scenes[index];
  const sceneKey = `${k}.scenes.${scene.id}`;

  const close = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setClosing(true);
    window.setTimeout(onClose, CLOSE_MS);
  }, [onClose]);

  const go = useCallback(
    (step: number) => setIndex((i) => (i + step + total) % total),
    [total],
  );

  // Bloquea el scroll de la página y devuelve el foco al cerrar
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    lockScroll();
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      unlockScroll();
      previous?.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (zoom) setZoom(false);
        else close();
      } else if (zoom) return;
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, go, zoom]);

  useEffect(() => {
    if (zoom) zoomCloseRef.current?.focus({ preventScroll: true });
  }, [zoom]);

  // Centra la miniatura activa (solo en horizontal: scrollIntoView también
  // movería el visor en vertical) y precarga la siguiente escena
  useEffect(() => {
    const list = thumbsRef.current;
    const thumb = list?.children[index] as HTMLElement | undefined;
    if (list && thumb) {
      list.scrollTo({
        left: thumb.offsetLeft - (list.clientWidth - thumb.offsetWidth) / 2,
        behavior: "smooth",
      });
    }
    const next = new Image();
    next.src = film.scenes[(index + 1) % total].image;
  }, [index, film.scenes, total]);

  // Atrapa el foco dentro del visor
  const onKeyDownTrap = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab") return;
    const focusables = e.currentTarget.querySelectorAll<HTMLElement>(
      'button, a[href], [tabindex]:not([tabindex="-1"])',
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="film-title"
      onKeyDown={onKeyDownTrap}
      className={`film fixed inset-0 z-[90] overflow-y-auto overscroll-contain ${s.root} ${
        closing ? "film--closing" : ""
      }`}
    >
      {/* Bandas negras de cine que entran al abrir */}
      <div aria-hidden="true" className="film-bar film-bar--top" />
      <div aria-hidden="true" className="film-bar film-bar--bottom" />

      <div className="relative mx-auto flex min-h-full w-full max-w-7xl flex-col px-4 pb-10 sm:px-8">
        {/* Fija arriba: "Cerrar" siempre a mano aunque se baje por la ficha */}
        <div
          className={`sticky top-0 z-10 -mx-4 flex items-center justify-between gap-4 px-4 py-3 sm:-mx-8 sm:px-8 lg:py-6 ${s.bar}`}
        >
          <p
            className={`film-rise truncate text-[10px] uppercase tracking-[0.3em] sm:text-[11px] sm:tracking-[0.35em] ${s.muted}`}
          >
            {t("film.presents")}
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            className={`shrink-0 px-3 py-1.5 text-sm transition-colors focus:outline-none focus-visible:ring-2 ${s.button}`}
          >
            {t("film.close")} <span aria-hidden="true">✕</span>
          </button>
        </div>

        {/* En el celular: título, escena y después la ficha. En desktop la
            ficha va a la izquierda y la escena ocupa la columna derecha. */}
        <div className="mt-3 grid grid-cols-1 flex-1 content-start gap-6 sm:mt-6 sm:gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,12fr)] lg:grid-rows-[auto_1fr] lg:gap-x-10 lg:gap-y-6">
          <header className="film-rise flex items-center gap-4 [--film-delay:120ms] sm:block lg:col-start-1 lg:row-start-1">
            <div
              className={`flex h-16 w-16 shrink-0 items-center justify-center p-2 sm:h-24 sm:w-40 sm:p-4 ${s.logoBox}`}
            >
              <img
                src={work.image}
                alt=""
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <h2
                id="film-title"
                className={`text-3xl sm:mt-6 sm:text-5xl ${s.title}`}
              >
                {t(`${k}.title`)}
              </h2>
              <p className={`mt-1 text-base sm:mt-2 sm:text-lg ${s.accent}`}>
                {t(`${k}.subtitle`)}
              </p>
              <p className={`mt-3 hidden text-sm italic sm:block ${s.muted}`}>
                “{t(`${k}.tagline`)}”
              </p>
            </div>
          </header>

          {/* Escena actual */}
          <section
            aria-live="polite"
            className="film-rise flex min-w-0 flex-col [--film-delay:240ms] lg:col-start-2 lg:row-span-2 lg:row-start-1"
          >
            {/* Contador y flechas arriba de la captura: así el título de la
                escena tiene todo el ancho, aunque sea largo */}
            <div className="mb-3 flex items-center justify-between gap-4">
              <span
                className={`inline-block px-2 py-0.5 text-[11px] uppercase tracking-[0.25em] ${s.chip}`}
              >
                {t("film.scene")} {pad(index + 1)} {t("film.of")} {pad(total)}
              </span>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label={t("film.prev")}
                  className={`h-10 w-10 transition-colors focus:outline-none focus-visible:ring-2 ${s.button}`}
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label={t("film.next")}
                  className={`h-10 w-10 transition-colors focus:outline-none focus-visible:ring-2 ${s.button}`}
                >
                  →
                </button>
              </div>
            </div>
            <div
              className={`relative overflow-hidden ${s.frame}`}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <button
                type="button"
                onClick={() => setZoom(true)}
                aria-label={t("film.zoom")}
                className="absolute inset-0 z-[1] cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-2 right-2 z-[1] rounded-full bg-black/70 px-2.5 py-1 font-sans text-[11px] font-semibold text-white lg:hidden"
              >
                ⤢ {t("film.zoomHint")}
              </span>
              <img
                key={scene.id}
                src={scene.image}
                alt={t(`${sceneKey}.title`)}
                width={1600}
                height={723}
                className="film-scene block aspect-[1600/723] w-full bg-black/40 object-cover object-top"
              />
            </div>

            <div key={`text-${scene.id}`} className="film-scene-text mt-5">
              <div className="min-w-0">
                <h3 className={`text-xl sm:text-2xl ${s.sceneTitle}`}>
                  {t(`${sceneKey}.title`)}
                </h3>
                <p className={`mt-1 text-sm italic ${s.accent}`}>
                  “{t(`${sceneKey}.tagline`)}”
                </p>
                <p
                  className={`mt-3 max-w-3xl text-sm leading-relaxed sm:text-base ${s.body}`}
                >
                  {t(`${sceneKey}.text`)}
                </p>
              </div>
            </div>

            <h3
              className={`mt-8 text-xs uppercase tracking-[0.3em] ${s.muted}`}
            >
              {t("film.scenes")}
            </h3>
            {/* Padding para que el contorno de la miniatura activa no se corte */}
            <ol
              ref={thumbsRef}
              className="no-scrollbar relative -mx-4 mt-2 flex snap-x gap-3 overflow-x-auto scroll-px-4 px-4 py-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:-mx-2 lg:scroll-px-2 lg:px-2"
            >
              {film.scenes.map((item, i) => (
                <li key={item.id} className="shrink-0 snap-start">
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-current={i === index ? "true" : undefined}
                    className={`group block w-36 text-left focus:outline-none focus-visible:ring-2 sm:w-40 ${s.ring}`}
                  >
                    <span
                      className={`block overflow-hidden transition-opacity ${s.thumb} ${
                        i === index
                          ? `opacity-100 ${s.thumbActive}`
                          : "opacity-50 group-hover:opacity-90"
                      }`}
                    >
                      <img
                        src={item.image}
                        alt=""
                        loading="lazy"
                        className="aspect-[16/9] w-full object-cover object-top"
                      />
                    </span>
                    <span
                      className={`mt-1.5 block truncate text-xs ${i === index ? s.accent : s.muted}`}
                    >
                      {pad(i + 1)} · {t(`${k}.scenes.${item.id}.title`)}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
            <p className={`mt-3 hidden text-xs md:block ${s.muted}`}>
              {t("film.hint")}
            </p>
          </section>

          {/* Ficha técnica y sinopsis */}
          <aside className="film-rise flex flex-col [--film-delay:180ms] lg:col-start-1 lg:row-start-2">
            <dl
              className={`grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 border-y py-4 text-sm ${s.border}`}
            >
              {/* Solo los datos que tenga la ficha de cada proyecto */}
              {(["genre", "year", "cast"] as const)
                .filter((field) => i18n.exists(`${k}.${field}`))
                .map((field) => (
                  <Fragment key={field}>
                    <dt className={s.muted}>{t(`film.${field}`)}</dt>
                    <dd>{t(`${k}.${field}`)}</dd>
                  </Fragment>
                ))}
              <dt className={s.muted}>{t("film.director")}</dt>
              <dd>Brian Darakdjian</dd>
            </dl>

            <h3
              className={`mt-6 text-xs uppercase tracking-[0.3em] ${s.accent}`}
            >
              {t("film.synopsis")}
            </h3>
            <p className={`mt-2 text-sm leading-relaxed ${s.body}`}>
              {t(`${k}.synopsis`)}
            </p>

            <a
              href={work.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-6 self-start px-4 py-2 text-sm transition-colors focus:outline-none focus-visible:ring-2 ${s.button}`}
            >
              {t("film.visit")} <span aria-hidden="true">↗</span>
            </a>
          </aside>
        </div>
      </div>

      {/* Captura ampliada: a la altura de la pantalla y se recorre de costado,
          para leerla en el celular */}
      {zoom && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t(`${sceneKey}.title`)}
          className="fixed inset-0 z-[95] flex flex-col bg-black"
        >
          <div className="flex items-center justify-between gap-3 px-4 py-3 font-sans text-white">
            <p className="truncate text-sm font-semibold">
              {pad(index + 1)} · {t(`${sceneKey}.title`)}
            </p>
            <button
              ref={zoomCloseRef}
              type="button"
              onClick={() => setZoom(false)}
              className="shrink-0 rounded-full border border-white/40 px-3 py-1.5 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {t("film.close")} ✕
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-auto overscroll-contain">
            <img
              src={scene.image}
              alt={t(`${sceneKey}.title`)}
              className="h-full w-auto max-w-none"
            />
          </div>
          <p className="px-4 py-3 text-center font-sans text-xs text-white/60">
            {t("film.panHint")}
          </p>
        </div>
      )}
    </div>,
    document.body,
  );
};

export default ProjectFilm;
