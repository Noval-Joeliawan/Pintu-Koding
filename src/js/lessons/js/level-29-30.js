// src/js/lessons/js/level-29-30.js — Jalur JavaScript: Level 29 (JS 7: Perulangan) & Level 30 (JS 8: Array)
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
  // LEVEL 29 — JS LEVEL 7: PERULANGAN (LOOP)
  // ============================================================
  K.register(
    K.level(
      29,
      7,
      "🔁",
      "Perulangan",
      "Ulangi pekerjaan otomatis dengan for dan while",
      [
        lesson(1, "Perulangan for", [
          mat(
            "for = Ulangi Sebanyak Ini",
            "🔁",
            "Menulis console.log sepuluh kali itu melelahkan. <strong>for</strong> mengulang blok kode otomatis dengan tiga bagian: <strong>awal</strong> (let i = 1), <strong>kondisi lanjut</strong> (i <= 5), dan <strong>langkah</strong> (i++ artinya naik satu). Variabel i adalah <em>counter</em> — penghitung putaran.",
          ),
          ex(
            "Menghitung 1 sampai 5",
            "for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}\n// Output: 1\n//         2\n//         3\n//         4\n//         5",
            "Alur: i=1 → cek kondisi → cetak → i naik ke 2 → cek lagi → ... berhenti saat i = 6 karena kondisi false.",
          ),
          mat(
            "Membaca Tiga Bagian for",
            "🧭",
            "for (awal; kondisi; langkah) — awal dijalankan SEKALI di mulai; kondisi dicek SETIAP putaran (true = lanjut, false = berhenti); langkah dijalankan di akhir tiap putaran. i++ adalah jalan pintas untuk i = i + 1.",
          ),
          mc(
            "for (let i = 1; i <= 3; i++) — berapa kali blok dijalankan?",
            ["1 kali", "2 kali", "3 kali", "Selamanya"],
            2,
            "i bernilai 1, 2, 3 — pada i = 4 kondisi 4 <= 3 sudah false, jadi 3 putaran.",
          ),
          mc(
            "Apa arti dari i++?",
            ["i berkurang 1", "i bertambah 1", "i dikali 2", "i dicetak"],
            1,
            "i++ menaikkan nilai i sebanyak 1 — sama dengan i = i + 1.",
          ),
          fill(
            "Lengkapi kondisi agar berhenti setelah 5:",
            "for (let i = 1; i ",
            "<=",
            " 5; i++) {\n  console.log(i);\n}",
            "Kondisi i <= 5 membuat loop berjalan selama i bernilai 1 sampai 5.",
          ),
          drag(
            "Susun perulangan yang menghitung 1 sampai 3:",
            ["for (let i = 1; i <= 3; i++) {", "  console.log(i);", "}"],
            "Tiga bagian for ditulis di dalam satu kurung, dipisah titik koma.",
          ),
          chal(
            "Buat perulangan for yang menampilkan angka 1 sampai 5 (satu angka per baris).",
            "// Tulis for di sini\n",
            {
              js: [
                { syntaxOk: true },
                {
                  uses: "for",
                  msg: "Gunakan perulangan for.",
                  hint: "for (let i = 1; i <= 5; i++) { console.log(i); }",
                },
              ],
              output: { equals: "1\n2\n3\n4\n5" },
            },
            "for (let i = 1; i <= 5; i++) { console.log(i); }",
          ),
          rev("Ringkasan: for", [
            "for (awal; kondisi; langkah) { ... }",
            "Kondisi false → perulangan berhenti",
            "i++ menaikkan counter satu angka",
            "Counter bisa dicetak: console.log(i)",
          ]),
        ]),

        lesson(2, "Perulangan while", [
          mat(
            "while = Selama Masih Benar",
            "⏳",
            "<strong>while</strong> mengulang blok SELAMA kondisinya true — tidak tahu pasti berapa putaran. Karena itu di dalam blok harus ada langkah yang mengubah kondisi (misalnya sisa--) supaya perulangan bisa berhenti. Kalau tidak, program tersangkut selamanya (<em>infinite loop</em>)!",
          ),
          ex(
            "Hitung Mundur dengan while",
            "let sisa = 3;\n\nwhile (sisa > 0) {\n  console.log(sisa);\n  sisa--; // WAJIB! supaya berhenti\n}\n// Output: 3\n//         2\n//         1",
          ),
          mc(
            "Apa risiko utama while?",
            [
              "Terlalu cepat",
              "Infinite loop bila kondisi selalu true",
              "Tidak bisa menampilkan angka",
              "Harus selalu pakai i",
            ],
            1,
            "Bila kondisi tidak pernah menjadi false, perulangan tidak pernah berhenti.",
          ),
          mc(
            "Di dalam blok while, hal WAJIB ada supaya berhenti adalah...",
            [
              "console.log",
              "perubahan yang menuju kondisi false (mis. sisa--)",
              "tanda titik koma ganda",
              "variabel const",
            ],
            1,
            "Tanpa perubahan kondisi, while berjalan terus tanpa henti.",
          ),
          fill(
            "Lengkapi kondisi while untuk hitung mundur:",
            "let sisa = 3;\nwhile (sisa ",
            ">",
            " 0) {\n  console.log(sisa);\n  sisa--;\n}",
            "Loop jalan selama sisa lebih besar dari 0.",
          ),
          chal(
            "Buat perulangan while yang menampilkan hitung mundur 3, 2, 1 (satu angka per baris).",
            "let sisa = 3;\n// Tulis while di sini\n",
            {
              js: [
                { syntaxOk: true },
                {
                  uses: "while",
                  msg: "Gunakan perulangan while.",
                  hint: "while (sisa > 0) { console.log(sisa); sisa--; }",
                },
              ],
              output: { equals: "3\n2\n1" },
            },
            "while (sisa > 0) { console.log(sisa); sisa--; } — jangan lupa sisa--!",
          ),
          rev("Ringkasan: while", [
            "while (kondisi) { ... } — ulang selama kondisi true",
            "Wajib ada perubahan kondisi di dalam blok",
            "sisa-- menurunkan counter satu angka",
            "Kondisi selalu true = infinite loop",
          ]),
        ]),

        lesson(3, "for atau while?", [
          mat(
            "Memilih Alat yang Tepat",
            "🧭",
            "Bila jumlah putaran <strong>sudah pasti</strong> (10 kali, 1 sampai 100), pakai <strong>for</strong> — tiga bagiannya rapi di satu baris. Bila bergantung <strong>keadaan</strong> (ulangi sampai tebakan benar, selama nyawa > 0), pakai <strong>while</strong>.",
          ),
          ex(
            "Masalah yang Sama, Dua Gaya",
            "// Jumlah 1 sampai 10 dengan for\nlet totalA = 0;\nfor (let i = 1; i <= 10; i++) {\n  totalA = totalA + i;\n}\nconsole.log(totalA); // 55\n\n// Jumlah 1 sampai 10 dengan while\nlet totalB = 0;\nlet n = 1;\nwhile (n <= 10) {\n  totalB = totalB + n;\n  n++;\n}\nconsole.log(totalB); // 55",
          ),
          mc(
            "Untuk mencetak angka 1 sampai 100, struktur yang paling pas adalah...",
            [
              "while dengan i = 1",
              "for (let i = 1; i <= 100; i++)",
              "100 baris console.log",
              "switch",
            ],
            1,
            "Jumlah putaran pasti → for paling rapi.",
          ),
          fix(
            "Perulangan ini salah kondisi sehingga tidak pernah jalan. Perbaiki agar konsol menampilkan 1, 2, 3!",
            "for (let i = 1; i >= 3; i++) {\n  console.log(i);\n}",
            "Cek kondisinya: 1 >= 3 langsung false. Ganti >= menjadi <= agar berjalan dari 1 ke 3.",
            {
              js: [
                { syntaxOk: true },
                {
                  uses: "for",
                  msg: "Gunakan perulangan for.",
                  hint: "for (let i = 1; i <= 3; i++) { console.log(i); }",
                },
              ],
              output: { equals: "1\n2\n3" },
            },
            "for (let i = 1; i <= 3; i++) — kondisi <= membuat loop benar-benar berjalan.",
          ),
          chal(
            "Hitung jumlah angka 1 sampai 100 dengan perulangan, simpan di variabel total, lalu tampilkan. Jawabannya 5050.",
            "let total = 0;\n// Tulis perulangan penjumlah di sini\n",
            {
              js: [
                { syntaxOk: true },
                {
                  uses: "for",
                  msg: "Gunakan perulangan for untuk menjumlah 1 sampai 100.",
                  hint: "for (let i = 1; i <= 100; i++) { total = total + i; }",
                },
              ],
              output: { contains: "5050" },
            },
            "for (let i = 1; i <= 100; i++) { total = total + i; } lalu console.log(total);",
          ),
          rev("Ringkasan: Memilih Loop", [
            "Jumlah pasti → for",
            "Bergantung keadaan → while",
            "total = total + i menjumlah kumulatif",
            "Cek kondisi dengan teliti agar loop jalan & berhenti",
          ]),
        ]),

        lesson(4, "Perulangan Bersarang (Nested Loop)", [
          mat(
            "Loop di Dalam Loop",
            "🪆",
            'Perulangan boleh berisi perulangan lain — disebut <strong>nested loop</strong>. Loop luar satu "detak", loop dalam berputar penuh. Analoginya jam: setiap jam (loop luar), menit berputar 60 kali (loop dalam). Total putaran = luar × dalam.',
          ),
          ex(
            "Pasangan Baris-Kolom",
            'for (let baris = 1; baris <= 3; baris++) {\n  for (let kolom = 1; kolom <= 3; kolom++) {\n    console.log(baris + "-" + kolom);\n  }\n}\n// Output: 1-1, 1-2, 1-3, 2-1, ... 3-3 (9 baris)',
          ),
          mc(
            "Loop luar 3 putaran dan loop dalam 2 putaran — berapa kali blok terdalam jalan?",
            ["5", "6", "3", "2"],
            1,
            "Totalnya dikali: 3 × 2 = 6 kali.",
          ),
          chal(
            'Gunakan nested loop untuk menampilkan semua pasangan "baris-kolom" dari 1 sampai 3, seperti 1-1, 1-2, ..., 3-3.',
            "// Nested loop di sini\n",
            {
              js: [
                { syntaxOk: true },
                {
                  uses: "for-nested",
                  msg: "Gunakan DUA perulangan for (satu di dalam yang lain).",
                  hint: 'for (let b = 1; b <= 3; b++) { for (let k = 1; k <= 3; k++) { console.log(b + "-" + k); } }',
                },
              ],
              output: { containsAll: ["1-2", "2-2", "3-3"] },
            },
            "Loop luar untuk baris, loop dalam untuk kolom.",
          ),
          rev("Ringkasan: Nested Loop", [
            "Loop dalam berputar penuh setiap satu putaran loop luar",
            "Total putaran = luar × dalam",
            "Cocok untuk tabel, grid, dan kombinasi",
            "Gunakan nama variabel berbeda (baris/kolom, i/j)",
          ]),
        ]),

        project(5, "Mini Project — Tabel Perkalian", [
          mat(
            "Saatnya Project!",
            "🚀",
            "Buat mesin tabel perkalian seperti buku matematika: pilih satu angka, lalu loop mencetak hasil 1 sampai 10. Gabungkan perulangan dengan template literal!",
          ),
          mini(
            "Tabel Perkalian",
            'Buat const angka = 7. Gunakan perulangan for dari 1 sampai 10 dan tampilkan tiap baris dengan template literal: `7 x 1 = 7` dst (formatnya "7 x [pengali] = [hasil]"). Pastikan hasil dikalikan dengan i, bukan diketik manual.',
            "// Tabel Perkalian\n// const angka = 7;\n// for (let i = 1; i <= 10; i++) { ... }\n",
            [
              chk("runs", "Kode berjalan tanpa error", "js.ok()"),
              chk(
                "baris",
                "Ada minimal 10 baris output",
                "js.logCount() >= 10",
              ),
              chk(
                "awal",
                "Baris pertama benar: 7 x 1 = 7",
                'js.output().indexOf("7 x 1 = 7") !== -1',
              ),
              chk(
                "akhir",
                "Baris terakhir benar: 7 x 10 = 70",
                'js.output().indexOf("7 x 10 = 70") !== -1',
              ),
              chk(
                "tengah",
                "Baris tengah benar: 7 x 5 = 35",
                'js.output().indexOf("7 x 5 = 35") !== -1',
              ),
            ],
            {
              js: [
                { syntaxOk: true },
                {
                  uses: "for",
                  msg: "Gunakan perulangan for dari 1 sampai 10.",
                  hint: "for (let i = 1; i <= 10; i++) { console.log(`7 x ${i} = ${7 * i}`); }",
                },
              ],
            },
          ),
        ]),
      ],
    ),
  );

  // ============================================================
  // LEVEL 30 — JS LEVEL 8: ARRAY DASAR
  // ============================================================
  K.register(
    K.level(
      30,
      8,
      "📋",
      "Array Dasar",
      "Simpan banyak data dalam satu variabel: buat, akses, tambah, dan loop array",
      [
        lesson(1, "Mengenal Array", [
          mat(
            "Array = Rak Bernomor",
            "📋",
            '<strong>Array</strong> menyimpan BANYAK nilai dalam SATU variabel. Ditulis dengan kurung siku, isinya dipisah koma: ["mangga", "jeruk", "apel"]. Setiap kotak punya nomor urut yang disebut <strong>index</strong> — dan index <strong>mulai dari 0</strong>, bukan 1!',
          ),
          ex(
            "Membuat dan Membaca Array",
            'const buah = ["mangga", "jeruk", "apel"];\n\nconsole.log(buah[0]); // mangga\nconsole.log(buah[1]); // jeruk\nconsole.log(buah[2]); // apel\nconsole.log(buah[3]); // undefined — tidak ada kotak nomor 3!',
          ),
          mc(
            "Index pertama array dimulai dari angka...",
            ["1", "0", "-1", "terserah"],
            1,
            "Index array selalu mulai dari 0: elemen pertama ada di [0].",
          ),
          mc(
            'Jika const buah = ["mangga", "jeruk", "apel"], maka buah[1] adalah...',
            ["mangga", "jeruk", "apel", "undefined"],
            1,
            "Index 0 = mangga, index 1 = jeruk, index 2 = apel.",
          ),
          fill(
            "Lengkapi array warna:",
            "const warna = [",
            '"merah", "hijau"',
            "];\nconsole.log(warna[0]);",
            "Isi array ditulis di dalam kurung siku, dipisah koma.",
          ),
          drag(
            "Susun program yang menampilkan angka pertama dan terakhir:",
            [
              "const angka = [10, 20, 30];",
              "console.log(angka[0]);",
              "console.log(angka[2]);",
            ],
            "Elemen pertama di index 0, elemen ketiga di index 2.",
          ),
          chal(
            'Buat const buah berisi array ["apel", "jeruk", "mangga"] dengan urutan persis itu, lalu tampilkan elemen index 0 dan index 2.',
            "// Buat array lalu tampilkan dua elemennya\n",
            {
              js: [
                { syntaxOk: true },
                {
                  declares: "buah",
                  msg: "Buat const buah berisi array tiga buah.",
                  hint: 'const buah = ["apel", "jeruk", "mangga"];',
                },
              ],
              output: { equals: "apel\nmangga" },
            },
            "console.log(buah[0]); lalu console.log(buah[2]);",
          ),
          rev("Ringkasan: Array", [
            "Array menyimpan banyak nilai dalam satu variabel",
            "Ditulis dengan [ ... ] dipisah koma",
            "Index mulai dari 0",
            "Di luar jangkauan → undefined",
          ]),
        ]),

        lesson(2, "Menambah Isi: .push()", [
          mat(
            "push = Tambah ke Rak Terakhir",
            "➕",
            "Array bisa berubah isi! Metode <strong>.push(nilai)</strong> menambahkan elemen BARU di posisi terakhir. Karena isinya berubah, deklarasikan array dengan <strong>let</strong> atau tetap const? — bagusnya const juga boleh: const mencegah array diganti total, tetapi isinya boleh diubah dengan push.",
          ),
          ex(
            "push Menambah Elemen",
            'const tugas = ["belajar"];\n\nconsole.log(tugas.length); // 1\n\ntugas.push("ngoding");\ntugas.push("istirahat");\n\nconsole.log(tugas.length); // 3\nconsole.log(tugas[2]);     // istirahat',
          ),
          mc(
            "Apa fungsi .push() pada array?",
            [
              "Menghapus elemen terakhir",
              "Menambah elemen di posisi terakhir",
              "Menyisipkan di awal",
              "Mengurutkan isi",
            ],
            1,
            "push menambahkan nilai baru ke UJUNG array.",
          ),
          mc(
            'Setelah buah = ["apel"] lalu buah.push("jeruk"), isi buah adalah...',
            ['["jeruk"]', '["apel", "jeruk"]', '["apel"]', "error"],
            1,
            'push menempelkan "jeruk" di belakang "apel".',
          ),
          fill(
            "Lengkapi metode penambah elemen:",
            'let buah = ["apel"];\nbuah.',
            "push",
            '("semangka");\nconsole.log(buah.length);',
            ".push(nilai) menambah nilai ke akhir array.",
          ),
          chal(
            'Mulai dari let tugas = ["belajar"]. Tambahkan "menggambar" dan "olahraga" dengan .push(), lalu tampilkan isi array dengan 3 console.log (tugas[0], tugas[1], tugas[2]).',
            'let tugas = ["belajar"];\n// push dua tugas, lalu tampilkan\n',
            {
              js: [
                { syntaxOk: true },
                {
                  uses: "push",
                  msg: "Gunakan .push() untuk menambah elemen.",
                  hint: 'tugas.push("menggambar");',
                },
              ],
              output: { equals: "belajar\nmenggambar\nolahraga" },
            },
            "Dua kali .push() lalu tampilkan ketiga elemennya.",
          ),
          rev("Ringkasan: push", [
            ".push(nilai) menambah di akhir array",
            "Bisa dipanggil berkali-kali",
            "Isi array berubah meski dibuat dengan const",
            "push tidak menampilkan apa pun — ia hanya mengubah array",
          ]),
        ]),

        lesson(3, "Properti .length", [
          mat(
            "Berapa Banyak Isinya?",
            "🔢",
            "Properti <strong>.length</strong> menunjukkan jumlah elemen array — ditulis TANPA kurung (bukan method!). Array 3 elemen → length 3, tapi index terakhirnya <strong>length - 1</strong> karena index mulai dari 0. Pasangan penting: buah[buah.length - 1] = elemen terakhir.",
          ),
          ex(
            "length dan Elemen Terakhir",
            'const nama = ["Ani", "Budi", "Citra"];\n\nconsole.log(nama.length);       // 3\nconsole.log(nama[nama.length - 1]); // Citra (terakhir)\nconsole.log(nama[nama.length]);     // undefined — kelebihan satu!',
          ),
          mc(
            "Berapa nilai dari [5, 10, 15].length?",
            ["3", "2", "15", "30"],
            0,
            "Ada 3 elemen, jadi length-nya 3.",
          ),
          mc(
            "Cara mengakses elemen TERAKHIR array arr adalah...",
            ["arr[length]", "arr[arr.length - 1]", "arr.terakhir", "arr[-1]"],
            1,
            "Index terakhir selalu length - 1 karena index mulai 0.",
          ),
          fix(
            "Kode ini error saat dijalankan: length bukan fungsi. Perbaiki!",
            'const buah = ["a", "b", "c"];\nconsole.log(buah.length());',
            "length adalah properti — panggil tanpa tanda kurung ( ).",
            {
              js: [
                { syntaxOk: true },
                {
                  uses: "length",
                  msg: "Gunakan properti .length tanpa tanda kurung.",
                  hint: "console.log(buah.length);",
                },
              ],
              output: { contains: "3" },
            },
            "console.log(buah.length); — tanpa ( ).",
          ),
          chal(
            'Buat const nama berisi ["Ani", "Budi", "Citra"]. Tampilkan jumlah nama (nama.length), lalu tampilkan nama terakhir memakai nama[nama.length - 1].',
            "// Buat array, tampilkan length dan elemen terakhir\n",
            {
              js: [
                { syntaxOk: true },
                {
                  uses: "length",
                  msg: "Gunakan properti .length.",
                  hint: "console.log(nama.length);",
                },
              ],
              output: { equals: "3\nCitra" },
            },
            "console.log(nama.length); lalu console.log(nama[nama.length - 1]);",
          ),
          rev("Ringkasan: length", [
            ".length = jumlah elemen (tanpa tanda kurung)",
            "Index terakhir = length - 1",
            "arr[arr.length] hasilnya undefined",
            "length sering dipakai sebagai kondisi loop",
          ]),
        ]),

        lesson(4, "Perulangan untuk Array", [
          mat(
            "Loop + Array = Duo Sakti",
            "🎪",
            "Kombinasi paling sering di dunia JavaScript: <strong>for dari 0 sampai arr.length - 1</strong> untuk memproses semua isi array satu per satu. Polanya: for (let i = 0; i &lt; arr.length; i++) — ingat, pakai &lt; BUKAN &lt;= agar tidak lewat batas.",
          ),
          ex(
            "Mencetak Semua Isi Array",
            'const kota = ["Jakarta", "Bandung", "Surabaya"];\n\nfor (let i = 0; i < kota.length; i++) {\n  console.log(kota[i]);\n}\n// Output: Jakarta\n//         Bandung\n//         Surabaya',
          ),
          mc(
            "Pola kondisi loop untuk memproses seluruh array adalah...",
            ["i <= arr.length", "i < arr.length", "i < 100", "i > arr.length"],
            1,
            "Index terakhir adalah length - 1, jadi kondisi berhenti saat i < length.",
          ),
          fill(
            "Lengkapi kondisi loop array:",
            "for (let i = 0; i ",
            "< kota.length",
            "; i++) {\n  console.log(kota[i]);\n}",
            "Kondisi i < kota.length menjaga i tetap di dalam jangkauan array.",
          ),
          chal(
            'Buat const kota berisi ["Jakarta", "Bandung", "Surabaya"]. Gunakan for dan kota[i] untuk menampilkan ketiganya satu per satu.',
            'const kota = ["Jakarta", "Bandung", "Surabaya"];\n// Tulis for-nya di sini\n',
            {
              js: [
                { syntaxOk: true },
                {
                  uses: ["for", "length"],
                  msg: "Gunakan for dengan kondisi i < kota.length.",
                  hint: "for (let i = 0; i < kota.length; i++) { console.log(kota[i]); }",
                },
              ],
              output: { equals: "Jakarta\nBandung\nSurabaya" },
            },
            "for (let i = 0; i < kota.length; i++) { console.log(kota[i]); }",
          ),
          rev("Ringkasan: Loop Array", [
            "for (let i = 0; i < arr.length; i++)",
            "Akses tiap elemen dengan arr[i]",
            "Gunakan < agar tidak lewat batas",
            "Pola ini dipakai untuk memproses data apa pun",
          ]),
        ]),

        project(5, "Mini Project — Daftar Belanja", [
          mat(
            "Saatnya Project!",
            "🚀",
            "Gabungkan array, push, length, dan loop: buat daftar belanja yang bernomor rapi seperti struk toko!",
          ),
          mini(
            "Daftar Belanja",
            'Buat let belanja berisi array 4 item sembarang (contoh: "telur", "beras", "susu", "roti"). Tambahkan "gula" dengan .push(). Lalu dengan for, tampilkan tiap item bernomor dengan template literal: `1. telur` dst (pakai i + 1 untuk nomornya). Terakhir tampilkan `Total: [jumlah item]` menggunakan .length.',
            "// Daftar Belanja\n// 1. Buat let belanja = [ ... 4 item ... ]\n// 2. push satu item lagi\n// 3. for dengan nomor pakai template literal\n// 4. tampilkan Total\n",
            [
              chk("runs", "Kode berjalan tanpa error", "js.ok()"),
              chk(
                "baris",
                "Ada minimal 5 baris output (5 item)",
                "js.logCount() >= 5",
              ),
              chk(
                "nomor",
                "Item bernomor 1 tampil",
                'js.output().indexOf("1. ") !== -1',
              ),
              chk(
                "nomor5",
                "Item bernomor 5 tampil (hasil push)",
                'js.output().indexOf("5. ") !== -1',
              ),
              chk(
                "total",
                'Menampilkan total item (mengandung "Total:")',
                'js.output().indexOf("Total:") !== -1',
              ),
            ],
            {
              js: [
                { syntaxOk: true },
                {
                  uses: "push",
                  msg: "Gunakan .push() untuk menambah item ke-5.",
                  hint: 'belanja.push("gula");',
                },
                {
                  uses: "length",
                  msg: "Gunakan .length untuk menampilkan Total.",
                  hint: "console.log(`Total: ${belanja.length}`);",
                },
                {
                  uses: "for",
                  msg: "Gunakan for untuk menampilkan semua item.",
                  hint: "for (let i = 0; i < belanja.length; i++) { ... }",
                },
              ],
            },
          ),
        ]),
      ],
    ),
  );
})();
