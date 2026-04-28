"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ArrowRight, CheckCircle2, Star, Shield, Clock,
  CreditCard, Smartphone, TrendingUp, Users, Award,
  Car, ChevronRight, Menu, X, MapPin, Zap, Navigation,
} from "lucide-react";
import FadeInSection from "@/components/ui/FadeInSection";

/* ─── Data ─────────────────────────────────────────────────── */

const navLinks = ["Ride", "Drive", "Business", "Safety", "Cities"];

const earnings = [
  { period: "Per hour",  value: "$18–28",  note: "Peak hours" },
  { period: "Per day",   value: "$120–200", note: "Full day" },
  { period: "Per week",  value: "$600–900", note: "Part-time" },
  { period: "Per month", value: "$2,400+",  note: "Full-time" },
];

const requirements = [
  { icon: Car,        title: "Valid vehicle",       desc: "2010 or newer, 4-door, good condition. We accept most makes and models." },
  { icon: Shield,     title: "Clean record",        desc: "Pass a background check and have a valid driver's licence with no major violations." },
  { icon: Smartphone, title: "Smartphone",          desc: "iPhone or Android to run the Drive partner app and receive ride requests." },
  { icon: CreditCard, title: "Bank account",        desc: "A valid bank account for weekly direct deposit payouts." },
];

const steps = [
  { n: "01", title: "Sign up online",      desc: "Create your driver account in minutes. No paperwork, no office visit required." },
  { n: "02", title: "Submit documents",    desc: "Upload your licence, insurance, and vehicle registration through the app." },
  { n: "03", title: "Pass the review",     desc: "We verify your background and documents — usually within 24 hours." },
  { n: "04", title: "Start earning",       desc: "Go online whenever you want and start accepting rides immediately." },
];

const perks = [
  { icon: Clock,       title: "Your schedule",      desc: "Go online and offline whenever you want. No minimum hours, no commitments." },
  { icon: CreditCard,  title: "Weekly payouts",     desc: "Earnings deposited directly to your bank every Monday. No waiting." },
  { icon: Shield,      title: "Insurance cover",    desc: "Comprehensive insurance coverage active from the moment you accept a ride." },
  { icon: TrendingUp,  title: "Surge bonuses",      desc: "Earn extra during peak hours, events, and bad weather — automatically." },
  { icon: Zap,         title: "Instant cash out",   desc: "Need money now? Cash out your earnings instantly for a small fee." },
  { icon: Users,       title: "Driver community",   desc: "Access exclusive driver forums, tips, and local meetups in your city." },
];

const testimonials = [
  { name: "Emeka T.", city: "Lagos", earnings: "$1,840/mo", body: "I drive 5 days a week and earn more than my old 9-to-5. The flexibility is unbeatable — I pick my kids up from school every day.", initials: "ET", rating: 5 },
  { name: "Fatima A.", city: "Abuja", earnings: "$920/mo", body: "I drive part-time on weekends and evenings. It's the perfect side income. Payouts are always on time, every Monday.", initials: "FA", rating: 5 },
  { name: "Chidi O.", city: "Port Harcourt", earnings: "$2,100/mo", body: "Been driving with Drive for 2 years. The surge bonuses during peak hours are incredible. Best decision I ever made.", initials: "CO", rating: 5 },
];

const stats = [
  { icon: Users,      value: "800K+", label: "Active drivers",   highlight: false },
  { icon: Award,      value: "4.8★",  label: "Driver rating",    highlight: true  },
  { icon: TrendingUp, value: "120+",  label: "Cities",           highlight: false },
  { icon: CreditCard, value: "$0",    label: "Sign-up fee",      highlight: false },
];

const faqs = [
  { q: "How much can I earn?",                  a: "Earnings vary by city, hours, and demand. Most full-time drivers earn $1,800–$2,400/month. Part-time drivers typically earn $600–$900/month." },
  { q: "When do I get paid?",                   a: "Earnings are deposited every Monday via direct bank transfer. You can also cash out instantly at any time for a small processing fee." },
  { q: "What vehicle do I need?",               a: "Any 4-door vehicle from 2010 or newer in good condition. We accept most makes and models. Your vehicle must pass a basic safety inspection." },
  { q: "How long does approval take?",          a: "Most applications are reviewed within 24 hours. Once approved, you can start driving immediately." },
  { q: "Is there a minimum hours requirement?", a: "No. Drive whenever you want, for as long as you want. There are no minimum hours or commitments." },
];

/* ─── Component ─────────────────────────────────────────────── */

