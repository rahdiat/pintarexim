// ============================================================
// TipsTrick.jsx — Tips & Trick Karir Ekspor Impor
// SEO-optimized content page
// ============================================================

const TIPS = [
  {
    id: 1,
    category: 'PPJK & Kepabeanan',
    categoryColor: 'bg-blue-50 text-blue-700',
    icon: '🛃',
    title: 'Kuasai CEISA 4.0 Sebelum Melamar Posisi PPJK',
    summary: 'CEISA 4.0 adalah sistem kepabeanan terbaru Direktorat Jenderal Bea dan Cukai. Menguasai sistem ini jadi nilai jual utama di CV Anda.',
    tips: [
      'Pelajari alur pengajuan PIB (Pemberitahuan Impor Barang) dan PEB (Pemberitahuan Ekspor Barang) di sistem CEISA 4.0 secara mandiri melalui simulasi online.',
      'Hafal kode BC yang sering muncul di lowongan: BC 2.0 (Impor Umum), BC 3.3 (Ekspor), BC 4.0 (Pemasukan ke Kawasan Berikat).',
      'Cantumkan pengalaman spesifik dengan CEISA di CV — misalnya jumlah PIB/PEB yang pernah diproses per bulan.',
      'Ikuti webinar gratis dari Bea Cukai atau komunitas PPJK untuk update regulasi terbaru.',
    ],
    badge: 'Paling Dicari 2026',
    badgeColor: 'bg-emerald-500',
  },
  {
    id: 2,
    category: 'Ekspor',
    categoryColor: 'bg-cyan-50 text-cyan-700',
    icon: '🚢',
    title: 'Incoterms 2020 yang Wajib Dikuasai Exim Specialist',
    summary: 'Kesalahan memilih Incoterms bisa merugikan perusahaan miliaran rupiah. Pahami 11 term ini dan Anda jadi kandidat paling siap kerja.',
    tips: [
      'Kuasai 4 Incoterms paling umum di Indonesia: FOB (Free On Board), CIF (Cost Insurance Freight), EXW (Ex Works), dan DDP (Delivered Duty Paid).',
      'Pelajari perbedaan risk transfer pada setiap term — ini pertanyaan favorit interviewer perusahaan ekspor.',
      'Pahami hubungan Incoterms dengan Letter of Credit (L/C) dan dokumen shipping seperti Bill of Lading.',
      'Sertakan contoh kasus nyata penerapan Incoterms saat wawancara untuk menonjolkan pemahaman praktis Anda.',
    ],
    badge: 'Wajib Dikuasai',
    badgeColor: 'bg-blue-500',
  },
  {
    id: 3,
    category: 'CV & Lamaran',
    categoryColor: 'bg-purple-50 text-purple-700',
    icon: '📄',
    title: 'Cara Menulis CV Exim yang Lolos ATS dan Memikat HRD',
    summary: 'CV ekspor-impor yang baik bukan hanya cantik — harus penuh kata kunci industri yang dibaca sistem ATS perusahaan besar.',
    tips: [
      'Cantumkan keyword industri secara eksplisit: CEISA 4.0, PIB, PEB, HS Code, L/C, Bill of Lading, Incoterms 2020, Kawasan Berikat.',
      'Gunakan angka konkret: "Memproses rata-rata 50 PIB/bulan" jauh lebih kuat dari "berpengalaman di bidang impor".',
      'Pisahkan bagian "Keahlian Teknis" khusus untuk software: CEISA, SAP, Oracle, atau sistem ERP perusahaan sebelumnya.',
      'Sesuaikan summary CV dengan deskripsi lowongan — baca JD dengan teliti dan mirror kata kuncinya.',
    ],
    badge: 'Tips Praktis',
    badgeColor: 'bg-purple-500',
  },
  {
    id: 4,
    category: 'Logistik & Warehouse',
    categoryColor: 'bg-amber-50 text-amber-700',
    icon: '🏭',
    title: 'Karir di Kawasan Berikat: Peluang Besar yang Sering Terlewat',
    summary: 'Kawasan Berikat menawarkan benefit lebih tinggi karena orientasi ekspor. Ini cara memposisikan diri sebagai kandidat ideal.',
    tips: [
      'Pahami regulasi khusus Kawasan Berikat: BC 4.0 (pemasukan), BC 4.1 (pengeluaran), dan laporan berkala ke Bea Cukai.',
      'Kuasai Warehouse Management System (WMS) — mayoritas perusahaan KB sudah digital dan mensyaratkan ini.',
      'Sertifikasi K3 (Keselamatan dan Kesehatan Kerja) jadi nilai tambah signifikan untuk posisi warehouse supervisor.',
      'Bangun network dengan komunitas logistik di LinkedIn — banyak lowongan KB tidak diposting publik.',
    ],
    badge: 'Peluang Besar',
    badgeColor: 'bg-amber-500',
  },
  {
    id: 5,
    category: 'Impor',
    categoryColor: 'bg-rose-50 text-rose-700',
    icon: '📦',
    title: 'Klasifikasi HS Code: Skill yang Paling Langka dan Dibayar Mahal',
    summary: 'Hanya sedikit profesional yang benar-benar mahir HS Code. Kuasai ini dan posisi tawar gaji Anda meningkat drastis.',
    tips: [
      'Pelajari struktur HS Code: 6 digit internasional + 2 digit nasional. Gunakan BTKI (Buku Tarif Kepabeanan Indonesia) edisi terbaru.',
      'Latih diri dengan database HS Code Bea Cukai online — coba klasifikasikan 5 jenis barang berbeda setiap hari.',
      'Pahami dampak tarif Bea Masuk dan PPN Impor dari setiap klasifikasi — kesalahan klasifikasi bisa kena denda.',
      'Sertifikasi resmi PPJK dari Bea Cukai atau lembaga terakreditasi akan sangat menguatkan profil Anda.',
    ],
    badge: 'High Value Skill',
    badgeColor: 'bg-rose-500',
  },
  {
    id: 6,
    category: 'Interview & Negosiasi',
    categoryColor: 'bg-green-50 text-green-700',
    icon: '🎯',
    title: 'Pertanyaan Interview Exim Paling Sering + Jawaban Terbaik',
    summary: 'Interviewer di perusahaan ekspor-impor punya pola pertanyaan yang bisa diprediksi. Persiapkan jawaban ini dan tampil percaya diri.',
    tips: [
      '"Jelaskan alur proses impor dari PO hingga barang masuk gudang" — pelajari flowchart lengkap dan hapal tiap tahapannya.',
      '"Apa yang Anda lakukan jika PIB Anda ditahan Bea Cukai?" — jawab dengan langkah sistematis: cek notifikasi CEISA, koordinasi Surveyor, siapkan dokumen pendukung.',
      '"Berapa target gaji Anda?" — riset benchmark gaji posisi sejenis di Glassdoor, Jobstreet, dan Pintar Exim Jobs sebelum menjawab.',
      'Selalu siapkan 2-3 pertanyaan untuk interviewer tentang: sistem yang digunakan, scope tanggung jawab, dan jalur karir.',
    ],
    badge: 'Persiapan Interview',
    badgeColor: 'bg-green-500',
  },
];

