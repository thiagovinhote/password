"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";
import { PropsWithChildren } from "react";

export function ThemeProvider(props: PropsWithChildren) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {props.children}
    </NextThemesProvider>
  );
}
