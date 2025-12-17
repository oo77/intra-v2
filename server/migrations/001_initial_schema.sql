-- Создание таблиц для проекта INTRA

-- Таблица для членов команды
CREATE TABLE IF NOT EXISTS team_members (
  id VARCHAR(50) PRIMARY KEY,
  image TEXT,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Таблица для переводов членов команды
CREATE TABLE IF NOT EXISTS team_members_i18n (
  id INT AUTO_INCREMENT PRIMARY KEY,
  member_id VARCHAR(50) NOT NULL,
  language VARCHAR(5) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255),
  bio TEXT,
  biography TEXT,
  FOREIGN KEY (member_id) REFERENCES team_members(id) ON DELETE CASCADE,
  UNIQUE KEY unique_member_lang (member_id, language)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Таблица для массивов данных членов команды (expertise, education, etc.)
CREATE TABLE IF NOT EXISTS team_members_arrays (
  id INT AUTO_INCREMENT PRIMARY KEY,
  member_id VARCHAR(50) NOT NULL,
  language VARCHAR(5) NOT NULL,
  field_type ENUM('expertise', 'education', 'experience', 'publications', 'achievements') NOT NULL,
  value TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  FOREIGN KEY (member_id) REFERENCES team_members(id) ON DELETE CASCADE,
  INDEX idx_member_field (member_id, field_type, language)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Таблица для проектов
CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  image TEXT,
  status ENUM('Planning', 'Active', 'Completed') DEFAULT 'Planning',
  duration VARCHAR(50),
  team TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Таблица для переводов проектов
CREATE TABLE IF NOT EXISTS projects_i18n (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT NOT NULL,
  language VARCHAR(5) NOT NULL,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  description TEXT,
  overview TEXT,
  impact TEXT,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  UNIQUE KEY unique_project_lang (project_id, language)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Таблица для массивов данных проектов (objectives, technologies)
CREATE TABLE IF NOT EXISTS projects_arrays (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT NOT NULL,
  language VARCHAR(5) NOT NULL,
  field_type ENUM('objectives', 'technologies') NOT NULL,
  value TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  INDEX idx_project_field (project_id, field_type, language)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Таблица для галереи
CREATE TABLE IF NOT EXISTS gallery_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  row_number INT NOT NULL,
  url TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_row (row_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Таблица для переводов галереи
CREATE TABLE IF NOT EXISTS gallery_images_i18n (
  id INT AUTO_INCREMENT PRIMARY KEY,
  image_id INT NOT NULL,
  language VARCHAR(5) NOT NULL,
  alt_text VARCHAR(255),
  FOREIGN KEY (image_id) REFERENCES gallery_images(id) ON DELETE CASCADE,
  UNIQUE KEY unique_image_lang (image_id, language)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Таблица для контактных сообщений
CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  status ENUM('new', 'read', 'replied') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Индексы для оптимизации
CREATE INDEX idx_team_email ON team_members(email);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_gallery_row_order ON gallery_images(row_number, sort_order);
