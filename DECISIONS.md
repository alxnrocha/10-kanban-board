# Registro de Decisiones de Arquitectura (ADR) — DevFlow Kanban

Este documento recopila las decisiones técnicas y de diseño fundamentales adoptadas durante la concepción, desarrollo y optimización de **DevFlow Kanban**.

---

## 1. Elección de Zustand sobre Redux Toolkit o Context API nativo

- **Contexto:** El tablero Kanban maneja un estado multidimensional altamente reactivo (14+ tarjetas iniciales, 5 columnas, reordenamiento continuo, filtros combinados y sincronización persistente).
- **Decisión:** Se adoptó **Zustand v5** con el middleware \`persist\`.
- **Consecuencias:**
  - Cero boilerplate en comparación con Redux (sin reducers ni dispatchers redundantes).
  - Suscripciones atómicas por selector (\`useKanbanStore((s) => s.tasks)\`), lo que elimina renderizados innecesarios del tablero completo durante el movimiento de una sola tarjeta.
  - Persistencia automática sin fisuras en \`localStorage\` bajo la clave \`devflow-kanban-storage\`.

---

## 2. Motor de Drag and Drop: Elección de `@dnd-kit`

- **Contexto:** La experiencia de usuario exigía arrastre de tarjetas entre columnas y reordenación interna fluida, con accesibilidad por teclado y compatibilidad móvil.
- **Decisión:** Se seleccionó **@dnd-kit** (\`@dnd-kit/core\`, \`@dnd-kit/sortable\`, \`@dnd-kit/utilities\`).
- **Consecuencias:**
  - Rendimiento de 60fps usando transformaciones CSS nativas y \`DragOverlay\` desacoplado del árbol DOM directo.
  - Restricción de activación por puntero (\`distance: 5px\`) que evita falsos arrastres al hacer clic para abrir modales o editar datos.
  - Compatibilidad nativa con lectores de pantalla mediante anuncios ARIA dinámicos en español y navegación mediante teclado (\`KeyboardSensor\`).

---

## 3. Estilizado CSS-First con Tailwind CSS v4

- **Contexto:** Garantizar fidelidad visual pixel-perfect frente al diseño de referencia con modo oscuro inmersivo (#090d16), elevaciones y badges temáticos.
- **Decisión:** Uso de **Tailwind CSS v4** mediante directivas de tema directo en \`src/index.css\` (\`@theme\`).
- **Consecuencias:**
  - Eliminación de archivos de configuración externos (\`tailwind.config.js\`).
  - Tokens de color y elevación unificados centralmente con soporte para fuentes tipográficas Inter y transiciones sutiles de microinteracción.

---

## 4. Estrategia de Navegación Responsiva Móvil (<520px)

- **Contexto:** Los tableros Kanban tradicionales de 5 columnas sufren colapso o scroll horizontal inmanejable en pantallas móviles angostas.
- **Decisión:** Implementar un selector de pestañas de columnas (\`sm:hidden\`) en vista móvil que muestra una columna completa a la vez con tarjetas táctiles amplias.
- **Consecuencias:**
  - Cero desbordamiento no deseado en dispositivos móviles.
  - Acceso instantáneo a cualquier estado de la tarea (\`Backlog\`, \`Por Hacer\`, \`En Progreso\`, etc.) con un solo toque.
  - Transición automática a grid horizontal expansivo en pantallas de escritorio.

---

## 5. Adopción de Oxlint para Análisis Estático Ultra-Rápido

- **Contexto:** Reducir tiempos de validación en hooks de Git (Husky + lint-staged) y pipelines de CI.
- **Decisión:** Uso de **Oxlint** en lugar de suites pesadas de ESLint tradicional.
- **Consecuencias:**
  - Verificación de código en menos de 15ms sobre el proyecto completo.
  - Ejecución instantánea en pre-commit sin retrasar el flujo de desarrollo.

---

## 6. Esquema de Base de Datos Relacional MySQL 8.4 LTS

- **Contexto:** Diseñar el modelo de persistencia backend con integridad referencial completa y soporte para auditoría.
- **Decisión:** Esquema relacional normalizado (3NF) con 9 tablas (\`users\`, \`teams\`, \`team_members\`, \`projects\`, \`sprints\`, \`columns\`, \`tasks\`, \`subtasks\`, \`tags\`, \`task_tags\`).
- **Consecuencias:**
  - Llaves foráneas con eliminación en cascada controlada.
  - Índices optimizados en \`column_id\`, \`sprint_id\` y \`position\` para consultas de tableros a escala empresarial.
