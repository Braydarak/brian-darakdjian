import Publifer from "../../assets/publifer.webp";
import Manduca from "../../assets/manduca-logo.avif";
import GIED from "../../assets/gied.png";
import AlmangoLogo from "../../assets/almango.avif";
import NuriaIturriozLogo from "../../assets/NuriaLogo.ok_.avif";
import MANPOWERS from "../../assets/manPowersLogo.avif";
import TAMD from "../../assets/tamdCosmeticsLogo.avif";
import GREGAL from "../../assets/gregalPropertiesLogo.png";
import INEBAL from "../../assets/inebalLogo.png";
import BONAPEDRA from "../../assets/bonapedraLogo.avif";
import MANAGEMENT from "../../assets/mdmLogo.avif";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type WorkCardProps = {
  title: string;
  description: string;
  image: string | JSX.Element;
  link: string;
  inProgress?: boolean;
};

const WorkCard = ({ title, description, image, link, inProgress = false }: WorkCardProps) => {
  const hammerRef = useRef(null);

  useEffect(() => {
    if (inProgress && hammerRef.current) {
      gsap.to(hammerRef.current, {
        rotate: 10,
        yoyo: true,
        repeat: -1,
        duration: 0.3,
        ease: "sine.inOut",
        transformOrigin: "50% 50%",
      });
    }
  }, [inProgress]);

  return (
    <div
      className="relative bg-yellow-100 border-4 border-black shadow-md hover:scale-105 transition-transform duration-300 ease-out p-4 sm:p-6 rounded-xl w-full mx-auto flex flex-col h-full"
      id="work"
    >
      <div className="relative">
        {typeof image === "string" ? (
          <img
            src={image}
            alt={title}
            className="rounded-md border-4 border-black w-full h-48 sm:h-56 lg:h-60 object-contain mb-3 p-2 bg-white"
          />
        ) : (
          <div className="rounded-md border-4 border-black w-full h-48 sm:h-56 lg:h-60 flex items-center justify-center mb-3 bg-white p-4">
            <div className="max-h-full max-w-full flex items-center justify-center">
              {image}
            </div>
          </div>
        )}

        {inProgress && (
          <div className="absolute top-2 right-2 group z-10">
            <div
              ref={hammerRef}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-yellow-400 border-2 border-black flex items-center justify-center shadow-lg transition-transform group-hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 sm:w-5 sm:h-5 text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.232 5.232l3.536 3.536M9 11l3 3m6-6l-3 3M5 19l4-4"
                />
              </svg>
            </div>
            <div className="absolute right-10 sm:right-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-black text-yellow-300 text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded-lg transition-opacity duration-300 shadow-md whitespace-nowrap">
                      {t("inProgress")}

            </div>
          </div>
        )}
      </div>

      <h3 className="font-rocksalt text-lg sm:text-xl lg:text-2xl text-blue-900 leading-tight">{title}</h3>
      <p className="text-black font-medium mt-2 flex-grow text-sm sm:text-base leading-relaxed">{description}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-4 bg-red-500 text-white font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-sm hover:bg-red-600 transition self-start text-sm sm:text-base"
      >
        {t("viewSite")}
      </a>
    </div>
  );
};

const Work = () => {
  const { t } = useTranslation();

  const works = [
    {
      title: "Publifer",
      description: t("publiferDesc"),
      image: Publifer,
      link: "https://publifercm.com/",
      inProgress: false,
    },
    {
      title: "Almango",
      description: t("almangoDesc"),
      image: AlmangoLogo,
      link: "https://www.almango.com.ar/",
      inProgress: false,
    },
    {
      title: "Nuria Iturrioz",
      description: t("nuriaDesc"),
      image: NuriaIturriozLogo,
      link: "https://nuriaiturrioz.com/",
      inProgress: false,
    },
    {
      title: "Manduca Proteina",
      description: t("manducaDesc"),
      image: Manduca,
      link: "https://manducaproteina.com/",
      inProgress: false,
    },
    {
      title: "MAN Powers",
      description: t("manDesc"),
      image: MANPOWERS,
      link: "https://manpowers.es/",
      inProgress: false,
    },{
      title: "TAMD Cosmetics",
      description: t("tamdDesc"),
      image: TAMD,
      link: "https://tamdcosmetics.com/",
      inProgress: false,
    },
    {
      title: "Gregal Properties",
      description: t("gregalDesc"),
      image: GREGAL,
      link: "https://gregalproperties.com/",
      inProgress: false,
    },
    {
      title: "INEBAL",
      description: t("inebalDesc"),
      image: INEBAL,
      link: "https://inebal-web.vercel.app/",
      inProgress: true,
    },
    {
      title: "BONAPEDRA EXCAVACIONS",
      description: t("bonapedraDesc"),
      image: BONAPEDRA,
      link: "https://bona-pedra-excavacions-web.vercel.app/",
      inProgress: true,
    },
    {
      title: "MANAGEMENT & DEVELOPMENT MALLORCA",
      description: t("managementDesc"),
      image: MANAGEMENT,
      link: "https://mdm-web-iota.vercel.app/",
      inProgress: true,
    },
    {
      title: "GIED",
      description: t("giedDesc"),
      image: GIED,
      link: "https://gied.vercel.app/",
      inProgress: true,
    }

  ];

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6" id="work">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-RockSalt font-bold text-yellow-400 drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
          {t("headerWork")}
        </h2>
        <p className="text-lg sm:text-xl text-black mt-6 sm:mt-8 font-raleway max-w-3xl mx-auto">
          {t("worksSubtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 max-w-7xl mx-auto">
        {works.map((work, index) => (
          <WorkCard
            key={index}
            title={work.title}
            description={work.description}
            image={work.image}
            link={work.link}
            inProgress={work.inProgress}
          />
        ))}
      </div>
    </section>
  );
};

export default Work;
