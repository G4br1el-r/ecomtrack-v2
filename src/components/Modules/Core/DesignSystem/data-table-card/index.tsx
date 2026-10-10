"use client";

import { FlexRender, type RowData } from "@tanstack/react-table";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import type { DataTableRow } from "@/@types/Modules/Core/DesignSystem/data-table";
import { DURATION_FAST, ENTER_OFFSET_Y, SPRING_SOFT } from "@/constants/Modules/Core/DesignSystem/motion";
import { splitDataTableCardCells } from "@/lib/Modules/Core/DesignSystem/split-data-table-card-cells";

import { DataTableCardField } from "../data-table-card-field";
import { DataTableExpandButton } from "../data-table-expand-button";

export function DataTableCard<TData extends RowData>({
  row,
  pinnedRowsKey,
  expandable,
  detail,
}: {
  row: DataTableRow<TData>;
  pinnedRowsKey: string;
  expandable: boolean;
  detail?: React.ReactNode;
}) {
  const [showExtraFields, setShowExtraFields] = useState(false);
  const { leading, trailing, title, badges, highlights, fields, extraFields } = splitDataTableCardCells(
    row.getVisibleCells(),
  );
  const expanded = row.getIsExpanded();
  const hasFooter = extraFields.length > 0 || expandable;

  return (
    <motion.li
      layout="position"
      layoutDependency={pinnedRowsKey}
      initial={{ opacity: 0, y: ENTER_OFFSET_Y }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -ENTER_OFFSET_Y, transition: { duration: DURATION_FAST } }}
      transition={SPRING_SOFT}
      data-state={row.getIsSelected() ? "selected" : undefined}
      data-pinned={row.getIsPinned() || undefined}
      className="overflow-hidden rounded-xl border pb-1.5 has-data-[slot=card-footer]:pb-0 bg-card text-card-foreground shadow-xs transition-[border-color,box-shadow,background-color] data-pinned:border-primary/30 data-pinned:bg-primary/[0.02] data-[state=selected]:border-primary/60 data-[state=selected]:bg-primary/[0.03] data-[state=selected]:ring-1 data-[state=selected]:ring-primary/25"
    >
      <div className="flex items-start gap-3 p-4 pb-3 group-data-[density=compact]/table:px-3 group-data-[density=compact]/table:pt-3 group-data-[density=compact]/table:pb-2">
        {leading.map((cell) => (
          <div key={cell.id} className="flex h-9 shrink-0 items-center">
            <FlexRender cell={cell} />
          </div>
        ))}
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex min-h-9 min-w-0 items-center text-[15px] leading-snug font-semibold break-words *:min-w-0 *:max-w-full [&_.text-muted-foreground]:font-normal [&_.truncate]:line-clamp-2 [&_.truncate]:whitespace-normal">
            {title ? <FlexRender cell={title} /> : null}
          </div>
          {badges.length > 0 ? (
            <div className="flex flex-wrap items-center gap-1.5">
              {badges.map((cell) => (
                <FlexRender key={cell.id} cell={cell} />
              ))}
            </div>
          ) : null}
        </div>
        {trailing.length > 0 ? (
          <div className="-mr-1.5 flex h-9 shrink-0 items-center gap-0.5">
            {trailing.map((cell) => (
              <FlexRender key={cell.id} cell={cell} />
            ))}
          </div>
        ) : null}
      </div>

      {highlights.length > 0 ? (
        <dl className="mx-4 mb-3 flex divide-x divide-border rounded-lg bg-muted/60 py-2.5 group-data-[density=compact]/table:mx-3 group-data-[density=compact]/table:py-2 [&_.items-end]:items-start [&_.text-right]:text-left">
          {highlights.map((cell) => (
            <div key={cell.id} className="min-w-0 flex-1 space-y-1 px-3">
              <dt className="truncate text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                {cell.column.columnDef.meta?.label ?? cell.column.id}
              </dt>
              <dd className="text-base leading-tight font-semibold text-foreground tabular-nums">
                <FlexRender cell={cell} />
              </dd>
            </div>
          ))}
        </dl>
      ) : null}

      {fields.length > 0 ? (
        <dl className="mx-4 divide-y divide-border/70 border-t group-data-[density=compact]/table:mx-3">
          {fields.map((cell) => (
            <DataTableCardField key={cell.id} cell={cell} />
          ))}
        </dl>
      ) : null}

      <AnimatePresence initial={false}>
        {showExtraFields ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={SPRING_SOFT}
            className="overflow-clip"
          >
            <dl className="mx-4 divide-y divide-border/70 border-t group-data-[density=compact]/table:mx-3">
              {extraFields.map((cell) => (
                <DataTableCardField key={cell.id} cell={cell} />
              ))}
            </dl>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {detail ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={SPRING_SOFT}
            className="overflow-clip"
          >
            <div className="border-t bg-muted/30 p-4 group-data-[density=compact]/table:p-3">{detail}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {hasFooter ? (
        <div data-slot="card-footer" className="flex items-center gap-2 border-t px-2 py-1.5">
          {extraFields.length > 0 ? (
            <DataTableExpandButton
              showLabel
              expanded={showExtraFields}
              label={showExtraFields ? "Menos informações" : `Mais informações (${extraFields.length})`}
              onToggle={() => setShowExtraFields((current) => !current)}
            />
          ) : null}
          {expandable ? (
            <DataTableExpandButton
              className="ml-auto"
              showLabel
              expanded={expanded}
              label={expanded ? "Ocultar detalhes" : "Ver detalhes"}
              onToggle={row.getToggleExpandedHandler()}
            />
          ) : null}
        </div>
      ) : null}
    </motion.li>
  );
}
