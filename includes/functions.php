<?php
/**
 * Shared helper functions used across PintuKoding.
 */

// XP required to reach level 1, 2, 3, ... (index 0 = level 1)
const LEVEL_XP = [0, 100, 250, 500, 800, 1200, 1700, 2300, 3000, 4000];

const XP_REWARD_LESSON = 20;
const XP_REWARD_EXERCISE = 30;
const XP_REWARD_QUIZ = 10;

// ------------------------------------------------------------
// Heart / lives system
// ------------------------------------------------------------
const MAX_HEARTS = 5;
const HEART_RESTORE_MINUTES = 30; // 1 heart is restored every 30 minutes

/** Escape output to prevent XSS. */
function h($str)
{
    return htmlspecialchars((string) $str, ENT_QUOTES, 'UTF-8');
}

/** Generate/validate a CSRF token stored in the session. */
function csrf_token()
{
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function csrf_check($token)
{
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], (string) $token);
}

/** Work out the level for a given XP amount. */
function xp_to_level($xp)
{
    $level = 1;
    foreach (LEVEL_XP as $i => $threshold) {
        if ($xp >= $threshold) {
            $level = $i + 1;
        }
    }
    return $level;
}

/** XP needed to reach the *next* level, and progress within the current level. */
function xp_progress($xp)
{
    $level = xp_to_level($xp);
    $current = LEVEL_XP[$level - 1] ?? 0;
    $next = LEVEL_XP[$level] ?? ($current + 1000);
    $percent = $next > $current ? min(100, round((($xp - $current) / ($next - $current)) * 100)) : 100;
    return [
        'level'   => $level,
        'current' => $current,
        'next'    => $next,
        'percent' => $percent,
    ];
}

/**
 * Award XP to a user, update their level/streak, and log the activity.
 * Returns an array with info about level-ups so the UI can celebrate.
 */
function award_xp(PDO $pdo, $userId, $amount, $description)
{
    $stmt = $pdo->prepare('SELECT xp, level FROM users WHERE id = ?');
    $stmt->execute([$userId]);
    $user = $stmt->fetch();
    if (!$user) return null;

    $oldLevel = (int) $user['level'];
    $newXp = (int) $user['xp'] + $amount;
    $newLevel = xp_to_level($newXp);

    $upd = $pdo->prepare('UPDATE users SET xp = ?, level = ? WHERE id = ?');
    $upd->execute([$newXp, $newLevel, $userId]);

    $log = $pdo->prepare('INSERT INTO activity_log (user_id, description, xp_earned) VALUES (?, ?, ?)');
    $log->execute([$userId, $description, $amount]);

    update_streak($pdo, $userId);
    $newAchievements = check_achievements($pdo, $userId);

    return [
        'leveled_up'       => $newLevel > $oldLevel,
        'new_level'        => $newLevel,
        'new_achievements' => $newAchievements,
    ];
}

/** Update the user's daily streak (call whenever the user does learning activity). */
function update_streak(PDO $pdo, $userId)
{
    $stmt = $pdo->prepare('SELECT streak, best_streak, last_activity_date FROM users WHERE id = ?');
    $stmt->execute([$userId]);
    $row = $stmt->fetch();
    if (!$row) return;

    $today = date('Y-m-d');
    $yesterday = date('Y-m-d', strtotime('-1 day'));

    if ($row['last_activity_date'] === $today) {
        return; // already counted today
    }

    $streak = $row['last_activity_date'] === $yesterday ? (int) $row['streak'] + 1 : 1;
    $bestStreak = max($streak, (int) $row['best_streak']);

    $upd = $pdo->prepare('UPDATE users SET streak = ?, best_streak = ?, last_activity_date = ? WHERE id = ?');
    $upd->execute([$streak, $bestStreak, $today, $userId]);
}

/** Check achievement conditions and unlock any newly-earned ones. Returns array of newly unlocked achievement ids. */
function check_achievements(PDO $pdo, $userId)
{
    global $ACHIEVEMENTS;

    $stats = get_user_stats($pdo, $userId);

    $already = $pdo->prepare('SELECT achievement_id FROM user_achievements WHERE user_id = ?');
    $already->execute([$userId]);
    $unlockedIds = $already->fetchAll(PDO::FETCH_COLUMN);

    $newlyUnlocked = [];
    foreach ($ACHIEVEMENTS as $a) {
        if (in_array($a['id'], $unlockedIds, true)) continue;
        if (call_user_func($a['condition'], $stats)) {
            $ins = $pdo->prepare('INSERT IGNORE INTO user_achievements (user_id, achievement_id) VALUES (?, ?)');
            $ins->execute([$userId, $a['id']]);
            $newlyUnlocked[] = $a;
        }
    }
    return $newlyUnlocked;
}

