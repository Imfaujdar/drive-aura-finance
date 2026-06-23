import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, Phone } from "lucide-react";

const NAV = [
  {
    label: "Loans",
    items: [
      { label: "Car Loan", href: "/loans/car" },
      { label: "Home Loan", href: "/loans/home" },
      { label: "Personal Loan", href: "/loans/personal" },
      { label: "Business Loan", href: "/loans/business" },
    ],
  },
  {
    label: "Cards",
    items: [
      { label: "Credit Cards", href: "/cards" },
      { label: "Compare Cards", href: "/cards/compare" },
      { label: "Rewards", href: "/cards/rewards" },
    ],
  },
  {
    label: "Insurance",
    items: [
      { label: "Health", href: "/insurance/health" },
      { label: "Motor", href: "/insurance/motor" },
      { label: "Life", href: "/insurance/life" },
    ],
  },
  { label: "Calculators", href: "/calculators" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-black/5 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.15)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6 sm:py-4">
          {/* Brand */}
          <a
            href="/"
            className="flex items-center gap-2 shrink-0"
            style={{ fontFamily: "Anton, sans-serif" }}
          >
            <span
              className={`grid h-9 w-9 place-items-center rounded-xl text-base font-black transition-colors ${
                scrolled ? "bg-primary text-primary-foreground" : "bg-white/15 text-white backdrop-blur"
              }`}
            >
              F
            </span>
            <span
              className={`text-xl tracking-[0.18em] uppercase transition-colors ${
                scrolled ? "text-foreground" : "text-white"
              }`}
            >
              Finonest
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => "items" in item && setActive(item.label)}
                onMouseLeave={() => setActive(null)}
              >
                <a
                  href={"href" in item ? item.href : "#"}
                  className={`inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    scrolled
                      ? "text-foreground/80 hover:text-primary hover:bg-primary/5"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                  {"items" in item && (
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${active === item.label ? "rotate-180" : ""}`}
                    />
                  )}
                </a>
                {"items" in item && active === item.label && (
                  <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3">
                    <div className="min-w-[220px] rounded-2xl border border-black/5 bg-white p-2 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)]">
                      {item.items!.map((s) => (
                        <a
                          key={s.label}
                          href={s.href}
                          className="block rounded-xl px-4 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-primary/5 hover:text-primary"
                        >
                          {s.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:18001234567"
              className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                scrolled ? "text-foreground/70 hover:text-primary" : "text-white/85 hover:text-white"
              }`}
            >
              <Phone size={14} strokeWidth={2.5} />
              1800-123-4567
            </a>
            <a
              href="/login"
              className={`text-sm font-semibold transition-colors ${
                scrolled ? "text-foreground/80 hover:text-primary" : "text-white/90 hover:text-white"
              }`}
            >
              Login
            </a>
            <a
              href="/apply"
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                scrolled
                  ? "bg-primary text-primary-foreground hover:opacity-90 shadow-[0_6px_18px_-6px_rgba(0,0,0,0.3)]"
                  : "bg-white text-foreground hover:bg-white/95 shadow-[0_6px_18px_rgba(0,0,0,0.18)]"
              }`}
            >
              Get Started
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className={`lg:hidden grid h-10 w-10 place-items-center rounded-xl transition-colors ${
              scrolled || open
                ? "bg-foreground/5 text-foreground"
                : "bg-white/15 text-white backdrop-blur"
            }`}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[99] lg:hidden transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-16 items-center justify-between px-5 border-b border-black/5">
            <span
              className="text-lg uppercase tracking-[0.18em] text-foreground"
              style={{ fontFamily: "Anton, sans-serif" }}
            >
              Menu
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="grid h-9 w-9 place-items-center rounded-xl bg-foreground/5 text-foreground"
            >
              <X size={18} />
            </button>
          </div>
          <nav className="flex flex-col p-4 gap-1 overflow-y-auto h-[calc(100%-9.5rem)]">
            {NAV.map((item) =>
              "items" in item ? (
                <details key={item.label} className="group rounded-xl">
                  <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-foreground/85 hover:bg-primary/5 hover:text-primary">
                    {item.label}
                    <ChevronDown size={16} className="transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="flex flex-col pl-3 mt-1 mb-2 border-l-2 border-primary/15 ml-4">
                    {item.items!.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        onClick={() => setOpen(false)}
                        className="rounded-lg px-4 py-2 text-sm text-foreground/70 hover:text-primary"
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                </details>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-foreground/85 hover:bg-primary/5 hover:text-primary"
                >
                  {item.label}
                </a>
              )
            )}
          </nav>
          <div className="absolute bottom-0 inset-x-0 p-4 border-t border-black/5 bg-white flex gap-2">
            <a
              href="/login"
              className="flex-1 rounded-full border border-foreground/15 px-4 py-2.5 text-center text-sm font-semibold text-foreground"
            >
              Login
            </a>
            <a
              href="/apply"
              className="flex-1 rounded-full bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
