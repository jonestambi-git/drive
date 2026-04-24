"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Car, Home, CreditCard, Settings, LogOut,
  Plus, Trash2, CheckCircle2, Clock, TrendingUp,
  ArrowUpRight, ArrowDownLeft, Shield, Smartphone,
} from "lucide-react";

const NAV = [
  { icon: Home,       label: "Dashboard",  href: "/rider/dashboard", active: false },
  { icon: Car,        label: "My trips",   href: "/rider/trips",     active: false },
  { icon: CreditCard, label: "Payments",   href: "/rider/payments",  active: true  },
  { icon: Settings,   label: "Settings",   href: "/rider/settings",  active: false },
];

const CARDS = [
  { id: "1", type: "Visa",       last4: "4242", expiry: "08/27", color: "#1a56db", default: true  },
  { id: "2", type: "Mastercard", last4: "8888", expiry: "03/26", color: "#E03110", default: false },
];

const TRANSACTIONS = [
  { id: "1",  desc: "Victoria Island → Airport",  date: "Today, 9:14 AM",      amount: "−₦4,200", type: "debit",  status: "completed" },
  { id: "2",  desc: "Wallet top-up",              date: "Yesterday, 2:00 PM",  amount: "+₦10,000", type: "credit", status: "completed" },
  { id: "3",  desc: "Home → City Mall",           date: "Apr 14, 3:40 PM",     amount: "−₦1,850", type: "debit",  status: "completed" },
  { id: "4",  desc: "Promo credit — DRIVE20",     date: "Apr 13, 10:00 AM",    amount: "+₦500",    type: "credit", status: "completed" },
  { id: "5",  desc: "Ikeja → Victoria Island",    date: "Apr 12, 6:30 PM",     amount: "−₦3,100", type: "debit",  status: "completed" },
  { id: "6",  desc: "Wallet top-up",              date: "Apr 10, 9:00 AM",     amount: "+₦5,000",  type: "credit", status: "completed" },
  { id: "7",  desc: "Lekki → Airport",            date: "Apr 10, 5:00 AM",     amount: "−₦5,800", type: "debit",  status: "completed" },
  { id: "8",  desc: "Refund — cancelled trip",    date: "Apr 8, 8:30 PM",      amount: "+₦2,600",  type: "credit", status: "completed" },
];

