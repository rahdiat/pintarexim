// ============================================================
// AdminDashboard.jsx — Secret admin panel
// Route: /portal-rahasia-admin-exim
// Access: protected by local access key check (no public login)
// ============================================================

import { useState, useEffect, useCallback } from 'react';

// Must match ADMIN_SECRET_TOKEN in api/config.php
const ADMIN_TOKEN = import.meta.env.VITE_ADMIN_TOKEN || 'GANTI_DENGAN_TOKEN_RAHASIA_PANJANG_ANDA';

// Must match ADMIN_ACCESS_KEY in api/config.php
const ADMIN_ACCESS_KEY = import.meta.env.VITE_ADMIN_ACCESS_KEY || 'exim2025@secret';

const API_BASE = '/api/jobs.php';

const EMPTY_FORM = {
  title:        '',
  company:      '',
  location:     '',
  type:         'Full-time',
  salary:       '',
  description:  '',
  key_keywords: '',
  category:     'Import',
};

// ============================================================
// Sub-component: Access Key Gate
// ============================================================
function AccessGate({ onUnlock }) {
  const [key, setKey]         = useState('');
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (key === ADMIN_ACCESS_KEY) {
        // Store session flag (tab-scoped only, not persistent)
        sessionStorage.setItem('admin_unlocked', '1');
        onUnlock();
      } else {
        setError('Kode akses salah. Periksa kembali.');
        setLoading(false);
      }
    }, 600); // small UX delay to prevent brute-force feel
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      {/* noindex is set in App.jsx when this route is active */}
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#0F2D5E]/5 flex items-center justify-center mx-auto mb-4 text-3xl">
              🔒
            </div>
            <h1 className="text-xl font-extrabold text-[#0F2D5E]">Portal Admin</h1>
            <p className="text-slate-400 text-sm mt-1">jobs.pintarexim.com</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1.5">
                Kode Akses
              </label>
              <input
                type="password"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Masukkan kode akses rahasia"
                autoComplete="off"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F2D5E]/30 focus:border-[#0F2D5E] transition"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm font-medium flex items-center gap-1.5">
                ⚠️ {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !key}
              className="w-full py-3 rounded-full bg-[#0F2D5E] text-white font-bold text-sm hover:bg-[#1a3f7a] disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Memverifikasi...' : 'Masuk ke Dashboard →'}
            </button>
          </form>

          <p className="text-center text-xs text-slate-300 mt-6">
            Halaman ini tidak terindeks oleh mesin pencari.
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Sub-component: Publish Job Form
// ============================================================
function PublishJobForm({ onJobPublished }) {
  const [form, setForm]       = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError]     = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    try {
      const res  = await fetch(API_BASE, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Token': ADMIN_TOKEN },
        body: JSON.stringify(form),
      });
      const text = await res.text();
      let json;
      try { json = JSON.parse(text); } catch { throw new Error(`Response tidak valid: ${text.substring(0,120)}`); }

      if (!res.ok) throw new Error(json.error || 'Gagal mempublish lowongan.');

      setSuccess(`✅ Lowongan "${form.title}" berhasil dipublish! (ID: ${json.id})`);
      setForm(EMPTY_FORM);
      onJobPublished(); // trigger parent to refresh list

    } catch (err) {
      setError(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F2D5E]/30 focus:border-[#0F2D5E] transition bg-white";
  const labelClass = "block text-sm font-semibold text-slate-600 mb-1.5";

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
      <h2 className="text-lg font-extrabold text-[#0F2D5E] mb-6 flex items-center gap-2">
        ➕ Publish Lowongan Baru
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Job Title */}
          <div className="sm:col-span-2">
            <label className={labelClass}>Judul Posisi *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Staff PPJK / Customs Declarant"
              required
              className={inputClass}
            />
          </div>

          {/* Company */}
          <div>
            <label className={labelClass}>Nama Perusahaan *</label>
            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="e.g. PT Mitra Logistik Nusantara"
              required
              className={inputClass}
            />
          </div>

          {/* Location */}
          <div>
            <label className={labelClass}>Lokasi *</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Cikarang, Bekasi"
              required
              className={inputClass}
            />
          </div>

          {/* Job Type */}
          <div>
            <label className={labelClass}>Tipe Pekerjaan *</label>
            <select name="type" value={form.type} onChange={handleChange} className={inputClass}>
              <option>Full-time</option>
              <option>Contract</option>
              <option>Part-time</option>
              <option>Internship</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className={labelClass}>Kategori Bidang</label>
            <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
              <option>Import</option>
              <option>Export</option>
              <option>PPJK</option>
              <option>Warehouse</option>
            </select>
          </div>

          {/* Salary */}
          <div className="sm:col-span-2">
            <label className={labelClass}>Gaji (opsional)</label>
            <input
              name="salary"
              value={form.salary}
              onChange={handleChange}
              placeholder="e.g. Rp 5.000.000 - Rp 8.000.000"
              className={inputClass}
            />
          </div>

          {/* Key Keywords */}
          <div className="sm:col-span-2">
            <label className={labelClass}>Keyword / Keahlian</label>
            <input
              name="key_keywords"
              value={form.key_keywords}
              onChange={handleChange}
              placeholder="e.g. CEISA 4.0, BC 3.3, PIB, Incoterms 2020"
              className={inputClass}
            />
            <p className="text-xs text-slate-400 mt-1">Pisahkan dengan koma. Digunakan untuk pencarian & tag.</p>
          </div>

          {/* Description */}
          <div className="sm:col-span-2">
            <label className={labelClass}>Deskripsi Pekerjaan *</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={6}
              required
              placeholder="Jelaskan tanggung jawab, kualifikasi, dan info tambahan. Sertakan jargon industri seperti BC 2.0, HS Code, Kawasan Berikat, dll."
              className={`${inputClass} resize-none`}
            />
          </div>
        </div>

        {/* Feedback messages */}
        {success && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium">
            {success}
          </div>
        )}
        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-full bg-[#0F2D5E] text-white font-bold hover:bg-[#1a3f7a] disabled:opacity-60 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Mempublish...
            </>
          ) : (
            '🚀 Publish Lowongan'
          )}
        </button>
      </form>
    </div>
  );
}

