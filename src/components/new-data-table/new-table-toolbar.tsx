"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TableColumn } from "@/components/new-data-table/new-table";
import { useLangStore } from "@/store/useLangStore";
import translations from "@/lib/i18n";

export interface SimpleToolbarProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  onSearch: () => void;
  onClear?: () => void;
  columns: TableColumn[];
  setColumns: React.Dispatch<React.SetStateAction<TableColumn[]>>;
}

export default function NewTableToolbar({
  search,
  setSearch,
  onSearch,
  onClear,
  columns,
  setColumns,
}: SimpleToolbarProps) {
  const { lang } = useLangStore();
  const t = translations[lang as "fa" | "en"];

  return (
    <div className="flex items-center gap-3">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={`${t.Search}...`}
        className="w-full lg:w-64"
      />

      <Button onClick={onSearch}>{t.Search}</Button>
      <Button variant="outline" onClick={onClear}>
        {t.Clear}
      </Button>

      {/* <NewTableViewOption columns={columns} setColumns={setColumns} /> */}
    </div>
  );
}
