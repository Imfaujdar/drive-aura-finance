import { useEffect, useRef, useState, Children, type ReactNode } from "react";

interface SlideCanvasProps {
  children: ReactNode;
  /** Optional per-slide background (CSS color or gradient). Length should match children. */
  backgrounds?: string[];
}

/**
 * Full-screen sticky canvas. Each direct child becomes one 100vh block.
 * On scroll, the entire block translates up and the next enters from the
 * bottom. Smooth translateY only — no fade, no scale, no parallax.
 *
 * Scroll-space math:
 *   N slides need (N - 1) transitions plus 1 viewport of sticky pinning.
 *   Total scroll wrapper height = N * viewport-height.
 *   We use `dvh` (dynamic viewport height) so mobile URL-bar collapse and
 *   orientation changes do not leave a blank gap or clip the last slide.
 */
export default function SlideCanvas({ children, backgrounds }: SlideCanvasProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const slides = Children.toArray(children);
  const count = slides.length;

  useEffect(() => {
    let raf = 0;
    const compute = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 0));
      const p = total > 0 ? (scrolled / total) * (count - 1) : 0;
      setProgress(p);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };
    // Initial measure after first paint so layout is settled.
    raf = requestAnimationFrame(compute);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("orientationchange", onScroll);
    // Recompute if the wrapper itself changes size (e.g. font load, image load).
    const ro = new ResizeObserver(onScroll);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("orientationchange", onScroll);
      ro.disconnect();
    };
  }, [count]);

  // Use dvh so the scroll distance = exactly N viewports at all times.
  const wrapperHeight = `calc(var(--slide-canvas-vh, 1dvh) * 100 * ${count})`;
  const slideHeight = "calc(var(--slide-canvas-vh, 1dvh) * 100)";

  return (
    <div
      ref={wrapperRef}
      style={{ height: wrapperHeight }}
      className="relative w-full"
    >
      <div
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: slideHeight }}
      >
        {slides.map((child, i) => {
          const offset = (i - progress) * 100;
          const background = backgrounds?.[i];
          return (
            <div
              key={i}
              className="absolute inset-x-0 top-0 w-full will-change-transform"
              style={{
                height: slideHeight,
                transform: `translate3d(0, ${offset}dvh, 0)`,
                transition: "transform 0.7s cubic-bezier(0.7, 0, 0.3, 1)",
                background,
              }}
            >
              <div className="h-full w-full overflow-hidden">{child}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
