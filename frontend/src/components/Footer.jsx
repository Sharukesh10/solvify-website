import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-border bg-brand-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-brand-green flex items-center justify-center font-display font-black text-black text-lg">
                S
              </div>
              <div>
                <span className="font-display font-bold text-white text-base leading-none block">Solvify Technologies</span>
                <span className="font-body text-brand-muted text-[10px] leading-none tracking-wider uppercase">Pvt. Ltd.</span>
              </div>
            </div>
            <p className="font-body text-brand-muted text-sm leading-relaxed max-w-xs">
              Building simple, intelligent digital solutions that solve real-world problems at scale.
            </p>
            <div className="mt-6 space-y-2">
              <a href="mailto:solvifytechpvtltd@gmail.com" className="block text-brand-muted hover:text-brand-green text-sm font-body transition-colors">
                solvifytechpvtltd@gmail.com
              </a>
              <span className="block text-brand-muted text-sm font-body">+91 7013256858</span>
              <a
                href="https://www.instagram.com/eternal.unite?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-green transition-colors text-sm font-body"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm5.9-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM12 2c3 0 3.4 0 4.6.1 1.2.1 2 .2 2.7.5.7.3 1.3.6 1.9 1.2.6.6.9 1.2 1.2 1.9.3.7.4 1.5.5 2.7.1 1.2.1 1.6.1 4.6s0 3.4-.1 4.6c-.1 1.2-.2 2-.5 2.7-.3.7-.6 1.3-1.2 1.9-.6.6-1.2.9-1.9 1.2-.7.3-1.5.4-2.7.5-1.2.1-1.6.1-4.6.1s-3.4 0-4.6-.1c-1.2-.1-2-.2-2.7-.5a4.9 4.9 0 0 1-1.9-1.2 4.9 4.9 0 0 1-1.2-1.9c-.3-.7-.4-1.5-.5-2.7C2 15.4 2 15 2 12s0-3.4.1-4.6c.1-1.2.2-2 .5-2.7.3-.7.6-1.3 1.2-1.9.6-.6 1.2-.9 1.9-1.2.7-.3 1.5-.4 2.7-.5C8.6 2 9 2 12 2Zm0 1.6c-3 0-3.3 0-4.5.1-.9.1-1.4.2-1.8.4-.5.2-.8.4-1.2.8-.4.4-.6.7-.8 1.2-.2.4-.3.9-.4 1.8-.1 1.2-.1 1.5-.1 4.5s0 3.3.1 4.5c.1.9.2 1.4.4 1.8.2.5.4.8.8 1.2.4.4.7.6 1.2.8.4.2.9.3 1.8.4 1.2.1 1.5.1 4.5.1s3.3 0 4.5-.1c.9-.1 1.4-.2 1.8-.4.5-.2.8-.4 1.2-.8.4-.4.6-.7.8-1.2.2-.4.3-.9.4-1.8.1-1.2.1-1.5.1-4.5s0-3.3-.1-4.5c-.1-.9-.2-1.4-.4-1.8-.2-.5-.4-.8-.8-1.2-.4-.4-.7-.6-1.2-.8-.4-.2-.9-.3-1.8-.4-1.2-.1-1.5-.1-4.5-.1Z" />
                </svg>
                Instagram
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-display font-bold text-white text-sm mb-4 tracking-wide uppercase">Products</h4>
            <ul className="space-y-3">
              {[
                { label: "QuickTurf", href: "/products#quickturf" },
                { label: "STC", href: "/products#stc" },
              ].map((p) => (
                <li key={p.label}>
                  <Link to={p.href} className="font-body text-brand-muted hover:text-white text-sm transition-colors">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-bold text-white text-sm mb-4 tracking-wide uppercase">Company</h4>
            <ul className="space-y-3">
              {[
                { label: "Home", to: "/" },
                { label: "Products", to: "/products" },
                { label: "Join Us", to: "/join" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="font-body text-brand-muted hover:text-white text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-border mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-brand-muted text-xs">
            © {year} Solvify Technologies Pvt. Ltd. All rights reserved.
          </p>
          <p className="font-mono text-brand-muted text-xs">
            CIN:  U62099AP2026PTC124858
          </p>
        </div>
      </div>
    </footer>
  );
}
