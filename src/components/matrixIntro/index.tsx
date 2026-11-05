import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { lockScroll, unlockScroll } from "../../lib/smoothScroll";

type MatrixIntroProps = {
  onFinish: () => void;
};

const MatrixIntro: React.FC<MatrixIntroProps> = ({ onFinish }) => {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const fullText = "Wake up, Neo...";

  // Sin scroll mientras corre la intro
  useEffect(() => {
    lockScroll();
    return unlockScroll;
  }, []);

  useEffect(() => {
    let isActive = true;

    const startSequence = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      if (!isActive) return;

      for (let i = 0; i <= fullText.length; i++) {
        if (!isActive) return;
        setText(fullText.slice(0, i));
        const typingDelay = Math.random() * 100 + 50;
        await new Promise((resolve) => setTimeout(resolve, typingDelay));
      }

      if (!isActive) return;
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!isActive) return;
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (!isActive) return;
      setIsFadingOut(true);

      await new Promise((resolve) => setTimeout(resolve, 500));
      if (!isActive) return;
      setIsFinished(true);
      onFinish();
    };

    startSequence();

    // Lógica para parpadeo continuo del cursor
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    // Click, toque o cualquier tecla salta la intro
    const skip = () => {
      if (!isActive) return;
      isActive = false;
      setIsFinished(true);
      onFinish();
    };
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);

    return () => {
      isActive = false;
      clearInterval(cursorInterval);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [onFinish]);

  if (isFinished) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-black p-6 md:p-10 transition-opacity duration-500 ease-in-out ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="absolute top-6 left-6 md:top-10 md:left-10 font-mono text-base md:text-xl text-[#00ff41] text-shadow-[0_0_8px_#00ff41] text-left">
        {text}
        <span
          className={`inline-block w-2 md:w-3 h-4 md:h-5 bg-[#00ff41] ml-1 align-middle ${
            showCursor ? "opacity-100" : "opacity-0"
          }`}
          style={{ boxShadow: showCursor ? "0 0 8px #00ff41" : "none" }}
        />
      </div>
      <p className="absolute bottom-6 inset-x-0 text-center font-mono text-xs text-[#00ff41]/40">
        {t("matrix.intro.skip")}
      </p>
    </div>
  );
};

export default MatrixIntro;
