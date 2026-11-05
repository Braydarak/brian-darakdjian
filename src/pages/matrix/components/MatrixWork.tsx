import { useState } from "react";
import { useTranslation } from "react-i18next";
import ProjectFilm from "../../../components/projectFilm";
import SwipeDots from "../../../components/swipeDots";
import { useCarousel } from "../../../hooks/useCarousel";
import type { WorkItem } from "../../../data/works";
import { useWorkTabs } from "../../../hooks/useWorkTabs";

const MatrixWork = () => {
  const { t } = useTranslation();
  const { tab, visible, count, onKeyDown, tabProps, panelProps, statuses } =
    useWorkTabs("matrix-work");
  const [filmWork, setFilmWork] = useState<WorkItem | null>(null);
  const carousel = useCarousel<HTMLUListElement>(tab);

  return (
    <section
      id="matrix-work"
      className="relative scroll-mt-16 px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto w-full max-w-6xl">
        <p data-reveal className="text-sm text-[#00ff41]/70 sm:text-base">
          <span className="text-[#00ff41]">$</span> {t("matrix.work.prompt")}
        </p>
        <div className="scroll-drift">
          <h2
            data-reveal
            className="mt-3 text-3xl font-bold uppercase tracking-wider text-[#00ff41] [text-shadow:0_0_14px_rgba(0,255,65,0.5)] sm:text-4xl"
          >
            {t("matrix.work.title")}
          </h2>
        </div>
        <p data-reveal className="mt-3 max-w-2xl text-[#00ff41]/75">
          {t("matrix.work.subtitle")}
        </p>

        <div
          data-reveal
          role="tablist"
          aria-label={t("matrix.work.title")}
          onKeyDown={onKeyDown}
          className="no-scrollbar -mx-4 mt-8 flex gap-2 overflow-x-auto px-4 text-sm sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        >
          {statuses.map((id) => (
            <button
              key={id}
              {...tabProps(id)}
              className={`shrink-0 whitespace-nowrap border px-3 py-1.5 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00ff41] ${
                tab === id
                  ? "border-[#00ff41] bg-[#00ff41] text-black"
                  : "border-[#00ff41]/40 text-[#00ff41] hover:bg-[#00ff41]/10"
              }`}
            >
              [{t(`matrix.work.tabs.${id}`)} · {count(id)}]
            </button>
          ))}
        </div>
        <p className="mt-4 text-sm text-[#00ff41]/60">
          <span className="text-[#00ff41]">&gt;</span>{" "}
          {t(`matrix.work.tabInfo.${tab}`)}
        </p>

        <div {...panelProps}>
          <ul
            ref={carousel.ref}
            // Celular: carrusel deslizable que asoma la tarjeta siguiente.
            // Desde sm: grilla.
            className="no-scrollbar relative -mx-4 mt-8 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-4 pt-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 sm:pt-0 lg:grid-cols-3"
          >
            {visible.map((work) => (
              <li
                key={work.title}
                data-reveal
                className="h-auto w-[84%] shrink-0 snap-center sm:h-full sm:w-auto"
              >
                <article className="group relative flex h-full flex-col border border-[#00ff41]/30 bg-black/85 transition-[transform,opacity,border-color,background-color,color] duration-300 hover:-translate-y-1 hover:border-[#00ff41] hover:shadow-[0_0_24px_rgba(0,255,65,0.25)]">
                  <div className="flex items-center justify-between border-b border-[#00ff41]/20 px-4 py-2 text-xs">
                    <span className="truncate text-[#00ff41]/50">
                      ~/
                      {work.title
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")}
                    </span>
                    <span
                      className={`flex shrink-0 items-center gap-1.5 ${
                        work.status === "dev"
                          ? "text-yellow-300"
                          : work.status === "live"
                            ? "text-[#00ff41]"
                            : "text-[#00ff41]/50"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          work.status === "dev"
                            ? "animate-pulse bg-yellow-300"
                            : work.status === "live"
                              ? "bg-[#00ff41] shadow-[0_0_6px_#00ff41]"
                              : "bg-[#00ff41]/40"
                        }`}
                      />
                      {t(`matrix.work.badge.${work.status}`)}
                    </span>
                  </div>

                  <div className="relative isolate m-4 flex h-40 items-center justify-center overflow-hidden bg-white p-4">
                    <img
                      src={work.image}
                      alt={work.title}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain grayscale transition-[transform,opacity,border-color,background-color,color] duration-500 group-hover:grayscale-0"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[#00ff41] mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0" />
                  </div>

                  <div className="flex flex-1 flex-col px-4 pb-4">
                    <h3 className="text-lg font-bold uppercase tracking-wide text-[#d1ffd9]">
                      {work.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[#00ff41]/75">
                      {t(work.descriptionKey)}
                    </p>
                    {work.film ? (
                      // Abre el visor en la misma página; el ::after estira el clic a toda la tarjeta
                      <button
                        type="button"
                        onClick={() => setFilmWork(work)}
                        className="mt-4 self-start border border-[#00ff41]/50 px-3 py-1.5 text-sm text-[#00ff41] transition-colors hover:bg-[#00ff41] hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00ff41] after:absolute after:inset-0 after:content-['']"
                      >
                        {t("matrix.work.watch")}{" "}
                        <span aria-hidden="true">▶</span>
                      </button>
                    ) : (
                      <a
                        href={work.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 self-start border border-[#00ff41]/50 px-3 py-1.5 text-sm text-[#00ff41] transition-colors hover:bg-[#00ff41] hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00ff41]"
                      >
                        {t("matrix.work.open")} →
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
            dotClass="bg-[#00ff41]/30"
            activeClass="bg-[#00ff41] shadow-[0_0_6px_#00ff41]"
          />
        </div>
      </div>
      {filmWork && (
        <ProjectFilm
          work={filmWork}
          theme="matrix"
          onClose={() => setFilmWork(null)}
        />
      )}
    </section>
  );
};

export default MatrixWork;
