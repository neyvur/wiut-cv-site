import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#08090A",
        panel: "#0F1210",
        "panel-raised": "#151A15",
        line: "#1F2621",
        "line-strong": "#2B342D",
        ink: "#E7ECE8",
        "ink-dim": "#8B948D",
        "ink-faint": "#57605A",
        accent: {
          DEFAULT: "#4CFF7F",
          soft: "#1F7A45",
          bg: "rgba(76,255,127,0.08)",
        },
        cyan: {
          DEFAULT: "#4DD8E8",
          bg: "rgba(77,216,232,0.08)",
        },
        violet: {
          DEFAULT: "#B18CF7",
          bg: "rgba(177,140,247,0.08)",
        },
        danger: {
          DEFAULT: "#FF5D5D",
          bg: "rgba(255,93,93,0.08)",
        },
        amber: {
          DEFAULT: "#FFB74C",
          bg: "rgba(255,183,76,0.08)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Segoe UI", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "Segoe UI", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      backgroundImage: {
        "grid-fine":
          "linear-gradient(to right, rgba(231,236,232,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(231,236,232,0.035) 1px, transparent 1px)",
        "fade-bottom":
          "linear-gradient(to bottom, transparent 0%, #08090A 100%)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
      boxShadow: {
        panel: "0 0 0 1px rgba(255,255,255,0.03), 0 20px 60px -20px rgba(0,0,0,0.6)",
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.25" },
        },
        "flow-dash": {
          to: { strokeDashoffset: "-24" },
        },
      },
      animation: {
        scan: "scan 3.5s linear infinite",
        blink: "blink 1.6s ease-in-out infinite",
        "flow-dash": "flow-dash 1.2s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
