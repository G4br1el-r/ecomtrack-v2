import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { Density } from "@/@types/Modules/Core/DesignSystem/density";
import { DEFAULT_DENSITY, DENSITY_STORAGE_KEY } from "@/constants/Modules/Core/DesignSystem/density";
import { parseDensity } from "@/lib/Modules/Core/DesignSystem/parse-density";

type DensityState = {
  density: Density;
  setDensity: (density: Density) => void;
};

export const useDensityStore = create<DensityState>()(
  persist(
    (set) => ({
      density: DEFAULT_DENSITY,
      setDensity: (density) => set({ density }),
    }),
    {
      name: DENSITY_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({ density: state.density }),
      merge: (persisted, current) => {
        const stored: unknown = persisted;
        const density = typeof stored === "object" && stored !== null && "density" in stored ? stored.density : null;
        return { ...current, density: parseDensity(density) };
      },
    },
  ),
);
