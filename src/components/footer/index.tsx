import React from "react";
import { useTranslation } from "react-i18next";
import GithubLogo from "../githubLogo";
import LinkedInLogo from "../linkedInLogo";
import { gsap } from "gsap";

const Footer = () => {
    const { t } = useTranslation();
  const onIconEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const svg = e.currentTarget.querySelector("svg");
    if (svg) {
      gsap.to(svg, {
        y: -4,
        rotate: 8,
        scale: 1.08,
        duration: 0.2,
        ease: "power2.out",
        transformOrigin: "50% 50%",
      });
    }
  };

  const onIconLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const svg = e.currentTarget.querySelector("svg");
    if (svg) {
      gsap.to(svg, { y: 0, rotate: 0, scale: 1, duration: 0.2, ease: "power2.inOut" });
    }
  };
  return (
      <footer className="bg-[#00887f] text-yellow-400 font-comic-sans flex items-center lg:justify-between justify-center px-4 sm:px-6 lg:px-10 py-6 w-full shadow-inner select-none min-h-[80px]">
          <div className="text-white text-xs font-semibold opacity-90 select-text hidden lg:block">
                      {t("WebDevelopBy")} Brian Darakdjian
              
      </div>
      <div className="flex space-x-8">
        <a
          href="https://github.com/Braydarak"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-300 transition-colors duration-300"
          onMouseEnter={onIconEnter}
          onMouseLeave={onIconLeave}
          aria-label="GitHub"
        >
          <GithubLogo />
        </a>
        <a
          href="https://www.linkedin.com/in/briandarakdjian/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-300 transition-colors duration-300"
          onMouseEnter={onIconEnter}
          onMouseLeave={onIconLeave}
          aria-label="LinkedIn"
        >
          <LinkedInLogo />
        </a>
      </div>
    </footer>
  );
};

export default Footer;