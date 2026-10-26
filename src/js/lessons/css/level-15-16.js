// src/js/lessons/css/level-15-16.js — Jalur CSS: Level 15 (CSS 3: Warna & Teks) & Level 16 (CSS 4: Box Model)
(function () {
  'use strict';
  const K = window.CSSLessonKit;
  const { page, mat, ex, rev, mc, fill, drag, fix, chal, free, chk, mini, lesson, project } = K;

  // ============================================================
  // LEVEL 15 — CSS LEVEL 3: WARNA & TEKS
  // ============================================================
  K.register(K.level(15, 3, '🌈', 'Warna & Teks', 'Beri warna, latar, dan atur tampilan teks', [

    lesson(1, 'Warna di CSS', [
      mat('Tiga Cara Menulis Warna', '🌈', 'Property <strong>color</strong> mengatur warna teks. Nilainya bisa berupa <strong>nama warna</strong> (red, blue, tomato), kode <strong>hex</strong> (diawali #, misalnya #ff0000), atau <strong>rgb()</strong> — campuran merah, hijau, dan biru dengan nilai 0 sampai 255.',
        'h1 { color: red; }               /* nama warna */\nh2 { color: #1e90ff; }           /* hex */\nh3 { color: rgb(34, 139, 34); }  /* rgb */'),
      mat('Membaca Kode Hex dan RGB', '🔢', 'Hex terdiri dari tiga pasang angka: #RRGGBB (merah, hijau, biru). Pada rgb(), semakin besar angkanya (maksimal 255), semakin kuat warnanya. Contoh: rgb(0, 0, 255) adalah biru murni.',
        '#000000  →  hitam\n#ffffff  →  putih\n#ff0000  →  merah\n#0000ff  →  biru\n\nrgb(255, 0, 0)    →  merah\nrgb(0, 255, 0)    →  hijau terang\nrgb(255, 255, 0)  →  kuning'),
      mc('Kode warna hex diawali dengan tanda apa?', ['#', '$', '@', '&'], 0, 'Kode hex selalu diawali tanda pagar, contohnya #ff0000.'),
      mc('rgb(255, 0, 0) menghasilkan warna...', ['Biru', 'Hijau', 'Merah', 'Hitam'], 2, 'Nilai pertama adalah merah. 255 berarti merah penuh, sedangkan hijau dan biru 0.'),
      fill('Tulis warna hijau dengan fungsi rgb:', 'h1 { color: ', 'rgb', '(0, 128, 0); }', 'rgb(merah, hijau, biru) — di sini hanya komponen hijau yang menyala.'),
      chal('Beri tiga paragraf warna dengan tiga cara berbeda: .satu pakai NAMA warna, .dua pakai kode HEX, .tiga pakai rgb().',
        page({ body: '<p class="satu">Paragraf satu</p>\n<p class="dua">Paragraf dua</p>\n<p class="tiga">Paragraf tiga</p>' }), {
          requiredTags: ['p'],
          css: [
            { sel: '.satu', prop: 'color', value: /^[a-z]+$/i, msg: '.satu harus memakai nama warna, contoh: red.' },
            { sel: '.dua', prop: 'color', value: /^#[0-9a-f]{3,8}$/i, msg: '.dua harus memakai kode hex yang diawali #, contoh: #1e90ff.' },
            { sel: '.tiga', prop: 'color', value: /^rgba?\(/i, msg: '.tiga harus memakai rgb(), contoh: rgb(34, 139, 34).' }
          ]
        }, 'Ketiganya sama-sama valid — pilih yang paling nyaman untukmu.'),
      rev('Ringkasan: Warna di CSS', ['color mengatur warna teks', 'Warna bisa ditulis dengan nama, hex (#rrggbb), atau rgb()', 'Hex dan rgb memberi kontrol penuh atas warna', 'Pilih warna teks yang kontras dengan latarnya'])
    ]),

    lesson(2, 'Background', [
      mat('Warna Latar: background-color', '🖼️', 'Property <strong>background-color</strong> mengatur warna latar sebuah elemen. Jika dipasang pada <strong>body</strong>, seluruh halaman ikut berwarna. Pastikan warna teks dan latar kontras agar mudah dibaca.',
        'body {\n  background-color: #f0f8ff;\n}\n\n.kotak {\n  background-color: tomato;\n  color: white;\n}'),
      mat('Gradasi Warna', '🌅', 'Selain satu warna, latar bisa berupa <strong>gradasi</strong> memakai linear-gradient(). Tulis arahnya, lalu dua warna atau lebih. Property yang dipakai: <strong>background</strong> atau <strong>background-image</strong>.',
        '.banner {\n  background: linear-gradient(to right, #ff7e5f, #feb47b);\n}\n\n.banner2 {\n  background-image: linear-gradient(135deg, navy, skyblue);\n}'),
      mc('Property apa yang mengatur warna LATAR sebuah elemen?', ['color', 'background-color', 'bg-color', 'fill'], 1, 'color mengatur warna teks, sedangkan background-color mengatur warna latar.'),
      mc('Agar seluruh halaman berlatar biru muda, aturan latar dipasang pada selector...', ['head', 'body', 'title', 'script'], 1, 'body mewakili seluruh isi halaman yang terlihat.'),
      fill('Beri latar kuning pada .kotak:', '.kotak { ', 'background-color', ': yellow; }', 'background-color mengatur warna latar elemen.'),
      chal('Beri body sebuah background-color (misalnya lightblue), lalu beri .banner latar gradasi memakai linear-gradient().',
        page({ body: '<div class="banner">\n  <h1>Selamat Datang</h1>\n</div>' }), {
          requiredTags: ['div'],
          css: [
            { sel: 'body', prop: 'background-color', msg: 'Body belum diberi background-color.' },
            { sel: '.banner', prop: 'background-image', value: { re: 'linear-gradient' }, msg: '.banner belum memakai linear-gradient(). Contoh: background: linear-gradient(to right, red, orange);' }
          ]
        }, 'Gradasi dibuat dengan linear-gradient(arah, warna1, warna2).'),
      rev('Ringkasan: Background', ['background-color mengatur warna latar', 'Pasang pada body untuk mewarnai seluruh halaman', 'linear-gradient() membuat latar bergradasi', 'Jaga kontras antara warna teks dan latar'])
    ]),

    lesson(3, 'Font', [
      mat('Jenis dan Ukuran Huruf', '🔤', '<strong>font-family</strong> mengatur jenis huruf. Selalu tulis lebih dari satu pilihan; yang terakhir adalah jenis umum (sans-serif, serif, atau monospace) sebagai cadangan. <strong>font-size</strong> mengatur ukuran, biasanya dalam px atau rem.',
        'body {\n  font-family: Arial, Helvetica, sans-serif;\n}\n\nh1 {\n  font-size: 36px;\n}\n\np {\n  font-size: 1.1rem;\n}'),
      mat('Tebal dan Miring', '💪', '<strong>font-weight</strong> mengatur ketebalan huruf (normal, bold, atau angka 100 sampai 900). <strong>font-style: italic</strong> membuat huruf miring.',
        'h2 {\n  font-weight: bold;\n}\n\n.catatan {\n  font-style: italic;\n}'),
      mc('Mengapa font-family sebaiknya diakhiri sans-serif, serif, atau monospace?', ['Supaya teks lebih besar', 'Sebagai cadangan jika font pertama tidak tersedia', 'Supaya teks berwarna', 'Karena wajib oleh browser'], 1, 'Jika font pertama tidak ada di perangkat pengguna, browser memakai pilihan berikutnya — dan jenis umum sebagai penyelamat terakhir.'),
      mc('Property untuk membuat huruf TEBAL adalah...', ['font-style', 'font-weight', 'text-bold', 'font-size'], 1, 'font-weight: bold; membuat huruf tebal. font-style dipakai untuk miring.'),
      fix('Ukuran huruf ini tidak berlaku karena nilainya tidak punya satuan. Perbaiki!', '<style>\n  p {\n    font-size: 20;\n  }\n</style>\n<p>Teks paragraf</p>', 'Tambahkan satuan setelah angka, misalnya px.', {
        requiredTags: ['p'],
        css: [{ sel: 'p', prop: 'font-size', value: /^\d+(\.\d+)?(px|rem|em)$/i, msg: 'Ukuran huruf harus punya satuan, contoh: 20px.' }]
      }, 'Kecuali angka 0, hampir semua ukuran di CSS membutuhkan satuan.'),
      chal('Atur h1: font-family Arial dengan cadangan sans-serif, font-size 36px, dan tebal (bold). Atur p: font-size 18px dan miring (italic).',
        page({ body: '<h1>Judul Artikel</h1>\n<p>Isi artikel yang menarik.</p>' }), {
          requiredTags: ['h1', 'p'],
          css: [
            { sel: 'h1', prop: 'font-family', value: { re: 'arial.*sans-serif' }, msg: 'font-family h1 harus Arial dengan cadangan sans-serif, contoh: Arial, sans-serif.' },
            { sel: 'h1', prop: 'font-size', value: '36px', msg: 'font-size h1 belum 36px.' },
            { sel: 'h1', prop: 'font-weight', value: ['bold', '700'], msg: 'h1 belum tebal (font-weight: bold;).' },
            { sel: 'p', prop: 'font-size', value: '18px', msg: 'font-size p belum 18px.' },
            { sel: 'p', prop: 'font-style', value: 'italic', msg: 'p belum miring (font-style: italic;).' }
          ]
        }, 'Jenis, ukuran, ketebalan, dan kemiringan huruf adalah dasar tipografi.'),
      rev('Ringkasan: Font', ['font-family: pilihan huruf, akhiri jenis umum (sans-serif)', 'font-size: ukuran huruf dengan satuan (px, rem)', 'font-weight: bold untuk tebal', 'font-style: italic untuk miring'])
    ]),

    lesson(4, 'Perataan & Hiasan Teks', [
      mat('Perataan dan Jarak Baris', '📐', '<strong>text-align</strong> mengatur perataan teks: left, center, right, atau justify. <strong>line-height</strong> mengatur jarak antar baris — tulis angka tanpa satuan, misalnya 1.6 (artinya 1,6 kali ukuran huruf). Teks panjang jadi jauh lebih nyaman dibaca.',
        'h1 {\n  text-align: center;\n}\n\np {\n  line-height: 1.6;\n  letter-spacing: 0.5px;\n}'),
      mat('Hiasan Teks', '✂️', '<strong>text-decoration</strong> menambah atau menghapus garis pada teks (underline, line-through, none). Link biasanya bergaris bawah; <strong>text-decoration: none</strong> menghilangkannya. <strong>text-transform</strong> mengubah huruf besar-kecil: uppercase, lowercase, capitalize.',
        'a {\n  text-decoration: none;\n}\n\n.judul {\n  text-transform: uppercase;\n}'),
      mc('Cara membuat teks rata TENGAH adalah...', ['text-align: center', 'align: center', 'text-center: true', 'font-align: middle'], 0, 'text-align: center; meratakan teks ke tengah.'),
      mc('Cara menghilangkan garis bawah pada link adalah...', ['text-decoration: none', 'text-style: plain', 'underline: false', 'font-style: normal'], 0, 'text-decoration: none; menghapus garis bawah (atau garis lainnya).'),
      fill('Ubah semua huruf judul menjadi KAPITAL:', 'h1 { text-transform: ', 'uppercase', '; }', 'uppercase membuat semua huruf menjadi kapital tanpa mengubah teks di HTML.'),
      chal('Atur: h1 rata tengah dan semua hurufnya kapital; p punya jarak baris minimal 1.4; link (a) tanpa garis bawah.',
        page({ body: '<h1>Selamat Datang</h1>\n<p>Teks panjang lebih nyaman dibaca jika jarak antar barisnya lega. <a href="#">Baca selengkapnya</a></p>' }), {
          requiredTags: ['h1', 'p', 'a'],
          css: [
            { sel: 'h1', prop: 'text-align', value: 'center', msg: 'h1 belum rata tengah (text-align: center;).' },
            { sel: 'h1', prop: 'text-transform', value: 'uppercase', msg: 'h1 belum berhuruf kapital (text-transform: uppercase;).' },
            { sel: 'p', prop: 'line-height', min: 1.4, msg: 'Jarak baris p belum cukup lega. Coba line-height: 1.6;' },
            { sel: 'a', prop: 'text-decoration', value: 'none', msg: 'Link masih bergaris bawah (text-decoration: none;).' }
          ]
        }, 'Perataan, jarak baris, dan hiasan teks membuat tulisan rapi dan nyaman dibaca.'),
      rev('Ringkasan: Perataan & Hiasan Teks', ['text-align: left, center, right, justify', 'line-height: jarak antar baris (angka tanpa satuan, mis. 1.6)', 'text-decoration: none menghapus garis bawah link', 'text-transform: uppercase, lowercase, capitalize'])
    ]),

    project(5, 'Mini Project — Artikel Cantik', [
      mat('Saatnya Project!', '🚀', 'Kamu sudah bisa mengatur warna, latar, font, dan perataan teks. Gabungkan semuanya untuk mendandani sebuah artikel sederhana agar enak dilihat dan nyaman dibaca.'),
      mini('Artikel Cantik',
        'Percantik artikel ini: beri body font-family dan background-color; judul h1 rata tengah dan berwarna; paragraf punya warna teks sendiri dan line-height minimal 1.4; link tanpa garis bawah; dan beri warna pada sub judul h2.',
        page({
          title: 'Artikel Kucing',
          body: '<header>\n  <h1>Mengenal Kucing Rumahan</h1>\n  <p class="sub">Panduan singkat untuk pemilik baru</p>\n</header>\n<main>\n  <h2>Makanan</h2>\n  <p>Kucing butuh makanan seimbang. <a href="#">Lihat daftar makanan</a></p>\n  <h2>Perawatan</h2>\n  <p>Sikat bulunya secara rutin agar tetap sehat dan bersih.</p>\n</main>'
        }), [
          chk('font', 'Teks halaman memakai font-family pilihanmu', 'css.value("p","font-family") !== null'),
          chk('body-bg', 'Body punya background-color', 'css.value("body","background-color") !== null'),
          chk('h1-center', 'Judul h1 rata tengah', 'css.is("h1","text-align","center")'),
          chk('h1-color', 'Judul h1 diberi warna', 'css.value("h1","color") !== null'),
          chk('p-color', 'Paragraf punya warna teks sendiri', 'css.value("p","color") !== null'),
          chk('p-line', 'Paragraf punya line-height minimal 1.4', 'css.num("p","line-height") !== null && css.num("p","line-height") >= 1.4'),
          chk('a-plain', 'Link tanpa garis bawah (text-decoration: none)', 'css.is("a","text-decoration","none")'),
          chk('h2-color', 'Sub judul h2 diberi warna', 'css.value("h2","color") !== null')
        ])
    ])
  ]));

  // ============================================================
  // LEVEL 16 — CSS LEVEL 4: BOX MODEL
  // ============================================================
  K.register(K.level(16, 4, '📦', 'Box Model', 'Pahami kotak di balik setiap elemen: padding, border, dan margin', [

    lesson(1, 'Konsep Box Model', [
      mat('Semua Elemen adalah Kotak', '📦', 'Di mata browser, setiap elemen HTML adalah sebuah <strong>kotak</strong>. Kotak itu punya empat lapisan, dari dalam ke luar: <strong>content</strong> (isi), <strong>padding</strong> (ruang di dalam border), <strong>border</strong> (garis tepi), dan <strong>margin</strong> (jarak ke elemen lain).',
        '┌─────────── margin ───────────┐\n│  ┌──────── border ────────┐   │\n│  │  ┌───── padding ─────┐ │   │\n│  │  │      content      │ │   │\n│  │  └───────────────────┘ │   │\n│  └────────────────────────┘   │\n└───────────────────────────────┘'),
      ex('Melihat Kotak dengan Border', '.kotak {\n  border: 2px solid black;\n  padding: 20px;\n  margin: 20px;\n}', 'Menambahkan border sementara adalah trik favorit developer untuk "melihat" kotak setiap elemen saat menata layout.'),
      mc('Urutan lapisan box model dari DALAM ke LUAR adalah...', ['Content, Padding, Border, Margin', 'Content, Margin, Border, Padding', 'Margin, Border, Padding, Content', 'Padding, Content, Border, Margin'], 0, 'Dari dalam: content, padding, border, margin.'),
      drag('Urutkan lapisan box model dari yang paling DALAM ke paling LUAR:', ['content', 'padding', 'border', 'margin']),
      mc('Jarak di DALAM border (antara isi dan border) disebut...', ['margin', 'padding', 'gap', 'outline'], 1, 'Padding adalah ruang di dalam border yang mengelilingi isi.'),
      mc('Jarak di LUAR border yang memisahkan elemen dari tetangganya disebut...', ['padding', 'margin', 'content', 'border'], 1, 'Margin adalah jarak di luar border.'),
      free('Ubah nilai padding dan margin di bawah, lalu tekan Run. Perhatikan bagian mana yang ikut membesar!',
        page({ css: '.kotak {\n  border: 3px solid tomato;\n  padding: 10px;\n  margin: 10px;\n  background-color: #fff3e0;\n}', body: '<div class="kotak">Aku sebuah kotak.</div>\n<div class="kotak">Aku kotak kedua.</div>' })),
      rev('Ringkasan: Konsep Box Model', ['Setiap elemen adalah kotak', 'Lapisan dari dalam: content, padding, border, margin', 'Padding = ruang di dalam border', 'Margin = jarak di luar border'])
    ]),

    lesson(2, 'Padding & Margin', [
      mat('Padding: Ruang di Dalam', '🧸', '<strong>padding</strong> memberi ruang antara isi dan border. Satu nilai berlaku untuk keempat sisi. Dua nilai: atas-bawah lalu kiri-kanan. Empat nilai: atas, kanan, bawah, kiri (searah jarum jam).',
        'padding: 20px;                /* semua sisi */\npadding: 10px 30px;           /* atas-bawah 10, kiri-kanan 30 */\npadding: 5px 10px 15px 20px;  /* atas, kanan, bawah, kiri */\npadding-left: 12px;           /* satu sisi saja */'),
      mat('Margin: Jarak di Luar', '↔️', '<strong>margin</strong> menjaga jarak dengan elemen lain; aturan penulisannya sama dengan padding. Trik populer: <strong>margin: 0 auto</strong> membuat elemen yang punya lebar tetap berada di tengah halaman secara horizontal.',
        '.kartu {\n  width: 300px;\n  margin: 0 auto;  /* di tengah halaman */\n}'),
      mc('padding: 10px 30px; berarti...', ['atas-bawah 10px, kiri-kanan 30px', 'atas-bawah 30px, kiri-kanan 10px', 'semua sisi 40px', 'hanya atas dan kiri'], 0, 'Dua nilai: yang pertama untuk atas-bawah, yang kedua untuk kiri-kanan.'),
      mc('Agar elemen ber-width tetap berada di TENGAH halaman, gunakan...', ['margin: 0 auto', 'padding: auto', 'text-align: auto', 'margin: center'], 0, 'margin kiri-kanan "auto" membagi sisa ruang sama rata, sehingga elemen berada di tengah.'),
      fill('Beri jarak 16px di keempat sisi LUAR kotak:', '.kotak { ', 'margin', ': 16px; }', 'margin mengatur jarak di luar elemen.'),
      chal('Buat .kotak punya padding 20px dan margin 16px di semua sisi, plus background-color agar ruangnya terlihat.',
        page({ body: '<div class="kotak">Isi kotak</div>' }), {
          requiredTags: ['div'],
          css: [
            { sel: '.kotak', prop: 'padding-top', value: '20px', msg: 'Padding .kotak belum 20px.' },
            { sel: '.kotak', prop: 'padding-left', value: '20px', msg: 'Padding .kotak belum 20px di semua sisi.' },
            { sel: '.kotak', prop: 'margin-top', value: '16px', msg: 'Margin .kotak belum 16px.' },
            { sel: '.kotak', prop: 'margin-left', value: '16px', msg: 'Margin .kotak belum 16px di semua sisi.' },
            { sel: '.kotak', prop: 'background-color', msg: '.kotak belum diberi background-color.' }
          ]
        }, 'padding: 20px; dan margin: 16px; masing-masing berlaku ke empat sisi.'),
      rev('Ringkasan: Padding & Margin', ['padding = ruang di dalam border, margin = jarak di luar', '1 nilai = semua sisi, 2 nilai = atas-bawah & kiri-kanan, 4 nilai = searah jarum jam', 'margin: 0 auto menengahkan elemen ber-width', 'Bisa per sisi: padding-left, margin-top, dst'])
    ]),

    lesson(3, 'Border & Radius', [
      mat('Border', '🧱', '<strong>border</strong> ditulis dengan tiga nilai: <strong>ketebalan</strong>, <strong>gaya</strong> (solid, dashed, dotted), dan <strong>warna</strong>. Kamu juga bisa mengatur satu sisi saja, misalnya border-bottom.',
        '.kotak {\n  border: 2px solid navy;\n}\n\n.garis {\n  border-bottom: 3px dashed gray;\n}'),
      mat('Sudut Membulat: border-radius', '⭕', '<strong>border-radius</strong> membuat sudut membulat. Nilai kecil (8px) memberi sudut lembut; <strong>50%</strong> pada elemen persegi menghasilkan lingkaran sempurna.',
        '.kartu {\n  border-radius: 12px;\n}\n\n.foto {\n  width: 100px;\n  height: 100px;\n  border-radius: 50%;  /* lingkaran */\n}'),
      mc('Apa arti "dashed" pada  border: 2px dashed red; ?', ['Garis putus-putus', 'Garis titik-titik', 'Garis ganda', 'Tanpa garis'], 0, 'dashed = garis putus-putus. dotted = titik-titik, double = garis ganda.'),
      mc('Agar kotak persegi menjadi LINGKARAN, border-radius-nya diisi...', ['0', '50%', '5px', '1%'], 1, 'border-radius: 50% membulatkan sudut sampai membentuk lingkaran pada elemen persegi.'),
      fill('Beri border garis lurus (solid) setebal 2px:', '.kotak { border: 2px ', 'solid', ' black; }', 'solid adalah gaya garis lurus tanpa putus.'),
      chal('Buat .foto berbentuk lingkaran: width dan height 100px, border 3px solid (warna bebas), dan border-radius 50%.',
        page({ body: '<div class="foto">😀</div>' }), {
          requiredTags: ['div'],
          css: [
            { sel: '.foto', prop: 'width', value: '100px', msg: 'width .foto belum 100px.' },
            { sel: '.foto', prop: 'height', value: '100px', msg: 'height .foto belum 100px.' },
            { sel: '.foto', prop: 'border-style', value: 'solid', msg: '.foto belum punya border solid.' },
            { sel: '.foto', prop: 'border-width', value: '3px', msg: 'Border .foto belum setebal 3px.' },
            { sel: '.foto', prop: 'border-radius', value: '50%', msg: '.foto belum berbentuk lingkaran (border-radius: 50%;).' }
          ]
        }, 'Persegi + border-radius 50% = lingkaran.'),
      rev('Ringkasan: Border & Radius', ['border: tebal gaya warna, contoh 2px solid navy', 'Gaya umum: solid, dashed, dotted', 'border-radius membulatkan sudut', 'border-radius: 50% pada persegi = lingkaran'])
    ]),

    lesson(4, 'Width, Height & box-sizing', [
      mat('Lebar dan Tinggi', '📏', '<strong>width</strong> dan <strong>height</strong> mengatur ukuran area <em>content</em>. <strong>max-width</strong> membatasi lebar maksimum: elemen boleh mengecil di layar kecil, tetapi tidak akan melebihi batas itu.',
        '.kartu {\n  width: 300px;\n  height: 150px;\n}\n\n.artikel {\n  max-width: 600px;\n}'),
      mat('Jebakan Ukuran dan box-sizing', '🪤', 'Secara bawaan, padding dan border DITAMBAHKAN di luar width. Kotak width 300px dengan padding 20px sebenarnya berlebar 340px! Perbaikannya: <strong>box-sizing: border-box</strong>, sehingga width sudah termasuk padding dan border. Banyak developer memasangnya di semua elemen.',
        '* {\n  box-sizing: border-box;\n}\n\n.kotak {\n  width: 300px;\n  padding: 20px;  /* total tetap 300px */\n}'),
      mc('Kotak width 200px, padding 20px, border 5px, box-sizing bawaan. Berapa lebar totalnya?', ['200px', '240px', '250px', '225px'], 2, '200 + (20 × 2) + (5 × 2) = 250px. Padding dan border ditambahkan di kiri dan kanan.'),
      mc('box-sizing: border-box artinya...', ['width sudah termasuk padding dan border', 'width hanya untuk content', 'border dihilangkan', 'margin ikut dihitung'], 0, 'Dengan border-box, ukuran yang kamu tulis adalah ukuran akhir kotak (di luar margin).'),
      fix('Lebar kotak ini tidak berlaku karena nilainya tidak bersatuan. Perbaiki!', '<style>\n  .kotak {\n    width: 300;\n    height: 150px;\n    background-color: #fde68a;\n  }\n</style>\n<div class="kotak">Kotak</div>', 'Tambahkan satuan px setelah angka.', {
        requiredTags: ['div'],
        css: [{ sel: '.kotak', prop: 'width', value: '300px', msg: 'width .kotak harus 300px (jangan lupa satuan).' }]
      }, 'Selain 0, ukuran di CSS selalu butuh satuan.'),
      chal('Atur .kartu: width 300px, padding 20px, box-sizing border-box, dan margin 0 auto agar berada di tengah.',
        page({ body: '<div class="kartu">Kartu rapi</div>' }), {
          requiredTags: ['div'],
          css: [
            { sel: '.kartu', prop: 'width', value: '300px', msg: 'width .kartu belum 300px.' },
            { sel: '.kartu', prop: 'padding-top', value: '20px', msg: 'padding .kartu belum 20px.' },
            { sel: '.kartu', prop: 'box-sizing', value: 'border-box', msg: 'Tambahkan box-sizing: border-box;' },
            { sel: '.kartu', prop: 'margin-left', value: 'auto', msg: 'Margin kiri-kanan harus auto agar kartu di tengah (margin: 0 auto;).' },
            { sel: '.kartu', prop: 'margin-right', value: 'auto', msg: 'Margin kiri-kanan harus auto agar kartu di tengah (margin: 0 auto;).' }
          ]
        }, 'Kombinasi ini dipakai di hampir semua kartu dan wadah halaman.'),
      rev('Ringkasan: Width, Height & box-sizing', ['width/height mengatur ukuran content, max-width membatasi lebar', 'Bawaan: padding dan border menambah ukuran total', 'box-sizing: border-box memasukkannya ke dalam width', 'margin: 0 auto + width = elemen di tengah'])
    ]),

    project(5, 'Mini Project — Kartu Profil', [
      mat('Saatnya Project!', '🚀', 'Terapkan seluruh konsep box model untuk merapikan sebuah kartu profil: ukuran, jarak, border, dan foto bulat.'),
      mini('Kartu Profil',
        'Rapikan kartu profil: .kartu berlebar tetap (px, maksimal 400px) dan berada di tengah halaman, punya padding, border, sudut membulat, dan box-sizing border-box. Lalu buat .foto berbentuk lingkaran (width sama dengan height, border-radius 50%).',
        page({
          title: 'Kartu Profil',
          body: '<div class="kartu">\n  <div class="foto">😀</div>\n  <h2>Nama Pelajar</h2>\n  <p>Calon web developer yang suka belajar hal baru.</p>\n</div>'
        }), [
          chk('width', '.kartu berlebar tetap dalam px (maksimal 400px)', 'css.is(".kartu","width",/^\\d+(\\.\\d+)?px$/) && css.num(".kartu","width") <= 400'),
          chk('center', '.kartu berada di tengah (margin kiri-kanan auto)', 'css.is(".kartu","margin-left","auto") && css.is(".kartu","margin-right","auto")'),
          chk('padding', '.kartu punya padding minimal 10px', 'css.num(".kartu","padding-top") >= 10'),
          chk('border', '.kartu punya border', 'css.value(".kartu","border-style") !== null && css.value(".kartu","border-style") !== "none"'),
          chk('radius', '.kartu bersudut membulat', 'css.num(".kartu","border-radius") > 0'),
          chk('boxsizing', '.kartu memakai box-sizing: border-box', 'css.is(".kartu","box-sizing","border-box")'),
          chk('foto-round', '.foto berbentuk lingkaran (border-radius: 50%)', 'css.is(".foto","border-radius","50%")'),
          chk('foto-square', 'width dan height .foto sama besar', 'css.value(".foto","width") !== null && css.is(".foto","height",css.value(".foto","width"))')
        ])
    ])
  ]));
})();
