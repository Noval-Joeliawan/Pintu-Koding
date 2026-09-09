-- ============================================================
-- PintuKoding Database Schema
-- Import this file into phpMyAdmin, or run:
--   mysql -u root -p < database/pintukoding.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS pintukoding CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE pintukoding;

-- ------------------------------------------------------------
-- Accounts
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    xp INT NOT NULL DEFAULT 0,
    level INT NOT NULL DEFAULT 1,
    streak INT NOT NULL DEFAULT 0,
    best_streak INT NOT NULL DEFAULT 0,
    last_activity_date DATE NULL,
    theme VARCHAR(10) NOT NULL DEFAULT 'light',
    hearts INT NOT NULL DEFAULT 5,
    hearts_updated_at DATETIME NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Migration: adds the Heart/Lives system to a database that was
-- created BEFORE this feature existed. Safe to run against a
-- fresh database too (IF NOT EXISTS just skips it). Existing
-- rows automatically receive the column default (5 hearts) —
-- no existing user data is touched or deleted.
-- ------------------------------------------------------------
ALTER TABLE users
    ADD COLUMN IF NOT EXISTS hearts INT NOT NULL DEFAULT 5,
    ADD COLUMN IF NOT EXISTS hearts_updated_at DATETIME NULL;

-- ------------------------------------------------------------
-- Per-user lesson progress (source of truth for learning progress)
-- lesson_id / course_id refer to the ids defined in includes/data_courses.php
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS user_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id VARCHAR(50) NOT NULL,
    lesson_id VARCHAR(50) NOT NULL,
    completed TINYINT(1) NOT NULL DEFAULT 0,
    completed_at DATETIME NULL,
    UNIQUE KEY uniq_user_lesson (user_id, lesson_id),
    CONSTRAINT fk_progress_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Quiz results (quiz_id refers to includes/data_quiz.php)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS quiz_results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    quiz_id VARCHAR(50) NOT NULL,
    is_correct TINYINT(1) NOT NULL DEFAULT 0,
    answered_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uniq_user_quiz (user_id, quiz_id),
    CONSTRAINT fk_quiz_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Achievements unlocked per user (achievement_id refers to includes/data_achievements.php)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS user_achievements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    achievement_id VARCHAR(50) NOT NULL,
    unlocked_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uniq_user_achievement (user_id, achievement_id),
    CONSTRAINT fk_ach_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Recent activity feed shown on the dashboard
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS activity_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    description VARCHAR(150) NOT NULL,
    xp_earned INT NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_activity_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;
