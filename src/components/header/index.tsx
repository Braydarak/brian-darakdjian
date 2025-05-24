import { useState } from "react";
import { Link } from "react-router-dom";
import GithubLogo from "../githubLogo";
import LinkedInLogo from "../linkedInLogo";
import TranslateLogo from "../translateLogo";
import { useTranslation } from "react-i18next";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const changeLanguage = () => {
    const currentLanguage = i18n.language;
    const newLanguage = currentLanguage === "en" ? "es" : "en";
    i18n.changeLanguage(newLanguage);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-[#00a59e] rounded-b-lg shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center md:justify-between justify-end p-4 md:p-6">
        {/* Botones mobile */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={changeLanguage}
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
        <nav className="hidden md:flex space-x-10 items-center text-white font-raleway font-semibold text-lg">
          <a
            href="#top"
            className="hover:text-[#29BCB3] transition-colors duration-200 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            {t("headerHome")}
          </a>
          <a
            href="#work"
            className="hover:text-[#29BCB3] transition-colors duration-200 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              const target = document.querySelector("#work");
              if (target) {
                target.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            {t("headerWork")}
          </a>
          <a
            href="#contact"
            className="hover:text-[#29BCB3] transition-colors duration-200 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              const target = document.querySelector("#contact");
              if (target) {
                target.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            {t("headerGetintouch")}
          </a>
        </nav>

        {/* Redes y cambio idioma desktop */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to={"https://github.com/Braydarak"}
            className="hover:text-[#29BCB3] transition-colors duration-200"
            aria-label="GitHub"
            rel="noopener noreferrer"
            target="_blank"
          >
            <GithubLogo />
          </Link>
          <Link
            to={"https://www.linkedin.com/in/briandarakdjian/"}
            className="hover:text-[#29BCB3] transition-colors duration-200"
            aria-label="LinkedIn"
            rel="noopener noreferrer"
            target="_blank"
          >
            <LinkedInLogo />
          </Link>
          <button
            onClick={changeLanguage}
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
      {isMenuOpen && (
        <nav className="md:hidden bg-[#00a59e] border-t border-turquesa-65 shadow-inner rounded-b-lg flex flex-col items-center py-6 space-y-6 text-white font-raleway font-semibold text-lg z-40">
          <a
            href="#top"
            onClick={toggleMenu}
            className="hover:text-[#29BCB3] transition-colors duration-200"
          >
            {t("headerHome")}
          </a>
          <a
            href="#work"
            onClick={toggleMenu}
            className="hover:text-[#29BCB3] transition-colors duration-200"
          >
            {t("headerWork")}
          </a>
          <a
            href="#contact"
            onClick={toggleMenu}
            className="hover:text-[#29BCB3] transition-colors duration-200"
          >
            {t("headerGetintouch")}
          </a>

          <div className="flex space-x-8 mt-4">
            <Link
              to={"https://github.com/Braydarak"}
              onClick={toggleMenu}
              className="hover:text-[#29BCB3] transition-colors duration-200"
              aria-label="GitHub"
              rel="noopener noreferrer"
              target="_blank"
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
            >
              <LinkedInLogo />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
