"use client";

import { useState } from "react";

import type { DataTableServer, DataTableSettings } from "@/@types/Modules/Core/DesignSystem/data-table";
import {
  DATA_TABLE_FIRST_PAGE_INDEX,
  DATA_TABLE_PAGE_NUMBER_OFFSET,
} from "@/constants/Modules/Core/DesignSystem/data-table";
import { resolvePageSize } from "@/lib/Modules/Core/DesignSystem/resolve-page-size";

import { useDataTablePreferences } from "./use-data-table-preferences";

const NO_PAGE_SIZE_OPTIONS: readonly number[] = [];

export function useDataTableServerState(settings: DataTableSettings) {
  const { preferences, patch } = useDataTablePreferences(settings);
  const pageSize = resolvePageSize(preferences.pageSize, settings.pagination?.pageSizeOptions ?? NO_PAGE_SIZE_OPTIONS);
  const [pageIndex, setPageIndex] = useState(DATA_TABLE_FIRST_PAGE_INDEX);
  const [search, setSearch] = useState("");

  return {
    query: { Page: pageIndex + DATA_TABLE_PAGE_NUMBER_OFFSET, PageSize: pageSize, Search: search },
    resetPage: () => setPageIndex(DATA_TABLE_FIRST_PAGE_INDEX),
    server: (totalCount: number): DataTableServer => ({
      totalCount,
      pageIndex,
      pageSize,
      search,
      onPageIndexChange: setPageIndex,
      onPageSizeChange: (size) => {
        patch({ pageSize: size });
        setPageIndex(DATA_TABLE_FIRST_PAGE_INDEX);
      },
      onSearch: (value) => {
        setSearch(value);
        setPageIndex(DATA_TABLE_FIRST_PAGE_INDEX);
      },
    }),
  };
}
