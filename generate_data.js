const fs = require("fs");

const levels = [];
const levelTitles = [
  "Mengenal HTML",
  "Struktur HTML",
  "Heading & Paragraph",
  "Text Formatting",
  "Link",
  "Image",
  "List",
  "Button",
  "Form",
  "Table",
  "Semantic HTML",
  "Final Project",
];
const levelIcons = [
  "🌱",
  "🏗️",
  "📝",
  "✍️",
  "🔗",
  "🖼️",
  "📋",
  "🔘",
  "📝",
  "📊",
  "🧩",
  "🚀",
];
const levelDesc = [
  "Pelajari dasar-dasar HTML",
  "Membangun pondasi halaman web",
  "Menulis teks, judul, dan paragraf",
  "Menebalkan, miring, dan format teks",
  "Menghubungkan halaman dengan URL",
  "Menampilkan gambar visual",
  "Membuat daftar berurutan",
  "Membuat tombol interaktif",
  "Mengambil input dari user",
  "Menyajikan data terstruktur",
  "Menulis kode yang bermakna",
  "Proyek akhir kelulusan",
];

const lessonsTemplates = [
  [
    "Apa Itu HTML?",
    "Mengenal HTML",
    "Mengenal Tag",
    "Mengenal Element",
    "Mini Project - Hello HTML",
  ],
  [
    "DOCTYPE",
    "Tag HTML",
    "HEAD",
    "TITLE & BODY",
    "Mini Project - Struktur Halaman",
  ],
  [
    "Mengenal Heading",
    "Tingkatan Heading",
    "Paragraph",
    "BR dan HR",
    "Mini Project - Artikel Sederhana",
  ],
  [
    "Bold & Strong",
    "Italic & Emphasis",
    "Mark & Small",
    "Kombinasi Format",
    "Mini Project - Profil Singkat",
  ],
  [
    "Tag Anchor",
    "External Link",
    "Internal Link",
    "Link Tips",
    "Mini Project - Link Favorit",
  ],
  [
    "Tag Img",
    "Alt Text",
    "Width & Height",
    "Image Tips",
    "Mini Project - Galeri Sederhana",
  ],
  [
    "Unordered List",
    "Ordered List",
    "Nested List",
    "List Styling",
    "Mini Project - Daftar Favorit",
  ],
  [
    "Tag Button",
    "Button Types",
    "Button Styling",
    "Button Praktis",
    "Mini Project - Halaman Button",
  ],
  [
    "Tag Form",
    "Input Fields",
    "Label & Textarea",
    "Select & Option",
    "Mini Project - Form Pendaftaran",
  ],
  [
    "Struktur Table",
    "Table Header",
    "Table Attributes",
    "Table Styling",
    "Mini Project - Tabel Data Siswa",
  ],
  [
    "Apa itu Semantic?",
    "Header & Nav",
    "Main & Section",
    "Footer & Aside",
    "Mini Project - Website Semantic",
  ],
  [
    "Review Semua Konsep",
    "Perencanaan Project",
    "Struktur & Konten",
    "Styling & Polish",
    "Final Project - Website Profil",
  ],
];

for (let i = 0; i < 12; i++) {
  const lessons = [];
  for (let j = 0; j < 5; j++) {
    const isProject = j === 4;
    const slides = [];

    // Generate ~10 slides based on lesson type
    if (isProject) {
      slides.push({
        type: "material",
        title: `Project Level ${i + 1}`,
        content:
          "Saatnya mempraktikkan semua yang telah dipelajari di level ini.",
        code: null,
      });
      slides.push({
        type: "mini-project",
        title: lessonsTemplates[i][j],
        instruction: `Selesaikan tantangan ${lessonsTemplates[i][j]} menggunakan tag yang sudah dipelajari.`,
        starterCode: "<!-- Tulis kodemu di sini -->\n",
        checkItems: [
          {
            id: "check-1",
            label: "Struktur dasar",
            checkStr: "doc.body !== null",
          },
          {
            id: "check-2",
            label: "Mengerjakan tugas",
            checkStr: "doc.body.innerHTML.trim().length > 10",
          },
        ],
      });
    } else {
      slides.push({
        type: "material",
        title: "Materi 1",
        content: `Ini adalah pengenalan tentang ${lessonsTemplates[i][j]}.`,
        code: "<!-- Contoh kode -->",
      });
      slides.push({
        type: "multiple-choice",
        question: `Apa fungsi dari ${lessonsTemplates[i][j]}?`,
        options: ["A", "B", "C", "D"],
        answer: 0,
        explanation: "Penjelasan...",
      });
      slides.push({
        type: "material",
        title: "Materi 2",
        content: "Pembahasan lanjutan dengan contoh penggunaan yang benar.",
        code: "<!-- Contoh kode 2 -->",
      });
      slides.push({
        type: "example",
        title: "Contoh Lengkap",
        code: "<!-- Contoh HTML -->",
      });
      slides.push({
        type: "fill-code",
        instruction: "Lengkapi tag berikut:",
        before: "<",
        blank: "tag",
        after: ">",
        answer: "tag",
        explanation: "...",
      });
      slides.push({
        type: "drag-drop",
        instruction: "Susun kode:",
        tokens: ["A", "B", "C"],
        answer: ["A", "B", "C"],
      });
      slides.push({
        type: "fix-code",
        instruction: "Perbaiki kode yang salah ini:",
        brokenCode: "<html>",
        fixHint: "...",
        answer: "</html>",
        checkTag: "html",
      });
      slides.push({
        type: "challenge",
        instruction: "Buat tag sesuai materi.",
        starterCode: "",
        requiredTags: ["html"],
        requiredText: "",
        explanation: "...",
      });
      slides.push({
        type: "multiple-choice",
        question: "Soal evaluasi:",
        options: ["Benar", "Salah"],
        answer: 0,
        explanation: "...",
      });
      slides.push({
        type: "review",
        title: "Ringkasan",
        points: ["Poin 1", "Poin 2", "Poin 3"],
      });
    }

    lessons.push({
      id: j + 1,
      title: lessonsTemplates[i][j],
      xpReward: isProject ? 30 : 10,
      isProject: isProject,
      slides: slides,
    });
  }

  levels.push({
    id: i + 1,
    title: levelTitles[i],
    icon: levelIcons[i],
    description: levelDesc[i],
    lessons: lessons,
  });
}

const jsContent = `// js/data.js
// Auto-generated lesson data
window.LessonData = {
  levels: ${JSON.stringify(levels, null, 2)},
  getLevel(levelId) { return this.levels.find(l => l.id === levelId); },
  getLesson(levelId, lessonId) {
    const level = this.getLevel(levelId);
    return level ? level.lessons.find(l => l.id === lessonId) : null;
  }
};
// End of data.js
`;

fs.writeFileSync("js/data.js", jsContent);
console.log(
  "js/data.js has been fully generated with all 12 levels and 60 lessons!",
);
