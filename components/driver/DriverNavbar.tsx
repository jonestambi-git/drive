"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, TrendingUp, Car, Settings, HelpCircle, LogOut, Clock } from "lucide-react";

interface DriverNavbarProps {
  driverName: string;
  isOnline: boolean;
  onToggleOnline: () => void;
}

const menuItems = [
  { icon: TrendingUp, label: "My Earnings",   href: "/driver/earnings" },
  { icon: Clock,      label: "Trip History",  href: "/driver/trips"    },
  { icon: Car,        label: "My Vehicle",    href: "/driver/vehicle"  },
  { icon: Settings,   label: "Settings",      href: "/driver/settings" },
  { icon: HelpCircle, label: "Help",          href: "/driver/support"  },
];

export default function DriverNavbar({ driverName, isOnline, onToggleOnline }: DriverNavbarProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const initials = driverName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      height: "60px",
      background: "rgba(26,26,26,0.96)",
      backdropFilter: "blur(16px)",
      borderBottom: "1px solid rgba(255,255,255,0.07)",
      display: "flex", alignItems: "center",
      padding: "0 16px", gap: "12px",
      fontFamily: "'DM Sans',sans-serif",
    }}>
      {/* Logo */}
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "6px", textDecoration: "none", flexShrink: 0 }}>
        <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#FF6B00", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "0.75rem", color: "#fff" }}>D</div>
        <span style={{ fontSize: "1rem", fontWeight: 900, color: "#fff", letterSpacing: "-0.01em" }}>Drive</span>
      </Link>

      {/* Online/Offline toggle — center */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <button
          onClick={onToggleOnline}
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            background: isOnline ? "rgba(34,197,94,0.12)" : "rgba(255,255,255,0.06)",
            border: `1px solid ${isOnline ? "rgba(34,197,94,0.4)" : "rgba(255,255,255,0.12)"}`,
            borderRadius: "9999px",
            padding: "7px 18px",
            cursor: "pointer",
            transition: "all 0.2s ease",
            fontFamily: "'DM Sans',sans-serif",
          }}
        >
          {/* Track */}
          <div style={{
            width: "36px", height: "20px", borderRadius: "9999px",
            background: isOnline ? "#22c55e" : "#4d4d4d",
            position: "relative", transition: "background 0.2s",
            flexShrink: 0,
          }}>
            <div style={{
              position: "absolute", top: "3px",
              left: isOnline ? "19px" : "3px",
              width: "14px", height: "14px",
              borderRadius: "50%", background: "#fff",
              transition: "left 0.2s",
              boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
            }} />
          </div>
          <span style={{
            fontSize: "0.8125rem", fontWeight: 700,
            color: isOnline ? "#22c55e" : "#b3b3b3",
            letterSpacing: "0.04em",
          }}>
            {isOnline ? "ONLINE" : "OFFLINE"}
          </span>
        </button>
      </div>

      {/* Avatar + dropdown */}
      <div ref={ref} style={{ position: "relative", flexShrink: 0 }}>
        <button
          onClick={() => setOpen(!open)}
          style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none", cursor: "pointer", padding: "4px", borderRadius: "9999px" }}
        >
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#FF6B00", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6875rem", fontWeight: 700, color: "#fff" }}>
            {initials}
          </div>
          <ChevronDown size={14} style={{ color: "#b3b3b3", transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }} />
        </button>

        {open && (
          <div style={{
            position: "absolute", top: "calc(100% + 8px)", right: 0,
            background: "#222", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px", padding: "8px", minWidth: "200px",
            boxShadow: "rgba(0,0,0,0.5) 0px 8px 24px", zIndex: 200,
          }}>
            <div style={{ padding: "10px 12px 12px", borderBottom: "1px solid rgba(255,255,255,0.07)", marginBottom: "6px" }}>
              <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#fff", lineHeight: 1 }}>{driverName}</p>
              <p style={{ fontSize: "0.6875rem", color: "#b3b3b3", marginTop: "3px" }}>Driver account</p>
            </div>
            {menuItems.map(({ icon: Icon, label, href }) => (
              <Link key={label} href={href} onClick={() => setOpen(false)} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 12px", borderRadius: "8px", fontSize: "0.875rem", color: "#b3b3b3", textDecoration: "none", transition: "all 0.1s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "none"; (e.currentTarget as HTMLAnchorElement).style.color = "#b3b3b3"; }}
              >
                <Icon size={15} style={{ flexShrink: 0 }} /> {label}
              </Link>
            ))}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", marginTop: "6px", paddingTop: "6px" }}>
              <button onClick={() => { localStorage.removeItem("accessToken"); localStorage.removeItem("refreshToken"); window.location.href = "/"; }}
                style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 12px", borderRadius: "8px", fontSize: "0.875rem", color: "#f3727f", background: "none", border: "none", cursor: "pointer", width: "100%", fontFamily: "'DM Sans',sans-serif", transition: "background 0.1s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(243,114,127,0.08)")}
                onMouseLeave={e => (e.currentTarget.style.background = "none")}
              >
                <LogOut size={15} /> Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
