import { useState, useEffect } from 'react';
import JobsHomepage    from './components/JobsHomepage';
import JobsPage        from './components/JobsPage';
import AdminDashboard  from './components/AdminDashboard';
import PrivacyPolicy   from './components/PrivacyPolicy';
import TermsPage       from './components/TermsPage';
import TipsTrick       from './components/TipsTrick';
import PasangLowongan  from './components/PasangLowongan';

// ── Router ────────────────────────────────────────────────────
function useRoute() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const h = () => setPath(window.location.pathname);
    window.addEventListener('popstate', h);
    return () => window.removeEventListener('popstate', h);
  }, []);
  return path;
}

export function navigate(to) {
  window.history.pushState({}, '', to);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

// ── Page meta per route ───────────────────────────────────────
function usePageMeta(path) {
  useEffect(() => {
    let m = document.querySelector('meta[name="robots"]');
    if (!m) { m = document.createElement('meta'); m.name = 'robots'; document.head.appendChild(m); }
    m.content = path === '/portal-rahasia-admin-exim'
      ? 'noindex, nofollow'
      : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

    const titles = {
      '/':                          'Jobs Pintar Exim — Platform Lowongan Kerja Ekspor Impor & Logistik Indonesia',
      '/jobs':                      'Cari Lowongan Kerja Exim, PPJK & Logistik | Pintar Exim Jobs',
      '/tips-trick':                'Tips & Trick Karir Ekspor Impor, PPJK & Logistik | Pintar Exim Jobs',
      '/pasang-lowongan':           'Pasang Lowongan Kerja Exim & Logistik Gratis | Pintar Exim Jobs',
      '/privacy-policy':            'Kebijakan Privasi | Pintar Exim Jobs',
      '/syarat-ketentuan':          'Syarat & Ketentuan | Pintar Exim Jobs',
      '/portal-rahasia-admin-exim': 'Admin Portal',
    };
    document.title = titles[path] || titles['/'];
  }, [path]);
}

// ── Nav links ─────────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'Beranda',          href: '/' },
  { label: 'Cari Lowongan',    href: '/jobs' },
  { label: 'Tips & Trick',     href: '/tips-trick' },
  { label: 'Pasang Lowongan',  href: '/pasang-lowongan' },
];

