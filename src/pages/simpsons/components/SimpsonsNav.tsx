import React, { useEffect, useRef, useState } from "react";
import { useScrollProgress } from "../../../hooks/useScrollProgress";
import { useTranslation } from "react-i18next";
import { useTransitionNavigate } from "../../../components/pageTransition/context";
import GithubLogo from "../../../components/githubLogo";
import LinkedInLogo from "../../../components/linkedInLogo";
import { useMobileMenu } from "../../../hooks/useMobileMenu";
import cloud from "../../../assets/cloud.svg";
import {
  SIMPSONS_SECTIONS,
  SimpsonsSection,
  scrollToSection,
} from "./sections";

// Color de cada botón del menú, como fichas de caricatura
const MENU_COLORS = ["bg-[#ffd90f]", "bg-[#ff7eb6]", "bg-white"];
const MENU_TILTS = ["-rotate-2", "rotate-1", "-rotate-1"];

const SimpsonsNav = () => {
  const { t, i18n } = useTranslation();
  const navigate = useTransitionNavigate();
  const [active, setActive] = useState<SimpsonsSection>("home");
  const progressRef = useRef<HTMLDivElement>(null);
  useScrollProgress(progressRef);
  const menu = useMobileMenu(400, 1024);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(
              entry.target.id.replace("simpsons-", "") as SimpsonsSection,
            );
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    SIMPSONS_SECTIONS.forEach((id) => {
      const el = document.getElementById(`simpsons-${id}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const goTo = (id: SimpsonsSection) => {
    menu.close(false);
    scrollToSection(id);
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "es" ? "en" : "es");
  };

  const links = SIMPSONS_SECTIONS.map((id) => (
    <button
      key={id}
      type="button"
      onClick={() => goTo(id)}
      aria-current={active === id ? "true" : undefined}
      className={`rounded-full border-2 px-4 py-1.5 text-left font-bold transition-[transform,opacity,border-color,background-color,color] duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black ${
        active === id
          ? "border-black bg-[#ffd90f] text-black shadow-[2px_2px_0_#000]"
          : "border-transparent text-white hover:border-white/60"
      }`}
    >
      {t(`simpsons.nav.${id}`)}
    </button>
  ));

  return (
    <>
      {/* Menú del celular: cae con rebote como en los dibujos, sobre el cielo */}
      {menu.mounted && (
        <div
          ref={menu.panelRef}
          id="simpsons-mobile-menu"
          data-state={menu.state}
          className="simpsons-menu fixed inset-0 z-30 font-Raleway overflow-hidden bg-[#8fd3f4] lg:hidden"
        >
          {/* El fondo cubre toda la pantalla (también detrás del header, así
              nunca asoma la página); el contenido arranca debajo del header */}
          <div className="absolute inset-x-0 bottom-0 top-[75px] sm:top-[83px]">
            <img
              src={cloud}
              alt=""
              aria-hidden="true"
              className="simpsons-menu__cloud left-[-40px] top-10 w-40"
            />
            <img
              src={cloud}
              alt=""
              aria-hidden="true"
              className="simpsons-menu__cloud simpsons-menu__cloud--2 right-[-30px] top-1/2 w-32"
            />
            <span aria-hidden="true" className="simpsons-menu__donut" />

            <div className="relative flex h-full flex-col px-6 pb-8 pt-8">
              <p
                className="simpsons-menu__item self-start rounded-full border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.25em] text-black shadow-[3px_3px_0_#000]"
                style={{ "--i": 0 } as React.CSSProperties}
              >
                📺 {t("simpsons.nav.menuTitle")}
              </p>

              <nav
                className="mt-8 flex flex-col items-start gap-4"
                aria-label={t("simpsons.nav.menu")}
              >
                {SIMPSONS_SECTIONS.map((id, i) => (
                  <div
                    key={id}
                    className={`simpsons-menu__item ${MENU_TILTS[i % MENU_TILTS.length]}`}
                    style={{ "--i": i + 1 } as React.CSSProperties}
                  >
                    <button
                      type="button"
                      onClick={() => goTo(id)}
                      aria-current={active === id ? "true" : undefined}
                      className={`simpsons-btn flex items-center gap-3 rounded-2xl border-[3px] border-black px-5 py-3 text-left text-black ${
                        MENU_COLORS[i % MENU_COLORS.length]
                      }`}
                    >
                      <span className="rounded-md bg-black px-1.5 py-0.5 font-Raleway text-[10px] font-black tracking-wider text-[#ffd90f]">
                        CH {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-RockSalt text-2xl leading-tight">
                        {t(`simpsons.nav.${id}`)}
                      </span>
                      {active === id && (
                        <span className="ml-1 flex items-center gap-1 rounded-full bg-[#ff3b3b] px-2 py-0.5 text-[10px] font-black uppercase text-white">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                          {t("simpsons.nav.onAir")}
                        </span>
                      )}
                    </button>
                  </div>
                ))}
              </nav>

              <div className="mt-auto flex items-center gap-3">
                <div
                  className="simpsons-menu__item"
                  style={{ "--i": 4 } as React.CSSProperties}
                >
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="simpsons-btn rounded-full border-[3px] border-black bg-[#ff3b3b] px-5 py-2.5 font-black text-white"
                  >
                    {t("simpsons.nav.exit")}
                  </button>
                </div>
                <a
                  href="https://github.com/Braydarak"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  style={{ "--i": 5 } as React.CSSProperties}
                  className="simpsons-menu__item simpsons-btn ml-auto flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-black bg-white [&_svg]:w-5"
                >
                  <GithubLogo width="20" color="black" />
                </a>
                <a
                  href="https://www.linkedin.com/in/briandarakdjian/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  style={{ "--i": 6 } as React.CSSProperties}
                  className="simpsons-menu__item simpsons-btn flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-black bg-white [&_svg]:w-5"
                >
                  <LinkedInLogo width="20" color="black" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      <header className="fixed inset-x-0 top-0 z-40 border-b-[3px] border-black bg-[#00a59e] font-Raleway">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-[72px] sm:px-6">
          <div className="hidden items-center gap-1 lg:flex">{links}</div>

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <a
              href="https://github.com/Braydarak"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hidden transition-transform hover:-translate-y-0.5 lg:block [&_svg]:w-6"
            >
              <GithubLogo width="24" />
            </a>
            <a
              href="https://www.linkedin.com/in/briandarakdjian/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hidden transition-transform hover:-translate-y-0.5 lg:block [&_svg]:w-6"
            >
              <LinkedInLogo width="24" />
            </a>
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label={
                i18n.language === "es"
                  ? "Switch to English"
                  : "Cambiar a español"
              }
              className="simpsons-btn rounded-full border-2 border-black bg-white px-3 py-1 text-sm font-black text-black"
            >
              <span
                className={
                  i18n.language === "es" ? "text-black" : "text-black/35"
                }
              >
                ES
              </span>
              <span className="text-black/35">/</span>
              <span
                className={
                  i18n.language === "en" ? "text-black" : "text-black/35"
                }
              >
                EN
              </span>
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="simpsons-btn hidden rounded-full border-2 border-black bg-[#ffd90f] px-4 py-1 text-sm font-black text-black sm:block"
            >
              {t("simpsons.nav.exit")}
            </button>
            <button
              type="button"
              ref={menu.toggleRef}
              onClick={menu.toggle}
              aria-expanded={menu.isOpen}
              aria-controls="simpsons-mobile-menu"
              aria-label={t("simpsons.nav.menu")}
              className={`simpsons-btn flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-full border-2 border-black transition-colors duration-200 lg:hidden ${
                menu.isOpen ? "bg-[#ffd90f]" : "bg-white"
              }`}
            >
              <span
                className={`h-0.5 w-4 rounded bg-black transition-transform duration-200 ${
                  menu.isOpen ? "translate-y-1 rotate-45" : ""
                }`}
              />
              <span
                className={`h-0.5 w-4 rounded bg-black transition-transform duration-200 ${
                  menu.isOpen ? "-translate-y-1 -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </nav>

        {/* Barra de progreso: dona glaseada con chispitas */}
        <div className="h-2 w-full bg-[#c98a4b]">
          <div
            className="simpsons-sprinkles h-full origin-left border-r-2 border-black bg-[#ff7eb6]"
            ref={progressRef}
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </header>
    </>
  );
};

export default SimpsonsNav;
