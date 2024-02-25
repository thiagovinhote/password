"use client";

import { formatDate } from "date-fns/format";
import { ptBR } from "date-fns/locale/pt-BR";
import { CopyIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Credential } from "~/infra/database/schema";
import { Button } from "~/presentation/ui/button";
import { Input } from "~/presentation/ui/input";
import { Label } from "~/presentation/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/presentation/ui/sheet";

interface RevealSheetProps {
  credential: Credential;
}

export default function RevealSheet(props: RevealSheetProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Sheet
      open={open}
      onOpenChange={(value) => {
        if (!value) router.back();
      }}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{props.credential.name}</SheetTitle>
          <SheetDescription>
            Criada em{" "}
            {props.credential.createdAt &&
              formatDate(props.credential.createdAt, "dd MMM yyyy HH:mm", {
                locale: ptBR,
              })}
          </SheetDescription>
          <SheetDescription>{props.credential.description}</SheetDescription>
        </SheetHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username / E-mail</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="username"
                value={props.credential.username}
                disabled
                readOnly
              />
              <Button size="icon" variant="secondary">
                <CopyIcon className="size-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="password"
                value={props.credential.password}
                disabled
                readOnly
              />
              <Button size="icon" variant="secondary">
                <CopyIcon className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
