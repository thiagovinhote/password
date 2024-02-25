import "~/assets/styles/globals.css";

import { PropsWithChildren } from "react";

import MainNav from "~/app/_components/main-nav";
import SwitchThemeButton from "~/app/_components/switch-theme-button";
import UserButtonMenu from "~/app/_components/user-button-menu";
import { ThemeProvider } from "~/presentation/providers/theme-provider";
import { Toaster } from "~/presentation/ui/sonner";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout(props: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="border-b">
            <div className="flex h-16 items-center px-4">
              <MainNav className="mx-6" />
              <div className="ml-auto flex items-center space-x-4">
                <SwitchThemeButton />
                <UserButtonMenu />
              </div>
            </div>
          </div>

          {props.children}

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}