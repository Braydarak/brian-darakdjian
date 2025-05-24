import Publifer from "../../assets/publifer.webp";
import Manduca from "../../assets/manduca-logo.avif";
import GIED from "../../assets/gied.png";
import AlmangoLogo from "../../assets/almango.avif";
import NuriaIturriozLogo from "../../assets/NuriaLogo.ok_.avif";
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
      className="relative bg-yellow-100 border-4 border-black shadow-md hover:scale-105 transition-transform duration-300 ease-out p-4 rounded-xl w-full sm:w-80 md:w-96 mx-auto"
      id="work"
    >
      <div className="relative">
        {typeof image === "string" ? (
          <img
            src={image}
            alt={title}
            className="rounded-md border-4 border-black w-full h-60 object-contain mb-3 p-2 bg-white"
          />
        ) : (
          <div className="rounded-md border-4 border-black w-full h-60 flex items-center justify-center mb-3 bg-white p-4">
            <div className="max-h-full max-w-full flex items-center justify-center">
              {image}
            </div>
          </div>
        )}

        {inProgress && (
          <div className="absolute top-2 right-2 group z-10">
            <div
              ref={hammerRef}
              className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-black flex items-center justify-center shadow-lg transition-transform group-hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.232 5.232l3.536 3.536M9 11l3 3m6-6l-3 3M5 19l4-4"
                />
              </svg>
            </div>
            <div className="absolute right-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-black text-yellow-300 text-sm font-bold px-3 py-1 rounded-lg transition-opacity duration-300 shadow-md whitespace-nowrap">
                      {t("inProgress")}

            </div>
          </div>
        )}
      </div>

      <h3 className="font-rocksalt text-2xl text-blue-900">{title}</h3>
      <p className="text-black font-medium mt-2">{description}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-4 bg-red-500 text-white font-bold px-4 py-2 rounded-full shadow-sm hover:bg-red-600 transition"
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
    },
    {
      title: "Almango",
      description: t("almangoDesc"),
      image: AlmangoLogo,
      link: "https://www.almango.com.ar/",
    },
    {
      title: "Nuria Iturrioz",
      description: t("nuriaDesc"),
      image: NuriaIturriozLogo,
      link: "https://nuriaiturrioz.com/",
    },
    {
      title: "Manduca Proteina",
      description: t("manducaDesc"),
      image: Manduca,
      link: "https://manducaproteina.com/",
    },
    {
      title: "GIED",
      description: t("giedDesc"),
      image: GIED,
      link: "https://gied.vercel.app/",
      inProgress: true,
    },
  ];

  return (
    <div className="relative w-full py-24 px-6" id="work">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-RockSalt font-bold text-yellow-400 drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
          {t("headerWork")}
        </h2>
        <p className="text-xl text-black mt-8 font-raleway">
          {t("worksSubtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
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
    </div>
  );
};

export default Work;
