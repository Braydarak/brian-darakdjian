import { PointerEvent, useState } from "react";

// Foto real de Brian que aparece encima del retrato de cada experiencia.
// El contenedor tiene que tener la clase "group" y los props de useRealPhoto:
// se muestra con hover (mouse) o con un toque (pantallas táctiles).
export const useRealPhoto = () => {
  const [real, setReal] = useState(false);

  return {
    "data-real": real,
    onPointerUp: (e: PointerEvent) => {
      if (e.pointerType !== "mouse") setReal((value) => !value);
    },
  };
};
