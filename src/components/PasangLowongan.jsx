// ============================================================
// PasangLowongan.jsx — Form Pasang Lowongan (Ticket Request)
// Nav & footer dihandle App.jsx — tidak ada duplikasi di sini
// ============================================================

import { useState } from 'react';

const EMPTY_FORM = {
  company_name:    '',
  contact_name:    '',
  contact_email:   '',
  contact_phone:   '',
  contact_position:'',
  job_title:       '',
  job_category:    '',
  job_type:        '',
  job_location:    '',
  salary_range:    '',
  requirements:    '',
  description:     '',
  deadline:        '',
};

const STEPS = [
  { n: 1, label: 'Info Perusahaan' },
  { n: 2, label: 'Detail Posisi' },
  { n: 3, label: 'Konfirmasi' },
];

const BENEFITS = [
  { icon: '🎯', title: 'Kandidat Tepat Sasaran', desc: 'Database ribuan profesional Exim, PPJK & Logistik yang aktif mencari kerja.' },
  { icon: '⚡', title: 'Proses 1×24 Jam', desc: 'Lowongan Anda tayang dalam satu hari kerja setelah verifikasi tim kami.' },
  { icon: '🆓', title: 'Sepenuhnya Gratis', desc: 'Tidak ada biaya pasang iklan. Platform ini gratis untuk perusahaan dan pencari kerja.' },
  { icon: '🌏', title: 'Jangkauan Nasional', desc: 'Kandidat dari seluruh kawasan industri Indonesia — Jabodetabek, Jawa, Sumatera & lebih.' },
];

function Field({ label, required, children, hint }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
    </div>
  );
}

const IC = "w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-400 transition bg-white";

