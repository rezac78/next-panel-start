"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
// import { getInitials } from '@/lib/utils';
// import { useAuthStore } from '@/stores/profile';

import { CircleUser, CreditCard, EllipsisVertical, LogOut, MessageSquareDot } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/user";
import { getInitials } from "@/lib/utils";
import { NEXT_API_URL } from "@/config";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { user } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  if (!user) {
    return (
      <Avatar className="size-9 rounded-lg">
        <AvatarFallback className="rounded-lg">?</AvatarFallback>
      </Avatar>
    );
  }

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${NEXT_API_URL}/api/logout`, {
        method: "POST",
      });
      if (res.ok) {
        toast.success("با موفقیت خارج شدید ✅");
        router.push("/auth");
      } else {
        toast.error("خروج ناموفق بود ❌");
      }
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("خطایی رخ داد، لطفاً دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarFallback className="rounded-lg">{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.name}</span>
                <span className="text-muted-foreground truncate text-xs">{user?.email}</span>
              </div>
              <EllipsisVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg">{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.name}</span>
                  <span className="text-muted-foreground truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/*
                       <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <CircleUser />
                                Account
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CreditCard />
                                Billing
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <MessageSquareDot />
                                Notifications
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        */}
            <DropdownMenuItem onClick={handleLogout} disabled={loading}>
              <LogOut className="mr-2" />
              {loading ? "Logging out..." : "Log out"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
