"use client";

import { useEffect, useState } from "react";
import { MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import "../../styles/ride-request.css";

interface RideRequest {
  riderName: string;
  riderInitials: string;
  riderRating: number;
  pickup: string;
  destination: string;
  distance: string;
  earnings: string;
  eta: string;
}

interface Props {
  request: RideRequest;
  onAccept: () => void;
  onDecline: () => void;
}

const COUNTDOWN = 15;

export default function RideRequestPopup({ request, onAccept, onDecline }: Props) {
  const [seconds, setSeconds]   = useState(COUNTDOWN);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    if (accepted) return;
    if (seconds <= 0) { onDecline(); return; }
    const id = setTimeout(() => setSeconds(s => s - 1), 1000);
    return () => clearTimeout(id);
  }, [seconds, accepted, onDecline]);

  const handleAccept = () => {
    setAccepted(true);
    setTimeout(onAccept, 2000);
  };

  const pct = (seconds / COUNTDOWN) * 100;

  return (
    <div className="rr-backdrop">
      <div className="rr-sheet">
        <div className="rr-handle" />

        {accepted ? (
          <div className="rr-accepted">
            <div className="rr-accepted__icon">✅</div>
            <p className="rr-accepted__title">Ride accepted!</p>
            <p className="rr-accepted__sub">Head to the pickup point. The rider has been notified.</p>
          </div>
        ) : (
          <div className="rr-inner">
            {/* Header */}
            <div className="rr-header">
              <span className="rr-header__label">New ride request</span>
              <span className="rr-header__timer">Accepting in {seconds}s</span>
            </div>

            {/* Progress bar */}
            <div className="rr-progress">
              <div className="rr-progress__fill" style={{ width: `${pct}%` }} />
            </div>

            {/* Rider info */}
            <div className="rr-rider">
              <div className="rr-rider__avatar">{request.riderInitials}</div>
              <div>
                <p className="rr-rider__name">{request.riderName}</p>
                <p className="rr-rider__rating">⭐ {request.riderRating} · Verified rider</p>
              </div>
            </div>

            {/* Route */}
            <div className="rr-route">
              <div className="rr-route__row">
                <span className="rr-route__dot rr-route__dot--pickup" />
                <span className="rr-route__addr">{request.pickup}</span>
              </div>
              <div className="rr-route__row">
                <span className="rr-route__dot rr-route__dot--dest" />
                <span className="rr-route__addr">{request.destination}</span>
              </div>
            </div>

            {/* Meta */}
            <div className="rr-meta">
              <div className="rr-meta__item">
                <p className="rr-meta__value">{request.distance}</p>
                <p className="rr-meta__label">Distance</p>
              </div>
              <div className="rr-meta__item">
                <p className="rr-meta__value">{request.earnings}</p>
                <p className="rr-meta__label">Earnings</p>
              </div>
              <div className="rr-meta__item">
                <p className="rr-meta__value">{request.eta}</p>
                <p className="rr-meta__label">Your ETA</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="rr-buttons">
              <button className="rr-btn-decline" onClick={onDecline}>Decline</button>
              <button className="rr-btn-accept" onClick={handleAccept}>
                Accept Ride <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
