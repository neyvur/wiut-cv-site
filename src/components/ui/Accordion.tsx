"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { clsx } from "clsx";

export function Accordion({
  items,
}: {
  items: { title: string; content: React.ReactNode }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line rounded-md border border-line bg-panel">
      {items.map((item, idx) => {
        const open = openIndex === idx;
        return (
          <div key={item.title}>
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : idx)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
              aria-expanded={open}
            >
              <span className="font-display text-[14px] font-medium text-ink">
                {item.title}
              </span>
              <ChevronDown
                className={clsx(
                  "h-4 w-4 shrink-0 text-ink-faint transition-transform",
                  open && "rotate-180 text-accent"
                )}
              />
            </button>
            {open && (
              <div className="px-5 pb-5 text-[13px] leading-relaxed text-ink-dim sm:px-6">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
