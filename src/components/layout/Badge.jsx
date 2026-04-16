import React from 'react';

/**
 * Componente Badge para ser usado em tags e mural (como o tag-mural no Django).
 */
export default function Badge({ text, type = 'global', icon = null }) {
  let bgColor = 'var(--bg-elevated)';
  let borderColor = 'var(--border-subtle)';
  let textColor = 'var(--text-muted)';
  let iconObj = icon;

  const t = type.toUpperCase();
  if (t === 'GLOBAL') {
    bgColor = 'rgba(124, 111, 255, 0.1)';
    borderColor = 'var(--accent-violet)';
    textColor = 'var(--accent-violet)';
    if (!iconObj) iconObj = <i className="fa-solid fa-globe" style={{marginRight: 3}}></i>;
  } else if (t === 'ALUNOS') {
    bgColor = 'rgba(34, 211, 238, 0.1)';
    borderColor = 'var(--accent-cyan)';
    textColor = 'var(--accent-cyan)';
  } else if (t === 'PROFESSORES') {
    bgColor = 'rgba(52, 211, 153, 0.1)';
    borderColor = 'var(--accent-emerald)';
    textColor = 'var(--accent-emerald)';
  } else if (t === 'GESTORES') {
    bgColor = 'rgba(251, 191, 36, 0.1)';
    borderColor = 'var(--accent-amber)';
    textColor = 'var(--accent-amber)';
  } else if (t === 'NOTA' || t === 'SUCCESS') {
    borderColor = 'var(--accent-emerald)';
    textColor = 'var(--accent-emerald)';
  } else if (t === 'CHAMADA' || t === 'ERROR' || t === 'DANGER') {
    borderColor = 'var(--accent-ruby)';
    textColor = 'var(--accent-ruby)';
  }

  return (
    <span style={{
      padding: '3px 8px',
      borderRadius: '6px',
      fontWeight: '700',
      fontSize: '0.65rem',
      border: `1px solid ${borderColor}`,
      color: textColor,
      background: bgColor,
      display: 'inline-flex',
      alignItems: 'center'
    }}>
      {iconObj}
      {text}
    </span>
  );
}
