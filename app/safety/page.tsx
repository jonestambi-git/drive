"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ArrowRight, CheckCircle2, Star, Shield, Zap,
  Smartphone, CreditCard, MapPin, Users, Menu, X,
} from "lucide-react";
import FadeInSection from "@/components/ui/FadeInSection";

/* ─── Data ─────────────────────────────────────────────────── */

const navLinks = ["Ride", "Drive", "Business", "Safety", "Cities"];

const safetyFeatures = [
  { icon: Shield,     title: "Background checks",   desc: "Every driver undergoes a thorough criminal background check and identity verification before their first ride." },
  { icon: MapPin,     title: "Live GPS tracking",   desc: "Track your driver in real time from pickup to drop-off. Share your live trip with trusted contacts." },
  { icon: Zap,        title: "Emergency SOS",       desc: "One tap connects you to emergency services and shares your live location with our safety team instantly." },
  { icon: Smartphone, title: "Trip sharing",        desc: "Share your trip details and live location with family or friends directly from the app." },
  { icon: Star,       title: "Driver ratings",      desc: "Rate every trip. Drivers with consistently low ratings are reviewed and removed from the platform." },
  { icon: CreditCard, title: "Insurance cover",     desc: "Comprehensive insurance is active from the moment a driver accepts your ride until drop-off." },
];

const stats = [
  { icon: Shield, value: "100%", label: "Verified drivers",  highlight: false },
  { icon: Zap,    value: "24/7", label: "Emergency support", highlight: true  },
  { icon: Star,   value: "5M+",  label: "Safe rides",        highlight: false },
  { icon: Users,  value: "0",    label: "Tolerance policy",  highlight: false },
];

const riderSafetyPoints = [
  "Real-time GPS tracking on every trip",
  "Share trip details with trusted contacts",
  "One-tap emergency SOS button",
  "Verified driver photo and plate before pickup",
  "In-app chat — no personal numbers shared",
  "24/7 rider support team",
];

const driverSafetyPoints = [
  "Rider identity verification",
  "In-app incident reporting",
  "Insurance coverage on every trip",
  "Fatigue detection reminders",
  "Emergency assistance button",
  "Community safety guidelines training",
];

const emergencyFeatures = [
  { icon: Zap,    title: "One-tap SOS",         desc: "Instantly alert emergency services and our 24/7 safety team with your exact GPS location." },
  { icon: MapPin, title: "Live location share", desc: "Your real-time location is shared with emergency contacts and our response team the moment SOS is triggered." },
  { icon: Shield, title: "Incident response",   desc: "Our dedicated safety team reviews every incident report within minutes and takes immediate action." },
];

const communityStandards = [
  { icon: Users,  title: "Respect and courtesy", desc: "All users are expected to treat each other with respect. Harassment or discrimination of any kind is not tolerated." },
  { icon: Shield, title: "Zero tolerance",       desc: "Weapons, drugs, and illegal activity result in immediate and permanent removal from the platform." },
  { icon: Star,   title: "Honest ratings",       desc: "Ratings must reflect genuine experiences. Fake or retaliatory ratings are removed and accounts reviewed." },
];

const testimonials = [
  { name: "Ngozi A.", role: "Daily rider",        body: "The live tracking and trip sharing give me real peace of mind. My family always knows where I am.",                   rating: 5, initials: "NA" },
  { name: "Kwame B.", role: "Night shift worker", body: "I ride late at night and the SOS button makes me feel safe. Knowing it is there changes everything.",                rating: 5, initials: "KB" },
  { name: "Priya S.", role: "Frequent traveller", body: "Background-checked drivers and upfront pricing. Drive is the only app I trust for airport runs.",                    rating: 5, initials: "PS" },
];

/* ─── Component ─────────────────────────────────────────────── */

