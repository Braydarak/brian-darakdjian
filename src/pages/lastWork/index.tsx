import { useState, useEffect } from "react";
import Header from "../../components/header";
import PubliferContact from "../../assets/publifer/Publifer-contact.webp";
import PubliferHome from "../../assets/publifer/Publifer-home.webp";
import PubliferAboutUs from "../../assets/publifer/Publifer-aboutus.webp";
import PubliferServices from "../../assets/publifer/Publifer-services.webp";
import PubliferCatalog from "../../assets/publifer/Publifer-catalog.webp";
import { useTranslation } from "react-i18next";

const images = [
  { src: PubliferHome, alt: "Publifer - Home" },
  { src: PubliferCatalog, alt: "Publifer - Catalogos" },
  { src: PubliferAboutUs, alt: "Publifer - Nosotros" },
  { src: PubliferServices, alt: "Publifer - Servicios" },
  { src: PubliferContact, alt: "Publifer - Contacto" },
];

const LastWork = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useTranslation();

  const handleVisitWebsite = () => {
    window.open("https://publifercm.com", "_blank");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const imagesToShow = [
    images[currentIndex],
    images[(currentIndex + 1) % images.length],
  ];

  return (
    <div className="flex flex-col items-center h-auto md:h-full w-full text-white md:mt-0 mt-20">
      <Header />
      <div className="flex flex-col items-center justify-center w-[80%] h-full p-4">
        <h1 className="text-xl md:text-2xl text-start mb-0 md:mb-4 w-full">
          {t("lastWorkTitle")}
        </h1>

        <div className="w-full flex flex-wrap items-center justify-center gap-4 mb-8 mt-8 md:mb-20 md:mt-20">
          {imagesToShow.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              className="w-full md:w-[400px] h-auto rounded-lg"
            />
          ))}
        </div>

        <div className="w-full flex flex-col items-end ">
          <span className="mb-4 text-sm md:text-base text-start">
            {t("lastworkDescription")}
          </span>
          <button
            className="bg-primaryButton mb-8 md:mb-0 text-whiteFont py-2 px-4 w-full md:w-[30%] rounded-lg shadow-custom hover:bg-shadowButton transition duration-300 mt-5"
            onClick={handleVisitWebsite}
          >
          {t("lastworkButton")}

          </button>
        </div>
      </div>
    </div>
  );
};

export default LastWork;
