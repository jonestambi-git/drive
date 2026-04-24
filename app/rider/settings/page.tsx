"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Car, Home, CreditCard, Settings, LogOut,
  User, Bell, Shield, Smartphone, Globe,
  Moon, ChevronRight, CheckCircle2, Eye, EyeOff,
  Camera,
} from "lucide-react";

const NAV = [
  { icon: Home,       label: "Dashboard",  href: "/rider/dashboard", active: false },
  { icon: Car,        label: "My trips",   href: "/rider/trips",     active: false },
  { icon: CreditCard, label: "Payments",   href: "/rider/payments",  active: false },
  { icon: Settings,   label: "Settings",   href: "/rider/settings",  active: true  },
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

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!on)} style={{ width: "44px", height: "24px", borderRadius: "9999px", background: on ? "var(--accent)" : "var(--bg-elevated)", border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
      <span style={{ position: "absolute", top: "3px", left: on ? "23px" : "3px", width: "18px", height: "18px", borderRadius: "50%", background: "#fff", transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }} />
    </button>
  );
}

function SettingRow({ icon: Icon, label, desc, children }: { icon: React.ElementType; label: string; desc?: string; children?: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 20px", borderBottom: "1px solid var(--border-faint)" }}>
      <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "var(--accent-dim)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={16} style={{ color: "var(--accent)" }} />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-base)", lineHeight: 1 }}>{label}</p>
        {desc && <p style={{ fontSize: "0.6875rem", color: "var(--text-muted)", marginTop: "3px" }}>{desc}</p>}
      </div>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const [form, setForm] = useState({ fullName: "John Doe", email: "john@example.com", phone: "+234 801 234 5678" });
  const [showPw, setShowPw]   = useState(false);
  const [saved,  setSaved]    = useState(false);
  const [notifs, setNotifs]   = useState({ rides: true, promos: true, updates: false, sms: true });
  const [privacy, setPrivacy] = useState({ shareLocation: true, analytics: false, marketing: false });
  const [lang, setLang]       = useState("English");
  const [activeTab, setActiveTab] = useState("profile");

  const TABS = [
    { id: "profile",       label: "Profile",       icon: User    },
    { id: "notifications", label: "Notifications", icon: Bell    },
    { id: "privacy",       label: "Privacy",       icon: Shield  },
    { id: "app",           label: "App",           icon: Smartphone },
  ];

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <div className="rider-layout" style={{ background: "var(--bg-base)", fontFamily: "var(--font-ui)", color: "var(--text-base)" }}>
      <Sidebar />

      <main style={{ flex: 1, overflowY: "auto", padding: "32px 40px" }}>

        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <p style={{ fontSize: "0.5625rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "4px" }}>Account</p>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-base)", margin: 0 }}>Settings</h1>
          <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginTop: "4px" }}>Manage your account preferences</p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "4px", background: "var(--bg-elevated)", borderRadius: "10px", padding: "4px", marginBottom: "24px", width: "fit-content" }}>
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "0.8125rem", fontWeight: 600, fontFamily: "var(--font-ui)", background: activeTab === tab.id ? "var(--bg-surface)" : "transparent", color: activeTab === tab.id ? "var(--text-base)" : "var(--text-muted)", transition: "all 0.15s", boxShadow: activeTab === tab.id ? "var(--shadow-light)" : "none" }}>
                <Icon size={14} /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Profile tab */}
        {activeTab === "profile" && (
          <div style={{ maxWidth: "560px" }}>
            {/* Avatar */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "28px" }}>
              <div style={{ position: "relative" }}>
                <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", fontWeight: 900, color: "#fff" }}>J</div>
                <button style={{ position: "absolute", bottom: 0, right: 0, width: "24px", height: "24px", borderRadius: "50%", background: "var(--bg-elevated)", border: "2px solid var(--bg-base)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <Camera size={11} style={{ color: "var(--text-muted)" }} />
                </button>
              </div>
              <div>
                <p style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-base)" }}>John Doe</p>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Rider since 2024 · 4.9★</p>
              </div>
            </div>

            {/* Form */}
            <div style={{ background: "var(--bg-surface)", borderRadius: "12px", border: "1px solid var(--border)", overflow: "hidden", marginBottom: "16px" }}>
              {[
                { label: "Full name",  key: "fullName", type: "text",     placeholder: "John Doe"           },
                { label: "Email",      key: "email",    type: "email",    placeholder: "john@example.com"   },
                { label: "Phone",      key: "phone",    type: "tel",      placeholder: "+234 801 234 5678"  },
              ].map(({ label, key, type, placeholder }, i, arr) => (
                <div key={key} style={{ padding: "16px 20px", borderBottom: i < arr.length - 1 ? "1px solid var(--border-faint)" : "none" }}>
                  <label style={{ display: "block", fontSize: "0.6875rem", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "6px" }}>{label}</label>
                  <input type={type} value={form[key as keyof typeof form]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder} style={{ width: "100%", background: "transparent", border: "none", outline: "none", fontSize: "0.9375rem", color: "var(--text-base)", fontFamily: "var(--font-ui)" }} />
                </div>
              ))}
              {/* Password */}
              <div style={{ padding: "16px 20px" }}>
                <label style={{ display: "block", fontSize: "0.6875rem", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "6px" }}>New password</label>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <input type={showPw ? "text" : "password"} placeholder="Leave blank to keep current" style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: "0.9375rem", color: "var(--text-base)", fontFamily: "var(--font-ui)" }} />
                  <button onClick={() => setShowPw(!showPw)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 0 }}>
                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
            </div>

            <button onClick={handleSave} style={{ display: "flex", alignItems: "center", gap: "8px", background: saved ? "var(--bg-elevated)" : "var(--accent)", color: saved ? "var(--accent)" : "#fff", border: "none", borderRadius: "9999px", padding: "12px 28px", fontSize: "0.875rem", fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-ui)", transition: "all 0.2s" }}>
              {saved ? <><CheckCircle2 size={15} /> Saved!</> : "Save changes"}
            </button>
          </div>
        )}

        {/* Notifications tab */}
        {activeTab === "notifications" && (
          <div style={{ maxWidth: "560px" }}>
            <div style={{ background: "var(--bg-surface)", borderRadius: "12px", border: "1px solid var(--border)", overflow: "hidden" }}>
              <SettingRow icon={Car}  label="Ride updates"    desc="Driver arrival, trip start, and completion alerts">
                <Toggle on={notifs.rides}   onChange={(v) => setNotifs({ ...notifs, rides: v })} />
              </SettingRow>
              <SettingRow icon={Bell} label="Promotions"      desc="Discount codes, offers, and seasonal deals">
                <Toggle on={notifs.promos}  onChange={(v) => setNotifs({ ...notifs, promos: v })} />
              </SettingRow>
              <SettingRow icon={Globe} label="App updates"    desc="New features and important announcements">
                <Toggle on={notifs.updates} onChange={(v) => setNotifs({ ...notifs, updates: v })} />
              </SettingRow>
              <SettingRow icon={Smartphone} label="SMS alerts" desc="Receive key notifications via text message">
                <Toggle on={notifs.sms}     onChange={(v) => setNotifs({ ...notifs, sms: v })} />
              </SettingRow>
            </div>
          </div>
        )}

        {/* Privacy tab */}
        {activeTab === "privacy" && (
          <div style={{ maxWidth: "560px" }}>
            <div style={{ background: "var(--bg-surface)", borderRadius: "12px", border: "1px solid var(--border)", overflow: "hidden", marginBottom: "16px" }}>
              <SettingRow icon={Shield} label="Share live location" desc="Allow Drive to access your GPS during trips">
                <Toggle on={privacy.shareLocation} onChange={(v) => setPrivacy({ ...privacy, shareLocation: v })} />
              </SettingRow>
              <SettingRow icon={Globe} label="Usage analytics" desc="Help improve Drive by sharing anonymous usage data">
                <Toggle on={privacy.analytics} onChange={(v) => setPrivacy({ ...privacy, analytics: v })} />
              </SettingRow>
              <SettingRow icon={Bell} label="Marketing emails" desc="Receive personalised offers based on your trips">
                <Toggle on={privacy.marketing} onChange={(v) => setPrivacy({ ...privacy, marketing: v })} />
              </SettingRow>
            </div>
            <div style={{ background: "var(--bg-surface)", borderRadius: "12px", border: "1px solid var(--border)", overflow: "hidden" }}>
              {[
                { label: "Download my data",    desc: "Get a copy of all your Drive data" },
                { label: "Delete my account",   desc: "Permanently remove your account and data", danger: true },
              ].map(({ label, desc, danger }) => (
                <button key={label} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", background: "none", border: "none", borderBottom: "1px solid var(--border-faint)", cursor: "pointer", fontFamily: "var(--font-ui)", transition: "background 0.1s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-elevated)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                >
                  <div style={{ textAlign: "left" }}>
                    <p style={{ fontSize: "0.875rem", fontWeight: 600, color: danger ? "var(--text-negative)" : "var(--text-base)" }}>{label}</p>
                    <p style={{ fontSize: "0.6875rem", color: "var(--text-muted)", marginTop: "2px" }}>{desc}</p>
                  </div>
                  <ChevronRight size={15} style={{ color: "var(--text-faint)" }} />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* App tab */}
        {activeTab === "app" && (
          <div style={{ maxWidth: "560px" }}>
            <div style={{ background: "var(--bg-surface)", borderRadius: "12px", border: "1px solid var(--border)", overflow: "hidden", marginBottom: "16px" }}>
              <SettingRow icon={Moon} label="Dark mode" desc="Currently active — matches your system theme">
                <Toggle on={true} onChange={() => {}} />
              </SettingRow>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 20px", borderBottom: "1px solid var(--border-faint)" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "var(--accent-dim)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Globe size={16} style={{ color: "var(--accent)" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-base)", lineHeight: 1 }}>Language</p>
                  <p style={{ fontSize: "0.6875rem", color: "var(--text-muted)", marginTop: "3px" }}>App display language</p>
                </div>
                <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "6px", padding: "6px 10px", fontSize: "0.8125rem", color: "var(--text-base)", fontFamily: "var(--font-ui)", outline: "none", cursor: "pointer" }}>
                  {["English", "French", "Arabic", "Swahili", "Yoruba", "Igbo", "Hausa"].map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>
            <div style={{ background: "var(--bg-surface)", borderRadius: "12px", border: "1px solid var(--border)", padding: "16px 20px" }}>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "4px" }}>App version</p>
              <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-base)" }}>Drive v2.4.1</p>
              <p style={{ fontSize: "0.6875rem", color: "var(--text-faint)", marginTop: "2px" }}>You are on the latest version</p>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
