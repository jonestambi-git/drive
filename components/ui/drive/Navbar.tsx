"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, ChevronDown, MapPin, CreditCard, Settings, HelpCircle, LogOut, X } from "lucide-react";

interface NavbarProps {
  userName: string;
  onSearchClick?: () => void;
}

const menuItems = [
  { icon: MapPin,      label: "My Trips",        href: "/rider/trips"    },
  { icon: CreditCard,  label: "Wallet / Payment", href: "/rider/payments" },
  { icon: Settings,    label: "Settings",         href: "/rider/settings" },
  { icon: HelpCircle,  label: "Help",             href: "/help"           },
];

export default function DriveNavbar({ userName, onSearchClick }: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  function handleSignOut() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/";
  }

  return (
    <header style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      height: "60px",
      background: "rgba(26,26,26,0.95)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      borderBottom: "1px solid rgba(255,255,255,0.07)",
      display: "flex",
      alignItems: "center",
      padding: "0 16px",
      gap: "12px",
      fontFamily: "'DM Sans', sans-serif",
    }}>

      {/* Logo */}
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "6px", textDecoration: "none", flexShrink: 0 }}>
        <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#FF6B00", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "0.75rem", color: "#fff" }}>D</div>
        <span style={{ fontSize: "1rem", fontWeight: 900, color: "#fff", letterSpacing: "-0.01em" }}>Drive</span>
      </Link>

      {/* Search bar */}
      <button
        onClick={onSearchClick}
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "#2a2a2a",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "9999px",
          padding: "8px 16px",
          cursor: "pointer",
          color: "#6a6a6a",
          fontSize: "0.875rem",
          fontFamily: "'DM Sans', sans-serif",
          transition: "all 0.15s",
          maxWidth: "400px",
          minWidth: 0,
          overflow: "hidden",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#2a2a2a")}
      >
        <Search size={14} style={{ flexShrink: 0 }} />
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Where to?</span>
      </button>

      {/* Avatar + dropdown */}
      <div ref={dropdownRef} style={{ position: "relative", flexShrink: 0 }}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            borderRadius: "9999px",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
        >
          <div style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "#FF6B00",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.6875rem",
            fontWeight: 700,
            color: "#fff",
            flexShrink: 0,
          }}>
            {initials}
          </div>
          <ChevronDown
            size={14}
            style={{
              color: "#b3b3b3",
              transition: "transform 0.2s",
              transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </button>

        {/* Dropdown menu */}
        {dropdownOpen && (
          <div style={{
            position: "fixed",
            top: "68px",
            right: "12px",
            background: "#222",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
            padding: "8px",
            minWidth: "220px",
            width: "calc(100vw - 24px)",
            maxWidth: "280px",
            boxShadow: "rgba(0,0,0,0.6) 0px 12px 32px",
            zIndex: 9999,
          }}>
            {/* User info */}
            <div style={{ padding: "10px 12px 12px", borderBottom: "1px solid rgba(255,255,255,0.07)", marginBottom: "6px" }}>
              <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#fff", lineHeight: 1 }}>{userName}</p>
              <p style={{ fontSize: "0.6875rem", color: "#b3b3b3", marginTop: "3px" }}>Rider account</p>
            </div>

            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setDropdownOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 14px",
                    borderRadius: "8px",
                    fontSize: "0.9375rem",
                    color: "#b3b3b3",
                    textDecoration: "none",
                    transition: "all 0.1s",
                    minHeight: "44px",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.05)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "none";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#b3b3b3";
                  }}
                >
                  <Icon size={17} style={{ flexShrink: 0 }} />
                  {item.label}
                </Link>
              );
            })}

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", marginTop: "6px", paddingTop: "6px" }}>
              <button
                onClick={handleSignOut}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 14px",
                  borderRadius: "8px",
                  fontSize: "0.9375rem",
                  color: "#f3727f",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "left",
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "background 0.1s",
                  minHeight: "44px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(243,114,127,0.08)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
              >
                <LogOut size={17} style={{ flexShrink: 0 }} />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
