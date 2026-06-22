import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Menu, X, Play, Download, Sparkles, ShieldCheck, PieChart, TrendingUp, ArrowRight,
} from "lucide-react";
import FadeUp from "@/components/FadeUp";
import BoomerangVideoBg from "@/components/BoomerangVideoBg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Finonest — Own your money, drive your dreams" },
      { name: "description", content: "Finonest is the smarter way to finance your car, home and life — instant control, AI-powered insights, and offers tailored to you." },
      { property: "og:title", content: "Finonest — Smart Finance, Smarter Drive" },
      { property: "og:description", content: "AI-powered loans, insurance and money tools, all in one app." },
    ],
  }),
  component: Index,
});

const navLinks = ["Loans", "Pricing", "Tools", "About"];
const HERO_VIDEO = "https://plugin-assets.open-design.ai/plugins/evergreen-finance/hf_20260517_070729_32a7eb4e-d6e2-4571-badc-91b4dab1ecbe-2db9b1.mp4";
const TESTIMONIAL_VIDEO = "https://plugin-assets.open-design.ai/plugins/evergreen-finance/hf_20260517_074029_c7a854bd-2d6e-4b62-96b3-ae8c16311e44-59f9be.mp4";
const CARD1_IMG = "https://plugin-assets.open-design.ai/plugins/evergreen-finance/hf_20260517_061249_f20dfeda-1033-45ce-a3ee-070965599cbf-6c6b7e.webp&w=1280&q=85";
const CARD2_IMG = "https://plugin-assets.open-design.ai/plugins/evergreen-finance/hf_20260517_061305_db631f5f-185f-4fda-a7a8-1dd7359ef2ea-4b7cdd.webp&w=1280&q=85";
const CARD4_IMG = "https://plugin-assets.open-design.ai/plugins/evergreen-finance/hf_20260517_061316_50e651f8-02d0-4add-9ddb-7d81d15ac02e-24edde.webp&w=1280&q=85";

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <FadeUp immediate delay={0} className="relative z-30">
      <nav className="flex items-center justify-between px-5 sm:px-10 lg:px-16 py-5">
        <a href="#" className="font-cooper text-xl sm:text-2xl text-[#08150C] tracking-tight">Finonest</a>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l, i) => {
            const active = i === 1;
            return (
              <a key={l} href="#" className={`relative text-sm transition-colors ${active ? "font-medium text-[#08150C]" : "text-stone-700 hover:text-[#08150C]"}`}>
                {l}
                {active && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#08150C] rounded-full" />}
              </a>
            );
          })}
        </div>
        <div className="hidden md:block">
          <button className="bg-[#08150C] text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-[#1a2e1f] transition-colors">Get Started</button>
        </div>
        <button className="md:hidden text-[#08150C]" onClick={() => setOpen(o => !o)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden absolute left-5 right-5 mt-1 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg p-5 flex flex-col gap-3 z-40">
          {navLinks.map(l => (
            <a key={l} href="#" className="text-sm text-stone-700 hover:text-[#08150C]">{l}</a>
          ))}
          <button className="bg-[#08150C] text-white text-sm font-medium px-5 py-2.5 rounded-xl">Get Started</button>
        </div>
      )}
    </FadeUp>
  );
}

function SavingsCard() {
  return (
    <div className="w-44 sm:w-64 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-xl">
      <div className="flex items-center justify-between">
        <span className="text-xs sm:text-sm font-medium text-stone-700">Savings</span>
        <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">+25%</span>
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="font-cooper text-xl sm:text-2xl text-[#08150C]">₹84,200</span>
        <span className="text-[10px] sm:text-xs text-emerald-600 font-medium">+12%</span>
      </div>
      <svg viewBox="0 0 200 60" className="w-full mt-2 h-12 sm:h-16">
        <defs>
          <linearGradient id="sg" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline fill="url(#sg)" stroke="none" points="0,55 0,40 50,30 100,35 150,15 200,20 200,55" />
        <polyline fill="none" stroke="#10b981" strokeWidth="2" points="0,40 50,30 100,35 150,15 200,20" />
      </svg>
      <div className="flex justify-between text-[9px] sm:text-[10px] text-stone-400 mt-1">
        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span>
      </div>
    </div>
  );
}

