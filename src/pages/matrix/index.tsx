import { useRef } from "react";
import { useBodyBackground, useReveal } from "../../hooks/useReveal";
import { useTranslation } from "react-i18next";
import MatrixRain from "./components/MatrixRain";
import MatrixNav from "./components/MatrixNav";
import MatrixHero from "./components/MatrixHero";
import MatrixWork from "./components/MatrixWork";
import MatrixContact from "./components/MatrixContact";

const Matrix = () => {
  const { t } = useTranslation();
  const rootRef = useRef<HTMLElement>(null);
  useReveal(rootRef);

  useBodyBackground("#000");

  return (
    <main
      ref={rootRef}
      className="matrix-page relative min-h-screen-safe w-full overflow-x-hidden bg-black font-IBM text-[#00ff41]"
    >
      <MatrixRain />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)]" />

      <MatrixNav />

      <div className="relative z-10">
        <MatrixHero />
        <MatrixWork />
        <MatrixContact />

        <footer className="border-t border-[#00ff41]/20 px-4 py-8 text-center text-xs text-[#00ff41]/50 sm:px-6">
          © {new Date().getFullYear()} Brian Darakdjian. {t("matrix.footer.rights")}
        </footer>
      </div>
    </main>
  );
};

export default Matrix;
