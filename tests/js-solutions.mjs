// tests/js-solutions.mjs — Jawaban acuan untuk setiap latihan Jalur JavaScript (Level 23–32).
//
// Kunci: "<levelId>-<lessonId>-<indeks slide mulai 0>".
// Nilai:
//   string            → kode JavaScript lengkap (mengganti kode awal string)
//   { js: '...' }     → untuk latihan DOM (starterCode objek {html, js}): ganti isi script.js
//                       dan pertahankan index.html dari kode awal
// Jawaban acuan harus LOLOS validator; kode awal/rusak HARUS GAGAL (diperiksa tests/js-suite.mjs).

export const solutions = {
  // ===== Level 23 — JS Level 1: Pengenalan JavaScript =====
  "23-2-6": 'console.log("Halo, Dunia!");',
  "23-2-7": 'console.log("Nama: Rina");\nconsole.log("Hobi: menggambar");',
  "23-3-5": 'console.log("Halo");',
  "23-3-6": '// Aku rajin ngoding\nconsole.log("Saya belajar JS");',
  "23-4-3": 'console.log("Hai");',
  "23-4-4": 'console.log("Belajar itu seru");',
  "23-5-1":
    'console.log("==========");\n' +
    'console.log("Nama: Budi");\n' +
    'console.log("Umur: 15");\n' +
    'console.log("Hobi: membaca");\n' +
    'console.log("==========");',

  // ===== Level 24 — JS Level 2: Variabel & Tipe Data =====
  "24-1-6": 'const kota = "Bandung";\nconsole.log(kota);',
  "24-2-5": "let nilai = 70;\nnilai = 85;\nconsole.log(nilai);",
  "24-2-6": "let sisa = 100;\nsisa = sisa - 30;\nconsole.log(sisa);",
  "24-3-6":
    'const nama = "Dewi";\nconst umur = 14;\nconst aktif = true;\n' +
    "console.log(nama);\nconsole.log(umur);\nconsole.log(aktif);",
  "24-4-5": 'const nama = "Budi";\nconsole.log(`Halo, ${nama}!`);',
  "24-5-1":
    'const nama = "Budi";\nconst umur = 15;\nconst hobi = "membaca";\nconst aktif = true;\n' +
    'console.log("=====");\n' +
    "console.log(`Nama: ${nama}`);\n" +
    "console.log(`Umur: ${umur}`);\n" +
    "console.log(`Hobi: ${hobi}`);\n" +
    'console.log(`Status: ${aktif ? "Aktif belajar" : "Istirahat"}`);',

  // ===== Level 25 — JS Level 3: Operator Aritmatika & String =====
  "25-1-6": "const hasil = 15 * 4;\nconsole.log(hasil);",
  "25-2-4": "const sisa = 10 % 3;\nconsole.log(sisa);",
  "25-2-5": "const detik = 130;\nconst sisa = detik % 60;\nconsole.log(sisa);",
  "25-3-5":
    'const depan = "Ani";\nconst belakang = "Rahma";\nconsole.log(depan + " " + belakang);',
  "25-4-4": 'const nama = "Budi";\nconsole.log(`Halo, ${nama}!`);',
  "25-4-5":
    'const barang = "Pensil";\nconst harga = 3000;\nconsole.log(`Barang: ${barang}, Harga: Rp${harga}`);',
  "25-5-1":
    'const barang = "Pensil";\nconst hargaSatuan = 3000;\nconst jumlah = 5;\nconst total = hargaSatuan * jumlah;\n' +
    'console.log("==========");\n' +
    "console.log(`Barang: ${barang}`);\n" +
    "console.log(`Harga satuan: Rp${hargaSatuan}`);\n" +
    "console.log(`Jumlah: ${jumlah}`);\n" +
    "console.log(`Total: Rp${total}`);",

  // ===== Level 26 — JS Level 4: Perbandingan & Logika =====
  "26-1-5": "console.log(10 === 10);\nconsole.log(3 !== 3);",
  "26-2-5": "const sama = 5 === 5;\nconsole.log(sama);",
  "26-3-5":
    "const umur = 17;\nconst punyaKTP = true;\n" +
    "console.log(umur >= 17 && punyaKTP);\n" +
    "console.log(umur < 16 || punyaKTP);",
  "26-4-5": "console.log(!true);\nconsole.log(!(2 < 1));",
  "26-5-1":
    "const umur = 15;\nconst punyaKartu = true;\nconst ditemaniGuru = false;\n" +
    "console.log(`Umur cukup: ${umur >= 12}`);\n" +
    "console.log(`Boleh masuk (kartu/guru): ${punyaKartu || ditemaniGuru}`);\n" +
    "console.log(`Syarat lengkap: ${umur >= 12 && (punyaKartu || ditemaniGuru)}`);\n" +
    "console.log(`Ditemani guru saja: ${ditemaniGuru}`);",

  // ===== Level 27 — JS Level 5: Percabangan if / else =====
  "27-1-6": 'const suhu = 35;\nif (suhu > 30) {\n  console.log("Panas");\n}',
  "27-2-5": 'const suhu = 20;\nif (suhu < 25) {\n  console.log("Dingin");\n}',
  "27-2-6":
    'const nilai = 60;\nif (nilai >= 75) {\n  console.log("Lulus");\n} else {\n  console.log("Belum Lulus");\n}',
  "27-3-4":
    'const umur = 18;\nif (umur >= 17) {\n  console.log("Boleh buat KTP");\n}',
  "27-3-5":
    'const jam = 21;\nif (jam >= 18 && jam < 22) {\n  console.log("Waktu belajar malam");\n} else {\n  console.log("Waktu istirahat");\n}',
  "27-4-4":
    'const sandi = "rahasia";\nconst tebakan = "rahasia";\n' +
    'if (tebakan === sandi) {\n  console.log("Berhasil masuk");\n} else {\n  console.log("Sandi salah");\n}',
  "27-5-1":
    "const umur = 10;\nconst punyaKartu = true;\n" +
    'if (umur <= 12) {\n  console.log("Tarif: Anak");\n} else {\n  console.log("Tarif: Dewasa");\n}\n' +
    'if (punyaKartu === true) {\n  console.log("Naik: Boleh");\n} else {\n  console.log("Naik: Bayar tunai");\n}',

  // ===== Level 28 — JS Level 6: else if & switch =====
  "28-1-5":
    'const nilai = 82;\nif (nilai >= 90) {\n  console.log("Grade A");\n}' +
    ' else if (nilai >= 80) {\n  console.log("Grade B");\n} else {\n  console.log("Grade C");\n}',
  "28-2-3": 'const nilai = 95;\nif (nilai >= 90) {\n  console.log("A");\n}',
  "28-2-4":
    'const suhu = 5;\nif (suhu <= 0) {\n  console.log("Membeku");\n}' +
    ' else if (suhu <= 15) {\n  console.log("Dingin");\n} else {\n  console.log("Normal");\n}',
  "28-3-6":
    'const buah = "mangga";\nswitch (buah) {\n' +
    '  case "mangga":\n    console.log("Manis");\n    break;\n' +
    '  case "lemon":\n    console.log("Asam");\n    break;\n' +
    '  default:\n    console.log("Tidak dikenal");\n}',
  "28-4-4":
    "const angka = 3;\nswitch (angka) {\n" +
    '  case 1:\n    console.log("Satu");\n    break;\n' +
    '  case 2:\n    console.log("Dua");\n    break;\n' +
    '  case 3:\n    console.log("Tiga");\n    break;\n' +
    '  default:\n    console.log("Lainnya");\n}',
  "28-5-1":
    'const kode = "B2";\nswitch (kode) {\n' +
    '  case "A1":\n    console.log("Air Mineral");\n    break;\n' +
    '  case "B2":\n    console.log("Teh Kotak");\n    break;\n' +
    '  case "C3":\n    console.log("Kopi Susu");\n    break;\n' +
    '  default:\n    console.log("Kode tidak dikenal");\n}',

  // ===== Level 29 — JS Level 7: Perulangan =====
  "29-1-7": "for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}",
  "29-2-5":
    "let sisa = 3;\nwhile (sisa > 0) {\n  console.log(sisa);\n  sisa--;\n}",
  "29-3-3": "for (let i = 1; i <= 3; i++) {\n  console.log(i);\n}",
  "29-3-4":
    "let total = 0;\nfor (let i = 1; i <= 100; i++) {\n  total = total + i;\n}\nconsole.log(total);",
  "29-4-3":
    "for (let baris = 1; baris <= 3; baris++) {\n" +
    '  for (let kolom = 1; kolom <= 3; kolom++) {\n    console.log(baris + "-" + kolom);\n  }\n}',
  "29-5-1":
    "const angka = 7;\nfor (let i = 1; i <= 10; i++) {\n  console.log(`7 x ${i} = ${angka * i}`);\n}",

  // ===== Level 30 — JS Level 8: Array Dasar =====
  "30-1-6":
    'const buah = ["apel", "jeruk", "mangga"];\nconsole.log(buah[0]);\nconsole.log(buah[2]);',
  "30-2-5":
    'let tugas = ["belajar"];\ntugas.push("menggambar");\ntugas.push("olahraga");\n' +
    "console.log(tugas[0]);\nconsole.log(tugas[1]);\nconsole.log(tugas[2]);",
  "30-3-4": 'const buah = ["a", "b", "c"];\nconsole.log(buah.length);',
  "30-3-5":
    'const nama = ["Ani", "Budi", "Citra"];\nconsole.log(nama.length);\nconsole.log(nama[nama.length - 1]);',
  "30-4-4":
    'const kota = ["Jakarta", "Bandung", "Surabaya"];\nfor (let i = 0; i < kota.length; i++) {\n  console.log(kota[i]);\n}',
  "30-5-1":
    'let belanja = ["telur", "beras", "susu", "roti"];\nbelanja.push("gula");\n' +
    "for (let i = 0; i < belanja.length; i++) {\n  console.log(`${i + 1}. ${belanja[i]}`);\n}\n" +
    "console.log(`Total: ${belanja.length} item`);",

  // ===== Level 31 — JS Level 9: Fungsi =====
  "31-1-7":
    'function perkenalan() {\n  console.log("Nama saya Dina");\n}\nperkenalan();',
  "31-2-5":
    "function luasPersegi(sisi) {\n  console.log(sisi * sisi);\n}\nluasPersegi(5);",
  "31-3-6":
    "function kali(a, b) {\n  return a * b;\n}\nconsole.log(kali(4, 5));",
  "31-3-7":
    "function hitungSisa(a, b) {\n  return a % b;\n}\nconsole.log(hitungSisa(10, 3));",
  "31-4-4":
    "function kartuProfil(nama, hobi) {\n  return `Nama: ${nama} | Hobi: ${hobi}`;\n}\n" +
    'console.log(kartuProfil("Eko", "fotografi"));',
  "31-5-1":
    "function tambah(a, b) {\n  return a + b;\n}\n" +
    "function kurang(a, b) {\n  return a - b;\n}\n" +
    "function kali(a, b) {\n  return a * b;\n}\n" +
    "function bagi(a, b) {\n  return a / b;\n}\n" +
    "console.log(`12 + 4 = ${tambah(12, 4)}`);\n" +
    "console.log(`12 - 4 = ${kurang(12, 4)}`);\n" +
    "console.log(`12 * 4 = ${kali(12, 4)}`);\n" +
    "console.log(`12 / 4 = ${bagi(12, 4)}`);",

  // ===== Level 32 — JS Level 10: Final Project (DOM & Event) =====
  // { js: '...' } → isi script.js; index.html dipertahankan dari kode awal slide.
  "32-1-5": {
    js: 'const judul = document.getElementById("judul");\njudul.textContent = "Saya Bisa JS!";',
  },
  "32-2-5": {
    js: 'const teks = document.querySelector("#teks");\nteks.style.color = "red";',
  },
  "32-3-5": {
    js:
      'const hitung = document.getElementById("hitung");\n' +
      'const tombol = document.getElementById("tombol");\n' +
      "let angka = 0;\n" +
      'tombol.addEventListener("click", function () {\n' +
      "  angka++;\n" +
      "  hitung.textContent = angka;\n" +
      "});",
  },
  "32-4-4": {
    js:
      'const input = document.getElementById("namaInput");\n' +
      'const tombol = document.getElementById("tombolSapa");\n' +
      'const sapaan = document.getElementById("sapaan");\n' +
      'tombol.addEventListener("click", function () {\n' +
      "  sapaan.textContent = `Halo, ${input.value}!`;\n" +
      "});",
  },
  "32-5-1": {
    js:
      'const nilai = document.getElementById("nilai");\n' +
      "nilai.textContent = 5;\n" +
      'nilai.style.color = "blue";',
  },
  "32-5-2": {
    js:
      'const nilai = document.getElementById("nilai");\n' +
      'const btnTambah = document.getElementById("btnTambah");\n' +
      "let angka = 0;\n" +
      'btnTambah.addEventListener("click", function () {\n' +
      "  angka++;\n" +
      "  nilai.textContent = angka;\n" +
      "});",
  },
  "32-5-3": {
    js:
      'const nilai = document.getElementById("nilai");\n' +
      'const btnTambah = document.getElementById("btnTambah");\n' +
      'const btnReset = document.getElementById("btnReset");\n' +
      "let angka = 0;\n" +
      'btnTambah.addEventListener("click", function () {\n' +
      "  angka++;\n" +
      "  nilai.textContent = angka;\n" +
      "});\n" +
      'btnReset.addEventListener("click", function () {\n' +
      "  angka = 0;\n" +
      "  nilai.textContent = angka;\n" +
      "});",
  },
  "32-5-4": {
    js:
      'const nilai = document.getElementById("nilai");\n' +
      'const btnTambah = document.getElementById("btnTambah");\n' +
      'const btnReset = document.getElementById("btnReset");\n' +
      "let angka = 0;\n" +
      'btnTambah.addEventListener("click", function () {\n' +
      "  angka++;\n" +
      "  nilai.textContent = angka;\n" +
      "  console.log(angka);\n" +
      "});\n" +
      'btnReset.addEventListener("click", function () {\n' +
      "  angka = 0;\n" +
      "  nilai.textContent = angka;\n" +
      "  console.log(angka);\n" +
      "});",
  },
};
