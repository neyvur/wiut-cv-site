import type { EventLabel, TeamMember } from "@/lib/types";

/**
 * SINGLE SOURCE OF TRUTH
 * ----------------------
 * Every value below that is wrapped in [BRACKETS] is a placeholder.
 * Replace it with real information as it becomes available — nothing
 * on the site invents facts, results, or team details on its own.
 *
 * This is the only file most last-minute edits should need to touch.
 */

export const EVENT_NAME = "WIUT Hackathon 2026";
export const TASK_NAME = "Computer Vision · Elimination Task";
export const PROJECT_NAME =
  "Toyota Traffic Event Detection and Accident Anticipation from a Fixed Road Camera";

export const TEAM_NAME = "GAMA Core";

export const LINKS = {
  github: "https://github.com/neyvur/traffic-video-analysis",
  website: "https://wiut-cv-site-mnyjxya8d-gama-core.vercel.app",
  demoApi: "https://traffic-video-analysis-production.up.railway.app",
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Abdukhalilov Abdulkhamid",
    role: "Lead / Backend",
    bio: "Team lead and primary author of the solution. Built the complete end-to-end pipeline — YOLO detection, ByteTrack tracking, rule-based event engine, traffic-light HSV analysis, risk estimation, FastAPI backend and cloud deployment.",
    github: "https://github.com/neyvur",
    linkedin: "https://www.linkedin.com/in/abdulkhamid-abdukhalilov-033b65334?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    contributions: ["End-to-end pipeline: detection → tracking → rules → events",
      "Rules engine, events detector, risk estimator",
      "FastAPI backend + Docker + Railway deployment",
      "Frontend integration & Live Demo",],
  },
  {
    name: "Asqarov Mumin",
    role: "System Architect · Planner",
    bio: "Designed the overall system skeleton and project plan. Defined the module structure, data flow between components, and the interface between the detection pipeline and the event logic. Wrote the initial scaffolding that the team built upon.",
    github: "https://github.com/MuminAskarov",
    linkedin: "[LINKEDIN]",
    contributions: ["System architecture and module boundaries",
      "Initial project skeleton and interfaces",
      "Task breakdown and technical roadmap",],
  },
  {
    name: "Gulzora Shokirjonova",
    role: "Researcher · Data & Evaluation",
    bio: "Conducted research on traffic-event detection approaches, reference models and evaluation metrics. Prepared zone annotations, curated the sample videos, and defined the temporal-IoU evaluation protocol used to measure the system.",
    github: "https://github.com/shokirjonovagulzora11",
    linkedin: "[LINKEDIN]",
    contributions: ["Research on detection & tracking approaches",
      "Zone annotation and video curation",
      "Evaluation protocol (temporal IoU)",
      "EDA and result analysis",],
  },
];

export const TECH_STACK = {
  detector: "YOLOv8n (COCO)",
  tracker: "ByteTrack",
  accidentModel: "Rule-based (IoU + velocity + trajectory)",
  backend: "FastAPI · Docker · Railway",
  frontend: "Next.js · React · TypeScript · Tailwind CSS",
  database: "—",
  languages: ["Python", "TypeScript"],
  libraries: ["OpenCV", "PyTorch", "Ultralytics", "FastAPI", "NumPy"],
};

export const DATASETS_NOTE =
  "Two fixed-CCTV sample videos (60 s, 1280×720, 30 fps) were annotated manually " +
  "for evaluation. YOLOv8n was used as a pretrained COCO detector — no custom " +
  "training was required. Camera-specific zones (stop lines, crosswalks, solid " +
  "lines, traffic lights) were annotated once per camera in zones.json.";

