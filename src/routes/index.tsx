import { createFileRoute } from "@tanstack/react-router";
import {
  Car, Calculator, MessageCircle, Gauge, Shield, Home as HomeIcon,
  ArrowRight, Sparkles, Wallet, RefreshCw, BadgeCheck, Cpu,
  Zap, FileCheck, Clock, Users, Building2, CircleDollarSign,
  TrendingUp, Bike, Truck, ChevronRight, Menu, Play, Pause,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SplitText from "@/components/SplitText";

import cardCarLoan from "@/assets/card-car-loan.jpg";
import cardHomeLoan from "@/assets/card-home-loan.jpg";
import cardCreditCard from "@/assets/card-credit-card.jpg";
import cardUsedCar from "@/assets/card-used-car.jpg";
import whyCar from "@/assets/why-car.png";
import resaleCar from "@/assets/resale-car.png";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";



export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Finonest — Drive Today. Achieve Tomorrow." },
      { name: "description", content: "India's most advanced AI-powered platform for used car loans, refinance, insurance, credit score and resale value." },
      { property: "og:title", content: "Finonest — Smart Finance for a Smarter Drive" },
      { property: "og:description", content: "AI-powered used car finance, insurance and credit intelligence." },
    ],
  }),
  component: Index,
});

function useCounter(target: number, duration = 1600) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setV(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return v;
}

