"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns/format";
import { ptBR } from "date-fns/locale/pt-BR";
import Link from "next/link";

import { Credential } from "~/infra/database/schema";

const columns: ColumnDef<Credential>[] = [
  {
    accessorKey: "name",
    header: "Nome",
    cell: (info) => {
      const { id, name, username } = info.row.original;
      return (
        <Link href={`/credentials/${id}`} className="group text-sm">
          <span className="group-hover:underline underline-offset-4 decoration-primary">
            {name}
          </span>
          <span className="text-xs text-muted-foreground">({username})</span>
        </Link>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Descrição",
    cell: (info) => {
      return (
        <span className="line-clamp-2 max-w-sm">{info.getValue<string>()}</span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Criado em",
    cell: (info) => {
      const value = info.getValue<Date | null>();
      if (!value) return null;
      return (
        <span>{formatDate(value, "dd MMM yyyy HH:mm", { locale: ptBR })}</span>
      );
    },
  },
];

export default columns;
