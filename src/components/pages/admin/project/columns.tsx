"use client";

import { Button } from "@/components/ui/button";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import { TableColumn } from "@/components/new-data-table/new-table";
import ChevrownRightIcon from "@/public/icons/dashboard/chevrown-right-icon";
import Image from "next/image";

export const columns: TableColumn[] = [
  {
    id: "select",
    label: "",
    visible: true,
    hideable: false,
    checkbox: true,
  },
  {
    id: "Title",
    label: "Title",
    visible: true,
    sortable: true,
    render: (row) => (
      <div className="flex flex-row gap-1.5">
        <Image
          alt="notFound"
          unoptimized
          width={60}
          height={60}
          src={row.image}
          className="h-8 w-8 rounded-full border bg-gray-50 p-1"
        />
        <div className="my-auto text-[16px] font-bold">{row.title}</div>
      </div>
    ),
  },
  {
    id: "Tools",
    label: "Tools",
    visible: true,
    sortable: true,
    render: (row) => (
      <div className="flex flex-row gap-1.5">
        {row.tools.map((e: { image: string }, i: number) => (
          <Image
            key={i}
            alt="notFound"
            unoptimized
            width={60}
            height={60}
            src={e.image}
            className="h-8 w-8 rounded-full border bg-gray-50 p-1"
          />
        ))}
      </div>
    ),
  },
  {
    id: "Date",
    label: "Date",
    visible: true,
    sortable: true,
    render: (row) => (
      <div className="flex flex-row gap-1.5">
        <div className="my-auto text-[14px] font-semibold">
          {new Date(row.createdAt).toLocaleDateString("en-US")}
        </div>
      </div>
    ),
  },
  {
    id: "actions",
    label: "Actions",
    visible: true,
    sortable: false,
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
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7"
          onClick={() => helpers.onView(row)}
        >
          <ChevrownRightIcon className="stroke-[1.5]" />
        </Button>
      </div>
    ),
  },
];
