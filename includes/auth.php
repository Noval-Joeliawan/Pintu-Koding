<?php
/**
 * Session bootstrap and authentication guards.
 * Include this AFTER config/database.php and includes/functions.php.
 */

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

/** Redirect to login.php if nobody is logged in. Call at the top of every protected page. */
function require_login()
{
    if (empty($_SESSION['user_id'])) {
        redirect('login.php');
    }
}

/** Fetch the currently logged-in user's row (fresh from the DB, never trust session data for anything but the id). */
function current_user(PDO $pdo)
{
    if (empty($_SESSION['user_id'])) return null;
    $stmt = $pdo->prepare('SELECT * FROM users WHERE id = ?');
    $stmt->execute([$_SESSION['user_id']]);
    $user = $stmt->fetch();
    if (!$user) {
        // Session pointed at a user that no longer exists — log out safely.
        session_destroy();
        return null;
    }
    return $user;
}
