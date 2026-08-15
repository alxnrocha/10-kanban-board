-- ============================================================================
-- DevFlow Kanban Database Schema (MySQL 8.4 LTS)
-- Description: Relational data model for agile sprint and task management.
-- ============================================================================

CREATE DATABASE IF NOT EXISTS devflow_kanban
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE devflow_kanban;

-- Drop tables in reverse dependency order if rebuilding
DROP TABLE IF EXISTS card_tags;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS subtasks;
DROP TABLE IF EXISTS cards;
DROP TABLE IF EXISTS `columns`;
DROP TABLE IF EXISTS boards;
DROP TABLE IF EXISTS workspace_members;
DROP TABLE IF EXISTS workspaces;
DROP TABLE IF EXISTS users;

-- ----------------------------------------------------------------------------
-- 1. Users Table
-- ----------------------------------------------------------------------------
CREATE TABLE users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(191) NOT NULL UNIQUE,
  avatar_url VARCHAR(255) NULL,
  role ENUM('admin', 'developer', 'designer', 'product_owner') NOT NULL DEFAULT 'developer',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 2. Workspaces Table
-- ----------------------------------------------------------------------------
CREATE TABLE workspaces (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  owner_id INT UNSIGNED NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_workspaces_owner FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE,
  INDEX idx_workspaces_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 3. Workspace Members Table
-- ----------------------------------------------------------------------------
CREATE TABLE workspace_members (
  workspace_id INT UNSIGNED NOT NULL,
  user_id INT UNSIGNED NOT NULL,
  role ENUM('owner', 'admin', 'member') NOT NULL DEFAULT 'member',
  joined_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (workspace_id, user_id),
  CONSTRAINT fk_members_workspace FOREIGN KEY (workspace_id) REFERENCES workspaces (id) ON DELETE CASCADE,
  CONSTRAINT fk_members_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 4. Boards Table
-- ----------------------------------------------------------------------------
CREATE TABLE boards (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  workspace_id INT UNSIGNED NOT NULL,
  title VARCHAR(150) NOT NULL,
  description TEXT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_boards_workspace FOREIGN KEY (workspace_id) REFERENCES workspaces (id) ON DELETE CASCADE,
  INDEX idx_boards_workspace (workspace_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 5. Columns Table
-- ----------------------------------------------------------------------------
CREATE TABLE `columns` (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  board_id INT UNSIGNED NOT NULL,
  title VARCHAR(100) NOT NULL,
  slug VARCHAR(50) NOT NULL,
  position INT UNSIGNED NOT NULL DEFAULT 0,
  color VARCHAR(30) NULL,
  wip_limit INT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_columns_board FOREIGN KEY (board_id) REFERENCES boards (id) ON DELETE CASCADE,
  INDEX idx_columns_board_position (board_id, position)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 6. Cards Table
-- ----------------------------------------------------------------------------
CREATE TABLE cards (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  board_id INT UNSIGNED NOT NULL,
  column_id INT UNSIGNED NOT NULL,
  code VARCHAR(20) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NULL,
  type ENUM('feature', 'bug', 'refactor', 'docs', 'spike') NOT NULL DEFAULT 'feature',
  priority ENUM('urgent', 'high', 'medium', 'low') NOT NULL DEFAULT 'medium',
  story_points TINYINT UNSIGNED NOT NULL DEFAULT 1,
  position INT UNSIGNED NOT NULL DEFAULT 0,
  assignee_id INT UNSIGNED NULL,
  reporter_id INT UNSIGNED NOT NULL,
  due_date DATE NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_cards_board FOREIGN KEY (board_id) REFERENCES boards (id) ON DELETE CASCADE,
  CONSTRAINT fk_cards_column FOREIGN KEY (column_id) REFERENCES `columns` (id) ON DELETE CASCADE,
  CONSTRAINT fk_cards_assignee FOREIGN KEY (assignee_id) REFERENCES users (id) ON DELETE SET NULL,
  CONSTRAINT fk_cards_reporter FOREIGN KEY (reporter_id) REFERENCES users (id) ON DELETE CASCADE,
  INDEX idx_cards_column_position (column_id, position),
  INDEX idx_cards_board_code (board_id, code),
  INDEX idx_cards_priority (priority),
  INDEX idx_cards_type (type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 7. Subtasks Table
-- ----------------------------------------------------------------------------
CREATE TABLE subtasks (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  card_id INT UNSIGNED NOT NULL,
  title VARCHAR(255) NOT NULL,
  is_completed BOOLEAN NOT NULL DEFAULT FALSE,
  position INT UNSIGNED NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_subtasks_card FOREIGN KEY (card_id) REFERENCES cards (id) ON DELETE CASCADE,
  INDEX idx_subtasks_card_position (card_id, position)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 8. Tags Table
-- ----------------------------------------------------------------------------
CREATE TABLE tags (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  workspace_id INT UNSIGNED NOT NULL,
  name VARCHAR(50) NOT NULL,
  color VARCHAR(30) NOT NULL DEFAULT '#6366f1',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_tags_workspace FOREIGN KEY (workspace_id) REFERENCES workspaces (id) ON DELETE CASCADE,
  UNIQUE KEY uq_tags_workspace_name (workspace_id, name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 9. Card Tags Junction Table
-- ----------------------------------------------------------------------------
CREATE TABLE card_tags (
  card_id INT UNSIGNED NOT NULL,
  tag_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (card_id, tag_id),
  CONSTRAINT fk_card_tags_card FOREIGN KEY (card_id) REFERENCES cards (id) ON DELETE CASCADE,
  CONSTRAINT fk_card_tags_tag FOREIGN KEY (tag_id) REFERENCES tags (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
