"use client";

import { useMemo } from "react";
import { NavMain } from "@/components/pages/admin/sidebar/nav-main";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { getSidebarItems } from "@/constants/sidebar-items";
import { useLangStore } from "@/store/useLangStore";
import translations from "@/lib/i18n";

type AppSidebarProps = React.ComponentProps<typeof Sidebar>;

export function AppSidebar({ ...props }: AppSidebarProps) {
  const { lang } = useLangStore();
  const t = translations[lang as "fa" | "en"];

  const sidebarItems = useMemo(() => getSidebarItems(t), [t]);

  return (
    <Sidebar {...props} className="h-screen">
      <SidebarContent className="mt-6">
        <NavMain items={sidebarItems} sidebarState="collapsed" />
      </SidebarContent>
    </Sidebar>
  );
}