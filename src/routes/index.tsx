import { createFileRoute } from "@tanstack/react-router";
import ToonhubHero from "@/components/ToonhubHero";
import {
  ShieldCheck,
  Zap,
  BadgePercent,
  Users,
  Car,
  CreditCard,
  Home as HomeIcon,
  Wallet,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Finonest — Smart Loans & Credit Cards" },
      {
        name: "description",
        content:
          "Compare and apply for car loans, home loans, personal loans and premium credit cards. Quick approvals, low rates, transparent process — all on Finonest.",
      },
      { property: "og:title", content: "Finonest — Smart Loans & Credit Cards" },
      {
        property: "og:description",
        content:
          "Compare and apply for car loans, home loans, personal loans and premium credit cards on Finonest.",
      },
    ],
  }),
  component: HomePage,
});

const PRODUCTS = [
  {
    icon: Car,
    title: "Car Loan",
    desc: "New & used car financing with fast approvals and flexible tenures.",
    href: "/loans/car",
    accent: "#F4845F",
  },
  {
    icon: HomeIcon,
    title: "Home Loan",
    desc: "Lowest interest rates, end-to-end paperwork and quick sanctions.",
    href: "/loans/home",
    accent: "#E882B4",
  },
  {
    icon: Wallet,
    title: "Personal Loan",
    desc: "Instant funds for weddings, travel, medical — disbursed in hours.",
    href: "/loans/personal",
    accent: "#6EB5FF",
  },
  {
    icon: CreditCard,
    title: "Credit Cards",
    desc: "Premium cards with rewards, cashback and lifestyle privileges.",
    href: "/cards",
    accent: "#6BBF7A",
  },
];

const FEATURES = [
  {
    icon: Zap,
    title: "Approvals in minutes",
    desc: "Smart eligibility checks against 40+ lenders, instantly.",
  },
  {
    icon: BadgePercent,
    title: "Best-in-market rates",
    desc: "We compare so you always get the lowest interest rate available.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & transparent",
    desc: "Bank-grade encryption with zero hidden fees, ever.",
  },
  {
    icon: Users,
    title: "Trusted by 2M+",
    desc: "Customers across India trust Finonest for their money decisions.",
  },
];

const STATS = [
  { value: "₹12,000 Cr+", label: "Loans disbursed" },
  { value: "2M+", label: "Happy customers" },
  { value: "40+", label: "Partner lenders" },
  { value: "4.8★", label: "Customer rating" },
];

function HomePage() {
  return (
    <main className="bg-white text-neutral-900" style={{ fontFamily: "Inter, sans-serif" }}>
      <ToonhubHero />

      {/* Products */}
      <section className="px-6 py-20 sm:py-28 max-w-7xl mx-auto">
        <div className="max-w-2xl mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3">
            What we offer
          </p>
          <h2
            className="text-3xl sm:text-5xl font-bold tracking-tight"
            style={{ fontFamily: "Anton, sans-serif", letterSpacing: "-0.01em" }}
          >
            ONE PLATFORM. EVERY FINANCIAL MOVE.
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p) => (
            <a
              key={p.title}
              href={p.href}
              className="group relative rounded-2xl p-6 border border-neutral-200 hover:border-neutral-900 transition-colors bg-white overflow-hidden"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: p.accent + "22", color: p.accent }}
              >
                <p.icon size={22} strokeWidth={2.25} />
              </div>
              <h3 className="text-lg font-semibold mb-1">{p.title}</h3>
              <p className="text-sm text-neutral-600 leading-relaxed mb-4">{p.desc}</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-neutral-900">
                Explore
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
              <div
                className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform"
                style={{ backgroundColor: p.accent }}
              />
            </a>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-neutral-950 text-white px-6 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <div key={s.label}>
              <div
                className="text-3xl sm:text-5xl font-bold mb-2"
                style={{ fontFamily: "Anton, sans-serif", letterSpacing: "-0.01em" }}
              >
                {s.value}
              </div>
              <div className="text-sm text-neutral-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 sm:py-28 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3">
              Why Finonest
            </p>
            <h2
              className="text-3xl sm:text-5xl font-bold tracking-tight mb-5"
              style={{ fontFamily: "Anton, sans-serif", letterSpacing: "-0.01em" }}
            >
              MONEY MOVES MADE SIMPLE.
            </h2>
            <p className="text-neutral-600 leading-relaxed max-w-md">
              From your first credit card to your dream home — we make every
              financial decision faster, smarter and more transparent.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl p-6 bg-neutral-50 border border-neutral-100"
              >
                <div className="w-10 h-10 rounded-lg bg-neutral-900 text-white flex items-center justify-center mb-4">
                  <f.icon size={18} strokeWidth={2.25} />
                </div>
                <h3 className="font-semibold mb-1">{f.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="px-6 py-20 sm:py-24 text-center"
        style={{
          background:
            "linear-gradient(135deg, #F4845F 0%, #E882B4 45%, #6EB5FF 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto text-white">
          <h2
            className="text-3xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: "Anton, sans-serif", letterSpacing: "-0.01em" }}
          >
            READY TO UNLOCK BETTER OFFERS?
          </h2>
          <p className="opacity-90 mb-8 max-w-xl mx-auto">
            Check your eligibility in under 60 seconds. No paperwork, no impact
            on your credit score.
          </p>
          <a
            href="/loans/personal"
            className="inline-flex items-center gap-2 rounded-full bg-white text-neutral-900 px-7 py-3.5 font-semibold text-sm uppercase tracking-wider hover:translate-y-[-2px] transition-transform"
            style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.18)" }}
          >
            Get Started Free
            <ArrowRight size={16} strokeWidth={2.5} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-950 text-neutral-400 px-6 py-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <div
              className="text-white font-bold text-lg tracking-[0.2em]"
              style={{ fontFamily: "Anton, sans-serif" }}
            >
              FINONEST
            </div>
            <p className="text-xs mt-2">© 2026 Finonest. All rights reserved.</p>
          </div>
          <div className="flex gap-6 text-sm">
            <a href="/about" className="hover:text-white transition-colors">About</a>
            <a href="/contact" className="hover:text-white transition-colors">Contact</a>
            <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
