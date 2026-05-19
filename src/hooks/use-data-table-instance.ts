"use client";
import * as React from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  OnChangeFn,
  PaginationState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

type UseDataTableInstanceProps<TData, TValue> = {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  enableRowSelection?: boolean;
  defaultPageIndex?: number;
  defaultPageSize?: number;
  getRowId?: (row: TData, index: number) => string;

  manualPagination?: boolean;
  pageCount?: number;
  state?: {
    pagination?: PaginationState;
  };
  onPaginationChange?: OnChangeFn<PaginationState>;
};

export function useDataTableInstance<TData, TValue>({
  data,
  columns,
  enableRowSelection = true,
  defaultPageIndex,
  defaultPageSize,
  getRowId,
  manualPagination,
  pageCount,
  state,
  onPaginationChange,
}: UseDataTableInstanceProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  // const [pagination, setPagination] = React.useState({
  //     pageIndex: defaultPageIndex ?? 0,
  //     pageSize: defaultPageSize ?? 10
  // });

  // 👇 internal fallback pagination state (only used if not controlled)
  const [internalPagination, setInternalPagination] = React.useState<PaginationState>({
    pageIndex: defaultPageIndex ?? 0,
    pageSize: defaultPageSize ?? 10,
  });
  const pagination = state?.pagination ?? internalPagination;

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    enableRowSelection,
    getRowId: getRowId ?? ((row) => (row as any)?.id?.toString()),

    // Selection, filters, sorting
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,

    // 🔥 SERVER-SIDE PAGINATION SUPPORT
    manualPagination: manualPagination ?? false,
    pageCount: manualPagination ? pageCount : undefined,
    onPaginationChange: (updater) => {
      if (onPaginationChange) {
        onPaginationChange(updater);
      } else {
        setInternalPagination(updater);
      }
    },

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),

    // 👇 ONLY ENABLE client pagination if NOT manual
    getPaginationRowModel: manualPagination ? undefined : getPaginationRowModel(),

    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return table;
}
