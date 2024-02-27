"use client";

import { CopyIcon, EyeIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import useWriteClipboard from "~/app/credentials/[id]/_components/use-write-clipboard";
import revealPasswordRepo from "~/app/credentials/[id]/_presentation/reveal-password-repo";
import { Button } from "~/presentation/ui/button";
import { Input } from "~/presentation/ui/input";
import { Label } from "~/presentation/ui/label";

interface RevealPasswordOutputProps {
  id: string;
}

export default function RevealPasswordOutput(props: RevealPasswordOutputProps) {
  const [isPending, startTransition] = useTransition();
  const [plain, setPlain] = useState("");
  const writeClipboard = useWriteClipboard();

  async function copyPassword() {
    await writeClipboard(plain);
    toast.success("Senha copiada!");
  }

  function revealPassword() {
    startTransition(async () => {
      const value = await revealPasswordRepo(props.id);
      setPlain(value);
    });
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="password">Senha</Label>
      <div className="flex items-center space-x-2">
        <Button
          onClick={revealPassword}
          size="icon"
          disabled={!!plain || isPending}
        >
          <EyeIcon className="size-4" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          disabled={!plain}
          onClick={copyPassword}
        >
          <CopyIcon className="size-4" />
        </Button>
        <Input id="password" disabled readOnly value={plain} />
      </div>
    </div>
  );
}
