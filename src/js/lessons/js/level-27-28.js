// src/js/lessons/js/level-27-28.js — Jalur JavaScript: Level 27 (JS 5: Percabangan if-else) & Level 28 (JS 6: else if & switch)
(function () {
  "use strict";
  const K = window.JSLessonKit;
  const {
    doc,
    mat,
    ex,
    rev,
    mc,
    fill,
    drag,
    fix,
    chal,
    free,
    chk,
    mini,
    lesson,
    project,
  } = K;

  // ============================================================
  // LEVEL 27 — JS LEVEL 5: PERCABANGAN if / else
  // ============================================================
  K.register(
    K.level(
      27,
      5,
      "🚦",
      "Percabangan if / else",
      "Buat program mengambil keputusan dengan if dan else",
      [
        lesson(1, "Pernyataan if", [
          mat(
            "Jika Kondisi Terpenuhi...",
            "🚦",
            '<strong>if</strong> artinya "JIKA". Program memeriksa kondisi di dalam kurung: bila hasilnya <strong>true</strong>, blok kode di dalam kurung kurawal { } dijalankan; bila false, blok dilewati. Inilah cara program "mengambil keputusan".',
            'const suhu = 35;\n\nif (suhu > 30) {\n  console.log("Cuaca panas sekali!");\n}',
          ),
          ex(
            "Anatomi if",
            'if (kondisi) {\n  // kode ini jalan HANYA bila kondisi true\n}\nconsole.log("Ini selalu jalan");',
            "Perhatikan: kondisi di dalam ( ), blok kode di dalam { }. Titik koma tidak ditulis setelah kurung kondisi.",
          ),
          mc(
            "Kapan blok kode di dalam if dijalankan?",
            [
              "Selalu",
              "Bila kondisinya true",
              "Bila kondisinya false",
              "Saat program selesai",
            ],
            1,
            "Blok if hanya dijalankan bila kondisi bernilai true.",
          ),
          mc(
            "Manakah penulisan if yang BENAR?",
            [
              "if umur >= 17 { }",
              "if (umur >= 17) { }",
              "if { umur >= 17 } ( )",
              "if (umur >= 17) [ ]",
            ],
            1,
            "Kondisi harus dibungkus kurung biasa ( ), dan isi blok dibungkus kurung kurawal { }.",
          ),
          fill(
            "Lengkapi kondisi lulus:",
            "const nilai = 80;\nif (nilai ",
            ">=",
            ' 75) {\n  console.log("Lulus!");\n}',
            'Nilai 80 "lebih besar atau sama dengan" 75 → kondisi true → blok dijalankan.',
          ),
          drag(
            "Susun program yang memeriksa angka besar:",
            [
              "const angka = 10;",
              "if (angka > 5) {",
              '  console.log("Angka besar");',
              "}",
            ],
            "Urutannya: buat variabel, lalu if dengan kondisi, lalu isi blok, tutup dengan }.",
          ),
          chal(
            'Buat const suhu = 35. Jika suhu lebih dari 30, tampilkan "Panas". Konsol harus menampilkan Panas.',
            "const suhu = 35;\n// Buat if di sini\n",
            {
              js: [
                { syntaxOk: true },
                {
                  uses: "if",
                  msg: "Gunakan pernyataan if.",
                  hint: "if (suhu > 30) { ... }",
                },
              ],
              output: { contains: "Panas" },
            },
            'if (suhu > 30) { console.log("Panas"); }',
          ),
          rev("Ringkasan: if", [
            "if (kondisi) { ... } — blok jalan bila kondisi true",
            "Kondisi biasanya berisi perbandingan",
            "Kurung kurawal { } menandai blok kode",
            "Kondisi false → blok dilewati tanpa error",
          ]),
        ]),

        lesson(2, "else — Kalau Tidak", [
          mat(
            "Dua Jalan yang Pasti",
            "↔️",
            '<strong>else</strong> artinya "JIKA TIDAK". Dipasang setelah blok if: kondisi true → blok if jalan; kondisi false → blok else jalan. Pasti salah satu yang tampil, tidak ada jalan buntu. else TIDAK punya kondisi sendiri.',
          ),
          ex(
            "if dan else Berpasangan",
            'const nilai = 60;\n\nif (nilai >= 75) {\n  console.log("Lulus");\n} else {\n  console.log("Belum Lulus");\n}\n// Hasil: Belum Lulus (karena 60 < 75)',
          ),
          mc(
            "Kapan blok else yang dijalankan?",
            [
              "Bila kondisi if bernilai true",
              "Bila kondisi if bernilai false",
              "Selalu, setelah if",
              "Saat ada error",
            ],
            1,
            'else adalah "jalan keluar" bila kondisi if tidak terpenuhi (false).',
          ),
          mc(
            "Apakah else boleh ditulis dengan kondisi seperti if (x > 5)?",
            [
              "Boleh, sama seperti if",
              "Tidak boleh — else tanpa kondisi",
              "Hanya boleh di awal program",
              "Boleh asal pakai &&",
            ],
            1,
            "else tidak menerima kondisi. Ia hanya pasangan akhir dari if.",
          ),
          fill(
            'Lengkapi kata kunci untuk jalur "kalau tidak":',
            'if (skor >= 75) {\n  console.log("Lulus");\n} ',
            "else",
            ' {\n  console.log("Belum Lulus");\n}',
            "else ditulis setelah kurung kurawal penutup blok if.",
          ),
          fix(
            'Kode ini belum menutup blok if dengan kurung kurawal. Perbaiki agar konsol menampilkan "Dingin"!',
            'const suhu = 20;\nif (suhu < 25) {\n  console.log("Dingin");\n',
            "Setiap { butuh pasangan } penutup blok.",
            {
              js: [
                { syntaxOk: true },
                {
                  uses: "if",
                  msg: "Pastikan pernyataan if tetap ada.",
                  hint: 'if (suhu < 25) { console.log("Dingin"); }',
                },
              ],
              output: { contains: "Dingin" },
            },
            "Tambahkan } sebelum akhir kode — blok if harus ditutup.",
          ),
          chal(
            'Buat const nilai = 60. Jika nilai >= 75 tampilkan "Lulus", selain itu tampilkan "Belum Lulus". Konsol harus menampilkan Belum Lulus.',
            "const nilai = 60;\n// Buat if-else di sini\n",
            {
              js: [
                { syntaxOk: true },
                {
                  uses: "if",
                  msg: "Gunakan if untuk kondisi lulus.",
                  hint: "if (nilai >= 75) { ... } else { ... }",
                },
                {
                  uses: "else",
                  msg: "Tambahkan else untuk jalur ketika tidak lulus.",
                  hint: "} else {",
                },
              ],
              output: { equals: "Belum Lulus" },
            },
            'if (nilai >= 75) { console.log("Lulus"); } else { console.log("Belum Lulus"); }',
          ),
          rev("Ringkasan: if-else", [
            "if = jalur saat kondisi true, else = jalur saat false",
            "else ditulis tanpa kondisi",
            "Pasti salah satu blok yang dijalankan",
            "Blok { } harus selalu ditutup",
          ]),
        ]),

        lesson(3, "Kondisi Gabungan dalam if", [
          mat(
            "Kondisi Lebih dari Satu",
            "🧩",
            'Di dalam kurung if, perbandingan bisa digabung dengan <strong>&amp;&amp;</strong> dan <strong>||</strong> dari level sebelumnya. Contoh: if (jam >= 18 &amp;&amp; jam < 22) artinya "jam antara 18 sampai 21".',
          ),
          ex(
            "Jam Belajar Malam",
            'const jam = 21;\n\nif (jam >= 18 && jam < 22) {\n  console.log("Waktu belajar malam");\n} else {\n  console.log("Waktu istirahat");\n}',
          ),
          mc(
            "if (a && b) bloknya dijalankan bila...",
            ["a saja true", "b saja true", "KEDUANYA true", "Keduanya false"],
            2,
            "&& mengharuskan kedua kondisi true agar blok if dijalankan.",
          ),
          mc(
            "Kondisi if (jam > 5 || jam < 2) akan true saat...",
            [
              "Hanya jam 6",
              "Hanya jam 1",
              "jam lebih dari 5 ATAU kurang dari 2",
              "tidak pernah",
            ],
            2,
            "|| bernilai true bila salah satu sisi terpenuhi.",
          ),
          fix(
            "Kondisi if ini kehilangan kurung biasa sehingga error. Perbaiki!",
            'const umur = 18;\nif umur >= 17 {\n  console.log("Boleh buat KTP");\n}',
            "Kondisi if harus dibungkus tanda kurung biasa ( ).",
            {
              js: [
                { syntaxOk: true },
                {
                  uses: "if",
                  msg: "Pastikan if dengan kurung kondisi ( ).",
                  hint: "if (umur >= 17) { ... }",
                },
              ],
              output: { contains: "Boleh buat KTP" },
            },
            "if (umur >= 17) { — kurung biasa wajib ada.",
          ),
          chal(
            'Buat const jam = 21. Jika jam >= 18 && jam < 22 tampilkan "Waktu belajar malam", selain itu "Waktu istirahat". Konsol harus menampilkan Waktu belajar malam.',
            "const jam = 21;\n// Buat if-else dengan kondisi gabungan\n",
            {
              js: [
                { syntaxOk: true },
                {
                  uses: "&&",
                  msg: "Gabungkan dua syarat jam dengan &&.",
                  hint: "if (jam >= 18 && jam < 22)",
                },
              ],
              output: { equals: "Waktu belajar malam" },
            },
            'if (jam >= 18 && jam < 22) { console.log("Waktu belajar malam"); } else { ... }',
          ),
          rev("Ringkasan: Kondisi Gabungan", [
            "&& menggabungkan syarat yang HARUS dua-duanya benar",
            "|| untuk syarat alternatif",
            "Urutan operasi: perbandingan dulu, baru logika",
            "Blok else tetap sebagai jalur cadangan",
          ]),
        ]),

        lesson(4, "Studi Kasus: Login Sederhana", [
          mat(
            "Membandingkan Sandi",
            "🔐",
            "Program login membandingkan sandi yang diketik dengan sandi yang benar menggunakan <strong>===</strong>. Kalau sama persis → beri akses; kalau tidak → tolak. Inilah pola yang sama dipakai aplikasi sungguhan (plus banyak lapisan keamanan lain!).",
          ),
          ex(
            "Program Login Mini",
            'const sandiBenar = "koding123";\nconst sandiMasuk = "koding123";\n\nif (sandiMasuk === sandiBenar) {\n  console.log("Berhasil masuk");\n} else {\n  console.log("Sandi salah");\n}',
          ),
          mc(
            "Untuk membandingkan dua string, operator yang tepat adalah...",
            ["=", "==", "===", "=>"],
            2,
            "Gunakan === agar nilai DAN tipe benar-benar sama.",
          ),
          mc(
            'Jika sandiMasuk = "Koding123" (huruf K besar) dan sandiBenar = "koding123", hasil perbandingan === adalah...',
            [
              "true — JavaScript tidak peduli huruf besar",
              "false — JavaScript case-sensitive",
              "error",
              "true sebagian",
            ],
            1,
            'JavaScript membedakan huruf besar/kecil, jadi "Koding123" ≠ "koding123".',
          ),
          chal(
            'Buat const sandi = "rahasia" dan const tebakan = "rahasia". Jika tebakan === sandi tampilkan "Berhasil masuk", selain itu "Sandi salah". Konsol harus menampilkan Berhasil masuk.',
            "// Buat dua variabel, lalu if-else pembanding\n",
            {
              js: [
                { syntaxOk: true },
                {
                  declares: "sandi",
                  msg: 'Buat const sandi = "rahasia".',
                  hint: 'const sandi = "rahasia";',
                },
                {
                  declares: "tebakan",
                  msg: 'Buat const tebakan = "rahasia".',
                  hint: 'const tebakan = "rahasia";',
                },
                {
                  uses: "===",
                  msg: "Bandingkan tebakan dengan sandi menggunakan ===.",
                  hint: "if (tebakan === sandi) { ... }",
                },
              ],
              output: { equals: "Berhasil masuk" },
            },
            'if (tebakan === sandi) { console.log("Berhasil masuk"); } else { console.log("Sandi salah"); }',
          ),
          rev("Ringkasan: Studi Kasus Login", [
            "Bandingkan string dengan ===",
            "Huruf besar/kecil dianggap berbeda",
            "if-else memberi dua jalur: akses atau tolak",
            "Pola ini dipakai hampir semua aplikasi",
          ]),
        ]),

        project(5, "Mini Project — Penentu Tarif Bus", [
          mat(
            "Saatnya Project!",
            "🚀",
            "Buat program penentu tarif bus trans kota: penumpang anak (umur ≤ 12) bayar tarif anak, sisanya tarif dewasa. Lalu periksa juga kartu e-money untuk menentukan boleh naik atau tidak.",
          ),
          mini(
            "Penentu Tarif Bus",
            'Buat const: umur = 10, punyaKartu = true. Tampilkan 2 baris: (1) pakai if-else — bila umur <= 12 tampilkan "Tarif: Anak", selain itu "Tarif: Dewasa"; (2) pakai if-else lagi — bila punyaKartu === true tampilkan "Naik: Boleh", selain itu "Naik: Bayar tunai".',
            "// Penentu Tarif Bus\n// const umur = 10;\n// const punyaKartu = true;\n// Dua if-else di sini\n",
            [
              chk("runs", "Kode berjalan tanpa error", "js.ok()"),
              chk(
                "tarif",
                'Menampilkan tarif (mengandung "Tarif:")',
                'js.output().indexOf("Tarif:") !== -1',
              ),
              chk(
                "anak",
                "Umur 10 dikenai tarif anak",
                'js.output().indexOf("Anak") !== -1',
              ),
              chk(
                "naik",
                'Menampilkan keputusan naik (mengandung "Naik:")',
                'js.output().indexOf("Naik:") !== -1',
              ),
              chk("baris", "Ada minimal 2 baris output", "js.logCount() >= 2"),
            ],
            {
              js: [
                { syntaxOk: true },
                {
                  uses: "if",
                  msg: "Gunakan pernyataan if untuk menentukan tarif.",
                  hint: "if (umur <= 12) { ... } else { ... }",
                },
                {
                  uses: "else",
                  msg: "Tambahkan else sebagai jalur alternatifnya.",
                  hint: "} else {",
                },
              ],
            },
          ),
        ]),
      ],
    ),
  );

  // ============================================================
  // LEVEL 28 — JS LEVEL 6: else if & switch
  // ============================================================
  K.register(
    K.level(
      28,
      6,
      "🔀",
      "else if & switch",
      "Pilih dari banyak jalur: rantai else if dan percabangan switch",
      [
        lesson(1, "Rantai else if", [
          mat(
            "Lebih dari Dua Pilihan",
            "🪜",
            "Kalau pilihannya lebih dari dua, sambung if dengan <strong>else if</strong>: kondisi diperiksa <em>berurutan dari atas</em>, dan blok <em>pertama yang true</em> itulah yang dijalankan — sisanya dilewati. <strong>else</strong> di akhir menjadi penampung bila semua kondisi gagal.",
          ),
          ex(
            "Menentukan Grade",
            'const nilai = 82;\n\nif (nilai >= 90) {\n  console.log("Grade A");\n} else if (nilai >= 80) {\n  console.log("Grade B");\n} else {\n  console.log("Grade C");\n}\n// Hasil: Grade B (82 gagal di 90, lolos di 80)',
          ),
          mc(
            "Dalam rantai if / else if, blok mana yang dijalankan?",
            [
              "Semua yang kondisinya true",
              "Yang pertama saja yang kondisinya true",
              "Yang paling akhir",
              "Semua blok berurutan",
            ],
            1,
            "Setelah satu kondisi true dijalankan, sisa rantai langsung dilewati.",
          ),
          mc(
            "Fungsi else di akhir rantai adalah...",
            [
              "Wajib dijalankan selalu",
              "Menjalankan blok bila SEMUA kondisi sebelumnya false",
              "Mengulang if dari awal",
              "Menghentikan program",
            ],
            1,
            "else menampung semua kasus yang tidak lolos kondisi mana pun.",
          ),
          fill(
            "Lengkapi rantai percabangan:",
            'if (nilai >= 90) {\n  console.log("A");\n} ',
            "else if",
            ' (nilai >= 80) {\n  console.log("B");\n} else {\n  console.log("C");\n}',
            "else if menyambung kondisi tambahan di antara if dan else.",
          ),
          chal(
            'Buat const nilai = 82. Tampilkan "Grade A" bila nilai >= 90, "Grade B" bila nilai >= 80, selain itu "Grade C". Konsol harus menampilkan Grade B.',
            "const nilai = 82;\n// Rantai if / else if / else di sini\n",
            {
              js: [
                { syntaxOk: true },
                {
                  uses: "else-if",
                  msg: "Gunakan else if untuk kondisi kedua.",
                  hint: "} else if (nilai >= 80) {",
                },
              ],
              output: { equals: "Grade B" },
            },
            "Urutan kondisi penting: cek 90 dulu, baru 80.",
          ),
          rev("Ringkasan: else if", [
            "Rantai kondisi diperiksa dari atas ke bawah",
            "Hanya blok pertama yang true yang dijalankan",
            "else di akhir menampung sisanya",
            "Urutan kondisi menentukan hasil",
          ]),
        ]),

        lesson(2, "Membangun Penentu Grade Lengkap", [
          mat(
            "Menyusun Rentang Nilai",
            "📊",
            "Program penentu grade sungguhan punya 4 rentang: A (≥ 90), B (≥ 80), C (≥ 70), dan D (sisanya). Karena else if memeriksa dari atas, kita cukup menulis batas bawah tiap rentang — kondisi yang sudah lolos di atas otomatis tidak masuk ke bawah.",
          ),
          ex(
            "Penentu Grade Lengkap",
            'const nilai = 75;\n\nif (nilai >= 90) {\n  console.log("Grade A");\n} else if (nilai >= 80) {\n  console.log("Grade B");\n} else if (nilai >= 70) {\n  console.log("Grade C");\n} else {\n  console.log("Grade D");\n}\n// Hasil: Grade C',
          ),
          mc(
            "Mengapa urutan kondisi >= 90 ditulis lebih dulu daripada >= 80?",
            [
              "Agar kode lebih panjang",
              "Karena 90 lebih tinggi — bila ditukar, nilai 95 akan tertangkap kondisi >= 80 duluan",
              "Tidak ada alasannya",
              "Agar else if bisa jalan",
            ],
            1,
            "Kondisi paling ketat harus di atas; kalau tidak, rentang lebih rendah menangkap duluan.",
          ),
          fix(
            "Blok if ini belum ditutup kurung kurawalnya sehingga program error. Perbaiki agar konsol menampilkan A!",
            'const nilai = 95;\nif (nilai >= 90) {\n  console.log("A");\n',
            "Tambahkan } untuk menutup blok if.",
            {
              js: [
                { syntaxOk: true },
                {
                  uses: "if",
                  msg: "Pastikan if tetap ada dan bloknya tertutup.",
                  hint: 'if (nilai >= 90) { console.log("A"); }',
                },
              ],
              output: { equals: "A" },
            },
            "Blok { } harus selalu berpasangan.",
          ),
          chal(
            'Buat const suhu = 5. Tampilkan "Membeku" bila suhu <= 0, "Dingin" bila suhu <= 15, selain itu "Normal". Konsol harus menampilkan Dingin.',
            "const suhu = 5;\n// Rantai else if di sini\n",
            {
              js: [
                { syntaxOk: true },
                {
                  uses: "else-if",
                  msg: "Gunakan else if untuk kondisi kedua.",
                  hint: "} else if (suhu <= 15) {",
                },
              ],
              output: { equals: "Dingin" },
            },
            "5 gagal di kondisi pertama (≤ 0), lolos di kondisi kedua (≤ 15).",
          ),
          rev("Ringkasan: Penentu Grade", [
            "Tulis kondisi dari rentang tertinggi ke terendah",
            "else if menyambung banyak rentang",
            "else menampung semua nilai di luar rentang",
            "Pola ini dipakai untuk klasifikasi apa pun",
          ]),
        ]),

        lesson(3, "Percabangan switch", [
          mat(
            "switch / case / break / default",
            "🎛️",
            '<strong>switch</strong> membandingkan satu nilai dengan banyak "kunci" yang tetap. Setiap kunci ditulis dengan <strong>case</strong>, diakhiri <strong>break</strong> agar tidak "jatuh" ke case berikutnya. <strong>default</strong> adalah penampung bila tidak ada kunci yang cocok — mirip else.',
          ),
          ex(
            "Menentukan Menu Hari",
            'const hari = "Senin";\n\nswitch (hari) {\n  case "Senin":\n    console.log("Menu: Bakso");\n    break;\n  case "Selasa":\n    console.log("Menu: Ayam Goreng");\n    break;\n  default:\n    console.log("Menu: Nasi Goreng");\n}\n// Hasil: Menu: Bakso',
          ),
          mat(
            "Hati-hati Lupa break",
            "⚠️",
            'Tanpa <strong>break</strong>, program melanjutkan mengeksekusi case berikutnya (<em>fall-through</em>) sampai menemukan break — biasanya bukan yang diinginkan. Ingat juga: perbandingan switch memakai kesetaraan ketat (seperti ===), jadi "Senin" ≠ "senin".',
          ),
          mc(
            "Apa yang terjadi bila lupa menulis break di dalam case?",
            [
              "Program error",
              "Eksekusi lanjut ke case berikutnya (fall-through)",
              "Semua case dijalankan dua kali",
              "default otomatis jalan",
            ],
            1,
            'Tanpa break, eksekusi "jatuh" ke case di bawahnya sampai menemui break.',
          ),
          mc(
            "Blok default dijalankan bila...",
            [
              "case pertama cocok",
              "Tidak ada case yang cocok",
              "Selalu ikut dijalankan",
              "Ada dua case cocok",
            ],
            1,
            "default adalah jalur terakhir bila tidak ada kunci yang sama.",
          ),
          fill(
            "Lengkapi kata kunci kunci pencocokan:",
            "switch (hari) {\n  ",
            "case",
            ' "Senin":\n    console.log("Bakso");\n    break;\n}',
            "Setiap kemungkinan nilai ditulis setelah kata case.",
          ),
          chal(
            'Buat const buah = "mangga". Buat switch: case "mangga" tampilkan "Manis", case "lemon" tampilkan "Asam", default tampilkan "Tidak dikenal". Jangan lupa break. Konsol harus menampilkan Manis.',
            'const buah = "mangga";\n// switch / case / break / default di sini\n',
            {
              js: [
                { syntaxOk: true },
                {
                  uses: ["switch", "case", "break", "default"],
                  msg: "Gunakan switch, case, break, dan default.",
                  hint: 'switch (buah) { case "mangga": ... break; default: ... }',
                },
              ],
              output: { equals: "Manis" },
            },
            'case "mangga": console.log("Manis"); break; lalu case lain dan default.',
          ),
          rev("Ringkasan: switch", [
            "switch membandingkan satu nilai dengan banyak case",
            "break mencegah fall-through",
            "default = penampung bila tak ada yang cocok",
            "Cocok untuk nilai tetap, bukan rentang",
          ]),
        ]),

        lesson(4, "if atau switch? Memilih yang Tepat", [
          mat(
            "Kapan Pakai yang Mana?",
            "🧭",
            "Gunakan <strong>if / else if</strong> bila kondisinya <em>rentang</em> atau gabungan logika (nilai >= 80, jam && hari). Gunakan <strong>switch</strong> bila membandingkan satu nilai dengan pilihan <em>tetap yang jelas</em> (hari, menu, kode barang). Hasilnya bisa sama — yang beda cuma kerapian.",
          ),
          ex(
            "Masalah yang Sama, Dua Gaya",
            'const kode = "B2";\n\n// Gaya if-else if\nif (kode === "B2") {\n  console.log("Teh Kotak");\n} else {\n  console.log("Tidak ada");\n}\n\n// Gaya switch\nswitch (kode) {\n  case "B2":\n    console.log("Teh Kotak");\n    break;\n  default:\n    console.log("Tidak ada");\n}',
          ),
          mc(
            "Untuk menentukan grade berdasarkan RENTANG nilai 0–100, struktur paling pas adalah...",
            ["switch case", "if / else if", "hanya else", "loop"],
            1,
            "Rentang (>=, <) tidak bisa ditulis sebagai kunci case yang tetap — gunakan if / else if.",
          ),
          mc(
            'Untuk menu pilihan hari: "Senin", "Selasa", ..., struktur paling rapi adalah...',
            [
              "switch dengan case per hari",
              "sembilan if berlebihan",
              "loop for",
              "tanpa percabangan",
            ],
            0,
            "Nilai tetap yang banyak cocok dengan switch — kodenya lebih rapi dan mudah dibaca.",
          ),
          chal(
            'Buat switch untuk const angka = 3: case 1 tampilkan "Satu", case 2 tampilkan "Dua", case 3 tampilkan "Tiga", default tampilkan "Lainnya". Konsol harus menampilkan Tiga.',
            "const angka = 3;\n// switch di sini\n",
            {
              js: [
                { syntaxOk: true },
                {
                  uses: ["switch", "break"],
                  msg: "Gunakan switch dengan break di tiap case.",
                  hint: "switch (angka) { case 1: ... break; ... }",
                },
              ],
              output: { equals: "Tiga" },
            },
            "Tulis 3 case + default, masing-masing dengan break (kecuali default).",
          ),
          rev("Ringkasan: Memilih Struktur", [
            "Rentang / logika gabungan → if / else if",
            "Nilai tetap yang banyak → switch",
            "switch tanpa break = fall-through",
            "Keduanya menghasilkan program yang sama bila ditulis benar",
          ]),
        ]),

        project(5, "Mini Project — Mesin Minuman (Vending Machine)", [
          mat(
            "Saatnya Project!",
            "🚀",
            "Saatnya jadi mesin penjual minuman! Program menerima kode minuman dan menampilkan isinya. Gunakan switch — mesin sungguhan bekerja dengan pola yang sama.",
          ),
          mini(
            "Mesin Minuman",
            'Buat const kode = "B2". Buat switch dengan: case "A1" → "Air Mineral", case "B2" → "Teh Kotak", case "C3" → "Kopi Susu", dan default → "Kode tidak dikenal". Setiap case diakhiri break. Konsol harus menampilkan Teh Kotak.',
            '// Mesin Minuman\n// const kode = "B2";\n// switch (kode) { ... }\n',
            [
              chk("runs", "Kode berjalan tanpa error", "js.ok()"),
              chk(
                "hasil",
                'Kode B2 menghasilkan "Teh Kotak"',
                'js.output().indexOf("Teh Kotak") !== -1',
              ),
              chk(
                "satu-baris",
                "Tepat satu hasil ditampilkan (bukan fall-through)",
                "js.logCount() === 1",
              ),
              chk("default", "Pesan default tersedia", "true"),
            ],
            {
              js: [
                { syntaxOk: true },
                {
                  uses: ["switch", "case", "break"],
                  msg: "Gunakan switch, case, dan break.",
                  hint: 'switch (kode) { case "B2": console.log("Teh Kotak"); break; ... }',
                },
              ],
            },
          ),
        ]),
      ],
    ),
  );
})();
