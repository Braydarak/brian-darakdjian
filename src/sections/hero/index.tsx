import { useTranslation } from "react-i18next";
import Brian from "../../assets/brian.avif";
import CV from "../../assets/brian-darakdjian-cv.pdf";

const Hero = () => {

    const { t } = useTranslation();
  

  return (
    <section className="w-full min-h-screen-safe flex items-center justify-center overflow-hidden px-4 mt-10">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 mt-32 lg:gap-10 items-center">
        {/* Text Section */}
        <div className="flex flex-col gap-4 sm:gap-6 text-black mt-4 md:mt-0 order-2 md:order-1">
          <h1 className="text-yellow-400 font-RockSalt drop-shadow-[2px_2px_0_rgba(0,0,0,1)] text-center md:text-left uppercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-pretty tracking-wide sm:tracking-widest leading-tight sm:leading-relaxed md:leading-[1.2] lg:leading-[1.3] xl:leading-[1.5] mt-8 sm:mt-12 md:mt-0">
            Brian Darakdjian
          </h1>
          <p className="font-RockSalt text-xl sm:text-2xl md:text-3xl text-black/80 text-center md:text-left">
            {t("developer")} <span className="text-secondary font-bold">{t("web")}</span>
          </p>
          <div className="mt-6 text-center md:text-left">
            <a
              href={CV}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-secondary text-white px-6 sm:px-8 md:px-12 py-3 sm:py-4 rounded-full shadow-md hover:scale-105 transition-transform duration-300 text-sm sm:text-base font-semibold"
            >
              {t("moreAbout")}
            </a>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex justify-center items-center order-1 md:order-2">
          <img
            src={Brian}
            alt="Foto de Brian"
            className="w-[250px] sm:w-[300px] md:w-[350px] lg:w-[400px] rounded-full shadow-xl border-4 border-white bg-white"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;