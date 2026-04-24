"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

const mockTrips = [
  {
    id: "1",
    from: "Airport",
    to: "Downtown",
    date: "Today, 11:30 AM",
    earning: "+$16.20",
  },
  {
    id: "2",
    from: "City Mall",
    to: "Home",
    date: "Yesterday, 4:10 PM",
    earning: "+$8.50",
  },
  {
    id: "3",
    from: "Train Station",
    to: "Office",
    date: "Apr 15, 8:45 AM",
    earning: "+$11.00",
  },
];

const navItems = [
  {
    icon: "🏠",
    label: "Dashboard",
    href: "/driver/dashboard",
    active: true,
  },
  { icon: "📋", label: "My trips", href: "/driver/trips", active: false },
  {
    icon: "💰",
    label: "Earnings",
    href: "/driver/earnings",
    active: false,
  },
  {
    icon: "⚙️",
    label: "Settings",
    href: "/driver/settings",
    active: false,
  },
];

// Simulated incoming ride request
const incomingRequest = {
  pickup: "Central Park",
  destination: "JFK Airport",
  distance: "18.4 km",
  fare: "$22.00",
};

export default function DriverDashboard() {
  const [isOnline, setIsOnline] = useState(false);
  const [hasRequest, setHasRequest] = useState(false);
  const [timer, setTimer] = useState(30);

  function goOnline() {
    setIsOnline(true);
    // Simulate incoming request after 2s
    setTimeout(() => {
      setHasRequest(true);
      let t = 30;
      const interval = setInterval(() => {
        t -= 1;
        setTimer(t);
        if (t <= 0) {
          clearInterval(interval);
          setHasRequest(false);
          setTimer(30);
        }
      }, 1000);
    }, 2000);
  }

  function handleToggle() {
    if (!isOnline) {
      goOnline();
    } else {
      setIsOnline(false);
      setHasRequest(false);
      setTimer(30);
    }
  }

  function acceptRide() {
    setHasRequest(false);
    alert("Ride accepted! Navigate to pickup.");
  }

  function rejectRide() {
    setHasRequest(false);
    setTimer(30);
  }

  return (
    <div className={styles.layout}>
      {/* ─── Sidebar ─── */}
      <aside className={styles.sidebar}>
        <Link href="/" className={styles.sidebarLogo}>
          <span>Drive</span>
        </Link>

        <nav className={styles.navSection}>
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`${styles.navItem} ${item.active ? styles.active : ""}`}
            >
              <span className={styles.navIcon} aria-hidden="true">
                {item.icon}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarBottom}>
          <div className={styles.userInfo}>
            <div className={styles.avatar} aria-hidden="true">
              M
            </div>
            <div>
              <div className={styles.userName}>Mike Driver</div>
              <div className={styles.userRole}>Driver</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ─── Main ─── */}
      <main className={styles.main}>
        <div className={styles.topBar}>
          <div>
            <h1 className={styles.pageTitle}>Driver Dashboard</h1>
            <p className={styles.pageSubtitle}>
              {isOnline
                ? "You are online and accepting rides"
                : "Go online to start accepting rides"}
            </p>
          </div>

          {/* Online toggle */}
          <div className={styles.onlineToggle}>
            <span
              className={`${styles.onlineDot} ${isOnline ? styles.online : ""}`}
              aria-hidden="true"
            />
            <span className={styles.toggleLabel}>
              {isOnline ? "Online" : "Offline"}
            </span>
            <label className={styles.toggleSwitch}>
              <input
                type="checkbox"
                checked={isOnline}
                onChange={handleToggle}
                aria-label="Toggle online status"
              />
              <span className={styles.toggleSlider} />
            </label>
          </div>
        </div>

        {/* Incoming request */}
        {hasRequest && (
          <div className={styles.requestCard} role="alert">
            <div className={styles.requestHeader}>
              <h2 className={styles.requestTitle}>🔔 New ride request</h2>
              <span className={styles.requestTimer}>{timer}s</span>
            </div>
            <div className={styles.requestDetails}>
              <div className={styles.requestDetail}>
                <span className={styles.requestDetailLabel}>Pickup</span>
                <span className={styles.requestDetailValue}>
                  {incomingRequest.pickup}
                </span>
              </div>
              <div className={styles.requestDetail}>
                <span className={styles.requestDetailLabel}>Destination</span>
                <span className={styles.requestDetailValue}>
                  {incomingRequest.destination}
                </span>
              </div>
              <div className={styles.requestDetail}>
                <span className={styles.requestDetailLabel}>Distance</span>
                <span className={styles.requestDetailValue}>
                  {incomingRequest.distance}
                </span>
              </div>
            </div>
            <div className={styles.requestActions}>
              <button className={styles.acceptBtn} onClick={acceptRide}>
                Accept — {incomingRequest.fare}
              </button>
              <button className={styles.rejectBtn} onClick={rejectRide}>
                Decline
              </button>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Today&apos;s earnings</div>
            <div className={styles.statValue}>$84.50</div>
            <div className={styles.statSub}>6 trips completed</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>This week</div>
            <div className={styles.statValue}>$412</div>
            <div className={styles.statSub}>28 trips</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>All time</div>
            <div className={styles.statValue}>$6,240</div>
            <div className={styles.statSub}>480 trips</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Your rating</div>
            <div className={styles.statValue}>4.8★</div>
            <div className={styles.statSub}>Based on 480 trips</div>
          </div>
        </div>

        {/* Recent trips */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Recent trips</h2>
            <Link href="/driver/trips" className={styles.seeAll}>
              See all
            </Link>
          </div>
          <div className={styles.tripList}>
            {mockTrips.map((trip) => (
              <div key={trip.id} className={styles.tripItem}>
                <div className={styles.tripIcon} aria-hidden="true">
                  🚗
                </div>
                <div className={styles.tripInfo}>
                  <div className={styles.tripRoute}>
                    {trip.from} → {trip.to}
                  </div>
                  <div className={styles.tripMeta}>{trip.date}</div>
                </div>
                <div className={styles.tripEarning}>{trip.earning}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
