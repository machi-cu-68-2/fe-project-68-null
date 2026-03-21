"use client";

import React, { useState } from "react";

// ==========================================
// Interface
// ==========================================
interface Reservation {
  id: number;
  customerName: string;
  name: string;
  day: string;
  time: string;
  countpeople: string;
  status: "Pending" | "Confirmed";
}

// ==========================================
// Mock Data
// ==========================================
const mockData: Reservation[] = [
  {
    id: 1,
    customerName: "คุณสมชาย",
    name: "Restaurant THAI",
    day: "2026-03-31",
    time: "18:00",
    countpeople: "4",
    status: "Pending",
  },
  {
    id: 2,
    customerName: "คุณสมหญิง",
    name: "Restaurant CHINA",
    day: "2026-03-26",
    time: "19:30",
    countpeople: "2",
    status: "Confirmed",
  },
  {
    id: 3,
    customerName: "คุณวิชัย",
    name: "Restaurant JAPAN",
    day: "2026-04-02",
    time: "20:00",
    countpeople: "6",
    status: "Pending",
  },
];

// ==========================================
// Icons (inline SVG)
// ==========================================
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M8 2v12M2 8h12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M2 7l4 4 6-8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M9.5 2.5l2 2L4 12H2v-2l7.5-7.5z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M2 4h10M5 4V2h4v2M6 7v4M8 7v4M3 4l.75 8.25A.75.75 0 004.5 13h5a.75.75 0 00.75-.75L11 4H3z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M5 5l10 10M15 5L5 15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// ==========================================
// Page Component
// ==========================================
export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>(mockData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<
    "All" | "Pending" | "Confirmed"
  >("All");

  const [formData, setFormData] = useState({
    customerName: "",
    name: "",
    day: "",
    time: "",
    countpeople: "",
  });

  const handleApprove = (id: number) => {
    if (window.confirm("ต้องการอนุมัติการจองนี้ใช่หรือไม่?")) {
      setReservations((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: "Confirmed" } : item,
        ),
      );
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("คุณแน่ใจหรือไม่ที่จะลบการจองนี้?")) {
      setReservations((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormData({
      customerName: "",
      name: "",
      day: "",
      time: "",
      countpeople: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (reservation: Reservation) => {
    setEditingId(reservation.id);
    setFormData({
      customerName: reservation.customerName,
      name: reservation.name,
      day: reservation.day,
      time: reservation.time,
      countpeople: reservation.countpeople,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setReservations((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...item, ...formData } : item,
        ),
      );
    } else {
      const newReservation: Reservation = {
        id: Date.now(),
        ...formData,
        status: "Pending",
      };
      setReservations([...reservations, newReservation]);
    }
    setIsModalOpen(false);
  };

  const filtered = reservations.filter((r) =>
    filterStatus === "All" ? true : r.status === filterStatus,
  );

  const pendingCount = reservations.filter(
    (r) => r.status === "Pending",
  ).length;
  const confirmedCount = reservations.filter(
    (r) => r.status === "Confirmed",
  ).length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        :root {
          --cream: #FAF6EE;
          --parchment: #F2EAD8;
          --gold: #C8841A;
          --gold-light: #E8A93A;
          --gold-pale: #FDF3E0;
          --ink: #1C1410;
          --ink-mid: #4A3728;
          --ink-light: #8C7060;
          --sage: #5C7A5A;
          --sage-light: #EBF2EA;
          --amber: #D4700A;
          --amber-pale: #FEF0DC;
          --ruby: #B84040;
          --ruby-pale: #FDECEA;
          --border: #E0D5C4;
          --shadow: rgba(28, 20, 16, 0.08);
        }

        .page-wrap {
          min-height: 100vh;
          position: relative;
          z-index: 0;
          font-family: 'DM Sans', sans-serif;
          color: var(--ink);
          background: var(--cream);
          background-image:
            radial-gradient(ellipse at 0% 0%, rgba(200, 132, 26, 0.06) 0%, transparent 60%),
            radial-gradient(ellipse at 100% 100%, rgba(92, 122, 90, 0.04) 0%, transparent 60%);
        }

        /* ── Main content ── */
        .content {
          max-width: 1300px;
          margin: 0 auto;
          padding: 6.5rem 2rem 4rem;
        }

        /* ── Page header ── */
        .page-header {
          margin-bottom: 2rem;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .page-title-block {}
        .page-eyebrow {
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 0.4rem;
        }
        .page-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.6rem;
          font-weight: 700;
          color: var(--ink);
          line-height: 1.1;
        }

        /* ── Stats row ── */
        .stats-row {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }
        .stat-card {
          flex: 1;
          min-width: 150px;
          background: white;
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.2rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        .stat-label {
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--ink-light);
        }
        .stat-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.2rem;
          font-weight: 700;
          color: var(--ink);
          line-height: 1;
        }
        .stat-card.pending .stat-value { color: var(--amber); }
        .stat-card.confirmed .stat-value { color: var(--sage); }

        /* ── Controls ── */
        .controls {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }
        .filter-tabs {
          display: flex;
          background: white;
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 4px;
          gap: 2px;
        }
        .filter-tab {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.45rem 1.1rem;
          border-radius: 7px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--ink-light);
          transition: all 0.18s ease;
        }
        .filter-tab.active {
          background: var(--ink);
          color: white;
        }
        .filter-tab:hover:not(.active) {
          background: var(--parchment);
          color: var(--ink);
        }

        .btn-add {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--gold);
          color: white;
          border: none;
          border-radius: 10px;
          padding: 0.6rem 1.3rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.18s;
        }
        .btn-add:hover { background: var(--amber); }

        /* ── Table ── */
        .table-wrap {
          background: white;
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 24px var(--shadow);
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        thead tr {
          background: var(--ink);
        }
        th {
          padding: 1rem 1.25rem;
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.65);
          text-align: left;
          white-space: nowrap;
        }
        th.center { text-align: center; }

        tbody tr {
          border-bottom: 1px solid var(--border);
          transition: background 0.15s;
        }
        tbody tr:last-child { border-bottom: none; }
        tbody tr:hover { background: var(--gold-pale); }

        td {
          padding: 1rem 1.25rem;
          font-size: 0.875rem;
          color: var(--ink-mid);
          vertical-align: middle;
        }
        td.center { text-align: center; }

        .td-id {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          color: var(--ink-light);
          font-weight: 500;
        }
        .td-name {
          font-weight: 600;
          color: var(--ink);
        }
        .td-restaurant {
          font-style: italic;
          color: var(--ink-mid);
        }
        .td-date {
          font-size: 0.82rem;
        }
        .td-time {
          font-size: 0.75rem;
          color: var(--ink-light);
          margin-top: 2px;
        }
        .td-count {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--ink);
        }

        /* Badge */
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.3rem 0.85rem;
          border-radius: 999px;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.05em;
        }
        .badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }
        .badge.pending {
          background: var(--amber-pale);
          color: var(--amber);
        }
        .badge.pending .badge-dot { background: var(--amber); }
        .badge.confirmed {
          background: var(--sage-light);
          color: var(--sage);
        }
        .badge.confirmed .badge-dot { background: var(--sage); }

        /* Action buttons */
        .actions {
          display: flex;
          gap: 0.4rem;
          justify-content: center;
          align-items: center;
        }
        .btn-action {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.4rem 0.85rem;
          border: none;
          border-radius: 7px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
        }
        .btn-approve { background: var(--sage-light); color: var(--sage); }
        .btn-approve:hover { background: var(--sage); color: white; }
        .btn-edit { background: var(--amber-pale); color: var(--amber); }
        .btn-edit:hover { background: var(--amber); color: white; }
        .btn-delete { background: var(--ruby-pale); color: var(--ruby); }
        .btn-delete:hover { background: var(--ruby); color: white; }

        /* Empty state */
        .empty {
          padding: 3rem;
          text-align: center;
          color: var(--ink-light);
          font-style: italic;
        }

        /* ── Modal ── */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(28, 20, 16, 0.55);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 200;
          padding: 1rem;
        }
        .modal {
          background: white;
          border-radius: 20px;
          width: 100%;
          max-width: 500px;
          padding: 2rem;
          box-shadow: 0 20px 60px rgba(28,20,16,0.2);
          animation: slideUp 0.22s ease;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 1.75rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border);
        }
        .modal-eyebrow {
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 0.3rem;
        }
        .modal-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.7rem;
          font-weight: 700;
          color: var(--ink);
        }
        .btn-close {
          background: var(--parchment);
          border: none;
          border-radius: 8px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--ink-light);
          transition: all 0.15s;
          flex-shrink: 0;
        }
        .btn-close:hover { background: var(--ruby-pale); color: var(--ruby); }

        /* Form */
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .form-row {
          display: flex;
          gap: 0.75rem;
        }
        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          flex: 1;
        }
        .form-label {
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--ink-light);
        }
        .form-input {
          background: var(--cream);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 0.65rem 0.9rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          color: var(--ink);
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
          width: 100%;
        }
        .form-input:focus {
          border-color: var(--gold);
          box-shadow: 0 0 0 3px rgba(200, 132, 26, 0.12);
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          margin-top: 1.75rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border);
        }
        .btn-cancel {
          background: var(--parchment);
          border: none;
          border-radius: 10px;
          padding: 0.65rem 1.3rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--ink-mid);
          cursor: pointer;
          transition: background 0.15s;
        }
        .btn-cancel:hover { background: var(--border); }
        .btn-save {
          background: var(--gold);
          border: none;
          border-radius: 10px;
          padding: 0.65rem 1.5rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          color: white;
          cursor: pointer;
          transition: background 0.15s;
        }
        .btn-save:hover { background: var(--amber); }

        @media (max-width: 640px) {
          .page-title { font-size: 2rem; }
          .content { padding: 1.5rem 1rem 3rem; }
          .topbar { padding: 0 1rem; }
          .controls { flex-direction: column; align-items: stretch; }
          .btn-add { margin-left: 0; justify-content: center; }
        }
      `}</style>

      <div className="page-wrap">
        <main className="content" style={{ position: "relative", zIndex: 1 }}>
          {/* Header */}
          <div className="page-header">
            <div className="page-title-block">
              <div className="page-eyebrow">Dashboard · การจอง</div>
              <h1 className="page-title">จัดการการจอง</h1>
            </div>
          </div>

          {/* Stats */}
          <div className="stats-row">
            <div className="stat-card">
              <span className="stat-label">รายการทั้งหมด</span>
              <span className="stat-value">{reservations.length}</span>
            </div>
            <div className="stat-card pending">
              <span className="stat-label">รอดำเนินการ</span>
              <span className="stat-value">{pendingCount}</span>
            </div>
            <div className="stat-card confirmed">
              <span className="stat-label">อนุมัติแล้ว</span>
              <span className="stat-value">{confirmedCount}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="controls">
            <div className="filter-tabs">
              {(["All", "Pending", "Confirmed"] as const).map((s) => (
                <button
                  key={s}
                  className={`filter-tab ${filterStatus === s ? "active" : ""}`}
                  onClick={() => setFilterStatus(s)}
                >
                  {s === "All"
                    ? "ทั้งหมด"
                    : s === "Pending"
                      ? "รอดำเนินการ"
                      : "อนุมัติแล้ว"}
                </button>
              ))}
            </div>
            <button className="btn-add" onClick={handleOpenAddModal}>
              <PlusIcon /> เพิ่มการจอง
            </button>
          </div>

          {/* Table */}
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>รหัส</th>
                  <th>ลูกค้า</th>
                  <th>ร้านอาหาร</th>
                  <th>วัน · เวลา</th>
                  <th className="center">จำนวน</th>
                  <th className="center">สถานะ</th>
                  <th className="center">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="empty">
                      ไม่มีข้อมูลในหมวดนี้
                    </td>
                  </tr>
                ) : (
                  filtered.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <span className="td-id">#{item.id}</span>
                      </td>
                      <td>
                        <span className="td-name">{item.customerName}</span>
                      </td>
                      <td>
                        <span className="td-restaurant">{item.name}</span>
                      </td>
                      <td>
                        <div className="td-date">{item.day}</div>
                        <div className="td-time">{item.time} น.</div>
                      </td>
                      <td className="center">
                        <span className="td-count">{item.countpeople}</span>
                      </td>
                      <td className="center">
                        <span
                          className={`badge ${item.status === "Confirmed" ? "confirmed" : "pending"}`}
                        >
                          <span className="badge-dot" />
                          {item.status === "Confirmed"
                            ? "อนุมัติแล้ว"
                            : "รอดำเนินการ"}
                        </span>
                      </td>
                      <td>
                        <div className="actions">
                          {item.status !== "Confirmed" && (
                            <button
                              className="btn-action btn-approve"
                              onClick={() => handleApprove(item.id)}
                            >
                              <CheckIcon /> อนุมัติ
                            </button>
                          )}
                          <button
                            className="btn-action btn-edit"
                            onClick={() => handleOpenEditModal(item)}
                          >
                            <EditIcon /> แก้ไข
                          </button>
                          <button
                            className="btn-action btn-delete"
                            onClick={() => handleDelete(item.id)}
                          >
                            <TrashIcon /> ลบ
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <div>
                <div className="modal-eyebrow">
                  {editingId ? "แก้ไขข้อมูล" : "สร้างใหม่"}
                </div>
                <div className="modal-title">
                  {editingId ? "แก้ไขการจอง" : "เพิ่มการจองใหม่"}
                </div>
              </div>
              <button
                className="btn-close"
                onClick={() => setIsModalOpen(false)}
              >
                <CloseIcon />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="form-group">
              <div className="form-field">
                <label className="form-label">ชื่อลูกค้า</label>
                <input
                  required
                  className="form-input"
                  placeholder="เช่น คุณสมชาย"
                  value={formData.customerName}
                  onChange={(e) =>
                    setFormData({ ...formData, customerName: e.target.value })
                  }
                />
              </div>
              <div className="form-field">
                <label className="form-label">ชื่อร้านอาหาร</label>
                <input
                  required
                  className="form-input"
                  placeholder="เช่น Restaurant THAI"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">วันที่</label>
                  <input
                    type="date"
                    required
                    className="form-input"
                    value={formData.day}
                    onChange={(e) =>
                      setFormData({ ...formData, day: e.target.value })
                    }
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">เวลา</label>
                  <input
                    type="time"
                    required
                    className="form-input"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="form-field">
                <label className="form-label">จำนวนคน</label>
                <input
                  type="number"
                  required
                  min={1}
                  className="form-input"
                  placeholder="จำนวนผู้เข้าร่วม"
                  value={formData.countpeople}
                  onChange={(e) =>
                    setFormData({ ...formData, countpeople: e.target.value })
                  }
                />
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setIsModalOpen(false)}
                >
                  ยกเลิก
                </button>
                <button type="submit" className="btn-save">
                  บันทึกข้อมูล
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
