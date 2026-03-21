"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { use } from "react";
import { Restaurant, OpeningHour } from "@/interface/Restaurant";
import { getRestaurantById, updateRestaurant } from "@/lib/restaurantApi";
import Link from "next/link";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const BackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
);

interface Props {
  params: Promise<{ restaurantId: string }>;
}

export default function AdminEditRestaurantPage({ params }: Props) {
  const { restaurantId } = use(params);
  const { data: session } = useSession();
  const token = (session?.user as any)?.token;
  const router = useRouter();

  const [form, setForm] = useState<Partial<Restaurant>>({});
  const [openingHours, setOpeningHours] = useState<OpeningHour[]>(
    DAYS.map((day) => ({ day, open: "10:00", close: "22:00", closed: false }))
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) return;
    getRestaurantById(restaurantId, token)
      .then((data) => {
        setForm(data);
        if (data.openingHours && data.openingHours.length > 0) {
          setOpeningHours(data.openingHours);
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [restaurantId, token]);

  const handleSave = async () => {
    if (!token) return;
    setSaving(true);
    setError("");
    setSuccess(false);
    try {
      await updateRestaurant(restaurantId, { ...form, openingHours }, token);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const updateHour = (idx: number, field: keyof OpeningHour, value: string | boolean) => {
    setOpeningHours((prev) => prev.map((h, i) => i === idx ? { ...h, [field]: value } : h));
  };

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#FAF6EE", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans',sans-serif", color: "#8C7060" }}>
      Loading restaurant data...
    </div>
  );

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
        .edit-page { min-height:100vh; background:var(--cream); font-family:'DM Sans',sans-serif; color:var(--ink); }
        .edit-content { max-width:900px; margin:0 auto; padding:6.5rem 2rem 4rem; }
        .back-link { display:inline-flex; align-items:center; gap:.4rem; font-size:.85rem; color:var(--ink-light); text-decoration:none; margin-bottom:1.5rem; transition:color .15s; }
        .back-link:hover { color:var(--gold); }
        .edit-eyebrow { font-size:.7rem; font-weight:500; letter-spacing:.2em; text-transform:uppercase; color:var(--gold); margin-bottom:.4rem; }
        .edit-title { font-family:'Cormorant Garamond',serif; font-size:2.4rem; font-weight:700; color:var(--ink); line-height:1.1; margin-bottom:2rem; }
        .section-card { background:white; border:1px solid var(--border); border-radius:16px; padding:1.75rem; margin-bottom:1.5rem; box-shadow:0 2px 12px var(--shadow); }
        .section-title { font-family:'Cormorant Garamond',serif; font-size:1.3rem; font-weight:700; color:var(--ink); margin-bottom:1.25rem; padding-bottom:.75rem; border-bottom:1px solid var(--border); }
        .form-grid { display:grid; grid-template-columns:1fr 1fr; gap:1rem; }
        .form-grid.full { grid-template-columns:1fr; }
        .form-field { display:flex; flex-direction:column; gap:.35rem; }
        .form-field.span2 { grid-column:span 2; }
        .form-label { font-size:.72rem; font-weight:500; letter-spacing:.1em; text-transform:uppercase; color:var(--ink-light); }
        .form-input { background:var(--cream); border:1px solid var(--border); border-radius:10px; padding:.65rem .9rem; font-family:'DM Sans',sans-serif; font-size:.9rem; color:var(--ink); outline:none; width:100%; }
        .form-input:focus { border-color:var(--gold); box-shadow:0 0 0 3px rgba(200,132,26,.1); }
        /* Opening hours */
        .oh-row { display:grid; grid-template-columns:110px 1fr 1fr 80px; gap:.75rem; align-items:center; padding:.6rem 0; border-bottom:1px solid var(--border); }
        .oh-row:last-child { border-bottom:none; }
        .oh-day { font-weight:500; font-size:.875rem; color:var(--ink-mid); }
        .oh-input { background:var(--cream); border:1px solid var(--border); border-radius:8px; padding:.45rem .75rem; font-family:'DM Sans',sans-serif; font-size:.85rem; color:var(--ink); outline:none; width:100%; }
        .oh-input:focus { border-color:var(--gold); }
        .oh-input:disabled { opacity:.4; }
        .closed-label { display:flex; align-items:center; gap:.4rem; font-size:.82rem; color:var(--ruby); cursor:pointer; justify-content:flex-end; }
        .closed-label input { accent-color:var(--ruby); width:15px; height:15px; cursor:pointer; }
        /* Actions */
        .action-bar { display:flex; align-items:center; justify-content:space-between; margin-top:1.5rem; flex-wrap:wrap; gap:1rem; }
        .err-box { background:var(--ruby-pale); color:var(--ruby); padding:.75rem 1rem; border-radius:10px; font-size:.85rem; }
        .success-box { background:var(--sage-light); color:var(--sage); padding:.75rem 1rem; border-radius:10px; font-size:.85rem; }
        .btn-save { background:var(--gold); border:none; border-radius:12px; padding:.75rem 2rem; font-family:'DM Sans',sans-serif; font-size:.95rem; font-weight:600; color:white; cursor:pointer; transition:background .15s; }
        .btn-save:hover { background:var(--amber); }
        .btn-save:disabled { opacity:.5; cursor:not-allowed; }
        .spinner { display:inline-block; width:16px; height:16px; border:2px solid rgba(255,255,255,.3); border-top-color:white; border-radius:50%; animation:spin .6s linear infinite; margin-right:.4rem; }
        @keyframes spin { to{transform:rotate(360deg)} }
        @media(max-width:600px) { .form-grid { grid-template-columns:1fr; } .form-field.span2 { grid-column:span 1; } .oh-row { grid-template-columns:90px 1fr 1fr 70px; } }
      `}</style>

      <div className="edit-page">
        <main className="edit-content">
          <Link href="/admin/manage/restaurant" className="back-link">
            <BackIcon /> Back to Restaurants
          </Link>

          <div className="edit-eyebrow">Admin · Edit Restaurant</div>
          <h1 className="edit-title">{form.name ?? "Restaurant"}</h1>

          {/* Basic Info */}
          <div className="section-card">
            <div className="section-title">Basic Information</div>
            <div className="form-grid">
              {[
                { key: "name", label: "Restaurant Name" },
                { key: "category", label: "Category / Cuisine" },
                { key: "location", label: "Location" },
                { key: "province", label: "Province" },
                { key: "tel", label: "Phone Number" },
                { key: "totalTables", label: "Total Tables", type: "number" },
              ].map(({ key, label, type }) => (
                <div key={key} className="form-field">
                  <label className="form-label">{label}</label>
                  <input
                    className="form-input"
                    type={type ?? "text"}
                    value={(form as any)[key] ?? ""}
                    onChange={(e) => setForm({ ...form, [key]: type === "number" ? Number(e.target.value) : e.target.value })}
                  />
                </div>
              ))}
              <div className="form-field span2">
                <label className="form-label">Description</label>
                <textarea
                  className="form-input"
                  rows={4}
                  style={{ resize: "vertical" }}
                  value={form.description ?? ""}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <div className="form-field span2">
                <label className="form-label">Image Path (e.g. /restaurant/my-image.jpg)</label>
                <input
                  className="form-input"
                  value={form.imageSrc ?? form.image ?? ""}
                  onChange={(e) => setForm({ ...form, imageSrc: e.target.value, image: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="section-card">
            <div className="section-title">Opening Hours</div>
            {openingHours.map((h, i) => (
              <div key={h.day} className="oh-row">
                <span className="oh-day">{h.day}</span>
                <input type="time" className="oh-input" value={h.open} disabled={h.closed}
                  onChange={(e) => updateHour(i, "open", e.target.value)} />
                <input type="time" className="oh-input" value={h.close} disabled={h.closed}
                  onChange={(e) => updateHour(i, "close", e.target.value)} />
                <label className="closed-label">
                  <input type="checkbox" checked={h.closed} onChange={(e) => updateHour(i, "closed", e.target.checked)} />
                  Closed
                </label>
              </div>
            ))}
          </div>

          {/* Action bar */}
          <div className="action-bar">
            <div>
              {error && <div className="err-box">{error}</div>}
              {success && <div className="success-box">✓ Restaurant updated successfully</div>}
            </div>
            <button className="btn-save" disabled={saving} onClick={handleSave}>
              {saving && <span className="spinner" />}
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
