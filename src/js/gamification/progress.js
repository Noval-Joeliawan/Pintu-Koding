// js/progress.js — Progress Page Renderer
window.Progress = {
  /**
   * Statistik per jalur. Kunci lama (completedLessons, totalLessons, percent, completedLevels, ...)
   * tetap menghitung JALUR HTML saja supaya State/XP yang memakainya (level 1–12) tidak berubah.
   * Jalur CSS ada di `css`, gabungan semua jalur di `overall`.
   */
  getTrackStats(trackId, user) {
    user = user || Storage.getUser();
    const levels =
      typeof LessonData !== "undefined"
        ? LessonData.getLevelsByTrack(trackId)
        : [];
    let totalLessons = 0,
      completedLessons = 0,
      completedLevels = 0,
      miniProjects = 0,
      projects = 0;
    levels.forEach((level) => {
      const done = level.lessons.filter((l) =>
        user.completedLessons.includes(`${level.id}-${l.id}`),
      ).length;
      totalLessons += level.lessons.length;
      completedLessons += done;
      if (done >= level.lessons.length) completedLevels++;
      level.lessons
        .filter((l) => l.isProject)
        .forEach((l) => {
          projects++;
          if (user.completedLessons.includes(`${level.id}-${l.id}`))
            miniProjects++;
        });
    });
    const percent = totalLessons
      ? Math.round((completedLessons / totalLessons) * 100)
      : 0;
    return {
      trackId,
      totalLessons,
      completedLessons,
      totalLevels: levels.length,
      completedLevels,
      miniProjects,
      totalProjects: projects,
      percent,
    };
  },

  getStats() {
    const user = Storage.getUser();
    const html = this.getTrackStats("html", user);
    const css = this.getTrackStats("css", user);
    const js = this.getTrackStats("js", user);
    const totalAll = html.totalLessons + css.totalLessons + js.totalLessons;
    const doneAll =
      html.completedLessons + css.completedLessons + js.completedLessons;

    return {
      completedLessons: html.completedLessons,
      totalLessons: html.totalLessons || 60,
      completedLevels: html.completedLevels,
      totalLevels: html.totalLevels || 12,
      miniProjects: html.miniProjects,
      totalMiniProjects: Math.max(0, (html.totalProjects || 12) - 1), // final project dihitung terpisah
      percent: html.percent,
      xp: user.xp,
      streak: user.streak,
      hearts: user.hearts,
      html,
      css,
      js,
      overall: {
        totalLessons: totalAll,
        completedLessons: doneAll,
        percent: totalAll ? Math.round((doneAll / totalAll) * 100) : 0,
      },
    };
  },

  _renderLevelBreakdown(trackId, user) {
    if (typeof LessonData === "undefined") return "";
    return LessonData.getLevelsByTrack(trackId)
      .map((level) => {
        const doneLessons = level.lessons.filter((l) =>
          user.completedLessons.includes(`${level.id}-${l.id}`),
        ).length;
        const lvlPct = Math.round((doneLessons / level.lessons.length) * 100);
        const isUnlocked = user.unlockedLevels.includes(level.id);

        return `
        <div style="margin-bottom:1rem;opacity:${isUnlocked ? "1" : "0.5"}">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.35rem">
            <div style="display:flex;align-items:center;gap:0.5rem">
              <span>${level.icon}</span>
              <span style="font-weight:600;font-size:0.9rem">${isUnlocked ? "" : "🔒 "}${LessonData.getLevelLabel(level)}: ${level.title}</span>
            </div>
            <span style="font-size:0.85rem;color:var(--pk-text-light)">${doneLessons}/${level.lessons.length}</span>
          </div>
          <div class="progress-track" style="height:8px">
            <div class="progress-fill" style="width:${lvlPct}%"></div>
          </div>
        </div>
      `;
      })
      .join("");
  },

  render() {
    const container = document.getElementById("progress-container");
    if (!container) return;

    const user = Storage.getUser();
    const stats = this.getStats();
    const secs = Hearts.getTimerSeconds();
    const h = Math.floor(secs / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((secs % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    const heartTimer = !Hearts.isFull()
      ? `<span style="font-size:0.8rem;color:var(--pk-text-light)">Next ❤️: ${h}:${m}:${s}</span>`
      : "";

    const trackCard = (title, t) => `
      <div class="card" style="margin-bottom:1.5rem">
        <h3 style="margin-bottom:1rem">${title}</h3>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.5rem">
          <span style="font-weight:700;font-size:1.5rem;color:var(--pk-blue)">${t.percent}%</span>
          <span style="color:var(--pk-text-light)">${t.completedLessons}/${t.totalLessons} Lesson</span>
        </div>
        <div class="progress-track" style="height:16px;margin-bottom:1rem">
          <div class="progress-fill" style="width:${t.percent}%"></div>
        </div>
      </div>
    `;

    const totalProjects =
      stats.html.totalProjects +
      stats.css.totalProjects +
      stats.js.totalProjects;
    const doneProjects =
      stats.html.miniProjects + stats.css.miniProjects + stats.js.miniProjects;

    container.innerHTML = `
      ${trackCard("Jalur HTML", stats.html)}
      ${stats.css.totalLessons ? trackCard("Jalur CSS", stats.css) : ""}
      ${stats.js.totalLessons ? trackCard("Jalur JavaScript", stats.js) : ""}

      <div class="dashboard-stats-row" style="margin-bottom:1.5rem">
        <div class="stat-card">
          <div class="stat-icon">🎯</div>
          <div class="stat-value">${stats.html.completedLevels + stats.css.completedLevels + stats.js.completedLevels}/${stats.html.totalLevels + stats.css.totalLevels + stats.js.totalLevels}</div>
          <div class="stat-label">Level</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📚</div>
          <div class="stat-value">${stats.overall.completedLessons}/${stats.overall.totalLessons}</div>
          <div class="stat-label">Lesson</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🚀</div>
          <div class="stat-value">${doneProjects}/${totalProjects}</div>
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

      <div class="card" style="margin-bottom:1.5rem">
        <h3 style="margin-bottom:1.25rem">Detail Jalur HTML</h3>
        ${this._renderLevelBreakdown("html", user)}
      </div>
      ${
        stats.css.totalLessons
          ? `
      <div class="card">
        <h3 style="margin-bottom:1.25rem">Detail Jalur CSS</h3>
        ${this._renderLevelBreakdown("css", user)}
      </div>`
          : ""
      }
      ${
        stats.js.totalLessons
          ? `
      <div class="card">
        <h3 style="margin-bottom:1.25rem">Detail Jalur JavaScript</h3>
        ${this._renderLevelBreakdown("js", user)}
      </div>`
          : ""
      }
    `;
  },
};
