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
 * Each slide can have its own solid background color via `backgrounds`.
 */
export default function SlideCanvas({ children, backgrounds }: SlideCanvasProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const slides = Children.toArray(children);
  const count = slides.length;

  useEffect(() => {
    const onScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? (scrolled / total) * (count - 1) : 0;
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [count]);

  return (
    <div
      ref={wrapperRef}
      style={{ height: `${count * 100}vh` }}
      className="relative w-full"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {slides.map((child, i) => {
          const offset = (i - progress) * 100;
          const background = backgrounds?.[i];
          return (
            <div
              key={i}
              className="absolute inset-0 h-screen w-full will-change-transform"
              style={{
                transform: `translate3d(0, ${offset}vh, 0)`,
                transition: "transform 0.7s cubic-bezier(0.7, 0, 0.3, 1)",
                background,
              }}
            >
              <div className="h-full w-full overflow-y-auto overflow-x-hidden">
                {child}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
