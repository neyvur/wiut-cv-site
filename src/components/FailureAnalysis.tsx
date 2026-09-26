import { AlertOctagon, Eye, EyeOff, MoveDiagonal, SunDim, Timer } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Panel } from "@/components/ui/Panel";
import { EmptyState } from "@/components/ui/EmptyState";

const FAILURE_MODES = [
  { icon: AlertOctagon, title: "False positives", note: "Events flagged that did not occur." },
  { icon: EyeOff, title: "Missed events", note: "Real events the system failed to flag." },
  { icon: MoveDiagonal, title: "Inaccurate boundaries", note: "Right label, wrong start/end time." },
  { icon: Eye, title: "Occlusions", note: "Objects blocked from camera view." },
  { icon: SunDim, title: "Difficult lighting", note: "Glare, night footage, harsh shadows." },
  { icon: Timer, title: "Ambiguous behavior", note: "Edge cases hard to label even by hand." },
];

export function FailureAnalysis() {
  return (
    <section className="border-b border-line bg-void py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Honest evaluation"
          title="What the model gets wrong"
          description="A running log of failure cases, organized by cause. Populated with real clips and predictions as testing progresses."
        />

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FAILURE_MODES.map((mode) => (
            <Panel key={mode.title} padded={false} className="overflow-hidden">
              <div className="flex items-center gap-2 border-b border-line px-5 py-3">
                <mode.icon className="h-3.5 w-3.5 text-ink-faint" strokeWidth={1.5} />
                <p className="font-display text-[13px] font-medium text-ink">
                  {mode.title}
                </p>
              </div>
              <EmptyState icon={mode.icon} title="[EXAMPLE NEEDED]" description={mode.note} className="border-0" />
            </Panel>
          ))}
        </div>
      </Container>
    </section>
  );
}