export default function DrivePage() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [openFaq, setOpenFaq]     = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)", color: "var(--text-base)", fontFamily: "var(--font-ui)" }}>

      {/* ══════════════════════════════════════════
          NAVBAR (identical to homepage)
      ══════════════════════════════════════════ */}
      <header
        className={`sp-navbar${scrolled ? " sp-navbar--scrolled" : ""}`}
        style={{ width: "100%" }}
      >
        <div className="sp-navbar__inner">
          <Link href="/" className="sp-logo">
            <div className="sp-logo__mark">D</div>
            <span className="sp-logo__text">Drive</span>
          </Link>

          <nav className="sp-nav-links" style={{ display: "flex" }}>
            {navLinks.map((item) => (
              <Link
                key={item}
                href={item === "Drive" ? "/drive" : item === "Ride" ? "/auth/register" : item === "Business" ? "/business" : item === "Safety" ? "/safety" : item === "Cities" ? "/cities" : "#"}
                className={`sp-nav-link${item === "Drive" ? " sp-nav-link--active" : ""}`}
                style={{ textDecoration: "none" }}
              >
                {item}
              </Link>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link href="/auth/login" className="sp-btn-base sp-btn-outline" style={{ padding: "8px 20px", fontSize: "0.875rem", letterSpacing: "0.14px", textTransform: "none" }}>
              Log in
            </Link>
            <Link href="/auth/register?role=driver" className="sp-btn-base sp-btn-primary" style={{ padding: "10px 24px" }}>
              Start driving
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)} className="sp-mobile-menu-btn" style={{ display: "none", background: "none", border: "none", color: "var(--text-base)", cursor: "pointer" }} aria-label="Toggle menu">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

      </header>

      {/* ══════════════════════════════════════════
          MOBILE MENU — full-screen slide-in panel
      ══════════════════════════════════════════ */}
      {menuOpen && (
        <>
          <div
            onClick={() => setMenuOpen(false)}
            style={{
              position: "fixed", inset: 0, zIndex: 998,
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              animation: "mmFadeIn 0.25s ease forwards",
            }}
          />
          <div style={{
            position: "fixed", top: 0, right: 0, bottom: 0,
            width: "min(320px, 88vw)",
            zIndex: 999,
            background: "#111",
            display: "flex", flexDirection: "column",
            animation: "mmSlideIn 0.3s cubic-bezier(0.4,0,0.2,1) forwards",
            boxShadow: "-8px 0 40px rgba(0,0,0,0.6)",
            overflowY: "auto",
          }}>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "20px 20px 16px",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}>
              <Link href="/" onClick={() => setMenuOpen(false)} style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
                <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "0.75rem", color: "#fff" }}>D</div>
                <span style={{ fontSize: "1rem", fontWeight: 900, color: "#fff", letterSpacing: "-0.01em" }}>Drive</span>
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                style={{ width: "34px", height: "34px", borderRadius: "50%", background: "rgba(255,255,255,0.08)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff" }}
              >
                <X size={16} />
              </button>
            </div>
            <nav style={{ flex: 1, padding: "12px 12px 0" }}>
              {[
                { label: "Ride",     href: "/auth/register", icon: Car,        desc: "Book a ride instantly"    },
                { label: "Drive",    href: "/drive",         icon: Navigation,  desc: "Become a driver partner"  },
                { label: "Business", href: "/business",      icon: TrendingUp,  desc: "Corporate ride solutions" },
                { label: "Safety",   href: "/safety",        icon: Shield,      desc: "How we keep you safe"     },
                { label: "Cities",   href: "/cities",        icon: MapPin,      desc: "Available in 120+ cities" },
              ].map(({ label, href, icon: Icon, desc }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  style={{ display: "flex", alignItems: "center", gap: "14px", padding: "13px 12px", borderRadius: "12px", textDecoration: "none", marginBottom: "4px" }}
                >
                  <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(224,49,16,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={18} style={{ color: "var(--accent)" }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: "0.9375rem", fontWeight: 600, color: "#fff", lineHeight: 1, margin: 0 }}>{label}</p>
                    <p style={{ fontSize: "0.6875rem", color: "#6a6a6a", marginTop: "3px", margin: 0 }}>{desc}</p>
                  </div>
                  <ChevronRight size={15} style={{ color: "#4d4d4d", flexShrink: 0 }} />
                </Link>
              ))}
            </nav>
            <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", margin: "16px 20px 0" }} />
            <div style={{ padding: "16px 20px 32px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <Link href="/auth/register?role=driver" onClick={() => setMenuOpen(false)} className="sp-btn-base sp-btn-primary" style={{ width: "100%", justifyContent: "center", padding: "14px", fontSize: "0.9375rem", letterSpacing: "0.5px", textTransform: "none" }}>
                Start driving
              </Link>
              <Link href="/auth/login" onClick={() => setMenuOpen(false)} className="sp-btn-base sp-btn-outline" style={{ width: "100%", justifyContent: "center", padding: "13px", fontSize: "0.9375rem", letterSpacing: "0.14px", textTransform: "none" }}>
                Log in
              </Link>
            </div>
          </div>
          <style>{`
            @keyframes mmFadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes mmSlideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
          `}</style>
        </>
      )}

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="sp-hero" style={{ minHeight: "580px" }}>
        <div
          className="sp-hero__bg"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=90')",
            opacity: 0.45,
            filter: "brightness(0.8) saturate(1.1)",
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(18,18,18,0.97) 0%, rgba(18,18,18,0.82) 45%, rgba(18,18,18,0.4) 75%, rgba(18,18,18,0.15) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 50% 40% at 25% 85%, rgba(224,49,16,0.07) 0%, transparent 70%)" }} />
        <div className="sp-hero__fade-bottom" />

        <div className="sp-hero__content">
          <div className="sp-container" style={{ padding: "80px 64px" }}>
            <div style={{ maxWidth: "600px", display: "flex", flexDirection: "column", gap: "24px" }}>

              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "var(--accent-dim)", border: "1px solid rgba(224,49,16,0.3)", color: "var(--accent)", fontSize: "0.5rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", padding: "5px 12px", borderRadius: "var(--radius-pill)", width: "fit-content" }}>
                <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--accent)", animation: "sp-pulse 2s infinite" }} />
                800,000+ drivers already earning
              </span>

              <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, lineHeight: 1.06, letterSpacing: "-0.02em", color: "var(--text-base)", margin: 0 }}>
                Drive on your terms.
                <br />
                <span style={{ color: "var(--accent)" }}>Earn what you deserve.</span>
              </h1>

              <p style={{ fontSize: "0.9375rem", color: "var(--text-muted)", lineHeight: 1.8, maxWidth: "480px", margin: 0 }}>
                Set your own hours, choose your rides, and get paid weekly. Join hundreds of thousands of drivers already earning with Drive across 120+ cities.
              </p>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <Link href="/auth/register?role=driver" className="sp-btn-base sp-btn-primary" style={{ padding: "13px 28px", fontSize: "0.875rem" }}>
                  Start driving today <ArrowRight size={15} />
                </Link>
                <Link href="#how-it-works" className="sp-btn-base sp-btn-outline" style={{ padding: "13px 22px", fontSize: "0.875rem", letterSpacing: "0.14px", textTransform: "none" }}>
                  See how it works
                </Link>
              </div>

              <div style={{ display: "flex", gap: "32px", paddingTop: "8px" }}>
                {[["$0", "Sign-up fee"], ["24h", "Approval time"], ["Weekly", "Payouts"]].map(([val, lbl]) => (
                  <div key={lbl}>
                    <p style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--text-base)", lineHeight: 1 }}>{val}</p>
                    <p style={{ fontSize: "0.6875rem", color: "var(--text-muted)", marginTop: "3px" }}>{lbl}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════ */}
      <section style={{ background: "var(--bg-base)" }}>
        <FadeInSection direction="up">
          <div className="sp-container" style={{ padding: 0 }}>
            <div className="sp-stats-grid">
              {stats.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className={`sp-stat-card${s.highlight ? " sp-stat-card--accent" : ""}`}>
                    <div className="sp-stat-card__icon"><Icon size={20} /></div>
                    <div>
                      <p className="sp-stat-card__value">{s.value}</p>
                      <p className="sp-stat-card__label">{s.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* ══════════════════════════════════════════
          EARNINGS
      ══════════════════════════════════════════ */}
      <section style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "80px 0" }}>
        <FadeInSection direction="up">
          <div className="sp-container">
            <div className="sp-grid-2" style={{ alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <p className="sp-section-eyebrow">Earnings potential</p>
              <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 700, color: "var(--text-base)", lineHeight: 1.1, margin: 0 }}>
                Real money,
                <br />
                <span style={{ color: "var(--accent)" }}>real flexibility.</span>
              </h2>
              <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.8, maxWidth: "400px" }}>
                Your earnings depend on how much you drive. Most full-time drivers earn $1,800–$2,400 per month. Part-time drivers typically earn $600–$900. Surge bonuses can significantly boost your income during peak hours.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {["No commission on first 10 rides", "Surge bonuses up to 3× base fare", "Instant cash-out available 24/7"].map((p) => (
                  <div key={p} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.875rem", color: "var(--text-muted)" }}>
                    <CheckCircle2 size={14} style={{ color: "var(--accent)", flexShrink: 0 }} />
                    {p}
                  </div>
                ))}
              </div>
              <Link href="/auth/register?role=driver" className="sp-btn-base sp-btn-primary" style={{ padding: "12px 24px", fontSize: "0.8125rem", width: "fit-content", marginTop: "4px" }}>
                Calculate my earnings <ArrowRight size={14} />
              </Link>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {earnings.map((e) => (
                <div key={e.period} style={{ background: "var(--bg-elevated)", borderRadius: "12px", padding: "24px", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <p style={{ fontSize: "0.625rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-faint)" }}>{e.period}</p>
                  <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--accent)", lineHeight: 1 }}>{e.value}</p>
                  <p style={{ fontSize: "0.6875rem", color: "var(--text-muted)" }}>{e.note}</p>
                </div>
              ))}
            </div>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* ══════════════════════════════════════════
          PERKS
      ══════════════════════════════════════════ */}
      <section style={{ background: "var(--bg-base)", padding: "80px 0" }}>
        <FadeInSection direction="up">
          <div className="sp-container">
            <div style={{ marginBottom: "48px" }}>
              <p className="sp-section-eyebrow">Driver benefits</p>
              <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 700, color: "var(--text-base)", marginTop: "8px", maxWidth: "480px", lineHeight: 1.1 }}>
                Everything you need to succeed
              </h2>
            </div>

            <div className="sp-grid-3" style={{ gap: "2px", background: "var(--border-faint)", borderRadius: "var(--radius-card)", overflow: "hidden" }}>
            {perks.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="sp-feature-card" style={{ flexDirection: "column", gap: "12px", padding: "28px 24px", borderRadius: 0 }}>
                  <div className="sp-feature-card__icon"><Icon size={20} /></div>
                  <h3 style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--text-base)" }}>{p.title}</h3>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", lineHeight: 1.7 }}>{p.desc}</p>
                </div>
              );
            })}
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* ══════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════ */}
      <section id="how-it-works" style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "80px 0" }}>
        <FadeInSection direction="up">
          <div className="sp-container">
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <p className="sp-section-eyebrow" style={{ justifyContent: "center" }}>Getting started</p>
              <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 700, color: "var(--text-base)", marginTop: "8px" }}>
                On the road in 4 steps
              </h2>
            </div>

            <div className="sp-steps-grid">
            {steps.map((s, i) => (
              <div key={s.n} className="sp-step">
                <div className={`sp-step__number${i === 0 ? " sp-step__number--active" : ""}`}>{s.n}</div>
                <h3 style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--text-base)", marginBottom: "8px" }}>{s.title}</h3>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* ══════════════════════════════════════════
          REQUIREMENTS
      ══════════════════════════════════════════ */}
      <section style={{ background: "var(--bg-base)", padding: "80px 0" }}>
        <FadeInSection direction="up">
          <div className="sp-container">
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <p className="sp-section-eyebrow" style={{ justifyContent: "center" }}>Requirements</p>
              <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 700, color: "var(--text-base)", marginTop: "8px" }}>
                What you need to drive
              </h2>
            </div>

            <div className="sp-grid-4" style={{ gap: "16px" }}>
            {requirements.map((r) => {
              const Icon = r.icon;
              return (
                <div key={r.title} className="sp-card-elevated" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "var(--radius-card)", background: "var(--accent-dim)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={20} style={{ color: "var(--accent)" }} />
                  </div>
                  <h3 style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--text-base)" }}>{r.title}</h3>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", lineHeight: 1.7 }}>{r.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
        </FadeInSection>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)", padding: "80px 0" }}>
        <FadeInSection direction="up">
          <div className="sp-container">
            <div style={{ marginBottom: "48px" }}>
              <p className="sp-section-eyebrow">Driver stories</p>
              <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 700, color: "var(--text-base)", marginTop: "8px" }}>
                Hear from our drivers
              </h2>
            </div>

            <div className="sp-grid-3">
            {testimonials.map((t) => (
              <div key={t.name} className="sp-card-elevated" style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", gap: "3px" }}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={12} style={{ color: "var(--accent)", fill: "var(--accent)" }} />
                  ))}
                </div>
                <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", lineHeight: 1.75, fontStyle: "italic", flex: 1 }}>
                  &ldquo;{t.body}&rdquo;
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "var(--accent-dim)", border: "1px solid rgba(224,49,16,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.625rem", fontWeight: 700, color: "var(--accent)", flexShrink: 0 }}>
                      {t.initials}
                    </div>
                    <div>
                      <p style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--text-base)" }}>{t.name}</p>
                      <p style={{ fontSize: "0.6875rem", color: "var(--text-muted)" }}>{t.city}</p>
                    </div>
                  </div>
                  <div style={{ background: "var(--accent-dim)", border: "1px solid rgba(224,49,16,0.2)", borderRadius: "500px", padding: "4px 10px" }}>
                    <p style={{ fontSize: "0.6875rem", fontWeight: 700, color: "var(--accent)" }}>{t.earnings}</p>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* ══════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════ */}
      <section style={{ background: "var(--bg-base)", borderTop: "1px solid var(--border)", padding: "80px 0" }}>
        <div className="sp-container">
          <div className="sp-grid-2" style={{ alignItems: "start" }}>

            <div style={{ position: "sticky", top: "88px" }}>
              <p className="sp-section-eyebrow">FAQ</p>
              <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 700, color: "var(--text-base)", marginTop: "8px", lineHeight: 1.1 }}>
                Common questions
              </h2>
              <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.8, marginTop: "16px" }}>
                Still have questions? Our driver support team is available 24/7 to help.
              </p>
              <Link href="#" style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginTop: "20px", fontSize: "0.8125rem", fontWeight: 600, color: "var(--accent)", textDecoration: "none" }}>
                Contact support <ChevronRight size={14} />
              </Link>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  style={{ borderBottom: "1px solid var(--border-faint)", overflow: "hidden" }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: "16px" }}
                  >
                    <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-base)" }}>{faq.q}</span>
                    <span style={{ color: "var(--accent)", flexShrink: 0, transition: "transform 0.2s", transform: openFaq === i ? "rotate(90deg)" : "rotate(0deg)", display: "flex" }}>
                      <ChevronRight size={16} />
                    </span>
                  </button>
                  {openFaq === i && (
                    <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", lineHeight: 1.8, paddingBottom: "18px" }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          BOTTOM CTA
      ══════════════════════════════════════════ */}
      <section style={{ background: "var(--accent)", padding: "80px 0" }}>
        <div className="sp-container" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 700, color: "#fff", lineHeight: 1.1, maxWidth: "560px" }}>
            Ready to start earning with Drive?
          </h2>
          <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.75)", maxWidth: "440px", lineHeight: 1.75 }}>
            Sign up in minutes. No sign-up fee. Start earning as soon as you&apos;re approved — usually within 24 hours.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
            <Link
              href="/auth/register?role=driver"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#000", color: "#fff", fontFamily: "var(--font-ui)", fontSize: "0.8125rem", fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase", padding: "13px 28px", borderRadius: "500px", textDecoration: "none", boxShadow: "rgba(0,0,0,0.3) 0px 8px 24px", transition: "all 0.15s ease" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "var(--bg-elevated)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#000")}
            >
              Apply to drive <ArrowRight size={14} />
            </Link>
            <Link
              href="#how-it-works"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "transparent", color: "#fff", fontFamily: "var(--font-ui)", fontSize: "0.8125rem", fontWeight: 600, padding: "13px 24px", borderRadius: "500px", textDecoration: "none", border: "1px solid rgba(255,255,255,0.4)", transition: "all 0.15s ease", letterSpacing: "0.14px" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.borderColor = "#fff")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.4)")}
            >
              Learn more
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
            <div>
              <Link href="/" className="sp-logo">
                <div className="sp-logo__mark">D</div>
                <span className="sp-logo__text">Drive</span>
              </Link>
              <p className="sp-footer__brand-desc">Safe, fast, and reliable rides at your fingertips. Available in 120+ cities worldwide.</p>
              <div className="sp-footer__socials">
                {["𝕏", "f", "in", "ig"].map((s) => (
                  <div key={s} className="sp-footer__social-btn">{s}</div>
                ))}
              </div>
            </div>
            {[
              { heading: "Company",  links: ["About us", "Careers", "Press", "Blog"] },
              { heading: "Drivers",  links: ["How it works", "Requirements", "Earnings", "Support"] },
              { heading: "Riders",   links: ["Book a ride", "Safety", "Cities", "Pricing"] },
            ].map((col) => (
              <div key={col.heading}>
                <h4 className="sp-footer__col-title">{col.heading}</h4>
                {col.links.map((l) => <span key={l} className="sp-footer__link">{l}</span>)}
              </div>
            ))}
          </div>
          <hr className="sp-separator" />
          <div className="sp-footer__bottom" style={{ marginTop: "24px" }}>
            <p>© {new Date().getFullYear()} Drive Technologies Inc. All rights reserved.</p>
            <div className="sp-footer__legal">
              {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((l) => <span key={l}>{l}</span>)}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
