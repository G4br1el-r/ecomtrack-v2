import { describe, expect, it } from "vitest";
import { CODE_CIRCLE_RADIUS_PX } from "@/constants/Modules/Core/Auth/login-success";
import { CODE_SLOT_GAP_PX, CODE_SLOT_SIZE_PX } from "@/constants/Modules/Core/DesignSystem/code-input";

import { getCodeSlotPositions } from "./get-code-slot-positions";

const SLOT_COUNT = 6;
const STEP = CODE_SLOT_SIZE_PX + CODE_SLOT_GAP_PX;

describe("getCodeSlotPositions", () => {
  const positions = getCodeSlotPositions(SLOT_COUNT);

  it("devolve uma posição por quadradinho", () => {
    expect(positions).toHaveLength(SLOT_COUNT);
  });

  it("centraliza a fileira no meio", () => {
    expect(positions.map((position) => position.rowX)).toEqual([-2.5, -1.5, -0.5, 0.5, 1.5, 2.5].map((n) => n * STEP));
  });

  it("começa o círculo no topo", () => {
    expect(positions[0]).toMatchObject({ circleX: 0, circleY: -CODE_CIRCLE_RADIUS_PX });
  });

  it("coloca todos os quadradinhos na mesma distância do centro", () => {
    for (const { circleX, circleY } of positions) {
      expect(Math.hypot(circleX, circleY)).toBeCloseTo(CODE_CIRCLE_RADIUS_PX, 0);
    }
  });
});
