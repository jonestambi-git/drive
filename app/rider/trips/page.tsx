"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Car, Home, CreditCard, Settings, LogOut,
  MapPin, Clock, Star, Filter, Search,
  ChevronRight, ArrowRight, RotateCcw, TrendingUp,
} from "lucide-react";

/* ─── Data ─────────────────────────────────────────────────── */
const NAV = [
  { icon: Home,       label: "Dashboard",  href: "/rider/dashboard", active: false },
  { icon: Car,        label: "My trips",   href: "/rider/trips",     active: true  },
  { icon: CreditCard, label: "Payments",   href: "/rider/payments",  active: false },
  { icon: Settings,   label: "Settings",   href: "/rider/settings",  active: false },
];

const ALL_TRIPS = [
  { id: "1",  from: "Victoria Island",  to: "Murtala Airport",   date: "Today, 9:14 AM",        fare: "₦4,200", status: "completed", driver: "Emeka T.", rating: 5, distance: "18.4 km", duration: "32 min", type: "DriveX"   },
  { id: "2",  from: "Home",             to: "City Mall",         date: "Yesterday, 3:40 PM",    fare: "₦1,850", status: "completed", driver: "Fatima A.", rating: 5, distance: "7.2 km",  duration: "18 min", type: "DriveGo"  },
  { id: "3",  from: "Office",           to: "Lekki Phase 1",     date: "Apr 15, 8:00 AM",       fare: "₦2,600", status: "cancelled", driver: "—",         rating: 0, distance: "—",       duration: "—",      type: "DriveGo"  },
  { id: "4",  from: "Ikeja",            to: "Victoria Island",   date: "Apr 12, 6:30 PM",       fare: "₦3,100", status: "completed", driver: "Chidi O.",  rating: 4, distance: "14.1 km", duration: "28 min", type: "DriveX"   },
  { id: "5",  from: "Lekki Phase 1",    to: "Murtala Airport",   date: "Apr 10, 5:00 AM",       fare: "₦5,800", status: "completed", driver: "Aisha K.",  rating: 5, distance: "22.3 km", duration: "41 min", type: "DriveLux" },
  { id: "6",  from: "City Mall",        to: "Home",              date: "Apr 8, 8:15 PM",        fare: "₦1,650", status: "completed", driver: "Emeka T.",  rating: 5, distance: "6.8 km",  duration: "15 min", type: "DriveGo"  },
  { id: "7",  from: "Ajah",             to: "Victoria Island",   date: "Apr 5, 9:00 AM",        fare: "₦3,900", status: "completed", driver: "Kwame B.",  rating: 4, distance: "17.6 km", duration: "35 min", type: "DriveX"   },
  { id: "8",  from: "Home",             to: "Ikeja",             date: "Apr 2, 7:45 AM",        fare: "₦2,200", status: "cancelled", driver: "—",         rating: 0, distance: "—",       duration: "—",      type: "DriveGo"  },
];

const FILTERS = ["All", "Completed", "Cancelled"];

/* ─── Sidebar ─────────────────────────────────────────────── */
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

