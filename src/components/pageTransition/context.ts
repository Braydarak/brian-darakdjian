import { createContext, useContext } from "react";

export const TransitionContext = createContext<(to: string) => void>(() => {});

// Navega con la transición de "cambio de canal"
export const useTransitionNavigate = () => useContext(TransitionContext);
