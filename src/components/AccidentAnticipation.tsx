import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Panel } from "@/components/ui/Panel";
import { Pill } from "@/components/ui/Pill";

export function AccidentAnticipation() {
  return (
    <section className="border-b border-line bg-void py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Part B"
          title="Accident anticipation"
          description="The system estimates whether an accident is likely to begin within the next 5 seconds, using only frames observed so far — never information from the future."
        />

        <Panel corners className="mt-10 overflow-hidden" padded={false}>
          <div className="p-6 sm:p-8">
            <div className="relative flex items-center justify-between">
              <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-line-strong" />

              <TimelineNode label="Past" sub="Observed frames" tone="default" />
              <TimelineNode label="Current" sub="Latest frame" tone="accent" pulse />
              <TimelineNode label="Future (+5s)" sub="Risk horizon" tone="cyan" dashed />
            </div>

            <div className="mt-10 flex flex-col items-center gap-2 text-center">
              <span className="font-mono text-[11px] text-cyan">↑ RISK ESTIMATE</span>
              <p className="max-w-md text-[13px] leading-relaxed text-ink-dim">
                At every point in the clip, the model looks backward at recent
                object tracks and motion, then outputs a single forward-looking
                probability for the next five seconds.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-line bg-panel-raised px-6 py-4 sm:px-8">
            <Pill tone="default" dot>
              Observed data
            </Pill>
            <Pill tone="cyan" dot>
              Predicted risk
            </Pill>
            <span className="font-mono text-[11px] text-ink-faint">
              The two are always shown separately — the system never presents a
              prediction as a confirmed event.
            </span>
          </div>
        </Panel>
      </Container>
    </section>
  );
}

function TimelineNode({
  label,
  sub,
  tone,
  pulse,
  dashed,
}: {
  label: string;
  sub: string;
  tone: "default" | "accent" | "cyan";
  pulse?: boolean;
  dashed?: boolean;
}) {
  const dot =
    tone === "accent" ? "bg-accent" : tone === "cyan" ? "bg-cyan" : "bg-ink-dim";
  const ring = tone === "accent" ? "ring-accent/30" : tone === "cyan" ? "ring-cyan/30" : "ring-line";

  return (
    <div className="relative z-10 flex flex-col items-center gap-2">
      <span
        className={`h-3 w-3 rounded-full ${dot} ring-4 ${ring} ${pulse ? "animate-pulse" : ""} ${
          dashed ? "opacity-70" : ""
        }`}
      />
      <div className="text-center">
        <p className="font-display text-[13px] font-medium text-ink">{label}</p>
        <p className="font-mono text-[10px] text-ink-faint">{sub}</p>
      </div>
    </div>
  );
}
