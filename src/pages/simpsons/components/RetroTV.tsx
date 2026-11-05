import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Brian from "../../../assets/brian.avif";
import RealPhoto from "../../../components/realPhoto";

const CHANNELS = ["photo", "bars", "code"] as const;
type Channel = (typeof CHANNELS)[number];

const STATIC_MS = 350;

// Tele retro con la foto. Al tocarla "cambia de canal" con un flash de estática.
const RetroTV = ({ on }: { on: boolean }) => {
  const { t } = useTranslation();
  const [channel, setChannel] = useState<Channel>("photo");
  const [zapping, setZapping] = useState(false);
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const zap = () => {
    if (zapping) return;
    setZapping(true);
    timer.current = window.setTimeout(() => {
      setChannel((current) => CHANNELS[(CHANNELS.indexOf(current) + 1) % CHANNELS.length]);
      setZapping(false);
    }, STATIC_MS);
  };

  const channelNumber = CHANNELS.indexOf(channel) + 1;

  return (
    <figure className="flex flex-col items-center">
      {/* Antena */}
      <div className="relative h-12 w-40" aria-hidden="true">
        <span className="absolute bottom-0 left-1/2 h-14 w-1 origin-bottom -translate-x-1/2 -rotate-[28deg] rounded-full bg-black" />
        <span className="absolute bottom-0 left-1/2 h-12 w-1 origin-bottom -translate-x-1/2 rotate-[24deg] rounded-full bg-black" />
        <span className="absolute -bottom-2 left-1/2 h-5 w-12 -translate-x-1/2 rounded-t-full border-[3px] border-black bg-[#7b5aa6]" />
      </div>

      <button
        type="button"
        onClick={zap}
        aria-label={t("simpsons.hero.tvHint")}
        className="group relative flex w-[250px] gap-3 sm:w-[290px] rounded-[28px] border-[3px] border-black bg-[#a57fd1] p-3 shadow-[8px_8px_0_#000] transition-transform duration-200 hover:-rotate-1 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#ffd90f] active:translate-x-1 active:translate-y-1 active:shadow-[4px_4px_0_#000] sm:w-[360px] lg:w-[420px]"
      >
        {/* Pantalla */}
        <div className="relative aspect-[4/3] flex-1 overflow-hidden rounded-[22px] border-[3px] border-black bg-[#1d1d1d]">
          <div className={`absolute inset-0 ${on ? "simpsons-tv-on" : "opacity-0"}`}>
            {channel === "photo" && (
              <>
                <img
                  src={Brian}
                  alt="Brian Darakdjian"
                  className="h-full w-full bg-[#7fd3f7] object-cover object-top"
                />
                <RealPhoto className="object-[50%_30%]" />
              </>
            )}
            {channel === "bars" && (
              <div className="flex h-full w-full flex-col">
                <div className="flex flex-1">
                  {["#ffffff", "#ffd90f", "#2ee6e6", "#3fd14f", "#ff4fd8", "#ff3b3b", "#2f48ff"].map(
                    (color) => (
                      <span key={color} className="flex-1" style={{ background: color }} />
                    )
                  )}
                </div>
                <div className="flex h-1/4 items-center justify-center bg-black font-RockSalt text-sm text-white">
                  Brian TV
                </div>
              </div>
            )}
            {channel === "code" && (
              <div className="flex h-full w-full flex-col justify-center bg-[#0b2a3a] px-4 text-left font-IBM text-[11px] leading-relaxed text-[#9ef0ff] sm:text-sm">
                <span className="text-[#ffd90f]">const</span> brian = {"{"}
                <span className="pl-4">rol: "{t("simpsons.hero.role")}",</span>
                <span className="pl-4">stack: ["React", "TS", "Tailwind"],</span>
                <span className="pl-4">
                  donas: <span className="text-[#ff7eb6]">Infinity</span>,
                </span>
                {"};"}
              </div>
            )}
          </div>
          {zapping && <div className="simpsons-static absolute inset-0" />}
          <div className="simpsons-crt pointer-events-none absolute inset-0" />
          <span className="absolute right-3 top-2 font-IBM text-xs font-bold text-[#3fd14f] [text-shadow:0_0_4px_#3fd14f]">
            CH {String(channelNumber).padStart(2, "0")}
          </span>
        </div>

        {/* Panel lateral: perillas y parlante */}
        <div className="flex w-12 flex-col items-center justify-between py-2 sm:w-14" aria-hidden="true">
          <span className="h-8 w-8 rounded-full border-[3px] border-black bg-[#ffd90f] transition-transform duration-300 group-hover:rotate-90 sm:h-10 sm:w-10">
            <span className="mx-auto mt-0.5 block h-3 w-1 rounded bg-black" />
          </span>
          <span className="h-6 w-6 rounded-full border-[3px] border-black bg-[#ffd90f] sm:h-8 sm:w-8" />
          <span className="grid w-full gap-1">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="h-1 rounded bg-black/60" />
            ))}
          </span>
        </div>
      </button>

      {/* Patas */}
      <div className="flex w-48 justify-between px-4" aria-hidden="true">
        <span className="h-5 w-3 -skew-x-12 rounded-b border-[3px] border-t-0 border-black bg-[#7b5aa6]" />
        <span className="h-5 w-3 skew-x-12 rounded-b border-[3px] border-t-0 border-black bg-[#7b5aa6]" />
      </div>

      <figcaption className="mt-3 font-Raleway text-sm font-bold text-black/60">
        {t("simpsons.hero.tvHint")}
      </figcaption>
    </figure>
  );
};

export default RetroTV;
