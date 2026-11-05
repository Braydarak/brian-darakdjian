import { KeyboardEvent, useState } from "react";
import { WORK_STATUSES, WorkStatus, works } from "../data/works";

// Pestañas de trabajos: anteriores, en vivo y en progreso.
// Las flechas del teclado mueven entre pestañas, como en un tablist accesible.
export const useWorkTabs = (prefix: string) => {
  const [tab, setTab] = useState<WorkStatus>(WORK_STATUSES[0]);

  const visible = works.filter((work) => work.status === tab);
  const count = (status: WorkStatus) => works.filter((w) => w.status === status).length;

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const index = WORK_STATUSES.indexOf(tab);
    const next = WORK_STATUSES[(index + step + WORK_STATUSES.length) % WORK_STATUSES.length];
    setTab(next);
    document.getElementById(`${prefix}-tab-${next}`)?.focus();
  };

  const tabProps = (status: WorkStatus) => ({
    id: `${prefix}-tab-${status}`,
    role: "tab" as const,
    type: "button" as const,
    "aria-selected": tab === status,
    "aria-controls": `${prefix}-panel`,
    tabIndex: tab === status ? 0 : -1,
    onClick: () => setTab(status),
  });

  const panelProps = {
    id: `${prefix}-panel`,
    role: "tabpanel" as const,
    "aria-labelledby": `${prefix}-tab-${tab}`,
  };

  return { tab, visible, count, onKeyDown, tabProps, panelProps, statuses: WORK_STATUSES };
};