function Nav() {
  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-2xl glass-strong px-5 py-3">
        <a href="#" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand text-white shadow-[var(--shadow-glow)]">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg font-bold tracking-tight">Finonest</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Drive Your Dreams</div>
          </div>
        </a>
        <nav className="hidden items-center gap-7 text-sm font-medium text-foreground/80 md:flex">
          {["Home","Loans","Insurance","Tools","Resources","About","Contact"].map(x=>(
            <a key={x} href="#" className="transition-colors hover:text-primary">{x}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button className="hidden rounded-xl border border-border bg-white/60 px-4 py-2 text-sm font-medium hover:bg-white md:inline-flex">Login</button>
          <button className="btn-shine rounded-xl bg-gradient-brand px-4 py-2 text-sm font-semibold text-white shadow-[var(--shadow-glow)]">Sign Up</button>
          <button className="md:hidden rounded-xl border border-border p-2"><Menu className="h-5 w-5"/></button>
        </div>
      </div>
    </header>
  );
}

const heroSlides = [
  {
    tag: "Auto Finance · India",
    title: "DRIVE YOUR\nDREAM CAR.",
    desc: "Finance your brand-new car with 50+ partner lenders. Rates from 8.49% p.a., zero processing fee for the first 1,000 customers this month.",
    cta: "CHECK OFFERS",
    image: cardCarLoan,
    badge: "0% PROCESSING",
    locationLabel: "Car Loan",
  },
  {
    tag: "Home Finance · India",
    title: "OWN THE\nHOME YOU LOVE.",
    desc: "Up to ₹5Cr home loans with rates starting at 7.99% p.a. Tenures up to 30 years and quick digital approval in 48 hours.",
    cta: "GET QUOTE",
    image: cardHomeLoan,
    badge: "LOW EMI",
    locationLabel: "Home Loan",
  },
  {
    tag: "Credit Cards · India",
    title: "REWARDS THAT\nWORK FOR YOU.",
    desc: "Premium credit cards from top banks with cashback up to 5%, lifetime free options and instant digital issuance in minutes.",
    cta: "APPLY NOW",
    image: cardCreditCard,
    badge: "LIFETIME FREE",
    locationLabel: "Credit Card",
  },
  {
    tag: "Used Car Loans · India",
    title: "PRE-OWNED.\nFULLY APPROVED.",
    desc: "Up to ₹50L financing on certified pre-owned cars and SUVs with rates from 9.25% p.a. Instant approval in under 2 minutes.",
    cta: "EXPLORE LOANS",
    image: cardUsedCar,
    badge: "LOWEST EMI",
    locationLabel: "Used Car Loan",
  },
];

function Hero() {
  return <HeroCarousel />;
}

function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const total = heroSlides.length;
  const DURATION = 6500;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / DURATION);
      setProgress(p);
      if (p >= 1) {
        setActive((a) => (a + 1) % total);
        setProgress(0);
      } else {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, paused, total]);

  const goto = (i: number) => {
    setActive(((i % total) + total) % total);
    setProgress(0);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    const r = containerRef.current?.getBoundingClientRect();
    if (!r) return;
    setParallax({
      x: (e.clientX - r.left) / r.width - 0.5,
      y: (e.clientY - r.top) / r.height - 0.5,
    });
  };

  const slide = heroSlides[active];
  const upcoming = [1, 2, 3].map((o) => heroSlides[(active + o) % total]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[720px] w-full overflow-hidden bg-[#fdf6ee] text-foreground"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => { setPaused(false); setParallax({ x: 0, y: 0 }); }}
      onMouseMove={onMouseMove}
    >
      {/* Soft layered light background */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 80% 20%, #ffe4e1 0%, #fff5ec 45%, #fdf6ee 80%)" }} />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          transform: `translate3d(${parallax.x * -22}px, ${parallax.y * -16}px, 0)`,
          transition: "transform .5s ease-out",
        }}
      >
        <div className="absolute right-[5%] top-[15%] h-[55vh] w-[55vh] rounded-full bg-gradient-to-br from-primary/15 via-primary/5 to-transparent blur-3xl" />
        <div className="absolute left-[5%] bottom-[10%] h-[40vh] w-[40vh] rounded-full bg-accent/15 blur-3xl" />
      </div>

      {/* Slide content */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] items-center px-6 pt-8 lg:px-10">
        <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-12">
          {/* Left copy */}
          <div className="lg:col-span-5">
            <div
              key={`copy-${active}`}
              className="animate-fade-in"
              style={{
                transform: `translate3d(${parallax.x * 16}px, ${parallax.y * 10}px, 0)`,
                transition: "transform .5s ease-out",
              }}
            >
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-foreground/60" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-foreground/70">
                  {slide.tag}
                </span>
              </div>
              <h1 className="mt-6 whitespace-pre-line font-display text-[56px] font-extrabold leading-[0.95] tracking-tight text-foreground sm:text-[72px] lg:text-[88px]">
                {slide.title}
              </h1>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted-foreground">
                {slide.desc}
              </p>
              <div className="mt-8 flex items-center gap-4">
                <button className="group inline-flex items-center gap-3 rounded-full bg-foreground/5 py-2 pl-2 pr-6 text-[11px] font-bold uppercase tracking-[0.28em] text-foreground ring-1 ring-foreground/15 transition hover:bg-foreground hover:text-white">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-brand text-white shadow-[var(--shadow-glow)] transition group-hover:bg-white group-hover:text-foreground">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                  {slide.cta}
                </button>
                <span className="hidden items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-primary sm:inline-flex">
                  <Sparkles className="h-3 w-3" /> {slide.badge}
                </span>
              </div>
            </div>
          </div>

          {/* Right: overlapping cards */}
          <div
            className="relative lg:col-span-7"
            style={{
              transform: `translate3d(${parallax.x * -24}px, ${parallax.y * -16}px, 0)`,
              transition: "transform .6s ease-out",
            }}
          >
            <div className="relative flex h-[500px] items-end justify-end pr-0 sm:h-[560px]">
              {[0, 1, 2].map((offset) => {
                const idx = (active + offset + 1) % total;
                const s = heroSlides[idx];
                const cardWidth = 240;
                const overlap = 70;
                return (
                  <button
                    key={`${active}-${idx}`}
                    onClick={() => goto(idx)}
                    className="group absolute bottom-0 overflow-hidden rounded-[36px] ring-1 ring-foreground/10 shadow-[0_40px_90px_-25px_rgba(60,30,80,0.35)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_50px_100px_-20px_rgba(60,30,80,0.45)]"
                    style={{
                      width: `${cardWidth}px`,
                      height: offset === 0 ? "520px" : "460px",
                      right: `${offset * (cardWidth - overlap) - 30}px`,
                      zIndex: 3 - offset,
                      transform: `translateY(${offset * 18}px) rotate(${(offset - 0.5) * 2}deg)`,
                      animation: `fade-in .7s ease-out ${offset * 0.12}s both`,
                    }}
                  >
                    <img
                      src={s.image}
                      alt={s.locationLabel}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                    <div className="absolute inset-x-5 bottom-5 text-left">
                      <div className="text-[9px] font-semibold uppercase tracking-[0.24em] text-white/75">
                        {s.tag.split("·")[0]?.trim()}
                      </div>
                      <div className="mt-1 font-display text-[20px] font-extrabold uppercase leading-[1.05] tracking-tight text-white">
                        {s.locationLabel}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

function SideRail() {
  const items = [
    { icon: Car, label: "Quick Apply" },
    { icon: Calculator, label: "EMI Calculator" },
    { icon: BadgeCheck, label: "Check Offers" },
    { icon: MessageCircle, label: "Chat Now" },
  ];
  return (
    <div className="pointer-events-auto absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 lg:block">
      <div className="flex flex-col items-center gap-2 rounded-2xl border border-border/60 bg-white/85 p-2 shadow-[var(--shadow-glass)] backdrop-blur">
        {items.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="group flex w-20 flex-col items-center gap-1 rounded-xl px-2 py-2 text-[10px] font-semibold text-foreground/80 transition hover:bg-primary/5"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110">
              <Icon className="h-4 w-4" />
            </span>
            <span className="leading-tight text-center">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}







function Stat({ value, suffix, label, icon, decimals = 0, hideValue = false }:{value:number;suffix:string;label:string;icon:React.ReactNode;decimals?:number;hideValue?:boolean}) {
  const v = useCounter(value);
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-primary ring-1 ring-primary/15 shadow-[var(--shadow-glass)]">{icon}</span>
      <div>
        {!hideValue && <div className="font-num text-lg font-bold leading-none">{v.toFixed(decimals)}{suffix}</div>}
        <div className={`${hideValue ? "" : "mt-1"} whitespace-pre-line text-[11px] font-semibold text-foreground/80`}>{label}</div>
      </div>
    </div>
  );
}

function Services() {
  const items: { icon: any; title: string; sub: string; color: string }[] = [
    { icon: CircleDollarSign, title: "Check Auto", sub: "Loan Offers", color: "bg-blue-50 text-blue-500 ring-blue-100" },
    { icon: FileCheck,        title: "Check & Pay", sub: "Challan",    color: "bg-amber-50 text-amber-500 ring-amber-100" },
    { icon: CircleDollarSign, title: "Check Resale", sub: "Value",     color: "bg-pink-50 text-pink-500 ring-pink-100" },
    { icon: Shield,           title: "Renew",       sub: "Insurance",  color: "bg-violet-50 text-violet-500 ring-violet-100" },
    { icon: HomeIcon,         title: "Book Home",   sub: "Inspection", color: "bg-sky-50 text-sky-500 ring-sky-100" },
    { icon: Gauge,            title: "Check Credit Score", sub: "& Offers", color: "bg-indigo-50 text-indigo-500 ring-indigo-100" },
  ];
  return (
    <section className="relative mx-auto max-w-7xl px-4 -mt-2">
      <div className="relative rounded-3xl border border-border/60 bg-white/85 p-5 shadow-[var(--shadow-glass)] backdrop-blur md:p-7">
        <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
          {items.map(({ icon: Icon, title, sub, color }) => (
            <button key={title} className="group flex flex-col items-center gap-3 rounded-2xl p-2 transition-all hover:-translate-y-1">
              <span className={`grid h-16 w-16 place-items-center rounded-full ring-1 ${color} transition-transform group-hover:scale-105`}>
                <Icon className="h-7 w-7" />
              </span>
              <div className="text-center text-xs font-semibold leading-tight text-foreground/85">
                {title}<br/>{sub}
              </div>
            </button>
          ))}
        </div>
        <button aria-label="Next services" className="absolute -right-3 top-1/2 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white shadow-[var(--shadow-glass)] ring-1 ring-border md:grid">
          <ChevronRight className="h-5 w-5 text-primary"/>
        </button>
      </div>
    </section>
  );
}


function SectionHeader({ eyebrow, title, sub }:{eyebrow:string;title:React.ReactNode;sub:string}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary backdrop-blur">{eyebrow}</div>
      <h2 className="mt-5 font-display text-4xl font-extrabold tracking-tight md:text-5xl">{title}</h2>
      <p className="mt-3 text-muted-foreground">{sub}</p>
    </div>
  );
}

function Calculator2() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-12">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-3xl glass-strong p-7 md:p-10 relative overflow-hidden">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/15 blur-3xl"/>
          <h3 className="font-display text-3xl font-bold">Check Your Auto Loan Offers</h3>
          <p className="mt-1 text-muted-foreground">Multiple lenders. Best rates. Quick approval.</p>
          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <Field label="Purpose"><select className="field"><option>Buy used car</option><option>Refinance</option><option>Top-up</option></select></Field>
            <Field label="Loan Amount"><input className="field" defaultValue="₹ 5,00,000"/></Field>
            <Field label="Car Brand"><select className="field"><option>Select brand</option><option>Maruti</option><option>Hyundai</option><option>Toyota</option><option>BMW</option></select></Field>
            <Field label="City"><select className="field"><option>Select city</option><option>Mumbai</option><option>Delhi</option><option>Bengaluru</option></select></Field>
            <div className="flex items-end">
              <button className="btn-shine inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand py-3 font-semibold text-white shadow-[var(--shadow-glow)]">
                Check Offers <ArrowRight className="h-4 w-4"/>
              </button>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { i: <CircleDollarSign className="h-4 w-4"/>, t: "Lowest Interest" },
              { i: <Zap className="h-4 w-4"/>, t: "Quick Approval 24h" },
              { i: <FileCheck className="h-4 w-4"/>, t: "Minimal Docs" },
              { i: <Clock className="h-4 w-4"/>, t: "Up to 7 Years" },
            ].map(b=>(
              <div key={b.t} className="flex items-center gap-2 rounded-xl glass-soft px-3 py-2 text-sm font-medium">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary/10 text-primary">{b.i}</span>{b.t}
              </div>
            ))}
          </div>
        </div>

        <CreditScoreCard />
      </div>
    </section>
  );
}

function Field({ label, children }:{label:string;children:React.ReactNode}) {
  return (
    <label className="block">
      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{label}</div>
      <div className="mt-1.5">{children}</div>
      <style>{`.field{width:100%;border-radius:.75rem;border:1px solid var(--input);background:rgba(255,255,255,.7);padding:.7rem .85rem;font-size:.9rem;backdrop-filter:blur(8px);outline:none}.field:focus{border-color:#4F46FF;box-shadow:0 0 0 3px rgba(79,70,255,.18)}`}</style>
    </label>
  );
}

function CreditScoreCard() {
  const score = 782;
  const v = useCounter(score, 1800);
  // arc
  const max = 850, min = 300;
  const pct = Math.min(1, Math.max(0, (v - min) / (max - min)));
  const r = 80, c = Math.PI * r;
  return (
    <div className="relative overflow-hidden rounded-3xl glass-strong p-7">
      <div className="pointer-events-none absolute -left-12 -bottom-12 h-56 w-56 rounded-full bg-accent/20 blur-3xl"/>
      <h3 className="font-display text-xl font-bold">Know Your Credit Score</h3>
      <p className="text-sm text-muted-foreground">and unlock the best offers</p>

      <div className="relative mt-4 grid place-items-center">
        <svg viewBox="0 0 220 130" className="w-full max-w-[260px]">
          <defs>
            <linearGradient id="grad" x1="0" x2="1">
              <stop offset="0%" stopColor="#4F46FF"/>
              <stop offset="50%" stopColor="#7C3AED"/>
              <stop offset="100%" stopColor="#00D084"/>
            </linearGradient>
          </defs>
          <path d="M20 110 A 90 90 0 0 1 200 110" fill="none" stroke="rgba(79,70,255,.12)" strokeWidth="14" strokeLinecap="round"/>
          <path d="M20 110 A 90 90 0 0 1 200 110" fill="none" stroke="url(#grad)" strokeWidth="14" strokeLinecap="round"
            strokeDasharray={`${c}`} strokeDashoffset={`${c * (1 - pct)}`} />
        </svg>
        <div className="-mt-10 text-center">
          <div className="font-num text-5xl font-extrabold tracking-tight">{Math.round(v)}</div>
          <div className="text-sm font-semibold text-success">Excellent</div>
        </div>
      </div>
      <button className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">Check Now <ArrowRight className="h-4 w-4"/></button>
    </div>
  );
}

function Resale() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-10">
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-white/80 shadow-[var(--shadow-glass)] backdrop-blur p-8 md:p-12">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative grid items-center gap-8 md:grid-cols-2">
          <div>
            <h3 className="font-display text-3xl font-extrabold md:text-4xl">
              Get the Best <span className="text-gradient">Value</span> for Your Car
            </h3>
            <p className="mt-3 max-w-md text-base text-muted-foreground">
              Check resale value of your used car in just a few clicks.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button className="btn-shine inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-3 text-sm font-semibold text-white shadow-[var(--shadow-glow)]">
                Check Resale Value <ChevronRight className="h-4 w-4"/>
              </button>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {[
                { i: <Zap className="h-3.5 w-3.5"/>, t: "Instant" },
                { i: <Sparkles className="h-3.5 w-3.5"/>, t: "Accurate" },
                { i: <BadgeCheck className="h-3.5 w-3.5"/>, t: "Reliable" },
              ].map(c => (
                <span key={c.t} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/85 px-3 py-1 text-xs font-semibold text-foreground/80">
                  <span className="text-primary">{c.i}</span>{c.t}
                </span>
              ))}
            </div>
          </div>
          <div className="relative grid place-items-center">
            <div className="pointer-events-none absolute inset-0 -z-10 mx-auto h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
            <img
              src={resaleCar}
              alt="Car resale value"
              width={400}
              height={300}
              loading="lazy"
              className="relative z-10 w-full max-w-[320px] car-depth transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function BottomTriple() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-12">
      <div className="grid items-stretch gap-6 lg:grid-cols-3">
        <BlogCard />
        <WhyCard />
        <RatesCard />
      </div>
    </section>
  );
}

