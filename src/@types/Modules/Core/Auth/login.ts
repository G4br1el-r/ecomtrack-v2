import type { LoginChallenge } from "@/schemas/Modules/Core/Auth/login-challenge-schema";

export type LoginStep = { name: "credentials" } | { name: "forgot" } | { name: "code"; challenge: LoginChallenge };

export type LoginStepName = LoginStep["name"];

export type LoginEntryStepName = Exclude<LoginStepName, "code">;

export type CloudOrientation = "vertical" | "horizontal";

export type CloudLayerTone = "back" | "middle" | "front";

export type CloudLayer = {
  id: string;
  tone: CloudLayerTone;
  tile: number;
  offset: number;
  paths: Record<CloudOrientation, string>;
};
