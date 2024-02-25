"use client";

import { usePathname } from "next/navigation";
import * as React from "react";
import { HTMLAttributes } from "react";

import NavLink from "~/app/_components/nav-link";
import { cn } from "~/presentation/utils";

export default function MainNav(props: HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  return (
    <nav
      {...props}
      className={cn(
        "flex items-center space-x-4 lg:space-x-6",
        props.className,
      )}
    >
      <NavLink href="/" variant={pathname === "/" ? "enabled" : "disabled"}>
        Dashboard
      </NavLink>
      <NavLink
        href="/credentials"
        variant={pathname === "/credentials" ? "enabled" : "disabled"}
      >
        Credenciais
      </NavLink>
      <NavLink
        href="/generate"
        variant={pathname === "/generate" ? "enabled" : "disabled"}
      >
        Gerador
      </NavLink>
    </nav>
  );
}
