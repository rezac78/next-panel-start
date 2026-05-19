"use client";

import { useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLangStore } from "@/store/useLangStore";
import translations from "@/lib/i18n";

type Option = {
  label: string;
  value: string;
};

type MultiSelectProps = {
  options: Option[];
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
};

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder,
  className,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const toggleValue = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };
  const { lang } = useLangStore();
  const t = translations[lang as "fa" | "en"];

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <button
          ref={triggerRef}
          className={cn(
            "bg-background flex min-h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-left text-sm",
            className
          )}
        >
          <div className="flex flex-wrap gap-1">
            {selected.length > 0 ? (
              <>
                {selected.slice(0, 2).map((value, i) => {
                  const item = options.find((o) => o.value === value);

                  return (
                    <Badge
                      key={`${value}${i}`}
                      className="flex items-center gap-1 px-2 py-0.5"
                      variant="secondary"
                    >
                      {item?.label}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          onChange(selected.filter((v) => v !== value));
                        }}
                      />
                    </Badge>
                  );
                })}

                {selected.length > 2 && (
                  <Badge className="px-2 py-0.5" variant="secondary">
                    +{selected.length - 2} {t.more}
                  </Badge>
                )}
              </>
            ) : (
              <span className="text-muted-foreground">{placeholder ?? t.Select}</span>
            )}
          </div>

          <ChevronDown className="h-4 w-4 opacity-60" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
        <Command>
          <CommandInput placeholder={`${t.Search}...`} />
          <CommandEmpty>{t.NotFoundResults}</CommandEmpty>

          <CommandGroup className="max-h-60 overflow-auto">
            {options.map((opt, i) => {
              const checked = selected.includes(opt.value);

              return (
                <CommandItem
                  key={`${opt.value}${i}`}
                  onSelect={() => toggleValue(opt.value)}
                  className="flex cursor-pointer items-center gap-2 px-3 py-2"
                >
                  <Checkbox checked={checked} className="h-4 w-4" />
                  <span>{opt.label}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
