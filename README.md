# DevFlow Kanban — Tablero Ágil de Gestión de Proyectos

<div align="center">

![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![dnd kit](https://img.shields.io/badge/@dnd--kit-Drag%20%26%20Drop-7C3AED?style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Deploy](https://img.shields.io/badge/Deploy-GitHub%20Pages-22C55E?style=for-the-badge&logo=github&logoColor=white)

**Tablero interactivo de gestión ágil de proyectos y sprints inspirado en Linear y GitHub Projects con arrastre fluido Drag & Drop (@dnd-kit), Story Points Fibonacci y persistencia local.**

[🚀 Demo en Vivo](https://alxnrocha.github.io/kanban-board/) • [📂 Repositorio en GitHub](https://github.com/alxnrocha/kanban-board)

</div>

---

## 🏛️ Arquitectura y Flujo de Interacción

```mermaid
graph TD
    User([👤 Desarrollador / Product Manager]) --> Board[DevFlow Board: Contexto DndContext]
    Board --> SprintBanner[SprintBanner: Story Points, Progreso & Velocidad]
    Board --> FilterBar[FilterBar: Búsqueda ⌘K, Filtro por Tipo, Prioridad & Asignado]
    Board --> Columns[Columnas: Backlog ➔ En Progreso ➔ Revisión ➔ Concluido]
    Columns --> SortableTask[SortableTask: Arrastre Vertical & Transferencia Entre Columnas]
    SortableTask --> TaskModal[TaskModal: Checklist de Subtareas, Story Points & Tags]
    Board <--> Storage[(LocalStorage: Sincronización Automática)]
```

---

## ✨ Características Principales

- **Motor Drag & Drop (@dnd-kit):** Movimiento fluido de tarjetas entre columnas y reordenamiento vertical con elevación visual (`DragOverlay`) y sensores accesibles.
- **Resumen del Sprint en Vivo:** Cálculo de métricas (Tareas totales, completadas, Story Points acumulados `89/120` y barra de progreso porcentual).
- **Gestión de Tareas y Subtareas:** Tipos (`Feature`, `Bug`, `Task`, `Refactor`), prioridades (`Urgente`, `Alta`, `Media`, `Baja`), Story Points y checklist interactivo.
- **Búsqueda Rápida & Filtros:** Búsqueda en tiempo real con atajo de teclado (`⌘K` / `Ctrl+K`) y filtros rápidos por etiquetas y asignados.
- **Navegación Móvil Adaptativa:** Selector horizontal de columnas para pantallas pequeñas y controles táctiles optimizados.

---

## 🗂️ Estructura del Proyecto

```text
10-kanban-board/
├── index.html
├── src/
│   ├── components/                # KanbanBoard, Column, TaskCard, TaskModal, SprintBanner
│   ├── types/                     # Tipos TypeScript para tareas y columnas
│   ├── App.tsx                    # Componente raíz con estado de tablero
│   └── main.tsx                   # Entrada principal React 19
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Instalación y Puesta en Marcha

### Prerrequisitos

- Node.js `>= 20.0.0`
- npm `>= 10.0.0`

### Ejecución Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/alxnrocha/kanban-board.git
cd kanban-board

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Compilar para producción
npm run build
```

---

## 🛠️ Tecnologías Utilizadas

| Capa            | Tecnología      | Aspectos Clave                                                 |
| --------------- | --------------- | -------------------------------------------------------------- |
| **Framework**   | React 19        | Hooks de estado y optimización de renderizado de columnas      |
| **Lenguaje**    | TypeScript 5.8  | Tipado estricto para entidades de sprint, tareas y eventos dnd |
| **Drag & Drop** | @dnd-kit        | Sensores de puntero y teclado, colisiones ortogonales          |
| **Estilos**     | Tailwind CSS v4 | Obsidian Dark / Modern Slate theme con micro-animaciones       |
| **Bundler**     | Vite 6.0        | Compilación ultrarrápida y optimización para web               |
| **Despliegue**  | GitHub Pages    | Despliegue estático continuo y optimizado                      |

---

<div align="center">
  <sub>Desarrollado con dedicación por <a href="https://github.com/alxnrocha">Alex Rocha</a> • Proyecto 10 del Portafolio Profesional Frontend.</sub>
</div>
