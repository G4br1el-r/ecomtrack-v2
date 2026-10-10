import type { Cell, Column, ColumnDef, Header, Row, RowData, Table } from "@tanstack/react-table";

import type { DATA_TABLE_FEATURE_KEYS, DATA_TABLE_FEATURES } from "@/constants/Modules/Core/DesignSystem/data-table";

export type DataTableFeatures = typeof DATA_TABLE_FEATURES;

export type DataTableColumn<TData extends RowData> = ColumnDef<DataTableFeatures, TData>;

export type DataTableTable<TData extends RowData> = Table<DataTableFeatures, TData>;

export type DataTableColumnInstance<TData extends RowData, TValue = unknown> = Column<DataTableFeatures, TData, TValue>;

export type DataTableHeader<TData extends RowData> = Header<DataTableFeatures, TData, unknown>;

export type DataTableRow<TData extends RowData> = Row<DataTableFeatures, TData>;

export type DataTableCell<TData extends RowData> = Cell<DataTableFeatures, TData, unknown>;

export type DataTableFeature = (typeof DATA_TABLE_FEATURE_KEYS)[number];

export type DataTableFeatureFlags = Record<DataTableFeature, boolean>;

export type DataTableSettings = {
  id: string;
  features: Partial<DataTableFeatureFlags>;
  pagination?: { pageSizeOptions: readonly number[] };
  searchPlaceholder?: string;
};

export type DataTableToolbarSlots = {
  start?: React.ReactNode;
  end?: React.ReactNode;
  below?: React.ReactNode;
};

export type DataTableServer = {
  totalCount: number;
  pageIndex: number;
  pageSize: number;
  search: string;
  onPageIndexChange: (pageIndex: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onSearch: (search: string) => void;
};

export type DataTableCardSlot = "title" | "badge" | "highlight" | "field" | "hidden";

export type DataTableColumnMeta = {
  label?: string;
  card?: DataTableCardSlot;
};

export type DataTableColumnLayout = {
  columnOrder: string[];
  columnVisibility: Record<string, boolean>;
};

export type DataTableColumnOption = {
  id: string;
  label: string;
};

export type DataTableColumnDraftItem = DataTableColumnOption & {
  visible: boolean;
};