// ============================================================
// Sub-component: Active Jobs Management Table
// ============================================================
function JobManagementTable({ jobs, loading, onDelete }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-lg font-extrabold text-[#0F2D5E]">
          📋 Lowongan Aktif
        </h2>
        <span className="text-sm text-slate-400">{jobs.length} listing</span>
      </div>

      {loading ? (
        <div className="p-8 text-center text-slate-400 text-sm animate-pulse">Memuat data...</div>
      ) : jobs.length === 0 ? (
        <div className="p-8 text-center text-slate-400 text-sm">Belum ada lowongan aktif.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wide">
                <th className="px-4 py-3 text-left">Posisi</th>
                <th className="px-4 py-3 text-left">Perusahaan</th>
                <th className="px-4 py-3 text-left">Lokasi</th>
                <th className="px-4 py-3 text-left">Tipe</th>
                <th className="px-4 py-3 text-left">Tanggal</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {jobs.map((job) => (
                <JobTableRow key={job.id} job={job} onDelete={onDelete} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Single row with its own delete loading state
function JobTableRow({ job, onDelete }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`Hapus lowongan "${job.title}"? Tindakan ini tidak dapat dibatalkan.`)) return;

    setDeleting(true);
    await onDelete(job.id);
    // Parent refreshes list, so this row will unmount naturally
    setDeleting(false);
  };

  return (
    <tr className="hover:bg-slate-50/50 transition">
      <td className="px-4 py-3 font-semibold text-[#0F2D5E] max-w-[200px] truncate">{job.title}</td>
      <td className="px-4 py-3 text-slate-600 max-w-[160px] truncate">{job.company}</td>
      <td className="px-4 py-3 text-slate-500">{job.location}</td>
      <td className="px-4 py-3">
        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
          {job.type}
        </span>
      </td>
      <td className="px-4 py-3 text-slate-400 text-xs whitespace-nowrap">
        {new Date(job.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: '2-digit' })}
      </td>
      <td className="px-4 py-3 text-center">
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-semibold hover:bg-red-100 disabled:opacity-50 transition"
        >
          {deleting ? '...' : 'Hapus'}
        </button>
      </td>
    </tr>
  );
}

// ============================================================
// Main: AdminDashboard
// ============================================================
export default function AdminDashboard() {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem('admin_unlocked') === '1'
  );
  const [jobs, setJobs]       = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState('');

  // Fetch all active jobs for the management table
  const safeJson = async (res) => {
    const text = await res.text();
    if (!text || !text.trim()) throw new Error('Response kosong dari server.');
    try { return JSON.parse(text); } catch { throw new Error(`Bukan JSON: ${text.substring(0,120)}`); }
  };

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch(API_BASE);
      const json = await safeJson(res);
      setJobs(json.data || []);
    } catch {
      // silently fail; tabel tampil kosong
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (unlocked) fetchJobs();
  }, [unlocked, fetchJobs]);

  // DELETE handler
  const handleDelete = async (id) => {
    try {
      const res  = await fetch(`${API_BASE}?id=${id}`, {
        method:  'DELETE',
        headers: { 'X-Admin-Token': ADMIN_TOKEN },
      });
      const json = await safeJson(res);
      if (!res.ok) throw new Error(json.error);
      setDeleteMsg(`✅ Lowongan ID #${id} berhasil dihapus.`);
      setTimeout(() => setDeleteMsg(''), 4000);
      await fetchJobs();
    } catch (err) {
      setDeleteMsg(`❌ Gagal menghapus: ${err.message}`);
      setTimeout(() => setDeleteMsg(''), 4000);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_unlocked');
    setUnlocked(false);
  };

  // ── Render gate if not unlocked ────────────────────────────
  if (!unlocked) {
    return <AccessGate onUnlock={() => setUnlocked(true)} />;
  }

  // ── Render admin dashboard ─────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Top bar */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-base font-extrabold text-[#0F2D5E]">
              🛃 Admin Portal — jobs.pintarexim.com
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">Panel ini tidak terindeks mesin pencari.</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="text-xs text-slate-500 hover:text-[#0F2D5E] font-medium transition"
            >
              ← Lihat Halaman Publik
            </a>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full border border-slate-200 text-slate-500 text-xs font-semibold hover:border-red-300 hover:text-red-500 transition"
            >
              Keluar
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* Delete notification */}
        {deleteMsg && (
          <div className={`p-4 rounded-xl text-sm font-medium ${deleteMsg.startsWith('✅') ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' : 'bg-red-50 border border-red-200 text-red-600'}`}>
            {deleteMsg}
          </div>
        )}

        {/* Publish form */}
        <PublishJobForm onJobPublished={fetchJobs} />

        {/* Job management table */}
        <JobManagementTable jobs={jobs} loading={loading} onDelete={handleDelete} />
      </main>
    </div>
  );
}
