import type { AnalyzeVideoResponse, RiskPoint, TrafficEvent } from "./types";

/**
 * Everything in this file produces MOCK data for UI development only.
 * It exists so the frontend has something to render before a real
 * inference backend is connected — see lib/api.ts for the switch-over
 * point. None of these numbers are model results.
 */

// Small deterministic PRNG so demo runs are reproducible across reloads.
function seededRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const MOCK_LABEL_POOL: TrafficEvent["label"][] = [
  "near_miss",
  "red_light",
  "stopped_vehicle",
  "jaywalking",
  "congestion",
  "solid_line_crossing",
  "illegal_turn",
];

export function generateMockEvents(durationSec: number, seed = 7): TrafficEvent[] {
  const rand = seededRandom(seed + Math.round(durationSec));
  const count = Math.max(2, Math.min(6, Math.floor(durationSec / 12)));
  const events: TrafficEvent[] = [];

  for (let i = 0; i < count; i++) {
    const spanStart = (durationSec / count) * i + rand() * 2;
    const length = 2 + rand() * 5;
    const start = Math.min(durationSec - 1, Math.max(0, spanStart));
    const end = Math.min(durationSec, start + length);
    const label = MOCK_LABEL_POOL[Math.floor(rand() * MOCK_LABEL_POOL.length)];
    events.push({
      start: Number(start.toFixed(1)),
      end: Number(end.toFixed(1)),
      label,
      confidence: Number((0.55 + rand() * 0.4).toFixed(2)),
    });
  }

  return events.sort((a, b) => a.start - b.start);
}

export function generateMockRiskCurve(
  durationSec: number,
  events: TrafficEvent[],
  seed = 11
): RiskPoint[] {
  const rand = seededRandom(seed + Math.round(durationSec));
  const step = 0.5;
  const points: RiskPoint[] = [];
  let base = 0.05 + rand() * 0.05;

  for (let t = 0; t <= durationSec; t += step) {
    // Nudge risk upward near mock event windows to look plausible on the chart.
    const nearEvent = events.some((e) => t >= e.start - 3 && t <= e.end + 1);
    const drift = (rand() - 0.5) * 0.03;
    base = Math.min(0.95, Math.max(0.02, base + drift + (nearEvent ? 0.03 : -0.01)));
    points.push({ time: Number(t.toFixed(1)), score: Number(base.toFixed(3)) });
  }

  return points;
}

export function buildMockAnalysis(durationSec: number): AnalyzeVideoResponse {
  const events = generateMockEvents(durationSec);
  const risk = generateMockRiskCurve(durationSec, events);
  return {
    events,
    risk,
    meta: { durationSec },
    mock: true,
  };
}
