import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Home from "./pages/home";
import "./index.css";
import "../src/i18n/i18n.js";
import Header from "./components/header/index.js";
import { BackgroundClouds } from "../src/components/backgroundClouds";
import Footer from "./components/footer/index.js";

import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SimpsonsIntro from "./components/simpsonsIntro/index.js";

const App: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.title = t("title");
  }, [i18n.language, t]);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      {showIntro && <SimpsonsIntro onFinish={() => setShowIntro(false)} />}
      <BackgroundClouds />
      <div className={`w-full flex flex-col md:items-center justify-center relative z-10 ${showIntro ? "opacity-0" : "opacity-100"} transition-opacity duration-500`}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
