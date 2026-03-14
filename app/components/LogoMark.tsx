import type { FC } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface LogoMarkProps {
  className?: string;
}

const LogoMark: FC<LogoMarkProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-background/70 text-primary shadow-sm",
        className,
      )}
      aria-hidden
    >
      <span className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.35),transparent_65%)]" />
      <span className="absolute inset-1 rounded-lg border border-primary/40" />
      <Image
        src="/android-chrome-192x192.png"
        alt=""
        width={192}
        height={192}
        className="relative z-10 h-full w-full rounded-lg object-contain"
        priority
      />
      <span className="absolute -right-1 -top-1 z-20 h-2.5 w-2.5 rounded-full bg-primary shadow-sm shadow-primary/40" />
      <span className="absolute -bottom-1 -left-1 z-20 h-2 w-2 rounded-full bg-primary/40" />
    </div>
  );
};

export default LogoMark;
