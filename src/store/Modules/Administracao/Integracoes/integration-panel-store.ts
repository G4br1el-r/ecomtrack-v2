import { create } from "zustand";

import type { IntegrationPanel } from "@/@types/Modules/Administracao/Integracoes/integration-panel";

type IntegrationPanelState = {
  panel: IntegrationPanel | null;
  isOpen: boolean;
  open: (panel: IntegrationPanel) => void;
  close: () => void;
};

export const useIntegrationPanelStore = create<IntegrationPanelState>()((set) => ({
  panel: null,
  isOpen: false,
  open: (panel) => set({ panel, isOpen: true }),
  close: () => set({ isOpen: false }),
}));
