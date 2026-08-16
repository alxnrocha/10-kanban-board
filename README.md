# DevFlow Kanban — Tablero Ágil de Gestión de Proyectos

[![CI & Deploy](https://github.com/alxnrocha/kanban-board/actions/workflows/ci.yml/badge.svg)](https://github.com/alxnrocha/kanban-board/actions)
[![Demo GitHub Pages](https://img.shields.io/badge/Demo-GitHub_Pages-22c55e?style=for-the-badge&logo=github&logoColor=white)](https://alxnrocha.github.io/kanban-board/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

**DevFlow Kanban** es una aplicación web moderna y reactiva de gestión ágil de proyectos inspirada en herramientas de alta gama como Linear y GitHub Projects. Incorpora arrastre fluido Drag & Drop (@dnd-kit), gestión de subtareas con barra de progreso, filtros rápidos, persistencia local y diseño relacional SQL.

- 🌐 **Demo en Vivo (GitHub Pages):** [https://alxnrocha.github.io/kanban-board/](https://alxnrocha.github.io/kanban-board/)
- 📦 **Repositorio GitHub:** [https://github.com/alxnrocha/kanban-board](https://github.com/alxnrocha/kanban-board)

---

## ✨ Características Principales

### 🚀 Experiencia de Usuario & Frontend
- **Motor Drag & Drop (@dnd-kit):** Movimiento fluido de tarjetas entre columnas y reordenamiento vertical con elevación visual (`DragOverlay`) y restricciones de puntero.
- **Resumen del Sprint en Vivo:** Cálculo dinámico de métricas (Tareas totales, completadas, Story Points acumulados `89/120` y barra de progreso porcentual).
- **Gestión de Tareas y Subtareas:** Tipos (`Feature`, `Bug`, `Task`, `Refactor`), prioridades (`Urgente`, `Alta`, `Media`, `Baja`), Story Points Fibonacci y checklist interactivo.
- **Búsqueda Rápida & Filtros:** Búsqueda en tiempo real con atajo de teclado (`⌘ K` / `Ctrl+K`) y filtros en 1 clic (`Mis tareas`, `Features`, `Bugs`, `Alta Prioridad`).
- **Navegación Móvil Adaptativa:** Selector horizontal de pestañas de columnas para smartphones (<520px).
- **Persistencia en LocalStorage:** Sincronización automática de estado mediante Zustand Persist con opción de reinicio de demo.

### 🛡️ Modelo de Base de Datos Relacional
- Esquema relacional 3NF completo compatible con MySQL 8.4 LTS en [`database/README.md`](./database/README.md) con 9 tablas (`users`, `teams`, `projects`, `sprints`, `columns`, `tasks`, `subtasks`, `tags`).

---

## 🏛️ Estructura del Proyecto

```text
10-kanban-board/
├── .github/workflows/ci.yml       # Pipeline de CI y Deploy automático en Pages
├── database/                      # Esquema relacional SQL (MySQL 8.4 LTS)
│   ├── README.md
│   ├── schema.sql
│   └── seed.sql
├── docs/screenshots/              # Capturas de pantalla reales
│   ├── desktop-preview.png
│   ├── modal-preview.png
│   └── mobile-preview.png
├── src/
│   ├── components/
│   │   ├── kanban/                # KanbanBoard, KanbanColumn, TaskCard, TaskModal
│   │   ├── layout/                # AppLayout, Header, Sidebar, QuickFilterBar, SprintSummary
│   │   └── ui/                    # Badge, Button, Card, Dialog, Input, Textarea
│   ├── store/                     # kanbanStore.ts (Zustand con persistencia)
│   ├── test/                      # Pruebas unitarias con Vitest
│   ├── types/                     # Tipos de dominio e interfaces
│   ├── utils/                     # Utilidades y dataset inicial
│   ├── App.tsx                    # Shell principal
│   └── main.tsx                   # Entrada React 19
├── index.html                     # Entrypoint HTML5
├── BLUEPRINT.md                   # Especificación técnica
├── DECISIONS.md                   # Registro de decisiones de arquitectura
└── vite.config.ts                 # Configuración de Vite y Tailwind v4
```

---

## ⚡ Guía de Inicio Rápido

### 1. Clonar e Instalar Dependencias
```bash
git clone https://github.com/alxnrocha/kanban-board.git
cd kanban-board
npm install
```

### 2. Iniciar en Modo Desarrollo
```bash
npm run dev
```

---

## 🧪 Calidad de Código y Pruebas

```bash
# Ejecutar suite de pruebas con Vitest
npm test

# Verificación de tipos TypeScript
npm run typecheck

# Linter Oxlint
npm run lint

# Formatear código con Prettier
npm run format

# Compilar para producción
npm run build
```

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulte el archivo [LICENSE](./LICENSE) para más detalles.

**Autor:** [Alexandre Rocha](https://github.com/alxnrocha)
