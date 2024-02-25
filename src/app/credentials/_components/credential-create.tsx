"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { EraserIcon, PlusIcon, SaveIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import createCredentialRepo from "~/app/credentials/_presentation/create-credential-repo";
import { CreateCredentialSchema } from "~/app/credentials/_presentation/schemas";
import { Button } from "~/presentation/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/presentation/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/presentation/ui/form";
import { Input } from "~/presentation/ui/input";
import { Separator } from "~/presentation/ui/separator";
import { Textarea } from "~/presentation/ui/textarea";
import { cn } from "~/presentation/utils";

export default function CredentialCreate() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreateCredentialSchema>>({
    resolver: zodResolver(CreateCredentialSchema),
    defaultValues: { name: "", description: "", password: "", username: "" },
  });

  function onSubmit(values: z.infer<typeof CreateCredentialSchema>) {
    startTransition(async () => {
      try {
        await createCredentialRepo(values);
        toast.success("Salvo com sucesso");
        form.reset();
      } catch (cause) {
        toast.error("Ah, ah! Algo deu errado.", {
          description: String(cause),
        });
      } finally {
        setOpen(false);
        router.refresh();
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="size-4 mr-2" />
          Criar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Criar credencial</DialogTitle>
              <DialogDescription>Insira as informações</DialogDescription>
            </DialogHeader>

            <div className="mt-4 space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="example" {...field} />
                    </FormControl>
                    <FormDescription>
                      Nome para identificar a credencial futuramente.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={3} />
                    </FormControl>
                    <FormDescription>
                      Alguma informação extra para lembrar.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email / Username</FormLabel>
                    <FormControl>
                      <Input placeholder="nickname" {...field} />
                    </FormControl>
                    <FormDescription>
                      Nome de usuário usado para fazer login. Pode ser e-mail ou
                      username.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input placeholder="123123" {...field} />
                    </FormControl>
                    <FormDescription>
                      Segredo utilizado para fazer login.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                variant="ghost"
                type="button"
                className={cn(
                  "hidden",
                  form.formState.isDirty && "inline-flex",
                )}
                onClick={() => form.reset()}
              >
                <EraserIcon className="size-4 mr-2" />
                Limpar
              </Button>

              <Button type="submit" disabled={isPending}>
                <SaveIcon className="size-4 mr-2" />
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
