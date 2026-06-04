"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLangStore } from "@/store/useLangStore";
import translations from "@/lib/i18n";

export interface SimpleToolbarProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  onClear?: () => void;
}

export default function NewTableToolbar({
  search,
  setSearch,
  onClear,
}: SimpleToolbarProps) {
  const { lang } = useLangStore();
  const t = translations[lang as "fa" | "en"];
  const [inputValue, setInputValue] = useState(search);

  useEffect(() => {
    setInputValue(search);
  }, [search]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(inputValue);
    }, 500);

    return () => clearTimeout(timeout);
  }, [inputValue, setSearch]);

  const handleClear = () => {
    setInputValue("");
    setSearch("");
    onClear?.();
  };

  return (
    <div className="flex items-center gap-3">
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={`${t.Search}...`}
        className="w-full lg:w-64"
      />

      <Button variant="outline" onClick={handleClear}>
        {t.Clear}
      </Button>
    </div>
  );
}