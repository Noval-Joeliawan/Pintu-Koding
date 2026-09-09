<?php
require_once 'config/database.php';
require_once 'includes/functions.php';
require_once 'includes/auth.php';

if (!empty($_SESSION['user_id'])) {
    redirect('dashboard.php');
}

$guestTheme = $_COOKIE['pk_theme'] ?? 'light';
?>
<!doctype html>
<html lang="id" data-theme="<?= h($guestTheme) ?>">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PintuKoding - Belajar Coding Interaktif</title>
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
  <nav class="landing-nav">
    <div class="landing-logo"><div class="landing-logo-icon">🔷</div> PintuKoding</div>
    <div class="landing-nav-links">
      <button class="btn btn-secondary" onclick="toggleGuestTheme()" id="theme-toggle-btn"><?= $guestTheme === 'dark' ? '☀️' : '🌙' ?></button>
      <a class="btn btn-secondary" href="login.php">Login</a>
      <a class="btn btn-primary" href="register.php">Daftar Gratis</a>
    </div>
  </nav>

  <section class="landing-hero">
    <h1>Belajar <span class="highlight">Coding</span> Jadi Lebih Mudah &amp; Seru</h1>
    <p>Pelajari HTML, CSS, dan JavaScript lewat lesson interaktif, quiz, dan playground langsung di browser. Progress kamu tersimpan otomatis.</p>
    <div class="landing-hero-actions">
      <a class="btn btn-primary btn-lg" href="register.php">Mulai Belajar Gratis</a>
      <a class="btn btn-secondary btn-lg" href="#features">Lihat Fitur</a>
    </div>
  </section>

  <section class="landing-section" id="features">
    <h2 class="landing-section-title">Semua yang Kamu Butuhkan</h2>
    <p class="landing-section-subtitle">Satu platform untuk belajar, latihan, dan tracking progress</p>
    <div class="grid grid-4">
      <div class="card feature-card">
        <div class="feature-icon">🗺️</div>
        <h3>Learning Path</h3>
        <p style="color:var(--color-text-muted);font-size:13px;margin-top:6px">Jalur belajar terstruktur dari HTML, CSS, sampai JavaScript.</p>
      </div>
      <div class="card feature-card">
        <div class="feature-icon">💻</div>
        <h3>Code Playground</h3>
        <p style="color:var(--color-text-muted);font-size:13px;margin-top:6px">Tulis dan jalankan kode HTML/CSS/JS langsung, lihat hasilnya real-time.</p>
      </div>
      <div class="card feature-card">
        <div class="feature-icon">🧠</div>
        <h3>Quiz Interaktif</h3>
        <p style="color:var(--color-text-muted);font-size:13px;margin-top:6px">Uji pemahamanmu dengan quiz pilihan ganda dan feedback instan.</p>
      </div>
      <div class="card feature-card">
        <div class="feature-icon">🏆</div>
        <h3>XP &amp; Achievement</h3>
        <p style="color:var(--color-text-muted);font-size:13px;margin-top:6px">Kumpulkan XP, naik level, dan buka achievement seru.</p>
      </div>
    </div>
  </section>

  <div class="landing-cta">
    <h2>Siap Mulai Belajar Coding?</h2>
    <p style="opacity:.9;margin-bottom:var(--space-lg)">Gratis, tanpa kartu kredit. Progress belajarmu aman tersimpan di akunmu.</p>
    <a class="btn btn-primary btn-lg" href="register.php">Daftar Sekarang</a>
  </div>

  <footer class="landing-footer">PintuKoding &middot; Proyek UTS &middot; © <?= date('Y') ?></footer>

  <script src="assets/js/app.js"></script>
  <script>
    function toggleGuestTheme() {
      const html = document.documentElement;
      const current = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      document.cookie = 'pk_theme=' + next + ';path=/;max-age=' + (60 * 60 * 24 * 365);
      document.getElementById('theme-toggle-btn').textContent = next === 'dark' ? '☀️' : '🌙';
    }
  </script>
</body>
</html>