// ══════════════════════════════════════════════════════════════
// HEADER
// ══════════════════════════════════════════════════════════════
function PublicNav({ activePath }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.06)]' : 'bg-white border-b border-slate-100'}`}>
        {/* Accent bar */}
        <div className="h-[2.5px] w-full bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center h-14 sm:h-[60px] gap-6">

          {/* Logo */}
          <a href="/" className="flex-shrink-0 group">
            <picture>
              <source srcSet="/jobs-lengkap.webp" type="image/webp" />
              <img src="/jobs-lengkap-opt.png" alt="Pintar Exim Jobs"
                className="h-9 sm:h-11 w-auto object-contain group-hover:opacity-80 transition-opacity"
                style={{ maxWidth: '220px' }} loading="eager" width="613" height="120" />
            </picture>
          </a>

          <div className="hidden md:block w-px h-5 bg-slate-200 flex-shrink-0" />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5 flex-1">
            {NAV_LINKS.map(link => {
              const isActive = activePath === link.href;
              return (
                <a key={link.href} href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-150
                    ${isActive
                      ? 'text-[#0F2D5E] bg-blue-50 font-semibold'
                      : 'text-slate-500 hover:text-[#0F2D5E] hover:bg-slate-50'
                    }`}>
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="hidden sm:flex items-center gap-2 ml-auto flex-shrink-0">
            <a href="https://pintarexim.com" target="_blank" rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2 rounded-full bg-[#0F2D5E] text-white text-xs font-semibold hover:bg-[#1a3f7a] transition-all shadow-sm hover:shadow-blue-200/60 hover:shadow-md">
              <span>Pintar Exim</span>
              <svg className="w-3 h-3 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(o => !o)} aria-label="Menu"
            className="md:hidden ml-auto w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-xl hover:bg-slate-100 transition">
            <span className={`block w-[18px] h-0.5 bg-slate-700 rounded-full transition-all origin-center ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block w-[18px] h-0.5 bg-slate-700 rounded-full transition-all ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-[18px] h-0.5 bg-slate-700 rounded-full transition-all origin-center ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </button>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-[56.5px] sm:h-[62.5px]" />

      {/* Mobile overlay */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
        <div className={`absolute top-[56.5px] left-0 right-0 bg-white shadow-2xl border-b border-slate-100 transition-all duration-300 ${menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
          <nav className="px-4 py-3 space-y-0.5">
            {NAV_LINKS.map(link => {
              const isActive = activePath === link.href;
              return (
                <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition
                    ${isActive ? 'bg-blue-50 text-[#0F2D5E] font-semibold' : 'text-slate-700 hover:bg-blue-50 hover:text-[#0F2D5E]'}`}>
                  <span>{link.label}</span>
                  <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              );
            })}
          </nav>
          <div className="mx-4 border-t border-slate-100 py-3">
            <a href="https://pintarexim.com" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-[#0F2D5E] bg-blue-50 hover:bg-blue-100 transition">
              <span>Kunjungi Pintar Exim Academy</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

// ══════════════════════════════════════════════════════════════
// FOOTER
// ══════════════════════════════════════════════════════════════
const FOOTER_LINKS = {
  'Lowongan': [
    { label: 'Cari Lowongan', href: '/' },
    { label: 'Bidang Import', href: '/?category=Import' },
    { label: 'Bidang Export', href: '/?category=Export' },
    { label: 'PPJK',          href: '/?category=PPJK' },
    { label: 'Warehouse',     href: '/?category=Warehouse' },
  ],
  'Ekosistem': [
    { label: 'Pintar Exim Academy', href: 'https://pintarexim.com',     ext: true },
    { label: 'News',                href: 'https://news.pintarexim.com', ext: true },
    { label: 'AI Pintar Exim',      href: 'https://ai.pintarexim.com',   ext: true },
  ],
  'Legal': [
    { label: 'Kebijakan Privasi',  href: '/privacy-policy' },
    { label: 'Syarat & Ketentuan', href: '/syarat-ketentuan' },
  ],
};

function PublicFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#080F1E] text-slate-400 font-sans relative overflow-hidden">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl pointer-events-none translate-y-1/3" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">

          <div className="col-span-2 sm:col-span-1 space-y-4">
            <a href="/">
              <picture>
                <source srcSet="/jobs-lengkap-white.webp" type="image/webp" />
                <img src="/jobs-lengkap-white.png" alt="Pintar Exim Jobs"
                  className="h-9 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                  style={{ maxWidth: '200px' }} loading="lazy" width="613" height="120" />
              </picture>
            </a>
            <p className="text-[13px] leading-relaxed text-slate-500 max-w-[180px]">
              Platform lowongan kerja khusus industri ekspor, impor &amp; logistik Indonesia.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[11px] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Gratis untuk pencari kerja
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <p className="text-[10px] font-bold text-white uppercase tracking-[0.18em] mb-4 opacity-60">{section}</p>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.href}>
                    <a href={link.href}
                      target={link.ext ? '_blank' : undefined}
                      rel={link.ext ? 'noopener noreferrer' : undefined}
                      className="group flex items-center gap-1.5 text-[13px] text-slate-500 hover:text-white transition-colors duration-150">
                      <span>{link.label}</span>
                      {link.ext && (
                        <svg className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity -translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="relative border-t border-white/[0.05] px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-slate-600">&copy; {year} Pintar Exim Jobs. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
            <span>Bagian dari ekosistem</span>
            <a href="https://pintarexim.com" target="_blank" rel="noopener noreferrer"
              className="text-blue-400/80 hover:text-blue-300 transition underline underline-offset-2">pintarexim.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ══════════════════════════════════════════════════════════════
// Root App
// ══════════════════════════════════════════════════════════════
export default function App() {
  const path    = useRoute();
  const isAdmin = path === '/portal-rahasia-admin-exim';

  usePageMeta(path);

  // Admin & legal — standalone layout (header sendiri)
  if (isAdmin)                      return <AdminDashboard />;
  if (path === '/privacy-policy')   return <PrivacyPolicy />;
  if (path === '/syarat-ketentuan') return <TermsPage />;

  // Semua halaman publik pakai PublicNav + PublicFooter yang sama
  const renderPage = () => {
    switch (path) {
      case '/jobs':            return <JobsPage />;
      case '/tips-trick':      return <TipsTrick />;
      case '/pasang-lowongan': return <PasangLowongan />;
      default:                 return <JobsHomepage />;
    }
  };

  return (
    <>
      <PublicNav activePath={path} />
      {renderPage()}
      <PublicFooter />
    </>
  );
}
