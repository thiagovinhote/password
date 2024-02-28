import { Table } from "@tanstack/react-table";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";

import { Button } from "~/presentation/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/presentation/ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  count: number;
}

export default function DataTablePagination<TData>(
  props: DataTablePaginationProps<TData>,
) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between border-t px-4 py-3 sm:px-6">
      <div className="flex-1 text-sm text-muted-foreground">
        {props.count} no total
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center sm:space-x-2">
          <p className="hidden sm:block text-sm font-medium">Por página</p>
          <Select
            value={`${props.table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              props.table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue
                placeholder={props.table.getState().pagination.pageSize}
              />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Página {props.table.getState().pagination.pageIndex + 1}&nbsp;de&nbsp;
          {props.table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => props.table.setPageIndex(0)}
            disabled={!props.table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => props.table.previousPage()}
            disabled={!props.table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => props.table.nextPage()}
            disabled={!props.table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() =>
              props.table.setPageIndex(props.table.getPageCount() - 1)
            }
            disabled={!props.table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
