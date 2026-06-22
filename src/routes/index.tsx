import { createFileRoute } from "@tanstack/react-router";
import {
  Car, Calculator, MessageCircle, Gauge, Shield, Home as HomeIcon,
  ArrowRight, Sparkles, Wallet, RefreshCw, BadgeCheck, Cpu,
  Zap, FileCheck, Clock, Users, Building2, CircleDollarSign,
  TrendingUp, Bike, Truck, ChevronRight, Menu,
} from "lucide-react";
import { useEffect, useState } from "react";
import heroCar from "@/assets/hero-car.png";
import resaleSuv from "@/assets/resale-suv.png";
import whyCar from "@/assets/why-car.png";
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

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* mesh + blobs */}
      <div className="pointer-events-none absolute inset-0 bg-mesh" />
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-primary/8 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute -right-20 top-40 h-[28rem] w-[28rem] rounded-full bg-accent/8 blur-3xl animate-blob" style={{ animationDelay: "4s" }}/>
      <div className="pointer-events-none absolute left-1/3 bottom-0 h-72 w-72 rounded-full bg-secondary/8 blur-3xl animate-blob" style={{ animationDelay: "8s" }}/>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-20 pt-12 md:grid-cols-2 md:pt-20">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary backdrop-blur">
            <Cpu className="h-3.5 w-3.5" /> AI Powered Used Car Finance
          </div>
          <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.02] tracking-tight md:text-7xl">
            Drive Today.<br/>Achieve <span className="text-gradient">Tomorrow.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            India's most advanced platform for Used Car Loans, Refinance, Insurance, Credit Score & Car Valuation — powered by intelligent finance.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="btn-shine inline-flex items-center gap-2 rounded-2xl bg-gradient-brand px-6 py-3.5 font-semibold text-white shadow-[var(--shadow-lift)]">
              Get Loan Offers <ArrowRight className="h-4 w-4" />
            </button>
            <button className="inline-flex items-center gap-2 rounded-2xl border border-border bg-white/70 px-6 py-3.5 font-semibold text-foreground backdrop-blur hover:bg-white">
              Explore Dashboard <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            <Stat value={2} suffix="M+" label="Happy Customers" icon={<Users className="h-4 w-4"/>} />
            <Stat value={50} suffix="+" label="Lending Partners" icon={<Building2 className="h-4 w-4"/>} />
            <Stat value={99.6} suffix="%" label="Approval Rate" icon={<BadgeCheck className="h-4 w-4"/>} decimals={1}/>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-square">
            {/* glowing rings on the floor */}
            <div className="pointer-events-none absolute left-1/2 top-[72%] h-[40%] w-[95%] -translate-x-1/2 rounded-[50%] border border-primary/25 animate-spin-slow" />
            <div className="pointer-events-none absolute left-1/2 top-[74%] h-[26%] w-[72%] -translate-x-1/2 rounded-[50%] border border-primary/15" />
            <img
              src={heroCar}
              alt="Futuristic luxury electric car"
              width={1280}
              height={1280}
              className="relative z-10 h-full w-full object-contain animate-float car-depth-lg"
            />
            {/* floating cards */}
            <div className="absolute left-2 top-6 z-20 rounded-2xl glass px-3 py-2 text-xs font-semibold animate-float-sm">
              <div className="flex items-center gap-2"><Wallet className="h-4 w-4 text-primary"/>Pre-approved · ₹8.2L</div>
            </div>
            <div className="absolute right-2 top-1/3 z-20 rounded-2xl glass px-3 py-2 text-xs font-semibold animate-float-sm" style={{animationDelay:"1.2s"}}>
              <div className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-success"/>Rate · 8.49%*</div>
            </div>
            <div className="absolute bottom-6 left-2 z-20 rounded-2xl glass px-3 py-2 text-xs font-semibold animate-float-sm" style={{animationDelay:"2s"}}>
              <div className="flex items-center gap-2"><Cpu className="h-4 w-4 text-primary"/>AI scoring engine</div>
            </div>
          </div>

          {/* quick actions floating panel */}
          <div className="absolute -right-3 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-2 rounded-2xl glass-strong p-2 lg:flex">
            {[
              { icon: <Car className="h-4 w-4"/>, label: "Apply Loan" },
              { icon: <Calculator className="h-4 w-4"/>, label: "EMI Calc" },
              { icon: <MessageCircle className="h-4 w-4"/>, label: "AI Chat" },
              { icon: <Gauge className="h-4 w-4"/>, label: "Credit Score" },
              { icon: <Shield className="h-4 w-4"/>, label: "Insurance" },
            ].map((a) => (
              <button key={a.label} className="group flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-all hover:bg-gradient-brand hover:text-white hover:shadow-[var(--shadow-glow)]">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary/10 text-primary group-hover:bg-white/20 group-hover:text-white">{a.icon}</span>
                <span className="whitespace-nowrap">{a.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, suffix, label, icon, decimals = 0 }:{value:number;suffix:string;label:string;icon:React.ReactNode;decimals?:number}) {
  const v = useCounter(value);
  return (
    <div className="rounded-2xl glass p-4 card-lift">
      <div className="flex items-center gap-2 text-primary">{icon}<span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</span></div>
      <div className="mt-1 font-num text-2xl font-bold">
        {v.toFixed(decimals)}{suffix}
      </div>
    </div>
  );
}

function Services() {
  const items = [
    { icon: CircleDollarSign, title: "Check Auto", sub: "Loan Offers" },
    { icon: FileCheck, title: "Check & Pay", sub: "Challan" },
    { icon: CircleDollarSign, title: "Check Resale", sub: "Value" },
    { icon: Shield, title: "Renew", sub: "Insurance" },
    { icon: HomeIcon, title: "Book Home", sub: "Inspection" },
    { icon: Gauge, title: "Check Credit Score", sub: "& Offers" },
  ];
  return (
    <section className="relative mx-auto max-w-7xl px-4 -mt-2">
      <div className="rounded-3xl glass-strong p-6 md:p-8">
        <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
          {items.map(({ icon: Icon, title, sub }) => (
            <button key={title} className="group flex flex-col items-center gap-3 rounded-2xl p-3 transition-all hover:-translate-y-1">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-primary/8 text-primary ring-1 ring-primary/15 transition-all group-hover:bg-gradient-brand group-hover:text-white group-hover:shadow-[var(--shadow-glow)]">
                <Icon className="h-7 w-7" />
              </span>
              <div className="text-center text-xs font-semibold leading-tight">
                {title}<br/>{sub}
              </div>
            </button>
          ))}
        </div>
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
    <section className="relative mx-auto max-w-7xl px-4 py-16">
      <div className="grid items-center gap-8 overflow-hidden rounded-3xl glass-strong p-6 md:grid-cols-2 md:p-10">
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-1/2 h-[80%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/25 animate-spin-slow"/>
            <div className="absolute left-1/2 top-1/2 h-[55%] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/30"/>
          </div>
          <img src={resaleSuv} alt="SUV resale value" width={1280} height={1024} loading="lazy" className="mx-auto w-full max-w-md animate-float-sm car-depth"/>
        </div>
        <div>
          <h3 className="font-display text-3xl font-extrabold md:text-4xl">Get the Best <span className="text-gradient">Value</span> for Your Car</h3>
          <p className="mt-2 text-muted-foreground">Check the resale value of your used car in just a few clicks.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <Field label="Car Number"><input className="field" placeholder="MH 12 AB 1234"/></Field>
            <Field label="Brand"><select className="field"><option>Maruti</option><option>Hyundai</option><option>BMW</option></select></Field>
            <Field label="Model"><select className="field"><option>Select model</option></select></Field>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button className="btn-shine inline-flex items-center gap-2 rounded-2xl bg-gradient-brand px-6 py-3 font-semibold text-white shadow-[var(--shadow-glow)]">Check Value <ArrowRight className="h-4 w-4"/></button>
            {["Instant","Accurate","Reliable"].map(t=>(
              <span key={t} className="rounded-full border border-border bg-white/60 px-3 py-1 text-xs font-semibold">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyFinonest() {
  const features = [
    "AI Powered Approval","Lowest Interest","Instant Eligibility",
    "50+ Partners","Paperless Process","Fast Disbursal",
  ];
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24">
      <SectionHeader eyebrow="Why Finonest" title={<>Built like a <span className="text-gradient">finance super-engine</span></>} sub="Every gear of your loan, tuned by AI."/>
      <div className="relative mt-14 grid items-center gap-8 md:grid-cols-3">
        <div className="space-y-4">
          {features.slice(0,3).map(f=>(<FeatureRow key={f} text={f}/>))}
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-primary/15 blur-3xl"/>
          <img src={whyCar} alt="Transparent futuristic car cutaway" width={1280} height={1024} loading="lazy" className="mx-auto w-full max-w-md animate-float car-depth-lg"/>
        </div>
        <div className="space-y-4">
          {features.slice(3).map(f=>(<FeatureRow key={f} text={f} reverse/>))}
        </div>
      </div>
    </section>
  );
}

function FeatureRow({ text, reverse }: { text: string; reverse?: boolean }) {
  return (
    <div className={`flex items-center gap-3 rounded-2xl glass card-lift p-4 ${reverse?"flex-row-reverse text-right":""}`}>
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-brand text-white shadow-[var(--shadow-glow)]">
        <BadgeCheck className="h-5 w-5"/>
      </span>
      <span className="font-display font-semibold">{text}</span>
    </div>
  );
}

function Rates() {
  const rates = [
    { icon: Car, t: "New Car Loan", v: "8.49%*", tone: "from-primary to-secondary" },
    { icon: Car, t: "Used Car Loan", v: "9.25%*", tone: "from-primary to-secondary" },
    { icon: Bike, t: "Two Wheeler", v: "10.50%*", tone: "from-primary to-secondary" },
    { icon: Truck, t: "Commercial", v: "9.75%*", tone: "from-primary to-secondary" },
  ];
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-16">
      <SectionHeader eyebrow="Live Rates" title={<>Current <span className="text-gradient">Interest Rates</span></>} sub="Updated daily across our 50+ lending partners."/>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {rates.map(({icon:Icon,t,v,tone})=>(
          <div key={t} className="group relative overflow-hidden rounded-3xl glass card-lift p-6">
            <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${tone} text-white shadow-[var(--shadow-glow)]`}><Icon className="h-6 w-6"/></div>
            <div className="mt-4 text-sm text-muted-foreground">{t}</div>
            <div className="font-num text-3xl font-extrabold">{v}</div>
            <div className="mt-1 text-xs text-muted-foreground">Starting from</div>
            <div className={`pointer-events-none absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-gradient-to-br ${tone} opacity-20 blur-2xl transition-opacity group-hover:opacity-40`}/>
          </div>
        ))}
      </div>
    </section>
  );
}

function Blog() {
  const posts = [
    { img: blog1, cat: "Auto Industry", date: "May 15, 2026", title: "Future of EV in India: What to Expect in 2026 & Beyond", read: "5 min read" },
    { img: blog2, cat: "Finance Tips", date: "May 10, 2026", title: "5 Smart Tips to Get the Best Auto Loan in 2026", read: "4 min read" },
    { img: blog3, cat: "Market Insights", date: "May 05, 2026", title: "Auto Loan Trends: Key Insights You Should Know", read: "6 min read" },
  ];
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary backdrop-blur">Latest from the blog</div>
          <h2 className="mt-4 font-display text-4xl font-extrabold md:text-5xl">Insights to drive <span className="text-gradient">smarter</span></h2>
        </div>
        <a className="hidden items-center gap-1 text-sm font-semibold text-primary md:inline-flex" href="#">View All <ArrowRight className="h-4 w-4"/></a>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((p,i)=>(
          <article key={i} className="group overflow-hidden rounded-3xl glass card-lift">
            <div className="relative aspect-[5/3] overflow-hidden">
              <img src={p.img} alt={p.title} width={800} height={600} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"/>
              <span className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-primary backdrop-blur">{p.cat}</span>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 text-xs text-muted-foreground"><span>{p.date}</span><span>·</span><span>{p.read}</span></div>
              <h3 className="mt-2 font-display text-lg font-bold leading-snug">{p.title}</h3>
              <a href="#" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1"/></a>
            </div>
          </article>
        ))}
      </div>
    </section>
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
  return (
    <div className="bg-mesh min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Services />
        <Calculator2 />
        <Resale />
        <WhyFinonest />
        <Rates />
        <Blog />
        <Partners />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
