// src/js/lessons/css/level-21-22.js — Jalur CSS: Level 21 (CSS 9: Responsive) & Level 22 (CSS 10: Final Project)
(function () {
  'use strict';
  const K = window.CSSLessonKit;
  const { page, mat, ex, rev, mc, fill, drag, fix, chal, free, chk, mini, lesson, project } = K;

  // ============================================================
  // LEVEL 21 — CSS LEVEL 9: RESPONSIVE
  // ============================================================
  K.register(K.level(21, 9, '📱', 'Responsive', 'Buat halaman nyaman dilihat di HP, tablet, dan laptop', [

    lesson(1, 'Mengapa Responsive?', [
      mat('Satu Halaman, Banyak Layar', '📱', 'Pengunjung membuka websitemu dari HP, tablet, laptop, bahkan TV. <strong>Desain responsif</strong> berarti satu halaman yang menyesuaikan tampilannya dengan lebar layar — bukan membuat banyak versi halaman yang terpisah.'),
      mat('Meta Viewport', '🔭', 'Langkah pertama: tambahkan tag <strong>meta viewport</strong> di dalam <head>. Tanpa tag ini, browser HP berpura-pura layarnya lebar (sekitar 980px) lalu memperkecil seluruh halaman sehingga tulisan menjadi sangat kecil.',
        '<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Halaman Saya</title>\n</head>'),
      mc('Apa fungsi meta viewport?', ['Membuat browser HP memakai lebar layar yang sebenarnya', 'Mengubah warna latar', 'Mengganti font', 'Menyembunyikan menu'], 0, 'width=device-width membuat lebar halaman mengikuti lebar layar perangkat.'),
      mc('Di mana meta viewport ditulis?', ['Di dalam <head>', 'Di dalam <body>', 'Di dalam <footer>', 'Di dalam file gambar'], 0, 'Seperti meta lainnya, meta viewport berada di dalam <head>.'),
      fill('Lengkapi meta viewport:', '<meta name="viewport" content="width=device-width, ', 'initial-scale', '=1">', 'initial-scale=1 mengatur skala awal 100% (tanpa zoom).'),
      chal('Tambahkan meta viewport ke <head> agar halaman ramah layar HP.',
        page({ css: 'body {\n  font-family: Arial, sans-serif;\n}', body: '<h1>Halaman Ramah HP</h1>\n<p>Tanpa meta viewport, halaman ini akan tampak kecil di HP.</p>' }), {
          requiredTags: ['meta'],
          attributes: { meta: { name: 'viewport' } },
          attributeContains: { meta: { content: 'width=device-width' } }
        }, 'Satu baris meta ini adalah syarat utama desain responsif.'),
      rev('Ringkasan: Mengapa Responsive?', ['Responsif = satu halaman menyesuaikan lebar layar', 'Wajib: <meta name="viewport" content="width=device-width, initial-scale=1">', 'Letakkan meta viewport di dalam <head>', 'Tanpa viewport, halaman tampil mengecil di HP'])
    ]),

    lesson(2, 'Satuan Relatif & Gambar Fleksibel', [
      mat('Satuan Tetap vs Relatif', '📏', '<strong>px</strong> adalah satuan tetap. Satuan relatif menyesuaikan diri: <strong>%</strong> (persen dari ukuran induk), <strong>rem</strong> (kelipatan ukuran huruf dasar halaman), serta <strong>vw</strong> dan <strong>vh</strong> (persen dari lebar dan tinggi layar). Satuan relatif membuat tampilan lebih lentur di berbagai layar.',
        '.wadah {\n  width: 90%;          /* 90% dari induk */\n  max-width: 800px;    /* tetapi tidak lebih dari 800px */\n  margin: 0 auto;\n}\n\nh1 {\n  font-size: 2rem;     /* 2 × ukuran huruf dasar */\n}\n\n.hero {\n  height: 50vh;        /* setengah tinggi layar */\n}'),
      mat('Gambar yang Tidak Meluap', '🖼️', 'Gambar berukuran besar bisa melewati lebar layar HP. Resep aman: <strong>max-width: 100%</strong> dan <strong>height: auto</strong>. Gambar boleh mengecil mengikuti wadahnya tetapi tidak pernah melebihi ukuran aslinya, dan proporsinya tetap terjaga.',
        'img {\n  max-width: 100%;\n  height: auto;\n}'),
      mc('width: 50% berarti 50% dari...', ['Lebar elemen induknya', 'Lebar layar selalu', 'Tinggi elemen', 'Ukuran huruf'], 0, 'Persen pada width dihitung dari lebar elemen induk.'),
      mc('1rem sama dengan...', ['Ukuran huruf dasar halaman (root)', '1 piksel', '1% lebar layar', 'Tinggi layar'], 0, 'rem = root em: kelipatan ukuran huruf dasar halaman (biasanya 16px).'),
      fill('Agar gambar tidak melebihi wadahnya:', 'img { ', 'max-width', ': 100%; height: auto; }', 'max-width: 100% menjaga gambar tetap di dalam wadah.'),
      fix('Gambar ini meluap di layar kecil karena lebarnya tetap. Perbaiki agar fleksibel!', '<style>\n  img {\n    width: 800px;\n  }\n</style>\n<img src="https://placehold.co/800x400" alt="Gambar contoh">', 'Ganti dengan max-width: 100% dan height: auto.', {
        requiredTags: ['img'],
        css: [
          { sel: 'img', prop: 'max-width', value: '100%', msg: 'Tambahkan max-width: 100%;' },
          { sel: 'img', prop: 'height', value: 'auto', msg: 'Tambahkan height: auto; agar proporsi gambar terjaga.' },
          { sel: 'img', prop: 'width', value: '800px', not: true, msg: 'Hapus width: 800px — lebar tetap membuat gambar meluap.' }
        ]
      }, 'max-width: 100% + height: auto = gambar yang aman di semua layar.'),
      chal('Atur .wadah: lebar 90% dari induk tetapi maksimal 800px, dan berada di tengah (margin 0 auto). Lalu atur h1 berukuran 2rem.',
        page({ body: '<div class="wadah">\n  <h1>Halaman Fleksibel</h1>\n  <p>Aku menyesuaikan diri dengan lebar layar.</p>\n</div>' }), {
          requiredTags: ['div', 'h1'],
          css: [
            { sel: '.wadah', prop: 'width', value: '90%', msg: '.wadah harus berlebar 90%.' },
            { sel: '.wadah', prop: 'max-width', value: '800px', msg: '.wadah harus dibatasi max-width: 800px.' },
            { sel: '.wadah', prop: 'margin-left', value: 'auto', msg: '.wadah harus di tengah (margin: 0 auto;).' },
            { sel: 'h1', prop: 'font-size', value: '2rem', msg: 'h1 harus berukuran 2rem.' }
          ]
        }, 'Kombinasi width persen + max-width adalah pola wadah yang sangat umum.'),
      rev('Ringkasan: Satuan Relatif & Gambar', ['%: persen dari induk; rem: kelipatan huruf dasar; vw/vh: persen layar', 'width: 90% + max-width: 800px + margin: 0 auto = wadah fleksibel', 'img { max-width: 100%; height: auto; }', 'Hindari lebar tetap yang besar untuk elemen yang harus menyesuaikan'])
    ]),

    lesson(3, 'Media Query', [
      mat('Aturan Berdasarkan Lebar Layar', '📐', '<strong>Media query</strong> membuat aturan CSS yang hanya berlaku pada kondisi tertentu, misalnya lebar layar. Bentuknya <strong>@media (max-width: 600px) { ... }</strong>: aturan di dalamnya aktif saat lebar layar 600px atau lebih kecil. Titik di mana tampilan berubah disebut <strong>breakpoint</strong>.',
        'h1 {\n  font-size: 40px;\n}\n\n@media (max-width: 600px) {\n  h1 {\n    font-size: 24px;   /* hanya di layar kecil */\n  }\n}'),
      mat('max-width atau min-width?', '↔️', '<strong>max-width</strong> berarti "sampai selebar ini" (menyesuaikan layar yang lebih kecil). <strong>min-width</strong> berarti "mulai dari selebar ini" — cocok untuk pendekatan <em>mobile-first</em>: tulis gaya HP dulu, lalu tambahkan gaya untuk layar besar. Breakpoint yang umum: 600px, 768px, dan 1024px.',
        '@media (min-width: 768px) {\n  .menu {\n    display: flex;   /* hanya di tablet ke atas */\n  }\n}'),
      mc('@media (max-width: 600px) aktif ketika lebar layar...', ['600px atau lebih kecil', '600px atau lebih besar', 'Tepat 600px', 'Selalu'], 0, 'max-width: 600px berarti berlaku sampai lebar 600px.'),
      mc('Pendekatan "mobile-first" biasanya memakai media query...', ['min-width', 'max-width saja', 'height', 'Tidak memakai media query'], 0, 'Mobile-first menulis gaya HP lebih dulu, lalu menambah gaya layar besar dengan min-width.'),
      drag('Susun media query berikut dengan urutan yang benar:', ['@media (max-width: 600px) {', 'h1 { font-size: 24px; }', '}']),
      fill('Aktif saat layar selebar 600px atau kurang:', '@media (', 'max-width', ': 600px) { h1 { font-size: 24px; } }', 'max-width menentukan batas atas lebar layar.'),
      chal('Buat h1 berukuran 40px. Lalu tulis media query untuk layar selebar 600px atau kurang (max-width: 600px) yang mengecilkan h1 menjadi 24px.',
        page({ body: '<h1>Judul Responsif</h1>' }), {
          requiredTags: ['h1'],
          css: [{ sel: 'h1', prop: 'font-size', value: '40px', msg: 'Di luar media query, h1 harus berukuran 40px.' }],
          cssMedia: [{ pattern: 'max-width', prop: 'font-size', value: '24px', msg: 'Tulis media query: @media (max-width: 600px) { h1 { font-size: 24px; } }' }]
        }, 'Perkecil jendela browser untuk melihat media query bekerja.'),
      rev('Ringkasan: Media Query', ['@media (kondisi) { aturan } = aturan bersyarat', 'max-width: sampai lebar tertentu; min-width: mulai dari lebar tertentu', 'Breakpoint umum: 600px, 768px, 1024px', 'Mobile-first: gaya HP dulu, lalu min-width untuk layar besar'])
    ]),

    lesson(4, 'Layout Responsive dengan Flexbox', [
      mat('Dari Berjajar Menjadi Bertumpuk', '🔁', 'Pola paling populer: di layar lebar, kolom-kolom berjajar menyamping (flex-direction: row); di layar HP, kolom bertumpuk ke bawah (flex-direction: column). Cukup satu media query untuk mengubah arah flex-nya.',
        '.baris {\n  display: flex;\n  gap: 16px;\n}\n\n@media (max-width: 700px) {\n  .baris {\n    flex-direction: column;\n  }\n}'),
      ex('Menu yang Menyesuaikan Diri', '.menu {\n  display: flex;\n  flex-wrap: wrap;     /* turun baris bila sempit */\n  gap: 8px;\n}\n\n@media (max-width: 600px) {\n  .menu a {\n    flex: 1 1 100%;    /* tiap link memenuhi satu baris */\n  }\n}', 'Ada dua pendekatan: mengubah arah (column), atau membiarkan flex-wrap mengatur sendiri.'),
      mc('Agar kolom bertumpuk di layar kecil, di dalam media query kita ubah...', ['flex-direction: column', 'display: none', 'font-size', 'position: fixed'], 0, 'flex-direction: column menyusun item ke bawah.'),
      mc('Keuntungan flex-wrap: wrap pada layout responsif adalah...', ['Item otomatis turun baris saat ruang habis', 'Item membesar tanpa batas', 'Item hilang di layar kecil', 'Warna item berubah'], 0, 'wrap membiarkan item pindah ke baris berikutnya saat tidak muat.'),
      fill('Susun kolom ke bawah di layar kecil:', '@media (max-width: 700px) { .baris { flex-direction: ', 'column', '; } }', 'column menyusun item secara vertikal.'),
      chal('Buat .baris flex container dengan gap 16px. Pada layar selebar 700px atau kurang (max-width: 700px), ubah arahnya menjadi column.',
        page({ body: '<div class="baris">\n  <div class="kolom">Kolom 1</div>\n  <div class="kolom">Kolom 2</div>\n  <div class="kolom">Kolom 3</div>\n</div>' }), {
          requiredTags: ['div'],
          css: [
            { sel: '.baris', prop: 'display', value: 'flex', msg: '.baris belum display: flex.' },
            { sel: '.baris', prop: 'gap', value: '16px', msg: '.baris belum punya gap: 16px.' }
          ],
          cssMedia: [{ pattern: 'max-width', prop: 'flex-direction', value: 'column', msg: 'Tulis @media (max-width: 700px) { .baris { flex-direction: column; } }' }]
        }, 'Satu media query bisa mengubah seluruh susunan layout.'),
      rev('Ringkasan: Layout Responsive', ['Layar lebar: kolom berjajar (row); layar kecil: bertumpuk (column)', 'Ubah flex-direction di dalam @media', 'flex-wrap: wrap membuat item turun baris otomatis', 'Uji dengan mengecilkan jendela browser'])
    ]),

    project(5, 'Mini Project — Halaman Responsif', [
      mat('Saatnya Project!', '🚀', 'Ubah halaman kelas ini menjadi responsif: nyaman dibaca di HP maupun laptop.'),
      mini('Halaman Responsif',
        'Buat halaman ini responsif: (1) tambahkan meta viewport di <head>. (2) .wadah berlebar relatif (%) dengan max-width, berada di tengah. (3) .fitur flex container dengan gap; pada layar 700px atau kurang berubah menjadi column (media query). (4) Gambar memakai max-width: 100% dan height: auto. (5) Di dalam media query, perkecil ukuran huruf h1.',
        page({
          title: 'Kelas Ngoding',
          body: '<header class="atas">\n  <h1>Kelas Ngoding</h1>\n  <p>Belajar web dengan cara yang menyenangkan.</p>\n</header>\n<main class="wadah">\n  <section class="fitur">\n    <div class="kotak"><h2>Interaktif</h2><p>Latihan langsung di editor.</p></div>\n    <div class="kotak"><h2>Bertahap</h2><p>Dari dasar sampai mahir.</p></div>\n    <div class="kotak"><h2>Gratis</h2><p>Belajar kapan saja.</p></div>\n  </section>\n  <img src="https://placehold.co/800x300" alt="Banner kelas">\n</main>'
        }), [
          chk('viewport', 'Ada meta viewport (width=device-width) di <head>', 'doc.querySelector(\'meta[name="viewport"]\') !== null && (doc.querySelector(\'meta[name="viewport"]\').getAttribute("content") || "").indexOf("width=device-width") !== -1'),
          chk('wadah-width', '.wadah berlebar relatif (%) dan punya max-width', 'css.is(".wadah","width",/%$/) && css.value(".wadah","max-width") !== null'),
          chk('wadah-center', '.wadah berada di tengah (margin kiri-kanan auto)', 'css.is(".wadah","margin-left","auto") && css.is(".wadah","margin-right","auto")'),
          chk('fitur-flex', '.fitur adalah flex container dengan gap', 'css.is(".fitur","display","flex") && css.num(".fitur","gap") > 0'),
          chk('media-column', 'Ada media query max-width yang mengubah flex-direction menjadi column', 'css.hasMedia(/max-width/) && css.mediaHas("flex-direction","column")'),
          chk('img', 'Gambar memakai max-width: 100% dan height: auto', 'css.is("img","max-width","100%") && css.is("img","height","auto")'),
          chk('h1-media', 'Ukuran huruf diatur di dalam media query', 'css.mediaHas("font-size")')
        ])
    ])
  ]));

  // ============================================================
  // LEVEL 22 — CSS LEVEL 10: FINAL PROJECT
  // ============================================================
  const PROFILE_BODY = [
    '<header class="navbar">',
    '  <div class="logo">[Nama Kamu]</div>',
    '  <ul class="menu">',
    '    <li><a href="#tentang">Tentang</a></li>',
    '    <li><a href="#keahlian">Keahlian</a></li>',
    '    <li><a href="#kontak">Kontak</a></li>',
    '  </ul>',
    '</header>',
    '<main>',
    '  <section id="tentang" class="hero">',
    '    <div class="foto">😀</div>',
    '    <h1>Halo, aku [Nama Kamu]</h1>',
    '    <p>Calon web developer yang suka membuat halaman web yang rapi dan menyenangkan dilihat.</p>',
    '  </section>',
    '  <section id="keahlian">',
    '    <h2>Keahlian</h2>',
    '    <div class="keahlian">',
    '      <div class="kartu"><h3>HTML</h3><p>Struktur halaman web.</p></div>',
    '      <div class="kartu"><h3>CSS</h3><p>Tampilan dan layout.</p></div>',
    '      <div class="kartu"><h3>Flexbox</h3><p>Tata letak fleksibel.</p></div>',
    '      <div class="kartu"><h3>Responsive</h3><p>Nyaman di semua layar.</p></div>',
    '    </div>',
    '  </section>',
    '  <section id="kontak">',
    '    <h2>Kontak</h2>',
    '    <p>Tertarik berkolaborasi? Hubungi aku!</p>',
    '    <a href="#" class="tombol">Kirim Pesan</a>',
    '  </section>',
    '</main>',
    '<footer>',
    '  <p>© 2026 [Nama Kamu]</p>',
    '</footer>'
  ].join('\n');

  // CSS hasil tiap tahap — dipakai sebagai kode awal tahap berikutnya.
  const STAGE1_CSS = [
    '* {', '  box-sizing: border-box;', '}', '',
    'body {', '  font-family: Arial, Helvetica, sans-serif;', '  color: #1e293b;', '  background-color: #f8fafc;', '  margin: 0;', '}', '',
    'h1 {', '  text-align: center;', '  color: #2563eb;', '}', '',
    'p {', '  line-height: 1.6;', '}'
  ].join('\n');

  const STAGE2_CSS = STAGE1_CSS + '\n\n' + [
    '.navbar {', '  display: flex;', '  justify-content: space-between;', '  align-items: center;', '  padding: 12px 24px;', '  background-color: #1e293b;', '}', '',
    '.logo {', '  color: white;', '  font-weight: bold;', '}', '',
    '.menu {', '  display: flex;', '  gap: 20px;', '  list-style: none;', '  margin: 0;', '  padding: 0;', '}', '',
    '.menu a {', '  color: #e2e8f0;', '  text-decoration: none;', '}', '',
    'main {', '  max-width: 900px;', '  margin: 0 auto;', '  padding: 24px;', '}', '',
    '.keahlian {', '  display: flex;', '  flex-wrap: wrap;', '  gap: 16px;', '}', '',
    '.kartu {', '  flex: 1 1 180px;', '  padding: 16px;', '  background-color: white;', '  border: 1px solid #cbd5e1;', '  border-radius: 12px;', '}'
  ].join('\n');

  const STAGE3_CSS = STAGE2_CSS + '\n\n' + [
    '.menu a:hover {', '  color: white;', '}', '',
    '.kartu {', '  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);', '  transition: transform 0.2s, box-shadow 0.2s;', '}', '',
    '.kartu:hover {', '  transform: translateY(-4px);', '  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);', '}', '',
    '.tombol {', '  display: inline-block;', '  padding: 10px 20px;', '  background-color: #2563eb;', '  color: white;', '  border-radius: 8px;', '  text-decoration: none;', '  cursor: pointer;', '  transition: background-color 0.3s;', '}', '',
    '.tombol:hover {', '  background-color: #1d4ed8;', '}', '',
    '@media (max-width: 600px) {', '  .navbar {', '    flex-direction: column;', '    gap: 8px;', '  }', '}'
  ].join('\n');

  K.register(K.level(22, 10, '🏆', 'Final Project CSS', 'Percantik Website Profil Pribadi dengan semua yang sudah kamu pelajari', [

    lesson(1, 'Review Semua Konsep', [
      mat('🎯 Review Perjalanan CSS-mu', '🎯', 'Selamat! Kamu sudah menyelesaikan 9 level CSS. Mari ulang inti dari setiap level sebelum mendandani Website Profil Pribadimu.'),
      rev('Semua yang Sudah Dipelajari', ['🎨 Dasar: selector { property: value; }, tiga cara menulis CSS', '🎯 Selector: tag, .class, #id, "nav a", "ul > li"', '🌈 Warna & teks: color, background, font-family, font-size, line-height, text-align', '📦 Box model: padding, border, margin, width, box-sizing', '📐 Display & posisi: display, relative/absolute, fixed/sticky, z-index', '🧱 Flexbox: display flex, justify-content, align-items, gap, wrap, flex: 1', '✨ Interaksi: :hover, :focus, transition, box-shadow, transform', '📱 Responsive: meta viewport, %/rem, @media (max-width)']),
      mc('Selector untuk SEMUA link yang berada di dalam <nav> adalah...', ['nav, a', 'nav a', 'nav.a', '#nav a'], 1, 'Dua selector dipisah spasi memilih turunan: a yang berada di dalam nav.'),
      mc('Agar padding dan border TIDAK menambah ukuran total elemen, gunakan...', ['box-sizing: border-box', 'box-sizing: content-box', 'overflow: hidden', 'display: flex'], 0, 'border-box memasukkan padding dan border ke dalam width.'),
      mc('Untuk menaruh logo di kiri dan menu di kanan navbar, pada container dipakai...', ['display: flex; justify-content: space-between;', 'text-align: center;', 'position: absolute;', 'float: left;'], 0, 'Flex container dengan space-between mendorong item ke ujung-ujungnya.'),
      fill('Buat tampilan berbeda di layar kecil:', '@media (', 'max-width', ': 600px) { /* aturan layar kecil */ }', 'max-width membatasi kondisi sampai lebar layar tertentu.'),
      mc('Efek kartu "terangkat" saat di-hover biasanya memakai...', ['transform + box-shadow + transition', 'color saja', 'display: none', 'position: fixed'], 0, 'Transform menggeser kartu, box-shadow menambah kedalaman, transition membuatnya halus.'),
      rev('Siap untuk Final Project!', ['Kamu sudah menguasai selector, box model, flexbox, dan responsive', 'Sekarang saatnya mendandani Website Profil Pribadi', 'Kerjakan bertahap: Dasar → Layout → Interaksi & Responsive → Validasi'])
    ]),

    lesson(2, 'Perencanaan Desain', [
      mat('Merancang Sebelum Mendandani', '📋', 'Website yang tampak profesional hampir selalu punya <strong>sistem desain sederhana</strong>: 3–4 warna, 1–2 jenis huruf, dan jarak yang konsisten. Tentukan dulu, baru tulis CSS-nya — hasilnya jauh lebih rapi.'),
      ex('Contoh Rencana Desain', 'Warna     : latar #f8fafc, teks #1e293b, aksen #2563eb\nHuruf     : Arial, sans-serif (ukuran dasar 16px)\nJarak     : kelipatan 8px (8, 16, 24, 32)\nSudut     : border-radius 12px\nLayout    : navbar flex, kartu keahlian flex-wrap\nInteraksi : kartu terangkat saat hover, tombol berubah warna', 'Rencana ini langsung dipakai di Final Project: lihat bagaimana setiap baris menjadi aturan CSS.'),
      mc('Mengapa sebaiknya membatasi jumlah warna?', ['Agar tampilan konsisten dan tidak ramai', 'Karena CSS hanya mendukung 3 warna', 'Agar halaman lebih cepat dimuat', 'Karena diwajibkan browser'], 0, 'Palet terbatas membuat desain terasa serasi dan profesional.'),
      mc('Jarak berkelipatan 8px (8, 16, 24, 32) membantu...', ['Menjaga ritme dan konsistensi tampilan', 'Mengecilkan ukuran file', 'Mengaktifkan flexbox', 'Mengganti font'], 0, 'Jarak yang berpola membuat tata letak terasa rapi.'),
      mc('Apa yang sebaiknya dilakukan SEBELUM menulis CSS?', ['Menentukan warna, huruf, dan jarak', 'Langsung menulis kode', 'Menghapus HTML', 'Memasang framework'], 0, 'Keputusan desain di awal menghemat banyak waktu revisi.'),
      rev('Rencana Final Project', ['Website Profil Pribadi dengan HTML yang sudah disiapkan', 'Pilih 3–4 warna dan 1 jenis huruf', 'Gunakan flexbox untuk navbar dan kartu keahlian', 'Tambahkan hover, transition, dan media query'])
    ]),

    lesson(3, 'Gaya Dasar & Tipografi', [
      mat('Mulai dari Fondasi', '🏗️', 'Mulai dari gaya yang berlaku untuk seluruh halaman: font, warna teks, latar, dan jarak dasar. Gaya di <strong>body</strong> akan diwariskan ke elemen di dalamnya, jadi cukup ditulis sekali.'),
      mc('Selector  * { box-sizing: border-box; }  berarti...', ['Semua elemen memakai border-box', 'Hanya body yang memakai border-box', 'Hanya div yang memakai border-box', 'Tidak berpengaruh apa pun'], 0, 'Tanda * memilih semua elemen.'),
      free('Di editor ada kerangka Website Profil (HTML sudah siap). Tulis CSS dasarnya: box-sizing border-box untuk semua elemen; font-family, warna teks, dan latar di body; warna dan perataan h1; serta line-height paragraf. Latihan ini bebas — jelajahi!',
        page({ title: 'Profil Saya', css: '/* Gaya dasar di sini */', body: PROFILE_BODY })),
      rev('Langkah Gaya Dasar', ['1. Atur box-sizing: border-box untuk semua elemen', '2. Atur body: font-family, color, background-color', '3. Atur judul: warna dan perataan', '4. Atur paragraf: line-height agar nyaman dibaca'])
    ]),

    lesson(4, 'Layout & Komponen', [
      mat('Navbar, Kartu, dan Interaksi', '🧩', 'Sekarang tata layoutnya: navbar dengan Flexbox, daftar keahlian sebagai kartu yang bisa turun baris (wrap), serta efek hover dan transition pada kartu dan tombol.'),
      mc('Untuk daftar kartu keahlian yang otomatis turun baris saat sempit, gunakan...', ['display: flex; flex-wrap: wrap; gap: 16px;', 'display: inline;', 'position: absolute;', 'float: none;'], 0, 'Flex container dengan wrap dan gap adalah resep galeri kartu.'),
      free('Lanjutkan website profilmu: jadikan header navbar flexbox (logo kiri, menu kanan), daftar .keahlian berkartu dengan flex-wrap dan gap, serta beri efek :hover dengan transition pada kartu dan tombol.',
        page({ title: 'Profil Saya', css: STAGE1_CSS, body: PROFILE_BODY })),
      rev('Langkah Layout & Komponen', ['Navbar: display flex, justify-content space-between, align-items center', 'Kartu: flex-wrap, gap, padding, border-radius, box-shadow', 'Interaksi: :hover dengan transition', 'Cek tampilan layar kecil dengan media query'])
    ]),

    project(5, 'Final Project — Percantik Website Profil', [
      mat('🎉 Saatnya Final Project!', '🏆', 'Ini puncak perjalanan CSS-mu! Kamu akan mendandani <strong>Website Profil Pribadi</strong> secara BERTAHAP dalam 4 tahap: Dasar → Layout → Interaksi & Responsive → Validasi. Setiap tahap sudah memuat hasil tahap sebelumnya, jadi kamu tinggal menambahkan.'),
      chal('TAHAP 1 — DASAR: Tulis gaya dasar. Selector * (box-sizing: border-box); body: font-family dengan cadangan sans-serif, color, dan background-color; h1: rata tengah (text-align: center) dan berwarna; p: line-height minimal 1.5.',
        page({ title: 'Profil Saya', css: '/* Tahap 1: gaya dasar */', body: PROFILE_BODY }), {
          requiredTags: ['h1', 'p'],
          css: [
            { sel: 'body', prop: 'box-sizing', value: 'border-box', msg: 'Tambahkan * { box-sizing: border-box; }' },
            { sel: 'body', prop: 'font-family', value: { re: 'sans-serif' }, msg: 'body harus punya font-family dengan cadangan sans-serif.' },
            { sel: 'body', prop: 'color', msg: 'body belum punya warna teks (color).' },
            { sel: 'body', prop: 'background-color', msg: 'body belum punya background-color.' },
            { sel: 'h1', prop: 'text-align', value: 'center', msg: 'h1 harus rata tengah.' },
            { sel: 'h1', prop: 'color', literal: true, msg: 'Tulis aturan h1 { color: ...; } agar judul punya warna sendiri.' },
            { sel: 'p', prop: 'line-height', min: 1.5, msg: 'p harus punya line-height minimal 1.5.' }
          ]
        }, 'Fondasi selesai! Gaya di body diwariskan ke seluruh halaman.'),
      chal('TAHAP 2 — LAYOUT: .navbar flex container (space-between, align-items center); .menu flex container dengan gap minimal 16px; .keahlian flex container dengan flex-wrap: wrap dan gap minimal 12px; .kartu punya padding dan border-radius; main punya max-width dan berada di tengah (margin 0 auto).',
        page({ title: 'Profil Saya', css: STAGE1_CSS, body: PROFILE_BODY }), {
          requiredTags: ['header', 'main'],
          css: [
            { sel: '.navbar', prop: 'display', value: 'flex', msg: '.navbar belum display: flex.' },
            { sel: '.navbar', prop: 'justify-content', value: 'space-between', msg: '.navbar belum justify-content: space-between.' },
            { sel: '.navbar', prop: 'align-items', value: 'center', msg: '.navbar belum align-items: center.' },
            { sel: '.menu', prop: 'display', value: 'flex', msg: '.menu belum display: flex.' },
            { sel: '.menu', prop: 'gap', min: 16, msg: '.menu butuh gap minimal 16px.' },
            { sel: '.keahlian', prop: 'display', value: 'flex', msg: '.keahlian belum display: flex.' },
            { sel: '.keahlian', prop: 'flex-wrap', value: 'wrap', msg: '.keahlian belum flex-wrap: wrap.' },
            { sel: '.keahlian', prop: 'gap', min: 12, msg: '.keahlian butuh gap minimal 12px.' },
            { sel: '.kartu', prop: 'padding-top', min: 1, msg: '.kartu belum punya padding.' },
            { sel: '.kartu', prop: 'border-radius', min: 1, msg: '.kartu belum bersudut membulat.' },
            { sel: 'main', prop: 'max-width', msg: 'main butuh max-width.' },
            { sel: 'main', prop: 'margin-left', value: 'auto', msg: 'main harus di tengah (margin: 0 auto;).' }
          ]
        }, 'Layout beres! Navbar, menu, dan kartu keahlian sudah tertata dengan Flexbox.'),
      chal('TAHAP 3 — INTERAKSI & RESPONSIVE: .menu a:hover mengubah color; .kartu punya transition berdurasi dan .kartu:hover memakai transform (translateY atau scale); .tombol inline-block dengan padding, background-color, cursor pointer, plus .tombol:hover mengubah background-color; dan tambahkan media query max-width yang mengubah flex-direction menjadi column.',
        page({ title: 'Profil Saya', css: STAGE2_CSS, body: PROFILE_BODY }), {
          requiredTags: ['a'],
          css: [
            { sel: '.menu a:hover', prop: 'color', literal: true, msg: 'Tambahkan .menu a:hover { color: ...; }' },
            { sel: '.kartu', prop: 'transition', value: /[\d.]+m?s/i, msg: '.kartu butuh transition berdurasi, contoh: transition: transform 0.2s;' },
            { sel: '.kartu:hover', prop: 'transform', value: { re: 'translate|scale' }, literal: true, msg: 'Tambahkan .kartu:hover { transform: translateY(-4px); }' },
            { sel: '.tombol', prop: 'display', value: 'inline-block', msg: '.tombol harus display: inline-block.' },
            { sel: '.tombol', prop: 'padding-top', min: 6, msg: '.tombol butuh padding atas-bawah minimal 6px.' },
            { sel: '.tombol', prop: 'background-color', msg: '.tombol butuh background-color.' },
            { sel: '.tombol', prop: 'cursor', value: 'pointer', msg: '.tombol butuh cursor: pointer.' },
            { sel: '.tombol:hover', prop: 'background-color', literal: true, msg: 'Tambahkan .tombol:hover { background-color: ...; }' }
          ],
          cssMedia: [{ pattern: 'max-width', prop: 'flex-direction', value: 'column', msg: 'Tambahkan @media (max-width: 600px) { .navbar { flex-direction: column; } }' }]
        }, 'Interaktif dan responsif! Perkecil jendela browser untuk mencobanya.'),
      mini('TAHAP 4 — VALIDASI FINAL',
        'TAHAP 4 — VALIDASI FINAL: Sempurnakan Website Profil Pribadimu. Semua checklist WAJIB terpenuhi: tambahkan meta viewport, buat foto profil .foto menjadi lingkaran (width sama dengan height, border-radius 50%), rata-tengahkan teks footer, dan ganti semua placeholder [Nama Kamu] dengan namamu.',
        page({ title: 'Profil Saya', css: STAGE3_CSS, body: PROFILE_BODY }), [
          chk('viewport', 'Ada meta viewport (width=device-width)', 'doc.querySelector(\'meta[name="viewport"]\') !== null && (doc.querySelector(\'meta[name="viewport"]\').getAttribute("content") || "").indexOf("width=device-width") !== -1'),
          chk('base-font', 'body punya font-family dengan cadangan sans-serif', 'css.is("body","font-family",{re:"sans-serif"})'),
          chk('base-colors', 'body punya color dan background-color', 'css.value("body","color") !== null && css.value("body","background-color") !== null'),
          chk('boxsizing', 'Semua elemen memakai box-sizing: border-box', 'css.is("body","box-sizing","border-box")'),
          chk('navbar', '.navbar flex: space-between dan align-items center', 'css.is(".navbar","display","flex") && css.is(".navbar","justify-content","space-between") && css.is(".navbar","align-items","center")'),
          chk('menu', '.menu flex dengan gap minimal 16px', 'css.is(".menu","display","flex") && css.num(".menu","gap") >= 16'),
          chk('keahlian', '.keahlian flex dengan flex-wrap: wrap dan gap', 'css.is(".keahlian","display","flex") && css.is(".keahlian","flex-wrap","wrap") && css.num(".keahlian","gap") > 0'),
          chk('kartu-style', '.kartu punya padding, sudut membulat, dan box-shadow', 'css.num(".kartu","padding-top") > 0 && css.num(".kartu","border-radius") > 0 && css.value(".kartu","box-shadow") !== null'),
          chk('kartu-hover', '.kartu punya transition dan efek :hover dengan transform', 'css.is(".kartu","transition",/[\\d.]+m?s/i) && css.has(".kartu:hover","transform")'),
          chk('tombol', '.tombol: cursor pointer dan :hover mengubah background-color', 'css.is(".tombol","cursor","pointer") && css.has(".tombol:hover","background-color")'),
          chk('foto-round', '.foto berbentuk lingkaran (border-radius: 50%)', 'css.is(".foto","border-radius","50%")'),
          chk('foto-square', 'width dan height .foto sama besar', 'css.value(".foto","width") !== null && css.is(".foto","height",css.value(".foto","width"))'),
          chk('footer-center', 'Teks footer rata tengah', 'css.is("footer","text-align","center")'),
          chk('media', 'Ada media query max-width yang mengubah flex-direction ke column', 'css.hasMedia(/max-width/) && css.mediaHas("flex-direction","column")'),
          chk('personalized', 'Semua placeholder [Nama Kamu] sudah diganti dengan namamu', '!/\\[Nama Kamu\\]/i.test(doc.documentElement.textContent)')
        ])
    ], 100)
  ], { finalProject: true }));
})();
