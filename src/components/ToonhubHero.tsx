import { useEffect, useState, type CSSProperties } from "react";
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
    ghost: "CAR LOAN",
    title: "CAR LOAN",
    desc: "Drive home your dream car with Finonest. Quick approvals, attractive interest rates and flexible tenures on new and used vehicles.",
    cta: "Get Car Loan Offers",
    href: "/loans/car",
    mascot: mascotCar,
    mascotSide: "left" as const,
  },
  {
    src: toonCard,
    bg: "#6BBF7A",
    panel: "#85CC92",
    ghost: "CREDIT CARD",
    title: "CREDIT CARD",
    desc: "Premium credit cards tailored to your lifestyle. Compare top issuers, unlock rewards and apply in minutes with Finonest.",
    cta: "Get Credit Card Offers",
    href: "/cards",
    mascot: mascotCard,
    mascotSide: "right" as const,
  },
  {
    src: toonHome,
    bg: "#E882B4",
    panel: "#ED9DC4",
    ghost: "HOME LOAN",
    title: "HOME LOAN",
    desc: "Turn the key to your dream home. Finonest brings you the lowest rates, fast sanctions and end-to-end paperwork support.",
    cta: "Get Home Loan Offers",
    href: "/loans/home",
    mascot: mascotHome,
    mascotSide: "left" as const,
  },
  {
    src: toonCoins,
    bg: "#6EB5FF",
    panel: "#8DC4FF",
    ghost: "PERSONAL LOAN",
    title: "PERSONAL LOAN",
    desc: "Instant personal loans for every milestone — weddings, travel, medical or emergencies. Funds in your account within hours.",
    cta: "Get Personal Loan Offers",
    href: "/loans/personal",
    mascot: mascotCoins,
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

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    IMAGES.forEach((i) => {
      const img = new Image();
      img.src = i.src;
    });
  }, []);

  const navigate = (dir: "next" | "prev") => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((p) => (dir === "next" ? (p + 1) % 4 : (p + 3) % 4));
    setTimeout(() => setIsAnimating(false), DURATION);
  };

  useEffect(() => {
    if (isPaused) return;
    const id = window.setInterval(() => navigate("next"), AUTOPLAY_MS);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, isAnimating]);


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
          left: "50%",
          bottom: isMobile ? "22%" : 0,
          height: isMobile ? "60%" : "92%",
          transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
          filter: "blur(0px)",
          opacity: 1,
          zIndex: 20,
        };
      case "left":
        return {
          ...base,
          left: isMobile ? "20%" : "30%",
          bottom: isMobile ? "32%" : "12%",
          height: isMobile ? "16%" : "28%",
          transform: "translateX(-50%) scale(1)",
          filter: "blur(2px)",
          opacity: 0.85,
          zIndex: 10,
        };
      case "right":
        return {
          ...base,
          left: isMobile ? "80%" : "70%",
          bottom: isMobile ? "32%" : "12%",
          height: isMobile ? "16%" : "28%",
          transform: "translateX(-50%) scale(1)",
          filter: "blur(2px)",
          opacity: 0.85,
          zIndex: 10,
        };
      case "back":
        return {
          ...base,
          left: "50%",
          bottom: isMobile ? "32%" : "12%",
          height: isMobile ? "13%" : "22%",
          transform: "translateX(-50%) scale(1)",
          filter: "blur(4px)",
          opacity: 1,
          zIndex: 5,
        };
    }
  };

  return (
    <section
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

        {/* Ghost text */}
        <div
          className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none"
          style={{ zIndex: 2, top: "18%" }}
        >
          <span
            style={{
              fontFamily: "Anton, sans-serif",
              fontSize: "clamp(56px, 18vw, 320px)",
              fontWeight: 900,
              color: "#fff",
              opacity: 1,
              lineHeight: 1,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
            }}
          >
            {IMAGES[activeIndex].ghost}
          </span>
        </div>

        {/* Brand */}
        <div
          className="absolute top-6 left-4 sm:left-8 text-xs font-semibold uppercase"
          style={{ zIndex: 60, color: "#fff", opacity: 0.9, letterSpacing: "0.18em" }}
        >
          FINONEST
        </div>

        {/* Carousel */}
        <div className="absolute inset-0" style={{ zIndex: 3 }}>
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

        {/* Mascot pointing to subject */}
        <div
          className="absolute pointer-events-none hidden md:block"
          style={{
            zIndex: 25,
            bottom: 0,
            [IMAGES[activeIndex].mascotSide]: "8%",
            height: "46%",
            transition: `opacity ${DURATION}ms ${EASE}, transform ${DURATION}ms ${EASE}`,
          }}
          key={activeIndex}
        >
          <img
            src={IMAGES[activeIndex].mascot}
            alt=""
            style={{
              height: "100%",
              width: "auto",
              objectFit: "contain",
              objectPosition: "bottom center",
              filter: "drop-shadow(0 18px 24px rgba(0,0,0,0.25))",
              transform:
                IMAGES[activeIndex].mascotSide === "left" ? "none" : "scaleX(-1)",
              animation: "fade-in 600ms ease-out",
            }}
          />
        </div>

        {/* Bottom-left */}
        <div
          className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24"
          style={{ zIndex: 60, maxWidth: "min(90vw, 360px)" }}
        >
          <h2
            className="mb-2 sm:mb-3 font-bold uppercase tracking-widest"
            style={{
              color: "#fff",
              opacity: 0.95,
              letterSpacing: "0.02em",
              fontSize: "clamp(15px, 2.2vw, 24px)",
              lineHeight: 1.15,
            }}
          >
            {IMAGES[activeIndex].title}
          </h2>
          <p
            className="hidden sm:block mb-4 sm:mb-5"
            style={{
              color: "#fff",
              opacity: 0.85,
              lineHeight: 1.6,
              fontSize: "clamp(12px, 1.1vw, 15px)",
            }}
          >
            {IMAGES[activeIndex].desc}
          </p>
          <a
            href={IMAGES[activeIndex].href}
            className="inline-flex items-center gap-2 rounded-full font-semibold mb-4 sm:mb-5"
            style={{
              backgroundColor: "#fff",
              color: IMAGES[activeIndex].bg,
              padding: "10px 18px",
              fontSize: "clamp(12px, 1vw, 14px)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              transition: `color ${DURATION}ms ${EASE}, transform 150ms ease, box-shadow 150ms ease`,
              boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 10px 24px rgba(0,0,0,0.22)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.18)";
            }}
          >
            {IMAGES[activeIndex].cta}
            <ArrowRight size={16} strokeWidth={2.5} />
          </a>
          <div className="flex gap-3">
            <NavButton onClick={() => navigate("prev")} Icon={ArrowLeft} />
            <NavButton onClick={() => navigate("next")} Icon={ArrowRight} />
          </div>
        </div>

        {/* Bottom-right */}
        <a
          href="#"
          className="absolute bottom-6 right-4 sm:bottom-20 sm:right-10 flex items-center gap-2 no-underline"
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
