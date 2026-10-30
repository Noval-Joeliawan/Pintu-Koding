// src/js/lessons/js/level-25-26.js — Jalur JavaScript: Level 25 (JS 3: Operator Aritmatika & String) & Level 26 (JS 4: Perbandingan & Logika)
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
  // LEVEL 25 — JS LEVEL 3: OPERATOR ARITMATIKA & STRING
  // ============================================================
  K.register(
    K.level(
      25,
      3,
      "🧮",
      "Operator Aritmatika & String",
      "Hitung angka dengan + - * / %, gabungkan teks, dan kenali template literal",
      [
        lesson(1, "Operator Aritmatika Dasar", [
          mat(
            "Lima Operator Wajib Hafal",
            "🧮",
            "JavaScript bisa jadi kalkulator: <strong>+</strong> tambah, <strong>-</strong> kurang, <strong>*</strong> kali, <strong>/</strong> bagi, dan <strong>%</strong> modulo (sisa bagi). Operator boleh dipakai langsung pada angka maupun pada variabel berisi angka.",
          ),
          ex(
            "Kalkulator Mini",
            "const a = 10;\nconst b = 3;\n\nconsole.log(a + b); // 13\nconsole.log(a - b); // 7\nconsole.log(a * b); // 30\nconsole.log(a / b); // 3.333...\nconsole.log(a % b); // 1  (sisa 10 : 3)",
          ),
          mc(
            "Berapa hasil dari 10 % 3?",
            ["3", "1", "0", "3.33"],
            1,
            "10 dibagi 3 = 3 sisa 1. Tanda % mengambil SISA baginya, jadi hasilnya 1.",
          ),
          mc(
            "Berapa hasil dari 2 + 3 * 4?",
            ["20", "14", "24", "10"],
            1,
            "Perkalian dikerjakan lebih dulu daripada penjumlahan: 3 * 4 = 12, lalu 2 + 12 = 14.",
          ),
          fill(
            "Lengkapi operator sisa bagi:",
            "const sisa = 10 ",
            "%",
            " 3;\nconsole.log(sisa);",
            "Tanda % (modulo) menghasilkan sisa pembagian.",
          ),
          drag(
            "Susun program menghitung luas dan keliling persegi panjang:",
            [
              "const panjang = 5;",
              "const lebar = 4;",
              "const luas = panjang * lebar;",
              "console.log(luas);",
            ],
            "Variabel bisa dipakai sebagai bahan hitungan variabel lain.",
          ),
          chal(
            "Simpan hasil 15 * 4 ke variabel const hasil, lalu tampilkan dengan console.log.",
            "// Hitung di sini\n",
            {
              js: [
                { syntaxOk: true },
                {
                  declares: "hasil",
                  msg: "Buat variabel const bernama hasil.",
                  hint: "const hasil = 15 * 4;",
                },
              ],
              output: { contains: "60" },
            },
            "const hasil = 15 * 4; lalu console.log(hasil);",
          ),
          rev("Ringkasan: Operator Aritmatika", [
            "+ - * / untuk tambah, kurang, kali, bagi",
            "% (modulo) mengambil sisa pembagian",
            "Perkalian/pembagian dikerjakan sebelum tambah/kurang",
            "Hasil hitungan bisa disimpan ke variabel",
          ]),
        ]),

        lesson(2, "Modulo: Sisa yang Berguna", [
          mat(
            "Untuk Apa Sisa Bagi?",
            "🥧",
            'Modulo (%) terdengar sepele, tetapi sangat sering dipakai: menentukan angka <strong>genap/ganjil</strong> (x % 2), mengubah <strong>detik menjadi menit</strong>, membuat nilai "berputar" (0,1,2,0,1,2...), dan banyak lagi. Jika 500 detik dibagi 60, sisanya 20 — itulah detik yang tersisa.',
          ),
          ex(
            "Genap atau Ganjil?",
            "const angka = 7;\n\nconsole.log(angka % 2); // 1 → ganjil\nconsole.log(8 % 2);    // 0 → genap\n\n// Sisa 0 artinya habis dibagi 2 (genap)",
          ),
          mc(
            "17 % 5 sama dengan...",
            ["2", "3", "3.4", "0"],
            0,
            "17 : 5 = 3 sisa 2, jadi 17 % 5 = 2.",
          ),
          mc(
            "Bagaimana cara mengecek bahwa x adalah angka GENAP?",
            ["x / 2", "x % 2 === 0", "x % 0 === 2", "x === 2"],
            1,
            "Angka genap habis dibagi 2, sehingga sisa baginya (x % 2) adalah 0.",
          ),
          fix(
            'Program ini error karena "mod" bukan operator JavaScript. Perbaiki!',
            "const sisa = 10 mod 3;\nconsole.log(sisa);",
            "Operator sisa bagi di JavaScript ditulis dengan tanda %.",
            {
              js: [
                { syntaxOk: true },
                {
                  declares: "sisa",
                  msg: "Variabel sisa belum dibuat dengan benar.",
                  hint: "const sisa = 10 % 3;",
                },
              ],
              output: { contains: "1" },
            },
            "const sisa = 10 % 3; — hasilnya 1.",
          ),
          chal(
            "Kamu punya 130 detik. Simpan sisa detik setelah dibagi 60 ke variabel const sisa, lalu tampilkan. Jawabannya 10.",
            "const detik = 130;\n// hitung sisa detik di sini\n",
            {
              js: [
                { syntaxOk: true },
                {
                  declares: "sisa",
                  msg: "Buat variabel const sisa.",
                  hint: "const sisa = detik % 60;",
                },
              ],
              output: { contains: "10" },
            },
            "const sisa = detik % 60; — 130 : 60 = 2 sisa 10.",
          ),
          rev("Ringkasan: Modulo", [
            "% menghasilkan sisa pembagian",
            "x % 2 === 0 artinya x genap",
            "Modulo berguna untuk konversi satuan (detik→menit)",
            'Modulo membuat nilai "berputar" dalam rentang tertentu',
          ]),
        ]),

        lesson(3, "Penggabungan String", [
          mat(
            "Menempel Teks dengan +",
            "🧷",
            'Pada teks, tanda <strong>+</strong> berarti "menempelkan" (menggabungkan), bukan menambah angka: "Hai" + "Budi" menghasilkan "HaiBudi". Karena itu jangan lupa menyelipkan <strong>spasi</strong> di antara kata: "Hai" + " " + "Budi" menghasilkan "Hai Budi".',
          ),
          ex(
            "Menggabungkan Nama Depan & Belakang",
            'const depan = "Ani";\nconst belakang = "Rahma";\n\nconsole.log(depan + belakang);        // AniRahma\nconsole.log(depan + " " + belakang);  // Ani Rahma',
          ),
          mc(
            'Apa hasil dari "Hai" + " " + "Budi"?',
            ['"HaiBudi"', '"Hai Budi"', '"Hai  Budi"', "error"],
            1,
            'Tanda kutip berisi satu spasi (" ") menyisipkan spasi di antara dua kata.',
          ),
          mc(
            'Apa hasil dari "Umur: " + 17?',
            ["error", '"Umur: 17"', "17", '"Umur:"'],
            1,
            'String yang digabung angka akan otomatis menjadi teks utuh: "Umur: 17".',
          ),
          fill(
            "Lengkapi penggabungan string:",
            'const nama = "Budi";\nconst sapaan = "Halo, " ',
            "+",
            " nama;\nconsole.log(sapaan);",
            "Tanda + menempelkan string dengan isi variabel.",
          ),
          chal(
            'Buat const depan = "Ani" dan const belakang = "Rahma", lalu tampilkan gabungannya dengan SATU spasi: Ani Rahma.',
            "// Buat dua variabel di sini\n",
            {
              js: [
                { syntaxOk: true },
                {
                  declares: "depan",
                  msg: 'Buat const depan = "Ani".',
                  hint: 'const depan = "Ani";',
                },
                {
                  declares: "belakang",
                  msg: 'Buat const belakang = "Rahma".',
                  hint: 'const belakang = "Rahma";',
                },
              ],
              output: { contains: "Ani Rahma" },
            },
            'console.log(depan + " " + belakang); — jangan lupa spasi di kutipnya!',
          ),
          rev("Ringkasan: Penggabungan String", [
            "+ pada string berarti menggabungkan",
            'Sisipkan spasi dengan " "',
            "String + angka menjadi teks utuh",
            'Hati-hati: "5" + 5 = "55", bukan 10',
          ]),
        ]),

        lesson(4, "Template Literal: Cara Modern", [
          mat(
            "Backtick dan ${...}",
            "✨",
            "Template literal memakai tanda <strong>backtick ( ` )</strong> — tombol di sebelah angka 1. Keunggulannya: variabel bisa disisipkan langsung dengan <strong>${nama}</strong> tanpa banyak tanda +, bahkan bisa memuat hitungan seperti ${2 + 3} dan baris baru tanpa perlu +.",
          ),
          ex(
            "Template Literal dalam Aksi",
            'const barang = "Buku";\nconst harga = 15000;\n\nconsole.log(`Barang: ${barang}`);\nconsole.log(`Harga: Rp${harga}`);\nconsole.log(`Total 3 buah: Rp${harga * 3}`);',
          ),
          mc(
            "Apa hasil dari `2 + 3 = ${2 + 3}`?",
            ["2 + 3 = 5", "2 + 3 = ${2 + 3}", "5", "error"],
            0,
            "Bagian ${...} dievaluasi dulu: hasilnya 5, lalu ditempel ke kalimat.",
          ),
          mc(
            "Manakah penulisan template literal yang BENAR?",
            [
              '"Halo, ${nama}"',
              "`Halo, ${nama}`",
              "'Halo, $nama'",
              "`Halo, nama`",
            ],
            1,
            "Template literal memakai backtick dan variabel dibungkus ${ }.",
          ),
          fix(
            "Template literal ini ditulis dengan kutip biasa sehingga ${nama} tidak berfungsi. Perbaiki!",
            'const nama = "Budi";\nconsole.log("Halo, ${nama}!");',
            "Ganti kutip ganda dengan backtick ( ` ) agar ${nama} bisa berfungsi.",
            {
              js: [
                { syntaxOk: true },
                {
                  uses: "template-literal",
                  msg: "Gunakan backtick ( ` ) untuk template literal.",
                  hint: "console.log(`Halo, ${nama}!`);",
                },
              ],
              output: { contains: "Halo, Budi!" },
            },
            "console.log(`Halo, ${nama}!`); — sekarang isi variabel benar-benar tampil.",
          ),
          chal(
            'Buat const barang = "Pensil" dan const harga = 3000. Tampilkan dengan template literal sehingga konsol menampilkan: Barang: Pensil, Harga: Rp3000',
            "// Buat dua variabel, lalu tampilkan dengan template literal\n",
            {
              js: [
                { syntaxOk: true },
                {
                  declares: "barang",
                  msg: 'Buat const barang = "Pensil".',
                  hint: 'const barang = "Pensil";',
                },
                {
                  declares: "harga",
                  msg: "Buat const harga = 3000 (angka, tanpa kutip).",
                  hint: "const harga = 3000;",
                },
                {
                  uses: "template-literal",
                  msg: "Gunakan template literal (backtick `) untuk menampilkan hasil.",
                  hint: "console.log(`Barang: ${barang}, Harga: Rp${harga}`);",
                },
              ],
              output: { contains: "Barang: Pensil, Harga: Rp3000" },
            },
            "console.log(`Barang: ${barang}, Harga: Rp${harga}`);",
          ),
          rev("Ringkasan: Template Literal", [
            "Ditulis di antara backtick ( ` )",
            "Variabel dan hitungan disisipkan dengan ${...}",
            "Jauh lebih rapi daripada banyak tanda +",
            '"Harga: Rp" + harga sama saja dengan `Harga: Rp${harga}`',
          ]),
        ]),

        project(5, "Mini Project — Struk Kasir Mini", [
          mat(
            "Saatnya Project!",
            "🚀",
            "Terapkan operator aritmatika dan template literal sekaligus: cetak struk pembelian sederhana ke konsol, lengkap dengan perhitungan total otomatis.",
          ),
          mini(
            "Struk Kasir Mini",
            'Buat const: barang = "Pensil", hargaSatuan = 3000, jumlah = 5. Hitung const total = hargaSatuan * jumlah. Cetak struk dengan template literal: garis ====, "Barang: ...", "Harga satuan: Rp...", "Jumlah: ...", "Total: Rp..." (gunakan variabel total, bukan angka ketikan manual).',
            "// Struk Kasir\n// 1. Buat const barang, hargaSatuan, jumlah\n// 2. Hitung total\n// 3. Cetak struk dengan template literal\n",
            [
              chk("runs", "Kode berjalan tanpa error", "js.ok()"),
              chk(
                "barang",
                'Struk menampilkan "Barang:"',
                'js.output().indexOf("Barang:") !== -1',
              ),
              chk(
                "total",
                'Struk menampilkan "Total:"',
                'js.output().indexOf("Total:") !== -1',
              ),
              chk(
                "total-benar",
                "Total terhitung benar (15000)",
                'js.output().indexOf("15000") !== -1',
              ),
              chk(
                "garis",
                "Ada garis pembatas (tanda = minimal 5)",
                "/=====/.test(js.output())",
              ),
            ],
            {
              js: [
                { syntaxOk: true },
                {
                  declares: "barang",
                  msg: 'Buat const barang = "Pensil".',
                  hint: 'const barang = "Pensil";',
                },
                {
                  declares: "total",
                  msg: "Buat const total = hargaSatuan * jumlah.",
                  hint: "const total = hargaSatuan * jumlah;",
                },
                {
                  uses: "template-literal",
                  msg: "Gunakan template literal (backtick `) untuk mencetak struk.",
                  hint: "console.log(`Total: Rp${total}`);",
                },
              ],
            },
          ),
        ]),
      ],
    ),
  );

  // ============================================================
  // LEVEL 26 — JS LEVEL 4: PERBANDINGAN & LOGIKA
  // ============================================================
  K.register(
    K.level(
      26,
      4,
      "⚖️",
      "Perbandingan & Logika",
      "Bandingkan nilai dengan === !== > <, dan gabungkan keputusan dengan && || !",
      [
        lesson(1, "Operator Perbandingan", [
          mat(
            "Hasilnya Selalu true / false",
            "⚖️",
            "Operator perbandingan membandingkan dua nilai dan hasilnya adalah <strong>boolean</strong>: <strong>===</strong> sama persis, <strong>!==</strong> tidak sama, <strong>&gt;</strong> lebih besar, <strong>&lt;</strong> lebih kecil, <strong>&gt;=</strong> lebih besar atau sama, <strong>&lt;=</strong> lebih kecil atau sama.",
          ),
          ex(
            "Membandingkan Nilai",
            "console.log(5 === 5);   // true\nconsole.log(5 !== 4);   // true\nconsole.log(7 > 3);     // true\nconsole.log(2 > 9);     // false\nconsole.log(10 >= 10);  // true\n\nconst nilai = 80;\nconsole.log(nilai >= 75); // true",
          ),
          mc(
            "Apa hasil dari 7 > 3?",
            ["true", "false", "7", "error"],
            0,
            "Tujuh memang lebih besar dari tiga, jadi perbandingannya true.",
          ),
          mc(
            "Apa beda tanda = dengan ===?",
            [
              "Sama saja",
              "= membandingkan, === memberi nilai",
              "= memberi nilai (assignment), === membandingkan",
              "=== hanya untuk teks",
            ],
            2,
            "= untuk mengisi variabel, === untuk membandingkan dua nilai.",
          ),
          fill(
            'Lengkapi operator "lebih besar atau sama dengan":',
            "const nilai = 80;\nconst lulus = nilai ",
            ">=",
            " 75;\nconsole.log(lulus);",
            '>= berarti "lebih besar ATAU sama dengan".',
          ),
          chal(
            "Tampilkan hasil perbandingan berikut dengan dua console.log: 10 === 10 dan 3 !== 3. Konsol harus menampilkan true lalu false.",
            "// Dua perbandingan di sini\n",
            {
              js: [
                { syntaxOk: true },
                {
                  uses: ["===", "!=="],
                  msg: "Gunakan operator === pada baris pertama dan !== pada baris kedua.",
                  hint: "console.log(10 === 10); lalu console.log(3 !== 3);",
                },
              ],
              output: { equals: "true\nfalse" },
            },
            "console.log(10 === 10); lalu console.log(3 !== 3);",
          ),
          rev("Ringkasan: Perbandingan", [
            "=== sama, !== tidak sama",
            "> < >= <= untuk membandingkan besar",
            "Hasil perbandingan selalu boolean (true/false)",
            "= mengisi nilai, === membandingkan",
          ]),
        ]),

        lesson(2, "=== (Ketat) vs == (Longgar)", [
          mat(
            "Kenapa Harus ===?",
            "🎯",
            'JavaScript punya dua tanda kesetaraan: <strong>===</strong> (ketat) membandingkan NILAI + TIPE, sedangkan <strong>==</strong> (longgar) membalik-balik tipe sehingga 5 == "5" menjadi true — sumber bug tersembunyi! Aturan aman: <strong>selalu gunakan === dan !==</strong>.',
          ),
          ex(
            "Perbedaan yang Menjebak",
            'console.log(5 === "5");  // false — tipe berbeda (number vs string)\nconsole.log(5 == "5");   // true  — == terlalu longgar!\nconsole.log(5 !== "5");  // true  — memang tidak sama persis',
          ),
          mc(
            'Apa hasil dari 5 === "5"?',
            ["true", "false", "error", '"5"'],
            1,
            '=== membandingkan tipe juga: number 5 berbeda dari string "5", jadi false.',
          ),
          mc(
            "Praktik terbaik perbandingan di JavaScript adalah...",
            [
              "Gunakan == agar fleksibel",
              "Selalu gunakan === dan !==",
              "Gunakan = saja",
              "Hindari perbandingan",
            ],
            1,
            "Perbandingan ketat mencegah bug tersembunyi karena perbedaan tipe.",
          ),
          fill(
            'Lengkapi operator "tidak sama dengan" (ketat):',
            'const sandi = "abc";\nconst tebakan = "xyz";\nconst salahSandi = tebakan ',
            "!==",
            " sandi;\nconsole.log(salahSandi);",
            '!== berarti "tidak sama persis".',
          ),
          fix(
            "Baris ini error: tanda = dipakai untuk perbandingan. Perbaiki agar konsol menampilkan true!",
            "const sama = 5 = 5;\nconsole.log(sama);",
            "Untuk membandingkan, gunakan ===. Tanda = hanya untuk mengisi variabel.",
            {
              js: [
                { syntaxOk: true },
                {
                  uses: "===",
                  msg: "Gunakan === untuk membandingkan.",
                  hint: "const sama = 5 === 5;",
                },
              ],
              output: { contains: "true" },
            },
            "const sama = 5 === 5; — perbandingan yang benar.",
          ),
          rev("Ringkasan: === vs ==", [
            "=== cek nilai DAN tipe (aman)",
            '== terlalu longgar: 5 == "5" jadi true',
            "Gunakan selalu === dan !==",
            "Tanda = hanya untuk mengisi variabel",
          ]),
        ]),

        lesson(3, "Operator Logika && dan ||", [
          mat(
            "Menggabungkan Keputusan",
            "🔀",
            'Keputusan di dunia nyata sering gabungan: "boleh naik wahana JIKA umur cukup <strong>DAN</strong> tinggi cukup". <strong>&amp;&amp;</strong> (AND) bernilai true hanya jika KEDUANYA true. <strong>||</strong> (OR) bernilai true jika SALAH SATU saja true.',
          ),
          ex(
            "AND (&&) dan OR (||)",
            "const umur = 17;\nconst punyaKTP = true;\n\nconsole.log(umur >= 17 && punyaKTP); // true — dua-duanya terpenuhi\nconsole.log(umur < 17 || punyaKTP);  // true — salah satu terpenuhi\nconsole.log(umur < 17 || !punyaKTP); // false — tidak ada yang terpenuhi",
          ),
          mc(
            "Apa hasil dari true && false?",
            ["true", "false", "error", "null"],
            1,
            "AND (&&) butuh KEDUA sisi true. Karena salah satunya false, hasilnya false.",
          ),
          mc(
            "Apa hasil dari true || false?",
            ["false", "true", "error", "keduanya"],
            1,
            "OR (||) cukup SALAH SATU sisi true — hasilnya true.",
          ),
          fill(
            "Lengkapi operator DAN (&&):",
            "const punyaTiket = true;\nconst umurCukup = true;\nconst bolehMasuk = punyaTiket ",
            "&&",
            " umurCukup;\nconsole.log(bolehMasuk);",
            "&& mengharuskan kedua syarat terpenuhi.",
          ),
          chal(
            "Buat const umur = 17 dan const punyaKTP = true. Tampilkan dua baris: (1) umur >= 17 && punyaKTP, (2) umur < 16 || punyaKTP. Keduanya harus true.",
            "// Buat variabel, lalu tampilkan dua perbandingan\n",
            {
              js: [
                { syntaxOk: true },
                {
                  uses: "&&",
                  msg: "Gunakan operator && pada baris pertama.",
                  hint: "console.log(umur >= 17 && punyaKTP);",
                },
                {
                  uses: "||",
                  msg: "Gunakan operator || pada baris kedua.",
                  hint: "console.log(umur < 16 || punyaKTP);",
                },
              ],
              output: { equals: "true\ntrue" },
            },
            "Kedua logika menghasilkan true dengan data tersebut.",
          ),
          rev("Ringkasan: && dan ||", [
            "&& (AND): true hanya jika keduanya true",
            "|| (OR): true jika salah satu true",
            "Cocok untuk menggabungkan beberapa syarat",
            "Urutan pemeriksaan: kiri dulu, berhenti bila sudah jelas",
          ]),
        ]),

        lesson(4, "Operator Logika ! (NOT)", [
          mat(
            "Membalik Nilai dengan !",
            "🔄",
            'Tanda seru <strong>!</strong> (NOT) membalik boolean: <strong>!true</strong> menjadi false, <strong>!false</strong> menjadi true. Berguna untuk pertanyaan negatif seperti "apakah TIDAK hujan?" — !hujan.',
          ),
          ex(
            "Membalik Kebenaran",
            "const hujan = false;\nconst lulus = true;\n\nconsole.log(!hujan);        // true — tidak hujan\nconsole.log(!lulus);        // false\nconsole.log(!(2 > 1));      // false — kebalikan dari true",
          ),
          mc(
            "Apa hasil dari !true?",
            ["true", "false", "undefined", "error"],
            1,
            "! membalik nilai: kebalikan true adalah false.",
          ),
          mc(
            "Apa hasil dari !(3 > 5)?",
            ["true", "false", "error", "3"],
            0,
            "3 > 5 bernilai false; kebalikannya (!) adalah true.",
          ),
          fill(
            "Lengkapi operator NOT:",
            "const lapar = false;\nconst tidakLapar = ",
            "!",
            "lapar;\nconsole.log(tidakLapar);",
            "Tanda ! membalik nilai boolean.",
          ),
          chal(
            "Tampilkan dua baris dengan console.log: (1) !true, (2) !(2 < 1). Konsol harus menampilkan false lalu true.",
            "// Dua baris NOT di sini\n",
            {
              js: [
                { syntaxOk: true },
                {
                  uses: "not",
                  msg: "Gunakan operator ! (NOT).",
                  hint: "console.log(!true); lalu console.log(!(2 < 1));",
                },
              ],
              output: { equals: "false\ntrue" },
            },
            "!true = false, dan !(2 < 1) = !(false) = true.",
          ),
          rev("Ringkasan: NOT (!)", [
            "! membalik true ⇄ false",
            "!true = false, !false = true",
            "Bisa dipakai pada hasil perbandingan: !(a > b)",
            "Hati-hati: jangan tertukar dengan !== (tidak sama dengan)",
          ]),
        ]),

        project(5, "Mini Project — Pengecek Syarat Kedai", [
          mat(
            "Saatnya Project!",
            "🚀",
            "Waktunya menjadi penjaga kedai! Buat program yang memeriksa apakah pelajar boleh masuk ruang belajar: umur minimal 12 DAN membawa kartu pelajar, ATAU didampingi guru.",
          ),
          mini(
            "Pengecek Syarat Kedai",
            'Buat const: umur = 15, punyaKartu = true, ditemaniGuru = false. Tampilkan minimal 3 baris ke konsol: (1) "Umur cukup: " + hasil umur >= 12, (2) "Boleh masuk (kartu/guru): " + hasil (punyaKartu || ditemaniGuru), (3) "Syarat lengkap: " + hasil (umur >= 12 && (punyaKartu || ditemaniGuru)). Gunakan && dan || sesuai petunjuk.',
            "// Pengecek Syarat Kedai\n// const umur = 15;\n// const punyaKartu = true;\n// const ditemaniGuru = false;\n// Tampilkan 3 baris pemeriksaan dengan && dan ||\n",
            [
              chk("runs", "Kode berjalan tanpa error", "js.ok()"),
              chk("baris", "Ada minimal 3 baris output", "js.logCount() >= 3"),
              chk(
                "ada-true",
                "Ada hasil true di output",
                'js.output().indexOf("true") !== -1',
              ),
              chk(
                "ada-false",
                "Ada hasil false di output",
                'js.output().indexOf("false") !== -1',
              ),
              chk("logika", "Program menggunakan && dan ||", "true"),
            ],
            {
              js: [
                { syntaxOk: true },
                {
                  uses: "&&",
                  msg: 'Gunakan && untuk syarat "umur cukup DAN kartu".',
                  hint: "umur >= 12 && punyaKartu",
                },
                {
                  uses: "||",
                  msg: 'Gunakan || untuk syarat "kartu ATAU ditemani guru".',
                  hint: "punyaKartu || ditemaniGuru",
                },
              ],
            },
          ),
        ]),
      ],
    ),
  );
})();
