"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ArrowRight, CheckCircle2, Star, Shield, CreditCard,
  TrendingUp, Users, Zap, Menu, X,
} from "lucide-react";
import FadeInSection from "@/components/ui/FadeInSection";

/* ─── Data ─────────────────────────────────────────────────── */

const navLinks = ["Ride", "Drive", "Business", "Safety", "Cities"];

const features = [
  { icon: CreditCard,   title: "Central billing",      desc: "One invoice for all company rides. Consolidate expenses and eliminate reimbursement headaches." },
  { icon: Shield,       title: "Spending controls",    desc: "Set per-ride, daily, or monthly limits for each employee. Stay on budget automatically." },
  { icon: TrendingUp,   title: "Trip reports",         desc: "Detailed analytics and exportable reports for every ride. Perfect for accounting and audits." },
  { icon: Zap,          title: "Priority booking",     desc: "Business accounts get priority driver matching — no waiting during peak hours." },
  { icon: Users,        title: "Dedicated support",    desc: "A dedicated account manager and 24/7 priority support line for your business." },
  { icon: CheckCircle2, title: "Policy compliance",    desc: "Enforce travel policies automatically. Approve or restrict ride categories per employee role." },
];

const steps = [
  { n: "01", title: "Create account",  desc: "Sign up your company in minutes. No contracts, no setup fees required." },
  { n: "02", title: "Add your team",   desc: "Invite employees by email. They get the app and are linked to your account instantly." },
  { n: "03", title: "Set policies",    desc: "Define spending limits, approved ride types, and working-hours restrictions." },
  { n: "04", title: "Start riding",    desc: "Your team books rides normally. Billing and reporting happen automatically." },
];

const stats = [
  { icon: Users,      value: "500+",  label: "Companies",       highlight: false },
  { icon: CreditCard, value: "$0",    label: "Setup fee",       highlight: false },
  { icon: Zap,        value: "24/7",  label: "Support",         highlight: true  },
  { icon: TrendingUp, value: "120+",  label: "Cities covered",  highlight: false },
];

const pricingTiers = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    desc: "Perfect for small teams getting started.",
    employees: "Up to 10 employees",
    features: ["Central billing", "Basic trip reports", "Email support", "Spending limits", "Mobile app access"],
    cta: "Get started free",
    accent: false,
  },
  {
    name: "Business",
    price: "$49",
    period: "/mo",
    desc: "Everything you need to manage a growing team.",
    employees: "Up to 100 employees",
    features: ["Everything in Starter", "Advanced analytics", "Priority booking", "Dedicated account manager", "Policy compliance tools", "API access"],
    cta: "Start free trial",
    accent: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "Tailored solutions for large organisations.",
    employees: "Unlimited employees",
    features: ["Everything in Business", "Custom integrations", "SSO & SAML", "SLA guarantee", "On-site onboarding", "Custom reporting"],
    cta: "Contact sales",
    accent: false,
  },
];

const testimonials = [
  { name: "Sarah M.", role: "Head of Operations, TechCorp", body: "Drive Business cut our travel admin time by 80%. The central billing alone saved us hours every month. Highly recommended.", rating: 5, initials: "SM" },
  { name: "James O.", role: "CFO, Meridian Group", body: "The spending controls and real-time reports give us full visibility. We've reduced travel costs by 30% since switching.", rating: 5, initials: "JO" },
  { name: "Aisha K.", role: "Office Manager, Nexus Ltd", body: "Onboarding our 60-person team took less than a day. The policy compliance feature is a game-changer for us.", rating: 5, initials: "AK" },
];

/* ─── Component ─────────────────────────────────────────────── */

