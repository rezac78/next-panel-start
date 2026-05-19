import { create } from "zustand";

interface LangState {
  lang: string;
  setLang: (value: string) => void;
}

export const useLangStore = create<LangState>((set) => ({
  lang: "en", // مقدار پیش‌فرض
  setLang: (value) => set(() => ({ lang: value })),
}));
