"use client";

import { useState } from "react";
import { EVENT_CLASSES, TIER_META } from "@/config/site";
import { formatTime } from "@/lib/format";
import type { TrafficEvent } from "@/lib/types";

const CLASS_META = new Map(EVENT_CLASSES.map((c) => [c.id, c]));

export function EventTimeline({
  events,
  duration,
  currentTime,
  onSeek,
}: {
  events: TrafficEvent[];
  duration: number;
  currentTime?: number;
  onSeek?: (time: number) => void;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const safeDuration = duration > 0 ? duration : 1;
  const ticks = buildTicks(safeDuration);

  return (
    <div>
      <div className="relative h-10 w-full rounded border border-line bg-void/60">
        {/* tick marks */}
        {ticks.map((t) => (
          <div
            key={t}
            className="absolute top-0 h-full border-l border-line/70"
            style={{ left: `${(t / safeDuration) * 100}%` }}
          />
        ))}

        {/* playhead */}
        {typeof currentTime === "number" && (
          <div
            className="absolute top-0 z-10 h-full w-px bg-ink"
            style={{ left: `${Math.min(100, (currentTime / safeDuration) * 100)}%` }}
          />
        )}

        {/* event segments */}
        {events.map((ev, idx) => {
          const meta = CLASS_META.get(ev.label);
          const tier = meta ? TIER_META[meta.tier] : TIER_META.behavior;
          const left = (ev.start / safeDuration) * 100;
          const width = Math.max(0.8, ((ev.end - ev.start) / safeDuration) * 100);
          return (
            <button
              type="button"
              key={`${ev.label}-${idx}`}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered((v) => (v === idx ? null : v))}
              onClick={() => onSeek?.(ev.start)}
              className={`group absolute top-1/2 h-5 -translate-y-1/2 rounded-sm border ${tier.bg} transition-[filter] hover:brightness-125`}
              style={{
                left: `${left}%`,
                width: `${width}%`,
                borderColor: "rgba(255,255,255,0.15)",
              }}
              aria-label={`${meta?.label ?? ev.label}, ${formatTime(ev.start)} to ${formatTime(ev.end)}`}
            >
              <span className={`absolute inset-0 rounded-sm ${tier.dot} opacity-60`} />
            </button>
          );
        })}
      </div>

      <div className="mt-1.5 flex justify-between font-mono text-[10px] text-ink-faint">
        <span>00:00.0</span>
        <span>{formatTime(safeDuration)}</span>
      </div>

      {hovered !== null && events[hovered] && (
        <div className="mt-3 flex items-center gap-3 rounded border border-line bg-panel-raised px-3 py-2 font-mono text-[11px]">
          <span className="text-ink">
            {CLASS_META.get(events[hovered].label)?.label ?? events[hovered].label}
          </span>
          <span className="text-ink-faint">
            {formatTime(events[hovered].start)} → {formatTime(events[hovered].end)}
          </span>
          {typeof events[hovered].confidence === "number" && (
            <span className="text-ink-faint">
              conf {events[hovered].confidence!.toFixed(2)}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function buildTicks(duration: number): number[] {
  const step = duration > 90 ? 30 : duration > 30 ? 10 : 5;
  const ticks: number[] = [];
  for (let t = step; t < duration; t += step) ticks.push(t);
  return ticks;
}
