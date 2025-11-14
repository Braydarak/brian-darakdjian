import React, { useState } from "react";
import { Link } from "react-router-dom";
import GithubLogo from "../githubLogo";
import LinkedInLogo from "../linkedInLogo";
import TranslateLogo from "../translateLogo";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const changeLanguage = (e?: React.MouseEvent<HTMLButtonElement>) => {
    const currentLanguage = i18n.language;
    const newLanguage = currentLanguage === "en" ? "es" : "en";
    i18n.changeLanguage(newLanguage);

    const svg = e?.currentTarget.querySelector("svg");
    if (svg) {
      gsap.timeline()
        .to(svg, { rotate: 12, scale: 1.08, duration: 0.12, ease: "power2.out", transformOrigin: "50% 50%" })
        .to(svg, { rotate: -12, duration: 0.12, ease: "power2.inOut" })
        .to(svg, { rotate: 0, scale: 1, duration: 0.18, ease: "back.out(2)" });
    }
  };

  const onIconEnter = (e: React.MouseEvent<HTMLAnchorElement | HTMLSpanElement>) => {
    const svg = (e.currentTarget as HTMLElement).querySelector("svg");
    if (svg) {
      gsap.to(svg, { y: -4, rotate: 8, scale: 1.08, duration: 0.2, ease: "power2.out", transformOrigin: "50% 50%" });
    }
  };

  const onIconLeave = (e: React.MouseEvent<HTMLAnchorElement | HTMLSpanElement>) => {
    const svg = (e.currentTarget as HTMLElement).querySelector("svg");
    if (svg) {
      gsap.to(svg, { y: 0, rotate: 0, scale: 1, duration: 0.2, ease: "power2.inOut" });
    }
  };

  const onNavEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const underline = e.currentTarget.querySelector<HTMLElement>(".nav-underline");
    if (underline) {
      gsap.to(underline, { opacity: 1, scaleX: 1, duration: 0.2, ease: "power2.out", transformOrigin: "left center" });
    }
  };

  const onNavLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const underline = e.currentTarget.querySelector<HTMLElement>(".nav-underline");
    if (underline) {
      gsap.to(underline, { opacity: 0, scaleX: 0, duration: 0.2, ease: "power2.inOut" });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-[#00a59e] rounded-b-lg shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center lg:justify-between justify-end p-4 lg:p-6">
        {/* Botones mobile */}
        <div className="lg:hidden flex items-center space-x-4">
          <button
            onClick={(e) => changeLanguage(e)}
            className={`p-2 rounded-full ${
              i18n.language === "en" ? "bg-purple-400" : "bg-turquesa-80"
            } hover:bg-turquesa-65 transition-colors shadow-md`}
            aria-label="Cambiar idioma"
          >
            <TranslateLogo />
          </button>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-full bg-turquesa-80 hover:bg-turquesa-65 transition-colors shadow-md"
            aria-label="Abrir menú"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Menú desktop */}
        <nav className="hidden lg:flex space-x-10 items-center text-white font-raleway font-semibold text-lg">
          <a
            href="#top"
            className="relative inline-block cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onMouseEnter={onNavEnter}
            onMouseLeave={onNavLeave}
          >
            <span className="inline-block">{t("headerHome")}</span>
            <span className="nav-underline block h-[2px] bg-yellow-400 opacity-0 transform scale-x-0 origin-left mt-1 w-full"></span>
          </a>
          <a
            href="#work"
            className="relative inline-block cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              const target = document.querySelector("#work");
              if (target) {
                target.scrollIntoView({ behavior: "smooth" });
              }
            }}
            onMouseEnter={onNavEnter}
            onMouseLeave={onNavLeave}
          >
            <span className="inline-block">{t("headerWork")}</span>
            <span className="nav-underline block h-[2px] bg-yellow-400 opacity-0 transform scale-x-0 origin-left mt-1 w-full"></span>
          </a>
          <a
            href="#contact"
            className="relative inline-block cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              const target = document.querySelector("#contact");
              if (target) {
                target.scrollIntoView({ behavior: "smooth" });
              }
            }}
            onMouseEnter={onNavEnter}
            onMouseLeave={onNavLeave}
          >
            <span className="inline-block">{t("headerGetintouch")}</span>
            <span className="nav-underline block h-[2px] bg-yellow-400 opacity-0 transform scale-x-0 origin-left mt-1 w-full"></span>
          </a>
        </nav>

        {/* Redes y cambio idioma desktop */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link
            to={"https://github.com/Braydarak"}
            className="hover:text-[#29BCB3] transition-colors duration-200"
            aria-label="GitHub"
            rel="noopener noreferrer"
            target="_blank"
            onMouseEnter={onIconEnter}
            onMouseLeave={onIconLeave}
          >
            <GithubLogo />
          </Link>
          <Link
            to={"https://www.linkedin.com/in/briandarakdjian/"}
            className="hover:text-[#29BCB3] transition-colors duration-200"
            aria-label="LinkedIn"
            rel="noopener noreferrer"
            target="_blank"
            onMouseEnter={onIconEnter}
            onMouseLeave={onIconLeave}
          >
            <LinkedInLogo />
          </Link>
          <button
            onClick={(e) => changeLanguage(e)}
            className={`p-2 rounded-full ${
              i18n.language === "en" ? " bg-[#2f64d6]" : "bg-turquesa-80"
            } hover:bg-turquesa-65 transition-colors shadow-md`}
            aria-label="Cambiar idioma"
          >
            <TranslateLogo />
          </button>
        </div>
      </div>

      {/* Menú desplegable móvil */}
      <nav className={`lg:hidden bg-[#00a59e] border-t border-turquesa-65 shadow-inner rounded-b-lg flex flex-col items-center text-white font-raleway font-semibold text-lg z-40 overflow-hidden transition-all duration-500 ease-in-out ${
        isMenuOpen 
          ? 'max-h-96 py-6 space-y-6 opacity-100' 
          : 'max-h-0 py-0 space-y-0 opacity-0'
      }`}>
          <a
            href="#top"
            onClick={toggleMenu}
            className={`relative inline-block transition-all duration-300 transform ${
              isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: isMenuOpen ? '100ms' : '0ms' }}
            onMouseEnter={onNavEnter}
            onMouseLeave={onNavLeave}
          >
            <span className="inline-block">{t("headerHome")}</span>
            <span className="nav-underline block h-[2px] bg-yellow-400 opacity-0 transform scale-x-0 origin-left mt-1 w-full"></span>
          </a>
          <a
            href="#work"
            onClick={toggleMenu}
            className={`relative inline-block transition-all duration-300 transform ${
              isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: isMenuOpen ? '200ms' : '0ms' }}
            onMouseEnter={onNavEnter}
            onMouseLeave={onNavLeave}
          >
            <span className="inline-block">{t("headerWork")}</span>
            <span className="nav-underline block h-[2px] bg-yellow-400 opacity-0 transform scale-x-0 origin-left mt-1 w-full"></span>
          </a>
          <a
            href="#contact"
            onClick={toggleMenu}
            className={`relative inline-block transition-all duration-300 transform ${
              isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: isMenuOpen ? '300ms' : '0ms' }}
            onMouseEnter={onNavEnter}
            onMouseLeave={onNavLeave}
          >
            <span className="inline-block">{t("headerGetintouch")}</span>
            <span className="nav-underline block h-[2px] bg-yellow-400 opacity-0 transform scale-x-0 origin-left mt-1 w-full"></span>
          </a>

          <div className={`flex space-x-8 mt-4 transition-all duration-300 transform ${
            isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          style={{ transitionDelay: isMenuOpen ? '400ms' : '0ms' }}>
            <Link
              to={"https://github.com/Braydarak"}
              onClick={toggleMenu}
              className="hover:text-[#29BCB3] transition-colors duration-200"
              aria-label="GitHub"
              rel="noopener noreferrer"
              target="_blank"
              onMouseEnter={onIconEnter}
              onMouseLeave={onIconLeave}
            >
              <GithubLogo />
            </Link>
            <Link
              to={"https://www.linkedin.com/in/briandarakdjian/"}
              onClick={toggleMenu}
              className="hover:text-[#29BCB3] transition-colors duration-200"
              aria-label="LinkedIn"
              rel="noopener noreferrer"
              target="_blank"
              onMouseEnter={onIconEnter}
              onMouseLeave={onIconLeave}
            >
              <LinkedInLogo />
            </Link>
          </div>
        </nav>
    </header>
  );
};

export default Header;
