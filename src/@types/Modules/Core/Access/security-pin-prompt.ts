import type { PinType } from "@/schemas/Modules/Core/Conta/pin-type-schema";

export type SecurityPinPrompt = {
  type: PinType;
  mode: "ask" | "invalid" | "missing";
  resolve: (pin: string | null) => void;
};
