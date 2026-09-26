import { clsx } from "clsx";
import type { ReactNode } from "react";

export function Pill({
  children,
  tone = "default",
  className,
  dot = false,
}: {
  children: ReactNode;
  tone?: "default" | "accent" | "cyan" | "amber" | "danger" | "violet";
  className?: string;
  dot?: boolean;
}) {
  const toneMap: Record<string, string> = {
    default: "border-line text-ink-dim bg-panel-raised",
    accent: "border-accent/30 text-accent bg-accent-bg",
    cyan: "border-cyan/30 text-cyan bg-cyan-bg",
    amber: "border-amber/30 text-amber bg-amber-bg",
    danger: "border-danger/30 text-danger bg-danger-bg",
    violet: "border-violet/30 text-violet bg-violet-bg",
  };
  const dotMap: Record<string, string> = {
    default: "bg-ink-dim",
    accent: "bg-accent",
    cyan: "bg-cyan",
    amber: "bg-amber",
    danger: "bg-danger",
    violet: "bg-violet",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] leading-none",
        toneMap[tone],
        className
      )}
    >
      {dot && <span className={clsx("h-1.5 w-1.5 rounded-full", dotMap[tone])} />}
      {children}
    </span>
  );
}
