// Estilos del visor de "película" para cada experiencia
export type FilmTheme = "matrix" | "starWars" | "simpsons";

type FilmStyles = {
  root: string;
  // Fondo de la barra fija de arriba
  bar: string;
  title: string;
  sceneTitle: string;
  accent: string;
  muted: string;
  body: string;
  border: string;
  frame: string;
  chip: string;
  button: string;
  ring: string;
  thumb: string;
  thumbActive: string;
  logoBox: string;
};

export const THEMES: Record<FilmTheme, FilmStyles> = {
  matrix: {
    root: "bg-black font-mono text-[#d1ffd9]",
    bar: "bg-black/90 border-b border-[#00ff41]/15",
    title:
      "leading-none font-bold uppercase tracking-wider text-[#00ff41] [text-shadow:0_0_14px_rgba(0,255,65,0.5)]",
    sceneTitle: "font-bold uppercase tracking-wide text-[#d1ffd9]",
    accent: "text-[#00ff41]",
    muted: "text-[#00ff41]/60",
    body: "text-[#00ff41]/80",
    border: "border-[#00ff41]/25",
    frame: "border border-[#00ff41]/40 shadow-[0_0_40px_rgba(0,255,65,0.15)]",
    chip: "border border-[#00ff41]/40 text-[#00ff41]",
    button:
      "border border-[#00ff41]/50 text-[#00ff41] hover:bg-[#00ff41] hover:text-black focus-visible:ring-[#00ff41]",
    ring: "focus-visible:ring-[#00ff41]",
    thumb: "",
    thumbActive: "outline outline-2 outline-offset-2 outline-[#00ff41]",
    logoBox: "bg-white",
  },
  starWars: {
    root: "bg-[#02030a] font-Raleway text-white",
    bar: "bg-[#02030a]/90 border-b border-white/10",
    title:
      "leading-none font-extrabold uppercase tracking-[0.08em] text-[#ffe81f]",
    sceneTitle: "font-extrabold uppercase tracking-[0.06em] text-white",
    accent: "text-[#ffe81f]",
    muted: "text-white/50",
    body: "text-white/75",
    border: "border-white/15",
    frame:
      "rounded-xl border border-white/15 shadow-[0_20px_60px_-20px_rgba(255,232,31,0.25)]",
    chip: "rounded-full border border-[#ffe81f]/40 font-bold text-[#ffe81f]",
    button:
      "rounded-full border border-[#ffe81f]/50 text-[#ffe81f] hover:bg-[#ffe81f] hover:text-black focus-visible:ring-[#ffe81f]",
    ring: "rounded-lg focus-visible:ring-[#ffe81f]",
    thumb: "rounded-lg",
    thumbActive: "outline outline-2 outline-offset-2 outline-[#ffe81f]",
    logoBox: "rounded-lg bg-white",
  },
  simpsons: {
    root: "bg-[#1f4fa3] font-Raleway text-white",
    bar: "bg-[#1f4fa3]/95 border-b-2 border-black/30",
    title:
      "font-RockSalt leading-[1.4] text-[#ffd90f] [text-shadow:3px_3px_0_#000]",
    sceneTitle:
      "font-RockSalt leading-[1.5] text-[#ffd90f] [text-shadow:2px_2px_0_#000]",
    accent: "font-semibold text-[#ffd90f]",
    muted: "text-white/65",
    body: "font-medium text-white/90",
    border: "border-white/25",
    frame: "rounded-2xl border-[3px] border-black shadow-[8px_8px_0_#000]",
    chip: "rounded-full border-2 border-black bg-[#ffd90f] font-black text-black",
    button:
      "rounded-full border-[3px] border-black bg-[#ff3b3b] font-black text-white shadow-[3px_3px_0_#000] hover:bg-[#ffd90f] hover:text-black focus-visible:ring-white",
    ring: "rounded-xl focus-visible:ring-white",
    thumb: "rounded-xl",
    thumbActive: "outline outline-[3px] outline-offset-2 outline-[#ffd90f]",
    logoBox: "rounded-2xl border-[3px] border-black bg-white",
  },
};
