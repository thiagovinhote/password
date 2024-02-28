"use client";

import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "~/presentation/utils";

interface SidebarItemProps {
  href: string;
  label: string;
  icon: LucideIcon;
}

export default function SidebarItem(props: SidebarItemProps) {
  const Icon = props.icon;

  const pathname = usePathname();

  const isActive =
    (pathname === "/" && props.href === "/") || pathname === props.href;

  return (
    <div key={props.href}>
      <Link
        href={props.href}
        className={cn(
          isActive
            ? "bg-gray-50 text-indigo-600 dark:bg-gray-800 dark:text-white"
            : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800",
          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-medium items-center",
        )}
      >
        <Icon
          className={cn(
            isActive
              ? "text-indigo-600 dark:text-white"
              : "text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-white",
            "size-4 shrink-0",
          )}
          aria-hidden="true"
        />
        {props.label}
      </Link>
    </div>
  );
}
