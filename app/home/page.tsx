"use client";


import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import DriveNavbar from "@/components/ui/drive/Navbar";
import MapView from "@/components/map/MapView";
import BookingPanel from "@/components/rider/BookingPanel";
import RecentTrips from "@/components/rider/RecentTrips";

/* ─── Types ─────────────────────────────────────────────────── */
interface Coords { lat: number; lng: number; }
interface Place  { name: string; address: string; coords: Coords; }
interface Trip   { id: string; from: string; to: string; date: string; fare: string; status: "completed" | "cancelled"; }

/* ─── Helpers ───────────────────────────────────────────────── */
function decodeJwt(token: string): Record<string, unknown> | null {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
  } catch { return null; }
}

function getGreeting(name: string): string {
  const h = new Date().getHours();
  const time = h < 12 ? "morning" : h < 17 ? "afternoon" : "evening";
  return `Good ${time}, ${name.split(" ")[0]} 👋`;
}

function haversine(a: Coords, b: Coords): number {
  const R = 6371;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLng = (b.lng - a.lng) * Math.PI / 180;
  const x = Math.sin(dLat / 2) ** 2 +
    Math.cos(a.lat * Math.PI / 180) * Math.cos(b.lat * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

function randomDrivers(center: Coords, count = 5): Coords[] {
  return Array.from({ length: count }, () => ({
    lat: center.lat + (Math.random() - 0.5) * 0.04,
    lng: center.lng + (Math.random() - 0.5) * 0.04,
  }));
}

/* ─── Mock data ─────────────────────────────────────────────── */
const RECENT_PLACES: Place[] = [
  { name: "Home",            address: "123 Maple Street, Downtown",  coords: { lat: 6.5244, lng: 3.3792 } },
  { name: "Work",            address: "45 Victoria Island, Lagos",   coords: { lat: 6.4281, lng: 3.4219 } },
  { name: "City Mall",       address: "Ikeja City Mall, Lagos",      coords: { lat: 6.6018, lng: 3.3515 } },
  { name: "Murtala Airport", address: "Murtala Muhammed Airport",    coords: { lat: 6.5774, lng: 3.3212 } },
  { name: "Lekki Phase 1",   address: "Lekki Phase 1, Lagos",        coords: { lat: 6.4698, lng: 3.5852 } },
];

const MOCK_TRIPS: Trip[] = [
  { id: "1", from: "Victoria Island", to: "Murtala Airport",  date: "Today, 9:14 AM",      fare: "₦4,200", status: "completed" },
  { id: "2", from: "Home",            to: "City Mall",        date: "Yesterday, 3:40 PM",  fare: "₦1,850", status: "completed" },
  { id: "3", from: "Office",          to: "Lekki Phase 1",   date: "Apr 15, 8:00 AM",     fare: "₦2,600", status: "cancelled"  },
];

/* ─── Page component ────────────────────────────────────────── */
export default function HomePage() {
  const router = useRouter();

  /* Auth state */
  const [authChecked, setAuthChecked] = useState(false);
  const [userName,    setUserName]    = useState("Rider");

  /* Location */
  const [userCoords,   setUserCoords]   = useState<Coords | null>(null);
  const [driverCoords, setDriverCoords] = useState<Coords[]>([]);

  /* Booking */
  const [pickup,      setPickup]      = useState<Place | null>(null);
  const [destination, setDestination] = useState<Place | null>(null);
  const [pickupQuery, setPickupQuery] = useState("");
  const [destQuery,   setDestQuery]   = useState("");
  const [step,        setStep]        = useState<"search" | "confirm" | "finding">("search");

  /* Promo */
  const [showPromo, setShowPromo] = useState(true);

  /* Map ref for locate-me */
  const mapCenterRef = useRef<((c: Coords) => void) | null>(null);

  /* ── Auth guard ── */
  useEffect(() => {
    // In development, auto-inject a mock token so the page is viewable
    if (process.env.NODE_ENV === "development") {
      const existing = localStorage.getItem("accessToken");
      if (!existing) {
        // Mock JWT: header.payload.signature — payload has fullName, role, exp far in future
        const mockPayload = btoa(JSON.stringify({
          fullName: "Chidi Okeke",
          role: "rider",
          exp: 9999999999,
        }));
        localStorage.setItem(
          "accessToken",
          `eyJhbGciOiJIUzI1NiJ9.${mockPayload}.dev_signature`
        );
      }
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.replace("/");
      return;
    }
    const payload = decodeJwt(token);
    if (!payload) {
      router.replace("/");
      return;
    }
    // Check expiry
    if (payload.exp && typeof payload.exp === "number" && payload.exp * 1000 < Date.now()) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      router.replace("/");
      return;
    }
    // Extract name
    const name =
      (payload.fullName as string) ||
      (payload.name as string) ||
      (payload.firstName as string) ||
      "Rider";
    setUserName(name);
    setAuthChecked(true);
  }, [router]);

  /* ── Geolocation ── */
  useEffect(() => {
    if (!authChecked) return;
    const fallback: Coords = { lat: 6.5244, lng: 3.3792 };

    if (!navigator.geolocation) {
      setUserCoords(fallback);
      setDriverCoords(randomDrivers(fallback));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const c: Coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserCoords(c);
        setDriverCoords(randomDrivers(c));
        setPickupQuery("My Location");
        setPickup({ name: "My Location", address: "Current location", coords: c });
      },
      () => {
        setUserCoords(fallback);
        setDriverCoords(randomDrivers(fallback));
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  }, [authChecked]);

  /* ── Suggestions filter ── */
  const pickupSuggestions = pickupQuery.length > 0
    ? RECENT_PLACES.filter(p =>
        p.name.toLowerCase().includes(pickupQuery.toLowerCase()) ||
        p.address.toLowerCase().includes(pickupQuery.toLowerCase())
      )
    : RECENT_PLACES;

  const destSuggestions = destQuery.length > 0
    ? RECENT_PLACES.filter(p =>
        p.name.toLowerCase().includes(destQuery.toLowerCase()) ||
        p.address.toLowerCase().includes(destQuery.toLowerCase())
      )
    : RECENT_PLACES;

  /* ── Handlers ── */
  const handlePickupChange = (q: string) => {
    setPickupQuery(q);
    setPickup(null);
  };

  const handleDestChange = (q: string) => {
    setDestQuery(q);
    setDestination(null);
    setStep("search");
  };

  const handlePickupSelect = (p: Place) => {
    setPickup(p);
    setPickupQuery(p.name);
  };

  const handleDestSelect = (p: Place) => {
    setDestination(p);
    setDestQuery(p.name);
    if (pickup) setStep("confirm");
  };

  const handleUseMyLocation = () => {
    if (!userCoords) return;
    const here: Place = { name: "My Location", address: "Current location", coords: userCoords };
    setPickup(here);
    setPickupQuery("My Location");
  };

  const handleConfirm = () => {
    setStep("finding");
    setTimeout(() => {
      setStep("search");
      setPickup(null);
      setDestination(null);
      setPickupQuery("");
      setDestQuery("");
    }, 5000);
  };

  const handleLocateMe = useCallback(() => {
    if (!userCoords) return;
    import("mapbox-gl").then((mapboxgl) => {
      // Re-center via a custom event the map listens to
      const event = new CustomEvent("drive:locate-me", { detail: userCoords });
      window.dispatchEvent(event);
    });
  }, [userCoords]);

  const handleRebook = (trip: Trip) => {
    setPickupQuery(trip.from);
    setDestQuery(trip.to);
    setPickup(RECENT_PLACES.find(p => p.name.toLowerCase().includes(trip.from.toLowerCase())) || null);
    setDestination(RECENT_PLACES.find(p => p.name.toLowerCase().includes(trip.to.toLowerCase())) || null);
    if (pickup && destination) setStep("confirm");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ── Distance / fare ── */
  const distance = pickup && destination
    ? haversine(pickup.coords, destination.coords)
    : null;
  const fare = distance ? (distance * 1.8 + 2.5).toFixed(2) : null;
  const eta  = distance ? Math.round(distance * 2.5 + 3) : null;

  /* ── Loading screen ── */
  if (!authChecked) {
    return (
      <div className="home-loading">
        <div className="home-loading__spinner" />
        <p className="home-loading__text">Loading Drive…</p>
      </div>
    );
  }

  return (
    <div className="home-page">

      {/* ── Navbar ── */}
      <DriveNavbar
        userName={userName}
        onSearchClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />

      {/* ── Map + booking panel ── */}
      <div className="home-map-section" style={{ marginTop: "60px" }}>
        <MapView
          userCoords={userCoords}
          pickup={pickup}
          destination={destination}
          driverCoords={driverCoords}
          onLocateMe={handleLocateMe}
        />

        <BookingPanel
          greeting={getGreeting(userName)}
          pickup={pickup}
          destination={destination}
          pickupQuery={pickupQuery}
          destQuery={destQuery}
          onPickupChange={handlePickupChange}
          onDestChange={handleDestChange}
          onPickupSelect={handlePickupSelect}
          onDestSelect={handleDestSelect}
          onUseMyLocation={handleUseMyLocation}
          onConfirm={handleConfirm}
          distance={distance}
          fare={fare}
          eta={eta}
          step={step}
          suggestions={pickupSuggestions}
          destSuggestions={destSuggestions}
        />
      </div>

      {/* ── Scroll content ── */}
      <div className="home-scroll">

        {/* Promo banner */}
        {showPromo && (
          <div className="promo-banner">
            <div className="promo-banner__text">
              <span className="promo-banner__label">Limited offer</span>
              <span className="promo-banner__headline">Get 20% off your next 3 rides</span>
              <span className="promo-banner__code">DRIVE20</span>
            </div>
            <button className="promo-banner__dismiss" onClick={() => setShowPromo(false)} aria-label="Dismiss promo">
              ×
            </button>
          </div>
        )}

        {/* Recent trips */}
        <RecentTrips trips={MOCK_TRIPS} onRebook={handleRebook} />

        {/* Quick stats */}
        <div style={{ padding: "24px 20px 0", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
          {[
            { label: "Total trips", value: "24",    sub: "+3 this week" },
            { label: "Total spent", value: "₦48K",  sub: "This month"   },
            { label: "Your rating", value: "4.9★",  sub: "24 trips"     },
          ].map((s) => (
            <div key={s.label} style={{ background: "#222", borderRadius: "12px", padding: "14px 12px", border: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
              <p style={{ fontSize: "1.125rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontSize: "0.5625rem", color: "#b3b3b3", marginTop: "4px" }}>{s.label}</p>
              <p style={{ fontSize: "0.5rem", color: "#FF6B00", marginTop: "2px", fontWeight: 600 }}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Bottom padding */}
        <div style={{ height: "40px" }} />
      </div>

    </div>
  );
}
