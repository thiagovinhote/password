"use client";

import { HomeIcon, KeyRoundIcon, PickaxeIcon } from "lucide-react";

import SidebarItem from "./sidebar-item";

const defaultNavigation = [
  { label: "Dashboard", href: "/", icon: HomeIcon },
  { label: "Credenciais", href: "/credentials", icon: KeyRoundIcon },
  { label: "Gerador", href: "/generate", icon: PickaxeIcon },
];

function DefaultNavigation() {
  return (
    <nav className="flex flex-grow">
      <ul role="list" className="flex flex-1 flex-col gap-y-7">
        <li>
          <div role="list" className="space-y-1">
            {defaultNavigation.map((item) => (
              <SidebarItem {...item} key={item.href} />
            ))}
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default function SidebarRoutes() {
  return <DefaultNavigation />;
}
