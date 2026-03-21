"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1";

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const EyeIcon = ({ open }: { open: boolean }) => open ? (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
) : (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export default function ProfilePage() {
  const { data: session, update: updateSession } = useSession();
  const user = session?.user as any;
  const token = user?.token;

  // ข้อมูลปัจจุบัน
  const [name, setName] = useState(user?.data?.name ?? user?.name ?? "");
  const [tel, setTel] = useState(user?.data?.tel ?? user?.tel ?? "");
  const email: string = user?.data?.email ?? user?.email ?? "";
  const role: string = user?.data?.role ?? user?.role ?? "user";
  const createdAt: string = user?.data?.createdAt ?? user?.createdAt ?? "";
  const joinedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "—";

  // Edit Profile modal
  const [showEdit, setShowEdit] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editTel, setEditTel] = useState(tel);
  const [editSaving, setEditSaving] = useState(false);
  const [editError, setEditError] = useState("");
  const [editSuccess, setEditSuccess] = useState(false);

  // Change Password modal
  const [showPw, setShowPw] = useState(false);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [pwSaving, setPwSaving] = useState(false);
  const [pwError, setPwError] = useState("");
  const [pwSuccess, setPwSuccess] = useState(false);

  // ── Handler: Edit Profile ──
  const handleEditSave = async () => {
    if (!token) return;
    setEditSaving(true);
    setEditError("");
    try {
      const res = await fetch(`${API}/auth/me`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: editName, tel: editTel }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg ?? "Failed to update profile");

      // อัปเดตค่าที่แสดงในหน้า
      setName(editName);
      setTel(editTel);
      setEditSuccess(true);
      setTimeout(() => { setEditSuccess(false); setShowEdit(false); }, 1500);
    } catch (e: any) {
      setEditError(e.message);
    } finally {
      setEditSaving(false);
    }
  };

  // ── Handler: Change Password ──
  const handlePwSave = async () => {
    if (!token) return;
    if (newPw !== confirmPw) { setPwError("New passwords do not match"); return; }
    if (newPw.length < 6) { setPwError("Password must be at least 6 characters"); return; }

    setPwSaving(true);
    setPwError("");
    try {
      const res = await fetch(`${API}/auth/password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ currentPassword: currentPw, newPassword: newPw }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg ?? "Failed to change password");

      setPwSuccess(true);
      setCurrentPw(""); setNewPw(""); setConfirmPw("");
      setTimeout(() => { setPwSuccess(false); setShowPw(false); }, 1500);
    } catch (e: any) {
      setPwError(e.message);
    } finally {
      setPwSaving(false);
    }
  };

  const initial = name.charAt(0).toUpperCase();

  return (
    <>
      <style>{`
        .modal-overlay { position:fixed; inset:0; background:rgba(28,20,16,.45); backdrop-filter:blur(4px); display:flex; align-items:center; justify-content:center; z-index:200; padding:1rem; }
        .modal { background:white; border-radius:24px; width:100%; max-width:440px; padding:2rem; box-shadow:0 20px 60px rgba(28,20,16,.18); animation:slideUp .2s ease; }
        @keyframes slideUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .modal-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; padding-bottom:1rem; border-bottom:2px solid #eee8aa; }
        .modal-title { font-family:var(--font-playfair-display); font-size:1.5rem; font-weight:700; color:#724a15; }
        .btn-close { background:none; border:none; cursor:pointer; color:#8b4513; opacity:.5; padding:4px; border-radius:6px; }
        .btn-close:hover { opacity:1; }
        .form-field { display:flex; flex-direction:column; gap:.4rem; margin-bottom:1rem; }
        .form-label { font-size:.72rem; font-weight:600; letter-spacing:.12em; text-transform:uppercase; color:rgba(139,69,21,.55); }
        .form-input { background:#fefaec; border:2px solid #eee8aa; border-radius:14px; padding:.7rem 1rem; font-size:.95rem; color:#724a15; outline:none; width:100%; transition:border-color .15s; }
        .form-input:focus { border-color:#ce7b11; }
        .pw-wrap { position:relative; }
        .pw-wrap .form-input { padding-right:2.75rem; }
        .eye-btn { position:absolute; right:.75rem; top:50%; transform:translateY(-50%); background:none; border:none; cursor:pointer; color:rgba(139,69,21,.4); padding:2px; }
        .eye-btn:hover { color:#724a15; }
        .modal-footer { display:flex; justify-content:flex-end; gap:.75rem; margin-top:1.5rem; padding-top:1rem; border-top:2px solid #eee8aa; }
        .btn-cancel { background:#f5f0e8; border:none; border-radius:12px; padding:.65rem 1.3rem; font-size:.875rem; font-weight:500; color:#8b4513; cursor:pointer; }
        .btn-cancel:hover { background:#eee8aa; }
        .btn-save { background:#ce7b11; border:none; border-radius:12px; padding:.65rem 1.5rem; font-size:.875rem; font-weight:600; color:white; cursor:pointer; transition:background .15s; font-family:var(--font-playfair-display); }
        .btn-save:hover { background:#e8a118; }
        .btn-save:disabled { opacity:.5; cursor:not-allowed; }
        .err-box { background:#fdecea; color:#b84040; padding:.65rem 1rem; border-radius:10px; font-size:.82rem; margin-top:.25rem; }
        .success-box { background:#ebf2ea; color:#5c7a5a; padding:.65rem 1rem; border-radius:10px; font-size:.82rem; margin-top:.25rem; }
        .spinner { display:inline-block; width:14px; height:14px; border:2px solid rgba(255,255,255,.3); border-top-color:white; border-radius:50%; animation:spin .6s linear infinite; margin-right:.4rem; }
        @keyframes spin { to{transform:rotate(360deg)} }
      `}</style>

      <div className="flex flex-col items-start w-full gap-6 mt-12">
        {/* Heading */}
        <div className="flex flex-col gap-2">
          <h1 className="text-[3.5rem] font-bold text-saddlebrown leading-tight font-playfair-display">
            My Profile
          </h1>
          <p className="text-xl text-saddlebrown/70 font-medium">
            Manage your personal information and account settings
          </p>
        </div>

        {/* Profile card */}
        <div className="w-full bg-white border-2 border-palegoldenrod rounded-3xl p-10 shadow-sm flex flex-col gap-6">
          {/* Avatar + name */}
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full shrink-0 bg-goldenrod text-white flex items-center justify-center text-4xl font-bold font-playfair-display">
              {initial}
            </div>
            <div>
              <div className="text-2xl font-bold text-saddlebrown font-playfair-display">{name}</div>
              <div className="mt-1 inline-block bg-[#fef3d0] text-[#ce7b11] text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
                {role === "admin" ? "Administrator" : "Member"}
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-palegoldenrod" />

          {/* Info grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5">
            {[
              { label: "Full Name", value: name },
              { label: "Email Address", value: email },
              { label: "Phone Number", value: tel || "—" },
              { label: "Member Since", value: joinedDate },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="text-sm font-bold text-saddlebrown/50 uppercase tracking-wider">{label}</span>
                <span className="text-xl font-semibold text-saddlebrown">{value}</span>
              </div>
            ))}
          </div>

          <div className="w-full h-px bg-palegoldenrod" />

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => { setEditName(name); setEditTel(tel); setEditError(""); setEditSuccess(false); setShowEdit(true); }}
              className="px-8 py-3 rounded-full font-bold bg-saddlebrown text-white hover:bg-saddlebrown/90 transition-colors font-playfair-display"
            >
              Edit Profile
            </button>
            <button
              onClick={() => { setCurrentPw(""); setNewPw(""); setConfirmPw(""); setPwError(""); setPwSuccess(false); setShowPw(true); }}
              className="px-8 py-3 rounded-full font-bold bg-white text-saddlebrown border-2 border-palegoldenrod hover:bg-[#fefaec] transition-colors font-playfair-display"
            >
              Change Password
            </button>
          </div>
        </div>

        {/* Admin badge */}
        {role === "admin" && (
          <div className="w-full bg-[#fef3d0] border-2 border-[#f2d257] rounded-2xl px-8 py-5 flex items-center gap-4 flex-wrap">
            <span className="text-2xl shrink-0">⚙️</span>
            <div>
              <div className="font-bold text-[#724a15] font-playfair-display">Admin Access</div>
              <div className="text-sm text-[#724a15]/70">You have full administrative privileges</div>
            </div>
            <a href="/admin/manage/restaurant" className="ml-auto font-semibold text-[#ce7b11] hover:underline whitespace-nowrap">
              Go to Dashboard →
            </a>
          </div>
        )}
      </div>

      {/* ── Edit Profile Modal ── */}
      {showEdit && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-head">
              <div className="modal-title">Edit Profile</div>
              <button className="btn-close" onClick={() => setShowEdit(false)}><CloseIcon /></button>
            </div>

            <div className="form-field">
              <label className="form-label">Full Name</label>
              <input className="form-input" value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Your name" />
            </div>
            <div className="form-field">
              <label className="form-label">Phone Number</label>
              <input className="form-input" value={editTel} onChange={(e) => setEditTel(e.target.value)} placeholder="0812345678" />
            </div>
            <div className="form-field">
              <label className="form-label">Email Address</label>
              <input className="form-input" value={email} disabled style={{ opacity: .5 }} />
              <span style={{ fontSize: ".75rem", color: "rgba(139,69,21,.5)" }}>Email cannot be changed</span>
            </div>

            {editError && <div className="err-box">{editError}</div>}
            {editSuccess && <div className="success-box">✓ Profile updated successfully!</div>}

            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowEdit(false)}>Cancel</button>
              <button className="btn-save" disabled={editSaving || !editName} onClick={handleEditSave}>
                {editSaving && <span className="spinner" />}
                {editSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Change Password Modal ── */}
      {showPw && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-head">
              <div className="modal-title">Change Password</div>
              <button className="btn-close" onClick={() => setShowPw(false)}><CloseIcon /></button>
            </div>

            <div className="form-field">
              <label className="form-label">Current Password</label>
              <div className="pw-wrap">
                <input className="form-input" type={showCurrentPw ? "text" : "password"} value={currentPw}
                  onChange={(e) => setCurrentPw(e.target.value)} placeholder="••••••••" />
                <button className="eye-btn" type="button" onClick={() => setShowCurrentPw(!showCurrentPw)}>
                  <EyeIcon open={showCurrentPw} />
                </button>
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">New Password</label>
              <div className="pw-wrap">
                <input className="form-input" type={showNewPw ? "text" : "password"} value={newPw}
                  onChange={(e) => setNewPw(e.target.value)} placeholder="At least 6 characters" />
                <button className="eye-btn" type="button" onClick={() => setShowNewPw(!showNewPw)}>
                  <EyeIcon open={showNewPw} />
                </button>
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">Confirm New Password</label>
              <div className="pw-wrap">
                <input className="form-input" type={showConfirmPw ? "text" : "password"} value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)} placeholder="••••••••" />
                <button className="eye-btn" type="button" onClick={() => setShowConfirmPw(!showConfirmPw)}>
                  <EyeIcon open={showConfirmPw} />
                </button>
              </div>
            </div>

            {pwError && <div className="err-box">{pwError}</div>}
            {pwSuccess && <div className="success-box">✓ Password changed successfully!</div>}

            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowPw(false)}>Cancel</button>
              <button className="btn-save" disabled={pwSaving || !currentPw || !newPw || !confirmPw} onClick={handlePwSave}>
                {pwSaving && <span className="spinner" />}
                {pwSaving ? "Saving..." : "Change Password"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
