"use client";


import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import DriverNavbar from "@/components/driver/DriverNavbar";
import DriverMapView from "@/components/map/DriverMapView";
import RideRequestPopup from "@/components/driver/RideRequestPopup";
import "../../globals.css";
import "../../../styles/driver-home.css";

/* ─── Types ─────────────────────────────────────────────────── */
interface Coords { lat: number; lng: number; }

/* ─── Helpers ─────────────────────────────────────────────────── */
function decodeJwt(token: string): Record<string, unknown> | null {
  try {
    return JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
  } catch { return null; }
}

function greeting(name: string) {
  const h = new Date().getHours();
  const t = h < 12 ? "morning" : h < 17 ? "afternoon" : "evening";
  return `Good ${t}, ${name.split(" ")[0]} 👋`;
}

function randomOffset(center: Coords): Coords {
  return { lat: center.lat + (Math.random() - 0.5) * 0.06, lng: center.lng + (Math.random() - 0.5) * 0.06 };
}

/* ─── Mock data ─────────────────────────────────────────────── */
const MOCK_REQUESTS = [
  { riderName: "Amara O.", riderInitials: "AO", riderRating: 4.8, pickup: "Victoria Island, Lagos", destination: "Murtala Airport", distance: "18.4 km", earnings: "₦4,200", eta: "4 mins" },
  { riderName: "Kemi A.",  riderInitials: "KA", riderRating: 4.9, pickup: "Ikeja GRA, Lagos",       destination: "Lekki Phase 1",   distance: "12.1 km", earnings: "₦2,800", eta: "6 mins" },
  { riderName: "Tunde B.", riderInitials: "TB", riderRating: 4.7, pickup: "Ajah, Lagos",            destination: "City Mall",       distance: "8.3 km",  earnings: "₦1,950", eta: "3 mins" },
];

const MOCK_TRIPS = [
  { id: "1", rider: "Amara O.",  from: "Victoria Island", to: "Airport",      date: "Today, 9:14 AM",     earned: "₦4,200", rating: 5 },
  { id: "2", rider: "Kemi A.",   from: "Home",            to: "City Mall",    date: "Yesterday, 3:40 PM", earned: "₦1,850", rating: 5 },
  { id: "3", rider: "Tunde B.",  from: "Ikeja",           to: "Lekki Phase 1",date: "Apr 15, 8:00 AM",    earned: "₦2,600", rating: 4 },
];

const EARNINGS = [
  { label: "Today",      value: "₦4,200",  sub: "6 trips"    },
  { label: "This Week",  value: "₦18,500", sub: "31 trips"   },
  { label: "This Month", value: "₦74,000", sub: "120 trips"  },
  { label: "Rating",     value: "⭐ 4.87", sub: "Excellent"  },
];

const QUICK_ACTIONS = [
  { emoji: "📊", label: "Earnings",   href: "/driver/earnings" },
  { emoji: "🚗", label: "My Vehicle", href: "/driver/vehicle"  },
  { emoji: "🆘", label: "Support",    href: "/driver/support"  },
];

