import heroUsedCar from "@/assets/hero-mascot-usedcar-v2.png";
import heroLoanAgainstCar from "@/assets/hero-mascot-loanagainstcar.png";
import heroNewCar from "@/assets/hero-mascot-newcar-v2.png";
import heroCommercial from "@/assets/hero-mascot-commercial.png";
import heroConstruction from "@/assets/hero-mascot-construction.png";
import heroTractor from "@/assets/hero-mascot-tractor.png";

/* ------------------------------------------------------------------ */
/*  Devices — four fully independent design canvases                    */
/* ------------------------------------------------------------------ */

export const DEVICES = ["desktop", "laptop", "tablet", "mobile"] as const;
export type DeviceKey = (typeof DEVICES)[number];

export const DEVICE_CANVASES: Record<
  DeviceKey,
  { label: string; width: number; height: number; minWidth: number }
> = {
  desktop: { label: "Desktop", width: 1920, height: 1080, minWidth: 1440 },
  laptop: { label: "Laptop", width: 1440, height: 900, minWidth: 1024 },
  tablet: { label: "Tablet", width: 768, height: 1024, minWidth: 768 },
  mobile: { label: "Mobile", width: 390, height: 844, minWidth: 0 },
};

/** Breakpoint detection: >=1440 desktop, 1024-1439 laptop, 768-1023 tablet, <768 mobile */
export function deviceForWidth(w: number): DeviceKey {
  if (w >= 1440) return "desktop";
  if (w >= 1024) return "laptop";
  if (w >= 768) return "tablet";
  return "mobile";
}

/* ------------------------------------------------------------------ */
/*  Element model                                                       */
/* ------------------------------------------------------------------ */

export const ELEMENT_IDS = [
  "watermark",
  "mascot",
  "eyebrow",
  "title",
  "description",
  "cta",
  "nav",
  "pills",
  "stats",
  "vertical",
] as const;
export type ElementId = (typeof ELEMENT_IDS)[number];

export const ELEMENT_LABELS: Record<ElementId, string> = {
  watermark: "Watermark text",
  mascot: "Mascot / vehicle",
  eyebrow: "Slide counter",
  title: "Title",
  description: "Description",
  cta: "CTA button",
  nav: "Prev / next buttons",
  pills: "Feature pills",
  stats: "Stats card",
  vertical: "Vertical text",
};

export type ElementLayout = {
  /** left edge, % of canvas width */
  x: number;
  /** top edge, % of canvas height */
  y: number;
  /** width, % of canvas width */
  width: number;
  visible: boolean;
  zIndex: number;
  /** design font size in px, relative to the device canvas */
  fontSize: number;
  align: "left" | "center" | "right";
};

export type DeviceLayout = {
  width: number;
  height: number;
  elements: Record<ElementId, ElementLayout>;
};

export type SlideLayouts = Record<DeviceKey, DeviceLayout>;

export type HeroSlide = {
  id: string;
  src: string;
  bg: string;
  panel: string;
  ghost: string;
  title: string;
  desc: string;
  cta: string;
  href: string;
  mascotSide: "left" | "right";
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "used-car-loan",
    src: heroUsedCar,
    bg: "#F4845F",
    panel: "#F79B7F",
    ghost: "USED CAR",
    title: "USED CAR LOAN",
    desc: "Finance any pre-owned car with confidence. Transparent valuation, instant eligibility check and best-in-class rates.",
    cta: "Check Used Car Offers",
    href: "/loans/used-car",
    mascotSide: "right",
  },
  {
    id: "loan-against-car",
    src: heroLoanAgainstCar,
    bg: "#E882B4",
    panel: "#ED9DC4",
    ghost: "LOAN AGAINST CAR",
    title: "LOAN AGAINST CAR",
    desc: "Unlock the value of your existing car. Get instant cash with minimal documentation while you continue to drive your vehicle.",
    cta: "Get Loan Against Car",
    href: "/loans/loan-against-car",
    mascotSide: "left",
  },
  {
    id: "new-car-loan",
    src: heroNewCar,
    bg: "#6EB5FF",
    panel: "#8DC4FF",
    ghost: "NEW CAR",
    title: "NEW CAR LOAN",
    desc: "Drive home your dream car with Finonest. Quick approvals, lowest interest rates and flexible tenures on every new car brand.",
    cta: "Get Car Loan Offers",
    href: "/loans/car",
    mascotSide: "right",
  },
  {
    id: "commercial-vehicle-loan",
    src: heroCommercial,
    bg: "#6BBF7A",
    panel: "#85CC92",
    ghost: "COMMERCIAL",
    title: "COMMERCIAL VEHICLE LOAN",
    desc: "Power your business on the road. Finance trucks, buses, tempos and fleet vehicles with flexible tenures and competitive rates.",
    cta: "Finance My Vehicle",
    href: "/loans/commercial-vehicle",
    mascotSide: "left",
  },
  {
    id: "construction-equipment-loan",
    src: heroConstruction,
    bg: "#F2B441",
    panel: "#F5C56A",
    ghost: "CONSTRUCTION",
    title: "CONSTRUCTION EQUIPMENT LOAN",
    desc: "Build bigger with Finonest. Finance excavators, loaders, cranes and tractors with fast approvals and easy EMIs.",
    cta: "Get Equipment Loan",
    href: "/loans/construction-equipment",
    mascotSide: "right",
  },
  {
    id: "tractor-loan",
    src: heroTractor,
    bg: "#5BAE6A",
    panel: "#7BC089",
    ghost: "TRACTOR",
    title: "TRACTOR LOAN",
    desc: "Grow your farm with Finonest. Finance any tractor brand with minimal paperwork, subsidies and farmer-friendly EMIs.",
    cta: "Get Tractor Loan",
    href: "/loans/tractor",
    mascotSide: "left",
  },
];

