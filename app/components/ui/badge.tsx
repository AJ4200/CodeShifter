import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = {
  default:
    "border-transparent bg-primary/10 text-primary hover:bg-primary/20",
  outline: "border-border/60 text-foreground",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof badgeVariants;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
        badgeVariants[variant],
        className,
      )}
      {...props}
    />
  ),
);

Badge.displayName = "Badge";
