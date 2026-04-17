import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Card from './layout/Card';
import Badge from './layout/Badge';

export default function MuralAvisos() {
  const [comunicados, setComunicados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/comunicados/')
      .then(res => setComunicados(res.data))
      .catch(err => console.error("Erro ao carregar comunicados", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Card 
      title={<><i className="fa-solid fa-bullhorn" style={{ color: 'var(--accent-cyan)' }}></i> Mural de Avisos</>}
      style={{ marginBottom: '20px' }}
    >
      {loading ? (
        <p style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Carregando...</p>
      ) : comunicados.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {comunicados.map(c => (
            <div key={c.id} style={{ 
              borderBottom: 'var(--border-width) solid var(--border-color)', 
              paddingBottom: '12px',
              transition: '0.2s'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '8px' }}>
                <Badge text={c.publico_alvo_display || c.publico_alvo} type={c.publico_alvo} />
                <span style={{ fontWeight: '600' }}>{new Date(c.data_publicacao).toLocaleDateString('pt-BR')}</span>
              </div>
              <h4 style={{ 
                fontSize: '0.95rem', 
                marginBottom: '6px', 
                color: c.importancia === 'ALTA' ? 'var(--accent-ruby)' : 'var(--text-primary)',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                {c.importancia === 'ALTA' && <i className="fa-solid fa-triangle-exclamation" style={{fontSize: '0.8rem'}}></i>}
                {c.titulo}
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {c.conteudo.length > 80 ? c.conteudo.substring(0, 80) + '...' : c.conteudo}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', padding: '10px' }}>
          Nenhum aviso no momento.
        </p>
      )}
    </Card>
  );
}
