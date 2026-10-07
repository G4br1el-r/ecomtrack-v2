import type { AuditLog } from "@/schemas/Modules/Administracao/Auditoria/audit-log-schema";

export const AUDIT_LOGS_MOCK = [
  {
    id: "log-1",
    createdAt: "2026-10-07T10:00:00Z",
    type: "Update",
    pageCode: "usuarios",
    actionCode: "perfis.editarperfil",
    entityName: "Profile",
    entityId: "p-1",
    userId: "u-1",
    userName: "Ana Souza",
    userEmail: "ana@empresa.com",
    description: "Editou perfil 'Vendas'",
    changedFields: ["Name"],
  },
  {
    id: "log-2",
    createdAt: "2026-10-07T09:00:00Z",
    type: "Login",
    pageCode: null,
    actionCode: null,
    entityName: null,
    entityId: null,
    userId: null,
    userName: null,
    userEmail: null,
    description: null,
    changedFields: [],
  },
] satisfies AuditLog[];
