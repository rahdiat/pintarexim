import { useState, useEffect, useCallback } from 'react';

// ── Semua navigasi lowongan ke halaman /jobs (internal) ──────
const JOBS_URL = '/jobs';

const API_BASE = '/api/jobs.php';

const TYPE_PILL = {
  'Full-time':  'bg-emerald-50 text-emerald-700',
  'Contract':   'bg-amber-50   text-amber-700',
  'Part-time':  'bg-sky-50     text-sky-700',
  'Internship': 'bg-purple-50  text-purple-700',
};

// ── Hero image ────────────────────────────────────────────────
function HeroImage() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 60%, #DBEAFE 0%, #EFF6FF 55%, transparent 100%)' }}
      />
      <picture className="relative w-full">
        <source srcSet="/collab.webp" type="image/webp" />
        <img
          src="/collab-opt.png"
          alt="Tim profesional Exim, PPJK, dan logistik Indonesia"
          className="w-full h-auto object-contain drop-shadow-2xl"
          loading="eager" decoding="async" width="900" height="680"
        />
      </picture>
    </div>
  );
}

// ── Modal detail lowongan ─────────────────────────────────────
function JobModal({ job, onClose }) {
  if (!job) return null;
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm p-0 sm:p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white w-full sm:rounded-2xl sm:max-w-2xl max-h-[92dvh] overflow-y-auto rounded-t-3xl shadow-2xl">
        <div className="flex justify-center pt-3 pb-1 sm:hidden" aria-hidden="true">
          <div className="w-10 h-1 rounded-full bg-slate-200" />
        </div>
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-slate-100 px-5 py-4 flex items-start justify-between">
          <div className="flex-1 min-w-0 pr-3">
            <h2 className="text-lg font-bold text-slate-800 leading-snug">{job.title}</h2>
            <p className="text-slate-500 text-sm mt-0.5 truncate">{job.company} · {job.location}</p>
          </div>
          <button onClick={onClose} aria-label="Tutup"
            className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-400 text-sm transition">✕</button>
        </div>
        <div className="px-5 py-5 space-y-5">
          <div className="flex flex-wrap gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${TYPE_PILL[job.type] || 'bg-slate-100 text-slate-600'}`}>{job.type}</span>
            {job.salary && <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">💰 {job.salary}</span>}
            {job.category && <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-500">{job.category}</span>}
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Deskripsi Pekerjaan</p>
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">{job.description}</p>
          </div>
          {job.tags?.filter(Boolean).length > 0 && (
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Keahlian</p>
              <div className="flex flex-wrap gap-2">
                {job.tags.filter(Boolean).map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-[#0F2D5E]/6 text-[#0F2D5E] text-xs rounded-full font-medium">{tag}</span>
                ))}
              </div>
            </div>
          )}
          <p className="text-xs text-slate-400">
            Diposting {new Date(job.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div className="px-5 pb-7 pt-1">
          <a href={JOBS_URL}
            className="block w-full py-3.5 rounded-2xl bg-[#0F2D5E] text-white font-semibold text-sm hover:bg-[#1a3f7a] active:scale-[0.98] transition text-center">
            Lihat Semua Lowongan →
          </a>
          <p className="text-center text-xs text-slate-400 mt-2">Tersedia di halaman Cari Lowongan.</p>
        </div>
      </div>
    </div>
  );
}

// ── Job card preview (hanya 3 di homepage) ────────────────────
function JobCard({ job, onViewDetail }) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 hover:shadow-md hover:border-slate-200 transition-all duration-200 active:scale-[0.99] group cursor-pointer"
      onClick={() => onViewDetail(job)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${TYPE_PILL[job.type] || 'bg-slate-100 text-slate-500'}`}>{job.type}</span>
            {job.category && <span className="text-xs text-slate-400">{job.category}</span>}
          </div>
          <h3 className="text-[15px] font-bold text-[#0F2D5E] group-hover:text-blue-700 leading-snug line-clamp-2">{job.title}</h3>
          <p className="text-sm text-slate-500 mt-0.5 truncate">
            {job.company}<span className="text-slate-300 mx-1.5">·</span>
            <span className="text-slate-400">📍 {job.location}</span>
          </p>
          <p className="text-sm text-slate-500 mt-2 line-clamp-2 leading-relaxed hidden sm:block">{job.description}</p>
          {job.tags?.filter(Boolean).length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {job.tags.filter(Boolean).slice(0, 4).map((tag, i) => (
                <span key={i} className="px-2 py-0.5 bg-[#0F2D5E]/5 text-[#0F2D5E] text-xs rounded-full">{tag}</span>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col items-end gap-2.5 flex-shrink-0">
          {job.salary && <p className="text-xs font-semibold text-emerald-600 whitespace-nowrap text-right">{job.salary}</p>}
          <span className="px-4 py-2 rounded-full border-2 border-[#0F2D5E] text-[#0F2D5E] text-sm font-semibold group-hover:bg-[#0F2D5E] group-hover:text-white transition-all whitespace-nowrap">
            Detail →
          </span>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// SECTION: About / Pengenalan
// ════════════════════════════════════════════════════════════════
function SectionAbout() {
  return (
    <section className="bg-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Left: teks */}
          <div>
            <p className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em] mb-4">Tentang Platform</p>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#0F2D5E] leading-tight tracking-tight mb-5">
              Platform Karir Pertama yang{' '}
              <span className="text-blue-500">Khusus Dunia Exim</span> Indonesia
            </h2>
            <p className="text-slate-500 text-base leading-relaxed mb-5">
              <strong className="text-slate-700">Jobs Pintar Exim</strong> adalah platform lowongan kerja yang berfokus pada industri ekspor, impor, kepabeanan, PPJK, logistik, warehouse, dan supply chain Indonesia.
            </p>
            <p className="text-slate-500 text-base leading-relaxed mb-8">
              Tidak seperti job portal umum, kami memahami terminologi industri — CEISA 4.0, PIB/PEB, HS Code, Incoterms, Kawasan Berikat — sehingga setiap lowongan yang tampil benar-benar relevan untuk profesional Exim.
            </p>

            {/* Key points */}
            <div className="space-y-3">
              {[
                { icon: '🎯', text: 'Lowongan 100% relevan industri ekspor-impor & logistik' },
                { icon: '🏢', text: 'Perusahaan terverifikasi dari kawasan industri Indonesia' },
                { icon: '⚡', text: 'Update lowongan real-time langsung dari HRD perusahaan' },
              ].map(p => (
                <div key={p.text} className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-base flex-shrink-0">{p.icon}</span>
                  <p className="text-slate-600 text-sm leading-relaxed pt-1">{p.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: stat cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { n: '7+', label: 'Bidang Industri', sub: 'Export · Import · PPJK · Logistik · Warehouse · Supply Chain · Customs', color: 'from-blue-500 to-blue-600' },
              { n: '24h', label: 'Proses Tayang', sub: 'Lowongan baru diverifikasi dan tayang dalam satu hari kerja', color: 'from-emerald-500 to-emerald-600' },
              { n: '0', label: 'Biaya untuk Kandidat', sub: 'Sepenuhnya gratis untuk semua pencari kerja', color: 'from-amber-500 to-amber-600' },
              { n: '#1', label: 'Platform Exim Jobs', sub: 'Satu-satunya job board yang fokus industri ekspor-impor Indonesia', color: 'from-purple-500 to-purple-600' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition group">
                <div className={`inline-flex w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} items-center justify-center mb-3`}>
                  <span className="text-white text-lg font-black leading-none">{s.n}</span>
                </div>
                <p className="text-sm font-bold text-[#0F2D5E] mb-1">{s.label}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════
// SECTION: Bidang Industri
// ════════════════════════════════════════════════════════════════
function SectionBidang() {
  const BIDANG = [
    { icon: '🚢', label: 'Export', desc: 'PEB, Bill of Lading, COO/SKA, Incoterms 2020, Freight Forwarder', color: 'bg-blue-50 border-blue-100 hover:border-blue-300' },
    { icon: '📦', label: 'Import', desc: 'PIB, Letter of Credit, Bea Masuk, PPN Impor, HS Code Classification', color: 'bg-cyan-50 border-cyan-100 hover:border-cyan-300' },
    { icon: '🛃', label: 'PPJK & Customs', desc: 'CEISA 4.0, BC 2.0/3.3/4.0, Audit Kepabeanan, Tarif & Klasifikasi', color: 'bg-indigo-50 border-indigo-100 hover:border-indigo-300' },
    { icon: '🏭', label: 'Warehouse', desc: 'Kawasan Berikat, WMS, Inventory Control, BC 4.0/4.1, CCTV & Safety', color: 'bg-amber-50 border-amber-100 hover:border-amber-300' },
    { icon: '🚛', label: 'Logistik', desc: 'Freight Management, Last Mile, Trucking, Forwarding, 3PL/4PL', color: 'bg-emerald-50 border-emerald-100 hover:border-emerald-300' },
    { icon: '🔗', label: 'Supply Chain', desc: 'Procurement, Vendor Management, Demand Planning, SAP/ERP, S&OP', color: 'bg-rose-50 border-rose-100 hover:border-rose-300' },
    { icon: '📋', label: 'Dokumentasi', desc: 'Shipping Doc, Packing List, Commercial Invoice, COO, Endorsement', color: 'bg-violet-50 border-violet-100 hover:border-violet-300' },
    { icon: '🌐', label: 'Trade Compliance', desc: 'Regulasi Perdagangan, Embargo, NPIK, SNI Impor, Persetujuan Impor', color: 'bg-teal-50 border-teal-100 hover:border-teal-300' },
  ];

  return (
    <section className="bg-[#F8FAFC] border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="text-center mb-8">
          <p className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em] mb-3">Fokus Bidang Kami</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2D5E] tracking-tight mb-4">
            Semua Bidang dalam Ekosistem Ekspor-Impor
          </h2>
          <p className="text-slate-500 text-base max-w-2xl mx-auto">
            Dari customs clearance hingga last-mile delivery — kami menjadi jembatan antara profesional Exim dengan perusahaan yang membutuhkan keahlian spesifik mereka.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {BIDANG.map(b => (
            <a
              key={b.label}
              href={JOBS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-2xl border-2 p-4 sm:p-5 transition-all duration-200 hover:shadow-md group ${b.color}`}
            >
              <div className="text-2xl mb-3">{b.icon}</div>
              <p className="text-sm font-bold text-[#0F2D5E] mb-1.5 group-hover:text-blue-700 transition-colors">{b.label}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{b.desc}</p>
            </a>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href={JOBS_URL}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0F2D5E] text-white font-bold text-sm hover:bg-[#1a3f7a] transition shadow-lg shadow-blue-900/15">
            Lihat Semua Lowongan
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════
// SECTION: Kenapa Jobs Pintar Exim
// ════════════════════════════════════════════════════════════════
function SectionWhyUs() {
  const FOR_JOBSEEKER = [
    { icon: '🎯', title: 'Lowongan Spesifik Industri', desc: 'Tidak ada noise dari lowongan yang tidak relevan. Semua posisi memang dari industri Exim, logistik, dan supply chain.' },
    { icon: '🔍', title: 'Pencarian Cerdas', desc: 'Cari berdasarkan posisi, keahlian, atau lokasi. Sistem kami memahami jargon industri seperti CEISA, PIB, atau HS Code.' },
    { icon: '📄', title: 'Deskripsi Lengkap', desc: 'Setiap lowongan dilengkapi deskripsi detail, range gaji, dan keyword keahlian yang dibutuhkan.' },
    { icon: '💸', title: 'Gratis Sepenuhnya', desc: 'Tidak ada biaya pendaftaran atau biaya lamaran. Platform ini gratis untuk semua pencari kerja.' },
  ];

  const FOR_COMPANY = [
    { icon: '👥', title: 'Database Kandidat Spesialis', desc: 'Jangkau ribuan profesional yang memang berpengalaman di bidang Exim, bukan kandidat umum.' },
    { icon: '⚡', title: 'Proses Cepat 24 Jam', desc: 'Lowongan Anda diverifikasi dan tayang dalam satu hari kerja. Tidak perlu menunggu lama.' },
    { icon: '🆓', title: 'Pasang Iklan Gratis', desc: 'Tidak ada biaya pasang lowongan. Kami mempertemukan perusahaan dengan talenta terbaik tanpa biaya.' },
    { icon: '🌏', title: 'Jangkauan Nasional', desc: 'Kandidat dari seluruh kawasan industri Indonesia — Jabodetabek, Jawa, Sumatera, Batam, dan lainnya.' },
  ];

  return (
    <section className="bg-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="text-center mb-10">
          <p className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em] mb-3">Keunggulan Platform</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2D5E] tracking-tight mb-4">
            Kenapa Memilih Jobs Pintar Exim?
          </h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto">
            Dirancang khusus untuk ekosistem Exim Indonesia — bukan job portal generik yang dipaksakan untuk industri spesifik.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Untuk Pencari Kerja */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-lg">👤</div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Untuk</p>
                <p className="text-base font-extrabold text-[#0F2D5E]">Pencari Kerja</p>
              </div>
            </div>
            <div className="space-y-3">
              {FOR_JOBSEEKER.map(f => (
                <div key={f.title} className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition group">
                  <span className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-xl flex-shrink-0 border border-slate-100">{f.icon}</span>
                  <div>
                    <p className="text-sm font-bold text-[#0F2D5E] mb-1 group-hover:text-blue-700 transition-colors">{f.title}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5">
              <a href={JOBS_URL}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0F2D5E] text-white font-bold text-sm hover:bg-[#1a3f7a] transition shadow-sm">
                Mulai Cari Lowongan →
              </a>
            </div>
          </div>

          {/* Untuk Perusahaan */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-lg">🏢</div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Untuk</p>
                <p className="text-base font-extrabold text-[#0F2D5E]">Perusahaan & HRD</p>
              </div>
            </div>
            <div className="space-y-3">
              {FOR_COMPANY.map(f => (
                <div key={f.title} className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-amber-200 hover:bg-amber-50/30 transition group">
                  <span className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-xl flex-shrink-0 border border-slate-100">{f.icon}</span>
                  <div>
                    <p className="text-sm font-bold text-[#0F2D5E] mb-1 group-hover:text-amber-700 transition-colors">{f.title}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5">
              <a href="/pasang-lowongan"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 text-white font-bold text-sm hover:bg-amber-600 transition shadow-sm">
                Pasang Lowongan Gratis →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════
// SECTION: Cara Kerja Platform
// ════════════════════════════════════════════════════════════════
function SectionHowItWorks() {
  const STEPS_JOBSEEKER = [
    { n: '1', title: 'Temukan Lowongan', desc: 'Buka pintarexim.com/jobs, cari posisi berdasarkan bidang, keahlian, atau lokasi.' },
    { n: '2', title: 'Baca Detail Lengkap', desc: 'Lihat deskripsi pekerjaan, range gaji, kualifikasi, dan keyword keahlian yang dibutuhkan.' },
    { n: '3', title: 'Lamar Langsung', desc: 'Hubungi perusahaan langsung via kontak yang tersedia. Tidak ada perantara.' },
  ];

  const STEPS_COMPANY = [
    { n: '1', title: 'Isi Formulir', desc: 'Lengkapi form Pasang Lowongan dengan detail posisi, kualifikasi, dan informasi perusahaan.' },
    { n: '2', title: 'Verifikasi Tim', desc: 'Tim Pintar Exim menghubungi dan memverifikasi lowongan dalam 1×24 jam kerja.' },
    { n: '3', title: 'Tayang & Jangkau', desc: 'Lowongan tayang dan langsung menjangkau ribuan profesional Exim di seluruh Indonesia.' },
  ];

  return (
    <section className="bg-[#F8FAFC] border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="text-center mb-10">
          <p className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em] mb-3">Cara Kerja</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2D5E] tracking-tight mb-4">
            Mudah, Cepat, dan Langsung Terhubung
          </h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto">
            Proses yang sederhana baik untuk pencari kerja maupun perusahaan yang ingin menemukan talenta Exim terbaik.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Pencari Kerja */}
          <div>
            <p className="text-xs font-bold text-[#0F2D5E] uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#0F2D5E] text-white text-[10px] flex items-center justify-center font-black">👤</span>
              Alur Pencari Kerja
            </p>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-5 top-8 bottom-8 w-px bg-slate-200" aria-hidden="true" />
              <div className="space-y-6">
                {STEPS_JOBSEEKER.map((s, i) => (
                  <div key={s.n} className="flex gap-5">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0 z-10 border-2 ${i === 0 ? 'bg-[#0F2D5E] text-white border-[#0F2D5E]' : 'bg-white text-[#0F2D5E] border-slate-200'}`}>
                      {s.n}
                    </div>
                    <div className="pt-1.5 pb-4">
                      <p className="text-sm font-bold text-[#0F2D5E] mb-1">{s.title}</p>
                      <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Perusahaan */}
          <div>
            <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] flex items-center justify-center font-black">🏢</span>
              Alur Perusahaan / HRD
            </p>
            <div className="relative">
              <div className="absolute left-5 top-8 bottom-8 w-px bg-slate-200" aria-hidden="true" />
              <div className="space-y-6">
                {STEPS_COMPANY.map((s, i) => (
                  <div key={s.n} className="flex gap-5">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0 z-10 border-2 ${i === 0 ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-amber-600 border-slate-200'}`}>
                      {s.n}
                    </div>
                    <div className="pt-1.5 pb-4">
                      <p className="text-sm font-bold text-[#0F2D5E] mb-1">{s.title}</p>
                      <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════
// SECTION: Cari Lowongan CTA — mengarahkan ke /jobs
// Tidak ada fetch API di homepage, semua di halaman /jobs
// ════════════════════════════════════════════════════════════════
function SectionJobsCTA({ totalJobs }) {
  const PREVIEW_POSITIONS = [
    { title: 'Staff PPJK / Customs Declarant', company: 'PT Mitra Logistik Nusantara', location: 'Tanjung Priok, Jakarta', type: 'Full-time', salary: 'Rp 5–8 Jt', tags: ['CEISA 4.0', 'BC 3.3', 'PIB'] },
    { title: 'Export Documentation Specialist', company: 'CV Cahaya Ekspor Indonesia', location: 'Karawang, Jawa Barat', type: 'Full-time', salary: 'Rp 6–9 Jt', tags: ['PEB', 'COO', 'Incoterms 2020'] },
    { title: 'Import Coordinator – Raw Material', company: 'PT Surya Manufaktur Jaya', location: 'Cikarang, Bekasi', type: 'Full-time', salary: 'Rp 7–12 Jt', tags: ['PIB', 'Letter of Credit', 'HS Code'] },
  ];

  return (
    <section className="bg-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em] mb-3">Lowongan Tersedia</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2D5E] tracking-tight">
              Contoh Posisi yang Tersedia
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              {totalJobs > 0 ? `${totalJobs} lowongan aktif menunggu kandidat terbaik.` : 'Lowongan baru dari perusahaan terpercaya.'}
              {' '}Lihat semua di halaman Cari Lowongan.
            </p>
          </div>
          <a href={JOBS_URL}
            className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-[#0F2D5E] text-[#0F2D5E] text-sm font-bold hover:bg-[#0F2D5E] hover:text-white transition">
            Lihat Semua
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>

        {/* Preview cards statis — tidak perlu API */}
        <div className="space-y-3">
          {PREVIEW_POSITIONS.map((job, i) => (
            <a key={i} href={JOBS_URL}
              className="block bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-md hover:border-slate-200 transition-all duration-200 group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">{job.type}</span>
                  </div>
                  <h3 className="text-[15px] font-bold text-[#0F2D5E] group-hover:text-blue-700 leading-snug mb-1 transition-colors">{job.title}</h3>
                  <p className="text-sm text-slate-500 truncate">
                    {job.company}
                    <span className="text-slate-300 mx-1.5">·</span>
                    <span className="text-slate-400">📍 {job.location}</span>
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {job.tags.map(t => (
                      <span key={t} className="px-2 py-0.5 bg-[#0F2D5E]/5 text-[#0F2D5E] text-xs rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3 flex-shrink-0">
                  <p className="text-xs font-semibold text-emerald-600 whitespace-nowrap">{job.salary}</p>
                  <span className="px-4 py-2 rounded-full border-2 border-[#0F2D5E] text-[#0F2D5E] text-sm font-semibold group-hover:bg-[#0F2D5E] group-hover:text-white transition-all whitespace-nowrap">
                    Lihat →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA ke halaman /jobs */}
        <div className="mt-8 text-center">
          <a href={JOBS_URL}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[#0F2D5E] text-white font-bold text-sm hover:bg-[#1a3f7a] transition shadow-lg shadow-blue-900/15 group">
            <span>Lihat Semua {totalJobs > 0 ? `${totalJobs}+ ` : ''}Lowongan Aktif</span>
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════
// SECTION: Ekosistem Pintar Exim
// ════════════════════════════════════════════════════════════════
function SectionEcosystem() {
  const PRODUCTS = [
    {
      icon: '🎓',
      name: 'Pintar Exim Academy',
      desc: 'Kursus online ekspor-impor, kepabeanan, dan logistik bersertifikat untuk profesional Indonesia.',
      href: 'https://pintarexim.com',
      color: 'border-blue-200 hover:border-blue-400',
      badge: 'Academy',
      badgeColor: 'bg-blue-100 text-blue-700',
    },
    {
      icon: '📰',
      name: 'News Pintar Exim',
      desc: 'Berita terkini seputar kebijakan perdagangan, regulasi Bea Cukai, dan perkembangan industri logistik.',
      href: 'https://news.pintarexim.com',
      color: 'border-emerald-200 hover:border-emerald-400',
      badge: 'News',
      badgeColor: 'bg-emerald-100 text-emerald-700',
    },
    {
      icon: '🤖',
      name: 'AI Pintar Exim',
      desc: 'Asisten AI khusus industri Exim — bantu klasifikasi HS Code, analisis dokumen, dan konsultasi kepabeanan.',
      href: 'https://ai.pintarexim.com',
      color: 'border-purple-200 hover:border-purple-400',
      badge: 'AI',
      badgeColor: 'bg-purple-100 text-purple-700',
    },
    {
      icon: '💼',
      name: 'Pintar Exim Jobs',
      desc: 'Platform lowongan kerja khusus industri ekspor-impor, logistik, warehouse, dan supply chain Indonesia.',
      href: '/',
      color: 'border-amber-200 hover:border-amber-400 ring-2 ring-amber-300 ring-offset-2',
      badge: 'Jobs ✓',
      badgeColor: 'bg-amber-100 text-amber-700',
    },
  ];

  return (
    <section className="bg-[#F8FAFC] border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="text-center mb-8">
          <p className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em] mb-3">Ekosistem</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2D5E] tracking-tight mb-4">
            Bagian dari Ekosistem Pintar Exim
          </h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto">
            Jobs Pintar Exim adalah satu dari empat produk ekosistem Pintar Exim yang dirancang untuk memajukan industri ekspor-impor Indonesia.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRODUCTS.map(p => (
            <a key={p.name} href={p.href}
              target={p.href.startsWith('http') ? '_blank' : undefined}
              rel={p.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`bg-white rounded-2xl border-2 p-5 transition-all duration-200 hover:shadow-md group ${p.color}`}>
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{p.icon}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${p.badgeColor}`}>{p.badge}</span>
              </div>
              <p className="text-sm font-extrabold text-[#0F2D5E] mb-2 group-hover:text-blue-700 transition-colors">{p.name}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════
// SECTION: CTA Bottom
// ════════════════════════════════════════════════════════════════
function SectionCTA() {
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="relative bg-gradient-to-br from-[#0F2D5E] via-[#1a3f7a] to-[#0a2044] rounded-3xl overflow-hidden px-6 sm:px-12 py-12 sm:py-16 text-center">
          {/* Dot grid */}
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
          {/* Glow orbs */}
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
          <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none translate-y-1/3" />

          <div className="relative">
            <p className="text-blue-300 text-[10px] font-bold uppercase tracking-[0.25em] mb-4">Mulai Sekarang</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight mb-4 max-w-2xl mx-auto">
              Siap Memulai Karir Terbaik di Industri Exim Indonesia?
            </h2>
            <p className="text-blue-200 text-base leading-relaxed mb-10 max-w-lg mx-auto">
              Ribuan profesional Exim telah menemukan karir impian mereka. Giliran Anda — atau jika Anda HRD, temukan talenta spesialis Exim terbaik hari ini.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={JOBS_URL}
                className="px-8 py-4 rounded-2xl bg-white text-[#0F2D5E] font-extrabold text-sm hover:bg-blue-50 transition shadow-xl group flex items-center justify-center gap-2">
                <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <circle cx="11" cy="11" r="7" /><path strokeLinecap="round" d="M21 21l-4-4" />
                </svg>
                Cari Lowongan Sekarang
              </a>
              <a href="/pasang-lowongan"
                className="px-8 py-4 rounded-2xl border-2 border-white/30 text-white font-bold text-sm hover:bg-white/10 hover:border-white/60 transition flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Pasang Lowongan Gratis
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-6 mt-10">
              {['✓ Gratis untuk Semua', '✓ Khusus Industri Exim', '✓ Tayang 24 Jam', '✓ Kandidat Terverifikasi'].map(t => (
                <span key={t} className="text-blue-300 text-xs font-semibold">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════
// Main: JobsHomepage — Landing page murni
// Stats diambil dari API, semua navigasi ke /jobs (internal)
// ════════════════════════════════════════════════════════════════
export default function JobsHomepage() {
  const [allJobs,       setAllJobs]       = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  // Hanya ambil data untuk stats — tidak ada filter di homepage
  useEffect(() => {
    fetch(API_BASE)
      .then(r => r.text())
      .then(t => { try { const j = JSON.parse(t); setAllJobs(j.data || []); } catch {} })
      .catch(() => {});
  }, []);

  const totalJobs      = allJobs.length;
  const totalCompanies = [...new Set(allJobs.map(j => j.company).filter(Boolean))].length;
  const totalCities    = [...new Set(allJobs.map(j => j.location?.split(',')[0]?.trim()).filter(Boolean))].length;

  // Search → navigate ke /jobs dengan keyword
  const handleSearch = (e) => {
    e.preventDefault();
    const q = searchKeyword.trim();
    window.location.href = q ? `${JOBS_URL}?keyword=${encodeURIComponent(q)}` : JOBS_URL;
  };

  return (
    <div className="font-sans">

      {/* ══ HERO ════════════════════════════════════════════════ */}
      <section className="bg-white border-b border-slate-100 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Desktop: 2 kolom | Mobile: 1 kolom */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 min-h-[380px] sm:min-h-[420px] lg:min-h-[460px]">

            {/* Kiri: copy + search */}
            <div className="flex flex-col justify-center py-9 sm:py-12 lg:py-16 sm:pr-8 lg:pr-12">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#0F2D5E] text-[10px] font-bold mb-4 tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse flex-shrink-0" />
                Lowongan Aktif · Pintar Exim
              </div>

              {/* H1 — ukuran lebih ketat */}
              <h1 className="text-[26px] sm:text-[30px] lg:text-[38px] font-extrabold text-[#0F2D5E] leading-[1.2] tracking-tight mb-3">
                Satu Platform,<br />
                Ribuan Karir di{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-blue-500">Exim &amp; Logistik</span>
                  <svg aria-hidden="true" className="absolute -bottom-0.5 left-0 w-full" height="4" viewBox="0 0 220 4" preserveAspectRatio="none">
                    <path d="M0 3 Q110 0 220 3" stroke="#93C5FD" strokeWidth="2" fill="none" strokeLinecap="round" />
                  </svg>
                </span>{' '}Indonesia
              </h1>

              {/* Subheading */}
              <p className="text-slate-500 text-sm sm:text-[15px] leading-relaxed mb-5 max-w-[420px]">
                Temukan karir sebagai{' '}
                <strong className="font-semibold text-slate-700">Exim Specialist</strong>,{' '}
                <strong className="font-semibold text-slate-700">PPJK &amp; Customs Declarant</strong>, hingga{' '}
                <strong className="font-semibold text-slate-700">Logistics Professional</strong>{' '}
                dari perusahaan ekspor-impor terpercaya Indonesia.
              </p>

              {/* Stats — compact */}
              {totalJobs > 0 && (
                <div className="flex items-center gap-4 sm:gap-5 mb-5">
                  {[
                    { n: totalJobs,      label: 'Lowongan' },
                    { n: totalCompanies, label: 'Perusahaan' },
                    { n: totalCities,    label: 'Kota' },
                  ].map(({ n, label }, i) => (
                    <div key={label} className="flex items-center gap-4 sm:gap-5">
                      {i > 0 && <div className="w-px h-6 bg-slate-200 flex-shrink-0" />}
                      <div>
                        <p className="text-xl lg:text-2xl font-extrabold text-[#0F2D5E] tabular-nums leading-none">{n}</p>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">{label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Search bar → redirect ke /jobs */}
              <div className="w-full max-w-[460px]">
                <form onSubmit={handleSearch}
                  className="flex items-center bg-white rounded-xl shadow-[0_2px_16px_rgba(15,45,94,0.12)] border border-slate-200 overflow-hidden focus-within:border-blue-400 focus-within:shadow-[0_2px_16px_rgba(59,130,246,0.15)] transition-all duration-200">
                  <div className="pl-4 pr-1 flex-shrink-0">
                    <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <circle cx="11" cy="11" r="7" /><path strokeLinecap="round" d="M21 21l-4-4" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Cari posisi atau keahlian…"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="flex-1 px-2 py-3 outline-none text-slate-700 placeholder:text-slate-400 text-sm bg-transparent min-w-0"
                  />
                  {searchKeyword && (
                    <button type="button" onClick={() => setSearchKeyword('')}
                      className="pr-1.5 text-slate-300 hover:text-slate-500 transition flex-shrink-0" aria-label="Hapus">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                  <button type="submit"
                    className="m-1.5 px-5 py-2.5 bg-[#0F2D5E] text-white font-bold rounded-lg hover:bg-[#1a3f7a] active:scale-95 transition-all text-sm flex-shrink-0">
                    Cari →
                  </button>
                </form>

                {/* Quick chips */}
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {['Staff PPJK', 'Export', 'Import', 'Logistik', 'Warehouse'].map(s => (
                    <a key={s} href={`${JOBS_URL}?keyword=${encodeURIComponent(s)}`}
                      className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-500 text-xs font-medium hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all">
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Kanan: foto — hanya sm ke atas */}
            <div className="hidden sm:flex items-center justify-center py-6 lg:py-0">
              <HeroImage />
            </div>
          </div>
        </div>

        {/* Kategori → /jobs */}
        <div className="border-t border-slate-100 bg-slate-50/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex-shrink-0">Bidang:</span>
              {[
                { label: 'Semua', icon: '◎' },
                { label: 'Import', icon: '📦' },
                { label: 'Export', icon: '🚢' },
                { label: 'PPJK', icon: '🛃' },
                { label: 'Warehouse', icon: '🏭' },
                { label: 'Logistik', icon: '🚛' },
              ].map(cat => (
                <a key={cat.label}
                  href={cat.label === 'Semua' ? JOBS_URL : `${JOBS_URL}?category=${encodeURIComponent(cat.label)}`}
                  className="flex items-center gap-1 px-3 py-1 rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-600 hover:border-[#0F2D5E] hover:text-[#0F2D5E] flex-shrink-0 transition-all">
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTIONS FULL PAGE ══════════════════════════════════ */}
      <SectionAbout />
      <SectionBidang />
      <SectionWhyUs />
      <SectionHowItWorks />
      <SectionJobsCTA totalJobs={totalJobs} />
      <SectionEcosystem />
      <SectionCTA />
    </div>
  );
}


