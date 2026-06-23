import { useEffect, useState } from "react";
import mascot from "@/assets/finonest-mascot.png";

type Offer = {
  emoji: string;
  title: string;
  sub: string;
  accent: string;
};

const OFFERS: Offer[] = [
  { emoji: "🚗", title: "Car Loan @ 7.99%*", sub: "Lowest rate this week!", accent: "from-blue-500 to-indigo-500" },
  { emoji: "💸", title: "₹50,000 Cashback", sub: "On refinance applications", accent: "from-emerald-500 to-teal-500" },
  { emoji: "⚡", title: "24h Approval", sub: "Apply in just 5 minutes", accent: "from-amber-500 to-orange-500" },
  { emoji: "🎯", title: "Interest from 8.49%", sub: "Used car loans pre-approved", accent: "from-violet-500 to-fuchsia-500" },
  { emoji: "🛡️", title: "Free Insurance Quote", sub: "Save up to 40% today", accent: "from-pink-500 to-rose-500" },
  { emoji: "💯", title: "Credit Score: Free", sub: "Check yours instantly", accent: "from-sky-500 to-cyan-500" },
];

export default function MascotPopup() {
  const [offerIdx, setOfferIdx] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let hide: ReturnType<typeof setTimeout>;
    const show = () => {
      setOfferIdx((i) => (i + 1) % OFFERS.length);
      setOpen(true);
      hide = setTimeout(() => setOpen(false), 5000);
    };
    const first = setTimeout(show, 2500);
    const loop = setInterval(show, 12000);
    return () => {
      clearTimeout(first);
      clearTimeout(hide);
      clearInterval(loop);
    };
  }, []);

  const offer = OFFERS[offerIdx];

  return (
    <div className="pointer-events-none fixed bottom-24 left-0 z-[60] flex items-center md:hidden">
      {/* Mascot — auto slides in/out from left edge, flush to edge */}
      <div
        className={`pointer-events-auto relative -ml-4 transition-all duration-700 ease-out ${
          open ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
      >
        <div className="pointer-events-none absolute inset-0 -z-10 translate-x-6 rounded-full bg-primary/25 blur-2xl" />
        <img
          src={mascot}
          alt="Finonest mascot"
          width={180}
          height={180}
          loading="lazy"
          className="block h-40 w-auto select-none drop-shadow-[0_10px_15px_rgba(0,0,0,0.28)] animate-[mascot-bob_2.6s_ease-in-out_infinite] sm:h-44"
        />
      </div>

      {/* Notification bubble — directly touching mascot, no gap */}
      <div
        className={`pointer-events-auto relative -ml-6 max-w-[200px] origin-left rounded-2xl bg-white/95 px-3 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.18)] ring-1 ring-black/5 backdrop-blur transition-all delay-150 duration-500 ${
          open
            ? "translate-x-0 scale-100 opacity-100"
            : "pointer-events-none -translate-x-4 scale-90 opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="absolute -left-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 bg-white" />
        <div
          className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${offer.accent} px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white`}
        >
          <span>New</span>
        </div>
        <div className="mt-1 flex items-start gap-1.5">
          <span className="text-base leading-none">{offer.emoji}</span>
          <div className="min-w-0">
            <div className="text-[12px] font-bold leading-tight text-foreground">{offer.title}</div>
            <div className="mt-0.5 text-[10px] leading-snug text-foreground/65">{offer.sub}</div>
          </div>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-foreground text-[10px] font-bold text-white shadow"
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>

      <style>{`
        @keyframes mascot-bob {
          0%, 100% { transform: translateY(0) rotate(-1deg); }
          50% { transform: translateY(-4px) rotate(1.5deg); }
        }
      `}</style>
    </div>
  );
}
