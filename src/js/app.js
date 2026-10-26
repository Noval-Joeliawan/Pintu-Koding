// js/app.js — Main Application Controller
window.App = {
  _playgroundReady: false,

  init() {
    this._initTheme();
    Storage.init();
    if (window.State) {
      window.State.init();
    }
    if (window.Sandbox) {
      window.Sandbox.init();
    }

    if (!Storage.isOnboardingDone()) {
      this._showOnboarding();
      return;
    }

    this._startApp();
  },

  /* === THEME SWITCHER (LIGHT / DARK MODE) === */
  _initTheme() {
    const saved = localStorage.getItem("pk_theme");
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = saved || (prefersDark ? "dark" : "light");
    this.setTheme(theme, false);
  },

  setTheme(theme, save = true) {
    const validTheme = theme === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", validTheme);
    if (save) {
      localStorage.setItem("pk_theme", validTheme);
    }
    this._updateThemeButtons(validTheme);
  },

  toggleTheme() {
    const current =
      document.documentElement.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    this.setTheme(next, true);
    if (window.Navigation && typeof Navigation.showToast === "function") {
      Navigation.showToast(
        next === "dark"
          ? "🌙 Mode Gelap diaktifkan"
          : "☀️ Mode Terang diaktifkan",
        "info",
      );
    }
  },

  _updateThemeButtons(theme) {
    const isDark = theme === "dark";
    const icon = isDark ? "☀️" : "🌙";
    const label = isDark ? "Mode Terang" : "Mode Gelap";

    const sidebarIcon = document.getElementById("theme-toggle-icon");
    const sidebarLabel = document.getElementById("theme-toggle-label");
    if (sidebarIcon) sidebarIcon.textContent = icon;
    if (sidebarLabel) sidebarLabel.textContent = label;

    const mobBtn = document.getElementById("btn-theme-toggle-mob");
    if (mobBtn) {
      mobBtn.textContent = icon;
      mobBtn.setAttribute("title", `Ganti ke ${label}`);
    }
  },

  /* === HEART EXCHANGE SHOP (TUKAR XP -> HEART) === */
  openHeartShopModal() {
    const user = window.State ? window.State.getUser() : Storage.getUser();
    const hearts = user.hearts ?? 5;
    const xp = user.xp || 0;
    const costPerHeart = (window.Hearts && window.Hearts.COST_PER_HEART) || 50;
    const missingHearts = Math.max(0, 5 - hearts);
    const fullRefillCost = missingHearts * costPerHeart;

    const heartsVisual = "❤️".repeat(hearts) + "🖤".repeat(missingHearts);
    const canBuyOne = hearts < 5 && xp >= costPerHeart;
    const canBuyFull = missingHearts > 1 && xp >= fullRefillCost;

    let statusMessage = "";
    if (hearts >= 5) {
      statusMessage = `<div class="shop-status-box shop-status-full">✨ Heart kamu sudah penuh (5/5)! Siap lanjut belajar.</div>`;
    } else if (xp < costPerHeart) {
      statusMessage = `<div class="shop-status-box shop-status-warn">⚠️ XP belum cukup. Kamu butuh minimal <strong>${costPerHeart} XP</strong> (kurang ${costPerHeart - xp} XP lagi). Selesaikan latihan atau materi untuk mendapat XP!</div>`;
    } else {
      statusMessage = `<div class="shop-status-box shop-status-ok">💡 Tukarkan XP hasil belajarmu untuk memulihkan Heart secara instan tanpa menunggu timer!</div>`;
    }

    Navigation.showModal(`
      <div class="heart-shop-modal">
        <div class="shop-header-badge">⚡ TOKO PENUKARAN</div>
        <h3 class="shop-title">Isi Ulang Heart</h3>
        <p class="shop-subtitle">Gunakan XP kamu untuk memulihkan nyawa belajar.</p>

        <div class="shop-balance-row">
          <div class="shop-balance-pill shop-pill-xp">
            <span>⭐ Saldo XP</span>
            <strong id="shop-modal-xp">${xp} XP</strong>
          </div>
          <div class="shop-balance-pill shop-pill-hearts">
            <span>Nyawa Saat Ini</span>
            <strong id="shop-modal-hearts">${heartsVisual} (${hearts}/5)</strong>
          </div>
        </div>

        ${statusMessage}

        <div class="shop-options-list">
          <div class="shop-option-card ${canBuyOne ? "" : "is-disabled"}">
            <div class="shop-option-info">
              <div class="shop-option-icon">❤️ +1</div>
              <div>
                <div class="shop-option-name">Tambah 1 Heart</div>
                <div class="shop-option-desc">Pulihkan 1 nyawa secara instan</div>
              </div>
            </div>
            <button
              class="btn btn-primary btn-sm"
              ${canBuyOne ? "" : 'disabled aria-disabled="true"'}
              onclick="App.buyHeartWithXP(1)"
            >
              ⭐ ${costPerHeart} XP
            </button>
          </div>

          ${
            missingHearts > 1
              ? `
          <div class="shop-option-card ${canBuyFull ? "" : "is-disabled"}">
            <div class="shop-option-info">
              <div class="shop-option-icon">💖 +${missingHearts}</div>
              <div>
                <div class="shop-option-name">Isi Penuh (${missingHearts} Heart)</div>
                <div class="shop-option-desc">Langsung penuh 5/5 tanpa tunggu</div>
              </div>
            </div>
            <button
              class="btn btn-secondary btn-sm"
              ${canBuyFull ? "" : 'disabled aria-disabled="true"'}
              onclick="App.buyHeartWithXP(${missingHearts})"
            >
              ⭐ ${fullRefillCost} XP
            </button>
          </div>
          `
              : ""
          }
        </div>

        <div style="margin-top: 1.25rem; display: flex; justify-content: center;">
          <button class="btn btn-outline btn-block" onclick="Navigation.hideModal()">Tutup</button>
        </div>
      </div>
    `);
  },

  buyHeartWithXP(amount = 1) {
    if (!window.Hearts || typeof window.Hearts.buyWithXP !== "function") return;
    const result = window.Hearts.buyWithXP(amount);

    if (result && result.ok) {
      Navigation.updateAllStats();
      Navigation.showToast(
        `Berhasil menukar ${result.xpSpent} XP menjadi +${result.heartsGained} ❤️ Heart!`,
        "success",
      );
      // Jika masih belum penuh, perbarui isi modal; jika sudah penuh, tutup atau tampilkan status penuh
      this.openHeartShopModal();
    } else if (result && result.reason === "INSUFFICIENT_XP") {
      Navigation.showToast("XP kamu belum cukup untuk menukar Heart!", "error");
    } else if (result && result.reason === "HEARTS_FULL") {
      Navigation.showToast("Heart kamu sudah penuh!", "info");
    }
  },

  _showOnboarding() {
    document.getElementById("view-onboarding").style.display = "flex";
    document.getElementById("app-shell").style.display = "none";

    const btnStart = document.getElementById("btn-onboarding-start");
    const btnContinue = document.getElementById("btn-onboarding-continue");
    const inputName = document.getElementById("input-username");
    const step1 = document.getElementById("onboarding-step-1");
    const step2 = document.getElementById("onboarding-step-2");

    btnStart &&
      btnStart.addEventListener("click", () => {
        step1.style.display = "none";
        step2.style.display = "block";
        setTimeout(() => inputName && inputName.focus(), 100);
      });

    const finish = () => {
      const name = inputName ? inputName.value.trim() : "";
      if (!name) {
        if (inputName) {
          inputName.classList.add("is-invalid");
          inputName.setAttribute("aria-invalid", "true");
          inputName.focus();
        }
        const error = document.getElementById("onboarding-name-error");
        if (error)
          error.textContent = "Nama belum diisi. Tulis namamu dulu ya 😊";
        return;
      }
      if (inputName) {
        inputName.classList.remove("is-invalid");
        inputName.setAttribute("aria-invalid", "false");
      }
      const error = document.getElementById("onboarding-name-error");
      if (error) error.textContent = "";
      const user = Storage.getUser();
      user.username = name;
      Storage.saveUser(user);
      Storage.setOnboardingDone();
      document.getElementById("view-onboarding").style.display = "none";
      this._startApp();
    };

    btnContinue && btnContinue.addEventListener("click", finish);
    inputName &&
      inputName.addEventListener("input", () => {
        inputName.classList.remove("is-invalid");
        inputName.setAttribute("aria-invalid", "false");
        const error = document.getElementById("onboarding-name-error");
        if (error) error.textContent = "";
      });
    inputName &&
      inputName.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          finish();
        }
      });
  },

  _startApp() {
    document.getElementById("view-onboarding").style.display = "none";
    document.getElementById("app-shell").style.display = "flex";

    // Init modules
    if (window.State) window.State.init();
    if (window.Sandbox) window.Sandbox.init();
    if (window.XP && window.XP.init) window.XP.init();
    Hearts.init();
    Hearts.checkDailyBonus();
    if (window.Editor && window.Editor.initListeners)
      window.Editor.initListeners();
    if (window.LessonEngine && window.LessonEngine.initListeners)
      window.LessonEngine.initListeners();
    if (window.LessonEngine && window.LessonEngine.syncUnlocks)
      window.LessonEngine.syncUnlocks();
    Navigation.init();
    Navigation.initKeyboardShortcuts();
    Navigation.updateAllStats();
    Navigation.goto("dashboard");

    // Global event listeners
    this._attachListeners();
  },

  _attachListeners() {
    // Theme toggle buttons
    document
      .getElementById("btn-theme-toggle")
      ?.addEventListener("click", () => this.toggleTheme());
    document
      .getElementById("btn-theme-toggle-mob")
      ?.addEventListener("click", () => this.toggleTheme());

    // Heart Shop triggers (Sidebar, Mobile top bar, Dashboard card, Lesson footer)
    document
      .getElementById("btn-sidebar-buy-heart")
      ?.addEventListener("click", () => this.openHeartShopModal());
    document
      .getElementById("sidebar-heart-stat")
      ?.addEventListener("click", () => this.openHeartShopModal());
    document
      .getElementById("mob-hearts")
      ?.addEventListener("click", () => this.openHeartShopModal());
    document
      .getElementById("dash-card-hearts")
      ?.addEventListener("click", () => this.openHeartShopModal());
    document
      .getElementById("lesson-hearts-indicator")
      ?.addEventListener("click", () => this.openHeartShopModal());

    // Dashboard buttons
    document
      .getElementById("btn-start-learning")
      ?.addEventListener("click", () => {
        Navigation.goto("learning-path");
      });

    document
      .getElementById("btn-continue-learning")
      ?.addEventListener("click", () => {
        const user = Storage.getUser();
        if (user.lastLesson) {
          const parts = user.lastLesson.split("-");
          if (parts.length >= 2) {
            LessonEngine.open(parseInt(parts[0]), parseInt(parts[1]));
            return;
          }
        }
        Navigation.goto("learning-path");
      });

    // Lesson controls
    document
      .getElementById("btn-exit-lesson")
      ?.addEventListener("click", () => LessonEngine.close());
    document
      .getElementById("btn-prev-slide")
      ?.addEventListener("click", () => LessonEngine.prev());
    document
      .getElementById("btn-next-slide")
      ?.addEventListener("click", () => LessonEngine.next());
    document
      .getElementById("btn-check-answer")
      ?.addEventListener("click", () => LessonEngine.checkAnswer());

    // Profile
    document.getElementById("btn-edit-name")?.addEventListener("click", () => {
      const user = Storage.getUser();
      Navigation.showModal(`
        <div style="text-align:center">
          <h3 style="margin-bottom:1rem">✏️ Edit Nama</h3>
          <input type="text" id="modal-name-input" class="input-field" maxlength="30" autocomplete="name" style="margin-bottom:1rem">
          <div style="display:flex;gap:0.5rem;justify-content:center">
            <button class="btn btn-outline" onclick="Navigation.hideModal()">Batal</button>
            <button class="btn btn-primary" onclick="App._saveName()">Simpan</button>
          </div>
        </div>
      `);
      setTimeout(() => {
        const inp = document.getElementById("modal-name-input");
        if (inp) {
          inp.value = user.username || "";
          inp.focus();
          inp.select();
        }
      }, 100);
    });

    document
      .getElementById("btn-reset-progress")
      ?.addEventListener("click", () => {
        Navigation.showModal(`
        <div style="text-align:center">
          <div style="font-size:3rem;margin-bottom:1rem">⚠️</div>
          <h3 style="margin-bottom:0.5rem">Reset Semua Progress?</h3>
          <p style="color:var(--pk-text-light);margin-bottom:1.5rem">Tindakan ini tidak bisa dibatalkan. Semua XP, lesson, dan achievement akan hilang.</p>
          <div style="display:flex;gap:0.5rem;justify-content:center">
            <button class="btn btn-outline" onclick="Navigation.hideModal()">Batal</button>
            <button class="btn btn-danger" onclick="App._doReset()">Reset</button>
          </div>
        </div>
      `);
      });

    // Modal overlay click to close
    document.getElementById("modal-overlay")?.addEventListener("click", (e) => {
      if (e.target.id === "modal-overlay") Navigation.hideModal();
    });

    // Playground buttons
    document
      .getElementById("btn-playground-run")
      ?.addEventListener("click", () => {
        if (window.State && window.State.isHeartsEmpty()) {
          if (window.Events) {
            window.Events.emit(window.Events.HEARTS_EMPTY, {
              source: "playground",
            });
          }
          return;
        }
        Editor.runPreview(
          Editor.getCode("playground-editor"),
          "playground-preview",
        );
      });

    document
      .getElementById("btn-playground-reset")
      ?.addEventListener("click", () => {
        const def =
          "<h1>Hello World!</h1>\n<p>Selamat datang di PintuKoding Playground.</p>\n<p>Tulis HTML apapun di sini!</p>";
        Editor.setCode("playground-editor", def);
        const cm = Editor._cmById["playground-editor"];
        if (!cm)
          Editor.updateLineNumbers(
            "playground-editor",
            "playground-line-numbers",
          );
        Editor.runPreview(def, "playground-preview");
      });
  },

  _saveName() {
    const inp = document.getElementById("modal-name-input");
    const name = inp ? inp.value.trim() : "";
    if (!name) {
      Navigation.showToast("Nama tidak boleh kosong", "error");
      if (inp) inp.focus();
      return;
    }
    const user = Storage.getUser();
    user.username = name;
    Storage.saveUser(user);
    Navigation.hideModal();
    Navigation.renderDashboard();
    Navigation.renderProfile();
    Navigation.showToast("Nama berhasil diubah!", "success");
  },

  _doReset() {
    Storage.reset();
    Navigation.hideModal();
    location.reload();
  },

  initPlayground() {
    if (this._playgroundReady) {
      const cm = Editor._cmById["playground-editor"];
      if (cm) requestAnimationFrame(() => cm.refresh());
      return;
    }
    this._playgroundReady = true;

    const def =
      "<h1>Hello World!</h1>\n<p>Selamat datang di PintuKoding Playground.</p>\n<p>Tulis HTML apapun di sini!</p>";
    const ed = document.getElementById("playground-editor");
    if (ed && !ed.dataset.init) {
      ed.value = def;
      ed.dataset.init = "1";

      const cm = Editor.enhance("playground-editor", {
        onRun: () =>
          Editor.runPreview(
            Editor.getCode("playground-editor"),
            "playground-preview",
          ),
      });

      if (!cm) {
        ed.addEventListener("input", () => {
          Editor.updateLineNumbers(
            "playground-editor",
            "playground-line-numbers",
          );
        });

        ed.addEventListener("keydown", (e) => {
          if (e.key === "Enter" && (e.shiftKey || e.ctrlKey)) {
            e.preventDefault();
            Editor.runPreview(
              Editor.getCode("playground-editor"),
              "playground-preview",
            );
            return;
          }
          if (e.key === "Tab") {
            e.preventDefault();
            const s = ed.selectionStart;
            const end = ed.selectionEnd;
            ed.value =
              ed.value.substring(0, s) + "  " + ed.value.substring(end);
            ed.selectionStart = ed.selectionEnd = s + 2;
            Editor.updateLineNumbers(
              "playground-editor",
              "playground-line-numbers",
            );
          }
        });
      }

      if (!cm)
        Editor.updateLineNumbers(
          "playground-editor",
          "playground-line-numbers",
        );
      Editor.runPreview(def, "playground-preview");
    }
  },
};

window.addEventListener("pk:codemirror-ready", () => {
  if (!App._playgroundReady || Editor._cmById["playground-editor"]) return;
  const wrap = document.getElementById("playground-editor-wrapper");
  if (!wrap) return;
  Editor.enhance("playground-editor", {
    onRun: () =>
      Editor.runPreview(
        Editor.getCode("playground-editor"),
        "playground-preview",
      ),
  });
});

document.addEventListener("DOMContentLoaded", () => App.init());
