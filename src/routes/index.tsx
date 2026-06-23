import { createFileRoute } from "@tanstack/react-router";
import {
  Car, Calculator, MessageCircle, Gauge, Shield, Home as HomeIcon,
  ArrowRight, Sparkles, BadgeCheck,
  Zap, FileCheck, Clock, Users, CircleDollarSign,
  Bike, Truck, ChevronRight,
  Headphones, Building2, Eye, Wallet, Quote, Star, Handshake, TrendingUp, Rocket,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import gsap from "gsap";
import ToonhubHero from "@/components/ToonhubHero";
import Navbar from "@/components/Navbar";
import Typewriter from "@/components/Typewriter";

import whyCar from "@/assets/why-car.png";
import resaleCar from "@/assets/resale-car.png";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Finonest — Smart Loans & Credit Cards" },
      { name: "description", content: "Compare and apply for car loans, home loans, personal loans and premium credit cards on Finonest." },
      { property: "og:title", content: "Finonest — Smart Loans & Credit Cards" },
      { property: "og:description", content: "AI-powered loans, insurance and credit intelligence." },
    ],
  }),
  component: HomePage,
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

function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: ReactNode; sub: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary backdrop-blur">{eyebrow}</div>
      <h2 className="mt-5 font-display text-4xl font-extrabold tracking-tight md:text-5xl">{title}</h2>
      <p className="mt-3 text-muted-foreground">{sub}</p>
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
    <section className="relative mx-auto max-w-7xl px-4 pt-12">
      <div className="relative rounded-3xl border border-border/60 bg-white/85 p-5 shadow-[var(--shadow-glass)] backdrop-blur md:p-7">
        <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
          {items.map(({ icon: Icon, title, sub, color }) => (
            <button key={title} className="group flex flex-col items-center gap-3 rounded-2xl p-2 transition-all hover:-translate-y-1">
              <span className={`grid h-16 w-16 place-items-center rounded-full ring-1 ${color} transition-transform group-hover:scale-105`}>
                <Icon className="h-7 w-7" />
              </span>
              <div className="text-center text-xs font-semibold leading-tight text-foreground/85">
                {title}<br />{sub}
              </div>
            </button>
          ))}
        </div>
        <button aria-label="Next services" className="absolute -right-3 top-1/2 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white shadow-[var(--shadow-glass)] ring-1 ring-border md:grid">
          <ChevronRight className="h-5 w-5 text-primary" />
        </button>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
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
  const max = 850, min = 300;
  const pct = Math.min(1, Math.max(0, (v - min) / (max - min)));
  const r = 80, c = Math.PI * r;
  return (
    <div className="relative overflow-hidden rounded-3xl glass-strong p-7">
      <div className="pointer-events-none absolute -left-12 -bottom-12 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />
      <h3 className="font-display text-xl font-bold">Know Your Credit Score</h3>
      <p className="text-sm text-muted-foreground">and unlock the best offers</p>
      <div className="relative mt-4 grid place-items-center">
        <svg viewBox="0 0 220 130" className="w-full max-w-[260px]">
          <defs>
            <linearGradient id="grad" x1="0" x2="1">
              <stop offset="0%" stopColor="#4F46FF" />
              <stop offset="50%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#00D084" />
            </linearGradient>
          </defs>
          <path d="M20 110 A 90 90 0 0 1 200 110" fill="none" stroke="rgba(79,70,255,.12)" strokeWidth="14" strokeLinecap="round" />
          <path d="M20 110 A 90 90 0 0 1 200 110" fill="none" stroke="url(#grad)" strokeWidth="14" strokeLinecap="round"
            strokeDasharray={`${c}`} strokeDashoffset={`${c * (1 - pct)}`} />
        </svg>
        <div className="-mt-10 text-center">
          <div className="font-num text-5xl font-extrabold tracking-tight">{Math.round(v)}</div>
          <div className="text-sm font-semibold text-emerald-600">Excellent</div>
        </div>
      </div>
      <button className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">Check Now <ArrowRight className="h-4 w-4" /></button>
    </div>
  );
}

