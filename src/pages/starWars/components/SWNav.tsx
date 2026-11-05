import React, { useEffect, useRef, useState } from "react";
import { useScrollProgress } from "../../../hooks/useScrollProgress";
import { useTranslation } from "react-i18next";
import { useMobileMenu } from "../../../hooks/useMobileMenu";
import { SW_SECTIONS, SWSection, scrollToSection } from "./sections";

type SWNavProps = {
  // Sale de la experiencia con el salto al hiperespacio
  onExit: () => void;
};

const SWNav = ({ onExit }: SWNavProps) => {
  const { t, i18n } = useTranslation();
  const [active, setActive] = useState<SWSection>("home");
  const progressRef = useRef<HTMLDivElement>(null);
  useScrollProgress(progressRef);
  const menu = useMobileMenu(450, 768);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id.replace("sw-", "") as SWSection);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    SW_SECTIONS.forEach((id) => {
      const el = document.getElementById(`sw-${id}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const goTo = (id: SWSection) => {
    menu.close(false);
    scrollToSection(id);
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "es" ? "en" : "es");
  };

  const links = SW_SECTIONS.map((id) => (
    <button
      key={id}
      type="button"
      onClick={() => goTo(id)}
      aria-current={active === id ? "true" : undefined}
      className={`relative px-3 py-1 text-left uppercase tracking-[0.2em] transition-colors duration-200 hover:text-[#ffe81f] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#ffe81f] ${
        active === id ? "text-[#ffe81f]" : "text-white/55"
      }`}
    >
      {t(`starWars.nav.${id}`)}
    </button>
  ));

  return (
    <>
      {/* Menú del celular: consola holográfica sobre un campo de estrellas */}
      {menu.mounted && (
        <div
          ref={menu.panelRef}
          id="sw-mobile-menu"
          data-state={menu.state}
          className="sw-menu fixed inset-0 z-30 font-Raleway overflow-hidden bg-[#02030a] md:hidden"
        >
          {/* El fondo cubre toda la pantalla (también detrás del header, así
              nunca asoma la página); el contenido arranca debajo del header */}
          <div className="absolute inset-x-0 bottom-0 top-[67px]">
            <div aria-hidden="true" className="sw-menu__stars sw-intro-stars" />
            <div aria-hidden="true" className="sw-menu__glow" />

            <div className="sw-menu__stage relative flex h-full flex-col px-6 pb-8 pt-8">
              <p
                className="sw-menu__item flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.35em] text-[#4fc3f7]"
                style={{ "--i": 0 } as React.CSSProperties}
              >
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#4fc3f7] shadow-[0_0_8px_#4fc3f7]" />
                {t("starWars.nav.menuTitle")}
              </p>

              <nav
                className="mt-8 flex flex-col gap-2"
                aria-label={t("starWars.nav.menu")}
              >
                {SW_SECTIONS.map((id, i) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => goTo(id)}
                    aria-current={active === id ? "true" : undefined}
                    style={{ "--i": i + 1 } as React.CSSProperties}
                    className="sw-menu__item group relative flex items-center gap-4 py-3 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-[#ffe81f]"
                  >
                    <span
                      className={`font-Raleway text-sm font-black tabular-nums ${
                        active === id ? "text-[#4fc3f7]" : "text-white/30"
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className={`text-3xl font-black uppercase tracking-[0.12em] ${
                        active === id
                          ? "text-[#ffe81f] [text-shadow:0_0_18px_rgba(255,232,31,0.35)]"
                          : "text-transparent [-webkit-text-stroke:1px_rgba(255,232,31,0.75)] group-hover:text-[#ffe81f]/20"
                      }`}
                    >
                      {t(`starWars.nav.${id}`)}
                    </span>
                    {/* Sable de luz bajo la sección activa */}
                    {active === id && (
                      <span
                        aria-hidden="true"
                        className="sw-menu__saber absolute -bottom-0.5 left-9 right-0 h-[3px] rounded-full bg-[#e6f4ff]"
                      />
                    )}
                  </button>
                ))}
              </nav>

              <div className="mt-auto">
                <button
                  type="button"
                  onClick={onExit}
                  style={{ "--i": 4 } as React.CSSProperties}
                  className="sw-menu__item sw-btn sw-btn--primary w-full"
                >
                  {t("starWars.nav.exit")} <span aria-hidden="true">→</span>
                </button>
                <p
                  className="sw-menu__item mt-6 text-center text-[11px] font-bold uppercase tracking-[0.35em] text-[#ffe81f]/70"
                  style={{ "--i": 5 } as React.CSSProperties}
                >
                  {t("starWars.nav.menuFooter")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#02030a] font-Raleway">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="hidden items-center gap-1 text-xs font-bold md:flex">
            {links}
          </div>

          <div className="ml-auto flex items-center gap-2 text-xs font-bold">
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label={
                i18n.language === "es"
                  ? "Switch to English"
                  : "Cambiar a español"
              }
              className="rounded-full border border-white/20 px-3 py-1.5 text-white transition-colors hover:border-[#ffe81f]/60 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#ffe81f]"
            >
              <span
                className={
                  i18n.language === "es" ? "text-[#ffe81f]" : "text-white/40"
                }
              >
                ES
              </span>
              <span className="text-white/30"> / </span>
              <span
                className={
                  i18n.language === "en" ? "text-[#ffe81f]" : "text-white/40"
                }
              >
                EN
              </span>
            </button>
            <button
              type="button"
              onClick={onExit}
              className="hidden rounded-full border border-[#ffe81f]/50 px-4 py-1.5 uppercase tracking-[0.15em] text-[#ffe81f] transition-colors hover:bg-[#ffe81f] hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#ffe81f] sm:block"
            >
              {t("starWars.nav.exit")}
            </button>
            <button
              type="button"
              ref={menu.toggleRef}
              onClick={menu.toggle}
              aria-expanded={menu.isOpen}
              aria-controls="sw-mobile-menu"
              aria-label={t("starWars.nav.menu")}
              className={`flex h-8 w-8 flex-col items-center justify-center gap-1.5 rounded-full border transition-[border-color,box-shadow] duration-300 md:hidden ${
                menu.isOpen
                  ? "border-[#ffe81f] shadow-[0_0_12px_rgba(255,232,31,0.45)]"
                  : "border-white/20"
              }`}
            >
              <span
                className={`h-px w-4 bg-[#ffe81f] transition-transform duration-200 ${
                  menu.isOpen ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-4 bg-[#ffe81f] transition-transform duration-200 ${
                  menu.isOpen ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </nav>

        {/* Barra de progreso con forma de sable de luz */}
        <div className="h-[2px] w-full">
          <div
            className="h-full origin-left rounded-full bg-[#e6f4ff] shadow-[0_0_6px_2px_#3b82f6,0_0_14px_4px_rgba(59,130,246,0.6)]"
            ref={progressRef}
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </header>
    </>
  );
};

export default SWNav;
