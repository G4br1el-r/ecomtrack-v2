import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { COMPANY_CONTEXT_STORAGE_KEY } from "@/constants/Modules/Core/Shell/company-context";
import { type CompanyContext, companyContextSchema } from "@/schemas/Modules/Core/Shell/company-context-schema";

type CompanyContextState = {
  company: CompanyContext | null;
  setCompany: (company: CompanyContext | null) => void;
};

export const useCompanyContextStore = create<CompanyContextState>()(
  persist(
    (set) => ({
      company: null,
      setCompany: (company) => set({ company }),
    }),
    {
      name: COMPANY_CONTEXT_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({ company: state.company }),
      merge: (persisted, current) => {
        const stored: unknown = persisted;
        const company = typeof stored === "object" && stored !== null && "company" in stored ? stored.company : null;
        const parsed = companyContextSchema.safeParse(company);
        return { ...current, company: parsed.success ? parsed.data : null };
      },
    },
  ),
);
