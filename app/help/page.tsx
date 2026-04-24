"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Car, Home, CreditCard, Settings, LogOut,
  Search, ChevronRight, MessageCircle, Phone,
  Mail, Shield, MapPin, CreditCard as CardIcon,
  Star, Zap, CheckCircle2, ArrowRight,
} from "lucide-react";

const NAV = [
  { icon: Home,       label: "Dashboard",  href: "/rider/dashboard", active: false },
  { icon: Car,        label: "My trips",   href: "/rider/trips",     active: false },
  { icon: CreditCard, label: "Payments",   href: "/rider/payments",  active: false },
  { icon: Settings,   label: "Settings",   href: "/rider/settings",  active: false },
];

const CATEGORIES = [
  { icon: Car,        label: "Booking & rides",   count: 12 },
  { icon: CardIcon,   label: "Payments & billing", count: 8  },
  { icon: Shield,     label: "Safety",             count: 6  },
  { icon: MapPin,     label: "Tracking & GPS",     count: 5  },
  { icon: Star,       label: "Ratings & reviews",  count: 4  },
  { icon: Zap,        label: "Account & profile",  count: 9  },
];

const FAQS = [
  {
    category: "Booking & rides",
    q: "How do I book a ride?",
    a: "Open the app, enter your pickup and destination, choose your ride type, and tap 'Request a Ride'. A nearby driver will accept within 30 seconds.",
  },
  {
    category: "Booking & rides",
    q: "Can I schedule a ride in advance?",
    a: "Yes! Tap the clock icon on the booking screen to schedule a ride up to 7 days in advance. You'll receive a reminder 30 minutes before pickup.",
  },
  {
    category: "Booking & rides",
    q: "How do I cancel a ride?",
    a: "Tap your active ride, then tap 'Cancel ride'. Cancellations within 2 minutes of booking are free. After that, a small cancellation fee may apply.",
  },
  {
    category: "Payments & billing",
    q: "What payment methods are accepted?",
    a: "We accept Visa, Mastercard, mobile money, and Drive Wallet. You can add multiple payment methods and set a default in the Payments section.",
  },
  {
    category: "Payments & billing",
    q: "Why was I charged more than the estimate?",
    a: "Estimates are based on typical traffic. If your route changes or there are unexpected delays, the final fare may differ slightly. You always see the final fare before confirming.",
  },
  {
    category: "Safety",
    q: "How do I use the emergency SOS button?",
    a: "During an active trip, tap the shield icon in the top right. This immediately alerts our 24/7 safety team and shares your live location with emergency contacts.",
  },
  {
    category: "Safety",
    q: "How are drivers verified?",
    a: "Every driver passes a criminal background check, identity verification, and vehicle inspection before their first ride. We re-verify drivers annually.",
  },
  {
    category: "Tracking & GPS",
    q: "Why can't I see my driver on the map?",
    a: "Ensure location permissions are enabled for Drive in your phone settings. If the issue persists, try refreshing the app or restarting it.",
  },
  {
    category: "Account & profile",
    q: "How do I change my phone number?",
    a: "Go to Settings → Profile, tap your phone number, and enter the new one. You'll receive a verification code to confirm the change.",
  },
];

