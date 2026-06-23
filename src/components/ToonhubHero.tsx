import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import heroUsedCar from "@/assets/hero-mascot-usedcar-v2.png";
import heroLoanAgainstCar from "@/assets/hero-mascot-loanagainstcar.png";
import heroNewCar from "@/assets/hero-mascot-newcar-v2.png";
import heroCommercial from "@/assets/hero-mascot-commercial.png";
import heroConstruction from "@/assets/hero-mascot-construction.png";
import heroTractor from "@/assets/hero-mascot-tractor.png";

const IMAGES = [
  {
    src: heroUsedCar,
    bg: "#F4845F",
    panel: "#F79B7F",
    ghost: "USED CAR",
    title: "USED CAR LOAN",
    desc: "Finance any pre-owned car with confidence. Transparent valuation, instant eligibility check and best-in-class rates.",
    cta: "Check Used Car Offers",
    href: "/loans/used-car",
    mascotSide: "right" as const,
  },
  {
    src: heroLoanAgainstCar,
    bg: "#E882B4",
    panel: "#ED9DC4",
    ghost: "LOAN AGAINST CAR",
    title: "LOAN AGAINST CAR",
    desc: "Unlock the value of your existing car. Get instant cash with minimal documentation while you continue to drive your vehicle.",
    cta: "Get Loan Against Car",
    href: "/loans/loan-against-car",
    mascotSide: "left" as const,
  },
  {
    src: heroNewCar,
    bg: "#6EB5FF",
    panel: "#8DC4FF",
    ghost: "NEW CAR",
    title: "NEW CAR LOAN",
    desc: "Drive home your dream car with Finonest. Quick approvals, lowest interest rates and flexible tenures on every new car brand.",
    cta: "Get Car Loan Offers",
    href: "/loans/car",
    mascotSide: "right" as const,
  },
  {
    src: heroCommercial,
    bg: "#6BBF7A",
    panel: "#85CC92",
    ghost: "COMMERCIAL",
    title: "COMMERCIAL VEHICLE LOAN",
    desc: "Power your business on the road. Finance trucks, buses, tempos and fleet vehicles with flexible tenures and competitive rates.",
    cta: "Finance My Vehicle",
    href: "/loans/commercial-vehicle",
    mascotSide: "left" as const,
  },
  {
    src: heroConstruction,
    bg: "#F2B441",
    panel: "#F5C56A",
    ghost: "CONSTRUCTION",
    title: "CONSTRUCTION EQUIPMENT LOAN",
    desc: "Build bigger with Finonest. Finance excavators, loaders, cranes and tractors with fast approvals and easy EMIs.",
    cta: "Get Equipment Loan",
    href: "/loans/construction-equipment",
    mascotSide: "right" as const,
  },
  {
    src: heroTractor,
    bg: "#5BAE6A",
    panel: "#7BC089",
    ghost: "TRACTOR",
    title: "TRACTOR LOAN",
    desc: "Grow your farm with Finonest. Finance any tractor brand with minimal paperwork, subsidies and farmer-friendly EMIs.",
    cta: "Get Tractor Loan",
    href: "/loans/tractor",
    mascotSide: "left" as const,
  },
];

const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
const DURATION = 650;

const GRAIN_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)' opacity='0.08'/></svg>`
  );

type Role = "center" | "left" | "right" | "back";

const AUTOPLAY_MS = 4000;

