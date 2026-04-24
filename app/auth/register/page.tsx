"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, User, Phone, Car, ArrowRight, CheckCircle2 } from "lucide-react";

type Role = "rider" | "driver";

const inputStyle = {
  width: "100%",
  background: "var(--bg-elevated)",
  color: "var(--text-base)",
  fontSize: "0.8125rem",
  padding: "11px 12px 11px 38px",
  borderRadius: "var(--radius-card)",
  border: "none",
  outline: "none",
  boxShadow: "var(--shadow-inset)",
} as React.CSSProperties;

const labelStyle = {
  display: "block",
  fontSize: "0.6875rem",
  fontWeight: 700,
  color: "var(--text-muted)",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  marginBottom: "6px",
} as React.CSSProperties;

function Field({ label, icon: Icon, children }: { label: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <div style={{ position: "relative" }}>
        <Icon size={15} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }} />
        {children}
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const [role, setRole]       = useState<Role>("rider");
  const [showPw, setShowPw]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", password: "", confirmPassword: "",
    vehicleMake: "", vehicleModel: "", vehicleYear: "", vehicleColor: "", licensePlate: "",
  });

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  const focusStyle = (e: React.FocusEvent<HTMLInputElement>) =>
    (e.currentTarget.style.boxShadow = "rgb(18,18,18) 0px 1px 0px, rgb(255,255,255) 0px 0px 0px 1px inset");
  const blurStyle = (e: React.FocusEvent<HTMLInputElement>) =>
    (e.currentTarget.style.boxShadow = "var(--shadow-inset)");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setSuccess("");
    if (form.password !== form.confirmPassword) { setError("Passwords do not match."); return; }
    if (form.password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    try {
      const payload: Record<string, string> = { fullName: form.fullName, email: form.email, phone: form.phone, password: form.password, role };
      if (role === "driver") Object.assign(payload, { vehicleMake: form.vehicleMake, vehicleModel: form.vehicleModel, vehicleYear: form.vehicleYear, vehicleColor: form.vehicleColor, licensePlate: form.licensePlate });
      const res  = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) { setError(data.message || "Registration failed."); return; }
      if (role === "driver") {
        setSuccess("Application submitted! We'll review your details and email you within 24 hours.");
      } else {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        window.location.href = "/home";
      }
    } catch { setError("Network error. Please check your connection."); }
    finally { setLoading(false); }
  }

  return (
    <div className="auth-page" style={{ background: "var(--bg-base)", fontFamily: "var(--font-ui)" }}>

      {/* ── Left branding panel ── */}
      <div style={{ flex: 1, background: "var(--bg-surface)", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "48px", borderRight: "1px solid var(--border)" }} className="sp-auth-left">
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "0.875rem", color: "#000" }}>D</div>
          <span style={{ fontSize: "1.25rem", fontWeight: 900, color: "var(--text-base)", letterSpacing: "-0.02em" }}>Drive</span>
        </Link>

        <div>
          <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 900, color: "var(--text-base)", lineHeight: 1.1, marginBottom: "16px" }}>
            {role === "driver" ? <>Earn more,<br /><span style={{ color: "var(--accent)" }}>drive free.</span></> : <>Go anywhere,<br /><span style={{ color: "var(--accent)" }}>anytime.</span></>}
          </h2>
          <p style={{ fontSize: "0.9375rem", color: "var(--text-muted)", lineHeight: 1.75, maxWidth: "340px" }}>
            {role === "driver"
              ? "Set your own hours, earn competitive rates, and get paid weekly. Join 800K+ drivers on Drive."
              : "Book a ride in seconds. Verified drivers, upfront pricing, and live tracking — all in one app."}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "36px" }}>
            {(role === "driver"
              ? ["Set your own schedule", "Weekly direct payouts", "Dedicated driver support"]
              : ["Upfront pricing — no surprises", "Verified, background-checked drivers", "Live GPS tracking on every ride"]
            ).map((p) => (
              <div key={p} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.875rem", color: "var(--text-muted)" }}>
                <CheckCircle2 size={15} style={{ color: "var(--accent)", flexShrink: 0 }} />
                {p}
              </div>
            ))}
          </div>
        </div>

        <p style={{ fontSize: "0.75rem", color: "var(--text-faint)" }}>© {new Date().getFullYear()} Drive Technologies Inc.</p>
      </div>

      {/* ── Right form panel ── */}
      <div style={{ flex: 1, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "48px 24px", overflowY: "auto" }}>
        <div style={{ width: "100%", maxWidth: "440px" }}>

          {/* Header */}
          <div style={{ marginBottom: "32px" }}>
            <h1 style={{ fontSize: "1.375rem", fontWeight: 900, color: "var(--text-base)", marginBottom: "6px" }}>Create your account</h1>
            <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>Join Drive and start {role === "driver" ? "earning" : "riding"} today</p>
          </div>

          {/* Role toggle */}
          <div style={{ display: "flex", background: "var(--bg-elevated)", borderRadius: "var(--radius-pill)", padding: "4px", marginBottom: "28px", boxShadow: "var(--shadow-inset)" }}>
            {(["rider", "driver"] as Role[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                style={{ flex: 1, padding: "9px", borderRadius: "var(--radius-pill)", fontSize: "0.8125rem", fontWeight: 700, letterSpacing: "0.5px", textTransform: "capitalize", border: "none", cursor: "pointer", transition: "all 150ms ease", background: role === r ? "var(--accent)" : "transparent", color: role === r ? "#000" : "var(--text-muted)", boxShadow: role === r ? "rgba(0,0,0,0.3) 0px 4px 8px" : "none" }}
              >
                {r === "rider" ? "🚗 Rider" : "🚕 Driver"}
              </button>
            ))}
          </div>

          {/* Alerts */}
          {error && (
            <div style={{ background: "rgba(243,114,127,0.12)", border: "1px solid rgba(243,114,127,0.3)", borderRadius: "var(--radius-card)", padding: "10px 14px", marginBottom: "16px", fontSize: "0.8125rem", color: "var(--text-negative)" }}>
              {error}
            </div>
          )}
          {success && (
            <div style={{ background: "var(--accent-dim)", border: "1px solid rgba(30,215,96,0.3)", borderRadius: "var(--radius-card)", padding: "12px 14px", marginBottom: "16px", fontSize: "0.8125rem", color: "var(--accent)", display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <CheckCircle2 size={16} style={{ flexShrink: 0, marginTop: "1px" }} />
              {success}
            </div>
          )}

          {!success && (
            <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

              {/* Full name */}
              <Field label="Full name" icon={User}>
                <input type="text" placeholder="John Doe" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} required autoComplete="name" style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
              </Field>

              {/* Email + Phone row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <Field label="Email" icon={Mail}>
                  <input type="email" placeholder="you@example.com" value={form.email} onChange={(e) => update("email", e.target.value)} required autoComplete="email" style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                </Field>
                <Field label="Phone" icon={Phone}>
                  <input type="tel" placeholder="+1 555 000 0000" value={form.phone} onChange={(e) => update("phone", e.target.value)} required autoComplete="tel" style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                </Field>
              </div>

              {/* Password row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={labelStyle}>Password</label>
                  <div style={{ position: "relative" }}>
                    <Lock size={15} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }} />
                    <input type={showPw ? "text" : "password"} placeholder="Min. 8 chars" value={form.password} onChange={(e) => update("password", e.target.value)} required autoComplete="new-password" style={{ ...inputStyle, paddingRight: "40px" }} onFocus={focusStyle} onBlur={blurStyle} />
                    <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: 0 }}>
                      {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>
                <Field label="Confirm" icon={Lock}>
                  <input type="password" placeholder="Repeat password" value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} required autoComplete="new-password" style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                </Field>
              </div>

              {/* Driver-only vehicle fields */}
              {role === "driver" && (
                <>
                  <div style={{ height: "1px", background: "var(--border)", margin: "4px 0" }} />
                  <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Vehicle details</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <Field label="Make" icon={Car}>
                      <input type="text" placeholder="Toyota" value={form.vehicleMake} onChange={(e) => update("vehicleMake", e.target.value)} required style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                    </Field>
                    <Field label="Model" icon={Car}>
                      <input type="text" placeholder="Camry" value={form.vehicleModel} onChange={(e) => update("vehicleModel", e.target.value)} required style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                    </Field>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <Field label="Year" icon={Car}>
                      <input type="number" placeholder="2022" value={form.vehicleYear} onChange={(e) => update("vehicleYear", e.target.value)} required min="2000" max="2030" style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                    </Field>
                    <Field label="Color" icon={Car}>
                      <input type="text" placeholder="Silver" value={form.vehicleColor} onChange={(e) => update("vehicleColor", e.target.value)} required style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                    </Field>
                  </div>

                  <Field label="Licence plate" icon={Car}>
                    <input type="text" placeholder="ABC-1234" value={form.licensePlate} onChange={(e) => update("licensePlate", e.target.value)} required style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                  </Field>
                </>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                style={{ width: "100%", background: "var(--accent)", color: "#000", fontFamily: "var(--font-ui)", fontSize: "0.875rem", fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase", padding: "14px", borderRadius: "var(--radius-pill-lg)", border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "8px", transition: "all 150ms ease", boxShadow: "rgba(0,0,0,0.3) 0px 8px 8px" }}
                onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = "#f03d1a"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--accent)"; }}
              >
                {loading ? "Creating account…" : <><span>{role === "driver" ? "Apply as driver" : "Create account"}</span><ArrowRight size={15} /></>}
              </button>

              <p style={{ fontSize: "0.6875rem", color: "var(--text-faint)", textAlign: "center", lineHeight: 1.6 }}>
                By creating an account you agree to our{" "}
                <Link href="/terms" style={{ color: "var(--text-muted)" }}>Terms of Service</Link>
                {" "}and{" "}
                <Link href="/privacy" style={{ color: "var(--text-muted)" }}>Privacy Policy</Link>.
              </p>
            </form>
          )}

          <p style={{ textAlign: "center", fontSize: "0.8125rem", color: "var(--text-muted)", marginTop: "20px" }}>
            Already have an account?{" "}
            <Link href="/auth/login" style={{ color: "var(--accent)", fontWeight: 700 }}>Log in</Link>
          </p>

        </div>
      </div>
    </div>
  );
}
