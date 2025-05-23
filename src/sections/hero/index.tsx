import { useTranslation } from "react-i18next";
import Brian from "../../assets/brian.avif";

const Hero = () => {

    const { t } = useTranslation();
  

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden z-10 px-4">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Text Section */}
        <div className="flex flex-col gap-6 text-black">
          <h1 className="text-yellow-400 font-RockSalt drop-shadow-[2px_2px_0_rgba(0,0,0,1)]  text-center md:text-left uppercase text-4xl sm:text-6xl md:text-7xl font-bold text-pretty tracking-widest md:leading-[1.5]">
            Brian Darakdjian
          </h1>
          <p className="font-RockSalt text-2xl sm:text-3xl text-black/80 text-center md:text-left">
            {t("developer")} <span className="text-secondary font-bold">{t("web")}</span>
          </p>
          <div className="mt-4 text-center md:text-left">
            <button className="bg-secondary text-white px-[15%] py-4 rounded-full shadow-md hover:scale-105 transition-transform duration-300">
              {t("moreAbout")}
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex justify-center items-center">
          <img
            src={Brian}
            alt="Foto de Brian"
            className="w-[300px] sm:w-[350px] md:w-[400px] rounded-full shadow-xl border-4 border-white bg-white"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;