"use client";

import { EVENT_CLASSES, TIER_META } from "@/config/site";
import { formatTime } from "@/lib/format";
import type { TrafficEvent } from "@/lib/types";

const CLASS_META = new Map(EVENT_CLASSES.map((c) => [c.id, c]));

export function EventList({
  events,
  onSeek,
}: {
  events: TrafficEvent[];
  onSeek?: (time: number) => void;
}) {
  if (events.length === 0) {
    return (
      <p className="py-6 text-center font-mono text-[11px] text-ink-faint">
        No events detected yet.
      </p>
    );
  }

  return (
    <ul className="flex flex-col divide-y divide-line">
      {events.map((ev, idx) => {
        const meta = CLASS_META.get(ev.label);
        const tier = meta ? TIER_META[meta.tier] : TIER_META.behavior;
        return (
          <li key={`${ev.label}-${idx}`}>
            <button
              type="button"
              onClick={() => onSeek?.(ev.start)}
              className="flex w-full items-center justify-between gap-3 py-3 text-left transition-colors hover:bg-panel-raised"
            >
              <div className="flex items-center gap-3">
                <span className={`h-2 w-2 shrink-0 rounded-full ${tier.dot}`} />
                <div>
                  <p className="font-display text-[13px] font-medium text-ink">
                    {meta?.label ?? ev.label}
                  </p>
                  <p className="font-mono text-[11px] text-ink-faint">
                    {formatTime(ev.start)} → {formatTime(ev.end)}
                  </p>
                </div>
              </div>
              {typeof ev.confidence === "number" && (
                <span className="font-mono text-[11px] text-ink-faint">
                  {(ev.confidence * 100).toFixed(0)}%
                </span>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
