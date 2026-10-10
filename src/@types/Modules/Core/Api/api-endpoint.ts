import type { PinType } from "@/schemas/Modules/Core/Conta/pin-type-schema";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export type ApiEndpoint = {
  method: HttpMethod;
  path: string;
  summary: string;
  isPublic?: boolean;
  page?: string;
  component?: string;
  platformScope?: boolean;
  securityPin?: PinType;
};
