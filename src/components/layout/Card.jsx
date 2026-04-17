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
        border: 'var(--border-width) solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px',
        boxShadow: 'var(--shadow-card)',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        position: 'relative',
        overflow: 'hidden',
        ...style
      }}
    >
      {title && (
        <h3 style={{ 
          fontSize: '1rem', 
          marginBottom: '16px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px',
          color: 'var(--text-primary)',
          fontWeight: '700'
        }}>
          {title}
        </h3>
      )}
      <div className="sige-ui-card-content">
        {children}
      </div>
    </div>
  );
}
