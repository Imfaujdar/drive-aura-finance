import { useEffect, useRef, useState } from "react";
import { Sparkles, Shield, Zap, TrendingUp } from "lucide-react";

/**
 * ScrollCanvas — full-screen sticky cinematic scroll scene
 * - Sticky viewport pinned while a tall outer track scrolls
 * - Lerp-smoothed progress drives parallax layers (bg / mid / fg)
 * - Cinematic timeline at 0/20/40/60/80/100% scroll milestones
 */
export default function ScrollCanvas() {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      targetRef.current = total > 0 ? scrolled / total : 0;
    };

    const tick = () => {
      currentRef.current += (targetRef.current - currentRef.current) * 0.08;
      if (Math.abs(targetRef.current - currentRef.current) < 0.0005) {
        currentRef.current = targetRef.current;
      }
      setProgress(currentRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const p = progress; // 0..1

  // Camera shifts following the brief's timeline
  // 0→20% shift left, 40% zoom in, 60% shift right (swap objects),
  // 80% scale + blur, 100% settle.
  const seg = (a: number, b: number) =>
    Math.min(Math.max((p - a) / (b - a), 0), 1);

  const sLeft = seg(0, 0.2);          // shift left
  const sZoom = seg(0.2, 0.4);        // zoom in
  const sSwap = seg(0.4, 0.6);        // shift right + swap
  const sCine = seg(0.6, 0.8);        // cinematic scale + blur
  const sSettle = seg(0.8, 1);        // settle + fade text

  // Camera transform composition
  const camX = -20 * sLeft + 40 * sSwap; // %
  const camY = -6 * sZoom + 4 * sCine;
  const camScale = 1 + 0.18 * sZoom + 0.08 * sCine - 0.06 * sSettle;
  const blur = 6 * sCine * (1 - sSettle);

  // Parallax depths
  const bgX = camX * 0.25;
  const midX = camX * 0.6;
  const fgX = camX * 1.15;

  // Object A (first scene) exits as we move past 60%
  const aOpacity = 1 - Math.min(sSwap * 1.4, 1);
  const aX = -120 * sSwap;
  // Object B (second scene) enters from right after 40%
  const bOpacity = Math.min(sSwap * 1.2, 1);
  const bX = 140 * (1 - sSwap);

  // Text states
  const introText = 1 - seg(0.05, 0.25);
  const finalText = sSettle;

  return (
    <section
      ref={trackRef}
      className="relative"
      style={{ height: "420vh" }}
      aria-label="Cinematic scroll experience"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">
        {/* Soft gradient backdrop */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px 700px at 20% 10%, #FFE9DA 0%, transparent 60%), radial-gradient(900px 600px at 90% 80%, #E7F0FF 0%, transparent 60%), linear-gradient(180deg, #FFFFFF 0%, #FAF6F1 100%)",
          }}
        />

        {/* Camera wrapper */}
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            transform: `translate3d(${camX}%, ${camY}%, 0) scale(${camScale})`,
            filter: `blur(${blur}px)`,
            transition: "filter 120ms linear",
          }}
        >
          {/* BACKGROUND LAYER — slow */}
          <div
            className="absolute inset-0"
            style={{ transform: `translate3d(${bgX}%, 0, 0)` }}
          >
            <div className="absolute -top-24 -left-10 h-[420px] w-[420px] rounded-full opacity-50"
              style={{ background: "radial-gradient(circle at 30% 30%, #FFD6C2, transparent 65%)" }} />
            <div className="absolute bottom-0 right-0 h-[520px] w-[520px] rounded-full opacity-40"
              style={{ background: "radial-gradient(circle at 60% 40%, #BFD8FF, transparent 65%)" }} />
            <GridPattern />
          </div>

          {/* MID LAYER — medium */}
          <div
            className="absolute inset-0"
            style={{ transform: `translate3d(${midX}%, 0, 0)` }}
          >
            <FloatingChip top="18%" left="12%" delay={0}>
              <Shield className="h-4 w-4 text-primary" />
              <span>RBI-secure</span>
            </FloatingChip>
            <FloatingChip top="68%" left="8%" delay={0.8}>
              <Zap className="h-4 w-4 text-primary" />
              <span>2-min approval</span>
            </FloatingChip>
            <FloatingChip top="22%" left="78%" delay={1.4}>
              <TrendingUp className="h-4 w-4 text-primary" />
              <span>50+ lenders</span>
            </FloatingChip>
            <FloatingChip top="74%" left="72%" delay={0.4}>
              <Sparkles className="h-4 w-4 text-primary" />
              <span>AI-matched</span>
            </FloatingChip>
          </div>

          {/* FOREGROUND LAYER — fast (the scenes) */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ transform: `translate3d(${fgX}%, 0, 0)` }}
          >
            {/* Scene A */}
            <div
              className="absolute flex flex-col items-center"
              style={{
                opacity: aOpacity,
                transform: `translate3d(${aX}%, 0, 0)`,
              }}
            >
              <SceneOrb color="linear-gradient(135deg,#FFB892,#F4845F)" label="Loan" />
            </div>

            {/* Scene B */}
            <div
              className="absolute flex flex-col items-center"
              style={{
                opacity: bOpacity,
                transform: `translate3d(${bX}%, 0, 0)`,
              }}
            >
              <SceneOrb color="linear-gradient(135deg,#9EC4FF,#5B8DEF)" label="Drive" />
            </div>
          </div>
        </div>

        {/* GLASS OVERLAY — fixed UI on top of camera */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-between p-6 md:p-12">
          {/* Top eyebrow */}
          <div
            className="glass-soft rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-primary"
            style={{ opacity: 0.6 + 0.4 * (1 - sSettle) }}
          >
            Scroll to explore
          </div>

          {/* Center text — fades through the journey */}
          <div className="relative w-full max-w-3xl text-center">
            <div
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{
                opacity: introText,
                transform: `translateY(${(1 - introText) * -20}px)`,
              }}
            >
              <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-6xl">
                A loan built around <span className="text-gradient">your drive</span>
              </h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                Scroll. Watch the journey unfold.
              </p>
            </div>

            <div
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{
                opacity: finalText,
                transform: `translateY(${(1 - finalText) * 20}px)`,
              }}
            >
              <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-6xl">
                Welcome to <span className="text-gradient">Finonest</span>
              </h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                Premium finance. Effortless motion.
              </p>
            </div>
          </div>

          {/* Bottom progress bar */}
          <div className="glass-soft flex w-full max-w-md items-center gap-3 rounded-full px-4 py-2">
            <span className="font-num text-xs text-muted-foreground">
              {Math.round(p * 100).toString().padStart(2, "0")}
            </span>
            <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-black/5">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-brand"
                style={{ width: `${p * 100}%` }}
              />
            </div>
            <span className="font-num text-xs text-muted-foreground">100</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingChip({
  children,
  top,
  left,
  delay = 0,
}: {
  children: React.ReactNode;
  top: string;
  left: string;
  delay?: number;
}) {
  return (
    <div
      className="glass-strong absolute flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-foreground/80 animate-float"
      style={{ top, left, animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

function SceneOrb({ color, label }: { color: string; label: string }) {
  return (
    <div className="relative">
      <div
        className="h-64 w-64 rounded-full md:h-80 md:w-80"
        style={{
          background: color,
          boxShadow:
            "0 40px 80px -20px rgba(31,26,22,0.35), 0 10px 30px rgba(31,26,22,0.15), inset 0 -20px 40px rgba(255,255,255,0.25)",
        }}
      />
      <div className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.6), transparent 45%)",
        }}
      />
      <div className="absolute -bottom-2 left-1/2 h-8 w-48 -translate-x-1/2 rounded-full opacity-30 blur-xl"
        style={{ background: "rgba(31,26,22,0.6)" }} />
      <div className="glass-strong absolute -bottom-10 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 text-sm font-semibold text-foreground">
        {label}
      </div>
    </div>
  );
}

function GridPattern() {
  return (
    <svg className="absolute inset-0 h-full w-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="sc-grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#sc-grid)" />
    </svg>
  );
}
