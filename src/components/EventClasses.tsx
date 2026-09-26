import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Panel } from "@/components/ui/Panel";
import { EVENT_CLASSES, TIER_META } from "@/config/site";

export function EventClasses() {
  return (
    <section className="border-b border-line bg-void py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Taxonomy · 14 classes"
          title="What the system is trained to recognize"
          description="Every detected segment is labeled with one of the following official event classes, grouped here by severity."
        />

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {EVENT_CLASSES.map((cls) => {
            const tier = TIER_META[cls.tier];
            return (
              <Panel key={cls.id} className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-[15px] font-medium text-ink">
                    {cls.label}
                  </h3>
                  <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${tier.dot}`} />
                </div>
                <p className="text-[13px] leading-relaxed text-ink-dim">
                  {cls.description}
                </p>
                <div className="mt-1 flex items-center justify-between font-mono text-[10px] text-ink-faint">
                  <span>{cls.id}</span>
                  <span className={tier.color}>{tier.label}</span>
                </div>
              </Panel>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
