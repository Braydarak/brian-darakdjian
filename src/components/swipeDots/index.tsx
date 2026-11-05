import { useTranslation } from "react-i18next";

type SwipeDotsProps = {
  count: number;
  active: number;
  onSelect: (index: number) => void;
  // Colores del tema: punto normal y punto activo
  dotClass: string;
  activeClass: string;
};

// Puntitos debajo del carrusel de proyectos (solo en el celular): marcan la
// tarjeta visible y llevan a otra al tocarlos.
const SwipeDots = ({ count, active, onSelect, dotClass, activeClass }: SwipeDotsProps) => {
  const { t } = useTranslation();
  if (count < 2) return null;

  return (
    <div className="mt-2 flex items-center justify-center gap-1 sm:hidden">
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect(i)}
          aria-label={t("carousel.goTo", { n: i + 1, total: count })}
          aria-current={i === active ? "true" : undefined}
          // Área táctil de 24px aunque el punto se vea chico
          className="flex h-6 w-6 items-center justify-center"
        >
          <span
            className={`block h-2 rounded-full transition-[width,background-color] duration-300 ${
              i === active ? `w-5 ${activeClass}` : `w-2 ${dotClass}`
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default SwipeDots;
