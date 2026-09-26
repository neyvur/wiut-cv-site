import { Activity, Car, Flame, Route, PieChart, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Panel } from "@/components/ui/Panel";
import { EmptyState } from "@/components/ui/EmptyState";

const METADATA_CARDS = [
  { label: "Resolution", value: "[VIDEO RESOLUTION]" },
  { label: "Frame rate", value: "[FPS]" },
  { label: "Duration", value: "[DURATION]" },
  { label: "Lighting conditions", value: "[LIGHTING CONDITIONS]" },
  { label: "Traffic density", value: "[TRAFFIC DENSITY]" },
  { label: "Vehicles observed", value: "[NUMBER OF VEHICLES]" },
];

const CHART_PANELS = [
  {
    icon: Activity,
    title: "Traffic density over time",
    description: "Populated once sample-video frames are processed.",
  },
  {
    icon: Car,
    title: "Vehicle count over time",
    description: "Per-frame or per-interval vehicle counts.",
  },
  {
    icon: PieChart,
    title: "Object class distribution",
    description: "Share of vehicles, pedestrians, and other tracked classes.",
  },
  {
    icon: Flame,
    title: "Motion heatmap",
    description: "Spatial density of movement across the frame.",
  },
  {
    icon: Route,
    title: "Trajectory visualization",
    description: "Aggregated vehicle and pedestrian paths.",
  },
  {
    icon: Clock,
    title: "Event distribution",
    description: "Counts per event class across all sample videos.",
  },
];

export function EDA() {
  return (
    <section id="eda" className="border-b border-line bg-void py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Exploratory data analysis"
          title="Reading the sample footage before modeling"
          description="Metadata and visual analysis of the provided sample videos. Every value below is filled in from the actual clips — nothing here is estimated."
        />

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {METADATA_CARDS.map((card) => (
            <Panel key={card.label} className="text-center">
              <p className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">
                {card.label}
              </p>
              <p className="mt-2 font-mono text-[13px] text-ink">{card.value}</p>
            </Panel>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CHART_PANELS.map((panel) => (
            <Panel key={panel.title} padded={false} className="overflow-hidden">
              <div className="border-b border-line px-5 py-3">
                <p className="font-display text-[13px] font-medium text-ink">
                  {panel.title}
                </p>
              </div>
              <EmptyState
                icon={panel.icon}
                title="[DATA NEEDED]"
                description={panel.description}
                className="border-0"
              />
            </Panel>
          ))}
        </div>
      </Container>
    </section>
  );
}
