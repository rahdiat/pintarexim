// ============================================================
// PrivacyPolicy.jsx — Required by Google Ads policy
// Header & footer identik dengan halaman utama
// ============================================================

// ── Shared footer links (sama persis dengan App.jsx) ──────────
const FOOTER_LINKS = {
  'Lowongan': [
    { label: 'Semua Lowongan', href: '/' },
    { label: 'Bidang Import',  href: '/?category=Import' },
    { label: 'Bidang Export',  href: '/?category=Export' },
    { label: 'PPJK',           href: '/?category=PPJK' },
    { label: 'Warehouse',      href: '/?category=Warehouse' },
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

function PageHeader() {
  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-40">
      {/* Gradient accent bar — sama dengan home */}
      <div className="h-[2.5px] w-full bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 sm:h-[60px]">
        {/* Logo */}
        <a href="/" className="flex-shrink-0 group">
          <picture>
            <source srcSet="/jobs-lengkap.webp" type="image/webp" />
            <img
              src="/jobs-lengkap-opt.png"
              alt="Pintar Exim Jobs"
              className="h-9 sm:h-11 w-auto object-contain group-hover:opacity-80 transition-opacity"
              style={{ maxWidth: '220px' }}
              loading="eager"
              width="613"
              height="120"
            />
          </picture>
        </a>
        {/* Back link */}
        <a
          href="/"
          className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-[#0F2D5E] transition"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke Lowongan
        </a>
      </div>
    </header>
  );
}

function PageFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#080F1E] text-slate-400 font-sans relative overflow-hidden">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}
      />
      {/* Glow orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl pointer-events-none translate-y-1/3" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-1 space-y-4">
            <a href="/">
              <picture>
                <source srcSet="/jobs-lengkap-white.webp" type="image/webp" />
                <img
                  src="/jobs-lengkap-white.png"
                  alt="Pintar Exim Jobs"
                  className="h-9 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                  style={{ maxWidth: '200px' }}
                  loading="lazy"
                  width="613"
                  height="120"
                />
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

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <p className="text-[10px] font-bold text-white uppercase tracking-[0.18em] mb-4 opacity-60">{section}</p>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target={link.ext ? '_blank' : undefined}
                      rel={link.ext ? 'noopener noreferrer' : undefined}
                      className="group flex items-center gap-1.5 text-[13px] text-slate-500 hover:text-white transition-colors duration-150"
                    >
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

      {/* Bottom bar */}
      <div className="relative border-t border-white/[0.05] px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-slate-600">
            &copy; {year} Pintar Exim Jobs. Hak Cipta Dilindungi Undang-Undang.
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
            <span>Bagian dari ekosistem</span>
            <a href="https://pintarexim.com" target="_blank" rel="noopener noreferrer"
              className="text-blue-400/80 hover:text-blue-300 transition underline underline-offset-2">
              pintarexim.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col">
      <PageHeader />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="text-sm text-slate-400 mb-6">
          <a href="/" className="text-blue-500 hover:underline">Beranda</a>
          <span className="mx-2">›</span>
          <span className="text-slate-600 font-medium">Kebijakan Privasi</span>
        </nav>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 sm:p-12">
          <h1 className="text-3xl font-extrabold text-[#0F2D5E] mb-2">Kebijakan Privasi</h1>
          <p className="text-slate-400 text-sm mb-8">Terakhir diperbarui: 30 Mei 2026</p>

          <p className="text-slate-600 leading-relaxed mb-6">
            Pintar Exim Jobs (<strong>jobs.pintarexim.com</strong>), bagian dari ekosistem Pintar Exim, berkomitmen untuk melindungi privasi pengguna. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda.
          </p>

          {[
            {
              title: '1. Informasi yang Kami Kumpulkan',
              content: 'Kami hanya mengumpulkan informasi yang diperlukan untuk menjalankan layanan, antara lain:',
              list: [
                'Data pencarian (kata kunci posisi dan lokasi) yang dimasukkan di form pencarian — tidak disimpan ke server.',
                'Data analitik anonim melalui Google Analytics (kunjungan halaman, durasi sesi) — tidak dapat mengidentifikasi pengguna secara pribadi.',
                'Informasi teknis standar seperti jenis browser dan sistem operasi untuk keperluan diagnostik.',
              ],
            },
            {
              title: '2. Penggunaan Informasi',
              content: 'Informasi yang dikumpulkan digunakan untuk:',
              list: [
                'Menampilkan lowongan kerja yang relevan sesuai pencarian Anda.',
                'Meningkatkan pengalaman pengguna di platform.',
                'Menganalisis tren penggunaan platform secara anonim.',
                'Menampilkan iklan yang relevan melalui Google Ads.',
              ],
            },
          ].map(({ title, content, list }) => (
            <div key={title} className="mb-8">
              <h2 className="text-xl font-bold text-[#0F2D5E] mb-3">{title}</h2>
              {content && <p className="text-slate-600 leading-relaxed mb-3">{content}</p>}
              {list && (
                <ul className="list-disc pl-6 text-slate-600 space-y-1.5">
                  {list.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              )}
            </div>
          ))}

          <div className="mb-8">
            <h2 className="text-xl font-bold text-[#0F2D5E] mb-3">3. Google Ads &amp; Cookies</h2>
            <p className="text-slate-600 leading-relaxed">
              Platform ini menggunakan layanan Google Ads dan Google Analytics. Google dapat menggunakan cookie untuk menampilkan iklan berbasis minat. Anda dapat mengelola preferensi iklan di{' '}
              <a href="https://adssettings.google.com" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                adssettings.google.com
              </a>. Kami tidak menjual data pengguna ke pihak ketiga.
            </p>
          </div>

          {[
            { title: '4. Keamanan Data', text: 'Semua koneksi ke platform ini dilindungi oleh enkripsi SSL/HTTPS. Kami menerapkan praktik keamanan standar industri untuk melindungi data dari akses tidak sah.' },
            { title: '5. Hak Pengguna', text: 'Anda memiliki hak untuk meminta penghapusan data atau klarifikasi mengenai data yang kami simpan. Hubungi kami melalui email di bawah ini.' },
            { title: '6. Tautan Pihak Ketiga', text: 'Platform ini dapat menampilkan tautan ke situs perusahaan pemberi kerja. Kami tidak bertanggung jawab atas kebijakan privasi situs tersebut.' },
          ].map(({ title, text }) => (
            <div key={title} className="mb-8">
              <h2 className="text-xl font-bold text-[#0F2D5E] mb-3">{title}</h2>
              <p className="text-slate-600 leading-relaxed">{text}</p>
            </div>
          ))}

          <div className="mb-2">
            <h2 className="text-xl font-bold text-[#0F2D5E] mb-3">7. Hubungi Kami</h2>
            <p className="text-slate-600 leading-relaxed">
              Untuk pertanyaan mengenai kebijakan privasi ini, silakan hubungi:{' '}
              <a href="mailto:admin@pintarexim.com" className="text-blue-500 hover:underline font-semibold">
                admin@pintarexim.com
              </a>
            </p>
          </div>
        </div>
      </main>

      <PageFooter />
    </div>
  );
}
