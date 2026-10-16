# PintuKoding — Final QA Report

Bug ditemukan & diperbaiki (semua diverifikasi dengan test otomatis Playwright):

1. Enter/Shift+Enter/angka di luar lesson memberi XP + lesson palsu ("null-null") — navigation.js
2. Teks berisi tag (<h1>, <textarea>, <label>...) dirender sebagai HTML: teks hilang, opsi soal Level 9 hilang sehingga Level 10-12 tidak bisa dibuka — exercises.js, lessons.js (richText)
3. Checklist mini project Level 5 punya syntax error → Level 6-12 terkunci selamanya — data.js
4. Soal "perbaiki kode" (5 soal) lulus tanpa diperbaiki — validator.js (wellFormed, rawMatch) + data.js
5. Final Project lulus tanpa diubah — data.js (cek placeholder [Nama Kamu])
6. Feedback validator challenge merusak tampilan (tag mentah) — exercises.js
7. Listener drag-drop bocor → error insertBefore — exercises.js
8. Tema editor CodeMirror tertimpa CSS CDN (editor putih, teks kontras rendah) — editor.css
9. CDN CodeMirror/Google Fonts yang lambat membekukan seluruh app (~8 dtk) — index.html, editor.js, app.js
10. Preview iframe memblokir script (onclick/alert tidak jalan) — sandbox allow-scripts allow-modals (tanpa same-origin)
11. Reset Progress tidak menghapus flag bonus XP — storage.js
12. localStorage diblokir/rusak membuat app crash — storage.js
13. Banner bonus harian muncul walau heart penuh; teks "+XP" salah saat lesson diulang; nama kosong tanpa feedback; placeholder gambar via.placeholder.com sudah mati → placehold.co

Responsive: menu bawah tampil di onboarding (menutupi tombol), Playground tidak ada di menu HP, 100vh → 100dvh, playground mobile, footer lesson meluap di layar kecil, kartu statistik yatim, onboarding terpotong di landscape, modal keluar layar, kbd di layar sentuh, tap target.
