import { create } from "zustand";

import type { Company } from "@/schemas/Modules/Plataforma/Empresas/company-schema";

type CompanyPanelState = {
  company: Company | null;
  isOpen: boolean;
  open: (company: Company | null) => void;
  close: () => void;
};

export const useCompanyPanelStore = create<CompanyPanelState>()((set) => ({
  company: null,
  isOpen: false,
  open: (company) => set({ company, isOpen: true }),
  close: () => set({ isOpen: false }),
}));
