<?php
/**
 * Shared layout header for logged-in pages.
 * Expects $user (array from current_user()) and $active (nav key) to be set
 * by the including page. Optional $pageTitle / $pageSubtitle for the header block.
 */
$theme = $user['theme'] ?? 'light';
$initial = strtoupper(substr($user['username'] ?? 'U', 0, 1));
$heartsInfo = get_current_hearts($pdo, $user['id']);
$hearts = $heartsInfo['hearts'];
$heartsMax = $heartsInfo['max'];
$heartsEmoji = $hearts > 0 ? '❤️' : '🖤';
$heartsPopoverText = $hearts > 0
    ? "Kamu punya $hearts/$heartsMax hearts. Hearts berkurang saat jawaban latihan atau quiz kamu salah."
    : "Hearts kamu habis. Tunggu hingga hearts terisi kembali sebelum lanjut mengerjakan latihan atau quiz.";
if ($hearts < $heartsMax) {
    $heartsPopoverText .= ' Hearts terisi otomatis seiring waktu, maksimal ' . $heartsMax . '.';
}

/**
 * Markup for the heart/lives pill + popover, reused twice below (topbar
 * for mobile, sidebar for desktop) — kept in one string so both stay
 * in sync. $idSuffix keeps element ids unique between the two copies.
 */
$heartsPillHtml = function ($idSuffix) use ($hearts, $heartsMax, $heartsEmoji, $heartsPopoverText) {
    ?>
    <div class="hearts-pill-wrap">
      <button type="button" class="hearts-pill <?= $hearts <= 0 ? 'empty' : '' ?>" id="hearts-pill-<?= h($idSuffix) ?>" onclick="toggleHeartsPopover(this)" aria-haspopup="true">
        <span class="hearts-emoji" data-hearts-emoji><?= $heartsEmoji ?></span>
        <span data-hearts-value><?= (int) $hearts ?></span><span class="hearts-max">/<?= (int) $heartsMax ?></span>
      </button>
      <div class="hearts-popover" id="hearts-popover-<?= h($idSuffix) ?>">
        <div class="hearts-popover-title">❤️ Hearts</div>
        <div class="hearts-popover-body" data-hearts-popover-text><?= h($heartsPopoverText) ?></div>
      </div>
    </div>
    <?php
};
?>
<!doctype html>
<html lang="id" data-theme="<?= h($theme) ?>">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= isset($pageTitle) ? h($pageTitle) . ' - ' : '' ?>PintuKoding</title>
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
<div class="app-shell">
  <div class="sidebar-overlay" id="sidebar-overlay" onclick="toggleSidebar()"></div>
  <aside class="sidebar" id="sidebar">
    <div class="sidebar-brand">
      <div class="sidebar-brand-left">
        <div class="sidebar-brand-icon">🔷</div>
        PintuKoding
      </div>
    </div>
    <nav class="sidebar-nav">
      <a class="sidebar-item <?= $active === 'dashboard' ? 'active' : '' ?>" href="dashboard.php"><span class="icon">🏠</span> Dashboard</a>
      <a class="sidebar-item <?= $active === 'learning-path' ? 'active' : '' ?>" href="learning-path.php"><span class="icon">🗺️</span> Learning Path</a>
      <a class="sidebar-item <?= $active === 'playground' ? 'active' : '' ?>" href="playground.php"><span class="icon">💻</span> Playground</a>
      <a class="sidebar-item <?= $active === 'quiz' ? 'active' : '' ?>" href="quiz.php"><span class="icon">🧠</span> Quiz</a>
      <a class="sidebar-item <?= $active === 'achievements' ? 'active' : '' ?>" href="achievements.php"><span class="icon">🏆</span> Achievements</a>
      <div class="sidebar-divider"></div>
      <a class="sidebar-item <?= $active === 'profile' ? 'active' : '' ?>" href="profile.php"><span class="icon">👤</span> Profile</a>
      <a class="sidebar-item <?= $active === 'settings' ? 'active' : '' ?>" href="settings.php"><span class="icon">⚙️</span> Settings</a>
      <a class="sidebar-item" href="logout.php"><span class="icon">🚪</span> Logout</a>
    </nav>
    <div class="sidebar-user">
      <div class="avatar"><?= h($initial) ?></div>
      <div style="min-width:0">
        <div class="sidebar-user-name"><?= h($user['username'] ?? 'User') ?></div>
        <div class="sidebar-user-level">Level <?= (int) ($user['level'] ?? 1) ?> · <?= (int) ($user['xp'] ?? 0) ?> XP</div>
      </div>
    </div>
  </aside>

  <div class="main-area">
    <div class="topbar">
      <div class="topbar-left">
        <button class="topbar-toggle" onclick="toggleSidebar()">☰</button>
        <div class="landing-logo"><div class="sidebar-brand-icon" style="width:28px;height:28px;font-size:14px">🔷</div> PintuKoding</div>
      </div>
      <div class="topbar-right">
        <?php $heartsPillHtml('mobile'); ?>
        <div class="avatar" style="width:30px;height:30px;font-size:13px"><?= h($initial) ?></div>
      </div>
    </div>
    <main class="main-content">
      <?php $flash = flash_get(); if ($flash): ?>
        <div class="alert alert-<?= h($flash['type']) ?>"><?= h($flash['message']) ?></div>
      <?php endif; ?>
