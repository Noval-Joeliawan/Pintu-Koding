// src/js/lessons/js/level-23-24.js — Jalur JavaScript: Level 23 (JS 1: Pengenalan JavaScript) & Level 24 (JS 2: Variabel & Tipe Data)
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
  // LEVEL 23 — JS LEVEL 1: PENGENALAN JAVASCRIPT
  // ============================================================
  K.register(
    K.level(
      23,
      1,
      "👋",
      "Pengenalan JavaScript",
      "Kenalan dengan JavaScript, bahasa yang membuat website hidup dan interaktif",
      [
        lesson(1, "Apa Itu JavaScript?", [
          mat(
            "Apa itu JavaScript?",
            "👋",
            "JavaScript (sering disingkat <strong>JS</strong>) adalah bahasa pemrograman yang membuat website jadi <em>hidup</em>. Kalau HTML adalah kerangka dan CSS adalah dandannya, JavaScript adalah <strong>otak dan ototnya</strong>: ia bisa berpikir, menghitung, dan bereaksi saat kamu menekan tombol.",
          ),
          mat(
            "JavaScript di Sekitar Kamu",
            "🌍",
            'Setiap kali tombol "Suka" bertambah angkanya, form memberi tahu "email belum benar", atau muncul notifikasi — itu semua pekerjaan JavaScript. Website tanpa JS seperti toko tanpa pramuniaga: kelihatannya ada, tetapi tidak bisa melayani.',
            '// Kode JavaScript sederhana:\nconsole.log("Halo! Aku JavaScript.");',
          ),
          mc(
            "Apa peran utama JavaScript di sebuah website?",
            [
              "Memberi struktur dan konten",
              "Mengatur warna dan tata letak",
              "Menambahkan interaksi, logika, dan perilaku",
              "Menggambar logo website",
            ],
            2,
            "HTML = struktur, CSS = tampilan, JavaScript = interaksi dan logika.",
          ),
          mc(
            "Manakah pasangan peran yang BENAR?",
            [
              "HTML = tampilan, CSS = struktur",
              "HTML = struktur, CSS = tampilan, JS = interaksi",
              "HTML = interaksi, JS = struktur",
              "CSS = logika, JS = tampilan",
            ],
            1,
            "HTML mengatur struktur, CSS mengatur tampilan, dan JavaScript mengatur interaksi.",
          ),
          fill(
            "Lengkapi perintah JavaScript untuk menampilkan tulisan ke konsol:",
            "console.",
            "log",
            '("Halo!");',
            "console.log() adalah perintah untuk menampilkan output ke konsol.",
          ),
          drag(
            'Susun perintah JavaScript yang benar untuk menampilkan tulisan "Halo JS!":',
            ["console.log(", '"Halo JS!"', ");"],
            "console.log() menerima isi yang ingin ditampilkan di antara kurungnya.",
          ),
          free(
            'Tekan tombol ▶ Run dan lihat panel konsol di bawah preview. Inilah cara kode JavaScript "berbicara"! Coba ubah tulisannya, lalu Run lagi.',
            'console.log("Halo, aku baru belajar JavaScript!");\nconsole.log("PintuKoding memang seru!");',
          ),
          rev("Ringkasan: Apa Itu JavaScript?", [
            "JavaScript = bahasa pemrograman untuk interaksi dan logika",
            "HTML = struktur, CSS = tampilan, JS = interaksi",
            "console.log() menampilkan output ke konsol",
            "Kode JS ditulis di antara kurung ( ) dan diakhiri titik koma ( ; )",
          ]),
        ]),

        lesson(2, "Menampilkan Output: console.log()", [
          mat(
            "Mengenal Konsol",
            "🖥️",
            '<strong>Konsol</strong> adalah "layar percakapan" antara programmer dan program. Saat kamu menekan tombol ▶ Run, kode dijalankan dan setiap console.log() menuliskan satu baris ke konsol. Nanti di dunia nyata, konsol ada di DevTools browser (tekan F12).',
          ),
          ex(
            "Contoh console.log()",
            'console.log("Baris pertama");\nconsole.log("Baris kedua");\nconsole.log(12345);',
            "Teks ditulis di dalam tanda kutip, sedangkan angka ditulis tanpa kutip. Setiap perintah diakhiri titik koma ( ; ).",
          ),
          mat(
            "Teks (String) vs Angka (Number)",
            "🔤",
            'Data teks disebut <strong>string</strong> dan harus dibungkus tanda kutip: "Halo" atau \'Halo\'. Angka ditulis polos: 7, 3.14. Hasilnya berbeda: console.log("7") menampilkan tulisan 7, sedangkan console.log(7) menampilkan angka 7.',
          ),
          mc(
            "Manakah penulisan yang menampilkan ANGKA 7?",
            [
              'console.log("7");',
              "console.log(7);",
              "console.log(<7>);",
              "console.log tujuh;",
            ],
            1,
            'Angka ditulis tanpa tanda kutip. "7" (dengan kutip) adalah teks, bukan angka.',
          ),
          mc(
            "Baris mana yang TIDAK akan jalan dengan benar?",
            [
              'console.log("Halo");',
              "console.log('Halo');",
              "console.log(Halo);",
              "console.log(99);",
            ],
            2,
            "Tanpa tanda kutip, Halo dianggap nama variabel yang tidak ada — browser akan menampilkan error.",
          ),
          fill(
            "Lengkapi kode agar menampilkan nama sekolahmu:",
            'console.log("SMA ',
            "Nusantara",
            '");',
            "Isi string ditulis di antara tanda kutip pembuka dan penutup.",
          ),
          chal(
            "Tulis perintah console.log() yang menampilkan tulisan: Halo, Dunia!",
            "// Tulis kode kamu di bawah ini\n",
            {
              js: [{ syntaxOk: true }],
              output: { contains: "Halo, Dunia!" },
            },
            'Jawabannya: console.log("Halo, Dunia!"); — jangan lupa tanda kutip!',
          ),
          chal(
            'Sekarang tampilkan DUA baris: baris pertama "Nama: Rina" dan baris kedua "Hobi: menggambar".',
            "// Dua console.log di sini\n",
            {
              js: [{ syntaxOk: true }],
              output: { containsAll: ["Nama: Rina", "Hobi: menggambar"] },
            },
            "Cukup tulis dua perintah console.log() berturut-turut.",
          ),
          rev("Ringkasan: console.log()", [
            "console.log() menampilkan output ke konsol",
            "String dibungkus tanda kutip, angka ditulis polos",
            "Setiap perintah diakhiri titik koma ( ; )",
            "Saat menjalankan kode, hasilnya muncul di panel konsol",
          ]),
        ]),

        lesson(3, "Komentar: Catatan di Kode", [
          mat(
            "Apa itu Komentar?",
            "💬",
            "Komentar adalah catatan untuk manusia — browser <strong>mengabaikannya</strong> sama sekali. Gunakan komentar untuk menjelaskan maksud kode atau menyimpan catatan kecil. Komentar satu baris ditulis setelah <strong>//</strong>, komentar banyak baris dibungkus <strong>/* ... */</strong>.",
          ),
          ex(
            "Dua Cara Menulis Komentar",
            '// Ini komentar satu baris\n\n/*\n  Ini komentar\n  lebih dari satu baris\n*/\n\nconsole.log("Komentar tidak muncul di konsol");',
            "Coba jalankan di editor latihan — yang muncul di konsol hanya baris console.log, bukan komentarnya.",
          ),
          mc(
            "Bagaimana cara menulis komentar SATU baris di JavaScript?",
            [
              "<!-- komentar -->",
              "# komentar",
              "// komentar",
              "** komentar **",
            ],
            2,
            "Komentar satu baris JavaScript diawali dengan dua garis miring: //",
          ),
          mc(
            "Apa fungsi utama komentar?",
            [
              "Mempercepat program",
              "Memberi catatan untuk manusia; browser mengabaikannya",
              "Menampilkan teks ke layar",
              "Mengganti kode yang error",
            ],
            1,
            "Komentar tidak memengaruhi jalannya program — ia hanya membantu manusia membaca kode.",
          ),
          fill(
            "Lengkapi pembuka komentar banyak baris:",
            "/* \n  Aku sedang belajar JavaScript\n",
            "*/",
            '\nconsole.log("Selesai");',
            "Komentar banyak baris dibuka dengan /* dan ditutup dengan */.",
          ),
          fix(
            'Kode ini error karena kurungnya belum ditutup. Perbaiki agar muncul tulisan "Halo"!',
            'console.log("Halo"',
            "Setiap kurung buka ( butuh kurung tutup ), dan perintah diakhiri titik koma.",
            { js: [{ syntaxOk: true }, { consoleLog: "Halo" }] },
            'console.log("Halo"); — kurung ditutup, lalu titik koma.',
          ),
          chal(
            'Tulis SATU komentar satu baris berisi apa saja, lalu di bawahnya console.log() yang menampilkan "Saya belajar JS".',
            "// Tulis komentarmu di baris ini\n",
            {
              js: [
                { syntaxOk: true },
                {
                  rawContains: /\/\/\s*(?!Tulis komentarmu)[^\n]+/,
                  msg: "Belum ada komentar satu baris. Tulis komentar yang diawali //.",
                  hint: "Contoh: // aku suka ngoding",
                },
              ],
              output: { contains: "Saya belajar JS" },
            },
            'Contoh: // ini komentarku lalu console.log("Saya belajar JS");',
          ),
          rev("Ringkasan: Komentar", [
            "Komentar satu baris: // ...",
            "Komentar banyak baris: /* ... */",
            "Browser mengabaikan komentar sepenuhnya",
            "Komentar membuat kode lebih mudah dipahami",
          ]),
        ]),

        lesson(4, "Kesalahan Umum Pemula", [
          mat(
            "JavaScript Itu Case-Sensitive",
            "🔠",
            "JavaScript membedakan huruf besar dan kecil. <strong>console.log</strong> benar, tetapi <strong>Console.Log</strong> atau <strong>consol.log</strong> adalah perintah lain yang tidak dikenal. Nanti kalau ada error, baca pesannya: biasanya browser memberi tahu apa yang salah dan di baris berapa.",
          ),
          mat(
            "3 Kesalahan yang Paling Sering Terjadi",
            "⚠️",
            "1) Salah kapital pada nama perintah. 2) Lupa menutup tanda kutip atau kurung. 3) Menampilkan variabel yang belum dibuat (nanti kamu belajar di level berikutnya). Kalau panel konsol menampilkan teks merah, itu artinya ada error — baca baik-baik, lalu perbaiki.",
          ),
          mc(
            "Manakah penulisan perintah yang BENAR?",
            [
              'Console.log("Hai");',
              'console.log("Hai");',
              'console.Log("Hai");',
              'CONSOLE.LOG("Hai");',
            ],
            1,
            "Perintah resminya console.log — huruf kecil semua, dipisah titik.",
          ),
          fix(
            "Perintah ini salah eja sehingga tidak dikenal browser. Perbaiki!",
            'Consol.log("Hai");',
            "Ejaan yang benar adalah console.log (huruf kecil semua).",
            { js: [{ syntaxOk: true }, { consoleLog: "Hai" }] },
            'Betul! console.log("Hai"); dengan huruf kecil semua.',
          ),
          fix(
            "String di baris ini tidak pernah ditutup. Perbaiki tanda kutipnya!",
            'console.log("Belajar itu seru);',
            "Tanda kutip pembuka butuh pasangan tanda kutip penutup.",
            {
              js: [
                { syntaxOk: true },
                { consoleLogContains: "Belajar itu seru" },
              ],
            },
            'console.log("Belajar itu seru"); — kutipnya sudah berpasangan.',
          ),
          free(
            "Waktunya eksperimen bebas! Tuliskan 3 baris console.log tentang dirimu: nama, hobi, dan cita-cita. Lihat hasilnya di konsol.",
            '// Tulis 3 baris console.log tentang dirimu\n// console.log("Nama: ...");\n// console.log("Hobi: ...");\n// console.log("Cita-cita: ...");',
          ),
          rev("Ringkasan: Kesalahan Umum", [
            "JavaScript case-sensitive: console.log ≠ Console.Log",
            "Tanda kutip dan kurung harus berpasangan",
            "Pesan error dibaca, bukan ditakuti — ia petunjuk perbaikan",
            "Perintah diakhiri titik koma ( ; )",
          ]),
        ]),

        project(5, "Mini Project — Kartu Perkenalan di Konsol", [
          mat(
            "Saatnya Project!",
            "🚀",
            'Kamu sudah mengenal console.log(), komentar, dan cara membaca error. Sekarang buat "kartu perkenalan" versi konsol: beberapa baris tulisan rapi tentang dirimu, lengkap dengan garis pembatas biar terlihat seperti kartu.',
          ),
          mini(
            "Kartu Perkenalan",
            'Buat program console.log yang menampilkan KARTU PERKENALAN dengan syarat: (1) ada garis pembatas berisi tanda = minimal 5 buah, (2) minimal 4 baris output, (3) ada baris yang berisi "Nama:", (4) ada baris yang berisi "Hobi:", (5) ada angka di output (misalnya umur). Gunakan komentar untuk merapikan kodemu.',
            "// Kartu Perkenalan\n// Petunjuk: gunakan console.log() beberapa kali\n// Baris 1: garis ====...\n// Baris 2: Nama: ...\n// Baris 3: Umur: ... (angka, tanpa kutip setelah tanda :)\n// Baris 4: Hobi: ...\n",
            [
              chk("runs", "Kode berjalan tanpa error", "js.ok()"),
              chk("lines", "Ada minimal 4 baris output", "js.logCount() >= 4"),
              chk(
                "nama",
                'Ada baris berisi "Nama:"',
                'js.output().indexOf("Nama:") !== -1',
              ),
              chk(
                "hobi",
                'Ada baris berisi "Hobi:"',
                'js.output().indexOf("Hobi:") !== -1',
              ),
              chk(
                "garis",
                "Ada garis pembatas (tanda = minimal 5)",
                "/=====/.test(js.output())",
              ),
              chk(
                "angka",
                "Ada angka di output (mis. umur)",
                "/\\d/.test(js.output())",
              ),
            ],
          ),
        ]),
      ],
    ),
  );

  // ============================================================
  // LEVEL 24 — JS LEVEL 2: VARIABEL & TIPE DATA
  // ============================================================
  K.register(
    K.level(
      24,
      2,
      "📦",
      "Variabel & Tipe Data",
      "Simpan data dengan let & const, kenali String, Number, dan Boolean",
      [
        lesson(1, "Mengenal Variabel", [
          mat(
            "Variabel = Kotak Berlabel",
            "📦",
            "<strong>Variabel</strong> adalah tempat menyimpan nilai yang bisa dipakai ulang. Bayangkan kotak berlabel: labelnya adalah <em>nama variabel</em>, isinya adalah <em>nilainya</em>. Di JavaScript modern, kotak dibuat dengan <strong>let</strong> (isinya boleh diganti) atau <strong>const</strong> (isinya tetap, tidak boleh diganti).",
            'let umur = 15;\nconst nama = "Rina";\nconsole.log(nama, umur);',
          ),
          ex(
            "Membuat dan Memakai Variabel",
            'const kota = "Bandung";\nlet suhu = 27;\n\nconsole.log(kota);\nconsole.log(suhu);',
            'console.log(kota) tanpa kutip menampilkan ISI variabel. Kalau ditulis "kota" (dengan kutip), yang tampil justru tulisan kota.',
          ),
          mc(
            "Manakah cara membuat variabel yang isinya TIDAK boleh diganti?",
            ["let", "const", "var ganda", "fixed"],
            1,
            "const (constant) untuk nilai tetap; let untuk nilai yang bisa berubah.",
          ),
          mc(
            "Nama variabel yang VALID di JavaScript adalah...",
            ["nama lengkap", "2nama", "namaLengkap", "const"],
            2,
            "Nama variabel tidak boleh berisi spasi, tidak boleh diawali angka, dan tidak boleh sama dengan kata kunci (const, let, dll).",
          ),
          fill(
            "Lengkapi deklarasi variabel tetap:",
            "let umur = 15;\nconst ",
            "nama",
            ' = "Budi";\nconsole.log(nama);',
            "const dipakai untuk nilai yang tidak akan berubah lagi.",
          ),
          drag(
            "Susun program yang menampilkan skor 10:",
            ["let skor = 0;", "skor = 10;", "console.log(skor);"],
            "Nilai variabel let boleh ditimpa dengan nilai baru.",
          ),
          chal(
            'Buat variabel const bernama kota berisi "Bandung", lalu tampilkan isinya dengan console.log.',
            "// Buat const kota di sini\n// Lalu tampilkan dengan console.log\n",
            {
              js: [
                { syntaxOk: true },
                {
                  declares: "kota",
                  msg: "Buat variabel const bernama kota.",
                  hint: 'Contoh: const kota = "Bandung";',
                },
              ],
              output: { contains: "Bandung" },
            },
            'const kota = "Bandung"; lalu console.log(kota);',
          ),
          rev("Ringkasan: Variabel", [
            "Variabel = kotak berlabel untuk menyimpan nilai",
            "let = isinya boleh diganti, const = tetap",
            "console.log(nama) menampilkan isi variabel (tanpa kutip!)",
            "Nama variabel tidak boleh berisi spasi atau diawali angka",
          ]),
        ]),

        lesson(2, "let vs const dalam Praktik", [
          mat(
            "Kapan let, Kapan const?",
            "⚖️",
            "Pakai <strong>const</strong> untuk nilai yang tidak berubah: tanggal lahir, nama negara, angka pi. Pakai <strong>let</strong> untuk nilai yang pasti berubah: skor game, sisa nyawa, umur yang bertambah tiap tahun. Kebiasaan baik: <em>selalu mulai dengan const</em>, ganti ke let hanya kalau memang perlu diubah.",
          ),
          ex(
            "Mengganti Isi Variabel let",
            "let skor = 0;\nconsole.log(skor); // 0\n\nskor = 50;\nconsole.log(skor); // 50\n\nskor = skor + 10;\nconsole.log(skor); // 60",
            "skor = skor + 10 artinya: ambil isi skor sekarang, tambah 10, simpan lagi ke skor.",
          ),
          mc(
            "Apa yang terjadi jika kode berikut dijalankan?\nconst x = 5;\nx = 10;",
            [
              "x menjadi 10",
              "x tetap 5",
              "Error! const tidak bisa ditimpa",
              "x menjadi 15",
            ],
            2,
            'Menimpa nilai const membuat program error: "Assignment to constant variable".',
          ),
          mc(
            "Nilai mana yang PALING COCOK disimpan dengan let?",
            [
              "Tanggal lahir",
              "Nama ibukota",
              "Sisa nyawa dalam game yang berkurang",
              "Angka pi",
            ],
            2,
            "Sisa nyawa berubah-ubah selama main — pas untuk let.",
          ),
          fill(
            "Lengkapi kata kunci variabel yang isinya bisa berubah:",
            "",
            "let",
            " saldo = 100000;\nsaldo = saldo - 25000;\nconsole.log(saldo);",
            "Saldo berkurang, jadi gunakan let.",
          ),
          fix(
            "Kode ini error karena nilai const ditimpa. Ubah agar program berjalan dan menampilkan 85!",
            "const nilai = 70;\nnilai = 85;\nconsole.log(nilai);",
            "Nilai yang berubah-ubah seharusnya memakai let, bukan const.",
            {
              js: [
                { syntaxOk: true },
                {
                  declares: "nilai",
                  msg: "Variabel nilai belum dibuat dengan let.",
                  hint: "let nilai = 70;",
                },
                {
                  notContains: /const\s+nilai/,
                  msg: "const tidak boleh ditimpa — gunakan let untuk nilai.",
                  hint: "Ganti kata const menjadi let pada deklarasi nilai.",
                },
              ],
              output: { contains: "85" },
            },
            "Ganti const menjadi let: let nilai = 70; lalu nilai = 85;",
          ),
          chal(
            "Buat let sisa berisi 100, kurangi 30 (sisa = sisa - 30), lalu tampilkan. Hasilnya harus 70.",
            "let sisa = 100;\n// kurangi 30 di sini\n// tampilkan di sini\n",
            {
              js: [
                { syntaxOk: true },
                {
                  declares: "sisa",
                  decl: ["let"],
                  msg: "Pastikan variabel sisa dibuat dengan let (nilainya berubah).",
                  hint: "let sisa = 100;",
                },
              ],
              output: { contains: "70" },
            },
            "sisa = sisa - 30; lalu console.log(sisa);",
          ),
          rev("Ringkasan: let vs const", [
            "const untuk nilai tetap, let untuk nilai yang berubah",
            "Menimpa const menyebabkan error",
            "skor = skor + 10 memperbarui isi variabel",
            "Kebiasaan baik: mulai dari const, ganti let bila perlu",
          ]),
        ]),

        lesson(3, "Tipe Data: String, Number, Boolean", [
          mat(
            "3 Tipe Data Dasar",
            "🧱",
            '<strong>String</strong>: teks, dibungkus kutip — "Rina". <strong>Number</strong>: angka, tanpa kutip — 15, 3.14. <strong>Boolean</strong>: nilai kebenaran, hanya ada dua — true atau false (tanpa kutip!). Untuk mengecek tipe sebuah nilai, gunakan <strong>typeof</strong>.',
          ),
          ex(
            "Mengenal typeof",
            'const nama = "Budi";\nconst umur = 17;\nconst aktif = true;\n\nconsole.log(typeof nama);  // string\nconsole.log(typeof umur);  // number\nconsole.log(typeof aktif); // boolean',
          ),
          mc(
            '"15" (dengan tanda kutip) adalah...',
            ["number", "string", "boolean", "error"],
            1,
            "Begitu dibungkus kutip, 15 berubah menjadi teks — meskipun isinya angka.",
          ),
          mc(
            "Nilai true dan false disebut tipe data...",
            ["string", "number", "boolean", "truthy"],
            2,
            "Boolean hanya punya dua nilai: true dan false — tanpa tanda kutip.",
          ),
          fill(
            "Lengkapi nilai boolean untuk variabel lulus:",
            "const lulus = ",
            "true",
            ";\nconsole.log(lulus);",
            "Boolean ditulis tanpa kutip: true atau false.",
          ),
          drag(
            "Susun tiga variabel dengan tipe data berbeda:",
            [
              'const nama = "Citra";',
              "const tinggi = 160;",
              "const lulus = true;",
            ],
            "String pakai kutip, number polos, boolean true/false.",
          ),
          chal(
            "Buat tiga variabel: nama (string), umur (number), aktif (boolean) — isi bebas, lalu tampilkan ketiganya dengan 3 console.log.",
            "// Buat 3 variabel di sini\n",
            {
              js: [
                { syntaxOk: true },
                {
                  declares: "nama",
                  msg: "Buat variabel nama (string).",
                  hint: 'const nama = "..." ;',
                },
                {
                  declares: "umur",
                  msg: "Buat variabel umur (number).",
                  hint: "const umur = 14;",
                },
                {
                  declares: "aktif",
                  msg: "Buat variabel aktif (boolean).",
                  hint: "const aktif = true;",
                },
              ],
              output: { logCount: { min: 3 } },
            },
            'Contoh: const nama = "Dewi"; const umur = 14; const aktif = true; lalu tampilkan satu per satu.',
          ),
          rev("Ringkasan: Tipe Data", [
            "String = teks dengan kutip",
            "Number = angka tanpa kutip",
            "Boolean = true / false",
            "typeof menunjukkan tipe sebuah nilai",
          ]),
        ]),

        lesson(4, "Menampilkan Variabel dalam Kalimat", [
          mat(
            "Menggabungkan Teks dan Variabel",
            "🧵",
            "Ada dua cara menyisipkan variabel ke kalimat. Cara lama: gabungkan dengan tanda <strong>+</strong>. Cara modern (favorit!): <strong>template literal</strong> — gunakan backtick ( ` ) sebagai kutip, lalu sisipkan variabel dengan <strong>${nama}</strong>.",
          ),
          ex(
            "Dua Cara Menyusun Kalimat",
            'const nama = "Rina";\n\n// Cara 1: penggabungan dengan +\nconsole.log("Halo, " + nama + "!");\n\n// Cara 2: template literal dengan backtick\nconsole.log(`Halo, ${nama}! Selamat belajar.`);',
            "Template literal memakai tanda kutip terbalik ` (backtick), bukan kutip biasa. Di dalamnya, ${...} menyisipkan isi variabel atau hasil hitungan.",
          ),
          mc(
            'Apa hasil dari console.log("5" + 5)?',
            ["10", '"55"', "error", "5"],
            1,
            'Tanda + antara string dan angka menghasilkan penggabungan teks: "55".',
          ),
          mc(
            "Tanda apa yang dipakai template literal?",
            [
              "Kutip tunggal '",
              'Kutip ganda "',
              "Backtick `",
              "Tanda bintang *",
            ],
            2,
            "Template literal ditulis di antara backtick ( ` ).",
          ),
          fill(
            "Lengkapi template literal untuk menyisipkan variabel nama:",
            'const nama = "Budi";\nconsole.log(`Selamat datang, ${',
            "nama",
            "}!`);",
            "Di dalam template literal, variabel disisipkan dengan ${namaVariabel}.",
          ),
          chal(
            "Buat const nama berisi namamu, lalu tampilkan dengan template literal: Halo, [namamu]! Lengkapi dengan tanda seru.",
            'const nama = "Budi";\n// Tampilkan dengan template literal di sini\n',
            {
              js: [
                { syntaxOk: true },
                {
                  uses: "template-literal",
                  msg: "Gunakan template literal (tanda backtick `) untuk menampilkan kalimat.",
                  hint: "console.log(`Halo, ${nama}!`);",
                },
              ],
            },
            "console.log(`Halo, ${nama}!`); — ingat: backtick, bukan kutip biasa.",
          ),
          rev("Ringkasan: Variabel dalam Kalimat", [
            "Gabung teks dengan tanda +",
            "Template literal memakai backtick `...`",
            "Variabel disisipkan dengan ${nama}",
            '"5" + 5 menghasilkan "55" — hati-hati!',
          ]),
        ]),

        project(5, "Mini Project — Kartu Profil Digital", [
          mat(
            "Saatnya Project!",
            "🚀",
            "Gabungkan semuanya: variabel, tipe data, dan template literal. Buat kartu profil digital yang tampil di konsol — lengkap dengan garis pembatas dan label tiap baris.",
          ),
          mini(
            "Kartu Profil Digital",
            'Buat const: nama (string), umur (number), hobi (string), aktif (boolean). Tampilkan kartu ke konsol dengan template literal: garis ====, lalu "Nama:", "Umur:", "Hobi:", dan "Status: Aktif belajar" (pakai variabel aktif untuk menentukan teksnya). Semua baris isi kartu WAJIB memakai template literal (backtick), bukan penggabungan +.',
            "// Kartu Profil Digital\n// 1. Buat const nama, umur, hobi, aktif\n// 2. Tampilkan garis, lalu tiap data pakai template literal\n",
            [
              chk("runs", "Kode berjalan tanpa error", "js.ok()"),
              chk(
                "nama",
                'Kartu menampilkan "Nama:"',
                'js.output().indexOf("Nama:") !== -1',
              ),
              chk(
                "umur",
                'Kartu menampilkan "Umur:"',
                'js.output().indexOf("Umur:") !== -1',
              ),
              chk(
                "hobi",
                'Kartu menampilkan "Hobi:"',
                'js.output().indexOf("Hobi:") !== -1',
              ),
              chk(
                "status",
                'Kartu menampilkan "Status:"',
                'js.output().indexOf("Status:") !== -1',
              ),
              chk(
                "garis",
                "Ada garis pembatas (tanda = minimal 5)",
                "/=====/.test(js.output())",
              ),
            ],
            {
              js: [
                { declares: "nama", msg: "Buat const nama berisi namamu." },
                {
                  declares: "umur",
                  msg: "Buat const umur berisi umurmu (angka).",
                },
                { declares: "hobi", msg: "Buat const hobi berisi hobimu." },
                {
                  declares: "aktif",
                  msg: "Buat const aktif berisi true atau false.",
                },
                {
                  uses: "template-literal",
                  msg: "Gunakan template literal (backtick `) untuk menampilkan kartu.",
                  hint: "Contoh: console.log(`Nama: ${nama}`);",
                },
              ],
            },
          ),
        ]),
      ],
    ),
  );
})();
