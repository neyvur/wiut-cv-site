"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";

export interface VideoPlayerHandle {
  seekTo: (seconds: number) => void;
}

export const VideoPlayer = forwardRef<
  VideoPlayerHandle,
  {
    src: string | null;
    onTimeUpdate?: (time: number) => void;
    onLoadedMetadata?: (duration: number) => void;
  }
>(function VideoPlayer({ src, onTimeUpdate, onLoadedMetadata }, ref) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useImperativeHandle(ref, () => ({
    seekTo: (seconds: number) => {
      if (videoRef.current) {
        videoRef.current.currentTime = seconds;
        videoRef.current.play().catch(() => {
          /* autoplay might be blocked — that's fine, user can press play */
        });
      }
    },
  }));

  if (!src) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-md border border-dashed border-line-strong bg-void/40">
        <p className="font-mono text-[11px] text-ink-faint">
          Upload a video to preview it here
        </p>
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      src={src}
      controls
      className="aspect-video w-full rounded-md border border-line bg-black"
      onTimeUpdate={(e) => onTimeUpdate?.(e.currentTarget.currentTime)}
      onLoadedMetadata={(e) => onLoadedMetadata?.(e.currentTarget.duration)}
    />
  );
});
