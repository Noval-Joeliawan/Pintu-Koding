<?php
require_once '../config/database.php';
require_once '../includes/functions.php';
require_once '../includes/auth.php';
require_once '../includes/data_quiz.php';
require_once '../includes/data_courses.php';
require_once '../includes/data_achievements.php';

header('Content-Type: application/json');

if (empty($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['correct' => false, 'error' => 'Silakan login terlebih dahulu.']);
    exit;
}

if (!csrf_check($_POST['csrf_token'] ?? '')) {
    http_response_code(403);
    echo json_encode(['correct' => false, 'error' => 'Sesi tidak valid, muat ulang halaman.']);
    exit;
}

$userId = (int) $_SESSION['user_id'];
$quizId = $_POST['quiz_id'] ?? '';
$option = $_POST['option'] ?? '';

// Block the attempt entirely while the user has no hearts left.
$heartsInfo = get_current_hearts($pdo, $userId);
if ($heartsInfo['hearts'] <= 0) {
    echo json_encode([
        'correct' => false,
        'out_of_hearts' => true,
        'hearts' => $heartsInfo['hearts'],
        'hearts_max' => $heartsInfo['max'],
    ]);
    exit;
}

$quiz = find_quiz($QUIZZES, $quizId);
if (!$quiz) {
    echo json_encode(['correct' => false, 'error' => 'Soal tidak ditemukan.']);
    exit;
}

$isCorrect = ($option === $quiz['answer']);

if (!$isCorrect) {
    $heartsResult = lose_heart($pdo, $userId);
    echo json_encode([
        'correct' => false,
        'hearts' => $heartsResult['hearts'],
        'hearts_max' => $heartsResult['max'],
    ]);
    exit;
}

// Was this quiz already answered correctly before?
$check = $pdo->prepare('SELECT is_correct FROM quiz_results WHERE user_id = ? AND quiz_id = ?');
$check->execute([$userId, $quizId]);
$existing = $check->fetch();
$alreadyCorrect = $existing && (int) $existing['is_correct'] === 1;

$stmt = $pdo->prepare(
    'INSERT INTO quiz_results (user_id, quiz_id, is_correct, answered_at) VALUES (?, ?, 1, NOW())
     ON DUPLICATE KEY UPDATE is_correct = 1, answered_at = NOW()'
);
$stmt->execute([$userId, $quizId]);

$result = ['correct' => true, 'xp_earned' => 0, 'leveled_up' => false, 'new_achievements' => []];

if (!$alreadyCorrect) {
    $reward = award_xp($pdo, $userId, XP_REWARD_QUIZ, 'Menjawab quiz dengan benar');
    $result['xp_earned'] = XP_REWARD_QUIZ;
    $result['leveled_up'] = $reward['leveled_up'] ?? false;
    $result['new_achievements'] = array_map(fn($a) => $a['title'], $reward['new_achievements'] ?? []);
}

echo json_encode($result);
