import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { DeviceLayout, ElementId, HeroSlide } from "@/lib/hero-slides";
import { ELEMENT_IDS } from "@/lib/hero-slides";

const GRAIN_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)' opacity='0.08'/></svg>`,
  );

export const HERO_KEYFRAMES = `
  @keyframes hero-mascot-pop-left {
    0% { opacity: 0; transform: translateY(40px) translateX(-30px) rotate(-6deg) scale(0.85); }
    60% { opacity: 1; transform: translateY(-6px) translateX(4px) rotate(2deg) scale(1.03); }
    100% { opacity: 1; transform: translateY(0) translateX(0) rotate(0deg) scale(1); }
  }
  @keyframes hero-mascot-pop-right {
    0% { opacity: 0; transform: translateY(40px) translateX(30px) rotate(6deg) scale(0.85); }
    60% { opacity: 1; transform: translateY(-6px) translateX(-4px) rotate(-2deg) scale(1.03); }
    100% { opacity: 1; transform: translateY(0) translateX(0) rotate(0deg) scale(1); }
  }
  @keyframes hero-mascot-idle {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-6px) rotate(1.2deg); }
  }
`;

type Props = {
  slide: HeroSlide;
  layout: DeviceLayout;
  index: number;
  total: number;
  onPrev?: () => void;
  onNext?: () => void;
  /** disables links/buttons (editor canvas) */
  staticMode?: boolean;
  /** renders an extra node inside each element wrapper (editor handles) */
  overlay?: (id: ElementId) => ReactNode;
  className?: string;
  style?: CSSProperties;
};

/**
 * ONE renderer for every device. It only reads `layout` — never derives
 * one device's coordinates from another and never uses responsive CSS to
 * reposition. Animations are shared; only positions differ.
 */