const TRIPLE_CARD =
  "group flex h-full flex-col rounded-3xl border border-border/60 bg-white/90 p-5 shadow-[var(--shadow-glass)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_-30px_rgba(79,70,255,0.25)]";

function BlogCard() {
  const posts = [
    { img: blog1, cat: "Auto Industry",  catColor: "bg-amber-50 text-amber-600",   date: "May 15, 2026", title: "Future of EV in India: What to Expect in 2026 & Beyond", read: "5 min read" },
    { img: blog2, cat: "Finance Tips",   catColor: "bg-emerald-50 text-emerald-600", date: "May 10, 2026", title: "5 Smart Tips to Get the Best Auto Loan in 2026",        read: "4 min read" },
    { img: blog3, cat: "Market Insights",catColor: "bg-violet-50 text-violet-600",  date: "May 05, 2026", title: "Auto Loan Trends: Key Insights You Should Know",          read: "6 min read" },
  ];
  return (
    <div className={TRIPLE_CARD}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-lg font-bold">Latest from the Blog</h3>
        <a href="#" className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition-transform hover:translate-x-0.5">View All <ArrowRight className="h-3.5 w-3.5"/></a>
      </div>
      <ul className="flex-1 space-y-3">
        {posts.map((p, i) => (
          <li key={i} className="flex items-start gap-3 rounded-2xl p-2 transition hover:bg-primary/5">
            <img src={p.img} alt={p.title} width={120} height={90} loading="lazy" className="h-16 w-20 shrink-0 rounded-xl object-cover transition-transform duration-300 hover:scale-105"/>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2 text-[10px]">
                <span className={`rounded-full px-2 py-0.5 font-bold uppercase tracking-widest ${p.catColor}`}>{p.cat}</span>
                <span className="text-muted-foreground">{p.date}</span>
              </div>
              <div className="mt-1 line-clamp-2 text-sm font-semibold leading-snug">{p.title}</div>
              <div className="mt-0.5 text-[11px] text-muted-foreground">{p.read}</div>
            </div>
          </li>
        ))}
      </ul>
      <a href="#" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-transform hover:translate-x-0.5">Explore More Articles <ArrowRight className="h-4 w-4"/></a>
    </div>
  );
}

