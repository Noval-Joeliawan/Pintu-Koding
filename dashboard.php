<?php
require_once 'config/database.php';
require_once 'includes/functions.php';
require_once 'includes/auth.php';
require_login();
require_once 'includes/data_courses.php';

$user = current_user($pdo);
$stats = get_user_stats($pdo, $user['id']);
$completedLessons = $stats['completed_lessons'];

// Achievement count
$achCount = $pdo->prepare('SELECT COUNT(*) FROM user_achievements WHERE user_id = ?');
$achCount->execute([$user['id']]);
$achievementCount = (int) $achCount->fetchColumn();

// Find "continue learning" course/lesson: first course whose prerequisites are met and has an incomplete lesson
$continue = null;
foreach ($COURSES as $course) {
    if (!course_unlocked($course, $completedLessons, $COURSES)) continue;
    foreach ($course['lessons'] as $idx => $lesson) {
        if (!in_array($lesson['id'], $completedLessons, true)) {
            $continue = [
                'course' => $course,
                'lessonIndex' => $idx,
                'lesson' => $lesson,
                'percent' => round(($idx / count($course['lessons'])) * 100),
            ];
            break 2;
        }
    }
}

// Recent activity
$actStmt = $pdo->prepare('SELECT description, xp_earned, created_at FROM activity_log WHERE user_id = ? ORDER BY created_at DESC LIMIT 5');
$actStmt->execute([$user['id']]);
$activities = $actStmt->fetchAll();

function relative_time($ts)
{
    $diff = time() - strtotime($ts);
    if ($diff < 60) return 'Baru saja';
    if ($diff < 3600) return floor($diff / 60) . ' menit lalu';
    if ($diff < 86400) return floor($diff / 3600) . ' jam lalu';
    if ($diff < 604800) return floor($diff / 86400) . ' hari lalu';
    return date('d M Y', strtotime($ts));
}

$active = 'dashboard';
$pageTitle = 'Dashboard';
require 'includes/header.php';
?>

<div class="dashboard-hero">
  <h1>Halo, <?= h($user['username']) ?>! 👋</h1>
  <p>Siap belajar coding hari ini?</p>
</div>

<div class="dashboard-stats">
  <div class="stat-card"><div class="stat-icon streak">🔥</div><div><div class="stat-value"><?= (int) $user['streak'] ?></div><div class="stat-label">Hari Streak</div></div></div>
  <div class="stat-card"><div class="stat-icon xp">⭐</div><div><div class="stat-value"><?= (int) $user['xp'] ?></div><div class="stat-label">Total XP</div></div></div>
  <div class="stat-card"><div class="stat-icon badges">🏆</div><div><div class="stat-value"><?= $achievementCount ?></div><div class="stat-label">Achievement</div></div></div>
  <div class="stat-card"><div class="stat-icon lessons">📚</div><div><div class="stat-value"><?= count($completedLessons) ?></div><div class="stat-label">Lesson Selesai</div></div></div>
  <div class="stat-card"><div class="stat-icon hearts" data-hearts-emoji><?= $heartsInfo['hearts'] > 0 ? '❤️' : '🖤' ?></div><div><div class="stat-value"><span data-hearts-value><?= (int) $heartsInfo['hearts'] ?></span>/<?= (int) $heartsInfo['max'] ?></div><div class="stat-label">Hearts</div></div></div>
</div>

<div class="grid grid-2" style="margin-bottom: var(--space-xl);">
  <div class="card">
    <div class="card-header"><h3 class="card-title">🚀 Continue Learning</h3></div>
    <?php if ($continue): ?>
      <div style="display:flex;align-items:center;gap:var(--space-lg);padding:var(--space-md) 0">
        <div style="width:60px;height:60px;border-radius:var(--radius-md);background:var(--color-primary-light);color:var(--color-primary);display:flex;align-items:center;justify-content:center;font-size:28px"><?= $continue['course']['icon'] ?></div>
        <div style="flex:1">
          <div style="font-weight:600;margin-bottom:4px"><?= h($continue['course']['title']) ?></div>
          <div style="font-size:13px;color:var(--color-text-muted);margin-bottom:8px">Lesson <?= $continue['lessonIndex'] + 1 ?>/<?= count($continue['course']['lessons']) ?> &middot; <?= h($continue['lesson']['title']) ?></div>
          <div class="progress"><div class="progress-bar" style="width:<?= $continue['percent'] ?>%"></div></div>
        </div>
      </div>
      <a class="btn btn-primary btn-block" href="lesson.php?course=<?= urlencode($continue['course']['id']) ?>&lesson=<?= $continue['lessonIndex'] ?>">Lanjutkan →</a>
    <?php else: ?>
      <div class="empty-state">
        <div class="emoji">🎉</div>
        <p>Semua lesson yang tersedia sudah selesai!</p>
        <a class="btn btn-primary" href="learning-path.php" style="margin-top:var(--space-md)">Lihat Learning Path</a>
      </div>
    <?php endif; ?>
  </div>

  <div class="card">
    <div class="card-header">
      <h3 class="card-title">📊 Progress Belajar</h3>
    </div>
    <?php foreach ($COURSES as $course):
        $done = count(array_intersect(array_column($course['lessons'], 'id'), $completedLessons));
        $pct = round(($done / count($course['lessons'])) * 100);
    ?>
      <div style="margin-bottom:var(--space-md)">
        <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px">
          <span><?= $course['icon'] ?> <?= h($course['title']) ?></span>
          <span style="color:var(--color-text-muted)"><?= $pct ?>%</span>
        </div>
        <div class="progress"><div class="progress-bar <?= $pct === 100 ? 'success' : '' ?>" style="width:<?= $pct ?>%"></div></div>
      </div>
    <?php endforeach; ?>
  </div>
</div>

<div class="card">
  <div class="card-header"><h3 class="card-title">⚡ Recent Activity</h3></div>
  <?php if ($activities): ?>
    <?php foreach ($activities as $a): ?>
      <div class="activity-row">
        <div class="activity-icon">✓</div>
        <div style="flex:1">
          <div style="font-weight:500;font-size:14px"><?= h($a['description']) ?></div>
          <div style="font-size:12px;color:var(--color-text-muted)"><?= relative_time($a['created_at']) ?></div>
        </div>
        <div style="color:var(--color-success);font-weight:700;font-size:14px">+<?= (int) $a['xp_earned'] ?> XP</div>
      </div>
    <?php endforeach; ?>
  <?php else: ?>
    <div class="empty-state">
      <div class="emoji">📝</div>
      <p>Belum ada aktivitas. Yuk mulai lesson pertamamu!</p>
    </div>
  <?php endif; ?>
</div>

<?php require 'includes/footer.php'; ?>
