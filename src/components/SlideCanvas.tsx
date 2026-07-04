import { useEffect, useLayoutEffect, useRef, useState, Children, type ReactNode } from "react";

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
 *   N slides need (N - 1) transitions of 100vh each, plus 100vh for the
 *   sticky viewport itself. Total wrapper height = N * 100vh.
 *   We compute this in pixels from the *measured* viewport height so mobile
 *   URL-bar collapse / rotation don't leave blank gaps or cut the last slide.
 */
export default function SlideCanvas({ children, backgrounds }: SlideCanvasProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [vh, setVh] = useState(() =>
    typeof window === "undefined" ? 800 : window.innerHeight,
  );
  const slides = Children.toArray(children);
  const count = slides.length;

  // Keep wrapper height in sync with the real viewport height (px, not vh)
  // so mobile browser chrome and orientation changes don't create gaps.
  useLayoutEffect(() => {
    const measure = () => setVh(window.innerHeight);
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
    };
  }, []);

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
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("orientationchange", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("orientationchange", onScroll);
    };
  }, [count, vh]);

  // Explicit pixel height = exactly the scroll distance needed for N slides.
  const wrapperHeightPx = count * vh;

  return (
    <div
      ref={wrapperRef}
      style={{ height: `${wrapperHeightPx}px` }}
      className="relative w-full"
    >
      <div
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: `${vh}px` }}
      >
        {slides.map((child, i) => {
          const offset = (i - progress) * vh;
          const background = backgrounds?.[i];
          return (
            <div
              key={i}
              className="absolute inset-x-0 top-0 w-full will-change-transform"
              style={{
                height: `${vh}px`,
                transform: `translate3d(0, ${offset}px, 0)`,
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
