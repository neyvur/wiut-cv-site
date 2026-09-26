"use client";

import { useEffect, useState } from "react";
import { Film } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Panel } from "@/components/ui/Panel";
import { EmptyState } from "@/components/ui/EmptyState";
import { EventTimeline } from "@/components/live-demo/EventTimeline";
import { EventList } from "@/components/live-demo/EventList";
import { getSampleResults } from "@/lib/api";
import type { SampleVideoResult } from "@/lib/types";

export function SampleVideos() {
  const [samples, setSamples] = useState<SampleVideoResult[] | null>(null);

  useEffect(() => {
    getSampleResults().then(setSamples).catch(() => setSamples([]));
  }, []);

  return (
    <section id="results" className="border-b border-line bg-void py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Provided clips"
          title="Sample video analysis"
          description="One card per sample video supplied for the task. Add real clips and predictions in lib/api.ts::getSampleResults() — every card below updates automatically."
        />

        <div className="mt-10 flex flex-col gap-6">
          {(samples ?? Array.from({ length: 3 })).map((sample, idx) => (
            <SampleCard key={sample && "id" in sample ? sample.id : idx} sample={sample as SampleVideoResult | undefined} index={idx} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function SampleCard({
  sample,
  index,
}: {
  sample?: SampleVideoResult;
  index: number;
}) {
  const title = sample?.title ?? `Sample 0${index + 1}`;

  return (
    <Panel corners padded={false} className="overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">
        <h3 className="font-display text-[15px] font-medium text-ink">{title}</h3>
        <div className="flex flex-wrap gap-4 font-mono text-[11px] text-ink-faint">
          <span>DUR {sample?.duration ?? "[DURATION]"}</span>
          <span>RES {sample?.resolution ?? "[RESOLUTION]"}</span>
          <span>FPS {sample?.fps ?? "[FPS]"}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-px bg-line lg:grid-cols-[1.3fr_1fr]">
        <div className="bg-panel p-5 sm:p-6">
          {sample?.videoUrl ? (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video
              src={sample.videoUrl}
              controls
              className="aspect-video w-full rounded-md border border-line bg-black"
            />
          ) : (
            <EmptyState
              icon={Film}
              title="[VIDEO NOT YET PROVIDED]"
              description="Drop the sample clip into /public and link it in getSampleResults()."
              className="aspect-video"
            />
          )}

          <div className="mt-4">
            <p className="mb-2 font-mono text-[11px] text-ink-faint">
              EVENT TIMELINE
            </p>
            <EventTimeline
              events={sample?.events ?? []}
              duration={90}
            />
          </div>
        </div>

        <div className="bg-panel p-5 sm:p-6">
          <p className="mb-1 font-mono text-[11px] text-ink-faint">
            DETECTED EVENTS
          </p>
          <EventList events={sample?.events ?? []} />
        </div>
      </div>
    </Panel>
  );
}
