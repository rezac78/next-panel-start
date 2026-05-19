"use client";

import { createContext, useContext, useEffect, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ChevronRight } from "lucide-react";
import { NavGroup } from "@/constants/sidebar-items";

type SidebarState = "expanded" | "collapsed";
type SidebarContextValue = { state: SidebarState; isMobile: boolean };
const SidebarContext = createContext<SidebarContextValue>({
  state: "expanded",
  isMobile: false,
});
export const useSidebar = () => useContext(SidebarContext);

const ComingSoon = () => (
  <span className="bg-grey-200 rounded-8 ml-auto px-2 py-1 text-xs opacity-80">Soon</span>
);

interface NavMainProps {
  items: NavGroup[];
  sidebarState?: SidebarState; // optional – you can pass it from the parent
  isMobile?: boolean; // optional
}

export function NavMain({ items, sidebarState = "expanded", isMobile = false }: NavMainProps) {
  const pathname = usePathname();

  const [openGroupId, setOpenGroupId] = useState<number | null>(null);



  const isActive = (url: string) => {
    // 1. Root admin – exact match only
    if (url === "/admin") return pathname === "/admin";

    // 2. Leaf items – exact match only
    if (pathname === url) return true;

    // 3. Keep parent highlighted when a deeper route is active
    return pathname.startsWith(url + "/");
  };
  useEffect(() => {
    const activeGroup = items.find((g) => g.items.some((i) => isActive(i.url)));
    setOpenGroupId(activeGroup?.id ?? null);
  }, [pathname, items]);
  const isLeafActive = (url: string) => {
    if (url === "/admin") return pathname === "/admin";

    return pathname === url; // <-- ONLY exact match
  };

  const isGroupActive = (group: NavGroup): boolean => {
    if (group.items.length === 0) return isActive(group.url);

    return group.items.some((i) => isActive(i.url));
  };

  const toggleGroup = (id: number) => {
    setOpenGroupId((prev) => (prev === id ? null : id));
  };

  const collapsed = sidebarState === "collapsed" && !isMobile;

  return (
    <SidebarContext.Provider value={{ state: sidebarState, isMobile }}>
      <nav className="flex flex-col gap-4 p-1.5 group-data-[collapsible=icon]:p-0">
        {items.map((group) => {
          const hasSubItems = group.items.length > 0;
          const groupIsOpen = openGroupId === group.id;

          const Header = () => (
            <div className="flex items-center gap-2 py-2 text-sm font-medium opacity-80 ">
              <group.icon className="!size-8" />
              {group.items.length === 0 ? (
                <Link href={group.url} className="hover:text-primary flex-1">
                  {group.label}
                </Link>
              ) : (
                <span className="flex-1">{group.label}</span>
              )}
            </div>
          );

          if (collapsed) {
            return (
              <div key={group.id} className="group">
                {/* CASE 1: Group has no sub-items → make it a direct link */}
                {!hasSubItems ? (
                  <Link
                    href={group.url}
                    className={`hover:bg-foreground/5 rounded-8 relative flex w-full items-center gap-2 p-2 pl-4 group-data-[collapsible=icon]:pl-0 text-[18px] ${
                      isGroupActive(group) ? "" : ""
                    }`}
                  >
                    {isActive(group.url) && (
                      <div className="bg-brown-500 rounded-tr-4 rounded-br-4 absolute top-1/2 left-0 z-10 h-[33px] w-1 -translate-y-1/2 group-data-[collapsible=icon]:hidden"></div>
                    )}
                    <group.icon
                      className={`${isGroupActive(group) ? "text-brown-500 size-6 stroke-2" : "size-8 stroke-[1.5]"}`}
                    />
                    <span className={`flex-1 text-start group-data-[collapsible=icon]:hidden ${isActive(group.url) ? "font-bold" : ""}`}>
                      {group.label}
                    </span>
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => toggleGroup(group.id)}
                      className={`hover:bg-foreground/5 rounded-8 relative flex w-full items-center gap-2 p-2 pl-4 group-data-[collapsible=icon]:pl-0 text-[18px] ${
                        isGroupActive(group) || groupIsOpen
                          ? `bg-foreground/5 ${groupIsOpen && "rounded-b-none"}`
                          : ""
                      }`}
                    >
                      {(groupIsOpen || isActive(group.url)) && (
                        <div className="bg-brown-500 rounded-tr-4 rounded-br-4 absolute top-1/2 left-0 z-10 h-[33px] w-1 -translate-y-1/2 group-data-[collapsible=icon]:hidden"></div>
                      )}
                      <group.icon
                        className={`shrink-0 ${isGroupActive(group) ? "text-brown-500 size-6 stroke-2 group-data-[collapsible=icon]:size-5" : "size-8 stroke-[1.5]"}`}
                      />
                      <span
                        className={`flex-1 text-start ${isGroupActive(group) ? "font-bold" : ""}`}
                      >
                        {group.label}
                      </span>
                      <ChevronRight
                        className={`group-data-[collapsible=icon]:hidden size-4 transition-transform ${groupIsOpen ? "rotate-90" : ""}`}
                      />
                    </button>

                    {/* Dropdown items */}
                    {groupIsOpen && (
                      <div className="border-grey-200 bg-foreground/5 rounded-b-8 space-y-1 pt-2 pl-12 pb-3 pr-1.5">
                        {group.items.map((item) => (
                          <Link
                            key={item.title}
                            href={item.url}
                            target={item.newTab ? "_blank" : undefined}
                            className={`rounded-8 flex items-center gap-2 px-2 py-2 text-[14px] transition-colors ${isLeafActive(item.url) ? "bg-primary/10 text-primary" : "hover:bg-foreground/5"} ${item.comingSoon ? "opacity-50" : ""}`}
                          >
                            {item.icon && <item.icon className="size-4" />}
                            <span>{item.title}</span>
                            {item.comingSoon && <ComingSoon />}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          }

          return (
            <div key={group.id}>
              <Header />
              {/* Sub-items (only when group has items) */}
              {hasSubItems && (
                <div className="border-grey-200 ml-6 space-y-1 border-l pl-3">
                  {group.items.map((item) => {
                    const hasSub = item.subItems?.length;
                    const subOpen = groupIsOpen && hasSub;

                    return (
                      <div key={item.title}>
                        <button
                          onClick={() => hasSub && toggleGroup(group.id)}
                          className={`rounded-8 flex w-full items-center gap-2 px-2 py-2 transition-colors ${
                            isActive(item.url)
                              ? "bg-primary/10 text-primary font-medium"
                              : "hover:bg-foreground/5"
                          } ${item.comingSoon ? "opacity-50" : ""}`}
                          disabled={item.comingSoon}
                        >
                          {item.icon && <item.icon className="size-4" />}
                          <span className="flex-1 text-left">{item.title}</span>
                          {item.comingSoon && <ComingSoon />}
                          {hasSub && (
                            <ChevronRight
                              className={`size-4 transition-transform ${
                                subOpen ? "rotate-90" : ""
                              }`}
                            />
                          )}
                        </button>
                        {hasSub && subOpen && (
                          <div className="border-grey-200 mt-1 ml-6 space-y-1 border-l pl-3">
                            {item.subItems!.map((sub) => (
                              <Link
                                key={sub.title}
                                href={sub.url}
                                target={sub.newTab ? "_blank" : undefined}
                                className={`rounded-8 flex items-center gap-2 px-2 py-1 text-sm transition-colors ${
                                  isActive(sub.url)
                                    ? "bg-primary/10 text-primary"
                                    : "hover:bg-foreground/5"
                                } ${sub.comingSoon ? "opacity-50" : ""}`}
                              >
                                {sub.icon && <sub.icon className="size-4" />}
                                <span>{sub.title}</span>
                                {sub.comingSoon && <ComingSoon />}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </SidebarContext.Provider>
  );
}
