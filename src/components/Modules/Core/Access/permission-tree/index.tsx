"use client";

import type { PermissionSelection } from "@/@types/Modules/Core/Access/permission-selection";
import { EmptyState } from "@/components/Modules/Core/DesignSystem/empty-state";
import { groupCatalogBySection } from "@/lib/Modules/Core/Access/group-catalog-by-section";
import { togglePermissionComponent } from "@/lib/Modules/Core/Access/toggle-permission-component";
import { togglePermissionPage } from "@/lib/Modules/Core/Access/toggle-permission-page";
import type { CatalogPage } from "@/schemas/Modules/Core/Access/catalog-page-schema";

import { PermissionPageItem } from "../permission-page-item";

export function PermissionTree({
  catalog,
  value,
  onChange,
  readOnly = false,
}: {
  catalog: CatalogPage[];
  value: PermissionSelection;
  onChange: (value: PermissionSelection) => void;
  readOnly?: boolean;
}) {
  if (catalog.length === 0) {
    return (
      <EmptyState
        className="min-h-0 py-8"
        illustration={null}
        title="Nenhuma página para liberar"
        description="O plano da empresa ainda não libera nenhuma página. Ajuste o plano em Plataforma › Planos."
      />
    );
  }

  return (
    <div className="space-y-6">
      {groupCatalogBySection(catalog).map((section) => (
        <section key={section.name} aria-label={section.name} className="space-y-2">
          <h3 className="font-medium text-muted-foreground text-xs uppercase tracking-wide">{section.name}</h3>
          <ul className="space-y-2">
            {section.pages.map((page) => (
              <PermissionPageItem
                key={page.code}
                page={page}
                checked={value.pages.includes(page.code)}
                checkedComponents={value.components}
                readOnly={readOnly}
                onPageChange={(checked) => onChange(togglePermissionPage(value, page, checked))}
                onComponentChange={(componentCode, checked) =>
                  onChange(togglePermissionComponent(value, page.code, componentCode, checked))
                }
              />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
