import { Github, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Panel } from "@/components/ui/Panel";
import { LINKS, REPO_STRUCTURE } from "@/config/site";

export function GithubSection() {
  return (
    <section className="border-b border-line bg-void py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Reproducibility"
          title="Repository"
          description="The public repository contains the full, reproducible submission package — code, weights, and evaluation script."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.2fr]">
          <Panel corners className="flex flex-col justify-between gap-6">
            <div>
              <Github className="h-5 w-5 text-ink-dim" strokeWidth={1.5} />
              <p className="mt-3 text-[13px] leading-relaxed text-ink-dim">
                Includes <code className="font-mono text-ink">solution.py</code>,
                the submission runner, evaluation script, and pinned dependencies
                so results can be reproduced end to end.
              </p>
            </div>
            <a
              href={LINKS.github.startsWith("[") ? undefined : LINKS.github}
              className="inline-flex w-fit items-center gap-1.5 rounded border border-line px-4 py-2 font-mono text-[12px] text-ink-dim transition-colors hover:border-line-strong hover:text-ink"
            >
              {LINKS.github}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </Panel>

          <Panel className="font-mono text-[13px] text-ink-dim">
            {REPO_STRUCTURE.map((entry) => (
              <div key={entry} className="border-b border-line/60 py-2 last:border-0">
                <span className={entry.endsWith("/") ? "text-accent" : "text-ink"}>
                  {entry}
                </span>
              </div>
            ))}
          </Panel>
        </div>
      </Container>
    </section>
  );
}