/** Official event classes and their task definitions — do not reword. */
export const EVENT_CLASSES: {
  id: EventLabel;
  label: string;
  description: string;
  tier: "critical" | "hazard" | "violation" | "behavior";
}[] = [
  {
    id: "accident",
    label: "Accident",
    description:
      "Collision between two or more road users, or a road user and a fixed object.",
    tier: "critical",
  },
  {
    id: "fire_smoke",
    label: "Fire / Smoke",
    description: "Visible fire or smoke present in the road scene.",
    tier: "critical",
  },
  {
    id: "near_miss",
    label: "Near Miss",
    description:
      "Sharp braking or swerving to avoid a collision without contact.",
    tier: "hazard",
  },
  {
    id: "wrong_way",
    label: "Wrong Way",
    description: "A vehicle traveling against the designated flow of traffic.",
    tier: "hazard",
  },
  {
    id: "failure_to_yield",
    label: "Failure to Yield",
    description:
      "A road user proceeds without yielding the right of way as required.",
    tier: "hazard",
  },
  {
    id: "road_obstacle",
    label: "Road Obstacle",
    description: "An object or hazard obstructing the roadway.",
    tier: "hazard",
  },
  {
    id: "red_light",
    label: "Red Light",
    description: "A vehicle enters an intersection against a red signal.",
    tier: "violation",
  },
  {
    id: "illegal_u_turn",
    label: "Illegal U-Turn",
    description: "A U-turn performed where it is not permitted.",
    tier: "violation",
  },
  {
    id: "illegal_turn",
    label: "Illegal Turn",
    description: "A turning maneuver performed where it is not permitted.",
    tier: "violation",
  },
  {
    id: "solid_line_crossing",
    label: "Solid Line Crossing",
    description: "A vehicle crosses a solid lane-marking line.",
    tier: "violation",
  },
  {
    id: "stop_line",
    label: "Stop Line Violation",
    description: "A vehicle fails to stop at a marked stop line.",
    tier: "violation",
  },
  {
    id: "jaywalking",
    label: "Jaywalking",
    description:
      "A pedestrian crosses the road outside a designated crossing.",
    tier: "behavior",
  },
  {
    id: "stopped_vehicle",
    label: "Stopped Vehicle",
    description: "A vehicle stationary in a live traffic lane.",
    tier: "behavior",
  },
  {
    id: "congestion",
    label: "Congestion",
    description: "Dense, slow-moving, or stopped traffic across the scene.",
    tier: "behavior",
  },
];

export const TIER_META: Record<
  "critical" | "hazard" | "violation" | "behavior",
  { label: string; color: string; bg: string; dot: string }
> = {
  critical: {
    label: "Critical",
    color: "text-danger",
    bg: "bg-danger-bg",
    dot: "bg-danger",
  },
  hazard: {
    label: "Hazard",
    color: "text-amber",
    bg: "bg-amber-bg",
    dot: "bg-amber",
  },
  violation: {
    label: "Rule violation",
    color: "text-cyan",
    bg: "bg-cyan-bg",
    dot: "bg-cyan",
  },
  behavior: {
    label: "Behavior",
    color: "text-accent",
    bg: "bg-accent-bg",
    dot: "bg-accent",
  },
};

export const PIPELINE_A = [
  { step: "Video", detail: "Fixed road-camera .mp4 input" },
  {
    step: "Frame Sampling",
    detail: "Every frame processed at native FPS (30 fps)",
  },
  { step: "Object Detection", detail: "YOLOv8n · COCO (cars, buses, persons, lights)" },
  { step: "Object Tracking", detail: "ByteTrack · stable IDs across frames" },
  {
    step: "Trajectory Analysis",
    detail: "Per-track positions, velocity, heading, stop / motion state",
  },
  {
    step: "Event Detection",
    detail: "Rule-based engine + zone geometry (stop lines, crosswalks)",
  },
  {
    step: "Temporal Segmentation",
    detail: "Start/end boundary refinement, merge overlapping intervals",
  },
  { step: "Results", detail: "[start_sec, end_sec, label] per event" },
];

export const PIPELINE_B = [
  { step: "Frame", detail: "Current observed frame" },
  { step: "Track History", detail: "Recent object trajectories" },
  {
    step: "Motion / Risk Signals",
    detail: "Vehicle proximity, relative velocity, congestion density",
  },
  { step: "Accident Risk", detail: "Probability score, 0–1" },
  {
    step: "5-Second Horizon",
    detail: "Forward-looking risk estimate (no future frames used)",
  },
];

export const EVALUATION = {
  weightA: 0.7,  // Event detection
  weightB: 0.3,  // Accident anticipation
  elimination: { model: 0.6, website: 0.25, code: 0.15 },
};

export const REPORT_SECTIONS = [
  "Problem",
  "Approach",
  "Data",
  "Architecture",
  "Experiments",
  "Results",
  "Failure Cases",
  "Limitations",
  "Future Work",
];


export const REPO_STRUCTURE = [
  "solution.py             # detect_events() entry point",
  "run_submission.py       # CLI wrapper",
  "evaluate.py             # temporal-IoU evaluation",
  "annotate_zones.py       # interactive zone annotation",
  "visualize.py            # annotated video output",
  "requirements.txt        # dependencies",
  "weights/model.pt        # YOLOv8n",
  "zones.json              # camera-specific zones",
  "src/                    # detector, tracker, rules, events, risk",
  "api/                    # FastAPI backend",
  "notebooks/EDA.ipynb     # exploratory data analysis",
  "predictions_samples.json",
  "README.md",
];

/** Number of sample videos to render placeholder analysis cards for. */
export const SAMPLE_VIDEO_COUNT = 3;


export const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Live Demo", href: "#live-demo" },
  { label: "Approach", href: "#approach" },
  { label: "EDA", href: "#eda" },
  { label: "Results", href: "#results" },
  { label: "Team", href: "#team" },
];
