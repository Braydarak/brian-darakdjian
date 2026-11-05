import { useState } from "react";
import { useTranslation } from "react-i18next";
import ProjectFilm from "../../../components/projectFilm";
import SwipeDots from "../../../components/swipeDots";
import { useCarousel } from "../../../hooks/useCarousel";
import type { WorkItem } from "../../../data/works";
import { useWorkTabs } from "../../../hooks/useWorkTabs";

const SWWork = () => {
  const { t } = useTranslation();
  const { tab, visible, count, onKeyDown, tabProps, panelProps, statuses } =
    useWorkTabs("sw-work");
  const [filmWork, setFilmWork] = useState<WorkItem | null>(null);
  const carousel = useCarousel<HTMLUListElement>(tab);

  return (
    <section
      id="sw-work"
      className="relative scroll-mt-16 px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto w-full max-w-6xl">
        <p
          data-reveal
          className="font-Raleway text-xs font-bold uppercase tracking-[0.35em] text-[#4fc3f7]"
        >
          {t("starWars.work.kicker")}
        </p>
        <div className="scroll-drift">
          <h2
            data-reveal
            className="mt-3 font-Raleway text-4xl font-black uppercase tracking-[0.1em] text-[#ffe81f] sm:text-5xl"
          >
            {t("starWars.work.title")}
          </h2>
        </div>
        <p data-reveal className="mt-3 max-w-2xl font-Raleway text-white/70">
          {t("starWars.work.subtitle")}
        </p>

        <div
          data-reveal
          role="tablist"
          aria-label={t("starWars.work.title")}
          onKeyDown={onKeyDown}
          className="no-scrollbar -mx-4 mt-8 flex gap-2 overflow-x-auto px-4 font-Raleway text-xs font-bold uppercase tracking-[0.15em] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        >
          {statuses.map((id) => (
            <button
              key={id}
              {...tabProps(id)}
              className={`shrink-0 whitespace-nowrap flex items-center gap-2 rounded-full border px-4 py-2 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#ffe81f] ${
                tab === id
                  ? "border-[#ffe81f] bg-[#ffe81f] text-black"
                  : "border-white/20 text-white/70 hover:border-[#ffe81f]/60 hover:text-[#ffe81f]"
              }`}
            >
              {t(`starWars.work.tabs.${id}`)}
              <span
                className={`rounded-full px-1.5 text-[10px] ${
                  tab === id ? "bg-black/15" : "bg-white/10"
                }`}
              >
                {count(id)}
              </span>
            </button>
          ))}
        </div>
        <p className="mt-4 font-Raleway text-sm text-white/55">
          {t(`starWars.work.tabInfo.${tab}`)}
        </p>

        <div {...panelProps}>
          <ul
            ref={carousel.ref}
            // Celular: carrusel deslizable que asoma la tarjeta siguiente.
            // Desde sm: grilla.
            className="no-scrollbar relative -mx-4 mt-8 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-4 pt-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 sm:pt-0 lg:grid-cols-3"
          >
            {visible.map((work, index) => (
              <li
                key={work.title}
                data-reveal
                className="h-auto w-[84%] shrink-0 snap-center sm:h-full sm:w-auto"
              >
                <article className="sw-card group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-[#0e1222]/90 to-[#05060d]/90 transition-[transform,opacity,border-color,background-color,color] duration-300 hover:-translate-y-1 hover:border-[#ffe81f]/50 hover:shadow-[0_10px_40px_-10px_rgba(255,232,31,0.25)]">
                  <div className="flex items-center justify-between px-5 pt-4 font-Raleway text-[10px] font-bold uppercase tracking-[0.25em]">
                    <span className="text-white/35">
                      Nº {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`flex items-center gap-1.5 ${
                        work.status === "dev"
                          ? "text-[#4fc3f7]"
                          : work.status === "live"
                            ? "text-[#ffe81f]"
                            : "text-white/50"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          work.status === "dev"
                            ? "animate-pulse bg-[#4fc3f7]"
                            : work.status === "live"
                              ? "bg-[#ffe81f] shadow-[0_0_6px_#ffe81f]"
                              : "bg-white/40"
                        }`}
                      />
                      {t(`starWars.work.badge.${work.status}`)}
                    </span>
                  </div>

                  <div className="relative mx-5 mt-4 flex h-40 items-center justify-center overflow-hidden rounded-lg bg-white p-4">
                    <img
                      src={work.image}
                      alt={work.title}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
                    <h3 className="font-Raleway text-lg font-extrabold uppercase tracking-[0.08em] text-white">
                      {work.title}
                    </h3>
                    <p className="mt-2 flex-1 font-Raleway text-sm leading-relaxed text-white/65">
                      {t(work.descriptionKey)}
                    </p>
                    {work.film ? (
                      // Abre el visor en la misma página; el ::after estira el clic a toda la tarjeta
                      <button
                        type="button"
                        onClick={() => setFilmWork(work)}
                        className="mt-5 inline-flex items-center gap-2 self-start rounded-full border border-[#ffe81f]/50 px-4 py-2 font-Raleway text-xs font-bold uppercase tracking-[0.2em] text-[#ffe81f] transition-colors hover:bg-[#ffe81f] hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#ffe81f] after:absolute after:inset-0 after:content-['']"
                      >
                        {t("starWars.work.watch")}{" "}
                        <span aria-hidden="true">▶</span>
                      </button>
                    ) : (
                      <a
                        href={work.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-2 self-start rounded-full border border-[#ffe81f]/50 px-4 py-2 font-Raleway text-xs font-bold uppercase tracking-[0.2em] text-[#ffe81f] transition-colors hover:bg-[#ffe81f] hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#ffe81f]"
                      >
                        {t("starWars.work.open")}
                        <span aria-hidden="true">→</span>
                      </a>
                    )}
                  </div>
                </article>
              </li>
            ))}
          </ul>
          <SwipeDots
            count={visible.length}
            active={carousel.active}
            onSelect={carousel.goTo}
            dotClass="bg-white/25"
            activeClass="bg-[#ffe81f]"
          />
        </div>
      </div>
      {filmWork && (
        <ProjectFilm
          work={filmWork}
          theme="starWars"
          onClose={() => setFilmWork(null)}
        />
      )}
    </section>
  );
};

export default SWWork;
