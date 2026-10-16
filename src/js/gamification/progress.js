// js/progress.js — Progress Page Renderer
window.Progress = {
  getStats() {
    const user = Storage.getUser();
    const completedLessons = user.completedLessons.length;
    const totalLessons = 60;

    // Count completed levels (all 5 lessons done)
    let completedLevels = 0;
    let miniProjects = 0;
    if (typeof LessonData !== 'undefined') {
      LessonData.levels.forEach(level => {
        const done = level.lessons.filter(l =>
          user.completedLessons.includes(`${level.id}-${l.id}`)
        ).length;
        if (done >= level.lessons.length) completedLevels++;
        // Mini project is lesson 5
        const proj = level.lessons.find(l => l.isProject);
        if (proj && user.completedLessons.includes(`${level.id}-${proj.id}`)) {
          miniProjects++;
        }
      });
    }

    const percent = Math.round((completedLessons / totalLessons) * 100);

    return {
      completedLessons,
      totalLessons,
      completedLevels,
      totalLevels: 12,
      miniProjects,
      totalMiniProjects: 11, // 11 mini + 1 final = 12, but final is special
      percent,
      xp: user.xp,
      streak: user.streak,
      hearts: user.hearts
    };
  },

  render() {
    const container = document.getElementById('progress-container');
    if (!container) return;

    const user = Storage.getUser();
    const stats = this.getStats();
    const secs = Hearts.getTimerSeconds();
    const h = Math.floor(secs / 3600).toString().padStart(2, '0');
    const m = Math.floor((secs % 3600) / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    const heartTimer = !Hearts.isFull() ? `<span style="font-size:0.8rem;color:var(--pk-text-light)">Next ❤️: ${h}:${m}:${s}</span>` : '';

    // Level breakdown
    let levelBreakdown = '';
    if (typeof LessonData !== 'undefined') {
      LessonData.levels.forEach(level => {
        const doneLessons = level.lessons.filter(l =>
          user.completedLessons.includes(`${level.id}-${l.id}`)
        ).length;
        const lvlPct = Math.round((doneLessons / level.lessons.length) * 100);
        const isUnlocked = user.unlockedLevels.includes(level.id);

        levelBreakdown += `
          <div style="margin-bottom:1rem;opacity:${isUnlocked ? '1' : '0.5'}">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.35rem">
              <div style="display:flex;align-items:center;gap:0.5rem">
                <span>${level.icon}</span>
                <span style="font-weight:600;font-size:0.9rem">${isUnlocked ? '' : '🔒 '}Level ${level.id}: ${level.title}</span>
              </div>
              <span style="font-size:0.85rem;color:var(--pk-text-light)">${doneLessons}/${level.lessons.length}</span>
            </div>
            <div class="progress-track" style="height:8px">
              <div class="progress-fill" style="width:${lvlPct}%"></div>
            </div>
          </div>
        `;
      });
    }

    container.innerHTML = `
      <div class="card" style="margin-bottom:1.5rem">
        <h3 style="margin-bottom:1rem">HTML Progress</h3>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.5rem">
          <span style="font-weight:700;font-size:1.5rem;color:var(--pk-blue)">${stats.percent}%</span>
          <span style="color:var(--pk-text-light)">${stats.completedLessons}/${stats.totalLessons} Lesson</span>
        </div>
        <div class="progress-track" style="height:16px;margin-bottom:1rem">
          <div class="progress-fill" style="width:${stats.percent}%"></div>
        </div>
      </div>

      <div class="dashboard-stats-row" style="margin-bottom:1.5rem">
        <div class="stat-card">
          <div class="stat-icon">🎯</div>
          <div class="stat-value">${stats.completedLevels}/${stats.totalLevels}</div>
          <div class="stat-label">Level</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📚</div>
          <div class="stat-value">${stats.completedLessons}/${stats.totalLessons}</div>
          <div class="stat-label">Lesson</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🚀</div>
          <div class="stat-value">${stats.miniProjects}/12</div>
          <div class="stat-label">Project</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⭐</div>
          <div class="stat-value">${stats.xp}</div>
          <div class="stat-label">Total XP</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🔥</div>
          <div class="stat-value">${stats.streak}</div>
          <div class="stat-label">Streak</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">❤️</div>
          <div class="stat-value">${user.hearts}/5</div>
          <div class="stat-label">Heart ${heartTimer}</div>
        </div>
      </div>

      <div class="card">
        <h3 style="margin-bottom:1.25rem">Detail per Level</h3>
        ${levelBreakdown}
      </div>
    `;
  }
};
