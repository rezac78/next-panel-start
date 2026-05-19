import React, { type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface PlaceholderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Placeholder: React.FC<PlaceholderProps> = ({ className = "", ...props }) => {
  return (
    <div
      className={cn(`rounded-12 bg-secondary animate-shimmer w-full`, className)}
      style={{
        backgroundImage:
          "linear-gradient(45deg, var(--border) 2%, var(--muted-foreground) 30%, var(--muted) 100%)",
        backgroundSize: "200% 100%",
        opacity: 0.3,
      }}
      {...props}
    />
  );
};

export default Placeholder;
