"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings2 } from "lucide-react";
import { TableColumn } from "@/components/new-data-table/new-table";
export interface SimpleViewOptionsProps {
  columns: TableColumn[];
  setColumns: React.Dispatch<React.SetStateAction<TableColumn[]>>;
}

export default function NewTableViewOption({ columns, setColumns }: SimpleViewOptionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8">
          <Settings2 className="mr-1" />
          View
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="max-w-[250px]">
        <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {columns
          .filter((c) => c.hideable !== false)
          ?.map((col) => (
            <DropdownMenuCheckboxItem
              key={col.id}
              checked={col.visible}
              onCheckedChange={() =>
                setColumns((prev) =>
                  prev.map((c) => (c.id === col.id ? { ...c, visible: !c.visible } : c))
                )
              }
              className="capitalize"
            >
              {col.id}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
