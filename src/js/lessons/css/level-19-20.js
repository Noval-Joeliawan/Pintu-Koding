// src/js/lessons/css/level-19-20.js — Jalur CSS: Level 19 (CSS 7: Flexbox Lanjutan) & Level 20 (CSS 8: Interaksi Visual)
(function () {
  'use strict';
  const K = window.CSSLessonKit;
  const { page, mat, ex, rev, mc, fill, drag, fix, chal, free, chk, mini, lesson, project } = K;

  const boxes = (cls, n, label) => Array.from({ length: n }, (_, i) => `  <div class="${cls}">${label || ''}${i + 1}</div>`).join('\n');

  // ============================================================
  // LEVEL 19 — CSS LEVEL 7: FLEXBOX LANJUTAN
  // ============================================================
  K.register(K.level(19, 7, '🧩', 'Flexbox Lanjutan', 'Bungkus baris, bagi ruang, dan susun layout halaman dengan Flexbox', [

    lesson(1, 'flex-wrap', [
      mat('Saat Item Tidak Muat', '🧳', 'Secara bawaan flexbox memaksa semua item tetap dalam <strong>satu baris</strong> (nowrap), sehingga item akan menyusut. Dengan <strong>flex-wrap: wrap</strong>, item yang tidak muat dipindahkan ke baris berikutnya — cocok untuk galeri dan daftar kartu.',
        '.galeri {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n\n.kartu {\n  width: 200px;\n}'),
      ex('Nilai flex-wrap', '.galeri {\n  flex-wrap: nowrap;        /* bawaan: satu baris, item menyusut */\n  flex-wrap: wrap;          /* baris baru bila tidak muat */\n  flex-wrap: wrap-reverse;  /* baris baru, urutan baris dibalik */\n}', 'Coba kecilkan lebar jendela: dengan wrap, kartu akan turun satu per satu ke baris berikutnya.'),
      mc('flex-wrap: nowrap (bawaan) membuat item yang tidak muat...', ['Pindah ke baris baru', 'Menyusut agar tetap satu baris', 'Hilang dari halaman', 'Saling menumpuk'], 1, 'Dengan nowrap, semua item dipaksa tetap dalam satu baris sehingga ukurannya mengecil.'),
      mc('Agar item pindah ke baris baru saat ruang habis, gunakan...', ['flex-wrap: wrap', 'flex-direction: wrap', 'display: wrap', 'overflow: wrap'], 0, 'flex-wrap: wrap mengizinkan item turun ke baris berikutnya.'),
      fill('Izinkan item turun ke baris berikutnya:', '.galeri { display: flex; flex-wrap: ', 'wrap', '; }', 'wrap membuat item yang tidak muat pindah ke baris baru.'),
      chal('Jadikan .galeri flex container yang membungkus item ke baris baru (flex-wrap: wrap) dengan jarak 16px antar item (gap). Setiap .kartu sudah berlebar 200px.',
        page({ css: '.kartu {\n  width: 200px;\n  height: 80px;\n  background-color: #bfdbfe;\n}', body: '<div class="galeri">\n' + boxes('kartu', 6, 'Kartu ') + '\n</div>' }), {
          requiredTags: ['div'],
          css: [
            { sel: '.galeri', prop: 'display', value: 'flex', msg: '.galeri belum display: flex.' },
            { sel: '.galeri', prop: 'flex-wrap', value: 'wrap', msg: '.galeri belum flex-wrap: wrap.' },
            { sel: '.galeri', prop: 'gap', value: '16px', msg: '.galeri belum punya gap: 16px.' }
          ]
        }, 'wrap + gap adalah dasar dari galeri kartu yang rapi.'),
      rev('Ringkasan: flex-wrap', ['nowrap (bawaan): satu baris, item menyusut', 'wrap: item turun ke baris baru bila tidak muat', 'Kombinasikan dengan gap untuk jarak rapi', 'Pasang pada flex container'])
    ]),

    lesson(2, 'flex-grow & flex', [
      mat('Berbagi Ruang Sisa: flex', '📊', 'Item flex bisa "tumbuh" memenuhi ruang sisa. <strong>flex-grow</strong> menentukan jatah tiap item: angka lebih besar mendapat porsi lebih besar. Penulisan singkatnya <strong>flex: 1</strong> — banyak dipakai agar beberapa item berbagi lebar secara merata.',
        '.item {\n  flex: 1;   /* semua item sama lebar */\n}\n\n.besar {\n  flex: 2;   /* dua kali lebih lebar dari item flex: 1 */\n}'),
      ex('Sidebar Tetap, Konten Fleksibel', '.layout {\n  display: flex;\n}\n\n.sidebar {\n  width: 200px;   /* lebar tetap */\n}\n\n.konten {\n  flex: 1;        /* mengisi semua sisa ruang */\n}', 'Pola ini membuat konten otomatis menyesuaikan diri dengan lebar layar.'),
      mc('Tiga item semuanya diberi flex: 1. Hasilnya...', ['Ketiganya sama lebar', 'Item pertama paling lebar', 'Item terakhir paling lebar', 'Ketiganya menghilang'], 0, 'Jatah yang sama (1:1:1) berarti ruang dibagi rata.'),
      mc('Item A flex: 2 dan item B flex: 1 berbagi ruang. A mendapat...', ['Setengah dari ruang B', 'Ruang yang sama dengan B', 'Dua kali ruang B', 'Seluruh ruang'], 2, 'Perbandingannya 2:1, jadi A mendapat dua kali jatah B.'),
      fill('Buat item mengisi sisa ruang:', '.konten { ', 'flex', ': 1; }', 'flex: 1 membuat item tumbuh mengisi ruang yang tersisa.'),
      chal('Jadikan .layout flex container. .sidebar berlebar tetap 200px, dan .konten mengisi sisa ruang dengan flex: 1.',
        page({ body: '<div class="layout">\n  <div class="sidebar">Sidebar</div>\n  <div class="konten">Konten utama</div>\n</div>' }), {
          requiredTags: ['div'],
          css: [
            { sel: '.layout', prop: 'display', value: 'flex', msg: '.layout belum display: flex.' },
            { sel: '.sidebar', prop: 'width', value: '200px', msg: '.sidebar harus berlebar tetap 200px.' },
            { sel: '.konten', prop: 'flex', value: /^1(\s+1\s+(0|0%|0px))?$/i, msg: '.konten harus mengisi sisa ruang dengan flex: 1;' }
          ]
        }, 'Sidebar tetap + konten fleksibel adalah layout yang sangat umum.'),
      rev('Ringkasan: flex', ['flex: 1 membuat item tumbuh mengisi sisa ruang', 'Angka lebih besar = jatah ruang lebih besar', 'Item ber-width tetap tidak ikut tumbuh', 'Pola umum: sidebar tetap + konten flex: 1'])
    ]),

    lesson(3, 'align-self & order', [
      mat('align-self: Aturan Khusus untuk Satu Item', '🎯', '<strong>align-self</strong> memungkinkan satu item punya posisi sumbu-silang yang berbeda dari item lain, menimpa align-items milik container.',
        '.container {\n  display: flex;\n  align-items: flex-start;\n  height: 200px;\n}\n\n.istimewa {\n  align-self: flex-end;   /* hanya item ini yang turun */\n}'),
      mat('order: Mengubah Urutan Tampil', '🔀', '<strong>order</strong> mengubah urutan tampil item tanpa mengubah HTML. Nilai bawaannya 0; angka lebih kecil tampil lebih dulu, dan nilai negatif diperbolehkan.',
        '.a { order: 2; }\n.b { order: 1; }\n.c { order: -1; }   /* tampil paling awal */'),
      mc('align-self dipakai untuk...', ['Mengatur posisi SATU item pada sumbu silang', 'Mengatur semua item sekaligus', 'Mengatur lebar container', 'Mengubah warna item'], 0, 'align-self adalah versi "per item" dari align-items.'),
      mc('Tiga item ber-order: 0, 0, dan -1. Item mana yang tampil PERTAMA?', ['Yang ber-order -1', 'Item pertama di HTML', 'Item kedua di HTML', 'Tidak tentu'], 0, 'Angka order terkecil tampil lebih dulu.'),
      fill('Turunkan satu item ke bawah container:', '.istimewa { align-self: ', 'flex-end', '; }', 'flex-end menaruh item di ujung akhir sumbu silang.'),
      chal('Pada .kotak (flex, tinggi 200px, align-items: flex-start): turunkan .b ke bawah dengan align-self: flex-end, dan buat .c tampil paling awal dengan order: -1.',
        page({ css: '.kotak {\n  display: flex;\n  height: 200px;\n  align-items: flex-start;\n  gap: 8px;\n}\n.kotak div {\n  width: 60px;\n  height: 60px;\n  background-color: #fde68a;\n}', body: '<div class="kotak">\n  <div class="a">A</div>\n  <div class="b">B</div>\n  <div class="c">C</div>\n</div>' }), {
          requiredTags: ['div'],
          css: [
            { sel: '.b', prop: 'align-self', value: 'flex-end', msg: '.b belum turun ke bawah (align-self: flex-end;).' },
            { sel: '.c', prop: 'order', value: '-1', msg: '.c belum tampil paling awal (order: -1;).' }
          ]
        }, 'order mengubah tampilan, bukan urutan di HTML — hati-hati untuk aksesibilitas.'),
      rev('Ringkasan: align-self & order', ['align-self: posisi sumbu silang untuk satu item', 'Menimpa align-items dari container', 'order: mengubah urutan tampil (bawaan 0)', 'Angka kecil/negatif tampil lebih dulu'])
    ]),

    lesson(4, 'Layout Halaman dengan Flexbox', [
      mat('Kerangka Halaman Klasik', '🏗️', 'Dengan Flexbox, kerangka halaman <em>header – (sidebar + konten) – footer</em> bisa dibuat tanpa trik rumit. Jadikan body flex container berarah column agar footer selalu di dasar halaman; lalu jadikan area tengah (main) flex container berarah row.',
        '<body>\n  <header>…</header>\n  <main>\n    <aside>…</aside>\n    <section>…</section>\n  </main>\n  <footer>…</footer>\n</body>'),
      ex('Layout Lengkap', 'body {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;   /* setinggi layar */\n  margin: 0;\n}\n\nmain {\n  flex: 1;             /* mendorong footer ke dasar */\n  display: flex;       /* sidebar + konten menyamping */\n}', 'main { flex: 1 } membuat area tengah mengisi semua sisa tinggi, sehingga footer selalu menempel di dasar layar.'),
      mc('Mengapa body diberi flex-direction: column dan min-height: 100vh?', ['Agar footer selalu di dasar halaman walau kontennya sedikit', 'Agar teks lebih besar', 'Agar halaman berwarna', 'Agar elemen tersembunyi'], 0, 'Dengan body setinggi layar dan main yang mengisi sisa ruang, footer terdorong ke bawah.'),
      mc('Pada layout tadi, main { flex: 1 } berfungsi untuk...', ['Mengisi sisa tinggi halaman', 'Menghilangkan main', 'Mengubah warna main', 'Memperkecil main'], 0, 'flex: 1 pada main membuatnya mengambil semua ruang kosong di antara header dan footer.'),
      fill('Susun isi body dari atas ke bawah:', 'body { display: flex; flex-direction: ', 'column', '; }', 'column menyusun header, main, dan footer secara vertikal.'),
      chal('Buat kerangka halaman: body flex container berarah column dengan min-height: 100vh; main mengisi sisa ruang (flex: 1) dan juga flex container agar sidebar dan konten berjajar menyamping.',
        page({ body: '<header>Header</header>\n<main>\n  <aside>Sidebar</aside>\n  <section>Konten</section>\n</main>\n<footer>Footer</footer>' }), {
          requiredTags: ['header', 'main', 'footer'],
          css: [
            { sel: 'body', prop: 'display', value: 'flex', msg: 'body belum display: flex.' },
            { sel: 'body', prop: 'flex-direction', value: 'column', msg: 'body belum flex-direction: column.' },
            { sel: 'body', prop: 'min-height', value: '100vh', msg: 'body belum min-height: 100vh.' },
            { sel: 'main', prop: 'flex', value: /^1(\s+1\s+(0|0%|0px))?$/i, msg: 'main harus mengisi sisa ruang (flex: 1;).' },
            { sel: 'main', prop: 'display', value: 'flex', msg: 'main harus display: flex agar sidebar dan konten berjajar.' }
          ]
        }, 'Inilah kerangka yang dipakai di banyak aplikasi web.'),
      rev('Ringkasan: Layout Halaman', ['body: display flex + flex-direction column + min-height 100vh', 'main: flex: 1 mengisi sisa tinggi (footer terdorong ke dasar)', 'main juga flex container untuk sidebar + konten', 'Flexbox cocok untuk layout satu dimensi'])
    ]),

    project(5, 'Mini Project — Galeri Kartu', [
      mat('Saatnya Project!', '🚀', 'Buat galeri kartu kursus yang otomatis turun ke baris baru saat layar menyempit. Gunakan wrap, gap, dan pembagian ruang dengan flex.'),
      mini('Galeri Kartu',
        'Susun galeri: (1) .galeri flex container dengan flex-wrap: wrap, gap minimal 16px, dan justify-content: center. (2) Setiap .kartu punya ukuran fleksibel (flex berisi basis ukuran, contoh flex: 1 1 200px) atau width tetap. (3) .kartu punya padding, border, dan sudut membulat.',
        page({
          title: 'Galeri Kursus',
          body: '<h1>Galeri Kursus</h1>\n<div class="galeri">\n' + ['HTML Dasar', 'CSS Dasar', 'Selector', 'Box Model', 'Flexbox', 'Responsive'].map((t) => `  <div class="kartu">\n    <h2>${t}</h2>\n    <p>Belajar ${t} dengan latihan langsung.</p>\n  </div>`).join('\n') + '\n</div>'
        }), [
          chk('flex', '.galeri adalah flex container', 'css.is(".galeri","display","flex")'),
          chk('wrap', '.galeri membungkus item (flex-wrap: wrap)', 'css.is(".galeri","flex-wrap","wrap")'),
          chk('gap', '.galeri punya gap minimal 16px', 'css.num(".galeri","gap") >= 16'),
          chk('center', 'Item berada di tengah (justify-content: center)', 'css.is(".galeri","justify-content","center")'),
          chk('size', '.kartu punya ukuran (flex dengan basis, atau width)', 'css.is(".kartu","flex",/\\d+(px|rem|em|%)/) || css.value(".kartu","width") !== null'),
          chk('padding', '.kartu punya padding', 'css.num(".kartu","padding-top") > 0'),
          chk('border', '.kartu punya border', 'css.value(".kartu","border-style") !== null && css.value(".kartu","border-style") !== "none"'),
          chk('radius', '.kartu bersudut membulat', 'css.num(".kartu","border-radius") > 0')
        ])
    ])
  ]));

  // ============================================================
  // LEVEL 20 — CSS LEVEL 8: INTERAKSI VISUAL
  // ============================================================
  K.register(K.level(20, 8, '✨', 'Interaksi Visual', 'Buat halaman merespons kursor: hover, fokus, transisi, dan bayangan', [

    lesson(1, ':hover', [
      mat('Pseudo-class :hover', '🖱️', '<strong>Pseudo-class</strong> adalah selector yang aktif pada keadaan tertentu. <strong>:hover</strong> aktif saat kursor berada di atas elemen. Tulis tepat setelah selector, tanpa spasi.',
        'a {\n  color: blue;\n}\n\na:hover {\n  color: orange;\n}'),
      ex('Tombol yang Merespons', '.tombol {\n  background-color: royalblue;\n  color: white;\n  padding: 10px 20px;\n  border: none;\n}\n\n.tombol:hover {\n  background-color: navy;\n}', 'Warna tombol berubah saat kursor menyentuhnya. Aturan :hover hanya menimpa property yang disebut di dalamnya.'),
      mc('Kapan aturan  a:hover  aktif?', ['Saat kursor berada di atas link', 'Saat link diklik dua kali', 'Saat halaman dimuat', 'Saat link disembunyikan'], 0, ':hover aktif selama kursor berada di atas elemen.'),
      mc('Cara menulis hover untuk .tombol yang benar adalah...', ['.tombol:hover', '.tombol hover', '.tombol::hover', '.tombol-hover'], 0, 'Pseudo-class ditulis setelah selector dengan satu titik dua, tanpa spasi.'),
      fill('Ubah gaya saat kursor menyentuh .tombol:', '.tombol:', 'hover', ' { background-color: orange; }', ':hover aktif ketika kursor berada di atas elemen.'),
      chal('Buat .tombol berlatar royalblue dengan teks putih (white). Saat di-hover, latarnya berubah menjadi navy.',
        page({ body: '<button class="tombol">Klik aku</button>' }), {
          requiredTags: ['button'],
          css: [
            { sel: '.tombol', prop: 'background-color', value: 'royalblue', msg: '.tombol belum berlatar royalblue.' },
            { sel: '.tombol', prop: 'color', value: 'white', msg: 'Teks .tombol belum putih.' },
            { sel: '.tombol:hover', prop: 'background-color', value: 'navy', literal: true, msg: 'Tambahkan aturan .tombol:hover dengan background-color: navy;' }
          ]
        }, '.tombol:hover menimpa latar saat kursor di atas tombol.'),
      rev('Ringkasan: :hover', [':hover aktif saat kursor di atas elemen', 'Ditulis setelah selector: a:hover, .tombol:hover', 'Hanya menimpa property yang ditulis di dalamnya', 'Dipakai untuk link, tombol, dan kartu'])
    ]),

    lesson(2, ':focus, :active & cursor', [
      mat(':focus dan :active', '⌨️', '<strong>:focus</strong> aktif saat elemen sedang dipilih (misalnya kolom input diklik atau dipilih dengan tombol Tab), sedangkan <strong>:active</strong> aktif saat elemen sedang ditekan. Gaya fokus yang jelas sangat membantu pengguna keyboard.',
        'input:focus {\n  border-color: royalblue;\n  outline: 2px solid lightblue;\n}\n\n.tombol:active {\n  background-color: navy;\n}'),
      mat('cursor: Petunjuk Interaksi', '👆', '<strong>cursor: pointer</strong> mengubah kursor menjadi gambar tangan, tanda bahwa elemen bisa diklik. Pasang pada tombol atau kartu yang bisa diklik. Catatan: jangan hilangkan garis fokus (outline: none) tanpa menggantinya dengan gaya fokus lain, karena pengguna keyboard jadi tidak tahu posisinya.',
        '.tombol {\n  cursor: pointer;\n}'),
      mc(':focus aktif ketika...', ['Elemen sedang dipilih (mis. input diklik atau ditekan Tab)', 'Kursor berada di atas elemen', 'Elemen disembunyikan', 'Halaman dimuat'], 0, ':focus aktif pada elemen yang sedang menerima input keyboard.'),
      mc('cursor: pointer; biasanya dipasang pada...', ['Elemen yang bisa diklik', 'Paragraf panjang', 'Gambar latar', 'Teks biasa'], 0, 'Kursor tangan memberi isyarat bahwa elemen bisa diklik.'),
      fill('Beri gaya saat input sedang dipilih:', 'input:', 'focus', ' { border-color: royalblue; }', ':focus aktif saat elemen menerima fokus.'),
      chal('Beri .tombol kursor tangan (cursor: pointer), dan buat input berubah border-color saat fokus (input:focus).',
        page({ css: 'input {\n  border: 2px solid #94a3b8;\n  padding: 8px;\n}', body: '<input type="text" placeholder="Nama kamu">\n<button class="tombol">Kirim</button>' }), {
          requiredTags: ['input', 'button'],
          css: [
            { sel: '.tombol', prop: 'cursor', value: 'pointer', msg: '.tombol belum cursor: pointer.' },
            { sel: 'input:focus', prop: 'border-color', literal: true, msg: 'Tambahkan aturan input:focus yang mengubah border-color.' }
          ]
        }, 'Gaya fokus membantu semua pengguna, terutama yang memakai keyboard.'),
      rev('Ringkasan: :focus, :active & cursor', [':focus: elemen sedang dipilih (input diklik / Tab)', ':active: elemen sedang ditekan', 'cursor: pointer menandai elemen yang bisa diklik', 'Jangan hapus outline fokus tanpa pengganti'])
    ]),

    lesson(3, 'Transition', [
      mat('Perubahan yang Halus: transition', '🎞️', 'Tanpa transition, perubahan saat hover terjadi seketika. <strong>transition</strong> membuatnya mengalir halus. Format singkatnya: <strong>transition: property durasi</strong>, misalnya transition: background-color 0.3s. Pasang pada keadaan <em>awal</em> elemen, bukan di :hover.',
        '.tombol {\n  background-color: royalblue;\n  transition: background-color 0.3s;\n}\n\n.tombol:hover {\n  background-color: navy;\n}'),
      mat('Durasi dan Percepatan', '⏱️', 'Durasi ditulis dalam detik (0.3s) atau milidetik (300ms); sekitar 0.2s sampai 0.4s terasa natural. Kamu juga bisa menambahkan fungsi percepatan seperti <strong>ease</strong> (bawaan), <strong>ease-in-out</strong>, atau <strong>linear</strong>. Kata <strong>all</strong> menganimasikan semua property yang berubah.',
        '.kartu {\n  transition: all 0.3s ease-in-out;\n}'),
      mc('Di mana sebaiknya transition ditulis?', ['Pada keadaan awal elemen (misalnya .tombol)', 'Hanya di :hover', 'Di dalam HTML', 'Di tag head'], 0, 'Dengan menaruhnya di keadaan awal, perubahan halus berlaku saat masuk MAUPUN keluar dari hover.'),
      mc('transition: background-color 0.3s; artinya...', ['Perubahan background-color berlangsung selama 0,3 detik', 'Background berubah 0,3 kali', 'Background hilang 0,3 detik', 'Teks bergerak 0,3 piksel'], 0, 'Angka dengan satuan s adalah durasi dalam detik.'),
      fill('Buat perubahan berlangsung halus:', '.tombol { ', 'transition', ': background-color 0.3s; }', 'transition menentukan property mana yang berubah halus dan berapa lama.'),
      chal('Buat .tombol berubah halus: beri transition berdurasi (misalnya background-color 0.3s) dan atur latar yang berbeda pada .tombol:hover.',
        page({ css: '.tombol {\n  background-color: royalblue;\n  color: white;\n  padding: 10px 20px;\n  border: none;\n}', body: '<button class="tombol">Sentuh aku</button>' }), {
          requiredTags: ['button'],
          css: [
            { sel: '.tombol', prop: 'transition', value: /[\d.]+m?s/i, msg: '.tombol belum punya transition berdurasi, contoh: transition: background-color 0.3s;' },
            { sel: '.tombol:hover', prop: 'background-color', literal: true, msg: 'Tambahkan aturan .tombol:hover yang mengubah background-color.' }
          ]
        }, 'transition di keadaan awal + perubahan di :hover = animasi halus.'),
      rev('Ringkasan: Transition', ['transition: property durasi (contoh: background-color 0.3s)', 'Tulis di keadaan awal elemen, bukan di :hover', 'Durasi nyaman sekitar 0.2s–0.4s', 'all menganimasikan semua property yang berubah'])
    ]),

    lesson(4, 'Box-shadow & Transform', [
      mat('Bayangan: box-shadow', '🌑', '<strong>box-shadow</strong> menambahkan bayangan di sekeliling kotak. Nilainya berurutan: geser horizontal, geser vertikal, blur, lalu warna. Bayangan yang lembut memberi kesan elemen "terangkat" dari halaman.',
        '.kartu {\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}'),
      mat('Transform: Menggeser dan Memperbesar', '🔄', '<strong>transform</strong> mengubah bentuk atau posisi elemen tanpa mengganggu tata letak: <strong>translateY(-4px)</strong> menggeser ke atas, <strong>scale(1.05)</strong> memperbesar 5%, dan <strong>rotate(5deg)</strong> memutar. Digabung dengan transition, hasilnya efek kartu yang "terangkat" saat di-hover.',
        '.kartu {\n  transition: transform 0.2s, box-shadow 0.2s;\n}\n\n.kartu:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);\n}'),
      mc('Pada  box-shadow: 0 4px 12px black;  nilai pertama dan kedua mengatur...', ['Geseran horizontal dan vertikal', 'Warna dan ukuran', 'Lebar dan tinggi', 'Blur dan warna'], 0, 'Urutannya: geser-x, geser-y, blur, warna.'),
      mc('transform: scale(1.1); pada hover akan...', ['Memperbesar elemen 10%', 'Memperkecil elemen 10%', 'Memutar elemen 10 derajat', 'Menggeser elemen 10px'], 0, 'scale(1.1) = 110% dari ukuran semula.'),
      fill('Angkat elemen 4px ke atas saat di-hover:', '.kartu:hover { transform: ', 'translateY', '(-4px); }', 'translateY dengan nilai negatif menggeser elemen ke atas.'),
      chal('Beri .kartu bayangan (box-shadow) dan transition untuk transform. Saat di-hover, kartu bergeser ke atas atau membesar (transform: translateY(...) atau scale(...)).',
        page({ css: '.kartu {\n  width: 220px;\n  padding: 20px;\n  border-radius: 12px;\n  background-color: white;\n}', body: '<div class="kartu">\n  <h2>Kartu Interaktif</h2>\n  <p>Sentuh aku dengan kursor.</p>\n</div>' }), {
          requiredTags: ['div'],
          css: [
            { sel: '.kartu', prop: 'box-shadow', msg: '.kartu belum punya bayangan (box-shadow).' },
            { sel: '.kartu', prop: 'transition', value: { re: 'transform' }, msg: 'Tambahkan transition untuk transform, contoh: transition: transform 0.2s;' },
            { sel: '.kartu:hover', prop: 'transform', value: { re: 'translate|scale' }, literal: true, msg: 'Tambahkan .kartu:hover dengan transform: translateY(-4px); atau scale(1.05);' }
          ]
        }, 'Efek "terangkat" ini sering dipakai pada kartu produk dan artikel.'),
      rev('Ringkasan: Box-shadow & Transform', ['box-shadow: geser-x geser-y blur warna', 'transform: translateY(), scale(), rotate()', 'Transform tidak mengganggu tata letak elemen lain', 'Gabungkan dengan transition untuk gerakan halus'])
    ]),

    project(5, 'Mini Project — Tombol & Kartu Interaktif', [
      mat('Saatnya Project!', '🚀', 'Hidupkan sebuah kartu paket belajar: tombol yang responsif terhadap kursor dan kartu yang terangkat saat disentuh.'),
      mini('Tombol & Kartu Interaktif',
        'Hidupkan kartu ini: (1) .tombol punya cursor pointer, background-color, dan transition berdurasi. (2) .tombol:hover mengubah background-color, dan .tombol:active mengatur transform atau background-color. (3) .kartu punya box-shadow dan transition, serta .kartu:hover mengatur transform.',
        page({
          title: 'Paket Belajar',
          body: '<div class="kartu">\n  <h2>Paket Belajar</h2>\n  <p>Akses semua materi HTML dan CSS.</p>\n  <button class="tombol">Mulai Sekarang</button>\n</div>'
        }), [
          chk('cursor', '.tombol memakai cursor: pointer', 'css.is(".tombol","cursor","pointer")'),
          chk('bg', '.tombol punya background-color', 'css.value(".tombol","background-color") !== null'),
          chk('transition', '.tombol punya transition berdurasi', 'css.is(".tombol","transition",/[\\d.]+m?s/i)'),
          chk('hover', '.tombol:hover mengubah background-color', 'css.has(".tombol:hover","background-color")'),
          chk('active', '.tombol:active mengatur transform atau background-color', 'css.has(".tombol:active","transform") || css.has(".tombol:active","background-color")'),
          chk('shadow', '.kartu punya box-shadow', 'css.value(".kartu","box-shadow") !== null'),
          chk('kartu-transition', '.kartu punya transition berdurasi', 'css.is(".kartu","transition",/[\\d.]+m?s/i)'),
          chk('kartu-hover', '.kartu:hover mengatur transform', 'css.has(".kartu:hover","transform")')
        ])
    ])
  ]));
})();
