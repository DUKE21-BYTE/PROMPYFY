import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export function Button({
  children, variant = 'primary', size = 'md',
  isLoading, className = '', disabled, ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-label font-black uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-40 active:scale-95';

  const variants = {
    primary:   'bg-primary text-on-primary hover:brightness-110 shadow-[0_0_20px_rgba(163,166,255,0.15)] hover:shadow-[0_0_30px_rgba(163,166,255,0.3)]',
    secondary: 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest border border-outline-variant/30',
    ghost:     'hover:bg-surface-container text-on-surface-variant hover:text-on-surface',
    outline:   'border border-outline-variant bg-transparent hover:bg-surface-container text-on-surface-variant hover:text-on-surface',
  };

  const sizes = {
    sm: 'h-7 px-3 text-[10px]',
    md: 'h-9 px-4 text-[11px]',
    lg: 'h-11 px-8 text-xs',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
}