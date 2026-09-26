import { Github, Linkedin, Link as LinkIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Panel } from "@/components/ui/Panel";
import { TEAM_MEMBERS } from "@/config/site";

export function Team() {
  return (
    <section id="team" className="border-b border-line bg-void py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Who built this"
          title="Team"
          description="Three engineers, one submission — contributions listed individually below."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM_MEMBERS.map((member) => (
            <Panel key={member.name} corners className="flex flex-col gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-panel-raised font-mono text-[13px] text-ink-dim">
                {initials(member.name)}
              </div>

              <div>
                <p className="font-display text-[15px] font-medium text-ink">
                  {member.name}
                </p>
                <p className="font-mono text-[11px] text-accent">{member.role}</p>
              </div>

              <p className="text-[13px] leading-relaxed text-ink-dim">
                {member.bio}
              </p>

              <div>
                <p className="mb-1.5 font-mono text-[10px] text-ink-faint">
                  CONTRIBUTIONS
                </p>
                <ul className="space-y-1 text-[13px] text-ink-dim">
                  {member.contributions.map((c) => (
                    <li key={c} className="flex gap-2">
                      <span className="text-accent">–</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto flex gap-2 pt-2">
                {member.github && (
                  <IconLink href={member.github} icon={Github} label="GitHub" />
                )}
                {member.linkedin && (
                  <IconLink href={member.linkedin} icon={Linkedin} label="LinkedIn" />
                )}
                {member.portfolio && (
                  <IconLink href={member.portfolio} icon={LinkIcon} label="Portfolio" />
                )}
              </div>
            </Panel>
          ))}
        </div>
      </Container>
    </section>
  );
}

function initials(name: string): string {
  const clean = name.replace(/[[\]]/g, "");
  const parts = clean.split(" ").filter(Boolean);
  if (parts.length === 0 || clean.startsWith("MEMBER")) return "?";
  return parts.map((p) => p[0]).join("").slice(0, 2).toUpperCase();
}

function IconLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: typeof Github;
  label: string;
}) {
  const valid = !href.startsWith("[");
  return (
    <a
      href={valid ? href : undefined}
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded border border-line text-ink-faint transition-colors hover:border-line-strong hover:text-ink"
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
    </a>
  );
}
