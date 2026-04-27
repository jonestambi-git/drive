"use client";


import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import {
  MapPin, Navigation, Clock, Star, Car, CreditCard,
  Settings, LogOut, Home, ChevronRight, ArrowRight,
  RotateCcw, Menu, X, Users, TrendingUp, HelpCircle,
} from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────── */
interface Coords { lat: number; lng: number; }
interface Place  { name: string; address: string; coords: Coords; }

/* ─── Helpers ─────────────────────────────────────────────────── */
function randomDrivers(center: Coords, n = 5): Coords[] {
  return Array.from({ length: n }, () => ({
    lat: center.lat + (Math.random() - 0.5) * 0.04,
    lng: center.lng + (Math.random() - 0.5) * 0.04,
  }));
}
function haversine(a: Coords, b: Coords) {
  const R = 6371, dLat = (b.lat - a.lat) * Math.PI / 180, dLng = (b.lng - a.lng) * Math.PI / 180;
  const x = Math.sin(dLat/2)**2 + Math.cos(a.lat*Math.PI/180)*Math.cos(b.lat*Math.PI/180)*Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1-x));
}
function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
}

/* ─── Data ─────────────────────────────────────────────────── */
const PLACES: Place[] = [
  { name: "Home",            address: "123 Maple Street, Downtown",  coords: { lat: 6.5244, lng: 3.3792 } },
  { name: "Work",            address: "45 Victoria Island, Lagos",   coords: { lat: 6.4281, lng: 3.4219 } },
  { name: "City Mall",       address: "Ikeja City Mall, Lagos",      coords: { lat: 6.6018, lng: 3.3515 } },
  { name: "Murtala Airport", address: "Murtala Muhammed Airport",    coords: { lat: 6.5774, lng: 3.3212 } },
  { name: "Lekki Phase 1",   address: "Lekki Phase 1, Lagos",        coords: { lat: 6.4698, lng: 3.5852 } },
];
const TRIPS = [
  { id: "1", from: "Victoria Island", to: "Murtala Airport",  date: "Today, 9:14 AM",     fare: "₦4,200", status: "completed" as const },
  { id: "2", from: "Home",            to: "City Mall",        date: "Yesterday, 3:40 PM", fare: "₦1,850", status: "completed" as const },
  { id: "3", from: "Office",          to: "Lekki Phase 1",   date: "Apr 15, 8:00 AM",    fare: "₦2,600", status: "cancelled" as const },
];
const RIDE_TYPES = [
  { id: "go",  emoji: "🚗", name: "DriveGo",  desc: "Economy",  mult: 1.0 },
  { id: "x",   emoji: "🚙", name: "DriveX",   desc: "Comfort",  mult: 1.4 },
  { id: "lux", emoji: "🏎️", name: "DriveLux", desc: "Luxury",   mult: 2.1 },
];
const NAV = [
  { icon: Home,        label: "Dashboard",  href: "/rider/dashboard", active: true  },
  { icon: Car,         label: "My trips",   href: "/rider/trips",     active: false },
  { icon: CreditCard,  label: "Payments",   href: "/rider/payments",  active: false },
  { icon: Settings,    label: "Settings",   href: "/rider/settings",  active: false },
  { icon: HelpCircle,  label: "Help",       href: "/help",            active: false },
];