function OthersCard() {
  const bars = Array.from({ length: 12 });
  return (
    <div className="w-44 sm:w-72 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-2xl">
      <div className="flex items-center justify-between">
        <span className="text-xs sm:text-sm font-medium text-stone-700">Others</span>
        <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">Monthly ▾</span>
      </div>
      <div className="mt-3 space-y-1.5 text-[10px] sm:text-xs">
        <div className="flex justify-between"><span className="text-stone-600">Groceries</span><span className="font-medium text-[#08150C]">78%</span></div>
        <div className="flex justify-between"><span className="text-stone-600">Entertain.</span><span className="font-medium text-[#08150C]">43%</span></div>
        <div className="flex justify-between"><span className="text-stone-600">Transport</span><span className="font-medium text-[#08150C]">23%</span></div>
      </div>
      <div className="flex items-end gap-1 h-12 sm:h-16 mt-3">
        {bars.map((_, i) => (
          <div key={i} className="flex-1 rounded-sm" style={{
            height: `${30 + ((i * 17) % 60)}%`,
            background: i === 4 ? "#f97316" : "#d1d5db",
          }} />
        ))}
      </div>
    </div>
  );
}

function BillPayCard() {
  const bars = Array.from({ length: 12 });
  return (
    <div className="w-44 sm:w-64 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-xl">
      <div className="flex items-center justify-between">
        <span className="text-xs sm:text-sm font-medium text-stone-700">Bill Pay</span>
        <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">Monthly ▾</span>
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="font-cooper text-xl sm:text-2xl text-[#08150C]">₹12,400</span>
        <span className="text-[10px] sm:text-xs text-rose-600 font-medium">-8%</span>
      </div>
      <div className="flex items-end gap-1 h-10 sm:h-14 mt-3">
        {bars.map((_, i) => (
          <div key={i} className="flex-1 rounded-sm" style={{
            height: `${25 + ((i * 23) % 65)}%`,
            background: i === 6 ? "#08150C" : "#e5e7eb",
          }} />
        ))}
      </div>
      <div className="flex justify-between text-[9px] sm:text-[10px] text-stone-400 mt-1">
        <span>J</span><span>F</span><span>M</span><span>A</span><span>M</span><span>J</span><span>J</span><span>A</span><span>S</span><span>O</span><span>N</span><span>D</span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-white flex flex-col">
      <BoomerangVideoBg src={HERO_VIDEO} />
      <div className="relative z-20 flex-1 flex flex-col justify-between">
        <Navbar />
        <div className="flex-1 flex flex-col items-center text-center px-5 sm:px-10 pt-8 sm:pt-14 pb-8 sm:pb-14">
          <FadeUp immediate delay={0.1}>
            <h1 className="font-cooper text-[2.2rem] sm:text-5xl md:text-6xl lg:text-7xl text-[#08150C] leading-tight max-w-5xl tracking-tight">
              Own your money and build the wealth you deserve
            </h1>
          </FadeUp>
          <FadeUp immediate delay={0.25}>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base text-stone-600 max-w-sm sm:max-w-md leading-relaxed">
              Step into a smarter way to bank, right from your pocket. Finonest gives you instant control over your money, wherever you are.
            </p>
          </FadeUp>
          <FadeUp immediate delay={0.4}>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3">
              <button className="inline-flex items-center justify-center gap-2 bg-white/80 backdrop-blur border border-stone-200 text-[#08150C] text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-white transition-colors">
                <Play size={14} className="fill-stone-800 text-stone-800" />
                Watch 30s Demo
              </button>
              <button className="inline-flex items-center justify-center gap-2 bg-[#08150C] text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-[#1a2e1f] transition-colors">
                <Download size={14} />
                Get the App
              </button>
            </div>
          </FadeUp>
        </div>
        <div className="px-5 sm:px-10 pb-8 sm:pb-12 flex items-end justify-center gap-2 sm:gap-4">
          <FadeUp immediate delay={0.55} className="hidden sm:block"><SavingsCard /></FadeUp>
          <FadeUp immediate delay={0.65}><OthersCard /></FadeUp>
          <FadeUp immediate delay={0.75} className="hidden sm:block"><BillPayCard /></FadeUp>
        </div>
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section className="bg-[#FDF5EB] py-14 sm:py-20 px-5 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-10 md:gap-16 items-center">
        <div>
          <FadeUp delay={0}>
            <h2 className="font-cooper-medium text-2xl sm:text-3xl text-[#08150C] leading-snug mb-6 sm:mb-8">
              Trusted by ambitious, fast-moving teams
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 rounded-md bg-[#08150C] text-white flex items-center justify-center text-sm font-semibold">A</div>
              <span className="text-sm font-medium text-[#08150C]">Arcvex</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="font-cooper text-stone-700 text-lg sm:text-xl md:text-2xl leading-relaxed mb-5 sm:mb-6">
              "With Finonest, I have full visibility into our team's spending in real time. It feels like having a sharp financial advisor available at every hour, helping us stay on budget and make wiser calls."
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="mb-6">
              <div className="text-sm font-semibold text-[#08150C]">Maya Reeves</div>
              <div className="text-xs text-stone-500">Director, Arcvex</div>
            </div>
          </FadeUp>
          <FadeUp delay={0.4}>
            <button className="inline-flex items-center gap-2 bg-[#08150C] text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-[#1a2e1f] transition-colors">
              All Stories <ArrowRight size={14} />
            </button>
          </FadeUp>
        </div>
        <FadeUp delay={0.15} className="max-w-xs sm:max-w-sm justify-self-center md:justify-self-end">
          <video
            src={TESTIMONIAL_VIDEO}
            autoPlay loop muted playsInline
            className="w-full rounded-2xl object-cover aspect-square"
          />
        </FadeUp>
      </div>
    </section>
  );
}

function FeatureImageCard({
  img, icon, title, body, delay,
}: { img: string; icon: React.ReactNode; title: string; body: string; delay: number }) {
  return (
    <FadeUp delay={delay} className="aspect-[3/4] rounded-2xl overflow-hidden relative">
      <div className="absolute inset-0">
        <img src={img} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08150C]/80 via-[#08150C]/20 to-transparent" />
      </div>
      <div className="relative h-full p-5 flex flex-col justify-between text-white">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-medium">{title}</span>
        </div>
        <p className="text-white/80 text-sm sm:text-base leading-snug">{body}</p>
      </div>
    </FadeUp>
  );
}

function SpendInsightsCard() {
  return (
    <FadeUp delay={0.25} className="aspect-[3/4] rounded-2xl overflow-hidden">
      <div className="w-full h-full p-5 flex flex-col" style={{ background: "#EBE4DC" }}>
        <div className="flex items-center gap-2">
          <PieChart size={16} className="text-stone-700" />
          <span className="text-stone-700 text-sm font-medium">Spend Insights</span>
        </div>
        <div className="flex-1 mt-4 rounded-2xl p-4 flex flex-col items-center justify-center text-center" style={{ background: "#F4F1EC" }}>
          <div className="text-sm sm:text-base font-semibold text-stone-800">Monthly Spend</div>
          <div className="text-xs sm:text-sm text-stone-500">1 Apr – 30 May 2026</div>
          <div className="relative mt-4 w-32 h-32 sm:w-36 sm:h-36">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <circle cx="18" cy="18" r="14" fill="none" stroke="#C46B2D" strokeWidth="5" strokeDasharray="26.4 61.56" strokeDashoffset="0" />
              <circle cx="18" cy="18" r="14" fill="none" stroke="#7A8C3E" strokeWidth="5" strokeDasharray="22 65.96" strokeDashoffset="-26.4" />
              <circle cx="18" cy="18" r="14" fill="none" stroke="#A8B87A" strokeWidth="5" strokeDasharray="17.6 70.36" strokeDashoffset="-48.4" />
              <circle cx="18" cy="18" r="14" fill="none" stroke="#B8AFA4" strokeWidth="5" strokeDasharray="22 65.96" strokeDashoffset="-66" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="font-cooper-medium text-2xl text-[#08150C]">50%</div>
              <div className="text-[10px] text-stone-500">of budget</div>
            </div>
          </div>
        </div>
      </div>
    </FadeUp>
  );
}

function Features() {
  return (
    <section className="bg-[#FDF5EB] py-14 sm:py-20 px-5 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-8 sm:mb-12">
          <FadeUp delay={0}>
            <h2 className="font-cooper-medium text-2xl sm:text-3xl md:text-4xl text-[#08150C] leading-snug max-w-xl">
              Designed to sharpen every decision
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <button className="inline-flex items-center gap-2 bg-[#08150C] text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-[#1a2e1f] transition-colors">
              <Play size={13} className="fill-white" />
              Watch Demo
            </button>
          </FadeUp>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <FeatureImageCard
            delay={0.05} img={CARD1_IMG}
            icon={<Sparkles size={16} className="text-white" />}
            title="Smart Budgeting"
            body="Let AI reshape how you plan your spending. Finonest adapts to your..."
          />
          <FeatureImageCard
            delay={0.15} img={CARD2_IMG}
            icon={<ShieldCheck size={16} className="text-white" />}
            title="Bank-Grade Security"
            body="Keep your money safe with end-to-end encryption, live fraud alerts, and two-factor auth..."
          />
          <SpendInsightsCard />
          <FeatureImageCard
            delay={0.35} img={CARD4_IMG}
            icon={<TrendingUp size={16} className="text-white" />}
            title="Wealth Building"
            body="Grow your net worth with tools that help you set targets, monitor gains, and act..."
          />
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <main className="bg-white">
      <Hero />
      <Testimonial />
      <Features />
    </main>
  );
}