/* ─── Page ─────────────────────────────────────────────────── */
export default function TripsPage() {
  const [filter, setFilter]   = useState("All");
  const [search, setSearch]   = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = ALL_TRIPS.filter((t) => {
    const matchFilter = filter === "All" || t.status === filter.toLowerCase();
    const matchSearch = !search || t.from.toLowerCase().includes(search.toLowerCase()) || t.to.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const totalSpent = ALL_TRIPS.filter(t => t.status === "completed").reduce((sum, t) => sum + parseFloat(t.fare.replace("₦", "").replace(",", "")), 0);
  const completed  = ALL_TRIPS.filter(t => t.status === "completed").length;

  return (
    <div className="rider-layout" style={{ background: "var(--bg-base)", fontFamily: "var(--font-ui)", color: "var(--text-base)" }}>
      <Sidebar />

      <main style={{ flex: 1, overflowY: "auto", padding: "32px 40px" }}>

        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <p style={{ fontSize: "0.5625rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "4px" }}>Trip history</p>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-base)", margin: 0 }}>My Trips</h1>
          <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginTop: "4px" }}>View and manage all your past rides</p>
        </div>

        {/* Stats row */}
        <div className="sp-grid-4" style={{ marginBottom: "28px" }}>
          {[
            { icon: Car,        label: "Total trips",    value: ALL_TRIPS.length.toString() },
            { icon: TrendingUp, label: "Completed",      value: completed.toString()         },
            { icon: CreditCard, label: "Total spent",    value: `₦${totalSpent.toLocaleString()}` },
            { icon: Star,       label: "Avg rating",     value: "4.9★"                       },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} style={{ background: "var(--bg-surface)", borderRadius: "12px", padding: "18px 16px", border: "1px solid var(--border)" }}>
              <Icon size={16} style={{ color: "var(--accent)", marginBottom: "8px" }} />
              <p style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-base)", lineHeight: 1 }}>{value}</p>
              <p style={{ fontSize: "0.6875rem", color: "var(--text-muted)", marginTop: "4px" }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Search + filter */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: "200px", display: "flex", alignItems: "center", gap: "8px", background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "8px", padding: "10px 14px" }}>
            <Search size={14} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
            <input type="text" placeholder="Search trips…" value={search} onChange={(e) => setSearch(e.target.value)} style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: "0.875rem", color: "var(--text-base)", fontFamily: "var(--font-ui)" }} />
          </div>
          <div style={{ display: "flex", gap: "6px" }}>
            {FILTERS.map((f) => (
              <button key={f} onClick={() => setFilter(f)} style={{ padding: "8px 16px", borderRadius: "9999px", border: "1px solid", borderColor: filter === f ? "var(--accent)" : "var(--border)", background: filter === f ? "var(--accent-dim)" : "transparent", color: filter === f ? "var(--accent)" : "var(--text-muted)", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-ui)", transition: "all 0.15s" }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Trip list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {filtered.length === 0 ? (
            <div style={{ background: "var(--bg-surface)", borderRadius: "12px", padding: "48px", textAlign: "center", border: "1px solid var(--border)" }}>
              <p style={{ fontSize: "2rem", marginBottom: "12px" }}>🚗</p>
              <p style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--text-base)", marginBottom: "6px" }}>No trips found</p>
              <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>Try adjusting your search or filter</p>
            </div>
          ) : filtered.map((trip) => (
            <div key={trip.id} style={{ background: "var(--bg-surface)", borderRadius: "12px", border: "1px solid var(--border)", overflow: "hidden", transition: "border-color 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-light)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              {/* Main row */}
              <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 20px", cursor: "pointer" }} onClick={() => setExpanded(expanded === trip.id ? null : trip.id)}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: trip.status === "completed" ? "var(--accent-dim)" : "rgba(243,114,127,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Car size={16} style={{ color: trip.status === "completed" ? "var(--accent)" : "var(--text-negative)" }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-base)", lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{trip.from} → {trip.to}</p>
                  <p style={{ fontSize: "0.6875rem", color: "var(--text-muted)", marginTop: "3px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "3px" }}><Clock size={10} />{trip.date}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: "3px" }}><Car size={10} />{trip.type}</span>
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px", flexShrink: 0 }}>
                  <span style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--text-base)" }}>{trip.fare}</span>
                  <span style={{ fontSize: "0.5625rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: trip.status === "completed" ? "var(--accent)" : "var(--text-negative)", background: trip.status === "completed" ? "var(--accent-dim)" : "rgba(243,114,127,0.1)", padding: "2px 8px", borderRadius: "9999px" }}>{trip.status}</span>
                </div>
                <ChevronRight size={16} style={{ color: "var(--text-faint)", flexShrink: 0, transform: expanded === trip.id ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
              </div>

              {/* Expanded details */}
              {expanded === trip.id && (
                <div style={{ borderTop: "1px solid var(--border)", padding: "16px 20px", background: "var(--bg-elevated)", display: "flex", gap: "24px", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1, minWidth: "200px" }}>
                    {[
                      { label: "Driver",   value: trip.driver   },
                      { label: "Distance", value: trip.distance },
                      { label: "Duration", value: trip.duration },
                      { label: "Ride type",value: trip.type     },
                    ].map(({ label, value }) => (
                      <div key={label} style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{label}</span>
                        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-base)" }}>{value}</span>
                      </div>
                    ))}
                    {trip.rating > 0 && (
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Your rating</span>
                        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--accent)" }}>{"★".repeat(trip.rating)}</span>
                      </div>
                    )}
                  </div>
                  {trip.status === "completed" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", justifyContent: "flex-end" }}>
                      <Link href="/rider/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "var(--accent)", color: "#fff", padding: "9px 16px", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: 700, textDecoration: "none", letterSpacing: "0.5px" }}>
                        <RotateCcw size={12} /> Rebook
                      </Link>
                      <button style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "none", border: "1px solid var(--border)", color: "var(--text-muted)", padding: "9px 16px", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-ui)" }}>
                        Get receipt
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
