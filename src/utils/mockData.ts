import type { User, Tag, Column, Task, Sprint } from '../types/kanban';

export const MOCK_USERS: User[] = [
  {
    id: 'user-1',
    name: 'Diego García',
    email: 'diego.garcia@devflow.io',
    avatarUrl:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'Tech Lead',
  },
  {
    id: 'user-2',
    name: 'Elena Gómez',
    email: 'elena.gomez@devflow.io',
    avatarUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    role: 'Senior Frontend',
  },
  {
    id: 'user-3',
    name: 'Carlos Rivera',
    email: 'carlos.rivera@devflow.io',
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'Backend Dev',
  },
  {
    id: 'user-4',
    name: 'Sofia Chen',
    email: 'sofia.chen@devflow.io',
    avatarUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    role: 'UI/UX Designer',
  },
  {
    id: 'user-5',
    name: 'Marc Vilanova',
    email: 'marc.vilanova@devflow.io',
    avatarUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    role: 'Product Owner',
  },
];

export const MOCK_TAGS: Tag[] = [
  { id: 'tag-1', name: 'backend', color: '#6366f1' },
  { id: 'tag-2', name: 'auth', color: '#8b5cf6' },
  { id: 'tag-3', name: 'ui/ux', color: '#ec4899' },
  { id: 'tag-4', name: 'performance', color: '#f59e0b' },
  { id: 'tag-5', name: 'security', color: '#ef4444' },
];

export const MOCK_COLUMNS: Column[] = [
  { id: 'col-backlog', title: 'Backlog', slug: 'backlog', color: '#64748b', position: 0 },
  { id: 'col-todo', title: 'Por Hacer', slug: 'todo', color: '#3b82f6', position: 1, wipLimit: 8 },
  {
    id: 'col-in-progress',
    title: 'En Progreso',
    slug: 'in_progress',
    color: '#8b5cf6',
    position: 2,
    wipLimit: 5,
  },
  {
    id: 'col-review',
    title: 'Revisión',
    slug: 'review',
    color: '#f59e0b',
    position: 3,
    wipLimit: 4,
  },
  {
    id: 'col-done',
    title: 'Completado',
    slug: 'done',
    color: '#22c55e',
    position: 4,
  },
];

export const MOCK_SPRINT: Sprint = {
  id: 'sprint-24',
  name: 'Sprint 24',
  startDate: '12 May',
  endDate: '25 May',
  totalStoryPoints: 89,
  targetStoryPoints: 120,
};

