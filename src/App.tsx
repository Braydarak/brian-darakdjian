import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Home from './pages/home';
import LastWork from './pages/lastWork';
import Contact from './pages/contact';
import './index.css';
import '../src/i18n/i18n.js'; 

const App: React.FC = () => {
  const { i18n, t } = useTranslation(); 

  useEffect(() => {
   
    document.documentElement.lang = i18n.language;

    document.title = t('title');  
  }, [i18n.language, t]);

  return (
    <Router>
      <div className="w-full h-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/getintouch" element={<Contact />} />
          <Route path="/lastwork" element={<LastWork />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;