import { clsx } from "clsx";
import type { ReactNode } from "react";

export function Panel({
  children,
  className,
  corners = false,
  padded = true,
}: {
  children: ReactNode;
  className?: string;
  corners?: boolean;
  padded?: boolean;
}) {
  return (
    <div
      className={clsx(
        "relative rounded-md border border-line bg-panel shadow-panel",
        padded && "p-5 sm:p-6",
        className
      )}
    >
      {corners && (
        <>
          <span className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l border-t border-accent/40" />
          <span className="pointer-events-none absolute right-2 top-2 h-3 w-3 border-r border-t border-accent/40" />
          <span className="pointer-events-none absolute bottom-2 left-2 h-3 w-3 border-b border-l border-accent/40" />
          <span className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b border-r border-accent/40" />
        </>
      )}
      {children}
    </div>
  );
}
