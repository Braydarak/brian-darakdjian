import { scrollToElement } from "../../../lib/smoothScroll";

export const MATRIX_SECTIONS = ["home", "work", "contact"] as const;
export type MatrixSection = (typeof MATRIX_SECTIONS)[number];

export const scrollToSection = (id: MatrixSection) => {
  scrollToElement(document.getElementById(`matrix-${id}`));
};
