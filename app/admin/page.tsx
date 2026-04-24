import Link from "next/link";
import styles from "./page.module.css";

const navItems = [
  { icon: "📊", label: "Overview", href: "/admin", active: true },
  { icon: "👥", label: "Users", href: "/admin/users", active: false },
  { icon: "🚗", label: "Drivers", href: "/admin/drivers", active: false },
  { icon: "📋", label: "Trips", href: "/admin/trips", active: false },
  { icon: "💳", label: "Payments", href: "/admin/payments", active: false },
  { icon: "⚠️", label: "Disputes", href: "/admin/disputes", active: false },
  { icon: "⚙️", label: "Settings", href: "/admin/settings", active: false },
];

const recentUsers = [
  { name: "Alice Johnson", email: "alice@example.com", status: "active", joined: "Apr 17" },
  { name: "Bob Smith", email: "bob@example.com", status: "active", joined: "Apr 16" },
  { name: "Carol White", email: "carol@example.com", status: "suspended", joined: "Apr 15" },
];

const pendingDrivers = [
  { name: "David Lee", vehicle: "Toyota Camry 2022", plate: "ABC-1234", applied: "Apr 17" },
  { name: "Emma Brown", vehicle: "Honda Civic 2021", plate: "XYZ-5678", applied: "Apr 16" },
];

const recentTrips = [
  { id: "T-001", rider: "Alice J.", driver: "David L.", status: "completed", fare: "$18.50", date: "Apr 17" },
  { id: "T-002", rider: "Bob S.", driver: "Emma B.", status: "completed", fare: "$9.20", date: "Apr 16" },
  { id: "T-003", rider: "Carol W.", driver: "David L.", status: "cancelled", fare: "$0.00", date: "Apr 15" },
];

const openDisputes = [
  { id: "D-001", trip: "T-001", submitter: "Alice J.", reason: "Overcharged", date: "Apr 17" },
];

export default function AdminDashboard() {
  return (
    <div className={styles.layout}>
      {/* ─── Sidebar ─── */}
      <aside className={styles.sidebar}>
        <Link href="/" className={styles.sidebarLogo}>
          <span>Drive</span>
        </Link>
        <span className={styles.adminBadge}>Admin Panel</span>

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
          <div className={styles.adminInfo}>
            <div className={styles.avatar} aria-hidden="true">A</div>
            <div>
              <div className={styles.adminName}>Admin User</div>
              <div className={styles.adminRole}>Super Admin</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ─── Main ─── */}
      <main className={styles.main}>
        <div className={styles.topBar}>
          <div>
            <h1 className={styles.pageTitle}>Platform Overview</h1>
            <p className={styles.pageSubtitle}>Friday, April 17, 2026</p>
          </div>
        </div>

        {/* Stats */}
        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Total revenue</div>
            <div className={`${styles.statValue} ${styles.statAccent}`}>$48,320</div>
            <div className={styles.statSub}>+12% this month</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Total trips</div>
            <div className={styles.statValue}>3,840</div>
            <div className={styles.statSub}>+8% this month</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Active riders</div>
            <div className={styles.statValue}>1,240</div>
            <div className={styles.statSub}>50 new today</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Active drivers</div>
            <div className={styles.statValue}>320</div>
            <div className={styles.statSub}>12 pending approval</div>
          </div>
        </div>

        {/* Two-column grid */}
        <div className={styles.grid}>
          {/* Pending driver approvals */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Pending driver approvals</h2>
              <Link href="/admin/drivers" className={styles.seeAll}>See all</Link>
            </div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Vehicle</th>
                  <th>Applied</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingDrivers.map((d) => (
                  <tr key={d.name}>
                    <td>{d.name}</td>
                    <td>{d.vehicle}</td>
                    <td>{d.applied}</td>
                    <td>
                      <button className={styles.actionBtn}>Review</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Open disputes */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Open disputes</h2>
              <Link href="/admin/disputes" className={styles.seeAll}>See all</Link>
            </div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Submitter</th>
                  <th>Reason</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {openDisputes.map((d) => (
                  <tr key={d.id}>
                    <td>{d.id}</td>
                    <td>{d.submitter}</td>
                    <td>{d.reason}</td>
                    <td>
                      <button className={styles.actionBtn}>Resolve</button>
                    </td>
                  </tr>
                ))}
                {openDisputes.length === 0 && (
                  <tr>
                    <td colSpan={4} style={{ color: "var(--text-muted)", textAlign: "center" }}>
                      No open disputes
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent trips */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Recent trips</h2>
            <Link href="/admin/trips" className={styles.seeAll}>See all</Link>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Trip ID</th>
                <th>Rider</th>
                <th>Driver</th>
                <th>Status</th>
                <th>Fare</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentTrips.map((t) => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{t.rider}</td>
                  <td>{t.driver}</td>
                  <td>
                    <span className={`${styles.badge} ${styles[t.status as keyof typeof styles]}`}>
                      {t.status}
                    </span>
                  </td>
                  <td>{t.fare}</td>
                  <td>{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent users */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Recent users</h2>
            <Link href="/admin/users" className={styles.seeAll}>See all</Link>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((u) => (
                <tr key={u.email}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className={`${styles.badge} ${styles[u.status as keyof typeof styles]}`}>
                      {u.status}
                    </span>
                  </td>
                  <td>{u.joined}</td>
                  <td>
                    <button className={styles.actionBtn}>
                      {u.status === "suspended" ? "Reinstate" : "Suspend"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
