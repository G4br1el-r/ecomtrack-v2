export type ApiQueryValue = string | number | boolean | null | undefined;

export type ApiRequestOptions = {
  params?: Record<string, string>;
  query?: Record<string, ApiQueryValue>;
  body?: unknown;
  skipCompany?: boolean;
};
