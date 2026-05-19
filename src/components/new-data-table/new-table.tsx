"use client";

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

export interface TableColumn<T = any> {
  id: string;
  label: string;
  visible: boolean;
  sortable?: boolean;
  hideable?: boolean;
  checkbox?: boolean;
  render?: (row: T, helpers: T) => React.ReactNode;
}

export interface SimpleTableProps {
  columns: TableColumn[];
  data: any[];
  sort: string;
  order: string;
  onSort: (columnId: string) => void;
  selectedRows: Set<string>;
  onToggleRow: (id: string) => void;
  onToggleAll: () => void;
}

export default function NewTable({
  columns,
  data,
  sort,
  order,
  onSort,
  selectedRows,
  onToggleRow,
  onToggleAll,
}: SimpleTableProps) {
  const visibleCols = columns.filter((c) => c.visible);
  const { lang } = useLangStore();
  const t = translations[lang as "fa" | "en"];
  const allSelected = data?.length > 0 && selectedRows?.size === data?.length;

  return (
    <Table className="grow">
      <TableHeader className="bg-accent sticky top-0 z-10 backdrop-blur-[5px]">
        <TableRow>
          {visibleCols.map((col) => (
            <TableHead
              key={col.id}
              onClick={() => {
                if (col.sortable) onSort(col.id);
              }}
              className={col.sortable ? "cursor-pointer in-last:" : "flex justify-end items-center pr-14"}
            >
              {col.checkbox ? (
                <Checkbox checked={allSelected} onCheckedChange={onToggleAll} />
              ) : (
                <>
                  {col.label}
                  {sort === col.id && (order === "asc" ? " ↑" : " ↓")}
                </>
              )}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data?.length !== 0 ? (
          data?.map((row) => (
            <TableRow key={row._id}>
              {visibleCols.map((col) => (
                <TableCell key={col.id}>
                  {col.checkbox ? (
                    <Checkbox
                      checked={selectedRows.has(row.id)}
                      onCheckedChange={() => onToggleRow(row.id)}
                    />
                  ) : (
                    col.render?.(row, { ...row })
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={columns.filter((c) => c.visible).length}
              className="text-muted-foreground h-32 text-center text-lg font-medium"
            >
              {t.NoData}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
