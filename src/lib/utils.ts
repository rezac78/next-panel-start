import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (str: string): string => {
  if (!str.trim()) return "?";

  return (
    str
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "?"
  );
};

export function offsetDate(baseDate: Date | undefined, days = 0) {
  if (!baseDate) return;

  const date = new Date(baseDate);
  date.setDate(date.getDate() + days);

  return date;
}

export const slugify = (str: string) =>
  str
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FFa-zA-Z0-9\-]+/g, "")
    .replace(/\-+/g, "-");
