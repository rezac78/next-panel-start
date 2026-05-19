import * as React from "react";

import Placeholder from "@/components/common/placeholder";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  type UniqueIdentifier,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { ColumnDef, type Table as TanStackTable, flexRender } from "@tanstack/react-table";

import { DraggableRow } from "./draggable-row";

interface DataTableProps<TData, TValue> {
  table: TanStackTable<TData>;
  columns: ColumnDef<TData, TValue>[];
  dndEnabled?: boolean;
  onReorder?: (newData: TData[]) => void;
  loading?: boolean;
}

function renderTableBody<TData, TValue>({
  table,
  columns,
  dndEnabled,
  dataIds,
}: {
  table: TanStackTable<TData>;
  columns: ColumnDef<TData, TValue>[];
  dndEnabled: boolean;
  dataIds: UniqueIdentifier[];
}) {
  if (!table.getRowModel().rows.length) {
    return (
      <TableRow>
        <TableCell colSpan={columns.length} className="h-24 text-center">
          No results.
        </TableCell>
      </TableRow>
    );
  }
  if (dndEnabled) {
    return (
      <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
        {table.getRowModel().rows.map((row) => (
          <DraggableRow key={row.id} row={row} />
        ))}
      </SortableContext>
    );
  }

  return table.getRowModel().rows.map((row) => (
    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  ));
}

export function DataTable<TData, TValue>({
  table,
  columns,
  dndEnabled = false,
  onReorder,
  loading,
}: DataTableProps<TData, TValue>) {
  const dataIds: UniqueIdentifier[] = table
    .getRowModel()
    .rows.map((row) => Number(row.id) as UniqueIdentifier);
  const sortableId = React.useId();
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id && onReorder) {
      const oldIndex = dataIds.indexOf(active.id);
      const newIndex = dataIds.indexOf(over.id);

      // Call parent with new data order (parent manages state)
      const newData = arrayMove(table.options.data, oldIndex, newIndex);
      onReorder(newData);
    }
  }

  const tableContent = loading ? (
    <div className="rounded-8 w-full p-3">
      <div className="flex items-center gap-x-3 border-b pb-3">
        {new Array(4).fill(1).map((_, i) => (
          <Placeholder key={i} className="h-12" />
        ))}
      </div>
      <div className="mt-3 flex flex-col items-center gap-y-3">
        {new Array(8).fill(1).map((_, i) => (
          <Placeholder key={i} className="h-12" />
        ))}
      </div>
    </div>
  ) : (
    <Table>
      <TableHeader className="bg-primary/10 dark:bg-primary/40 sticky top-0 z-10 h-14 border-b backdrop-blur-2xl">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody className="**:data-[slot=table-cell]:first:w-8">
        {renderTableBody({ table, columns, dndEnabled, dataIds })}
      </TableBody>
    </Table>
  );

  if (dndEnabled) {
    return (
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
        sensors={sensors}
        id={sortableId}
      >
        {tableContent}
      </DndContext>
    );
  }

  return tableContent;
}
