"use client";

import { Undo2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "~/presentation/ui/button";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      className="w-full sm:w-fit"
      variant="secondary"
      onClick={router.back}
    >
      <Undo2Icon className="size-4 mr-2" />
      Voltar
    </Button>
  );
}
