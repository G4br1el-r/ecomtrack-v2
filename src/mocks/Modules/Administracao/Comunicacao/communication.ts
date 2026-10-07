import type { Communication } from "@/schemas/Modules/Administracao/Comunicacao/communication-schema";
import type { NotificationDetail } from "@/schemas/Modules/Administracao/Comunicacao/notification-detail-schema";

export const COMMUNICATION_MOCK = {
  layout: [
    {
      key: "layout.header",
      name: "Cabeçalho",
      description: "Topo de todos os e-mails",
      part: "Header",
      channel: "Email",
      canBeDisabled: false,
      isEnabled: true,
      isCustom: false,
      hasCompanyDefault: false,
      updatedAt: null,
    },
  ],
  messages: [
    {
      key: "auth.login-code",
      name: "Código de login",
      description: "Código de 6 dígitos para entrar",
      part: "Message",
      channel: "Email",
      canBeDisabled: false,
      isEnabled: true,
      isCustom: false,
      hasCompanyDefault: false,
      updatedAt: null,
    },
    {
      key: "users.invite",
      name: "Convite de usuário",
      description: "Link para o convidado criar a senha",
      part: "Message",
      channel: "Email",
      canBeDisabled: true,
      isEnabled: true,
      isCustom: true,
      hasCompanyDefault: false,
      updatedAt: "2026-10-05T10:00:00Z",
    },
  ],
} satisfies Communication;

export const INVITE_NOTIFICATION_MOCK = {
  key: "users.invite",
  name: "Convite de usuário",
  description: "Link para o convidado criar a senha",
  part: "Message",
  canBeDisabled: true,
  isEnabled: true,
  isCustom: true,
  subject: "Você foi convidado",
  contentHtml: "<p>Olá </p>",
  companyDefaultSubject: null,
  companyDefaultContentHtml: null,
  platformDefaultSubject: "Convite",
  platformDefaultContentHtml: "<p>Olá {{nome}}</p>",
  variables: [{ name: "nome", description: "Nome do convidado", example: "Ana" }],
} satisfies NotificationDetail;
