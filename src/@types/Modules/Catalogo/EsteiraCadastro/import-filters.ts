import type { Supplier } from "./pipeline-product";

export type ImportAvailability = "disponivel" | "indisponivel" | "todas";

export type ImportFilters = {
  suppliers: Supplier[];
  categories: string[];
  availability: ImportAvailability;
  showIgnored: boolean;
};

export type ImportFilterChip = {
  id: string;
  field: string;
  label: string;
  next?: ImportFilters;
};
