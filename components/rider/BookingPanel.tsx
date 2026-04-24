"use client";

import { useState, useRef, useEffect } from "react";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import "../../styles/booking.css";

interface Coords { lat: number; lng: number; }
interface Place  { name: string; address: string; coords: Coords; }

interface BookingPanelProps {
  greeting: string;
  pickup: Place | null;
  destination: Place | null;
  pickupQuery: string;
  destQuery: string;
  onPickupChange: (q: string) => void;
  onDestChange: (q: string) => void;
  onPickupSelect: (p: Place) => void;
  onDestSelect: (p: Place) => void;
  onUseMyLocation: () => void;
  onConfirm: () => void;
  distance: number | null;
  fare: string | null;
  eta: number | null;
  step: "search" | "confirm" | "finding";
  suggestions: Place[];
  destSuggestions: Place[];
}

const rideCategories = [
  { id: "go",  emoji: "🚗", name: "DriveGo",  desc: "Economy",  etaOffset: 0,  fareMultiplier: 1.0 },
  { id: "x",   emoji: "🚙", name: "DriveX",   desc: "Comfort",  etaOffset: 2,  fareMultiplier: 1.4 },
  { id: "lux", emoji: "🏎️", name: "DriveLux", desc: "Luxury",   etaOffset: 4,  fareMultiplier: 2.1 },
];

export default function BookingPanel({
  greeting, pickup, destination, pickupQuery, destQuery,
  onPickupChange, onDestChange, onPickupSelect, onDestSelect,
  onUseMyLocation, onConfirm, distance, fare, eta, step,
  suggestions, destSuggestions,
}: BookingPanelProps) {
  const [selectedCat, setSelectedCat] = useState("go");
  const [pickupFocus, setPickupFocus] = useState(false);
  const [destFocus,   setDestFocus]   = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const selectedCatData = rideCategories.find((c) => c.id === selectedCat)!;
  const adjustedFare = fare
    ? (parseFloat(fare) * selectedCatData.fareMultiplier).toFixed(2)
    : null;
  const adjustedEta = eta ? eta + selectedCatData.etaOffset : null;

  return (
    <div className="booking-panel" ref={panelRef}>
      <div className="booking-panel__handle" />
      <div className="booking-panel__inner">

        {/* Greeting */}
        <p className="booking-panel__greeting">{greeting}</p>

        {/* Input group */}
        <div className="booking-inputs" style={{ position: "relative" }}>
          <div className="booking-inputs__line" />

          {/* Pickup */}
          <div className="booking-input-row">
            <span className="booking-input-row__dot booking-input-row__dot--pickup" />
            <input
              type="text"
              placeholder="Pickup location"
              value={pickupQuery}
              onChange={(e) => { onPickupChange(e.target.value); }}
              onFocus={() => setPickupFocus(true)}
              onBlur={() => setTimeout(() => setPickupFocus(false), 160)}
              aria-label="Pickup location"
            />
            {pickupFocus && (
              <button
                onMouseDown={onUseMyLocation}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#FF6B00", fontSize: "0.625rem", fontWeight: 700, whiteSpace: "nowrap", fontFamily: "'DM Sans', sans-serif" }}
              >
                📍 Use location
              </button>
            )}
          </div>

          {/* Destination */}
          <div className="booking-input-row">
            <span className="booking-input-row__dot booking-input-row__dot--dest" />
            <input
              type="text"
              placeholder="Where to?"
              value={destQuery}
              onChange={(e) => onDestChange(e.target.value)}
              onFocus={() => setDestFocus(true)}
              onBlur={() => setTimeout(() => setDestFocus(false), 160)}
              aria-label="Destination"
            />
          </div>

          {/* Pickup suggestions */}
          {pickupFocus && suggestions.length > 0 && (
            <div className="booking-suggestions">
              {suggestions.map((p) => (
                <button key={p.name} className="booking-suggestion-item" onMouseDown={() => onPickupSelect(p)}>
                  <div className="booking-suggestion-item__icon"><Clock size={13} /></div>
                  <div>
                    <p className="booking-suggestion-item__name">{p.name}</p>
                    <p className="booking-suggestion-item__addr">{p.address}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Destination suggestions */}
          {destFocus && destSuggestions.length > 0 && (
            <div className="booking-suggestions" style={{ top: "calc(100% + 4px)" }}>
              {destSuggestions.map((p) => (
                <button key={p.name} className="booking-suggestion-item" onMouseDown={() => onDestSelect(p)}>
                  <div className="booking-suggestion-item__icon"><MapPin size={13} /></div>
                  <div>
                    <p className="booking-suggestion-item__name">{p.name}</p>
                    <p className="booking-suggestion-item__addr">{p.address}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Ride categories */}
        <div className="ride-categories">
          {rideCategories.map((cat) => {
            const catFare = fare
              ? (parseFloat(fare) * cat.fareMultiplier).toFixed(2)
              : null;
            const catEta = eta ? eta + cat.etaOffset : null;
            return (
              <button
                key={cat.id}
                className={`ride-category-card${selectedCat === cat.id ? " ride-category-card--active" : ""}`}
                onClick={() => setSelectedCat(cat.id)}
              >
                <span className="ride-category-card__emoji">{cat.emoji}</span>
                <span className="ride-category-card__name">{cat.name}</span>
                <span className="ride-category-card__desc">{cat.desc}</span>
                {catEta && <span className="ride-category-card__eta">{catEta} min</span>}
                {catFare && <span className="ride-category-card__fare">₦{(parseFloat(catFare) * 1500).toFixed(0)}</span>}
              </button>
            );
          })}
        </div>

        {/* Fare estimate */}
        {adjustedFare && adjustedEta && (
          <div className="booking-fare-row">
            <span className="booking-fare-row__label">
              {distance?.toFixed(1)} km · {adjustedEta} min
            </span>
            <span className="booking-fare-row__value">
              ₦{(parseFloat(adjustedFare) * 1500).toFixed(0)} est.
            </span>
          </div>
        )}

        {/* CTA */}
        {step === "finding" ? (
          <button className="booking-cta" disabled>
            <span style={{ display: "inline-block", width: "14px", height: "14px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
            Finding your driver…
          </button>
        ) : (
          <button
            className="booking-cta"
            onClick={onConfirm}
            disabled={!pickup || !destination}
          >
            Request a Ride <ArrowRight size={15} />
          </button>
        )}

      </div>
    </div>
  );
}
