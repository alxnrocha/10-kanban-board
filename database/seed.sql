-- ============================================================================
-- DevFlow Kanban Sample Seed Data (MySQL 8.4 LTS)
-- Description: Realistic initial development and testing dataset.
-- ============================================================================

USE devflow_kanban;

-- 1. Seed Users
INSERT INTO users (id, name, email, avatar_url, role) VALUES
  (1, 'Alexandre Rocha', 'alxnrocha@gmail.com', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', 'admin'),
  (2, 'Elena Gómez', 'elena.gomez@devflow.io', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', 'developer'),
  (3, 'Carlos Rivera', 'carlos.rivera@devflow.io', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', 'developer'),
  (4, 'Sofia Chen', 'sofia.chen@devflow.io', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', 'designer'),
  (5, 'Marc Vilanova', 'marc.vilanova@devflow.io', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', 'product_owner');

-- 2. Seed Workspaces
INSERT INTO workspaces (id, name, slug, owner_id) VALUES
  (1, 'DevFlow Core Team', 'devflow-core', 1);

-- 3. Seed Workspace Members
INSERT INTO workspace_members (workspace_id, user_id, role) VALUES
  (1, 1, 'owner'),
  (1, 2, 'member'),
  (1, 3, 'member'),
  (1, 4, 'member'),
  (1, 5, 'admin');

-- 4. Seed Boards
INSERT INTO boards (id, workspace_id, title, description, is_active) VALUES
  (1, 1, 'Sprint 42 — Core Platform & Drag & Drop', 'Tablero principal de desarrollo para el ciclo de sprint actual con foco en UI y persistencia.', TRUE);

-- 5. Seed Columns (5 Standard Kanban Columns)
INSERT INTO `columns` (id, board_id, title, slug, position, color, wip_limit) VALUES
  (1, 1, 'Backlog', 'backlog', 0, '#64748b', NULL),
  (2, 1, 'Por Hacer', 'todo', 1, '#3b82f6', 8),
  (3, 1, 'En Progreso', 'in_progress', 2, '#f59e0b', 4),
  (4, 1, 'Revisión', 'review', 3, '#8b5cf6', 3),
  (5, 1, 'Completado', 'done', 4, '#10b981', NULL);

-- 6. Seed Tags
INSERT INTO tags (id, workspace_id, name, color) VALUES
  (1, 1, 'Frontend', '#6366f1'),
  (2, 1, 'Backend', '#10b981'),
  (3, 1, 'Design', '#ec4899'),
  (4, 1, 'Security', '#ef4444'),
  (5, 1, 'Performance', '#f59e0b');

-- 7. Seed Cards
INSERT INTO cards (id, board_id, column_id, code, title, description, type, priority, story_points, position, assignee_id, reporter_id, due_date) VALUES
  -- Column 1: Backlog
  (1, 1, 1, 'DEV-101', 'Migración de autenticación a OAuth 2.0 PKCE', 'Reemplazar flujo actual por estándar PKCE para mayor seguridad en clientes frontend.', 'security' /* mapped to bug/refactor */, 'medium', 5, 0, 3, 5, '2026-09-10'),
  (2, 1, 1, 'DEV-102', 'Exportación de métricas de Sprint a formato PDF/CSV', 'Permitir descargar reporte ejecutivo de velocidad de equipo y tareas cerradas.', 'feature', 'low', 3, 1, 2, 5, '2026-09-15'),

  -- Column 2: Por Hacer (To Do)
  (3, 1, 2, 'DEV-103', 'Optimización de bundle size y code splitting en Vite', 'Reducir tamaño de chunks iniciales implementando dynamic imports en modales pesados.', 'refactor', 'high', 3, 0, 1, 5, '2026-08-25'),
  (4, 1, 2, 'DEV-104', 'Soporte para temas personalizados de columnas', 'Añadir selector de color hexadecimal o paleta para cada columna del tablero.', 'feature', 'medium', 2, 1, 4, 1, '2026-08-28'),

  -- Column 3: En Progreso (In Progress)
  (5, 1, 3, 'DEV-105', 'Integración del motor Drag and Drop con @dnd-kit', 'Implementar arrastre suave de tarjetas entre columnas y reordenamiento vertical con sensores táctiles y de teclado.', 'feature', 'urgent', 8, 0, 1, 5, '2026-08-20'),
  (6, 1, 3, 'DEV-106', 'Rediseño visual de tarjetas con indicadores de sub-tareas', 'Actualizar componente Card para mostrar avatares de responsables, badges de prioridad y barra de progreso.', 'feature', 'high', 5, 1, 4, 1, '2026-08-22'),

  -- Column 4: Revisión (Code Review)
  (7, 1, 4, 'DEV-107', 'Corrección de fuga de memoria en suscripción de eventos', 'Unificar cleanup de event listeners en modales y menús contextuales.', 'bug', 'high', 2, 0, 2, 1, '2026-08-18'),

  -- Column 5: Completado (Done)
  (8, 1, 5, 'DEV-108', 'Configuración de tooling base, Tailwind CSS v4 y Oxlint', 'Setup de repositorio, tokens de diseño en index.css y pre-commit hooks con Husky.', 'feature', 'medium', 3, 0, 1, 5, '2026-08-15'),
  (9, 1, 5, 'DEV-109', 'Diseño de primitivos UI accesibles (Button, Input, Dialog)', 'Construcción de componentes base reutilizables en src/components/ui/ con soporte de foco y accesibilidad.', 'feature', 'high', 5, 1, 4, 1, '2026-08-15');

-- 8. Seed Subtasks
INSERT INTO subtasks (id, card_id, title, is_completed, position) VALUES
  (1, 5, 'Configurar DndContext y sensores de puntero/teclado', TRUE, 0),
  (2, 5, 'Implementar SortableContext para cada columna', TRUE, 1),
  (3, 5, 'Añadir DragOverlay con animación de elevación', FALSE, 2),
  (4, 5, 'Sincronizar mutaciones con el store de Zustand', FALSE, 3),

  (5, 6, 'Maquetar badges de prioridad y tipos', TRUE, 0),
  (6, 6, 'Calcular porcentaje de sub-tareas completadas', TRUE, 1),
  (7, 6, 'Renderizar avatar del desarrollador asignado', FALSE, 2),

  (8, 7, 'Reproducir issue en entorno local', TRUE, 0),
  (9, 7, 'Añadir cleanup en useEffect del Dialog', TRUE, 1),
  (10, 7, 'Crear test de regresión automatizado', TRUE, 2);

-- 9. Seed Card Tags
INSERT INTO card_tags (card_id, tag_id) VALUES
  (1, 2), (1, 4),
  (2, 1),
  (3, 1), (3, 5),
  (4, 1), (4, 3),
  (5, 1),
  (6, 1), (6, 3),
  (7, 1), (7, 5),
  (8, 1),
  (9, 1), (9, 3);
