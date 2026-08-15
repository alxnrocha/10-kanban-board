import React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | 'default'
    | 'brand'
    | 'feature'
    | 'bug'
    | 'refactor'
    | 'docs'
    | 'urgent'
    | 'high'
    | 'medium'
    | 'low'
    | 'success'
    | 'outline';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  size = 'md',
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center gap-1.5 font-medium rounded-md tracking-tight select-none';

  const variants = {
    default: 'bg-slate-800 text-slate-300 border border-slate-700/60',
    brand: 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30',
    feature: 'bg-violet-500/15 text-violet-300 border border-violet-500/30',
    bug: 'bg-red-500/15 text-red-300 border border-red-500/30',
    refactor: 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
    docs: 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30',
    urgent: 'bg-red-500/20 text-red-300 border border-red-500/40',
    high: 'bg-orange-500/20 text-orange-300 border border-orange-500/40',
    medium: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40',
    low: 'bg-blue-500/20 text-blue-300 border border-blue-500/40',
    success: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
    outline: 'bg-transparent text-slate-400 border border-slate-700',
  };

  const sizes = {
    sm: 'text-[10px] px-1.5 py-0.5 leading-none',
    md: 'text-xs px-2 py-0.5',
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
};
