import React, { useEffect, useRef, useState } from "react";
import { useScrollProgress } from "../../../hooks/useScrollProgress";
import { useTranslation } from "react-i18next";
import { useTransitionNavigate } from "../../../components/pageTransition/context";
import { useMobileMenu } from "../../../hooks/useMobileMenu";
import ScrambleText from "./ScrambleText";
import { MATRIX_SECTIONS, MatrixSection, scrollToSection } from "./sections";

// Columnas de caracteres que caen detrás del menú
const RAIN = [
  "アカサタナ01ハマ",
  "10ヤラワ<>/ガ",
  "ザダバ{}#$パ",
  "ン01ヲゲゼデ",
  "ベペ*+=ギジ",
  "ヂビピ%&01",
];

const MatrixNav = () => {
  const { t, i18n } = useTranslation();
  const navigate = useTransitionNavigate();
  const [active, setActive] = useState<MatrixSection>("home");
  const progressRef = useRef<HTMLDivElement>(null);
  useScrollProgress(progressRef);
  const menu = useMobileMenu(420, 768);

  // Resalta la sección que ocupa el centro de la pantalla
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id.replace("matrix-", "") as MatrixSection);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    MATRIX_SECTIONS.forEach((id) => {
      const el = document.getElementById(`matrix-${id}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const goTo = (id: MatrixSection) => {
    menu.close(false);
    scrollToSection(id);
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "es" ? "en" : "es");
  };

  const links = MATRIX_SECTIONS.map((id) => (
    <button
      key={id}
      type="button"
      onClick={() => goTo(id)}
      aria-current={active === id ? "true" : undefined}
      className={`px-2 py-1 text-left transition-colors duration-200 hover:text-[#d1ffd9] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00ff41] ${
        active === id
          ? "text-[#00ff41] [text-shadow:0_0_8px_#00ff41]"
          : "text-[#00ff41]/55"
      }`}
    >
      ./{t(`matrix.nav.${id}`)}
    </button>
  ));

  return (
    <>
      {/* Menú del celular: una terminal que se despliega con lluvia de código */}
      {menu.mounted && (
        <div
          ref={menu.panelRef}
          id="matrix-mobile-menu"
          data-state={menu.state}
          className="matrix-menu fixed inset-0 z-30 font-IBM overflow-hidden bg-black md:hidden"
        >
          {/* El fondo cubre toda la pantalla (también detrás del header, así
              nunca asoma la página); el contenido arranca debajo del header */}
          <div className="absolute inset-x-0 bottom-0 top-[66px]">
            <div aria-hidden="true" className="matrix-menu__rain">
              {RAIN.map((col, i) => (
                <span key={i} style={{ "--col": i } as React.CSSProperties}>
                  {col}
                </span>
              ))}
            </div>
            <div aria-hidden="true" className="matrix-menu__scan" />

            <div className="relative flex h-full flex-col px-5 pb-8 pt-6">
              <p
                className="matrix-menu__line text-xs text-[#00ff41]/60"
                style={{ "--i": 0 } as React.CSSProperties}
              >
                root@matrix:~$ <span className="text-[#d1ffd9]">ls ./menu</span>
              </p>

              <nav
                className="mt-6 flex flex-col gap-1"
                aria-label={t("matrix.nav.menu")}
              >
                {MATRIX_SECTIONS.map((id, i) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => goTo(id)}
                    aria-current={active === id ? "true" : undefined}
                    style={{ "--i": i + 1 } as React.CSSProperties}
                    className={`matrix-menu__line group flex items-baseline gap-3 border-l-2 px-3 py-3 text-left text-2xl font-bold transition-colors focus:outline-none focus-visible:bg-[#00ff41]/10 ${
                      active === id
                        ? "border-[#00ff41] bg-[#00ff41]/[0.07] text-[#00ff41] [text-shadow:0_0_10px_#00ff41]"
                        : "border-[#00ff41]/20 text-[#00ff41]/70 hover:text-[#00ff41]"
                    }`}
                  >
                    <span className="w-7 text-xs font-normal text-[#00ff41]/40">
                      0{i + 1}
                    </span>
                    <ScrambleText
                      text={`./${t(`matrix.nav.${id}`)}`}
                      duration={500}
                      delay={140 + i * 90}
                    />
                    {active === id && (
                      <span className="ml-auto text-xs font-normal text-[#00ff41]/70">
                        ● {t("matrix.nav.here")}
                      </span>
                    )}
                  </button>
                ))}
              </nav>

              <div className="mt-auto">
                <p
                  className="matrix-menu__line text-[11px] uppercase tracking-[0.3em] text-[#00ff41]/50"
                  style={{ "--i": 4 } as React.CSSProperties}
                >
                  {t("matrix.nav.pill")}
                </p>
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  style={{ "--i": 5 } as React.CSSProperties}
                  className="matrix-menu__line mt-3 flex w-full items-center justify-center gap-3 rounded-full border border-red-500 bg-red-600/90 px-6 py-3 font-bold text-white shadow-[0_0_20px_rgba(239,68,68,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
                >
                  <span className="h-3 w-6 rounded-full bg-gradient-to-r from-red-300 to-red-700 shadow-inner" />
                  {t("matrix.nav.exit")}
                </button>
                <p
                  className="matrix-menu__line mt-6 text-xs text-[#00ff41]/50"
                  style={{ "--i": 6 } as React.CSSProperties}
                >
                  &gt; <span className="matrix-menu__cursor">_</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <header className="fixed top-0 inset-x-0 z-40 border-b border-[#00ff41]/20 bg-black font-IBM">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="hidden items-center gap-2 text-sm md:flex">
            {links}
          </div>

          <div className="ml-auto flex items-center gap-2 text-xs sm:text-sm">
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label={
                i18n.language === "es"
                  ? "Switch to English"
                  : "Cambiar a español"
              }
              className="border border-[#00ff41]/40 px-2 py-1 text-[#00ff41] transition-colors hover:bg-[#00ff41]/10 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00ff41]"
            >
              <span
                className={
                  i18n.language === "es"
                    ? "text-[#00ff41]"
                    : "text-[#00ff41]/40"
                }
              >
                ES
              </span>
              <span className="text-[#00ff41]/40">/</span>
              <span
                className={
                  i18n.language === "en"
                    ? "text-[#00ff41]"
                    : "text-[#00ff41]/40"
                }
              >
                EN
              </span>
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="hidden border border-[#00ff41]/40 px-3 py-1 text-[#00ff41] transition-colors hover:bg-[#00ff41] hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00ff41] sm:block"
            >
              {t("matrix.nav.exit")}
            </button>
            <button
              type="button"
              ref={menu.toggleRef}
              onClick={menu.toggle}
              aria-expanded={menu.isOpen}
              aria-controls="matrix-mobile-menu"
              aria-label={t("matrix.nav.menu")}
              className={`flex h-8 w-8 flex-col items-center justify-center gap-1.5 border transition-colors duration-300 md:hidden ${
                menu.isOpen
                  ? "border-[#00ff41] bg-[#00ff41]/10 shadow-[0_0_10px_rgba(0,255,65,0.5)]"
                  : "border-[#00ff41]/40"
              }`}
            >
              <span
                className={`h-px w-4 bg-[#00ff41] transition-transform duration-200 ${
                  menu.isOpen ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-4 bg-[#00ff41] transition-transform duration-200 ${
                  menu.isOpen ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </nav>

        <div
          className="h-px origin-left bg-[#00ff41] shadow-[0_0_8px_#00ff41]"
          ref={progressRef}
          style={{ transform: "scaleX(0)" }}
        />
      </header>
    </>
  );
};

export default MatrixNav;
