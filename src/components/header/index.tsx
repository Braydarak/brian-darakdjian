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
    <div className="bg-secondary w-full flex items-center justify-between max-h-[70px] min-h-[50px] fixed top-0 rounded-b-lg p-4 md:w-[80%]">
      <h1 className="font-Raleway w-full text-lg md:hidden">
        Brian Darakdjian
      </h1>
      <div className="md:hidden flex justify-end items-center w-full">
        <button onClick={changeLanguage}>
          <TranslateLogo />
        </button>
        <button onClick={toggleMenu} className="text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#9C9C9C"
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

      {/* Menú desplegable en mobile */}
      {isMenuOpen && (
        <div
          className={`absolute top-12 left-0 w-full justify-around bg-secondary z-10 flex flex-col items-center pt-5 transition-all duration-300 ease-in-out opacity-100`}
        >
          <Link to={"/"} onClick={toggleMenu} className="mb-2">
            <span className="cursor-pointer p-2 duration-300 transition-colors hover:text-white">
              {t("headerHome")}
            </span>
          </Link>
          <Link to={"/lastwork"} onClick={toggleMenu} className="mb-2">
            <span className="cursor-pointer p-2 duration-300 transition-colors hover:text-white">
              {t("headerLastwork")}
            </span>
          </Link>
          <Link to={"/getintouch"} onClick={toggleMenu} className="mb-2">
            <span className="cursor-pointer p-2 duration-300 transition-colors hover:text-white">
              {t("headerGetintouch")}
            </span>
          </Link>
          <div className="h-[1px] bg-grayFont w-[60%] mt-5"></div>
          <div className="flex items-center justify-around w-full pt-5 pb-5">
            <Link to={"https://github.com/Braydarak"} onClick={toggleMenu}>
              <GithubLogo />
            </Link>
            <Link
              to={"https://www.linkedin.com/in/briandarakdjian/"}
              onClick={toggleMenu}
            >
              <LinkedInLogo />
            </Link>
          </div>
        </div>
      )}

      {/* Menú de desktop */}
      <div className="hidden md:flex justify-around w-[60%] h-full items-center text-sm text-grayFont">
        <Link to={"/"}>
          <span className="cursor-pointer duration-300 transition-colors hover:text-white">
            {t("headerHome")}
          </span>
        </Link>
        <Link to={"/lastwork"}>
          <span className="cursor-pointer duration-300 transition-colors hover:text-white">
            {t("headerLastwork")}
          </span>
        </Link>
        <Link to={"/getintouch"}>
          <span className="cursor-pointer duration-300 transition-colors hover:text-white">
            {t("headerGetintouch")}
          </span>
        </Link>
      </div>

      <div className="hidden md:flex items-center justify-around">
        <Link to={"https://github.com/Braydarak"}>
          <GithubLogo />
        </Link>
        <Link to={"https://www.linkedin.com/in/briandarakdjian/"}>
          <LinkedInLogo />
        </Link>
        <button onClick={changeLanguage}>
          <TranslateLogo />
        </button>
      </div>
    </div>
  );
};

export default Header;