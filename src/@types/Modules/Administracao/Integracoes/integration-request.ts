export type IntegrationRequest = {
  providerId: string;
  name: string | null;
  isActive: boolean;
  values: Record<string, string>;
};
