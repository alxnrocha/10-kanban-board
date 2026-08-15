import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  Bug,
  CheckSquare,
  Plus,
  Trash2,
  Bold,
  Italic,
  List,
  Code,
  Link,
} from 'lucide-react';
import { useKanbanStore } from '../../store/kanbanStore';
import type { Priority, TaskType, User, Tag } from '../../types/kanban';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';

export const TaskModal: React.FC = () => {
  const {
    isNewTaskModalOpen,
    newTaskDefaultColumnId,
    closeNewTaskModal,
    selectedTaskId,
    selectTask,
    tasks,
    columns,
    users,
    tags,
    addTask,
    updateTask,
    deleteTask,
    toggleSubtask,
    addSubtask,
    deleteSubtask,
  } = useKanbanStore();

  const selectedTask = tasks.find((t) => t.id === selectedTaskId);
  const isEditing = Boolean(selectedTask);
  const isOpen = isNewTaskModalOpen || isEditing;

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<TaskType>('feature');
  const [priority, setPriority] = useState<Priority>('medium');
  const [storyPoints, setStoryPoints] = useState<number>(3);
  const [columnId, setColumnId] = useState<string>(newTaskDefaultColumnId);
  const [assigneeId, setAssigneeId] = useState<string>('');
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [error, setError] = useState('');

  // Sync state when opening/editing
  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description || '');
      setType(selectedTask.type);
      setPriority(selectedTask.priority);
      setStoryPoints(selectedTask.storyPoints);
      setColumnId(selectedTask.columnId);
      setAssigneeId(selectedTask.assignee?.id || '');
      setSelectedTagIds(selectedTask.tags.map((t) => t.id));
      setError('');
    } else {
      setTitle('');
      setDescription('');
      setType('feature');
      setPriority('medium');
      setStoryPoints(3);
      setColumnId(newTaskDefaultColumnId);
      setAssigneeId(users[0]?.id || '');
      setSelectedTagIds([tags[0]?.id || '']);
      setError('');
    }
  }, [selectedTask, isNewTaskModalOpen, newTaskDefaultColumnId, users, tags]);

  const handleClose = React.useCallback(() => {
    closeNewTaskModal();
    selectTask(null);
  }, [closeNewTaskModal, selectTask]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  const handleToggleTag = (tagId: string) => {
    setSelectedTagIds((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    );
  };

  const handleAddSubtaskInline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubtaskTitle.trim()) return;

    if (isEditing && selectedTask) {
      addSubtask(selectedTask.id, newSubtaskTitle.trim());
    }
    setNewSubtaskTitle('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('El título de la tarea es obligatorio.');
      return;
    }

    const assignedUser: User | undefined = users.find((u) => u.id === assigneeId);
    const assignedTags: Tag[] = tags.filter((t) => selectedTagIds.includes(t.id));

    if (isEditing && selectedTask) {
      updateTask(selectedTask.id, {
        title: title.trim(),
        description: description.trim(),
        type,
        priority,
        storyPoints: Number(storyPoints) || 1,
        columnId,
        assignee: assignedUser,
        tags: assignedTags,
      });
    } else {
      addTask({
        title: title.trim(),
        description: description.trim(),
        type,
        priority,
        storyPoints: Number(storyPoints) || 1,
        columnId,
        assignee: assignedUser,
        tags: assignedTags,
        subtasks: [],
      });
    }

    handleClose();
  };

  const handleDelete = () => {
    if (selectedTask && window.confirm('¿Seguro que deseas eliminar esta tarea?')) {
      deleteTask(selectedTask.id);
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-end bg-black/65 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md h-full bg-[#0d1424] border-l border-[#1d273b] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200 select-none">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#1a2336] bg-[#0b101c]">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white tracking-tight">
                {isEditing ? 'Editar Tarea' : 'Nueva Tarea'}
              </h2>
              {isEditing && selectedTask && (
                <span className="font-mono text-[11px] font-semibold text-slate-400">
                  {selectedTask.code}
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {isEditing
                ? 'Actualiza los detalles y el checklist del ticket.'
                : 'Crea un nuevo ticket en el sprint activo.'}
            </p>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Cerrar drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Task Type Buttons */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Tipo de tarea
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setType('feature')}
                className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  type === 'feature'
                    ? 'bg-purple-600/30 text-purple-200 border-purple-500/50 shadow-xs shadow-purple-950'
                    : 'bg-[#131c31] text-slate-400 border-[#1f2c47] hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Feature</span>
              </button>

              <button
                type="button"
                onClick={() => setType('bug')}
                className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  type === 'bug'
                    ? 'bg-red-600/30 text-red-200 border-red-500/50 shadow-xs shadow-red-950'
                    : 'bg-[#131c31] text-slate-400 border-[#1f2c47] hover:text-slate-200'
                }`}
              >
                <Bug className="w-3.5 h-3.5" />
                <span>Bug</span>
              </button>

              <button
                type="button"
                onClick={() => setType('task')}
                className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  type === 'task'
                    ? 'bg-blue-600/30 text-blue-200 border-blue-500/50 shadow-xs shadow-blue-950'
                    : 'bg-[#131c31] text-slate-400 border-[#1f2c47] hover:text-slate-200'
                }`}
              >
                <CheckSquare className="w-3.5 h-3.5" />
                <span>Task</span>
              </button>
            </div>
          </div>

          {/* Title Input */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Título
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Implementar recuperación de contraseña"
              error={error}
              className="bg-[#111726] border-[#1f2c47]"
            />
          </div>

          {/* Description Textarea with formatting toolbar */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Descripción
              </label>
              <div className="flex items-center gap-1 text-slate-400">
                <span className="p-1 hover:text-white cursor-pointer rounded">
                  <Bold className="w-3 h-3" />
                </span>
                <span className="p-1 hover:text-white cursor-pointer rounded">
                  <Italic className="w-3 h-3" />
                </span>
                <span className="p-1 hover:text-white cursor-pointer rounded">
                  <List className="w-3 h-3" />
                </span>
                <span className="p-1 hover:text-white cursor-pointer rounded">
                  <Code className="w-3 h-3" />
                </span>
                <span className="p-1 hover:text-white cursor-pointer rounded">
                  <Link className="w-3 h-3" />
                </span>
              </div>
            </div>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Describe la tarea, contexto técnico o criterios de aceptación..."
              className="bg-[#111726] border-[#1f2c47] text-xs"
            />
          </div>

          {/* Priority, Column and Story Points Row */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Prioridad
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="w-full bg-[#111726] text-slate-200 text-xs rounded-xl px-2.5 py-2 border border-[#1f2c47] focus:border-indigo-500 focus:outline-none cursor-pointer"
              >
                <option value="urgent">Urgente</option>
                <option value="high">Alta</option>
                <option value="medium">Media</option>
                <option value="low">Baja</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Columna
              </label>
              <select
                value={columnId}
                onChange={(e) => setColumnId(e.target.value)}
                className="w-full bg-[#111726] text-slate-200 text-xs rounded-xl px-2.5 py-2 border border-[#1f2c47] focus:border-indigo-500 focus:outline-none cursor-pointer"
              >
                {columns.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Story Points
              </label>
              <input
                type="number"
                min="1"
                max="21"
                value={storyPoints}
                onChange={(e) => setStoryPoints(Number(e.target.value))}
                className="w-full bg-[#111726] text-slate-200 text-xs rounded-xl px-2.5 py-2 border border-[#1f2c47] focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Assignee */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Asignado a
            </label>
            <select
              value={assigneeId}
              onChange={(e) => setAssigneeId(e.target.value)}
              className="w-full bg-[#111726] text-slate-200 text-xs rounded-xl px-3 py-2 border border-[#1f2c47] focus:border-indigo-500 focus:outline-none cursor-pointer"
            >
              <option value="">Sin asignar</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.role})
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Etiquetas
            </label>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => {
                const isSelected = selectedTagIds.includes(tag.id);
                return (
                  <button
                    type="button"
                    key={tag.id}
                    onClick={() => handleToggleTag(tag.id)}
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
                      isSelected
                        ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/50'
                        : 'bg-[#111726] text-slate-400 border-[#1f2c47] hover:text-slate-200'
                    }`}
                  >
                    <span>{tag.name}</span>
                    {isSelected && <X className="w-3 h-3" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subtasks Checklist (Active in edit mode) */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Checklist de Subtareas
            </label>

            {isEditing && selectedTask && (
              <div className="space-y-1.5 mb-2">
                {selectedTask.subtasks.map((st) => (
                  <div
                    key={st.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-[#111726] border border-[#1f2c47] text-xs"
                  >
                    <label className="flex items-center gap-2.5 flex-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={st.isCompleted}
                        onChange={() => toggleSubtask(selectedTask.id, st.id)}
                        className="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0 w-3.5 h-3.5"
                      />
                      <span
                        className={
                          st.isCompleted
                            ? 'line-through text-slate-500 font-normal'
                            : 'text-slate-200 font-medium'
                        }
                      >
                        {st.title}
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={() => deleteSubtask(selectedTask.id, st.id)}
                      className="text-slate-500 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add Subtask Input */}
            {isEditing && (
              <div className="flex gap-2">
                <Input
                  value={newSubtaskTitle}
                  onChange={(e) => setNewSubtaskTitle(e.target.value)}
                  placeholder="Añadir item al checklist..."
                  className="bg-[#111726] border-[#1f2c47] text-xs h-8"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSubtaskInline(e);
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleAddSubtaskInline}
                  className="h-8 text-xs"
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            )}
          </div>
        </form>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-4 border-t border-[#1a2336] bg-[#0b101c]">
          {isEditing ? (
            <Button
              type="button"
              variant="danger"
              size="sm"
              onClick={handleDelete}
              className="text-xs"
            >
              <Trash2 className="w-3.5 h-3.5 mr-1" />
              <span>Eliminar</span>
            </Button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="text-xs"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleSubmit}
              className="bg-indigo-600 hover:bg-indigo-500 font-semibold text-xs"
            >
              {isEditing ? 'Guardar cambios' : 'Crear tarea'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
