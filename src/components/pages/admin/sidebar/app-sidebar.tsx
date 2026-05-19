"use client";


import { NavMain } from "@/components/pages/admin/sidebar/nav-main";
import {
  Sidebar,
  SidebarContent,
} from "@/components/ui/sidebar";
import { sidebarItems } from "@/constants/sidebar-items";

type AppSidebarProps = React.ComponentProps<typeof Sidebar>;
export function AppSidebar({ ...props }: AppSidebarProps) {
  return (
    <Sidebar {...props} className="h-screen">
      <SidebarContent className="mt-6">
        <NavMain items={sidebarItems} sidebarState="collapsed" />
      </SidebarContent>
    </Sidebar>
  );
}