export default function SafetyPage() {
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
      <header className={`sp-navbar${scrolled ? " sp-navbar--scrolled" : ""}`} style={{ width: "100%" }}>
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
                className={`sp-nav-link${item === "Safety" ? " sp-nav-link--active" : ""}`}
                style={{ textDecoration: "none" }}
              >
                {item}
              </Link>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link href="/auth/login" className="sp-btn-base sp-btn-outline" style={{ padding: "8px 20px", fontSize: "0.875rem", letterSpacing: "0.14px", textTransform: "none" }}>Log in</Link>
            <Link href="/auth/register" className="sp-btn-base sp-btn-primary" style={{ padding: "10px 24px" }}>Sign up</Link>
            <button onClick={() => setMenuOpen(!menuOpen)} className="sp-mobile-menu-btn" style={{ display: "none", background: "none", border: "none", color: "var(--text-base)", cursor: "pointer" }} aria-label="Toggle menu">
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
              <Link href="/auth/register" className="sp-btn-base sp-btn-primary" style={{ flex: 1, justifyContent: "center", padding: "10px" }}>Sign up</Link>
            </div>
          </div>
        )}
      </header>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="sp-hero" style={{ minHeight: "580px" }}>
        <div className="sp-hero__bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=90')", opacity: 0.45, filter: "brightness(0.8) saturate(1.1)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(18,18,18,0.97) 0%, rgba(18,18,18,0.82) 45%, rgba(18,18,18,0.4) 75%, rgba(18,18,18,0.15) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 50% 40% at 25% 85%, rgba(224,49,16,0.07) 0%, transparent 70%)" }} />
        <div className="sp-hero__fade-bottom" />

        <div className="sp-hero__content">
          <div className="sp-container" style={{ padding: "80px 64px" }}>
            <div style={{ maxWidth: "600px", display: "flex", flexDirection: "column", gap: "24px" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "var(--accent-dim)", border: "1px solid rgba(224,49,16,0.3)", color: "var(--accent)", fontSize: "0.5rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", padding: "5px 12px", borderRadius: "var(--radius-pill)", width: "fit-content" }}>
                <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--accent)", animation: "sp-pulse 2s infinite" }} />
                5M+ safe rides and counting
              </span>

              <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, lineHeight: 1.06, letterSpacing: "-0.02em", color: "var(--text-base)", margin: 0 }}>
                Your safety is our
                <br />
                <span style={{ color: "var(--accent)" }}>top priority.</span>
              </h1>

              <p style={{ fontSize: "0.9375rem", color: "var(--text-muted)", lineHeight: 1.8, maxWidth: "480px", margin: 0 }}>
                Every ride on Drive is protected by multiple layers of safety features — for both riders and drivers.
              </p>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <Link href="#features" className="sp-btn-base sp-btn-primary" style={{ padding: "13px 28px", fontSize: "0.875rem" }}>
                  See safety features <ArrowRight size={15} />
                </Link>
                <Link href="/auth/register" className="sp-btn-base sp-btn-outline" style={{ padding: "13px 22px", fontSize: "0.875rem", letterSpacing: "0.14px", textTransform: "none" }}>
                  Book safely
                </Link>
              </div>

              <div style={{ display: "flex", gap: "32px", paddingTop: "8px" }}>
                {[["100%", "Verified drivers"], ["24/7", "Emergency support"], ["5M+", "Safe rides"]].map(([val, lbl]) => (
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
          SAFETY FEATURES
      ══════════════════════════════════════════ */}
      <section id="features" style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "80px 0" }}>
        <FadeInSection direction="up">
          <div className="sp-container">
            <div style={{ marginBottom: "48px" }}>
              <p className="sp-section-eyebrow">Safety features</p>
              <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 700, color: "var(--text-base)", marginTop: "8px", maxWidth: "480px", lineHeight: 1.1 }}>
                Built-in protection on every ride
              </h2>
            </div>

            <div className="sp-grid-3" style={{ gap: "2px", background: "var(--border-faint)", borderRadius: "var(--radius-card)", overflow: "hidden" }}>
            {safetyFeatures.map((f) => {
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
          FOR RIDERS
      ══════════════════════════════════════════ */}
      <section style={{ background: "var(--bg-base)", padding: "80px 0" }}>
        <FadeInSection direction="up">
          <div className="sp-container">
            <div className="sp-grid-2" style={{ gap: "48px", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <p className="sp-section-eyebrow">For riders</p>
              <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 700, color: "var(--text-base)", lineHeight: 1.1, margin: 0 }}>
                Ride with confidence
              </h2>
              <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.8, maxWidth: "400px" }}>
                From the moment you book to the moment you arrive, Drive keeps you protected with multiple layers of safety.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {riderSafetyPoints.map((point) => (
                  <div key={point} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.875rem", color: "var(--text-muted)" }}>
                    <CheckCircle2 size={14} style={{ color: "var(--accent)", flexShrink: 0 }} />
                    {point}
                  </div>
                ))}
              </div>
              <Link href="/auth/register" className="sp-btn-base sp-btn-primary" style={{ padding: "12px 24px", fontSize: "0.8125rem", width: "fit-content", marginTop: "4px" }}>
                Book a safe ride <ArrowRight size={14} />
              </Link>
            </div>

            <div style={{ background: "var(--bg-elevated)", borderRadius: "var(--radius-panel)", height: "360px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px", border: "1px solid var(--border-faint)" }}>
              <div style={{ width: "72px", height: "72px", borderRadius: "var(--radius-card)", background: "var(--accent-dim)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Shield size={36} style={{ color: "var(--accent)" }} />
              </div>
              <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--text-base)" }}>Rider protection</p>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "center", maxWidth: "200px", lineHeight: 1.6 }}>Every ride is covered from start to finish</p>
            </div>
          </div>
        </div>
        </FadeInSection>
      </section>

      {/* ══════════════════════════════════════════
          FOR DRIVERS
      ══════════════════════════════════════════ */}
      <section style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "80px 0" }}>
        <FadeInSection direction="up">
          <div className="sp-container">
            <div className="sp-grid-2" style={{ gap: "48px", alignItems: "center" }}>
            <div style={{ background: "var(--bg-elevated)", borderRadius: "var(--radius-panel)", height: "360px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px", border: "1px solid var(--border-faint)" }}>
              <div style={{ width: "72px", height: "72px", borderRadius: "var(--radius-card)", background: "var(--accent-dim)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Users size={36} style={{ color: "var(--accent)" }} />
              </div>
              <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--text-base)" }}>Driver protection</p>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "center", maxWidth: "200px", lineHeight: 1.6 }}>Tools and coverage to keep drivers safe on every trip</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <p className="sp-section-eyebrow">For drivers</p>
              <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 700, color: "var(--text-base)", lineHeight: 1.1, margin: 0 }}>
                Drive with protection
              </h2>
              <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.8, maxWidth: "400px" }}>
                We take driver safety as seriously as rider safety. Every tool you need to stay safe is built right into the app.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {driverSafetyPoints.map((point) => (
                  <div key={point} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.875rem", color: "var(--text-muted)" }}>
                    <CheckCircle2 size={14} style={{ color: "var(--accent)", flexShrink: 0 }} />
                    {point}
                  </div>
                ))}
              </div>
              <Link href="/auth/register?role=driver" className="sp-btn-base sp-btn-primary" style={{ padding: "12px 24px", fontSize: "0.8125rem", width: "fit-content", marginTop: "4px" }}>
                Drive with us <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
        </FadeInSection>
      </section>

      {/* ══════════════════════════════════════════
          EMERGENCY FEATURES
      ══════════════════════════════════════════ */}
      <section style={{ background: "var(--bg-base)", padding: "80px 0" }}>
        <FadeInSection direction="up">
          <div className="sp-container">
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <p className="sp-section-eyebrow" style={{ justifyContent: "center" }}>Emergency response</p>
              <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 700, color: "var(--text-base)", marginTop: "8px" }}>
                Help is always one tap away
              </h2>
            </div>

            <div className="sp-grid-3" style={{ gap: "16px" }}>
            {emergencyFeatures.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} style={{ background: "var(--bg-elevated)", borderRadius: "var(--radius-panel)", padding: "36px 28px", display: "flex", flexDirection: "column", gap: "16px", border: "1px solid var(--border-faint)", textAlign: "center", alignItems: "center" }}>
                  <div style={{ width: "64px", height: "64px", borderRadius: "var(--radius-card)", background: "var(--accent-dim)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={28} style={{ color: "var(--accent)" }} />
                  </div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-base)" }}>{f.title}</h3>
                  <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", lineHeight: 1.7 }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
        </FadeInSection>
      </section>

      {/* ══════════════════════════════════════════
          COMMUNITY STANDARDS
      ══════════════════════════════════════════ */}
      <section style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "80px 0" }}>
        <FadeInSection direction="up">
          <div className="sp-container">
            <div style={{ marginBottom: "48px" }}>
              <p className="sp-section-eyebrow">Community standards</p>
              <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 700, color: "var(--text-base)", marginTop: "8px", maxWidth: "480px", lineHeight: 1.1 }}>
                A community built on respect
              </h2>
            </div>

            <div className="sp-grid-3" style={{ gap: "16px" }}>
            {communityStandards.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.title} className="sp-card-elevated" style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "var(--radius-card)", background: "var(--accent-dim)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={22} style={{ color: "var(--accent)" }} />
                  </div>
                  <h3 style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--text-base)" }}>{c.title}</h3>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", lineHeight: 1.7 }}>{c.desc}</p>
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
      <section style={{ background: "var(--bg-base)", padding: "80px 0" }}>
        <FadeInSection direction="up">
          <div className="sp-container">
            <div style={{ marginBottom: "48px" }}>
              <p className="sp-section-eyebrow">Rider stories</p>
              <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 700, color: "var(--text-base)", marginTop: "8px" }}>
                Safety you can feel
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
            Safety is a shared responsibility
          </h2>
          <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.75)", maxWidth: "440px", lineHeight: 1.75 }}>
            We build the tools. You use them. Together we make every ride safer for everyone on the platform.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/auth/register" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#000", color: "#fff", fontFamily: "var(--font-ui)", fontSize: "0.8125rem", fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase", padding: "13px 28px", borderRadius: "500px", textDecoration: "none", boxShadow: "rgba(0,0,0,0.3) 0px 8px 24px" }}>
              Book safely now <ArrowRight size={14} />
            </Link>
            <Link href="#features" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "transparent", color: "#fff", fontFamily: "var(--font-ui)", fontSize: "0.8125rem", fontWeight: 600, padding: "13px 24px", borderRadius: "500px", textDecoration: "none", border: "1px solid rgba(255,255,255,0.4)", letterSpacing: "0.14px" }}>
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
              { heading: "Safety",   links: ["Safety features", "Community standards", "Emergency SOS", "Report an issue"] },
              { heading: "Riders",   links: ["Book a ride", "Cities", "Pricing", "Support"] },
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
