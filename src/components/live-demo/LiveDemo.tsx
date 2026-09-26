"use client";

import { useCallback, useRef, useState } from "react";
import { AlertTriangle, FlaskConical, Loader2, Upload } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Panel } from "@/components/ui/Panel";
import { Pill } from "@/components/ui/Pill";
import { analyzeVideo, isBackendConfigured, type AnalyzeProgress } from "@/lib/api";
import { compressVideo } from "@/lib/compressVideo";
import type { AnalyzeVideoResponse } from "@/lib/types";
import { VideoPlayer, type VideoPlayerHandle } from "./VideoPlayer";
import { EventTimeline } from "./EventTimeline";
import { EventList } from "./EventList";
import { RiskChart } from "./RiskChart";
import { LINKS } from "@/config/site";

type Status = "idle" | "uploading" | "processing" | "done" | "error";

export function LiveDemo() {
  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState<string>(
    "Upload a video to analyze traffic events."
  );
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [result, setResult] = useState<AnalyzeVideoResponse | null>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const playerRef = useRef<VideoPlayerHandle>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.includes("mp4") && !file.name.toLowerCase().endsWith(".mp4")) {
      setStatus("error");
      setStatusMessage("Something went wrong. Please check the video format and try again.");
      return;
    }

    setResult(null);
setVideoUrl(URL.createObjectURL(file));
setStatus("uploading");
setStatusMessage("Compressing video…");

try {
  // 1. Сжимаем перед загрузкой (быстро, если видео маленькое)
  const originalMB = (file.size / 1024 / 1024).toFixed(1);
  let toUpload: File = file;

  try {
    toUpload = await compressVideo(file, {
      targetWidth: 640,
      videoBitrate: 800_000,
      fps: 30,
      onProgress: (pct) => {
        setStatusMessage(`Compressing video… ${pct}%`);
      },
    });
    const compressedMB = (toUpload.size / 1024 / 1024).toFixed(1);
    setStatusMessage(`Uploading (${originalMB} MB → ${compressedMB} MB)…`);
  } catch (e) {
    // Если сжатие не удалось — отправляем оригинал
    console.warn("Compression failed, uploading original:", e);
    setStatusMessage(`Uploading original (${originalMB} MB)…`);
    toUpload = file;
  }

  // 2. Отправляем на backend
  const onProgress = (p: AnalyzeProgress) => {
    setStatus(p.stage);
    setStatusMessage(p.message);
  };
  const response = await analyzeVideo(toUpload, onProgress);
  setResult(response);

  if (response.annotatedVideoUrl) {
    const fullUrl = response.annotatedVideoUrl.startsWith("http")
      ? response.annotatedVideoUrl
      : `${LINKS.demoApi}${response.annotatedVideoUrl}`;
    setVideoUrl(fullUrl);
  }

  setStatus("done");
  setStatusMessage("Analysis complete.");
} catch (err) {
  console.error(err);
  setStatus("error");
  setStatusMessage("Something went wrong. Please check the video format and try again.");
}
  }, []);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const onSeek = (time: number) => {
    setCurrentTime(time);
    playerRef.current?.seekTo(time);
  };

  const busy = status === "uploading" || status === "processing";

  return (
    <section id="live-demo" className="border-b border-line bg-void py-20 sm:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Interactive"
            title="Live demo"
            description="Upload a fixed-camera road clip. The workstation below detects events as time segments and estimates near-term accident risk."
          />
          {!isBackendConfigured() && (
            <Pill tone="amber" dot>
              Demo mode — mock results
            </Pill>
          )}
        </div>

        <Panel corners className="mt-10" padded={false}>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-md bg-line lg:grid-cols-[1.4fr_1fr]">
            {/* Left: player + timeline */}
            <div className="space-y-5 bg-panel p-5 sm:p-6">
              <VideoPlayer
                ref={playerRef}
                src={videoUrl}
                onLoadedMetadata={(d) => setDuration(d)}
                onTimeUpdate={(t) => setCurrentTime(t)}
              />

              {!videoUrl ? (
                <DropZone
                  busy={busy}
                  onDrop={onDrop}
                  onBrowse={() => inputRef.current?.click()}
                />
              ) : (
                <>
                  <div className="flex items-center gap-2 font-mono text-[11px] text-ink-dim">
                    <StatusIcon status={status} />
                    {statusMessage}
                  </div>

                  <div>
                    <p className="mb-2 font-mono text-[11px] text-ink-faint">
                      EVENT TIMELINE
                    </p>
                    <EventTimeline
                      events={result?.events ?? []}
                      duration={duration || 1}
                      currentTime={currentTime}
                      onSeek={onSeek}
                    />
                  </div>
                </>
              )}

              <input
                ref={inputRef}
                type="file"
                accept="video/mp4"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFile(file);
                }}
              />
            </div>

            {/* Right: events + risk */}
            <div className="flex flex-col divide-y divide-line bg-panel">
              <div className="p-5 sm:p-6">
                <p className="mb-1 font-mono text-[11px] text-ink-faint">
                  DETECTED EVENTS
                </p>
                <EventList events={result?.events ?? []} onSeek={onSeek} />
              </div>
              <div className="p-5 sm:p-6">
                <p className="mb-3 font-mono text-[11px] text-ink-faint">
                  RISK OF ACCIDENT · NEXT 5S
                </p>
                <RiskChart data={result?.risk ?? []} />
              </div>
            </div>
          </div>

          {result?.mock && (
            <div className="flex items-center gap-2 border-t border-line px-5 py-3 font-mono text-[10px] text-ink-faint sm:px-6">
              <FlaskConical className="h-3 w-3" />
              These events and risk values are generated locally for UI demonstration —
              they are not output from a trained model.
            </div>
          )}
        </Panel>
      </Container>
    </section>
  );
}

function DropZone({
  busy,
  onDrop,
  onBrowse,
}: {
  busy: boolean;
  onDrop: (e: React.DragEvent) => void;
  onBrowse: () => void;
}) {
  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      className="flex flex-col items-center justify-center gap-3 rounded-md border border-dashed border-line-strong px-6 py-10 text-center"
    >
      {busy ? (
        <Loader2 className="h-5 w-5 animate-spin text-accent" />
      ) : (
        <Upload className="h-5 w-5 text-ink-faint" strokeWidth={1.5} />
      )}
      <div>
        <p className="text-[13px] text-ink-dim">Drag and drop an .mp4 file here</p>
        <button
          type="button"
          onClick={onBrowse}
          className="mt-2 font-mono text-[12px] text-accent underline underline-offset-4"
        >
          or browse a file
        </button>
      </div>
      <p className="font-mono text-[10px] text-ink-faint">
        Accepted format: .mp4 — max size/duration: [DEMO LIMIT]
      </p>
    </div>
  );
}

function StatusIcon({ status }: { status: Status }) {
  if (status === "error")
    return <AlertTriangle className="h-3.5 w-3.5 text-danger" />;
  if (status === "uploading" || status === "processing")
    return <Loader2 className="h-3.5 w-3.5 animate-spin text-accent" />;
  return <span className="h-1.5 w-1.5 rounded-full bg-accent" />;
}
