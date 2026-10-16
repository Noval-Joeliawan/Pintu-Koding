// js/navigation.js — SPA Router & Navigation
window.Navigation = {
  currentView: 'dashboard',

  _escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[char]));
  },

  _getCurrentLearningLevel(user) {
    const levels = Array.isArray(user.unlockedLevels) ? user.unlockedLevels : [1];
    return Math.min(12, Math.max(1, Math.max(...levels.map(Number).filter(Number.isFinite), 1)));
  },

  init() {
    // Sidebar nav and bottom nav clicks
    document.querySelectorAll('[data-view]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const view = el.getAttribute('data-view');
        if (view) this.goto(view);
      });
    });
  },

  goto(viewName) {
    document.body.classList.toggle('in-lesson', viewName === 'lesson');
    // Hide all content views
    document.querySelectorAll('.content-view').forEach(el => {
      el.style.display = 'none';
      el.classList.remove('active');
    });

    // Show target view
    const target = document.getElementById(`view-${viewName}`);
    if (target) {
      target.style.display = 'block';
      target.classList.add('active');
    }

    // If not lesson view, ensure sidebar/bottom-nav visible
    if (viewName !== 'lesson') {
      const sidebar = document.getElementById('sidebar-nav');
      const bn = document.getElementById('bottom-nav');
      if (sidebar) sidebar.style.display = '';
      if (bn) bn.style.display = '';
      // Also show mobile top bar
      const mtb = document.getElementById('mobile-top-bar');
      if (mtb) mtb.style.display = '';
    }

    // Update active nav items
    document.querySelectorAll('.nav-item, .bottom-nav-item').forEach(el => {
      if (el.getAttribute('data-view') === viewName) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });

    this.currentView = viewName;

    // Page-specific render
    switch (viewName) {
      case 'dashboard':    this.renderDashboard(); break;
      case 'learning-path': this.renderLearningPath(); break;
      case 'progress':    Progress.render(); break;
      case 'achievements': Achievements.render(); break;
      case 'playground':  App.initPlayground(); break;
      case 'profile':     this.renderProfile(); break;
    }

    this.updateAllStats();
  },

  updateAllStats() {
    XP.render();
    Hearts.render();
    Streak.render();
    if (window.Editor && window.State) {
      window.Editor.lockExecution(window.State.isHeartsEmpty());
    }
  },

  renderDashboard() {
    const user = Storage.getUser();

    // Greeting
    const greet = document.getElementById('dashboard-greeting');
    if (greet) greet.textContent = `Halo, ${user.username || 'Pelajar'}! 👋`;

    // Level + XP
    const currentLevel = this._getCurrentLearningLevel(user);
    const dashLevel = document.getElementById('dash-level');
    const mobLevel = document.getElementById('level-value-mob');
    if (dashLevel) dashLevel.textContent = currentLevel;
    if (mobLevel) mobLevel.textContent = currentLevel;

    const dashXp = document.getElementById('dash-xp');
    if (dashXp) dashXp.textContent = user.xp;

    // Lessons count
    const dashLessons = document.getElementById('dash-lessons');
    const totalLessons = LessonData?.levels?.reduce((sum, level) => sum + level.lessons.length, 0) || 60;
    if (dashLessons) dashLessons.textContent = `${user.completedLessons.length}/${totalLessons}`;

    // Streak
    const dashStreak = document.getElementById('dash-streak');
    if (dashStreak) dashStreak.textContent = user.streak;

    // Hearts
    const dashHearts = document.getElementById('dash-hearts');
    if (dashHearts) dashHearts.textContent = `${user.hearts}/5`;

    // Progress
    const pct = Math.min(100, Math.round((user.completedLessons.length / totalLessons) * 100));
    const pb = document.getElementById('dash-progress-bar');
    const pt = document.getElementById('dash-progress-text');
    if (pb) pb.style.width = `${pct}%`;
    if (pt) pt.textContent = `${pct}%`;

    // Start/continue buttons
    const btnStart = document.getElementById('btn-start-learning');
    const btnCont = document.getElementById('btn-continue-learning');
    if (btnStart && btnCont) {
      if (user.lastLesson) {
        btnStart.style.display = 'none';
        btnCont.style.display = '';
      } else {
        btnStart.style.display = '';
        btnCont.style.display = 'none';
      }
    }

    // Level preview cards
    this._renderDashboardLevelPreview(user);
  },

  _renderDashboardLevelPreview(user) {
    const container = document.getElementById('dashboard-levels-preview');
    if (!container || !LessonData) return;

    const items = LessonData.levels.slice(0, 4).map(level => {
      const isUnlocked = user.unlockedLevels.includes(level.id);
      const completedCount = level.lessons.filter(l => user.completedLessons.includes(`${level.id}-${l.id}`)).length;
      const pct = Math.round((completedCount / level.lessons.length) * 100);
      const state = isUnlocked ? (pct >= 100 ? 'completed' : 'available') : 'locked';
      const stateLabel = state === 'completed' ? '✓ Selesai' : state === 'available' ? '▶ Tersedia' : '🔒 Terkunci';

      return `
        <button class="level-preview-card card card-hover card-interactive" type="button" data-open-learning-path aria-label="Buka Level ${level.id}: ${this._escapeHtml(level.title)}">
          <span class="level-preview-icon" aria-hidden="true">${level.icon}</span>
          <span class="level-preview-level">Level ${level.id}</span>
          <span class="level-preview-title">${this._escapeHtml(level.title)}</span>
          <span class="progress-track" aria-label="Progress ${pct} persen"><span class="progress-fill" style="width:${pct}%"></span></span>
          <span class="level-preview-meta"><span>${completedCount}/${level.lessons.length}</span><span class="status-note">${stateLabel}</span></span>
        </button>
      `;
    }).join('');

    container.innerHTML = items;
    container.style.display = 'flex';

    container.querySelectorAll('[data-open-learning-path]').forEach(card => {
      card.addEventListener('click', () => this.goto('learning-path'));
    });
  },

  renderLearningPath() {
    const container = document.getElementById('learning-path-container');
    if (!container || !LessonData) return;

    const user = Storage.getUser();
    const html = LessonData.levels.map(level => {
      const isUnlocked = user.unlockedLevels.includes(level.id);
      const completedLessons = level.lessons.filter(l => user.completedLessons.includes(`${level.id}-${l.id}`)).length;
      const isComplete = completedLessons >= level.lessons.length;
      const pct = Math.round((completedLessons / level.lessons.length) * 100);
      const hasProgress = completedLessons > 0 && !isComplete;
      const status = isComplete ? 'completed' : !isUnlocked ? 'locked' : hasProgress ? 'progress' : 'available';
      const statusLabel = isComplete ? '✓ Selesai' : !isUnlocked ? '🔒 Terkunci' : hasProgress ? '▶ Sedang dipelajari' : '▶ Tersedia';
      const lockReason = !isUnlocked && level.id > 1 ? `<p class="level-lock-note">🔒 Selesaikan Level ${level.id - 1} terlebih dahulu</p>` : '';

      const lessonsHtml = level.lessons.map(lesson => {
        const key = `${level.id}-${lesson.id}`;
        const isDone = user.completedLessons.includes(key);
        const canClick = isUnlocked;
        const isCurrent = user.lastLesson === key && !isDone;
        const itemState = isDone ? 'completed' : !canClick ? 'locked' : isCurrent ? 'progress' : 'available';
        return `
          <button class="lesson-item lesson-item-${itemState}" type="button" data-level="${level.id}" data-lesson="${lesson.id}" ${canClick ? '' : 'disabled'}>
            <span class="lesson-item-main">
              <span class="lesson-item-icon" aria-hidden="true">${isDone ? '✅' : canClick ? '📖' : '🔒'}</span>
              <span class="lesson-item-title">${this._escapeHtml(lesson.title)}</span>
              ${isCurrent ? '<span class="badge badge-progress">SEDANG DIPELAJARI</span>' : ''}
              ${lesson.isProject ? '<span class="badge badge-available">PROJECT</span>' : ''}
            </span>
            <span class="lesson-item-meta">${lesson.xpReward} XP ${isDone ? '✓' : '→'}</span>
          </button>
        `;
      }).join('');

      return `
        <section class="card level-card level-state-${status}">
          <div class="level-card-header">
            <div class="level-card-icon" aria-hidden="true">${level.icon}</div>
            <div class="level-card-heading">
              <div class="level-title-row"><h3>Level ${level.id}: ${this._escapeHtml(level.title)}</h3><span class="badge badge-${status}">${statusLabel}</span></div>
              <p>${this._escapeHtml(level.description)}</p>
            </div>
          </div>
          <div class="level-progress-row"><div class="progress-track" aria-label="Progress level ${pct} persen"><div class="progress-fill" style="width:${pct}%"></div></div><strong>${pct}%</strong></div>
          ${lockReason}
          <div class="lesson-list">${lessonsHtml}</div>
        </section>
      `;
    }).join('');

    container.innerHTML = html;
    container.querySelectorAll('.lesson-item:not(:disabled)').forEach(item => {
      item.addEventListener('click', () => {
        LessonEngine.open(Number(item.dataset.level), Number(item.dataset.lesson));
      });
    });
  },

  renderProfile() {
    const user = Storage.getUser();
    const totalLessons = LessonData?.levels?.reduce((sum, level) => sum + level.lessons.length, 0) || 60;
    const pct = Math.min(100, Math.round((user.completedLessons.length / totalLessons) * 100));

    const el = (id) => document.getElementById(id);
    if (el('profile-name')) el('profile-name').textContent = user.username || 'Pelajar';
    if (el('profile-xp')) el('profile-xp').textContent = user.xp;
    if (el('profile-streak')) el('profile-streak').textContent = user.streak;
    if (el('profile-hearts')) el('profile-hearts').textContent = user.hearts;
    if (el('profile-progress-bar')) el('profile-progress-bar').style.width = `${pct}%`;
    if (el('profile-progress-text')) el('profile-progress-text').textContent = `${pct}%`;
  },

  initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      const modalOpen = (() => {
        const ov = document.getElementById('modal-overlay');
        return !!ov && ov.style.display !== 'none';
      })();

      // Esc: close modal (works even while typing)
      if (e.key === 'Escape') {
        if (modalOpen) this.hideModal();
        const sm = document.getElementById('shortcut-modal');
        if (sm && sm.style.display !== 'none') sm.style.display = 'none';
        return;
      }

      // Skip if typing in an input/textarea/select (CodeMirror uses a hidden textarea)
      const target = e.target;
      const tag = target && target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (target && target.isContentEditable)) return;
      if (modalOpen || e.altKey || e.metaKey) return;

      const inLesson = this.currentView === 'lesson' || document.getElementById('view-lesson')?.classList.contains('active');
      const isVisible = (el) => !!el && el.style.display !== 'none' && el.offsetParent !== null;

      // Shift+Enter: run playground preview (only on the Playground page)
      if (e.key === 'Enter' && e.shiftKey) {
        if (this.currentView === 'playground') {
          e.preventDefault();
          document.getElementById('btn-playground-run')?.click();
        }
        return;
      }

      // Enter / Ctrl+Enter: check or next — ONLY while a lesson is on screen
      if (e.key === 'Enter') {
        if (!inLesson) return;
        // A focused button/link already activates itself on Enter; don't fire twice.
        // (Answer choices are the exception: Enter there means "Check".)
        const isChoice = !!(target.classList && target.classList.contains('mc-option'));
        if ((tag === 'BUTTON' || tag === 'A') && !isChoice) return;
        const btnCheck = document.getElementById('btn-check-answer');
        const btnNext = document.getElementById('btn-next-slide');
        if (isVisible(btnCheck)) {
          e.preventDefault();
          btnCheck.click();
        } else if (!e.ctrlKey && isVisible(btnNext)) {
          e.preventDefault();
          btnNext.click();
        }
        return;
      }

      if (!inLesson) return;

      // 1-4: select MC option
      if (['1', '2', '3', '4'].includes(e.key)) {
        const opts = document.querySelectorAll('.mc-option');
        const idx = parseInt(e.key, 10) - 1;
        if (opts[idx]) opts[idx].click();
        return;
      }

      // Arrow Up/Down: navigate MC options
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        const opts = Array.from(document.querySelectorAll('.mc-option'));
        if (opts.length > 0) {
          e.preventDefault();
          const current = opts.findIndex(o => o.classList.contains('mc-selected'));
          let next = e.key === 'ArrowDown' ? current + 1 : current - 1;
          if (next < 0) next = opts.length - 1;
          if (next >= opts.length) next = 0;
          opts[next].click();
        }
      }
    });
  },

  showModal(html) {
    const content = document.getElementById('modal-content');
    const overlay = document.getElementById('modal-overlay');
    if (content) content.innerHTML = html;
    if (overlay) overlay.style.display = 'flex';
  },

  hideModal() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) overlay.style.display = 'none';
  },

  showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.style.background = type === 'success' ? 'var(--pk-blue-dark)' : (type === 'error' ? 'var(--pk-error)' : 'var(--pk-navy)');
    toast.classList.add('show');

    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
};
