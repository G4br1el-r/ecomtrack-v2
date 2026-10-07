import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

import type { Granularity } from "@/@types/Modules/VisaoGeral/Dashboard/granularity";
import { BUCKET_LABEL_FORMAT } from "@/constants/Modules/VisaoGeral/Dashboard/granularity";

export function formatBucketLabel(isoDate: string, granularity: Granularity): string {
  return format(parseISO(isoDate), BUCKET_LABEL_FORMAT[granularity], { locale: ptBR });
}
