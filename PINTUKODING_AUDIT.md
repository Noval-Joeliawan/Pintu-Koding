# PintuKoding — Audit & Improvement Notes

## Yang dipertahankan

- Arsitektur vanilla HTML/CSS/JavaScript tetap digunakan.
- Modul lesson, exercise, editor, progress, XP, streak, hearts, achievement, storage, dan navigation tetap dipakai.
- Data pembelajaran yang sudah ada tidak dihapus.

## Temuan utama yang diperbaiki

- Refill heart sebelumnya dapat menghitung refill yang terlalu banyak ketika timer sudah lewat beberapa interval; logikanya dibuat berbasis jadwal refill yang konsisten.
- Nilai `user.level` tidak lagi diganti menjadi string `Master`; level tetap numerik.
- Onboarding sekarang memberi feedback validasi saat nama kosong dan memperbaiki state aksesibilitas input.
- Form edit nama tidak lagi menaruh nama pengguna langsung ke atribut HTML modal.
- Learning Path memakai status locked / available / sedang dipelajari / completed yang lebih jelas.
- Inline hover handler di Learning Path diganti event listener JavaScript dan tombol semantik.
- Dashboard mendapat indikator level dan visual hierarchy yang lebih rapi.
- Responsive layout dan focus state diperkuat.
- Streak tidak lagi menggunakan `Math.abs`, sehingga perubahan tanggal mundur tidak dianggap otomatis sebagai streak beruntun.
- `iframe` preview diberi title dan modal/toast diberi metadata aksesibilitas.

## Validasi

- Semua file JavaScript lulus `node --check`.
- Tidak ada duplicate HTML `id` pada `index.html`.
- `index.html` dan `js/navigation.js` berhasil disajikan melalui local HTTP server untuk smoke test dasar.
