"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ArrowRight, MapPin, Users, Star, TrendingUp,
  Zap, Menu, X, Car, Navigation, ChevronRight, Shield,
} from "lucide-react";
import FadeInSection from "@/components/ui/FadeInSection";

/* ─── Data ─────────────────────────────────────────────────── */

const navLinks = ["Ride", "Drive", "Business", "Safety", "Cities"];

const stats = [
  { icon: MapPin,     value: "120+",  label: "Cities",       highlight: false },
  { icon: Users,      value: "50M+",  label: "Rides",        highlight: false },
  { icon: Zap,        value: "800K+", label: "Drivers",      highlight: false },
  { icon: Star,       value: "4.9★",  label: "Rating",       highlight: true  },
];

const activeCities = [
  { name: "Lagos",         country: "Nigeria",      rides: "12M+",  drivers: "120K+" },
  { name: "Abuja",         country: "Nigeria",      rides: "4M+",   drivers: "38K+"  },
  { name: "Port Harcourt", country: "Nigeria",      rides: "2M+",   drivers: "22K+"  },
  { name: "Nairobi",       country: "Kenya",        rides: "8M+",   drivers: "75K+"  },
  { name: "Accra",         country: "Ghana",        rides: "3M+",   drivers: "28K+"  },
  { name: "Johannesburg",  country: "South Africa", rides: "6M+",   drivers: "55K+"  },
  { name: "Cairo",         country: "Egypt",        rides: "9M+",   drivers: "90K+"  },
  { name: "Casablanca",    country: "Morocco",      rides: "1.5M+", drivers: "14K+"  },
];

const comingSoonCities = [
  { name: "Kampala",      country: "Uganda",   eta: "Q3 2025" },
  { name: "Dar es Salaam", country: "Tanzania", eta: "Q3 2025" },
  { name: "Kigali",       country: "Rwanda",   eta: "Q4 2025" },
  { name: "Addis Ababa",  country: "Ethiopia", eta: "Q4 2025" },
];

const cityStats = [
  { city: "Lagos",      country: "Nigeria",  stat: "Fastest growing", value: "120K+ drivers", icon: TrendingUp },
  { city: "Cairo",      country: "Egypt",    stat: "Most rides",      value: "9M+ rides",     icon: Star       },
  { city: "Casablanca", country: "Morocco",  stat: "Newest city",     value: "Launched 2024", icon: Zap        },
];

/* ─── Component ─────────────────────────────────────────────── */

