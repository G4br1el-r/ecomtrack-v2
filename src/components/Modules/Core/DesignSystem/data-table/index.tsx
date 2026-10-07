"use client";

import {
  type ColumnSizingState,
  type ColumnVisibilityState,
  functionalUpdate,
  type OnChangeFn,
  type PaginationState,
  type RowData,
  type RowSelectionState,
  useTable,
} from "@tanstack/react-table";
import { AnimatePresence } from "motion/react";
import { useMemo, useState } from "react";

import type {
  DataTableColumn,
  DataTableFeature,
  DataTableServer,
  DataTableSettings,
  DataTableToolbarSlots,
} from "@/@types/Modules/Core/DesignSystem/data-table";
import { Table, TableBody, TableHeader, TableRow } from "@/components/ui/table";
import {
  DATA_TABLE_DEFAULT_COLUMN,
  DATA_TABLE_FEATURE_KEYS,
  DATA_TABLE_FEATURES,
  DATA_TABLE_FIRST_PAGE_INDEX,
  DATA_TABLE_PAGE_NUMBER_OFFSET,
  DATA_TABLE_SKELETON_ROWS,
  DATA_TABLE_UTILITY_COLUMN_IDS,
} from "@/constants/Modules/Core/DesignSystem/data-table";
import { useDataTablePreferences } from "@/hooks/Modules/Core/DesignSystem/use-data-table-preferences";
import { buildDataTableColumns } from "@/lib/Modules/Core/DesignSystem/build-data-table-columns";
import { resetDataTableFeature } from "@/lib/Modules/Core/DesignSystem/reset-data-table-feature";
import { resolvePageSize } from "@/lib/Modules/Core/DesignSystem/resolve-page-size";
import { cn } from "@/lib/utils";
import { useDensityStore } from "@/store/Modules/Core/DesignSystem/density-store";

import { DataTableBodyRow } from "../data-table-body-row";
import { DataTableHeaderCell } from "../data-table-header-cell";
import { DataTableRowDetail } from "../data-table-row-detail";
import { DataTableToolbar } from "../data-table-toolbar";
import { PaginationBar } from "../pagination-bar";
import { TableSkeleton } from "../table-skeleton";

const NO_COLUMN_VISIBILITY: ColumnVisibilityState = {};
const NO_COLUMN_SIZING: ColumnSizingState = {};
const NO_COLUMN_ORDER: string[] = [];
const NO_PAGE_SIZE_OPTIONS: readonly number[] = [];

