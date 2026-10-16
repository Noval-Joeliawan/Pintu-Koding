// js/lessons.js — Lesson Engine
window.LessonEngine = {
  levelId: null,
  lessonId: null,
  slides: [],
  currentIndex: 0,
  isExerciseSlide: false,
  hasAnswered: false,
  isPracticeMode: false,
  _lessonData: null,

  open(levelId, lessonId, isPractice = false) {
    levelId = parseInt(levelId);
    lessonId = parseInt(lessonId);
    this.isPracticeMode = !!isPractice;

    const lesson = LessonData.getLesson(levelId, lessonId);
    if (!lesson) {
      console.warn('Lesson not found:', levelId, lessonId);
      return;
    }

    this.levelId = levelId;
    this.lessonId = lessonId;
    this._lessonData = lesson;
    this.slides = lesson.slides || [];
    this.currentIndex = 0;
    this.hasAnswered = false;

    // Update last lesson in state / storage
    if (window.State) {
      window.State.setCurrentLesson(levelId, lessonId);
    } else {
      const user = Storage.getUser();
      user.lastLesson = `${levelId}-${lessonId}`;
      Storage.saveUser(user);
    }

    // Switch to lesson view
    if (window.Navigation) Navigation.currentView = 'lesson';
    document.body.classList.add('in-lesson');
    document.querySelectorAll('.content-view').forEach(el => {
      el.style.display = 'none';
      el.classList.remove('active');
    });
    const lessonView = document.getElementById('view-lesson');
    if (lessonView) {
      lessonView.style.display = 'block';
      lessonView.classList.add('active');
    }

    // Hide sidebar/bottom-nav during lesson
    const sidebar = document.getElementById('sidebar-nav');
    const bn = document.getElementById('bottom-nav');
    const mtb = document.getElementById('mobile-top-bar');
    if (sidebar) sidebar.style.display = 'none';
    if (bn) bn.style.display = 'none';
    // Keep mobile-top-bar but we can show it

    // Update lesson header
    const lvlBadge = document.getElementById('lesson-level-badge');
    const titleLabel = document.getElementById('lesson-title-label');
    if (lvlBadge) lvlBadge.textContent = this.isPracticeMode ? `Mode Latihan` : `Level ${levelId}`;
    if (titleLabel) {
      titleLabel.innerHTML = this.isPracticeMode
        ? `${lesson.title} <span class="badge-practice" style="background:var(--pk-error-light);color:var(--pk-error);font-size:0.75rem;padding:0.2rem 0.6rem;border-radius:12px;font-weight:600;margin-left:0.5rem">❤️ +1 Heart jika selesai</span>`
        : lesson.title;
    }

    // Show footer buttons
    const footer = document.getElementById('lesson-footer');
    if (footer) footer.style.display = 'flex';

    // Reset btn-prev-slide visibility
    const btnPrev = document.getElementById('btn-prev-slide');
    if (btnPrev) btnPrev.style.display = '';

    this.renderSlide();
  },

  /**
   * FR-3.1: Buka Mode Latihan untuk memulihkan nyawa (+1 Heart tanpa XP)
   */
  openPractice(levelId, lessonId) {
    const user = (typeof window !== 'undefined' && window.State)
      ? window.State.getUser()
      : (window.Storage ? window.Storage.getUser() : null);

    let targetLvl = levelId ? parseInt(levelId, 10) : null;
    let targetLsn = lessonId ? parseInt(lessonId, 10) : null;

    if (!targetLvl || !targetLsn) {
      if (user && user.completedLessons && user.completedLessons.length > 0) {
        const parts = user.completedLessons[0].split('-');
        targetLvl = parseInt(parts[0], 10);
        targetLsn = parseInt(parts[1], 10);
      } else {
        targetLvl = 1;
        targetLsn = 1;
      }
    }

    this.open(targetLvl, targetLsn, true);
  },

  close() {
    document.body.classList.remove('in-lesson');
    // Restore sidebar/bottom-nav
    const sidebar = document.getElementById('sidebar-nav');
    const bn = document.getElementById('bottom-nav');
    if (sidebar) sidebar.style.display = '';
    if (bn) bn.style.display = '';

    Navigation.goto('learning-path');
  },

  renderSlide() {
    if (!this.slides || this.slides.length === 0) return;

    const slide = this.slides[this.currentIndex];
    this.hasAnswered = false;

    // Progress
    const pct = Math.round(((this.currentIndex + 1) / this.slides.length) * 100);
    const progressFill = document.getElementById('lesson-progress-fill');
    const stepInd = document.getElementById('lesson-step-indicator');
    if (progressFill) progressFill.style.width = `${pct}%`;
    if (stepInd) stepInd.textContent = `${this.currentIndex + 1} / ${this.slides.length}`;

    // Determine if exercise
    const EXERCISE_TYPES = ['multiple-choice', 'fill-code', 'drag-drop', 'fix-code', 'challenge', 'mini-project', 'code-editor'];
    this.isExerciseSlide = EXERCISE_TYPES.includes(slide.type);

    const btnNext = document.getElementById('btn-next-slide');
    const btnCheck = document.getElementById('btn-check-answer');

    if (this.isExerciseSlide) {
      if (btnNext) btnNext.style.display = 'none';
      if (btnCheck) btnCheck.style.display = '';
    } else {
      if (btnNext) btnNext.style.display = '';
      if (btnCheck) btnCheck.style.display = 'none';
    }

    // Last slide label
    const isLast = this.currentIndex === this.slides.length - 1;
    if (btnNext && !this.isExerciseSlide && isLast) {
      btnNext.textContent = '🎉 Selesai';
    } else if (btnNext) {
      btnNext.innerHTML = 'Lanjut → <kbd>↵</kbd>';
    }

    // Render content
    const body = document.getElementById('lesson-body');
    if (!body) return;

    if (this.isExerciseSlide) {
      Exercises.render(slide, body);
    } else {
      this._renderMaterial(slide, body);
    }

    // Update hearts display
    Hearts.render();
  },

  _renderMaterial(slide, container) {
    let html = '<div class="slide-material">';

    switch(slide.type) {
      case 'material':
        if (slide.title) html += `<h2 class="slide-title">${Exercises._escapeHtml(slide.icon || '📖')} ${Exercises.richText(slide.title)}</h2>`;
        if (slide.content) html += `<p class="slide-content">${Exercises.richText(slide.content)}</p>`;
        if (slide.code) {
          html += `<div class="code-block"><pre>${Exercises._escapeHtml(slide.code)}</pre></div>`;
        }
        break;

      case 'example':
        if (slide.title) html += `<h2 class="slide-title">💡 ${Exercises.richText(slide.title)}</h2>`;
        if (slide.code) {
          html += `<div class="code-block example-block"><pre>${Exercises._escapeHtml(slide.code)}</pre></div>`;
        }
        if (slide.content) html += `<p class="slide-content">${Exercises.richText(slide.content)}</p>`;
        break;

      case 'review':
        html += `<h2 class="slide-title">📋 ${Exercises.richText(slide.title || 'Ringkasan')}</h2>`;
        if (slide.points && slide.points.length) {
          html += '<ul class="review-list">';
          slide.points.forEach(p => { html += `<li>✓ ${Exercises.richText(p)}</li>`; });
          html += '</ul>';
        }
        if (slide.content) html += `<p class="slide-content">${Exercises.richText(slide.content)}</p>`;
        break;

      default:
        if (slide.title) html += `<h2 class="slide-title">${Exercises.richText(slide.title)}</h2>`;
        if (slide.content) html += `<p class="slide-content">${Exercises.richText(slide.content)}</p>`;
    }

    html += '</div>';
    container.innerHTML = html;
  },

  next() {
    // Block if exercise and not answered (except code-editor which is free)
    if (this.isExerciseSlide && !this.hasAnswered) {
      if (this.slides[this.currentIndex].type === 'code-editor') {
        // Allow pass-through
      } else {
        Navigation.showToast('Jawab soal terlebih dahulu!', 'error');
        return;
      }
    }

    if (this.currentIndex < this.slides.length - 1) {
      this.currentIndex++;
      this.renderSlide();
    } else {
      this._completeLesson();
    }
  },

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.renderSlide();
    }
  },

  checkAnswer() {
    if (this.hasAnswered) return;
    if (!this.isExerciseSlide) return;

    // Check hearts
    if (Hearts.get() <= 0) {
      this._showHeartEmptyModal();
      return;
    }

    const result = Exercises.check();
    if (!result) return;

    const container = document.getElementById('lesson-body');
    Exercises.showFeedback(container, result.correct, result.explanation, result._rich);

    if (result.correct) {
      // Award XP for exercise (anti-double)
      XP.addExercise(`${this.levelId}-${this.lessonId}-${this.currentIndex}`);
      this.hasAnswered = true;

      // Show next button, hide check
      const btnNext = document.getElementById('btn-next-slide');
      const btnCheck = document.getElementById('btn-check-answer');
      if (btnCheck) btnCheck.style.display = 'none';
      if (btnNext) {
        btnNext.style.display = '';
        // Check if last slide
        if (this.currentIndex === this.slides.length - 1) {
          btnNext.textContent = '🎉 Selesai';
        }
      }

      // Track first code run for achievement
      if (this.slides[this.currentIndex].type === 'challenge' || this.slides[this.currentIndex].type === 'mini-project' || this.slides[this.currentIndex].type === 'code-editor') {
        const user = Storage.getUser();
        if (!user.completedExercises.some(e => e.startsWith('run_'))) {
          user.completedExercises.push('run_first');
          Storage.saveUser(user);
        }
      }
    } else {
      // Wrong answer: lose heart (only if NOT in practice mode)
      if (!this.isPracticeMode) {
        Hearts.lose();
      }
      Hearts.render();
      if (Hearts.get() <= 0 && !this.isPracticeMode) {
        setTimeout(() => this._showHeartEmptyModal(), 1200);
      }
    }
  },

  _completeLesson() {
    const levelId = this.levelId;
    const lessonId = this.lessonId;

    // FR-3.1: Mode Latihan menyelesaikan sesi pemulihan (+1 Heart tanpa XP)
    if (this.isPracticeMode) {
      this._xpGained = 0;
      Hearts.recoverFromPractice();
      this._showLessonCompleteScreen();
      return;
    }

    const xpBefore = Storage.getUser().xp;

    // Add lesson XP (anti-double)
    XP.addLessonComplete(levelId, lessonId);

    // Mini project XP
    if (this._lessonData && this._lessonData.isProject) {
      if (levelId === 12 && lessonId === 5) {
        XP.addFinalProject();
      } else {
        XP.addMiniProject(levelId);
      }
    }

    this._xpGained = Math.max(0, Storage.getUser().xp - xpBefore);

    // Update streak
    Streak.checkAndUpdate();

    // Check achievements
    Achievements.check();

    // Check if all 5 lessons of this level done → unlock next level
    const user = Storage.getUser();
    const levelLessons = LessonData.getLevel(levelId);
    if (levelLessons) {
      const allDone = levelLessons.lessons.every(l =>
        user.completedLessons.includes(`${levelId}-${l.id}`)
      );
      if (allDone) {
        this._completeLevel(levelId);
        return;
      }
    }

    this._showLessonCompleteScreen();
  },

  _completeLevel(levelId) {
    // Award level XP (anti-double)
    const xpBeforeLevel = Storage.getUser().xp;
    XP.addLevelComplete(levelId);
    this._xpGained = (this._xpGained || 0) + Math.max(0, Storage.getUser().xp - xpBeforeLevel);

    // Unlock next level
    const user = Storage.getUser();
    const nextLevelId = levelId + 1;
    if (nextLevelId <= 12 && !user.unlockedLevels.includes(nextLevelId)) {
      user.unlockedLevels.push(nextLevelId);
      Storage.saveUser(user);
    }

    Achievements.check();

    // Show level complete screen
    const container = document.getElementById('lesson-body');
    const footer = document.getElementById('lesson-footer');
    if (footer) footer.style.display = 'none';

    if (container) {
      container.innerHTML = `
        <div class="completion-screen">
          <div class="completion-emoji">🏆</div>
          <h2 class="completion-title">Level ${levelId} Selesai!</h2>
          ${this._xpGained > 0 ? `<p class="completion-xp">⭐ +${this._xpGained} XP</p>` : '<p class="completion-xp">✓ Level sudah pernah diselesaikan</p>'}
          ${nextLevelId <= 12 ? `<p class="completion-unlock">🔓 Level ${nextLevelId} terbuka!</p>` : '<p class="completion-unlock">🎉 Semua level selesai!</p>'}
          <div class="completion-actions">
            <button class="btn btn-primary btn-lg" onclick="LessonEngine.close()">Kembali ke Menu</button>
          </div>
        </div>
      `;
    }
  },

  _showLessonCompleteScreen() {
    const container = document.getElementById('lesson-body');
    const footer = document.getElementById('lesson-footer');
    if (footer) footer.style.display = 'none';

    if (container) {
      container.innerHTML = `
        <div class="completion-screen">
          <div class="completion-emoji">${this.isPracticeMode ? '💖' : '🎉'}</div>
          <h2 class="completion-title">${this.isPracticeMode ? 'Latihan Selesai!' : 'Lesson Selesai!'}</h2>
          ${this.isPracticeMode
            ? '<p class="completion-xp" style="color:var(--pk-error);font-weight:700">❤️ +1 Heart Berhasil Dipulihkan!</p>'
            : (this._xpGained > 0 ? `<p class="completion-xp">⭐ +${this._xpGained} XP</p>` : '<p class="completion-xp">✓ Lesson diulang (XP sudah diklaim)</p>')
          }
          <p style="color:var(--pk-text-light);margin-bottom:1.5rem">
            ${this.isPracticeMode ? 'Kamu siap melanjutkan materi belajar berikutnya.' : 'Terus semangat belajar!'}
          </p>
          <div class="completion-actions">
            <button class="btn btn-outline" onclick="LessonEngine.close()">Kembali ke Menu</button>
            <button class="btn btn-primary btn-lg" onclick="${this.isPracticeMode ? 'LessonEngine.close()' : 'LessonEngine._goNextLesson()'}">
              ${this.isPracticeMode ? 'Lanjut Belajar →' : 'Lesson Berikutnya →'}
            </button>
          </div>
        </div>
      `;
    }
  },

  _goNextLesson() {
    const level = LessonData.getLevel(this.levelId);
    if (!level) { this.close(); return; }

    const nextLessonId = this.lessonId + 1;
    const nextLesson = level.lessons.find(l => l.id === nextLessonId);
    if (nextLesson) {
      this.open(this.levelId, nextLessonId);
    } else {
      // Try next level
      const nextLevel = LessonData.getLevel(this.levelId + 1);
      const user = Storage.getUser();
      if (nextLevel && user.unlockedLevels.includes(nextLevel.id)) {
        this.open(this.levelId + 1, 1);
      } else {
        this.close();
      }
    }
  },

  _showHeartEmptyModal() {
    const secs = Hearts.getTimerSeconds();
    const h = Math.floor(secs / 3600).toString().padStart(2, '0');
    const m = Math.floor((secs % 3600) / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');

    Navigation.showModal(`
      <div style="text-align:center">
        <div style="font-size:3.5rem;margin-bottom:1rem">💔</div>
        <h3 style="margin-bottom:0.5rem;color:var(--pk-error)">Heart Kamu Habis!</h3>
        <p style="color:var(--pk-text-light);margin-bottom:1rem">Jangan khawatir! Kamu bisa memulihkan nyawa lewat Mode Latihan atau menunggu timer.</p>
        <div style="background:var(--pk-error-light);padding:1rem;border-radius:var(--pk-radius);margin-bottom:1.5rem">
          <p style="color:var(--pk-error);font-weight:600;font-size:0.85rem">Next Heart (Interval 30 menit):</p>
          <p style="color:var(--pk-error);font-size:1.5rem;font-weight:800" id="modal-heart-timer">${h}:${m}:${s}</p>
        </div>
        <p style="font-size:0.85rem;color:var(--pk-text-light);margin-bottom:1.5rem">Selesaikan 1 sesi latihan untuk materi yang sudah kamu kuasai untuk mendapatkan +1 Heart!</p>
        <div style="display:flex;gap:0.5rem;justify-content:center;flex-wrap:wrap">
          <button class="btn btn-primary" onclick="Navigation.hideModal();LessonEngine.openPractice()">❤️ Latihan Pemulihan (+1 Heart)</button>
          <button class="btn btn-outline" onclick="Navigation.hideModal();LessonEngine.close()">Ke Menu</button>
        </div>
      </div>
    `);
  },

  initListeners() {
    if (typeof window !== 'undefined' && window.Events) {
      window.Events.on(window.Events.HEARTS_EMPTY, () => {
        // Otomatis tampilkan dialog pemulihan jika modal belum terbuka
        const modal = document.getElementById('modal-container');
        if (!modal || modal.style.display !== 'flex') {
          this._showHeartEmptyModal();
        }
      });
    }
  }
};

if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
  window.addEventListener('DOMContentLoaded', () => {
    if (window.LessonEngine && window.LessonEngine.initListeners) {
      window.LessonEngine.initListeners();
    }
  });
}