function WhyCard() {
  const features = [
    "Specialized in Auto Finance",
    "50+ Trusted Lending Partners",
    "Competitive Interest Rates",
    "Quick Processing & Disbursal",
    "End-to-End Digital Experience",
    "Expert Support at Every Step",
  ];
  return (
    <div className={`${TRIPLE_CARD} relative overflow-hidden`}>
      <h3 className="text-center font-display text-lg font-bold">Why Choose Finonest?</h3>
      <div className="relative my-2 grid place-items-center">
        <div className="pointer-events-none absolute inset-0 -z-10 mx-auto h-40 w-40 rounded-full bg-primary/10 blur-3xl"/>
        <img
          src={whyCar}
          alt="Transparent car cutaway"
          width={1280}
          height={1024}
          loading="lazy"
          className="w-full max-w-[260px] car-depth transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <ul className="mt-2 space-y-2">
        {features.map(f => (
          <li key={f} className="flex items-center gap-2 text-sm font-medium text-foreground/85">
            <BadgeCheck className="h-4 w-4 shrink-0 text-primary"/> {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

function RatesCard() {
  const rates = [
    { icon: Car,   t: "New Car Loan",            v: "8.49%*",  color: "bg-blue-50 text-blue-500",    valueColor: "text-blue-500" },
    { icon: Car,   t: "Used Car Loan",           v: "9.25%*",  color: "bg-amber-50 text-amber-500",  valueColor: "text-amber-500" },
    { icon: Bike,  t: "Two Wheeler Loan",        v: "10.50%*", color: "bg-pink-50 text-pink-500",    valueColor: "text-pink-500" },
    { icon: Truck, t: "Commercial Vehicle Loan", v: "9.75%*",  color: "bg-violet-50 text-violet-500",valueColor: "text-violet-500" },
  ];
  return (
    <div className={TRIPLE_CARD}>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-display text-lg font-bold">Current Interest Rates</h3>
        <a href="#" className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition-transform hover:translate-x-0.5">View All <ArrowRight className="h-3.5 w-3.5"/></a>
      </div>
      <ul className="flex-1 divide-y divide-border/60">
        {rates.map(({ icon: Icon, t, v, color, valueColor }) => (
          <li key={t} className="flex items-center justify-between gap-3 py-3 transition hover:bg-primary/5 px-1 rounded-xl">
            <div className="flex items-center gap-3">
              <span className={`grid h-10 w-10 place-items-center rounded-full ${color}`}>
                <Icon className="h-5 w-5"/>
              </span>
              <div>
                <div className="text-sm font-semibold leading-tight">{t}</div>
                <div className="text-[11px] text-muted-foreground">Starting from</div>
              </div>
            </div>
            <div className={`font-num text-lg font-extrabold ${valueColor}`}>{v}</div>
          </li>
        ))}
      </ul>
      <div className="mt-3 text-right text-[10px] text-muted-foreground">* T&amp;C Apply</div>
    </div>
  );
}




function Partners() {
  const list = ["HDFC Bank","ICICI Bank","Axis Bank","Bajaj Finserv","Tata Capital","Kotak","SBI","Digit Insurance","IDFC First","Yes Bank"];
  const row = [...list, ...list];
  return (
    <section className="relative py-20">
      <SectionHeader eyebrow="Trusted Partners" title={<>Our <span className="text-gradient">Lending & Insurance</span> Partners</>} sub="50+ banks and NBFCs powering instant offers."/>
      <div className="mt-12 overflow-hidden">
        <div className="flex w-max animate-marquee gap-5 px-4">
          {row.map((p,i)=>(
            <div key={i} className="flex h-20 w-52 shrink-0 items-center justify-center rounded-2xl glass card-lift">
              <span className="font-display text-lg font-bold tracking-tight text-foreground/80">{p}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 pb-24">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-brand p-10 md:p-16 text-white shadow-[var(--shadow-lift)]">
        <div className="pointer-events-none absolute -left-10 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-white/10 blur-3xl"/>
        <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-accent/40 blur-3xl"/>
        <div className="relative grid items-center gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-display text-4xl font-extrabold md:text-5xl">Ready to drive your dream car?</h3>
            <p className="mt-3 max-w-lg text-white/85">Get pre-approved in 24 hours with the lowest rates from India's most trusted lenders.</p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <button className="btn-shine inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 font-semibold text-primary">Get Loan Offers <ArrowRight className="h-4 w-4"/></button>
            <button className="inline-flex items-center gap-2 rounded-2xl border border-white/40 bg-white/10 px-6 py-3.5 font-semibold text-white backdrop-blur hover:bg-white/20">Talk to AI Assistant</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-white/60 backdrop-blur">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand text-white"><Sparkles className="h-5 w-5"/></div>
            <div className="font-display text-xl font-bold">Finonest</div>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">Smart finance for a smarter drive. AI-powered loans, insurance and intelligence.</p>
        </div>
        {[
          { t:"Loans", l:["Used Car Loan","Refinance","Top-Up","EMI Calculator"]},
          { t:"Tools", l:["Credit Score","Resale Value","Insurance","Challan"]},
          { t:"Company", l:["About","Careers","Contact","Blog"]},
        ].map(c=>(
          <div key={c.t}>
            <div className="font-display text-sm font-bold uppercase tracking-[0.18em]">{c.t}</div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {c.l.map(x=><li key={x}><a className="hover:text-primary" href="#">{x}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Finonest. All rights reserved.</div>
    </footer>
  );
}

function Index() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            gsap.fromTo(
              e.target,
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }
            );
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="bg-mesh min-h-screen">
      <Nav />
      <main>
        <Hero />
        <div data-reveal><Services /></div>
        <div data-reveal><Calculator2 /></div>
        <div data-reveal><Resale /></div>
        <div data-reveal><BottomTriple /></div>
        <div data-reveal><Partners /></div>
        <div data-reveal><CTA /></div>
      </main>
      <Footer />
    </div>
  );
}
