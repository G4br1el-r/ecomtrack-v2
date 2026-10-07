import { beforeEach, describe, expect, it } from "vitest";

import { DENSITY_STORAGE_KEY } from "@/constants/Modules/Core/DesignSystem/density";

import { useDensityStore } from "./density-store";

describe("useDensityStore", () => {
  beforeEach(() => {
    localStorage.clear();
    useDensityStore.setState({ density: "comfortable" });
  });

  it("troca a densidade e persiste", () => {
    useDensityStore.getState().setDensity("compact");
    expect(useDensityStore.getState().density).toBe("compact");
    expect(localStorage.getItem(DENSITY_STORAGE_KEY)).toContain("compact");
  });

  it("ignora valor inválido salvo ao reidratar", async () => {
    localStorage.setItem(DENSITY_STORAGE_KEY, JSON.stringify({ state: { density: "gigante" }, version: 0 }));
    await useDensityStore.persist.rehydrate();
    expect(useDensityStore.getState().density).toBe("comfortable");
  });
});