// Nav & footer dihandle App.jsx — tidak ada duplikasi di sini

export default function TipsTrick() {
  return (
    <div className="bg-[#F8FAFC] font-sans">

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#0F2D5E] text-[11px] font-bold mb-5 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Panduan Karir Exim
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0F2D5E] leading-tight tracking-tight mb-4 max-w-3xl mx-auto">
            Tips & Trick Sukses Berkarir di{' '}
            <span className="text-blue-500">Ekspor, Impor & Logistik</span> Indonesia
          </h1>
          <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Panduan praktis dari para profesional Exim — mulai dari menguasai CEISA 4.0, menulis CV yang lolos ATS, hingga strategi negosiasi gaji di industri logistik.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {[
              { n: '6', label: 'Topik Utama' },
              { n: '24+', label: 'Tips Praktis' },
              { n: '100%', label: 'Gratis' },
            ].map(s => (
              <div key={s.label}>
                <p className="text-2xl font-extrabold text-[#0F2D5E]">{s.n}</p>
                <p className="text-xs text-slate-400 font-medium mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BREADCRUMB ────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <nav className="text-xs text-slate-400">
          <a href="/" className="text-blue-500 hover:underline">Beranda</a>
          <span className="mx-2">›</span>
          <span className="text-slate-600 font-medium">Tips &amp; Trick</span>
        </nav>
      </div>

      {/* ── TIPS GRID ─────────────────────────────────────────── */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {TIPS.map((tip) => (
            <article
              key={tip.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-200 overflow-hidden group"
            >
              {/* Card header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    {/* Icon */}
                    <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-xl flex-shrink-0">
                      {tip.icon}
                    </div>
                    <div>
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${tip.categoryColor}`}>
                        {tip.category}
                      </span>
                    </div>
                  </div>
                  {/* Badge */}
                  <span className={`flex-shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white ${tip.badgeColor}`}>
                    {tip.badge}
                  </span>
                </div>

                <h2 className="text-lg font-extrabold text-[#0F2D5E] leading-snug mb-2 group-hover:text-blue-700 transition-colors">
                  {tip.title}
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {tip.summary}
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-slate-100 mx-6" />

              {/* Tips list */}
              <div className="p-6 pt-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Tips Praktis</p>
                <ol className="space-y-3">
                  {tip.tips.map((t, i) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-50 text-blue-600 text-[11px] font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </article>
          ))}
        </div>

        {/* ── CTA Bottom ──────────────────────────────────────── */}
        <div className="mt-12 bg-gradient-to-br from-[#0F2D5E] to-[#1a3f7a] rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          {/* Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <p className="text-blue-300 text-[11px] font-bold uppercase tracking-widest mb-3">Siap Memulai?</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Temukan Lowongan Sesuai Keahlianmu
            </h2>
            <p className="text-blue-200 text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
              Setelah menguasai tips di atas, saatnya apply ke perusahaan ekspor-impor terpercaya di seluruh Indonesia.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/"
                className="px-7 py-3.5 rounded-full bg-white text-[#0F2D5E] font-bold text-sm hover:bg-blue-50 transition shadow-lg"
              >
                Cari Lowongan Sekarang →
              </a>
              <a
                href="/pasang-lowongan"
                className="px-7 py-3.5 rounded-full border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition"
              >
                Pasang Lowongan
              </a>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}
