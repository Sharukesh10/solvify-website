import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const ROLES = ["Player", "Turf Owner", "Investor", "Collaborator"];
const ROLE_CARDS = [
  { role: "Player", desc: "Book turfs, give feedback, shape QuickTurf." },
  { role: "Turf Owner", desc: "List your turf, fill every slot, grow digitally." },
  { role: "Investor", desc: "Back products solving real Indian problems." },
  { role: "Collaborator", desc: "Build, research, pilot — partner with us." },
];

const InputField = memo(function InputField({ label, name, type = "text", placeholder, inputMode, value, onChange, error }) {
  return (
    <div>
      <label className="block font-body text-white/70 text-sm mb-2" htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete="on"
        spellCheck="false"
        className="w-full bg-brand-card border rounded-xl px-4 py-3 font-body text-white text-sm placeholder-white/25 outline-none transition-all focus:border-brand-green border-brand-border"
      />
      {error && <p className="mt-1.5 font-mono text-red-400 text-xs">{error}</p>}
    </div>
  );
});

export default function Join() {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({
    name: "", email: "", phone: "", city: "",
    role: searchParams.get("role") || "",
    turfName: "", location: "", interest: "", message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [serverMsg, setServerMsg] = useState("");

  useEffect(() => {
    const r = searchParams.get("role");
    if (r) setForm((f) => ({ ...f, role: r }));
  }, [searchParams]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "Valid 10-digit phone required";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.role) e.role = "Please select a role";
    if (form.role === "Turf Owner") {
      if (!form.turfName.trim()) e.turfName = "Turf name is required";
      if (!form.location.trim()) e.location = "Location is required";
    }
    if (form.role === "Investor" && !form.interest.trim()) e.interest = "Please describe your interest";
    return e;
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: "" }));
  }, [errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus("loading");
    try {
      const res = await axios.post("/api/leads", form);
      setServerMsg(res.data.message);
      setStatus("success");
    } catch (err) {
      setServerMsg(err.response?.data?.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <main className="bg-brand-dark min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left info panel */}
          <div className="lg:sticky lg:top-28">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-brand-green" />
              <span className="font-mono text-brand-green text-xs tracking-widest uppercase">Join Solvify</span>
            </div>
            <h1 className="font-display font-black text-6xl sm:text-7xl text-white leading-tight mb-6">
              Be part of<br />
              <span className="text-gradient">the journey.</span>
            </h1>
            <p className="font-body text-white/60 text-base leading-relaxed mb-10">
              Whether you're a sports enthusiast, a turf owner looking to grow, an investor who believes in impact-driven tech, or a builder who wants to co-create — we want to hear from you.
            </p>

            <div className="space-y-4">
              {ROLE_CARDS.map((r) => (
                <button
                  key={r.role}
                  type="button"
                  onClick={() => { setForm((f) => ({ ...f, role: r.role })); setErrors((e) => ({ ...e, role: "" })); }}
                  className={`w-full text-left glass rounded-xl p-4 border transition-all ${form.role === r.role ? "border-brand-green/50 bg-brand-green/5" : "border-brand-border hover:border-white/20"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-brand-green/80" />
                    <div>
                      <div className="font-display font-bold text-white text-sm">{r.role}</div>
                      <div className="font-body text-white/45 text-xs mt-0.5">{r.desc}</div>
                    </div>
                    {form.role === r.role && (
                      <div className="ml-auto w-5 h-5 rounded-full bg-brand-green flex items-center justify-center text-black text-xs font-bold">✓</div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Form panel */}
          <div>
            {status === "success" ? (
              <div className="glass rounded-2xl border border-brand-green/30 p-12 text-center glow">
                <h2 className="font-display font-black text-3xl text-white mb-3">You're in!</h2>
                <p className="font-body text-white/60 text-base mb-8">{serverMsg}</p>
                <button
                  onClick={() => { setStatus("idle"); setForm({ name: "", email: "", phone: "", city: "", role: "", turfName: "", location: "", interest: "", message: "" }); }}
                  className="btn-secondary"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} autoComplete="on" className="glass rounded-2xl border border-brand-border p-8 space-y-5">
                <h2 className="font-display font-bold text-2xl text-white mb-2">Tell us about yourself</h2>
                <p className="font-body text-white/45 text-sm mb-6">lets connect !</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputField label="Full Name *" name="name" placeholder="Rahul Sharma" value={form.name} onChange={handleChange} error={errors.name} />
                  <InputField label="Email Address *" name="email" type="email" placeholder="rahul@example.com" value={form.email} onChange={handleChange} error={errors.email} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputField label="Phone Number *" name="phone" placeholder="9876543210" inputMode="tel" value={form.phone} onChange={handleChange} error={errors.phone} />
                  <InputField label="City *" name="city" placeholder="Hyderabad" value={form.city} onChange={handleChange} error={errors.city} />
                </div>

                {/* Role dropdown */}
                <div>
                  <label className="block font-body text-white/70 text-sm mb-2">I am a... *</label>
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className={`w-full bg-brand-card border rounded-xl px-4 py-3 font-body text-white text-sm outline-none transition-all appearance-none cursor-pointer
                      ${errors.role ? "border-red-500/60" : "border-brand-border focus:border-brand-green"}`}
                  >
                    <option value="" disabled>Select your role</option>
                    {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                  {errors.role && <p className="mt-1.5 font-mono text-red-400 text-xs">{errors.role}</p>}
                </div>

                {/* Conditional: Turf Owner */}
                {form.role === "Turf Owner" && (
                  <div className="glass rounded-xl border border-brand-green/20 p-5 space-y-4 bg-brand-green/[0.03]">
                    <p className="font-mono text-brand-green text-xs tracking-widest uppercase mb-2">Turf Details</p>
                    <InputField label="Turf Name *" name="turfName" placeholder="Green Park Turf" value={form.turfName} onChange={handleChange} error={errors.turfName} />
                    <InputField label="Turf Location *" name="location" placeholder="Banjara Hills, Hyderabad" value={form.location} onChange={handleChange} error={errors.location} />
                  </div>
                )}

                {/* Conditional: Investor */}
                {form.role === "Investor" && (
                  <div className="glass rounded-xl border border-yellow-400/20 p-5 bg-yellow-400/[0.03]">
                    <p className="font-mono text-yellow-400 text-xs tracking-widest uppercase mb-3">Investment Interest</p>
                    <div>
                      <label className="block font-body text-white/70 text-sm mb-2">What interests you? *</label>
                      <textarea
                        name="interest"
                        value={form.interest}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Tell us about your investment thesis or what excites you about Solvify..."
                        className={`w-full bg-brand-card border rounded-xl px-4 py-3 font-body text-white text-sm placeholder-white/25 outline-none transition-all resize-none
                          ${errors.interest ? "border-red-500/60" : "border-brand-border focus:border-yellow-400"}`}
                      />
                      {errors.interest && <p className="mt-1.5 font-mono text-red-400 text-xs">{errors.interest}</p>}
                    </div>
                  </div>
                )}

                {/* Message */}
                <div>
                  <label className="block font-body text-white/70 text-sm mb-2">Message (optional)</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Anything else you'd like us to know..."
                    className="w-full bg-brand-card border border-brand-border focus:border-brand-green rounded-xl px-4 py-3 font-body text-white text-sm placeholder-white/25 outline-none transition-all resize-none"
                  />
                </div>

                {status === "error" && (
                  <div className="glass rounded-xl border border-red-500/30 px-4 py-3 bg-red-500/5">
                    <p className="font-mono text-red-400 text-sm">{serverMsg}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary w-full text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Submitting...
                    </span>
                  ) : "Submit →"}
                </button>

                <p className="font-mono text-brand-muted text-xs text-center">
                  Your data is secure and will only be used to contact you.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