export default function ToonhubHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollP, setScrollP] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const h = rect.height || 1;
        const p = Math.min(1, Math.max(0, -rect.top / h));
        setScrollP(p);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    IMAGES.forEach((i) => {
      const img = new Image();
      img.src = i.src;
    });
  }, []);

  // Sync hero accent to the page on slide change
  useEffect(() => {
    const slide = IMAGES[activeIndex];
    const root = document.documentElement;
    root.style.setProperty("--hero-accent", slide.bg);
    root.style.setProperty("--hero-accent-soft", slide.panel);
  }, [activeIndex]);


  const navigate = (dir: "next" | "prev") => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((p) => (dir === "next" ? (p + 1) % IMAGES.length : (p + IMAGES.length - 1) % IMAGES.length));
    setTimeout(() => setIsAnimating(false), DURATION);
  };

  useEffect(() => {
    if (isPaused || scrollP > 0.05) return;
    const id = window.setInterval(() => navigate("prev"), AUTOPLAY_MS);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, isAnimating, scrollP]);


  const roleOf = (i: number): Role => {
    if (i === activeIndex) return "center";
    if (i === (activeIndex + IMAGES.length - 1) % IMAGES.length) return "left";
    if (i === (activeIndex + 1) % IMAGES.length) return "right";
    return "back";
  };

  const itemStyle = (role: Role): CSSProperties => {
    const base: CSSProperties = {
      position: "absolute",
      aspectRatio: "0.6 / 1",
      transition: `transform ${DURATION}ms ${EASE}, filter ${DURATION}ms ${EASE}, opacity ${DURATION}ms ${EASE}, left ${DURATION}ms ${EASE}`,
      willChange: "transform, filter, opacity",
    };
    switch (role) {
      case "center":
        return {
          ...base,
          left: isMobile ? "70%" : "72%",
          bottom: isMobile ? "36%" : "2%",
          height: isMobile ? "62%" : "92%",
          transform: `translateX(-50%) scale(${isMobile ? 1.5 : 1.35})`,

          filter: "blur(0px)",
          opacity: 1,
          zIndex: 20,
        };

      case "left":
        return {
          ...base,
          left: isMobile ? "15%" : "44%",
          bottom: isMobile ? "38%" : "8%",
          height: isMobile ? "13%" : "20%",
          transform: "translateX(-50%) scale(1)",
          filter: "blur(2px)",
          opacity: isMobile ? 0.5 : 0,
          zIndex: 10,
        };
      case "right":
        return {
          ...base,
          left: isMobile ? "92%" : "90%",
          bottom: isMobile ? "78%" : "8%",
          height: isMobile ? "12%" : "20%",
          transform: "translateX(-50%) scale(1)",
          filter: "blur(2px)",
          opacity: isMobile ? 0.45 : 0,
          zIndex: 10,
        };
      case "back":
        return {
          ...base,
          left: isMobile ? "38%" : "68%",
          bottom: isMobile ? "78%" : "5%",
          height: isMobile ? "10%" : "16%",
          transform: "translateX(-50%) scale(1)",
          filter: "blur(4px)",
          opacity: isMobile ? 0.4 : 0,

          zIndex: 5,
        };


    }

  };


  const sideSign = IMAGES[activeIndex].mascotSide === "left" ? -1 : 1;
  // Scroll-driven motion values
  const ghostShift = -scrollP * 140; // ghost text rises
  const subjectShift = scrollP * 80; // subject sinks slightly
  const subjectScale = 1 - scrollP * 0.08;
  const mascotShiftX = sideSign * scrollP * 180; // mascot slides off toward its edge
  const mascotShiftY = scrollP * 120;
  const mascotRot = sideSign * scrollP * 14;
  const fadeOut = 1 - scrollP * 0.6;

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: IMAGES[activeIndex].bg,
        transition: `background-color ${DURATION}ms ${EASE}`,
        fontFamily: "Inter, sans-serif",
      }}
      className="relative w-full overflow-hidden"
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsPaused(false);
      }}
    >

      <div className="relative w-full" style={{ height: "100vh", overflow: "hidden" }}>
        {/* Grain */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 50,
            opacity: 0.4,
            backgroundImage: `url("${GRAIN_SVG}")`,
            backgroundSize: "200px 200px",
            backgroundRepeat: "repeat",
          }}
        />

        {/* Ghost text - sits behind the subject for depth */}
        <div
          className="absolute inset-x-0 flex items-center pointer-events-none select-none"
          style={{
            zIndex: 2,
            top: isMobile ? "10%" : "16%",
            justifyContent: isMobile ? "flex-start" : "flex-start",
            paddingLeft: isMobile ? "5%" : "6%",
            transform: `translateY(${ghostShift}px)`,
            opacity: fadeOut,
            willChange: "transform, opacity",
          }}
        >
          <span
            style={{
              fontFamily: "Anton, sans-serif",
              fontSize: isMobile ? "clamp(64px, 20vw, 130px)" : "clamp(140px, 22vw, 360px)",
              fontWeight: 900,
              color: "#fff",
              opacity: isMobile ? 0.7 : 0.55,
              lineHeight: 0.92,
              textTransform: "uppercase",
              letterSpacing: "-0.025em",
              whiteSpace: "nowrap",
              maxWidth: "92vw",
              overflow: "hidden",
              textOverflow: "clip",
              textShadow: "0 2px 24px rgba(0,0,0,0.12)",
            }}
          >
            {IMAGES[activeIndex].ghost}
          </span>
        </div>



        {/* Brand handled by global Navbar */}

        {/* Ground / floor — subtle horizon tint, kept low so it doesn't cut across subjects */}
        <div
          className="pointer-events-none absolute inset-x-0"
          style={{
            zIndex: 2,
            bottom: 0,
            height: isMobile ? "14%" : "9%",
            background: `linear-gradient(to top, color-mix(in oklab, ${IMAGES[activeIndex].bg} 80%, #000) 0%, transparent 100%)`,
            transition: `background ${DURATION}ms ${EASE}`,
            opacity: 0.35,
          }}
        />

        {/* Contact shadow under the active subject */}
        <div
          className="pointer-events-none absolute"
          style={{
            zIndex: 2,
            left: isMobile ? "70%" : "74%",
            bottom: isMobile ? "34%" : "1.5%",
            width: isMobile ? "55%" : "32%",
            height: isMobile ? "26px" : "44px",
            transform: "translate(-50%, 50%)",
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0) 70%)",
            filter: "blur(6px)",
            transition: `left ${DURATION}ms ${EASE}, bottom ${DURATION}ms ${EASE}`,
            opacity: fadeOut,
          }}
        />

        {/* Carousel */}
        <div
          className="absolute inset-0"
          style={{
            zIndex: 3,
            transform: `translateY(${subjectShift}px) scale(${subjectScale})`,
            transformOrigin: "center bottom",
            willChange: "transform",
          }}
        >
          {IMAGES.map((img, i) => (
            <div key={i} style={itemStyle(roleOf(i))}>
              <img
                src={img.src}
                alt=""
                draggable={false}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  objectPosition: "bottom center",
                }}
              />
            </div>
          ))}
        </div>


        {/* Mascot keyframes */}
        <style>{`
          @keyframes mascot-pop-left {
            0% { opacity: 0; transform: translateY(40px) translateX(-30px) rotate(-6deg) scale(0.85); }
            60% { opacity: 1; transform: translateY(-6px) translateX(4px) rotate(2deg) scale(1.03); }
            100% { opacity: 1; transform: translateY(0) translateX(0) rotate(0deg) scale(1); }
          }
          @keyframes mascot-pop-right {
            0% { opacity: 0; transform: translateY(40px) translateX(30px) rotate(6deg) scale(0.85); }
            60% { opacity: 1; transform: translateY(-6px) translateX(-4px) rotate(-2deg) scale(1.03); }
            100% { opacity: 1; transform: translateY(0) translateX(0) rotate(0deg) scale(1); }
          }
          @keyframes mascot-idle {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-6px) rotate(1.2deg); }
          }
        `}</style>


        {/* Bottom content */}
        <div
          className="absolute bottom-4 left-3 right-3 sm:bottom-auto sm:right-auto sm:top-1/2 sm:left-[6%] sm:max-w-[520px] sm:-translate-y-[10%]"
          style={{ zIndex: 60, maxWidth: "min(94vw, 380px)" }}
        >
          {/* Mobile glass card wrapper */}
          <div
            className="sm:contents rounded-3xl p-5"
            style={{
              background: "rgba(255,255,255,0.10)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: "1px solid rgba(255,255,255,0.22)",
              boxShadow: "0 10px 40px -10px rgba(0,0,0,0.25)",
            }}
          >
            {/* Pagination indicator (mobile) */}
            <div className="flex sm:hidden items-center gap-2 mb-3" style={{ color: "#fff" }}>
              <span style={{ fontFamily: "Anton, sans-serif", fontSize: 20, lineHeight: 1, letterSpacing: "0.02em" }}>
                0{activeIndex + 1}
              </span>
              <span style={{ opacity: 0.65, fontSize: 11, letterSpacing: "0.08em" }}>/ 0{IMAGES.length}</span>
              <div className="flex-1 h-px ml-2" style={{ background: "rgba(255,255,255,0.3)" }} />
            </div>

            {/* Desktop eyebrow */}
            <div
              className="hidden sm:flex items-center gap-3 mb-5"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              <span
                style={{
                  fontFamily: "Anton, sans-serif",
                  fontSize: 22,
                  lineHeight: 1,
                  letterSpacing: "0.04em",
                }}
              >
                0{activeIndex + 1}
              </span>
              <span style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase" }}>
                / 0{IMAGES.length} &nbsp;·&nbsp; Finonest Auto
              </span>
              <div className="h-px w-16" style={{ background: "rgba(255,255,255,0.5)" }} />
            </div>

            <h2
              className="mb-3 sm:mb-5 font-bold uppercase break-words"
              style={{
                color: "#fff",
                fontFamily: "Anton, sans-serif",
                letterSpacing: "0.005em",
                fontSize: "clamp(24px, 7.2vw, 56px)",
                lineHeight: 0.95,
                wordBreak: "break-word",
                hyphens: "auto",
              }}
            >
              {IMAGES[activeIndex].title}
            </h2>
            <p
              className="mb-5 sm:mb-7"
              style={{
                color: "#fff",
                opacity: 0.92,
                lineHeight: 1.55,
                fontSize: "clamp(12px, 3.2vw, 17px)",
                maxWidth: "44ch",
              }}
            >
              {IMAGES[activeIndex].desc}
            </p>
            <a
              href={IMAGES[activeIndex].href}
              className="inline-flex max-w-full items-center justify-center gap-2 rounded-full font-semibold mb-5 sm:mb-7 whitespace-normal text-center sm:px-7 sm:py-4"
              style={{
                backgroundColor: "#fff",
                color: IMAGES[activeIndex].bg,
                padding: "11px 18px",
                fontSize: "clamp(11px, 3vw, 14px)",
                lineHeight: 1.15,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                transition: `color ${DURATION}ms ${EASE}, transform 150ms ease, box-shadow 150ms ease`,
                boxShadow: "0 10px 28px rgba(0,0,0,0.22)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 14px 32px rgba(0,0,0,0.28)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,0,0,0.22)";
              }}
            >
              <span className="min-w-0">{IMAGES[activeIndex].cta}</span>
              <ArrowRight size={16} strokeWidth={2.5} className="shrink-0" />
            </a>
            <div className="flex items-center justify-between gap-3">
              <div className="flex gap-2.5">
                <NavButton onClick={() => navigate("prev")} Icon={ArrowLeft} />
                <NavButton onClick={() => navigate("next")} Icon={ArrowRight} />
              </div>
              <div className="flex sm:hidden items-center gap-1.5">
                {IMAGES.map((_, i) => (
                  <span
                    key={i}
                    style={{
                      width: i === activeIndex ? 20 : 6,
                      height: 6,
                      borderRadius: 999,
                      background: "#fff",
                      opacity: i === activeIndex ? 1 : 0.45,
                      transition: "all 300ms ease",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom-right - desktop only */}
        <a
          href="#"
          className="hidden sm:flex absolute bottom-10 right-10 items-center gap-2 no-underline"
          style={{
            zIndex: 60,
            color: "#fff",
            opacity: 0.9,
            fontFamily: "Anton, sans-serif",
            fontSize: "clamp(18px, 2.2vw, 32px)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            lineHeight: 1,
            textTransform: "uppercase",
            transition: "opacity 200ms ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.95")}
        >
          DISCOVER IT
          <ArrowRight className="w-5 h-5 sm:w-8 sm:h-8" strokeWidth={2.25} />
        </a>

        {/* Right-edge vertical eyebrow - desktop only */}
        <div
          className="hidden lg:block absolute right-3 top-1/2 pointer-events-none"
          style={{
            zIndex: 55,
            writingMode: "vertical-rl",
            transform: "translateY(-50%) rotate(180deg)",
            color: "rgba(255,255,255,0.7)",
            fontFamily: "Inter, sans-serif",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.42em",
            textTransform: "uppercase",
          }}
        >
          Finonest Auto — Finance · Refinance · Insure
        </div>

        {/* Right-side stacked column: pills + stats - desktop only */}
        <div
          className="hidden md:flex absolute top-28 right-10 flex-col items-end gap-3"
          style={{ zIndex: 55, width: "min(280px, 26vw)" }}
        >
          {[
            { k: "01", v: "Approval in 30 mins" },
            { k: "02", v: "Rates from 8.5% p.a." },
            { k: "03", v: "100% Digital Process" },
          ].map((f) => (
            <div
              key={f.k}
              className="flex w-full items-center gap-3 rounded-full px-4 py-2.5"
              style={{
                background: "rgba(255,255,255,0.13)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "#fff",
              }}
            >
              <span
                style={{
                  fontFamily: "Anton, sans-serif",
                  fontSize: 14,
                  opacity: 0.85,
                  letterSpacing: "0.06em",
                }}
              >
                {f.k}
              </span>
              <span style={{ fontSize: 13, fontWeight: 500, letterSpacing: "0.01em" }}>
                {f.v}
              </span>
            </div>
          ))}

          {/* Stats card directly under pills */}
          <div
            className="mt-2 flex w-full flex-col gap-2 rounded-2xl px-5 py-4"
            style={{
              background: "rgba(255,255,255,0.13)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.25)",
              color: "#fff",
            }}
          >
            <span
              style={{
                fontFamily: "Anton, sans-serif",
                fontSize: 32,
                lineHeight: 1,
                letterSpacing: "-0.01em",
              }}
            >
              ₹2,400Cr+
            </span>
            <span
              style={{
                fontSize: 10,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                opacity: 0.85,
              }}
            >
              Auto loans disbursed
            </span>
            <div className="mt-1 h-px w-full" style={{ background: "rgba(255,255,255,0.25)" }} />
            <div className="flex items-center justify-between gap-3 pt-1">
              <span style={{ fontSize: 12, opacity: 0.9 }}>1.2L+ happy drivers</span>
              <span
                style={{
                  fontFamily: "Anton, sans-serif",
                  fontSize: 13,
                  letterSpacing: "0.08em",
                }}
              >
                ★ 4.8
              </span>
            </div>
          </div>
        </div>



      </div>
    </section>
  );
}

function NavButton({
  onClick,
  Icon,
}: {
  onClick: () => void;
  Icon: typeof ArrowLeft;
}) {
  return (
    <button
      onClick={onClick}
      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center"
      style={{
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
      <Icon size={26} strokeWidth={2.25} />
    </button>
  );
}
