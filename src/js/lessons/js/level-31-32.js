// src/js/lessons/js/level-31-32.js — Jalur JavaScript: Level 31 (JS 9: Fungsi) & Level 32 (JS 10: Final Project — DOM & Event)
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
  // LEVEL 31 — JS LEVEL 9: FUNGSI
  // ============================================================
  K.register(
    K.level(
      31,
      9,
      "🛠️",
      "Fungsi",
      "Bungkus kode agar bisa dipakai ulang: function, parameter, dan return",
      [
        lesson(1, "Mengenal Fungsi", [
          mat(
            "Fungsi = Mesin Resep",
            "🛠️",
            "<strong>Fungsi</strong> adalah kumpulan kode yang diberi nama dan <strong>hanya jalan saat dipanggil</strong>. Ia seperti resep: ditulis sekali, bisa dimasak berkali-kali. Ditulis dengan kata <strong>function</strong>, lalu nama, kurung ( ), dan blok { }.",
          ),
          ex(
            "Mendefinisikan dan Memanggil",
            'function sapa() {\n  console.log("Halo, selamat belajar!");\n}\n\n// Panggil fungsinya:\nsapa();\nsapa();\n// Output muncul dua kali!',
          ),
          mat(
            "Definisi ≠ Pemanggilan",
            "📢",
            "Hanya menulis function saja TIDAK menghasilkan apa pun — seperti resep yang dibaca tapi tidak dimasak. Fungsi harus <strong>dipanggil</strong> dengan namanya plus kurung: sapa(). Lupa kurung panggil adalah kesalahan pemula paling umum.",
          ),
          mc(
            "Bagaimana cara MEMANGGIL fungsi bernama sapa?",
            ["sapa;", "sapa()", "function sapa", "call sapa"],
            1,
            "Pemanggilan fungsi = nama + kurung: sapa()",
          ),
          mc(
            "Jika fungsi hanya didefinisikan tetapi tidak pernah dipanggil, maka...",
            [
              "Output muncul sekali",
              "Output tidak muncul sama sekali",
              "Program error",
              "Fungsi dipanggil otomatis",
            ],
            1,
            "Isi fungsi baru berjalan saat fungsinya dipanggil.",
          ),
          fill(
            "Lengkapi nama fungsi:",
            "function ",
            "sapa",
            '() {\n  console.log("Halo!");\n}\nsapa();',
            "Nama fungsi ditulis setelah kata function.",
          ),
          drag(
            "Susun fungsi beserta pemanggilannya:",
            ["function sapa() {", '  console.log("Halo!");', "}", "sapa();"],
            "Definisi fungsi dulu (function ... { ... }), baru dipanggil dengan nama + ( ).",
          ),
          chal(
            'Buat fungsi bernama perkenalan yang menampilkan "Nama saya Dina", lalu PANGGIL fungsinya.',
            "// Definisikan fungsinya di sini\n// Jangan lupa dipanggil!\n",
            {
              js: [
                { syntaxOk: true },
                {
                  func: "perkenalan",
                  msg: "Buat fungsi bernama perkenalan.",
                  hint: "function perkenalan() { ... }",
                },
                {
                  calls: "perkenalan",
                  msg: "Fungsi perkenalan harus dipanggil (perkenalan();).",
                  hint: "Tambahkan perkenalan(); di akhir kode.",
                },
              ],
              output: { contains: "Nama saya Dina" },
            },
            'function perkenalan() { console.log("Nama saya Dina"); } lalu perkenalan();',
          ),
          rev("Ringkasan: Fungsi", [
            "function nama() { ... } mendefinisikan fungsi",
            "Fungsi jalan hanya saat dipanggil: nama()",
            "Satu fungsi bisa dipanggil berkali-kali",
            "Definisi tanpa pemanggilan = tidak ada output",
          ]),
        ]),

        lesson(2, "Parameter & Argumen", [
          mat(
            "Fungsi yang Menerima Input",
            "📥",
            'Fungsi bisa menerima <strong>input</strong> lewat <strong>parameter</strong> — variabel "slot" di dalam kurung definisi. Saat dipanggil, nilai yang dimasukkan disebut <strong>argumen</strong>. Satu fungsi bisa dipanggil dengan argumen berbeda-beda, hasilnya menyesuaikan!',
          ),
          ex(
            "Fungsi dengan Parameter",
            'function sapaNama(nama) {\n  console.log(`Halo, ${nama}!`);\n}\n\nsapaNama("Rina");  // Halo, Rina!\nsapaNama("Budi");  // Halo, Budi!\n\n// "nama" = parameter (slot)\n// "Rina"  = argumen (isi slot)',
          ),
          mc(
            "Di mana parameter ditulis?",
            [
              "Saat fungsi dipanggil",
              "Di dalam kurung saat fungsi DIDEFINISIKAN",
              "Di dalam console.log",
              "Setelah blok fungsi",
            ],
            1,
            "Parameter adalah nama slot di definisi; argumen adalah nilai saat pemanggilan.",
          ),
          mc(
            'sapaNama("Rina") — "Rina" disebut...',
            ["parameter", "argumen", "variabel global", "return"],
            1,
            "Nilai yang dikirim saat memanggil fungsi disebut argumen.",
          ),
          fill(
            "Lengkapi parameter fungsi:",
            "function sapaNama(",
            "nama",
            ') {\n  console.log(`Halo, ${nama}!`);\n}\nsapaNama("Rina");',
            "Parameter ditulis di dalam kurung definisi fungsi.",
          ),
          chal(
            "Buat fungsi luasPersegi dengan SATU parameter sisi yang menampilkan hasil sisi * sisi. Panggil dengan luasPersegi(5) sehingga konsol menampilkan 25.",
            "// Definisikan fungsinya, lalu panggil\n",
            {
              js: [
                { syntaxOk: true },
                {
                  func: "luasPersegi",
                  params: { min: 1 },
                  msg: "Fungsi luasPersegi harus punya minimal 1 parameter.",
                  hint: "function luasPersegi(sisi) { ... }",
                },
                {
                  calls: "luasPersegi",
                  withArgs: [5],
                  msg: "Panggil luasPersegi(5).",
                  hint: "luasPersegi(5);",
                },
              ],
              output: { contains: "25" },
            },
            "function luasPersegi(sisi) { console.log(sisi * sisi); } lalu luasPersegi(5);",
          ),
          rev("Ringkasan: Parameter & Argumen", [
            "Parameter = slot di definisi fungsi",
            "Argumen = nilai nyata saat dipanggil",
            "Satu fungsi, banyak hasil sesuai argumen",
            "Urutan argumen mengikuti urutan parameter",
          ]),
        ]),

        lesson(3, "return — Mengembalikan Nilai", [
          mat(
            'Fungsi yang "Mengembalikan" Hasil',
            "🎁",
            "console.log hanya menampilkan; <strong>return</strong> benar-benar <strong>mengembalikan nilai</strong> ke tempat fungsi dipanggil, sehingga bisa disimpan ke variabel atau dipakai hitungan lain. Setelah return dijalankan, fungsi langsung berhenti.",
          ),
          ex(
            "return vs console.log",
            "function tambah(a, b) {\n  return a + b; // nilai dikembalikan, bukan dicetak\n}\n\nconst hasil = tambah(2, 3);\nconsole.log(hasil);   // 5\nconsole.log(tambah(10, 5)); // 15 — langsung dipakai",
          ),
          mat(
            "Kenapa return Lebih Fleksibel?",
            "💪",
            'Fungsi yang me-return nilainya bisa dipakai di mana saja: disimpan (const hasil = ...), dihitung lagi (tambah(2,3) * 2), atau dicetak. Fungsi yang hanya console.log "bercerita" tapi tidak memberi hasil untuk dipakai. Prinsipnya: <em>hitung dengan return, tampilkan dengan console.log di luar</em>.',
          ),
          mc(
            "Apa fungsi pernyataan return?",
            [
              "Mencetak ke konsol",
              "Mengembalikan nilai ke pemanggil dan menghentikan fungsi",
              "Mengulang fungsi",
              "Menghapus variabel",
            ],
            1,
            "return mengembalikan hasil ke pemanggil; kode setelahnya di fungsi tidak dijalankan.",
          ),
          mc(
            "Jika fungsi TIDAK punya return dan dipanggil di console.log, yang tampil adalah...",
            ["0", '""', "undefined", "null"],
            2,
            "Fungsi tanpa return mengembalikan undefined.",
          ),
          fill(
            "Lengkapi pernyataan pengembalian nilai:",
            "function kali(a, b) {\n  ",
            "return",
            " a * b;\n}\nconsole.log(kali(4, 5));",
            "return mengirim hasil a * b kembali ke pemanggil.",
          ),
          fix(
            "Fungsi ini mencetak, tetapi tidak mengembalikan nilai sehingga pemanggilnya mendapat undefined. Ubah agar me-return hasil, lalu cetak di luar. Konsol harus persis menampilkan 20!",
            "function kali(a, b) {\n  console.log(a * b);\n}\nconsole.log(kali(4, 5));",
            "Ganti console.log di dalam fungsi dengan return, lalu hasilnya dicetak di luar fungsi.",
            {
              js: [
                { syntaxOk: true },
                {
                  func: "kali",
                  params: { min: 2 },
                  msg: "Fungsi kali harus punya 2 parameter.",
                  hint: "function kali(a, b) { return a * b; }",
                },
                {
                  uses: "return",
                  msg: "Gunakan return untuk mengembalikan hasil.",
                  hint: "return a * b;",
                },
              ],
              output: { equals: "20" },
            },
            "function kali(a, b) { return a * b; } lalu console.log(kali(4, 5));",
          ),
          chal(
            "Buat fungsi hitungSisa(a, b) yang me-return sisa bagi a % b. Panggil dengan hitungSisa(10, 3) dan cetak hasilnya. Konsol harus persis menampilkan 1.",
            "// Definisikan fungsi dengan return, lalu cetak\n",
            {
              js: [
                { syntaxOk: true },
                {
                  func: "hitungSisa",
                  params: { min: 2 },
                  msg: "Fungsi hitungSisa harus punya 2 parameter.",
                  hint: "function hitungSisa(a, b) { return a % b; }",
                },
                {
                  uses: "return",
                  msg: "Gunakan return di dalam fungsi.",
                  hint: "return a % b;",
                },
              ],
              output: { equals: "1" },
            },
            "function hitungSisa(a, b) { return a % b; } lalu console.log(hitungSisa(10, 3));",
          ),
          rev("Ringkasan: return", [
            "return mengembalikan nilai ke pemanggil",
            "Hasil bisa disimpan atau dipakai langsung",
            "Fungsi tanpa return → undefined",
            "return juga menghentikan eksekusi fungsi",
          ]),
        ]),

        lesson(4, "Fungsi dengan Banyak Parameter", [
          mat(
            "Beberapa Slot Sekaligus",
            "🎟️",
            "Parameter bisa lebih dari satu — dipisah koma, urutannya penting: argumen pertama masuk ke parameter pertama, dst. return juga bisa mengembalikan hasil penggabungan, misalnya template literal yang memuat beberapa parameter.",
          ),
          ex(
            "Fungsi Perkenalan Dua Data",
            'function perkenalan(nama, umur) {\n  return `Aku ${nama}, umur ${umur} tahun.`;\n}\n\nconsole.log(perkenalan("Dina", 14));\n// Aku Dina, umur 14 tahun.\nconsole.log(perkenalan(14, "Dina"));\n// Aku 14, umur Dina tahun. ← tertukar!',
          ),
          mc(
            "Urutan argumen pada pemanggilan mengikuti...",
            [
              "Urutan huruf alfabet",
              "Urutan parameter di definisi fungsi",
              "Terserah, hasilnya sama",
              "Urutan variabel global",
            ],
            1,
            "Argumen masuk sesuai posisi parameternya — tertukar urutan, hasil pun tertukar.",
          ),
          fill(
            "Lengkapi parameter kedua:",
            "function jumlahkan(a, ",
            "b",
            ") {\n  return a + b;\n}\nconsole.log(jumlahkan(2, 3));",
            "Dua parameter dipisah koma: (a, b).",
          ),
          chal(
            'Buat fungsi kartuProfil(nama, hobi) yang me-return template literal `Nama: ${nama} | Hobi: ${hobi}`. Panggil dengan kartuProfil("Eko", "fotografi") dan cetak hasilnya.',
            "// Definisikan dan panggil\n",
            {
              js: [
                { syntaxOk: true },
                {
                  func: "kartuProfil",
                  params: { min: 2 },
                  msg: "Fungsi kartuProfil harus punya 2 parameter.",
                  hint: "function kartuProfil(nama, hobi) { ... }",
                },
                {
                  uses: "return",
                  msg: "Gunakan return untuk mengembalikan kartu profilnya.",
                  hint: "return `Nama: ${nama} | Hobi: ${hobi}`;",
                },
              ],
              output: { contains: "Nama: Eko | Hobi: fotografi" },
            },
            "function kartuProfil(nama, hobi) { return `Nama: ${nama} | Hobi: ${hobi}`; }",
          ),
          rev("Ringkasan: Banyak Parameter", [
            "Parameter banyak dipisah koma",
            "Urutan argumen = urutan parameter",
            "return bisa mengembalikan template literal",
            "Fungsi kecil yang jelas lebih baik daripada satu fungsi raksasa",
          ]),
        ]),

        project(5, "Mini Project — Kalkulator Mini dengan Fungsi", [
          mat(
            "Saatnya Project!",
            "🚀",
            "Puncak level fungsi: kalkulator dengan empat operasi. Setiap operasi menjadi fungsi kecil yang me-return hasilnya — persis cara programmer memecah program besar jadi potongan kecil.",
          ),
          mini(
            "Kalkulator Mini",
            "Buat 4 fungsi: tambah(a, b), kurang(a, b), kali(a, b), dan bagi(a, b) — masing-masing me-return hasil perhitungannya (JANGAN console.log di dalam fungsi). Lalu tampilkan 4 baris hasil untuk angka 12 dan 4 dengan format `12 + 4 = [hasil]` dst, memakai console.log yang memanggil fungsinya.",
            "// Kalkulator Mini\n// 1. Empat fungsi dengan return\n// 2. Empat console.log memanggil fungsi (12 dan 4)\n",
            [
              chk("runs", "Kode berjalan tanpa error", "js.ok()"),
              chk(
                "tambah",
                "Hasil tambah benar (16)",
                "/\\b16\\b/.test(js.output())",
              ),
              chk(
                "kurang",
                "Hasil kurang benar (8)",
                "/\\b8\\b/.test(js.output())",
              ),
              chk(
                "kali",
                "Hasil kali benar (48)",
                "/\\b48\\b/.test(js.output())",
              ),
              chk(
                "bagi",
                "Hasil bagi benar (3)",
                "/\\b3\\b/.test(js.output())",
              ),
              chk("baris", "Ada minimal 4 baris output", "js.logCount() >= 4"),
            ],
            {
              js: [
                { syntaxOk: true },
                {
                  func: "tambah",
                  params: { min: 2 },
                  msg: "Buat fungsi tambah(a, b).",
                  hint: "function tambah(a, b) { return a + b; }",
                },
                {
                  func: "kurang",
                  params: { min: 2 },
                  msg: "Buat fungsi kurang(a, b).",
                  hint: "function kurang(a, b) { return a - b; }",
                },
                {
                  func: "kali",
                  params: { min: 2 },
                  msg: "Buat fungsi kali(a, b).",
                  hint: "function kali(a, b) { return a * b; }",
                },
                {
                  func: "bagi",
                  params: { min: 2 },
                  msg: "Buat fungsi bagi(a, b).",
                  hint: "function bagi(a, b) { return a / b; }",
                },
                {
                  uses: "return",
                  msg: "Setiap fungsi harus me-return hasilnya.",
                  hint: "return a + b;",
                },
              ],
            },
          ),
        ]),
      ],
    ),
  );

  // ============================================================
  // LEVEL 32 — JS LEVEL 10: FINAL PROJECT — DOM & EVENT
  // ============================================================
  K.register(
    K.level(
      32,
      10,
      "🏆",
      "Final Project: DOM & Event",
      "Ubah halaman web lewat JavaScript: getElementById, querySelector, style, dan addEventListener",
      [
        lesson(1, "Mengenal DOM", [
          mat(
            "DOM: Peta Halaman Web",
            "🗺️",
            "Saat browser membuka halaman HTML, ia menyusun <strong>DOM</strong> (Document Object Model) — peta objek dari seluruh element halaman. Lewat objek <strong>document</strong>, JavaScript bisa MEMILIH element mana pun, lalu mengubah teks, gaya, bahkan membuat element baru. Inilah jembatan antara kodemu dan tampilan.",
          ),
          mat(
            "Dua File Bekerja Bersama",
            "📁",
            "Mulai level ini, editor punya DUA tab: <strong>index.html</strong> (struktur halaman, sudah disiapkan) dan <strong>script.js</strong> (kodemu). Saat ▶ Run, kedua file digabung: JS membaca dan mengubah halaman HTML. Pilih tab di toolbar editor untuk berpindah.",
            '<!-- index.html -->\n<h1 id="judul">Belajar JS</h1>\n\n// script.js\nconst judul = document.getElementById("judul");\njudul.textContent = "Saya Bisa JS!";',
          ),
          mc(
            "Objek yang mewakili seluruh halaman web di JavaScript adalah...",
            ["window.page", "document", "html.body", "dom()"],
            1,
            "document adalah pintu utama mengakses DOM halaman.",
          ),
          mc(
            "Metode untuk mengambil element berdasarkan id-nya adalah...",
            [
              'document.tag("judul")',
              'document.getElementById("judul")',
              'document.find("judul")',
              'document.css("#judul")',
            ],
            1,
            'document.getElementById("judul") mengambil element dengan id="judul".',
          ),
          fill(
            "Lengkapi metode pemilih element:",
            "const judul = document.",
            "getElementById",
            '("judul");',
            "getElementById mencari element berdasarkan atribut id.",
          ),
          chal(
            'Halaman punya <h1 id="judul">Belajar JS</h1>. Di script.js: ambil element judul lalu ubah textContent-nya menjadi "Saya Bisa JS!" (persis).',
            K.doc(
              '<h1 id="judul">Belajar JS</h1>',
              '// 1. Ambil element dengan id "judul"\n// 2. Ubah textContent-nya\n',
            ),
            {
              js: [
                { syntaxOk: true },
                {
                  uses: "getElementById",
                  msg: 'Gunakan document.getElementById("judul").',
                  hint: 'const judul = document.getElementById("judul");',
                },
                {
                  uses: "textContent",
                  msg: "Ubah isi teks dengan .textContent.",
                  hint: 'judul.textContent = "Saya Bisa JS!";',
                },
              ],
              dom: [
                'doc.querySelector("#judul").textContent === "Saya Bisa JS!"',
              ],
            },
            'const judul = document.getElementById("judul"); judul.textContent = "Saya Bisa JS!";',
          ),
          rev("Ringkasan: DOM", [
            "DOM = peta objek halaman web",
            "document = pintu masuk memanipulasi halaman",
            'document.getElementById("id") memilih element',
            ".textContent mengubah isi teks element",
          ]),
        ]),

        lesson(2, "querySelector & Mengubah Gaya", [
          mat(
            "Selector Serbaguna: querySelector",
            "🎯",
            '<strong>document.querySelector()</strong> menerima selector CSS: "#id" untuk id, ".class" untuk class, atau "p" untuk tag. Ia mengembalikan element <em>pertama</em> yang cocok. Setelah dapat element, gayanya bisa diubah lewat <strong>.style</strong>: el.style.color = "red".',
          ),
          ex(
            "Mengubah Warna & Ukuran",
            '<!-- index.html -->\n<p id="teks">Halo DOM!</p>\n\n// script.js\nconst teks = document.querySelector("#teks");\nteks.style.color = "tomato";\nteks.style.fontSize = "28px";',
          ),
          mc(
            'document.querySelector(".box") mengambil...',
            [
              "Semua element class box",
              "Element PERTAMA yang ber-class box",
              "Element tag box",
              "Element id box",
            ],
            1,
            "querySelector mengembalikan element pertama yang cocok dengan selector.",
          ),
          mc(
            "Manakah cara mengubah warna teks element el menjadi biru?",
            [
              'el.color = "blue"',
              'el.style.color = "blue"',
              'el.text = "blue"',
              'el.css("blue")',
            ],
            1,
            "Gaya diubah lewat el.style.namaProperti = nilai;",
          ),
          fill(
            "Lengkapi akses gaya element:",
            'const kotak = document.querySelector("#kotak");\nkotak.',
            "style",
            '.color = "blue";',
            "Semua properti CSS bisa diakses lewat element.style.",
          ),
          chal(
            'Halaman punya <p id="teks">Halo DOM!</p>. Di script.js: ubah warna teksnya menjadi red memakai querySelector dan .style.color.',
            K.doc(
              '<p id="teks">Halo DOM!</p>',
              "// Ambil element #teks, lalu ubah warnanya\n",
            ),
            {
              js: [
                { syntaxOk: true },
                {
                  uses: "querySelector",
                  msg: 'Gunakan document.querySelector("#teks").',
                  hint: 'const teks = document.querySelector("#teks");',
                },
                {
                  uses: "style",
                  msg: "Ubah warna lewat .style.color.",
                  hint: 'teks.style.color = "red";',
                },
              ],
              dom: ['doc.querySelector("#teks").style.color === "red"'],
            },
            'const teks = document.querySelector("#teks"); teks.style.color = "red";',
          ),
          rev("Ringkasan: querySelector & style", [
            'querySelector("#id" / ".class" / "tag") memilih element',
            '.style.properti = "nilai" mengubah gaya',
            "Gaya inline diubah lewat JS menimpa CSS eksternal",
            "Nama properti CSS camelCase: font-size → fontSize",
          ]),
        ]),

        lesson(3, "Event: Merespons Klik", [
          mat(
            "Event = Aksi Pengguna",
            "🖱️",
            '<strong>Event</strong> adalah aksi yang terjadi di halaman: klik, ketik, gerakkan mouse. <strong>addEventListener("click", fungsi)</strong> memasang "pendengar": setiap element diklik, fungsi itu jalan. Pola ini inti dari SEMUA interaksi web — tombol like, keranjang belanja, semua sama.',
          ),
          ex(
            "Tombol yang Menghitung",
            '<!-- index.html -->\n<p id="hitung">0</p>\n<button id="tombol">Tambah</button>\n\n// script.js\nconst hitung = document.getElementById("hitung");\nconst tombol = document.getElementById("tombol");\nlet angka = 0;\n\ntombol.addEventListener("click", function () {\n  angka++;\n  hitung.textContent = angka;\n});',
          ),
          mc(
            '"click" pada addEventListener adalah...',
            [
              "Nama variabel",
              "Jenis event yang didengarkan",
              "Nama fungsi",
              "Atribut HTML",
            ],
            1,
            'Argumen pertama addEventListener adalah nama event, misalnya "click".',
          ),
          mc(
            'Fungsi di dalam addEventListener("click", fungsi) dijalankan saat...',
            [
              "Halaman dimuat",
              "Element diklik",
              "Setiap detik",
              "Fungsi dihapus",
            ],
            1,
            "Fungsi listener baru berjalan ketika event terjadi — bukan saat halaman dibuka.",
          ),
          fill(
            "Lengkapi nama event klik:",
            "tombol.addEventListener(",
            '"click"',
            ", function () {\n  angka++;\n});",
            'Event klik ditulis sebagai string "click".',
          ),
          chal(
            'Halaman punya <p id="hitung">0</p> dan <button id="tombol">Tambah</button>. Di script.js: buat setiap klik tombol menambah angka (mulai 0) dan menampilkannya di #hitung. Validasi akan menekan tombol dua kali — hasil harus 2.',
            K.doc(
              '<p id="hitung">0</p>\n<button id="tombol">Tambah</button>',
              '// 1. Ambil kedua element\n// 2. Buat variabel angka = 0\n// 3. addEventListener("click", ...) untuk menambah dan menampilkan\n',
            ),
            {
              js: [
                { syntaxOk: true },
                {
                  uses: "addEventListener-click",
                  msg: 'Pasang addEventListener("click", ...) pada tombol.',
                  hint: 'tombol.addEventListener("click", function () { ... });',
                },
              ],
              dom: [
                'js.click("#tombol") && js.click("#tombol") && doc.querySelector("#hitung").textContent === "2"',
              ],
            },
            "Pakai variabel let angka = 0; di dalam listener: angka++; hitung.textContent = angka;",
          ),
          rev("Ringkasan: Event", [
            'addEventListener("click", fungsi) memasang pendengar klik',
            "Fungsi listener jalan setiap event terjadi",
            "Variabel di luar listener bisa diubah dari dalamnya",
            "Pola klik-ubah-tampil adalah dasar semua aplikasi web",
          ]),
        ]),

        lesson(4, "Menggabungkan Semuanya", [
          mat(
            "Alur Aplikasi Interaktif",
            "🧭",
            "Aplikasi interaktif selalu mengikuti pola sama: <strong>1)</strong> pilih element (getElementById / querySelector), <strong>2)</strong> pasang listener, <strong>3)</strong> di dalam listener: baca input, ubah teks/gaya. Latihan ini menyatukan semuanya — persis seperti aplikasi kecil sungguhan.",
          ),
          ex(
            "Sapaan Interaktif",
            '<!-- index.html -->\n<input id="namaInput" value="Rani">\n<button id="tombolSapa">Sapa</button>\n<h2 id="sapaan">...</h2>\n\n// script.js\nconst input = document.getElementById("namaInput");\nconst tombol = document.getElementById("tombolSapa");\nconst sapaan = document.getElementById("sapaan");\n\ntombol.addEventListener("click", function () {\n  sapaan.textContent = `Halo, ${input.value}!`;\n});',
          ),
          mc(
            "Membaca isi input teks (input HTML) di JavaScript memakai...",
            ["input.text", "input.value", "input.textContent", "input.isi"],
            1,
            "Element input dibaca lewat properti .value.",
          ),
          mc(
            "Urutan logis membangun interaksi adalah...",
            [
              "Ubah teks → pilih element → pasang listener",
              "Pasang listener → pilih element → ubah teks",
              "Pilih element → pasang listener → ubah isi halaman",
              "Semua boleh acak",
            ],
            2,
            "Element harus dipilih dulu, baru listener dipasang, dan listener-lah yang mengubah halaman.",
          ),
          chal(
            'Halaman punya <input id="namaInput" value="Rani">, <button id="tombolSapa">Sapa</button>, dan <h2 id="sapaan">...</h2>. Di script.js: saat tombol diklik, ubah #sapaan menjadi `Halo, [isi input]!` (memakai template literal dan .value).',
            K.doc(
              '<input id="namaInput" value="Rani">\n<button id="tombolSapa">Sapa</button>\n<h2 id="sapaan">...</h2>',
              "// Pilih element, pasang listener, ubah sapaan\n",
            ),
            {
              js: [
                { syntaxOk: true },
                {
                  uses: "addEventListener-click",
                  msg: 'Pasang addEventListener("click", ...) pada tombol sapa.',
                  hint: 'tombol.addEventListener("click", function () { ... });',
                },
              ],
              dom: [
                'js.setValue("#namaInput", "Budi") && js.click("#tombolSapa") && doc.querySelector("#sapaan").textContent === "Halo, Budi!"',
              ],
            },
            "sapaan.textContent = `Halo, ${input.value}!`; — validator mengganti isi input lalu mengeklik tombolnya.",
          ),
          rev("Ringkasan: Integrasi", [
            "Pilih element → pasang listener → ubah halaman",
            "Input dibaca dengan .value",
            "Teks diubah dengan .textContent",
            "Template literal menyusun kalimat dari input",
          ]),
        ]),

        project(
          5,
          "Final Project — Counter Interaktif",
          [
            mat(
              "🎉 Saatnya Final Project!",
              "🏆",
              "Ini puncak perjalanan JavaScript-mu! Kamu akan membangun <strong>Counter Interaktif</strong> lengkap dalam 4 tahap: Tampil → Naik → Reset → Validasi. HTML sudah disiapkan di tab index.html — tugasmu di script.js!",
            ),
            chal(
              'TAHAP 1 — TAMPIL: Halaman punya <h2 id="nilai">0</h2>. Di script.js: ubah textContent #nilai menjadi 5 dan ubah warna teksnya (style.color) menjadi blue.',
              K.doc(
                '<h2 id="nilai">0</h2>',
                "// TAHAP 1: tampilkan 5 dan beri warna blue\n",
              ),
              {
                js: [
                  { syntaxOk: true },
                  {
                    uses: ["getElementById", "textContent"],
                    msg: "Ambil #nilai dan ubah textContent-nya menjadi 5.",
                    hint: 'const nilai = document.getElementById("nilai"); nilai.textContent = 5;',
                  },
                  {
                    uses: "style",
                    msg: "Ubah warna teks dengan .style.color.",
                    hint: 'nilai.style.color = "blue";',
                  },
                ],
                dom: [
                  'doc.querySelector("#nilai").textContent === "5"',
                  'doc.querySelector("#nilai").style.color === "blue"',
                ],
              },
              "Tahap 1 selesai — JS berhasil mengubah isi dan gaya element!",
            ),
            chal(
              'TAHAP 2 — NAIK: Halaman punya <h2 id="nilai">0</h2> dan <button id="btnTambah">+1</button>. Di script.js: setiap klik tombol menambah angka (mulai 0) dan menampilkannya di #nilai. Validasi mengeklik 3 kali — hasil harus 3.',
              K.doc(
                '<h2 id="nilai">0</h2>\n<button id="btnTambah">+1</button>',
                "// TAHAP 2: klik tombol menambah angka\n",
              ),
              {
                js: [
                  { syntaxOk: true },
                  {
                    uses: "addEventListener-click",
                    msg: 'Pasang addEventListener("click", ...) pada #btnTambah.',
                    hint: 'btnTambah.addEventListener("click", function () { angka++; ... });',
                  },
                ],
                dom: [
                  'js.click("#btnTambah") && js.click("#btnTambah") && js.click("#btnTambah") && doc.querySelector("#nilai").textContent === "3"',
                ],
              },
              "Tahap 2 selesai — tombolmu hidup dan menghitung!",
            ),
            chal(
              'TAHAP 3 — RESET: Tambahkan tombol reset. Halaman punya <h2 id="nilai">0</h2>, <button id="btnTambah">+1</button>, <button id="btnReset">Reset</button>. Di script.js: klik #btnTambah menambah angka; klik #btnReset mengembalikannya ke 0 dan menampilkannya.',
              K.doc(
                '<h2 id="nilai">0</h2>\n<button id="btnTambah">+1</button>\n<button id="btnReset">Reset</button>',
                "// TAHAP 3: tambah dan reset angka\n",
              ),
              {
                js: [
                  { syntaxOk: true },
                  {
                    uses: "addEventListener-click",
                    msg: "Pasang listener klik untuk kedua tombol.",
                    hint: 'btnReset.addEventListener("click", function () { angka = 0; ... });',
                  },
                ],
                dom: [
                  'js.click("#btnTambah") && js.click("#btnTambah") && doc.querySelector("#nilai").textContent === "2"',
                  'js.click("#btnReset") && doc.querySelector("#nilai").textContent === "0"',
                ],
              },
              "Tahap 3 selesai — counter punya tombol naik dan reset!",
            ),
            mini(
              "TAHAP 4 — VALIDASI FINAL",
              "TAHAP 4 — VALIDASI FINAL: Rakit counter lengkap di script.js: variabel angka mulai 0; listener #btnTambah menambah dan menampilkan; listener #btnReset mengembalikan ke 0; dan tampilkan juga angka ke konsol setiap perubahan (console.log). Semua checklist WAJIB terpenuhi.",
              K.doc(
                '<h2 id="nilai">0</h2>\n<button id="btnTambah">+1</button>\n<button id="btnReset">Reset</button>',
                "// TAHAP 4: counter lengkap + console.log tiap perubahan\n",
              ),
              [
                chk(
                  "initial",
                  "Awalnya #nilai menampilkan 0",
                  'doc.querySelector("#nilai").textContent === "0"',
                ),
                chk(
                  "naik",
                  "Dua kali klik +1 → tampil 2",
                  'js.click("#btnTambah") && js.click("#btnTambah") && doc.querySelector("#nilai").textContent === "2"',
                ),
                chk(
                  "reset",
                  "Klik Reset → kembali 0",
                  'js.click("#btnTambah") && js.click("#btnReset") && doc.querySelector("#nilai").textContent === "0"',
                ),
                chk(
                  "konsol",
                  "Perubahan tercatat di konsol (console.log)",
                  "js.logCount() >= 1",
                ),
                chk(
                  "listener",
                  'Memakai addEventListener("click", ...)',
                  "true",
                ),
              ],
              {
                js: [
                  { syntaxOk: true },
                  {
                    uses: "addEventListener-click",
                    msg: 'Pasang addEventListener("click", ...) untuk tombol.',
                    hint: 'btnTambah.addEventListener("click", function () { ... });',
                  },
                  {
                    uses: "console-log",
                    msg: "Tampilkan perubahan angka dengan console.log.",
                    hint: "console.log(angka);",
                  },
                ],
              },
            ),
          ],
          100,
        ),
      ],
      { finalProject: true },
    ),
  );
})();
