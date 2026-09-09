<?php
require_once 'config/database.php';
require_once 'includes/functions.php';
require_once 'includes/auth.php';
require_login();

$userId = $_SESSION['user_id'];
$user = current_user($pdo);
unset($user['password']);

$progress = $pdo->prepare('SELECT course_id, lesson_id, completed, completed_at FROM user_progress WHERE user_id = ?');
$progress->execute([$userId]);

$quiz = $pdo->prepare('SELECT quiz_id, is_correct, answered_at FROM quiz_results WHERE user_id = ?');
$quiz->execute([$userId]);

$achievements = $pdo->prepare('SELECT achievement_id, unlocked_at FROM user_achievements WHERE user_id = ?');
$achievements->execute([$userId]);

$data = [
    'user' => $user,
    'progress' => $progress->fetchAll(),
    'quiz_results' => $quiz->fetchAll(),
    'achievements' => $achievements->fetchAll(),
    'exported_at' => date('c'),
];

header('Content-Type: application/json');
header('Content-Disposition: attachment; filename="pintukoding-backup-' . time() . '.json"');
echo json_encode($data, JSON_PRETTY_PRINT);
