import { scrollToElement } from "../../../lib/smoothScroll";

export const SW_SECTIONS = ["home", "work", "contact"] as const;
export type SWSection = (typeof SW_SECTIONS)[number];

export const scrollToSection = (id: SWSection) => {
  scrollToElement(document.getElementById(`sw-${id}`));
};
