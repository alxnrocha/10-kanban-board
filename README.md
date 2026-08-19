# DevFlow Kanban — Tablero Ágil de Gestión de Proyectos

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-success?style=flat-square&logo=github&logoColor=white)](https://alxnrocha.github.io/kanban-board/)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![dnd kit](https://img.shields.io/badge/@dnd--kit-Drag_&_Drop-7C3AED?style=flat-square)](https://dndkit.com/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

> **Proyecto 10 del Portafolio Profesional** — Tablero interactivo de gestión ágil de proyectos y sprints con arrastre Drag & Drop (@dnd-kit) y persistencia local.  
> 🔗 **Demo en Vivo en GitHub Pages:** [https://alxnrocha.github.io/kanban-board/](https://alxnrocha.github.io/kanban-board/)

---

## ✨ Características Principales

### 🚀 Experiencia de Usuario & Frontend

- **Motor Drag & Drop (@dnd-kit):** Movimiento fluido de tarjetas entre columnas y reordenamiento vertical con elevación visual (`DragOverlay`) y restricciones de puntero.
- **Resumen del Sprint en Vivo:** Cálculo dinámico de métricas (Tareas totales, completadas, Story Points acumulados `89/120` y barra de progreso porcentual).
- **Gestión de Tareas y Subtareas:** Tipos (`Feature`, `Bug`, `Task`, `Refactor`), prioridades (`Urgente`, `Alta`, `Media`, `Baja`), Story Points Fibonacci y checklist interactivo.
- **Búsqueda Rápida & Filtros:** Búsqueda en tiempo real con atajo de teclado (`⌘ K` / `Ctrl+K`) y filtros en 1 clic (`Mis tareas`, `Features`, `Bugs`, `Alta Prioridad`).
- **Navegación Móvil Adaptativa:** Selector horizontal de pestañas de columnas para smartphones (<520px).
- **Persistencia en LocalStorage:** Sincronización automática de estado mediante Zustand Persist con opción de reinicio de demo.

---

## 🏛️ Estructura del Proyecto

```text
10-kanban-board/
├── .github/workflows/ci.yml       # Pipeline de CI y Deploy automático en Pages
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
├── package.json                   # Scripts y dependencias
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
