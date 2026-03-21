"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Restaurant } from "@/interface/Restaurant";
import { getRestaurantsAdmin, deleteRestaurant, createRestaurant } from "@/lib/restaurantApi";

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
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

export default function AdminManageRestaurantsPage() {
  const { data: session } = useSession();
  const token = (session?.user as any)?.token;

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  // Add modal
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({ name: "", category: "", location: "", description: "", tel: "" });
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState("");

  useEffect(() => {
    if (!token) return;
    getRestaurantsAdmin(token)
      .then(setRestaurants)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [token]);

  const handleDelete = async (id: string, name: string) => {
    if (!token || !confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await deleteRestaurant(id, token);
      setRestaurants((prev) => prev.filter((r) => r._id !== id && r.id !== id));
    } catch (e: any) {
      alert(e.message);
    }
  };

  const handleAdd = async () => {
    if (!token) return;
    setAdding(true);
    setAddError("");
    try {
      const result = await createRestaurant(addForm, token);
      setRestaurants((prev) => [result.data, ...prev]);
      setShowAdd(false);
      setAddForm({ name: "", category: "", location: "", description: "", tel: "" });
    } catch (e: any) {
      setAddError(e.message);
    } finally {
      setAdding(false);
    }
  };

  const filtered = restaurants.filter((r) => {
    const q = search.toLowerCase();
    return r.name?.toLowerCase().includes(q) || r.location?.toLowerCase().includes(q) || r.category?.toLowerCase().includes(q);
  });

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
        .adm-title { font-family:'Cormorant Garamond',serif; font-size:2.6rem; font-weight:700; color:var(--ink); line-height:1.1; margin-bottom:2rem; }
        .controls { display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap; align-items:center; }
        .search-input { flex:1; min-width:200px; background:white; border:1px solid var(--border); border-radius:10px; padding:.55rem 1rem; font-family:'DM Sans',sans-serif; font-size:.875rem; color:var(--ink); outline:none; }
        .search-input:focus { border-color:var(--gold); }
        .btn-add { display:flex; align-items:center; gap:.5rem; background:var(--gold); color:white; border:none; border-radius:10px; padding:.6rem 1.3rem; font-size:.85rem; font-weight:600; cursor:pointer; transition:background .15s; font-family:'DM Sans',sans-serif; white-space:nowrap; }
        .btn-add:hover { background:var(--amber); }
        /* Grid */
        .r-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); gap:1.25rem; }
        .r-card { background:white; border:1px solid var(--border); border-radius:16px; overflow:hidden; box-shadow:0 2px 12px var(--shadow); transition:transform .15s, box-shadow .15s; }
        .r-card:hover { transform:translateY(-2px); box-shadow:0 8px 28px var(--shadow); }
        .r-img { width:100%; height:160px; object-fit:cover; display:block; background:#f0ece4; }
        .r-body { padding:1.25rem; }
        .r-name { font-family:'Cormorant Garamond',serif; font-size:1.3rem; font-weight:700; color:var(--ink); margin-bottom:.25rem; }
        .r-category { font-size:.78rem; color:var(--gold); font-weight:500; margin-bottom:.5rem; }
        .r-location { font-size:.8rem; color:var(--ink-light); }
        .r-footer { display:flex; gap:.5rem; padding:.75rem 1.25rem; border-top:1px solid var(--border); background:var(--cream); }
        .btn-action { display:flex; align-items:center; gap:.3rem; padding:.38rem .9rem; border:none; border-radius:7px; font-size:.78rem; font-weight:500; cursor:pointer; transition:all .15s; font-family:'DM Sans',sans-serif; }
        .btn-edit { background:var(--amber-pale); color:var(--amber); }
        .btn-edit:hover { background:var(--amber); color:white; }
        .btn-delete { background:var(--ruby-pale); color:var(--ruby); }
        .btn-delete:hover { background:var(--ruby); color:white; }
        .empty { padding:3rem; text-align:center; color:var(--ink-light); font-style:italic; }
        /* Modal */
        .modal-overlay { position:fixed; inset:0; background:rgba(28,20,16,.55); backdrop-filter:blur(4px); display:flex; align-items:center; justify-content:center; z-index:200; padding:1rem; }
        .modal { background:white; border-radius:20px; width:100%; max-width:500px; padding:2rem; box-shadow:0 20px 60px rgba(28,20,16,.2); animation:slideUp .2s ease; max-height:90vh; overflow-y:auto; }
        @keyframes slideUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .modal-head { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1.5rem; padding-bottom:1rem; border-bottom:1px solid var(--border); }
        .modal-title { font-family:'Cormorant Garamond',serif; font-size:1.7rem; font-weight:700; color:var(--ink); }
        .btn-close { background:none; border:none; cursor:pointer; color:var(--ink-light); padding:4px; }
        .btn-close:hover { color:var(--ruby); }
        .form-field { display:flex; flex-direction:column; gap:.35rem; margin-bottom:1rem; }
        .form-label { font-size:.72rem; font-weight:500; letter-spacing:.1em; text-transform:uppercase; color:var(--ink-light); }
        .form-input { background:var(--cream); border:1px solid var(--border); border-radius:10px; padding:.65rem .9rem; font-family:'DM Sans',sans-serif; font-size:.9rem; color:var(--ink); outline:none; }
        .form-input:focus { border-color:var(--gold); }
        .modal-footer { display:flex; justify-content:flex-end; gap:.75rem; margin-top:1.5rem; padding-top:1rem; border-top:1px solid var(--border); }
        .btn-cancel { background:#f0ece4; border:none; border-radius:10px; padding:.6rem 1.2rem; font-size:.875rem; font-weight:500; color:var(--ink-mid); cursor:pointer; font-family:'DM Sans',sans-serif; }
        .btn-save { background:var(--gold); border:none; border-radius:10px; padding:.6rem 1.4rem; font-size:.875rem; font-weight:600; color:white; cursor:pointer; font-family:'DM Sans',sans-serif; }
        .btn-save:hover { background:var(--amber); }
        .btn-save:disabled { opacity:.5; cursor:not-allowed; }
        .err-text { color:var(--ruby); font-size:.82rem; margin-top:.4rem; }
        .spinner { display:inline-block; width:16px; height:16px; border:2px solid rgba(255,255,255,.3); border-top-color:white; border-radius:50%; animation:spin .6s linear infinite; }
        @keyframes spin { to{transform:rotate(360deg)} }
      `}</style>

      <div className="adm-page">
        <main className="adm-content">
          <div className="adm-eyebrow">Dashboard · Restaurants</div>
          <h1 className="adm-title">Manage Restaurants</h1>

          <div className="controls">
            <input className="search-input" placeholder="Search by name, category, or location..."
              value={search} onChange={(e) => setSearch(e.target.value)} />
            <button className="btn-add" onClick={() => { setShowAdd(true); setAddError(""); }}>
              <PlusIcon /> Add Restaurant
            </button>
          </div>

          {loading ? (
            <div className="empty">Loading restaurants...</div>
          ) : error ? (
            <div className="empty" style={{ color: "var(--ruby)" }}>{error}</div>
          ) : filtered.length === 0 ? (
            <div className="empty">No restaurants found</div>
          ) : (
            <div className="r-grid">
              {filtered.map((r) => {
                const id = r._id ?? r.id;
                return (
                  <div key={id} className="r-card">
                    <img
                      className="r-img"
                      src={r.imageSrc ?? r.image ?? "/images/banner.jpg"}
                      alt={r.name}
                      onError={(e) => { (e.target as HTMLImageElement).src = "/images/banner.jpg"; }}
                    />
                    <div className="r-body">
                      <div className="r-name">{r.name}</div>
                      <div className="r-category">{r.category}</div>
                      <div className="r-location">📍 {r.location}</div>
                    </div>
                    <div className="r-footer">
                      <Link href={`/admin/manage/restaurant/${id}`} className="btn-action btn-edit" style={{ textDecoration: "none" }}>
                        <EditIcon /> Edit
                      </Link>
                      <button className="btn-action btn-delete" onClick={() => handleDelete(id, r.name)}>
                        <TrashIcon /> Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* Add Modal */}
      {showAdd && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-head">
              <div>
                <div style={{ fontSize: ".68rem", letterSpacing: ".15em", textTransform: "uppercase", color: "var(--gold)", marginBottom: ".25rem" }}>New Restaurant</div>
                <div className="modal-title">Add Restaurant</div>
              </div>
              <button className="btn-close" onClick={() => setShowAdd(false)}><CloseIcon /></button>
            </div>

            {(["name", "category", "location", "tel", "description"] as const).map((field) => (
              <div key={field} className="form-field">
                <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                {field === "description" ? (
                  <textarea className="form-input" rows={3} style={{ resize: "vertical" }}
                    value={addForm[field]} onChange={(e) => setAddForm({ ...addForm, [field]: e.target.value })} />
                ) : (
                  <input className="form-input" value={addForm[field as keyof typeof addForm]}
                    onChange={(e) => setAddForm({ ...addForm, [field]: e.target.value })} />
                )}
              </div>
            ))}

            {addError && <div className="err-text">{addError}</div>}

            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowAdd(false)}>Cancel</button>
              <button className="btn-save" disabled={adding || !addForm.name} onClick={handleAdd}>
                {adding ? <span className="spinner" /> : "Create Restaurant"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
