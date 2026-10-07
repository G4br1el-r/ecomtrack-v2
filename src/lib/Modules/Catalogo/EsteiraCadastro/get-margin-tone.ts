import type { BadgeTone } from "@/@types/Modules/Core/DesignSystem/badge-tone";
import { ACCEPTABLE_MARGIN_SHARE, HEALTHY_MARGIN_SHARE } from "@/constants/Modules/Catalogo/EsteiraCadastro/pricing";

export function getMarginTone(margin: number): BadgeTone {
  if (margin >= HEALTHY_MARGIN_SHARE) return "success";
  if (margin >= ACCEPTABLE_MARGIN_SHARE) return "warning";
  return "destructive";
}