/* ------------------------------------------------------------------ */
/*  Default (factory) layouts — one explicit composition per device     */
/* ------------------------------------------------------------------ */

const el = (
  x: number,
  y: number,
  width: number,
  fontSize: number,
  zIndex: number,
  visible = true,
  align: ElementLayout["align"] = "left",
): ElementLayout => ({ x, y, width, visible, zIndex, fontSize, align });

const DESKTOP_ELEMENTS: Record<ElementId, ElementLayout> = {
  watermark: el(4, 12, 90, 260, 2),
  mascot: el(52, 6, 46, 16, 20),
  eyebrow: el(6, 40, 30, 14, 60),
  title: el(6, 45, 30, 62, 60),
  description: el(6, 62, 26, 18, 60),
  cta: el(6, 75, 18, 14, 60),
  nav: el(6, 83, 16, 14, 60),
  pills: el(72, 12, 22, 14, 55),
  stats: el(72, 34, 22, 14, 55),
  vertical: el(96, 30, 3, 11, 55),
};

const LAPTOP_ELEMENTS: Record<ElementId, ElementLayout> = {
  watermark: el(4, 13, 92, 200, 2),
  mascot: el(50, 8, 48, 16, 20),
  eyebrow: el(6, 41, 34, 13, 60),
  title: el(6, 46, 34, 50, 60),
  description: el(6, 63, 30, 16, 60),
  cta: el(6, 76, 21, 13, 60),
  nav: el(6, 84, 18, 13, 60),
  pills: el(70, 13, 25, 13, 55),
  stats: el(70, 36, 25, 13, 55),
  vertical: el(96, 32, 3, 10, 55),
};

const TABLET_ELEMENTS: Record<ElementId, ElementLayout> = {
  watermark: el(5, 8, 92, 110, 2),
  mascot: el(18, 22, 68, 16, 20),
  eyebrow: el(6, 58, 60, 13, 60),
  title: el(6, 62, 78, 44, 60),
  description: el(6, 71, 78, 16, 60),
  cta: el(6, 80, 44, 13, 60),
  nav: el(6, 87, 34, 13, 60),
  pills: el(56, 8, 40, 12, 55),
  stats: el(56, 88, 40, 12, 55),
  vertical: el(96, 40, 3, 10, 55, false),
};

const MOBILE_ELEMENTS: Record<ElementId, ElementLayout> = {
  watermark: el(5, 7, 92, 62, 2),
  mascot: el(14, 18, 74, 16, 20),
  eyebrow: el(6, 56, 60, 12, 60),
  title: el(6, 60, 88, 32, 60),
  description: el(6, 70, 88, 13, 60),
  cta: el(6, 80, 88, 12, 60, true, "center"),
  nav: el(6, 88, 50, 12, 60),
  pills: el(6, 4, 88, 11, 55, false),
  stats: el(56, 4, 40, 11, 55, false),
  vertical: el(96, 40, 3, 10, 55, false),
};

export function defaultLayoutFor(device: DeviceKey): DeviceLayout {
  const canvas = DEVICE_CANVASES[device];
  const elements =
    device === "desktop"
      ? DESKTOP_ELEMENTS
      : device === "laptop"
        ? LAPTOP_ELEMENTS
        : device === "tablet"
          ? TABLET_ELEMENTS
          : MOBILE_ELEMENTS;
  return {
    width: canvas.width,
    height: canvas.height,
    elements: JSON.parse(JSON.stringify(elements)) as Record<ElementId, ElementLayout>,
  };
}

export function defaultSlideLayouts(): SlideLayouts {
  return {
    desktop: defaultLayoutFor("desktop"),
    laptop: defaultLayoutFor("laptop"),
    tablet: defaultLayoutFor("tablet"),
    mobile: defaultLayoutFor("mobile"),
  };
}

/** Normalises a stored jsonb blob into a complete SlideLayouts object. */
export function normaliseLayouts(raw: unknown): {
  layouts: SlideLayouts;
  configured: Record<DeviceKey, boolean>;
} {
  const base = defaultSlideLayouts();
  const configured: Record<DeviceKey, boolean> = {
    desktop: false,
    laptop: false,
    tablet: false,
    mobile: false,
  };
  const obj = (raw ?? {}) as Partial<Record<DeviceKey, Partial<DeviceLayout>>>;
  for (const device of DEVICES) {
    const stored = obj[device];
    if (!stored || !stored.elements) continue;
    configured[device] = true;
    const merged = base[device];
    merged.width = stored.width ?? merged.width;
    merged.height = stored.height ?? merged.height;
    for (const id of ELEMENT_IDS) {
      const s = (stored.elements as Partial<Record<ElementId, Partial<ElementLayout>>>)[id];
      if (s) merged.elements[id] = { ...merged.elements[id], ...s };
    }
  }
  return { layouts: base, configured };
}
