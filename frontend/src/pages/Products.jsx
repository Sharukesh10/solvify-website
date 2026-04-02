import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import quickturfLogoSrc from "../assets/logos/quickturf.svg";
import stcLogoSrc from "../assets/logos/STC.svg";

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

export default function Products() {
  const location = useLocation();
  const [vanta, setVanta] = useState(null);
  const [ref1, v1] = useReveal();
  const [ref2, v2] = useReveal();
  const [ref3, v3] = useReveal();
  const vantaRef = useRef(null);

  // Lazy-load Vanta WAVES background on the products page container
  useEffect(() => {
    const loadScript = (src) =>
      new Promise((resolve, reject) => {
        const existing = document.querySelector(`script[src="${src}"]`);
        if (existing) return resolve();
        const s = document.createElement("script");
        s.src = src;
        s.async = true;
        s.onload = resolve;
        s.onerror = reject;
        document.body.appendChild(s);
      });

    if (!vanta) {
      Promise.all([
        loadScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"),
        loadScript("https://unpkg.com/vanta@latest/dist/vanta.waves.min.js"),
      ]).then(() => {
        // eslint-disable-next-line no-undef
        const effect = window.VANTA?.WAVES({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x060606,
          shininess: 84.0,
          waveHeight: 29.0,
          waveSpeed: 0.8,
          zoom: 1.27,
        });
        setVanta(effect);
      });
    }

    return () => {
      if (vanta) vanta.destroy();
    };
  }, [vanta]);

  // Scroll to hash target when navigated with #quickturf or #stc
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location]);

  return (
    <main ref={vantaRef} className="bg-brand-dark min-h-screen pt-24 relative overflow-hidden">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-px bg-brand-green" />
          <span className="font-mono text-brand-green text-xs tracking-widest uppercase">
            Our Products
          </span>
          <div className="w-8 h-px bg-brand-green" />
        </div>
        <h1 className="font-display font-black text-6xl sm:text-7xl text-white mb-4">
          Built to <span className="text-gradient">solve</span>
        </h1>
        <p className="font-body text-white/55 text-lg max-w-lg mx-auto">
          Turning complex problems into simple solutions.
        </p>
      </section>

      {/* QuickTurf */}
      <section
        className="section-padding border-y border-brand-border bg-brand-charcoal relative overflow-hidden"
        id="quickturf"
        ref={ref1}
      >

        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 transition-all duration-700 ${v1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-start lg:items-center">
            {/* Left copy */}
            <div className="space-y-6 lg:max-w-xl">
              <div className="inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/25 px-4 py-2 rounded-full">
                <span className="w-2 h-2 rounded-full bg-brand-green" />
                <span className="font-mono text-brand-green text-xs tracking-[0.3em] uppercase">
                  QuickTurf
                </span>
              </div>
              <div className="w-[150px] sm:w-[170px] md:w-[200px]">
                <img
                  src={quickturfLogoSrc}
                  alt="QuickTurf"
                  className="w-full h-auto object-contain"
                />
              </div>

              <div className="space-y-3">
                <p className="font-display font-black text-5xl sm:text-6xl text-white leading-tight">
                  QuickTurf makes it
                </p>
                <p className="font-display font-black text-5xl sm:text-6xl text-gradient leading-tight">
                  instant & effortless
                </p>
              </div>

              <p className="font-body text-white/65 text-lg leading-relaxed max-w-xl">
                A real-time platform giving players complete slot visibility and turf owners a
                fully automated booking system. No calls. No spreadsheets. No chaos.
              </p>

              <div className="space-y-3">
                {[
                  "Real-time slot availability across all turfs",
                  "Book & pay securely in under 60 seconds",
                  "Instant confirmation via SMS & email",
                  "Owners manage everything in one dashboard",
                  "Smart analytics, calendar & no-show protection",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 text-brand-green">{"\u2713"}</span>
                    <span className="font-body text-white/70 text-sm sm:text-base">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <a
                  href="https://quick-turf.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                >
                  Start for Free {"->"}
                </a>
              </div>
            </div>

            {/* Right UI mock */}
            <div className="relative lg:max-w-xl lg:ml-auto">
              <div className="panel noise rounded-3xl p-5 sm:p-7 lg:p-8 bg-brand-dark/80 border border-brand-border shadow-2xl">
                <div className="flex items-center gap-2 text-brand-muted text-sm mb-5">
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-400/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="font-mono text-xs text-white/60">quickturf.in/book</span>
                </div>

                <div className="glass rounded-xl border border-brand-border px-4 py-3 flex items-center gap-3 mb-5">
                  <span className="text-white/70">{"\uD83D\uDD0D"}</span>
                  <input
                    className="bg-transparent flex-1 text-white text-sm outline-none placeholder:text-white/40"
                    placeholder="Banjara Hills, Hyderabad"
                    readOnly
                  />
                  <span className="px-3 py-1.5 rounded-md bg-brand-green/15 text-brand-green font-mono text-xs tracking-wide">
                    Today
                  </span>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      name: "City Sports Arena",
                      sport: "Football \u00b7 5v5",
                      price: "\u20b9600/hr",
                      rating: "4.8",
                      times: ["6am", "7am", "8am", "9am", "10am", "11am", "12pm"],
                      active: "8am",
                      unavailable: ["7am", "10am"],
                    },
                    {
                      name: "ProTurf Nandyal",
                      sport: "Cricket \u00b7 Box",
                      price: "\u20b9800/hr",
                      rating: "4.6",
                      times: ["6am", "7am", "8am", "9am", "10am", "11am", "12pm"],
                      active: "8am",
                      unavailable: ["7am", "10am"],
                    },
                  ].map((card) => (
                    <div key={card.name} className="glass rounded-2xl border border-white/5 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-display text-white text-lg leading-tight">{card.name}</p>
                          <p className="font-body text-white/45 text-sm">{card.sport}</p>
                        </div>
                        <div className="text-right text-brand-green font-display text-lg">{card.price}</div>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {card.times.map((slot) => {
                          const isActive = slot === card.active;
                          const isUnavailable = card.unavailable.includes(slot);
                          return (
                            <span
                              key={slot}
                              className={`px-3 py-1 rounded-md text-xs font-mono border ${isActive
                                ? "bg-brand-green text-black border-transparent"
                                : isUnavailable
                                  ? "bg-red-500/10 text-red-300 border-red-500/30"
                                  : "bg-white/5 text-white/65 border-white/10"
                                }`}
                            >
                              {slot}
                            </span>
                          );
                        })}
                      </div>

                      <div className="mt-4 flex items-center justify-between text-sm text-white/60">
                        <span className="flex items-center gap-2">
                          <span className="text-amber-300">{"\u2605"}</span>
                          {card.rating}
                        </span>
                        <span className="font-mono text-xs text-white/45">Updated just now</span>
                      </div>
                    </div>
                  ))}

                  <div className="rounded-2xl border border-brand-green/40 bg-brand-green/10 px-5 py-4 flex items-start gap-3">
                    <span className="text-brand-green mt-0.5">{"\u2714"}</span>
                    <div className="flex-1">
                      <p className="font-display text-brand-green text-base">Booking Confirmed - 8:00 AM</p>
                      <p className="font-mono text-white/60 text-xs">City Sports Arena - Ref #QT-0042</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STC */}
      <section className="section-padding" ref={ref2} id="stc">
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 transition-all duration-700 ${v2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-start lg:items-center">
            {/* Left copy (text) */}
            <div className="space-y-6 lg:max-w-xl">
              <div className="inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/20 px-4 py-2 rounded-full">
                <span className="w-2 h-2 rounded-full bg-brand-green" />
                <span className="font-mono text-brand-green text-xs tracking-widest uppercase">Product 02</span>
              </div>
              <div className="w-[150px] sm:w-[170px] md:w-[200px]">
                <img src={stcLogoSrc} alt="STC" className="w-full h-auto object-contain" />
              </div>
              <p className="font-body text-white/65 text-lg leading-relaxed max-w-xl">
                Solar-charged shared e-cycles for campuses and communities. Unlock with QR, ride anywhere inside the hub, and return without worrying about range or emissions.
              </p>

              <div className="space-y-3">
                {[
                  "100% solar charging - zero electricity cost",
                  "Optimized for campuses, hostels, and gated communities",
                  "QR-based unlock, live ride tracking, and anti-theft",
                  "Predictive maintenance + swap-ready batteries",
                  "Per-ride or subscription pricing with no hidden fees",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 text-brand-green">{"\u2713"}</span>
                    <span className="font-body text-white/70 text-sm sm:text-base">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link to="/join?role=Collaborator" className="btn-primary">
                  Partner for STC {"->"}
                </Link>
              </div>
            </div>

            {/* Right UI mock */}
            <div className="relative lg:max-w-xl lg:ml-auto">
              <div className="panel noise rounded-3xl p-5 sm:p-7 lg:p-8 bg-brand-dark/80 border border-brand-border shadow-2xl">
                <div className="flex items-center gap-2 text-brand-muted text-sm mb-5">
                  <span className="w-2 h-2 rounded-full bg-brand-green" />
                  <span className="font-mono text-xs text-white/60">stc.solvify.in/dashboard</span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-5">
                  {[
                    { val: "24", label: "Cycles Active" },
                    { val: "0g", label: "CO2 Emitted" },
                    { val: "100%", label: "Solar" },
                  ].map((s) => (
                    <div key={s.label} className="glass rounded-xl border border-white/5 px-4 py-3 text-center">
                      <div className="font-display text-white text-xl">{s.val}</div>
                      <div className="font-mono text-brand-green text-xs mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  {[
                    { hub: "Campus Hub A", available: 6 },
                    { hub: "Campus Hub B", available: 3 },
                    { hub: "Campus Hub C", available: 5 },
                  ].map((h) => (
                    <div key={h.hub} className="glass rounded-2xl border border-white/5 px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-brand-green" />
                        <div>
                          <p className="font-display text-white text-sm">{h.hub}</p>
                          <p className="font-body text-white/50 text-xs">Live docking | 24/7 access</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-md bg-brand-green/15 text-brand-green font-mono text-xs">
                        {h.available} available
                      </span>
                    </div>
                  ))}

                  <div className="rounded-2xl border border-brand-green/40 bg-brand-green/10 px-5 py-4 flex items-start gap-3">
                    <span className="text-brand-green mt-0.5">{"\u2714"}</span>
                    <div className="flex-1">
                      <p className="font-display text-brand-green text-base">Ride Confirmed — 8:10 AM</p>
                      <p className="font-mono text-white/60 text-xs">Hub B · Cycle #STC-142 · Battery 86%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section-padding bg-brand-charcoal border-t border-brand-border" ref={ref3}>
        <div
          className={`max-w-4xl mx-auto px-4 sm:px-6 text-center transition-all duration-700 ${v3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <h2 className="font-display font-black text-5xl sm:text-6xl text-white mb-4">
            Ready to <span className="text-gradient">get started?</span>
          </h2>
          <p className="font-body text-white/55 text-lg mb-8 max-w-md mx-auto">
            Be part of the solutions we’re building.
          </p>
          <Link to="/join" className="btn-primary text-base px-10 py-4">
            Join Solvify {"->"}
          </Link>
        </div>
      </section>
    </main>
  );
}
