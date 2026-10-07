"use client";

import { format, parseISO } from "date-fns";
import { ClipboardPlus, Eye, EyeOff, Package } from "lucide-react";

import { SupplierCostCell } from "@/components/Modules/Catalogo/EsteiraCadastro/supplier-cost-cell";
import { DetailGroup } from "@/components/Modules/Core/DesignSystem/detail-group";
import { DetailRow } from "@/components/Modules/Core/DesignSystem/detail-row";
import { DetailSection } from "@/components/Modules/Core/DesignSystem/detail-section";
import { DetailSheet } from "@/components/Modules/Core/DesignSystem/detail-sheet";
import { StaggerReveal } from "@/components/Modules/Core/DesignSystem/stagger-reveal";
import { StaggerRevealItem } from "@/components/Modules/Core/DesignSystem/stagger-reveal-item";
import { Timeline } from "@/components/Modules/Core/DesignSystem/timeline";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DATE_TIME_FORMAT,
  PIPELINE_STATUS,
  SUPPLIER_LABEL,
} from "@/constants/Modules/Catalogo/EsteiraCadastro/pipeline";
import { EMPTY_VALUE } from "@/constants/Modules/Core/DesignSystem/number-format";
import { usePipelineProducts } from "@/hooks/Modules/Catalogo/EsteiraCadastro/use-pipeline-products";
import { buildImportTimeline } from "@/lib/Modules/Catalogo/EsteiraCadastro/build-import-timeline";
import { formatNumber } from "@/lib/Modules/Core/DesignSystem/format-number";
import { usePipelineDetailStore } from "@/store/Modules/Catalogo/EsteiraCadastro/pipeline-detail-store";

import { ExchangeRates } from "../exchange-rates";

export function ImportDetailSheet() {
  const { data = [] } = usePipelineProducts();
  const productId = usePipelineDetailStore((state) => state.productId);
  const open = usePipelineDetailStore((state) => state.open);
  const setOpen = usePipelineDetailStore((state) => state.setOpen);
  const product = data.find((item) => item.id === productId);

  if (!product) return null;

  const status = PIPELINE_STATUS[product.status];
  const ignored = product.status === "ignorado";

  return (
    <DetailSheet
      open={open}
      onOpenChange={setOpen}
      icon={Package}
      title={product.name}
      description={`${product.sku} · ${SUPPLIER_LABEL[product.supplier]}`}
      footer={
        ignored ? (
          <Button variant="outline">
            <Eye data-icon="inline-start" aria-hidden="true" />
            Reativar
          </Button>
        ) : (
          <>
            <Button variant="outline">
              <EyeOff data-icon="inline-start" aria-hidden="true" />
              Ignorar
            </Button>
            <Button>
              <ClipboardPlus data-icon="inline-start" aria-hidden="true" />
              Cadastrar
            </Button>
          </>
        )
      }
    >
      <StaggerReveal className="space-y-7">
        <StaggerRevealItem>
          <div className="flex items-start gap-3 rounded-lg border bg-muted/40 px-4 py-3">
            <Badge variant={status.tone}>{status.label}</Badge>
            <p className="text-sm text-muted-foreground">{status.hint}</p>
          </div>
        </StaggerRevealItem>
        <StaggerRevealItem>
          <DetailSection title="Dados do fornecedor">
            <DetailGroup divided>
              <DetailRow label="Fornecedor" value={SUPPLIER_LABEL[product.supplier]} />
              <DetailRow label="Valor no fornecedor">
                <SupplierCostCell cost={product.cost} supplierCost={product.supplierCost} currency={product.currency} />
              </DetailRow>
              <DetailRow
                label="Estoque disponível"
                value={`${formatNumber(product.stock, "integer")} unidades`}
                valueClassName={product.stock === 0 ? "text-destructive tabular-nums" : "tabular-nums"}
              />
              <DetailRow
                label="Importado em"
                value={format(parseISO(product.importedAt), DATE_TIME_FORMAT)}
                valueClassName="tabular-nums"
              />
            </DetailGroup>
          </DetailSection>
        </StaggerRevealItem>
        <StaggerRevealItem>
          <DetailSection title="Cotações">
            <ExchangeRates />
          </DetailSection>
        </StaggerRevealItem>
        <StaggerRevealItem>
          <DetailSection title="Descrição">
            <DetailGroup divided>
              <DetailRow label="Categoria" value={product.supplierCategory} />
              <DetailRow label="Região" value={product.region} />
              <DetailRow label="Marca" value={product.brand ?? EMPTY_VALUE} />
            </DetailGroup>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {product.supplierDescription ?? "O fornecedor não enviou descrição para este produto."}
            </p>
          </DetailSection>
        </StaggerRevealItem>
        <StaggerRevealItem>
          <DetailSection title="Histórico">
            <Timeline events={buildImportTimeline(product)} />
          </DetailSection>
        </StaggerRevealItem>
      </StaggerReveal>
    </DetailSheet>
  );
}
