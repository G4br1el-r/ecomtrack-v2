import type {
  IntegrationScene,
  IntegrationSceneLayout,
  LoginDrawnIconName,
  LoginStepName,
  SceneIconName,
  WaveLayer,
  WaveLayerTone,
} from "@/@types/Modules/Core/Auth/login";

export const LOGIN_STEP_COPY: Record<LoginStepName, { title: string; description: string }> = {
  credentials: { title: "Bem-vindo de volta", description: "Entre com seu e-mail e senha para acessar o painel." },
  code: { title: "Verificação em duas etapas", description: "Digite o código que enviamos para o seu e-mail." },
  forgot: {
    title: "Esqueci a senha",
    description: "Informe o seu e-mail e enviaremos um link para criar uma nova senha.",
  },
};

export const LOGIN_WELCOME = {
  headline: "Tudo em um só lugar.",
  description: "Pedidos, envios, catálogo e financeiro da sua loja reunidos em um só painel.",
  tagline: "Gestão de e-commerce",
} as const;

export const LOGIN_FORM_REVEAL_DELAY_SECONDS = 0.1;
export const LOGIN_FORM_REVEAL_OFFSET = 24;

export const LOGIN_DRAWN_ICON_STROKE_WIDTH = 2;
export const LOGIN_DRAWN_ICON_DRAW_SECONDS = 0.6;
export const LOGIN_DRAWN_ICON_STAGGER_SECONDS = 0.18;

export const LOGIN_DRAWN_ICON_PATHS: Record<LoginDrawnIconName, readonly string[]> = {
  brand: [
    "M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z",
    "M3.103 6.034h17.794",
    "M16 10a4 4 0 0 1-8 0",
  ],
  credentials: [
    "M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z",
    "M7 11V7a5 5 0 0 1 10 0v4",
    "M12 15v3",
  ],
  code: [
    "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
    "m9 12 2 2 4-4",
  ],
  forgot: [
    "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z",
    "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",
  ],
  sent: [
    "M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8",
    "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",
    "m16 19 2 2 4-4",
  ],
};

export const LOGIN_ICON_GRID_HALF = 12;

export const LOGIN_DOTS = { spacingPx: 22, radiusPx: 1.2 } as const;

export const LOGIN_WAVE_THICKNESS_PX = 120;

export const LOGIN_WAVE_TONE_CLASS: Record<WaveLayerTone, string> = {
  back: "fill-primary-foreground/15",
  middle: "fill-primary-foreground/30",
  front: "fill-background",
};

export const LOGIN_WAVE_LAYERS = [
  { id: "back", tone: "back", wavelength: 280, base: 34, amplitude: 14, durationSeconds: 16, direction: 1 },
  { id: "middle", tone: "middle", wavelength: 220, base: 60, amplitude: 12, durationSeconds: 11, direction: -1 },
  { id: "front", tone: "front", wavelength: 340, base: 88, amplitude: 16, durationSeconds: 20, direction: 1 },
] as const satisfies readonly WaveLayer[];

export const LOGIN_SCENE_ICON_PATHS: Record<SceneIconName, readonly string[]> = {
  brand: LOGIN_DRAWN_ICON_PATHS.brand,
  store: [
    "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8",
    "m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7",
    "M2 7h20",
    "M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7",
    "M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4",
  ],
  globe: ["M2 12a10 10 0 1 0 20 0a10 10 0 1 0-20 0", "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", "M2 12h20"],
  package: [
    "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
    "m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7",
    "M12 22V12",
  ],
  wallet: [
    "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
    "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4",
  ],
  check: ["m9 12 2 2 4-4"],
};

export const LOGIN_INTEGRATION_SCENES: Record<IntegrationSceneLayout, IntegrationScene> = {
  full: {
    width: 440,
    height: 320,
    hub: { at: { x: 220, y: 160 }, radius: 46, haloRadius: 58, iconScale: 1.7 },
    channels: [
      { icon: "store", label: "Marketplaces", at: { x: 60, y: 60 }, route: "M60 60C140 60 140 160 220 160" },
      { icon: "package", label: "Estoque", at: { x: 380, y: 60 }, route: "M380 60C300 60 300 160 220 160" },
      { icon: "wallet", label: "Financeiro", at: { x: 380, y: 260 }, route: "M380 260C300 260 300 160 220 160" },
      { icon: "globe", label: "Loja virtual", at: { x: 60, y: 260 }, route: "M60 260C140 260 140 160 220 160" },
    ],
    channelRadius: 30,
    channelHaloRadius: 39,
    channelIconScale: 1.3,
    packetRadius: 5,
    badgeRadius: 12,
    badgeIconScale: 1.3,
    labelOffset: 54,
  },
  compact: {
    width: 340,
    height: 90,
    hub: { at: { x: 170, y: 48 }, radius: 28, haloRadius: 35, iconScale: 1.05 },
    channels: [
      { icon: "store", label: "Marketplaces", at: { x: 22, y: 48 }, route: "M22 48C60 4 130 8 170 48" },
      { icon: "globe", label: "Loja virtual", at: { x: 90, y: 48 }, route: "M90 48H170" },
      { icon: "package", label: "Estoque", at: { x: 250, y: 48 }, route: "M250 48H170" },
      { icon: "wallet", label: "Financeiro", at: { x: 318, y: 48 }, route: "M318 48C280 4 210 8 170 48" },
    ],
    channelRadius: 18,
    channelHaloRadius: 23,
    channelIconScale: 0.8,
    packetRadius: 3.5,
    badgeRadius: 9,
    badgeIconScale: 0.95,
    labelOffset: null,
  },
};

export const LOGIN_SCENE_BADGE_OFFSET_RATIO = 0.72;
export const LOGIN_SCENE_BADGE_STROKE_WIDTH = 2.5;
export const LOGIN_SCENE_STATIC_PROGRESS = 0.5;

export const LOGIN_SCENE_TIMING = {
  channelStaggerSeconds: 0.12,
  hubDelaySeconds: 0.1,
  iconDelaySeconds: 0.3,
  packetDelaySeconds: 1.2,
  packetLoopSeconds: 2.4,
  packetStaggerSeconds: 0.6,
  packetPauseSeconds: 0.8,
  badgeDelaySeconds: 1.9,
} as const;
