"use client"
import { useThemeStore } from "@/store/theme-store";
import { useEffect, useState } from "react";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { styles, mode } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    const currentStyles = styles[mode];

    for (const [key, value] of Object.entries(currentStyles)) {
      root.style.setProperty(`--${key}`, value);
      root.style.setProperty(`--color-${key}`, value);
    }

    root.classList.toggle("dark", mode === "dark");
  }, [styles, mode, mounted]);

  if (!mounted) return null;
  return <>{children}</>;
}
