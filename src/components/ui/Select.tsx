import React from 'react';
import { ChevronDownIcon } from 'lucide-react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, options, className = '', ...props }: SelectProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-[10px] font-label font-black text-on-surface-variant uppercase tracking-widest">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          className="w-full appearance-none border border-outline-variant/30 bg-surface-container-lowest px-3 py-2 text-xs font-label text-on-surface focus:border-primary/60 focus:outline-none transition-colors"
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-surface-container text-on-surface">
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-on-surface-variant/50">
          <ChevronDownIcon className="h-3.5 w-3.5" />
        </div>
      </div>
    </div>
  );
}