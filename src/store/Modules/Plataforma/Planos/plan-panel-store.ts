import { create } from "zustand";

import type { PlanPanel } from "@/@types/Modules/Plataforma/Planos/plan-panel";

type PlanPanelState = {
  panel: PlanPanel | null;
  isOpen: boolean;
  open: (panel: PlanPanel) => void;
  close: () => void;
};

export const usePlanPanelStore = create<PlanPanelState>()((set) => ({
  panel: null,
  isOpen: false,
  open: (panel) => set({ panel, isOpen: true }),
  close: () => set({ isOpen: false }),
}));
