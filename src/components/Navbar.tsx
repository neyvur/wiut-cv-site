"use client";

import { useEffect, useState } from "react";
import { Menu, X, Radar } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { NAV_ITEMS, TEAM_NAME } from "@/config/site";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled
          ? "border-line bg-void/85 backdrop-blur"
          : "border-transparent bg-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between">
        <a href="#home" className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded border border-accent/30 bg-accent-bg text-accent">
            <Radar className="h-4 w-4" strokeWidth={1.75} />
          </span>
          <span className="hidden font-mono text-[12px] tracking-wide text-ink-dim sm:inline">
            {TEAM_NAME}
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] text-ink-dim transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#live-demo"
            className="inline-flex items-center rounded border border-accent/40 bg-accent-bg px-4 py-2 font-mono text-[12px] text-accent transition-colors hover:bg-accent/15"
          >
            Try Demo
          </a>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded border border-line text-ink md:hidden"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-line bg-void md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded px-2 py-3 text-[15px] text-ink-dim hover:bg-panel hover:text-ink"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#live-demo"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded border border-accent/40 bg-accent-bg px-4 py-3 font-mono text-[12px] text-accent"
            >
              Try Demo
            </a>
          </Container>
        </div>
      )}
    </header>
  );
}
