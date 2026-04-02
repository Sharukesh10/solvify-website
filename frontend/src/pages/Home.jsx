import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import WAVES from "vanta/dist/vanta.waves.min";
import { Link } from "react-router-dom";

import { Reveal, TextReveal } from "../components/Reveal";
import Tilt from "react-parallax-tilt";
import quickturfLogoSrc from "../assets/logos/quickturf.svg";
import stcLogoSrc from "../assets/logos/stc.svg";
import cseDsLogoSrc from "../assets/logos/cse-ds.svg";
import aicSkuLogoSrc from "../assets/logos/aic-sku.svg";

// Intersection observer hook
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// Animated counter
function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useReveal(0.3);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Home() {
  const [heroRef, heroVisible] = useReveal(0.1);
  const [aboutRef, aboutVisible] = useReveal(0.15);
  const [productsRef, productsVisible] = useReveal(0.15);
  const [howRef, howVisible] = useReveal(0.15);
  const [impactRef, impactVisible] = useReveal(0.15);
  const [partnersRef, partnersVisible] = useReveal(0.15);
  const [ctaRef, ctaVisible] = useReveal(0.2);
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current && window.VANTA) {
      setVantaEffect(window.VANTA.WAVES({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0xe0e0e,
        shininess: 115.00,
        waveHeight: 20.50,
        waveSpeed: 0.95,
        zoom: 1.25
      }));
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    }
  }, [vantaEffect]);

  const productsVantaRef = useRef(null);
  const [productsVantaEffect, setProductsVantaEffect] = useState(null);

  useEffect(() => {
    if (!productsVantaEffect && productsVantaRef.current && window.VANTA && window.VANTA.NET) {
      setProductsVantaEffect(window.VANTA.NET({
        el: productsVantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0xffffff,
        backgroundColor: 0x0,
        maxDistance: 24.00,
        spacing: 17.00
      }));
    }
    return () => {
      if (productsVantaEffect) productsVantaEffect.destroy();
    }
  }, [productsVantaEffect]);



  return (
    <main className="bg-brand-dark min-h-screen">

      {/* HERO */}
      <section
        ref={vantaRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      >

        {/* Radial glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="w-[800px] h-[800px] rounded-full bg-brand-green/10 blur-[120px]" />
        </div>

        {/* Floating Design Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Subtle grid lines */}
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-brand-green/20 to-transparent opacity-40" />
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-brand-green/20 to-transparent opacity-40" />
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-green/10 to-transparent opacity-40" />

          {/* Floating nodes */}
          <div className="absolute top-[25%] left-[15%] w-2 h-2 rounded-full bg-brand-green shadow-[0_0_15px_#1DB954] animate-float" style={{ animationDelay: '0ms' }} />
          <div className="absolute bottom-[25%] right-[18%] w-3 h-3 rounded-full bg-brand-green shadow-[0_0_20px_#1DB954] animate-float" style={{ animationDelay: '1000ms' }} />
          <div className="absolute top-[65%] left-[10%] w-1.5 h-1.5 rounded-full bg-white/50 animate-float" style={{ animationDelay: '2000ms' }} />
          <div className="absolute top-[30%] right-[10%] w-1 h-1 rounded-full bg-white/30 animate-pulse2" />
        </div>

        <div ref={heroRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex flex-col gap-8 items-center">
            {/* Badge */}
            <div className={`transition-all duration-1000 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <span className="inline-block px-4 py-1.5 rounded-full bg-brand-green/10 border border-brand-green/20 font-mono text-brand-green text-sm tracking-[0.15em] uppercase font-semibold">Registered Company · India</span>
            </div>

            <div className={`flex flex-col gap-6 transition-all duration-1000 delay-200 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <h1 className="font-display font-black text-6xl sm:text-7xl md:text-[6rem] lg:text-[7.5rem] text-white leading-[1.05] tracking-tight">
                Solvify Technologies <br className="hidden md:block" /> Pvt. Ltd.
              </h1>
              <p className="font-body text-xl sm:text-2xl md:text-3xl text-white/70 max-w-4xl mx-auto leading-relaxed font-medium">
                Building simple solutions for real-world problems - one intelligent product at a time.
              </p>
            </div>

            <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <Link to="/products" className="btn-primary text-base px-8 py-4 w-full sm:w-auto">
                Explore Products →
              </Link>
              <Link to="/join" className="btn-secondary text-base px-8 py-4 w-full sm:w-auto">
                Partner With Us
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* ABOUT */}
      <section className="section-padding bg-brand-dark relative z-10">
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-px bg-brand-green" />
              <span className="font-mono text-brand-green text-sm tracking-widest uppercase font-semibold">About Us</span>
            </div>
          </Reveal>

          <TextReveal className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] text-white leading-[1.1] mb-16 tracking-tight max-w-5xl">
            We simplify what's unnecessarily complex.
          </TextReveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">
            <div className="md:col-span-7">
              <Reveal delay={0.2}>
                <p className="font-body text-white/90 text-2xl sm:text-3xl leading-relaxed mb-10 font-medium">
                  Solvify Technologies Pvt. Ltd. is a product-based technology company on a mission to build scalable digital solutions that make everyday services more accessible, efficient, and sustainable.
                </p>
                <p className="font-body text-white/50 text-xl sm:text-2xl leading-relaxed">
                  We identify frictions people face daily - in sports, mobility, and beyond - and replace them with clean, intelligent software. We're not building for enterprise boardrooms. We're building for real people with real problems.
                </p>
              </Reveal>
            </div>

            <div className="md:col-span-5 flex flex-col gap-6">
              {[
                { label: "Upcoming Products", value: 2, suffix: "+" },
                { label: "Team Members", value: 5, suffix: "+" },
              ].map((stat, i) => (
                <Reveal key={stat.label} delay={0.3 + (i * 0.1)}>
                  <div className="glass p-8 rounded-2xl border border-white/5 flex flex-row-reverse justify-between items-center group hover:bg-white/5 transition-all duration-500 hover:border-brand-green/30">
                    <span className="font-display font-black text-4xl sm:text-5xl text-brand-green">
                      <Counter target={stat.value} suffix={stat.suffix} />
                    </span>
                    <span className="font-body text-white/60 text-xl font-medium group-hover:text-white transition-colors duration-500">{stat.label}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="section-padding bg-brand-charcoal border-y border-brand-border relative overflow-hidden" ref={productsRef}>
        <div ref={productsVantaRef} className="absolute inset-0 z-0 pointer-events-none opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className={`text-center mb-16 transition-all duration-700 ${productsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-brand-green" />
              <span className="font-mono text-brand-green text-xs tracking-widest uppercase">Our Products</span>
              <div className="w-8 h-px bg-brand-green" />
            </div>
            <h2 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight leading-[1.1] text-white mb-6">
              Solutions built for <span className="text-gradient">the real world</span>
            </h2>
          </div>

          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 transition-all duration-700 delay-200 ${productsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {/* QuickTurf */}
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2000} className="panel p-8 overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/10 rounded-full blur-[80px] translate-x-12 -translate-y-12 group-hover:bg-brand-green/20 transition-all duration-700" />
              <div className="relative">
                <div className="flex items-center gap-4 mb-8">
                  <img src={quickturfLogoSrc} alt="QuickTurf" className="w-14 h-14 rounded-2xl object-contain shadow-xl" />
                  <div>
                    <h3 className="font-display font-black text-3xl text-white">QuickTurf</h3>
                    <p className="font-mono text-brand-green text-sm tracking-wide mt-1">Find. Book. Play.</p>
                  </div>
                </div>
                <p className="font-body text-white/70 text-lg leading-relaxed mb-8 font-medium">
                  Instant sports turf booking - no calls, no hassle. Players find and book available slots in seconds. Turf owners fill every slot and manage their business from one dashboard.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {["Players", "Turf Owners", "Real-Time Slots", "Analytics"].map((tag) => (
                    <span key={tag} className="font-mono text-xs text-white/70 bg-white/5 px-4 py-2.5 rounded-xl border border-white/10 text-center font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link to="/products" className="btn-primary w-full sm:w-auto text-base py-3 px-8 inline-flex">
                  Explore Platform →
                </Link>
              </div>
            </Tilt>

            {/* STC */}
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2000} className="panel p-8 overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/10 rounded-full blur-[80px] translate-x-12 -translate-y-12 group-hover:bg-brand-green/20 transition-all duration-700" />
              <div className="relative">
                <div className="flex items-center gap-4 mb-8">
                  <img src={stcLogoSrc} alt="STC" className="w-14 h-14 rounded-2xl object-contain shadow-xl" />
                  <div>
                    <h3 className="font-display font-black text-3xl text-white">STC</h3>
                    <p className="font-mono text-brand-green text-sm tracking-wide mt-1">Unlock. Ride. Return.</p>
                  </div>
                </div>
                <p className="font-body text-white/70 text-lg leading-relaxed mb-8 font-medium">
                  Solar-powered e-cycle sharing for campuses and communities. Designed for short-distance travel with zero carbon footprint - sustainable, affordable, and always available.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {["Solar Powered", "Campus Ready", "Eco-friendly", "Affordable"].map((tag) => (
                    <span key={tag} className="font-mono text-xs text-white/70 bg-white/5 px-4 py-2.5 rounded-xl border border-white/10 text-center font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link to="/products" className="btn-secondary w-full sm:w-auto text-base py-3 px-8 inline-flex">
                  Explore Platform →
                </Link>
              </div>
            </Tilt>
          </div>
        </div>
      </section>

      {/* HOW WE BUILD */}
      <section className="section-padding max-w-7xl mx-auto px-4 sm:px-6" ref={howRef}>
        <div className={`transition-all duration-700 ${howVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-brand-green" />
              <span className="font-mono text-brand-green text-xs tracking-widest uppercase">Our Approach</span>
              <div className="w-8 h-px bg-brand-green" />
            </div>
            <h2 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight leading-[1.1] text-white mb-6">
              How we <span className="text-gradient">build</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                icon: (
                  <div className="w-12 h-12 rounded-xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center mb-4">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1DB954" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </div>
                ),
                title: "Identify Real Problems",
                desc: "We go to the ground. We talk to users, observe workflows, and map frictions that matter - not problems invented in a boardroom.",
              },
              {
                step: "02",
                icon: (
                  <div className="w-12 h-12 rounded-xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center mb-4">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1DB954" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 3H5v10l7 7 7-7V3h-4" /><path d="M9 3h6" /><path d="M9 12h6" />
                    </svg>
                  </div>
                ),
                title: "Validate Through Pilots",
                desc: "Before scaling anything, we run lean pilot programs that test our assumptions. Real data, real users, real insights.",
              },
              {
                step: "03",
                icon: (
                  <div className="w-12 h-12 rounded-xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center mb-4">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1DB954" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  </div>
                ),
                title: "Scale What Works",
                desc: "Once a solution proves its value, we build it right - scalable architecture, clean UX, and infrastructure ready for growth.",
              },
            ].map((item, i) => (
              <div
                key={item.step}
                className="glass rounded-2xl p-8 border border-brand-border relative overflow-hidden card-hover"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="absolute top-4 right-4 font-mono text-6xl font-black text-white/[0.03]">
                  {item.step}
                </div>
                {item.icon}
                <div className="font-mono text-brand-green text-xs mb-2 tracking-widest uppercase">{item.step}</div>
                <h3 className="font-display font-bold text-xl text-white mb-3">{item.title}</h3>
                <p className="font-body text-white/55 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="section-padding bg-brand-charcoal border-y border-brand-border" ref={impactRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className={`transition-all duration-700 ${impactVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-px bg-brand-green" />
                <span className="font-mono text-brand-green text-xs tracking-widest uppercase">Impact</span>
                <div className="w-8 h-px bg-brand-green" />
              </div>
              <h2 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight leading-[1.1] text-white mb-6">
                Problems we're <span className="text-gradient">solving</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: (
                    <div className="w-12 h-12 rounded-xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center mb-5">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1DB954" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
                      </svg>
                    </div>
                  ),
                  title: "Sports Booking Inefficiency",
                  desc: "Thousands of turf slots go unfilled every day because booking still relies on phone calls. QuickTurf fixes this with real-time digital availability.",
                  metric: "Hours saved per week per turf owner",
                },
                {
                  icon: (
                    <div className="w-12 h-12 rounded-xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center mb-5">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1DB954" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" /><path d="M12 6v6l4 2" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
                      </svg>
                    </div>
                  ),
                  title: "Last-Mile Mobility Gaps",
                  desc: "Short distances on campuses are either walked or ridden in polluting vehicles. STC provides a clean, convenient alternative.",
                  metric: "Zero-emission rides enabled",
                },
                {
                  icon: (
                    <div className="w-12 h-12 rounded-xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center mb-5">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1DB954" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
                      </svg>
                    </div>
                  ),
                  title: "Scalable Digital Infrastructure",
                  desc: "Both products are architected for scale - ready to grow across cities, institutions, and markets without compromising reliability.",
                  metric: "Built for the next 10x",
                },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className="glass rounded-2xl p-8 border border-brand-border card-hover"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {item.icon}
                  <h3 className="font-display font-bold text-xl text-white mb-3">{item.title}</h3>
                  <p className="font-body text-white/55 text-sm leading-relaxed mb-6">{item.desc}</p>
                  <div className="border-t border-brand-border pt-4">
                    <span className="font-mono text-brand-green text-xs">{item.metric}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERS & EARLY SUPPORTERS */}
      <section className="section-padding bg-brand-dark border-y border-brand-border" ref={partnersRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Section header — matches screenshot style */}
          <div className={`text-center mb-14 transition-all duration-700 ${partnersVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex items-center justify-center gap-4">
              <div className="flex-1 max-w-[120px] h-px bg-gradient-to-r from-transparent to-brand-green/60" />
              <span className="font-mono text-brand-green text-xs tracking-[0.25em] uppercase font-semibold whitespace-nowrap">
                Partners &amp; Early Supporters
              </span>
              <div className="flex-1 max-w-[120px] h-px bg-gradient-to-l from-transparent to-brand-green/60" />
            </div>
                   {/* Logo cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">

            {/* Partner 1: CSE(DS) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={partnersVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center"
            >
              <Tilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                scale={1.1}
                transitionSpeed={2500}
              >
                <div className="group relative flex items-center justify-center p-8">
                  {/* Localized Glow Behind Logo on Hover */}
                  <div className="absolute inset-0 bg-brand-green/25 blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 150, damping: 12 }}
                    src={cseDsLogoSrc}
                    alt="CSE Data Science Department"
                    className="relative max-h-[220px] max-w-full object-contain grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 group-hover:drop-shadow-[0_0_45px_rgba(29,185,84,0.5)] transition-all duration-700 ease-in-out"
                  />
                </div>
              </Tilt>
            </motion.div>

            {/* Partner 2: AIC-SKU */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={partnersVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center"
            >
              <Tilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                scale={1.1}
                transitionSpeed={2500}
              >
                <div className="group relative flex items-center justify-center p-8">
                  {/* Localized Glow Behind Logo on Hover */}
                  <div className="absolute inset-0 bg-brand-green/25 blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 150, damping: 12 }}
                    src={aicSkuLogoSrc}
                    alt="AIC SKU – Startup & Scaleup"
                    className="relative max-h-[220px] max-w-full object-contain grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 group-hover:drop-shadow-[0_0_45px_rgba(29,185,84,0.5)] transition-all duration-700 ease-in-out"
                  />
                </div>
              </Tilt>
            </motion.div>     </div>


          </div>

          {/* Sub-label */}
          <p className={`text-center font-mono text-white/20 text-xs tracking-widest mt-10 transition-all duration-700 delay-300 ${partnersVisible ? "opacity-100" : "opacity-0"}`}>
            Backed by institutions that believe in impact-first technology.
          </p>

        </div>
      </section>

      {/* CTA */}
      <section className="section-padding" ref={ctaRef}>
        <div className={`max-w-4xl mx-auto px-4 sm:px-6 text-center transition-all duration-700 ${ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="relative glass rounded-3xl border border-brand-green/20 p-12 sm:p-16 overflow-hidden glow">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-green/5 to-transparent pointer-events-none" />
            <div className="relative">
              <span className="font-mono text-brand-green text-xs tracking-widest uppercase mb-4 block">Join the Journey</span>
              <h2 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight leading-[1.1] text-white mb-6">
                Be part of <span className="text-gradient">Solvify</span>
              </h2>
              <p className="font-body text-white/60 text-lg mb-10 max-w-lg mx-auto">
                Whether you're a player, turf owner, investor, or builder - there's a place for you in our ecosystem.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/join" className="btn-primary text-base px-10 py-4 w-full sm:w-auto">
                  Join Solvify →
                </Link>
                <Link to="/products" className="btn-secondary text-base px-10 py-4 w-full sm:w-auto">
                  View Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
