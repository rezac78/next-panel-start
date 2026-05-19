"use client";

import { useThemeStore } from "@/store/theme-store";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ThemeSwitch = () => {
  const { mode, setMode } = useThemeStore();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setMode(mode === "light" ? "dark" : "light")}
      className="group-data-[collapsible=icon]:hidden"
    >
      {mode === "light" ? <MoonIcon className="size-6" /> : <SunIcon className="size-6" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
