# Blueprint: DevFlow Kanban (Proyecto 10)

## 📌 Resumen del Proyecto

Panel interactivo de gestión ágil de sprints y tareas (Kanban board) para equipos de ingeniería de software. Permite crear, mover, reordenar y filtrar tarjetas de desarrollo a través de columnas de estado utilizando `@dnd-kit`, persistencia local con Zustand y una arquitectura de datos relacional modelada para MySQL 8.4 LTS.

## 🛠️ Stack Tecnológico

- **Core:** React 19, TypeScript, Vite 8
- **Estilos:** Tailwind CSS v4, Lucide React (iconos), clsx, tailwind-merge
- **Drag & Drop:** `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`
- **Estado Global:** Zustand 5 (con persistencia en `localStorage`)
- **Base de Datos (Teórica):** Esquema SQL relacional y DER (MySQL 8.4 LTS en `database/`)
- **Testing:** Vitest, React Testing Library, jsdom
- **CI/CD:** GitHub Actions (lint + format + typecheck + test + build)
- **Calidad de Código:** Oxlint, Prettier, Husky, lint-staged

---

## 🗺️ Roadmap y Milestones (17 Issues)

### Milestone 1 — Project Foundation

- **#1** `Set up initial project structure and tooling`
- **#2** `Configure design tokens and dark theme styling`
- **#3** `Implement UI primitives`
- **#4** `Design relational database schema and documentation`

### Milestone 2 — Core Features and State

- **#5** `Define TypeScript interfaces and Zustand store architecture`
- **#6** `Implement Header, Board navigation and filter bar`
- **#7** `Implement Column component and Kanban board grid layout`
- **#8** `Implement rich Task Card component`
- **#9** `Implement Drag and Drop engine with @dnd-kit`
- **#10** `Implement Card create and edit modal with subtasks checklist`

### Milestone 3 — Interactions and Quality

- **#11** `Implement quick filters and persistence sync`
- **#12** `Implement responsive mobile board navigation`
- **#13** `Implement accessibility and keyboard navigation for drag-and-drop`
- **#14** `Configure automated tests with Vitest and React Testing Library`
- **#15** `Configure GitHub Actions CI pipeline`

### Milestone 4 — Documentation and Release

- **#16** `Generate desktop and mobile screenshots`
- **#17** `Complete project documentation and production deployment`

---

## 🎨 Dominio y Modelo de Datos

Entidades principales:

- **Workspaces & Boards:** Espacios de trabajo y tableros de sprint activos.
- **Columns:** 5 estados del flujo (`Backlog`, `Por Hacer`, `En Progreso`, `Revisión`, `Completado`).
- **Cards:** Tareas técnicas con código único (`DEV-101`), título, descripción, tipo (`feature`, `bug`, `refactor`, `docs`), prioridad (`urgent`, `high`, `medium`, `low`), story points (1, 2, 3, 5, 8), fecha límite y orden posicional.
- **Subtasks:** Checklist de sub-tareas interactivas por tarjeta.
- **Tags & Users:** Miembros del equipo de desarrollo y etiquetas de módulo.
