"use client";

import { Loader2Icon } from "lucide-react";
import { useLangStore } from "@/store/useLangStore";
import translations from "@/lib/i18n";
import React, { Suspense } from "react";

export default function ServerLoading({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { lang } = useLangStore();
  const t = translations[lang as "fa" | "en"];

  return (
    <div className="flex min-h-[calc(100vh-150px)] flex-col">
      <Suspense
        fallback={
          <div className="flex flex-1 items-center justify-center px-4">
            <div className="bg-background w-full max-w-md">
              <div className="flex flex-col items-center gap-5 text-center">
                <Loader2Icon className="text-primary size-10 animate-spin" />

                <div className="space-y-2">
                  <p className="text-lg font-semibold">{t.loading}</p>
                  <p className="text-muted-foreground text-sm">{t.loadingDesc}</p>
                </div>

                <div className="w-full space-y-3 pt-2">
                  <div className="bg-muted h-3 w-2/3 animate-pulse rounded" />
                  <div className="bg-muted h-3 w-full animate-pulse rounded" />
                  <div className="bg-muted h-3 w-5/6 animate-pulse rounded" />
                </div>
              </div>
            </div>
          </div>
        }
      >
        {children}
      </Suspense>
    </div>
  );
}
