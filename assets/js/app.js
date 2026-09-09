// ============================================================
// PintuKoding front-end helpers
// ============================================================

function toggleSidebar() {
  document.getElementById('sidebar')?.classList.toggle('open');
  document.getElementById('sidebar-overlay')?.classList.toggle('active');
}

const Toast = {
  show(message, type = 'info', duration = 3200) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const icons = { success: '✓', danger: '✕', warning: '⚠', info: 'ℹ' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${icons[type] || ''}</span><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'slideIn .3s ease reverse';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },
};

/** Show toasts for XP / level-up / achievement results returned by the API, then optionally reload. */
function handleRewardResult(result, reloadAfter = true) {
  if (!result) return;
  if (result.xp_earned) {
    Toast.show(`⭐ +${result.xp_earned} XP`, 'success');
  }
  if (result.leveled_up) {
    setTimeout(() => Toast.show(`🎉 Level Up! Level ${result.new_level}`, 'success'), 600);
  }
  if (result.new_achievements && result.new_achievements.length) {
    result.new_achievements.forEach((a, i) => {
      setTimeout(() => Toast.show(`🏆 Achievement: ${a}`, 'success'), 1200 + i * 900);
    });
  }
  if (reloadAfter) {
    const delay = 900 + (result.new_achievements ? result.new_achievements.length * 900 : 0);
    setTimeout(() => location.reload(), delay);
  }
}

// ============================================================
// Hearts / lives system
// ============================================================
function toggleHeartsPopover(btn) {
  const popover = btn.closest('.hearts-pill-wrap')?.querySelector('.hearts-popover');
  if (!popover) return;
  const willOpen = !popover.classList.contains('active');
  document.querySelectorAll('.hearts-popover.active').forEach((p) => p.classList.remove('active'));
  if (willOpen) popover.classList.add('active');
}
document.addEventListener('click', (e) => {
  if (!e.target.closest('.hearts-pill-wrap')) {
    document.querySelectorAll('.hearts-popover.active').forEach((p) => p.classList.remove('active'));
  }
});

/** Update every heart pill/popover on the page (topbar + sidebar copies) after a server response. */
function updateHeartsUI(hearts, max, lost) {
  if (hearts === undefined || hearts === null) return;
  document.querySelectorAll('[data-hearts-value]').forEach((el) => { el.textContent = hearts; });
  document.querySelectorAll('[data-hearts-emoji]').forEach((el) => { el.textContent = hearts > 0 ? '❤️' : '🖤'; });
  document.querySelectorAll('.hearts-pill').forEach((el) => {
    el.classList.toggle('empty', hearts <= 0);
    if (lost) {
      el.classList.remove('heart-lost');
      // restart the animation even if it was already mid-way
      void el.offsetWidth;
      el.classList.add('heart-lost');
      setTimeout(() => el.classList.remove('heart-lost'), 500);
    }
  });
  if (max !== undefined && max !== null) {
    document.querySelectorAll('[data-hearts-popover-text]').forEach((el) => {
      el.textContent = hearts > 0
        ? `Kamu punya ${hearts}/${max} hearts. Hearts berkurang saat jawaban latihan atau quiz kamu salah.`
        : 'Hearts kamu habis. Tunggu hingga hearts terisi kembali sebelum lanjut mengerjakan latihan atau quiz.';
    });
  }
}

/** Show the "out of hearts" friendly message inside a result/feedback container. */
function showOutOfHeartsBanner(container) {
  if (!container || container.querySelector('.hearts-out-banner')) return;
  const banner = document.createElement('div');
  banner.className = 'hearts-out-banner';
  banner.innerHTML = '<span class="emoji">❤️</span><span><strong>Kamu kehabisan hearts!</strong><br>Hearts kamu sudah habis. Tunggu sampai hearts terisi kembali sebelum melanjutkan.</span>';
  container.appendChild(banner);
}

// ============================================================
// Password visibility toggle (login/register)
// ============================================================
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const show = input.type === 'password';
  input.type = show ? 'text' : 'password';
  btn.textContent = show ? 'Sembunyikan' : 'Tampilkan';
}

// ============================================================
// Lesson exercise checker
// ============================================================
function checkExercise(courseId, lessonId, csrfToken) {
  const codeEl = document.getElementById('exercise-code');
  const resultEl = document.getElementById('exercise-result');
  const btn = document.getElementById('exercise-check-btn');
  if (!codeEl || !resultEl) return;
  const code = codeEl.value;

  btn.disabled = true;
  btn.textContent = 'Mengecek...';

  fetch('api/check_exercise.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ course_id: courseId, lesson_id: lessonId, code, csrf_token: csrfToken }),
  })
    .then((r) => r.json())
    .then((data) => {
      resultEl.classList.add('show');

      if (data.out_of_hearts) {
        btn.disabled = true;
        btn.textContent = 'Cek Jawaban';
        resultEl.className = 'exercise-result show incorrect';
        resultEl.textContent = '';
        showOutOfHeartsBanner(resultEl);
        updateHeartsUI(data.hearts, data.hearts_max, false);
        return;
      }

      btn.disabled = false;
      btn.textContent = 'Cek Jawaban';

      if (data.correct) {
        resultEl.className = 'exercise-result show correct';
        resultEl.textContent = '✓ Benar! ' + (data.already_completed ? 'Lesson ini sudah selesai sebelumnya.' : 'Lesson selesai!');
        document.getElementById('exercise-next-btn')?.removeAttribute('disabled');
        if (!data.already_completed) {
          handleRewardResult(data, true);
        }
      } else {
        resultEl.className = 'exercise-result show incorrect';
        resultEl.textContent = '✗ Belum tepat. ' + (data.hint ? 'Hint: ' + data.hint : 'Coba lagi.');
        updateHeartsUI(data.hearts, data.hearts_max, true);
        if (data.hearts === 0) {
          showOutOfHeartsBanner(resultEl);
          btn.disabled = true;
        }
      }
    })
    .catch(() => {
      btn.disabled = false;
      btn.textContent = 'Cek Jawaban';
      Toast.show('Terjadi kesalahan koneksi. Coba lagi.', 'danger');
    });
}