/* ─── Page ─────────────────────────────────────────────────── */
export default function DriverHome() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [driverName,  setDriverName]  = useState("Driver");
  const [isOnline,    setIsOnline]    = useState(() => {
    if (typeof window !== "undefined") return localStorage.getItem("driver_online") === "true";
    return false;
  });
  const [driverCoords, setDriverCoords] = useState<Coords | null>(null);
  const [rideRequests, setRideRequests] = useState<Coords[]>([]);
  const [activeRequest, setActiveRequest] = useState<typeof MOCK_REQUESTS[0] | null>(null);
  const [reqIndex, setReqIndex] = useState(0);

  /* ── Auth guard — driver only ── */
  useEffect(() => {
    // In development, inject a driver mock token if none exists or existing is a rider mock
    if (process.env.NODE_ENV === "development") {
      const existing = localStorage.getItem("accessToken");
      let needsMock = !existing;
      if (existing) {
        try {
          const p = JSON.parse(atob(existing.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
          if (p.role !== "driver") needsMock = true;
        } catch { needsMock = true; }
      }
      if (needsMock) {
        const mockPayload = btoa(JSON.stringify({
          fullName: "Test Driver",
          role: "driver",
          exp: 9999999999,
        }));
        localStorage.setItem(
          "accessToken",
          `eyJhbGciOiJIUzI1NiJ9.${mockPayload}.dev_signature`
        );
      }
    }

    const token = localStorage.getItem("accessToken");
    if (!token) { router.replace("/auth/login"); return; }
    const payload = decodeJwt(token);
    if (!payload) { router.replace("/auth/login"); return; }
    if (payload.exp && typeof payload.exp === "number" && payload.exp * 1000 < Date.now()) {
      localStorage.removeItem("accessToken");
      router.replace("/auth/login");
      return;
    }
    if (payload.role !== "driver") {
      router.replace("/home");
      return;
    }
    setDriverName((payload.fullName as string) || (payload.name as string) || "Driver");
    setAuthChecked(true);
  }, [router]);

  /* ── Geolocation ── */
  useEffect(() => {
    if (!authChecked) return;
    const fallback: Coords = { lat: 6.5244, lng: 3.3792 };
    if (!navigator.geolocation) { setDriverCoords(fallback); setRideRequests([randomOffset(fallback), randomOffset(fallback), randomOffset(fallback)]); return; }
    navigator.geolocation.getCurrentPosition(
      (p) => {
        const c = { lat: p.coords.latitude, lng: p.coords.longitude };
        setDriverCoords(c);
        setRideRequests([randomOffset(c), randomOffset(c), randomOffset(c)]);
      },
      () => {
        setDriverCoords(fallback);
        setRideRequests([randomOffset(fallback), randomOffset(fallback), randomOffset(fallback)]);
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  }, [authChecked]);

  /* ── Online toggle ── */
  const handleToggleOnline = useCallback(() => {
    setIsOnline(prev => {
      const next = !prev;
      localStorage.setItem("driver_online", String(next));
      if (!next) setActiveRequest(null); // dismiss popup when going offline
      return next;
    });
  }, []);

  /* ── Simulate ride request after 5s of being online ── */
  useEffect(() => {
    if (!isOnline || activeRequest) return;
    const id = setTimeout(() => {
      setActiveRequest(MOCK_REQUESTS[reqIndex % MOCK_REQUESTS.length]);
    }, 5000);
    return () => clearTimeout(id);
  }, [isOnline, activeRequest, reqIndex]);

  const handleAccept = () => {
    setActiveRequest(null);
    setReqIndex(i => i + 1);
  };

  const handleDecline = () => {
    setActiveRequest(null);
    setReqIndex(i => i + 1);
  };

  const handleLocateMe = () => {
    if (driverCoords) window.dispatchEvent(new CustomEvent("drive:locate-me", { detail: driverCoords }));
  };

  /* ── Loading ── */
  if (!authChecked) {
    return (
      <div style={{ minHeight: "100vh", background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "16px", fontFamily: "'DM Sans',sans-serif" }}>
        <div style={{ width: "40px", height: "40px", border: "3px solid rgba(255,107,0,0.2)", borderTopColor: "#FF6B00", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <p style={{ fontSize: "0.875rem", color: "#b3b3b3" }}>Loading Drive…</p>
      </div>
    );
  }

  return (
    <div className="driver-page">

      {/* ── Navbar ── */}
      <DriverNavbar driverName={driverName} isOnline={isOnline} onToggleOnline={handleToggleOnline} />

      {/* ── Status banner ── */}
      <div className="driver-banner">
        <div>
          <p className="driver-banner__greeting">{greeting(driverName)}</p>
          <p className="driver-banner__sub">
            {isOnline ? (
              <><span className="driver-banner__dot" />You&apos;re online. Waiting for ride requests…</>
            ) : (
              "You&apos;re offline. Go online to start earning."
            )}
          </p>
        </div>
        <div className="driver-banner__stats">
          <div className="driver-banner__stat">
            <p className="driver-banner__stat-value">₦4,200</p>
            <p className="driver-banner__stat-label">Today&apos;s earnings</p>
          </div>
          <div className="driver-banner__stat">
            <p className="driver-banner__stat-value">6</p>
            <p className="driver-banner__stat-label">Trips today</p>
          </div>
        </div>
      </div>

      {/* ── Map ── */}
      <div className="driver-map-section">
        <DriverMapView
          driverCoords={driverCoords}
          isOnline={isOnline}
          rideRequests={isOnline ? rideRequests : []}
          onLocateMe={handleLocateMe}
        />
      </div>

      {/* ── Scroll content ── */}
      <div className="driver-scroll">

        {/* Earnings strip */}
        <div className="earnings-strip">
          {EARNINGS.map((e) => (
            <div key={e.label} className="earnings-card">
              <p className="earnings-card__label">{e.label}</p>
              <p className="earnings-card__value">{e.value}</p>
              <p className="earnings-card__sub">{e.sub}</p>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="quick-actions">
          {QUICK_ACTIONS.map((a) => (
            <a key={a.label} href={a.href} className="quick-action-btn">
              <span className="quick-action-btn__icon">{a.emoji}</span>
              <span className="quick-action-btn__label">{a.label}</span>
            </a>
          ))}
        </div>

        {/* Recent trips */}
        <div className="driver-trips">
          <p className="driver-trips__title">Recent trips</p>
          {MOCK_TRIPS.length === 0 ? (
            <div style={{ background: "#222", borderRadius: "12px", padding: "32px", textAlign: "center", border: "1px solid rgba(255,255,255,0.07)" }}>
              <p style={{ fontSize: "1.5rem", marginBottom: "10px" }}>🚗</p>
              <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#fff", marginBottom: "4px" }}>No trips yet</p>
              <p style={{ fontSize: "0.75rem", color: "#b3b3b3" }}>Go online to receive your first ride!</p>
            </div>
          ) : MOCK_TRIPS.map((t) => (
            <div key={t.id} className="driver-trip-card">
              <div className="driver-trip-card__icon">🚗</div>
              <div className="driver-trip-card__info">
                <p className="driver-trip-card__route">{t.from} → {t.to}</p>
                <p className="driver-trip-card__meta">{t.rider} · {t.date} · {"★".repeat(t.rating)}</p>
              </div>
              <p className="driver-trip-card__earn">{t.earned}</p>
            </div>
          ))}
        </div>

      </div>

      {/* ── Ride request popup ── */}
      {activeRequest && isOnline && (
        <RideRequestPopup
          request={activeRequest}
          onAccept={handleAccept}
          onDecline={handleDecline}
        />
      )}

    </div>
  );
}
