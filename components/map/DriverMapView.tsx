"use client";

import { useEffect, useRef } from "react";
import { Navigation } from "lucide-react";

interface Coords { lat: number; lng: number; }

interface DriverMapViewProps {
  driverCoords: Coords | null;
  isOnline: boolean;
  rideRequests: Coords[];
  onLocateMe: () => void;
}

export default function DriverMapView({ driverCoords, isOnline, rideRequests, onLocateMe }: DriverMapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef       = useRef<unknown>(null);
  const driverMarkerRef = useRef<unknown>(null);
  const reqMarkersRef   = useRef<unknown[]>([]);

  const center = driverCoords ?? { lat: 6.5244, lng: 3.3792 };
  const osmBbox = `${center.lng - 0.025},${center.lat - 0.025},${center.lng + 0.025},${center.lat + 0.025}`;

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const hasToken = !!process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!hasToken) return;

    import("mapbox-gl").then((mgl) => {
      mgl.default.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;
      const map = new mgl.default.Map({
        container: containerRef.current!,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [center.lng, center.lat],
        zoom: 14,
        attributionControl: false,
      });
      map.addControl(new mgl.default.AttributionControl({ compact: true }), "bottom-left");
      mapRef.current = map;

      // Inject keyframes
      if (!document.getElementById("driver-map-kf")) {
        const s = document.createElement("style");
        s.id = "driver-map-kf";
        s.textContent = `
          @keyframes req-pulse {
            0%   { box-shadow: 0 0 0 0 rgba(239,68,68,0.5); }
            70%  { box-shadow: 0 0 0 10px rgba(239,68,68,0); }
            100% { box-shadow: 0 0 0 0 rgba(239,68,68,0); }
          }
        `;
        document.head.appendChild(s);
      }

      // Driver marker — orange car
      if (driverCoords) {
        const el = document.createElement("div");
        el.style.cssText = `
          width:36px;height:36px;border-radius:50%;
          background:#FF6B00;border:3px solid #fff;
          display:flex;align-items:center;justify-content:center;
          font-size:16px;box-shadow:rgba(0,0,0,0.4) 0 4px 12px;
          transition:opacity 0.3s;
        `;
        el.textContent = "🚗";
        el.style.opacity = isOnline ? "1" : "0.4";
        const m = new mgl.default.Marker({ element: el, anchor: "center" })
          .setLngLat([driverCoords.lng, driverCoords.lat])
          .addTo(map);
        driverMarkerRef.current = m;
      }

      // Ride request markers — pulsing red pins
      rideRequests.forEach((r) => {
        const el = document.createElement("div");
        el.style.cssText = `
          width:14px;height:14px;border-radius:50%;
          background:#ef4444;border:2px solid #fff;
          animation:req-pulse 1.5s infinite;
          box-shadow:0 0 0 0 rgba(239,68,68,0.5);
          opacity:${isOnline ? "1" : "0.3"};
          transition:opacity 0.3s;
        `;
        const m = new mgl.default.Marker({ element: el, anchor: "center" })
          .setLngLat([r.lng, r.lat])
          .addTo(map);
        reqMarkersRef.current.push(m);
      });
    });

    return () => {
      if (mapRef.current) { (mapRef.current as { remove: () => void }).remove(); mapRef.current = null; }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update marker opacity when online status changes
  useEffect(() => {
    if (!driverMarkerRef.current) return;
    const el = (driverMarkerRef.current as { getElement: () => HTMLElement }).getElement();
    el.style.opacity = isOnline ? "1" : "0.4";
    reqMarkersRef.current.forEach((m) => {
      const e = (m as { getElement: () => HTMLElement }).getElement();
      e.style.opacity = isOnline ? "1" : "0.3";
    });
  }, [isOnline]);

  const hasToken = !!process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {hasToken ? (
        <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
      ) : (
        <iframe
          title="Driver location map"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${osmBbox}&layer=mapnik&marker=${center.lat},${center.lng}`}
          style={{ width: "100%", height: "100%", border: "none", filter: "invert(0.92) hue-rotate(180deg) brightness(0.82) saturate(0.9)" }}
          loading="lazy"
        />
      )}

      {/* Status pill */}
      <div style={{ position: "absolute", top: "12px", left: "50%", transform: "translateX(-50%)", background: "rgba(18,18,18,0.88)", backdropFilter: "blur(12px)", border: `1px solid ${isOnline ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.1)"}`, borderRadius: "9999px", padding: "5px 14px", display: "flex", alignItems: "center", gap: "6px", zIndex: 10, whiteSpace: "nowrap" }}>
        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: isOnline ? "#22c55e" : "#6a6a6a", animation: isOnline ? "online-pulse 2s infinite" : "none" }} />
        <span style={{ fontSize: "0.6875rem", fontWeight: 600, color: "#fff", fontFamily: "'DM Sans',sans-serif" }}>
          {isOnline ? "You're online" : "You're offline"}
        </span>
      </div>

      {/* Ride requests badge */}
      {isOnline && rideRequests.length > 0 && (
        <div style={{ position: "absolute", top: "12px", right: "12px", background: "rgba(239,68,68,0.15)", backdropFilter: "blur(12px)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "9999px", padding: "5px 12px", display: "flex", alignItems: "center", gap: "6px", zIndex: 10 }}>
          <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#ef4444", animation: "req-pulse 1.5s infinite" }} />
          <span style={{ fontSize: "0.6875rem", fontWeight: 600, color: "#fff", fontFamily: "'DM Sans',sans-serif" }}>{rideRequests.length} requests nearby</span>
        </div>
      )}

      {/* Locate me */}
      <button onClick={onLocateMe} aria-label="Center on my location"
        style={{ position: "absolute", bottom: "16px", right: "16px", zIndex: 10, width: "40px", height: "40px", borderRadius: "50%", background: "#fff", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "rgba(0,0,0,0.3) 0px 4px 16px", transition: "transform 0.15s" }}
        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.08)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
      >
        <Navigation size={17} style={{ color: "#1a1a1a" }} />
      </button>
    </div>
  );
}
