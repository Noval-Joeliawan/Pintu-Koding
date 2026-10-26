// src/js/lessons/css/level-17-18.js — Jalur CSS: Level 17 (CSS 5: Display & Posisi) & Level 18 (CSS 6: Flexbox Dasar)
(function () {
  'use strict';
  const K = window.CSSLessonKit;
  const { page, mat, ex, rev, mc, fill, drag, fix, chal, free, chk, mini, lesson, project } = K;

  const LOREM = 'Teks panjang agar halaman bisa di-scroll. Teks panjang agar halaman bisa di-scroll. Teks panjang agar halaman bisa di-scroll.';
  const manyP = (n) => Array.from({ length: n }, (_, i) => `<p>Paragraf ${i + 1}. ${LOREM}</p>`).join('\n');

  // ============================================================
  // LEVEL 17 — CSS LEVEL 5: DISPLAY & POSISI
  // ============================================================
  K.register(K.level(17, 5, '📐', 'Display & Posisi', 'Atur perilaku elemen dan tempatkan di posisi yang kamu mau', [

    lesson(1, 'Display', [
      mat('Block, Inline, dan Inline-block', '🧱', '<strong>display</strong> menentukan cara elemen "berperilaku". Elemen <strong>block</strong> (div, p, h1) mulai di baris baru dan memenuhi lebar yang tersedia. Elemen <strong>inline</strong> (span, a, strong) mengalir di dalam teks dan tidak mau diatur width/height-nya. <strong>inline-block</strong> mengalir seperti inline, tetapi boleh diatur width, height, padding, dan margin.',
        'div  { display: block; }         /* satu baris penuh */\nspan { display: inline; }        /* mengalir di dalam teks */\na    { display: inline-block;    /* mengalir, tetapi bisa diberi ukuran */\n       padding: 8px 16px; }'),
      mat('Menyembunyikan Elemen', '🙈', '<strong>display: none</strong> menyembunyikan elemen sepenuhnya: ia hilang dari tampilan dan tidak memakan ruang. Cocok untuk menu yang bisa dibuka-tutup atau pesan yang baru muncul pada kondisi tertentu.',
        '.rahasia {\n  display: none;\n}'),
      mc('Elemen mana yang secara bawaan berperilaku BLOCK?', ['<span>', '<a>', '<div>', '<strong>'], 2, '<div>, <p>, dan <h1> adalah elemen block. <span>, <a>, dan <strong> adalah inline.'),
      mc('Apa yang dilakukan  display: none; ?', ['Membuat elemen transparan tetapi tetap memakan ruang', 'Menyembunyikan elemen dan menghilangkan ruangnya', 'Memperkecil elemen', 'Memindahkan elemen ke bawah'], 1, 'display: none membuat elemen seolah-olah tidak ada di halaman.'),
      fill('Sembunyikan elemen sepenuhnya dengan display:', '.rahasia { display: ', 'none', '; }', 'display: none menyembunyikan elemen.'),
      chal('Buat link di dalam .menu berperilaku inline-block dengan padding 8px 16px, lalu sembunyikan .rahasia sepenuhnya.',
        page({ body: '<div class="menu">\n  <a href="#">Beranda</a>\n  <a href="#">Tentang</a>\n</div>\n<p class="rahasia">Pesan rahasia</p>' }), {
          requiredTags: ['a'],
          css: [
            { sel: '.menu a', prop: 'display', value: 'inline-block', msg: 'Link di .menu belum display: inline-block.' },
            { sel: '.menu a', prop: 'padding-top', value: '8px', msg: 'Padding atas-bawah link belum 8px (padding: 8px 16px;).' },
            { sel: '.menu a', prop: 'padding-left', value: '16px', msg: 'Padding kiri-kanan link belum 16px (padding: 8px 16px;).' },
            { sel: '.rahasia', prop: 'display', value: 'none', msg: '.rahasia belum disembunyikan (display: none;).' }
          ]
        }, 'inline-block membuat padding vertikal benar-benar menambah tinggi link.'),
      rev('Ringkasan: Display', ['block: baris baru, memenuhi lebar', 'inline: mengalir dalam teks, tidak bisa diatur ukuran', 'inline-block: mengalir tetapi bisa diatur ukuran', 'none: menyembunyikan elemen dan ruangnya'])
    ]),

    lesson(2, 'Position: Relative & Absolute', [
      mat('Mengenal position', '📍', 'Secara bawaan elemen mengikuti alur halaman (<strong>position: static</strong>). Dengan property <strong>position</strong> ditambah <strong>top, right, bottom, left</strong>, kamu bisa menggeser elemen. <strong>relative</strong>: elemen bergeser dari posisi aslinya, dan ruang aslinya tetap dipertahankan.',
        '.geser {\n  position: relative;\n  top: 10px;    /* turun 10px dari posisi asli */\n  left: 20px;   /* geser 20px ke kanan */\n}'),
      mat('Absolute: Menempel pada Induk', '📌', '<strong>position: absolute</strong> mengeluarkan elemen dari alur halaman dan menempatkannya relatif terhadap induk terdekat yang punya position (selain static). Pola yang paling sering dipakai: induk diberi <strong>position: relative</strong>, anak diberi <strong>position: absolute</strong>, lalu diatur top/right — contohnya lencana notifikasi di pojok kartu.',
        '.kartu {\n  position: relative;   /* acuan */\n}\n\n.badge {\n  position: absolute;\n  top: 0;\n  right: 0;\n}'),
      mc('Agar elemen absolute menempel pada induknya, induk perlu diberi...', ['position: relative', 'display: block', 'float: left', 'overflow: auto'], 0, 'Induk dengan position (biasanya relative) menjadi acuan bagi anak yang absolute.'),
      mc('Apa efek  position: relative; top: 10px; ?', ['Elemen bergeser 10px ke bawah dari posisi aslinya', 'Elemen menempel 10px dari atas layar', 'Elemen naik 10px', 'Elemen menghilang'], 0, 'top mendorong elemen dari tepi atas posisi aslinya, jadi elemen turun 10px.'),
      fill('Tempatkan lencana secara absolute:', '.badge { position: ', 'absolute', '; top: 0; right: 0; }', 'absolute mengeluarkan elemen dari alur dan memposisikannya dengan top/right/bottom/left.'),
      chal('Jadikan .kartu sebagai acuan (position: relative), lalu tempatkan .badge di pojok kanan atas kartu: position absolute, top 0, right 0.',
        page({ body: '<div class="kartu">\n  <span class="badge">Baru!</span>\n  <p>Kartu produk</p>\n</div>' }), {
          requiredTags: ['div', 'span'],
          css: [
            { sel: '.kartu', prop: 'position', value: 'relative', msg: '.kartu harus position: relative agar menjadi acuan.' },
            { sel: '.badge', prop: 'position', value: 'absolute', msg: '.badge harus position: absolute.' },
            { sel: '.badge', prop: 'top', value: '0', msg: '.badge harus menempel di atas (top: 0;).' },
            { sel: '.badge', prop: 'right', value: '0', msg: '.badge harus menempel di kanan (right: 0;).' }
          ]
        }, 'Pola relative + absolute dipakai di banyak komponen: lencana, ikon tutup, label diskon.'),
      rev('Ringkasan: Relative & Absolute', ['static = bawaan, mengikuti alur', 'relative = bergeser dari posisi asli (ruang tetap ada)', 'absolute = keluar dari alur, relatif ke induk ber-position', 'Pola: induk relative + anak absolute'])
    ]),

    lesson(3, 'Position: Fixed & Sticky', [
      mat('Position Fixed', '📌', '<strong>position: fixed</strong> menempelkan elemen pada <em>layar</em> (viewport): ia tetap di tempatnya walau halaman di-scroll. Cocok untuk tombol "kembali ke atas" atau navbar yang selalu terlihat. Karena keluar dari alur halaman, elemen lain tidak lagi memberinya ruang.',
        '.ke-atas {\n  position: fixed;\n  bottom: 20px;\n  right: 20px;\n}'),
      mat('Position Sticky', '🧲', '<strong>position: sticky</strong> adalah gabungan: elemen berperilaku normal sampai kamu men-scroll mencapai batas yang ditentukan (misalnya top: 0), lalu ia "menempel". Header yang menempel di atas saat halaman di-scroll biasanya memakai sticky.',
        'header {\n  position: sticky;\n  top: 0;\n  background-color: white;\n}'),
      mc('Elemen position: fixed tetap di tempat saat halaman di-scroll karena ia menempel pada...', ['Induknya', 'Layar (viewport)', 'Elemen sebelumnya', 'Body saja'], 1, 'fixed menempel pada viewport, jadi tidak ikut bergerak ketika halaman di-scroll.'),
      mc('Apa perbedaan sticky dan fixed?', ['sticky mengikuti alur normal dulu, baru menempel saat batasnya tercapai', 'sticky selalu berada di pojok kiri', 'fixed hanya jalan di HP', 'Tidak ada perbedaan'], 0, 'Sticky tetap mengambil ruang di alur halaman dan hanya menempel setelah di-scroll melewati batasnya.'),
      fill('Buat header menempel saat halaman di-scroll:', 'header { position: ', 'sticky', '; top: 0; }', 'sticky + top: 0 membuat header menempel di tepi atas layar.'),
      chal('Buat <header> menempel di atas saat di-scroll: position sticky, top 0, dan beri background-color agar konten di bawahnya tidak tembus.',
        page({ body: '<header>Navbar</header>\n' + manyP(8) }), {
          requiredTags: ['header'],
          css: [
            { sel: 'header', prop: 'position', value: 'sticky', msg: 'header harus position: sticky.' },
            { sel: 'header', prop: 'top', value: '0', msg: 'header harus menempel di atas (top: 0;).' },
            { sel: 'header', prop: 'background-color', msg: 'Beri header background-color agar konten tidak tembus.' }
          ]
        }, 'Sticky itu praktis: tanpa JavaScript, header tetap terlihat.'),
      chal('Buat tombol .ke-atas menempel di pojok kanan bawah layar: position fixed, bottom 20px, right 20px.',
        page({ body: '<button class="ke-atas">⬆ Atas</button>\n' + manyP(8) }), {
          requiredTags: ['button'],
          css: [
            { sel: '.ke-atas', prop: 'position', value: 'fixed', msg: '.ke-atas harus position: fixed.' },
            { sel: '.ke-atas', prop: 'bottom', value: '20px', msg: 'Jarak dari bawah harus 20px (bottom: 20px;).' },
            { sel: '.ke-atas', prop: 'right', value: '20px', msg: 'Jarak dari kanan harus 20px (right: 20px;).' }
          ]
        }, 'Elemen fixed tetap terlihat di layar, ke mana pun kamu men-scroll.'),
      rev('Ringkasan: Fixed & Sticky', ['fixed: menempel pada layar, keluar dari alur halaman', 'sticky: normal dulu, menempel setelah batas scroll tercapai', 'Keduanya memakai top/right/bottom/left', 'Beri background pada elemen yang menempel agar konten tidak tembus'])
    ]),

    lesson(4, 'z-index & Overflow', [
      mat('z-index: Susunan Lapisan', '🗂️', 'Saat dua elemen bertumpuk, <strong>z-index</strong> menentukan siapa yang berada di depan: angka lebih besar tampil di atas. z-index hanya bekerja pada elemen yang punya <strong>position</strong> (selain static).',
        '.bawah {\n  position: relative;\n  z-index: 1;\n}\n\n.atas {\n  position: relative;\n  z-index: 10;   /* tampil di depan .bawah */\n}'),
      mat('Overflow: Isi yang Meluap', '🌊', 'Jika isi lebih besar dari kotaknya, ia "meluap". <strong>overflow</strong> mengaturnya: <strong>hidden</strong> memotong bagian yang lebih, <strong>auto</strong> menambahkan scrollbar hanya saat diperlukan, dan <strong>scroll</strong> selalu menampilkan scrollbar.',
        '.daftar {\n  height: 120px;\n  overflow: auto;\n}'),
      mc('Elemen A (z-index: 5) dan B (z-index: 2) bertumpuk. Siapa yang tampil di depan?', ['A', 'B', 'Sama saja', 'Hanya bergantung urutan HTML'], 0, 'z-index lebih besar tampil di depan (selama keduanya punya position).'),
      mc('Agar kotak ber-height tetap punya scrollbar bila isinya panjang, gunakan...', ['overflow: auto', 'overflow: none', 'scroll: true', 'display: scroll'], 0, 'overflow: auto menampilkan scrollbar bila isi melebihi ukuran kotak.'),
      fill('Potong isi yang meluap dari kotak:', '.kotak { overflow: ', 'hidden', '; }', 'hidden memotong bagian yang keluar dari kotak.'),
      chal('Buat .daftar setinggi 120px dengan scrollbar saat isinya panjang (overflow auto), dan buat .atas tampil di depan dengan position relative dan z-index minimal 2.',
        page({ body: '<div class="daftar">\n' + Array.from({ length: 8 }, (_, i) => `  <p>Baris ${i + 1}</p>`).join('\n') + '\n</div>\n<div class="bawah">Lapisan bawah</div>\n<div class="atas">Lapisan atas</div>' }), {
          requiredTags: ['div'],
          css: [
            { sel: '.daftar', prop: 'height', value: '120px', msg: '.daftar harus setinggi 120px.' },
            { sel: '.daftar', prop: 'overflow', value: ['auto', 'scroll'], msg: '.daftar belum bisa di-scroll (overflow: auto;).' },
            { sel: '.atas', prop: 'position', value: ['relative', 'absolute', 'fixed', 'sticky'], msg: '.atas butuh position (misalnya relative) agar z-index bekerja.' },
            { sel: '.atas', prop: 'z-index', min: 2, msg: '.atas harus punya z-index minimal 2.' }
          ]
        }, 'z-index hanya berlaku bila elemen punya position.'),
      rev('Ringkasan: z-index & Overflow', ['z-index: angka lebih besar tampil di depan', 'z-index butuh position selain static', 'overflow: hidden memotong, auto menambah scrollbar saat perlu', 'overflow: scroll selalu menampilkan scrollbar'])
    ]),

    project(5, 'Mini Project — Header Menempel & Lencana', [
      mat('Saatnya Project!', '🚀', 'Gabungkan display dan position: buat header navigasi yang menempel di atas saat di-scroll, dan kartu produk dengan lencana diskon di pojoknya.'),
      mini('Header Menempel & Lencana',
        'Tata halaman toko ini: (1) .topbar menempel di atas (sticky atau fixed) dengan top 0, background-color, dan z-index minimal 1. (2) Link di .topbar berperilaku inline-block dengan padding atas-bawah minimal 6px. (3) .produk menjadi acuan posisi (relative). (4) .diskon menempel di pojok kartu (absolute, dengan top dan right atau left).',
        page({
          title: 'Toko Sepatu',
          body: '<header class="topbar">\n  <a href="#">Beranda</a>\n  <a href="#">Produk</a>\n  <a href="#">Kontak</a>\n</header>\n<main>\n  <div class="produk">\n    <span class="diskon">-20%</span>\n    <h2>Sepatu Lari</h2>\n    <p>Ringan dan nyaman dipakai setiap hari.</p>\n  </div>\n' + manyP(6).replace(/^/gm, '  ') + '\n</main>'
        }), [
          chk('sticky', '.topbar menempel (position sticky atau fixed)', 'css.is(".topbar","position",["sticky","fixed"])'),
          chk('top0', '.topbar menempel di tepi atas (top: 0)', 'css.is(".topbar","top","0")'),
          chk('zindex', '.topbar punya z-index minimal 1', 'css.num(".topbar","z-index") >= 1'),
          chk('topbar-bg', '.topbar punya background-color', 'css.value(".topbar","background-color") !== null'),
          chk('links', 'Link di .topbar inline-block dengan padding atas-bawah minimal 6px', 'css.is(".topbar a","display","inline-block") && css.num(".topbar a","padding-top") >= 6'),
          chk('produk-rel', '.produk memakai position: relative', 'css.is(".produk","position","relative")'),
          chk('diskon-abs', '.diskon memakai position: absolute', 'css.is(".diskon","position","absolute")'),
          chk('diskon-pojok', '.diskon punya top dan right (atau left)', 'css.value(".diskon","top") !== null && (css.value(".diskon","right") !== null || css.value(".diskon","left") !== null)')
        ])
    ])
  ]));

  // ============================================================
  // LEVEL 18 — CSS LEVEL 6: FLEXBOX DASAR
  // ============================================================
  K.register(K.level(18, 6, '🧱', 'Flexbox Dasar', 'Susun elemen sejajar dengan mudah memakai Flexbox', [

    lesson(1, 'Mengenal Flexbox', [
      mat('Apa itu Flexbox?', '🧱', '<strong>Flexbox</strong> adalah cara modern untuk menata elemen dalam satu baris atau satu kolom. Cukup tulis <strong>display: flex</strong> pada elemen <em>pembungkus</em> (flex container), dan semua anak langsungnya (flex item) otomatis berjajar menyamping.',
        '<div class="menu">\n  <a href="#">Beranda</a>\n  <a href="#">Produk</a>\n  <a href="#">Kontak</a>\n</div>\n\n.menu {\n  display: flex;\n}'),
      mat('Arah: flex-direction', '🧭', '<strong>flex-direction</strong> menentukan arah susunan: <strong>row</strong> (bawaan, menyamping), <strong>column</strong> (menurun ke bawah), serta row-reverse dan column-reverse yang membalik urutan.',
        '.menu {\n  display: flex;\n  flex-direction: row;      /* menyamping (bawaan) */\n}\n\n.tumpuk {\n  display: flex;\n  flex-direction: column;   /* menurun */\n}'),
      mc('display: flex harus dipasang pada...', ['Elemen pembungkus (container)', 'Setiap anak satu per satu', 'Elemen body saja', 'Tag head'], 0, 'display: flex dipasang pada container; anak-anak langsungnya otomatis menjadi flex item.'),
      mc('Agar item flex tersusun MENURUN ke bawah, gunakan...', ['flex-direction: column', 'flex-direction: row', 'flex-wrap: wrap', 'display: block'], 0, 'column menyusun item dari atas ke bawah.'),
      fill('Aktifkan flexbox pada container:', '.menu { display: ', 'flex', '; }', 'display: flex mengubah elemen menjadi flex container.'),
      fix('Baris ini tidak membuat flexbox karena nilainya salah. Perbaiki!', '<style>\n  .menu {\n    display: flexbox;\n  }\n</style>\n<div class="menu"><span>A</span><span>B</span></div>', 'Nilai yang benar hanya "flex" (tanpa "box").', {
        requiredTags: ['div'],
        css: [{ sel: '.menu', prop: 'display', value: 'flex', msg: '.menu belum display: flex.' }]
      }, 'Nilainya "flex", bukan "flexbox".'),
      chal('Jadikan .baris flex container (item menyamping), dan .tumpuk flex container dengan arah column (item menurun).',
        page({ body: '<div class="baris"><span>1</span><span>2</span><span>3</span></div>\n<div class="tumpuk"><span>A</span><span>B</span><span>C</span></div>' }), {
          requiredTags: ['div'],
          css: [
            { sel: '.baris', prop: 'display', value: 'flex', msg: '.baris belum display: flex.' },
            { sel: '.tumpuk', prop: 'display', value: 'flex', msg: '.tumpuk belum display: flex.' },
            { sel: '.tumpuk', prop: 'flex-direction', value: 'column', msg: '.tumpuk belum flex-direction: column.' }
          ]
        }, 'Container yang sama bisa berarah row atau column.'),
      rev('Ringkasan: Mengenal Flexbox', ['display: flex pada pembungkus (container)', 'Anak langsung otomatis menjadi flex item', 'flex-direction: row (bawaan) atau column', 'Hanya anak langsung yang terpengaruh'])
    ]),

    lesson(2, 'justify-content', [
      mat('Sumbu Utama dan justify-content', '↔️', 'Flexbox punya dua sumbu. <strong>Sumbu utama</strong> searah dengan flex-direction (menyamping untuk row). <strong>justify-content</strong> mengatur posisi item sepanjang sumbu utama itu.',
        'sumbu utama (row) →\n┌──────────────────────────────┐\n│ [A] [B] [C]                  │  flex-start (bawaan)\n│         [A] [B] [C]          │  center\n│                  [A] [B] [C] │  flex-end\n│ [A]       [B]           [C]  │  space-between\n└──────────────────────────────┘'),
      ex('Nilai justify-content', '.menu {\n  display: flex;\n  justify-content: flex-start;    /* rapat di awal */\n  justify-content: center;        /* di tengah */\n  justify-content: flex-end;      /* rapat di akhir */\n  justify-content: space-between; /* ujung ke ujung */\n  justify-content: space-around;  /* jarak di sekeliling item */\n  justify-content: space-evenly;  /* jarak merata */\n}', 'Pada contoh ini hanya satu nilai yang dipakai sekaligus; yang terakhir ditulis akan menang.'),
      mc('Untuk menaruh item di TENGAH secara horizontal (flex-direction: row), gunakan...', ['justify-content: center', 'align-items: center', 'text-align: middle', 'margin: center'], 0, 'justify-content mengatur sumbu utama, yaitu horizontal pada row.'),
      mc('justify-content: space-between menghasilkan...', ['Semua item rapat di tengah', 'Item pertama di awal, item terakhir di akhir, sisanya berjarak sama', 'Item bertumpuk', 'Semua item di kanan'], 1, 'space-between mendorong item ke ujung-ujung container dan membagi sisa ruang secara merata di antaranya.'),
      fill('Letakkan item di tengah:', '.menu { display: flex; justify-content: ', 'center', '; }', 'center menaruh item di tengah sumbu utama.'),
      chal('Buat navbar: logo di kiri dan menu di kanan. Jadikan .navbar flex container dengan justify-content: space-between.',
        page({ body: '<div class="navbar">\n  <strong>Logo</strong>\n  <nav>Menu</nav>\n</div>' }), {
          requiredTags: ['div'],
          css: [
            { sel: '.navbar', prop: 'display', value: 'flex', msg: '.navbar belum display: flex.' },
            { sel: '.navbar', prop: 'justify-content', value: 'space-between', msg: '.navbar belum justify-content: space-between.' }
          ]
        }, 'space-between adalah resep klasik navbar: logo di kiri, menu di kanan.'),
      rev('Ringkasan: justify-content', ['justify-content mengatur posisi di sumbu utama', 'center, flex-start, flex-end', 'space-between: ujung ke ujung, jarak merata', 'space-around dan space-evenly: jarak di sekeliling item'])
    ]),

    lesson(3, 'align-items', [
      mat('Sumbu Silang dan align-items', '↕️', '<strong>align-items</strong> mengatur posisi item pada <strong>sumbu silang</strong> (tegak lurus dengan sumbu utama) — vertikal untuk flex-direction: row. Nilainya: stretch (bawaan, item meregang), flex-start, center, flex-end, dan baseline.',
        '.kotak {\n  display: flex;\n  height: 200px;\n  align-items: center;   /* tengah secara vertikal */\n}'),
      mat('Catatan Penting', '💡', 'align-items baru terlihat jelas jika container punya tinggi lebih besar dari isinya, misalnya height: 200px. Tanpa tinggi ekstra, tidak ada ruang kosong untuk item bergeser ke atas atau bawah.'),
      mc('Pada flex-direction: row, align-items mengatur posisi item secara...', ['Horizontal', 'Vertikal', 'Hanya teks', 'Warna'], 1, 'Sumbu silang pada row adalah vertikal.'),
      mc('Agar item berada di TENGAH secara vertikal, gunakan...', ['align-items: center', 'justify-content: center', 'vertical-align: flex', 'align: middle'], 0, 'align-items: center memusatkan item pada sumbu silang.'),
      fill('Pusatkan item secara vertikal:', '.kotak { display: flex; height: 200px; align-items: ', 'center', '; }', 'center menempatkan item di tengah sumbu silang.'),
      chal('Pusatkan .isi tepat di tengah kotak (horizontal DAN vertikal): .kotak menjadi flex container setinggi 200px dengan justify-content center dan align-items center.',
        page({ body: '<div class="kotak">\n  <div class="isi">Aku di tengah!</div>\n</div>' }), {
          requiredTags: ['div'],
          css: [
            { sel: '.kotak', prop: 'display', value: 'flex', msg: '.kotak belum display: flex.' },
            { sel: '.kotak', prop: 'height', value: '200px', msg: '.kotak harus setinggi 200px agar ada ruang untuk memusatkan.' },
            { sel: '.kotak', prop: 'justify-content', value: 'center', msg: 'Tambahkan justify-content: center; (tengah horizontal).' },
            { sel: '.kotak', prop: 'align-items', value: 'center', msg: 'Tambahkan align-items: center; (tengah vertikal).' }
          ]
        }, 'Dua baris ini — justify-content dan align-items — memusatkan apa pun di dalam flex container.'),
      rev('Ringkasan: align-items', ['align-items mengatur posisi di sumbu silang', 'Pada row, sumbu silang = vertikal', 'center, flex-start, flex-end, stretch, baseline', 'Container perlu tinggi lebih besar agar efeknya terlihat'])
    ]),

    lesson(4, 'Gap & Memusatkan Elemen', [
      mat('Jarak antar Item: gap', '↔️', '<strong>gap</strong> memberi jarak antar flex item tanpa perlu menulis margin satu per satu. Hasilnya lebih rapi dan tidak meninggalkan jarak berlebih di tepi container. Ada juga row-gap dan column-gap untuk jarak per arah.',
        '.galeri {\n  display: flex;\n  gap: 16px;\n}'),
      ex('Resep "Pusatkan Segalanya"', '.pusat {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n}', 'Empat baris ini adalah resep klasik menaruh sesuatu tepat di tengah layar.'),
      mc('Apa fungsi gap pada flexbox?', ['Memberi jarak antar item', 'Memberi warna pada item', 'Menghapus item', 'Mengubah ukuran huruf'], 0, 'gap menambah jarak di antara flex item.'),
      mc('Resep untuk menaruh sesuatu tepat di tengah (kedua sumbu) adalah...', ['display: flex; justify-content: center; align-items: center;', 'display: block; margin: center;', 'position: middle;', 'text-align: center; vertical-align: center;'], 0, 'Flex container + justify-content center + align-items center.'),
      fill('Beri jarak 16px antar item:', '.galeri { display: flex; ', 'gap', ': 16px; }', 'gap mengatur jarak antar item flex.'),
      chal('Buat .galeri flex container dengan jarak 16px antar item (gap) dan item berada di tengah (justify-content: center).',
        page({ body: '<div class="galeri">\n  <div class="foto">1</div>\n  <div class="foto">2</div>\n  <div class="foto">3</div>\n</div>' }), {
          requiredTags: ['div'],
          css: [
            { sel: '.galeri', prop: 'display', value: 'flex', msg: '.galeri belum display: flex.' },
            { sel: '.galeri', prop: 'gap', value: '16px', msg: '.galeri belum punya gap: 16px.' },
            { sel: '.galeri', prop: 'justify-content', value: 'center', msg: 'Tambahkan justify-content: center;' }
          ]
        }, 'gap lebih bersih daripada memberi margin pada setiap item.'),
      rev('Ringkasan: Gap & Memusatkan', ['gap memberi jarak antar flex item', 'row-gap dan column-gap untuk jarak per arah', 'Pusatkan: display flex + justify-content center + align-items center', 'min-height: 100vh = setinggi layar'])
    ]),

    project(5, 'Mini Project — Navbar Flexbox', [
      mat('Saatnya Project!', '🚀', 'Buat navbar modern dari header biasa: logo di kiri, menu di kanan, semuanya sejajar rapi dengan Flexbox.'),
      mini('Navbar Flexbox',
        'Ubah header ini menjadi navbar: (1) .navbar flex container, logo di kiri dan menu di kanan (space-between), sejajar vertikal di tengah (align-items center). (2) .menu juga flex container dengan gap minimal 16px. (3) Hilangkan titik list pada .menu (list-style: none) dan garis bawah link. (4) Beri .navbar background-color dan padding.',
        page({
          title: 'Navbar',
          body: '<header class="navbar">\n  <div class="logo">PintuKoding</div>\n  <ul class="menu">\n    <li><a href="#">Beranda</a></li>\n    <li><a href="#">Materi</a></li>\n    <li><a href="#">Tentang</a></li>\n    <li><a href="#">Kontak</a></li>\n  </ul>\n</header>'
        }), [
          chk('nav-flex', '.navbar adalah flex container', 'css.is(".navbar","display","flex")'),
          chk('space-between', 'Logo dan menu terpisah ujung ke ujung (justify-content: space-between)', 'css.is(".navbar","justify-content","space-between")'),
          chk('align', 'Isi navbar sejajar vertikal di tengah (align-items: center)', 'css.is(".navbar","align-items","center")'),
          chk('menu-flex', '.menu adalah flex container', 'css.is(".menu","display","flex")'),
          chk('gap', '.menu punya gap minimal 16px', 'css.num(".menu","gap") >= 16'),
          chk('no-bullet', 'Titik list pada .menu dihilangkan (list-style: none)', 'css.is(".menu","list-style","none") || css.is(".menu","list-style-type","none")'),
          chk('no-underline', 'Link di .menu tanpa garis bawah', 'css.is(".menu a","text-decoration","none")'),
          chk('bg-padding', '.navbar punya background-color dan padding', 'css.value(".navbar","background-color") !== null && css.num(".navbar","padding-top") > 0')
        ])
    ])
  ]));
})();