export const MOCK_TASKS: Task[] = [
  // 1. Backlog
  {
    id: 'task-187',
    code: 'DEV-187',
    title: 'Autenticación con GitHub OAuth',
    description:
      'Permitir inicio de sesión con credenciales de GitHub utilizando flujo OAuth 2.0 PKCE.',
    type: 'feature',
    priority: 'medium',
    storyPoints: 5,
    columnId: 'col-backlog',
    position: 0,
    assignee: MOCK_USERS[1], // Elena
    subtasks: [
      { id: 'st-1', title: 'Crear app en GitHub Developer Portal', isCompleted: true },
      { id: 'st-2', title: 'Configurar callback endpoint en backend', isCompleted: false },
      { id: 'st-3', title: 'Manejar refresh de tokens de acceso', isCompleted: false },
    ],
    tags: [MOCK_TAGS[0], MOCK_TAGS[1]],
    createdAt: '2026-08-10T10:00:00Z',
    updatedAt: '2026-08-10T10:00:00Z',
  },
  {
    id: 'task-188',
    code: 'DEV-188',
    title: 'Error 500 al subir archivos grandes',
    description:
      'El servidor rechaza peticiones multipart/form-data superiores a 10MB sin error explicativo.',
    type: 'bug',
    priority: 'high',
    storyPoints: 3,
    columnId: 'col-backlog',
    position: 1,
    assignee: MOCK_USERS[3], // Sofia
    subtasks: [
      { id: 'st-4', title: 'Ajustar body-parser payload limit a 50MB', isCompleted: true },
      {
        id: 'st-5',
        title: 'Mostrar mensaje de advertencia en frontend antes de enviar',
        isCompleted: false,
      },
    ],
    tags: [MOCK_TAGS[0], MOCK_TAGS[4]],
    createdAt: '2026-08-11T12:00:00Z',
    updatedAt: '2026-08-11T12:00:00Z',
  },
  {
    id: 'task-189',
    code: 'DEV-189',
    title: 'Mejorar SEO en páginas públicas',
    description: 'Añadir OpenGraph tags dinámicos y sitemap XML generado automáticamente.',
    type: 'feature',
    priority: 'low',
    storyPoints: 2,
    columnId: 'col-backlog',
    position: 2,
    assignee: MOCK_USERS[3],
    subtasks: [{ id: 'st-6', title: 'Generar meta tags canónicos', isCompleted: false }],
    tags: [MOCK_TAGS[2]],
    createdAt: '2026-08-11T14:00:00Z',
    updatedAt: '2026-08-11T14:00:00Z',
  },

  // 2. Por Hacer (To Do)
  {
    id: 'task-190',
    code: 'DEV-190',
    title: 'Diseño de página de precios',
    description:
      'Maquetar tabla comparativa de planes Free, Pro y Enterprise con selector anual/mensual.',
    type: 'feature',
    priority: 'medium',
    storyPoints: 3,
    columnId: 'col-todo',
    position: 0,
    assignee: MOCK_USERS[2], // Carlos
    subtasks: [
      { id: 'st-7', title: 'Crear toggle de facturación anual/mensual', isCompleted: true },
      { id: 'st-8', title: 'Diseñar badges de plan recomendado', isCompleted: false },
      { id: 'st-9', title: 'Integrar links a checkout de Stripe', isCompleted: false },
    ],
    tags: [MOCK_TAGS[2]],
    createdAt: '2026-08-12T09:00:00Z',
    updatedAt: '2026-08-12T09:00:00Z',
  },
  {
    id: 'task-191',
    code: 'DEV-191',
    title: 'Validación de formulario en registro',
    description:
      'Añadir validación en tiempo real de fuerza de contraseña y comprobación de email duplicado.',
    type: 'bug',
    priority: 'high',
    storyPoints: 2,
    columnId: 'col-todo',
    position: 1,
    assignee: MOCK_USERS[3],
    subtasks: [
      { id: 'st-10', title: 'Regex de caracteres especiales', isCompleted: true },
      { id: 'st-11', title: 'Debounce en comprobación de email', isCompleted: false },
    ],
    tags: [MOCK_TAGS[1], MOCK_TAGS[2]],
    createdAt: '2026-08-12T11:30:00Z',
    updatedAt: '2026-08-12T11:30:00Z',
  },
  {
    id: 'task-192',
    code: 'DEV-192',
    title: 'Implementar tema dark mode',
    description:
      'Sincronizar tema con preferencias del sistema y persistir selección en localStorage.',
    type: 'feature',
    priority: 'medium',
    storyPoints: 5,
    columnId: 'col-todo',
    position: 2,
    assignee: MOCK_USERS[3],
    subtasks: [
      { id: 'st-12', title: 'Definir tokens CSS @theme', isCompleted: true },
      { id: 'st-13', title: 'Añadir selector de tema en header', isCompleted: false },
    ],
    tags: [MOCK_TAGS[2]],
    createdAt: '2026-08-12T15:00:00Z',
    updatedAt: '2026-08-12T15:00:00Z',
  },

  // 3. En Progreso (In Progress)
  {
    id: 'task-193',
    code: 'DEV-193',
    title: 'Integración con pasarela de pago',
    description:
      'Integrar Stripe Elements para procesar suscripciones con tarjetas de crédito y Apple Pay.',
    type: 'feature',
    priority: 'high',
    storyPoints: 8,
    columnId: 'col-in-progress',
    position: 0,
    assignee: MOCK_USERS[3],
    subtasks: [
      { id: 'st-14', title: 'Crear cuenta en Stripe sandbox', isCompleted: true },
      { id: 'st-15', title: 'Obtener claves API y secrets', isCompleted: true },
      { id: 'st-16', title: 'Implementar webhook handler', isCompleted: true },
      { id: 'st-17', title: 'Pruebas de pago en sandbox', isCompleted: false },
      { id: 'st-18', title: 'Manejo de errores 3DS', isCompleted: false },
    ],
    tags: [MOCK_TAGS[0], MOCK_TAGS[1]],
    createdAt: '2026-08-13T08:00:00Z',
    updatedAt: '2026-08-13T08:00:00Z',
  },
  {
    id: 'task-194',
    code: 'DEV-194',
    title: 'Fix: Filtro de búsqueda no funciona en móvil',
    description:
      'El dropdown de filtros se superpone con la barra de navegación en resoluciones menores a 520px.',
    type: 'bug',
    priority: 'high',
    storyPoints: 5,
    columnId: 'col-in-progress',
    position: 1,
    assignee: MOCK_USERS[3],
    subtasks: [
      { id: 'st-19', title: 'Ajustar z-index y posición fixed en móvil', isCompleted: true },
      { id: 'st-20', title: 'Bloquear scroll del body al abrir drawer', isCompleted: true },
      { id: 'st-21', title: 'Probar en Safari iOS y Chrome Android', isCompleted: false },
    ],
    tags: [MOCK_TAGS[2], MOCK_TAGS[3]],
    createdAt: '2026-08-13T10:00:00Z',
    updatedAt: '2026-08-13T10:00:00Z',
  },
  {
    id: 'task-195',
    code: 'DEV-195',
    title: 'Dashboard de métricas',
    description:
      'Visualizar ingresos recurrentes (MRR), churn rate y usuarios activos diarios con gráficos interactivos.',
    type: 'feature',
    priority: 'medium',
    storyPoints: 8,
    columnId: 'col-in-progress',
    position: 2,
    assignee: MOCK_USERS[3],
    subtasks: [
      { id: 'st-22', title: 'Diseñar cards de KPI principales', isCompleted: true },
      { id: 'st-23', title: 'Configurar Recharts para serie temporal', isCompleted: true },
      { id: 'st-24', title: 'Implementar selector de rango de fechas', isCompleted: true },
      { id: 'st-25', title: 'Añadir filtros por segmento de cliente', isCompleted: true },
      { id: 'st-26', title: 'Optimizar renderizado de datos masivos', isCompleted: false },
      { id: 'st-27', title: 'Exportación a formato PDF', isCompleted: false },
    ],
    tags: [MOCK_TAGS[2], MOCK_TAGS[3]],
    createdAt: '2026-08-13T14:00:00Z',
    updatedAt: '2026-08-13T14:00:00Z',
  },

  // 4. Revisión (Code Review)
  {
    id: 'task-197',
    code: 'DEV-197',
    title: 'Notificaciones push',
    description:
      'Implementar Web Push API y Service Worker para alertas de menciones en comentarios y asignación de tareas.',
    type: 'feature',
    priority: 'medium',
    storyPoints: 3,
    columnId: 'col-review',
    position: 0,
    assignee: MOCK_USERS[3],
    subtasks: [
      { id: 'st-28', title: 'Registrar Service Worker para push events', isCompleted: true },
      { id: 'st-29', title: 'Solicitar permisos de notificación al usuario', isCompleted: true },
      { id: 'st-30', title: 'Testear recepción en segundo plano', isCompleted: false },
    ],
    tags: [MOCK_TAGS[0], MOCK_TAGS[2]],
    createdAt: '2026-08-14T09:00:00Z',
    updatedAt: '2026-08-14T09:00:00Z',
  },
  {
    id: 'task-198',
    code: 'DEV-198',
    title: 'Ajustes de accesibilidad',
    description:
      'Asegurar ratio de contraste WCAG AA, soporte completo de navegación por teclado y tags ARIA.',
    type: 'bug',
    priority: 'low',
    storyPoints: 2,
    columnId: 'col-review',
    position: 1,
    assignee: MOCK_USERS[3],
    subtasks: [
      { id: 'st-31', title: 'Auditoría con Axe DevTools', isCompleted: true },
      { id: 'st-32', title: 'Añadir aria-live en movimiento de tarjetas', isCompleted: false },
    ],
    tags: [MOCK_TAGS[2]],
    createdAt: '2026-08-14T11:00:00Z',
    updatedAt: '2026-08-14T11:00:00Z',
  },

  // 5. Completado (Done)
  {
    id: 'task-179',
    code: 'DEV-179',
    title: 'Corrección de estilos en componentes',
    description:
      'Unificar radios de bordes, sombras y paddings en botones e inputs según el Design System.',
    type: 'task',
    priority: 'low',
    storyPoints: 2,
    columnId: 'col-done',
    position: 0,
    assignee: MOCK_USERS[1],
    subtasks: [
      { id: 'st-33', title: 'Refactor de Button primitive', isCompleted: true },
      { id: 'st-34', title: 'Refactor de Input primitive', isCompleted: true },
    ],
    tags: [MOCK_TAGS[2]],
    createdAt: '2026-08-14T15:00:00Z',
    updatedAt: '2026-08-14T15:00:00Z',
  },
  {
    id: 'task-180',
    code: 'DEV-180',
    title: 'Actualizar dependencias del proyecto',
    description:
      'Upgrade a Vite 8, React 19 y Tailwind CSS v4 para aprovechar mejoras de rendimiento de compilación.',
    type: 'task',
    priority: 'medium',
    storyPoints: 1,
    columnId: 'col-done',
    position: 1,
    assignee: MOCK_USERS[3],
    subtasks: [
      { id: 'st-35', title: 'Actualizar package.json', isCompleted: true },
      { id: 'st-36', title: 'Verificar test suites verdes', isCompleted: true },
    ],
    tags: [MOCK_TAGS[3]],
    createdAt: '2026-08-15T09:00:00Z',
    updatedAt: '2026-08-15T09:00:00Z',
  },
  {
    id: 'task-181',
    code: 'DEV-181',
    title: 'Optimizar carga de imágenes',
    description:
      'Convertir avatares y recursos gráficos a formato AVIF/WebP con aspect-ratio fijo.',
    type: 'task',
    priority: 'low',
    storyPoints: 3,
    columnId: 'col-done',
    position: 2,
    assignee: MOCK_USERS[3],
    subtasks: [{ id: 'st-37', title: 'Optimizar assets locales', isCompleted: true }],
    tags: [MOCK_TAGS[3]],
    createdAt: '2026-08-15T11:00:00Z',
    updatedAt: '2026-08-15T11:00:00Z',
  },
];
