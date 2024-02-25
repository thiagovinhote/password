"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns/format";
import { ptBR } from "date-fns/locale/pt-BR";

import CredentialActions from "~/app/credentials/_components/credential-actions";
import { Credential } from "~/infra/database/schema";

const columns: ColumnDef<Credential>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "description",
    header: "Descrição",
    cell: (info) => {
      return (
        <span className="line-clamp-1 max-w-sm">{info.getValue<string>()}</span>
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
  {
    id: "actions",
    cell: (info) => {
      return <CredentialActions credential={info.row.original} />;
    },
  },
];

export default columns;
