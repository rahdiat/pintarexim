// ============================================================
// JobsPage.jsx — Halaman /jobs
// Halaman khusus cari & filter lowongan (full featured)
// Nav & footer dari App.jsx
// ============================================================

import { useState, useEffect, useCallback } from 'react';

const API_BASE = '/api/jobs.php';

const TYPE_PILL = {
  'Full-time':  'bg-emerald-50 text-emerald-700',
  'Contract':   'bg-amber-50   text-amber-700',
  'Part-time':  'bg-sky-50     text-sky-700',
  'Internship': 'bg-purple-50  text-purple-700',
};

const CATEGORIES = [
  { label: 'Semua',     value: 'Semua',     icon: '◎' },
  { label: 'Import',    value: 'Import',    icon: '📦' },
  { label: 'Export',    value: 'Export',    icon: '🚢' },
  { label: 'PPJK',     value: 'PPJK',      icon: '🛃' },
  { label: 'Warehouse', value: 'Warehouse', icon: '🏭' },
];

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
        {/* Drag handle mobile */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden" aria-hidden="true">
          <div className="w-10 h-1 rounded-full bg-slate-200" />
        </div>

        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-slate-100 px-5 py-4 flex items-start justify-between">
          <div className="flex-1 min-w-0 pr-3">
            <h2 className="text-lg font-bold text-slate-800 leading-snug">{job.title}</h2>
            <p className="text-slate-500 text-sm mt-0.5 truncate">{job.company} · {job.location}</p>
          </div>
          <button onClick={onClose} aria-label="Tutup"
            className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-400 text-sm transition">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-5 space-y-5">
          <div className="flex flex-wrap gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${TYPE_PILL[job.type] || 'bg-slate-100 text-slate-600'}`}>
              {job.type}
            </span>
            {job.salary && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                💰 {job.salary}
              </span>
            )}
            {job.category && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-500">
                {job.category}
              </span>
            )}
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
                  <span key={i} className="px-3 py-1 bg-[#0F2D5E]/6 text-[#0F2D5E] text-xs rounded-full font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <p className="text-xs text-slate-400">
            Diposting {new Date(job.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        {/* CTA */}
        <div className="px-5 pb-7 pt-1">
          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl bg-[#0F2D5E] text-white font-semibold text-sm hover:bg-[#1a3f7a] active:scale-[0.98] transition"
          >
            Lamar via WhatsApp / Email
          </button>
          <p className="text-center text-xs text-slate-400 mt-2">
            Hubungi perusahaan langsung sesuai info pada deskripsi.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Job card ──────────────────────────────────────────────────
function JobCard({ job, onViewDetail }) {
  return (
    <div
      className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-md hover:border-slate-200 transition-all duration-200 active:scale-[0.99] group cursor-pointer"
      onClick={() => onViewDetail(job)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Pills */}
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${TYPE_PILL[job.type] || 'bg-slate-100 text-slate-500'}`}>
              {job.type}
            </span>
            {job.category && <span className="text-xs text-slate-400">{job.category}</span>}
          </div>

          {/* Title */}
          <h3 className="text-[15px] font-bold text-[#0F2D5E] group-hover:text-blue-700 leading-snug mb-1">
            {job.title}
          </h3>

          {/* Company · location */}
          <p className="text-sm text-slate-500 truncate">
            {job.company}
            <span className="text-slate-300 mx-1.5">·</span>
            <span className="text-slate-400">📍 {job.location}</span>
          </p>

          {/* Description */}
          <p className="text-sm text-slate-500 mt-2 line-clamp-2 leading-relaxed">
            {job.description}
          </p>

          {/* Tags */}
          {job.tags?.filter(Boolean).length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {job.tags.filter(Boolean).slice(0, 5).map((tag, i) => (
                <span key={i} className="px-2 py-0.5 bg-[#0F2D5E]/5 text-[#0F2D5E] text-xs rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right */}
        <div className="flex flex-col items-end gap-3 flex-shrink-0">
          {job.salary && (
            <p className="text-xs font-semibold text-emerald-600 whitespace-nowrap text-right">{job.salary}</p>
          )}
          <span className="px-4 py-2 rounded-full border-2 border-[#0F2D5E] text-[#0F2D5E] text-sm font-semibold group-hover:bg-[#0F2D5E] group-hover:text-white transition-all whitespace-nowrap">
            Detail →
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Skeleton loader ───────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 animate-pulse">
      <div className="flex justify-between gap-4">
        <div className="flex-1 space-y-2.5">
          <div className="h-3 bg-slate-100 rounded-full w-24" />
          <div className="h-5 bg-slate-200 rounded-full w-2/3" />
          <div className="h-3 bg-slate-100 rounded-full w-1/2" />
          <div className="h-3 bg-slate-100 rounded-full w-full" />
          <div className="h-3 bg-slate-100 rounded-full w-4/5" />
        </div>
        <div className="h-9 w-24 bg-slate-100 rounded-full self-end flex-shrink-0" />
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// Main: JobsPage
// ════════════════════════════════════════════════════════════════
export default function JobsPage() {
  // Baca query params dari URL (keyword & category dari homepage redirect)
  const urlParams   = new URLSearchParams(window.location.search);
  const initKeyword = urlParams.get('keyword') || '';
  const initCat     = urlParams.get('category') || 'Semua';

  const [jobs,          setJobs]          = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState(null);
  const [selectedJob,   setSelectedJob]   = useState(null);
  const [keyword,       setKeyword]       = useState(initKeyword);
  const [inputKeyword,  setInputKeyword]  = useState(initKeyword);
  const [activeCategory, setActiveCategory] = useState(initCat);
  const [totalAll,      setTotalAll]      = useState(0);

  const safeJson = async (res) => {
    const text = await res.text();
    if (!text?.trim()) throw new Error('Response kosong dari server.');
    try { return JSON.parse(text); }
    catch { throw new Error(`Response bukan JSON: ${text.substring(0, 100)}`); }
  };

  const fetchJobs = useCallback(async (kw = '', cat = 'Semua') => {
    setLoading(true);
    setError(null);
    try {
      const p = new URLSearchParams();
      if (kw)            p.set('keyword',  kw);
      if (cat !== 'Semua') p.set('category', cat);
      const res  = await fetch(`${API_BASE}?${p}`);
      const json = await safeJson(res);
      if (!res.ok) throw new Error(json.error || `HTTP ${res.status}`);
      setJobs(json.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Ambil total semua untuk counter header
  const fetchTotal = useCallback(async () => {
    try {
      const res  = await fetch(API_BASE);
      const json = await safeJson(res);
      setTotalAll((json.data || []).length);
    } catch { /* silent */ }
  }, []);

  useEffect(() => {
    fetchJobs(initKeyword, initCat);
    fetchTotal();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(inputKeyword);
    fetchJobs(inputKeyword, activeCategory);
  };

  const handleClear = () => {
    setInputKeyword('');
    setKeyword('');
    fetchJobs('', activeCategory);
  };

  const handleCategory = (cat) => {
    setActiveCategory(cat);
    fetchJobs(keyword, cat);
  };

  const handleReset = () => {
    setInputKeyword('');
    setKeyword('');
    setActiveCategory('Semua');
    fetchJobs('', 'Semua');
  };

  const isFiltered = keyword !== '' || activeCategory !== 'Semua';

  // Header height: mobile 56px + 2.5px accent = ~59px, desktop 60px + 2.5px = ~63px
  // Gunakan CSS variable agar presisi di semua breakpoint
  return (
    <div className="bg-[#F8FAFC] font-sans min-h-screen">

      {/* ══ PAGE HEADER — sticky di bawah nav utama ═══════════ */}
      <div className="bg-white border-b border-slate-100 sticky top-[58px] sm:top-[62.5px] z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-3 pb-3">

          {/* Row 1: H1 + breadcrumb — disembunyikan di mobile untuk hemat space */}
          <div className="hidden sm:flex items-center justify-between mb-3">
            <div>
              <h1 className="text-base font-extrabold text-[#0F2D5E] leading-none">
                Lowongan Kerja Exim, Logistik &amp; PPJK Indonesia
              </h1>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {loading ? 'Memuat…' : `${totalAll > 0 ? `${totalAll} ` : ''}lowongan aktif tersedia`}
              </p>
            </div>
            <nav className="flex items-center gap-1.5 text-xs text-slate-400">
              <a href="/" className="text-blue-500 hover:underline">Beranda</a>
              <span>›</span>
              <span className="text-slate-600 font-medium">Cari Lowongan</span>
            </nav>
          </div>

          {/* Row 2: Search bar */}
          <form onSubmit={handleSearch}
            className="flex items-center bg-white rounded-xl border border-slate-200 overflow-hidden focus-within:border-blue-400 focus-within:shadow-[0_0_0_3px_rgba(59,130,246,0.10)] transition-all duration-200 shadow-sm">
            <div className="pl-3.5 pr-1 flex-shrink-0">
              <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <circle cx="11" cy="11" r="7" />
                <path strokeLinecap="round" d="M21 21l-4-4" />
              </svg>
            </div>
            <input
              type="text"
              /* Placeholder pendek di mobile, panjang di desktop */
              placeholder="Cari posisi, perusahaan, lokasi…"
              value={inputKeyword}
              onChange={(e) => setInputKeyword(e.target.value)}
              className="flex-1 px-2 py-2.5 sm:py-3 outline-none text-slate-700 placeholder:text-slate-400 text-sm bg-transparent min-w-0"
            />
            {inputKeyword && (
              <button type="button" onClick={handleClear}
                className="px-2 text-slate-300 hover:text-slate-500 transition flex-shrink-0" aria-label="Hapus pencarian">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <button type="submit"
              className="m-1.5 px-5 sm:px-6 py-2 sm:py-2.5 bg-[#0F2D5E] text-white font-bold rounded-lg hover:bg-[#1a3f7a] active:scale-95 transition-all text-sm flex-shrink-0 whitespace-nowrap">
              Cari
            </button>
          </form>

          {/* Row 3: Category pills — horizontal scroll mobile */}
          <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto pb-0.5 scrollbar-none">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex-shrink-0 mr-0.5 hidden sm:block">Filter:</span>
            {CATEGORIES.map(cat => {
              const active = activeCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => handleCategory(cat.value)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border flex-shrink-0 transition-all duration-150
                    ${active
                      ? 'bg-[#0F2D5E] border-[#0F2D5E] text-white shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-[#0F2D5E]/40 hover:text-[#0F2D5E]'
                    }`}
                >
                  <span className="text-sm">{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
            {isFiltered && (
              <button onClick={handleReset}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold text-red-500 border border-red-200 bg-red-50 hover:bg-red-100 flex-shrink-0 transition-all ml-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ══ MAIN CONTENT ════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 pb-20">

        {/* Result info */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            {loading ? 'Memuat…'
              : isFiltered ? `${jobs.length} hasil ditemukan`
              : `${jobs.length} lowongan tersedia`}
          </p>
          {isFiltered && !loading && (
            <div className="flex items-center gap-2 text-xs text-slate-400">
              {keyword && <span className="font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">"{keyword}"</span>}
              {activeCategory !== 'Semua' && <span className="font-semibold text-[#0F2D5E] bg-blue-50 px-2 py-0.5 rounded-full">{activeCategory}</span>}
            </div>
          )}
        </div>

        {/* ── Skeleton ── */}
        {loading && (
          <div className="space-y-3">
            {[1,2,3,4,5].map(i => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* ── Error ── */}
        {!loading && error && (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
            <p className="text-4xl mb-4">⚠️</p>
            <p className="text-slate-700 font-bold mb-2">Gagal memuat lowongan</p>
            <p className="text-slate-400 text-sm mb-6 max-w-sm mx-auto">{error}</p>
            <button onClick={() => fetchJobs(keyword, activeCategory)}
              className="px-6 py-2.5 rounded-full border-2 border-[#0F2D5E] text-[#0F2D5E] text-sm font-semibold hover:bg-[#0F2D5E] hover:text-white transition">
              Coba Lagi
            </button>
          </div>
        )}

        {/* ── Empty ── */}
        {!loading && !error && jobs.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-slate-700 font-bold text-lg mb-2">Tidak ada lowongan ditemukan</p>
            <p className="text-slate-400 text-sm mb-6">
              {isFiltered
                ? 'Coba ubah kata kunci atau pilih kategori lain.'
                : 'Belum ada lowongan aktif saat ini.'}
            </p>
            <button onClick={handleReset}
              className="px-6 py-2.5 rounded-full bg-[#0F2D5E] text-white text-sm font-semibold hover:bg-[#1a3f7a] transition">
              Tampilkan Semua
            </button>
          </div>
        )}

        {/* ── Job list ── */}
        {!loading && !error && jobs.length > 0 && (
          <>
            <div className="space-y-3">
              {jobs.map(job => (
                <JobCard key={job.id} job={job} onViewDetail={setSelectedJob} />
              ))}
            </div>

            {/* Bottom info */}
            <div className="mt-8 py-6 border-t border-slate-200 text-center">
              <p className="text-sm text-slate-400">
                Menampilkan <strong className="text-slate-600">{jobs.length}</strong> lowongan
                {isFiltered ? ' sesuai filter' : ' aktif'}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Ingin lowongan Anda tampil di sini?{' '}
                <a href="/pasang-lowongan" className="text-blue-500 hover:underline font-semibold">
                  Pasang lowongan gratis →
                </a>
              </p>
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      {selectedJob && <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
    </div>
  );
}
