// js/achievements.js — Achievement System
window.Achievements = {
  list: [
    {
      id: "html_beginner",
      icon: "🌱",
      title: "HTML Beginner",
      desc: "Menyelesaikan Level 1",
      condition: (u) =>
        u.completedLessons.filter((k) => k.startsWith("1-")).length >= 5,
    },
    {
      id: "first_code",
      icon: "💻",
      title: "First Code",
      desc: "Menjalankan kode HTML pertama",
      condition: (u) => u.completedExercises.some((e) => e.startsWith("run_")),
    },
    {
      id: "tag_explorer",
      icon: "🏷️",
      title: "Tag Explorer",
      desc: "Menyelesaikan 5 lesson",
      condition: (u) => u.completedLessons.length >= 5,
    },
    {
      id: "consistent",
      icon: "🔥",
      title: "Consistent Learner",
      desc: "Mencapai streak 3 hari berturut-turut",
      condition: (u) => u.streak >= 3,
    },
    {
      id: "html_builder",
      icon: "🏗️",
      title: "HTML Builder",
      desc: "Menyelesaikan 10 lesson",
      condition: (u) => u.completedLessons.length >= 10,
    },
    {
      id: "structure_pro",
      icon: "🏛️",
      title: "Structure Pro",
      desc: "Menyelesaikan Level 2",
      condition: (u) =>
        u.completedLessons.filter((k) => k.startsWith("2-")).length >= 5,
    },
    {
      id: "halfway",
      icon: "⭐",
      title: "Halfway There",
      desc: "Menyelesaikan 30 lesson",
      condition: (u) => u.completedLessons.length >= 30,
    },
    {
      id: "html_master",
      icon: "🏆",
      title: "HTML Master",
      desc: "Menyelesaikan semua 60 lesson HTML",
      // hanya hitung lesson jalur HTML (level 1–12); lesson CSS punya level 13–22
      condition: (u) =>
        u.completedLessons.filter((k) => parseInt(k, 10) <= 12).length >= 60,
    },
    {
      id: "css_beginner",
      icon: "🎨",
      title: "CSS Beginner",
      desc: "Menyelesaikan CSS Level 1",
      condition: (u) =>
        u.completedLessons.filter((k) => k.startsWith("13-")).length >= 5,
    },
    {
      id: "box_builder",
      icon: "📦",
      title: "Box Builder",
      desc: "Menyelesaikan CSS Level 4 (Box Model)",
      condition: (u) =>
        u.completedLessons.filter((k) => k.startsWith("16-")).length >= 5,
    },
    {
      id: "flex_master",
      icon: "🧱",
      title: "Flexbox Master",
      desc: "Menyelesaikan kedua level Flexbox",
      condition: (u) =>
        u.completedLessons.filter((k) => k.startsWith("18-")).length >= 5 &&
        u.completedLessons.filter((k) => k.startsWith("19-")).length >= 5,
    },
    {
      id: "css_master",
      icon: "💎",
      title: "CSS Master",
      desc: "Menyelesaikan semua 50 lesson CSS",
      condition: (u) =>
        u.completedLessons.filter((k) => {
          const n = parseInt(k, 10);
          return n >= 13 && n <= 22;
        }).length >= 50,
    },
  ],

  check() {
    const user = Storage.getUser();
    let newlyUnlocked = false;

    this.list.forEach((ach) => {
      if (!user.achievements.includes(ach.id)) {
        try {
          if (ach.condition(user)) {
            this.unlock(ach.id, ach);
            newlyUnlocked = true;
          }
        } catch (e) {
          // ignore
        }
      }
    });

    return newlyUnlocked;
  },

  unlock(id, achData) {
    const user = Storage.getUser();
    if (user.achievements.includes(id)) return;

    user.achievements.push(id);
    Storage.saveUser(user);

    // Show toast notification
    const ach = achData || this.list.find((a) => a.id === id);
    if (ach && typeof Navigation !== "undefined") {
      Navigation.showToast(
        `🏆 Achievement terbuka: ${ach.icon} ${ach.title}!`,
        "success",
      );
    }
  },

  isUnlocked(id) {
    return Storage.getUser().achievements.includes(id);
  },

  render() {
    const container = document.getElementById("achievements-grid");
    if (!container) return;

    const user = Storage.getUser();
    let html = "";

    this.list.forEach((ach) => {
      const unlocked = user.achievements.includes(ach.id);
      html += `
        <div class="achievement-card ${unlocked ? "achievement-unlocked" : "achievement-locked"}">
          <div class="achievement-icon">${unlocked ? ach.icon : "🔒"}</div>
          <div class="achievement-info">
            <div class="achievement-title">${ach.title}</div>
            <div class="achievement-desc">${ach.desc}</div>
          </div>
          <div class="achievement-status">
            ${unlocked ? '<span class="badge badge-completed">✓ Terbuka</span>' : '<span class="badge badge-locked">Terkunci</span>'}
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },
};
