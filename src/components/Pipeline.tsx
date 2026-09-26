import { ArrowDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Panel } from "@/components/ui/Panel";
import { PIPELINE_A, PIPELINE_B } from "@/config/site";

function PipelineColumn({
  title,
  steps,
  accent = "accent",
}: {
  title: string;
  steps: { step: string; detail: string }[];
  accent?: "accent" | "cyan";
}) {
  const line = accent === "accent" ? "border-accent/30" : "border-cyan/30";
  const dot = accent === "accent" ? "bg-accent" : "bg-cyan";

  return (
    <div>
      <p className="mb-5 font-mono text-[11px] tracking-wide text-ink-dim">
        {title}
      </p>
      <div className="flex flex-col">
        {steps.map((s, i) => (
          <div key={s.step} className="flex flex-col items-stretch">
            <Panel padded className="flex items-center justify-between gap-4 py-4">
              <div className="flex items-center gap-3">
                <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
                <span className="font-display text-[14px] font-medium text-ink">
                  {s.step}
                </span>
              </div>
              <span className="font-mono text-[11px] text-ink-faint">
                {s.detail}
              </span>
            </Panel>
            {i < steps.length - 1 && (
              <div className={`ml-[calc(1rem+2px)] h-6 border-l ${line}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Pipeline() {
  return (
    <section id="approach" className="border-b border-line bg-void py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="System architecture"
          title="How the system works"
          description="Two coordinated stages share the same visual backbone: one segments discrete traffic events, the other continuously estimates near-term accident risk."
        />

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
          <PipelineColumn title="PART A — EVENT DETECTION" steps={PIPELINE_A} accent="accent" />
          <PipelineColumn
            title="PART B — ACCIDENT ANTICIPATION"
            steps={PIPELINE_B}
            accent="cyan"
          />
        </div>

        <p className="mt-10 flex items-center gap-2 text-[13px] text-ink-faint">
          <ArrowDown className="h-3.5 w-3.5" />
          Detector, tracker, and model names are placeholders until finalized —
          see the Tech Stack section.
        </p>
      </Container>
    </section>
  );
}
