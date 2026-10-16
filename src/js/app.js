// js/app.js — Main Application Controller
window.App = {
  _playgroundReady: false,

  init() {
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

  _showOnboarding() {
    // Show onboarding, hide app shell
    document.getElementById('view-onboarding').style.display = 'flex';
    document.getElementById('app-shell').style.display = 'none';

    const btnStart = document.getElementById('btn-onboarding-start');
    const btnContinue = document.getElementById('btn-onboarding-continue');
    const inputName = document.getElementById('input-username');
    const step1 = document.getElementById('onboarding-step-1');
    const step2 = document.getElementById('onboarding-step-2');

    btnStart && btnStart.addEventListener('click', () => {
      step1.style.display = 'none';
      step2.style.display = 'block';
      setTimeout(() => inputName && inputName.focus(), 100);
    });

    const finish = () => {
      const name = inputName ? inputName.value.trim() : '';
      if (!name) {
        if (inputName) {
          inputName.classList.add('is-invalid');
          inputName.setAttribute('aria-invalid', 'true');
          inputName.focus();
        }
        const error = document.getElementById('onboarding-name-error');
        if (error) error.textContent = 'Nama belum diisi. Tulis namamu dulu ya 😊';
        return;
      }
      if (inputName) {
        inputName.classList.remove('is-invalid');
        inputName.setAttribute('aria-invalid', 'false');
      }
      const error = document.getElementById('onboarding-name-error');
      if (error) error.textContent = '';
      const user = Storage.getUser();
      user.username = name;
      Storage.saveUser(user);
      Storage.setOnboardingDone();
      document.getElementById('view-onboarding').style.display = 'none';
      this._startApp();
    };

    btnContinue && btnContinue.addEventListener('click', finish);
    inputName && inputName.addEventListener('input', () => {
      inputName.classList.remove('is-invalid');
      inputName.setAttribute('aria-invalid', 'false');
      const error = document.getElementById('onboarding-name-error');
      if (error) error.textContent = '';
    });
    inputName && inputName.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); finish(); }
    });
  },

  _startApp() {
    document.getElementById('view-onboarding').style.display = 'none';
    document.getElementById('app-shell').style.display = 'flex';

    // Init modules
    if (window.State) window.State.init();
    if (window.Sandbox) window.Sandbox.init();
    if (window.XP && window.XP.init) window.XP.init();
    Hearts.init();
    Hearts.checkDailyBonus();
    if (window.Editor && window.Editor.initListeners) window.Editor.initListeners();
    if (window.LessonEngine && window.LessonEngine.initListeners) window.LessonEngine.initListeners();
    Navigation.init();
    Navigation.initKeyboardShortcuts();
    Navigation.updateAllStats();
    Navigation.goto('dashboard');

    // Global event listeners
    this._attachListeners();
  },

  _attachListeners() {
    // Dashboard buttons
    document.getElementById('btn-start-learning')?.addEventListener('click', () => {
      Navigation.goto('learning-path');
    });

    document.getElementById('btn-continue-learning')?.addEventListener('click', () => {
      const user = Storage.getUser();
      if (user.lastLesson) {
        const parts = user.lastLesson.split('-');
        if (parts.length >= 2) {
          LessonEngine.open(parseInt(parts[0]), parseInt(parts[1]));
          return;
        }
      }
      Navigation.goto('learning-path');
    });

    // Lesson controls
    document.getElementById('btn-exit-lesson')?.addEventListener('click', () => LessonEngine.close());
    document.getElementById('btn-prev-slide')?.addEventListener('click', () => LessonEngine.prev());
    document.getElementById('btn-next-slide')?.addEventListener('click', () => LessonEngine.next());
    document.getElementById('btn-check-answer')?.addEventListener('click', () => LessonEngine.checkAnswer());

    // Profile
    document.getElementById('btn-edit-name')?.addEventListener('click', () => {
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
        const inp = document.getElementById('modal-name-input');
        if (inp) { inp.value = user.username || ''; inp.focus(); inp.select(); }
      }, 100);
    });

    document.getElementById('btn-reset-progress')?.addEventListener('click', () => {
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
    document.getElementById('modal-overlay')?.addEventListener('click', (e) => {
      if (e.target.id === 'modal-overlay') Navigation.hideModal();
    });

    // Playground buttons
    document.getElementById('btn-playground-run')?.addEventListener('click', () => {
      if (window.State && window.State.isHeartsEmpty()) {
        if (window.Events) {
          window.Events.emit(window.Events.HEARTS_EMPTY, { source: 'playground' });
        }
        return;
      }
      Editor.runPreview(Editor.getCode('playground-editor'), 'playground-preview');
    });

    document.getElementById('btn-playground-reset')?.addEventListener('click', () => {
      const def = '<h1>Hello World!</h1>\n<p>Selamat datang di PintuKoding Playground.</p>\n<p>Tulis HTML apapun di sini!</p>';
      Editor.setCode('playground-editor', def);
      const cm = Editor._cmById['playground-editor'];
      if (!cm) Editor.updateLineNumbers('playground-editor', 'playground-line-numbers');
      Editor.runPreview(def, 'playground-preview');
    });
  },

  _saveName() {
    const inp = document.getElementById('modal-name-input');
    const name = inp ? inp.value.trim() : '';
    if (!name) {
      Navigation.showToast('Nama tidak boleh kosong', 'error');
      if (inp) inp.focus();
      return;
    }
    const user = Storage.getUser();
    user.username = name;
    Storage.saveUser(user);
    Navigation.hideModal();
    Navigation.renderDashboard();
    Navigation.renderProfile();
    Navigation.showToast('Nama berhasil diubah!', 'success');
  },

  _doReset() {
    Storage.reset();
    Navigation.hideModal();
    location.reload();
  },

  initPlayground() {
    if (this._playgroundReady) {
      // CodeMirror measures itself while visible; after being hidden (or the phone was rotated
      // meanwhile) gutter/cursor positions go stale until refreshed.
      const cm = Editor._cmById['playground-editor'];
      if (cm) requestAnimationFrame(() => cm.refresh());
      return;
    }
    this._playgroundReady = true;

    const def = '<h1>Hello World!</h1>\n<p>Selamat datang di PintuKoding Playground.</p>\n<p>Tulis HTML apapun di sini!</p>';
    const ed = document.getElementById('playground-editor');
    if (ed && !ed.dataset.init) {
      ed.value = def;
      ed.dataset.init = '1';

      // Upgrade to CodeMirror (syntax highlighting, line numbers, auto-indent).
      // Falls back to plain textarea behavior if the library is not available.
      const cm = Editor.enhance('playground-editor', {
        onRun: () => Editor.runPreview(Editor.getCode('playground-editor'), 'playground-preview')
      });

      if (!cm) {
        // Fallback: keep existing manual behavior
        ed.addEventListener('input', () => {
          Editor.updateLineNumbers('playground-editor', 'playground-line-numbers');
        });

        ed.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' && (e.shiftKey || e.ctrlKey)) {
            e.preventDefault();
            Editor.runPreview(Editor.getCode('playground-editor'), 'playground-preview');
            return;
          }
          if (e.key === 'Tab') {
            e.preventDefault();
            const s = ed.selectionStart;
            const end = ed.selectionEnd;
            ed.value = ed.value.substring(0, s) + '  ' + ed.value.substring(end);
            ed.selectionStart = ed.selectionEnd = s + 2;
            Editor.updateLineNumbers('playground-editor', 'playground-line-numbers');
          }
        });
      }

      if (!cm) Editor.updateLineNumbers('playground-editor', 'playground-line-numbers');
      Editor.runPreview(def, 'playground-preview');
    }
  }
};

// CodeMirror loads in the background; if it arrives after the Playground was already
// opened as a plain textarea, upgrade that editor in place (content is preserved).
window.addEventListener('pk:codemirror-ready', () => {
  if (!App._playgroundReady || Editor._cmById['playground-editor']) return;
  const wrap = document.getElementById('playground-editor-wrapper');
  if (!wrap) return;
  Editor.enhance('playground-editor', {
    onRun: () => Editor.runPreview(Editor.getCode('playground-editor'), 'playground-preview')
  });
});

document.addEventListener('DOMContentLoaded', () => App.init());
