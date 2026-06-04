"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLangStore } from "@/store/useLangStore";
import translations from "@/lib/i18n";
export interface SimplePaginationProps {
  page: number;
  limit: number;
  total: number;
  onChangePage: (page: number) => void;
  onChangeLimit: (limit: number) => void;
}

export default function NewTablePagination({
  page,
  limit,
  total,
  onChangePage,
  onChangeLimit,
}: SimplePaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const { lang } = useLangStore();
  const t = translations[lang as "fa" | "en"];

  return (
    <div className="flex items-center justify-between ">
      <div className="flex w-full items-center gap-4 lg:w-fit">
        <div className="items-center gap-2 lg:flex">
          <Select value={String(limit)} onValueChange={(v) => onChangeLimit(Number(v))}>
            <SelectTrigger size="sm" className="w-16" id="rows-per-page">
              <SelectValue />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
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
            onClick={() => onChangePage(page - 1)}
          >
            <ChevronRightIcon />
          </Button>

          {totalPages > 15 ? (
            <Input
              className="size-9 p-0 text-center"
              value={page}
              onChange={(e) => onChangePage(Number(e.target.value))}
            />
          ) : (
            <Select value={`${page}`} onValueChange={(value) => onChangePage(Number(value))}>
              <SelectTrigger
                chevron={false}
                size="sm"
                className="flex size-9 min-h-9 min-w-9 items-center justify-center p-0 text-center"
                id="page-select"
              >
                <SelectValue placeholder={page} />
              </SelectTrigger>
              <SelectContent side="top" className="min-w-12">
                {new Array(totalPages).fill(null).map((_, i) => (
                  <SelectItem key={i} value={`${i + 1}`}>
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <span>{t.of}</span>
          <div className="rounded-8 flex size-9 items-center justify-center border p-0 text-center">
            {totalPages}
          </div>

          <Button
            disabled={page === totalPages}
            variant="outline"
            size="icon"
            onClick={() => onChangePage(page + 1)}
          >
            <ChevronLeftIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
