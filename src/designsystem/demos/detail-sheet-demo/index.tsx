"use client";

import { Package } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { DetailGroup } from "@/components/Modules/Core/DesignSystem/detail-group";
import { DetailRow } from "@/components/Modules/Core/DesignSystem/detail-row";
import { DetailSection } from "@/components/Modules/Core/DesignSystem/detail-section";
import { DetailSheet } from "@/components/Modules/Core/DesignSystem/detail-sheet";
import { InlineEditActions } from "@/components/Modules/Core/DesignSystem/inline-edit-actions";
import { InlineEditButton } from "@/components/Modules/Core/DesignSystem/inline-edit-button";
import { Timeline } from "@/components/Modules/Core/DesignSystem/timeline";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { TIMELINE_EVENTS } from "../../mocks/timeline";

export function DetailSheetDemo() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        <Package data-icon="inline-start" aria-hidden="true" />
        Sheet de detalhe
      </Button>
      <DetailSheet
        open={open}
        onOpenChange={setOpen}
        icon={Package}
        title="Gift Card PlayStation R$ 100"
        description="SKU PSN-100-BR · criado em 12/08/2026"
      >
        <DetailSection title="Informações">
          <DetailGroup divided>
            <DetailRow label="Status">
              <Badge variant="success">Ativo</Badge>
            </DetailRow>
            <DetailRow label="Marca" value="PlayStation" />
            <DetailRow label="Categoria" value="Games › PlayStation" />
            <DetailRow label="Estoque" value="342 códigos" valueClassName="tabular-nums" />
          </DetailGroup>
        </DetailSection>
        <DetailSection
          title="Preço"
          action={editing ? null : <InlineEditButton label="Editar preço" onClick={() => setEditing(true)} />}
        >
          <DetailGroup>
            {editing ? (
              <div className="py-3">
                <Field>
                  <FieldLabel htmlFor="detalhe-preco">Preço de venda</FieldLabel>
                  <Input id="detalhe-preco" defaultValue="100,00" />
                </Field>
                <InlineEditActions
                  onCancel={() => setEditing(false)}
                  onConfirm={() => {
                    setEditing(false);
                    toast.success("Preço atualizado");
                  }}
                />
              </div>
            ) : (
              <DetailRow label="Preço de venda" value="R$ 100,00" valueClassName="tabular-nums" />
            )}
          </DetailGroup>
        </DetailSection>
        <DetailSection title="Histórico">
          <Timeline events={TIMELINE_EVENTS} />
        </DetailSection>
      </DetailSheet>
    </>
  );
}
