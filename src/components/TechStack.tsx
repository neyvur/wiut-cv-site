import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Panel } from "@/components/ui/Panel";
import { TECH_STACK } from "@/config/site";

const ROWS: { label: string; value: string | string[] }[] = [
  { label: "Detector", value: TECH_STACK.detector },
  { label: "Tracker", value: TECH_STACK.tracker },
  { label: "Accident model", value: TECH_STACK.accidentModel },
  { label: "Backend", value: TECH_STACK.backend },
  { label: "Frontend", value: TECH_STACK.frontend },
  { label: "Database", value: TECH_STACK.database },
  { label: "Languages", value: TECH_STACK.languages },
  { label: "Libraries", value: TECH_STACK.libraries },
];

export function TechStack() {
  return (
    <section className="border-b border-line bg-void py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Under the hood"
          title="Tech stack"
          description="Only technologies we actually use — updated as components are finalized."
        />

        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2">
          {ROWS.map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-4 bg-panel px-5 py-4">
              <span className="font-mono text-[11px] text-ink-faint">{row.label}</span>
              <span className="text-right font-mono text-[12px] text-ink">
                {Array.isArray(row.value) ? row.value.join(" · ") : row.value}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-4 text-[12px] text-ink-faint">
          <Panel padded className="inline-block">
            Placeholders in brackets are replaced once the corresponding
            component is chosen — see{" "}
            <code className="font-mono text-ink">src/config/site.ts</code>.
          </Panel>
        </p>
      </Container>
    </section>
  );
}
