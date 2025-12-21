-- ============================================
-- INTRA Database Schema
-- Version: 1.0
-- ============================================

-- Удаление таблиц если существуют (для чистой установки)
-- DROP TABLE IF EXISTS gallery;
-- DROP TABLE IF EXISTS partners;
-- DROP TABLE IF EXISTS projects;
-- DROP TABLE IF EXISTS team_members;

-- ============================================
-- Таблица: team_members (Команда)
-- ============================================
CREATE TABLE IF NOT EXISTS team_members (
    id VARCHAR(50) PRIMARY KEY,
    image VARCHAR(500),
    email VARCHAR(255),
    phone VARCHAR(50),
    -- Русский
    name_ru VARCHAR(255) NOT NULL,
    role_ru VARCHAR(255),
    bio_ru TEXT,
    biography_ru TEXT,
    expertise_ru JSON,
    education_ru JSON,
    experience_ru JSON,
    publications_ru JSON,
    achievements_ru JSON,
    -- English
    name_en VARCHAR(255) NOT NULL,
    role_en VARCHAR(255),
    bio_en TEXT,
    biography_en TEXT,
    expertise_en JSON,
    education_en JSON,
    experience_en JSON,
    publications_en JSON,
    achievements_en JSON,
    -- O'zbekcha
    name_uz VARCHAR(255) NOT NULL,
    role_uz VARCHAR(255),
    bio_uz TEXT,
    biography_uz TEXT,
    expertise_uz JSON,
    education_uz JSON,
    experience_uz JSON,
    publications_uz JSON,
    achievements_uz JSON,
    -- Метаданные
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Таблица: projects (Проекты)
-- ============================================
CREATE TABLE IF NOT EXISTS projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    image VARCHAR(500),
    status VARCHAR(50) DEFAULT 'Planning',
    duration VARCHAR(100),
    team TEXT,
    -- Названия
    title_en VARCHAR(255) NOT NULL,
    title_ru VARCHAR(255) NOT NULL,
    title_uz VARCHAR(255) NOT NULL,
    -- Описания
    description_en TEXT,
    description_ru TEXT,
    description_uz TEXT,
    -- Категории
    category_en VARCHAR(100),
    category_ru VARCHAR(100),
    category_uz VARCHAR(100),
    -- Обзор
    overview_en TEXT,
    overview_ru TEXT,
    overview_uz TEXT,
    -- Цели (JSON массивы)
    objectives_en JSON,
    objectives_ru JSON,
    objectives_uz JSON,
    -- Технологии (JSON массивы)
    technologies_en JSON,
    technologies_ru JSON,
    technologies_uz JSON,
    -- Влияние
    impact_en TEXT,
    impact_ru TEXT,
    impact_uz TEXT,
    -- Метаданные
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Таблица: gallery (Галерея)
-- ============================================
CREATE TABLE IF NOT EXISTS gallery (
    id INT PRIMARY KEY AUTO_INCREMENT,
    url TEXT NOT NULL,
    alt_ru VARCHAR(255) NOT NULL,
    alt_en VARCHAR(255) NOT NULL,
    alt_uz VARCHAR(255) NOT NULL,
    row_num INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_row (row_num)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Таблица: partners (Партнёры)
-- ============================================
CREATE TABLE IF NOT EXISTS partners (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    logo_url TEXT NOT NULL,
    website_url TEXT NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_order (display_order, is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
