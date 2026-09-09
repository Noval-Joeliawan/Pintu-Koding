<?php
/**
 * Standalone quiz question bank. Each question is answered independently
 * and gives immediate feedback (see quiz.php / api/submit_quiz.php).
 */

$QUIZZES = [
    [
        'id' => 'q1',
        'question' => 'Apa kepanjangan dari HTML?',
        'options' => [
            'a' => 'Hyper Trainer Marking Language',
            'b' => 'HyperText Markup Language',
            'c' => 'Home Tool Markup Language',
            'd' => 'Hyperlinks and Text Markup Language',
        ],
        'answer' => 'b',
    ],
    [
        'id' => 'q2',
        'question' => 'Elemen apa yang digunakan untuk membuat heading paling besar?',
        'options' => [
            'a' => '<heading>',
            'b' => '<h6>',
            'c' => '<h1>',
            'd' => '<head>',
        ],
        'answer' => 'c',
    ],
    [
        'id' => 'q3',
        'question' => 'Manakah cara yang benar untuk menulis komentar di CSS?',
        'options' => [
            'a' => '// komentar',
            'b' => '<!-- komentar -->',
            'c' => '/* komentar */',
            'd' => '# komentar',
        ],
        'answer' => 'c',
    ],
    [
        'id' => 'q4',
        'question' => 'Properti CSS mana yang digunakan untuk mengubah warna teks?',
        'options' => [
            'a' => 'text-color',
            'b' => 'font-color',
            'c' => 'color',
            'd' => 'background-color',
        ],
        'answer' => 'c',
    ],
    [
        'id' => 'q5',
        'question' => 'Kata kunci apa yang digunakan untuk mendeklarasikan variabel yang bisa diubah nilainya di JavaScript?',
        'options' => [
            'a' => 'let',
            'b' => 'val',
            'c' => 'var-only',
            'd' => 'static',
        ],
        'answer' => 'a',
    ],
    [
        'id' => 'q6',
        'question' => 'Apa fungsi console.log() di JavaScript?',
        'options' => [
            'a' => 'Menghapus elemen HTML',
            'b' => 'Menampilkan output ke konsol browser',
            'c' => 'Membuat file baru',
            'd' => 'Mengubah warna halaman',
        ],
        'answer' => 'b',
    ],
    [
        'id' => 'q7',
        'question' => 'Benar atau salah: tag <ul> digunakan untuk membuat ordered list bernomor.',
        'options' => [
            'a' => 'Benar',
            'b' => 'Salah',
        ],
        'answer' => 'b',
    ],
    [
        'id' => 'q8',
        'question' => 'Manakah selector CSS yang benar untuk memilih elemen dengan id "main"?',
        'options' => [
            'a' => '.main',
            'b' => '#main',
            'c' => '*main',
            'd' => 'main{}',
        ],
        'answer' => 'b',
    ],
];

/** Find a quiz question by its id. */
function find_quiz(array $quizzes, $quizId)
{
    foreach ($quizzes as $q) {
        if ($q['id'] === $quizId) return $q;
    }
    return null;
}
