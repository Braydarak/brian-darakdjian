import { scrollToElement } from "../../../lib/smoothScroll";

export const SIMPSONS_SECTIONS = ["home", "work", "contact"] as const;
export type SimpsonsSection = (typeof SIMPSONS_SECTIONS)[number];

export const scrollToSection = (id: SimpsonsSection) => {
  scrollToElement(document.getElementById(`simpsons-${id}`));
};
