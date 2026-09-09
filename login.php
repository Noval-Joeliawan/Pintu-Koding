<?php
require_once 'config/database.php';
require_once 'includes/functions.php';
require_once 'includes/auth.php';

if (!empty($_SESSION['user_id'])) {
    redirect('dashboard.php');
}

$errors = [];
$oldEmail = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!csrf_check($_POST['csrf_token'] ?? '')) {
        $errors[] = 'Sesi form kedaluwarsa, silakan coba lagi.';
    } else {
        $email = trim($_POST['email'] ?? '');
        $password = $_POST['password'] ?? '';
        $oldEmail = $email;

        if ($email === '' || $password === '') {
            $errors[] = 'Email dan password wajib diisi.';
        } else {
            $stmt = $pdo->prepare('SELECT * FROM users WHERE email = ?');
            $stmt->execute([$email]);
            $user = $stmt->fetch();

            if (!$user || !password_verify($password, $user['password'])) {
                $errors[] = 'Email atau password salah.';
            } else {
                session_regenerate_id(true);
                $_SESSION['user_id'] = (int) $user['id'];
                redirect('dashboard.php');
            }
        }
    }
}
?>
<!doctype html>
<html lang="id" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login - PintuKoding</title>
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
  <div class="auth-page">
    <div class="auth-card">
      <div class="auth-logo"><div class="auth-logo-icon">🔷</div> PintuKoding</div>
      <div class="auth-title">Selamat Datang Kembali 👋</div>
      <div class="auth-subtitle">Login untuk lanjutkan belajar</div>

      <?php foreach ($errors as $err): ?>
        <div class="alert alert-danger">❌ <?= h($err) ?></div>
      <?php endforeach; ?>

      <form method="post" novalidate>
        <input type="hidden" name="csrf_token" value="<?= h(csrf_token()) ?>">
        <div class="form-group">
          <label class="form-label" for="email">Email</label>
          <input class="input" type="email" id="email" name="email" value="<?= h($oldEmail) ?>" required autofocus>
        </div>
        <div class="form-group">
          <label class="form-label" for="password">Password</label>
          <div class="password-wrap">
            <input class="input" type="password" id="password" name="password" required>
            <button type="button" class="password-toggle" onclick="togglePassword('password', this)">Tampilkan</button>
          </div>
        </div>
        <button type="submit" class="btn btn-primary btn-lg btn-block">Login</button>
      </form>
      <div class="auth-footer">Belum punya akun? <a href="register.php">Register</a></div>
    </div>
  </div>
  <script src="assets/js/app.js"></script>
</body>
</html>
