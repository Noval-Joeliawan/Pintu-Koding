# PintuKoding — PHP + MySQL Edition

Upgraded version of the PintuKoding coding-learning platform, rebuilt on
**PHP + MySQL + PHP Sessions** with real per-account authentication, so
progress is saved in a database instead of the browser's `localStorage`.

## How to run on XAMPP

1. Copy the whole `pintukoding/` folder into `htdocs/` (e.g.
   `C:\xampp\htdocs\pintukoding` or `/Applications/XAMPP/htdocs/pintukoding`).
2. Start **Apache** and **MySQL** from the XAMPP control panel.
3. Open `http://localhost/phpmyadmin`, click **Import**, and import
   `database/pintukoding.sql`. This creates the `pintukoding` database and
   all required tables.
   - Alternatively, run: `mysql -u root -p < database/pintukoding.sql`
4. If your MySQL uses a non-default host/user/password, edit
   `config/database.php` (defaults match a stock XAMPP install: host
   `localhost`, user `root`, empty password).
5. Visit `http://localhost/pintukoding/` in your browser.
6. Click **Daftar Gratis** (Register) to create an account, then log in.

No `composer install` / `npm install` is required — everything is plain
PHP, HTML, CSS, and vanilla JavaScript.

## What changed from the original prototype

The original `index.html` was a single-file client-side SPA: all data
(name, XP, level, completed lessons, playground code, theme) lived in the
browser's `localStorage`, so progress was tied to one browser and was lost
if the user cleared their data or switched devices — there was no real
login either (just a "type your name" onboarding).

This version keeps the same identity, lesson content, and gamification
ideas, but moves everything that matters to MySQL:

- **Real accounts** — Register / Login / Logout with `password_hash()` /
  `password_verify()` and PHP sessions (`includes/auth.php`).
- **Per-user progress** — lesson completion, quiz results, XP, level,
  streak, and achievements are all stored per `user_id` in MySQL and are
  the source of truth (`includes/functions.php`, `api/check_exercise.php`,
  `api/submit_quiz.php`). Two accounts never see each other's progress.
- **Multi-page PHP structure** instead of one giant HTML/JS file — see
  the folder layout below.
- **Redesigned UI** — new sidebar, dashboard, lesson, playground, quiz,
  achievements, profile, and settings screens, plus dedicated login/
  register cards, all sharing one design system
  (`assets/css/style.css`), with light/dark mode preserved and now saved
  per account.
- **New standalone Quiz feature** — 8 multiple-choice questions with
  instant feedback and +10 XP per correct answer (separate from the
  lesson exercises, which still exist and now award +50 XP combined and
  server-side validate the answer).
- The **Code Playground** was kept as a lightweight, fully client-side
  HTML/CSS/JS live editor (iframe preview) — this is scratch space, not
  "learning progress", so it intentionally still uses `localStorage`
  per the brief.

## Folder structure

```
pintukoding/
├── index.php              Public landing page
├── login.php / register.php / logout.php
├── dashboard.php           Stats, continue learning, recent activity
├── learning-path.php       Course list (locked/available/in progress/done)
├── lesson.php              Lesson content + exercise (?course=&lesson=)
├── playground.php          HTML/CSS/JS live playground
├── quiz.php                Standalone multiple-choice quiz
├── achievements.php        Achievement grid
├── profile.php             Profile + edit email/password
├── settings.php            Theme, export data, reset progress
├── export.php              Downloads the logged-in user's progress as JSON
│
├── config/database.php     PDO/MySQL connection
├── includes/
│   ├── auth.php             Session bootstrap + require_login()/current_user()
│   ├── functions.php        XP/level/streak/achievement/CSRF helpers
│   ├── header.php / footer.php   Shared sidebar + page shell
│   ├── data_courses.php     Course/lesson/exercise content
│   ├── data_quiz.php        Quiz question bank
│   └── data_achievements.php Achievement definitions
├── api/
│   ├── check_exercise.php   AJAX: validates a lesson exercise, awards XP
│   └── submit_quiz.php      AJAX: validates a quiz answer, awards XP
├── assets/css/style.css
├── assets/js/app.js
└── database/pintukoding.sql
```

