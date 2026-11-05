import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useBodyBackground, useReveal } from "../../hooks/useReveal";
import { BackgroundClouds } from "../../components/backgroundClouds";
import SimpsonsIntro from "../../components/simpsonsIntro";
import GithubLogo from "../../components/githubLogo";
import LinkedInLogo from "../../components/linkedInLogo";
import SimpsonsNav from "./components/SimpsonsNav";
import SimpsonsHero from "./components/SimpsonsHero";
import SimpsonsWork from "./components/SimpsonsWork";
import SimpsonsContact from "./components/SimpsonsContact";

const Simpsons = () => {
  const { t } = useTranslation();
  const rootRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  // Las apariciones arrancan recién cuando se ve el sitio
  useReveal(rootRef, revealed);
  useBodyBackground("#bae6fd");

  const onReveal = useCallback(() => setRevealed(true), []);
  const onFinish = useCallback(() => setIntroDone(true), []);

  return (
    <main
      ref={rootRef}
      className="simpsons-page relative min-h-screen-safe w-full overflow-x-hidden text-black"
    >
      {!introDone && <SimpsonsIntro onReveal={onReveal} onFinish={onFinish} />}
      <BackgroundClouds />

      {/* El contenido se monta desde el principio pero invisible: así el
          layout de toda la página se calcula durante la carga y no justo
          en el fundido final de la intro (donde provocaba un tirón) */}
      <div
        className={`relative z-10 ${revealed ? "simpsons-fade-in" : "invisible"}`}
        aria-hidden={!revealed}
      >
        <SimpsonsNav />
        <SimpsonsHero ready={revealed} />
        <SimpsonsWork />
        <SimpsonsContact />

        <footer className="border-t-[3px] border-black bg-[#00a59e] px-4 py-8 font-Raleway sm:px-6">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-sm font-bold text-white">
              {t("simpsons.footer.madeBy")}{" "}
              <span className="font-RockSalt text-[#ffd90f] [text-shadow:2px_2px_0_#000]">
                Brian Darakdjian
              </span>
              <span className="block text-xs font-semibold text-white/70">
                © {new Date().getFullYear()} · {t("simpsons.footer.rights")}
              </span>
            </p>
            <div className="flex items-center gap-5">
              <a
                href="https://github.com/Braydarak"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="transition-transform hover:-translate-y-0.5"
              >
                <GithubLogo width="26" />
              </a>
              <a
                href="https://www.linkedin.com/in/briandarakdjian/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="transition-transform hover:-translate-y-0.5"
              >
                <LinkedInLogo width="26" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
};

export default Simpsons;
