import { describe, expect, it } from "vitest";

import { EVENT_TYPES, FALLBACK_EVENT_TYPE } from "@/constants/Modules/Core/DesignSystem/event-types";

import { getEventTypeConfig } from "./get-event-type-config";

describe("getEventTypeConfig", () => {
  it("retorna a configuração do tipo conhecido", () => {
    expect(getEventTypeConfig("pagamento")).toBe(EVENT_TYPES.pagamento);
  });

  it("cai no tipo padrão quando o tipo é desconhecido", () => {
    expect(getEventTypeConfig("inexistente")).toBe(EVENT_TYPES[FALLBACK_EVENT_TYPE]);
  });

  it("não aceita chaves herdadas do protótipo", () => {
    expect(getEventTypeConfig("toString")).toBe(EVENT_TYPES[FALLBACK_EVENT_TYPE]);
  });

  it("usa apenas classes de cor semânticas", () => {
    const semantic = /^text-(info|success|warning|destructive|muted-foreground|status-(purple|orange|teal))$/;
    expect(Object.values(EVENT_TYPES).every((config) => semantic.test(config.colorClassName))).toBe(true);
  });
});
