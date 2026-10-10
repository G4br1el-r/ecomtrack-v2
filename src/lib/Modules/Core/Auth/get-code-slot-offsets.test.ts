import { describe, expect, it } from "vitest";

import { CODE_SLOT_GAP_PX, CODE_SLOT_SIZE_PX } from "@/constants/Modules/Core/DesignSystem/code-input";

import { getCodeSlotOffsets } from "./get-code-slot-offsets";

const SLOT_COUNT = 6;
const STEP = CODE_SLOT_SIZE_PX + CODE_SLOT_GAP_PX;

describe("getCodeSlotOffsets", () => {
  it("devolve a distância de cada quadradinho até o centro da fileira", () => {
    expect(getCodeSlotOffsets(SLOT_COUNT)).toEqual([-2.5, -1.5, -0.5, 0.5, 1.5, 2.5].map((n) => n * STEP));
  });
});