export default function PasangLowongan() {
  const [step,    setStep]    = useState(1);
  const [form,    setForm]    = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [done,    setDone]    = useState(false);
  const [error,   setError]   = useState('');

  const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const canNext1 = form.company_name && form.contact_name && form.contact_email;
  const canNext2 = form.job_title && form.job_category && form.job_type && form.description;

  const handleSubmit = async () => {
    setLoading(true); setError('');
    try {
      const res  = await fetch('/api/pasang-lowongan.php', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const text = await res.text();
      let json; try { json = JSON.parse(text); } catch { throw new Error(`Response tidak valid: ${text.substring(0,100)}`); }
      if (!res.ok) throw new Error(json.error || 'Gagal mengirim.');
      setDone(true);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  // ── Success ──────────────────────────────────────────────────
  if (done) {
    return (
      <div className="bg-[#F8FAFC] font-sans">
        <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 rounded-full bg-emerald-50 border-4 border-emerald-200 flex items-center justify-center mx-auto mb-6 text-4xl">✅</div>
            <h2 className="text-2xl font-extrabold text-[#0F2D5E] mb-3">Permintaan Terkirim!</h2>
            <p className="text-slate-500 leading-relaxed mb-2">
              Tiket lowongan <strong className="text-slate-700">{form.job_title}</strong> dari{' '}
              <strong className="text-slate-700">{form.company_name}</strong> berhasil dikirim.
            </p>
            <p className="text-slate-400 text-sm mb-8">
              Konfirmasi dikirim ke <strong>{form.contact_email}</strong>.<br />
              Tim kami akan menghubungi Anda dalam <strong>1×24 jam kerja</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/" className="px-6 py-3 rounded-full bg-[#0F2D5E] text-white font-semibold text-sm hover:bg-[#1a3f7a] transition">Lihat Lowongan</a>
              <button onClick={() => { setDone(false); setStep(1); setForm(EMPTY_FORM); }}
                className="px-6 py-3 rounded-full border-2 border-slate-200 text-slate-600 font-semibold text-sm hover:border-slate-400 transition">
                Pasang Lagi
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] font-sans">

      {/* ══ HERO — 2 kolom: kiri copy eye-catching, kanan benefit cards ══ */}
      <section className="bg-white border-b border-slate-100 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[420px] items-center">

            {/* ── Kiri: headline & CTA scroll ── */}
            <div className="py-14 lg:py-20 lg:pr-12">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-bold mb-5 tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse flex-shrink-0" />
                Untuk Perusahaan &amp; HRD
              </div>

              <h1 className="text-[28px] sm:text-[34px] lg:text-[40px] font-extrabold text-[#0F2D5E] leading-[1.18] tracking-tight mb-4">
                Temukan Kandidat{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-blue-500">Exim & Logistik</span>
                  <svg aria-hidden="true" className="absolute -bottom-0.5 left-0 w-full" height="5" viewBox="0 0 220 5" preserveAspectRatio="none">
                    <path d="M0 4 Q110 0 220 4" stroke="#93C5FD" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  </svg>
                </span>{' '}
                Terbaik Indonesia
              </h1>

              <p className="text-slate-500 text-[15px] sm:text-base leading-relaxed mb-7 max-w-[440px]">
                Jangkau ribuan profesional aktif di bidang <strong className="text-slate-700">Ekspor-Impor</strong>,{' '}
                <strong className="text-slate-700">PPJK</strong>, dan <strong className="text-slate-700">Logistik</strong>.
                Pasang lowongan gratis — tayang dalam 24 jam.
              </p>

              {/* Trust row */}
              <div className="flex flex-wrap gap-3 mb-8">
                {['✓ 100% Gratis', '✓ Tayang 24 Jam', '✓ Kandidat Terverifikasi'].map(t => (
                  <span key={t} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                    {t}
                  </span>
                ))}
              </div>

              {/* CTA scroll ke form */}
              <a
                href="#form-ticket"
                className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-[#0F2D5E] text-white font-bold text-sm hover:bg-[#1a3f7a] active:scale-[0.98] transition-all shadow-lg shadow-blue-900/20 group"
              >
                <span>Pasang Lowongan Sekarang</span>
                <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </a>
            </div>

            {/* ── Kanan: benefit cards grid ── */}
            <div className="hidden lg:grid grid-cols-2 gap-3 py-10">
              {BENEFITS.map((b) => (
                <div key={b.title}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md hover:border-blue-100 transition-all duration-200 group">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                    {b.icon}
                  </div>
                  <p className="text-sm font-bold text-[#0F2D5E] mb-1">{b.title}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Breadcrumb ─────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
        <nav className="text-xs text-slate-400">
          <a href="/" className="text-blue-500 hover:underline">Beranda</a>
          <span className="mx-2">›</span>
          <span className="text-slate-600 font-medium">Pasang Lowongan</span>
        </nav>
      </div>

      {/* ══ FORM TICKET ════════════════════════════════════════════ */}
      <main id="form-ticket" className="max-w-4xl mx-auto w-full px-4 sm:px-6 pb-24 scroll-mt-20">

        {/* Mobile benefit pills */}
        <div className="lg:hidden flex flex-wrap gap-2 mb-6">
          {BENEFITS.map(b => (
            <span key={b.title} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-medium shadow-sm">
              {b.icon} {b.title}
            </span>
          ))}
        </div>

        {/* Ticket card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">

          {/* ── Ticket header ── */}
          <div className="bg-gradient-to-r from-[#0F2D5E] to-[#1a4a8a] px-6 sm:px-8 py-6 relative overflow-hidden">
            {/* Subtle pattern */}
            <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />

            <div className="relative flex items-start justify-between mb-6">
              <div>
                <p className="text-blue-300 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Request Ticket</p>
                <p className="text-white font-extrabold text-xl leading-tight">Formulir Pasang Lowongan</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-blue-300 text-[10px] font-bold tracking-widest">TICKET ID</p>
                <p className="text-white font-mono text-sm font-bold mt-0.5">#PEJ-{String(Date.now()).slice(-6)}</p>
              </div>
            </div>

            {/* Step progress */}
            <div className="relative flex items-center">
              {STEPS.map((s, i) => (
                <div key={s.n} className="flex items-center flex-1">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all duration-300 ring-2 ring-offset-1 ring-offset-[#0F2D5E]
                      ${step > s.n  ? 'bg-emerald-400 text-white ring-emerald-400'
                        : step === s.n ? 'bg-white text-[#0F2D5E] ring-white shadow-lg'
                        : 'bg-white/15 text-white/40 ring-white/20'}`}>
                      {step > s.n ? '✓' : s.n}
                    </div>
                    <div className="hidden sm:block">
                      <p className={`text-[11px] font-bold leading-none transition-all ${step === s.n ? 'text-white' : 'text-white/40'}`}>{s.label}</p>
                      {step === s.n && <p className="text-blue-300 text-[10px] mt-0.5">Langkah aktif</p>}
                    </div>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`h-0.5 flex-1 mx-3 sm:mx-4 rounded-full transition-all duration-500 ${step > s.n ? 'bg-emerald-400' : 'bg-white/20'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Perforated edge */}
          <div className="relative flex items-center">
            <div className="absolute -left-3 w-6 h-6 rounded-full bg-[#F8FAFC] border border-slate-200 flex-shrink-0" />
            <div className="absolute -right-3 w-6 h-6 rounded-full bg-[#F8FAFC] border border-slate-200 flex-shrink-0" />
            <div className="w-full border-t-2 border-dashed border-slate-200 mx-4" />
          </div>

          {/* ── Form body ── */}
          <div className="px-6 sm:px-8 py-8">

            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-5">
                <div className="mb-6">
                  <h2 className="text-lg font-extrabold text-[#0F2D5E]">Informasi Perusahaan</h2>
                  <p className="text-slate-400 text-sm mt-1">Data perusahaan dan kontak person yang dapat dihubungi.</p>
                </div>
                <Field label="Nama Perusahaan" required>
                  <input name="company_name" value={form.company_name} onChange={handle}
                    placeholder="PT Contoh Ekspor Indonesia" className={IC} />
                </Field>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Nama PIC / Kontak" required>
                    <input name="contact_name" value={form.contact_name} onChange={handle}
                      placeholder="Budi Santoso" className={IC} />
                  </Field>
                  <Field label="Jabatan PIC">
                    <input name="contact_position" value={form.contact_position} onChange={handle}
                      placeholder="HRD Manager" className={IC} />
                  </Field>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Email" required hint="Konfirmasi akan dikirim ke sini">
                    <input name="contact_email" type="email" value={form.contact_email} onChange={handle}
                      placeholder="hrd@perusahaan.com" className={IC} />
                  </Field>
                  <Field label="No. WhatsApp / Telepon">
                    <input name="contact_phone" value={form.contact_phone} onChange={handle}
                      placeholder="08xx-xxxx-xxxx" className={IC} />
                  </Field>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-5">
                <div className="mb-6">
                  <h2 className="text-lg font-extrabold text-[#0F2D5E]">Detail Posisi Lowongan</h2>
                  <p className="text-slate-400 text-sm mt-1">Informasi posisi yang ingin Anda buka.</p>
                </div>
                <Field label="Judul Posisi" required>
                  <input name="job_title" value={form.job_title} onChange={handle}
                    placeholder="Staff PPJK / Customs Declarant" className={IC} />
                </Field>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Bidang / Kategori" required>
                    <select name="job_category" value={form.job_category} onChange={handle} className={IC}>
                      <option value="">Pilih bidang…</option>
                      {['Import','Export','PPJK','Warehouse','Logistik','Lainnya'].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </Field>
                  <Field label="Tipe Pekerjaan" required>
                    <select name="job_type" value={form.job_type} onChange={handle} className={IC}>
                      <option value="">Pilih tipe…</option>
                      {['Full-time','Contract','Part-time','Internship'].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </Field>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Lokasi Penempatan">
                    <input name="job_location" value={form.job_location} onChange={handle}
                      placeholder="Cikarang, Bekasi / Remote" className={IC} />
                  </Field>
                  <Field label="Range Gaji" hint="Opsional — lebih menarik jika dicantumkan">
                    <input name="salary_range" value={form.salary_range} onChange={handle}
                      placeholder="Rp 6.000.000 – Rp 9.000.000" className={IC} />
                  </Field>
                </div>
                <Field label="Kualifikasi & Persyaratan">
                  <textarea name="requirements" value={form.requirements} onChange={handle} rows={3}
                    placeholder="Min. D3/S1, Pengalaman 2 tahun, Menguasai CEISA 4.0…"
                    className={`${IC} resize-none`} />
                </Field>
                <Field label="Deskripsi Pekerjaan" required>
                  <textarea name="description" value={form.description} onChange={handle} rows={4}
                    placeholder="Jelaskan tanggung jawab, lingkup kerja, dan benefit yang ditawarkan…"
                    className={`${IC} resize-none`} />
                </Field>
                <Field label="Batas Waktu Lamaran" hint="Opsional">
                  <input name="deadline" type="date" value={form.deadline} onChange={handle} className={IC} />
                </Field>
              </div>
            )}

            {/* STEP 3 — Review */}
            {step === 3 && (
              <div className="space-y-5">
                <div className="mb-6">
                  <h2 className="text-lg font-extrabold text-[#0F2D5E]">Konfirmasi &amp; Kirim</h2>
                  <p className="text-slate-400 text-sm mt-1">Periksa kembali sebelum mengirim permintaan.</p>
                </div>

                {[
                  { title: 'Informasi Perusahaan', icon: '🏢', rows: [
                    ['Perusahaan', form.company_name], ['PIC', form.contact_name],
                    ['Jabatan', form.contact_position || '—'], ['Email', form.contact_email],
                    ['WhatsApp', form.contact_phone || '—'],
                  ]},
                  { title: 'Detail Posisi', icon: '💼', rows: [
                    ['Posisi', form.job_title], ['Kategori', form.job_category],
                    ['Tipe', form.job_type], ['Lokasi', form.job_location || '—'],
                    ['Gaji', form.salary_range || '—'], ['Deadline', form.deadline || '—'],
                  ]},
                ].map(card => (
                  <div key={card.title} className="bg-slate-50 rounded-2xl border border-slate-100 p-5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      {card.icon} {card.title}
                    </p>
                    <dl className="grid grid-cols-2 gap-x-6 gap-y-3">
                      {card.rows.map(([k, v]) => (
                        <div key={k}>
                          <dt className="text-[11px] text-slate-400 font-medium">{k}</dt>
                          <dd className="text-sm font-semibold text-slate-700 mt-0.5 break-words">{v}</dd>
                        </div>
                      ))}
                    </dl>
                    {card.title === 'Detail Posisi' && form.description && (
                      <div className="mt-4 pt-4 border-t border-slate-200">
                        <dt className="text-[11px] text-slate-400 font-medium mb-1">Deskripsi</dt>
                        <dd className="text-sm text-slate-600 leading-relaxed line-clamp-3">{form.description}</dd>
                      </div>
                    )}
                  </div>
                ))}

                <div className="flex gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100">
                  <span className="text-blue-500 text-lg flex-shrink-0">ℹ️</span>
                  <p className="text-blue-700 text-sm leading-relaxed">
                    Konfirmasi dikirim ke <strong>{form.contact_email}</strong>.
                    Tim akan menghubungi dalam <strong>1×24 jam kerja</strong>.
                  </p>
                </div>

                {error && (
                  <div className="flex gap-3 p-4 rounded-xl bg-red-50 border border-red-200">
                    <span className="text-red-400">⚠️</span>
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}
              </div>
            )}

            {/* ── Navigation ── */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
              {step > 1 ? (
                <button onClick={() => setStep(s => s - 1)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-slate-200 text-slate-600 text-sm font-semibold hover:border-slate-400 transition">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Kembali
                </button>
              ) : <div />}

              {step < 3 ? (
                <button onClick={() => setStep(s => s + 1)}
                  disabled={step === 1 ? !canNext1 : !canNext2}
                  className="flex items-center gap-2 px-7 py-3 rounded-full bg-[#0F2D5E] text-white text-sm font-bold hover:bg-[#1a3f7a] disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all shadow-sm">
                  Lanjut
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <button onClick={handleSubmit} disabled={loading}
                  className="flex items-center gap-2 px-7 py-3 rounded-full bg-emerald-500 text-white text-sm font-bold hover:bg-emerald-600 disabled:opacity-60 active:scale-95 transition-all shadow-md shadow-emerald-200">
                  {loading
                    ? <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Mengirim…</>
                    : <>🚀 Kirim Permintaan</>
                  }
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
