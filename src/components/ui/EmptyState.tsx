import type { LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon,
  title,
  description,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex h-full min-h-[160px] flex-col items-center justify-center gap-2 rounded-md border border-dashed border-line-strong bg-void/40 px-6 py-10 text-center ${
        className ?? ""
      }`}
    >
      <Icon className="mb-1 h-5 w-5 text-ink-faint" strokeWidth={1.5} />
      <p className="font-mono text-[11px] tracking-wide text-ink-faint">
        {title}
      </p>
      {description && (
        <p className="max-w-xs text-xs leading-relaxed text-ink-faint">
          {description}
        </p>
      )}
    </div>
  );
}
