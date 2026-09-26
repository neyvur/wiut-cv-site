import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Panel } from "@/components/ui/Panel";
import { REPORT_SECTIONS } from "@/config/site";

const PLACEHOLDER_BY_SECTION: Record<string, string> = {
  Problem:
    "Detect 14 classes of traffic events from a fixed road-camera video and estimate " +
    "the probability of an accident in the next 5 seconds — using only frames already " +
    "observed, with no future leakage.",
  Approach:
    "A modular pipeline: YOLOv8n for object detection (COCO), ByteTrack for multi-object " +
    "tracking, a rule-based engine with camera-specific zones (stop lines, crosswalks, " +
    "solid lines), HSV analysis for traffic-light state, and a behavioral risk estimator " +
    "driven by vehicle proximity and congestion density.",
  Data:
    "Two 60-second fixed-CCTV sample clips (1280×720, 30 fps). Camera-specific zones were " +
    "annotated once in zones.json. YOLOv8n was used as-is with pretrained COCO weights — " +
    "no custom training was required.",
  Architecture:
    "Video → YOLOv8n detection → ByteTrack tracking → trajectory store → Rules Engine + " +
    "Events Detector → temporal interval merging → [start_sec, end_sec, label]. In " +
    "parallel, the Risk Estimator emits a 0–1 score per frame for the next-5-second " +
    "accident probability. The pipeline is exposed via a FastAPI backend and consumed by " +
    "a Next.js frontend.",
  Experiments:
    "Both sample clips were run through the full pipeline. Rule thresholds were tuned on " +
    "the observed data — IoU for accident contact, relative velocity and center distance " +
    "for near-miss, dwell time for stopped vehicles, vehicle count and mean speed for " +
    "congestion, and polygon intersection for zone-based events.",
  Results:
    "On the 60-second sample: congestion, near-miss, accident (IoU-based), stop-line " +
    "violations and solid-line crossings were detected with reasonable temporal " +
    "boundaries. Annotated video output is provided for visual verification. Temporal " +
    "IoU is used as the evaluation metric.",
  "Failure Cases":
    "Small or distant objects are occasionally missed by YOLOv8n. Fire/smoke is not " +
    "detected because the pretrained COCO model has no such classes. Jaywalking " +
    "detection is sensitive to the accuracy of the crosswalk polygon. Traffic-light " +
    "state depends on a single manually placed bbox.",
  Limitations:
    "Camera zones must be re-annotated for each new camera. The public Live Demo is " +
    "limited to short clips due to backend request timeouts. Wrong-way detection uses " +
    "trajectory reversal only — lane-level geometry is not yet modeled.",
  "Future Work":
    "Train a custom fire/smoke detector. Replace rule-based accident detection with a " +
    "learned predictor. Add per-lane wrong-way detection using lane geometry. Introduce " +
    "an async job queue for longer videos. Support multi-camera configurations.",
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
