export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export type ApiEndpoint = {
  method: HttpMethod;
  path: string;
  summary: string;
  isPublic?: boolean;
  page?: string;
  component?: string;
  platformScope?: boolean;
};
