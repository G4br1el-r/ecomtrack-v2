import type { NotFoundVariant } from "@/@types/Modules/Core/Shell/not-found";

export const NOT_FOUND_STATUS_CODES: Record<NotFoundVariant, string> = {
  "not-found": "404",
  forbidden: "403",
};

export const NOT_FOUND_COPY: Record<NotFoundVariant, { title: string; description: string }> = {
  "not-found": {
    title: "Esse PIN não leva a lugar nenhum",
    description:
      "Raspamos o endereço inteiro e não encontramos nenhuma página aqui. Ela pode ter sido removida, mudado de lugar ou nunca ter existido.",
  },
  forbidden: {
    title: "Esse resgate não é para você",
    description:
      "Seu perfil não tem permissão para abrir esta página. Se você precisa desse acesso, fale com o administrador da sua conta.",
  },
};

export const NOT_FOUND_PINS: Record<NotFoundVariant, string> = {
  "not-found": "PAG-404-INEXISTENTE",
  forbidden: "PAG-403-RESTRITA",
};

export const NOT_FOUND_INVALID_LABELS: Record<NotFoundVariant, string> = {
  "not-found": "Código inválido",
  forbidden: "Bloqueado",
};

export const NOT_FOUND_ERROR_PREFIX = "Erro";
export const NOT_FOUND_HOME_LABEL = "Voltar ao painel";
export const NOT_FOUND_FORBIDDEN_TITLE = "Acesso restrito";

export const GIFT_CARD_LABEL = "Gift Card";
export const GIFT_CARD_HIGHLIGHT_DIGIT = "0";
export const GIFT_CARD_SUBTITLE = "Cartão-presente digital";
export const GIFT_CARD_VALUE_LABEL = "Valor";
export const GIFT_CARD_VALUE_PREFIX = "R$";
export const GIFT_CARD_VALUE_CENTS = ",00";
export const GIFT_CARD_PIN_LABEL = "PIN de resgate";
export const GIFT_CARD_SERIAL = "0404 2026 0404";
export const GIFT_CARD_INSTRUCTION = "Clique e arraste para raspar";
export const GIFT_CARD_REVEAL_LABEL = "Revelar PIN de resgate";

export const GIFT_CARD_PIVOT = "50% 20px";
export const GIFT_CARD_SWING_FROM_DEGREES = -14;
export const GIFT_CARD_DROP_Y = -28;
export const GIFT_CARD_SWING_DELAY_SECONDS = 0.15;
export const GIFT_CARD_SWING_SPRING = { type: "spring", stiffness: 140, damping: 7, mass: 0.9 } as const;
export const GIFT_CARD_GLARE_REST = { x: 30, y: 20 } as const;

export const SCRATCH_REVEAL_RATIO = 0.7;
export const SCRATCH_SAMPLE_STRIDE = 6;
export const SCRATCH_CHECK_INTERVAL = 10;
export const SCRATCH_MAX_PIXEL_RATIO = 2;
export const SCRATCH_BRUSH_RADIUS_PX = 7;
export const SCRATCH_STROKE_STEP_PX = 4;
export const SCRATCH_ROUGH_STAMPS = 3;
export const SCRATCH_ROUGH_MIN_DISTANCE = 0.55;
export const SCRATCH_ROUGH_DISTANCE_RANGE = 0.5;
export const SCRATCH_ROUGH_RADIUS_RATIO = 0.35;
export const SCRATCH_NOISE_DENSITY = 0.12;
export const SCRATCH_NOISE_SIZE_PX = 1;
export const SCRATCH_NOISE_COLORS = ["rgba(255, 255, 255, 0.55)", "rgba(0, 0, 0, 0.12)"] as const;
export const SCRATCH_COLOR_STOPS = [
  { offset: 0, color: "#d9d9de" },
  { offset: 0.3, color: "#a8a8b0" },
  { offset: 0.55, color: "#e8e8ec" },
  { offset: 0.8, color: "#9a9aa3" },
  { offset: 1, color: "#c4c4ca" },
] as const;
export const SCRATCH_TEXT = "RASPE AQUI";
export const SCRATCH_TEXT_COLOR = "rgba(63, 63, 70, 0.75)";
export const SCRATCH_FONT_SIZE_PX = 10;
export const SCRATCH_FONT_WEIGHT = 700;
export const SCRATCH_LETTER_SPACING = "3px";
export const SCRATCH_TEXT_CENTER = 0.5;
export const SCRATCH_ERASE_MODE = "destination-out";
export const FULL_TURN_RADIANS = Math.PI * 2;
export const SCRATCH_COIN_CURSOR =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 28 28'%3E%3Ccircle cx='14' cy='14' r='12' fill='%23fbbf24' stroke='%23b45309' stroke-width='2'/%3E%3Ccircle cx='14' cy='14' r='7.5' fill='none' stroke='%23d97706' stroke-width='1.5'/%3E%3C/svg%3E\") 14 14, grab";
export const SCRATCH_HINT_TRAVEL_X = [0, -28, 0, -28, 0];
export const SCRATCH_HINT_ROTATE = [0, -25, 0, -25, 0];
export const SCRATCH_HINT_DURATION_SECONDS = 2.2;
export const SCRATCH_HINT_REPEAT_DELAY_SECONDS = 0.8;
export const SCRATCH_SHAKE_X = [0, -5, 5, -3, 2, 0];
