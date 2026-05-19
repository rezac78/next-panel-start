"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { updateURL } from "@/utils/updateURL";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  page: number;
  limit: number;
  totalPage: number;
  sp: Record<string, string | string[]>;
}

export function DataTablePagination<TData>({
  table,
  page,
  limit,
  totalPage,
  sp,
}: DataTablePaginationProps<TData>) {
  const router = useRouter();
  const [pageInput, setPageInput] = React.useState(String(page + 1));

  const handlePageChange = (value: string) => {
    setPageInput(value);
    updateURL({ page: value, limit: 10 }, sp, router);
  };

  return (
    <div className="flex items-center justify-between px-4">
      <div className="flex w-full items-center gap-8 lg:w-fit">
        <div className="hidden items-center gap-2 lg:flex">
          <Label htmlFor="rows-per-page" className="text-sm font-medium">
            per page
          </Label>
          <Select
            value={`${limit}`}
            onValueChange={(value) => {
              updateURL({ page: 1, limit: value }, sp, router);
            }}
          >
            <SelectTrigger size="sm" className="w-20" id="rows-per-page">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-fit items-center justify-center gap-x-1 text-sm font-medium">
          <Button
            disabled={page === 1}
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(`${Number(pageInput) - 1}`)}
          >
            <ChevronLeftIcon />
          </Button>
          {totalPage > 15 ? (
            <Input
              className="size-9 p-0 text-center"
              value={page}
              onChange={(e) => handlePageChange(e.target.value)}
            />
          ) : (
            <Select
              value={`${page}`}
              onValueChange={(value) => {
                updateURL({ page: value, limit: limit }, sp, router);
              }}
            >
              <SelectTrigger chevron={false} size="sm" className="w-9" id="rows-per-page">
                <SelectValue placeholder={page} />
              </SelectTrigger>
              <SelectContent side="top" className="min-w-12">
                {new Array(totalPage).fill(null).map((_, i) => (
                  <SelectItem key={i} value={`${i + 1}`}>
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <span>of</span>
          <div className="rounded-8 flex size-9 items-center justify-center border p-0 text-center">
            {totalPage}
          </div>
          <Button
            disabled={page === totalPage}
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(`${Number(pageInput) + 1}`)}
          >
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
