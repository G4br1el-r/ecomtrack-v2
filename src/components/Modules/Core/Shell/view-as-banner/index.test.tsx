import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MotionGlobalConfig } from "motion/react";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { useViewAsStore } from "@/store/Modules/Core/Access/view-as-store";

import { ViewAsBanner } from ".";

describe("ViewAsBanner", () => {
  beforeAll(() => {
    MotionGlobalConfig.skipAnimations = true;
  });
  afterAll(() => {
    MotionGlobalConfig.skipAnimations = false;
  });

  it("avisa que a sessão é só de leitura e sai da visualização", async () => {
    useViewAsStore.getState().start({
      token: "t",
      expiresAt: "2026-10-07T15:30:00",
      label: "Vendas",
      permissions: { profileId: "p", profileName: "Vendas", version: 1, kind: "Company", pages: [], components: [] },
    });
    render(
      <QueryClientProvider client={new QueryClient()}>
        <ViewAsBanner />
      </QueryClientProvider>,
    );

    expect(screen.getByRole("status")).toHaveTextContent("Visualizando como Vendas. Somente leitura, até 15:30.");
    await userEvent.click(screen.getByRole("button", { name: "Sair da visualização" }));

    expect(useViewAsStore.getState().session).toBeNull();
  });
});
