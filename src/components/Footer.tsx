import { Container } from "@/components/ui/Container";
import { EVENT_NAME, LINKS, PROJECT_NAME, TEAM_NAME } from "@/config/site";

export function Footer() {
  return (
    <footer className="bg-void py-12">
      <Container>
        <div className="flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-mono text-[11px] tracking-wide text-ink-dim">
              {EVENT_NAME.toUpperCase()}
            </p>
            <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-ink-faint">
              {PROJECT_NAME}
            </p>
            <p className="mt-3 font-mono text-[12px] text-ink-dim">{TEAM_NAME}</p>
          </div>

          <div className="flex gap-8 font-mono text-[12px] text-ink-dim">
            <a
              href={LINKS.github.startsWith("[") ? undefined : LINKS.github}
              className="transition-colors hover:text-ink"
            >
              GitHub
            </a>
            <a href="#home" className="transition-colors hover:text-ink">
              Website
            </a>
            <a href="#team" className="transition-colors hover:text-ink">
              Team
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