function Sidebar() {
  return (
    <aside style={{ width: "220px", flexShrink: 0, background: "var(--bg-surface)", borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column", padding: "20px 12px", zIndex: 20 }}>
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", marginBottom: "28px", padding: "0 8px" }}>
        <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "0.8125rem", color: "#fff" }}>D</div>
        <span style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-base)", letterSpacing: "-0.01em" }}>Drive</span>
      </Link>
      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2px" }}>
        {NAV.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.label} href={item.href} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 12px", borderRadius: "8px", fontSize: "0.8125rem", fontWeight: item.active ? 600 : 400, color: item.active ? "var(--text-base)" : "var(--text-muted)", background: item.active ? "var(--bg-elevated)" : "transparent", textDecoration: "none", transition: "all 0.15s" }}>
              <Icon size={15} style={{ color: item.active ? "var(--accent)" : "var(--text-muted)", flexShrink: 0 }} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div style={{ borderTop: "1px solid var(--border)", paddingTop: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", marginBottom: "4px" }}>
          <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "var(--accent-dim)", border: "1px solid var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, color: "var(--accent)", flexShrink: 0 }}>J</div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-base)", lineHeight: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>John Doe</p>
            <p style={{ fontSize: "0.6875rem", color: "var(--text-muted)", marginTop: "2px" }}>Rider · 4.9★</p>
          </div>
        </div>
        <button onClick={() => { localStorage.removeItem("accessToken"); window.location.href = "/"; }} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", borderRadius: "8px", background: "none", border: "none", cursor: "pointer", fontSize: "0.8125rem", color: "var(--text-muted)", width: "100%", fontFamily: "var(--font-ui)", transition: "color 0.15s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-negative)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
        >
          <LogOut size={14} /> Sign out
        </button>
      </div>
    </aside>
  );
}

