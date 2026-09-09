<?php
require_once 'config/database.php';
require_once 'includes/functions.php';
require_once 'includes/auth.php';
require_login();
require_once 'includes/data_quiz.php';

$user = current_user($pdo);

$answered = $pdo->prepare('SELECT quiz_id FROM quiz_results WHERE user_id = ? AND is_correct = 1');
$answered->execute([$user['id']]);
$answeredIds = $answered->fetchAll(PDO::FETCH_COLUMN);

$active = 'quiz';
$pageTitle = 'Quiz';
require 'includes/header.php';
$csrf = csrf_token();
?>

<div class="page-header">
  <h1 class="page-title">🧠 Quiz</h1>
  <p class="page-subtitle">Uji pemahamanmu — jawab benar untuk mendapatkan +<?= XP_REWARD_QUIZ ?> XP per soal</p>
</div>

<?php if ($hearts <= 0): ?>
  <div class="hearts-out-banner" style="margin-bottom:var(--space-lg)">
    <span class="emoji">❤️</span>
    <span><strong>Kamu kehabisan hearts!</strong><br>Kamu sudah menggunakan semua hearts. Tunggu hingga hearts terisi kembali sebelum menjawab quiz lagi.</span>
  </div>
<?php endif; ?>

<?php foreach ($QUIZZES as $q):
    $isAnswered = in_array($q['id'], $answeredIds, true);
    $isLocked = !$isAnswered && $hearts <= 0;
?>
  <div class="card quiz-card <?= $isAnswered ? 'quiz-answered' : '' ?>">
    <form id="quiz-form-<?= h($q['id']) ?>" onsubmit="return false">
      <div class="quiz-question"><?= h($q['question']) ?> <?= $isAnswered ? '<span class="badge badge-success">✓ Terjawab</span>' : '' ?></div>
      <div class="quiz-options">
        <?php foreach ($q['options'] as $key => $text): ?>
          <label class="quiz-option">
            <input type="radio" name="quiz-<?= h($q['id']) ?>" value="<?= h($key) ?>" <?= ($isAnswered || $isLocked) ? 'disabled' : '' ?>>
            <span><?= h($text) ?></span>
          </label>
        <?php endforeach; ?>
      </div>
      <button type="button" class="btn btn-primary" style="margin-top:var(--space-md)" id="quiz-btn-<?= h($q['id']) ?>"
        onclick="submitQuizAnswer('<?= h($q['id']) ?>', '<?= h($csrf) ?>')" <?= ($isAnswered || $isLocked) ? 'disabled' : '' ?>>
        <?= $isAnswered ? 'Terjawab' : 'Cek Jawaban' ?>
      </button>
      <div class="quiz-feedback <?= $isAnswered ? 'show correct' : '' ?>" id="quiz-feedback-<?= h($q['id']) ?>"><?= $isAnswered ? '✓ Sudah dijawab benar sebelumnya.' : '' ?></div>
    </form>
  </div>
<?php endforeach; ?>

<?php require 'includes/footer.php'; ?>
