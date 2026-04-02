import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import solvifyLogoSrc from "../assets/logos/solvify.svg";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/join", label: "Join Us" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-white/5 py-3" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group h-12">
          <img src={solvifyLogoSrc} alt="Solvify Technologies" className="w-[150px] h-12 object-cover object-center transition-transform group-hover:scale-105" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-4 py-2 rounded-lg font-body font-medium text-sm transition-all ${
                location.pathname === l.to
                  ? "text-brand-green bg-brand-green/10"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/join" className="btn-primary text-sm py-2.5 px-5">
            Partner With Us →
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-white/5 px-4 py-4 flex flex-col gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-4 py-3 rounded-lg font-body font-medium text-sm transition-all ${
                location.pathname === l.to
                  ? "text-brand-green bg-brand-green/10"
                  : "text-white/70"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/join" className="btn-primary text-sm mt-2">
            Partner With Us →
          </Link>
        </div>
      )}
    </header>
  );
}
