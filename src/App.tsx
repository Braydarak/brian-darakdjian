import React, { useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Home from "./pages/home";
import "./index.css";
import "../src/i18n/i18n.js";
import Header from "./components/header/index.js";
import { BackgroundClouds } from "../src/components/backgroundClouds";
import Footer from "./components/footer/index.js";

import Lenis from "@studio-freight/lenis";

const App: React.FC = () => {
  const { i18n, t } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.title = t("title");
  }, [i18n.language, t]);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <BackgroundClouds />
      <div className="w-full flex flex-col ml-0 md:ml-5 md:items-center justify-center relative z-10">
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
