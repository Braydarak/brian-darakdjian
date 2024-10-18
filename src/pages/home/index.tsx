import { useEffect, useState } from "react";
import Header from "../../components/header";
import AlmangoLogo from "../../components/almangoLogo";
import NuriaIturriozLogo from "../../components/nuriaIturriozLogo";
import PubliferLogo from "../../components/publiferLogo";
import Brian from "../../assets/Brian.webp";
import { useTranslation } from "react-i18next";

const logos = [
  { id: 1, component: <PubliferLogo />, onClick: () => window.open("https://publifercm.com", "_blank") },
  { id: 2, component: <AlmangoLogo width="5rem" />, onClick: () => window.open("https://www.almango.com.ar/", "_blank") },
  { id: 3, component: <NuriaIturriozLogo />, onClick: () => window.open("https://nuriaiturrioz.com/", "_blank") },
];

const Home = () => {
  const [logoIndexes, setLogoIndexes] = useState([0, 1]); 
  const { t } = useTranslation();

// eslint-disable-next-line react-hooks/exhaustive-deps
const getNextLogoIndexes = () => {
  const [firstLogo, secondLogo] = logoIndexes;
  const newFirstIndex = (firstLogo + 1) % logos.length; 
  let newSecondIndex = (secondLogo + 1) % logos.length;

  if (newFirstIndex === newSecondIndex) {
    newSecondIndex = (newSecondIndex + 1) % logos.length;
  }

  return [newFirstIndex, newSecondIndex];
};

  useEffect(() => {
    const interval = setInterval(() => {
      setLogoIndexes(getNextLogoIndexes);
    }, 10000); 

    return () => clearInterval(interval);
  }, [getNextLogoIndexes, logoIndexes]);

  return (
    <div className="justify-center flex h-full w-full bg-black text-white overflow-hidden">
      <Header />
      <div className="w-full h-full flex flex-col items-baseline ml-0 md:ml-5 md:items-center justify-center">
        {/* Contenedor Principal */}
        <div className="md:w-[70%] w-[90%] h-[55%] items-baseline md:h-full md:grid md:grid-cols-2 flex md:ml-0 ml-5 md:items-center gap-8">
          {/* Sección de Texto */}
          <div className="flex flex-col">
            <h1 className="text-5xl font-bold font-Raleway hidden md:flex">
              Brian Darakdjian
            </h1>
            <p className="text-lg mt-0 md:mt-4 mb-8 font-IBM">
              {t("homeDescription")}
            </p>
            <button className="bg-primaryButton text-whiteFont py-3 px-6 w-[80%] md:w-[60%] rounded-lg shadow-custom hover:bg-shadowButton transition duration-300">
              {t("homeResume")}
            </button>
          </div>

          {/* Imagen */}
          <div className="justify-center md:flex hidden">
            <img
              src={Brian}
              alt="Brian Darakdjian"
              className="w-[350px] h-[350px] rounded-full object-cover"
            />
          </div>
        </div>

        {/* Logos de Empresas en Móvil */}
        <div className="w-[100%] fixed bottom-0 mb-20 items-center flex flex-col md:hidden">
          <span className="text-start w-full md:w-[70%] mb-5 ml-10">{t("homeWorked")}</span>
          <div className="flex space-x-4">
            <div
              className="w-[160px] h-[60px] rounded-md border-secondary border bg-cover flex justify-center items-center cursor-pointer"
              onClick={logos[logoIndexes[0]].onClick}
            >
              {logos[logoIndexes[0]].component}
            </div>
            <div
              className="w-[160px] h-[60px] rounded-md border-secondary border bg-cover flex justify-center items-center cursor-pointer"
              onClick={logos[logoIndexes[1]].onClick}
            >
              {logos[logoIndexes[1]].component}
            </div>
          </div>
        </div>

        {/* Logos de Empresas en Desktop */}
        <div className="hidden md:flex w-[100%] bottom-0 mb-20 items-center flex-col">
          <span className="text-start w-full md:w-[70%] mb-5">{t("homeWorked")}</span>
          <div className="flex space-x-6">
            {logos.map((logo) => (
              <div
                key={logo.id}
                className="w-[160px] h-[60px] rounded-md border-secondary border bg-cover flex justify-center items-center cursor-pointer"
                onClick={logo.onClick}
              >
                {logo.component}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;