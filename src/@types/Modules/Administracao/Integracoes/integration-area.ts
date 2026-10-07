import type { ApiEndpoint } from "@/@types/Modules/Core/Api/api-endpoint";

export type IntegrationArea = "ecommerce" | "email" | "ai" | "supplier";

export type IntegrationAreaEndpoints = {
  providers: ApiEndpoint;
  list: ApiEndpoint;
  get: ApiEndpoint;
  create: ApiEndpoint;
  update: ApiEndpoint;
  remove: ApiEndpoint;
};
