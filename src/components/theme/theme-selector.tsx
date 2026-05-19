"use client";

import { useThemeStore } from "@/store/theme-store";
import { defaultPresets } from "@/themes/presets";

export function ThemeSelector() {
  const { setTheme } = useThemeStore();

  return (
    <select
      // value={theme}
      onChange={(e) => setTheme(e.target.value as keyof typeof defaultPresets)}
      className="rounded border p-2"
    >
      {Object.entries(defaultPresets).map(([key, preset]) => (
        <option key={key} value={key}>
          {preset.label}
        </option>
      ))}
    </select>
  );
}
