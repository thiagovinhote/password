import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ChevronDownIcon, LogInIcon, LogOutIcon, UserIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "~/presentation/ui/avatar";
import { Button } from "~/presentation/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/presentation/ui/dropdown-menu";

export default async function UserButtonMenu() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return (
      <LoginLink>
        <Button variant="outline">
          <LogInIcon className="h-4 w-4 mr-2" />
          Entrar
        </Button>
      </LoginLink>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center p-1.5">
        <span className="sr-only">Open user menu</span>
        <Avatar className="w-8 h-8 rounded-full bg-gray-50">
          <AvatarImage src={user.picture ?? ""} />
          <AvatarFallback className="bg-slate-200">
            <UserIcon className="text-white" />
          </AvatarFallback>
        </Avatar>
        <span className="hidden lg:flex lg:items-center">
          <span
            className="ml-4 text-sm font-semibold leading-6"
            aria-hidden="true"
          >
            {user.given_name}
          </span>
          <ChevronDownIcon className="ml-2 size-6" aria-hidden="true" />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <LogoutLink>
          <DropdownMenuItem>
            <LogOutIcon className="h-4 w-4 mr-2" />
            Sair
          </DropdownMenuItem>
        </LogoutLink>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
