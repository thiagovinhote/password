"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";

import DataTableColumnHeader from "~/app/credentials/_components/data-table-column-header";
import ColumnSortParser from "~/presentation/helpers/column-sort-parser";
import useQueryPush from "~/presentation/hooks/use-query-push";
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
  pagination: { page: number; perPage: number };
  orderBy?: string[];
}

export default function DataTable<TData, TValue>(
  props: DataTableProps<TData, TValue>,
) {
  const queryPush = useQueryPush();
  const sorting = useMemo(
    () => ColumnSortParser.deserialize(props.orderBy),
    [props.orderBy],
  );
  const pagination = useMemo(
    () => ({
      pageIndex: props.pagination.page - 1,
      pageSize: props.pagination.perPage,
    }),
    [props.pagination],
  );

  const table = useReactTable({
    data: props.data,
    columns: props.columns,
    pageCount: Math.ceil(props.count / props.pagination.perPage),
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: (updaterOrValue) => {
      if (updaterOrValue instanceof Function) {
        const nextPagination = updaterOrValue(pagination);
        queryPush({
          page: nextPagination.pageIndex + 1,
          perPage: nextPagination.pageSize,
        });
      }
    },
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: (updaterOrValue) => {
      if (updaterOrValue instanceof Function) {
        const orderBy = ColumnSortParser.serialize(updaterOrValue(sorting));
        queryPush({ orderBy });
      }
    },
    state: {
      pagination,
      sorting,
    },
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
