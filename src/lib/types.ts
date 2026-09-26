export type EventLabel =
  | "accident"
  | "near_miss"
  | "red_light"
  | "wrong_way"
  | "illegal_u_turn"
  | "stopped_vehicle"
  | "jaywalking"
  | "failure_to_yield"
  | "illegal_turn"
  | "solid_line_crossing"
  | "stop_line"
  | "congestion"
  | "road_obstacle"
  | "fire_smoke";

export interface TrafficEvent {
  start: number; // seconds
  end: number; // seconds
  label: EventLabel;
  confidence?: number; // 0-1, optional — only shown when provided by a real model
}

export interface RiskPoint {
  time: number; // seconds
  score: number; // 0-1 probability of an accident starting within the next 5s
}

export interface AnalyzeVideoResponse {
  events: TrafficEvent[];
  risk: RiskPoint[];
  meta?: {
    durationSec?: number;
    fps?: number;
    resolution?: string;
  };
  annotatedVideoUrl?: string;
  mock: boolean;
}

export interface SampleVideoResult {
  id: string;
  title: string;
  videoUrl: string | null; // null until a real sample clip is provided
  duration: string | null;
  resolution: string | null;
  fps: string | null;
  events: TrafficEvent[];
  annotatedVideoUrl: string | null;
  mock: boolean;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
  contributions: string[];
}
