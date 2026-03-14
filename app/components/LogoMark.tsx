import type { FC } from "react";

import { cn } from "@/lib/utils";

interface LogoMarkProps {
  className?: string;
  labelClassName?: string;
}

const LogoMark: FC<LogoMarkProps> = ({ className, labelClassName }) => {
  return (
    <div
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-background/70 text-primary shadow-sm",
        className,
      )}
      aria-hidden
    >
      <span className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.35),transparent_65%)]" />
      <span className="absolute inset-1 rounded-lg border border-primary/40" />
      <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-primary shadow-sm shadow-primary/40" />
      <span className="absolute -bottom-1 -left-1 h-2 w-2 rounded-full bg-primary/40" />
      <span
        className={cn(
          "relative text-[10px] font-semibold tracking-[0.2em]",
          labelClassName,
        )}
      >
        CS
      </span>
    </div>
  );
};

export default LogoMark;
