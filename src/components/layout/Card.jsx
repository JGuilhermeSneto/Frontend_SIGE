import React from 'react';
import './Card.css'; // Opcional se precisarmos estender

/**
 * Componente Card baseado no Design System "Premium" (Django).
 * Emprega o fundo surface, border-subtle, arredondamento e elevação no hover.
 */
export default function Card({ title, children, className = '', hoverEffect = true, style }) {
  const hoverClass = hoverEffect ? 'sige-card-hover' : '';

  return (
    <div 
      className={`sige-ui-card ${hoverClass} ${className}`}
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '18px',
        boxShadow: 'var(--shadow-card)',
        transition: 'all 0.3s ease',
        ...style
      }}
    >
      {title && (
        <h3 style={{ fontSize: '1rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {title}
        </h3>
      )}
      <div className="sige-ui-card-content">
        {children}
      </div>
    </div>
  );
}
