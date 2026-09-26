import { LINKS } from "@/config/site";
import { buildMockAnalysis } from "./mockData";
import type { AnalyzeVideoResponse, SampleVideoResult } from "./types";

/**
 * Frontend API layer
 * -------------------
 * This is the ONLY place that decides whether we talk to a real
 * inference backend or fall back to local mock data. Every component
 * calls through here — nothing else should reach for fetch() directly
 * or invent results of its own.
 *
 * To connect the real backend: set LINKS.demoApi in src/config/site.ts
 * to a live URL. Until then, isBackendConfigured() is false and every
 * call below runs in clearly-labeled demo/mock mode.
 */

export function isBackendConfigured(): boolean {
  return Boolean(LINKS.demoApi) && !LINKS.demoApi.startsWith("[");
}

function readVideoDuration(file: File): Promise<number> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = () => {
      const duration = Number.isFinite(video.duration) ? video.duration : 30;
      URL.revokeObjectURL(video.src);
      resolve(duration);
    };
    video.onerror = () => reject(new Error("Could not read video metadata."));
    video.src = URL.createObjectURL(file);
  });
}

export interface AnalyzeProgress {
  stage: "uploading" | "processing" | "done" | "error";
  message: string;
}

/**
 * POST /api/analyze
 * Input: a road-camera .mp4 file
 * Output: { events, risk, meta } — see lib/types.ts::AnalyzeVideoResponse
 *
 * In mock mode this resolves with generated placeholder events instead
 * of calling a network endpoint, and the response is always tagged
 * `mock: true` so the UI can label it honestly.
 */
export async function analyzeVideo(
  file: File,
  onProgress?: (p: AnalyzeProgress) => void
): Promise<AnalyzeVideoResponse> {
  if (isBackendConfigured()) {
    onProgress?.({ stage: "uploading", message: "Uploading video…" });
    const formData = new FormData();
    formData.append("video", file);

    const res = await fetch(`${LINKS.demoApi}/api/analyze`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      onProgress?.({ stage: "error", message: "Analysis failed. Please try again." });
      throw new Error(`Analyze request failed with status ${res.status}`);
    }

    onProgress?.({ stage: "processing", message: "Running inference…" });
    const data = (await res.json()) as AnalyzeVideoResponse;
    onProgress?.({ stage: "done", message: "Analysis complete." });
    return { ...data, mock: false };
  }

  // ---- Mock mode ----
  onProgress?.({ stage: "uploading", message: "Reading video…" });
  const duration = await readVideoDuration(file);

  onProgress?.({ stage: "processing", message: "Analyzing video (demo mode)…" });
  await new Promise((r) => setTimeout(r, 1400));

  const result = buildMockAnalysis(duration);
  onProgress?.({ stage: "done", message: "Analysis complete." });
  return result;
}

/**
 * Results for the pre-loaded sample videos shown in "Sample Video Analysis".
 * Returns placeholders until real sample clips + annotations are provided.
 */
export async function getSampleResults(): Promise<SampleVideoResult[]> {
  if (isBackendConfigured()) {
    const res = await fetch(`${LINKS.demoApi}/api/samples`);
    if (!res.ok) throw new Error(`Samples request failed with status ${res.status}`);
    return (await res.json()) as SampleVideoResult[];
  }

  return [1, 2, 3].map((n) => ({
    id: `sample-${n}`,
    title: `Sample 0${n}`,
    videoUrl: null,
    duration: null,
    resolution: null,
    fps: null,
    events: [],
    annotatedVideoUrl: null,
    mock: true,
  }));
}
