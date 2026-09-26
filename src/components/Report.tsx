import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Panel } from "@/components/ui/Panel";
import { REPORT_SECTIONS } from "@/config/site";

const PLACEHOLDER_BY_SECTION: Record<string, string> = {
  Problem: "[PROBLEM STATEMENT]",
  Approach: "[APPROACH SUMMARY]",
  Data: "[DATA DESCRIPTION]",
  Architecture: "[ARCHITECTURE DESCRIPTION]",
  Experiments: "[EXPERIMENTS RUN]",
  Results: "[RESULTS — only once real evaluation numbers exist]",
  "Failure Cases": "[HONEST FAILURE CASES — what the model gets wrong]",
  Limitations: "[KNOWN LIMITATIONS]",
  "Future Work": "[WHAT WE WOULD DO NEXT]",
};

export function Report() {
  return (
    <section className="border-b border-line bg-void py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Submission requirement"
          title="Technical report"
          description="This section satisfies the short technical report required by the submission — a single, honest account of what was tried, what worked, and what didn't."
        />

        <ol className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {REPORT_SECTIONS.map((section, idx) => (
            <Panel key={section} className="flex gap-4">
              <span className="font-mono text-[12px] text-ink-faint">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="font-display text-[14px] font-medium text-ink">
                  {section}
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-ink-dim">
                  {PLACEHOLDER_BY_SECTION[section]}
                </p>
              </div>
            </Panel>
          ))}
        </ol>
      </Container>
    </section>
  );
}
