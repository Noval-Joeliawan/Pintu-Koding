window.XP = {
  add(amount) {
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
    const user = window.Storage.getUser();
    if (!user.completedExercises) user.completedExercises = [];
    if (!user.completedExercises.includes(exerciseId)) {
      user.completedExercises.push(exerciseId);
      window.Storage.saveUser(user);
      this.add(5);
    }
  },

  addLessonComplete(levelId, lessonId) {
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
      this.add(50);
    }
  },

  addMiniProject(levelId) {
    const flag = `completed_project_${levelId}`;
    if (!window.Storage.getFlag(flag)) {
      window.Storage.setFlag(flag);
      this.add(25);
    }
  },

  addFinalProject() {
    const flag = `completed_final_project`;
    if (!window.Storage.getFlag(flag)) {
      window.Storage.setFlag(flag);
      this.add(100);
    }
  },

  showPopup(amount) {
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
    const user = window.Storage.getUser();
    document.querySelectorAll('#xp-value, #xp-value-mob, #dash-xp, #profile-xp').forEach(el => {
        if(el) el.textContent = user.xp;
    });
  }
};
