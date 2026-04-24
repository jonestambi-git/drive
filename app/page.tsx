"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  MapPin, Navigation, Shield, Zap, Star, ArrowRight,
  CheckCircle2, Clock, Car, Bike, Truck,
  Smartphone, CreditCard, Users, TrendingUp, Award,
  Menu, X,
} from "lucide-react";


/* ─── Data ─────────────────────────────────────────────────── */

const rideTypes = [
  { icon: Car,   label: "Drive",   desc: "Affordable everyday rides",   eta: "3 min",  price: "From $4" },
  { icon: Car,   label: "Comfort", desc: "Newer cars, more legroom",     eta: "5 min",  price: "From $7" },
  { icon: Truck, label: "XL",      desc: "Up to 6 passengers",           eta: "7 min",  price: "From $10" },
  { icon: Bike,  label: "Moto",    desc: "Fast 2-wheel rides",           eta: "2 min",  price: "From $2" },
];

const features = [
  { icon: Zap,         title: "Instant matching",    desc: "Get matched with the nearest driver in seconds. No waiting, no guessing." },
  { icon: Navigation,  title: "Live GPS tracking",   desc: "Watch your driver's real-time location from pickup to drop-off." },
  { icon: CreditCard,  title: "Cashless payments",   desc: "Pay automatically at trip end. Card, wallet, or cash — your choice." },
  { icon: Shield,      title: "Verified drivers",    desc: "Every driver passes background checks and vehicle inspections." },
  { icon: Clock,       title: "Upfront pricing",     desc: "See the exact fare before you confirm. Zero surge surprises." },
  { icon: Smartphone,  title: "Easy app",            desc: "Book, track, and pay in under 30 seconds from your phone." },
];

const steps = [
  { n: "01", title: "Open the app",       desc: "Enter your destination and see your fare instantly." },
  { n: "02", title: "Get matched",        desc: "A nearby verified driver accepts your ride in seconds." },
  { n: "03", title: "Track your ride",    desc: "Watch your driver approach on the live map." },
  { n: "04", title: "Arrive & pay",       desc: "Payment is automatic. Rate your driver and you're done." },
];

const stats = [
  { icon: Users,      value: "50M+",  label: "Rides completed",    highlight: false },
  { icon: Award,      value: "4.9★",  label: "Average rating",     highlight: true  },
  { icon: TrendingUp, value: "120+",  label: "Cities covered",     highlight: false },
  { icon: Car,        value: "800K+", label: "Active drivers",     highlight: false },
];

const testimonials = [
  { name: "Amara O.", role: "Daily commuter", body: "Drive is the only app I use now. Always on time, always clean cars. The pricing is transparent — no surprises.", rating: 5, initials: "AO" },
  { name: "Kemi A.", role: "Business traveller", body: "The live tracking gives me peace of mind. I know exactly when my driver arrives. Perfect for airport runs.", rating: 5, initials: "KA" },
  { name: "Tunde B.", role: "Weekend rider", body: "Switched from Uber 6 months ago and never looked back. Cheaper, faster, and the drivers are friendlier.", rating: 5, initials: "TB" },
];

const navLinks = ["Ride", "Drive", "Business", "Safety", "Cities"];

