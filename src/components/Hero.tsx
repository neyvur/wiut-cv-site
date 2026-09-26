import { ArrowRight, Circle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { EVENT_NAME, TASK_NAME } from "@/config/site";

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-line bg-void pb-20 pt-16 sm:pb-28 sm:pt-20"
    >
      <div className="grid-backdrop absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-fade-bottom opacity-90" />

      <Container className="relative">
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] tracking-wide text-ink-dim">
          <span className="rounded-full border border-line bg-panel px-2.5 py-1 text-ink-dim">
            {EVENT_NAME.toUpperCase()}
          </span>
          <span className="rounded-full border border-accent/30 bg-accent-bg px-2.5 py-1 text-accent">
            {TASK_NAME.toUpperCase()}
          </span>
        </div>

        <div className="mt-8 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <div>
            <h1 className="text-balance font-display text-4xl font-medium leading-[1.08] text-ink sm:text-5xl lg:text-[3.3rem]">
              Understanding every second of road traffic.
            </h1>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-ink-dim">
              Computer vision for traffic event detection and accident
              anticipation from a fixed road camera.
            </p>
            <p className="mt-4 max-w-lg text-[14px] leading-relaxed text-ink-faint">
              Our system analyzes road-camera footage, detects traffic events
              as precise time segments, and estimates accident risk using
              only the frames available so far.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#live-demo"
                className="group inline-flex items-center gap-2 rounded border border-accent/50 bg-accent-bg px-5 py-3 font-mono text-[12px] text-accent transition-colors hover:bg-accent/15"
              >
                Try the Live Demo
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#approach"
                className="inline-flex items-center gap-2 rounded border border-line px-5 py-3 font-mono text-[12px] text-ink-dim transition-colors hover:border-line-strong hover:text-ink"
              >
                Explore the Pipeline
              </a>
            </div>
          </div>

          <CameraFramePreview />
        </div>
      </Container>
    </section>
  );
}

function CameraFramePreview() {
  return (
    <div className="relative">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line bg-panel shadow-panel">
        {/* scene */}
        <svg
          viewBox="0 0 400 300"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <rect width="400" height="300" fill="#0B0D0B" />
          <rect y="150" width="400" height="150" fill="#101410" />
          {/* lane markings */}
          <g stroke="#2B342D" strokeWidth="2">
            <line x1="0" y1="150" x2="400" y2="150" />
            <line x1="130" y1="150" x2="90" y2="300" strokeDasharray="10 8" />
            <line x1="270" y1="150" x2="310" y2="300" strokeDasharray="10 8" />
            <line x1="200" y1="150" x2="200" y2="300" />
          </g>
          {/* buildings backdrop */}
          <g fill="#12160F" stroke="#1F2621">
            <rect x="10" y="40" width="60" height="115" />
            <rect x="90" y="20" width="45" height="135" />
            <rect x="270" y="55" width="55" height="100" />
            <rect x="335" y="30" width="55" height="125" />
          </g>
          {/* vehicle boxes */}
          <g>
            <rect
              x="150"
              y="185"
              width="46"
              height="30"
              rx="2"
              fill="none"
              stroke="#4CFF7F"
              strokeWidth="1.5"
            />
            <rect
              x="235"
              y="205"
              width="52"
              height="34"
              rx="2"
              fill="none"
              stroke="#4CFF7F"
              strokeWidth="1.5"
            />
            <rect
              x="70"
              y="235"
              width="58"
              height="38"
              rx="2"
              fill="none"
              stroke="#4DD8E8"
              strokeWidth="1.5"
            />
          </g>
          {/* pedestrian */}
          <rect
            x="308"
            y="178"
            width="14"
            height="30"
            rx="2"
            fill="none"
            stroke="#FFB74C"
            strokeWidth="1.5"
          />
          {/* trajectory line */}
          <path
            d="M 173 200 C 210 195, 240 210, 261 222"
            fill="none"
            stroke="#4CFF7F"
            strokeOpacity="0.4"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
        </svg>

        {/* scanline sweep */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
          <div className="h-1/3 w-full animate-scan bg-gradient-to-b from-transparent via-accent/25 to-transparent" />
        </div>

        {/* HUD chrome */}
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded bg-void/70 px-2 py-1 font-mono text-[10px] text-danger backdrop-blur">
          <Circle className="h-2 w-2 animate-blink fill-danger text-danger" />
          REC
        </div>
        <div className="absolute right-3 top-3 rounded bg-void/70 px-2 py-1 font-mono text-[10px] text-ink-dim backdrop-blur">
          CAM-04
        </div>
        <div className="absolute bottom-3 left-3 rounded bg-void/70 px-2 py-1 font-mono text-[10px] text-ink-faint backdrop-blur">
          PREVIEW FRAME · ILLUSTRATIVE
        </div>

        <span className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l border-t border-accent/50" />
        <span className="pointer-events-none absolute right-2 top-2 h-3 w-3 border-r border-t border-accent/50" />
        <span className="pointer-events-none absolute bottom-2 left-2 h-3 w-3 border-b border-l border-accent/50" />
        <span className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b border-r border-accent/50" />
      </div>
      <p className="mt-3 text-center font-mono text-[10px] tracking-wide text-ink-faint">
        Illustrative camera view — replace with real footage from the repository
      </p>
    </div>
  );
}
