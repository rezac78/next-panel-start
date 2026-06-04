import { Layers, PanelLeftIcon } from "lucide-react";

export type NavMainItem = {
  title: string;
  url: string;
  icon?: React.ComponentType<{ className?: string }>;
  comingSoon?: boolean;
  newTab?: boolean;
  subItems?: NavMainItem[];
};

export type NavGroup = {
  id: number;
  label: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  items: NavMainItem[];
};

type SidebarTranslations = {
  page: {
    dashboard: string;
    website: string;
    menu: string;
    subMenu: string;
  };
};

export const getSidebarItems = (t: SidebarTranslations): NavGroup[] => [
  {
    id: 1,
    label: t.page.dashboard,
    url: "/admin",
    icon: PanelLeftIcon,
    items: [],
  },
  {
    id: 2,
    label: t.page.website,
    url: "/admin/webSite",
    icon: Layers,
    items: [
      {
        title: t.page.menu,
        url: "/admin/webSite/menu",
      },
      {
        title: t.page.subMenu,
        url: "/admin/webSite/submenu",
      },
    ],
  },
];