/* ─── Hero slides ───────────────────────────────────────────── */
const heroSlides = [
  {
    eyebrow: "Now available in your city",
    headline: ["Your ride,", "on demand."],
    accentLine: 1,
    body: "Drive connects you with verified drivers in seconds. Safe, fast, and transparent pricing — every single time.",
    cta: { label: "Book a ride", href: "/auth/register" },
    ctaSecondary: { label: "Become a driver", href: "/auth/register?role=driver" },
    stats: [["50M+", "Rides"], ["4.9★", "Rating"], ["120+", "Cities"]],
    tag: "🚗  Ride",
  },
  {
    eyebrow: "Zero surge pricing — ever",
    headline: ["Know your fare", "before you go."],
    accentLine: 1,
    body: "See the exact price upfront before you confirm. No hidden fees, no surge multipliers — just honest, transparent fares every time.",
    cta: { label: "See prices now", href: "/auth/register" },
    ctaSecondary: { label: "How pricing works", href: "#" },
    stats: [["$0", "Hidden fees"], ["100%", "Upfront"], ["24/7", "Available"]],
    tag: "💰  Pricing",
  },
  {
    eyebrow: "Background-checked & verified",
    headline: ["Every driver,", "trusted & safe."],
    accentLine: 1,
    body: "All Drive partners pass rigorous background checks, vehicle inspections, and ongoing safety reviews so you can ride with complete confidence.",
    cta: { label: "Ride safely", href: "/auth/register" },
    ctaSecondary: { label: "Our safety standards", href: "#" },
    stats: [["100%", "Verified"], ["5-star", "Avg driver"], ["24/7", "Support"]],
    tag: "🛡️  Safety",
  },
  {
    eyebrow: "Live GPS on every trip",
    headline: ["Track your ride", "in real time."],
    accentLine: 1,
    body: "Watch your driver approach on the live map, share your trip with loved ones, and get accurate ETAs from pickup to drop-off.",
    cta: { label: "Start tracking", href: "/auth/register" },
    ctaSecondary: { label: "See how it works", href: "#" },
    stats: [["<30s", "Match time"], ["Live", "GPS tracking"], ["1-tap", "Share trip"]],
    tag: "📍  Tracking",
  },
  {
    eyebrow: "Earn on your own terms",
    headline: ["Drive more,", "earn more."],
    accentLine: 1,
    body: "Set your own hours, choose your rides, and get paid weekly. Join 800K+ drivers already earning with Drive across 120+ cities.",
    cta: { label: "Start driving", href: "/auth/register?role=driver" },
    ctaSecondary: { label: "See earnings", href: "#" },
    stats: [["800K+", "Drivers"], ["Weekly", "Payouts"], ["120+", "Cities"]],
    tag: "🚕  Drivers",
  },
];

