import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import cloud from "../../assets/cloud.svg";
import simpsonsLogo from "../../assets/The-Simpsons.png";

type SimpsonsIntroProps = {
  onFinish: () => void;
};

const HOTSPOT = {
  xPercent: 50,
  yPercent: 60,
};

const SimpsonsIntro: React.FC<SimpsonsIntroProps> = ({ onFinish }) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const cloudLeftRef = useRef<HTMLImageElement | null>(null);
  const cloudRightRef = useRef<HTMLImageElement | null>(null);
  const logoRef = useRef<HTMLImageElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const overlay = overlayRef.current;
    const cloudLeft = cloudLeftRef.current;
    const cloudRight = cloudRightRef.current;
    const logo = logoRef.current;

    if (!overlay || !cloudLeft || !cloudRight || !logo) {
      onFinish();
      return;
    }

    const startAnimation = () => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tlRef.current = tl;

      // Estados iniciales
      gsap.set([cloudLeft, cloudRight], { opacity: 0, scale: 1.12, y: -40 });
      gsap.set(logo, { opacity: 0, y: 30, scale: 0.08, x: 0 });

      // 1) Aparición de nubes
      tl.to([cloudLeft, cloudRight], { opacity: 1, duration: 0.6, stagger: 0.16 });

      // 2) Separación de nubes
      tl.to(cloudLeft, { x: "-80vw", duration: 1.3, ease: "power2.inOut" }, "<");
      tl.to(cloudRight, { x: "80vw", duration: 1.3, ease: "power2.inOut" }, "<");

      // 3) Aparición del logo desde muy pequeño y crecimiento continuo
      tl.to(logo, { opacity: 1, y: 0, scale: 0.92, duration: 1.2, ease: "power2.out" }, "-=0.2");
      tl.to({}, { duration: 0.15 });

      // 4) Zoom centrado en la "P" continuando el crecimiento
      const rect = logo.getBoundingClientRect();
      const hotspotX = rect.left + (rect.width * HOTSPOT.xPercent) / 100;
      const hotspotY = rect.top + (rect.height * HOTSPOT.yPercent) / 100;
      const viewportCenterX = window.innerWidth / 2;
      const viewportCenterY = window.innerHeight / 2;
      const dx = viewportCenterX - hotspotX;
      const dy = viewportCenterY - hotspotY;

      tl.to(logo, {
        transformOrigin: `${HOTSPOT.xPercent}% ${HOTSPOT.yPercent}%`,
        x: `+=${dx}`,
        y: `+=${dy}`,
        scale: 7.5,
        duration: 1.9,
        ease: "power3.in",
      });

      // 5) Fade del overlay y mostrar sitio
      tl.to(overlay, { opacity: 0, duration: 0.6, ease: "power2.out" });
      tl.add(() => onFinish());
    };

    if (logo.complete) {
      startAnimation();
    } else {
      logo.onload = () => startAnimation();
    }

    return () => {
      document.body.style.overflow = prevOverflow;
      tlRef.current?.kill();
    };
  }, [onFinish]);

  const skipIntro = () => {
    if (tlRef.current) {
      tlRef.current.progress(1);
    } else {
      onFinish();
    }
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-20 bg-sky-200/95 backdrop-blur-[1px] flex items-center justify-center overflow-hidden"
    >
      <button
        onClick={skipIntro}
        className="absolute top-4 right-4 px-4 py-2 rounded-full bg-black/70 text-white text-sm shadow-lg hover:bg-black/80 transition"
        aria-label="Saltar intro"
      >
        Saltar
      </button>

      <img
        ref={cloudLeftRef}
        src={cloud}
        alt="cloud-left"
        className="absolute left-[-10vw] top-[10vh] w-[65vw] max-w-[720px] opacity-90"
      />
      <img
        ref={cloudRightRef}
        src={cloud}
        alt="cloud-right"
        className="absolute right-[-10vw] top-[16vh] w-[65vw] max-w-[720px] opacity-80 rotate-180"
      />
      <img
        ref={logoRef}
        src={simpsonsLogo}
        alt="The Simpsons"
        className="relative w-[72vw] max-w-[760px] drop-shadow-[4px_6px_0_rgba(0,0,0,0.35)]"
      />
    </div>
  );
};

export default SimpsonsIntro;