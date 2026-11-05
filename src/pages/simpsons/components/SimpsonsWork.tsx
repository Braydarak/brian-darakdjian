import { useState } from "react";
import { useTranslation } from "react-i18next";
import ProjectFilm from "../../../components/projectFilm";
import SwipeDots from "../../../components/swipeDots";
import { useCarousel } from "../../../hooks/useCarousel";
import type { WorkItem } from "../../../data/works";
import { useWorkTabs } from "../../../hooks/useWorkTabs";

// Leve inclinación distinta por tarjeta para que parezcan pegadas a mano
const TILTS = [
  "-rotate-1",
  "rotate-1",
  "rotate-0",
  "rotate-[0.6deg]",
  "-rotate-[0.6deg]",
];

const SimpsonsWork = () => {
  const { t } = useTranslation();
  const { tab, visible, count, onKeyDown, tabProps, panelProps, statuses } =
    useWorkTabs("simpsons-work");
  const [filmWork, setFilmWork] = useState<WorkItem | null>(null);
  const carousel = useCarousel<HTMLUListElement>(tab);

  return (
    <section
      id="simpsons-work"
      className="relative scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="text-center">
          <div className="scroll-drift">
            <h2
              data-reveal
              className="font-RockSalt text-4xl leading-snug text-[#ffd90f] [-webkit-text-stroke:1px_#000] [text-shadow:3px_3px_0_#000] sm:text-5xl"
            >
              {t("simpsons.work.title")}
            </h2>
          </div>
          <p
            data-reveal
            className="mx-auto mt-4 max-w-2xl font-Raleway text-lg font-semibold text-black/75"
          >
            {t("simpsons.work.subtitle")}
          </p>

          <div
            data-reveal
            role="tablist"
            aria-label={t("simpsons.work.title")}
            onKeyDown={onKeyDown}
            className="no-scrollbar -mx-4 mt-8 flex gap-3 overflow-x-auto px-4 pb-2 font-Raleway sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0"
          >
            {statuses.map((id) => (
              <button
                key={id}
                {...tabProps(id)}
                className={`shrink-0 whitespace-nowrap simpsons-btn flex items-center gap-2 rounded-full border-[3px] border-black px-5 py-1.5 text-sm font-black ${
                  tab === id
                    ? "bg-[#ffd90f] text-black"
                    : "bg-white text-black/70"
                }`}
              >
                {t(`simpsons.work.tabs.${id}`)}
                <span className="rounded-full border-2 border-black bg-white px-1.5 text-[11px] leading-4 text-black">
                  {count(id)}
                </span>
              </button>
            ))}
          </div>
          <p className="mt-5 font-Raleway text-base font-bold text-black/60">
            {t(`simpsons.work.tabInfo.${tab}`)}
          </p>
        </div>

        <div {...panelProps}>
          <ul
            ref={carousel.ref}
            // Celular: carrusel deslizable que asoma la tarjeta siguiente.
            // Desde sm: grilla.
            className="no-scrollbar relative -mx-4 mt-10 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-4 pt-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-8 sm:overflow-visible sm:px-0 sm:pb-0 sm:pt-0 lg:grid-cols-3"
          >
            {visible.map((work, index) => (
              <li
                key={work.title}
                data-reveal
                className="h-auto w-[84%] shrink-0 snap-center sm:h-full sm:w-auto"
              >
                <article
                  className={`group relative flex h-full flex-col rounded-3xl border-[3px] border-black bg-[#fff6c2] p-4 shadow-[6px_6px_0_#000] transition-[transform,opacity,border-color,background-color,color] duration-300 hover:-translate-y-1.5 hover:rotate-0 hover:shadow-[10px_10px_0_#000] ${
                    TILTS[index % TILTS.length]
                  }`}
                >
                  <div className="relative flex h-44 items-center justify-center overflow-hidden rounded-2xl border-[3px] border-black bg-white p-5">
                    <img
                      src={work.image}
                      alt={work.title}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                    <span
                      className={`absolute left-3 top-3 flex items-center gap-1.5 rounded-full border-2 border-black px-2.5 py-0.5 font-Raleway text-[11px] font-black ${
                        work.status === "dev"
                          ? "bg-[#ffd90f] text-black"
                          : work.status === "live"
                            ? "bg-[#ff3b3b] text-white"
                            : "bg-[#a57fd1] text-white"
                      }`}
                    >
                      {work.status === "dev" && (
                        <span aria-hidden="true">🔨</span>
                      )}
                      {work.status === "live" && (
                        <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                      )}
                      {work.status === "past" && (
                        <span aria-hidden="true">📺</span>
                      )}
                      {t(`simpsons.work.badge.${work.status}`)}
                    </span>
                  </div>

                  <h3 className="mt-4 font-RockSalt text-lg leading-snug text-[#1f4fa3]">
                    {work.title}
                  </h3>
                  <p className="mt-2 flex-1 font-Raleway text-sm font-medium leading-relaxed text-black/75">
                    {t(work.descriptionKey)}
                  </p>
                  {work.film ? (
                    // Abre el visor en la misma página; el ::after estira el clic a toda la tarjeta
                    <button
                      type="button"
                      onClick={() => setFilmWork(work)}
                      className="simpsons-btn mt-5 self-start rounded-full border-[3px] border-black bg-[#ff3b3b] px-5 py-2 font-Raleway text-sm font-black text-white after:absolute after:inset-0 after:content-['']"
                    >
                      {t("simpsons.work.watch")}{" "}
                      <span aria-hidden="true">▶</span>
                    </button>
                  ) : (
                    <a
                      href={work.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="simpsons-btn mt-5 self-start rounded-full border-[3px] border-black bg-[#ff3b3b] px-5 py-2 font-Raleway text-sm font-black text-white"
                    >
                      {t("simpsons.work.open")} →
                    </a>
                  )}
                </article>
              </li>
            ))}
          </ul>
          <SwipeDots
            count={visible.length}
            active={carousel.active}
            onSelect={carousel.goTo}
            dotClass="bg-black/25"
            activeClass="bg-[#ff3b3b]"
          />
        </div>
      </div>
      {filmWork && (
        <ProjectFilm
          work={filmWork}
          theme="simpsons"
          onClose={() => setFilmWork(null)}
        />
      )}
    </section>
  );
};

export default SimpsonsWork;
