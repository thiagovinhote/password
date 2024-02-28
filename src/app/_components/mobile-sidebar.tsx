import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "~/presentation/ui/sheet";

import Sidebar from "./sidebar";

export default function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger className="-m-2.5 p-2.5 text-foreground lg:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 border-none">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}
