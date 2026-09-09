<?php
require_once 'config/database.php';
require_once 'includes/functions.php';
require_once 'includes/auth.php';

if (!empty($_SESSION['user_id'])) {
    redirect('dashboard.php');
}

$errors = [];
$old = ['username' => '', 'email' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!csrf_check($_POST['csrf_token'] ?? '')) {
        $errors[] = 'Sesi form kedaluwarsa, silakan coba lagi.';
    } else {
        $username = trim($_POST['username'] ?? '');
        $email = trim($_POST['email'] ?? '');
        $password = $_POST['password'] ?? '';
        $confirm = $_POST['confirm_password'] ?? '';
        $old = ['username' => $username, 'email' => $email];

        if ($username === '' || $email === '' || $password === '') {
            $errors[] = 'Semua field wajib diisi.';
        }
        if ($username !== '' && !preg_match('/^[a-zA-Z0-9_]{3,20}$/', $username)) {
            $errors[] = 'Username 3-20 karakter, hanya huruf, angka, dan underscore.';
        }
        if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors[] = 'Format email tidak valid.';
        }
        if ($password !== '' && strlen($password) < 6) {
            $errors[] = 'Password minimal 6 karakter.';
        }
        if ($password !== $confirm) {
            $errors[] = 'Konfirmasi password tidak cocok.';
        }

        if (empty($errors)) {
            $check = $pdo->prepare('SELECT id FROM users WHERE username = ? OR email = ?');
            $check->execute([$username, $email]);
            if ($check->fetch()) {
                $errors[] = 'Username atau email sudah digunakan.';
            }
        }

        if (empty($errors)) {
            $hash = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $pdo->prepare('INSERT INTO users (username, email, password) VALUES (?, ?, ?)');
            $stmt->execute([$username, $email, $hash]);

            session_regenerate_id(true);
            $_SESSION['user_id'] = (int) $pdo->lastInsertId();
            flash_set('success', '✓ Registrasi berhasil! Selamat datang di PintuKoding.');
            redirect('dashboard.php');
        }
    }
}
?>
<!doctype html>
<html lang="id" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Register - PintuKoding</title>
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
  <div class="auth-page">
    <div class="auth-card">
      <div class="auth-logo"><div class="auth-logo-icon">🔷</div> PintuKoding</div>
      <div class="auth-title">Buat Akun Baru 🚀</div>
      <div class="auth-subtitle">Mulai perjalanan belajar codingmu</div>

      <?php foreach ($errors as $err): ?>
        <div class="alert alert-danger">⚠️ <?= h($err) ?></div>
      <?php endforeach; ?>

      <form method="post" novalidate>
        <input type="hidden" name="csrf_token" value="<?= h(csrf_token()) ?>">
        <div class="form-group">
          <label class="form-label" for="username">Username</label>
          <input class="input" type="text" id="username" name="username" value="<?= h($old['username']) ?>" maxlength="20" required>
        </div>
        <div class="form-group">
          <label class="form-label" for="email">Email</label>
          <input class="input" type="email" id="email" name="email" value="<?= h($old['email']) ?>" required>
        </div>
        <div class="form-group">
          <label class="form-label" for="password">Password</label>
          <div class="password-wrap">
            <input class="input" type="password" id="password" name="password" required>
            <button type="button" class="password-toggle" onclick="togglePassword('password', this)">Tampilkan</button>
          </div>
          <div class="form-hint">Minimal 6 karakter.</div>
        </div>
        <div class="form-group">
          <label class="form-label" for="confirm_password">Konfirmasi Password</label>
          <div class="password-wrap">
            <input class="input" type="password" id="confirm_password" name="confirm_password" required>
            <button type="button" class="password-toggle" onclick="togglePassword('confirm_password', this)">Tampilkan</button>
          </div>
        </div>
        <button type="submit" class="btn btn-primary btn-lg btn-block">Register</button>
      </form>
      <div class="auth-footer">Sudah punya akun? <a href="login.php">Login</a></div>
    </div>
  </div>
  <script src="assets/js/app.js"></script>
</body>
</html>
