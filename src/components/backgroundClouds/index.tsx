import cloud from "../../assets/cloud.svg";

// Nubes del cielo de fondo: un vaivén horizontal y un parallax con el scroll.
// Cada nube tiene sus propios keyframes con valores fijos (sin variables CSS),
// así el navegador las puede animar enteras en la GPU.
const CLOUDS = [
  { className: "hidden md:block top-10 left-10 w-60 opacity-80", dx: 30, py: -100, dur: 6 },
  { className: "hidden md:block top-32 right-0 w-72 opacity-70", dx: -40, py: -150, dur: 8 },
  { className: "hidden lg:block top-64 left-1/3 w-80 opacity-60", dx: 50, py: -120, dur: 10 },
  { className: "hidden lg:block top-[500px] right-[20%] w-64 opacity-75", dx: -30, py: -90, dur: 7 },
  { className: "hidden lg:block top-[700px] left-[5%] w-56 opacity-65", dx: 20, py: -60, dur: 9 },
  { className: "sm:hidden top-24 -left-16 w-36 opacity-70", dx: 14, py: -40, dur: 8 },
];

const KEYFRAMES = CLOUDS.map(
  (c, i) => `
@keyframes cloud-drift-${i} { to { transform: translate3d(${c.dx}px, 0, 0); } }
@keyframes cloud-parallax-${i} { to { transform: translate3d(0, ${c.py}px, 0); } }
.cloud-drift-${i} { animation: cloud-drift-${i} ${c.dur}s ease-in-out infinite alternate; }
@supports (animation-timeline: scroll()) {
  .cloud-parallax-${i} { animation: cloud-parallax-${i} linear both; animation-timeline: scroll(root); }
}`
).join("");

export const BackgroundClouds = () => (
  <div
    className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-sky-200"
    aria-hidden="true"
  >
    <style>{`@media (prefers-reduced-motion: no-preference) {${KEYFRAMES}}`}</style>
    {CLOUDS.map((c, i) => (
      <div key={c.className} className={`cloud-parallax-${i} absolute ${c.className}`}>
        <img src={cloud} alt="" className={`cloud-drift-${i} w-full`} />
      </div>
    ))}
  </div>
);
