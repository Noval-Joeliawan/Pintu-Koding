<?php
/**
 * Database connection (PDO + MySQL / XAMPP defaults).
 * Edit the constants below if your local MySQL setup is different.
 */

define('DB_HOST', 'localhost');
define('DB_NAME', 'pintukoding');
define('DB_USER', 'root');
define('DB_PASS', ''); // default XAMPP MySQL password is empty

try {
    $pdo = new PDO(
        'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]
    );
} catch (PDOException $e) {
    // Never expose raw DB errors to the user (rule #19/#20)
    http_response_code(500);
    die('Koneksi database gagal. Pastikan MySQL berjalan dan database "pintukoding" sudah dibuat (lihat database/pintukoding.sql).');
}
