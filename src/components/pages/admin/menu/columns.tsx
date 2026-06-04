"use client";

import Image from "next/image";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableColumn } from "@/components/new-data-table/new-table";
import ChevrownRightIcon from "@/public/icons/dashboard/chevrown-right-icon";

type MenuColumnsTranslations = {
  title: string;
  date: string;
  actions: string;
};

export const getMenuColumns = (
  t: MenuColumnsTranslations,
  lang: "fa" | "en"
): TableColumn[] => [
    {
      id: "select",
      label: "",
      visible: true,
      hideable: false,
      checkbox: true,
      width: "56px",
      align: "center",
    },
    {
      id: "title",
      label: t.title,
      visible: true,
      sortable: true,
      render: (row) => (
        <div className="flex flex-row gap-1.5">
          <div className="my-auto text-[16px] font-bold">{row.titleFa}</div>
        </div>
      ),
    },
    {
      id: "createdAt",
      label: t.date,
      visible: true,
      sortable: true,
      render: (row) => (
        <div className="flex flex-row gap-1.5">
          <div className="my-auto text-[14px] font-semibold">
            {new Date(row.createdAt).toLocaleDateString(
              lang === "fa" ? "fa-IR" : "en-US"
            )}
          </div>
        </div>
      ),
    },
    {
      id: "actions",
      label: t.actions,
      visible: true,
      sortable: false,
      align: "end",
      width: "180px",
      render: (row, helpers) => (
        <div className="flex items-center justify-end gap-x-3">
          <Button
            variant="default"
            className="h-7 w-7"
            size="icon"
            onClick={() => helpers.onEdite(row)}
          >
            <Edit2Icon />
          </Button>
          <Button
            variant="destructive-outline"
            className="h-7 w-7"
            size="icon"
            onClick={() => helpers.onDeleted(row)}
          >
            <Trash2Icon />
          </Button>
          {/* <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => helpers.onView(row)}
          >
            <ChevrownRightIcon className="stroke-[1.5]" />
          </Button> */}
        </div>
      ),
    },
  ];