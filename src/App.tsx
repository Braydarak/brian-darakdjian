import React, { useCallback, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import Simpsons from "./pages/simpsons";
import ExperienceSelection from "./pages/experienceSelection";
import Matrix from "./pages/matrix";
import StarWars from "./pages/starWars";
import "./index.css";
import "../src/i18n/i18n.js";

import { startSmoothScroll } from "./lib/smoothScroll";
import MatrixIntro from "./components/matrixIntro/index.js";
import { PageTransitionProvider } from "./components/pageTransition";

const AppShell: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const isMatrix = pathname === "/experience/matrix";

  // Simpsons y Star Wars manejan su propia intro dentro de la página.
  // La de Matrix se reproduce acá cada vez que se entra a la ruta.
  const [matrixIntro, setMatrixIntro] = useState(isMatrix);

  useEffect(() => {
    setMatrixIntro(isMatrix);
  }, [isMatrix]);

  const onFinishMatrixIntro = useCallback(() => setMatrixIntro(false), []);

  return (
    <>
      {matrixIntro && <MatrixIntro onFinish={onFinishMatrixIntro} />}
      <div
        className={`w-full flex flex-col md:items-center justify-center relative z-10 ${
          matrixIntro ? "opacity-0" : "opacity-100"
        } transition-opacity duration-500`}
      >
        <Routes>
          <Route path="/" element={<ExperienceSelection />} />
          <Route path="/experience/simpsons" element={<Simpsons />} />
          <Route path="/experience/matrix" element={<Matrix />} />
          <Route path="/experience/star-wars" element={<StarWars />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
};

const App: React.FC = () => {
  const { i18n, t } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.title = t("title");
  }, [i18n.language, t]);

  useEffect(() => startSmoothScroll(), []);

  return (
    <Router>
      <PageTransitionProvider>
        <AppShell />
      </PageTransitionProvider>
    </Router>
  );
};

export default App;