export default function CitiesPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");

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
                className={`sp-nav-link${item === "Cities" ? " sp-nav-link--active" : ""}`}
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
                <Link href="/auth/register" onClick={() => setMenuOpen(false)} className="sp-btn-base sp-btn-primary" style={{ width: "100%", justifyContent: "center", padding: "14px", fontSize: "0.9375rem", letterSpacing: "0.5px", textTransform: "none" }}>
                  Sign up
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
      </header>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="sp-hero" style={{ minHeight: "580px" }}>
        <div className="sp-hero__bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1600&q=90')", opacity: 0.45, filter: "brightness(0.8) saturate(1.1)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(18,18,18,0.97) 0%, rgba(18,18,18,0.82) 45%, rgba(18,18,18,0.4) 75%, rgba(18,18,18,0.15) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 50% 40% at 25% 85%, rgba(224,49,16,0.07) 0%, transparent 70%)" }} />
        <div className="sp-hero__fade-bottom" />

        <div className="sp-hero__content">
          <div className="sp-container" style={{ padding: "80px 64px" }}>
            <div style={{ maxWidth: "600px", display: "flex", flexDirection: "column", gap: "24px" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "var(--accent-dim)", border: "1px solid rgba(224,49,16,0.3)", color: "var(--accent)", fontSize: "0.5rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", padding: "5px 12px", borderRadius: "var(--radius-pill)", width: "fit-content" }}>
                <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--accent)", animation: "sp-pulse 2s infinite" }} />
                Expanding across Africa
              </span>

              <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, lineHeight: 1.06, letterSpacing: "-0.02em", color: "var(--text-base)", margin: 0 }}>
                Drive is available in
                <br />
                <span style={{ color: "var(--accent)" }}>120+ cities.</span>
              </h1>

              <p style={{ fontSize: "0.9375rem", color: "var(--text-muted)", lineHeight: 1.8, maxWidth: "480px", margin: 0 }}>
                From major metros to growing cities, Drive is expanding fast. Find your city and start riding today.
              </p>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <Link href="#cities-list" className="sp-btn-base sp-btn-primary" style={{ padding: "13px 28px", fontSize: "0.875rem" }}>
                  Find your city <ArrowRight size={15} />
                </Link>
                <Link href="#" className="sp-btn-base sp-btn-outline" style={{ padding: "13px 22px", fontSize: "0.875rem", letterSpacing: "0.14px", textTransform: "none" }}>
                  Request your city
                </Link>
              </div>

              <div style={{ display: "flex", gap: "32px", paddingTop: "8px" }}>
                {[["120+", "Cities"], ["50M+", "Rides"], ["800K+", "Drivers"]].map(([val, lbl]) => (
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
          ACTIVE CITIES GRID
      ══════════════════════════════════════════ */}
      <section id="cities-list" style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "80px 0" }}>
        <FadeInSection direction="up">
          <div className="sp-container">
            <div style={{ marginBottom: "48px" }}>
              <p className="sp-section-eyebrow">Active cities</p>
              <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 700, color: "var(--text-base)", marginTop: "8px", maxWidth: "480px", lineHeight: 1.1 }}>
                Ride now in these cities
              </h2>
            </div>

            <div className="sp-grid-4" style={{ gap: "16px" }}>
            {activeCities.map((city) => (
              <div
                key={city.name}
                className="sp-card-elevated"
                style={{ padding: "28px 24px", display: "flex", flexDirection: "column", gap: "12px", cursor: "pointer" }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 6px var(--accent)" }} />
                  <span style={{ fontSize: "0.5625rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", background: "var(--accent-dim)", padding: "3px 8px", borderRadius: "var(--radius-pill)" }}>Active</span>
                </div>
                <div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 900, color: "var(--text-base)", lineHeight: 1.1 }}>{city.name}</h3>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px" }}>{city.country}</p>
                </div>
                <div style={{ display: "flex", gap: "16px", paddingTop: "4px" }}>
                  <div>
                    <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--text-base)", lineHeight: 1 }}>{city.rides}</p>
                    <p style={{ fontSize: "0.5625rem", color: "var(--text-faint)", marginTop: "2px" }}>Rides</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--text-base)", lineHeight: 1 }}>{city.drivers}</p>
                    <p style={{ fontSize: "0.5625rem", color: "var(--text-faint)", marginTop: "2px" }}>Drivers</p>
                  </div>
                </div>
                <Link href="/auth/register" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.6875rem", fontWeight: 700, color: "var(--accent)", textDecoration: "none", marginTop: "4px" }}>
                  Book a ride <ArrowRight size={11} />
                </Link>
              </div>
            ))}
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* ══════════════════════════════════════════
          COMING SOON
      ══════════════════════════════════════════ */}
      <section style={{ background: "var(--bg-base)", padding: "80px 0" }}>
        <FadeInSection direction="up">
          <div className="sp-container">
            <div style={{ marginBottom: "48px" }}>
              <p className="sp-section-eyebrow">Coming soon</p>
              <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 700, color: "var(--text-base)", marginTop: "8px", maxWidth: "480px", lineHeight: 1.1 }}>
                Expanding to new cities
              </h2>
            </div>

            <div className="sp-grid-4" style={{ gap: "16px" }}>
            {comingSoonCities.map((city) => (
              <div
                key={city.name}
                style={{ background: "var(--bg-elevated)", borderRadius: "var(--radius-card)", padding: "28px 24px", display: "flex", flexDirection: "column", gap: "12px", border: "1px solid var(--border-faint)", opacity: 0.85 }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--text-faint)" }} />
                  <span style={{ fontSize: "0.5625rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-faint)", background: "var(--bg-base)", padding: "3px 8px", borderRadius: "var(--radius-pill)", border: "1px solid var(--border-faint)" }}>Coming soon</span>
                </div>
                <div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 900, color: "var(--text-muted)", lineHeight: 1.1 }}>{city.name}</h3>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-faint)", marginTop: "4px" }}>{city.country}</p>
                </div>
                <p style={{ fontSize: "0.6875rem", color: "var(--text-faint)" }}>Expected {city.eta}</p>
                <button
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.6875rem", fontWeight: 700, color: "var(--text-muted)", background: "none", border: "1px solid var(--border-faint)", borderRadius: "var(--radius-pill)", padding: "6px 14px", cursor: "pointer", width: "fit-content", marginTop: "4px" }}
                >
                  Notify me
                </button>
              </div>
            ))}
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* ══════════════════════════════════════════
          EXPANSION MAP PLACEHOLDER
      ══════════════════════════════════════════ */}
      <section style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "80px 0" }}>
        <div className="sp-container">
          <div style={{ background: "var(--bg-elevated)", borderRadius: "var(--radius-panel)", padding: "64px 48px", display: "flex", flexDirection: "column", alignItems: "center", gap: "24px", textAlign: "center", border: "1px solid var(--border-faint)", minHeight: "360px", justifyContent: "center" }}>
            <div style={{ width: "72px", height: "72px", borderRadius: "var(--radius-card)", background: "var(--accent-dim)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <MapPin size={36} style={{ color: "var(--accent)" }} />
            </div>
            <div>
              <h2 style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", fontWeight: 700, color: "var(--text-base)", marginBottom: "12px" }}>
                Drive is going global
              </h2>
              <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.8, maxWidth: "480px" }}>
                We are expanding to new cities every quarter. Don&apos;t see your city yet? Let us know and we&apos;ll prioritise it.
              </p>
            </div>

            <div style={{ display: "flex", gap: "8px", width: "100%", maxWidth: "440px" }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={{ flex: 1, background: "var(--bg-base)", color: "var(--text-base)", fontSize: "0.875rem", padding: "12px 16px", borderRadius: "var(--radius-card)", border: "1px solid var(--border)", outline: "none", fontFamily: "var(--font-ui)" }}
              />
              <button
                className="sp-btn-base sp-btn-primary"
                style={{ padding: "12px 20px", whiteSpace: "nowrap" }}
              >
                Request city
              </button>
            </div>
            <p style={{ fontSize: "0.625rem", color: "var(--text-faint)" }}>We&apos;ll notify you when Drive launches in your city.</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CITY STATS
      ══════════════════════════════════════════ */}
      <section style={{ background: "var(--bg-base)", padding: "80px 0" }}>
        <FadeInSection direction="up">
          <div className="sp-container">
            <div style={{ marginBottom: "48px" }}>
              <p className="sp-section-eyebrow">City highlights</p>
              <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 700, color: "var(--text-base)", marginTop: "8px" }}>
                Cities leading the way
              </h2>
            </div>

            <div className="sp-grid-3" style={{ gap: "16px" }}>
            {cityStats.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.city} style={{ background: "var(--bg-elevated)", borderRadius: "var(--radius-panel)", padding: "36px 28px", display: "flex", flexDirection: "column", gap: "16px", border: "1px solid var(--border-faint)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "48px", height: "48px", borderRadius: "var(--radius-card)", background: "var(--accent-dim)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={22} style={{ color: "var(--accent)" }} />
                    </div>
                    <div>
                      <p style={{ fontSize: "0.5625rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)" }}>{c.stat}</p>
                    </div>
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.5rem", fontWeight: 900, color: "var(--text-base)", lineHeight: 1 }}>{c.city}</h3>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px" }}>{c.country}</p>
                  </div>
                  <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--accent)" }}>{c.value}</p>
                  <Link href="/auth/register" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.6875rem", fontWeight: 700, color: "var(--text-muted)", textDecoration: "none" }}>
                    Book in {c.city} <ArrowRight size={11} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        </FadeInSection>
      </section>

      {/* ══════════════════════════════════════════
          BOTTOM CTA
      ══════════════════════════════════════════ */}
      <section style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)", padding: "80px 0" }}>
        <div className="sp-container" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
          <p className="sp-section-eyebrow" style={{ justifyContent: "center" }}>Don&apos;t see your city?</p>
          <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 700, color: "var(--text-base)", lineHeight: 1.1, maxWidth: "560px" }}>
            Help us come to you
          </h2>
          <p style={{ fontSize: "0.9375rem", color: "var(--text-muted)", maxWidth: "440px", lineHeight: 1.75 }}>
            We prioritise cities based on demand. The more requests we get, the faster we expand. Tell us where you are.
          </p>
          <div style={{ display: "flex", gap: "8px", width: "100%", maxWidth: "440px" }}>
            <input
              type="email"
              placeholder="Your email address"
              style={{ flex: 1, background: "var(--bg-elevated)", color: "var(--text-base)", fontSize: "0.875rem", padding: "13px 16px", borderRadius: "var(--radius-card)", border: "1px solid var(--border)", outline: "none", fontFamily: "var(--font-ui)" }}
            />
            <Link href="#" className="sp-btn-base sp-btn-primary" style={{ padding: "13px 20px", whiteSpace: "nowrap" }}>
              Request city <ArrowRight size={13} />
            </Link>
          </div>
          <p style={{ fontSize: "0.625rem", color: "var(--text-faint)" }}>No spam. We&apos;ll only contact you when Drive launches in your city.</p>
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
              { heading: "Cities",   links: ["Active cities", "Coming soon", "Request a city", "Partnerships"] },
              { heading: "Riders",   links: ["Book a ride", "Safety", "Pricing", "Support"] },
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