export default function BusinessPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          <Link href="/" className="sp-logo">
            <div className="sp-logo__mark">D</div>
            <span className="sp-logo__text">Drive</span>
          </Link>

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
                className={`sp-nav-link${item === "Business" ? " sp-nav-link--active" : ""}`}
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
            <Link href="/auth/register" className="sp-btn-base sp-btn-primary" style={{ padding: "10px 24px" }}>
              Get started
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="sp-mobile-menu-btn"
              style={{ display: "none", background: "none", border: "none", color: "var(--text-base)", cursor: "pointer" }}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)", padding: "16px 24px" }}>
            {navLinks.map((item) => (
              <div key={item} style={{ padding: "12px 0", fontSize: "0.875rem", color: "var(--text-muted)", borderBottom: "1px solid var(--border-faint)", cursor: "pointer" }}>{item}</div>
            ))}
            <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
              <Link href="/auth/login" className="sp-btn-base sp-btn-outline" style={{ flex: 1, justifyContent: "center", padding: "10px", letterSpacing: "0.14px", textTransform: "none" }}>Log in</Link>
              <Link href="/auth/register" className="sp-btn-base sp-btn-primary" style={{ flex: 1, justifyContent: "center", padding: "10px" }}>Get started</Link>
            </div>
          </div>
        )}
      </header>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="sp-hero" style={{ minHeight: "580px" }}>
        <div
          className="sp-hero__bg"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=90')",
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
                500+ companies already on board
              </span>

              <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, lineHeight: 1.06, letterSpacing: "-0.02em", color: "var(--text-base)", margin: 0 }}>
                Business travel, simplified.
                <br />
                <span style={{ color: "var(--accent)" }}>One account. Every ride.</span>
              </h1>

              <p style={{ fontSize: "0.9375rem", color: "var(--text-muted)", lineHeight: 1.8, maxWidth: "480px", margin: 0 }}>
                Manage all your company&apos;s rides in one dashboard. Set spending limits, track expenses, and keep your team moving.
              </p>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <Link href="/auth/register" className="sp-btn-base sp-btn-primary" style={{ padding: "13px 28px", fontSize: "0.875rem" }}>
                  Get started free <ArrowRight size={15} />
                </Link>
                <Link href="#" className="sp-btn-base sp-btn-outline" style={{ padding: "13px 22px", fontSize: "0.875rem", letterSpacing: "0.14px", textTransform: "none" }}>
                  Request a demo
                </Link>
              </div>

              <div style={{ display: "flex", gap: "32px", paddingTop: "8px" }}>
                {[["500+", "Companies"], ["$0", "Setup fee"], ["24/7", "Support"]].map(([val, lbl]) => (
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
      </section>

      {/* ══════════════════════════════════════════
          FEATURES GRID
      ══════════════════════════════════════════ */}
      <section style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "80px 0" }}>
        <FadeInSection direction="up">
          <div className="sp-container">
            <div style={{ marginBottom: "48px" }}>
              <p className="sp-section-eyebrow">Platform features</p>
              <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 700, color: "var(--text-base)", marginTop: "8px", maxWidth: "480px", lineHeight: 1.1 }}>
                Everything your business needs
              </h2>
            </div>

            <div className="sp-grid-3" style={{ gap: "2px", background: "var(--border-faint)", borderRadius: "var(--radius-card)", overflow: "hidden" }}>
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="sp-feature-card" style={{ flexDirection: "column", gap: "12px", padding: "28px 24px", borderRadius: 0 }}>
                  <div className="sp-feature-card__icon"><Icon size={20} /></div>
                  <h3 style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--text-base)" }}>{f.title}</h3>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", lineHeight: 1.7 }}>{f.desc}</p>
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
      <section style={{ background: "var(--bg-base)", padding: "80px 0" }}>
        <FadeInSection direction="up">
          <div className="sp-container">
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <p className="sp-section-eyebrow" style={{ justifyContent: "center" }}>Getting started</p>
              <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 700, color: "var(--text-base)", marginTop: "8px" }}>
                Up and running in 4 steps
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
          PRICING
      ══════════════════════════════════════════ */}
      <section style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "80px 0" }}>
        <FadeInSection direction="up">
          <div className="sp-container">
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <p className="sp-section-eyebrow" style={{ justifyContent: "center" }}>Pricing</p>
              <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 700, color: "var(--text-base)", marginTop: "8px" }}>
                Simple, transparent pricing
              </h2>
              <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginTop: "12px", maxWidth: "440px", margin: "12px auto 0" }}>
                No hidden fees. No long-term contracts. Cancel or upgrade anytime.
              </p>
            </div>

            <div className="sp-grid-3" style={{ gap: "16px", alignItems: "stretch" }}>
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                style={{
                  background: tier.accent ? "var(--accent)" : "var(--bg-elevated)",
                  borderRadius: "var(--radius-panel)",
                  padding: "36px 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  boxShadow: tier.accent ? "var(--shadow-heavy)" : "var(--shadow-medium)",
                  border: tier.accent ? "none" : "1px solid var(--border-faint)",
                  position: "relative",
                }}
              >
                {tier.accent && (
                  <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: "#000", color: "#fff", fontSize: "0.5625rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", padding: "4px 14px", borderRadius: "var(--radius-pill)" }}>
                    Most popular
                  </div>
                )}
                <div>
                  <p style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: tier.accent ? "rgba(0,0,0,0.55)" : "var(--text-faint)", marginBottom: "8px" }}>{tier.name}</p>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                    <span style={{ fontSize: "2.25rem", fontWeight: 900, color: tier.accent ? "#000" : "var(--text-base)", lineHeight: 1 }}>{tier.price}</span>
                    {tier.period && <span style={{ fontSize: "0.875rem", color: tier.accent ? "rgba(0,0,0,0.55)" : "var(--text-muted)" }}>{tier.period}</span>}
                  </div>
                  <p style={{ fontSize: "0.75rem", color: tier.accent ? "rgba(0,0,0,0.65)" : "var(--text-muted)", marginTop: "8px", lineHeight: 1.6 }}>{tier.desc}</p>
                  <p style={{ fontSize: "0.6875rem", fontWeight: 700, color: tier.accent ? "rgba(0,0,0,0.7)" : "var(--accent)", marginTop: "6px" }}>{tier.employees}</p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                  {tier.features.map((feat) => (
                    <div key={feat} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.8125rem", color: tier.accent ? "rgba(0,0,0,0.75)" : "var(--text-muted)" }}>
                      <CheckCircle2 size={14} style={{ color: tier.accent ? "rgba(0,0,0,0.5)" : "var(--accent)", flexShrink: 0 }} />
                      {feat}
                    </div>
                  ))}
                </div>

                <Link
                  href="/auth/register"
                  className="sp-btn-base"
                  style={{
                    background: tier.accent ? "#000" : "var(--accent)",
                    color: "#fff",
                    padding: "12px 24px",
                    borderRadius: "var(--radius-pill-lg)",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    letterSpacing: "1.4px",
                    textTransform: "uppercase",
                  }}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section style={{ background: "var(--bg-base)", padding: "80px 0" }}>
        <FadeInSection direction="up">
          <div className="sp-container">
            <div style={{ marginBottom: "48px" }}>
              <p className="sp-section-eyebrow">Customer stories</p>
              <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 700, color: "var(--text-base)", marginTop: "8px" }}>
                Trusted by leading companies
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
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "var(--accent-dim)", border: "1px solid rgba(224,49,16,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.625rem", fontWeight: 700, color: "var(--accent)", flexShrink: 0 }}>
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
        </FadeInSection>
      </section>

      {/* ══════════════════════════════════════════
          BOTTOM CTA
      ══════════════════════════════════════════ */}
      <section style={{ background: "var(--accent)", padding: "80px 0" }}>
        <div className="sp-container" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 700, color: "#fff", lineHeight: 1.1, maxWidth: "560px" }}>
            Ready to simplify business travel?
          </h2>
          <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.75)", maxWidth: "440px", lineHeight: 1.75 }}>
            Join 500+ companies already using Drive Business. Set up in minutes, no credit card required.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
            <Link
              href="/auth/register"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#000", color: "#fff", fontFamily: "var(--font-ui)", fontSize: "0.8125rem", fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase", padding: "13px 28px", borderRadius: "500px", textDecoration: "none", boxShadow: "rgba(0,0,0,0.3) 0px 8px 24px" }}
            >
              Get started free <ArrowRight size={14} />
            </Link>
            <Link
              href="#"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "transparent", color: "#fff", fontFamily: "var(--font-ui)", fontSize: "0.8125rem", fontWeight: 600, padding: "13px 24px", borderRadius: "500px", textDecoration: "none", border: "1px solid rgba(255,255,255,0.4)", letterSpacing: "0.14px" }}
            >
              Request a demo
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
              { heading: "Business", links: ["Pricing", "Features", "Case studies", "Support"] },
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
