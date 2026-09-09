<?php
/**
 * Learning path data: courses -> lessons -> exercise.
 * Content is preserved from the original PintuKoding prototype.
 * `validate` closures run server-side in api/check_exercise.php.
 */

$COURSES = [
    [
        'id' => 'html-basic',
        'title' => 'HTML Dasar',
        'description' => 'Belajar struktur dasar website dengan HTML.',
        'icon' => '🌐',
        'color' => '#e34c26',
        'prerequisites' => [],
        'lessons' => [
            [
                'id' => 'html-intro',
                'title' => 'Apa itu HTML?',
                'content' => '<p><strong>HTML</strong> (HyperText Markup Language) adalah bahasa standar untuk membuat halaman web.</p><p>HTML menggunakan <strong>tag</strong> untuk menandai elemen-elemen seperti heading, paragraf, gambar, dan link.</p><h3>Contoh sederhana:</h3><p>Setiap halaman web yang kamu kunjungi di internet dibangun dengan HTML sebagai dasarnya.</p>',
                'codeExample' => "<h1>Halo Dunia!</h1>\n<p>Ini adalah halaman web pertamaku.</p>",
                'codeLang' => 'html',
                'exercise' => [
                    'prompt' => 'Buat heading h1 dengan teks "Halo Dunia!"',
                    'starterCode' => "<!-- Tulis kode HTML kamu di sini -->\n",
                    'hint' => 'Gunakan tag <h1>...</h1>',
                    'validate' => function ($code) {
                        $c = strtolower(preg_replace('/\s+/', ' ', trim($code)));
                        return str_contains($c, '<h1>') && str_contains($c, 'halo dunia!') && str_contains($c, '</h1>');
                    },
                ],
            ],
            [
                'id' => 'html-structure',
                'title' => 'Struktur HTML',
                'content' => '<p>Setiap dokumen HTML memiliki struktur dasar:</p><ul><li><code>&lt;!DOCTYPE html&gt;</code> - Deklarasi</li><li><code>&lt;html&gt;</code> - Elemen root</li><li><code>&lt;head&gt;</code> - Informasi halaman</li><li><code>&lt;body&gt;</code> - Konten yang ditampilkan</li></ul>',
                'codeExample' => "<!DOCTYPE html>\n<html>\n<head>\n  <title>Halaman</title>\n</head>\n<body>\n  <h1>Halo!</h1>\n</body>\n</html>",
                'codeLang' => 'html',
                'exercise' => [
                    'prompt' => 'Buat struktur HTML dengan title "Belajar HTML" dan heading h1 "Selamat Datang"',
                    'starterCode' => "<!DOCTYPE html>\n<html>\n<head>\n  <title></title>\n</head>\n<body>\n  \n</body>\n</html>",
                    'hint' => 'Isi tag <title> dan tambahkan <h1>Selamat Datang</h1> di dalam <body>',
                    'validate' => function ($code) {
                        $c = strtolower($code);
                        return str_contains($c, '<!doctype html>') && str_contains($c, '<title>belajar html</title>')
                            && str_contains($c, '<h1>') && str_contains($c, 'selamat datang');
                    },
                ],
            ],
            [
                'id' => 'html-heading',
                'title' => 'Heading',
                'content' => '<p>HTML memiliki 6 level heading, dari <code>&lt;h1&gt;</code> (terbesar) sampai <code>&lt;h6&gt;</code> (terkecil).</p><p>Heading digunakan untuk membuat judul dan sub-judul.</p>',
                'codeExample' => "<h1>Judul Utama</h1>\n<h2>Sub Judul</h2>\n<h3>Sub Sub Judul</h3>",
                'codeLang' => 'html',
                'exercise' => [
                    'prompt' => 'Buat h1 "Tutorial HTML" dan h2 "Pengertian HTML"',
                    'starterCode' => "<!-- Buat dua heading -->\n",
                    'hint' => 'Gunakan <h1> untuk judul utama dan <h2> untuk sub judul',
                    'validate' => function ($code) {
                        $c = strtolower($code);
                        return str_contains($c, '<h1>') && str_contains($c, 'tutorial html')
                            && str_contains($c, '<h2>') && str_contains($c, 'pengertian html');
                    },
                ],
            ],
            [
                'id' => 'html-paragraph',
                'title' => 'Paragraph',
                'content' => '<p>Paragraf dibuat dengan tag <code>&lt;p&gt;</code>.</p><p>Setiap paragraf akan otomatis memiliki jarak dengan paragraf lainnya.</p>',
                'codeExample' => "<p>Paragraf pertama.</p>\n<p>Paragraf kedua.</p>",
                'codeLang' => 'html',
                'exercise' => [
                    'prompt' => 'Buat dua paragraf: "Saya belajar HTML" dan "HTML menyenangkan"',
                    'starterCode' => "<!-- Buat dua paragraf -->\n",
                    'hint' => 'Gunakan tag <p>...</p> untuk setiap paragraf',
                    'validate' => function ($code) {
                        $c = strtolower($code);
                        return str_contains($c, '<p>') && str_contains($c, 'saya belajar html') && str_contains($c, 'html menyenangkan');
                    },
                ],
            ],
            [
                'id' => 'html-list',
                'title' => 'List',
                'content' => '<p>HTML punya <code>&lt;ul&gt;</code> (unordered list) dan <code>&lt;ol&gt;</code> (ordered list). Item pakai <code>&lt;li&gt;</code>.</p>',
                'codeExample' => "<ul>\n  <li>Apel</li>\n  <li>Pisang</li>\n  <li>Jeruk</li>\n</ul>",
                'codeLang' => 'html',
                'exercise' => [
                    'prompt' => 'Buat unordered list: "HTML", "CSS", "JavaScript"',
                    'starterCode' => "<!-- Buat list -->\n",
                    'hint' => 'Gunakan <ul> sebagai container dan <li> untuk setiap item',
                    'validate' => function ($code) {
                        $c = strtolower($code);
                        return str_contains($c, '<ul>') && str_contains($c, '<li>html</li>')
                            && str_contains($c, '<li>css</li>') && str_contains($c, '<li>javascript</li>');
                    },
                ],
            ],
            [
                'id' => 'html-mini',
                'title' => 'Mini Project: Profil',
                'content' => '<p>Gabungkan semua yang sudah dipelajari! Buat profil dengan heading, paragraf, dan list hobi.</p>',
                'codeExample' => "<h1>Nama Saya</h1>\n<p>Saya suka coding.</p>\n<ul>\n  <li>Membaca</li>\n  <li>Bermain</li>\n</ul>",
                'codeLang' => 'html',
                'exercise' => [
                    'prompt' => 'Buat profil: h1 nama, paragraf, dan list minimal 2 hobi',
                    'starterCode' => "<!-- Buat profil kamu -->\n",
                    'hint' => 'Gabungkan <h1>, <p>, <ul>, dan <li>',
                    'validate' => function ($code) {
                        $c = strtolower($code);
                        $liCount = preg_match_all('/<li>.*?<\/li>/', $c);
                        return str_contains($c, '<h1>') && str_contains($c, '<p>') && str_contains($c, '<ul>') && $liCount >= 2;
                    },
                ],
            ],
        ],
    ],
    [
        'id' => 'css-basic',
        'title' => 'CSS Dasar',
        'description' => 'Belajar mempercantik website dengan CSS.',
        'icon' => '🎨',
        'color' => '#264de4',
        'prerequisites' => ['html-basic'],
        'lessons' => [
            [
                'id' => 'css-intro',
                'title' => 'Apa itu CSS?',
                'content' => '<p><strong>CSS</strong> (Cascading Style Sheets) mengatur tampilan HTML: warna, ukuran, jarak, dll.</p>',
                'codeExample' => "h1 {\n  color: blue;\n  font-size: 24px;\n}",
                'codeLang' => 'css',
                'exercise' => [
                    'prompt' => 'Buat CSS untuk h1 berwarna red',
                    'starterCode' => "/* Tulis CSS kamu */\n",
                    'hint' => 'h1 { color: red; }',
                    'validate' => function ($code) {
                        $c = strtolower($code);
                        return str_contains($c, 'h1') && str_contains($c, 'color') && str_contains($c, 'red');
                    },
                ],
            ],
            [
                'id' => 'css-selector',
                'title' => 'Selector CSS',
                'content' => '<p>Selector: element (<code>p</code>), class (<code>.nama</code>), ID (<code>#nama</code>).</p>',
                'codeExample' => ".judul {\n  color: blue;\n}\n#main {\n  font-size: 32px;\n}",
                'codeLang' => 'css',
                'exercise' => [
                    'prompt' => 'Buat class ".judul" warna blue',
                    'starterCode' => "/* Class selector */\n",
                    'hint' => '.judul { color: blue; }',
                    'validate' => function ($code) {
                        $c = strtolower($code);
                        return str_contains($c, '.judul') && str_contains($c, 'color') && str_contains($c, 'blue');
                    },
                ],
            ],
            [
                'id' => 'css-box-model',
                'title' => 'Box Model',
                'content' => '<p>Setiap elemen HTML adalah sebuah kotak dengan <code>margin</code>, <code>border</code>, <code>padding</code>, dan <code>content</code>.</p>',
                'codeExample' => "div {\n  padding: 16px;\n  border: 1px solid #333;\n  margin: 8px;\n}",
                'codeLang' => 'css',
                'exercise' => [
                    'prompt' => 'Beri class ".box" padding 20px',
                    'starterCode' => "/* Atur padding */\n",
                    'hint' => '.box { padding: 20px; }',
                    'validate' => function ($code) {
                        $c = strtolower($code);
                        return str_contains($c, '.box') && str_contains($c, 'padding') && str_contains($c, '20px');
                    },
                ],
            ],
        ],
    ],
    [
        'id' => 'js-basic',
        'title' => 'JavaScript Dasar',
        'description' => 'Website interaktif dengan JavaScript.',
        'icon' => '⚡',
        'color' => '#f7df1e',
        'prerequisites' => ['html-basic'],
        'lessons' => [
            [
                'id' => 'js-intro',
                'title' => 'Apa itu JavaScript?',
                'content' => '<p><strong>JavaScript</strong> membuat website interaktif: merespon klik, mengubah konten, dll.</p>',
                'codeExample' => 'console.log("Halo Dunia!");',
                'codeLang' => 'javascript',
                'exercise' => [
                    'prompt' => 'Tampilkan "Halo PintuKoding!" dengan console.log()',
                    'starterCode' => "// Tulis kode kamu\n",
                    'hint' => 'console.log("Halo PintuKoding!");',
                    'validate' => function ($code) {
                        $c = strtolower($code);
                        return str_contains($c, 'console.log') && str_contains($c, 'halo pintukoding!');
                    },
                ],
            ],
            [
                'id' => 'js-variables',
                'title' => 'Variabel',
                'content' => '<p>Variabel menyimpan data. Gunakan <code>let</code> (bisa diubah) atau <code>const</code> (tetap).</p>',
                'codeExample' => "let nama = \"Budi\";\nconst umur = 17;",
                'codeLang' => 'javascript',
                'exercise' => [
                    'prompt' => 'Buat variabel "nama" berisi "Noval" dengan let',
                    'starterCode' => "// Buat variabel\n",
                    'hint' => 'let nama = "Noval";',
                    'validate' => function ($code) {
                        $c = strtolower($code);
                        return str_contains($c, 'let') && str_contains($c, 'nama') && str_contains($c, '"noval"');
                    },
                ],
            ],
            [
                'id' => 'js-functions',
                'title' => 'Fungsi',
                'content' => '<p>Fungsi adalah blok kode yang bisa dipanggil ulang. Dibuat dengan kata kunci <code>function</code>.</p>',
                'codeExample' => "function sapa(nama) {\n  return \"Halo \" + nama;\n}\nconsole.log(sapa(\"Budi\"));",
                'codeLang' => 'javascript',
                'exercise' => [
                    'prompt' => 'Buat function bernama "sapa" yang menerima parameter "nama"',
                    'starterCode' => "// Buat function di sini\n",
                    'hint' => 'function sapa(nama) { ... }',
                    'validate' => function ($code) {
                        $c = strtolower($code);
                        return str_contains($c, 'function') && str_contains($c, 'sapa') && str_contains($c, 'nama');
                    },
                ],
            ],
        ],
    ],
];

/** Find a course by id. */
function find_course(array $courses, $courseId)
{
    foreach ($courses as $course) {
        if ($course['id'] === $courseId) return $course;
    }
    return null;
}

/** Total number of lessons across all courses. */
function total_lesson_count(array $courses)
{
    $total = 0;
    foreach ($courses as $c) $total += count($c['lessons']);
    return $total;
}

/** Whether a course's prerequisites have been completed. */
function course_unlocked(array $course, array $completedLessonIds, array $allCourses)
{
    if (empty($course['prerequisites'])) return true;
    foreach ($course['prerequisites'] as $preId) {
        $pre = find_course($allCourses, $preId);
        if (!$pre) continue;
        foreach ($pre['lessons'] as $l) {
            if (!in_array($l['id'], $completedLessonIds, true)) return false;
        }
    }
    return true;
}
