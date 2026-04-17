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
    bgColor = 'rgba(124, 111, 255, 0.15)';
    borderColor = 'var(--accent-violet)';
    textColor = 'var(--accent-violet)';
    if (!iconObj) iconObj = <i className="fa-solid fa-globe" style={{marginRight: 5}}></i>;
  } else if (t === 'ALUNOS') {
    bgColor = 'rgba(34, 211, 238, 0.15)';
    borderColor = 'var(--accent-cyan)';
    textColor = 'var(--accent-cyan)';
    if (!iconObj) iconObj = <i className="fa-solid fa-graduation-cap" style={{marginRight: 5}}></i>;
  } else if (t === 'PROFESSORES') {
    bgColor = 'rgba(52, 211, 153, 0.15)';
    borderColor = 'var(--accent-emerald)';
    textColor = 'var(--accent-emerald)';
    if (!iconObj) iconObj = <i className="fa-solid fa-chalkboard-user" style={{marginRight: 5}}></i>;
  } else if (t === 'GESTORES') {
    bgColor = 'rgba(251, 191, 36, 0.15)';
    borderColor = 'var(--accent-amber)';
    textColor = 'var(--accent-amber)';
  } else if (t === 'NOTA' || t === 'SUCCESS') {
    bgColor = 'rgba(52, 211, 153, 0.15)';
    borderColor = 'var(--accent-emerald)';
    textColor = 'var(--accent-emerald)';
    if (!iconObj) iconObj = <i className="fa-solid fa-star" style={{marginRight: 5}}></i>;
  } else if (t === 'CHAMADA' || t === 'ERROR' || t === 'DANGER') {
    bgColor = 'rgba(248, 113, 113, 0.15)';
    borderColor = 'var(--accent-ruby)';
    textColor = 'var(--accent-ruby)';
    if (!iconObj) iconObj = <i className="fa-solid fa-xmark" style={{marginRight: 5}}></i>;
  } else if (t === 'CORRECAO') {
    bgColor = 'rgba(124, 111, 255, 0.15)';
    borderColor = 'var(--accent-violet)';
    textColor = 'var(--accent-violet)';
    if (!iconObj) iconObj = <i className="fa-solid fa-pen-nib" style={{marginRight: 5}}></i>;
  } else if (t === 'GABARITO') {
    bgColor = 'rgba(34, 211, 238, 0.15)';
    borderColor = 'var(--accent-cyan)';
    textColor = 'var(--accent-cyan)';
    if (!iconObj) iconObj = <i className="fa-solid fa-check-double" style={{marginRight: 5}}></i>;
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
