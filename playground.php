<?php
require_once 'config/database.php';
require_once 'includes/functions.php';
require_once 'includes/auth.php';
require_login();

$user = current_user($pdo);

$active = 'playground';
$pageTitle = 'Playground';
require 'includes/header.php';
?>

<div class="page-header">
  <h1 class="page-title">💻 Code Playground</h1>
  <p class="page-subtitle">Tulis HTML, CSS, dan JavaScript, lalu lihat hasilnya langsung.</p>
</div>

<div class="card">
  <div class="playground-tabs">
    <button class="playground-tab" id="pg-tab-html" onclick="Playground.showTab('html')">HTML</button>
    <button class="playground-tab" id="pg-tab-css" onclick="Playground.showTab('css')">CSS</button>
    <button class="playground-tab" id="pg-tab-js" onclick="Playground.showTab('js')">JavaScript</button>
  </div>

  <div class="playground-grid">
    <div style="height:100%">
      <textarea class="playground-editor" id="pg-html" spellcheck="false"></textarea>
      <textarea class="playground-editor" id="pg-css" spellcheck="false" style="display:none"></textarea>
      <textarea class="playground-editor" id="pg-js" spellcheck="false" style="display:none"></textarea>
    </div>
    <iframe class="playground-preview" id="pg-preview" title="Preview" sandbox="allow-scripts allow-modals"></iframe>
  </div>

  <div class="playground-actions">
    <button class="btn btn-primary" onclick="Playground.run()">▶️ Run Code</button>
    <button class="btn btn-secondary" onclick="Playground.reset()">↩️ Reset ke Contoh</button>
    <button class="btn btn-secondary" onclick="Playground.clear()">🗑️ Clear</button>
  </div>
</div>

<?php require 'includes/footer.php'; ?>
