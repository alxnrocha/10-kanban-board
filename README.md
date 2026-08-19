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

## 🌟 Visión General & Propuesta de Valor

**DevFlow Kanban** es una aplicación web inspirada en los entornos de trabajo ágiles de Linear y GitHub Projects.

Facilita la planificación de sprints mediante arrastre interactivo de tarjetas entre columnas, estimación con Story Points Fibonacci, desglose de subtareas y control de productividad en tiempo real.

---

## ✨ Características Principales

- **Motor Drag & Drop (@dnd-kit):** Movimiento fluido de tarjetas entre columnas y reordenamiento vertical con elevación visual (`DragOverlay`).
- **Resumen del Sprint en Vivo:** Cálculo de métricas (Tareas totales, completadas, Story Points acumulados `89/120` y barra de progreso porcentual).
- **Gestión de Tareas y Subtareas:** Tipos (`Feature`, `Bug`, `Task`, `Refactor`), prioridades (`Urgente`, `Alta`, `Media`, `Baja`), Story Points y checklist interactivo.
- **Búsqueda Rápida & Filtros:** Búsqueda en tiempo real con atajo de teclado (`⌘ K` / `Ctrl+K`) y filtros rápidos.
- **Navegación Móvil Adaptativa:** Selector horizontal de columnas para pantallas pequeñas.

---

## 🏛️ Arquitectura del Proyecto

```text
10-kanban-board/
├── index.html
├── src/
│   ├── components/                # KanbanBoard, Column, TaskCard, TaskModal
│   ├── types/                     # Tipos TypeScript para tareas y columnas
│   ├── App.tsx                    # Componente raíz
│   └── main.tsx                   # Punto de entrada
├── LICENSE
├── package.json
└── vite.config.ts
```

---

## 🚀 Instalación y Puesta en Marcha

### Prerrequisitos

- Node.js `>= 20.0.0`
- npm `>= 10.0.0`

### Pasos

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/alxnrocha/kanban-board.git
   cd kanban-board
   ```

2. **Instalar dependencias:**

   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo:**

   ```bash
   npm run dev
   ```

4. **Compilar para producción:**
   ```bash
   npm run build
   ```

---

## 🛡️ Calidad de Código & Testing

- **Linter & Typecheck:** Oxlint y TypeScript en modo estricto.
- **Accesibilidad (a11y):** Soporte de teclado completo y contraste WCAG 2.1 AA.

---

## 📄 Licencia

Este proyecto se encuentra bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