export function DataTable<TData extends RowData>({
  columns,
  data,
  getRowId,
  rowSelection,
  onRowSelectionChange,
  loading = false,
  empty,
  settings,
  renderDetail,
  toolbar,
  server,
}: {
  columns: DataTableColumn<TData>[];
  data: TData[];
  getRowId: (row: TData) => string;
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  loading?: boolean;
  empty?: React.ReactNode;
  settings?: DataTableSettings;
  renderDetail?: (row: TData) => React.ReactNode;
  toolbar?: DataTableToolbarSlots;
  server?: DataTableServer;
}) {
  const density = useDensityStore((state) => state.density);
  const { features, preferences, patch, setFeature, resetFeatures } = useDataTablePreferences(settings);
  const advanced = settings !== undefined;
  const selectable = onRowSelectionChange !== undefined;
  const canExpandDetail = features.expanding && renderDetail !== undefined;
  const columnVisibility = preferences.columnVisibility ?? NO_COLUMN_VISIBILITY;
  const columnSizing = preferences.columnSizing ?? NO_COLUMN_SIZING;
  const columnOrder = preferences.columnOrder ?? NO_COLUMN_ORDER;
  const pageSizeOptions = settings?.pagination?.pageSizeOptions ?? NO_PAGE_SIZE_OPTIONS;
  const paginated = pageSizeOptions.length > 0;
  const [pageIndex, setPageIndex] = useState(DATA_TABLE_FIRST_PAGE_INDEX);
  const pagination: PaginationState = server
    ? { pageIndex: server.pageIndex, pageSize: server.pageSize }
    : { pageIndex, pageSize: resolvePageSize(preferences.pageSize, pageSizeOptions) };

  const tableColumns = useMemo(
    () =>
      advanced
        ? buildDataTableColumns(columns, { select: selectable, expand: canExpandDetail, rowPin: features.rowPinning })
        : columns,
    [advanced, columns, selectable, canExpandDetail, features.rowPinning],
  );

  const table = useTable({
    features: DATA_TABLE_FEATURES,
    columns: tableColumns,
    defaultColumn: DATA_TABLE_DEFAULT_COLUMN,
    data,
    getRowId,
    state: {
      ...(rowSelection ? { rowSelection } : {}),
      columnOrder: columnOrder.length > 0 ? [...DATA_TABLE_UTILITY_COLUMN_IDS, ...columnOrder] : columnOrder,
      columnVisibility,
      columnSizing,
      pagination,
    },
    onRowSelectionChange,
    onColumnVisibilityChange: (updater) => patch({ columnVisibility: functionalUpdate(updater, columnVisibility) }),
    onColumnSizingChange: (updater) => patch({ columnSizing: functionalUpdate(updater, columnSizing) }),
    onPaginationChange: (updater) => {
      const next = functionalUpdate(updater, pagination);
      if (server) {
        if (next.pageSize !== pagination.pageSize) server.onPageSizeChange(next.pageSize);
        else server.onPageIndexChange(next.pageIndex);
        return;
      }
      setPageIndex(next.pageIndex);
      if (next.pageSize !== pagination.pageSize) patch({ pageSize: next.pageSize });
    },
    manualPagination: server !== undefined || !paginated,
    rowCount: server?.totalCount,
    enableRowSelection: selectable,
    enableSorting: features.sorting,
    enableGlobalFilter: advanced && server === undefined,
    globalFilterFn: "includesString",
    enableColumnFilters: false,
    enableHiding: advanced,
    enableColumnResizing: features.columnResizing,
    columnResizeMode: "onChange",
    enableExpanding: canExpandDetail,
    getRowCanExpand: () => canExpandDetail,
    enableRowPinning: features.rowPinning,
    keepPinnedRows: true,
  });

  const changeFeature = (feature: DataTableFeature, enabled: boolean) => {
    if (!enabled) resetDataTableFeature(table, feature);
    setFeature(feature, enabled);
  };

  const topRows = features.rowPinning ? table.getTopRows() : [];
  const rows = features.rowPinning ? table.getCenterRows() : table.getRowModel().rows;
  const visibleColumnCount = table.getVisibleLeafColumns().length;
  const pinnedRowsKey = topRows.map((row) => row.id).join();
  const paginationBar =
    paginated && !loading && table.getRowCount() > 0 ? (
      <PaginationBar
        currentPage={pagination.pageIndex + DATA_TABLE_PAGE_NUMBER_OFFSET}
        totalPages={table.getPageCount()}
        totalItems={table.getRowCount()}
        itemsPerPage={pagination.pageSize}
        onPageChange={(page) => table.setPageIndex(page - DATA_TABLE_PAGE_NUMBER_OFFSET)}
        pageSizeOptions={pageSizeOptions}
        onItemsPerPageChange={(size) => table.setPageSize(size)}
      />
    ) : null;

  return (
    <div className="space-y-3">
      {settings ? (
        <DataTableToolbar
          table={table}
          available={DATA_TABLE_FEATURE_KEYS.filter((feature) => settings.features[feature] !== undefined)}
          features={features}
          columnLayout={{ columnOrder, columnVisibility }}
          onFeatureChange={changeFeature}
          onResetFeatures={() => {
            for (const feature of DATA_TABLE_FEATURE_KEYS) resetDataTableFeature(table, feature);
            resetFeatures();
          }}
          onApplyColumns={patch}
          searchPlaceholder={settings.searchPlaceholder}
          search={server ? { value: server.search, onSearch: server.onSearch } : undefined}
          slots={toolbar}
        />
      ) : null}
      {paginationBar}
      {loading ? (
        <TableSkeleton rows={DATA_TABLE_SKELETON_ROWS} columns={columns.length} />
      ) : (
        <div
          data-density={density}
          data-resizing={table.store.state.columnResizing.isResizingColumn ? true : undefined}
          className="group/table overflow-hidden rounded-lg border bg-card data-resizing:cursor-col-resize data-resizing:select-none data-resizing:[&_*]:cursor-col-resize"
        >
          <Table
            className={cn(advanced && "table-fixed")}
            style={advanced ? { width: table.getTotalSize(), minWidth: "100%" } : undefined}
          >
            <TableHeader className="bg-muted/40">
              {table.getHeaderGroups().map((group) => (
                <TableRow key={group.id} className="hover:bg-transparent">
                  {group.headers.map((header) => (
                    <DataTableHeaderCell key={header.id} header={header} sized={advanced} />
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              <AnimatePresence initial={false} mode="popLayout">
                {[...topRows, ...rows].flatMap((row) => [
                  <DataTableBodyRow key={row.id} row={row} sized={advanced} pinnedRowsKey={pinnedRowsKey} />,
                  ...(renderDetail && row.getIsExpanded()
                    ? [
                        <DataTableRowDetail key={`${row.id}-detail`} colSpan={visibleColumnCount}>
                          {renderDetail(row.original)}
                        </DataTableRowDetail>,
                      ]
                    : []),
                ])}
              </AnimatePresence>
            </TableBody>
          </Table>
          {rows.length === 0 && topRows.length === 0 ? <div>{empty}</div> : null}
        </div>
      )}
      {paginationBar}
    </div>
  );
}
