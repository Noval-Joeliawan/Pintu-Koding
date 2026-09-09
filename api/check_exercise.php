<?php
require_once '../config/database.php';
require_once '../includes/functions.php';
require_once '../includes/auth.php';
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

$userId = (int) $_SESSION['user_id']; // never trust any user_id from the request itself
$courseId = $_POST['course_id'] ?? '';
$lessonId = $_POST['lesson_id'] ?? '';
$code = $_POST['code'] ?? '';

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

$course = find_course($COURSES, $courseId);
$lesson = null;
if ($course) {
    foreach ($course['lessons'] as $l) {
        if ($l['id'] === $lessonId) { $lesson = $l; break; }
    }
}

if (!$course || !$lesson) {
    echo json_encode(['correct' => false, 'error' => 'Lesson tidak ditemukan.']);
    exit;
}

$isCorrect = (bool) call_user_func($lesson['exercise']['validate'], $code);

if (!$isCorrect) {
    $heartsResult = lose_heart($pdo, $userId);
    echo json_encode([
        'correct' => false,
        'hint' => $lesson['exercise']['hint'],
        'hearts' => $heartsResult['hearts'],
        'hearts_max' => $heartsResult['max'],
    ]);
    exit;
}

// Was this lesson already completed before?
$check = $pdo->prepare('SELECT completed FROM user_progress WHERE user_id = ? AND lesson_id = ?');
$check->execute([$userId, $lessonId]);
$existing = $check->fetch();
$alreadyCompleted = $existing && (int) $existing['completed'] === 1;

$result = ['correct' => true, 'already_completed' => $alreadyCompleted, 'xp_earned' => 0, 'leveled_up' => false, 'new_achievements' => []];

if (!$alreadyCompleted) {
    $stmt = $pdo->prepare(
        'INSERT INTO user_progress (user_id, course_id, lesson_id, completed, completed_at)
         VALUES (?, ?, ?, 1, NOW())
         ON DUPLICATE KEY UPDATE completed = 1, completed_at = NOW()'
    );
    $stmt->execute([$userId, $courseId, $lessonId]);

    $xpAmount = XP_REWARD_LESSON + XP_REWARD_EXERCISE;
    $reward = award_xp($pdo, $userId, $xpAmount, 'Menyelesaikan lesson: ' . $lesson['title']);

    $result['xp_earned'] = $xpAmount;
    $result['leveled_up'] = $reward['leveled_up'] ?? false;
    $result['new_level'] = $reward['new_level'] ?? null;
    $result['new_achievements'] = array_map(fn($a) => $a['title'], $reward['new_achievements'] ?? []);
}

echo json_encode($result);
