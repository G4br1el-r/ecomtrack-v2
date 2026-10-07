"use client";

import { Checkbox } from "@/components/animate-ui/components/radix/checkbox";
import { Label } from "@/components/ui/label";
import type { CatalogPage } from "@/schemas/Modules/Core/Access/catalog-page-schema";

export function PermissionPageItem({
  page,
  checked,
  checkedComponents,
  readOnly,
  onPageChange,
  onComponentChange,
}: {
  page: CatalogPage;
  checked: boolean;
  checkedComponents: string[];
  readOnly: boolean;
  onPageChange: (checked: boolean) => void;
  onComponentChange: (componentCode: string, checked: boolean) => void;
}) {
  const pageId = `permissao-${page.code}`;
  return (
    <li className="rounded-lg border bg-card p-3 transition-colors has-[[data-state=checked]]:border-primary/30">
      <div className="flex items-start gap-3">
        <Checkbox
          id={pageId}
          checked={checked}
          disabled={readOnly}
          onCheckedChange={(next) => onPageChange(next === true)}
          className="mt-0.5"
        />
        <div className="min-w-0 flex-1">
          <Label htmlFor={pageId} className="cursor-pointer font-medium">
            {page.name}
          </Label>
          {page.description ? <p className="text-muted-foreground text-xs">{page.description}</p> : null}
        </div>
        {page.components.length > 0 ? (
          <span className="shrink-0 text-muted-foreground text-xs tabular-nums">
            {page.components.filter((component) => checkedComponents.includes(component.code)).length}/
            {page.components.length}
          </span>
        ) : null}
      </div>
      {page.components.length > 0 ? (
        <ul className="mt-3 grid gap-2 border-t pt-3 pl-7 sm:grid-cols-2">
          {page.components.map((component) => {
            const componentId = `permissao-${component.code}`;
            return (
              <li key={component.code} className="flex items-start gap-2">
                <Checkbox
                  id={componentId}
                  size="sm"
                  checked={checkedComponents.includes(component.code)}
                  disabled={readOnly || !checked}
                  onCheckedChange={(next) => onComponentChange(component.code, next === true)}
                  className="mt-0.5"
                />
                <Label
                  htmlFor={componentId}
                  className="cursor-pointer font-normal text-sm peer-disabled:cursor-not-allowed"
                  title={component.description ?? undefined}
                >
                  {component.name}
                </Label>
              </li>
            );
          })}
        </ul>
      ) : null}
    </li>
  );
}
