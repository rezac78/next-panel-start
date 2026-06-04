"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CreateEditModal from "@/components/common/create-edit-modal";
import HeadingTitle from "@/components/common/heading-title";
import { Button } from "@/components/ui/button";
import AddSquareIcon from "@/public/icons/dashboard/AddSquareIcon";
import { toast } from "sonner";
import NewTable from "@/components/new-data-table/new-table";
import NewTableToolbar from "@/components/new-data-table/new-table-toolbar";
import NewTablePagination from "@/components/new-data-table/new-table-pagination";
import { useLangStore } from "@/store/useLangStore";
import translations from "@/lib/i18n";
import { getMenuFormFields } from "@/constants/menu-form-fields";
import {
  deletedMenu,
  getSingleMenu,
  postMenu,
  putMenu,
} from "@/apis/menu";
import ConfirmationModal from "@/components/common/confirmation-modal";
import { getMenuColumns } from "./columns";
import { MenuData, MenuItem } from "@/types/menu";

type PageProps = {
  data: MenuData;
};

export default function Menu({ data }: PageProps) {
  console.log("data", data)
  const router = useRouter();
  const [items, setItems] = useState<MenuItem[]>(data.items);
  const searchParams = useSearchParams();
  const { lang } = useLangStore();
  const t = translations[lang as "fa" | "en"];

  const [searchState, setSearchState] = useState(
    searchParams.get("search") ?? ""
  );
  const [page, setPage] = useState(Number(searchParams.get("page") ?? 1));
  const [limit, setLimit] = useState(Number(searchParams.get("limit") ?? 10));
  const [sort, setSort] = useState(searchParams.get("sort") ?? "id");
  const [order, setOrder] = useState(searchParams.get("order") ?? "desc");

  const [editingPart, setEditingPart] = useState<MenuItem | null>(null);
  const [deletingPart, setDeletingPart] = useState<MenuItem | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [open, setOpen] = useState(false);
  const initialColumns = useMemo(
    () =>
      getMenuColumns(
        {
          title: t.table.title,
          date: t.table.date,
          actions: t.table.actions,
        },
        lang as "fa" | "en"
      ),
    [t, lang]
  );
  const [columns, setColumns] = useState(initialColumns);
  useEffect(() => setColumns(initialColumns), [initialColumns]);
  useEffect(() => {
    setItems(data.items);
  }, [data.items]);
  const updateUrlParams = () => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("limit", String(limit));
    params.set("search", searchState);
    params.set("sort", sort);
    params.set("order", order);
    router.replace(`?${params.toString()}`);
  };
  useEffect(() => updateUrlParams(), [page, limit, searchState, sort, order]);

  const onSort = (columnId: string) => {
    const nextOrder = sort === columnId && order === "asc" ? "desc" : "asc";
    setSort(columnId);
    setOrder(nextOrder);
    setPage(1);
  };

  const onChangePage = (p: number) => setPage(p);
  const onChangeLimit = (pp: number) => {
    setLimit(pp);
    setPage(1);
  };

  const onToggleRow = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const onToggleAll = () => {
    if (selected.size === items.length) setSelected(new Set());
    else setSelected(new Set(items.map((r: { id: string }) => r.id)));
  };
  const defaultValues = useMemo(() => {
    if (!editingPart)
      return { titleFa: "", titleEn: "", order: 1, isActive: "1" };
    return {
      titleFa: editingPart.titleFa ?? "",
      titleEn: editingPart.titleEn ?? "",
      order: editingPart.order ?? 1,
      isActive: editingPart.isActive ? "1" : "0",
    };
  }, [editingPart]);

  // در Menu.tsx
  const handleSave = async (formData: Record<string, any>): Promise<boolean> => {
    try {
      const body = Object.entries(formData).reduce<Record<string, any>>(
        (acc, [key, value]) => {
          if (value === undefined || value === null) return acc;
          if (key === "isActive") {
            acc[key] = value === "1" || value === 1 || value === true;
            return acc;
          }
          if (key === "order") {
            acc[key] = Number(value);
            return acc;
          }
          acc[key] = value;
          return acc;
        },
        {}
      );
      const res = editingPart
        ? await putMenu(editingPart.id, body)
        : await postMenu(body);
      if (res.success && res.data) {
        toast.success(res.message);

        if (editingPart) {
          setItems((prev) =>
            prev.map((item) =>
              item.id === editingPart.id ? res.data as MenuItem : item
            )
          );
        } else {
          setItems((prev) => [res.data as MenuItem, ...prev]);
        }

        setEditingPart(null);
        return true;
      }
      toast.error(res.errors?.[0] ?? res.message);
      return false;
    } catch {
      toast.error(t.ErrorSaving);
      return false;
    }
  };
  const tableData = items.map((row: MenuItem) => ({
    ...row,
    onEdite: async () => {
      try {
        const res = await getSingleMenu(String(row.id));
        if (res.success && res.data) {
          setEditingPart(res.data);
          setOpen(true);
        } else {
          toast.error(res.errors?.[0] ?? res.message);
        }
      } catch {
        toast.error(t.ErrorFetching);
      }
    },
    onDeleted: () => {
      setDeletingPart(row);
      setDeleteModalOpen(true);
    },
  }));
  const onClear = () => {
    setSearchState("");
    setPage(1);
    setLimit(10)
  };
  const handleConfirmDelete = async () => {
    if (!deletingPart?.id) return;

    try {
      const res = await deletedMenu(deletingPart.id);
      if (res.success) {
        toast.success(res.message);
        setItems((prev) => prev.filter((item) => item.id !== deletingPart.id));
      } else {
        toast.error(res.errors?.[0] ?? res.message);
      }
    } catch {
      toast.error(t.ErrorFetching);
    } finally {
      setDeleteModalOpen(false);
      setDeletingPart(null);
    }
  };
  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setDeletingPart(null);
  };
  const fields = useMemo(() => getMenuFormFields(t), [t]);
  return (
    <div className="flex flex-col gap-4 p-4 md:p-0 grow">
      <div className="flex justify-between mb-4 items-center">
        <HeadingTitle title={`${t.section} ${t.page.menu}`} />
        <Button onClick={() => setOpen(true)}>
          {t.create}
          <AddSquareIcon className="size-6" />
        </Button>
      </div>

      <div className="flex justify-between items-center ">
        <NewTableToolbar search={searchState} setSearch={setSearchState} onClear={onClear} />
        <NewTablePagination
          page={page}
          limit={limit}
          total={data.meta.total}
          onChangePage={onChangePage}
          onChangeLimit={onChangeLimit}
        />
      </div>

      <NewTable
        columns={columns}
        data={tableData}
        sort={sort}
        order={order}
        onSort={onSort}
        selectedRows={selected}
        onToggleRow={onToggleRow}
        onToggleAll={onToggleAll}
        getRowId={(row) => String(row.id)}
        emptyTitle={t.NotFound}
        emptyDescription={t.table.emptyDescription}
      />

      <CreateEditModal
        open={open}
        onClose={() => {
          setOpen(false);
          setEditingPart(null);
        }}
        title={editingPart ? `${t.edit} ${t.page.menu}` : `${t.create} ${t.page.menu}`}
        fields={fields}
        defaultValues={defaultValues}
        onSave={handleSave}
        saveText={editingPart ? `${t.update} ${t.page.menu}` : `${t.save} ${t.page.menu}`}
        modalSize="xl"
      />

      <ConfirmationModal
        open={deleteModalOpen}
        title={`${t.delete} ${t.page.menu}`}
        message={`${t.msgDelete} "${deletingPart?.titleFa}"? ${t.msgDelete2}`}
        confirmText={t.delete}
        cancelText={t.cancel}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />

    </div>
  );
}