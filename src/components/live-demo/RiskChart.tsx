"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatTime } from "@/lib/format";
import type { RiskPoint } from "@/lib/types";

export function RiskChart({ data }: { data: RiskPoint[] }) {
  if (data.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center font-mono text-[11px] text-ink-faint">
        No risk estimate yet.
      </div>
    );
  }

  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
          <defs>
            <linearGradient id="riskFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4DD8E8" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#4DD8E8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#1F2621" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="time"
            tickFormatter={(v: number) => formatTime(v).slice(0, 5)}
            stroke="#57605A"
            tick={{ fontSize: 10, fontFamily: "var(--font-mono)" }}
            tickLine={false}
            axisLine={{ stroke: "#1F2621" }}
            minTickGap={40}
          />
          <YAxis
            domain={[0, 1]}
            ticks={[0, 0.5, 1]}
            stroke="#57605A"
            tick={{ fontSize: 10, fontFamily: "var(--font-mono)" }}
            tickLine={false}
            axisLine={false}
            width={32}
          />
          <Tooltip
            contentStyle={{
              background: "#0F1210",
              border: "1px solid #1F2621",
              borderRadius: 6,
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "#E7ECE8",
            }}
            labelFormatter={(v: number) => `t = ${formatTime(v)}`}
            formatter={(value: number) => [value.toFixed(2), "risk"]}
          />
          <Area
            type="monotone"
            dataKey="score"
            stroke="#4DD8E8"
            strokeWidth={1.75}
            fill="url(#riskFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
