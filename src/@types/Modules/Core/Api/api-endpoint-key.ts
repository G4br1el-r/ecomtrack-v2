import type { ApiEndpoint } from "@/@types/Modules/Core/Api/api-endpoint";
import type { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";

type Endpoints = typeof API_ENDPOINTS;

export type ApiEndpointKey = {
  [Group in keyof Endpoints]: `${Group & string}.${keyof Endpoints[Group] & string}`;
}[keyof Endpoints];

export type ApiEndpointEntry = ApiEndpoint & { key: ApiEndpointKey };
