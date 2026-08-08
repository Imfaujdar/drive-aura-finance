import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import HeroRenderer from "@/components/hero/HeroRenderer";
import {
  HERO_SLIDES,
  defaultSlideLayouts,
  deviceForWidth,
  normaliseLayouts,
  type DeviceKey,
  type SlideLayouts,
} from "@/lib/hero-slides";
import { listHeroLayouts } from "@/lib/hero-layouts.functions";

const AUTOPLAY_MS = 4000;
const DURATION = 650;

/** Picks the saved layout for the current viewport — never recalculates one. */
export function useDeviceKey(): DeviceKey {
  const [device, setDevice] = useState<DeviceKey>("desktop");
  useEffect(() => {
    const update = () => setDevice(deviceForWidth(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return device;
}

export default function ToonhubHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const device = useDeviceKey();
  const fetchLayouts = useServerFn(listHeroLayouts);

  const { data } = useQuery({
    queryKey: ["hero-layouts"],
    queryFn: () => fetchLayouts(),
    staleTime: 60_000,
  });

  const layoutsBySlide = useMemo(() => {
    const map: Record<string, SlideLayouts> = {};
    for (const slide of HERO_SLIDES) {
      const raw = data?.[slide.id];
      map[slide.id] = raw
        ? normaliseLayouts(JSON.parse(raw)).layouts
        : defaultSlideLayouts();
    }
    return map;
  }, [data]);

  useEffect(() => {
    HERO_SLIDES.forEach((s) => {
      const img = new Image();
      img.src = s.src;
    });
  }, []);

  const slide = HERO_SLIDES[activeIndex];

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--hero-accent", slide.bg);
    root.style.setProperty("--hero-accent-soft", slide.panel);
  }, [slide]);

  useEffect(() => {
    if (isPaused) return;
    const id = window.setInterval(
      () => setActiveIndex((p) => (p + HERO_SLIDES.length - 1) % HERO_SLIDES.length),
      AUTOPLAY_MS,
    );
    return () => window.clearInterval(id);
  }, [isPaused]);

  return (
    <section
      data-page-section
      className="relative w-full overflow-hidden snap-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <HeroRenderer
        key={`${slide.id}-${device}`}
        slide={slide}
        layout={layoutsBySlide[slide.id][device]}
        index={activeIndex}
        total={HERO_SLIDES.length}
        onPrev={() =>
          setActiveIndex((p) => (p + HERO_SLIDES.length - 1) % HERO_SLIDES.length)
        }
        onNext={() => setActiveIndex((p) => (p + 1) % HERO_SLIDES.length)}
        style={{ width: "100%", height: "100vh", transitionDuration: `${DURATION}ms` }}
      />
    </section>
  );
}
