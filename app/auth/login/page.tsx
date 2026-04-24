"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res  = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || "Login failed. Please try again."); return; }
      localStorage.setItem("accessToken",  data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      const role = data.user?.role;
      window.location.href = role === "admin" ? "/admin" : role === "driver" ? "/driver/dashboard" : "/home";
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page" style={{ background: "var(--bg-base)", fontFamily: "var(--font-ui)" }}>

      {/* ── Left panel — branding ── */}
      <div style={{ flex: 1, background: "var(--bg-surface)", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "48px", borderRight: "1px solid var(--border)" }} className="sp-auth-left">
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "0.875rem", color: "#000" }}>D</div>
          <span style={{ fontSize: "1.25rem", fontWeight: 900, color: "var(--text-base)", letterSpacing: "-0.02em" }}>Drive</span>
        </Link>

        {/* Hero text */}
        <div>
          <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 900, color: "var(--text-base)", lineHeight: 1.1, marginBottom: "16px" }}>
            Your city,<br />
            <span style={{ color: "var(--accent)" }}>your ride.</span>
          </h2>
          <p style={{ fontSize: "0.9375rem", color: "var(--text-muted)", lineHeight: 1.75, maxWidth: "340px" }}>
            Millions of rides completed. Verified drivers. Upfront pricing. Available in 120+ cities.
          </p>

          {/* Stats */}
          <div style={{ display: "flex", gap: "32px", marginTop: "40px" }}>
            {[["50M+", "Rides"], ["4.9★", "Rating"], ["120+", "Cities"]].map(([v, l]) => (
              <div key={l}>
                <p style={{ fontSize: "1.25rem", fontWeight: 900, color: "var(--text-base)", lineHeight: 1 }}>{v}</p>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px" }}>{l}</p>
              </div>
            ))}
          </div>
        </div>

        <p style={{ fontSize: "0.75rem", color: "var(--text-faint)" }}>© {new Date().getFullYear()} Drive Technologies Inc.</p>
      </div>

      {/* ── Right panel — form ── */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
        <div style={{ width: "100%", maxWidth: "400px" }}>

          {/* Header */}
          <div style={{ marginBottom: "40px" }}>
            <h1 style={{ fontSize: "1.375rem", fontWeight: 900, color: "var(--text-base)", marginBottom: "6px" }}>Welcome back</h1>
            <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>
              Log in to your Drive account
            </p>
          </div>

          {/* Error */}
          {error && (
            <div style={{ background: "rgba(243,114,127,0.12)", border: "1px solid rgba(243,114,127,0.3)", borderRadius: "var(--radius-card)", padding: "10px 14px", marginBottom: "16px", fontSize: "0.8125rem", color: "var(--text-negative)" }}>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Email */}
            <div>
              <label style={{ display: "block", fontSize: "0.6875rem", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "6px" }}>
                Email
              </label>
              <div style={{ position: "relative" }}>
                <Mail size={15} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }} />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  style={{ width: "100%", background: "var(--bg-elevated)", color: "var(--text-base)", fontSize: "0.8125rem", padding: "11px 12px 11px 38px", borderRadius: "var(--radius-card)", border: "none", outline: "none", boxShadow: "var(--shadow-inset)" }}
                  onFocus={(e) => (e.currentTarget.style.boxShadow = "rgb(18,18,18) 0px 1px 0px, rgb(255,255,255) 0px 0px 0px 1px inset")}
                  onBlur={(e)  => (e.currentTarget.style.boxShadow = "var(--shadow-inset)")}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <label style={{ fontSize: "0.6875rem", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Password
                </label>
                <Link href="/auth/forgot-password" style={{ fontSize: "0.6875rem", color: "var(--accent)", fontWeight: 600 }}>
                  Forgot password?
                </Link>
              </div>
              <div style={{ position: "relative" }}>
                <Lock size={15} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }} />
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  style={{ width: "100%", background: "var(--bg-elevated)", color: "var(--text-base)", fontSize: "0.8125rem", padding: "11px 38px 11px 38px", borderRadius: "var(--radius-card)", border: "none", outline: "none", boxShadow: "var(--shadow-inset)" }}
                  onFocus={(e) => (e.currentTarget.style.boxShadow = "rgb(18,18,18) 0px 1px 0px, rgb(255,255,255) 0px 0px 0px 1px inset")}
                  onBlur={(e)  => (e.currentTarget.style.boxShadow = "var(--shadow-inset)")}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: 0 }}
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", background: "var(--accent)", color: "#000", fontFamily: "var(--font-ui)", fontSize: "0.875rem", fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase", padding: "14px", borderRadius: "var(--radius-pill-lg)", border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "8px", transition: "all 150ms ease", boxShadow: "rgba(0,0,0,0.3) 0px 8px 8px" }}
              onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = "#f03d1a"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--accent)"; }}
            >
              {loading ? "Logging in…" : <><span>Log in</span><ArrowRight size={15} /></>}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "28px 0" }}>
            <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
            <span style={{ fontSize: "0.75rem", color: "var(--text-faint)" }}>or</span>
            <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
          </div>

          {/* Sign up link */}
          <p style={{ textAlign: "center", fontSize: "0.8125rem", color: "var(--text-muted)" }}>
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" style={{ color: "var(--accent)", fontWeight: 700 }}>
              Sign up free
            </Link>
          </p>

          {/* Driver link */}
          <p style={{ textAlign: "center", fontSize: "0.75rem", color: "var(--text-faint)", marginTop: "10px" }}>
            Want to drive?{" "}
            <Link href="/auth/register?role=driver" style={{ color: "var(--text-muted)", fontWeight: 600 }}>
              Apply as a driver
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
