"use client";

import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLangStore } from "@/store/useLangStore";
import translations from "@/lib/i18n";

export default function ServerError() {
  const handleRetry = () => {
    location.reload();
  };
  const { lang } = useLangStore();
  const t = translations[lang as "fa" | "en"];

  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <div className="bg-background flex flex-col items-center gap-4 rounded-2xl border p-6 text-center shadow-sm md:w-1/2">
        <div className="bg-destructive/10 text-destructive flex h-20 w-20 items-center justify-center rounded-full">
          <AlertTriangle className="h-10 w-10" />
        </div>

        <div className="space-y-1">
          <p className="text-lg font-bold">{t.conneCtionproblem}</p>
          <p className="text-muted-foreground text-md">{t.conneCtionproblemDesc}</p>
        </div>

        <Button variant="outline" size="lg" onClick={handleRetry} className="mt-2 gap-2">
          <RefreshCcw className="h-5 w-5" />
          {t.Retry}
        </Button>
      </div>
    </div>
  );
}
