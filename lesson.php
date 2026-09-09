<?php
require_once 'config/database.php';
require_once 'includes/functions.php';
require_once 'includes/auth.php';
require_login();
require_once 'includes/data_courses.php';

$user = current_user($pdo);
$stats = get_user_stats($pdo, $user['id']);
$completedLessons = $stats['completed_lessons'];

$courseId = $_GET['course'] ?? '';
$lessonIndex = (int) ($_GET['lesson'] ?? 0);

$course = find_course($COURSES, $courseId);
if (!$course || !course_unlocked($course, $completedLessons, $COURSES)) {
    flash_set('danger', 'Course tidak ditemukan atau masih terkunci.');
    redirect('learning-path.php');
}
if ($lessonIndex < 0 || $lessonIndex >= count($course['lessons'])) {
    redirect('learning-path.php');
}
$lesson = $course['lessons'][$lessonIndex];
$isCompleted = in_array($lesson['id'], $completedLessons, true);
$totalLessons = count($course['lessons']);

$active = 'learning-path';
$pageTitle = $lesson['title'];
require 'includes/header.php';
?>

<div class="page-header">
  <p class="page-subtitle"><a href="learning-path.php">🗺️ Learning Path</a> / <?= h($course['title']) ?></p>
  <h1 class="page-title"><?= $course['icon'] ?> <?= h($lesson['title']) ?> <?= $isCompleted ? '<span class="badge badge-success">✓ Selesai</span>' : '' ?></h1>
</div>

<div class="lesson-progress-bar-wrap">
  <div style="display:flex;justify-content:space-between;font-size:13px;color:var(--color-text-muted);margin-bottom:6px">
    <span>Lesson <?= $lessonIndex + 1 ?> dari <?= $totalLessons ?></span>
    <span><?= round((($lessonIndex + 1) / $totalLessons) * 100) ?>%</span>
  </div>
  <div class="progress"><div class="progress-bar" style="width:<?= round((($lessonIndex + 1) / $totalLessons) * 100) ?>%"></div></div>
</div>

<div class="card" style="margin-bottom:var(--space-lg)">
  <div class="lesson-content"><?= $lesson['content'] ?></div>
  <h3 style="margin-bottom:8px">📄 Contoh Kode</h3>
  <div class="code-block"><?= h($lesson['codeExample']) ?></div>
</div>

<div class="exercise-box">
  <h3 style="margin-bottom:8px">✏️ Latihan</h3>
  <p style="margin-bottom:var(--space-md)"><?= h($lesson['exercise']['prompt']) ?></p>
  <textarea class="exercise-editor" id="exercise-code" <?= (!$isCompleted && $hearts <= 0) ? 'disabled' : '' ?>><?= h($lesson['exercise']['starterCode']) ?></textarea>
  <div style="display:flex;gap:8px;margin-top:var(--space-md);flex-wrap:wrap">
    <button class="btn btn-primary" id="exercise-check-btn" onclick="checkExercise('<?= h($course['id']) ?>', '<?= h($lesson['id']) ?>', '<?= h(csrf_token()) ?>')" <?= (!$isCompleted && $hearts <= 0) ? 'disabled' : '' ?>>Cek Jawaban</button>
  </div>
  <div class="exercise-result <?= $isCompleted ? 'show correct' : '' ?>" id="exercise-result">
    <?php if ($isCompleted): ?>
      ✓ Kamu sudah menyelesaikan latihan ini.
    <?php endif; ?>
  </div>
  <?php if (!$isCompleted && $hearts <= 0): ?>
    <div class="hearts-out-banner">
      <span class="emoji">❤️</span>
      <span><strong>Kamu kehabisan hearts!</strong><br>Kamu sudah menggunakan semua hearts. Tunggu hingga hearts terisi kembali sebelum melanjutkan latihan ini.</span>
    </div>
  <?php endif; ?>
</div>

<div class="lesson-nav">
  <?php if ($lessonIndex > 0): ?>
    <a class="btn btn-secondary" href="lesson.php?course=<?= urlencode($course['id']) ?>&lesson=<?= $lessonIndex - 1 ?>">← Sebelumnya</a>
  <?php else: ?>
    <span></span>
  <?php endif; ?>

  <?php if ($lessonIndex < $totalLessons - 1): ?>
    <a class="btn btn-primary" href="lesson.php?course=<?= urlencode($course['id']) ?>&lesson=<?= $lessonIndex + 1 ?>">Selanjutnya →</a>
  <?php else: ?>
    <a class="btn btn-primary" href="learning-path.php">Selesai — Kembali ke Learning Path 🎉</a>
  <?php endif; ?>
</div>

<?php require 'includes/footer.php'; ?>
