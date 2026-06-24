import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";

export const Route = createFileRoute("/canvas")({
  head: () => ({
    meta: [
      { title: "Sticky Canvas — Slide Storytelling" },
      { name: "description", content: "Full-screen sticky canvas where entire screens replace each other vertically on scroll." },
    ],
  }),
  component: CanvasPage,
});

const SCREENS: { bg: string; fg: string; title: string; sub: string }[] = [
  { bg: "#0F172A", fg: "#F8FAFC", title: "Screen One", sub: "Scroll down to advance" },
  { bg: "#F4845F", fg: "#1F1A16", title: "Screen Two", sub: "Slides up as one block" },
  { bg: "#10B981", fg: "#06231A", title: "Screen Three", sub: "No parallax, no fade" },
  { bg: "#1F1A16", fg: "#FFD6C2", title: "Screen Four", sub: "Just smooth translateY" },
];

function CanvasPage() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0..(N-1)

  useEffect(() => {
    const onScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? (scrolled / total) * (SCREENS.length - 1) : 0;
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Snap each screen to one full viewport of scroll
  const wrapperHeight = `${SCREENS.length * 100}vh`;

  return (
    <div ref={wrapperRef} style={{ height: wrapperHeight }} className="relative w-full">
      <div
        className="sticky top-0 w-screen h-screen overflow-hidden"
        style={{ background: "#000" }}
      >
        {SCREENS.map((s, i) => {
          // Each screen sits at offset (i - progress) * 100vh
          const offset = (i - progress) * 100;
          return (
            <Screen
              key={i}
              style={{
                transform: `translate3d(0, ${offset}vh, 0)`,
                transition: "transform 0.6s cubic-bezier(0.7, 0, 0.3, 1)",
                background: s.bg,
                color: s.fg,
              }}
            >
              <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
                <div className="text-sm uppercase tracking-[0.3em] opacity-70">
                  {String(i + 1).padStart(2, "0")} / {String(SCREENS.length).padStart(2, "0")}
                </div>
                <h1 className="mt-6 font-display text-6xl font-extrabold tracking-tight md:text-8xl">
                  {s.title}
                </h1>
                <p className="mt-4 text-lg opacity-80 md:text-2xl">{s.sub}</p>
              </div>
            </Screen>
          );
        })}
      </div>
    </div>
  );
}

function Screen({
  children,
  style,
}: {
  children: ReactNode;
  style: React.CSSProperties;
}) {
  return (
    <div
      className="absolute inset-0 h-screen w-screen will-change-transform"
      style={style}
    >
      {children}
    </div>
  );
}
