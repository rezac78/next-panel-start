import { ReactNode, Suspense } from "react";

// import { AccountSwitcher } from '@/components/pages/admin/sidebar/account-switcher';
import { AppSidebar } from "@/components/pages/admin/sidebar/app-sidebar";
// import { SearchDialog } from '@/components/pages/admin/sidebar/search-dialog';

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Placeholder from "@/components/common/placeholder";
import { SearchDialog } from "@/components/pages/admin/sidebar/search-dialog";
import { ThemeSwitch } from "@/components/theme/theme-switch";
import { AccountSwitcher } from "@/components/pages/admin/sidebar/account-switcher";
import { Separator } from "@/components/ui/separator";

const FallBack = async () => {
  return (
    <div className="flex h-screen w-screen">
      <div className="w-112.5 border-r p-6">
        <Placeholder className="rounded-12 h-32 w-full" />

        <div className="mt-6 space-y-3">
          {new Array(8).fill(0).map((_, i) => (
            <div key={i} className="flex gap-x-3">
              <Placeholder className="size-12 h-12 min-w-12" />
              <Placeholder className="h-12 w-full" />
            </div>
          ))}
        </div>
      </div>
      <div className="grow p-6">
        <div className="flex items-center justify-between">
          <Placeholder className="h-12 w-1/3" />
          <Placeholder className="h-12 w-1/6" />
        </div>
        <div className="mt-9 grid grid-cols-3 gap-6">
          <Placeholder className="h-64" />
          <Placeholder className="h-64" />
          <Placeholder className="h-64" />
          <Placeholder className="h-64" />
          <Placeholder className="h-64" />
          <Placeholder className="h-64" />
        </div>
      </div>
    </div>
  );
};
async function AdminContent({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <Suspense fallback={<FallBack />}>
      <SidebarProvider>
        <AppSidebar
          collapsible="icon"
          // variant={sidebarVariant}
          // collapsible={sidebarCollapsible}
        />
        <SidebarInset
          // data-content-layout={contentLayout}
          className="flex h-svh flex-col overflow-hidden"
        >
          <header
            // data-navbar-style={navbarStyle}
            className={cn(
              "flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12",
              // Handle sticky navbar style with conditional classes so blur, background, z-index, and rounded corners remain consistent across all SidebarVariant layouts.
              "data-[navbar-style=sticky]:bg-background/50 data-[navbar-style=sticky]:sticky data-[navbar-style=sticky]:top-0 data-[navbar-style=sticky]:z-50 data-[navbar-style=sticky]:overflow-hidden data-[navbar-style=sticky]:rounded-t-[inherit] data-[navbar-style=sticky]:backdrop-blur-md"
            )}
          >
            <div className="flex w-full items-center justify-between px-4 lg:px-6">
              <div className="flex items-center gap-1 md:hidden lg:gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mx-2 data-[orientation=vertical]:h-4"
                />
                {/* <SearchDialog /> */}
              </div>
              <div className="hidden md:flex" />
              <div className="flex gap-3">
                <ThemeSwitch />
                <AccountSwitcher />
              </div>
            </div>
          </header>
          <div className="flex min-h-0 grow flex-col overflow-auto md:px-4 md:py-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </Suspense>
  );
}

export default async function AdminLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <AdminContent>{children}</AdminContent>;
}
