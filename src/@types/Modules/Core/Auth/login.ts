import type { LoginChallenge } from "@/schemas/Modules/Core/Auth/login-challenge-schema";

export type LoginStep = { name: "credentials" } | { name: "forgot" } | { name: "code"; challenge: LoginChallenge };

export type LoginStepName = LoginStep["name"];

export type LoginEntryStepName = Exclude<LoginStepName, "code">;

export type LoginDrawnIconName = LoginStepName | "sent" | "brand";

export type ScenePoint = { x: number; y: number };

export type EdgeOrientation = "vertical" | "horizontal";

export type WaveLayerTone = "back" | "middle" | "front";

export type WaveLayer = {
  id: string;
  tone: WaveLayerTone;
  wavelength: number;
  base: number;
  amplitude: number;
  durationSeconds: number;
  direction: 1 | -1;
};

export type SceneIconName = "brand" | "store" | "globe" | "package" | "wallet" | "check";

export type IntegrationChannel = { icon: SceneIconName; label: string; at: ScenePoint; route: string };

export type IntegrationSceneLayout = "full" | "compact";

export type IntegrationScene = {
  width: number;
  height: number;
  hub: { at: ScenePoint; radius: number; haloRadius: number; iconScale: number };
  channels: readonly IntegrationChannel[];
  channelRadius: number;
  channelHaloRadius: number;
  channelIconScale: number;
  packetRadius: number;
  badgeRadius: number;
  badgeIconScale: number;
  labelOffset: number | null;
};
