import { RefObject, useEffect } from "react";
import { scrollToTop } from "../lib/smoothScroll";

// Agrega la clase "is-revealed" a los elementos con data-reveal cuando entran
// en pantalla. Los que entran juntos aparecen en cascada (--reveal-delay),
// en orden de lectura. También observa los que se agregan después (por ej.
// al cambiar de pestaña), procesándolos como máximo una vez por cuadro.
const STAGGER_MS = 80;
const MAX_STAGGER = 6;

// enabled: permite esperar (por ej. a que termine una intro) antes de empezar.
export const useReveal = (root: RefObject<HTMLElement>, enabled = true) => {
  useEffect(() => {
    const container = root.current;
    if (!container || !enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entering = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top ||
              a.boundingClientRect.left - b.boundingClientRect.left
          );
        entering.forEach((entry, index) => {
          const el = entry.target as HTMLElement;
          el.style.setProperty("--reveal-delay", `${Math.min(index, MAX_STAGGER) * STAGGER_MS}ms`);
          el.classList.add("is-revealed");
          observer.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    const observeIn = (node: ParentNode) =>
      node
        .querySelectorAll<HTMLElement>("[data-reveal]:not(.is-revealed)")
        .forEach((el) => observer.observe(el));

    observeIn(container);

    let frame = 0;
    const pending = new Set<Element>();
    const flush = () => {
      frame = 0;
      pending.forEach((node) => {
        if (node instanceof HTMLElement && node.matches("[data-reveal]:not(.is-revealed)")) {
          observer.observe(node);
        }
        observeIn(node);
      });
      pending.clear();
    };
    const mutations = new MutationObserver((records) => {
      records.forEach((record) =>
        record.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) pending.add(node as Element);
        })
      );
      if (pending.size && !frame) frame = requestAnimationFrame(flush);
    });
    mutations.observe(container, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      mutations.disconnect();
    };
  }, [root, enabled]);
};

// Pone el body de un color mientras la página está montada, para que el
// overscroll de iOS no muestre el blanco de la experiencia Simpsons.
export const useBodyBackground = (color: string) => {
  useEffect(() => {
    const previous = document.body.style.backgroundColor;
    document.body.style.backgroundColor = color;
    scrollToTop();
    return () => {
      document.body.style.backgroundColor = previous;
    };
  }, [color]);
};
