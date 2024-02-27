import { formatDate } from "date-fns/format";
import { ptBR } from "date-fns/locale/pt-BR";

import RevealPasswordOutput from "~/app/credentials/[id]/_components/reveal-password";
import RevealUsername from "~/app/credentials/[id]/_components/reveal-username";
import { Credential } from "~/infra/database/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/presentation/ui/card";

import DeleteConfirmation from "./delete-confirmation";

interface RevealCredentialProps {
  credential: Omit<Credential, "password">;
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
          <RevealUsername username={props.credential.username} />
          <RevealPasswordOutput id={props.credential.id} />
        </div>
      </CardContent>
      <CardFooter>
        <DeleteConfirmation id={props.credential.id} />
      </CardFooter>
    </Card>
  );
}
