<?php
require_once 'config/database.php';
require_once 'includes/functions.php';
require_once 'includes/auth.php';
require_login();
require_once 'includes/data_courses.php';

$user = current_user($pdo);
$stats = get_user_stats($pdo, $user['id']);
$completedLessons = $stats['completed_lessons'];

$active = 'learning-path';
$pageTitle = 'Learning Path';
require 'includes/header.php';
?>

<div class="page-header">
  <h1 class="page-title">🗺️ Learning Path</h1>
  <p class="page-subtitle">Pilih course dan mulai perjalananmu</p>
</div>

<div class="path-container">
  <?php foreach ($COURSES as $course):
      $unlocked = course_unlocked($course, $completedLessons, $COURSES);
      $done = count(array_intersect(array_column($course['lessons'], 'id'), $completedLessons));
      $total = count($course['lessons']);
      $pct = round(($done / $total) * 100);

      if (!$unlocked) { $status = 'locked'; $badgeClass = 'badge-locked'; $badgeText = '🔒 Locked'; }
      elseif ($done === 0) { $status = 'available'; $badgeClass = 'badge-primary'; $badgeText = '✨ Available'; }
      elseif ($done === $total) { $status = 'completed'; $badgeClass = 'badge-success'; $badgeText = '✓ Completed'; }
      else { $status = 'in-progress'; $badgeClass = 'badge-warning'; $badgeText = '🚀 In Progress'; }

      $nextLessonIndex = min($done, $total - 1);
  ?>
    <div class="course-node <?= $status ?>">
      <div class="course-icon-wrap"><?= $course['icon'] ?></div>
      <?php if ($unlocked): ?>
        <a class="course-card clickable" href="lesson.php?course=<?= urlencode($course['id']) ?>&lesson=<?= $nextLessonIndex ?>" style="display:block">
      <?php else: ?>
        <div class="course-card">
      <?php endif; ?>
        <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:8px;flex-wrap:wrap;gap:8px">
          <h3 class="course-title"><?= h($course['title']) ?></h3>
          <span class="badge <?= $badgeClass ?>"><?= $badgeText ?></span>
        </div>
        <p class="course-desc"><?= h($course['description']) ?></p>
        <div class="course-meta">
          <span>📚 <?= $total ?> lesson</span>
          <span>✓ <?= $done ?> selesai</span>
        </div>
        <div class="progress"><div class="progress-bar <?= $status === 'completed' ? 'success' : '' ?>" style="width:<?= $pct ?>%"></div></div>
        <?php if (!$unlocked): ?>
          <p style="margin-top:8px;font-size:13px;color:var(--color-text-muted)">🔒 Selesaikan course prerequisite terlebih dahulu.</p>
        <?php endif; ?>
      <?= $unlocked ? '</a>' : '</div>' ?>
    </div>
  <?php endforeach; ?>
</div>

<?php require 'includes/footer.php'; ?>
