"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FIRST_PAGE } from "@/constants/Modules/Core/DesignSystem/ui";
import { getPageRange } from "@/lib/Modules/Core/DesignSystem/get-page-range";
import { parsePageInput } from "@/lib/Modules/Core/DesignSystem/parse-page-input";

import { Combobox } from "../combobox";

export function PaginationBar({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  pageSizeOptions,
  onItemsPerPageChange,
}: {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  pageSizeOptions?: readonly number[];
  onItemsPerPageChange?: (itemsPerPage: number) => void;
}) {
  const [draft, setDraft] = useState<string | null>(null);
  const { start, end } = getPageRange(currentPage, itemsPerPage, totalItems);

  const commitDraft = () => {
    if (draft === null) return;
    const page = parsePageInput(draft, totalPages);
    if (page !== null) onPageChange(page);
    setDraft(null);
  };

  return (
    <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground">
      <span className="hidden tabular-nums sm:inline">
        Mostrando <span className="font-medium text-foreground">{start}</span>–
        <span className="font-medium text-foreground">{end}</span> de{" "}
        <span className="font-medium text-foreground">{totalItems}</span>
      </span>
      <span className="tabular-nums sm:hidden">
        {start}–{end} / {totalItems}
      </span>
      <div className="flex items-center gap-1">
        {pageSizeOptions && onItemsPerPageChange ? (
          <div className="mr-3 flex items-center gap-2">
            <span className="hidden sm:inline">Por página</span>
            <Combobox
              label="Itens por página"
              options={pageSizeOptions.map((size) => ({ value: String(size), label: String(size) }))}
              value={String(itemsPerPage)}
              onValueChange={(size) => onItemsPerPageChange(Number(size))}
              className="w-20"
            />
          </div>
        ) : null}
        <Button
          variant="outline"
          size="icon-sm"
          aria-label="Página anterior"
          disabled={currentPage <= FIRST_PAGE}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft aria-hidden="true" />
        </Button>
        <Input
          className="h-8 w-11 px-1 text-center tabular-nums"
          value={draft ?? String(currentPage)}
          inputMode="numeric"
          aria-label="Página atual"
          onChange={(event) => setDraft(event.target.value)}
          onBlur={commitDraft}
          onKeyDown={(event) => {
            if (event.key === "Enter") commitDraft();
          }}
        />
        <span className="tabular-nums">/ {totalPages}</span>
        <Button
          variant="outline"
          size="icon-sm"
          aria-label="Próxima página"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ChevronRight aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
