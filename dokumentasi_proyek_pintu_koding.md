# Pintu-Koding

**Pintu-Koding** adalah platform pembelajaran pemrograman web interaktif berbasis *Single Page Application* (SPA) yang dirancang untuk pemula. Aplikasi ini mengajarkan dasar-dasar **HTML, CSS, dan JavaScript** melalui pendekatan terstruktur yang dilengkapi dengan *Live Code Editor*, *real-time sandbox*, dan sistem validasi kode otomatis.

---

## Fitur Utama

### 1. Pembelajaran Interaktif dan Live Code Editor
* **In-Browser Code Editor:** Pengguna dapat menulis dan menguji kode HTML, CSS, dan JavaScript secara langsung di dalam peramban (*browser*) tanpa perlu instalasi perangkat lunak tambahan.
* **Real-Time Sandbox Preview:** Hasil eksekusi kode ditampilkan secara langsung di dalam *sandbox* yang terisolasi.
* **Automated Code Validator:** Sistem pemeriksa otomatis (`validator.js`, `css-checker.js`, `js-checker.js`) yang mengevaluasi struktur DOM, properti CSS, serta logika dan hasil eksekusi JavaScript pengguna pada setiap level.

### 2. Sistem Progres dan Gamifikasi
* **Experience Points (XP):** Perolehan poin setiap kali pengguna berhasil menyelesaikan materi dan tantangan koding.
* **Sistem Nyawa (Hearts):** Mekanisme evaluasi ketelitian dalam menulis kode yang terintegrasi dengan progres latihan.
* **Daily Streak:** Pelacakan konsistensi belajar harian pengguna.
* **Achievements:** Sistem pencapaian berdasarkan ketuntasan level dan penguasaan materi.
* **Penyimpanan Lokal (Local Persistence):** Seluruh progres belajar, XP, *streak*, dan status pengguna disimpan secara otomatis di `localStorage` peramban melalui modul `storage.js`.

### 3. Desain Antarmuka dan Responsivitas
* **Alur Aplikasi Terpadu:** Mencakup *Splash Screen*, *Onboarding* untuk pengguna baru, *Dashboard* kurikulum, dan antarmuka *Lesson Editor*.
* **Desain Responsif:** Tata letak yang menyesuaikan berbagai resolusi layar, mulai dari perangkat seluler (*mobile* 320px+), tablet, hingga desktop.

---

## Kurikulum Pembelajaran

Kurikulum terdiri dari 32 level yang dibagi ke dalam tiga modul utama:

1. **Modul 1: Dasar HTML (Level 1 – 12)**
   * Struktur dasar dokumen HTML, *heading*, paragraf, daftar (*list*), tautan (*link*), gambar, tabel, formulir, dan elemen HTML semantik.
2. **Modul 2: Styling dengan CSS (Level 13 – 22)**
   * Selektor dasar, warna, tipografi, *Box Model* (*margin, padding, border*), *Flexbox*, *CSS Grid*, dan desain responsif.
3. **Modul 3: Logika JavaScript (Level 23 – 32)**
   * Variabel, tipe data, operator, struktur percabangan (`if/else`), perulangan (*loops*), fungsi (*functions*), *array*, *object*, serta manipulasi DOM dan *Event Listener*.

---

## Struktur Direktori

