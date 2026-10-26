// src/js/gamification/xp.js — Experience Points and Leveling System
(function () {
  'use strict';

  const XP = {
    init() {
      if (typeof window !== 'undefined' && window.Events) {
        window.Events.on(window.Events.XP_UPDATED, (data) => {
          this.render();
          if (data && data.added) {
            this.showPopup(data.added);
          }
          if (window.Achievements && typeof window.Achievements.check === 'function') {
            window.Achievements.check();
          }
        });
      }
      this.render();
    },

    add(amount, reason = '') {
      if (typeof window !== 'undefined' && window.State) {
        window.State.addXP(amount, reason);
        return;
      }

      // Fallback if State is not loaded
      const user = window.Storage.getUser();
      user.xp += amount;
      window.Storage.saveUser(user);
      this.render();
      this.showPopup(amount);

      if (window.Progress) {
        const stats = window.Progress.getStats();
        const nextLevel = Math.min(12, Math.max(1, Math.ceil((stats.completedLessons || 0) / 5)));
        if (stats.percent >= 100) {
          user.level = 12;
        } else if (user.level !== nextLevel) {
          user.level = nextLevel;
        }
        window.Storage.saveUser(user);
      }
    },

    addExercise(exerciseId) {
      if (typeof window !== 'undefined' && window.State) {
        if (window.State.completeExercise(exerciseId)) {
          this.add(5, `exercise:${exerciseId}`);
        }
        return;
      }
      const user = window.Storage.getUser();
      if (!user.completedExercises) user.completedExercises = [];
      if (!user.completedExercises.includes(exerciseId)) {
        user.completedExercises.push(exerciseId);
        window.Storage.saveUser(user);
        this.add(5);
      }
    },

    addLessonComplete(levelId, lessonId) {
      if (typeof window !== 'undefined' && window.State) {
        if (window.State.completeLesson(levelId, lessonId)) {
          this.add(10, `lesson:${levelId}-${lessonId}`);
        }
        return;
      }
      const user = window.Storage.getUser();
      const key = `${levelId}-${lessonId}`;
      if (!user.completedLessons.includes(key)) {
        user.completedLessons.push(key);
        window.Storage.saveUser(user);
        this.add(10);
      }
    },

    addLevelComplete(levelId) {
      const flag = `completed_level_${levelId}`;
      if (!window.Storage.getFlag(flag)) {
        window.Storage.setFlag(flag);
        this.add(50, `level:${levelId}`);
      }
    },

    addMiniProject(levelId) {
      const flag = `completed_project_${levelId}`;
      if (!window.Storage.getFlag(flag)) {
        window.Storage.setFlag(flag);
        this.add(25, `mini_project:${levelId}`);
      }
    },

    /** Bonus Final Project, sekali per jalur. Jalur HTML memakai nama flag lama agar data lama tetap valid. */
    addFinalProject(track) {
      const flag = track && track !== 'html' ? `completed_final_project_${track}` : `completed_final_project`;
      if (!window.Storage.getFlag(flag)) {
        window.Storage.setFlag(flag);
        this.add(100, track && track !== 'html' ? `final_project:${track}` : 'final_project');
      }
    },

    showPopup(amount) {
      if (typeof document === 'undefined') return;
      const popup = document.createElement('div');
      popup.textContent = `+${amount} XP`;
      popup.style.position = 'fixed';
      popup.style.top = '50%';
      popup.style.left = '50%';
      popup.style.transform = 'translate(-50%, -50%)';
      popup.style.color = '#4ade80';
      popup.style.fontSize = '2rem';
      popup.style.fontWeight = 'bold';
      popup.style.zIndex = '9999';
      popup.style.animation = 'floatUp 1.5s ease-out forwards';
      popup.style.pointerEvents = 'none';

      const style = document.createElement('style');
      if (!document.getElementById('xp-popup-style')) {
        style.id = 'xp-popup-style';
        style.textContent = `
          @keyframes floatUp {
            0% { opacity: 1; transform: translate(-50%, -50%); }
            100% { opacity: 0; transform: translate(-50%, -150%); }
          }
        `;
        document.head.appendChild(style);
      }

      document.body.appendChild(popup);
      setTimeout(() => popup.remove(), 1500);
    },

    render() {
      if (typeof document === 'undefined') return;
      const user = (typeof window !== 'undefined' && window.State)
        ? window.State.getUser()
        : (window.Storage ? window.Storage.getUser() : null);

      if (!user) return;
      document.querySelectorAll('#xp-value, #xp-value-mob, #dash-xp, #profile-xp').forEach(el => {
        if (el) el.textContent = user.xp;
      });
    }
  };

  if (typeof window !== 'undefined') {
    window.XP = XP;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = XP;
  }
})();
