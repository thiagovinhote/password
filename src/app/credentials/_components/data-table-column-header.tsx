import { Column } from "@tanstack/react-table";
import { ArrowDownIcon, ArrowDownUpIcon, ArrowUpIcon } from "lucide-react";
import React, { HTMLAttributes } from "react";

import { Button } from "~/presentation/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/presentation/ui/dropdown-menu";
import { cn } from "~/presentation/utils";

interface DynamicTableColumnHeaderProps<TData, TValue>
  extends HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
}

const Arrows = {
  asc: <ArrowUpIcon className="ml-2 h-4 w-4" />,
  desc: <ArrowDownIcon className="ml-2 h-4 w-4" />,
  none: <ArrowDownUpIcon className="ml-2 h-4 w-4" />,
  get(direction: "desc" | "asc" | false) {
    if (direction === false) return this.none;
    return Reflect.get(this, direction);
  },
};

export default function DataTableColumnHeader<TData, TValue>(
  props: DynamicTableColumnHeaderProps<TData, TValue>,
) {
  if (!props.column.getCanSort()) {
    return (
      <div className={cn("text-xs", props.className)}>{props.children}</div>
    );
  }

  return (
    <div className={cn("flex items-center space-x-2", props.className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 data-[state=open]:bg-accent"
          >
            {props.children}
            {Arrows.get(props.column.getIsSorted())}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="min-w-fit">
          <DropdownMenuItem onClick={() => props.column.toggleSorting(false)}>
            <ArrowUpIcon className="mr-2 h-4 w-4 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => props.column.toggleSorting(true)}>
            <ArrowDownIcon className="mr-2 h-4 w-4 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => props.column.clearSorting()}>
            <ArrowDownUpIcon className="mr-2 h-4 w-4 text-muted-foreground/70" />
            Padrão
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
