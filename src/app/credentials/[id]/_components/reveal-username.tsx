"use client";

import { CopyIcon } from "lucide-react";
import { toast } from "sonner";

import useWriteClipboard from "~/app/credentials/[id]/_components/use-write-clipboard";
import { Button } from "~/presentation/ui/button";
import { Input } from "~/presentation/ui/input";
import { Label } from "~/presentation/ui/label";

interface RevealUsernameProps {
  username: string;
}

export default function RevealUsername(props: RevealUsernameProps) {
  const writeClipboard = useWriteClipboard();

  async function copyUsername() {
    await writeClipboard(props.username);
    toast.success("Username / E-mail copiado!");
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="username">Username / E-mail</Label>
      <div className="flex items-center space-x-2">
        <Button size="icon" variant="secondary" onClick={copyUsername}>
          <CopyIcon className="size-4" />
        </Button>
        <Input id="username" value={props.username} disabled readOnly />
      </div>
    </div>
  );
}