/* ─── Embedded map ─────────────────────────────────────────── */
function LiveMap({ userCoords, pickup, destination, drivers, onLocate }: {
  userCoords: Coords | null;
  pickup: Place | null;
  destination: Place | null;
  drivers: Coords[];
  onLocate: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef       = useRef<unknown>(null);
  const markersRef   = useRef<unknown[]>([]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const center = userCoords ? [userCoords.lng, userCoords.lat] : [3.3792, 6.5244];

    import("mapbox-gl").then((mgl) => {
      mgl.default.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
      const map = new mgl.default.Map({
        container: containerRef.current!,
        style: "mapbox://styles/mapbox/dark-v11",
        center: center as [number, number],
        zoom: 14,
        attributionControl: false,
      });
      map.addControl(new mgl.default.AttributionControl({ compact: true }), "bottom-left");
      mapRef.current = map;

      /* Inject pulse keyframes once */
      if (!document.getElementById("dash-pulse-kf")) {
        const s = document.createElement("style");
        s.id = "dash-pulse-kf";
        s.textContent = `
          @keyframes dash-pulse {
            0%   { box-shadow: 0 0 0 0 rgba(74,144,226,0.5); }
            70%  { box-shadow: 0 0 0 12px rgba(74,144,226,0); }
            100% { box-shadow: 0 0 0 0 rgba(74,144,226,0); }
          }
        `;
        document.head.appendChild(s);
      }

      /* User location — pulsing blue dot */
      if (userCoords) {
        const el = document.createElement("div");
        el.style.cssText = `
          width:16px;height:16px;border-radius:50%;
          background:#4A90E2;border:3px solid #fff;
          animation:dash-pulse 2s infinite;
          box-shadow:0 0 0 0 rgba(74,144,226,0.5);
        `;
        new mgl.default.Marker({ element: el, anchor: "center" })
          .setLngLat([userCoords.lng, userCoords.lat])
          .addTo(map);
      }

      /* Driver markers */
      drivers.forEach((d) => {
        const el = document.createElement("div");
        el.style.cssText = `
          width:30px;height:30px;border-radius:50%;
          background:#E03110;border:2px solid #fff;
          display:flex;align-items:center;justify-content:center;
          font-size:13px;cursor:pointer;
          box-shadow:rgba(0,0,0,0.3) 0 4px 12px;
          transition:transform 0.2s;
        `;
        el.textContent = "🚗";
        el.onmouseenter = () => (el.style.transform = "scale(1.15)");
        el.onmouseleave = () => (el.style.transform = "scale(1)");
        const m = new mgl.default.Marker({ element: el, anchor: "center" })
          .setLngLat([d.lng, d.lat])
          .setPopup(new mgl.default.Popup({ offset: 20, closeButton: false })
            .setHTML(`<div style="font-size:11px;font-weight:600;color:#fff;background:#2a2a2a;padding:5px 9px;border-radius:6px">Driver nearby</div>`))
          .addTo(map);
        markersRef.current.push(m);
      });
    });

    return () => {
      if (mapRef.current) { (mapRef.current as { remove: () => void }).remove(); mapRef.current = null; }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Route line */
  useEffect(() => {
    if (!mapRef.current) return;
    import("mapbox-gl").then((mgl) => {
      const map = mapRef.current as import("mapbox-gl").Map;

      const applyRoute = () => {
        if (map.getLayer("route")) map.removeLayer("route");
        if (map.getSource("route")) map.removeSource("route");
        if (pickup && destination) {
          const coords: [number, number][] = [
            [pickup.coords.lng, pickup.coords.lat],
            [destination.coords.lng, destination.coords.lat],
          ];
          map.addSource("route", { type: "geojson", data: { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: coords } } });
          map.addLayer({ id: "route", type: "line", source: "route", layout: { "line-join": "round", "line-cap": "round" }, paint: { "line-color": "#E03110", "line-width": 4, "line-dasharray": [2, 1.5] } });
          map.fitBounds(new mgl.default.LngLatBounds(coords[0], coords[1]), { padding: 80, duration: 900 });
        } else if (pickup) {
          map.flyTo({ center: [pickup.coords.lng, pickup.coords.lat], zoom: 14, duration: 700 });
        }
      };

      if (map.isStyleLoaded()) {
        applyRoute();
      } else {
        map.once("styledata", applyRoute);
      }
    });
  }, [pickup, destination]);

  const hasToken = !!process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "12px", overflow: "hidden" }}>
      {hasToken ? (
        <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
      ) : (
        /* Fallback — OpenStreetMap iframe (no key needed) */
        <iframe
          title="Live location map"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${
            userCoords
              ? `${userCoords.lng - 0.02},${userCoords.lat - 0.02},${userCoords.lng + 0.02},${userCoords.lat + 0.02}`
              : "3.36,6.51,3.40,6.54"
          }&layer=mapnik&marker=${userCoords ? `${userCoords.lat},${userCoords.lng}` : "6.5244,3.3792"}`}
          style={{ width: "100%", height: "100%", border: "none", filter: "invert(0.9) hue-rotate(180deg) brightness(0.85)" }}
          loading="lazy"
        />
      )}

      {/* Live pill */}
      <div style={{ position: "absolute", top: "12px", left: "50%", transform: "translateX(-50%)", background: "rgba(18,18,18,0.88)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "9999px", padding: "5px 14px", display: "flex", alignItems: "center", gap: "6px", zIndex: 10, whiteSpace: "nowrap" }}>
        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#E03110", animation: "sp-pulse 2s infinite" }} />
        <span style={{ fontSize: "0.6875rem", fontWeight: 600, color: "#fff", fontFamily: "var(--font-ui)" }}>Live location active</span>
      </div>

      {/* Driver count */}
      <div style={{ position: "absolute", top: "12px", right: "12px", background: "rgba(18,18,18,0.88)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "9999px", padding: "5px 12px", display: "flex", alignItems: "center", gap: "6px", zIndex: 10 }}>
        <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#E03110" }} />
        <span style={{ fontSize: "0.6875rem", fontWeight: 600, color: "#fff", fontFamily: "var(--font-ui)" }}>{drivers.length} drivers nearby</span>
      </div>

      {/* Locate me */}
      <button
        onClick={onLocate}
        aria-label="Center on my location"
        style={{ position: "absolute", bottom: "16px", right: "16px", zIndex: 10, width: "40px", height: "40px", borderRadius: "50%", background: "#fff", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "rgba(0,0,0,0.3) 0px 4px 16px", transition: "all 0.15s" }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <Navigation size={17} style={{ color: "#1a1a1a" }} />
      </button>
    </div>
  );
}

/* ─── Main dashboard ─────────────────────────────────────────── */
export default function RiderDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userCoords,  setUserCoords]  = useState<Coords | null>(null);
  const [drivers,     setDrivers]     = useState<Coords[]>([]);
  const [pickup,      setPickup]      = useState<Place | null>(null);
  const [destination, setDestination] = useState<Place | null>(null);
  const [pickupQ,     setPickupQ]     = useState("");
  const [destQ,       setDestQ]       = useState("");
  const [pickupFocus, setPickupFocus] = useState(false);
  const [destFocus,   setDestFocus]   = useState(false);
  const [selectedRide, setSelectedRide] = useState("go");
  const [step,        setStep]        = useState<"search"|"confirm"|"finding">("search");
  const [showPromo,   setShowPromo]   = useState(true);

  /* Geolocation */
  useEffect(() => {
    const fallback: Coords = { lat: 6.5244, lng: 3.3792 };
    if (!navigator.geolocation) { setUserCoords(fallback); setDrivers(randomDrivers(fallback)); return; }
    navigator.geolocation.getCurrentPosition(
      (p) => { const c = { lat: p.coords.latitude, lng: p.coords.longitude }; setUserCoords(c); setDrivers(randomDrivers(c)); setPickupQ("My Location"); setPickup({ name: "My Location", address: "Current location", coords: c }); },
      ()  => { setUserCoords(fallback); setDrivers(randomDrivers(fallback)); },
      { timeout: 8000, enableHighAccuracy: true }
    );
  }, []);

  const handleLocate = useCallback(() => {
    if (!userCoords) return;
    window.dispatchEvent(new CustomEvent("drive:locate-me", { detail: userCoords }));
  }, [userCoords]);

  const pickupSugg = pickupQ ? PLACES.filter(p => p.name.toLowerCase().includes(pickupQ.toLowerCase())) : PLACES;
  const destSugg   = destQ   ? PLACES.filter(p => p.name.toLowerCase().includes(destQ.toLowerCase()))   : PLACES;

  const dist = pickup && destination ? haversine(pickup.coords, destination.coords) : null;
  const mult = RIDE_TYPES.find(r => r.id === selectedRide)?.mult ?? 1;
  const fare = dist ? (dist * 1.8 + 2.5) * mult : null;
  const eta  = dist ? Math.round(dist * 2.5 + 3) : null;

  const confirm = () => {
    setStep("finding");
    setTimeout(() => { setStep("search"); setPickup(null); setDestination(null); setPickupQ(""); setDestQ(""); }, 5000);
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "var(--bg-base)", fontFamily: "var(--font-ui)", overflow: "hidden", color: "var(--text-base)" }}>

      {/* ══ SIDEBAR ══ */}
      <aside className="rider-dashboard-sidebar">
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

      {/* ══ MAIN ══ */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* ── Left panel: booking ── */}
        <div className="rider-dashboard-booking">

          {/* Header */}
          <div style={{ padding: "20px 20px 0" }}>
            <p style={{ fontSize: "0.5625rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "4px" }}>
              {userCoords ? "Live location active" : "Locating…"}
            </p>
            <h1 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--text-base)", lineHeight: 1.2, margin: 0 }}>
              {greeting()}, John 👋
            </h1>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px" }}>Where are you headed today?</p>
          </div>

          {/* Inputs */}
          <div style={{ padding: "16px 20px", position: "relative" }}>
            <div style={{ background: "var(--bg-elevated)", borderRadius: "8px", border: "1px solid var(--border-faint)", overflow: "visible", position: "relative" }}>
              {/* Connector */}
              <div style={{ position: "absolute", left: "26px", top: "42px", width: "2px", height: "20px", background: "var(--border)", zIndex: 1 }} />

              {/* Pickup */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 14px", position: "relative" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "var(--accent)", flexShrink: 0, zIndex: 2 }} />
                <input type="text" placeholder="Pickup location" value={pickupQ}
                  onChange={(e) => { setPickupQ(e.target.value); setPickup(null); }}
                  onFocus={() => setPickupFocus(true)}
                  onBlur={() => setTimeout(() => setPickupFocus(false), 160)}
                  style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: "0.8125rem", color: "var(--text-base)", fontFamily: "var(--font-ui)" }}
                />
                {pickupFocus && (
                  <button onMouseDown={() => { if (userCoords) { const h: Place = { name: "My Location", address: "Current location", coords: userCoords }; setPickup(h); setPickupQ("My Location"); } }} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--accent)", fontSize: "0.5625rem", fontWeight: 700, whiteSpace: "nowrap", fontFamily: "var(--font-ui)" }}>
                    📍 Use location
                  </button>
                )}
              </div>

              {/* Divider */}
              <div style={{ height: "1px", background: "var(--border-faint)", margin: "0 14px" }} />

              {/* Destination */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 14px" }}>
                <MapPin size={12} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
                <input type="text" placeholder="Where to?" value={destQ}
                  onChange={(e) => { setDestQ(e.target.value); setDestination(null); setStep("search"); }}
                  onFocus={() => setDestFocus(true)}
                  onBlur={() => setTimeout(() => setDestFocus(false), 160)}
                  style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: "0.8125rem", color: "var(--text-base)", fontFamily: "var(--font-ui)" }}
                />
              </div>
            </div>

            {/* Pickup suggestions */}
            {pickupFocus && (
              <div style={{ position: "absolute", left: "20px", right: "20px", top: "calc(100% - 4px)", background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "8px", overflow: "hidden", zIndex: 50, boxShadow: "var(--shadow-heavy)" }}>
                {pickupSugg.map((p) => (
                  <button key={p.name} onMouseDown={() => { setPickup(p); setPickupQ(p.name); setPickupFocus(false); }} style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", background: "none", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "var(--font-ui)", transition: "background 0.1s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-elevated)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                  >
                    <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "var(--bg-elevated)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Clock size={12} style={{ color: "var(--text-muted)" }} /></div>
                    <div><p style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-base)", lineHeight: 1 }}>{p.name}</p><p style={{ fontSize: "0.6875rem", color: "var(--text-muted)", marginTop: "2px" }}>{p.address}</p></div>
                  </button>
                ))}
              </div>
            )}

            {/* Dest suggestions */}
            {destFocus && (
              <div style={{ position: "absolute", left: "20px", right: "20px", top: "calc(100% - 4px)", background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "8px", overflow: "hidden", zIndex: 50, boxShadow: "var(--shadow-heavy)" }}>
                {destSugg.map((p) => (
                  <button key={p.name} onMouseDown={() => { setDestination(p); setDestQ(p.name); setDestFocus(false); if (pickup) setStep("confirm"); }} style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", background: "none", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "var(--font-ui)", transition: "background 0.1s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-elevated)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                  >
                    <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "var(--bg-elevated)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><MapPin size={12} style={{ color: "var(--text-muted)" }} /></div>
                    <div><p style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-base)", lineHeight: 1 }}>{p.name}</p><p style={{ fontSize: "0.6875rem", color: "var(--text-muted)", marginTop: "2px" }}>{p.address}</p></div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Ride types */}
          <div style={{ padding: "0 20px 16px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "8px" }}>
            {RIDE_TYPES.map((r) => {
              const catFare = fare ? (fare).toFixed(2) : null;
              const catEta  = eta  ? eta + (r.id === "x" ? 2 : r.id === "lux" ? 4 : 0) : null;
              return (
                <button key={r.id} onClick={() => setSelectedRide(r.id)} style={{ background: selectedRide === r.id ? "var(--accent-dim)" : "var(--bg-elevated)", border: selectedRide === r.id ? "1.5px solid var(--accent)" : "1.5px solid transparent", borderRadius: "8px", padding: "10px 8px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", textAlign: "center", transition: "all 0.15s", fontFamily: "var(--font-ui)" }}>
                  <span style={{ fontSize: "1.25rem" }}>{r.emoji}</span>
                  <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: "var(--text-base)" }}>{r.name}</span>
                  <span style={{ fontSize: "0.5rem", color: "var(--text-muted)" }}>{r.desc}</span>
                  {catEta  && <span style={{ fontSize: "0.5rem", color: "var(--accent)", fontWeight: 600 }}>{catEta} min</span>}
                  {catFare && <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: "var(--text-base)" }}>₦{(parseFloat(catFare) * r.mult * 1500).toFixed(0)}</span>}
                </button>
              );
            })}
          </div>

          {/* Fare row */}
          {fare && eta && (
            <div style={{ margin: "0 20px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "var(--accent-dim)", border: "1px solid rgba(224,49,16,0.2)", borderRadius: "8px" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{dist?.toFixed(1)} km · {eta} min</span>
              <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--accent)" }}>₦{(fare * 1500).toFixed(0)} est.</span>
            </div>
          )}

          {/* CTA */}
          <div style={{ padding: "0 20px 16px" }}>
            {step === "finding" ? (
              <button disabled style={{ width: "100%", background: "var(--bg-elevated)", color: "var(--text-muted)", border: "none", borderRadius: "9999px", padding: "13px", fontSize: "0.8125rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontFamily: "var(--font-ui)", cursor: "not-allowed" }}>
                <span style={{ width: "13px", height: "13px", border: "2px solid rgba(255,255,255,0.2)", borderTopColor: "#fff", borderRadius: "50%", animation: "sp-pulse 0.7s linear infinite", display: "inline-block" }} />
                Finding your driver…
              </button>
            ) : (
              <button onClick={confirm} disabled={!pickup || !destination} style={{ width: "100%", background: !pickup || !destination ? "var(--bg-elevated)" : "var(--accent)", color: !pickup || !destination ? "var(--text-faint)" : "#fff", border: "none", borderRadius: "9999px", padding: "13px", fontSize: "0.8125rem", fontWeight: 700, letterSpacing: "0.5px", cursor: !pickup || !destination ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontFamily: "var(--font-ui)", transition: "all 0.15s", boxShadow: !pickup || !destination ? "none" : "rgba(224,49,16,0.3) 0px 8px 24px" }}>
                Request a Ride <ArrowRight size={14} />
              </button>
            )}
          </div>

          {/* Stats */}
          <div style={{ padding: "0 20px 16px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "8px" }}>
            {[{ icon: Car, label: "Trips", value: "24" }, { icon: Star, label: "Rating", value: "4.9" }, { icon: TrendingUp, label: "Spent", value: "₦48K" }].map(({ icon: Icon, label, value }) => (
              <div key={label} style={{ background: "var(--bg-surface)", borderRadius: "8px", padding: "10px", border: "1px solid var(--border)", textAlign: "center" }}>
                <Icon size={13} style={{ color: "var(--accent)", margin: "0 auto 4px" }} />
                <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--text-base)", lineHeight: 1 }}>{value}</p>
                <p style={{ fontSize: "0.5625rem", color: "var(--text-muted)", marginTop: "2px" }}>{label}</p>
              </div>
            ))}
          </div>

          {/* Recent trips */}
          <div style={{ padding: "0 20px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-base)" }}>Recent trips</p>
              <Link href="/rider/trips" style={{ fontSize: "0.6875rem", color: "var(--accent)", fontWeight: 600, display: "flex", alignItems: "center", gap: "2px", textDecoration: "none" }}>See all <ChevronRight size={11} /></Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {TRIPS.map((t) => (
                <div key={t.id} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px", background: "var(--bg-surface)", borderRadius: "8px", border: "1px solid var(--border)" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: t.status === "completed" ? "var(--accent-dim)" : "rgba(243,114,127,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Car size={12} style={{ color: t.status === "completed" ? "var(--accent)" : "var(--text-negative)" }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-base)", lineHeight: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.from} → {t.to}</p>
                    <p style={{ fontSize: "0.625rem", color: "var(--text-muted)", marginTop: "2px" }}>{t.date}</p>
                  </div>
                  <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-base)", flexShrink: 0 }}>{t.fare}</p>
                  {t.status === "completed" && (
                    <button onClick={() => { setPickupQ(t.from); setDestQ(t.to); }} style={{ background: "none", border: "1px solid rgba(224,49,16,0.3)", borderRadius: "9999px", padding: "4px 8px", fontSize: "0.5625rem", fontWeight: 700, color: "var(--accent)", cursor: "pointer", flexShrink: 0, fontFamily: "var(--font-ui)", display: "flex", alignItems: "center", gap: "3px" }}>
                      <RotateCcw size={9} /> Rebook
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── MAP ── */}
        <div style={{ flex: 1, position: "relative", background: "var(--bg-base)" }}>
          <LiveMap
            userCoords={userCoords}
            pickup={pickup}
            destination={destination}
            drivers={drivers}
            onLocate={handleLocate}
          />
        </div>
      </div>
    </div>
  );
}
