import React from 'react';

export function Button({ children, className, variant, size, ...props }) {
  const variantClass = variant === 'ghost' ? 'bg-transparent border' : 'bg-blue-500 text-white';
  const sizeClass = size === 'icon' ? 'p-2' : 'py-2 px-4';

  return (
    <button className={`${variantClass} ${sizeClass} ${className}`} {...props}>
      {children}
    </button>
  );
}