export default function HelpPage() {
  const [search,   setSearch]   = useState("");
  const [openFaq,  setOpenFaq]  = useState<number | null>(null);
  const [category, setCategory] = useState("All");
  const [msgSent,  setMsgSent]  = useState(false);
  const [message,  setMessage]  = useState("");

  const filtered = FAQS.filter((f) => {
    const matchCat = category === "All" || f.category === category;
    const matchSearch = !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleSend = () => {
    if (!message.trim()) return;
    setMsgSent(true);
    setMessage("");
    setTimeout(() => setMsgSent(false), 4000);
  };

  return (
    <div className="rider-layout" style={{ background: "var(--bg-base)", fontFamily: "var(--font-ui)", color: "var(--text-base)" }}>
      <Sidebar />

      <main style={{ flex: 1, overflowY: "auto", padding: "32px 40px" }}>

        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <p style={{ fontSize: "0.5625rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "4px" }}>Support</p>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-base)", margin: 0 }}>Help Centre</h1>
          <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginTop: "4px" }}>Find answers or get in touch with our support team</p>
        </div>

        {/* Search */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "12px", padding: "14px 18px", marginBottom: "28px", maxWidth: "560px" }}>
          <Search size={16} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
          <input type="text" placeholder="Search for help…" value={search} onChange={(e) => setSearch(e.target.value)} style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: "0.9375rem", color: "var(--text-base)", fontFamily: "var(--font-ui)" }} />
        </div>

        {/* Contact cards */}
        <div className="sp-grid-3" style={{ marginBottom: "32px" }}>
          {[
            { icon: MessageCircle, label: "Live chat",    desc: "Avg. reply in 2 min",  cta: "Start chat",   color: "var(--accent)" },
            { icon: Phone,         label: "Call us",      desc: "+234 800 DRIVE 00",    cta: "Call now",     color: "#1a56db"       },
            { icon: Mail,          label: "Email support",desc: "Reply within 24 hours", cta: "Send email",  color: "#7c3aed"       },
          ].map(({ icon: Icon, label, desc, cta, color }) => (
            <div key={label} style={{ background: "var(--bg-surface)", borderRadius: "12px", padding: "20px", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "12px", transition: "border-color 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-light)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: `${color}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={18} style={{ color }} />
              </div>
              <div>
                <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--text-base)", lineHeight: 1 }}>{label}</p>
                <p style={{ fontSize: "0.6875rem", color: "var(--text-muted)", marginTop: "3px" }}>{desc}</p>
              </div>
              <button style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: `1px solid ${color}40`, color, borderRadius: "9999px", padding: "7px 14px", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-ui)", width: "fit-content", transition: "all 0.15s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = `${color}15`; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "none"; }}
              >
                {cta} <ArrowRight size={12} />
              </button>
            </div>
          ))}
        </div>

        <div className="sp-grid-2">

          {/* FAQ section */}
          <div>
            <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-base)", marginBottom: "16px" }}>Frequently asked questions</h2>

            {/* Category filter */}
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "16px" }}>
              {["All", ...CATEGORIES.map(c => c.label)].slice(0, 5).map((cat) => (
                <button key={cat} onClick={() => setCategory(cat)} style={{ padding: "5px 12px", borderRadius: "9999px", border: "1px solid", borderColor: category === cat ? "var(--accent)" : "var(--border)", background: category === cat ? "var(--accent-dim)" : "transparent", color: category === cat ? "var(--accent)" : "var(--text-muted)", fontSize: "0.6875rem", fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-ui)", transition: "all 0.15s" }}>
                  {cat}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {filtered.length === 0 ? (
                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", padding: "20px 0" }}>No results found. Try a different search.</p>
              ) : filtered.map((faq, i) => (
                <div key={i} style={{ background: "var(--bg-surface)", borderRadius: "10px", border: "1px solid var(--border)", overflow: "hidden" }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", background: "none", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "var(--font-ui)", gap: "12px" }}>
                    <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-base)", lineHeight: 1.3 }}>{faq.q}</span>
                    <ChevronRight size={15} style={{ color: "var(--text-faint)", flexShrink: 0, transform: openFaq === i ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
                  </button>
                  {openFaq === i && (
                    <div style={{ padding: "0 16px 14px", borderTop: "1px solid var(--border-faint)" }}>
                      <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", lineHeight: 1.75, paddingTop: "12px" }}>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* Browse categories */}
            <div>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-base)", marginBottom: "16px" }}>Browse by topic</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button key={cat.label} onClick={() => setCategory(cat.label)} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "10px", cursor: "pointer", fontFamily: "var(--font-ui)", transition: "all 0.15s", textAlign: "left" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLButtonElement).style.background = "var(--accent-dim)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLButtonElement).style.background = "var(--bg-surface)"; }}
                    >
                      <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "var(--accent-dim)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon size={15} style={{ color: "var(--accent)" }} />
                      </div>
                      <span style={{ flex: 1, fontSize: "0.875rem", fontWeight: 600, color: "var(--text-base)" }}>{cat.label}</span>
                      <span style={{ fontSize: "0.6875rem", color: "var(--text-muted)" }}>{cat.count} articles</span>
                      <ChevronRight size={14} style={{ color: "var(--text-faint)" }} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Send a message */}
            <div style={{ background: "var(--bg-surface)", borderRadius: "12px", border: "1px solid var(--border)", padding: "20px" }}>
              <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--text-base)", marginBottom: "4px" }}>Still need help?</h3>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "14px" }}>Send us a message and we'll get back to you within 24 hours.</p>
              {msgSent ? (
                <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 16px", background: "var(--accent-dim)", border: "1px solid rgba(224,49,16,0.2)", borderRadius: "8px" }}>
                  <CheckCircle2 size={15} style={{ color: "var(--accent)" }} />
                  <p style={{ fontSize: "0.8125rem", color: "var(--accent)", fontWeight: 600 }}>Message sent! We'll reply within 24 hours.</p>
                </div>
              ) : (
                <>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Describe your issue…" rows={4} style={{ width: "100%", background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "8px", padding: "12px 14px", fontSize: "0.875rem", color: "var(--text-base)", fontFamily: "var(--font-ui)", outline: "none", resize: "vertical", marginBottom: "10px" }} />
                  <button onClick={handleSend} style={{ display: "flex", alignItems: "center", gap: "6px", background: "var(--accent)", color: "#fff", border: "none", borderRadius: "9999px", padding: "10px 20px", fontSize: "0.8125rem", fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-ui)", transition: "all 0.15s" }}>
                    Send message <ArrowRight size={13} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
