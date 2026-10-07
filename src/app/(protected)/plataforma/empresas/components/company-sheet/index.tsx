"use client";

import { Building } from "lucide-react";

import { DetailSheet } from "@/components/Modules/Core/DesignSystem/detail-sheet";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { COMPANY_FORM_ID } from "@/constants/Modules/Plataforma/Empresas/companies";
import { useCompany } from "@/hooks/Modules/Plataforma/Empresas/use-company";
import { useCompanyPanelStore } from "@/store/Modules/Plataforma/Empresas/company-panel-store";

import { CompanyForm } from "../company-form";

export function CompanySheet() {
  const company = useCompanyPanelStore((state) => state.company);
  const isOpen = useCompanyPanelStore((state) => state.isOpen);
  const close = useCompanyPanelStore((state) => state.close);
  const detail = useCompany(isOpen && company ? company.id : null);
  const editing = company !== null;
  const ready = !editing || detail.data;

  return (
    <DetailSheet
      open={isOpen}
      onOpenChange={(next) => {
        if (!next) close();
      }}
      icon={Building}
      title={editing ? `Editar ${company.name}` : "Nova empresa"}
      description={
        editing
          ? "Trocar o plano refaz na hora as permissões de todos os perfis da empresa."
          : "A empresa nasce ativa e sem usuários. Depois, convide o primeiro usuário."
      }
      footer={
        <>
          <Button variant="ghost" onClick={close}>
            Cancelar
          </Button>
          <Button type="submit" form={COMPANY_FORM_ID} disabled={!ready}>
            {editing ? "Salvar" : "Criar empresa"}
          </Button>
        </>
      }
    >
      {ready ? (
        <CompanyForm key={company?.id ?? "nova"} company={detail.data ?? null} onSaved={close} />
      ) : (
        <div className="space-y-3" role="status" aria-label="Carregando a empresa">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </div>
      )}
    </DetailSheet>
  );
}
