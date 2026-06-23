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
  const [visible, setVisible] = useState(false);
  const [offer, setOffer] = useState<Offer>(OFFERS[0]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const showNext = () => {
      setOffer(OFFERS[Math.floor(Math.random() * OFFERS.length)]);
      setVisible(true);
      timer = setTimeout(() => {
        setVisible(false);
        timer = setTimeout(showNext, 6000 + Math.random() * 4000);
      }, 6000);
    };
    timer = setTimeout(showNext, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`pointer-events-none fixed bottom-3 left-3 z-[60] flex items-end gap-2 transition-all duration-500 md:hidden ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <div className="relative pointer-events-auto">
        <div className="absolute -inset-3 -z-10 rounded-full bg-primary/20 blur-2xl" />
        <img
          src={mascot}
          alt="Finonest mascot"
          width={120}
          height={120}
          className="h-28 w-auto drop-shadow-[0_10px_15px_rgba(0,0,0,0.25)] animate-[wave_1.8s_ease-in-out_infinite]"
        />
      </div>

      <div className="pointer-events-auto relative mb-6 max-w-[200px] rounded-2xl bg-white/95 px-3 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.18)] ring-1 ring-black/5 backdrop-blur">
        <div
          className={`absolute -left-1.5 bottom-4 h-3 w-3 rotate-45 bg-gradient-to-br ${offer.accent}`}
        />
        <div className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${offer.accent} px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white`}>
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
          onClick={() => setVisible(false)}
          className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-foreground text-[10px] font-bold text-white shadow"
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>

      <style>{`
        @keyframes wave {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-4px) rotate(2deg); }
        }
      `}</style>
    </div>
  );
}
