import Publifer from "../assets/publifer.webp";
import Manduca from "../assets/manduca-logo.avif";
import GIED from "../assets/gied.png";
import AlmangoLogo from "../assets/almango.avif";
import NuriaIturriozLogo from "../assets/NuriaLogo.ok_.avif";
import GREGAL from "../assets/gregalPropertiesLogo.png";
import INEBAL from "../assets/inebalLogo.png";
import BONAPEDRA from "../assets/bonapedraLogo.avif";
import MANAGEMENT from "../assets/mdmLogo.avif";
import MALVON from "../assets/malvon-logo.svg";

// Capturas de cada proyecto: assets/works/<carpeta>/<escena>.webp
const SHOTS = import.meta.glob<string>("../assets/works/*/*.webp", {
  eager: true,
  import: "default",
});

// Escenas de la "película" de un proyecto, en el orden dado
const scenes = (folder: string, ids: string[]) =>
  ids.map((id) => {
    const image = SHOTS[`../assets/works/${folder}/${id}.webp`];
    if (!image) throw new Error(`Falta la captura works/${folder}/${id}.webp`);
    return { id, image };
  });

// Proyectos del portfolio, compartidos por todas las experiencias.
// descriptionKey es la clave de traducción de la descripción.
// status: "live" = en vivo hoy, "dev" = en progreso, "past" = trabajos anteriores.
export type WorkStatus = "live" | "dev" | "past";
// Orden de las pestañas; la primera es la que se muestra por defecto.
export const WORK_STATUSES: WorkStatus[] = ["live", "dev", "past"];

export type WorkItem = {
  title: string;
  descriptionKey: string;
  image: string;
  link: string;
  status: WorkStatus;
  // "Película" del proyecto: al tocarlo se abre un visor con capturas y
  // sinopsis en la misma página. Los textos están en <filmKey>.* (i18n) y
  // cada escena en <filmKey>.scenes.<id>.*
  film?: {
    filmKey: string;
    scenes: { id: string; image: string }[];
  };
};

export const works: WorkItem[] = [
  {
    title: "Malvón",
    descriptionKey: "malvonDesc",
    image: MALVON,
    link: "https://www.malvon.es/",
    status: "live",
    film: {
      filmKey: "films.malvon",
      scenes: scenes("malvon", [
        "portal",
        "operaciones",
        "finanzas",
        "calidad",
        "id",
        "inventario",
        "itsm",
        "resenas",
        "canalB2b",
      ]),
    },
  },
  {
    title: "Publifer",
    descriptionKey: "publiferDesc",
    image: Publifer,
    link: "https://publifercm.com/",
    status: "live",
    film: {
      filmKey: "films.publifer",
      scenes: scenes("publifer", [
        "inicio",
        "nosotros",
        "servicios",
        "catalogos",
        "contacto",
      ]),
    },
  },
  {
    title: "Almango",
    descriptionKey: "almangoDesc",
    image: AlmangoLogo,
    link: "https://www.almango.com.ar/",
    status: "past",
    film: {
      filmKey: "films.almango",
      scenes: scenes("almango", [
        "inicio",
        "nosotros",
        "comercializadores",
        "faq",
        "derechos",
        "pagos",
      ]),
    },
  },
  {
    title: "Nuria Iturrioz",
    descriptionKey: "nuriaDesc",
    image: NuriaIturriozLogo,
    link: "https://nuriaiturrioz.com/",
    status: "live",
    film: {
      filmKey: "films.nuria",
      scenes: scenes("nuria", [
        "inicio",
        "sobreMi",
        "carrera",
        "trofeos",
        "reconocimientos",
        "estadisticas",
        "juego",
      ]),
    },
  },
  {
    title: "Manduca Proteina",
    descriptionKey: "manducaDesc",
    image: Manduca,
    link: "https://manducaproteina.com/",
    status: "live",
    film: {
      filmKey: "films.manduca",
      scenes: scenes("manduca", [
        "inicio",
        "queEs",
        "porQue",
        "nutricion",
        "dondeComprar",
        "creador",
      ]),
    },
  },
  {
    title: "Gregal Properties",
    descriptionKey: "gregalDesc",
    image: GREGAL,
    link: "https://gregalproperties.com/",
    status: "past",
    film: {
      filmKey: "films.gregal",
      scenes: scenes("gregal", [
        "inicio",
        "propiedades",
        "valoracion",
        "nosotros",
        "servicios",
        "proceso",
        "opiniones",
      ]),
    },
  },
  {
    title: "INEBAL",
    descriptionKey: "inebalDesc",
    image: INEBAL,
    link: "https://inebal-web.vercel.app/",
    status: "past",
    film: {
      filmKey: "films.inebal",
      scenes: scenes("inebal", ["inicio", "servicios", "nosotros", "contacto"]),
    },
  },
  {
    title: "BONAPEDRA EXCAVACIONS",
    descriptionKey: "bonapedraDesc",
    image: BONAPEDRA,
    link: "https://bona-pedra-excavacions-web.vercel.app/",
    status: "past",
    film: {
      filmKey: "films.bonapedra",
      scenes: scenes("bonapedra", [
        "inicio",
        "nosotros",
        "servicios",
        "contacto",
      ]),
    },
  },
  {
    title: "MANAGEMENT & DEVELOPMENT MALLORCA",
    descriptionKey: "managementDesc",
    image: MANAGEMENT,
    link: "https://mdm-web-iota.vercel.app/",
    status: "past",
    film: {
      filmKey: "films.management",
      scenes: scenes("mdm", ["inicio", "nosotros", "servicios", "contacto"]),
    },
  },
  {
    title: "GIED",
    descriptionKey: "giedDesc",
    image: GIED,
    link: "https://gied.vercel.app/",
    status: "dev",
    film: {
      filmKey: "films.gied",
      scenes: scenes("gied", [
        "inicio",
        "queEs",
        "proceso",
        "servicios",
        "contacto",
      ]),
    },
  },
];
