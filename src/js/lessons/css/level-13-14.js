// src/js/lessons/css/level-13-14.js — Jalur CSS: Level 13 (CSS 1: Mengenal CSS) & Level 14 (CSS 2: Selector)
(function () {
  'use strict';
  const K = window.CSSLessonKit;
  const { page, mat, ex, rev, mc, fill, drag, fix, chal, free, chk, mini, lesson, project } = K;

  // ============================================================
  // LEVEL 13 — CSS LEVEL 1: MENGENAL CSS
  // ============================================================
  K.register(K.level(13, 1, '🎨', 'Mengenal CSS', 'Kenalan dengan CSS, bahasa yang membuat website tampil cantik', [

    lesson(1, 'Apa Itu CSS?', [
      mat('Apa itu CSS?', '🎨', 'CSS adalah singkatan dari <strong>Cascading Style Sheets</strong>. Kalau HTML adalah kerangka halaman, CSS adalah <em>dandanannya</em>: warna, ukuran huruf, jarak, sampai tata letak. Halaman HTML yang sama bisa tampil sangat berbeda hanya dengan mengganti CSS-nya.'),
      mat('HTML dan CSS Bekerja Bersama', '🤝', 'Bayangkan membangun rumah. HTML adalah tembok, pintu, dan jendela (<strong>struktur</strong>). CSS adalah cat, tirai, dan dekorasi (<strong>tampilan</strong>). Keduanya terpisah, tetapi saling melengkapi.',
        '<!-- HTML: apa isinya -->\n<h1>Halo Dunia</h1>\n\n/* CSS: seperti apa tampilannya */\nh1 {\n  color: tomato;\n  text-align: center;\n}'),
      mc('CSS dipakai untuk apa?', ['Membuat struktur halaman', 'Mengatur tampilan halaman', 'Menyimpan data pengguna', 'Membuat halaman bisa menghitung'], 1, 'CSS mengatur tampilan: warna, ukuran, jarak, dan tata letak. Struktur halaman dibuat oleh HTML.'),
      mc('"CSS" adalah singkatan dari...', ['Creative Style System', 'Cascading Style Sheets', 'Computer Style Syntax', 'Colorful Style Sheets'], 1, 'CSS = Cascading Style Sheets.'),
      mc('Dalam analogi membangun rumah, apa peran CSS?', ['Tembok dan rangka rumah', 'Cat dan dekorasi rumah', 'Fondasi tanah', 'Alamat rumah'], 1, 'HTML adalah rangka (struktur), CSS adalah cat dan dekorasi (tampilan).'),
      free('Jalankan kode di bawah, lalu ganti tomato dengan warna lain (misalnya blue atau green) dan tekan Run lagi. Lihat perubahannya di preview!',
        page({ title: 'Percobaan Pertama', css: 'h1 {\n  color: tomato;\n}', body: '<h1>Halo, CSS!</h1>\n<p>Ini paragraf biasa.</p>' })),
      rev('Ringkasan: Apa Itu CSS?', ['CSS = Cascading Style Sheets', 'HTML mengatur struktur, CSS mengatur tampilan', 'CSS mengubah warna, ukuran huruf, jarak, dan tata letak', 'Halaman yang sama bisa tampil berbeda hanya dengan mengganti CSS'])
    ]),

    lesson(2, 'Cara Menulis CSS', [
      mat('Tiga Cara Menulis CSS', '📝', 'Ada tiga tempat untuk menaruh CSS: <strong>inline</strong> (di atribut style pada tag), <strong>internal</strong> (di dalam tag <style>), dan <strong>external</strong> (file .css terpisah yang dihubungkan dengan <link>). Kita mulai dari yang paling sederhana.'),
      ex('Cara 1 — Inline', '<p style="color: blue; font-size: 20px;">\n  Teks ini biru dan besar.\n</p>', 'Inline hanya memengaruhi satu tag itu saja. Cepat untuk mencoba, tetapi cepat berantakan kalau dipakai di mana-mana.'),
      ex('Cara 2 — Internal', '<head>\n  <style>\n    p {\n      color: blue;\n    }\n  </style>\n</head>\n<body>\n  <p>Semua paragraf jadi biru.</p>\n  <p>Yang ini juga.</p>\n</body>', 'Tag <style> diletakkan di dalam <head>. Aturannya berlaku untuk seluruh halaman itu. Inilah cara yang akan sering kita pakai di latihan.'),
      ex('Cara 3 — External', '<!-- index.html -->\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n\n/* style.css */\np {\n  color: blue;\n}', 'File style.css bisa dipakai banyak halaman sekaligus. Ini cara paling rapi untuk website sungguhan.'),
      mc('Cara mana yang paling rapi untuk website dengan banyak halaman?', ['Inline', 'Internal', 'External (file .css terpisah)', 'Ketiganya sama saja'], 2, 'File CSS terpisah bisa dipakai bersama oleh semua halaman, sehingga perubahan cukup dilakukan di satu tempat.'),
      fill('Lengkapi atribut untuk CSS inline:', '<p ', 'style', '="color: red;">Halo</p>', 'Atribut style berisi deklarasi CSS langsung di dalam tag.'),
      fill('Hubungkan file CSS eksternal ke halaman:', '<link rel="stylesheet" ', 'href', '="style.css">', 'Atribut href menunjuk ke lokasi file CSS.'),
      chal('Buat judul <h1> "Halo CSS" berwarna merah memakai CSS INLINE (atribut style):', '<h1>Halo CSS</h1>', {
        requiredTags: ['h1'],
        requiredText: 'Halo CSS',
        rawMatch: [{ pattern: /<h1[^>]*\sstyle\s*=/i.source, flags: 'i', message: 'Tulis atribut style di dalam tag <h1>.', hint: 'Contoh: <h1 style="color: red;">Halo CSS</h1>' }],
        css: [{ sel: 'h1', prop: 'color', value: 'red', msg: 'Warna <h1> belum merah. Tulis color: red; di dalam atribut style.' }]
      }, 'Inline CSS: <h1 style="color: red;">.'),
      chal('Pakai CSS INTERNAL: di dalam <style>, buat semua paragraf berwarna biru (blue).',
        page({ body: '<p>Paragraf pertama.</p>\n<p>Paragraf kedua.</p>' }), {
          requiredTags: ['p'],
          minCounts: { p: 2 },
          selectors: ['head > style'],
          css: [{ sel: 'p', prop: 'color', value: 'blue', all: true, msg: 'Semua paragraf harus berwarna biru. Tulis p { color: blue; } di dalam <style>.' }]
        }, 'Tag <style> di dalam <head> membuat aturan berlaku untuk seluruh halaman.'),
      rev('Ringkasan: Cara Menulis CSS', ['Inline: atribut style="..." pada satu tag', 'Internal: tag <style> di dalam <head>', 'External: file .css yang dihubungkan dengan <link rel="stylesheet" href="...">', 'Untuk website sungguhan, file eksternal paling rapi'])
    ]),

    lesson(3, 'Sintaks CSS', [
      mat('Anatomi Aturan CSS', '🧬', 'Satu aturan CSS punya <strong>selector</strong> (siapa yang ingin diubah) dan blok <strong>deklarasi</strong> di dalam kurung kurawal. Tiap deklarasi berisi <strong>property</strong> (apa yang diubah), titik dua, <strong>value</strong> (jadi seperti apa), dan diakhiri titik koma.',
        'selector {\n  property: value;\n  property: value;\n}'),
      ex('Contoh Aturan CSS', 'h1 {\n  color: blue;       /* property: color, value: blue */\n  font-size: 32px;   /* property: font-size, value: 32px */\n}', 'Artinya: "Semua <h1>, tolong berwarna biru dan berukuran huruf 32 piksel."'),
      mc('Pada aturan  p { color: red; }  mana yang disebut property?', ['p', 'color', 'red', '{ }'], 1, 'p adalah selector, color adalah property, dan red adalah value.'),
      mc('Tanda apa yang memisahkan property dan value?', ['Titik koma ( ; )', 'Titik dua ( : )', 'Sama dengan ( = )', 'Koma ( , )'], 1, 'Format deklarasi: property: value; — dipisah titik dua dan diakhiri titik koma.'),
      drag('Susun aturan CSS berikut dengan urutan yang benar:', ['h1 {', 'color: blue;', '}']),
      fill('Lengkapi property untuk mewarnai teks paragraf:', 'p { ', 'color', ': green; }', 'Property color mengatur warna teks.'),
      fix('Aturan CSS ini tidak berfungsi karena ada tanda yang hilang. Perbaiki!', '<style>\n  h1 {\n    color blue;\n  }\n</style>\n<h1>Judul</h1>', 'Property dan value dipisahkan oleh titik dua ( : ).', {
        requiredTags: ['h1'],
        css: [{ sel: 'h1', prop: 'color', value: 'blue', msg: 'Judul belum berwarna biru. Periksa tanda titik dua antara property dan value.' }]
      }, 'Benar! Format deklarasi adalah property: value;'),
      chal('Tulis aturan CSS agar SEMUA paragraf berwarna hijau (green) dan berukuran huruf 20px:',
        page({ body: '<p>Belajar CSS itu seru.</p>\n<p>Aku pasti bisa!</p>' }), {
          requiredTags: ['p'],
          minCounts: { p: 2 },
          css: [
            { sel: 'p', prop: 'color', value: 'green', all: true, msg: 'Warna paragraf belum hijau (color: green;).' },
            { sel: 'p', prop: 'font-size', value: '20px', all: true, msg: 'Ukuran huruf paragraf belum 20px (font-size: 20px;).' }
          ]
        }, 'Dua deklarasi dalam satu aturan, masing-masing diakhiri titik koma.'),
      rev('Ringkasan: Sintaks CSS', ['Aturan CSS = selector + blok { } berisi deklarasi', 'Deklarasi = property: value;', 'Titik dua memisahkan property dan value', 'Setiap deklarasi diakhiri titik koma'])
    ]),

    lesson(4, 'Komentar & Kesalahan Umum', [
      mat('Komentar di CSS', '💬', 'Komentar adalah catatan untuk manusia — browser mengabaikannya. Di CSS, komentar ditulis di antara <strong>/*</strong> dan <strong>*/</strong>. Ini berbeda dari komentar HTML yang memakai <!-- -->.',
        '/* Ini komentar satu baris */\n\n/*\n  Komentar bisa\n  lebih dari satu baris\n*/\nh1 {\n  color: blue; /* warna judul */\n}'),
      mat('4 Kesalahan yang Paling Sering Terjadi', '⚠️', '1) Lupa titik koma ( ; ) di akhir deklarasi. 2) Lupa menutup kurung kurawal ( } ). 3) Salah ketik nama property, misalnya <em>colour</em> padahal harusnya <em>color</em>. 4) Memakai tanda sama dengan ( = ) padahal harus titik dua ( : ). Kalau CSS-mu "tidak jalan", cek empat hal ini dulu.'),
      mc('Bagaimana cara menulis komentar di CSS?', ['// komentar', '<!-- komentar -->', '/* komentar */', '# komentar'], 2, 'Komentar CSS ditulis di antara /* dan */.'),
      fix('Satu deklarasi kehilangan titik koma sehingga deklarasi berikutnya ikut rusak. Perbaiki!', '<style>\n  p {\n    color: red\n    font-size: 24px;\n  }\n</style>\n<p>Halo CSS</p>', 'Setiap deklarasi diakhiri titik koma ( ; ).', {
        requiredTags: ['p'],
        css: [
          { sel: 'p', prop: 'color', value: 'red', msg: 'Warna paragraf belum merah.' },
          { sel: 'p', prop: 'font-size', value: '24px', msg: 'Ukuran huruf paragraf belum 24px.' }
        ]
      }, 'Tanpa titik koma, browser menganggap dua deklarasi sebagai satu.'),
      fix('Ada nama property yang salah ketik. Perbaiki!', '<style>\n  h1 {\n    colour: blue;\n  }\n</style>\n<h1>Judul</h1>', 'Ejaan yang benar adalah "color", tanpa huruf u.', {
        requiredTags: ['h1'],
        css: [{ sel: 'h1', prop: 'color', value: 'blue', msg: 'Judul belum berwarna biru. Periksa ejaan nama property.' }]
      }, 'Browser tidak memberi peringatan untuk property yang salah ketik; ia hanya mengabaikannya.'),
      fix('Kurung kurawal penutup hilang. Perbaiki!', '<style>\n  h2 {\n    color: purple;\n</style>\n<h2>Sub Judul</h2>', 'Setiap aturan harus ditutup dengan tanda }.', {
        requiredTags: ['h2'],
        css: [{ sel: 'h2', prop: 'color', value: 'purple' }],
        rawMatch: [{ pattern: /\{[^{}]*\}/.source, message: 'Aturan CSS belum ditutup dengan tanda }.', hint: 'Tambahkan } setelah deklarasi terakhir.' }]
      }, 'Aturan harus dibuka dengan { dan ditutup dengan }.'),
      chal('Tulis sebuah komentar CSS (/* ... */), lalu buat judul <h1> berwarna merah (red):',
        page({ css: '', body: '<h1>Belajar CSS</h1>' }), {
          requiredTags: ['h1'],
          css: [{ sel: 'h1', prop: 'color', value: 'red', msg: 'Judul belum berwarna merah.' }],
          rawMatch: [{ pattern: /\/\*[\s\S]*?\*\//.source, message: 'Belum ada komentar CSS. Tulis komentar di antara /* dan */.' }]
        }, 'Komentar membantu kamu (dan orang lain) memahami kode nanti.'),
      rev('Ringkasan: Komentar & Kesalahan Umum', ['Komentar CSS: /* ... */', 'Browser mengabaikan komentar', 'Cek ; } : dan ejaan property saat CSS tidak berjalan', 'Property yang salah ketik hanya diabaikan, tanpa pesan error'])
    ]),

    project(5, 'Mini Project — Halaman Berwarna', [
      mat('Saatnya Project!', '🚀', 'Kamu sudah mengenal cara menulis CSS, sintaksnya, dan kesalahan umumnya. Sekarang beri warna pada halaman perkenalan: judul, paragraf, dan latar halaman.'),
      mini('Halaman Berwarna',
        'Pakai tag <style> di dalam <head> untuk: mewarnai judul <h1>, mewarnai teks <p> dengan warna yang BERBEDA dari judul, dan memberi warna latar pada <body>. Pastikan teks tetap terbaca (warna teks berbeda dari warna latar).',
        page({ title: 'Halaman Berwarna', body: '<h1>Halo, Aku Pelajar Web</h1>\n<p>Aku sedang belajar membuat website.</p>\n<p>Hobiku: ngoding dan minum teh.</p>' }), [
          chk('has-style', 'Ada tag <style> di dalam <head>', 'doc.querySelector("head style") !== null'),
          chk('h1-color', 'Judul <h1> sudah diberi warna (color)', 'css.value("h1","color") !== null'),
          chk('p-color', 'Teks <p> sudah diberi warna (color)', 'css.value("p","color") !== null'),
          chk('different', 'Warna judul berbeda dari warna paragraf', 'css.value("h1","color") !== null && css.value("p","color") !== null && !css.colorIs("h1","color",css.value("p","color"))'),
          chk('body-bg', 'Latar halaman (body) diberi background-color', 'css.value("body","background-color") !== null'),
          chk('readable', 'Warna teks paragraf berbeda dari warna latar', 'css.value("p","color") !== null && css.value("body","background-color") !== null && !css.colorIs("p","color",css.value("body","background-color"))')
        ])
    ])
  ]));

  // ============================================================
  // LEVEL 14 — CSS LEVEL 2: SELECTOR
  // ============================================================
  K.register(K.level(14, 2, '🎯', 'Selector', 'Pilih elemen yang tepat: tag, class, id, dan selector gabungan', [

    lesson(1, 'Selector Tag', [
      mat('Apa itu Selector?', '🎯', 'Selector adalah bagian CSS yang menentukan <strong>elemen mana</strong> yang diberi gaya. Yang paling sederhana adalah <strong>selector tag</strong>: tulis nama tag-nya, dan semua elemen dengan tag itu ikut berubah.',
        'p {\n  color: green;\n}\n\n/* semua <p> di halaman jadi hijau */'),
      mat('Satu Aturan untuk Banyak Tag', '👯', 'Kalau beberapa tag ingin diberi gaya yang sama, pisahkan selector dengan <strong>koma</strong>. Ini disebut selector grup dan membuat kodemu lebih ringkas.',
        'h1, h2, h3 {\n  color: navy;\n}'),
      mc('Aturan  li { color: red; }  akan mengubah...', ['Hanya <li> yang pertama', 'Semua <li> di halaman', 'Semua <ul> di halaman', 'Semua teks di halaman'], 1, 'Selector tag memengaruhi SEMUA elemen dengan tag tersebut.'),
      fill('Pilih semua heading level 2:', '', 'h2', ' {\n  color: blue;\n}', 'Selector tag ditulis sama dengan nama tag-nya.'),
      mc('Bagaimana menulis satu aturan yang sama untuk h1 dan h2?', ['h1 h2 { }', 'h1, h2 { }', 'h1 + h2 { }', 'h1 & h2 { }'], 1, 'Koma memisahkan beberapa selector dalam satu aturan.'),
      chal('Buat semua <h1> dan <h2> berwarna biru (blue) dengan SATU aturan (selector grup). Paragraf tidak boleh ikut biru.',
        page({ body: '<h1>Judul Besar</h1>\n<h2>Sub Judul</h2>\n<p>Paragraf ini tidak ikut biru.</p>' }), {
          requiredTags: ['h1', 'h2'],
          css: [
            { sel: 'h1', prop: 'color', value: 'blue', msg: 'Judul <h1> belum berwarna biru.' },
            { sel: 'h2', prop: 'color', value: 'blue', msg: 'Sub judul <h2> belum berwarna biru.' },
            { sel: 'p', prop: 'color', value: 'blue', not: true, msg: 'Paragraf tidak boleh ikut berwarna biru.' }
          ],
          rawMatch: [{ pattern: /h[12]\s*,\s*h[12]/.source, flags: 'i', message: 'Gunakan selector grup: pisahkan h1 dan h2 dengan koma.', hint: 'Contoh: h1, h2 { color: blue; }' }]
        }, 'Selector grup menghemat penulisan kode.'),
      rev('Ringkasan: Selector Tag', ['Selector tag = nama tag, memengaruhi semua elemen tag itu', 'Selector grup memakai koma: h1, h2 { }', 'Aturan yang sama tidak perlu ditulis berulang'])
    ]),

    lesson(2, 'Class Selector', [
      mat('Class: Nama Panggilan untuk Elemen', '🏷️', 'Selector tag memengaruhi SEMUA elemen dengan tag itu. Bagaimana kalau hanya ingin satu-dua paragraf yang berbeda? Beri mereka <strong>class</strong> di HTML, lalu panggil di CSS dengan <strong>titik ( . )</strong> di depan nama class.',
        '<p class="penting">Ini penting!</p>\n<p>Ini biasa saja.</p>\n\n/* CSS */\n.penting {\n  color: red;\n}'),
      mat('Satu Class, Banyak Elemen', '♻️', 'Satu class boleh dipakai berkali-kali, bahkan pada tag yang berbeda. Satu elemen juga boleh punya beberapa class sekaligus — pisahkan dengan spasi.',
        '<h2 class="sorot">Judul</h2>\n<p class="sorot">Paragraf</p>\n<p class="sorot besar">Dua class sekaligus</p>'),
      mc('Tanda apa yang dipakai untuk class selector di CSS?', ['# (pagar)', '. (titik)', '* (bintang)', '@ (at)'], 1, 'Class dipanggil dengan titik: .namaclass'),
      fill('Beri class pada paragraf:', '<p ', 'class', '="penting">Awas!</p>', 'Atribut class di HTML memberi nama kelompok pada elemen.'),
      fix('Selector ini tidak mengenai elemen mana pun karena ada yang kurang. Perbaiki!', '<style>\n  penting {\n    color: red;\n  }\n</style>\n<p class="penting">Teks penting</p>', 'Class selector diawali tanda titik ( . ).', {
        requiredTags: ['p'],
        css: [{ sel: 'p.penting', prop: 'color', value: 'red', msg: 'Paragraf belum merah. Selector class harus diawali titik.' }]
      }, 'Tanpa titik, "penting" dianggap nama tag — dan tidak ada tag <penting>.'),
      chal('Beri class "sorot" pada DUA dari tiga paragraf, lalu buat .sorot berlatar kuning (background-color: yellow). Satu paragraf harus tetap tanpa class.',
        page({ body: '<p>Paragraf pertama.</p>\n<p>Paragraf kedua.</p>\n<p>Paragraf ketiga.</p>' }), {
          minCounts: { 'p.sorot': 2 },
          css: [
            { sel: 'p.sorot', prop: 'background-color', value: 'yellow', all: true, msg: 'Paragraf ber-class sorot belum berlatar kuning (background-color: yellow;).' },
            { sel: 'p:not(.sorot)', prop: 'background-color', value: 'yellow', not: true, msg: 'Paragraf tanpa class sorot tidak boleh ikut kuning.', missingMsg: 'Sisakan satu paragraf tanpa class sorot sebagai pembanding.' }
          ]
        }, 'Class memungkinkan sebagian elemen punya gaya berbeda dari elemen lain bertag sama.'),
      rev('Ringkasan: Class Selector', ['HTML: class="nama"', 'CSS: .nama { }', 'Satu class boleh dipakai banyak elemen', 'Satu elemen boleh punya banyak class (dipisah spasi)'])
    ]),

    lesson(3, 'ID Selector', [
      mat('ID: Nama Unik', '🆔', '<strong>id</strong> mirip class, tetapi harus <strong>unik</strong>: hanya satu elemen per halaman yang boleh memakai id tertentu. Di CSS, id dipanggil dengan <strong>pagar ( # )</strong> di depan namanya.',
        '<h1 id="judul-utama">Selamat Datang</h1>\n\n/* CSS */\n#judul-utama {\n  color: crimson;\n}'),
      mat('Class atau ID?', '⚖️', 'Aturan praktis: pakai <strong>class</strong> untuk gaya yang dipakai berulang, dan <strong>id</strong> untuk satu elemen yang benar-benar khusus. Dalam praktik, kebanyakan gaya memakai class.',
        'class  →  .nama  →  boleh dipakai banyak elemen\nid     →  #nama  →  hanya untuk SATU elemen'),
      mc('Pernyataan mana yang BENAR tentang id?', ['Satu id boleh dipakai banyak elemen di satu halaman', 'Satu id sebaiknya hanya dipakai oleh satu elemen', 'Di CSS, id ditulis dengan titik ( . )', 'id tidak bisa diberi gaya'], 1, 'id harus unik dalam satu halaman.'),
      mc('Selector CSS untuk elemen dengan id="header" adalah...', ['.header', '#header', 'header', '*header'], 1, 'id dipanggil dengan tanda pagar: #header'),
      fill('Beri id pada judul:', '<h1 ', 'id', '="utama">Halo</h1>', 'Atribut id memberi nama unik pada satu elemen.'),
      fix('Elemen memakai id, tetapi selector di CSS memakai tanda class. Perbaiki selector-nya!', '<style>\n  .utama {\n    color: red;\n  }\n</style>\n<h1 id="utama">Judul Utama</h1>', 'Untuk id gunakan tanda pagar ( # ), bukan titik.', {
        requiredTags: ['h1'],
        css: [{ sel: '#utama', prop: 'color', value: 'red', msg: 'Judul belum merah. Selector untuk id memakai #.' }]
      }, '.utama mencari class, #utama mencari id.'),
      chal('Beri id "spesial" pada SATU paragraf, lalu buat #spesial berwarna ungu (purple) dan huruf tebal (font-weight: bold).',
        page({ body: '<p>Paragraf biasa.</p>\n<p>Paragraf yang akan dibuat spesial.</p>\n<p>Paragraf biasa juga.</p>' }), {
          selectors: ['p#spesial'],
          css: [
            { sel: '#spesial', prop: 'color', value: 'purple', msg: 'Elemen #spesial belum berwarna ungu.' },
            { sel: '#spesial', prop: 'font-weight', value: ['bold', '700'], msg: 'Elemen #spesial belum tebal (font-weight: bold;).' }
          ]
        }, 'id dipakai untuk elemen yang benar-benar khusus.'),
      rev('Ringkasan: ID Selector', ['HTML: id="nama"', 'CSS: #nama { }', 'id harus unik — satu elemen saja per halaman', 'Untuk gaya berulang, class lebih cocok'])
    ]),

    lesson(4, 'Selector Gabungan', [
      mat('Selector Turunan (Spasi)', '🪆', 'Tulis dua selector dipisah <strong>spasi</strong> untuk memilih elemen yang berada <em>di dalam</em> elemen lain, di tingkat mana pun.',
        'nav a {\n  color: orange;\n}\n\n/* hanya <a> yang ada di dalam <nav> */'),
      mat('Anak Langsung, Universal, dan Tag + Class', '🧩', 'Tanda <strong>></strong> hanya memilih anak <em>langsung</em>, bukan cucu dan seterusnya. Tanda <strong>*</strong> (universal) memilih semua elemen. Tag dan class bisa digabung tanpa spasi: <strong>p.penting</strong> artinya "paragraf yang punya class penting".',
        'ul > li {\n  color: blue;   /* hanya li anak langsung dari ul */\n}\n\n* {\n  margin: 0;     /* semua elemen */\n}\n\np.penting {\n  color: red;    /* hanya <p class="penting"> */\n}'),
      mc('Selector  div p  memilih...', ['Semua <div> dan semua <p>', 'Semua <p> yang berada di dalam <div>', 'Hanya <p> anak langsung <div>', 'Semua <div> di dalam <p>'], 1, 'Spasi berarti "di dalam": p yang berada di dalam div, di tingkat mana pun.'),
      mc('Apa beda  ul > li  dengan  ul li ?', ['> hanya memilih anak langsung', '> memilih semua turunan', 'Tidak ada bedanya', '> memilih elemen sebelumnya'], 0, 'ul > li hanya mengenai li yang langsung berada di bawah ul; ul li juga mengenai li di dalam list bersarang.'),
      fill('Pilih hanya link (<a>) yang ada di dalam <nav>:', '', 'nav a', ' {\n  color: orange;\n}', 'Dua selector dipisah spasi memilih turunan.'),
      chal('Link di dalam <nav> harus berwarna oranye (orange), tetapi link di dalam <main> TIDAK boleh ikut berubah.',
        page({ body: '<nav>\n  <a href="#">Beranda</a>\n  <a href="#">Tentang</a>\n</nav>\n<main>\n  <p>Baca <a href="#">artikel ini</a>.</p>\n</main>' }), {
          requiredTags: ['nav', 'a'],
          css: [
            { sel: 'nav a', prop: 'color', value: 'orange', all: true, msg: 'Link di dalam <nav> belum berwarna oranye.' },
            { sel: 'main a', prop: 'color', value: 'orange', not: true, msg: 'Link di dalam <main> tidak boleh ikut oranye. Pakai selector "nav a", bukan "a".' }
          ]
        }, 'Selector turunan membatasi aturan hanya pada bagian halaman tertentu.'),
      rev('Ringkasan: Selector Gabungan', ['Spasi (nav a) = turunan di tingkat mana pun', '> (ul > li) = anak langsung saja', '* = semua elemen', 'p.penting = tag + class tanpa spasi'])
    ]),

    project(5, 'Mini Project — Kartu Berwarna', [
      mat('Saatnya Project!', '🚀', 'Gabungkan semua jenis selector: class, id, dan selector turunan. Kamu akan menata tiga kartu kursus dengan warna berbeda-beda.'),
      mini('Kartu Berwarna',
        'Beri gaya pada kartu: (1) class .kartu mendapat background-color dan color. (2) h2 di dalam .kartu (selector ".kartu h2") diberi warna sendiri. (3) link di dalam .kartu (selector ".kartu a") diberi warna. (4) kartu #promo punya background-color yang BERBEDA dari kartu lain.',
        page({
          title: 'Kartu Kursus',
          body: '<div class="kartu">\n  <h2>Belajar HTML</h2>\n  <p>Dasar-dasar struktur halaman web.</p>\n  <a href="#">Mulai belajar</a>\n</div>\n<div class="kartu">\n  <h2>Belajar CSS</h2>\n  <p>Membuat halaman tampil cantik.</p>\n  <a href="#">Mulai belajar</a>\n</div>\n<div class="kartu" id="promo">\n  <h2>Paket Lengkap</h2>\n  <p>HTML dan CSS sekaligus!</p>\n  <a href="#">Ambil promo</a>\n</div>'
        }), [
          chk('kartu-bg', 'Class .kartu punya background-color', 'css.value(".kartu:not(#promo)","background-color") !== null'),
          chk('kartu-color', 'Class .kartu punya color (warna teks)', 'css.value(".kartu","color") !== null'),
          chk('h2-rule', 'Ada aturan ".kartu h2" yang mengatur color', 'css.hasSelector(/\\.kartu\\s+h2/) && css.value(".kartu h2","color") !== null'),
          chk('a-rule', 'Ada aturan ".kartu a" yang mengatur color', 'css.hasSelector(/\\.kartu\\s+a/) && css.value(".kartu a","color") !== null'),
          chk('promo-rule', 'Ada aturan dengan selector #promo', 'css.hasSelector(/#promo/)'),
          chk('promo-diff', 'Background kartu #promo berbeda dari kartu lain', 'css.value("#promo","background-color") !== null && css.value(".kartu:not(#promo)","background-color") !== null && !css.colorIs("#promo","background-color",css.value(".kartu:not(#promo)","background-color"))')
        ])
    ])
  ]));
})();
