import { FolderKanban, Layers, PanelLeftIcon, SquarePlus, UserPen } from "lucide-react";
import UserAdd2Icon from "@/public/icons/dashboard/customer/UserAdd2Icon";

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

export const sidebarItems1: NavGroup[] = [
  {
    id: 1,
    label: "Dashboard",
    url: "/admin",
    icon: PanelLeftIcon,
    items: [],
  },
  {
    id: 2,
    label: "Project",
    url: "/admin/project",
    icon: FolderKanban,
    items: [],
  },
];
export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Dashboard",
    url: "/admin",
    icon: PanelLeftIcon,
    items: [],
  },
  {
    id: 2,
    label: "Project",
    url: "/admin/project",
    icon: FolderKanban,
    items: [],
  },
  // {
  //   id: 6,
  //   label: "Blog",
  //   url: "/admin/blog",
  //   icon: Layers,
  //   items: [
  //     { title: "Blog", url: "/admin/blog" },
  //     { title: "Tags", url: "/admin/blog/tags" },
  //     { title: "Categories", url: "/admin/blog/categories" },
  //     // { title: 'Reviews', url: '/admin/customers/reviews' },
  //     // { title: 'GDPR Data Requests', url: '/admin/customers/gdpr' }
  //   ],
  // },
];