// ============================================================
// Quiz answer checker
// ============================================================
function submitQuizAnswer(quizId, csrfToken) {
  const form = document.getElementById('quiz-form-' + quizId);
  const selected = form.querySelector('input[type="radio"]:checked');
  const feedback = document.getElementById('quiz-feedback-' + quizId);
  if (!selected) {
    Toast.show('Pilih salah satu jawaban dulu ya.', 'warning');
    return;
  }
  const btn = document.getElementById('quiz-btn-' + quizId);
  btn.disabled = true;
  btn.textContent = 'Mengecek...';

  fetch('api/submit_quiz.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ quiz_id: quizId, option: selected.value, csrf_token: csrfToken }),
  })
    .then((r) => r.json())
    .then((data) => {
      feedback.classList.add('show');

      if (data.out_of_hearts) {
        feedback.className = 'quiz-feedback show incorrect';
        feedback.textContent = '';
        showOutOfHeartsBanner(feedback);
        updateHeartsUI(data.hearts, data.hearts_max, false);
        btn.disabled = true;
        return;
      }

      if (data.correct) {
        feedback.className = 'quiz-feedback show correct';
        feedback.textContent = '✓ Benar!' + (data.xp_earned ? ` +${data.xp_earned} XP` : ' (sudah pernah dijawab benar)');
        form.closest('.card').classList.add('quiz-answered');
        btn.textContent = 'Terjawab';
        if (data.xp_earned) handleRewardResult(data, false);
        if (data.new_achievements && data.new_achievements.length) {
          setTimeout(() => location.reload(), 1600);
        }
      } else {
        feedback.className = 'quiz-feedback show incorrect';
        feedback.textContent = '✗ Salah, coba lagi.';
        btn.disabled = false;
        btn.textContent = 'Cek Jawaban';
        updateHeartsUI(data.hearts, data.hearts_max, true);
        if (data.hearts === 0) {
          showOutOfHeartsBanner(feedback);
          btn.disabled = true;
        }
      }
    })
    .catch(() => {
      btn.disabled = false;
      btn.textContent = 'Cek Jawaban';
      Toast.show('Terjadi kesalahan koneksi. Coba lagi.', 'danger');
    });
}

// ============================================================
// Playground (client-side only, HTML/CSS/JS live preview)
// ============================================================
const Playground = {
  key: 'pintukoding_playground',
  examples: {
    html: '<h1>Halo dari Playground!</h1>\n<p>Coba edit kode ini.</p>\n<button onclick="alert(\'Hai!\')">Klik aku</button>',
    css: 'body {\n  font-family: sans-serif;\n  padding: 20px;\n  color: #333;\n}\nh1 {\n  color: #6366f1;\n}',
    js: 'document.querySelectorAll("h1").forEach(h => {\n  h.style.transition = "color .3s";\n});\nconsole.log("Playground siap!");',
  },
  activeTab: 'html',

  init() {
    const saved = this.load();
    ['html', 'css', 'js'].forEach((lang) => {
      const el = document.getElementById('pg-' + lang);
      if (el) el.value = saved[lang] ?? '';
    });
    this.showTab('html');
    this.run();
  },
  load() {
    try {
      return JSON.parse(localStorage.getItem(this.key)) || {};
    } catch (e) {
      return {};
    }
  },
  save() {
    const data = {
      html: document.getElementById('pg-html')?.value ?? '',
      css: document.getElementById('pg-css')?.value ?? '',
      js: document.getElementById('pg-js')?.value ?? '',
    };
    localStorage.setItem(this.key, JSON.stringify(data));
  },
  showTab(lang) {
    this.activeTab = lang;
    ['html', 'css', 'js'].forEach((l) => {
      document.getElementById('pg-tab-' + l)?.classList.toggle('active', l === lang);
      const el = document.getElementById('pg-' + l);
      if (el) el.style.display = l === lang ? 'block' : 'none';
    });
  },
  run() {
    const html = document.getElementById('pg-html')?.value ?? '';
    const css = document.getElementById('pg-css')?.value ?? '';
    const js = document.getElementById('pg-js')?.value ?? '';
    const doc = `<!doctype html><html><head><style>${css}</style></head><body>${html}<script>${js}<\/script></body></html>`;
    const iframe = document.getElementById('pg-preview');
    if (iframe) iframe.srcdoc = doc;
    this.save();
  },
  reset() {
    document.getElementById('pg-html').value = this.examples.html;
    document.getElementById('pg-css').value = this.examples.css;
    document.getElementById('pg-js').value = this.examples.js;
    this.run();
    Toast.show('Playground direset ke contoh', 'success');
  },
  clear() {
    document.getElementById('pg-html').value = '';
    document.getElementById('pg-css').value = '';
    document.getElementById('pg-js').value = '';
    this.run();
  },
};

// ============================================================
// Reset progress modal (settings.php)
// ============================================================
function openResetModal() {
  document.getElementById('reset-modal')?.classList.add('active');
}
function closeResetModal() {
  document.getElementById('reset-modal')?.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('pg-html')) {
    Playground.init();
  }
});
