import { describe, expect, it } from "vitest";

import type { AuditLogDetail } from "@/schemas/Modules/Administracao/Auditoria/audit-log-detail-schema";

import { buildAuditDiff } from "./build-audit-diff";

const SUMMARY: AuditLogDetail["summary"] = {
  id: "a1",
  createdAt: "2026-10-07T10:00:00Z",
  type: "Update",
  pageCode: "usuarios",
  actionCode: "perfis.editarperfil",
  entityName: "Profile",
  entityId: "p1",
  userId: "u1",
  userName: "Ana",
  userEmail: "ana@empresa.com",
  description: "Editou perfil 'Vendas'",
  changedFields: ["Name", "PasswordHash"],
};

describe("buildAuditDiff", () => {
  it("monta antes e depois dos campos alterados, mantendo os mascarados", () => {
    expect(
      buildAuditDiff({
        summary: SUMMARY,
        oldValues: { Name: "Vendas", PasswordHash: "***", Other: 1 },
        newValues: { Name: "Comercial", PasswordHash: "***" },
        ip: null,
        userAgent: null,
        correlationId: null,
      }),
    ).toEqual([
      { field: "Name", before: "Vendas", after: "Comercial" },
      { field: "PasswordHash", before: "***", after: "***" },
    ]);
  });

  it("usa todos os campos quando a API não diz quais mudaram e trata vazios", () => {
    expect(
      buildAuditDiff({
        summary: { ...SUMMARY, changedFields: [] },
        oldValues: null,
        newValues: { Pages: ["usuarios"], IsDefault: true },
        ip: null,
        userAgent: null,
        correlationId: null,
      }),
    ).toEqual([
      { field: "Pages", before: "—", after: '["usuarios"]' },
      { field: "IsDefault", before: "—", after: "true" },
    ]);
  });
});
