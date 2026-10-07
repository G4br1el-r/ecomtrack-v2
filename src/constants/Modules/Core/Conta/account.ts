import type { PinType } from "@/schemas/Modules/Core/Conta/pin-type-schema";

export const ACCOUNT_HREF = "/minha-conta";
export const ACCOUNT_TAB_PARAM = "aba";
export const ACCOUNT_TABS = { profile: "perfil", security: "seguranca" } as const;
export const ACCOUNT_SECURITY_HREF = `${ACCOUNT_HREF}?${ACCOUNT_TAB_PARAM}=${ACCOUNT_TABS.security}`;
export const ME_QUERY_KEY = ["core", "conta", "me"] as const;

export const PIN_SETTINGS: Record<PinType, { length: number; title: string; description: string }> = {
  Four: {
    length: 4,
    title: "PIN de 4 dígitos",
    description: "Pedido para ver campos sensíveis, como chaves e dados protegidos.",
  },
  Six: {
    length: 6,
    title: "PIN de 6 dígitos",
    description: "Pedido para abrir páginas protegidas do sistema.",
  },
};
