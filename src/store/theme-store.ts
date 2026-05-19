import { create } from "zustand";
import { persist } from "zustand/middleware"; // Import persists middleware
import { defaultPresets } from "@/themes/presets";
import { defaultLightThemeStyles, defaultDarkThemeStyles } from "@/themes/defaults";
import { ThemeStyleProps, ThemeStyles } from "@/types/theme";

type ThemeKey = keyof typeof defaultPresets | "custom";

interface ThemeState {
  themeKey: ThemeKey;
  mode: "light" | "dark";
  styles: ThemeStyles;
  setTheme: (themeKey: ThemeKey) => void;
  setMode: (mode: "light" | "dark") => void;
  updateStyle: (mode: "light" | "dark", key: keyof ThemeStyleProps, value: string) => void;
}

function getCompleteStyle(
  mode: "light" | "dark",
  partialStyle: Partial<ThemeStyleProps>
): ThemeStyleProps {
  const defaultStyles = mode === "light" ? defaultLightThemeStyles : defaultDarkThemeStyles;
  
return { ...defaultStyles, ...partialStyle };
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      themeKey: "CV_Blog",
      mode: "light",
      styles: {
        light: getCompleteStyle("light", defaultPresets["CV_Blog"].styles.light),
        dark: getCompleteStyle("dark", defaultPresets["CV_Blog"].styles.dark),
      },
      setTheme: (themeKey) => {
        if (themeKey === "custom") return;
        const preset = defaultPresets[themeKey];
        if (preset) {
          set({
            themeKey,
            styles: {
              light: getCompleteStyle("light", preset.styles.light),
              dark: getCompleteStyle("dark", preset.styles.dark),
            },
          });
        }
      },
      setMode: (mode) => set({ mode }),
      updateStyle: (mode, key, value) =>
        set((state) => ({
          styles: {
            ...state.styles,
            [mode]: {
              ...state.styles[mode],
              [key]: value,
            },
          },
          themeKey: "custom",
        })),
    }),
    {
      name: "theme-storage", // Unique key for localStorage
    }
  )
);

/*
import { _create } from "zustand";
import { defaultPresets } from "@/themes/presets";
import { defaultStyle, defaultLightThemeStyles, defaultDarkThemeStyles } from "@/themes/defaults";
import { ThemeStyleProps, ThemeStyles } from "@/types/theme";

type ThemeKey = keyof typeof defaultPresets | "custom";

interface ThemeState {
    themeKey: ThemeKey;
    mode: "light" | "dark";
    styles: ThemeStyles;
    setTheme: (themeKey: ThemeKey) => void;
    setMode: (mode: "light" | "dark") => void;
    updateStyle: (mode: "light" | "dark", key: keyof ThemeStyleProps, value: string) => void;
}

function getCompleteStyle(mode: "light" | "dark", partialStyle: Partial<ThemeStyleProps>): ThemeStyleProps {
    const defaultStyles = mode === "light" ? defaultLightThemeStyles : defaultDarkThemeStyles;
    return { ...defaultStyles, ...partialStyle };
}

export const useThemeStore = _create<ThemeState>((set) => ({
    themeKey: "modern-minimal",
    mode: "light",
    styles: {
        // @ts-ignore
        light: getCompleteStyle("light", defaultPresets["modern-minimal"].styles.light),
        // @ts-ignore
        dark: getCompleteStyle("dark", defaultPresets["modern-minimal"].styles.dark),
    },
    setTheme: (themeKey) => {
        if (themeKey === "custom") return;
        const preset = defaultPresets[themeKey];
        if (preset) {
            set({
                themeKey,
                styles: {
                    light: getCompleteStyle("light", preset.styles.light),
                    dark: getCompleteStyle("dark", preset.styles.dark),
                },
            });
        }
    },
    setMode: (mode) => set({ mode }),
    updateStyle: (mode, key, value) =>
        set((state) => ({
            styles: {
                ...state.styles,
                [mode]: {
                    ...state.styles[mode],
                    [key]: value,
                },
            },
            themeKey: "custom",
        })),
}));*/
