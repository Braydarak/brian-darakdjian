import { useTranslation } from "react-i18next";
import GithubLogo from "../githubLogo";
import LinkedInLogo from "../linkedInLogo";

const Footer = () => {
    const { t } = useTranslation();
  return (
      <footer className="bg-[#00887f] text-yellow-400 font-comic-sans flex items-center md:justify-between justify-center px-10 py-6 container mx-auto shadow-inner select-none min-h-[80px]">
          <div className="text-white text-xs font-semibold opacity-90 select-text hidden md:block">
                      {t("WebDevelopBy")} Brian Darakdjian
              
      </div>
      <div className="flex space-x-8">
        <a
          href="https://github.com/Braydarak"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-300 transition-colors duration-300"
          aria-label="GitHub"
        >
          <GithubLogo />
        </a>
        <a
          href="https://www.linkedin.com/in/briandarakdjian/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-300 transition-colors duration-300"
          aria-label="LinkedIn"
        >
          <LinkedInLogo />
        </a>
      </div>
    </footer>
  );
};

export default Footer;