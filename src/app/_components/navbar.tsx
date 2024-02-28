import MobileSidebar from "./mobile-sidebar";
import SwitchThemeButton from "./switch-theme-button";
import UserButtonMenu from "./user-button-menu";

export default function Navbar() {
  return (
    <div className="flex h-16 items-center gap-x-4 border-b px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
      <MobileSidebar />

      <div
        className="h-6 w-px bg-gray-200 dark:bg-gray-800 lg:hidden"
        aria-hidden="true"
      />

      <div className="flex flex-1 gap-x-4 self-stretch justify-end lg:gap-x-6">
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <SwitchThemeButton />

          <div
            className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200 dark:lg:bg-gray-600"
            aria-hidden="true"
          />

          <UserButtonMenu />
        </div>
      </div>
    </div>
  );
}
