import { useState, useEffect, useRef } from "react";
import axios from "axios";

const ADMIN_PASS = "solvify@admin2024"; // In production, use JWT auth

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwErr, setPwErr] = useState("");

  const [activeTab, setActiveTab] = useState("leads");
  const [leads, setLeads] = useState([]);
  const [media, setMedia] = useState([]);
  const [leadsTotal, setLeadsTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({ role: "", city: "" });

  // Upload state
  const [uploadType, setUploadType] = useState("partner");
  const [uploadLabel, setUploadLabel] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");
  const fileRef = useRef(null);

  const login = () => {
    if (pw === ADMIN_PASS) { setAuthed(true); setPwErr(""); }
    else setPwErr("Incorrect password.");
  };

  useEffect(() => {
    if (!authed) return;
    fetchLeads();
    fetchMedia();
  }, [authed]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const apiBase = import.meta.env.VITE_API_URL || "";
      const params = {};
      if (filter.role) params.role = filter.role;
      if (filter.city) params.city = filter.city;
      const res = await axios.get(`${apiBase}/api/leads`, { params });
      setLeads(res.data.leads || []);
      setLeadsTotal(res.data.total || 0);
    } catch {
      setLeads([]);
    }
    setLoading(false);
  };

  const fetchMedia = async () => {
    try {
      const apiBase = import.meta.env.VITE_API_URL || "";
      const res = await axios.get(`${apiBase}/api/media`);
      setMedia(res.data.data || []);
    } catch { setMedia([]); }
  };

  const deleteLead = async (id) => {
    if (!window.confirm("Delete this lead?")) return;
    const apiBase = import.meta.env.VITE_API_URL || "";
    await axios.delete(`${apiBase}/api/leads/${id}`);
    fetchLeads();
  };

  const deleteMedia = async (id) => {
    if (!window.confirm("Delete this media?")) return;
    const apiBase = import.meta.env.VITE_API_URL || "";
    await axios.delete(`${apiBase}/api/media/${id}`);
    fetchMedia();
  };

  const handleUpload = async () => {
    if (!uploadFile) { setUploadMsg("Please select a file."); return; }
    setUploading(true); setUploadMsg("");
    const fd = new FormData();
    fd.append("image", uploadFile);
    fd.append("type", uploadType);
    fd.append("label", uploadLabel);
    try {
      const apiBase = import.meta.env.VITE_API_URL || "";
      await axios.post(`${apiBase}/api/media/upload`, fd, { headers: { "Content-Type": "multipart/form-data" } });
      setUploadMsg("✅ Uploaded successfully!");
      setUploadFile(null); setUploadLabel("");
      if (fileRef.current) fileRef.current.value = "";
      fetchMedia();
    } catch {
      setUploadMsg("❌ Upload failed. Try again.");
    }
    setUploading(false);
  };

  const ROLE_COLORS = {
    Player: "bg-brand-green/15 text-brand-green",
    "Turf Owner": "bg-blue-400/15 text-blue-400",
    Investor: "bg-yellow-400/15 text-yellow-400",
    Collaborator: "bg-purple-400/15 text-purple-400",
    Student: "bg-orange-400/15 text-orange-400",
  };

  if (!authed) return (
    <main className="bg-brand-dark min-h-screen pt-24 flex items-center justify-center px-4">
      <div className="glass rounded-2xl border border-brand-border p-10 w-full max-w-sm text-center">
        <div className="w-12 h-12 rounded-xl bg-brand-green flex items-center justify-center font-display font-black text-black text-2xl mx-auto mb-6">S</div>
        <h1 className="font-display font-bold text-2xl text-white mb-1">Admin Panel</h1>
        <p className="font-body text-white/45 text-sm mb-8">Solvify Technologies</p>
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && login()}
          placeholder="Enter admin password"
          className="w-full bg-brand-card border border-brand-border focus:border-brand-green rounded-xl px-4 py-3 font-body text-white text-sm placeholder-white/25 outline-none transition-all mb-3"
        />
        {pwErr && <p className="font-mono text-red-400 text-xs mb-3">{pwErr}</p>}
        <button onClick={login} className="btn-primary w-full">Login →</button>
      </div>
    </main>
  );

  const TABS = [
    { id: "leads", label: `Leads (${leadsTotal})` },
    { id: "media", label: `Media (${media.length})` },
    { id: "upload", label: "Upload" },
  ];

  return (
    <main className="bg-brand-dark min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-black text-3xl text-white">Admin Panel</h1>
            <p className="font-body text-brand-muted text-sm mt-1">Solvify Technologies Pvt. Ltd.</p>
          </div>
          <button onClick={() => setAuthed(false)} className="btn-secondary text-sm py-2 px-4">Logout</button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Leads", val: leadsTotal, color: "text-brand-green" },
            { label: "Players", val: leads.filter(l => l.role === "Player").length, color: "text-brand-green" },
            { label: "Turf Owners", val: leads.filter(l => l.role === "Turf Owner").length, color: "text-blue-400" },
            { label: "Investors", val: leads.filter(l => l.role === "Investor").length, color: "text-yellow-400" },
            { label: "Students", val: leads.filter(l => l.role === "Student").length, color: "text-orange-400" },
          ].map((s) => (
            <div key={s.label} className="glass rounded-xl p-5 border border-brand-border">
              <div className={`font-display font-black text-3xl ${s.color} mb-1`}>{s.val}</div>
              <div className="font-body text-white/45 text-xs">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 glass rounded-xl p-1 border border-brand-border mb-8 w-fit">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-5 py-2.5 rounded-lg font-body font-medium text-sm transition-all ${activeTab === t.id ? "bg-brand-green text-black font-bold" : "text-white/60 hover:text-white"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* LEADS TAB */}
        {activeTab === "leads" && (
          <div>
            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
              <select
                value={filter.role}
                onChange={(e) => setFilter((f) => ({ ...f, role: e.target.value }))}
                className="bg-brand-card border border-brand-border rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-brand-green"
              >
                <option value="">All Roles</option>
                {["Player", "Turf Owner", "Investor", "Collaborator", "Student"].map((r) => <option key={r}>{r}</option>)}
              </select>
              <input
                type="text"
                placeholder="Filter by city..."
                value={filter.city}
                onChange={(e) => setFilter((f) => ({ ...f, city: e.target.value }))}
                className="bg-brand-card border border-brand-border rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-brand-green placeholder-white/30"
              />
              <button onClick={fetchLeads} className="btn-primary text-sm py-2 px-4">Filter</button>
              <button onClick={() => { setFilter({ role: "", city: "" }); setTimeout(fetchLeads, 100); }} className="btn-secondary text-sm py-2 px-4">Reset</button>
            </div>

            {loading ? (
              <div className="text-center py-16 font-mono text-brand-muted text-sm">Loading leads...</div>
            ) : leads.length === 0 ? (
              <div className="text-center py-16 font-mono text-brand-muted text-sm">No leads found.</div>
            ) : (
              <div className="space-y-3">
                {leads.map((lead) => (
                  <div key={lead._id} className="glass rounded-xl border border-brand-border p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <div className="font-display font-bold text-white text-sm">{lead.name}</div>
                        <div className="font-body text-white/45 text-xs mt-0.5">{lead.city}</div>
                      </div>
                      <div>
                        <div className="font-body text-white/70 text-xs truncate">{lead.email}</div>
                        <div className="font-mono text-white/40 text-xs">{lead.phone}</div>
                      </div>
                      <div className="flex items-start">
                        <span className={`font-mono text-xs px-2 py-1 rounded-full ${ROLE_COLORS[lead.role] || "bg-white/10 text-white"}`}>
                          {lead.role}
                        </span>
                      </div>
                      <div>
                        {lead.turfName && <div className="font-body text-white/50 text-xs">🏟️ {lead.turfName}</div>}
                        {lead.interest && <div className="font-body text-white/50 text-xs truncate">💼 {lead.interest.slice(0, 40)}...</div>}
                        <div className="font-mono text-white/30 text-xs mt-1">{new Date(lead.createdAt).toLocaleDateString("en-IN")}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteLead(lead._id)}
                      className="text-red-400 hover:text-red-300 font-mono text-xs border border-red-400/20 hover:border-red-400/40 px-3 py-1.5 rounded-lg transition-all"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* MEDIA TAB */}
        {activeTab === "media" && (
          <div>
            {media.length === 0 ? (
              <div className="text-center py-16 font-mono text-brand-muted text-sm">No media uploaded yet. Use the Upload tab.</div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {media.map((m) => (
                  <div key={m._id} className="glass rounded-xl border border-brand-border overflow-hidden group">
                    <div className="aspect-video bg-brand-charcoal flex items-center justify-center overflow-hidden">
                      <img src={m.imageUrl} alt={m.label || m.type} className="w-full h-full object-contain" />
                    </div>
                    <div className="p-3">
                      <div className="font-mono text-xs text-brand-green mb-0.5 uppercase">{m.type}</div>
                      {m.label && <div className="font-body text-white/60 text-xs truncate">{m.label}</div>}
                      <button
                        onClick={() => deleteMedia(m._id)}
                        className="mt-2 text-red-400 font-mono text-xs hover:text-red-300 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* UPLOAD TAB */}
        {activeTab === "upload" && (
          <div className="max-w-lg">
            <div className="glass rounded-2xl border border-brand-border p-8 space-y-5">
              <h2 className="font-display font-bold text-xl text-white">Upload Media</h2>

              <div>
                <label className="block font-body text-white/70 text-sm mb-2">Media Type</label>
                <select
                  value={uploadType}
                  onChange={(e) => setUploadType(e.target.value)}
                  className="w-full bg-brand-card border border-brand-border focus:border-brand-green rounded-xl px-4 py-3 font-body text-white text-sm outline-none"
                >
                  <option value="partner">Partner Logo</option>
                  <option value="logo">Company Logo</option>
                  <option value="solvify">Solvify Logo</option>
                  <option value="quickturf">QuickTurf Logo</option>
                  <option value="stc">STC Logo</option>
                  <option value="turf">Turf Image</option>
                  <option value="product">Product Visual</option>
                </select>
              </div>

              <div>
                <label className="block font-body text-white/70 text-sm mb-2">Label (optional)</label>
                <input
                  type="text"
                  value={uploadLabel}
                  onChange={(e) => setUploadLabel(e.target.value)}
                  placeholder="e.g. Partner Company Name, Turf Name..."
                  className="w-full bg-brand-card border border-brand-border focus:border-brand-green rounded-xl px-4 py-3 font-body text-white text-sm placeholder-white/25 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block font-body text-white/70 text-sm mb-2">Image File (JPG, PNG, SVG — max 5MB)</label>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileRef}
                  onChange={(e) => setUploadFile(e.target.files[0])}
                  className="w-full bg-brand-card border border-brand-border rounded-xl px-4 py-3 font-body text-white/60 text-sm outline-none cursor-pointer file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-mono file:bg-brand-green file:text-black hover:file:bg-green-400 transition-all"
                />
              </div>

              {uploadMsg && (
                <p className={`font-mono text-sm ${uploadMsg.startsWith("✅") ? "text-brand-green" : "text-red-400"}`}>{uploadMsg}</p>
              )}

              <button
                onClick={handleUpload}
                disabled={uploading}
                className="btn-primary w-full py-3 disabled:opacity-60"
              >
                {uploading ? "Uploading..." : "Upload Image →"}
              </button>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
