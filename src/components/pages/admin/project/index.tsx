"use client";

import { useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import CreateEditModal from "@/components/common/create-edit-modal";
import HeadingTitle from "@/components/common/heading-title";
import { Button } from "@/components/ui/button";
import AddSquareIcon from "@/public/icons/dashboard/AddSquareIcon";

import { toast } from "sonner";
import NewTable, { TableColumn } from "@/components/new-data-table/new-table";
import { updateURL } from "@/utils/updateURL";
import NewTableToolbar from "@/components/new-data-table/new-table-toolbar";
import NewTablePagination from "@/components/new-data-table/new-table-pagination";
import { useLangStore } from "@/store/useLangStore";
import translations from "@/lib/i18n";
import { projectFormFields } from "@/constants/projectFormFields";
import { deletedProject, getSingleProject, postProject, putProject } from "@/apis/project";
import ConfirmationModal from "@/components/common/confirmation-modal";
import { GetProjectsResponse } from "@/types/project";
import { Tool } from "@/types/tools";
import { ProjectRowViewState } from "@/store/project-row-view.store";
import ProjectViewModal from "./view-modal/project-view-content";

type ProjectProps = {
  data: GetProjectsResponse & { columns: TableColumn[] };
  page: number;
  perPage: number;
  search: string;
  // status: string;
  sort: string;
  order: string;
  sp: Record<string, string | string[]>;
  dataTools: {
    data: Tool[];
  };
};

export default function Project({
  data,
  page,
  perPage,
  search,
  sort,
  order,
  sp,
  dataTools,
}: ProjectProps) {
  const router = useRouter();
  const { lang } = useLangStore();
  const t = translations[lang as "fa" | "en"];
  const [columns, setColumns] = useState(data.columns);
  const [searchState, setSearchState] = useState(search);
  const { activeRow, setActiveRow } = ProjectRowViewState();
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingProject, setDeletingProject] = useState<any | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const onSort = (id: string) => {
    const nextOrder = sort === id && order === "asc" ? "desc" : "asc";
    updateURL({ sort: id, order: nextOrder, page: 1 }, sp, router);
  };

  const onSearch = () => {
    updateURL({ search: searchState, page: 1 }, sp, router);
  };

  const onChangePage = (p: number) => {
    updateURL({ page: p }, sp, router);
  };

  const onToggleRow = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);

      return next;
    });
  };

  const defaultValues = useMemo(() => {
    if (!editingProject) {
      return {
        title: "",
        shortDescription: "",
        longDescription: "",
        tools: [],
        links: [{ name: "", url: "" }],
        image: null,
      };
    }

    return {
      title: editingProject.title ?? "",
      shortDescription: editingProject.shortDescription ?? "",
      longDescription: editingProject.longDescription ?? "",
      tools: editingProject?.tools?.map((g: any) => String(g._id)) ?? [],
      links: editingProject.links ?? [{ name: "", url: "" }],
      image: editingProject.image ?? null,
    };
  }, [editingProject]);

  const onToggleAll = () => {
    if (selected.size === data.data.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(data.data.map((r) => r._id)));
    }
  };
  const [open, setOpen] = useState(false);
  const handleSave = async (data: Record<string, any>) => {
    try {
      const form = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value === undefined || value === null) return;

        if (key === "tools" || key === "links") {
          form.append(key, JSON.stringify(value));
        } else if (value instanceof File) {
          form.append(key, value);
        } else {
          form.append(key, String(value));
        }
      });

      const res = editingProject
        ? await putProject(editingProject._id, form)
        : await postProject(form);
      if (res) {
        toast.success(res.message);
        router.refresh();
      } else {
        toast.error(t.Operation);
      }
    } catch {
      toast.error(t.ErrorSaving);
    } finally {
      setOpen(false);
      setEditingProject(null);
    }
  };

  const groupsList =
    dataTools?.data?.map((g: Tool) => ({
      label: g.name,
      value: String(g._id),
    })) ?? [];

  const tableData = data?.data?.map((row) => ({
    ...row,
    onView: async () => {
      try {
        const res = await getSingleProject(String(row._id));
        if (res?.data) {
          setActiveRow?.(res.data);
        } else {
          toast.error(t.Operation);
        }
      } catch {
        toast.error(t.ErrorFetching);
      }
    },
    onEdite: async () => {
      try {
        const res = await getSingleProject(String(row._id));
        if (!res?.data) {
          toast.error(t.NotFound);

          return;
        }
        setEditingProject(res.data);
        setOpen(true);
      } catch {
        toast.error(t.ErrorFetching);
      }
    },
    onDeleted: () => {
      setDeletingProject(row);
      setDeleteModalOpen(true);
    },
  }));

  return (
    <div className="flex grow flex-col gap-4 space-y-4 overflow-hidden p-4 md:p-0">
      <div className="mb-4 flex items-center justify-between">
        <HeadingTitle title={`${t?.Project?.project} ${t.Section}`} />
        <div className="flex gap-x-3">
          <Button onClick={() => setOpen(true)}>
            {t.create}
            <AddSquareIcon className="size-6" />
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <NewTableToolbar
          search={searchState}
          setSearch={setSearchState}
          // status={statusState}
          // setStatus={setStatusState}
          onSearch={onSearch}
          columns={columns}
          setColumns={setColumns}
        />
        <NewTablePagination
          page={page}
          perPage={perPage}
          total={1}
          // total={data?.meta?.total ?? 1}
          onChangePage={onChangePage}
          onChangePerPage={function (perPage: number): void {
            throw new Error("Function not implemented.");
          }}
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
      />
      <CreateEditModal
        open={open}
        onClose={() => {
          setOpen(false);
          setEditingProject(null);
        }}
        title={
          editingProject ? `${t.edit} ${t.Project.project}` : `${t.create} ${t.Project.project}`
        }
        fields={projectFormFields.map((f) =>
          f.name === "tools" ? { ...f, options: groupsList } : f
        )}
        defaultValues={defaultValues}
        onSave={handleSave}
        saveText={
          editingProject ? `${t.update} ${t.Project.project}` : `${t.save} ${t.Project.project}`
        }
        modalSize="xl"
      />
      <ConfirmationModal
        open={deleteModalOpen}
        title={`${t.delete} ${t.Project.project}`}
        message={`${t.msgDelete} "${deletingProject?.title}"? ${t.msgDelete2}`}
        confirmText={t.delete}
        cancelText={t.cancel}
        onCancel={() => {
          setDeleteModalOpen(false);
          setDeletingProject(null);
        }}
        onConfirm={async () => {
          if (!deletingProject?._id) return;

          try {
            const res = await deletedProject(deletingProject._id);
            if (res) {
              toast.success(res.message);
              router.refresh();
            } else {
              toast.error(t.Operation);
            }
          } catch {
            toast.error(t.ErrorFetching);
          } finally {
            setDeleteModalOpen(false);
            setDeletingProject(null);
          }
        }}
      />
      {activeRow?._id && <ProjectViewModal />}
    </div>
  );
}
