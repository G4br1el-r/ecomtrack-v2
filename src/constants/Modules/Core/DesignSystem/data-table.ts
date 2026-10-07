import {
  columnFilteringFeature,
  columnOrderingFeature,
  columnResizingFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  createExpandedRowModel,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFns,
  globalFilteringFeature,
  rowExpandingFeature,
  rowPaginationFeature,
  rowPinningFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFns,
  tableFeatures,
} from "@tanstack/react-table";
import type {
  DataTableColumnLayout,
  DataTableColumnMeta,
  DataTableFeature,
  DataTableFeatureFlags,
} from "@/@types/Modules/Core/DesignSystem/data-table";
import type { Hotkey } from "@/@types/Modules/Core/Shell/hotkey";

export const DATA_TABLE_FEATURES = tableFeatures({
  rowSortingFeature,
  columnFilteringFeature,
  globalFilteringFeature,
  rowExpandingFeature,
  rowPaginationFeature,
  rowPinningFeature,
  rowSelectionFeature,
  columnOrderingFeature,
  columnVisibilityFeature,
  columnSizingFeature,
  columnResizingFeature,
  sortedRowModel: createSortedRowModel(),
  filteredRowModel: createFilteredRowModel(),
  expandedRowModel: createExpandedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortFns,
  filterFns,
  columnMeta: {} as DataTableColumnMeta,
});

export const DATA_TABLE_FEATURE_KEYS = ["sorting", "columnResizing", "expanding", "rowPinning"] as const;

export const DATA_TABLE_FEATURE_OPTIONS: Record<DataTableFeature, { label: string; description: string }> = {
  sorting: { label: "Ordenação", description: "Clique no cabeçalho. Shift + clique ordena por várias colunas." },
  columnResizing: { label: "Redimensionar colunas", description: "Arraste a linha na borda do cabeçalho." },
  expanding: { label: "Expandir detalhes", description: "Abre o detalhe da linha logo abaixo dela." },
  rowPinning: { label: "Fixar linhas", description: "Prende linhas no topo pelo alfinete no começo da linha." },
};

export const DATA_TABLE_BASIC_FEATURES: Partial<DataTableFeatureFlags> = { sorting: true };

export const DATA_TABLE_SELECT_COLUMN_ID = "select";
export const DATA_TABLE_EXPAND_COLUMN_ID = "expand";
export const DATA_TABLE_ROW_PIN_COLUMN_ID = "row-pin";
export const DATA_TABLE_UTILITY_COLUMN_IDS = [
  DATA_TABLE_SELECT_COLUMN_ID,
  DATA_TABLE_EXPAND_COLUMN_ID,
  DATA_TABLE_ROW_PIN_COLUMN_ID,
];
export const DATA_TABLE_UTILITY_COLUMN_SIZE = 48;
export const DATA_TABLE_UTILITY_COLUMN_OPTIONS = {
  size: DATA_TABLE_UTILITY_COLUMN_SIZE,
  minSize: DATA_TABLE_UTILITY_COLUMN_SIZE,
  enableSorting: false,
  enableHiding: false,
  enableColumnFilter: false,
  enableGlobalFilter: false,
  enableResizing: false,
};

export const DATA_TABLE_MIN_COLUMN_SIZE = 80;
export const DATA_TABLE_RESIZE_HANDLE_WIDTH = 20;
export const DATA_TABLE_RESIZE_HANDLE_OFFSET = -10;
export const DATA_TABLE_DEFAULT_COLUMN = { minSize: DATA_TABLE_MIN_COLUMN_SIZE };
export const DATA_TABLE_SKELETON_ROWS = 5;
export const DATA_TABLE_FIRST_PAGE_INDEX = 0;
export const DATA_TABLE_PAGE_NUMBER_OFFSET = 1;
export const DATA_TABLE_SEARCH_HOTKEY: Hotkey = { key: "/" };
export const DATA_TABLE_PREFERENCES_STORAGE_KEY = "ecomtrack-data-table-preferences";
export const DATA_TABLE_DEFAULT_COLUMN_LAYOUT: DataTableColumnLayout = {
  columnOrder: [],
  columnVisibility: {},
};
export const DATA_TABLE_REORDER_STEP = 1;
export const DATA_TABLE_POPOVER_COLLISION_PADDING = 16;
export const DATA_TABLE_POPOVER_CLASS =
  "flex max-h-(--radix-popover-content-available-height) flex-col overflow-hidden p-0";
export const DATA_TABLE_POPOVER_SCROLL_CLASS = "max-h-72 min-h-0 flex-1 overflow-y-auto overscroll-contain";
export const DATA_TABLE_MULTI_SORT_MIN_COLUMNS = 2;
export const DATA_TABLE_SORT_INDEX_OFFSET = 1;