/* ─── Component ─────────────────────────────────────────────── */

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [slide, setSlide]       = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Auto-advance every 4 s with slide-left animation */
  useEffect(() => {
    const id = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setSlide((s) => (s + 1) % heroSlides.length);
        setAnimating(false);
      }, 420); // animation duration
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const goTo = (i: number) => {
    if (i === slide) return;
    setAnimating(true);
    setTimeout(() => { setSlide(i); setAnimating(false); }, 420);
  };

  const s = heroSlides[slide];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)", color: "var(--text-base)", fontFamily: "var(--font-ui)" }}>

      {/* ══════════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════════ */}
      <header
        className={`sp-navbar${scrolled ? " sp-navbar--scrolled" : ""}`}
        style={{ width: "100%" }}
      >
        <div className="sp-navbar__inner">
          {/* Logo */}
          <Link href="/" className="sp-logo">
            <div className="sp-logo__mark">D</div>
            <span className="sp-logo__text">Drive</span>
          </Link>

          {/* Desktop nav */}
          <nav className="sp-nav-links" style={{ display: "flex" }}>
            {navLinks.map((item) => (
              <Link
                key={item}
                href={
                  item === "Drive"    ? "/drive"         :
                  item === "Ride"     ? "/auth/register" :
                  item === "Business" ? "/business"      :
                  item === "Safety"   ? "/safety"        :
                  item === "Cities"   ? "/cities"        : "#"
                }
                className="sp-nav-link"
                style={{ textDecoration: "none" }}
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* CTA group */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link
              href="/auth/login"
              className="sp-btn-base sp-btn-outline"
              style={{ padding: "8px 20px", fontSize: "0.875rem", letterSpacing: "0.14px", textTransform: "none" }}
            >
              Log in
            </Link>
            <Link
              href="/auth/register"
              className="sp-btn-base sp-btn-primary"
              style={{ padding: "10px 24px" }}
            >
              Sign up
            </Link>
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ display: "none", background: "none", border: "none", color: "var(--text-base)", cursor: "pointer" }}
              className="sp-mobile-menu-btn"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)", padding: "16px 24px" }}>
            {navLinks.map((item) => (
              <div key={item} style={{ padding: "12px 0", fontSize: "0.875rem", color: "var(--text-muted)", borderBottom: "1px solid var(--border-faint)", cursor: "pointer" }}>
                {item}
              </div>
            ))}
            <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
              <Link href="/auth/login" className="sp-btn-base sp-btn-outline" style={{ flex: 1, justifyContent: "center", padding: "10px", letterSpacing: "0.14px", textTransform: "none" }}>Log in</Link>
              <Link href="/auth/register" className="sp-btn-base sp-btn-primary" style={{ flex: 1, justifyContent: "center", padding: "10px" }}>Sign up</Link>
            </div>
          </div>
        )}
      </header>

      {/* ══════════════════════════════════════════
          HERO — 5-slide carousel
      ══════════════════════════════════════════ */}
      <section className="sp-hero" style={{ minHeight: "600px", overflow: "hidden" }}>

        {/* ── Shared background image (provided) ── */}
        <div
          className="sp-hero__bg"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=90')",
            opacity: 0.55,
            filter: "brightness(0.85) saturate(1.2)",
          }}
        />

        {/* Gradient: strong left fade so text is readable, right stays open for card */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(100deg, rgba(18,18,18,0.97) 0%, rgba(18,18,18,0.82) 42%, rgba(18,18,18,0.45) 68%, rgba(18,18,18,0.15) 100%)",
        }} />

        {/* Orange glow accent from the image lights */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 60% 40% at 30% 80%, rgba(255,120,30,0.08) 0%, transparent 70%)",
        }} />

        <div className="sp-hero__fade-bottom" />

        <div className="sp-hero__content">
          <div className="sp-container hero-container" style={{ maxWidth: "960px" }}>
            <div className="hero-grid">

              {/* ── LEFT — animated slide content ── */}
              <div
                key={slide}
                style={{
                  display: "flex", flexDirection: "column", gap: "24px",
                  animation: animating
                    ? "heroSlideOut 0.42s cubic-bezier(0.4,0,0.2,1) forwards"
                    : "heroSlideIn 0.42s cubic-bezier(0.4,0,0.2,1) forwards",
                }}
              >
                {/* Slide tag pill */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    background: "var(--accent-dim)", border: "1px solid rgba(30,215,96,0.35)",
                    color: "var(--accent)", fontSize: "0.5rem", fontWeight: 600,
                    letterSpacing: "0.16em", textTransform: "uppercase",
                    padding: "4px 10px", borderRadius: "var(--radius-pill)",
                    fontFamily: "var(--font-ui)",
                  }}>
                    <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--accent)", animation: "sp-pulse 2s infinite" }} />
                    {s.eyebrow}
                  </span>
                  <span style={{
                    fontSize: "0.5rem", fontWeight: 600, color: "var(--text-faint)",
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    fontFamily: "var(--font-ui)",
                  }}>
                    {s.tag}
                  </span>
                </div>

                {/* Headline */}
                <h1 style={{
                  fontSize: "clamp(1.35rem, 3.2vw, 2.1rem)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  color: "var(--text-base)",
                  margin: 0,
                  fontFamily: "var(--font-ui)",
                }}>
                  {s.headline[0]}
                  <br />
                  <span style={{ color: "var(--accent)" }}>{s.headline[1]}</span>
                </h1>

                {/* Body */}
                <p style={{
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.75,
                  maxWidth: "380px",
                  margin: 0,
                  fontFamily: "var(--font-ui)",
                  fontWeight: 400,
                }}>
                  {s.body}
                </p>

                {/* CTAs */}
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <Link href={s.cta.href} className="sp-btn-base sp-btn-primary" style={{ padding: "9px 18px", fontSize: "0.6875rem", fontFamily: "var(--font-ui)" }}>
                    {s.cta.label} <ArrowRight size={12} />
                  </Link>
                  <Link href={s.ctaSecondary.href} className="sp-btn-base sp-btn-outline" style={{ padding: "9px 14px", fontSize: "0.6875rem", letterSpacing: "0.14px", textTransform: "none", fontFamily: "var(--font-ui)" }}>
                    {s.ctaSecondary.label}
                  </Link>
                </div>

                {/* Mini stats */}
                <div style={{ display: "flex", gap: "24px", paddingTop: "2px" }}>
                  {s.stats.map(([val, lbl]) => (
                    <div key={lbl}>
                      <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--text-base)", lineHeight: 1, fontFamily: "var(--font-ui)" }}>{val}</p>
                      <p style={{ fontSize: "0.625rem", color: "var(--text-muted)", marginTop: "3px", fontFamily: "var(--font-ui)" }}>{lbl}</p>
                    </div>
                  ))}
                </div>

                {/* Slide dots */}
                <div style={{ display: "flex", gap: "5px", paddingTop: "2px" }}>
                  {heroSlides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      style={{
                        width: i === slide ? "20px" : "5px",
                        height: "5px",
                        borderRadius: "3px",
                        background: i === slide ? "var(--accent)" : "rgba(255,255,255,0.22)",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        transition: "all 0.35s ease",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* ── RIGHT — booking card (unchanged) ── */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{ background: "var(--bg-surface)", borderRadius: "var(--radius-panel)", padding: "28px", width: "100%", maxWidth: "380px", boxShadow: "var(--shadow-heavy)" }}>
                  <p style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "20px" }}>Where to?</p>

                  {/* Pickup */}
                  <div style={{ position: "relative", marginBottom: "8px" }}>
                    <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }}>
                      <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "var(--accent)" }} />
                    </div>
                    <input
                      type="text"
                      placeholder="Pickup location"
                      style={{ width: "100%", background: "var(--bg-elevated)", color: "var(--text-base)", fontSize: "0.8125rem", padding: "12px 12px 12px 34px", borderRadius: "var(--radius-card)", border: "none", outline: "none", boxShadow: "var(--shadow-inset)" }}
                    />
                  </div>

                  {/* Destination */}
                  <div style={{ position: "relative", marginBottom: "20px" }}>
                    <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }}>
                      <MapPin size={14} style={{ color: "var(--text-muted)" }} />
                    </div>
                    <input
                      type="text"
                      placeholder="Where are you going?"
                      style={{ width: "100%", background: "var(--bg-elevated)", color: "var(--text-base)", fontSize: "0.8125rem", padding: "12px 12px 12px 34px", borderRadius: "var(--radius-card)", border: "none", outline: "none", boxShadow: "var(--shadow-inset)" }}
                    />
                  </div>

                  <Link href="/auth/register" className="sp-btn-base sp-btn-primary" style={{ width: "100%", justifyContent: "center", padding: "14px" }}>
                    See prices
                  </Link>

                  <p style={{ fontSize: "0.625rem", color: "var(--text-faint)", textAlign: "center", marginTop: "10px" }}>
                    No account needed to see prices
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Keyframe styles injected inline */}
        <style>{`
          @keyframes heroSlideIn {
            from { opacity: 0; transform: translateX(48px); }
            to   { opacity: 1; transform: translateX(0); }
          }
          @keyframes heroSlideOut {
            from { opacity: 1; transform: translateX(0); }
            to   { opacity: 0; transform: translateX(-48px); }
          }
        `}</style>
      </section>

      {/* ══════════════════════════════════════════
          RIDE TYPES
      ══════════════════════════════════════════ */}
      <section style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "64px 0" }}>
        <div className="sp-container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p className="sp-section-eyebrow" style={{ justifyContent: "center" }}>Choose your ride</p>
            <h2 style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", fontWeight: 900, color: "var(--text-base)", marginTop: "8px" }}>
              A ride for every moment
            </h2>
          </div>

          <div className="sp-grid-4" style={{ gap: "16px" }}>
            {rideTypes.map((r, i) => {
              const Icon = r.icon;
              return (
                <div
                  key={r.label}
                  className="sp-card-elevated"
                  style={{ padding: "24px", cursor: "pointer" }}
                >
                  <div style={{ width: "48px", height: "48px", borderRadius: "var(--radius-card)", background: i === 0 ? "var(--accent-dim)" : "var(--bg-base)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                    <Icon size={22} style={{ color: i === 0 ? "var(--accent)" : "var(--text-muted)" }} />
                  </div>
                  <h3 style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--text-base)", marginBottom: "6px" }}>{r.label}</h3>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "16px", lineHeight: 1.5 }}>{r.desc}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.6875rem", color: "var(--accent)", fontWeight: 700 }}>{r.eta}</span>
                    <span style={{ fontSize: "0.6875rem", color: "var(--text-muted)" }}>{r.price}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURES
      ══════════════════════════════════════════ */}
      <section style={{ background: "var(--bg-base)", padding: "96px 0" }}>
        <div className="sp-container">
          <div style={{ marginBottom: "56px" }}>
            <p className="sp-section-eyebrow">Why Drive</p>
            <h2 style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", fontWeight: 900, color: "var(--text-base)", marginTop: "8px", maxWidth: "480px" }}>
              Everything you need in a ride
            </h2>
          </div>

          <div className="sp-grid-3" style={{ gap: "2px", background: "var(--border-faint)", borderRadius: "var(--radius-card)", overflow: "hidden" }}>
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="sp-feature-card"
                  style={{ flexDirection: "column", gap: "12px", padding: "28px 24px", borderRadius: 0 }}
                >
                  <div className="sp-feature-card__icon">
                    <Icon size={20} />
                  </div>
                  <h3 style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--text-base)" }}>{f.title}</h3>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", lineHeight: 1.7 }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════ */}
      <section style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "96px 0" }}>
        <div className="sp-container">
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <p className="sp-section-eyebrow" style={{ justifyContent: "center" }}>How it works</p>
            <h2 style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", fontWeight: 900, color: "var(--text-base)", marginTop: "8px" }}>
              Ride in 4 simple steps
            </h2>
          </div>

          <div className="sp-steps-grid">
            {steps.map((s, i) => (
              <div key={s.n} className="sp-step">
                <div className={`sp-step__number${i === 1 ? " sp-step__number--active" : ""}`}>
                  {s.n}
                </div>
                <h3 style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--text-base)", marginBottom: "8px" }}>{s.title}</h3>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATS
      ══════════════════════════════════════════ */}
      <section style={{ background: "var(--bg-base)" }}>
        <div className="sp-container" style={{ padding: 0 }}>
          <div className="sp-stats-grid">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className={`sp-stat-card${s.highlight ? " sp-stat-card--accent" : ""}`}>
                  <div className="sp-stat-card__icon">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="sp-stat-card__value">{s.value}</p>
                    <p className="sp-stat-card__label">{s.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DRIVER CTA SPLIT
      ══════════════════════════════════════════ */}
      <section style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)", padding: "96px 0" }}>
        <div className="sp-container">
          <div className="sp-grid-2" style={{ gap: "24px", alignItems: "stretch" }}>

            {/* Rider card */}
            <div className="sp-cta-card" style={{ background: "var(--bg-elevated)", borderRadius: "var(--radius-panel)", padding: "48px", display: "flex", flexDirection: "column", gap: "20px", boxShadow: "var(--shadow-medium)" }}>
              <span style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)" }}>For riders</span>
              <h2 style={{ fontSize: "clamp(1.125rem, 2.5vw, 1.5rem)", fontWeight: 900, color: "var(--text-base)", lineHeight: 1.1 }}>
                Ready to ride smarter?
              </h2>
              <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", lineHeight: 1.75 }}>
                Join millions of riders who trust Drive every day. Sign up free and book your first ride in under a minute.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {["No subscription required", "Upfront pricing always", "Cancel anytime, no fees"].map((p) => (
                  <div key={p} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.8125rem", color: "var(--text-muted)" }}>
                    <CheckCircle2 size={15} style={{ color: "var(--accent)", flexShrink: 0 }} />
                    {p}
                  </div>
                ))}
              </div>
              <Link href="/auth/register" className="sp-btn-base sp-btn-primary" style={{ padding: "14px 28px", marginTop: "8px", width: "fit-content" }}>
                Get started free <ArrowRight size={15} />
              </Link>
            </div>

            {/* Driver card */}
            <div className="sp-cta-card" style={{ background: "var(--accent)", borderRadius: "var(--radius-panel)", padding: "48px", display: "flex", flexDirection: "column", gap: "20px", boxShadow: "var(--shadow-heavy)" }}>
              <span style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(0,0,0,0.5)" }}>For drivers</span>
              <h2 style={{ fontSize: "clamp(1.125rem, 2.5vw, 1.5rem)", fontWeight: 900, color: "var(--text-on-accent)", lineHeight: 1.1 }}>
                Earn on your schedule
              </h2>
              <p style={{ fontSize: "0.8125rem", color: "rgba(0,0,0,0.65)", lineHeight: 1.75 }}>
                Become a Drive partner and earn competitive income whenever you want. Full flexibility, full control.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {["Set your own hours", "Weekly direct payouts", "In-app driver support"].map((p) => (
                  <div key={p} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.8125rem", color: "rgba(0,0,0,0.65)" }}>
                    <CheckCircle2 size={15} style={{ color: "rgba(0,0,0,0.5)", flexShrink: 0 }} />
                    {p}
                  </div>
                ))}
              </div>
              <Link href="/auth/register?role=driver" className="sp-btn-base" style={{ background: "var(--bg-base)", color: "var(--text-base)", padding: "11px 24px", borderRadius: "var(--radius-pill-lg)", marginTop: "8px", width: "fit-content", letterSpacing: "1.4px", textTransform: "uppercase", fontSize: "0.8125rem", fontWeight: 700 }}>
                Drive with us <ArrowRight size={15} />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section style={{ background: "var(--bg-base)", padding: "96px 0" }}>
        <div className="sp-container">
          <div style={{ marginBottom: "56px" }}>
            <p className="sp-section-eyebrow">Riders say</p>
            <h2 style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", fontWeight: 900, color: "var(--text-base)", marginTop: "8px" }}>
              Trusted by millions
            </h2>
          </div>

          <div className="sp-grid-3">
            {testimonials.map((t) => (
              <div key={t.name} className="sp-card-elevated" style={{ padding: "28px" }}>
                <div style={{ display: "flex", gap: "3px", marginBottom: "16px" }}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={13} style={{ color: "var(--accent)", fill: "var(--accent)" }} />
                  ))}
                </div>
                <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", lineHeight: 1.75, fontStyle: "italic", marginBottom: "20px" }}>
                  &ldquo;{t.body}&rdquo;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "var(--accent-dim)", border: "1px solid rgba(30,215,96,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.625rem", fontWeight: 700, color: "var(--accent)", flexShrink: 0 }}>
                    {t.initials}
                  </div>
                  <div>
                    <p style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--text-base)" }}>{t.name}</p>
                    <p style={{ fontSize: "0.6875rem", color: "var(--text-muted)" }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          APP DOWNLOAD CTA
      ══════════════════════════════════════════ */}
      <section style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)", padding: "96px 0" }}>
        <div className="sp-container" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
          <p className="sp-section-eyebrow" style={{ justifyContent: "center" }}>Get the app</p>
          <h2 style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", fontWeight: 900, color: "var(--text-base)", maxWidth: "560px", lineHeight: 1.1 }}>
            Download Drive and start riding today
          </h2>
          <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", maxWidth: "440px", lineHeight: 1.75 }}>
            Available on iOS and Android. Book your first ride in under 30 seconds.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/auth/register" className="sp-btn-base sp-btn-primary" style={{ padding: "11px 24px", fontSize: "0.8125rem" }}>
              <Smartphone size={14} /> Download for iOS
            </Link>
            <Link href="/auth/register" className="sp-btn-base sp-btn-dark" style={{ padding: "11px 24px", fontSize: "0.8125rem" }}>
              <Smartphone size={14} /> Download for Android
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer className="sp-footer">
        <div className="sp-container">
          <div className="sp-footer__grid">
            {/* Brand */}
            <div>
              <Link href="/" className="sp-logo">
                <div className="sp-logo__mark">D</div>
                <span className="sp-logo__text">Drive</span>
              </Link>
              <p className="sp-footer__brand-desc">
                Safe, fast, and reliable rides at your fingertips. Available in 120+ cities worldwide.
              </p>
              <div className="sp-footer__socials">
                {["𝕏", "f", "in", "ig"].map((s) => (
                  <div key={s} className="sp-footer__social-btn">{s}</div>
                ))}
              </div>
            </div>

            {[
              { heading: "Company",  links: ["About us", "Careers", "Press", "Blog"] },
              { heading: "Riders",   links: ["How it works", "Safety", "Cities", "Pricing"] },
              { heading: "Drivers",  links: ["Drive with us", "Requirements", "Earnings", "Support"] },
            ].map((col) => (
              <div key={col.heading}>
                <h4 className="sp-footer__col-title">{col.heading}</h4>
                {col.links.map((l) => (
                  <span key={l} className="sp-footer__link">{l}</span>
                ))}
              </div>
            ))}
          </div>

          <hr className="sp-separator" />

          <div className="sp-footer__bottom" style={{ marginTop: "24px" }}>
            <p>© {new Date().getFullYear()} Drive Technologies Inc. All rights reserved.</p>
            <div className="sp-footer__legal">
              {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((l) => (
                <span key={l}>{l}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
