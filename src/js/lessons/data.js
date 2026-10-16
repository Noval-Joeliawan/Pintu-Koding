// js/data.js — PintuKoding Lesson Data (12 Levels × 5 Lessons = 60 Lessons)
window.LessonData = {

  getLevel(levelId) {
    return this.levels.find(l => l.id === parseInt(levelId));
  },

  getLesson(levelId, lessonId) {
    const level = this.getLevel(levelId);
    return level ? level.lessons.find(l => l.id === parseInt(lessonId)) : null;
  },

  levels: [

    // ============================================================
    // LEVEL 1 — MENGENAL HTML
    // ============================================================
    {
      id: 1, icon: '🌱', title: 'Mengenal HTML',
      description: 'Pelajari apa itu HTML dan bagaimana cara kerjanya',
      lessons: [
        {
          id: 1, title: 'Apa Itu HTML?', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Apa itu HTML?', icon: '📖', content: 'HTML adalah singkatan dari <strong>HyperText Markup Language</strong>. HTML adalah bahasa standar untuk membuat struktur halaman web. Setiap halaman website yang kamu kunjungi pasti menggunakan HTML.' },
            { type: 'material', title: 'Fungsi HTML', icon: '🎯', content: 'HTML berfungsi sebagai <em>kerangka</em> dari sebuah website. Bayangkan HTML seperti tulang rangka — ia memberikan struktur. CSS memberi tampilan indah, dan JavaScript memberi interaksi.', code: '<h1>Judul Website</h1>\n<p>Ini adalah paragraf.</p>\n<a href="#">Ini adalah link</a>' },
            { type: 'example', title: 'Contoh HTML Pertama', code: '<!DOCTYPE html>\n<html>\n  <body>\n    <h1>Hello World!</h1>\n    <p>Ini website pertamaku!</p>\n  </body>\n</html>' },
            { type: 'multiple-choice', question: 'Apa kepanjangan dari HTML?', options: ['HyperText Markup Language', 'High Tech Modern Language', 'HyperText Making Language', 'Home Tool Markup Language'], answer: 0, explanation: 'HTML adalah singkatan dari HyperText Markup Language — bahasa markup untuk halaman web.' },
            { type: 'material', title: 'Browser dan HTML', icon: '🌐', content: 'Browser (seperti Chrome, Firefox, Edge) bertugas membaca file HTML dan menampilkannya menjadi halaman web yang bisa kamu lihat dan gunakan. Browser adalah "penerjemah" HTML.' },
            { type: 'multiple-choice', question: 'Apa fungsi utama HTML dalam pembuatan website?', options: ['Membuat animasi yang indah', 'Membuat struktur dan konten halaman web', 'Mengatur warna dan ukuran teks', 'Menghubungkan website ke database'], answer: 1, explanation: 'HTML digunakan untuk membuat struktur dan konten halaman web, bukan animasi atau warna.' },
            { type: 'fill-code', instruction: 'Lengkapi tag HTML berikut untuk membuat heading:', before: '<', blank: 'h1', after: '>Judul Halaman</h1>', answer: 'h1', explanation: 'Tag h1 digunakan untuk membuat heading (judul) terbesar.' },
            { type: 'multiple-choice', question: 'Ekstensi file HTML yang benar adalah...', options: ['.css', '.js', '.html', '.php'], answer: 2, explanation: 'File HTML menggunakan ekstensi .html (atau kadang .htm).' },
            { type: 'drag-drop', instruction: 'Susun kode HTML yang benar untuk membuat paragraf:', tokens: ['</p>', '<p>', 'Halo Dunia!'], answer: ['<p>', 'Halo Dunia!', '</p>'] },
            { type: 'review', title: 'Ringkasan: Apa Itu HTML?', points: ['HTML = HyperText Markup Language', 'HTML adalah bahasa untuk membuat struktur halaman web', 'Browser membaca dan menampilkan file HTML', 'File HTML berekstensi .html'] }
          ]
        },
        {
          id: 2, title: 'Mengenal HTML (Lanjut)', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Cara Kerja HTML', icon: '⚙️', content: 'Ketika kamu membuat file HTML dan membukanya di browser, browser membaca tag-tag HTML dari atas ke bawah, lalu menampilkan hasilnya sebagai halaman web visual.' },
            { type: 'example', title: 'Alur Pembuatan Web', code: '1. Buat file: index.html\n2. Tulis kode HTML di dalamnya\n3. Buka di browser\n4. Browser menampilkan hasilnya!' },
            { type: 'multiple-choice', question: 'Aplikasi apa yang digunakan untuk MELIHAT hasil HTML?', options: ['Microsoft Word', 'Google Chrome / Firefox', 'Notepad / VS Code', 'Microsoft Excel'], answer: 1, explanation: 'Browser seperti Chrome atau Firefox digunakan untuk melihat hasil HTML.' },
            { type: 'fill-code', instruction: 'Tag paling utama (root) dalam HTML adalah:', before: '<', blank: 'html', after: '>\n  ...\n</html>', answer: 'html', explanation: 'Tag <html> adalah tag root yang membungkus seluruh konten HTML.' },
            { type: 'drag-drop', instruction: 'Urutkan langkah membuat website HTML:', tokens: ['Lihat di browser', 'Tulis kode HTML', 'Simpan file .html'], answer: ['Tulis kode HTML', 'Simpan file .html', 'Lihat di browser'] },
            { type: 'multiple-choice', question: 'HTML, CSS, dan JavaScript bekerja bersama. Apa peran HTML?', options: ['Tampilan (warna, font)', 'Struktur dan konten', 'Animasi dan interaksi', 'Koneksi ke server'], answer: 1, explanation: 'HTML berperan sebagai struktur dan konten. CSS = tampilan, JS = interaksi.' },
            { type: 'fill-code', instruction: 'Lengkapi kode untuk membuat paragraf sederhana:', before: '<p>Selamat datang di', blank: 'PintuKoding', after: '!</p>', answer: 'PintuKoding', explanation: 'Isi antara tag <p> dan </p> adalah teks yang akan ditampilkan.' },
            { type: 'review', title: 'Ringkasan: Cara Kerja HTML', points: ['Browser membaca HTML dari atas ke bawah', 'File HTML disimpan dengan ekstensi .html', 'HTML = Struktur, CSS = Tampilan, JS = Interaksi', 'Tag <html> adalah root dari semua kode HTML'] }
          ]
        },
        {
          id: 3, title: 'Mengenal Tag', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Apa itu Tag HTML?', icon: '🏷️', content: 'Tag HTML adalah instruksi yang ditulis di antara kurung siku < >. Ada dua jenis: tag pembuka dan tag penutup. Tag penutup ditandai dengan tanda garis miring /.', code: '<p>Ini adalah paragraf</p>\n<!-- Tag pembuka: <p> -->\n<!-- Tag penutup: </p> -->' },
            { type: 'example', title: 'Contoh Tag HTML', code: '<h1>Ini Heading</h1>\n<p>Ini Paragraf</p>\n<strong>Ini Teks Tebal</strong>' },
            { type: 'multiple-choice', question: 'Apa simbol yang digunakan untuk tag penutup HTML?', options: ['\\', '/', '*', '#'], answer: 1, explanation: 'Tag penutup menggunakan garis miring / sebelum nama tag, contoh: </p>' },
            { type: 'fix-code', instruction: 'Perbaiki kode HTML berikut! Tag penutupnya salah:', brokenCode: '<p>Halo Dunia<p>', fixHint: 'Tag penutup harus menggunakan tanda /', answer: '<p>Halo Dunia</p>', checkTag: 'p', rules: { requiredTags: ['p'], wellFormed: ['p'] }, explanation: 'Tag penutup harus ditulis </p>, bukan <p>' },
            { type: 'fill-code', instruction: 'Tutup tag h1 dengan benar:', before: '<h1>PintuKoding<', blank: '/h1', after: '>', answer: '/h1', explanation: 'Tag penutup ditulis dengan format </namatag>, jadi </h1>' },
            { type: 'multiple-choice', question: 'Manakah penulisan tag HTML yang BENAR?', options: ['<p>Teks<p>', '[p]Teks[/p]', '<p>Teks</p>', '{p}Teks{/p}'], answer: 2, explanation: 'Tag HTML menggunakan kurung siku <> dan tag penutup menggunakan </>.' },
            { type: 'drag-drop', instruction: 'Susun tag HTML yang benar untuk heading h2:', tokens: ['</h2>', 'Judul Artikel', '<h2>'], answer: ['<h2>', 'Judul Artikel', '</h2>'] },
            { type: 'review', title: 'Ringkasan: Tag HTML', points: ['Tag HTML ditulis di antara < >', 'Tag pembuka: <namatag>', 'Tag penutup: </namatag>', 'Tag penutup menggunakan tanda /'] }
          ]
        },
        {
          id: 4, title: 'Mengenal Element', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Apa itu Element HTML?', icon: '🧩', content: 'Element HTML terdiri dari: tag pembuka + konten + tag penutup. Element juga bisa memiliki <strong>attribute</strong> yang memberikan informasi tambahan.', code: '<a href="https://google.com">Kunjungi Google</a>\n<!--   ↑ attribute          ↑ konten         -->' },
            { type: 'example', title: 'Contoh Element dengan Attribute', code: '<img src="foto.jpg" alt="Foto saya">\n<a href="halaman.html">Klik di sini</a>\n<p class="penting">Teks penting</p>' },
            { type: 'multiple-choice', question: 'Di mana attribute HTML ditulis?', options: ['Di tag penutup', 'Di dalam konten', 'Di tag pembuka', 'Di baris baru'], answer: 2, explanation: 'Attribute selalu ditulis di dalam tag pembuka, contoh: <a href="...">.' },
            { type: 'fill-code', instruction: 'Tambahkan attribute href pada tag anchor:', before: '<a ', blank: 'href', after: '="https://pintukoding.com">PintuKoding</a>', answer: 'href', explanation: 'Attribute href digunakan pada tag <a> untuk menentukan tujuan link.' },
            { type: 'multiple-choice', question: 'Manakah yang merupakan ELEMENT HTML yang lengkap?', options: ['<h1>', '<p>Hello World</p>', 'Hello World</p>', '<div></span>'], answer: 1, explanation: '<p>Hello World</p> adalah element lengkap: tag pembuka + konten + tag penutup.' },
            { type: 'challenge', instruction: 'Buat sebuah heading h1 dengan teks "Halo PintuKoding":', starterCode: '', rules: { requiredTags: ['h1'], minCounts: { h1: 1 }, requiredText: 'Halo PintuKoding', nonEmptyText: { h1: true } }, requiredTags: ['h1'], requiredText: 'Halo PintuKoding', explanation: 'Gunakan <h1>Halo PintuKoding</h1>' },
            { type: 'challenge', instruction: 'Tulis kode sendiri: buat heading h1 dengan nama kamu, lalu satu paragraf p yang berisi perkenalan singkat (minimal 5 kata):', starterCode: '', rules: { requiredTags: ['h1', 'p'], minCounts: { h1: 1, p: 1 }, nonEmptyText: { h1: true, p: true } }, explanation: 'Kamu sudah menulis kode sendiri — h1 untuk judul dan p untuk paragraf!' },
            { type: 'fix-code', instruction: 'Kode ini tidak berjalan dengan benar. Perbaiki tag penutupnya:', brokenCode: '<h1>Halo!<h1>\n<p>Saya sedang belajar HTML<p>', fixHint: 'Setiap tag pembuka butuh tag penutup dengan tanda /', answer: '<h1>Halo!</h1>\n<p>Saya sedang belajar HTML</p>', checkTag: 'h1', rules: { requiredTags: ['h1', 'p'], wellFormed: ['h1', 'p'] }, explanation: 'Tag penutup ditulis </namatag>.' },
            { type: 'review', title: 'Ringkasan: Element HTML', points: ['Element = tag pembuka + konten + tag penutup', 'Attribute memberikan informasi tambahan pada element', 'Attribute ditulis di dalam tag pembuka', 'Format attribute: nama="nilai"'] }
          ]
        },
        {
          id: 5, title: 'Mini Project — Hello HTML', xpReward: 30, isProject: true,
          slides: [
            { type: 'material', title: 'Saatnya Project!', icon: '🚀', content: 'Kamu sudah mempelajari dasar-dasar HTML. Sekarang saatnya membuat halaman HTML pertamamu! Buat halaman sederhana yang menampilkan pesan perkenalan dirimu.' },
            { type: 'mini-project', title: 'Hello HTML', instruction: 'Buat halaman HTML dengan heading dan paragraf pengantar. Gunakan tag <h1> untuk judul dan <p> untuk deskripsi singkat.', starterCode: '<!-- Tulis kode HTML kamu di sini -->\n', checkItems: [
              { id: 'has-h1', label: 'Ada heading <h1>', checkStr: 'doc.querySelector("h1") !== null' },
              { id: 'has-p', label: 'Ada paragraf <p>', checkStr: 'doc.querySelector("p") !== null' },
              { id: 'h1-not-empty', label: 'Heading tidak kosong', checkStr: 'doc.querySelector("h1") && doc.querySelector("h1").textContent.trim().length > 0' }
            ]}
          ]
        }
      ]
    },

    // ============================================================
    // LEVEL 2 — STRUKTUR HTML
    // ============================================================
    {
      id: 2, icon: '🏗️', title: 'Struktur HTML',
      description: 'Pelajari bagian-bagian penting struktur dokumen HTML',
      lessons: [
        {
          id: 1, title: 'DOCTYPE', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Apa itu DOCTYPE?', icon: '📋', content: '<!DOCTYPE html> adalah deklarasi yang wajib ada di baris pertama file HTML. Ia memberitahu browser bahwa dokumen ini menggunakan HTML versi 5 (HTML5).' },
            { type: 'example', title: 'DOCTYPE di HTML', code: '<!DOCTYPE html>\n<html lang="id">\n  <head>\n    <title>Halaman Saya</title>\n  </head>\n  <body>\n    <h1>Halo!</h1>\n  </body>\n</html>' },
            { type: 'multiple-choice', question: 'Di mana DOCTYPE harus ditulis?', options: ['Di baris terakhir', 'Di dalam tag <body>', 'Di baris pertama dokumen', 'Di dalam tag <head>'], answer: 2, explanation: 'DOCTYPE selalu harus ada di baris pertama, sebelum tag <html>.' },
            { type: 'fill-code', instruction: 'Lengkapi deklarasi DOCTYPE yang benar:', before: '<!DOCTYPE ', blank: 'html', after: '>', answer: 'html', explanation: '<!DOCTYPE html> adalah standar untuk HTML5.' },
            { type: 'multiple-choice', question: 'Apa tujuan penulisan <!DOCTYPE html>?', options: ['Membuat komentar', 'Memberitahu browser ini adalah HTML5', 'Membuat judul halaman', 'Mengimpor CSS'], answer: 1, explanation: 'DOCTYPE memberitahu browser jenis dan versi dokumen HTML.' },
            { type: 'drag-drop', instruction: 'Susun urutan yang benar untuk memulai dokumen HTML:', tokens: ['<html>', '<!DOCTYPE html>', '<head>'], answer: ['<!DOCTYPE html>', '<html>', '<head>'] },
            { type: 'review', title: 'Ringkasan: DOCTYPE', points: ['<!DOCTYPE html> wajib ada di baris PERTAMA', 'DOCTYPE mendeklarasikan versi HTML5', 'Tanpa DOCTYPE browser mungkin berperilaku berbeda', 'Penulisan tidak case-sensitive tapi konvensinya huruf besar'] }
          ]
        },
        {
          id: 2, title: 'Tag HTML', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Tag <html>', icon: '🌐', content: 'Tag <html> adalah elemen ROOT dari seluruh dokumen HTML. Semua elemen lain harus berada di dalam tag <html>. Attribute lang menentukan bahasa konten.' },
            { type: 'example', title: 'Penggunaan Tag HTML', code: '<!DOCTYPE html>\n<html lang="id">\n  <!-- Semua konten ada di sini -->\n</html>' },
            { type: 'multiple-choice', question: 'Apa fungsi attribute lang="id" pada tag <html>?', options: ['Membuat teks tebal', 'Menentukan bahasa konten (Indonesia)', 'Mengatur ukuran halaman', 'Menghubungkan ke CSS'], answer: 1, explanation: 'lang="id" memberitahu browser bahwa konten halaman dalam bahasa Indonesia.' },
            { type: 'fill-code', instruction: 'Lengkapi tag html dengan attribute bahasa Indonesia:', before: '<html lang="', blank: 'id', after: '">', answer: 'id', explanation: '"id" adalah kode bahasa Indonesia (ISO 639-1).' },
            { type: 'drag-drop', instruction: 'Buat struktur HTML dasar yang benar:', tokens: ['</html>', '<!DOCTYPE html>', '<html lang="id">'], answer: ['<!DOCTYPE html>', '<html lang="id">', '</html>'] },
            { type: 'review', title: 'Ringkasan: Tag HTML', points: ['<html> adalah tag root semua elemen', 'Attribute lang menentukan bahasa halaman', 'lang="id" untuk bahasa Indonesia', 'Semua tag lain ada di dalam <html>'] }
          ]
        },
        {
          id: 3, title: 'HEAD', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Tag <head>', icon: '🧠', content: 'Tag <head> berisi informasi META tentang halaman — informasi yang TIDAK ditampilkan di halaman, tapi penting untuk browser dan mesin pencari. Contoh: judul, charset, link CSS.' },
            { type: 'example', title: 'Isi dari HEAD', code: '<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width">\n  <title>Judul Halaman</title>\n  <link rel="stylesheet" href="style.css">\n</head>' },
            { type: 'multiple-choice', question: 'Konten di dalam <head> akan...', options: ['Ditampilkan di halaman utama', 'Menjadi background halaman', 'TIDAK terlihat di halaman, tapi diproses browser', 'Membuat animasi'], answer: 2, explanation: 'Konten head tidak ditampilkan ke pengguna, tapi digunakan browser untuk konfigurasi halaman.' },
            { type: 'fill-code', instruction: 'Tambahkan meta charset untuk encoding UTF-8:', before: '<meta charset="', blank: 'UTF-8', after: '">', answer: 'UTF-8', explanation: 'charset="UTF-8" memastikan karakter khusus (termasuk bahasa Indonesia) terbaca dengan benar.' },
            { type: 'multiple-choice', question: 'Tag apa yang biasanya ADA di dalam <head>?', options: ['<h1>, <p>, <img>', '<title>, <meta>, <link>', '<button>, <form>, <table>', '<header>, <footer>, <nav>'], answer: 1, explanation: '<title>, <meta>, dan <link> biasanya ada di dalam <head>.' },
            { type: 'review', title: 'Ringkasan: HEAD', points: ['<head> berisi metadata halaman', 'Konten head TIDAK ditampilkan di halaman', 'Berisi: <title>, <meta>, <link>, <style>', 'Meta charset="UTF-8" penting untuk karakter khusus'] }
          ]
        },
        {
          id: 4, title: 'TITLE & BODY', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Tag <title>', icon: '🏷️', content: 'Tag <title> diletakkan di dalam <head> dan menentukan judul yang muncul di tab browser. Judul ini juga digunakan oleh mesin pencari (Google, dll).' },
            { type: 'material', title: 'Tag <body>', icon: '📄', content: 'Tag <body> berisi SEMUA konten yang akan ditampilkan di halaman web — teks, gambar, tombol, form, dll. Semua yang terlihat oleh pengguna ada di dalam <body>.', code: '<body>\n  <h1>Ini terlihat!</h1>\n  <p>Ini juga terlihat!</p>\n</body>' },
            { type: 'example', title: 'Struktur Lengkap HTML', code: '<!DOCTYPE html>\n<html lang="id">\n<head>\n  <title>Website Saya</title>\n</head>\n<body>\n  <h1>Selamat Datang!</h1>\n  <p>Ini adalah website saya.</p>\n</body>\n</html>' },
            { type: 'multiple-choice', question: 'Di mana kita meletakkan konten yang ingin ditampilkan ke pengguna?', options: ['Di dalam <head>', 'Di luar tag <html>', 'Di dalam <body>', 'Di dalam <title>'], answer: 2, explanation: 'Semua konten yang ditampilkan harus ada di dalam tag <body>.' },
            { type: 'fix-code', instruction: 'Perbaiki kode ini agar title dan body di tempat yang benar:', brokenCode: '<!DOCTYPE html>\n<html>\n<body>\n  <title>Website</title>\n  <h1>Halo</h1>\n</body>\n</html>', fixHint: 'Title seharusnya ada di dalam <head>, bukan <body>', answer: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Website</title>\n</head>\n<body>\n  <h1>Halo</h1>\n</body>\n</html>', checkTag: 'h1', rules: { selectors: ['head title', 'body h1'] } },
            { type: 'challenge', instruction: 'Buat halaman HTML lengkap dengan title "Halaman Saya" dan h1 "Selamat Datang":', starterCode: '<!DOCTYPE html>\n<html lang="id">\n<head>\n  \n</head>\n<body>\n  \n</body>\n</html>', rules: { requiredTags: ['title', 'h1'], requiredText: 'Selamat Datang', selectors: ['html > head > title', 'html > body > h1'], nonEmptyText: { title: true } }, explanation: 'Bagus! Struktur HTML lengkap sudah benar.' },
            { type: 'review', title: 'Ringkasan: Title & Body', points: ['<title> ada di <head> — menampilkan judul di tab browser', '<body> berisi semua konten yang terlihat', 'Teks, gambar, form semuanya ada di <body>', 'Struktur: html → head + body'] }
          ]
        },
        {
          id: 5, title: 'Mini Project — Struktur Halaman', xpReward: 30, isProject: true,
          slides: [
            { type: 'material', title: 'Project Struktur HTML', icon: '🏗️', content: 'Kamu sudah menguasai struktur dasar HTML. Sekarang buat halaman HTML yang lengkap dengan semua elemen wajib: DOCTYPE, html, head, title, dan body.' },
            { type: 'mini-project', title: 'Halaman HTML Lengkap', instruction: 'Buat halaman HTML yang memiliki: DOCTYPE, tag html, head dengan title, dan body dengan konten. Halaman harus bisa dibuka di browser dengan struktur yang benar.', starterCode: '<!DOCTYPE html>\n<html lang="id">\n<head>\n  <!-- Tambahkan title di sini -->\n</head>\n<body>\n  <!-- Tambahkan konten di sini -->\n</body>\n</html>', checkItems: [
              { id: 'has-doctype', label: 'Ada DOCTYPE deklarasi', checkStr: 'doc.doctype !== null' },
              { id: 'has-title', label: 'Ada tag <title>', checkStr: 'doc.querySelector("title") !== null && doc.querySelector("title").textContent.trim().length > 0' },
              { id: 'has-h1', label: 'Ada heading di body', checkStr: 'doc.querySelector("h1, h2, h3") !== null' },
              { id: 'has-p', label: 'Ada paragraf di body', checkStr: 'doc.querySelector("p") !== null' }
            ]}
          ]
        }
      ]
    },

    // ============================================================
    // LEVEL 3 — HEADING & PARAGRAPH
    // ============================================================
    {
      id: 3, icon: '📝', title: 'Heading & Paragraph',
      description: 'Pelajari cara membuat judul dan paragraf di HTML',
      lessons: [
        {
          id: 1, title: 'Mengenal Heading', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Heading HTML', icon: '📰', content: 'HTML memiliki 6 level heading: <h1> sampai <h6>. Semakin kecil angkanya, semakin besar dan penting heading tersebut. <h1> adalah yang terbesar, <h6> adalah yang terkecil.' },
            { type: 'example', title: 'Semua Level Heading', code: '<h1>Heading 1 — Judul Utama</h1>\n<h2>Heading 2 — Sub Judul</h2>\n<h3>Heading 3</h3>\n<h4>Heading 4</h4>\n<h5>Heading 5</h5>\n<h6>Heading 6 — Terkecil</h6>' },
            { type: 'multiple-choice', question: 'Heading mana yang paling besar dan paling penting?', options: ['<h6>', '<h3>', '<h1>', '<h2>'], answer: 2, explanation: '<h1> adalah heading terbesar dan paling penting — biasanya judul utama halaman.' },
            { type: 'fill-code', instruction: 'Buat heading level 2 dengan teks "Sub Judul":', before: '<', blank: 'h2', after: '>Sub Judul</h2>', answer: 'h2', explanation: 'Tag h2 membuat heading level kedua, lebih kecil dari h1.' },
            { type: 'multiple-choice', question: 'Berapa level heading yang tersedia di HTML?', options: ['3', '5', '6', '4'], answer: 2, explanation: 'HTML memiliki 6 level heading: h1, h2, h3, h4, h5, dan h6.' },
            { type: 'drag-drop', instruction: 'Urutkan heading dari yang TERBESAR ke TERKECIL:', tokens: ['<h3>', '<h1>', '<h2>'], answer: ['<h1>', '<h2>', '<h3>'] },
            { type: 'review', title: 'Ringkasan: Heading', points: ['Ada 6 level heading: h1 sampai h6', '<h1> adalah yang terbesar', '<h6> adalah yang terkecil', 'Gunakan heading sesuai hierarki konten'] }
          ]
        },
        {
          id: 2, title: 'Tingkatan Heading', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Hierarki Heading', icon: '📊', content: 'Heading harus digunakan secara hierarkis. Gunakan <h1> untuk judul utama, <h2> untuk bagian, <h3> untuk sub-bagian, dst. Jangan melompat dari h1 langsung ke h4.' },
            { type: 'example', title: 'Contoh Hierarki Benar', code: '<h1>Blog Saya</h1>\n  <h2>Tutorial HTML</h2>\n    <h3>Apa itu Tag?</h3>\n    <h3>Apa itu Element?</h3>\n  <h2>Tutorial CSS</h2>\n    <h3>Selector CSS</h3>' },
            { type: 'challenge', instruction: 'Buat halaman dengan h1 "Blog Saya" dan h2 "Artikel Pertama":', starterCode: '', rules: { requiredTags: ['h1', 'h2'], minCounts: { h1: 1, h2: 1 }, requiredText: 'Blog Saya', nonEmptyText: { h1: true, h2: true } }, requiredTags: ['h1', 'h2'], requiredText: 'Blog Saya', explanation: 'Gunakan hierarki heading dengan benar!' },
            { type: 'multiple-choice', question: 'Untuk judul UTAMA halaman, heading mana yang digunakan?', options: ['<h3>', '<h6>', '<h2>', '<h1>'], answer: 3, explanation: '<h1> digunakan untuk judul utama halaman — sebaiknya hanya ada satu h1 per halaman.' },
            { type: 'fill-code', instruction: 'Buat sub-bagian dengan heading level 3:', before: '<', blank: 'h3', after: '>Bagian Penting</h3>', answer: 'h3', explanation: 'h3 adalah heading level ketiga, digunakan untuk sub-bagian dari h2.' },
            { type: 'review', title: 'Ringkasan: Tingkatan Heading', points: ['Gunakan heading secara hierarkis', 'h1 = judul utama (satu per halaman)', 'h2 = bagian utama', 'h3 = sub-bagian dari h2'] }
          ]
        },
        {
          id: 3, title: 'Paragraph', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Tag Paragraph <p>', icon: '📄', content: 'Tag <p> digunakan untuk membuat paragraf teks. Browser secara otomatis memberikan jarak (margin) antara setiap paragraf. Setiap <p> baru dimulai di baris baru.' },
            { type: 'example', title: 'Contoh Paragraf', code: '<p>Ini adalah paragraf pertama. Berisi kalimat-kalimat yang terhubung.</p>\n\n<p>Ini adalah paragraf kedua. Browser otomatis memberi jarak antara paragraf.</p>\n\n<p>Paragraf ketiga. Setiap paragraf dimulai di baris baru.</p>' },
            { type: 'multiple-choice', question: 'Tag apa yang digunakan untuk membuat paragraf di HTML?', options: ['<para>', '<txt>', '<p>', '<text>'], answer: 2, explanation: 'Tag <p> (paragraph) digunakan untuk membuat paragraf teks.' },
            { type: 'fix-code', instruction: 'Perbaiki kode paragraf berikut:', brokenCode: '<p>Belajar HTML itu menyenangkan!<p>', fixHint: 'Tag penutup paragraf perlu tanda /', answer: '<p>Belajar HTML itu menyenangkan!</p>', checkTag: 'p', rules: { requiredTags: ['p'], wellFormed: ['p'] } },
            { type: 'fill-code', instruction: 'Buat tag paragraf yang benar:', before: '<', blank: 'p', after: '>Saya sedang belajar HTML.</p>', answer: 'p', explanation: 'Tag <p> membuka paragraf dan </p> menutupnya.' },
            { type: 'challenge', instruction: 'Buat dua paragraf: satu tentang dirimu dan satu tentang hobimu:', starterCode: '', rules: { requiredTags: ['p'], minCounts: { p: 2 }, nonEmptyText: { p: true } }, explanation: 'Pastikan menggunakan minimal 2 tag <p>, masing-masing berisi teks.' },
            { type: 'review', title: 'Ringkasan: Paragraph', points: ['Tag <p> untuk membuat paragraf', 'Browser memberi jarak otomatis antar paragraf', 'Setiap paragraf dimulai di baris baru', 'Selalu tutup dengan </p>'] }
          ]
        },
        {
          id: 4, title: 'BR dan HR', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Tag <br> — Line Break', icon: '↩️', content: 'Tag <br> digunakan untuk membuat baris baru (pindah baris) tanpa membuat paragraf baru. Tag <br> adalah self-closing — tidak perlu tag penutup.', code: '<p>Baris pertama.<br>\nBaris kedua.<br>\nBaris ketiga.</p>' },
            { type: 'material', title: 'Tag <hr> — Horizontal Rule', icon: '➖', content: 'Tag <hr> membuat garis horizontal yang memisahkan konten. Berguna untuk memisahkan bagian-bagian dalam halaman. Tag <hr> juga self-closing.', code: '<h2>Bagian 1</h2>\n<p>Konten bagian 1.</p>\n\n<hr>\n\n<h2>Bagian 2</h2>\n<p>Konten bagian 2.</p>' },
            { type: 'multiple-choice', question: 'Tag apa yang membuat baris baru (pindah baris) tanpa paragraf baru?', options: ['<newline>', '<break>', '<br>', '<ln>'], answer: 2, explanation: 'Tag <br> (break) membuat baris baru tanpa membuat paragraf baru.' },
            { type: 'multiple-choice', question: 'Tag apa yang membuat garis pemisah horizontal?', options: ['<line>', '<sep>', '<border>', '<hr>'], answer: 3, explanation: 'Tag <hr> (horizontal rule) membuat garis pemisah horizontal.' },
            { type: 'challenge', instruction: 'Buat puisi singkat: minimal 2 baris dipisahkan <br>, dan pisahkan bait dengan <hr>:', starterCode: '<p>Baris 1\n\nBaris 2\n\nBaris 3</p>', rules: { requiredTags: ['br', 'hr', 'p'], minCounts: { br: 2, hr: 1, p: 1 } }, explanation: 'Gunakan <br> untuk pindah baris dan <hr> untuk garis pemisah.' },
            { type: 'review', title: 'Ringkasan: BR & HR', points: ['<br> = baris baru (self-closing)', '<hr> = garis pemisah horizontal (self-closing)', 'Self-closing = tidak perlu tag penutup', 'Gunakan <br> untuk baris dalam paragraf'] }
          ]
        },
        {
          id: 5, title: 'Mini Project — Artikel Sederhana', xpReward: 30, isProject: true,
          slides: [
            { type: 'material', title: 'Project Artikel', icon: '📰', content: 'Kamu sudah menguasai heading dan paragraph. Sekarang buat artikel sederhana dengan hierarki heading yang benar, beberapa paragraf, dan garis pemisah.' },
            { type: 'mini-project', title: 'Artikel Sederhana', instruction: 'Buat artikel HTML dengan judul utama (h1), minimal 2 sub-judul (h2), beberapa paragraf (p), dan garis pemisah (hr) antar bagian.', starterCode: '<!DOCTYPE html>\n<html lang="id">\n<head>\n  <title>Artikel Saya</title>\n</head>\n<body>\n  <!-- Buat artikel di sini -->\n</body>\n</html>', checkItems: [
              { id: 'has-h1', label: 'Ada judul utama <h1>', checkStr: 'doc.querySelector("h1") !== null' },
              { id: 'has-h2', label: 'Ada minimal 2 sub-judul <h2>', checkStr: 'doc.querySelectorAll("h2").length >= 2' },
              { id: 'has-p', label: 'Ada minimal 2 paragraf <p>', checkStr: 'doc.querySelectorAll("p").length >= 2' },
              { id: 'has-hr', label: 'Ada garis pemisah <hr>', checkStr: 'doc.querySelector("hr") !== null' }
            ]}
          ]
        }
      ]
    },

    // ============================================================
    // LEVEL 4 — TEXT FORMATTING
    // ============================================================
    {
      id: 4, icon: '✍️', title: 'Text Formatting',
      description: 'Pelajari cara memformat teks dengan berbagai tag HTML',
      lessons: [
        {
          id: 1, title: 'Bold & Strong', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Tag <strong> dan <b>', icon: '💪', content: '<strong> membuat teks tebal DAN bermakna penting (semantik). <b> membuat teks tebal tanpa makna khusus. Gunakan <strong> jika teks memang penting, <b> jika hanya soal tampilan.', code: '<p>Ini <strong>sangat penting</strong> untuk diketahui.</p>\n<p>Ini hanya <b>tebal</b> secara tampilan.</p>' },
            { type: 'multiple-choice', question: 'Mana tag yang lebih direkomendasikan untuk menandai teks penting?', options: ['<b>', '<bold>', '<strong>', '<imp>'], answer: 2, explanation: '<strong> direkomendasikan karena memiliki makna semantik "penting", bukan sekadar tebal.' },
            { type: 'fill-code', instruction: 'Buat teks "HTML" menjadi tebal dan penting:', before: 'Belajar <', blank: 'strong', after: '>HTML</strong> itu seru!', answer: 'strong', explanation: 'Tag <strong> membuat teks tebal sekaligus menandainya sebagai penting.' },
            { type: 'challenge', instruction: 'Buat paragraf dengan kata kunci "PintuKoding" yang dibuat tebal dan penting:', starterCode: '<p>Belajar di  sangat menyenangkan!</p>', rules: { requiredTags: ['strong'], textInside: { strong: 'PintuKoding' }, forbiddenTags: ['b'] }, requiredText: 'PintuKoding', explanation: 'Gunakan <strong>PintuKoding</strong> — tag semantik, bukan <b>.' },
            { type: 'review', title: 'Ringkasan: Bold & Strong', points: ['<strong> = tebal + bermakna penting (direkomendasikan)', '<b> = tebal tanpa makna khusus', 'Keduanya membuat teks tampak tebal', 'Gunakan <strong> untuk teks yang benar-benar penting'] }
          ]
        },
        {
          id: 2, title: 'Italic & Emphasis', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Tag <em> dan <i>', icon: '✨', content: '<em> membuat teks miring (italic) dengan penekanan semantik. <i> membuat teks miring tanpa makna khusus, biasanya untuk istilah asing atau nama.', code: '<p>Kamu <em>harus</em> belajar HTML!</p>\n<p>Website dibuat dengan <i>HyperText Markup Language</i>.</p>' },
            { type: 'multiple-choice', question: 'Tag apa yang membuat teks miring dengan penekanan semantik?', options: ['<italic>', '<i>', '<em>', '<slant>'], answer: 2, explanation: '<em> (emphasis) membuat teks miring dan memberikan penekanan semantik.' },
            { type: 'fill-code', instruction: 'Buat kata "sangat" menjadi miring untuk penekanan:', before: 'HTML <', blank: 'em', after: '>sangat</em> berguna!', answer: 'em', explanation: 'Tag <em> memberikan penekanan pada kata "sangat".' },
            { type: 'drag-drop', instruction: 'Susun kode untuk membuat teks miring dengan emphasis:', tokens: ['</em>', '<em>', 'Penting!'], answer: ['<em>', 'Penting!', '</em>'] },
            { type: 'review', title: 'Ringkasan: Italic & Em', points: ['<em> = miring + penekanan semantik (direkomendasikan)', '<i> = miring tanpa makna khusus', '<i> cocok untuk istilah asing atau nama teknis', 'Keduanya membuat teks tampak miring'] }
          ]
        },
        {
          id: 3, title: 'Mark & Small', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Tag <mark> dan <small>', icon: '🖊️', content: '<mark> memberikan warna highlight kuning pada teks (seperti stabilo). <small> membuat teks lebih kecil dari ukuran normal, berguna untuk catatan kaki atau disclaimer.', code: '<p>Kata <mark>penting</mark> ini ditandai.</p>\n<p>Harga: Rp 50.000 <small>(belum termasuk pajak)</small></p>' },
            { type: 'multiple-choice', question: 'Tag apa yang membuat teks ter-highlight (seperti stabilo)?', options: ['<highlight>', '<yellow>', '<mark>', '<span>'], answer: 2, explanation: '<mark> memberikan background highlight (biasanya kuning) pada teks.' },
            { type: 'fill-code', instruction: 'Highlight kata "gratis" dalam kalimat:', before: 'Download <', blank: 'mark', after: '>gratis</mark> sekarang!', answer: 'mark', explanation: 'Tag <mark> membuat teks ter-highlight.' },
            { type: 'challenge', instruction: 'Buat paragraf yang menggunakan <mark>, <strong>, dan <em> sekaligus:', starterCode: '<p>Belajar HTML </p>', rules: { requiredTags: ['mark', 'strong', 'em'], minCounts: { p: 1 } }, explanation: 'Bagus! Kamu menggabungkan beberapa tag formatting.' },
            { type: 'review', title: 'Ringkasan: Mark & Small', points: ['<mark> = highlight teks (background kuning)', '<small> = teks lebih kecil dari normal', '<mark> bagus untuk menandai kata penting', '<small> bagus untuk catatan kaki'] }
          ]
        },
        {
          id: 4, title: 'Kombinasi Format', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Menggabungkan Tag Formatting', icon: '🎨', content: 'Kamu bisa menggabungkan beberapa tag formatting sekaligus! Pastikan tag yang dibuka pertama, ditutup terakhir (LIFO — Last In, First Out).', code: '<p>Ini <strong><em>sangat penting dan ditekankan</em></strong>.</p>\n<p>Ini <mark><strong>terhighlight dan tebal</strong></mark>.</p>' },
            { type: 'multiple-choice', question: 'Mana urutan penutupan tag yang BENAR untuk nesting?', options: ['<strong><em>teks</strong></em>', '<strong><em>teks</em></strong>', '<em><strong>teks</strong>', '<strong>teks<em></em>'], answer: 1, explanation: 'Tag yang dibuka terakhir harus ditutup pertama. <strong><em> → tutup </em></strong>.' },
            { type: 'fix-code', instruction: 'Perbaiki urutan penutupan tag yang salah:', brokenCode: '<p><strong><em>Teks Penting</strong></em></p>', fixHint: 'Tag yang dibuka terakhir harus ditutup pertama', answer: '<p><strong><em>Teks Penting</em></strong></p>', checkTag: 'p', rules: { requiredTags: ['p', 'strong', 'em'], wellFormed: ['p', 'strong', 'em'] } },
            { type: 'challenge', instruction: 'Buat teks dengan: bold (<strong>), italic (<em>), dan highlight (<mark>):', starterCode: '<p>Hari ini aku belajar HTML!</p>', rules: { requiredTags: ['strong', 'em', 'mark'], forbiddenTags: ['b', 'i'] }, explanation: 'Gunakan tag semantic: strong, em, dan mark — bukan b atau i.' },
            { type: 'review', title: 'Ringkasan: Kombinasi Format', points: ['Bisa menggabungkan beberapa tag formatting', 'Prinsip LIFO: yang dibuka terakhir, ditutup pertama', 'Jangan lupa menutup semua tag', 'Format yang tersedia: strong, b, em, i, mark, small'] }
          ]
        },
        {
          id: 5, title: 'Mini Project — Profil Singkat', xpReward: 30, isProject: true,
          slides: [
            { type: 'material', title: 'Project Profil', icon: '👤', content: 'Buat halaman profil singkat tentang dirimu menggunakan berbagai tag formatting HTML yang sudah kamu pelajari.' },
            { type: 'mini-project', title: 'Halaman Profil Singkat', instruction: 'Buat halaman profil menggunakan heading, paragraf, dan minimal 3 jenis text formatting yang berbeda (strong, em, mark, small, dll).', starterCode: '<!DOCTYPE html>\n<html lang="id">\n<head>\n  <title>Profil Saya</title>\n</head>\n<body>\n  <!-- Buat profil singkat di sini -->\n</body>\n</html>', checkItems: [
              { id: 'has-h1', label: 'Ada nama sebagai heading <h1>', checkStr: 'doc.querySelector("h1") !== null' },
              { id: 'has-p', label: 'Ada minimal 2 paragraf', checkStr: 'doc.querySelectorAll("p").length >= 2' },
              { id: 'has-strong', label: 'Ada teks tebal <strong> atau <b>', checkStr: 'doc.querySelector("strong, b") !== null' },
              { id: 'has-em', label: 'Ada teks miring <em> atau <i>', checkStr: 'doc.querySelector("em, i") !== null' }
            ]}
          ]
        }
      ]
    },

    // ============================================================
    // LEVEL 5 — LINK
    // ============================================================
    {
      id: 5, icon: '🔗', title: 'Link',
      description: 'Pelajari cara membuat hyperlink untuk menghubungkan halaman',
      lessons: [
        {
          id: 1, title: 'Tag Anchor', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Tag <a> — Anchor', icon: '⚓', content: 'Tag <a> digunakan untuk membuat hyperlink (tautan). Attribute href menentukan tujuan link. Teks di antara tag <a> dan </a> adalah yang diklik pengguna.', code: '<a href="https://google.com">Kunjungi Google</a>\n<a href="halaman2.html">Ke Halaman 2</a>' },
            { type: 'multiple-choice', question: 'Attribute apa yang menentukan TUJUAN dari sebuah link?', options: ['src', 'url', 'href', 'link'], answer: 2, explanation: 'Attribute href (hypertext reference) menentukan URL tujuan link.' },
            { type: 'fill-code', instruction: 'Lengkapi link ke website PintuKoding:', before: '<a ', blank: 'href', after: '="https://pintukoding.com">PintuKoding</a>', answer: 'href', explanation: 'Attribute href menentukan tujuan link.' },
            { type: 'challenge', instruction: 'Buat link ke "https://google.com" dengan teks "Cari di Google":', starterCode: '', rules: { requiredTags: ['a'], attributes: { a: { href: 'https://google.com' } }, textInside: { a: 'Cari di Google' } }, explanation: 'Gunakan <a href="https://google.com">Cari di Google</a>.' },
            { type: 'review', title: 'Ringkasan: Tag Anchor', points: ['Tag <a> untuk membuat hyperlink', 'Attribute href untuk URL tujuan', 'Teks antara <a>...</a> yang diklik', 'href bisa URL lengkap atau nama file'] }
          ]
        },
        {
          id: 2, title: 'External & Internal Link', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'External Link', icon: '🌐', content: 'External link adalah link ke website lain. Gunakan URL lengkap (https://...). Tambahkan target="_blank" agar link terbuka di tab baru.', code: '<a href="https://google.com" target="_blank">Google</a>\n<a href="https://youtube.com" target="_blank" rel="noopener">YouTube</a>' },
            { type: 'material', title: 'Internal Link', icon: '🏠', content: 'Internal link adalah link ke halaman lain dalam website yang sama, atau ke bagian dalam halaman yang sama menggunakan ID.', code: '<a href="tentang.html">Tentang Saya</a>\n<a href="#bagian1">Ke Bagian 1</a>' },
            { type: 'multiple-choice', question: 'Attribute apa yang membuat link terbuka di tab baru?', options: ['newtab="_true"', 'target="_blank"', 'open="new"', 'tab="new"'], answer: 1, explanation: 'target="_blank" membuat link terbuka di tab baru.' },
            { type: 'fill-code', instruction: 'Tambahkan target agar link terbuka di tab baru:', before: '<a href="https://example.com" ', blank: 'target', after: '="_blank">Kunjungi</a>', answer: 'target', explanation: 'Attribute target="_blank" membuka link di tab baru.' },
            { type: 'challenge', instruction: 'Buat 2 link: satu ke Google (tab baru, target="_blank") dan satu ke "#kontak" (internal):', starterCode: '', rules: { requiredTags: ['a'], minCounts: { a: 2 }, attributes: { a: { target: '_blank', href: '#kontak' } }, requiredAttributes: { a: ['href'] } }, explanation: 'Gunakan target="_blank" untuk external dan href="#kontak" untuk internal.' },
            { type: 'review', title: 'Ringkasan: Link', points: ['External link = URL lengkap (https://...)', 'Internal link = nama file atau #id', 'target="_blank" = buka di tab baru', 'rel="noopener" untuk keamanan external link'] }
          ]
        },
        {
          id: 3, title: 'Styling Link', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Attribute Link Tambahan', icon: '🎨', content: 'Tag <a> punya beberapa attribute berguna: title (tooltip), download (untuk download file), dan rel (hubungan dengan halaman tujuan).', code: '<a href="foto.jpg" download>Download Foto</a>\n<a href="https://example.com" title="Pergi ke Example">Example</a>' },
            { type: 'multiple-choice', question: 'Attribute apa yang membuat link men-download file alih-alih membukanya?', options: ['save', 'file', 'get', 'download'], answer: 3, explanation: 'Attribute download membuat browser men-download file yang ditautkan.' },
            { type: 'fill-code', instruction: 'Buat link yang menampilkan tooltip "Buka website":', before: '<a href="https://example.com" ', blank: 'title', after: '="Buka website">Example</a>', answer: 'title', explanation: 'Attribute title menampilkan tooltip saat mouse di atas link.' },
            { type: 'challenge', instruction: 'Buat link dengan href, target="_blank", dan title attribute sekaligus:', starterCode: '<a >Kunjungi Website</a>', rules: { requiredTags: ['a'], requiredAttributes: { a: ['href', 'title'] }, attributes: { a: { target: '_blank' } }, requiredText: 'Kunjungi Website' }, requiredText: 'Kunjungi Website', explanation: 'Kombinasikan href, target, dan title dalam satu tag <a>.' },
            { type: 'review', title: 'Ringkasan: Link Attributes', points: ['href = tujuan link (wajib)', 'target="_blank" = buka tab baru', 'title = tooltip text', 'download = unduh file', 'rel = hubungan konten'] }
          ]
        },
        {
          id: 4, title: 'Link Tips & Tricks', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Best Practices Link', icon: '💡', content: 'Tips menggunakan link HTML yang baik: gunakan teks deskriptif (bukan "klik di sini"), tambahkan rel="noopener" untuk external link, dan pastikan URL sudah benar.', code: '<!-- BURUK: -->\n<a href="page.html">Klik di sini</a>\n\n<!-- BAIK: -->\n<a href="page.html">Baca artikel tentang HTML</a>\n\n<!-- External dengan keamanan: -->\n<a href="https://example.com" target="_blank" rel="noopener noreferrer">Kunjungi Example</a>' },
            { type: 'multiple-choice', question: 'Mana teks link yang LEBIH BAIK?', options: ['"Klik di sini"', '"Baca selengkapnya"', '"Tutorial HTML Lengkap"', '"Link"'], answer: 2, explanation: '"Tutorial HTML Lengkap" adalah yang terbaik — deskriptif dan menjelaskan isi link.' },
            { type: 'challenge', instruction: 'Buat daftar 3 link favorit dengan teks deskriptif dan target="_blank":', starterCode: '<ul>\n  <li></li>\n  <li></li>\n  <li></li>\n</ul>', rules: { requiredTags: ['ul', 'a', 'li'], minCounts: { a: 3, li: 3 }, requiredAttributes: { a: ['href'] }, attributes: { a: { target: '_blank' } }, nonEmptyText: { a: true } }, explanation: 'Setiap link harus punya href, target="_blank", dan teks deskriptif!' },
            { type: 'review', title: 'Ringkasan: Tips Link', points: ['Gunakan teks link yang deskriptif', 'Tambahkan rel="noopener noreferrer" untuk external link', 'Pastikan URL sudah benar sebelum publish', 'Link internal gunakan path relatif'] }
          ]
        },
        {
          id: 5, title: 'Mini Project — Link Favorit', xpReward: 30, isProject: true,
          slides: [
            { type: 'material', title: 'Project Link Favorit', icon: '🔗', content: 'Buat halaman daftar link favorit kamu! Halaman ini akan memiliki judul, beberapa link ke website favorit, dan deskripsi singkat untuk masing-masing link.' },
            { type: 'mini-project', title: 'Halaman Link Favorit', instruction: 'Buat halaman dengan minimal 3 link ke website favorit. Setiap link harus memiliki teks deskriptif, href yang valid, dan terbuka di tab baru.', starterCode: '<!DOCTYPE html>\n<html lang="id">\n<head>\n  <title>Link Favorit Saya</title>\n</head>\n<body>\n  <h1>Website Favorit Saya</h1>\n  <!-- Tambahkan link di sini -->\n</body>\n</html>', checkItems: [
              { id: 'has-h1', label: 'Ada judul halaman <h1>', checkStr: 'doc.querySelector("h1") !== null' },
              { id: 'has-links', label: 'Ada minimal 3 link <a>', checkStr: 'doc.querySelectorAll("a").length >= 3' },
              { id: 'has-href', label: 'Semua link memiliki attribute href', checkStr: 'Array.from(doc.querySelectorAll("a")).every(a => a.hasAttribute("href"))' },
              { id: 'has-target', label: 'Ada link yang terbuka di tab baru', checkStr: 'doc.querySelector(\'a[target="_blank"]\') !== null' }
            ]}
          ]
        }
      ]
    },

    // ============================================================
    // LEVEL 6 — IMAGE
    // ============================================================
    {
      id: 6, icon: '🖼️', title: 'Image',
      description: 'Pelajari cara menampilkan gambar di halaman web',
      lessons: [
        {
          id: 1, title: 'Tag Img', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Tag <img>', icon: '🖼️', content: 'Tag <img> digunakan untuk menampilkan gambar. Tag ini adalah self-closing — tidak perlu tag penutup. Attribute src menentukan lokasi file gambar.', code: '<img src="foto.jpg">\n<img src="https://placehold.co/300">' },
            { type: 'multiple-choice', question: 'Attribute apa yang menentukan lokasi file gambar?', options: ['href', 'link', 'source', 'src'], answer: 3, explanation: 'Attribute src (source) menentukan path atau URL gambar yang akan ditampilkan.' },
            { type: 'fill-code', instruction: 'Lengkapi tag img untuk menampilkan foto:', before: '<img ', blank: 'src', after: '="foto.jpg">', answer: 'src', explanation: 'Attribute src menentukan lokasi gambar.' },
            { type: 'multiple-choice', question: 'Kenapa <img> tidak perlu tag penutup?', options: ['Karena gambar terlalu besar', 'Karena img adalah self-closing tag', 'Karena browser melakukannya otomatis', 'Karena itu aturan baru HTML5'], answer: 1, explanation: 'Tag <img> adalah self-closing tag — ia tidak memiliki konten di dalamnya, jadi tidak perlu tag penutup.' },
            { type: 'review', title: 'Ringkasan: Tag Img', points: ['<img> untuk menampilkan gambar', 'Attribute src = lokasi gambar', '<img> adalah self-closing (tidak perlu </img>)', 'src bisa URL online atau path file lokal'] }
          ]
        },
        {
          id: 2, title: 'Alt Text', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Attribute Alt', icon: '♿', content: 'Attribute alt (alternative text) adalah deskripsi teks dari gambar. Sangat penting untuk: aksesibilitas (pembaca layar), SEO, dan ditampilkan saat gambar gagal dimuat.', code: '<img src="kucing.jpg" alt="Kucing oranye sedang tidur">\n<img src="logo.png" alt="Logo PintuKoding">' },
            { type: 'multiple-choice', question: 'Apa KEGUNAAN attribute alt pada gambar?', options: ['Mengubah ukuran gambar', 'Menambah border gambar', 'Deskripsi gambar untuk aksesibilitas & SEO', 'Membuat gambar bergerak'], answer: 2, explanation: 'Alt text penting untuk aksesibilitas, SEO, dan ditampilkan saat gambar gagal dimuat.' },
            { type: 'fill-code', instruction: 'Tambahkan alt text yang deskriptif pada gambar:', before: '<img src="pemandangan.jpg" ', blank: 'alt', after: '="Pemandangan gunung berselimut salju">', answer: 'alt', explanation: 'Attribute alt berisi deskripsi gambar yang bermakna.' },
            { type: 'challenge', instruction: 'Buat gambar dengan src dan alt text yang deskriptif:', starterCode: '', rules: { requiredTags: ['img'], requiredAttributes: { img: ['src'] }, nonEmptyAttributes: { img: ['alt'] } }, explanation: 'Selalu sertakan alt text yang bermakna — dan tidak kosong!' },
            { type: 'review', title: 'Ringkasan: Alt Text', points: ['alt = deskripsi teks gambar', 'Wajib ada untuk aksesibilitas', 'Membantu SEO (mesin pencari)', 'Ditampilkan jika gambar gagal dimuat'] }
          ]
        },
        {
          id: 3, title: 'Width & Height', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Ukuran Gambar', icon: '📐', content: 'Attribute width dan height mengatur ukuran gambar. Nilainya bisa pixel (angka saja) atau persentase. Jika hanya satu yang diatur, yang lain menyesuaikan otomatis.', code: '<img src="foto.jpg" alt="Foto" width="300" height="200">\n<img src="foto.jpg" alt="Foto" width="50%">' },
            { type: 'fill-code', instruction: 'Atur lebar gambar menjadi 300 pixel:', before: '<img src="foto.jpg" alt="Foto" ', blank: 'width', after: '="300">', answer: 'width', explanation: 'Attribute width mengatur lebar gambar dalam pixel.' },
            { type: 'multiple-choice', question: 'Jika kamu hanya mengatur width, apa yang terjadi pada height?', options: ['Height menjadi 0', 'Height tidak berubah', 'Height menyesuaikan proporsional', 'Height menjadi sama dengan width'], answer: 2, explanation: 'Jika hanya width yang diatur, height akan menyesuaikan secara proporsional.' },
            { type: 'challenge', instruction: 'Buat gambar dengan width="200", height="150", dan alt text:', starterCode: '', rules: { requiredTags: ['img'], requiredAttributes: { img: ['src'] }, nonEmptyAttributes: { img: ['alt'] }, attributes: { img: { width: '200', height: '150' } } }, explanation: 'Gunakan width="200", height="150", dan alt sekaligus untuk gambar yang baik.' },
            { type: 'review', title: 'Ringkasan: Width & Height', points: ['width = lebar gambar', 'height = tinggi gambar', 'Nilai dalam pixel (angka) atau %', 'Jika satu diatur, yang lain proporsional'] }
          ]
        },
        {
          id: 4, title: 'Image Tips', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Path Gambar', icon: '📁', content: 'Ada dua jenis path untuk gambar: relatif (file di komputer kamu) dan absolut (URL online). Untuk latihan, gunakan URL gambar online yang tersedia gratis.', code: '<!-- Path Relatif (file lokal) -->\n<img src="foto.jpg" alt="Foto">\n<img src="images/banner.jpg" alt="Banner">\n\n<!-- URL Absolut (online) -->\n<img src="https://placehold.co/400x200" alt="Placeholder">' },
            { type: 'multiple-choice', question: 'Mana yang merupakan URL gambar ABSOLUT?', options: ['images/foto.jpg', '../foto.jpg', 'https://example.com/foto.jpg', './foto.jpg'], answer: 2, explanation: 'URL absolut dimulai dengan https:// dan menunjuk ke gambar di internet.' },
            { type: 'challenge', instruction: 'Buat halaman dengan 2 gambar dari URL online yang berbeda, masing-masing dengan alt dan width:', starterCode: '<!DOCTYPE html>\n<html>\n<body>\n  \n</body>\n</html>', rules: { requiredTags: ['img'], minCounts: { img: 2 }, requiredAttributes: { img: ['src', 'width'] }, nonEmptyAttributes: { img: ['alt'] } }, explanation: '2 gambar dari URL online, masing-masing dengan alt terisi dan width.' },
            { type: 'review', title: 'Ringkasan: Image Tips', points: ['Path relatif = file di komputer lokal', 'Path absolut = URL lengkap dengan https://', 'Selalu tambahkan alt text', 'Atur width/height untuk menghindari layout shift'] }
          ]
        },
        {
          id: 5, title: 'Mini Project — Galeri Sederhana', xpReward: 30, isProject: true,
          slides: [
            { type: 'material', title: 'Project Galeri', icon: '🖼️', content: 'Buat galeri foto sederhana dengan beberapa gambar yang memiliki judul dan deskripsi. Gunakan gambar dari URL online.' },
            { type: 'mini-project', title: 'Galeri HTML Sederhana', instruction: 'Buat halaman galeri dengan minimal 3 gambar. Setiap gambar harus memiliki src, alt, dan width. Tambahkan judul dan caption untuk setiap gambar.', starterCode: '<!DOCTYPE html>\n<html lang="id">\n<head>\n  <title>Galeri Foto Saya</title>\n</head>\n<body>\n  <h1>Galeri Foto</h1>\n  <!-- Tambahkan gambar di sini -->\n</body>\n</html>', checkItems: [
              { id: 'has-h1', label: 'Ada judul galeri <h1>', checkStr: 'doc.querySelector("h1") !== null' },
              { id: 'has-3-imgs', label: 'Ada minimal 3 gambar <img>', checkStr: 'doc.querySelectorAll("img").length >= 3' },
              { id: 'has-alt', label: 'Semua gambar memiliki alt text yang tidak kosong', checkStr: 'Array.from(doc.querySelectorAll("img")).every(img => img.hasAttribute("alt") && img.getAttribute("alt").trim() !== "")' },
              { id: 'has-src', label: 'Semua gambar memiliki src', checkStr: 'Array.from(doc.querySelectorAll("img")).every(img => img.hasAttribute("src"))' },
              { id: 'has-width', label: 'Semua gambar memiliki width', checkStr: 'Array.from(doc.querySelectorAll("img")).every(img => img.hasAttribute("width"))' }
            ]}
          ]
        }
      ]
    },

    // ============================================================
    // LEVEL 7 — LIST
    // ============================================================
    {
      id: 7, icon: '📋', title: 'List',
      description: 'Pelajari cara membuat daftar tak berurutan dan berurutan',
      lessons: [
        {
          id: 1, title: 'Unordered List', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Unordered List <ul>', icon: '•', content: '<ul> membuat daftar tidak berurutan dengan bullet point. Setiap item dalam list menggunakan tag <li>.', code: '<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n  <li>JavaScript</li>\n</ul>' },
            { type: 'multiple-choice', question: 'Tag apa yang digunakan untuk setiap item dalam list?', options: ['<item>', '<list>', '<li>', '<bullet>'], answer: 2, explanation: '<li> (list item) digunakan untuk setiap item dalam <ul> atau <ol>.' },
            { type: 'fill-code', instruction: 'Buat list item pertama:', before: '<ul>\n  <', blank: 'li', after: '>Belajar HTML</li>\n</ul>', answer: 'li', explanation: 'Tag <li> membuat satu item dalam list.' },
            { type: 'drag-drop', instruction: 'Susun kode ul yang benar:', tokens: ['</ul>', '<ul>', '<li>HTML</li>'], answer: ['<ul>', '<li>HTML</li>', '</ul>'] },
            { type: 'review', title: 'Ringkasan: Unordered List', points: ['<ul> = unordered list (bullet point)', '<li> = list item', 'Setiap item adalah <li>...</li>', '<ul> digunakan untuk daftar yang tidak berurutan'] }
          ]
        },
        {
          id: 2, title: 'Ordered List', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Ordered List <ol>', icon: '1️⃣', content: '<ol> membuat daftar berurutan dengan nomor. Cocok untuk langkah-langkah, ranking, atau prosedur yang perlu urutan.', code: '<ol>\n  <li>Buka editor teks</li>\n  <li>Tulis kode HTML</li>\n  <li>Simpan file</li>\n  <li>Buka di browser</li>\n</ol>' },
            { type: 'multiple-choice', question: 'Kapan sebaiknya menggunakan <ol> daripada <ul>?', options: ['Untuk daftar warna favorit', 'Untuk langkah-langkah resep masak', 'Untuk daftar nama teman', 'Untuk daftar hobi'], answer: 1, explanation: '<ol> cocok untuk langkah-langkah atau hal yang PUNYA URUTAN PENTING.' },
            { type: 'fill-code', instruction: 'Buat ordered list yang dimulai dari angka 1:', before: '<', blank: 'ol', after: '>\n  <li>Langkah 1</li>\n</ol>', answer: 'ol', explanation: 'Tag <ol> membuat ordered list dengan penomoran otomatis.' },
            { type: 'challenge', instruction: 'Buat langkah-langkah membuat website menggunakan <ol> (minimal 3 langkah):', starterCode: '', rules: { requiredTags: ['ol', 'li'], minCounts: { li: 3 }, nonEmptyText: { li: true } }, explanation: 'Gunakan <ol> untuk langkah-langkah yang berurutan!' },
            { type: 'review', title: 'Ringkasan: Ordered List', points: ['<ol> = ordered list (bernomor)', '<li> = list item (sama seperti ul)', 'Nomor otomatis dimulai dari 1', 'Gunakan <ol> untuk langkah berurutan'] }
          ]
        },
        {
          id: 3, title: 'Nested List', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'List Bersarang', icon: '🗂️', content: 'List bisa disarangkan (nested) — list di dalam list. Ini berguna untuk membuat daftar dengan sub-kategori.', code: '<ul>\n  <li>Frontend\n    <ul>\n      <li>HTML</li>\n      <li>CSS</li>\n    </ul>\n  </li>\n  <li>Backend</li>\n</ul>' },
            { type: 'multiple-choice', question: 'Di mana sub-list diletakkan dalam HTML?', options: ['Setelah </ul>', 'Di dalam <li> dari list utama', 'Sebelum <ul>', 'Setelah </li>'], answer: 1, explanation: 'Sub-list diletakkan di dalam <li> dari list utama, sebelum tag </li> penutup.' },
            { type: 'challenge', instruction: 'Buat nested list: list mata pelajaran dengan sub-list topiknya:', starterCode: '<ul>\n  <li>Matematika\n    <ul>\n      \n    </ul>\n  </li>\n</ul>', rules: { requiredTags: ['ul'], minCounts: { li: 3 }, selectors: ['ul li ul'] }, explanation: 'Nested list: sub-list harus benar-benar berada DI DALAM <li>.' },
            { type: 'review', title: 'Ringkasan: Nested List', points: ['List bisa bersarang di dalam list lain', 'Sub-list diletakkan di dalam <li>', 'Bisa mix ul dan ol dalam nesting', 'Perhatikan indentasi untuk keterbacaan'] }
          ]
        },
        {
          id: 4, title: 'List Styling', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'List dengan Style Inline', icon: '🎨', content: 'Kamu bisa mengubah tampilan list dengan CSS inline. Beberapa opsi list-style-type untuk ul: disc, circle, square. Untuk ol: decimal, upper-alpha, lower-roman.', code: '<ul style="list-style-type: square">\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>\n\n<ol style="list-style-type: upper-alpha">\n  <li>Item A</li>\n  <li>Item B</li>\n</ol>' },
            { type: 'multiple-choice', question: 'Mana style yang membuat ol menggunakan huruf kapital (A, B, C)?', options: ['list-style-type: alpha', 'list-style-type: upper-roman', 'list-style-type: upper-alpha', 'list-style-type: letters'], answer: 2, explanation: 'list-style-type: upper-alpha membuat ol menggunakan A, B, C, D...' },
            { type: 'challenge', instruction: 'Buat dua list: ul dengan style bullet kotak (list-style-type: square) dan ol dengan huruf besar (list-style-type: upper-alpha):', starterCode: '', rules: { requiredTags: ['ul', 'ol', 'li'], attributeContains: { ul: { style: 'square' }, ol: { style: 'upper-alpha' } } }, explanation: 'Gunakan style="list-style-type:..." untuk mengubah tampilan list.' },
            { type: 'review', title: 'Ringkasan: List Styling', points: ['list-style-type mengubah jenis bullet/nomor', 'ul: disc (default), circle, square, none', 'ol: decimal, upper-alpha, lower-roman, dll', 'Gunakan CSS inline dengan attribute style'] }
          ]
        },
        {
          id: 5, title: 'Mini Project — Daftar Favorit', xpReward: 30, isProject: true,
          slides: [
            { type: 'material', title: 'Project Daftar Favorit', icon: '📋', content: 'Buat halaman "Daftar Favorit" yang menampilkan daftar film, buku, atau musik favoritmu menggunakan ul dan ol!' },
            { type: 'mini-project', title: 'Daftar Favorit', instruction: 'Buat halaman dengan setidaknya satu unordered list (ul) dan satu ordered list (ol). Isi dengan konten favoritmu dan buat hierarki dengan nested list.', starterCode: '<!DOCTYPE html>\n<html lang="id">\n<head>\n  <title>Daftar Favorit Saya</title>\n</head>\n<body>\n  <h1>Favorit Saya</h1>\n</body>\n</html>', checkItems: [
              { id: 'has-h1', label: 'Ada judul <h1>', checkStr: 'doc.querySelector("h1") !== null' },
              { id: 'has-ul', label: 'Ada unordered list <ul>', checkStr: 'doc.querySelector("ul") !== null' },
              { id: 'has-ol', label: 'Ada ordered list <ol>', checkStr: 'doc.querySelector("ol") !== null' },
              { id: 'has-li', label: 'Ada minimal 4 list items', checkStr: 'doc.querySelectorAll("li").length >= 4' },
              { id: 'has-nested', label: 'Ada nested list (sub-list di dalam <li>)', checkStr: 'doc.querySelector("ul ul, ul ol, ol ul, ol ol") !== null' }
            ]}
          ]
        }
      ]
    },

    // ============================================================
    // LEVEL 8 — BUTTON
    // ============================================================
    {
      id: 8, icon: '🔘', title: 'Button',
      description: 'Pelajari cara membuat tombol interaktif di HTML',
      lessons: [
        {
          id: 1, title: 'Tag Button', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Tag <button>', icon: '🖱️', content: 'Tag <button> digunakan untuk membuat tombol yang bisa diklik. Berbeda dengan link, button biasanya digunakan untuk aksi (submit form, jalankan JavaScript).', code: '<button>Klik Saya!</button>\n<button type="button">Tombol Biasa</button>' },
            { type: 'multiple-choice', question: 'Apa perbedaan utama antara <button> dan <a>?', options: ['Tidak ada perbedaan', '<button> untuk aksi, <a> untuk navigasi', '<a> lebih baik', '<button> hanya untuk form'], answer: 1, explanation: '<button> untuk aksi (submit, click events), <a> untuk navigasi ke halaman lain.' },
            { type: 'fill-code', instruction: 'Buat tombol dengan teks "Mulai Belajar":', before: '<', blank: 'button', after: '>Mulai Belajar</button>', answer: 'button', explanation: 'Tag <button> membuat elemen tombol yang bisa diklik.' },
            { type: 'challenge', instruction: 'Buat tombol yang menampilkan alert saat diklik: onclick="alert(\'Halo!\')"', starterCode: '', rules: { requiredTags: ['button'], attributeContains: { button: { onclick: 'alert' } }, nonEmptyText: { button: true } }, explanation: 'Gunakan onclick="alert(\'Halo!\')" untuk aksi saat tombol diklik.' },
            { type: 'review', title: 'Ringkasan: Tag Button', points: ['<button> untuk membuat tombol', 'Button berbeda dengan link <a>', 'Button bisa diberi aksi dengan onclick', 'Teks antara <button>...</button> ditampilkan di tombol'] }
          ]
        },
        {
          id: 2, title: 'Button Types', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Jenis-Jenis Button', icon: '🔤', content: 'Ada 3 jenis button berdasarkan attribute type: submit (kirim form), reset (reset form), dan button (tidak ada aksi default). Gunakan type yang sesuai!', code: '<button type="submit">Kirim Form</button>\n<button type="reset">Reset Form</button>\n<button type="button">Tombol Biasa</button>' },
            { type: 'multiple-choice', question: 'Type button apa yang digunakan untuk mengirim form?', options: ['type="send"', 'type="post"', 'type="submit"', 'type="form"'], answer: 2, explanation: 'type="submit" membuat button yang mengirimkan form ketika diklik.' },
            { type: 'fill-code', instruction: 'Tambahkan type yang benar untuk tombol reset form:', before: '<button ', blank: 'type', after: '="reset">Hapus</button>', answer: 'type', explanation: 'Attribute type menentukan perilaku button.' },
            { type: 'drag-drop', instruction: 'Susun button submit yang benar:', tokens: ['type="submit"', '<button', '>Kirim</button>'], answer: ['<button', 'type="submit"', '>Kirim</button>'] },
            { type: 'review', title: 'Ringkasan: Button Types', points: ['type="submit" = kirim form (default)', 'type="reset" = reset isi form', 'type="button" = tidak ada aksi default', 'Selalu tambahkan type untuk kejelasan'] }
          ]
        },
        {
          id: 3, title: 'Button Attributes', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Attribute Button', icon: '⚙️', content: 'Button memiliki attribute penting: disabled (nonaktifkan tombol), name, value, dan form. Button disabled tidak bisa diklik.', code: '<button disabled>Tidak Bisa Diklik</button>\n<button type="button" onclick="alert(\'Klik!\')">Klik!</button>' },
            { type: 'multiple-choice', question: 'Attribute apa yang membuat button tidak bisa diklik?', options: ['inactive', 'readonly', 'disabled', 'locked'], answer: 2, explanation: 'Attribute disabled membuat button tidak bisa diklik dan terlihat abu-abu.' },
            { type: 'fix-code', instruction: 'Perbaiki syntax button dengan onclick:', brokenCode: '<button onclick=alert("Halo")>Klik</button>', fixHint: 'Attribute onclick harus menggunakan tanda kutip', answer: "<button onclick=\"alert('Halo')\">Klik</button>", checkTag: 'button', rules: { requiredTags: ['button'], rawMatch: [{ pattern: 'onclick\\s*=\\s*[\'"]', flags: 'i', message: 'Nilai attribute onclick harus ditulis di dalam tanda kutip, contoh: onclick="alert(\'Halo\')".', hint: 'Bungkus nilai attribute dengan tanda kutip: onclick="..."' }] } },
            { type: 'challenge', instruction: 'Buat 2 button: satu aktif dengan onclick alert, dan satu dengan attribute disabled:', starterCode: '', rules: { requiredTags: ['button'], minCounts: { button: 2 }, attributeContains: { button: { onclick: 'alert' } }, attributes: { button: { disabled: true } } }, explanation: 'Satu button dengan onclick dan satu dengan disabled.' },
            { type: 'review', title: 'Ringkasan: Button Attributes', points: ['disabled = tombol tidak aktif', 'onclick = aksi saat diklik', 'name & value = untuk form submission', 'Gunakan type yang tepat selalu'] }
          ]
        },
        {
          id: 4, title: 'Button Praktis', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Button dengan Aksi', icon: '⚡', content: 'Button sangat berguna dengan JavaScript! Dengan onclick, kamu bisa membuat alert, mengubah teks, atau menampilkan pesan. Ini adalah dasar interaktivitas web.', code: '<button onclick="alert(\'Halo, Dunia!\')">Sapa Dunia</button>\n\n<button onclick="document.title=\'PintuKoding\'">Ubah Judul</button>' },
            { type: 'challenge', instruction: 'Buat tombol "Hitung" yang menampilkan alert berisi "2 + 2 = 4":', starterCode: '', rules: { requiredTags: ['button'], textInside: { button: 'Hitung' }, attributeContains: { button: { onclick: '2 + 2 = 4' } } }, explanation: 'Gunakan onclick="alert(\'2 + 2 = 4\')".' },
            { type: 'multiple-choice', question: 'Fungsi alert() di JavaScript digunakan untuk...', options: ['Memberi warna tombol', 'Menampilkan kotak dialog pesan', 'Menghapus elemen', 'Mengubah ukuran teks'], answer: 1, explanation: 'alert() menampilkan kotak dialog dengan pesan, dan tombol OK.' },
            { type: 'review', title: 'Ringkasan: Button Praktis', points: ['onclick untuk aksi saat diklik', 'alert() menampilkan dialog pesan', 'Button adalah dasar interaktivitas web', 'Gunakan JavaScript untuk aksi yang lebih kompleks'] }
          ]
        },
        {
          id: 5, title: 'Mini Project — Halaman Button', xpReward: 30, isProject: true,
          slides: [
            { type: 'material', title: 'Project Halaman Button', icon: '🔘', content: 'Buat halaman demo tombol yang menampilkan berbagai jenis button dengan aksi yang berbeda-beda.' },
            { type: 'mini-project', title: 'Halaman Demo Button', instruction: 'Buat halaman dengan minimal 3 button berbeda: satu dengan onclick alert, satu disabled, dan satu dengan type="reset". Tambahkan deskripsi untuk masing-masing.', starterCode: '<!DOCTYPE html>\n<html lang="id">\n<head>\n  <title>Demo Button</title>\n</head>\n<body>\n  <h1>Demo Tombol HTML</h1>\n</body>\n</html>', checkItems: [
              { id: 'has-h1', label: 'Ada judul halaman', checkStr: 'doc.querySelector("h1") !== null' },
              { id: 'has-3-btns', label: 'Ada minimal 3 button', checkStr: 'doc.querySelectorAll("button").length >= 3' },
              { id: 'has-disabled', label: 'Ada button disabled', checkStr: 'doc.querySelector("button[disabled]") !== null' },
              { id: 'has-onclick', label: 'Ada button dengan onclick', checkStr: 'doc.querySelector("button[onclick]") !== null' }
            ]}
          ]
        }
      ]
    },

    // ============================================================
    // LEVEL 9 — FORM
    // ============================================================
    {
      id: 9, icon: '📝', title: 'Form',
      description: 'Pelajari cara membuat formulir untuk input data pengguna',
      lessons: [
        {
          id: 1, title: 'Tag Form', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Tag <form>', icon: '📋', content: 'Tag <form> adalah container untuk elemen input. Attribute action menentukan ke mana data dikirim, dan method menentukan cara pengiriman (GET atau POST).', code: '<form action="/submit" method="POST">\n  <!-- Input fields di sini -->\n</form>' },
            { type: 'multiple-choice', question: 'Attribute form apa yang menentukan ke mana data dikirim?', options: ['method', 'target', 'action', 'send'], answer: 2, explanation: 'Attribute action menentukan URL tujuan pengiriman data form.' },
            { type: 'fill-code', instruction: 'Lengkapi form dengan method POST:', before: '<form action="/login" ', blank: 'method', after: '="POST">', answer: 'method', explanation: 'method="POST" mengirim data secara tersembunyi. method="GET" menampilkan di URL.' },
            { type: 'review', title: 'Ringkasan: Tag Form', points: ['<form> = container untuk input', 'action = tujuan pengiriman data', 'method = cara kirim (GET/POST)', 'Semua input ada di dalam <form>'] }
          ]
        },
        {
          id: 2, title: 'Input Fields', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Tag <input>', icon: '📝', content: 'Tag <input> adalah self-closing dan digunakan untuk berbagai jenis input. Attribute type menentukan jenis input: text, email, password, number, dll.', code: '<input type="text" placeholder="Nama kamu">\n<input type="email" placeholder="Email kamu">\n<input type="password" placeholder="Kata sandi">\n<input type="number" min="1" max="100">' },
            { type: 'multiple-choice', question: 'Attribute apa yang menentukan jenis input (teks, email, password)?', options: ['kind', 'mode', 'type', 'style'], answer: 2, explanation: 'Attribute type menentukan jenis input. Contoh: type="email" untuk input email.' },
            { type: 'fill-code', instruction: 'Buat input untuk email:', before: '<input ', blank: 'type', after: '="email" placeholder="Email Anda">', answer: 'type', explanation: 'type="email" membuat input khusus email dengan validasi otomatis.' },
            { type: 'challenge', instruction: 'Buat form dengan 3 input berbeda: text, email, dan password:', starterCode: '<form>\n\n</form>', rules: { requiredTags: ['form', 'input'], requiredValues: { input: { type: ['text', 'email', 'password'] } } }, explanation: 'Gunakan type="text", type="email", dan type="password" untuk masing-masing input.' },
            { type: 'review', title: 'Ringkasan: Input Fields', points: ['<input> = self-closing', 'type="text" = teks biasa', 'type="email" = validasi email otomatis', 'type="password" = teks tersembunyi', 'placeholder = teks petunjuk'] }
          ]
        },
        {
          id: 3, title: 'Label & Textarea', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Tag <label> dan <textarea>', icon: '🏷️', content: '<label> memberikan label teks pada input. Attribute for harus sama dengan id input yang dilabeli. <textarea> adalah input teks multi-baris.', code: '<label for="nama">Nama:</label>\n<input type="text" id="nama" name="nama">\n\n<label for="pesan">Pesan:</label>\n<textarea id="pesan" rows="4" cols="50">Tulis pesan...</textarea>' },
            { type: 'fill-code', instruction: 'Hubungkan label dengan input menggunakan for:', before: '<label ', blank: 'for', after: '="email">Email:</label>\n<input type="email" id="email">', answer: 'for', explanation: 'Attribute for pada label harus sama dengan id input yang dilabeli.' },
            { type: 'multiple-choice', question: 'Apa kegunaan tag <textarea>?', options: ['Menampilkan gambar besar', 'Input teks multi-baris', 'Membuat tabel', 'Membuat list'], answer: 1, explanation: '<textarea> digunakan untuk input teks panjang multi-baris, seperti komentar atau pesan.' },
            { type: 'challenge', instruction: 'Buat form dengan label untuk setiap input, dan textarea untuk komentar:', starterCode: '<form>\n\n</form>', rules: { requiredTags: ['label', 'input', 'textarea'], minCounts: { label: 2 }, linkedLabels: true }, explanation: 'Setiap label for="..." harus terhubung dengan id="..." pada inputnya.' },
            { type: 'review', title: 'Ringkasan: Label & Textarea', points: ['<label> memberikan label teks untuk input', 'for pada label = id pada input', '<textarea> untuk teks panjang', 'rows dan cols mengatur ukuran textarea'] }
          ]
        },
        {
          id: 4, title: 'Select & Option', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Dropdown Select', icon: '📋', content: '<select> membuat dropdown menu. Setiap pilihan menggunakan tag <option>. Attribute value pada option adalah data yang dikirim ke server.', code: '<select name="kota">\n  <option value="jkt">Jakarta</option>\n  <option value="sby">Surabaya</option>\n  <option value="bdg" selected>Bandung</option>\n</select>' },
            { type: 'multiple-choice', question: 'Tag apa yang digunakan untuk setiap pilihan dalam dropdown?', options: ['<item>', '<choice>', '<option>', '<select>'], answer: 2, explanation: '<option> digunakan untuk setiap pilihan di dalam <select>.' },
            { type: 'fill-code', instruction: 'Buat dropdown pilihan bahasa:', before: '<select name="bahasa">\n  <', blank: 'option', after: ' value="id">Indonesia</option>\n</select>', answer: 'option', explanation: 'Tag <option> untuk setiap pilihan dalam dropdown.' },
            { type: 'challenge', instruction: 'Buat form lengkap dengan input text, select, textarea, dan button submit:', starterCode: '<form>\n\n</form>', rules: { requiredTags: ['select', 'option', 'textarea', 'button', 'input'], requiredValues: { input: { type: ['text'] } }, attributes: { button: { type: 'submit' } }, minCounts: { option: 2 } }, explanation: 'Form lengkap dengan berbagai jenis input!' },
            { type: 'review', title: 'Ringkasan: Select & Option', points: ['<select> = dropdown container', '<option> = setiap pilihan', 'value = data yang dikirim', 'selected = pilihan default'] }
          ]
        },
        {
          id: 5, title: 'Mini Project — Form Pendaftaran', xpReward: 30, isProject: true,
          slides: [
            { type: 'material', title: 'Project Form Pendaftaran', icon: '📝', content: 'Buat form pendaftaran lengkap! Form yang baik harus jelas, mudah diisi, dan memiliki label untuk setiap input.' },
            { type: 'mini-project', title: 'Form Pendaftaran', instruction: 'Buat form pendaftaran dengan field: nama (text), email, password, kota (select), tentang saya (textarea), dan tombol submit. Setiap field harus memiliki label.', starterCode: '<!DOCTYPE html>\n<html lang="id">\n<head>\n  <title>Form Pendaftaran</title>\n</head>\n<body>\n  <h1>Daftar Akun</h1>\n  <form>\n    <!-- Tambahkan field form di sini -->\n  </form>\n</body>\n</html>', checkItems: [
              { id: 'has-form', label: 'Ada tag <form>', checkStr: 'doc.querySelector("form") !== null' },
              { id: 'has-labels', label: 'Ada minimal 3 <label>', checkStr: 'doc.querySelectorAll("label").length >= 3' },
              { id: 'has-input', label: 'Ada input text, email, dan password', checkStr: 'doc.querySelector("input[type=text]") !== null && doc.querySelector("input[type=email]") !== null && doc.querySelector("input[type=password]") !== null' },
              { id: 'has-select', label: 'Ada dropdown <select>', checkStr: 'doc.querySelector("select") !== null' },
              { id: 'has-textarea', label: 'Ada <textarea>', checkStr: 'doc.querySelector("textarea") !== null' },
              { id: 'has-submit', label: 'Ada tombol submit', checkStr: 'doc.querySelector("button[type=submit], input[type=submit]") !== null' },
              { id: 'has-labels-linked', label: 'Semua label terhubung dengan input (for ↔ id)', checkStr: 'Array.from(doc.querySelectorAll("label[for]")).length >= 3 && Array.from(doc.querySelectorAll("label[for]")).every(l => doc.querySelector("#" + l.getAttribute("for")))' }
            ]}
          ]
        }
      ]
    },

    // ============================================================
    // LEVEL 10 — TABLE
    // ============================================================
    {
      id: 10, icon: '📊', title: 'Table',
      description: 'Pelajari cara membuat tabel data di HTML',
      lessons: [
        {
          id: 1, title: 'Struktur Table', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Tag <table>', icon: '📊', content: 'Tabel HTML terdiri dari: <table> (container), <tr> (table row = baris), dan <td> (table data = sel). Setiap baris dimulai dengan <tr>, setiap sel dengan <td>.', code: '<table>\n  <tr>\n    <td>Baris 1, Kolom 1</td>\n    <td>Baris 1, Kolom 2</td>\n  </tr>\n  <tr>\n    <td>Baris 2, Kolom 1</td>\n    <td>Baris 2, Kolom 2</td>\n  </tr>\n</table>' },
            { type: 'multiple-choice', question: 'Tag apa yang membuat BARIS dalam tabel HTML?', options: ['<row>', '<td>', '<tr>', '<th>'], answer: 2, explanation: '<tr> (table row) membuat baris baru dalam tabel.' },
            { type: 'fill-code', instruction: 'Buat satu baris tabel dengan dua sel:', before: '<table>\n  <tr>\n    <td>Sel 1</td>\n    <', blank: 'td', after: '>Sel 2</td>\n  </tr>\n</table>', answer: 'td', explanation: '<td> (table data) membuat satu sel dalam baris tabel.' },
            { type: 'drag-drop', instruction: 'Susun struktur tabel yang benar:', tokens: ['</table>', '<td>Data</td>', '<table>', '<tr>'], answer: ['<table>', '<tr>', '<td>Data</td>', '</table>'] },
            { type: 'review', title: 'Ringkasan: Struktur Table', points: ['<table> = container tabel', '<tr> = baris tabel', '<td> = sel data', 'Baris berisi banyak sel'] }
          ]
        },
        {
          id: 2, title: 'Table Header', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Tag <th>, <thead>, <tbody>', icon: '📋', content: '<th> membuat sel header (tebal, rata tengah). <thead> untuk baris header, <tbody> untuk baris data. Ini membantu struktur dan aksesibilitas.', code: '<table>\n  <thead>\n    <tr>\n      <th>Nama</th>\n      <th>Usia</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Budi</td>\n      <td>20</td>\n    </tr>\n  </tbody>\n</table>' },
            { type: 'multiple-choice', question: 'Apa perbedaan <th> dan <td>?', options: ['Tidak ada perbedaan', '<th> untuk header (tebal, tengah), <td> untuk data biasa', '<td> lebih besar dari <th>', '<th> hanya boleh satu'], answer: 1, explanation: '<th> untuk header tabel — teks tebal dan rata tengah. <td> untuk sel data biasa.' },
            { type: 'fill-code', instruction: 'Gunakan th untuk header tabel:', before: '<tr>\n  <', blank: 'th', after: '>Nama</th>\n  <th>Nilai</th>\n</tr>', answer: 'th', explanation: '<th> membuat sel header yang tebal dan rata tengah.' },
            { type: 'challenge', instruction: 'Buat tabel lengkap dengan thead (3 header) dan tbody (2 baris data):', starterCode: '', rules: { requiredTags: ['table', 'thead', 'tbody', 'th', 'td'], minCounts: { th: 3, tr: 3, td: 2 }, selectors: ['thead tr th', 'tbody tr td'] }, explanation: 'Tabel dengan thead (3 header) dan tbody (2 baris data) yang terstruktur!' },
            { type: 'review', title: 'Ringkasan: Table Header', points: ['<th> = sel header (tebal, rata tengah)', '<thead> = bagian header tabel', '<tbody> = bagian body tabel', 'Struktur yang baik membantu aksesibilitas'] }
          ]
        },
        {
          id: 3, title: 'Table Attributes', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Attribute Tabel', icon: '🔧', content: 'Beberapa attribute berguna untuk tabel: border (garis tabel), colspan (gabung kolom), rowspan (gabung baris). Untuk tampilan lebih baik, gunakan CSS.', code: '<!-- Border -->\n<table border="1">\n\n<!-- Colspan: gabung 2 kolom -->\n<td colspan="2">Gabungan</td>\n\n<!-- Rowspan: gabung 2 baris -->\n<td rowspan="2">Gabungan</td>' },
            { type: 'multiple-choice', question: 'Attribute apa yang menggabungkan beberapa KOLOM menjadi satu sel?', options: ['rowspan', 'merge', 'colspan', 'join'], answer: 2, explanation: 'colspan menggabungkan beberapa kolom. colspan="2" = satu sel selebar 2 kolom.' },
            { type: 'fill-code', instruction: 'Buat sel yang menggabungkan 3 kolom:', before: '<td ', blank: 'colspan', after: '="3">Judul</td>', answer: 'colspan', explanation: 'colspan="3" membuat sel selebar 3 kolom.' },
            { type: 'challenge', instruction: 'Buat tabel dengan border="1", header dengan colspan="2", dan minimal 2 baris data:', starterCode: '', rules: { requiredTags: ['table', 'th', 'td'], attributes: { table: { border: '1' }, th: { colspan: '2' } }, minCounts: { tr: 2 } }, explanation: 'Tabel dengan border="1", header colspan="2", dan minimal 2 baris!' },
            { type: 'review', title: 'Ringkasan: Table Attributes', points: ['border="1" = garis tabel', 'colspan = gabung beberapa kolom', 'rowspan = gabung beberapa baris', 'Gunakan CSS untuk styling yang lebih baik'] }
          ]
        },
        {
          id: 4, title: 'Table Styling', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Membuat Tabel Menarik', icon: '🎨', content: 'Tabel HTML bisa dibuat lebih menarik dengan CSS inline. Gunakan style pada table, tr, td, dan th untuk mengatur warna, padding, dan border.', code: '<table style="border-collapse:collapse;width:100%">\n  <tr style="background:#2196F3;color:white">\n    <th style="padding:8px;border:1px solid #ddd">Nama</th>\n    <th style="padding:8px;border:1px solid #ddd">Nilai</th>\n  </tr>\n  <tr style="background:#f5f5f5">\n    <td style="padding:8px;border:1px solid #ddd">Budi</td>\n    <td style="padding:8px;border:1px solid #ddd">95</td>\n  </tr>\n</table>' },
            { type: 'challenge', instruction: 'Buat tabel bergaya dengan header berwarna biru dan baris data bergantian warna:', starterCode: '', rules: { requiredTags: ['table', 'th', 'td'], attributeContains: { th: { style: 'background' }, tr: { style: 'background' } } }, explanation: 'Gunakan style="background:..." pada header dan baris tabel.' },
            { type: 'review', title: 'Ringkasan: Table Styling', points: ['border-collapse:collapse menghilangkan jarak antar border', 'padding pada td/th untuk ruang dalam sel', 'background untuk warna baris', 'width:100% untuk tabel penuh lebar'] }
          ]
        },
        {
          id: 5, title: 'Mini Project — Tabel Data Siswa', xpReward: 30, isProject: true,
          slides: [
            { type: 'material', title: 'Project Tabel Data', icon: '📊', content: 'Buat tabel data siswa yang rapi dengan header, beberapa baris data, dan styling yang menarik!' },
            { type: 'mini-project', title: 'Tabel Data Siswa', instruction: 'Buat tabel data siswa dengan kolom: Nama, Kelas, dan Nilai. Tambahkan minimal 4 baris data dan beri styling agar mudah dibaca.', starterCode: '<!DOCTYPE html>\n<html lang="id">\n<head>\n  <title>Data Siswa</title>\n</head>\n<body>\n  <h1>Data Siswa</h1>\n  <!-- Buat tabel di sini -->\n</body>\n</html>', checkItems: [
              { id: 'has-table', label: 'Ada tag <table>', checkStr: 'doc.querySelector("table") !== null' },
              { id: 'has-th', label: 'Ada header tabel <th>', checkStr: 'doc.querySelectorAll("th").length >= 2' },
              { id: 'has-rows', label: 'Ada minimal 4 baris data', checkStr: 'doc.querySelectorAll("tbody tr, table tr").length >= 4' },
              { id: 'has-td', label: 'Ada data sel <td>', checkStr: 'doc.querySelectorAll("td").length >= 6' }
            ]}
          ]
        }
      ]
    },

    // ============================================================
    // LEVEL 11 — SEMANTIC HTML
    // ============================================================
    {
      id: 11, icon: '🧩', title: 'Semantic HTML',
      description: 'Pelajari tag HTML yang bermakna untuk struktur website modern',
      lessons: [
        {
          id: 1, title: 'Apa itu Semantic HTML?', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Semantic HTML', icon: '🧩', content: 'Semantic HTML menggunakan tag yang memiliki MAKNA, bukan sekadar pembungkus. Contoh: <header> jelas menunjukkan header, <nav> untuk navigasi. Ini membantu SEO, aksesibilitas, dan keterbacaan kode.' },
            { type: 'example', title: 'Non-Semantic vs Semantic', code: '<!-- Non-Semantic (kurang baik) -->\n<div id="header">...</div>\n<div id="nav">...</div>\n\n<!-- Semantic (lebih baik) -->\n<header>...</header>\n<nav>...</nav>' },
            { type: 'multiple-choice', question: 'Apa KEUNTUNGAN menggunakan Semantic HTML?', options: ['Halaman lebih cepat loading', 'SEO lebih baik, aksesibilitas meningkat, kode lebih mudah dibaca', 'Mengurangi ukuran file CSS', 'Membuat animasi otomatis'], answer: 1, explanation: 'Semantic HTML meningkatkan SEO (mesin pencari), aksesibilitas (pembaca layar), dan keterbacaan kode.' },
            { type: 'fill-code', instruction: 'Ganti div dengan tag semantic yang benar untuk header:', before: '<', blank: 'header', after: '>\n  <h1>Nama Website</h1>\n</header>', answer: 'header', explanation: 'Tag <header> adalah pengganti semantic untuk <div id="header">.' },
            { type: 'review', title: 'Ringkasan: Semantic HTML', points: ['Semantic = tag yang memiliki makna', 'Lebih baik untuk SEO', 'Membantu pembaca layar (aksesibilitas)', 'Kode lebih mudah dibaca dan dipelihara'] }
          ]
        },
        {
          id: 2, title: 'Header & Nav', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Tag <header> dan <nav>', icon: '🏠', content: '<header> berisi bagian atas halaman: logo, judul, dan navigasi utama. <nav> berisi menu navigasi website (link-link utama).', code: '<header>\n  <h1>PintuKoding</h1>\n  <nav>\n    <a href="/">Beranda</a>\n    <a href="/belajar">Belajar</a>\n    <a href="/tentang">Tentang</a>\n  </nav>\n</header>' },
            { type: 'multiple-choice', question: 'Tag semantik apa yang paling tepat untuk menu navigasi?', options: ['<menu>', '<div class="nav">', '<nav>', '<ul class="navigation">'], answer: 2, explanation: '<nav> adalah tag semantik khusus untuk blok navigasi website.' },
            { type: 'challenge', instruction: 'Buat header dengan logo h1 dan nav dengan 3 link navigasi:', starterCode: '', rules: { requiredTags: ['header', 'nav', 'a'], requiredChildren: { header: ['h1', 'nav'] }, minCounts: { a: 3 }, selectors: ['header nav a'] }, explanation: 'Header dan nav bekerja sama untuk bagian atas website — nav DI DALAM header!' },
            { type: 'drag-drop', instruction: 'Susun struktur header yang benar:', tokens: ['<nav>', '</header>', '<header>', '<h1>Logo</h1>'], answer: ['<header>', '<h1>Logo</h1>', '<nav>', '</header>'] },
            { type: 'review', title: 'Ringkasan: Header & Nav', points: ['<header> = bagian atas halaman', '<nav> = blok navigasi', 'Nav biasanya ada di dalam header', 'Bisa ada beberapa nav dalam satu halaman'] }
          ]
        },
        {
          id: 3, title: 'Main, Section & Article', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Tag <main>, <section>, <article>', icon: '📰', content: '<main> berisi konten utama halaman (satu per halaman). <section> mengelompokkan konten bertema. <article> untuk konten mandiri seperti blog post.', code: '<main>\n  <section>\n    <h2>Tentang Kami</h2>\n    <p>Penjelasan tentang perusahaan.</p>\n  </section>\n  \n  <article>\n    <h2>Blog Post</h2>\n    <p>Isi artikel yang bisa berdiri sendiri.</p>\n  </article>\n</main>' },
            { type: 'multiple-choice', question: 'Berapa tag <main> yang seharusnya ada dalam satu halaman?', options: ['Tidak terbatas', '2', '1 saja', 'Sesuai kebutuhan'], answer: 2, explanation: 'Hanya boleh ada SATU tag <main> per halaman — ia berisi konten utama.' },
            { type: 'fill-code', instruction: 'Buat section untuk konten bertema:', before: '<', blank: 'section', after: '>\n  <h2>Layanan Kami</h2>\n</section>', answer: 'section', explanation: '<section> mengelompokkan konten yang memiliki tema sama.' },
            { type: 'challenge', instruction: 'Buat struktur main dengan 2 section dan 1 article di dalamnya:', starterCode: '', rules: { requiredTags: ['main', 'section', 'article'], minCounts: { section: 2 }, selectors: ['main section', 'section article'] }, explanation: 'Gunakan main, section, dan article sesuai konteks — article di dalam section!' },
            { type: 'review', title: 'Ringkasan: Main, Section, Article', points: ['<main> = konten utama (hanya satu!)', '<section> = kelompok konten bertema', '<article> = konten mandiri (blog, berita)', 'Bisa disarangkan: section > article'] }
          ]
        },
        {
          id: 4, title: 'Footer & Aside', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Tag <footer> dan <aside>', icon: '📌', content: '<footer> berisi bagian bawah halaman: copyright, kontak, link tambahan. <aside> untuk konten sampingan seperti sidebar, iklan, atau info terkait.', code: '<aside>\n  <h3>Artikel Terkait</h3>\n  <ul>\n    <li><a href="#">Tutorial CSS</a></li>\n  </ul>\n</aside>\n\n<footer>\n  <p>&copy; 2024 PintuKoding. All rights reserved.</p>\n</footer>' },
            { type: 'multiple-choice', question: 'Tag semantik apa yang tepat untuk sidebar dengan konten terkait?', options: ['<sidebar>', '<div class="aside">', '<aside>', '<secondary>'], answer: 2, explanation: '<aside> untuk konten sampingan seperti sidebar, iklan, atau informasi terkait.' },
            { type: 'fill-code', instruction: 'Buat footer dengan teks copyright:', before: '<', blank: 'footer', after: '>\n  <p>© 2024 PintuKoding</p>\n</footer>', answer: 'footer', explanation: '<footer> berisi informasi kaki halaman seperti copyright.' },
            { type: 'challenge', instruction: 'Buat halaman dengan header, main, aside, dan footer yang lengkap:', starterCode: '', rules: { requiredTags: ['header', 'main', 'aside', 'footer'], minCounts: { h1: 1, p: 1 } }, explanation: 'Halaman semantic yang lengkap dengan semua bagiannya!' },
            { type: 'review', title: 'Ringkasan: Footer & Aside', points: ['<footer> = bagian bawah halaman', '<aside> = konten sampingan/sidebar', 'footer biasanya berisi copyright & kontak', 'aside untuk info tambahan yang terkait'] }
          ]
        },
        {
          id: 5, title: 'Mini Project — Website Semantic', xpReward: 30, isProject: true,
          slides: [
            { type: 'material', title: 'Project Website Semantic', icon: '🧩', content: 'Buat halaman website modern menggunakan semua tag semantic HTML yang sudah kamu pelajari: header, nav, main, section, article, aside, dan footer!' },
            { type: 'mini-project', title: 'Website Struktur Modern', instruction: 'Buat halaman HTML lengkap menggunakan tag semantic. Halaman harus memiliki: header dengan nav, main dengan section dan article, aside, dan footer.', starterCode: '<!DOCTYPE html>\n<html lang="id">\n<head>\n  <title>Website Modern</title>\n</head>\n<body>\n  <!-- Gunakan tag semantic di sini -->\n</body>\n</html>', checkItems: [
              { id: 'has-header', label: 'Ada <header>', checkStr: 'doc.querySelector("header") !== null' },
              { id: 'nav-in-header', label: '<nav> berada DI DALAM <header>', checkStr: 'doc.querySelector("header nav") !== null' },
              { id: 'has-main', label: 'Ada <main>', checkStr: 'doc.querySelector("main") !== null' },
              { id: 'section-in-main', label: '<section> berada DI DALAM <main>', checkStr: 'doc.querySelector("main section") !== null' },
              { id: 'article-in-main', label: '<article> berada DI DALAM <main>', checkStr: 'doc.querySelector("main article") !== null' },
              { id: 'has-footer', label: 'Ada <footer>', checkStr: 'doc.querySelector("footer") !== null' }
            ]}
          ]
        }
      ]
    },

    // ============================================================
    // LEVEL 12 — FINAL PROJECT
    // ============================================================
    {
      id: 12, icon: '🚀', title: 'Final Project',
      description: 'Terapkan semua yang telah kamu pelajari dalam proyek akhir',
      lessons: [
        {
          id: 1, title: 'Review Semua Konsep', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: '🎯 Review Perjalananmu', icon: '🎯', content: 'Selamat! Kamu sudah menyelesaikan 11 level HTML. Mari review semua yang sudah dipelajari sebelum mengerjakan Final Project.' },
            { type: 'review', title: 'Semua Tag yang Sudah Dipelajari', points: ['📝 Struktur: DOCTYPE, html, head, title, body', '📰 Text: h1-h6, p, br, hr, strong, em, mark, small', '🔗 Link: a (href, target)', '🖼️ Image: img (src, alt, width, height)', '📋 List: ul, ol, li (nested)', '🔘 Button: button (type, onclick, disabled)', '📝 Form: form, input, label, textarea, select, option', '📊 Table: table, tr, th, td, thead, tbody', '🧩 Semantic: header, nav, main, section, article, aside, footer'] },
            { type: 'multiple-choice', question: 'Tag semantik yang digunakan sebagai KONTEN UTAMA halaman adalah?', options: ['<body>', '<section>', '<main>', '<article>'], answer: 2, explanation: '<main> adalah tag untuk konten utama halaman (hanya boleh ada satu).' },
            { type: 'multiple-choice', question: 'Attribute apa yang WAJIB ada pada tag <img>?', options: ['width dan height', 'class dan id', 'src dan alt', 'href dan src'], answer: 2, explanation: 'src (lokasi gambar) dan alt (deskripsi) adalah attribute penting pada <img>.' },
            { type: 'fill-code', instruction: 'Buat link yang terbuka di tab baru:', before: '<a href="https://example.com" ', blank: 'target', after: '="_blank">Kunjungi</a>', answer: 'target', explanation: 'target="_blank" membuka link di tab baru.' },
            { type: 'review', title: 'Siap untuk Final Project!', points: ['Kamu sudah menguasai 40+ tag HTML', 'Dari struktur dasar hingga form dan tabel', 'Dari heading hingga semantic HTML', 'Sekarang saatnya menggabungkan semuanya!'] }
          ]
        },
        {
          id: 2, title: 'Perencanaan Project', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Merencanakan Website Profil', icon: '📋', content: 'Final project kamu adalah membuat Website Profil Pribadi yang menampilkan: nama, foto, tentang aku, keahlian, hobi, dan info kontak. Rencanakan dulu sebelum coding!', code: '<!-- Struktur yang akan dibuat: -->\n<header>   - Nama & navigasi\n<main>\n  <section> - Tentang Aku\n  <section> - Keahlian (list)\n  <section> - Kontak (form)\n</main>\n<footer>   - Copyright' },
            { type: 'multiple-choice', question: 'Apa yang sebaiknya dilakukan SEBELUM mulai coding website?', options: ['Langsung tulis kode', 'Rencanakan struktur dan konten dulu', 'Pilih warna dulu', 'Install framework dulu'], answer: 1, explanation: 'Merencanakan struktur sebelum coding membuat proses lebih efisien dan hasil lebih terstruktur.' },
            { type: 'example', title: 'Checklist Final Project', code: '✓ Heading (h1, h2, h3)\n✓ Paragraph (p)\n✓ Image (img)\n✓ Link (a)\n✓ List (ul atau ol)\n✓ Button\n✓ Form (input, label, textarea)\n✓ Table\n✓ Header & Nav\n✓ Main & Section\n✓ Article\n✓ Footer' },
            { type: 'review', title: 'Rencana Final Project', points: ['Website Profil Pribadi', 'Gunakan minimal 12 jenis tag berbeda', 'Semantic HTML untuk struktur', 'Form untuk kontak', 'Tabel untuk data hobi/keahlian'] }
          ]
        },
        {
          id: 3, title: 'Struktur & Konten', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Mulai Membangun', icon: '🏗️', content: 'Saatnya mulai membangun! Mulai dari struktur semantic HTML dulu, kemudian isi dengan konten. Gunakan code editor di bawah untuk berlatih.' },
            { type: 'code-editor', instruction: 'Buat skeleton HTML untuk website profil: DOCTYPE, html, head (title), body dengan header, main (2 section), dan footer.', starterCode: '<!DOCTYPE html>\n<html lang="id">\n<head>\n  <title>Profil Saya</title>\n</head>\n<body>\n  <header>\n    <h1>Nama Kamu</h1>\n    <nav>\n      <a href="#tentang">Tentang</a>\n      <a href="#kontak">Kontak</a>\n    </nav>\n  </header>\n  \n  <main>\n    <section id="tentang">\n      <h2>Tentang Saya</h2>\n      <!-- Tambahkan konten -->\n    </section>\n  </main>\n  \n  <footer>\n    <p>© 2024 Nama Kamu</p>\n  </footer>\n</body>\n</html>' },
            { type: 'review', title: 'Langkah Membangun Website', points: ['1. Buat skeleton HTML dulu', '2. Tambahkan konten di setiap section', '3. Cek di preview secara berkala', '4. Tambahkan form dan tabel', '5. Pastikan semua tag tertutup'] }
          ]
        },
        {
          id: 4, title: 'Melengkapi Konten', xpReward: 10, isProject: false,
          slides: [
            { type: 'material', title: 'Menambahkan Detail', icon: '✨', content: 'Sekarang tambahkan detail: foto profil, list keahlian, tabel data, form kontak, dan format teks yang menarik. Jadikan website-mu unik!' },
            { type: 'code-editor', instruction: 'Tambahkan section dengan: foto (img), list keahlian (ul), dan tabel hobi (table) ke dalam website profilmu:', starterCode: '<!-- Lanjutkan dari sebelumnya -->\n<section id="keahlian">\n  <h2>Keahlian Saya</h2>\n  <ul>\n    <li>HTML</li>\n    <li>CSS</li>\n  </ul>\n</section>\n\n<section id="hobi">\n  <h2>Hobi Saya</h2>\n  <table border="1">\n    <tr>\n      <th>Hobi</th>\n      <th>Frekuensi</th>\n    </tr>\n    <tr>\n      <td>Coding</td>\n      <td>Setiap hari</td>\n    </tr>\n  </table>\n</section>' },
            { type: 'review', title: 'Website Semakin Lengkap!', points: ['Foto profil dengan img', 'List keahlian dengan ul', 'Tabel hobi dengan table', 'Berikutnya: tambahkan form kontak'] }
          ]
        },
        {
          id: 5, title: 'Final Project — Website Profil', xpReward: 100, isProject: true,
          slides: [
            { type: 'material', title: '🎉 Saatnya Final Project!', icon: '🏆', content: 'Ini adalah puncak perjalanan belajarmu! Kamu akan membangun <strong>Website Profil Pribadi</strong> secara BERTAHAP dalam 4 tahap: Struktur → Konten → Interaksi → Validasi Final. Selesaikan satu tahap sebelum lanjut ke tahap berikutnya!' },
            { type: 'challenge', title: 'Tahap 1 — Struktur', instruction: 'TAHAP 1 — STRUKTUR: Buat skeleton website dengan semantic HTML: <header> berisi <h1> dan <nav>, <main> berisi minimal 2 <section>, dan <footer> berisi <p>. Semua tag harus benar-benar bersarang:', starterCode: '<!DOCTYPE html>\n<html lang="id">\n<head>\n  <title>Profil - [Nama Kamu]</title>\n</head>\n<body>\n\n  <!-- TAHAP 1: header + nav + main + section + footer -->\n\n</body>\n</html>', rules: { requiredTags: ['header', 'nav', 'main', 'section', 'footer', 'h1', 'p'], requiredChildren: { header: ['h1', 'nav'], main: ['section'], footer: ['p'] }, minCounts: { section: 2 }, selectors: ['header nav', 'main section'] }, explanation: 'Tahap 1 selesai — struktur semantic website sudah berdiri!' },
            { type: 'challenge', title: 'Tahap 2 — Konten', instruction: 'TAHAP 2 — KONTEN: Isi website dengan konten: minimal 2 paragraf, 1 gambar (dengan src dan alt terisi), minimal 2 link, 1 list dengan minimal 2 item, dan 1 table dengan header:', starterCode: '<!DOCTYPE html>\n<html lang="id">\n<head>\n  <title>Profil - [Nama Kamu]</title>\n</head>\n<body>\n\n  <header>\n    <h1>[Nama Kamu]</h1>\n    <nav>\n      <a href="#tentang">Tentang</a>\n      <a href="#kontak">Kontak</a>\n    </nav>\n  </header>\n\n  <main>\n    <section id="tentang">\n      <!-- TAHAP 2: paragraf, gambar, link, list -->\n    </section>\n\n    <section id="data">\n      <!-- TAHAP 2: table dengan header -->\n    </section>\n  </main>\n\n  <footer>\n    <p>© 2024 [Nama Kamu]</p>\n  </footer>\n\n</body>\n</html>', rules: { minCounts: { p: 2, img: 1, a: 2, li: 2, ul: 1, table: 1, th: 1 }, requiredAttributes: { img: ['src'] }, nonEmptyAttributes: { img: ['alt'] } }, explanation: 'Tahap 2 selesai — konten website sudah terisi!' },
            { type: 'challenge', title: 'Tahap 3 — Interaksi', instruction: 'TAHAP 3 — INTERAKSI: Tambahkan form kontak di dalam <main> atau <section>: input text dengan label, input email dengan label, textarea dengan label, dan button type="submit". Hubungkan setiap label dengan for ↔ id:', starterCode: '<!DOCTYPE html>\n<html lang="id">\n<head>\n  <title>Profil - [Nama Kamu]</title>\n</head>\n<body>\n\n  <header>\n    <h1>[Nama Kamu]</h1>\n    <nav>\n      <a href="#tentang">Tentang</a>\n      <a href="#kontak">Kontak</a>\n    </nav>\n  </header>\n\n  <main>\n    <section id="tentang">\n      <h2>Tentang Saya</h2>\n      <img src="https://placehold.co/150" alt="Foto Profil" width="150">\n      <p>Saya sedang belajar HTML di PintuKoding.</p>\n      <ul>\n        <li>HTML</li>\n        <li>CSS</li>\n      </ul>\n    </section>\n\n    <section id="data">\n      <h2>Data Saya</h2>\n      <table border="1">\n        <thead>\n          <tr><th>Hobi</th><th>Frekuensi</th></tr>\n        </thead>\n        <tbody>\n          <tr><td>Coding</td><td>Setiap hari</td></tr>\n        </tbody>\n      </table>\n    </section>\n\n    <section id="kontak">\n      <!-- TAHAP 3: form kontak di sini -->\n    </section>\n  </main>\n\n  <footer>\n    <p>© 2024 [Nama Kamu]</p>\n  </footer>\n\n</body>\n</html>', rules: { requiredTags: ['form', 'input', 'textarea', 'button', 'label'], requiredValues: { input: { type: ['text', 'email'] } }, attributes: { button: { type: 'submit' } }, minCounts: { label: 3 }, linkedLabels: true }, explanation: 'Tahap 3 selesai — form kontak interaktif sudah jadi!' },
            { type: 'mini-project', title: 'TAHAP 4 — Validasi Final', instruction: 'TAHAP 4 — VALIDASI FINAL: Gabungkan semuanya menjadi Website Profil Pribadi yang lengkap. Semua checklist di bawah WAJIB terpenuhi — validator memeriksa struktur DOM, attribute, dan hubungan label ↔ input. Rujuk template starter sebagai panduan, lalu ganti semua [Nama Kamu] dengan namamu.', starterCode: '<!DOCTYPE html>\n<html lang="id">\n<head>\n  <title>Profil - [Nama Kamu]</title>\n</head>\n<body>\n\n  <header>\n    <h1>[Nama Kamu]</h1>\n    <nav>\n      <a href="#tentang">Tentang</a>\n      <a href="#keahlian">Keahlian</a>\n      <a href="#kontak">Kontak</a>\n    </nav>\n  </header>\n\n  <main>\n    <section id="tentang">\n      <h2>Tentang Saya</h2>\n      <img src="https://placehold.co/150" alt="Foto Profil" width="150">\n      <p>Tulis deskripsi singkat tentang dirimu di sini.</p>\n    </section>\n\n    <section id="keahlian">\n      <h2>Keahlian</h2>\n      <ul>\n        <li>HTML</li>\n        <li>CSS</li>\n      </ul>\n    </section>\n\n    <section id="hobi">\n      <h2>Hobi</h2>\n      <table border="1">\n        <thead>\n          <tr><th>Hobi</th><th>Level</th></tr>\n        </thead>\n        <tbody>\n          <tr><td>Coding</td><td>Pemula</td></tr>\n        </tbody>\n      </table>\n    </section>\n\n    <section id="kontak">\n      <h2>Kontak Saya</h2>\n      <form>\n        <label for="nama">Nama:</label><br>\n        <input type="text" id="nama" name="nama"><br>\n        <label for="pesan">Pesan:</label><br>\n        <textarea id="pesan"></textarea><br>\n        <button type="submit">Kirim</button>\n      </form>\n    </section>\n  </main>\n\n  <footer>\n    <p>&copy; 2024 [Nama Kamu]. All rights reserved.</p>\n  </footer>\n\n</body>\n</html>', checkItems: [
              { id: 'has-h1', label: 'Ada heading <h1>', checkStr: 'doc.querySelector("h1") !== null' },
              { id: 'has-p', label: 'Ada paragraf <p>', checkStr: 'doc.querySelectorAll("p").length >= 2' },
              { id: 'has-img', label: 'Ada gambar <img> dengan alt terisi', checkStr: 'doc.querySelector("img[alt]") !== null && doc.querySelector("img[alt]").getAttribute("alt").trim() !== ""' },
              { id: 'has-a', label: 'Ada link <a>', checkStr: 'doc.querySelector("a") !== null' },
              { id: 'has-list', label: 'Ada list <ul> atau <ol>', checkStr: 'doc.querySelector("ul, ol") !== null' },
              { id: 'has-button', label: 'Ada <button>', checkStr: 'doc.querySelector("button") !== null' },
              { id: 'has-form', label: 'Ada <form>', checkStr: 'doc.querySelector("form") !== null' },
              { id: 'has-table', label: 'Ada <table> dengan <th>', checkStr: 'doc.querySelector("table") !== null && doc.querySelector("table th") !== null' },
              { id: 'has-header', label: 'Ada <header>', checkStr: 'doc.querySelector("header") !== null' },
              { id: 'nav-in-header', label: '<nav> DI DALAM <header>', checkStr: 'doc.querySelector("header nav") !== null' },
              { id: 'has-main', label: 'Ada <main>', checkStr: 'doc.querySelector("main") !== null' },
              { id: 'section-in-main', label: '<section> DI DALAM <main> (minimal 2)', checkStr: 'doc.querySelectorAll("main section").length >= 2' },
              { id: 'has-footer', label: 'Ada <footer>', checkStr: 'doc.querySelector("footer") !== null' },
              { id: 'labels-linked', label: 'Label form terhubung dengan input (for ↔ id)', checkStr: 'Array.from(doc.querySelectorAll("label[for]")).length >= 2 && Array.from(doc.querySelectorAll("label[for]")).every(l => doc.querySelector("#" + l.getAttribute("for")))' },
              { id: 'personalized', label: 'Semua placeholder [Nama Kamu] sudah diganti dengan namamu', checkStr: '!/\\[Nama Kamu\\]/i.test(doc.documentElement.textContent)' }
            ]}
          ]
        }
      ]
    }

  ] // end levels
};