## Database tables

| Table              | Purpose                                              |
|---------------------|-------------------------------------------------------|
| `users`             | Account, hashed password, xp, level, streak, theme    |
| `user_progress`     | Which `lesson_id`s each `user_id` has completed       |
| `quiz_results`      | Which quiz questions each user answered correctly     |
| `user_achievements` | Which achievements each user has unlocked             |
| `activity_log`      | Recent-activity feed shown on the dashboard           |

Course/lesson/quiz/achievement *content* lives in PHP arrays under
`includes/` (not in the database) to keep the schema small and easy to
explain in a presentation — only per-user *progress* is persisted in
MySQL, which is what the brief required.

## How login works

1. `register.php` hashes the password with `password_hash()` and inserts
   a new row into `users`.
2. `login.php` looks up the user by email and checks the password with
   `password_verify()`. On success it calls `session_regenerate_id()`
   and stores only `$_SESSION['user_id']`.
3. Every protected page starts with `require_login()`
   (`includes/auth.php`), which redirects to `login.php` if no session
   exists, and `current_user($pdo)`, which re-fetches the user row from
   the database using the **session's** id — the app never trusts a
   `user_id` from the URL or a form field.
4. `logout.php` destroys the session.

## How progress is stored & kept per-account

- Completing a lesson exercise → `api/check_exercise.php` re-validates
  the code **on the server**, then `INSERT ... ON DUPLICATE KEY UPDATE`
  into `user_progress` for `($_SESSION['user_id'], lesson_id)`, and calls
  `award_xp()` (only the first time, so re-visiting a finished lesson
  can't farm XP).
- Answering a quiz question correctly → same idea via
  `api/submit_quiz.php` and `quiz_results`.
- `award_xp()` updates `users.xp`/`level`, calls `update_streak()`
  (once per calendar day), logs the action to `activity_log`, and checks
  `check_achievements()` against the user's current stats.
- Because every query is scoped by `$_SESSION['user_id']`, logging out
  and back in — or logging in as a different account — always shows
  only that account's XP, level, streak, and completed lessons.

## Tested

- All PHP files pass `php -l` (no syntax errors).
- Core logic (XP→level table, streak increment/reset, achievement
  conditions, course-prerequisite unlocking, and exercise-answer
  validation) was exercised with a local SQLite smoke test standing in
  for MySQL, since this environment can't run a MySQL server — the SQL
  itself (`ON DUPLICATE KEY UPDATE`, foreign keys, unique constraints)
  is standard MySQL/InnoDB and matches `database/pintukoding.sql`.
- Manual walk-through of the flows required by the brief (register →
  dashboard, complete a lesson → XP/progress persists after logout/login,
  two different accounts never share progress) was done by reading
  through the code path end-to-end; please still click through it once
  yourself after importing the database, since this sandbox has no
  MySQL/Apache to click-test against directly.

## Known limitations

- No "forgot password" / email verification flow (out of scope for a
  UTS project).
- The code playground runs arbitrary JS inside a sandboxed `<iframe>` on
  the client for live preview — fine for a local learning tool, but not
  hardened for a public multi-tenant deployment.
- Course/lesson/quiz content is intentionally small (3 courses, 12
  lessons, 8 quiz questions) to keep the demo easy to present; more can
  be added by extending the arrays in `includes/data_courses.php` and
  `includes/data_quiz.php` without touching any other file.
- Achievement/XP numbers were tuned to be reachable with the current
  amount of content (e.g. "Level 4" instead of a much higher level) —
  adjust `LEVEL_XP` in `includes/functions.php` if you add more lessons.
