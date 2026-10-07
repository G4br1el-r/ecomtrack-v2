import {
  Eye,
  FileDown,
  KeyRound,
  LogIn,
  LogOut,
  type LucideIcon,
  Pencil,
  Plus,
  Settings,
  ShieldCheck,
  Sparkles,
  Trash2,
} from "lucide-react";

import type { BadgeTone } from "@/@types/Modules/Core/DesignSystem/badge-tone";
import type { AuditType } from "@/schemas/Modules/Administracao/Auditoria/audit-type-schema";

export const AUDIT_TYPE_META: Record<AuditType, { label: string; icon: LucideIcon; tone: BadgeTone }> = {
  Login: { label: "Login", icon: LogIn, tone: "success" },
  Logout: { label: "Saída", icon: LogOut, tone: "secondary" },
  Create: { label: "Criação", icon: Plus, tone: "info" },
  Update: { label: "Edição", icon: Pencil, tone: "warning" },
  Delete: { label: "Exclusão", icon: Trash2, tone: "destructive" },
  View: { label: "Visualização", icon: Eye, tone: "secondary" },
  Export: { label: "Exportação", icon: FileDown, tone: "teal" },
  Permissions: { label: "Permissões", icon: ShieldCheck, tone: "purple" },
  Settings: { label: "Configuração", icon: Settings, tone: "orange" },
  Security: { label: "Segurança", icon: KeyRound, tone: "destructive" },
  Custom: { label: "Outro", icon: Sparkles, tone: "secondary" },
};
