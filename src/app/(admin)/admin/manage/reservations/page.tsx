"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getReservations, deleteReservation, updateReservation, Reservation } from "@/lib/reservationApi";

// ── Icons ──────────────────────────────────────────────
const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 4h10M5 4V2h4v2M6 7v4M8 7v4M3 4l.75 8.25A.75.75 0 004.5 13h5a.75.75 0 00.75-.75L11 4H3z"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M9.5 2.5l2 2L4 12H2v-2l7.5-7.5z"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// ── Helpers ────────────────────────────────────────────
function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("th-TH", { year: "numeric", month: "short", day: "numeric" });
}
function formatTime(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" });
}

// ── Page ───────────────────────────────────────────────
export default function AdminReservationsPage() {
  const { data: session } = useSession();
  const token = (session?.user as any)?.token;

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterText, setFilterText] = useState("");

  // Edit modal
  const [editingItem, setEditingItem] = useState<Reservation | null>(null);
  const [editDate, setEditDate] = useState("");
  const [editTable, setEditTable] = useState(1);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  // ── Fetch ──
  useEffect(() => {
    if (!token) return;
    setLoading(true);
    getReservations(token)
      .then(setReservations)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [token]);

  // ── Handlers ──
  const handleDelete = async (id: string) => {
    if (!token || !confirm("ต้องการลบการจองนี้ใช่หรือไม่?")) return;
    try {
      await deleteReservation(id, token);
      setReservations((prev) => prev.filter((r) => r._id !== id));
    } catch (e: any) {
      alert(e.message);
    }
  };

  const handleOpenEdit = (item: Reservation) => {
    setEditingItem(item);
    const d = new Date(item.reservationDate);
    setEditDate(d.toISOString().slice(0, 16));
    setEditTable(item.tableCount);
    setSaveError("");
  };

  const handleSaveEdit = async () => {
    if (!token || !editingItem) return;
    setSaving(true);
    setSaveError("");
    try {
      await updateReservation(editingItem._id, { reservationDate: editDate, tableCount: editTable }, token);
      setReservations((prev) =>
        prev.map((r) =>
          r._id === editingItem._id ? { ...r, reservationDate: editDate, tableCount: editTable } : r
        )
      );
      setEditingItem(null);
    } catch (e: any) {
      setSaveError(e.message);
    } finally {
      setSaving(false);
    }
  };

  // ── Filter ──
  const filtered = reservations.filter((r) => {
    const q = filterText.toLowerCase();
    return (
      r.restaurant?.name?.toLowerCase().includes(q) ||
      r._id.toLowerCase().includes(q)
    );
  });

  // ── Stats ──
  const total = reservations.length;
  const upcoming = reservations.filter((r) => new Date(r.reservationDate) > new Date()).length;
  const past = total - upcoming;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        :root {
          --cream:#FAF6EE; --gold:#C8841A; --gold-pale:#FDF3E0; --ink:#1C1410;
          --ink-mid:#4A3728; --ink-light:#8C7060; --border:#E0D5C4;
          --sage:#5C7A5A; --sage-light:#EBF2EA; --amber:#D4700A; --amber-pale:#FEF0DC;
          --ruby:#B84040; --ruby-pale:#FDECEA; --shadow:rgba(28,20,16,0.08);
        }
        .adm-page { min-height:100vh; background:var(--cream); font-family:'DM Sans',sans-serif; color:var(--ink); }
        .adm-content { max-width:1300px; margin:0 auto; padding:6.5rem 2rem 4rem; }
        .adm-eyebrow { font-size:.7rem; font-weight:500; letter-spacing:.2em; text-transform:uppercase; color:var(--gold); margin-bottom:.4rem; }
        .adm-title { font-family:'Cormorant Garamond',serif; font-size:2.6rem; font-weight:700; color:var(--ink); line-height:1.1; }
        .stats-row { display:flex; gap:1rem; margin-bottom:2rem; flex-wrap:wrap; }
        .stat-card { flex:1; min-width:140px; background:white; border:1px solid var(--border); border-radius:12px; padding:1.2rem 1.5rem; }
        .stat-label { font-size:.7rem; font-weight:500; letter-spacing:.15em; text-transform:uppercase; color:var(--ink-light); }
        .stat-value { font-family:'Cormorant Garamond',serif; font-size:2.2rem; font-weight:700; color:var(--ink); line-height:1; margin-top:.2rem; }
        .stat-card.up .stat-value { color:var(--sage); }
        .stat-card.past .stat-value { color:var(--ink-light); }
        .controls { display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap; align-items:center; }
        .search-input { flex:1; min-width:200px; background:white; border:1px solid var(--border); border-radius:10px; padding:.55rem 1rem; font-family:'DM Sans',sans-serif; font-size:.875rem; color:var(--ink); outline:none; }
        .search-input:focus { border-color:var(--gold); }
        .table-wrap { background:white; border:1px solid var(--border); border-radius:16px; overflow:hidden; box-shadow:0 4px 24px var(--shadow); }
        table { width:100%; border-collapse:collapse; }
        thead tr { background:var(--ink); }
        th { padding:.9rem 1.2rem; font-size:.68rem; font-weight:500; letter-spacing:.15em; text-transform:uppercase; color:rgba(255,255,255,.65); text-align:left; white-space:nowrap; }
        tbody tr { border-bottom:1px solid var(--border); transition:background .15s; }
        tbody tr:last-child { border-bottom:none; }
        tbody tr:hover { background:var(--gold-pale); }
        td { padding:.9rem 1.2rem; font-size:.875rem; color:var(--ink-mid); vertical-align:middle; }
        .td-id { font-size:.72rem; color:var(--ink-light); font-family:monospace; }
        .td-name { font-weight:600; color:var(--ink); }
        .td-sub { font-size:.78rem; color:var(--ink-light); margin-top:2px; }
        .badge { display:inline-flex; align-items:center; gap:.3rem; padding:.25rem .8rem; border-radius:999px; font-size:.72rem; font-weight:600; }
        .badge-dot { width:6px; height:6px; border-radius:50%; }
        .badge.upcoming { background:var(--sage-light); color:var(--sage); }
        .badge.upcoming .badge-dot { background:var(--sage); }
        .badge.past { background:var(--amber-pale); color:var(--amber); }
        .badge.past .badge-dot { background:var(--amber); }
        .actions { display:flex; gap:.4rem; }
        .btn-action { display:flex; align-items:center; gap:.3rem; padding:.38rem .8rem; border:none; border-radius:7px; font-size:.78rem; font-weight:500; cursor:pointer; transition:all .15s; white-space:nowrap; font-family:'DM Sans',sans-serif; }
        .btn-edit { background:var(--amber-pale); color:var(--amber); }
        .btn-edit:hover { background:var(--amber); color:white; }
        .btn-delete { background:var(--ruby-pale); color:var(--ruby); }
        .btn-delete:hover { background:var(--ruby); color:white; }
        .empty { padding:3rem; text-align:center; color:var(--ink-light); font-style:italic; }
        /* Modal */
        .modal-overlay { position:fixed; inset:0; background:rgba(28,20,16,.55); backdrop-filter:blur(4px); display:flex; align-items:center; justify-content:center; z-index:200; padding:1rem; }
        .modal { background:white; border-radius:20px; width:100%; max-width:460px; padding:2rem; box-shadow:0 20px 60px rgba(28,20,16,.2); animation:slideUp .2s ease; }
        @keyframes slideUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .modal-head { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1.5rem; padding-bottom:1rem; border-bottom:1px solid var(--border); }
        .modal-title { font-family:'Cormorant Garamond',serif; font-size:1.7rem; font-weight:700; color:var(--ink); }
        .btn-close { background:none; border:none; cursor:pointer; color:var(--ink-light); padding:4px; border-radius:6px; }
        .btn-close:hover { color:var(--ruby); }
        .form-field { display:flex; flex-direction:column; gap:.35rem; margin-bottom:1rem; }
        .form-label { font-size:.72rem; font-weight:500; letter-spacing:.1em; text-transform:uppercase; color:var(--ink-light); }
        .form-input { background:var(--cream); border:1px solid var(--border); border-radius:10px; padding:.65rem .9rem; font-family:'DM Sans',sans-serif; font-size:.9rem; color:var(--ink); outline:none; }
        .form-input:focus { border-color:var(--gold); }
        .modal-footer { display:flex; justify-content:flex-end; gap:.75rem; margin-top:1.5rem; padding-top:1rem; border-top:1px solid var(--border); }
        .btn-cancel { background:#f0ece4; border:none; border-radius:10px; padding:.6rem 1.2rem; font-size:.875rem; font-weight:500; color:var(--ink-mid); cursor:pointer; }
        .btn-save { background:var(--gold); border:none; border-radius:10px; padding:.6rem 1.4rem; font-size:.875rem; font-weight:600; color:white; cursor:pointer; }
        .btn-save:hover { background:var(--amber); }
        .btn-save:disabled { opacity:.5; cursor:not-allowed; }
        .err-text { color:var(--ruby); font-size:.82rem; margin-top:.5rem; }
        .spinner { display:inline-block; width:18px; height:18px; border:2px solid rgba(255,255,255,.3); border-top-color:white; border-radius:50%; animation:spin .6s linear infinite; }
        @keyframes spin { to{transform:rotate(360deg)} }
      `}</style>

      <div className="adm-page">
        <main className="adm-content">
          {/* Header */}
          <div style={{ marginBottom: "2rem" }}>
            <div className="adm-eyebrow">Dashboard · Reservations</div>
            <h1 className="adm-title">Manage Reservations</h1>
          </div>

          {/* Stats */}
          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-label">Total</div>
              <div className="stat-value">{total}</div>
            </div>
            <div className="stat-card up">
              <div className="stat-label">Upcoming</div>
              <div className="stat-value">{upcoming}</div>
            </div>
            <div className="stat-card past">
              <div className="stat-label">Past</div>
              <div className="stat-value">{past}</div>
            </div>
          </div>

          {/* Search */}
          <div className="controls">
            <input
              className="search-input"
              placeholder="Search by restaurant name or ID..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>

          {/* Table */}
          {loading ? (
            <div className="empty">Loading reservations...</div>
          ) : error ? (
            <div className="empty" style={{ color: "var(--ruby)" }}>{error}</div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Restaurant</th>
                    <th>Date · Time</th>
                    <th>Tables</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan={6} className="empty">No reservations found</td></tr>
                  ) : (
                    filtered.map((item) => {
                      const isUpcoming = new Date(item.reservationDate) > new Date();
                      return (
                        <tr key={item._id}>
                          <td><span className="td-id">{item._id.slice(-8)}</span></td>
                          <td>
                            <div className="td-name">{item.restaurant?.name ?? "—"}</div>
                            <div className="td-sub">{item.restaurant?.location ?? ""}</div>
                          </td>
                          <td>
                            <div>{formatDate(item.reservationDate)}</div>
                            <div className="td-sub">{formatTime(item.reservationDate)} – {formatTime(item.endTime)}</div>
                          </td>
                          <td style={{ fontWeight: 600 }}>{item.tableCount}</td>
                          <td>
                            <span className={`badge ${isUpcoming ? "upcoming" : "past"}`}>
                              <span className="badge-dot" />
                              {isUpcoming ? "Upcoming" : "Past"}
                            </span>
                          </td>
                          <td>
                            <div className="actions">
                              <button className="btn-action btn-edit" onClick={() => handleOpenEdit(item)}>
                                <EditIcon /> Edit
                              </button>
                              <button className="btn-action btn-delete" onClick={() => handleDelete(item._id)}>
                                <TrashIcon /> Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-head">
              <div>
                <div style={{ fontSize: ".68rem", letterSpacing: ".15em", textTransform: "uppercase", color: "var(--gold)", marginBottom: ".25rem" }}>Edit Reservation</div>
                <div className="modal-title">Update Booking</div>
              </div>
              <button className="btn-close" onClick={() => setEditingItem(null)}><CloseIcon /></button>
            </div>

            <div className="form-field">
              <label className="form-label">Restaurant</label>
              <input className="form-input" value={editingItem.restaurant?.name ?? ""} disabled style={{ opacity: .6 }} />
            </div>
            <div className="form-field">
              <label className="form-label">Reservation Date & Time</label>
              <input type="datetime-local" className="form-input" value={editDate} onChange={(e) => setEditDate(e.target.value)} />
            </div>
            <div className="form-field">
              <label className="form-label">Tables</label>
              <input type="number" min={1} className="form-input" value={editTable} onChange={(e) => setEditTable(Number(e.target.value))} />
            </div>
            {saveError && <div className="err-text">{saveError}</div>}

            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setEditingItem(null)}>Cancel</button>
              <button className="btn-save" disabled={saving} onClick={handleSaveEdit}>
                {saving ? <span className="spinner" /> : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
