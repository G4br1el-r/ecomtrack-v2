import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

import type { Granularity } from "@/@types/Modules/VisaoGeral/Dashboard/granularity";
import { BUCKET_TITLE_FORMAT } from "@/constants/Modules/VisaoGeral/Dashboard/granularity";
import { capitalize } from "@/lib/Modules/Core/DesignSystem/capitalize";

export function formatBucketTitle(isoDate: string, granularity: Granularity): string {
  return capitalize(format(parseISO(isoDate), BUCKET_TITLE_FORMAT[granularity], { locale: ptBR }));
}
