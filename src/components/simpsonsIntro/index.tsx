import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { lockScroll, unlockScroll } from "../../lib/smoothScroll";
import cloud from "../../assets/cloud.svg";
import simpsonsLogo from "../../assets/The-Simpsons.png";

type SimpsonsIntroProps = {
  // Se llama cuando el sitio ya puede empezar a aparecer (durante el fundido)
  onReveal: () => void;
  // Se llama al terminar, para desmontar la intro
  onFinish: () => void;
};

// Punto del logo donde termina el zoom (en % del ancho y alto de la imagen)
const HOTSPOT = { xPercent: 50, yPercent: 60 };

const SimpsonsIntro: React.FC<SimpsonsIntroProps> = ({ onReveal, onFinish }) => {
  const { t } = useTranslation();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const cloudLeftRef = useRef<HTMLImageElement | null>(null);
  const cloudRightRef = useRef<HTMLImageElement | null>(null);
  const cloudBottomRef = useRef<HTMLImageElement | null>(null);
  const logoRef = useRef<HTMLImageElement | null>(null);
  const hintRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const clouds = [cloudLeftRef.current, cloudRightRef.current, cloudBottomRef.current];
    const logo = logoRef.current;

    let revealed = false;
    let finished = false;
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      onReveal();
    };
    const finish = () => {
      if (finished) return;
      finished = true;
      reveal();
      onFinish();
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!overlay || !logo || clouds.some((c) => !c) || reduceMotion) {
      finish();
      return;
    }

    lockScroll();

    let tl: gsap.core.Timeline | null = null;

    const startAnimation = () => {
      const [left, right, bottom] = clouds as HTMLImageElement[];
      tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // La nube derecha va espejada y la de abajo centrada (GSAP maneja el transform)
      gsap.set(left, { opacity: 0, scale: 1.15 });
      gsap.set(right, { opacity: 0, scaleX: -1.15, scaleY: 1.15 });
      gsap.set(bottom, { opacity: 0, scale: 1.15, xPercent: -50 });
      gsap.set(logo, { opacity: 0, y: 40, scale: 0.08 });

      // 1) Las nubes tapan el cielo
      tl.to(left, { opacity: 1, scale: 1, duration: 0.6 });
      tl.to(right, { opacity: 1, scaleX: -1, scaleY: 1, duration: 0.6 }, "<0.12");
      tl.to(bottom, { opacity: 1, scale: 1, duration: 0.6 }, "<0.12");

      // 2) Se abren hacia los costados y abajo
      tl.to(left, { x: "-75vw", y: "-8vh", rotate: -8, duration: 1.4, ease: "power2.inOut" }, "+=0.15");
      tl.to(right, { x: "75vw", y: "-4vh", rotate: 8, duration: 1.4, ease: "power2.inOut" }, "<");
      tl.to(bottom, { y: () => window.innerHeight, duration: 1.4, ease: "power2.inOut" }, "<");

      // 3) El logo sale desde el fondo con un rebote
      tl.to(logo, { opacity: 1, y: 0, scale: 1, duration: 1.3, ease: "back.out(1.6)" }, "-=0.9");
      tl.to({}, { duration: 0.35 });

      // 4) Zoom hacia el centro del logo
      tl.add(() => {
        if (!tl) return;
        const rect = logo.getBoundingClientRect();
        const dx = window.innerWidth / 2 - (rect.left + (rect.width * HOTSPOT.xPercent) / 100);
        const dy = window.innerHeight / 2 - (rect.top + (rect.height * HOTSPOT.yPercent) / 100);
        gsap.to(logo, {
          transformOrigin: `${HOTSPOT.xPercent}% ${HOTSPOT.yPercent}%`,
          x: `+=${dx}`,
          y: `+=${dy}`,
          scale: 8,
          duration: 1.6,
          ease: "power3.in",
        });
      });
      tl.to({}, { duration: 1.25 });

      // 5) El sitio aparece mientras la intro se desvanece
      tl.add(reveal);
      tl.to(overlay, { opacity: 0, duration: 0.6 });
      tl.add(finish);
    };

    const skip = () => {
      tl?.kill();
      gsap.killTweensOf(logo);
      reveal();
      gsap.to(overlay, { opacity: 0, duration: 0.35, onComplete: finish });
    };

    if (logo.complete && logo.naturalWidth > 0) startAnimation();
    else {
      logo.onload = startAnimation;
      logo.onerror = finish;
    }

    gsap.fromTo(hintRef.current, { opacity: 0 }, { opacity: 1, delay: 1, duration: 0.5 });
    window.addEventListener("keydown", skip, { once: true });
    window.addEventListener("pointerdown", skip, { once: true });

    return () => {
      unlockScroll();
      tl?.kill();
      gsap.killTweensOf([overlay, logo, ...clouds]);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [onReveal, onFinish]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-sky-200"
      role="presentation"
    >
      <img
        ref={cloudLeftRef}
        src={cloud}
        alt=""
        aria-hidden="true"
        className="absolute left-[-12vw] top-[6vh] w-[75vw] max-w-[820px] will-change-transform"
      />
      <img
        ref={cloudRightRef}
        src={cloud}
        alt=""
        aria-hidden="true"
        className="absolute right-[-12vw] top-[22vh] w-[75vw] max-w-[820px] will-change-transform"
      />
      <img
        ref={cloudBottomRef}
        src={cloud}
        alt=""
        aria-hidden="true"
        className="absolute bottom-[-8vh] left-1/2 w-[90vw] max-w-[960px] will-change-transform"
      />
      <img
        ref={logoRef}
        src={simpsonsLogo}
        alt=""
        aria-hidden="true"
        className="relative w-[78vw] max-w-[760px] will-change-transform"
      />
      <p
        ref={hintRef}
        className="absolute inset-x-0 bottom-6 text-center font-Raleway text-xs font-black uppercase tracking-[0.2em] text-black/50 opacity-0"
      >
        {t("simpsons.intro.skip")}
      </p>
    </div>
  );
};

export default SimpsonsIntro;
