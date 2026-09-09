<?php
require_once 'config/database.php';
require_once 'includes/functions.php';
require_once 'includes/auth.php';
require_login();

$user = current_user($pdo);
$userId = $user['id'];

if ($_SERVER['REQUEST_METHOD'] === 'POST' && csrf_check($_POST['csrf_token'] ?? '')) {
    $action = $_POST['action'] ?? '';

    if ($action === 'set_theme') {
        $theme = ($_POST['theme'] ?? 'light') === 'dark' ? 'dark' : 'light';
        $stmt = $pdo->prepare('UPDATE users SET theme = ? WHERE id = ?');
        $stmt->execute([$theme, $userId]);
        flash_set('success', "✓ Tema $theme diterapkan.");
        redirect('settings.php');
    }

    if ($action === 'reset_progress') {
        $pdo->prepare('DELETE FROM user_progress WHERE user_id = ?')->execute([$userId]);
        $pdo->prepare('DELETE FROM quiz_results WHERE user_id = ?')->execute([$userId]);
        $pdo->prepare('DELETE FROM user_achievements WHERE user_id = ?')->execute([$userId]);
        $pdo->prepare('DELETE FROM activity_log WHERE user_id = ?')->execute([$userId]);
        $pdo->prepare('UPDATE users SET xp = 0, level = 1, streak = 0, best_streak = 0, last_activity_date = NULL, hearts = ?, hearts_updated_at = NULL WHERE id = ?')->execute([MAX_HEARTS, $userId]);
        flash_set('success', '✓ Progress berhasil direset.');
        redirect('settings.php');
    }
}

$user = current_user($pdo); // refresh after possible update
$active = 'settings';
$pageTitle = 'Settings';
require 'includes/header.php';
?>

<div class="page-header">
  <h1 class="page-title">⚙️ Settings</h1>
  <p class="page-subtitle">Atur preferensi akunmu</p>
</div>

<div class="card" style="margin-bottom:var(--space-lg)">
  <div class="card-header"><h3 class="card-title">🎨 Appearance</h3></div>
  <div class="settings-row">
    <div>
      <div class="settings-row-title">Tema</div>
      <div class="settings-row-desc">Pilih tampilan light atau dark</div>
    </div>
    <div style="display:flex;gap:8px">
      <form method="post"><input type="hidden" name="csrf_token" value="<?= h(csrf_token()) ?>"><input type="hidden" name="action" value="set_theme"><input type="hidden" name="theme" value="light">
        <button type="submit" class="btn btn-secondary <?= $user['theme'] === 'light' ? 'active' : '' ?>">☀️ Light</button>
      </form>
      <form method="post"><input type="hidden" name="csrf_token" value="<?= h(csrf_token()) ?>"><input type="hidden" name="action" value="set_theme"><input type="hidden" name="theme" value="dark">
        <button type="submit" class="btn btn-secondary <?= $user['theme'] === 'dark' ? 'active' : '' ?>">🌙 Dark</button>
      </form>
    </div>
  </div>
</div>

<div class="card" style="margin-bottom:var(--space-lg)">
  <div class="card-header"><h3 class="card-title">📊 Data</h3></div>
  <div class="settings-row">
    <div>
      <div class="settings-row-title">Export Progress</div>
      <div class="settings-row-desc">Download data belajarmu sebagai JSON</div>
    </div>
    <a class="btn btn-secondary" href="export.php">⬇️ Export</a>
  </div>
  <div class="settings-row">
    <div>
      <div class="settings-row-title" style="color:var(--color-danger)">Reset Progress</div>
      <div class="settings-row-desc">Hapus semua XP, level, dan progress lesson</div>
    </div>
    <button class="btn btn-danger" onclick="openResetModal()">🗑️ Reset</button>
  </div>
</div>

<div class="card">
  <div class="card-header"><h3 class="card-title">ℹ️ Tentang</h3></div>
  <div>
    <div style="font-weight:600">PintuKoding</div>
    <div style="font-size:13px;color:var(--color-text-muted);margin-top:2px">Versi 2.0.0 (PHP + MySQL) &middot; © <?= date('Y') ?></div>
  </div>
</div>

<div class="modal-overlay" id="reset-modal">
  <div class="modal-box">
    <div style="font-size:2.5rem;margin-bottom:8px">⚠️</div>
    <h3 style="margin-bottom:8px">Reset semua progress?</h3>
    <p style="color:var(--color-text-muted);font-size:14px">Tindakan ini akan menghapus XP, level, streak, lesson selesai, hasil quiz, dan achievement kamu. Tidak bisa dibatalkan.</p>
    <div class="modal-actions">
      <button class="btn btn-secondary" onclick="closeResetModal()">Batal</button>
      <form method="post" style="display:inline">
        <input type="hidden" name="csrf_token" value="<?= h(csrf_token()) ?>">
        <input type="hidden" name="action" value="reset_progress">
        <button type="submit" class="btn btn-danger">Ya, Reset</button>
      </form>
    </div>
  </div>
</div>

<?php require 'includes/footer.php'; ?>
