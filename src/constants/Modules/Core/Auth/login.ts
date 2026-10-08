import type { CloudLayer, CloudLayerTone, LoginStepName } from "@/@types/Modules/Core/Auth/login";

export const LOGIN_STEP_COPY: Record<LoginStepName, { title: string; description: string }> = {
  credentials: { title: "Entrar", description: "Acesse com seu e-mail e senha." },
  code: { title: "Verificação em duas etapas", description: "Digite o código que enviamos para o seu e-mail." },
  forgot: {
    title: "Esqueci a senha",
    description: "Informe o seu e-mail e enviaremos um link para criar uma nova senha.",
  },
};

export const LOGIN_WELCOME = {
  greeting: "Bem-vindo ao",
  description: "Pedidos, envios, catálogo e financeiro da sua loja reunidos em um só painel.",
  tagline: "Gestão de e-commerce",
} as const;

export const LOGIN_MOBILE_HEADER_HEIGHT = "20rem";
export const LOGIN_INTRO_SPLASH_HEIGHT = "100dvh";
export const LOGIN_MOBILE_HEADER_BOTTOM_SPACE_PX = 128;
export const LOGIN_INTRO_COLLAPSE_DELAY_SECONDS = 1.5;
export const LOGIN_INTRO_COLLAPSE_SECONDS = 0.7;
export const LOGIN_FORM_REVEAL_DELAY_SECONDS = 1.9;
export const LOGIN_FORM_REVEAL_OFFSET = 40;

export const LOGIN_CLOUD_THICKNESS_PX = 140;

export const LOGIN_CLOUD_TONE_CLASS: Record<CloudLayerTone, string> = {
  back: "fill-primary-foreground/20",
  middle: "fill-primary-foreground/45",
  front: "fill-background",
};

export const LOGIN_CLOUD_LAYERS = [
  {
    id: "back",
    tone: "back",
    tile: 220,
    offset: 0,
    paths: {
      vertical:
        "M140 -220H56A38 38 0 1 0 56 -150A22 22 0 1 0 56 -110A34 34 0 1 0 56 -50A28 28 0 1 0 56 0H140ZM140 0H56A38 38 0 1 0 56 70A22 22 0 1 0 56 110A34 34 0 1 0 56 170A28 28 0 1 0 56 220H140ZM140 220H56A38 38 0 1 0 56 290A22 22 0 1 0 56 330A34 34 0 1 0 56 390A28 28 0 1 0 56 440H140Z",
      horizontal:
        "M-220 140V56A38 38 0 1 1 -150 56A22 22 0 1 1 -110 56A34 34 0 1 1 -50 56A28 28 0 1 1 0 56V140ZM0 140V56A38 38 0 1 1 70 56A22 22 0 1 1 110 56A34 34 0 1 1 170 56A28 28 0 1 1 220 56V140ZM220 140V56A38 38 0 1 1 290 56A22 22 0 1 1 330 56A34 34 0 1 1 390 56A28 28 0 1 1 440 56V140Z",
    },
  },
  {
    id: "middle",
    tone: "middle",
    tile: 236,
    offset: 70,
    paths: {
      vertical:
        "M140 -236H92A32 32 0 1 0 92 -180A40 40 0 1 0 92 -106A26 26 0 1 0 92 -62A34 34 0 1 0 92 0H140ZM140 0H92A32 32 0 1 0 92 56A40 40 0 1 0 92 130A26 26 0 1 0 92 174A34 34 0 1 0 92 236H140ZM140 236H92A32 32 0 1 0 92 292A40 40 0 1 0 92 366A26 26 0 1 0 92 410A34 34 0 1 0 92 472H140Z",
      horizontal:
        "M-236 140V92A32 32 0 1 1 -180 92A40 40 0 1 1 -106 92A26 26 0 1 1 -62 92A34 34 0 1 1 0 92V140ZM0 140V92A32 32 0 1 1 56 92A40 40 0 1 1 130 92A26 26 0 1 1 174 92A34 34 0 1 1 236 92V140ZM236 140V92A32 32 0 1 1 292 92A40 40 0 1 1 366 92A26 26 0 1 1 410 92A34 34 0 1 1 472 92V140Z",
    },
  },
  {
    id: "front",
    tone: "front",
    tile: 232,
    offset: 30,
    paths: {
      vertical:
        "M140 -232H128A36 36 0 1 0 128 -168A26 26 0 1 0 128 -122A38 38 0 1 0 128 -52A30 30 0 1 0 128 0H140ZM140 0H128A36 36 0 1 0 128 64A26 26 0 1 0 128 110A38 38 0 1 0 128 180A30 30 0 1 0 128 232H140ZM140 232H128A36 36 0 1 0 128 296A26 26 0 1 0 128 342A38 38 0 1 0 128 412A30 30 0 1 0 128 464H140Z",
      horizontal:
        "M-232 140V128A36 36 0 1 1 -168 128A26 26 0 1 1 -122 128A38 38 0 1 1 -52 128A30 30 0 1 1 0 128V140ZM0 140V128A36 36 0 1 1 64 128A26 26 0 1 1 110 128A38 38 0 1 1 180 128A30 30 0 1 1 232 128V140ZM232 140V128A36 36 0 1 1 296 128A26 26 0 1 1 342 128A38 38 0 1 1 412 128A30 30 0 1 1 464 128V140Z",
    },
  },
] as const satisfies readonly CloudLayer[];
