"use client";

import { ArrowRight, RotateCcw } from "lucide-react";
import Link from "next/link";

interface Trip {
  id: string;
  from: string;
  to: string;
  date: string;
  fare: string;
  status: "completed" | "cancelled";
}

interface RecentTripsProps {
  trips: Trip[];
  onRebook?: (trip: Trip) => void;
}

export default function RecentTrips({ trips, onRebook }: RecentTripsProps) {
  return (
    <div style={{ padding: "24px 20px 0", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", margin: 0 }}>Recent trips</h2>
        <Link href="/rider/trips" style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.75rem", fontWeight: 600, color: "#FF6B00", textDecoration: "none" }}>
          See all <ArrowRight size={12} />
        </Link>
      </div>

      {trips.length === 0 ? (
        <div style={{ background: "#222", borderRadius: "12px", padding: "32px 20px", textAlign: "center", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: "2rem", marginBottom: "12px" }}>🚗</div>
          <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#fff", marginBottom: "6px" }}>No trips yet</p>
          <p style={{ fontSize: "0.75rem", color: "#b3b3b3" }}>Book your first ride!</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {trips.map((trip) => (
            <div
              key={trip.id}
              style={{
                background: "#222",
                borderRadius: "12px",
                padding: "14px 16px",
                border: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#2a2a2a")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#222")}
            >
              {/* Icon */}
              <div style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: trip.status === "completed" ? "rgba(255,107,0,0.12)" : "rgba(243,114,127,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                flexShrink: 0,
              }}>
                {trip.status === "completed" ? "🚗" : "✕"}
              </div>

              {/* Route info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  color: "#fff",
                  lineHeight: 1.2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}>
                  {trip.from} → {trip.to}
                </p>
                <p style={{ fontSize: "0.6875rem", color: "#b3b3b3", marginTop: "3px" }}>{trip.date}</p>
              </div>

              {/* Fare + status */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px", flexShrink: 0 }}>
                <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#fff" }}>{trip.fare}</span>
                <span style={{
                  fontSize: "0.5625rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: trip.status === "completed" ? "#FF6B00" : "#f3727f",
                  background: trip.status === "completed" ? "rgba(255,107,0,0.1)" : "rgba(243,114,127,0.1)",
                  padding: "2px 7px",
                  borderRadius: "9999px",
                }}>
                  {trip.status}
                </span>
              </div>

              {/* Rebook */}
              {trip.status === "completed" && onRebook && (
                <button
                  onClick={() => onRebook(trip)}
                  style={{
                    background: "none",
                    border: "1px solid rgba(255,107,0,0.3)",
                    borderRadius: "9999px",
                    padding: "5px 10px",
                    fontSize: "0.625rem",
                    fontWeight: 700,
                    color: "#FF6B00",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    flexShrink: 0,
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,107,0,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "none";
                  }}
                >
                  <RotateCcw size={10} /> Rebook
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
