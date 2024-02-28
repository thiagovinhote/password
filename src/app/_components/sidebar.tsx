import Image from "next/image";

import LogoSvg from "../../assets/images/padlock.svg";
import SidebarRoutes from "./sidebar-routes";

export default function Sidebar() {
  return (
    <div className="h-full flex grow flex-col gap-y-5 overflow-y-auto border-r px-4 pb-4">
      <div className="flex h-16 shrink-0 items-center gap-2">
        <Image src={LogoSvg} className="h-6 w-auto" alt="MEGASHIELD LOGO" />
        <h1 className="text-2xl font-bold uppercase">MEGASHIELD</h1>
      </div>

      <SidebarRoutes />
    </div>
  );
}
