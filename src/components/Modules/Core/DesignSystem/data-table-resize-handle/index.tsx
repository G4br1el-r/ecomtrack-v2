import {
  DATA_TABLE_RESIZE_HANDLE_OFFSET,
  DATA_TABLE_RESIZE_HANDLE_WIDTH,
} from "@/constants/Modules/Core/DesignSystem/data-table";
import { cn } from "@/lib/utils";

export function DataTableResizeHandle({
  label,
  last,
  resizing,
  onResize,
  onReset,
}: {
  label: string;
  last: boolean;
  resizing: boolean;
  onResize: (event: unknown) => void;
  onReset: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={`Redimensionar coluna ${label}. Clique duas vezes para voltar ao tamanho original.`}
      title="Arraste para redimensionar. Clique duas vezes para voltar ao tamanho original."
      data-resizing={resizing}
      onMouseDown={onResize}
      onTouchStart={onResize}
      onDoubleClick={onReset}
      style={{
        right: last ? 0 : DATA_TABLE_RESIZE_HANDLE_OFFSET,
        width: DATA_TABLE_RESIZE_HANDLE_WIDTH,
        cursor: "col-resize",
      }}
      className={cn(
        "group/resize absolute inset-y-0 z-30 flex touch-none outline-none select-none",
        last ? "justify-end" : "justify-center",
      )}
    >
      <span
        aria-hidden="true"
        className="my-2 w-px rounded-full bg-border transition-[width,background-color] group-hover/resize:w-0.5 group-hover/resize:bg-primary group-focus-visible/resize:w-0.5 group-focus-visible/resize:bg-primary group-active/resize:bg-primary group-data-[resizing=true]/resize:w-0.5 group-data-[resizing=true]/resize:bg-primary"
      />
    </button>
  );
}
