"use client";

import Link from "next/link";
import { Home, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLangStore } from "@/store/useLangStore";
import translations from "@/lib/i18n";

export default function NotFound() {
  const { lang } = useLangStore();
  const t = translations[lang as "fa" | "en"];

  return (
    <main className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="relative flex w-full max-w-xl flex-col items-center overflow-hidden rounded-3xl border bg-card p-8 text-center shadow-sm md:p-12">
        <div className="absolute -top-24 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 h-48 w-48 rounded-full bg-destructive/10 blur-3xl" />

        <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
          <SearchX className="h-12 w-12 text-primary" />
        </div>

        <p className="relative text-7xl font-black tracking-tight text-primary md:text-8xl">
          404
        </p>

        <h1 className="relative mt-4 text-2xl font-bold md:text-3xl">
          {t.notFoundTitle}
        </h1>

        <p className="relative mt-3 max-w-md text-sm leading-7 text-muted-foreground md:text-base">
          {t.notFoundDescription}
        </p>

        <Button asChild size="lg" className="relative mt-8 gap-2">
          <Link href="/admin">
            <Home className="h-5 w-5" />
            {t.backToDashboard}
          </Link>
        </Button>
      </div>
    </main>
  );
}