import { create } from "zustand";

import type { SecurityPinPrompt } from "@/@types/Modules/Core/Access/security-pin-prompt";
import type { PinType } from "@/schemas/Modules/Core/Conta/pin-type-schema";

type SecurityPinState = {
  pins: Partial<Record<PinType, string>>;
  prompt: SecurityPinPrompt | null;
  request: (type: PinType, mode: SecurityPinPrompt["mode"]) => Promise<string | null>;
  answer: (pin: string | null) => void;
  forget: (type: PinType) => void;
};

export const useSecurityPinStore = create<SecurityPinState>()((set, get) => ({
  pins: {},
  prompt: null,
  request: (type, mode) =>
    new Promise((resolve) => {
      get().prompt?.resolve(null);
      set({ prompt: { type, mode, resolve } });
    }),
  answer: (pin) => {
    const prompt = get().prompt;
    if (!prompt) return;
    set((state) => ({
      prompt: null,
      pins: pin ? { ...state.pins, [prompt.type]: pin } : state.pins,
    }));
    prompt.resolve(pin);
  },
  forget: (type) =>
    set((state) => {
      const { [type]: _, ...pins } = state.pins;
      return { pins };
    }),
}));
