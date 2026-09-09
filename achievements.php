<?php
require_once 'config/database.php';
require_once 'includes/functions.php';
require_once 'includes/auth.php';
require_login();
require_once 'includes/data_courses.php';
require_once 'includes/data_achievements.php';

$user = current_user($pdo);
$stats = get_user_stats($pdo, $user['id']);

$unlocked = $pdo->prepare('SELECT achievement_id, unlocked_at FROM user_achievements WHERE user_id = ?');
$unlocked->execute([$user['id']]);
$unlockedMap = [];
foreach ($unlocked->fetchAll() as $row) {
    $unlockedMap[$row['achievement_id']] = $row['unlocked_at'];
}

$active = 'achievements';
$pageTitle = 'Achievements';
require 'includes/header.php';
?>

<div class="page-header">
  <h1 class="page-title">🏆 Achievements</h1>
  <p class="page-subtitle"><?= count($unlockedMap) ?> dari <?= count($ACHIEVEMENTS) ?> achievement terbuka</p>
</div>

<div class="achievement-grid">
  <?php foreach ($ACHIEVEMENTS as $a):
      $isUnlocked = isset($unlockedMap[$a['id']]);
  ?>
    <div class="card achievement-card <?= $isUnlocked ? 'unlocked' : '' ?>">
      <div class="achievement-emoji"><?= $a['icon'] ?></div>
      <div style="font-weight:700;margin-bottom:4px"><?= h($a['title']) ?></div>
      <div style="font-size:13px;color:var(--color-text-muted)"><?= h($a['description']) ?></div>
      <?php if ($isUnlocked): ?>
        <div style="font-size:12px;color:var(--color-success);margin-top:8px">✓ <?= date('d M Y', strtotime($unlockedMap[$a['id']])) ?></div>
      <?php else: ?>
        <div style="font-size:12px;color:var(--color-text-muted);margin-top:8px">🔒 Belum terbuka</div>
      <?php endif; ?>
    </div>
  <?php endforeach; ?>
</div>

<?php require 'includes/footer.php'; ?>
