"use client";

import { formatDate } from "date-fns/format";
import { ptBR } from "date-fns/locale/pt-BR";
import { CopyIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import deleteCredentialRepo from "~/app/credentials/[id]/_presentation/delete-credential-repo";
import { Credential } from "~/infra/database/schema";
import { Button } from "~/presentation/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/presentation/ui/card";
import { Input } from "~/presentation/ui/input";
import { Label } from "~/presentation/ui/label";

import DeleteConfirmation from "./delete-confirmation";

interface RevealCredentialProps {
  credential: Credential;
}

export default function RevealCredential(props: RevealCredentialProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.credential.name}</CardTitle>
        <CardDescription>
          Criada em
          {props.credential.createdAt &&
            formatDate(props.credential.createdAt, "dd MMM yyyy HH:mm", {
              locale: ptBR,
            })}
        </CardDescription>
        <CardDescription>{props.credential.description}</CardDescription>
      </CardHeader>

      <CardContent>
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

        <div className="mt-8">
          <DeleteConfirmation id={props.credential.id} />
        </div>
      </CardContent>
    </Card>
  );
}
