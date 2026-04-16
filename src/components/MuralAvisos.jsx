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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {comunicados.map(c => (
            <div key={c.id} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                <Badge text={c.publico_alvo_display} type={c.publico_alvo} />
                <span>{new Date(c.data_publicacao).toLocaleDateString()}</span>
              </div>
              <h4 style={{ fontSize: '0.85rem', marginBottom: '4px', color: c.importancia === 'ALTA' ? 'var(--status-reprovado)' : 'var(--text-primary)' }}>
                {c.titulo}
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', lineHeight: 1.4 }}>
                {c.conteudo.length > 60 ? c.conteudo.substring(0, 60) + '...' : c.conteudo}
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
