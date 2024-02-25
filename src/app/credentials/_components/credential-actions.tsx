import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";

import { Credential } from "~/infra/database/schema";
import { Button } from "~/presentation/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/presentation/ui/dropdown-menu";

interface CredentialActionsProps {
  credential: Credential;
}

export default function CredentialActions(props: CredentialActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontalIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href={`/credentials/${props.credential.id}`}>Visualizar</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={`/credentials/${props.credential.id}/edit`}>Editar</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Apagar</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