/** Gather the stats needed to evaluate achievement conditions and render the dashboard/profile. */
function get_user_stats(PDO $pdo, $userId)
{
    $user = $pdo->prepare('SELECT * FROM users WHERE id = ?');
    $user->execute([$userId]);
    $user = $user->fetch();

    $lessonsDone = $pdo->prepare('SELECT lesson_id, course_id FROM user_progress WHERE user_id = ? AND completed = 1');
    $lessonsDone->execute([$userId]);
    $completedLessons = $lessonsDone->fetchAll();

    $quizzesDone = $pdo->prepare('SELECT COUNT(*) FROM quiz_results WHERE user_id = ? AND is_correct = 1');
    $quizzesDone->execute([$userId]);
    $quizCount = (int) $quizzesDone->fetchColumn();

    return [
        'user'              => $user,
        'xp'                => (int) ($user['xp'] ?? 0),
        'level'             => (int) ($user['level'] ?? 1),
        'streak'            => (int) ($user['streak'] ?? 0),
        'best_streak'       => (int) ($user['best_streak'] ?? 0),
        'completed_lessons' => array_column($completedLessons, 'lesson_id'),
        'quiz_correct'      => $quizCount,
    ];
}

/**
 * Get the user's current heart count, applying any time-based restoration
 * first (and persisting it) so the caller always sees an up-to-date value.
 * Returns ['hearts' => int, 'max' => int, 'seconds_to_next' => int|null].
 */
function get_current_hearts(PDO $pdo, $userId)
{
    $stmt = $pdo->prepare('SELECT hearts, hearts_updated_at FROM users WHERE id = ?');
    $stmt->execute([$userId]);
    $row = $stmt->fetch();

    if (!$row) {
        return ['hearts' => MAX_HEARTS, 'max' => MAX_HEARTS, 'seconds_to_next' => null];
    }

    $hearts = (int) $row['hearts'];
    $updatedAt = $row['hearts_updated_at'];

    if ($hearts >= MAX_HEARTS || !$updatedAt) {
        return ['hearts' => $hearts, 'max' => MAX_HEARTS, 'seconds_to_next' => null];
    }

    $restoreSeconds = HEART_RESTORE_MINUTES * 60;
    $elapsed = time() - strtotime($updatedAt);
    $restored = intdiv($elapsed, $restoreSeconds);

    if ($restored > 0) {
        $newHearts = min(MAX_HEARTS, $hearts + $restored);
        // Keep the leftover (not-yet-earned) time so the next heart still
        // arrives on schedule instead of resetting the clock to "now".
        $remainder = $elapsed % $restoreSeconds;
        $newUpdatedAt = $newHearts >= MAX_HEARTS
            ? null
            : date('Y-m-d H:i:s', time() - $remainder);

        $upd = $pdo->prepare('UPDATE users SET hearts = ?, hearts_updated_at = ? WHERE id = ?');
        $upd->execute([$newHearts, $newUpdatedAt, $userId]);

        $hearts = $newHearts;
        $updatedAt = $newUpdatedAt;
    }

    $secondsToNext = ($hearts < MAX_HEARTS && $updatedAt)
        ? max(0, $restoreSeconds - (time() - strtotime($updatedAt)))
        : null;

    return ['hearts' => $hearts, 'max' => MAX_HEARTS, 'seconds_to_next' => $secondsToNext];
}

/**
 * Spend one heart for a wrong exercise/quiz answer. Server-authoritative:
 * always resolves the user from the session-backed $userId, never from
 * anything the client sends. Uses an atomic UPDATE (hearts > 0 guard) so a
 * user can never be pushed below zero even with rapid repeated requests.
 * Returns the same shape as get_current_hearts(), plus 'lost' (bool).
 */
function lose_heart(PDO $pdo, $userId)
{
    // Apply any pending restoration first so we spend from an accurate total.
    $before = get_current_hearts($pdo, $userId);

    if ($before['hearts'] <= 0) {
        return $before + ['lost' => false];
    }

    $stmt = $pdo->prepare('UPDATE users SET hearts = hearts - 1, hearts_updated_at = NOW() WHERE id = ? AND hearts > 0');
    $stmt->execute([$userId]);

    $after = get_current_hearts($pdo, $userId);
    return $after + ['lost' => true];
}

/** Redirect helper. */
function redirect($path)
{
    header('Location: ' . $path);
    exit;
}

/** Flash message helpers (stored in the session, shown once). */
function flash_set($type, $message)
{
    $_SESSION['flash'] = ['type' => $type, 'message' => $message];
}

function flash_get()
{
    if (empty($_SESSION['flash'])) return null;
    $flash = $_SESSION['flash'];
    unset($_SESSION['flash']);
    return $flash;
}
