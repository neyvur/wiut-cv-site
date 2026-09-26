import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";

export function TechnicalApproach() {
  return (
    <section className="border-b border-line bg-void py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Methodology"
          title="Technical approach"
          description="Each stage of the pipeline in detail. Sections marked with a placeholder will be filled in as the implementation is finalized."
        />

        <div className="mt-10">
          <Accordion
            items={[
              {
                title: "Problem formulation",
                content: (
                  <p>
                    Given a fixed-camera road video, Part A outputs a set of
                    time-bounded events{" "}
                    <code className="font-mono text-ink">
                      [start_sec, end_sec, label]
                    </code>{" "}
                    drawn from 14 official classes. Part B outputs, per frame,
                    the probability that an accident begins within the next
                    5 seconds.
                  </p>
                ),
              },
              {
                title: "Why temporal segmentation matters",
                content: (
                  <p>
                    The challenge evaluates event boundaries using temporal
                    IoU (intersection over union between the predicted and
                    ground-truth time spans), not just whether an event was
                    detected at all. A correct label with a poorly placed
                    start or end time still scores low — so refining
                    boundaries matters as much as classification.
                  </p>
                ),
              },
              {
                title: "Data",
                content: <p>[DATA NEEDED]</p>,
              },
              {
                title: "Preprocessing",
                content: <p>[PREPROCESSING DETAILS]</p>,
              },
              {
                title: "Detection",
                content: <p>[DETECTOR] — configuration and rationale to be added.</p>,
              },
              {
                title: "Tracking",
                content: <p>[TRACKER] — configuration and rationale to be added.</p>,
              },
              {
                title: "Temporal reasoning & event segmentation",
                content: <p>[RULES / MODEL] used to turn per-frame signals into event segments.</p>,
              },
              {
                title: "Accident anticipation",
                content: <p>[ACCIDENT MODEL] — inputs, horizon, and output calibration.</p>,
              },
              {
                title: "Post-processing",
                content: <p>[POST-PROCESSING DETAILS] — e.g. merging, smoothing, thresholding.</p>,
              },
              {
                title: "Evaluation",
                content: (
                  <p>
                    See the Evaluation section below for the official scoring
                    formula and weighting between Part A and Part B.
                  </p>
                ),
              },
            ]}
          />
        </div>
      </Container>
    </section>
  );
}
