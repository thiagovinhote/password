"use client";

import { Trash2Icon } from "lucide-react";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import deleteCredentialRepo from "~/app/credentials/[id]/_presentation/delete-credential-repo";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/presentation/ui/alert-dialog";
import { Button } from "~/presentation/ui/button";

interface DeleteConfirmationProps {
  id: string;
}

export default function DeleteConfirmation(props: DeleteConfirmationProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function onDelete() {
    startTransition(async () => {
      try {
        await deleteCredentialRepo(props.id);
        toast.success("Apagado com sucesso");
      } catch (cause) {
        toast.error("Ah, ah! Algo deu errado.", {
          description: String(cause),
        });
      } finally {
        router.replace("/credentials");
      }
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash2Icon className="size-4 mr-2" />
          Apagar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita. Isso excluirá permanentemente os
            dados de nossos servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete} disabled={isPending}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