function Sidebar() {
  return (
    <aside style={{ width: "220px", flexShrink: 0, background: "var(--bg-surface)", borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column", padding: "20px 12px", zIndex: 20 }}>
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
  );
}

export default function PaymentsPage() {
  const [cards, setCards]       = useState(CARDS);
  const [topUpAmt, setTopUpAmt] = useState("");
  const [topUpDone, setTopUpDone] = useState(false);

  const walletBalance = 6450;

  const handleTopUp = () => {
    if (!topUpAmt || isNaN(Number(topUpAmt))) return;
    setTopUpDone(true);
    setTimeout(() => { setTopUpDone(false); setTopUpAmt(""); }, 3000);
  };

  return (
    <div className="rider-layout" style={{ background: "var(--bg-base)", fontFamily: "var(--font-ui)", color: "var(--text-base)" }}>
      <Sidebar />

      <main style={{ flex: 1, overflowY: "auto", padding: "32px 40px" }}>

        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <p style={{ fontSize: "0.5625rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "4px" }}>Finance</p>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-base)", margin: 0 }}>Wallet & Payments</h1>
          <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginTop: "4px" }}>Manage your balance, cards, and transaction history</p>
        </div>

        <div className="sp-grid-2" style={{ marginBottom: "28px" }}>

          {/* Wallet card */}
          <div style={{ background: "linear-gradient(135deg, var(--accent) 0%, #b82a0d 100%)", borderRadius: "16px", padding: "28px", boxShadow: "var(--shadow-heavy)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "120px", height: "120px", borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
            <div style={{ position: "absolute", bottom: "-30px", right: "40px", width: "80px", height: "80px", borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
            <p style={{ fontSize: "0.6875rem", fontWeight: 600, color: "rgba(255,255,255,0.7)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>Drive Wallet</p>
            <p style={{ fontSize: "2.25rem", fontWeight: 900, color: "#fff", lineHeight: 1, marginBottom: "4px" }}>₦{walletBalance.toLocaleString()}</p>
            <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.65)" }}>Available balance</p>
            <div style={{ display: "flex", gap: "8px", marginTop: "20px" }}>
              <button style={{ flex: 1, background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", borderRadius: "9999px", padding: "9px", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-ui)", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                <Plus size={13} /> Top up
              </button>
              <button style={{ flex: 1, background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", borderRadius: "9999px", padding: "9px", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-ui)", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                <ArrowUpRight size={13} /> Send
              </button>
            </div>
          </div>

          {/* Top-up form */}
          <div style={{ background: "var(--bg-surface)", borderRadius: "16px", padding: "28px", border: "1px solid var(--border)" }}>
            <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--text-base)", marginBottom: "16px" }}>Quick top-up</p>
            <div style={{ display: "flex", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
              {["1,000", "2,500", "5,000", "10,000"].map((amt) => (
                <button key={amt} onClick={() => setTopUpAmt(amt.replace(",", ""))} style={{ padding: "7px 14px", borderRadius: "9999px", border: "1px solid", borderColor: topUpAmt === amt.replace(",", "") ? "var(--accent)" : "var(--border)", background: topUpAmt === amt.replace(",", "") ? "var(--accent-dim)" : "transparent", color: topUpAmt === amt.replace(",", "") ? "var(--accent)" : "var(--text-muted)", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-ui)", transition: "all 0.15s" }}>
                  ₦{amt}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <input type="number" placeholder="Custom amount" value={topUpAmt} onChange={(e) => setTopUpAmt(e.target.value)} style={{ flex: 1, background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "8px", padding: "10px 14px", fontSize: "0.875rem", color: "var(--text-base)", outline: "none", fontFamily: "var(--font-ui)" }} />
              <button onClick={handleTopUp} style={{ background: topUpDone ? "var(--bg-elevated)" : "var(--accent)", color: topUpDone ? "var(--accent)" : "#fff", border: "none", borderRadius: "8px", padding: "10px 18px", fontSize: "0.8125rem", fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-ui)", display: "flex", alignItems: "center", gap: "6px", transition: "all 0.15s", whiteSpace: "nowrap" }}>
                {topUpDone ? <><CheckCircle2 size={14} /> Done!</> : "Add funds"}
              </button>
            </div>
          </div>
        </div>

        {/* Payment methods */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-base)", margin: 0 }}>Payment methods</h2>
            <button style={{ display: "flex", alignItems: "center", gap: "6px", background: "var(--accent-dim)", border: "1px solid rgba(224,49,16,0.2)", color: "var(--accent)", borderRadius: "9999px", padding: "7px 14px", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-ui)" }}>
              <Plus size={13} /> Add card
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {cards.map((card) => (
              <div key={card.id} style={{ display: "flex", alignItems: "center", gap: "16px", background: "var(--bg-surface)", borderRadius: "12px", padding: "16px 20px", border: `1px solid ${card.default ? "var(--accent)" : "var(--border)"}` }}>
                <div style={{ width: "44px", height: "30px", borderRadius: "6px", background: card.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <CreditCard size={16} style={{ color: "#fff" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-base)", lineHeight: 1 }}>{card.type} •••• {card.last4}</p>
                  <p style={{ fontSize: "0.6875rem", color: "var(--text-muted)", marginTop: "3px" }}>Expires {card.expiry}</p>
                </div>
                {card.default && (
                  <span style={{ fontSize: "0.5625rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", background: "var(--accent-dim)", padding: "3px 8px", borderRadius: "9999px" }}>Default</span>
                )}
                {!card.default && (
                  <button onClick={() => setCards(cards.map(c => ({ ...c, default: c.id === card.id })))} style={{ fontSize: "0.6875rem", fontWeight: 600, color: "var(--text-muted)", background: "none", border: "1px solid var(--border)", borderRadius: "9999px", padding: "4px 10px", cursor: "pointer", fontFamily: "var(--font-ui)", transition: "all 0.15s" }}>
                    Set default
                  </button>
                )}
                <button onClick={() => setCards(cards.filter(c => c.id !== card.id))} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-faint)", padding: "4px", transition: "color 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-negative)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-faint)")}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
            {/* Mobile money */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", background: "var(--bg-surface)", borderRadius: "12px", padding: "16px 20px", border: "1px solid var(--border)" }}>
              <div style={{ width: "44px", height: "30px", borderRadius: "6px", background: "#1a7a3c", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Smartphone size={16} style={{ color: "#fff" }} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-base)", lineHeight: 1 }}>Mobile Money</p>
                <p style={{ fontSize: "0.6875rem", color: "var(--text-muted)", marginTop: "3px" }}>+234 •••• 7890</p>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction history */}
        <div>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-base)", marginBottom: "16px" }}>Transaction history</h2>
          <div style={{ background: "var(--bg-surface)", borderRadius: "12px", border: "1px solid var(--border)", overflow: "hidden" }}>
            {TRANSACTIONS.map((tx, i) => (
              <div key={tx.id} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "14px 20px", borderBottom: i < TRANSACTIONS.length - 1 ? "1px solid var(--border-faint)" : "none", transition: "background 0.1s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-elevated)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: tx.type === "credit" ? "rgba(30,215,96,0.1)" : "var(--accent-dim)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {tx.type === "credit"
                    ? <ArrowDownLeft size={15} style={{ color: "#1ed760" }} />
                    : <ArrowUpRight size={15} style={{ color: "var(--accent)" }} />
                  }
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-base)", lineHeight: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tx.desc}</p>
                  <p style={{ fontSize: "0.6875rem", color: "var(--text-muted)", marginTop: "3px", display: "flex", alignItems: "center", gap: "4px" }}><Clock size={10} />{tx.date}</p>
                </div>
                <span style={{ fontSize: "0.9375rem", fontWeight: 700, color: tx.type === "credit" ? "#1ed760" : "var(--text-base)", flexShrink: 0 }}>{tx.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Security note */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "20px", padding: "14px 16px", background: "var(--bg-surface)", borderRadius: "8px", border: "1px solid var(--border-faint)" }}>
          <Shield size={15} style={{ color: "var(--accent)", flexShrink: 0 }} />
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", lineHeight: 1.5 }}>Your payment information is encrypted and secured with 256-bit SSL. Drive never stores your full card number.</p>
        </div>

      </main>
    </div>
  );
}
