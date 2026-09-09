<?php
/**
 * Achievement definitions. Each `condition` receives the $stats array
 * produced by get_user_stats() in includes/functions.php.
 */

$ACHIEVEMENTS = [
    [
        'id' => 'first-step',
        'title' => 'First Step',
        'icon' => '🌱',
        'description' => 'Selesaikan lesson pertamamu.',
        'condition' => function ($s) { return count($s['completed_lessons']) >= 1; },
    ],
    [
        'id' => 'code-explorer',
        'title' => 'Code Explorer',
        'icon' => '💻',
        'description' => 'Selesaikan 3 lesson coding.',
        'condition' => function ($s) { return count($s['completed_lessons']) >= 3; },
    ],
    [
        'id' => 'fast-learner',
        'title' => 'Fast Learner',
        'icon' => '📚',
        'description' => 'Selesaikan 5 lesson.',
        'condition' => function ($s) { return count($s['completed_lessons']) >= 5; },
    ],
    [
        'id' => 'html-master',
        'title' => 'HTML Master',
        'icon' => '🌐',
        'description' => 'Selesaikan seluruh course HTML Dasar.',
        'condition' => function ($s) {
            global $COURSES;
            $course = find_course($COURSES, 'html-basic');
            if (!$course) return false;
            foreach ($course['lessons'] as $l) {
                if (!in_array($l['id'], $s['completed_lessons'], true)) return false;
            }
            return true;
        },
    ],
    [
        'id' => 'project-builder',
        'title' => 'Project Builder',
        'icon' => '🚀',
        'description' => 'Selesaikan mini project pertamamu.',
        'condition' => function ($s) { return in_array('html-mini', $s['completed_lessons'], true); },
    ],
    [
        'id' => 'quiz-master',
        'title' => 'Quiz Master',
        'icon' => '🧠',
        'description' => 'Jawab 5 soal quiz dengan benar.',
        'condition' => function ($s) { return $s['quiz_correct'] >= 5; },
    ],
    [
        'id' => 'streak-3',
        'title' => '3 Day Streak',
        'icon' => '🔥',
        'description' => 'Belajar 3 hari berturut-turut.',
        'condition' => function ($s) { return $s['best_streak'] >= 3; },
    ],
    [
        'id' => 'streak-7',
        'title' => '7 Day Streak',
        'icon' => '🔥',
        'description' => 'Belajar 7 hari berturut-turut.',
        'condition' => function ($s) { return $s['best_streak'] >= 7; },
    ],
    [
        'id' => 'xp-hunter',
        'title' => 'XP Hunter',
        'icon' => '⭐',
        'description' => 'Kumpulkan 500 XP.',
        'condition' => function ($s) { return $s['xp'] >= 500; },
    ],
];
