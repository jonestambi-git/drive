"use client";

import { useEffect, useRef, useCallback } from "react";
import { Navigation } from "lucide-react";
import "../../styles/map.css";

interface Coords { lat: number; lng: number; }

interface MapViewProps {
  userCoords: Coords | null;
  pickup: { coords: Coords } | null;
  destination: { coords: Coords } | null;
  driverCoords: Coords[];
  onLocateMe: () => void;
}

export default function MapView({ userCoords, pickup, destination, driverCoords, onLocateMe }: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef       = useRef<unknown>(null);
  const markersRef   = useRef<unknown[]>([]);
  const userMarkerRef = useRef<unknown>(null);

  // Init map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const center = userCoords
      ? [userCoords.lng, userCoords.lat]
      : [3.3792, 6.5244];

    import("mapbox-gl").then((mapboxgl) => {
      const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
      mapboxgl.default.accessToken = token;

      const map = new mapboxgl.default.Map({
        container: containerRef.current!,
        style: "mapbox://styles/mapbox/dark-v11",
        center: center as [number, number],
        zoom: 14,
        attributionControl: false,
        logoPosition: "bottom-left",
      });

      map.addControl(
        new mapboxgl.default.AttributionControl({ compact: true }),
        "bottom-left"
      );

      mapRef.current = map;

      // User location marker — pulsing blue circle
      if (userCoords) {
        const el = document.createElement("div");
        el.style.cssText = `
          position:relative;
          width:18px;height:18px;
        `;
        el.innerHTML = `
          <div style="
            position:absolute;inset:0;
            border-radius:50%;
            background:#4A90E2;
            border:3px solid #fff;
            box-shadow:0 0 0 0 rgba(74,144,226,0.4);
            animation:user-pulse-ring 2s infinite;
            z-index:2;
          "></div>
          <div style="
            position:absolute;
            top:-8px;left:-8px;
            width:34px;height:34px;
            border-radius:50%;
            background:rgba(74,144,226,0.2);
            animation:user-pulse-outer 2s infinite;
            z-index:1;
          "></div>
        `;

        // Inject keyframes once
        if (!document.getElementById("user-pulse-style")) {
          const style = document.createElement("style");
          style.id = "user-pulse-style";
          style.textContent = `
            @keyframes user-pulse-ring {
              0%   { box-shadow: 0 0 0 0 rgba(74,144,226,0.5); }
              70%  { box-shadow: 0 0 0 10px rgba(74,144,226,0); }
              100% { box-shadow: 0 0 0 0 rgba(74,144,226,0); }
            }
            @keyframes user-pulse-outer {
              0%,100% { transform:scale(1); opacity:0.4; }
              50%      { transform:scale(1.4); opacity:0.1; }
            }
          `;
          document.head.appendChild(style);
        }

        const marker = new mapboxgl.default.Marker({ element: el, anchor: "center" })
          .setLngLat([userCoords.lng, userCoords.lat])
          .addTo(map);
        userMarkerRef.current = marker;
      }

      // Driver markers
      driverCoords.forEach((d) => {
        const el = document.createElement("div");
        el.style.cssText = `
          width:32px;height:32px;
          border-radius:50%;
          background:#FF6B00;
          border:2px solid #fff;
          display:flex;align-items:center;justify-content:center;
          font-size:14px;
          box-shadow:rgba(0,0,0,0.3) 0px 4px 12px;
          cursor:pointer;
          transition:transform 0.2s;
        `;
        el.textContent = "🚗";
        el.onmouseenter = () => (el.style.transform = "scale(1.15)");
        el.onmouseleave = () => (el.style.transform = "scale(1)");

        const m = new mapboxgl.default.Marker({ element: el, anchor: "center" })
          .setLngLat([d.lng, d.lat])
          .setPopup(
            new mapboxgl.default.Popup({ offset: 20, closeButton: false })
              .setHTML(`<div style="font-size:12px;font-weight:600;color:#fff;background:#2a2a2a;padding:6px 10px;border-radius:6px">Driver nearby</div>`)
          )
          .addTo(map);
        markersRef.current.push(m);
      });
    });

    return () => {
      if (mapRef.current) {
        (mapRef.current as { remove: () => void }).remove();
        mapRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update route when pickup/destination change
  useEffect(() => {
    if (!mapRef.current) return;
    import("mapbox-gl").then((mapboxgl) => {
      const map = mapRef.current as import("mapbox-gl").Map;

      const applyRoute = () => {
        if (map.getLayer("route")) map.removeLayer("route");
        if (map.getSource("route")) map.removeSource("route");

        if (pickup && destination) {
          const coords: [number, number][] = [
            [pickup.coords.lng, pickup.coords.lat],
            [destination.coords.lng, destination.coords.lat],
          ];
          map.addSource("route", {
            type: "geojson",
            data: { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: coords } },
          });
          map.addLayer({
            id: "route",
            type: "line",
            source: "route",
            layout: { "line-join": "round", "line-cap": "round" },
            paint: { "line-color": "#FF6B00", "line-width": 4, "line-dasharray": [2, 1.5] },
          });
          const bounds = new mapboxgl.default.LngLatBounds(coords[0], coords[1]);
          map.fitBounds(bounds, { padding: 100, duration: 900 });
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

  // Default center for OSM fallback
  const osmLat = userCoords?.lat ?? 6.5244;
  const osmLng = userCoords?.lng ?? 3.3792;
  const osmBbox = `${osmLng - 0.025},${osmLat - 0.025},${osmLng + 0.025},${osmLat + 0.025}`;

  return (
    <div className="map-container">
      {hasToken ? (
        <div ref={containerRef} className="map-canvas" />
      ) : (
        /* OpenStreetMap iframe — works with zero config, dark-filtered to match theme */
        <iframe
          title="Live location map"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${osmBbox}&layer=mapnik&marker=${osmLat},${osmLng}`}
          style={{ width: "100%", height: "100%", border: "none", filter: "invert(0.92) hue-rotate(180deg) brightness(0.82) saturate(0.9)" }}
          loading="lazy"
        />
      )}

      {/* Live location pill */}
      {userCoords && (
        <div className="map-live-pill">
          <span className="map-live-pill__dot" />
          <span className="map-live-pill__text">Live location active</span>
        </div>
      )}

      {/* Driver count badge */}
      <div className="map-drivers-badge">
        <span className="map-drivers-badge__dot" />
        <span className="map-drivers-badge__text">{driverCoords.length} drivers nearby</span>
      </div>

      {/* Locate me button */}
      <button className="map-locate-btn" onClick={onLocateMe} aria-label="Center on my location">
        <Navigation size={18} />
      </button>
    </div>
  );
}
