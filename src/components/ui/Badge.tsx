import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'amber' | 'blue' | 'emerald' | 'purple';
}

export function Badge({ children, variant = 'default', className = '', ...props }: BadgeProps) {
  const variants = {
    default: 'bg-surface-container text-on-surface-variant border-outline-variant/30',
    amber:   'bg-tertiary/10 text-tertiary border-tertiary/20',
    blue:    'bg-primary/10 text-primary border-primary/20',
    emerald: 'bg-secondary/10 text-secondary border-secondary/20',
    purple:  'bg-primary/10 text-primary border-primary/20',
  };

  return (
    <span
      className={`inline-flex items-center border px-2.5 py-0.5 text-[10px] font-label font-black uppercase tracking-widest transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}