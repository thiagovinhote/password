"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import qs from "query-string";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/presentation/ui/table";

import DataTablePagination from "./data-table-pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  count: number;
  pagination: PaginationState;
}

export default function DataTable<TData, TValue>(
  props: DataTableProps<TData, TValue>,
) {
  const router = useRouter();

  const table = useReactTable({
    data: props.data,
    columns: props.columns,
    pageCount: Math.ceil(props.count / props.pagination.pageSize),
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: (updaterOrValue) => {
      if (updaterOrValue instanceof Function) {
        const nextPagination = updaterOrValue(props.pagination);
        const url = qs.stringifyUrl(
          {
            url: window.location.href,
            query: { ...nextPagination },
          },
          { skipEmptyString: true, skipNull: true },
        );

        router.push(url);
      }
    },
    state: { pagination: props.pagination },
    manualPagination: true,
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={props.columns.length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <DataTablePagination table={table} count={props.count} />
    </div>
  );
}