function CalculatorSection() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-12">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-3xl glass-strong p-7 md:p-10 relative overflow-hidden">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <h3 className="font-display text-3xl font-bold">Check Your Auto Loan Offers</h3>
          <p className="mt-1 text-muted-foreground">Multiple lenders. Best rates. Quick approval.</p>
          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <Field label="Purpose"><select className="field"><option>Buy used car</option><option>Refinance</option><option>Top-up</option></select></Field>
            <Field label="Loan Amount"><input className="field" defaultValue="₹ 5,00,000" /></Field>
            <Field label="Car Brand"><select className="field"><option>Select brand</option><option>Maruti</option><option>Hyundai</option><option>Toyota</option><option>BMW</option></select></Field>
            <Field label="City"><select className="field"><option>Select city</option><option>Mumbai</option><option>Delhi</option><option>Bengaluru</option></select></Field>
            <div className="flex items-end">
              <button className="btn-shine inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand py-3 font-semibold text-white shadow-[var(--shadow-glow)]">
                Check Offers <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { i: <CircleDollarSign className="h-4 w-4" />, t: "Lowest Interest" },
              { i: <Zap className="h-4 w-4" />, t: "Quick Approval 24h" },
              { i: <FileCheck className="h-4 w-4" />, t: "Minimal Docs" },
              { i: <Clock className="h-4 w-4" />, t: "Up to 7 Years" },
            ].map(b => (
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

function HowItWorks() {
  const steps = [
    { n: "01", icon: FileCheck, title: "Apply Online", sub: "Fill our simple online form in 5 minutes with basic details." },
    { n: "02", icon: Eye, title: "Document Verification", sub: "Upload digitally or opt for doorstep pickup by our executive." },
    { n: "03", icon: BadgeCheck, title: "Quick Approval", sub: "Get approved within 24 hours of document verification." },
    { n: "04", icon: Wallet, title: "Loan Disbursement", sub: "Amount credited to your bank within 48 hours of approval." },
  ];
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-16">
      <SectionHeader eyebrow="How It Works" title={<>Get Your Loan in <span className="text-primary">4 Simple Steps</span></>} sub="Our streamlined process gets your funds quickly with minimum hassle." />
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {steps.map(({ n, icon: Icon, title, sub }, i) => (
          <div key={n} className="group relative rounded-3xl glass-strong p-6 transition-all hover:-translate-y-1">
            <div className="absolute -top-3 left-6 rounded-full bg-gradient-brand px-3 py-1 text-xs font-bold tracking-widest text-white shadow-[var(--shadow-glow)]">STEP {n}</div>
            <div className="mt-3 grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
              <Icon className="h-7 w-7" />
            </div>
            <h3 className="mt-5 font-display text-xl font-bold">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{sub}</p>
            {i < steps.length - 1 && (
              <ChevronRight className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-primary/40 lg:block" />
            )}
          </div>
        ))}
      </div>
    </section>
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
                Check Resale Value <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {[
                { i: <Zap className="h-3.5 w-3.5" />, t: "Instant" },
                { i: <Sparkles className="h-3.5 w-3.5" />, t: "Accurate" },
                { i: <BadgeCheck className="h-3.5 w-3.5" />, t: "Reliable" },
              ].map(c => (
                <span key={c.t} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/85 px-3 py-1 text-xs font-semibold text-foreground/80">
                  <span className="text-primary">{c.i}</span>{c.t}
                </span>
              ))}
            </div>
          </div>
          <div className="relative grid place-items-center">
            <div className="pointer-events-none absolute inset-0 -z-10 mx-auto h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
            <img src={resaleCar} alt="Car resale value" width={400} height={300} loading="lazy"
              className="relative z-10 w-full max-w-[320px] car-depth transition-transform duration-500 hover:scale-105" />
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const items = [
    { icon: Zap, title: "Quick Approval", sub: "Get approved within 24 hours with minimal documentation.", c: "from-blue-500/10 to-blue-500/0 text-blue-600" },
    { icon: FileCheck, title: "Simple Process", sub: "Easy online application with doorstep document collection.", c: "from-emerald-500/10 to-emerald-500/0 text-emerald-600" },
    { icon: TrendingUp, title: "Best Rates", sub: "Competitive interest rates with flexible repayment options.", c: "from-amber-500/10 to-amber-500/0 text-amber-600" },
    { icon: Headphones, title: "24/7 Support", sub: "Dedicated relationship managers for personalised assistance.", c: "from-pink-500/10 to-pink-500/0 text-pink-600" },
    { icon: Building2, title: "50+ Bank Partners", sub: "Wide network of banking partners for the best loan offers.", c: "from-violet-500/10 to-violet-500/0 text-violet-600" },
    { icon: Shield, title: "100% Transparent", sub: "No hidden charges or processing-fee surprises. Ever.", c: "from-sky-500/10 to-sky-500/0 text-sky-600" },
  ];
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-16">
      <SectionHeader eyebrow="Why Choose Us" title={<>We Make Financial Freedom <span className="text-primary">Accessible</span></>} sub="Over 5 years of experience and 50,000+ satisfied customers — Finonest is India's trusted partner for every financial need." />
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map(({ icon: Icon, title, sub, c }) => (
          <div key={title} className="relative overflow-hidden rounded-3xl border border-border/60 bg-white/80 p-6 shadow-[var(--shadow-glass)] backdrop-blur transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
            <div className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${c} blur-2xl`} />
            <div className={`grid h-12 w-12 place-items-center rounded-xl bg-white ring-1 ring-border ${c.split(" ").pop()}`}>
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 font-display text-lg font-bold">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{sub}</p>
          </div>
        ))}
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
        <a href="#" className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition-transform hover:translate-x-0.5">View All <ArrowRight className="h-3.5 w-3.5" /></a>
      </div>
      <ul className="flex-1 space-y-3">
        {posts.map((p, i) => (
          <li key={i} className="flex items-start gap-3 rounded-2xl p-2 transition hover:bg-primary/5">
            <img src={p.img} alt={p.title} width={120} height={90} loading="lazy" className="h-16 w-20 shrink-0 rounded-xl object-cover transition-transform duration-300 hover:scale-105" />
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
      <a href="#" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-transform hover:translate-x-0.5">Explore More Articles <ArrowRight className="h-4 w-4" /></a>
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
        <div className="pointer-events-none absolute inset-0 -z-10 mx-auto h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
        <img src={whyCar} alt="Transparent car cutaway" width={1280} height={1024} loading="lazy"
          className="w-full max-w-[260px] car-depth transition-transform duration-500 group-hover:scale-105" />
      </div>
      <ul className="mt-2 space-y-2">
        {features.map(f => (
          <li key={f} className="flex items-center gap-2 text-sm font-medium text-foreground/85">
            <BadgeCheck className="h-4 w-4 shrink-0 text-primary" /> {f}
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
    { icon: Truck, t: "Commercial Vehicle Loan", v: "9.75%*",  color: "bg-violet-50 text-violet-500", valueColor: "text-violet-500" },
  ];
  return (
    <div className={TRIPLE_CARD}>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-display text-lg font-bold">Current Interest Rates</h3>
        <a href="#" className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition-transform hover:translate-x-0.5">View All <ArrowRight className="h-3.5 w-3.5" /></a>
      </div>
      <ul className="flex-1 divide-y divide-border/60">
        {rates.map(({ icon: Icon, t, v, color, valueColor }) => (
          <li key={t} className="flex items-center justify-between gap-3 py-3 transition hover:bg-primary/5 px-1 rounded-xl">
            <div className="flex items-center gap-3">
              <span className={`grid h-10 w-10 place-items-center rounded-full ${color}`}>
                <Icon className="h-5 w-5" />
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

function Testimonials() {
  const reviews = [
    { name: "Rahul Sharma", role: "Used Car Loan", text: "Finonest delivered excellent service across multiple products. Every interaction has been smooth, professional and customer-focused." },
    { name: "Priya Verma", role: "Home Loan", text: "The team explained documentation clearly and guided me through every stage. Approval updates were shared regularly — completely stress-free." },
    { name: "Arjun Mehta", role: "DSA Partner", text: "As a DSA partner, I value strong communication. Finonest is always available for support and ensures smooth coordination on every case." },
    { name: "Neha Kapoor", role: "Personal Loan", text: "Applied for a personal loan and appreciated how professionally everything was handled. Transparent, supportive and quick — highly recommend." },
    { name: "Vikram Singh", role: "Business Loan", text: "My client received a business loan through Finonest with zero hassle. The team understood the requirement and closed it efficiently." },
    { name: "Anita Desai", role: "Loan Against Property", text: "Impressed by how clearly everything was explained. The entire experience felt reliable, well-managed and genuinely customer-first." },
  ];
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-16">
      <SectionHeader eyebrow="Top Testimonials" title={<>What Our <span className="text-primary">Customers Say</span></>} sub="Ranked by customer satisfaction and feedback quality." />
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r, i) => (
          <div key={r.name} className="relative rounded-3xl border border-border/60 bg-white/80 p-6 shadow-[var(--shadow-glass)] backdrop-blur transition-all hover:-translate-y-1">
            <Quote className="absolute right-5 top-5 h-8 w-8 text-primary/15" />
            <div className="flex items-center gap-1 text-amber-500">
              {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85">"{r.text}"</p>
            <div className="mt-6 flex items-center gap-3 border-t border-border/60 pt-4">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-brand font-bold text-white">{r.name.charAt(0)}</div>
              <div>
                <div className="text-sm font-semibold">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.role} · #{i + 1} Verified Review</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function DSAPartner() {
  const perks = [
    { icon: Wallet, t: "Zero Investment", s: "Start earning without any upfront costs." },
    { icon: Sparkles, t: "Multiple Products", s: "8+ loan products to offer customers." },
    { icon: TrendingUp, t: "High Earnings", s: "Attractive commissions on every disbursal." },
    { icon: Rocket, t: "Quick Start", s: "Simple online registration process." },
  ];
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-16">
      <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-white/80 p-8 shadow-[var(--shadow-glass)] backdrop-blur md:p-12">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <Handshake className="h-3.5 w-3.5" /> Business Opportunity
            </div>
            <h2 className="mt-5 font-display text-4xl font-extrabold tracking-tight md:text-5xl">Start Your Loan Business with <span className="text-primary">Finonest</span></h2>
            <p className="mt-4 max-w-lg text-muted-foreground">Join as a DSA Partner and earn attractive commissions on every disbursement. Zero investment, multiple products, and dedicated support — every step of the way.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button className="btn-shine inline-flex items-center gap-2 rounded-2xl bg-gradient-brand px-6 py-3.5 font-semibold text-white shadow-[var(--shadow-glow)]">Become Partner <ArrowRight className="h-4 w-4" /></button>
              <button className="inline-flex items-center gap-2 rounded-2xl border border-border bg-white/70 px-6 py-3.5 font-semibold text-foreground hover:bg-white">Learn More</button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {perks.map(({ icon: Icon, t, s }) => (
              <div key={t} className="rounded-2xl glass-strong p-5">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-display text-base font-bold">{t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Partners() {
  const list = ["HDFC Bank", "ICICI Bank", "Axis Bank", "Bajaj Finserv", "Tata Capital", "Kotak", "SBI", "Digit Insurance", "IDFC First", "Yes Bank"];
  const row = [...list, ...list];
  return (
    <section className="relative py-20">
      <SectionHeader eyebrow="Trusted Partners" title={<>Our <span className="text-gradient">Lending & Insurance</span> Partners</>} sub="50+ banks and NBFCs powering instant offers." />
      <div className="mt-12 overflow-hidden">
        <div className="flex w-max animate-marquee gap-5 px-4">
          {row.map((p, i) => (
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
        <div className="pointer-events-none absolute -left-10 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-accent/40 blur-3xl" />
        <div className="relative grid items-center gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-display text-4xl font-extrabold md:text-5xl">Ready to drive your dream car?</h3>
            <p className="mt-3 max-w-lg text-white/85">Get pre-approved in 24 hours with the lowest rates from India's most trusted lenders.</p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <button className="btn-shine inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 font-semibold text-primary">Get Loan Offers <ArrowRight className="h-4 w-4" /></button>
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
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand text-white"><Sparkles className="h-5 w-5" /></div>
            <div className="font-display text-xl font-bold">Finonest</div>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">Smart finance for a smarter drive. AI-powered loans, insurance and intelligence.</p>
        </div>
        {[
          { t: "Loans", l: ["Used Car Loan", "Refinance", "Top-Up", "EMI Calculator"] },
          { t: "Tools", l: ["Credit Score", "Resale Value", "Insurance", "Challan"] },
          { t: "Company", l: ["About", "Careers", "Contact", "Blog"] },
        ].map(c => (
          <div key={c.t}>
            <div className="font-display text-sm font-bold uppercase tracking-[0.18em]">{c.t}</div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {c.l.map(x => <li key={x}><a className="hover:text-primary" href="#">{x}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Finonest. All rights reserved.</div>
    </footer>
  );
}

function HomePage() {
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
      <Navbar />
      <ToonhubHero />
      <main>
        <div data-reveal><Services /></div>
        <div data-reveal><CalculatorSection /></div>
        <div data-reveal><HowItWorks /></div>
        <div data-reveal><Resale /></div>
        <div data-reveal><WhyChooseUs /></div>
        <div data-reveal><BottomTriple /></div>
        <div data-reveal><Testimonials /></div>
        <div data-reveal><DSAPartner /></div>
        <div data-reveal><Partners /></div>
        <div data-reveal><CTA /></div>
      </main>
      <Footer />
    </div>
  );
}
