"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

type Props = {
  value?: string;
  onChangeAction: (v: string) => void;
  className?: string;
  stepMinutes?: number; // مثلا 1 یا 5 یا 15 دقیقه
  disabled?: boolean;
};

export default function TimeField({
  value,
  onChangeAction,
  className = "",
  stepMinutes = 5,
  disabled = false,
}: Props) {
  const [hour, setHour] = useState<number>(() => {
    const h = value?.split(":")[0];

    return h ? parseInt(h, 10) : 0;
  });

  const [minute, setMinute] = useState<number>(() => {
    const m = value?.split(":")[1];

    return m ? parseInt(m, 10) : 0;
  });

  const update = (h: number, m: number) => {
    const hh = h?.toString()?.padStart(2, "0");
    const mm = m?.toString()?.padStart(2, "0");
    onChangeAction(`${hh}:${mm}`);
  };

  const increase = (type: "hour" | "minute") => {
    if (type === "hour") {
      const h = (hour + 1) % 24;
      setHour(h);
      update(h, minute);
    } else {
      const m = (minute + stepMinutes) % 60;
      setMinute(m);
      update(hour, m);
    }
  };

  const decrease = (type: "hour" | "minute") => {
    if (type === "hour") {
      const h = (hour - 1 + 24) % 24;
      setHour(h);
      update(h, minute);
    } else {
      const m = (minute - stepMinutes + 60) % 60;
      setMinute(m);
      update(hour, m);
    }
  };

  const handleManualChange = (type: "hour" | "minute", val: string) => {
    const num = Math.max(0, Math.min(parseInt(val) || 0, type === "hour" ? 23 : 59));
    if (type === "hour") {
      setHour(num);
      update(num, minute);
    } else {
      setMinute(num);
      update(hour, num);
    }
  };

  return (
    <div
      className={`bg-background flex items-center justify-center gap-2 rounded-md border border-gray-300 px-2 py-1 shadow-sm transition focus-within:border-gray-400 hover:border-gray-400 ${className}`}
    >
      {/* ساعت */}
      <div className="flex flex-col items-center gap-0.5">
        <Button
          size="icon"
          variant="ghost"
          type="button"
          className="size-5 text-[10px] leading-none"
          onClick={() => increase("hour")}
        >
          <ChevronUpIcon />
        </Button>
        <Input
          value={hour?.toString()?.padStart(2, "0")}
          onChange={(e) => handleManualChange("hour", e.target.value)}
          className="h-8 w-8 border-none p-0 text-center text-[13px] font-medium outline-none focus:ring-0"
          min={0}
          disabled={disabled}
          max={23}
        />
        <Button
          size="icon"
          variant="ghost"
          type="button"
          className="size-5 text-[10px] leading-none"
          onClick={() => decrease("hour")}
        >
          <ChevronDownIcon />
        </Button>
      </div>

      <span className="text-sm font-medium">:</span>

      {/* دقیقه */}
      <div className="flex flex-col items-center gap-0.5">
        <Button
          size="icon"
          variant="ghost"
          type="button"
          className="size-5 text-[10px] leading-none"
          onClick={() => increase("minute")}
        >
          <ChevronUpIcon />
        </Button>
        <Input
          value={minute?.toString()?.padStart(2, "0")}
          onChange={(e) => handleManualChange("minute", e.target.value)}
          className="h-8 w-8 border-none p-0 text-center text-[13px] font-medium outline-none focus:ring-0"
          min={0}
          max={59}
          disabled={disabled}
          step={stepMinutes}
        />
        <Button
          size="icon"
          variant="ghost"
          type="button"
          className="size-5 text-[10px] leading-none"
          onClick={() => decrease("minute")}
        >
          <ChevronDownIcon />
        </Button>
      </div>
    </div>
  );
}
