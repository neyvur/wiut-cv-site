import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Panel } from "@/components/ui/Panel";
import { EVALUATION } from "@/config/site";

export function Evaluation() {
  return (
    <section className="border-b border-line bg-void py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Scoring"
          title="How the submission is evaluated"
          description="The elimination score combines model performance with the website and code deliverables."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Panel corners>
            <p className="font-mono text-[11px] text-ink-faint">MODEL SCORE</p>
            <p className="mt-3 font-mono text-lg text-ink">
              M = {EVALUATION.weightA} × Score_A + {EVALUATION.weightB} × Score_B
            </p>
            <ul className="mt-4 space-y-1.5 text-[13px] text-ink-dim">
              <li>
                <span className="text-accent">Score_A</span> — Part A, event
                detection ({Math.round(EVALUATION.weightA * 100)}% of M)
              </li>
              <li>
                <span className="text-cyan">Score_B</span> — Part B, accident
                anticipation ({Math.round(EVALUATION.weightB * 100)}% of M)
              </li>
            </ul>
          </Panel>

          <Panel corners>
            <p className="font-mono text-[11px] text-ink-faint">ELIMINATION SCORE</p>
            <p className="mt-3 font-mono text-lg text-ink">
              E = {EVALUATION.elimination.model} × M + {EVALUATION.elimination.website} × Website + {EVALUATION.elimination.code} × Code
            </p>
            <ul className="mt-4 space-y-1.5 text-[13px] text-ink-dim">
              <li>Model performance — {Math.round(EVALUATION.elimination.model * 100)}%</li>
              <li>This website — {Math.round(EVALUATION.elimination.website * 100)}%</li>
              <li>Code quality — {Math.round(EVALUATION.elimination.code * 100)}%</li>
            </ul>
          </Panel>
        </div>

        <Panel className="mt-4">
          <p className="font-mono text-[11px] text-ink-faint">TEMPORAL IoU</p>
          <p className="mt-2 text-[13px] leading-relaxed text-ink-dim">
            Each predicted event is compared against the matching ground-truth
            span by intersection over union along the time axis — the overlap
            between predicted and actual duration, divided by their union.
            Detecting the right label is not enough on its own; the predicted
            start and end times need to line up closely with what actually
            happened.
          </p>
        </Panel>
      </Container>
    </section>
  );
}