```text
Pintu-Koding/
├── index.html                  # Entry point utama aplikasi (SPA)
├── docs/                       # Dokumentasi teknis dan laporan QA
│   ├── PINTUKODING_AUDIT.md
│   └── QA_REPORT.md
├── scripts/
│   └── generate_data.js        # Utilitas pembuat data kurikulum
├── src/
│   ├── css/                    # Stylesheets modular
│   │   ├── style.css           # Variabel global (:root), reset, dan gaya dasar
│   │   ├── splash.css          # Gaya tampilan Splash Screen
│   │   ├── onboarding.css      # Gaya tampilan pengenalan pengguna baru
│   │   ├── dashboard.css       # Gaya tampilan utama, peta level, dan statistik
│   │   ├── lesson.css          # Tata letak ruang belajar dan instruksi materi
│   │   ├── editor.css          # Gaya tampilan Code Editor dan panel pratinjau
│   │   ├── components.css      # Komponen UI (modal, tombol, lencana, notifikasi)
│   │   └── responsive.css      # Media queries untuk berbagai ukuran layar
│   └── js/
│       ├── app.js              # Inisialisasi aplikasi dan pengatur navigasi layar
│       ├── core/               # Manajemen state dan penyimpanan inti
│       │   ├── events.js       # Pengelola event listener aplikasi
│       │   ├── state.js        # Manajemen state terpusat
│       │   └── storage.js      # Abstraksi penyimpanan LocalStorage
│       ├── editor/             # Modul Code Editor dan Validator
│       │   ├── editor.js       # Logika interaksi editor kode
│       │   ├── sandbox.js      # Eksekusi dan rendering pratinjau kode
│       │   ├── validator.js    # Orkestrator validasi jawaban pengguna
│       │   ├── css-checker.js  # Pemeriksa aturan dan properti CSS
│       │   └── js-checker.js   # Pemeriksa sintaks dan logika JavaScript
│       ├── gamification/       # Modul progres dan gamifikasi
│       │   ├── achievements.js # Manajemen pencapaian pengguna
│       │   ├── hearts.js       # Manajemen sistem nyawa
│       │   ├── progress.js     # Pelacakan ketuntasan level dan modul
│       │   ├── streak.js       # Perhitungan konsistensi belajar harian
│       │   └── xp.js           # Perhitungan poin pengalaman (XP)
│       └── lessons/            # Data materi dan kurikulum
│           ├── data.js         # Struktur data utama kurikulum
│           ├── exercises.js    # Daftar latihan interaktif
│           ├── lessons.js      # Pengelola tampilan materi
│           ├── navigation.js   # Logika perpindahan soal dan level
│           ├── css/            # Materi spesifik CSS (Level 13 - 22)
│           └── js/             # Materi spesifik JavaScript (Level 23 - 32)
└── tests/                      # Automated Testing Suites
    ├── css-solutions.mjs       # Referensi solusi pengujian modul CSS
    ├── css-suite.mjs           # Pengujian otomatis validator CSS
    ├── js-solutions.mjs        # Referensi solusi pengujian modul JS
    ├── js-suite.mjs            # Pengujian otomatis validator JS
    ├── qa-editor.mjs           # Pengujian fungsionalitas Code Editor
    ├── qa-probe.mjs            # Pengujian integrasi komponen antarmuka
    └── v2-suite.mjs            # Pengujian komprehensif kurikulum v2
```

---

## Cara Menjalankan Proyek

Proyek ini dibangun menggunakan standar web murni (HTML5, CSS3, dan Vanilla JavaScript ES6+) tanpa ketergantungan *framework* eksternal pada sisi klien.

### 1. Menggunakan VS Code Live Server
1. Buka direktori `Pintu-Koding` di **Visual Studio Code**.
2. Pastikan ekstensi **Live Server** sudah terpasang.
3. Klik kanan pada file `index.html` lalu pilih **"Open with Live Server"**.
4. Aplikasi akan berjalan secara otomatis pada `http://127.0.0.1:5501` (sesuai konfigurasi `.vscode/settings.json`).

### 2. Menggunakan Server Lokal Alternatif (Node.js / Python)
* **Menggunakan Node.js (`npx serve`):**
  ```bash
  npx serve .
  ```
* **Menggunakan Python 3:**
  ```bash
  python -m http.server 8000
  ```
  Kemudian buka `http://localhost:8000` di peramban Anda.

---

## Menjalankan Pengujian (Testing)

Terdapat rangkaian pengujian otomatis di dalam direktori `tests/` untuk memverifikasi akurasi validator CSS, JavaScript, dan fungsionalitas editor. Pastikan **Node.js** telah terpasang di perangkat Anda, lalu jalankan perintah berikut di terminal:

```bash
# Menjalankan pengujian validator CSS
node tests/css-suite.mjs

# Menjalankan pengujian validator JavaScript
node tests/js-suite.mjs

# Menjalankan pengujian kurikulum menyeluruh
node tests/v2-suite.mjs
```

---

## Lisensi

Proyek ini dikembangkan untuk tujuan edukasi dan pembelajaran pemrograman web.