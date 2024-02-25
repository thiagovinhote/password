"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useMemo } from "react";

import DataTableColumnHeader from "~/app/credentials/_components/data-table-column-header";
import ColumnSortParser from "~/presentation/helpers/column-sort-parser";
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
  orderBy?: string[];
}

export default function DataTable<TData, TValue>(
  props: DataTableProps<TData, TValue>,
) {
  const router = useRouter();
  const sorting = useMemo(
    () => ColumnSortParser.deserialize(props.orderBy),
    [props.orderBy],
  );

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
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: (value) => {
      if (typeof value === "function") {
        const orderBy = ColumnSortParser.serialize(value(sorting));
        const url = qs.stringifyUrl(
          {
            url: window.location.href,
            query: { orderBy },
          },
          { skipEmptyString: true, skipNull: true },
        );

        router.push(url);
      }
    },
    state: { pagination: props.pagination, sorting },
    manualPagination: true,
    manualSorting: true,
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
                    {header.isPlaceholder ? null : (
                      <DataTableColumnHeader column={header.column}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </DataTableColumnHeader>
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
