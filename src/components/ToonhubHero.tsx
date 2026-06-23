import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import toonCar from "@/assets/toon-car.png";
import toonCard from "@/assets/toon-card.png";
import toonHome from "@/assets/toon-home.png";
import toonCoins from "@/assets/toon-coins.png";
import mascotCar from "@/assets/mascot-car.png";
import mascotCard from "@/assets/mascot-card.png";
import mascotHome from "@/assets/mascot-home.png";
import mascotCoins from "@/assets/mascot-coins.png";

const IMAGES = [
  {
    src: toonCar,
    bg: "#F4845F",
    panel: "#F79B7F",
    ghost: "NEW CAR",
    title: "NEW CAR LOAN",
    desc: "Drive home your dream car with Finonest. Quick approvals, lowest interest rates and flexible tenures on every new car brand.",
    cta: "Get Car Loan Offers",
    href: "/loans/car",
    mascot: mascotCar,
    mascotSide: "left" as const,
  },
  {
    src: toonCoins,
    bg: "#6BBF7A",
    panel: "#85CC92",
    ghost: "USED CAR",
    title: "USED CAR LOAN",
    desc: "Finance any pre-owned car with confidence. Transparent valuation, instant eligibility check and best-in-class rates.",
    cta: "Check Used Car Offers",
    href: "/loans/used-car",
    mascot: mascotCoins,
    mascotSide: "right" as const,
  },
  {
    src: toonCard,
    bg: "#E882B4",
    panel: "#ED9DC4",
    ghost: "REFINANCE",
    title: "CAR REFINANCE",
    desc: "Lower your EMI by refinancing your existing car loan. Switch lenders in minutes and save up to ₹50,000 over your tenure.",
    cta: "Refinance My Car",
    href: "/loans/refinance",
    mascot: mascotCard,
    mascotSide: "left" as const,
  },
  {
    src: toonHome,
    bg: "#6EB5FF",
    panel: "#8DC4FF",
    ghost: "INSURANCE",
    title: "CAR INSURANCE",
    desc: "Renew or buy car insurance from top insurers. Compare plans, claim assistance and zero paperwork in under 5 minutes.",
    cta: "Get Insurance Quotes",
    href: "/insurance/car",
    mascot: mascotHome,
    mascotSide: "right" as const,
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
    setActiveIndex((p) => (dir === "next" ? (p + 1) % 4 : (p + 3) % 4));
    setTimeout(() => setIsAnimating(false), DURATION);
  };

  useEffect(() => {
    if (isPaused || scrollP > 0.05) return;
    const id = window.setInterval(() => navigate("next"), AUTOPLAY_MS);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, isAnimating, scrollP]);


  const roleOf = (i: number): Role => {
    if (i === activeIndex) return "center";
    if (i === (activeIndex + 3) % 4) return "left";
    if (i === (activeIndex + 1) % 4) return "right";
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
          left: isMobile ? "50%" : "72%",
          bottom: isMobile ? "44%" : "6%",
          height: isMobile ? "50%" : "82%",
          transform: `translateX(-50%) scale(${isMobile ? 1.3 : 1.35})`,
          filter: "blur(0px)",
          opacity: 1,
          zIndex: 20,
        };
      case "left":
        return {
          ...base,
          left: isMobile ? "18%" : "50%",
          bottom: isMobile ? "44%" : "10%",
          height: isMobile ? "14%" : "20%",
          transform: "translateX(-50%) scale(1)",
          filter: "blur(2px)",
          opacity: 0.55,
          zIndex: 10,
        };
      case "right":
        return {
          ...base,
          left: isMobile ? "82%" : "92%",
          bottom: isMobile ? "44%" : "10%",
          height: isMobile ? "14%" : "20%",
          transform: "translateX(-50%) scale(1)",
          filter: "blur(2px)",
          opacity: 0.55,
          zIndex: 10,
        };
      case "back":
        return {
          ...base,
          left: isMobile ? "50%" : "70%",
          bottom: isMobile ? "44%" : "6%",
          height: isMobile ? "11%" : "16%",
          transform: "translateX(-50%) scale(1)",
          filter: "blur(4px)",
          opacity: 0.45,
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
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
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
            top: isMobile ? "22%" : "26%",
            justifyContent: isMobile ? "center" : "flex-start",
            paddingLeft: isMobile ? 0 : "5%",
            transform: `translateY(${ghostShift}px)`,
            opacity: fadeOut,
            willChange: "transform, opacity",
          }}
        >
          <span
            style={{
              fontFamily: "Anton, sans-serif",
              fontSize: isMobile ? "clamp(36px, 13vw, 82px)" : "clamp(80px, 11vw, 200px)",
              fontWeight: 900,
              color: "#fff",
              opacity: isMobile ? 0.92 : 1,
              lineHeight: 1,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
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
          className="absolute bottom-4 left-3 right-3 sm:bottom-20 sm:left-24 sm:right-auto"
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

            <h2
              className="mb-2 sm:mb-3 font-bold uppercase break-words"
              style={{
                color: "#fff",
                fontFamily: "Anton, sans-serif",
                letterSpacing: "0.005em",
                fontSize: "clamp(24px, 7.2vw, 38px)",
                lineHeight: 1,
                wordBreak: "break-word",
                hyphens: "auto",
              }}
            >
              {IMAGES[activeIndex].title}
            </h2>
            <p
              className="mb-4 sm:mb-5"
              style={{
                color: "#fff",
                opacity: 0.9,
                lineHeight: 1.45,
                fontSize: "clamp(12px, 3.2vw, 15px)",
                maxWidth: "32ch",
              }}
            >
              {IMAGES[activeIndex].desc}
            </p>
            <a
              href={IMAGES[activeIndex].href}
              className="inline-flex max-w-full items-center justify-center gap-2 rounded-full font-semibold mb-4 sm:mb-5 whitespace-normal text-center"
              style={{
                backgroundColor: "#fff",
                color: IMAGES[activeIndex].bg,
                padding: "11px 18px",
                fontSize: "clamp(11px, 3vw, 13.5px)",
                lineHeight: 1.15,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                transition: `color ${DURATION}ms ${EASE}, transform 150ms ease, box-shadow 150ms ease`,
                boxShadow: "0 8px 22px rgba(0,0,0,0.22)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.26)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 22px rgba(0,0,0,0.22)";
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
          className="hidden sm:flex absolute bottom-20 right-10 items-center gap-2 no-underline"
          style={{
            zIndex: 60,
            color: "#fff",
            opacity: 0.95,
            fontFamily: "Anton, sans-serif",
            fontSize: "clamp(20px, 4vw, 56px)",
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