export default function HeroRenderer({
  slide,
  layout,
  index,
  total,
  onPrev,
  onNext,
  staticMode = false,
  overlay,
  className,
  style,
}: Props) {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [boxWidth, setBoxWidth] = useState(layout.width);

  useEffect(() => {
    const node = boxRef.current;
    if (!node) return;
    const ro = new ResizeObserver(() => setBoxWidth(node.clientWidth || layout.width));
    ro.observe(node);
    setBoxWidth(node.clientWidth || layout.width);
    return () => ro.disconnect();
  }, [layout.width]);

  /** design px -> rendered px for the same device canvas */
  const scale = boxWidth / layout.width;
  const fs = (id: ElementId) => `${Math.max(6, layout.elements[id].fontSize * scale)}px`;

  const wrap = (id: ElementId, children: ReactNode, extra?: CSSProperties) => {
    const e = layout.elements[id];
    if (!e.visible) return null;
    return (
      <div
        key={id}
        data-hero-element={id}
        style={{
          position: "absolute",
          left: `${e.x}%`,
          top: `${e.y}%`,
          width: `${e.width}%`,
          zIndex: e.zIndex,
          textAlign: e.align,
          ...extra,
        }}
      >
        {children}
        {overlay?.(id)}
      </div>
    );
  };

  const popAnim =
    slide.mascotSide === "left" ? "hero-mascot-pop-left" : "hero-mascot-pop-right";

  return (
    <div
      ref={boxRef}
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: slide.bg,
        fontFamily: "Inter, sans-serif",
        transition: "background-color 650ms cubic-bezier(0.4,0,0.2,1)",
        ...style,
      }}
    >
      <style>{HERO_KEYFRAMES}</style>

      {/* grain */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex: 50,
          opacity: 0.4,
          backgroundImage: `url("${GRAIN_SVG}")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* ground */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{
          zIndex: 1,
          height: "10%",
          opacity: 0.35,
          background: `linear-gradient(to top, color-mix(in oklab, ${slide.bg} 80%, #000) 0%, transparent 100%)`,
        }}
      />

      {/* ---------------- elements ---------------- */}

      {wrap(
        "watermark",
        <span
          style={{
            fontFamily: "Anton, sans-serif",
            fontSize: fs("watermark"),
            color: "#fff",
            opacity: 0.55,
            lineHeight: 0.92,
            textTransform: "uppercase",
            letterSpacing: "-0.025em",
            whiteSpace: "nowrap",
            display: "block",
            overflow: "hidden",
          }}
        >
          {slide.ghost}
        </span>,
        { pointerEvents: "none", userSelect: "none" },
      )}

      {wrap(
        "mascot",
        <img
          key={slide.id}
          src={slide.src}
          alt={slide.title}
          draggable={false}
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
            animation: staticMode
              ? undefined
              : `${popAnim} 750ms cubic-bezier(0.4,0,0.2,1) both, hero-mascot-idle 5s ease-in-out 800ms infinite`,
          }}
        />,
        { pointerEvents: "none" },
      )}

      {wrap(
        "eyebrow",
        <div
          className="flex items-center gap-3"
          style={{ color: "rgba(255,255,255,0.88)", fontSize: fs("eyebrow") }}
        >
          <span style={{ fontFamily: "Anton, sans-serif", lineHeight: 1 }}>
            0{index + 1}
          </span>
          <span style={{ letterSpacing: "0.22em", textTransform: "uppercase", opacity: 0.85 }}>
            / 0{total} · Finonest Auto
          </span>
        </div>,
      )}

      {wrap(
        "title",
        <h2
          style={{
            color: "#fff",
            fontFamily: "Anton, sans-serif",
            fontSize: fs("title"),
            lineHeight: 0.95,
            textTransform: "uppercase",
            margin: 0,
            wordBreak: "break-word",
          }}
        >
          {slide.title}
        </h2>,
      )}

      {wrap(
        "description",
        <p
          style={{
            color: "#fff",
            opacity: 0.92,
            fontSize: fs("description"),
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          {slide.desc}
        </p>,
      )}

      {wrap(
        "cta",
        <a
          href={staticMode ? undefined : slide.href}
          onClick={staticMode ? (e) => e.preventDefault() : undefined}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full font-semibold"
          style={{
            backgroundColor: "#fff",
            color: slide.bg,
            padding: `${Math.max(6, 12 * scale * (layout.width / 1920) * 1)}px ${Math.max(10, 18 * scale)}px`,
            fontSize: fs("cta"),
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            boxShadow: "0 10px 28px rgba(0,0,0,0.22)",
          }}
        >
          <span>{slide.cta}</span>
          <ArrowRight size={Math.max(12, 16 * scale)} strokeWidth={2.5} className="shrink-0" />
        </a>,
      )}

      {wrap(
        "nav",
        <div className="flex items-center gap-3">
          <NavButton onClick={onPrev} Icon={ArrowLeft} size={52 * scale} disabled={staticMode} />
          <NavButton onClick={onNext} Icon={ArrowRight} size={52 * scale} disabled={staticMode} />
        </div>,
      )}

      {wrap(
        "pills",
        <div className="flex flex-col gap-2">
          {[
            { k: "01", v: "Approval in 30 mins" },
            { k: "02", v: "Rates from 8.5% p.a." },
            { k: "03", v: "100% Digital Process" },
          ].map((f) => (
            <div
              key={f.k}
              className="flex w-full items-center gap-3 rounded-full"
              style={{
                padding: `${8 * scale}px ${14 * scale}px`,
                background: "rgba(255,255,255,0.13)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "#fff",
                fontSize: fs("pills"),
              }}
            >
              <span style={{ fontFamily: "Anton, sans-serif", opacity: 0.85 }}>{f.k}</span>
              <span style={{ fontWeight: 500 }}>{f.v}</span>
            </div>
          ))}
        </div>,
      )}

      {wrap(
        "stats",
        <div
          className="flex w-full flex-col rounded-2xl"
          style={{
            padding: `${14 * scale}px ${16 * scale}px`,
            gap: `${6 * scale}px`,
            background: "rgba(255,255,255,0.13)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.25)",
            color: "#fff",
            fontSize: fs("stats"),
          }}
        >
          <span
            style={{
              fontFamily: "Anton, sans-serif",
              fontSize: `calc(${fs("stats")} * 2.3)`,
              lineHeight: 1,
            }}
          >
            ₹2,400Cr+
          </span>
          <span style={{ letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.85 }}>
            Auto loans disbursed
          </span>
          <div style={{ height: 1, background: "rgba(255,255,255,0.25)" }} />
          <div className="flex items-center justify-between gap-3">
            <span style={{ opacity: 0.9 }}>1.2L+ happy drivers</span>
            <span style={{ fontFamily: "Anton, sans-serif" }}>★ 4.8</span>
          </div>
        </div>,
      )}

      {wrap(
        "vertical",
        <div
          style={{
            writingMode: "vertical-rl",
            color: "rgba(255,255,255,0.7)",
            fontSize: fs("vertical"),
            fontWeight: 600,
            letterSpacing: "0.42em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          Finonest Auto — Finance · Refinance · Insure
        </div>,
        { pointerEvents: "none" },
      )}

      {/* keeps ELEMENT_IDS referenced for exhaustiveness in dev */}
      {import.meta.env.DEV && ELEMENT_IDS.length === 0 ? null : null}
    </div>
  );
}

function NavButton({
  onClick,
  Icon,
  size,
  disabled,
}: {
  onClick?: () => void;
  Icon: typeof ArrowLeft;
  size: number;
  disabled?: boolean;
}) {
  const s = Math.max(28, size);
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      className="flex items-center justify-center rounded-full"
      style={{
        width: s,
        height: s,
        background: "transparent",
        border: "2px solid #fff",
        color: "#fff",
        transition: "transform 150ms ease, background-color 150ms ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.08)";
        e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      <Icon size={Math.max(14, s * 0.45)} strokeWidth={2.25} />
    </button>
  );
}
