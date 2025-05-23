import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import cloud from "../../assets/cloud.svg";

gsap.registerPlugin(ScrollTrigger);

export const BackgroundClouds = () => {
  const cloud1 = useRef<HTMLImageElement>(null);
  const cloud2 = useRef<HTMLImageElement>(null);
  const cloud3 = useRef<HTMLImageElement>(null);
  const cloud4 = useRef<HTMLImageElement>(null);
  const cloud5 = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const clouds = [
      { ref: cloud1, x: 30, y: -100, duration: 6 },
      { ref: cloud2, x: -40, y: -150, duration: 8 },
      { ref: cloud3, x: 50, y: -120, duration: 10 },
      { ref: cloud4, x: -30, y: -90, duration: 7 },
      { ref: cloud5, x: 20, y: -60, duration: 9 },
    ];

    clouds.forEach(({ ref, x, y, duration }) => {
      gsap.to(ref.current, {
        x,
        duration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(ref.current, {
        y,
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });
    });
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-sky-200 pointer-events-none">
      <img
        ref={cloud1}
        src={cloud}
        alt="cloud1"
        className="hidden md:block absolute top-10 left-10 w-60 opacity-80"
      />
      <img
        ref={cloud2}
        src={cloud}
        alt="cloud2"
        className="hidden md:block absolute top-32 right-0 w-72 opacity-70"
      />
      <img
        ref={cloud3}
        src={cloud}
        alt="cloud3"
        className="absolute top-64 left-1/3 w-80 opacity-60"
      />
      <img
        ref={cloud4}
        src={cloud}
        alt="cloud4"
        className="absolute top-[500px] right-[20%] w-64 opacity-75"
      />
      <img
        ref={cloud5}
        src={cloud}
        alt="cloud5"
        className="absolute top-[700px] left-[5%] w-56 opacity-65"
      />
    </div>
  );
};
