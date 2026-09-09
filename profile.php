<?php
require_once 'config/database.php';
require_once 'includes/functions.php';
require_once 'includes/auth.php';
require_login();
require_once 'includes/data_achievements.php';

$user = current_user($pdo);
$userId = $user['id'];
$errors = [];
$success = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!csrf_check($_POST['csrf_token'] ?? '')) {
        $errors[] = 'Sesi form kedaluwarsa, silakan coba lagi.';
    } else {
        $email = trim($_POST['email'] ?? '');
        $newPassword = $_POST['new_password'] ?? '';
        $currentPassword = $_POST['current_password'] ?? '';

        if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors[] = 'Format email tidak valid.';
        }

        if ($newPassword !== '' && strlen($newPassword) < 6) {
            $errors[] = 'Password baru minimal 6 karakter.';
        }

        if (empty($errors)) {
            $dup = $pdo->prepare('SELECT id FROM users WHERE email = ? AND id != ?');
            $dup->execute([$email, $userId]);
            if ($dup->fetch()) {
                $errors[] = 'Email sudah digunakan akun lain.';
            }
        }

        if ($newPassword !== '' && empty($errors)) {
            if (!password_verify($currentPassword, $user['password'])) {
                $errors[] = 'Password saat ini salah.';
            }
        }

        if (empty($errors)) {
            if ($newPassword !== '') {
                $stmt = $pdo->prepare('UPDATE users SET email = ?, password = ? WHERE id = ?');
                $stmt->execute([$email, password_hash($newPassword, PASSWORD_DEFAULT), $userId]);
            } else {
                $stmt = $pdo->prepare('UPDATE users SET email = ? WHERE id = ?');
                $stmt->execute([$email, $userId]);
            }
            $success = '✓ Profil berhasil diperbarui.';
            $user = current_user($pdo);
        }
    }
}

$stats = get_user_stats($pdo, $userId);
$progress = xp_progress($stats['xp']);

$achCount = $pdo->prepare('SELECT achievement_id FROM user_achievements WHERE user_id = ?');
$achCount->execute([$userId]);
$unlockedIds = $achCount->fetchAll(PDO::FETCH_COLUMN);
$unlockedAchievements = array_filter($ACHIEVEMENTS, fn($a) => in_array($a['id'], $unlockedIds, true));

$active = 'profile';
$pageTitle = 'Profile';
require 'includes/header.php';
?>

<div class="profile-hero">
  <div class="profile-avatar"><?= h(strtoupper(substr($user['username'], 0, 1))) ?></div>
  <h1 style="color:#fff;margin-top:8px"><?= h($user['username']) ?></h1>
  <p style="opacity:.9">Level <?= (int) $user['level'] ?> · <?= (int) $user['xp'] ?> XP</p>
  <p style="opacity:.9">🔥 <?= (int) $user['streak'] ?> Day Streak</p>
</div>

<div class="grid grid-4" style="margin-bottom:var(--space-xl)">
  <div class="stat-card"><div class="stat-icon lessons">📚</div><div><div class="stat-value"><?= count($stats['completed_lessons']) ?></div><div class="stat-label">Lessons</div></div></div>
  <div class="stat-card"><div class="stat-icon xp">🧠</div><div><div class="stat-value"><?= $stats['quiz_correct'] ?></div><div class="stat-label">Quiz Benar</div></div></div>
  <div class="stat-card"><div class="stat-icon badges">🏆</div><div><div class="stat-value"><?= count($unlockedAchievements) ?></div><div class="stat-label">Achievements</div></div></div>
  <div class="stat-card"><div class="stat-icon streak">⭐</div><div><div class="stat-value"><?= (int) $user['xp'] ?></div><div class="stat-label">Total XP</div></div></div>
</div>

<div class="card" style="margin-bottom:var(--space-lg)">
  <div class="card-header"><h3 class="card-title">📈 Level Progress</h3></div>
  <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px;color:var(--color-text-muted)">
    <span>Level <?= $progress['level'] ?></span>
    <span><?= (int) $user['xp'] ?> / <?= $progress['next'] ?> XP</span>
  </div>
  <div class="progress"><div class="progress-bar" style="width:<?= $progress['percent'] ?>%"></div></div>
</div>

<?php if ($unlockedAchievements): ?>
<div class="card" style="margin-bottom:var(--space-lg)">
  <div class="card-header"><h3 class="card-title">🏆 Achievements</h3></div>
  <div style="display:flex;flex-wrap:wrap;gap:8px">
    <?php foreach ($unlockedAchievements as $a): ?>
      <span class="badge badge-primary"><?= $a['icon'] ?> <?= h($a['title']) ?></span>
    <?php endforeach; ?>
  </div>
</div>
<?php endif; ?>

<div class="card">
  <div class="card-header"><h3 class="card-title">⚙️ Edit Profil</h3></div>

  <?php foreach ($errors as $err): ?>
    <div class="alert alert-danger">⚠️ <?= h($err) ?></div>
  <?php endforeach; ?>
  <?php if ($success): ?>
    <div class="alert alert-success"><?= h($success) ?></div>
  <?php endif; ?>

  <form method="post">
    <input type="hidden" name="csrf_token" value="<?= h(csrf_token()) ?>">
    <div class="form-group">
      <label class="form-label">Username</label>
      <input class="input" type="text" value="<?= h($user['username']) ?>" disabled>
      <div class="form-hint">Username tidak dapat diubah.</div>
    </div>
    <div class="form-group">
      <label class="form-label" for="email">Email</label>
      <input class="input" type="email" id="email" name="email" value="<?= h($user['email']) ?>" required>
    </div>
    <div class="form-group">
      <label class="form-label" for="new_password">Password Baru (opsional)</label>
      <input class="input" type="password" id="new_password" name="new_password" placeholder="Kosongkan jika tidak ingin ganti">
    </div>
    <div class="form-group">
      <label class="form-label" for="current_password">Password Saat Ini</label>
      <input class="input" type="password" id="current_password" name="current_password" placeholder="Wajib diisi jika mengganti password">
    </div>
    <button type="submit" class="btn btn-primary">💾 Simpan</button>
  </form>
</div>

<?php require 'includes/footer.php'; ?>
