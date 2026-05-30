# Pintar EXIM

MVP website pembelajaran Export Import Indonesia dengan tampilan mobile-first seperti versi Beta.

## Install

```bash
npm install
```

## Jalankan Lokal

```bash
npm run dev
```

## Build Produksi

```bash
npm run build
```

## Deploy ke Vercel

1. Import project ke Vercel.
2. Framework preset: Vite.
3. Build command: `npm run build`.
4. Output directory: `dist`.

`vercel.json` sudah disiapkan untuk fallback React Router SPA agar refresh route seperti `/peraturan/reg-001` tidak error.

## Environment Variables

Salin `.env.example` menjadi `.env` lalu isi Firebase jika sudah tersedia:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Jika Firebase belum diisi, aplikasi tetap bisa dibuka. Beberapa fitur akan memakai mode lokal/fallback sesuai implementasi MVP.
