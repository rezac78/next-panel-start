"use client";

import React from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Database,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { useLangStore } from "@/store/useLangStore";
import translations from "@/lib/i18n";
import { cn } from "@/lib/utils";

export interface TableColumn<T = any> {
  id: string;
  label: string;
  visible: boolean;
  sortable?: boolean;
  hideable?: boolean;
  checkbox?: boolean;
  align?: "start" | "center" | "end";
  width?: string;
  render?: (row: T, helpers: T) => React.ReactNode;
}

export interface NewTableProps<T = any> {
  columns: TableColumn<T>[];
  data: T[];
  sort: string;
  order: string;
  onSort: (columnId: string) => void;
  selectedRows: Set<string>;
  onToggleRow: (id: string) => void;
  onToggleAll: () => void;
  getRowId?: (row: T) => string;
  emptyTitle?: string;
  emptyDescription?: string;
}

function getDefaultRowId(row: any) {
  return String(row?.id ?? row?._id ?? "");
}

function getAlignClass(align?: "start" | "center" | "end") {
  if (align === "center") return "text-center";
  if (align === "end") return "text-end";
  return "text-start";
}

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-72 w-full flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/20 px-6 py-12 text-center">
      <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-muted">
        <Database className="size-7 text-muted-foreground" />
      </div>
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

export default function NewTable<T extends Record<string, any>>({
  columns,
  data,
  sort,
  order,
  onSort,
  selectedRows,
  onToggleRow,
  onToggleAll,
  getRowId = getDefaultRowId,
  emptyTitle,
  emptyDescription,
}: NewTableProps<T>) {
  const visibleCols = columns.filter((column) => column.visible);
  const dataRows = Array.isArray(data) ? data : [];
  const { lang } = useLangStore();
  const t = translations[lang as "fa" | "en"];

  const allSelected =
    dataRows.length > 0 &&
    dataRows.every((row) => selectedRows.has(getRowId(row)));

  const isEmpty = dataRows.length === 0;

  const finalEmptyTitle = emptyTitle ?? t.NotFound;
  const finalEmptyDescription =
    emptyDescription ?? t.table?.emptyDescription ?? "";

  const renderSortIcon = (columnId: string, sortable?: boolean) => {
    if (!sortable) return null;

    if (sort !== columnId) {
      return <ArrowUpDown className="size-3.5 text-muted-foreground/70" />;
    }

    if (order === "asc") {
      return <ArrowUp className="size-3.5 text-primary" />;
    }

    return <ArrowDown className="size-3.5 text-primary" />;
  };

  if (isEmpty) {
    return (
      <EmptyState
        title={finalEmptyTitle}
        description={finalEmptyDescription}
      />
    );
  }

  return (
    <>
      <div className="hidden md:block">
        <Table>
          <TableHeader className="sticky top-0 z-10 backdrop-blur">
            <TableRow className="hover:bg-transparent">
              {visibleCols.map((column) => {
                const isSortable = Boolean(column.sortable);

                return (
                  <TableHead
                    key={column.id}
                    style={{ width: column.width }}
                    onClick={() => {
                      if (isSortable) onSort(column.id);
                    }}
                    className={cn(
                      getAlignClass(column.align),
                      isSortable && "cursor-pointer select-none hover:bg-muted/80",
                      column.checkbox && "text-center"
                    )}
                  >
                    {column.checkbox ? (
                      <div className="flex items-center justify-center">
                        <Checkbox
                          checked={allSelected}
                          onCheckedChange={onToggleAll}
                          aria-label="Select all rows"
                        />
                      </div>
                    ) : (
                      <div
                        className={cn(
                          "flex items-center gap-2",
                          column.align === "center" && "justify-center",
                          column.align === "end" && "justify-end"
                        )}
                      >
                        <span>{column.label}</span>
                        {renderSortIcon(column.id, column.sortable)}
                      </div>
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>

          <TableBody>
            {dataRows.map((row) => {
              const rowId = getRowId(row);
              const isSelected = selectedRows.has(rowId);

              return (
                <TableRow
                  key={rowId}
                  data-state={isSelected ? "selected" : undefined}
                  className="group"
                >
                  {visibleCols.map((column) => (
                    <TableCell
                      key={column.id}
                      className={cn(
                        getAlignClass(column.align),
                        column.checkbox && "text-center"
                      )}
                    >
                      {column.checkbox ? (
                        <div className="flex items-center justify-center">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => onToggleRow(rowId)}
                            aria-label="Select row"
                          />
                        </div>
                      ) : column.render ? (
                        column.render(row, row)
                      ) : (
                        <span className="block max-w-80 truncate">
                          {row[column.id] ?? "-"}
                        </span>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="space-y-3 md:hidden">
        {dataRows.map((row) => {
          const rowId = getRowId(row);
          const isSelected = selectedRows.has(rowId);
          const contentColumns = visibleCols.filter((column) => !column.checkbox);
          const checkboxColumn = visibleCols.find((column) => column.checkbox);

          return (
            <div
              key={rowId}
              className={cn(
                "rounded-2xl border bg-background p-4 shadow-sm transition-colors",
                isSelected && "border-primary/40 bg-primary/5"
              )}
            >
              {checkboxColumn && (
                <div className="mb-3 flex items-center justify-between border-b pb-3">
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {t.Select}
                  </span>
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => onToggleRow(rowId)}
                    aria-label="Select row"
                  />
                </div>
              )}

              <div className="space-y-4">
                {contentColumns.map((column) => (
                  <div
                    key={column.id}
                    className={cn(
                      "flex flex-col gap-1",
                      column.align === "end" && "items-end",
                      column.align === "center" && "items-center"
                    )}
                  >
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {column.label}
                    </span>
                    <div className="w-full text-sm text-foreground">
                      {column.render ? (
                        column.render(row, row)
                      ) : (
                        <span className="break-words">
                          {row[column.id] ?? "-"}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}