import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Card from './layout/Card';

export default function Notificacoes() {
  const [notificacoes, setNotificacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/notificacoes/')
      .then(res => setNotificacoes(res.data))
      .catch(err => console.error("Erro ao carregar notificações", err))
      .finally(() => setLoading(false));
  }, []);

  const marcarLida = (id) => {
    api.post(`/api/notificacoes/${id}/marcar_lida/`)
      .then(() => {
        setNotificacoes(notificacoes.map(n => n.id === id ? { ...n, lida: true } : n));
      })
      .catch(err => console.error("Erro ao marcar lida", err));
  };

  const getIcone = (tipo) => {
    switch (tipo) {
      case 'NOTA': return <i className="fa-solid fa-star" style={{ color: 'var(--accent-emerald)', marginRight: 6, fontSize: '0.9rem' }}></i>;
      case 'CHAMADA': return <i className="fa-solid fa-calendar-xmark" style={{ color: 'var(--accent-ruby)', marginRight: 6, fontSize: '0.9rem' }}></i>;
      case 'CORRECAO': return <i className="fa-solid fa-pen-nib" style={{ color: 'var(--accent-amber)', marginRight: 6, fontSize: '0.9rem' }}></i>;
      case 'GABARITO': return <i className="fa-solid fa-check-double" style={{ color: 'var(--accent-cyan)', marginRight: 6, fontSize: '0.9rem' }}></i>;
      default: return <i className="fa-solid fa-bell" style={{ marginRight: 6, fontSize: '0.9rem', color: 'var(--accent-violet)' }}></i>;
    }
  };

  const naoLidas = notificacoes.filter(n => !n.lida).length;

  return (
    <Card 
      title={
        <>
          <i className="fa-solid fa-bell" style={{ color: 'var(--accent-amber)' }}></i> 
          Notificações 
          {naoLidas > 0 && (
            <span style={{
              background: 'var(--accent-ruby)', color: 'white', borderRadius: '50%',
              fontSize: '0.7rem', width: '20px', height: '20px', display: 'flex',
              alignItems: 'center', justifyContent: 'center', marginLeft: 8
            }}>
              {naoLidas}
            </span>
          )}
        </>
      }
      style={{ marginBottom: '20px' }}
    >
      {loading ? (
        <p style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Carregando...</p>
      ) : notificacoes.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {notificacoes.map(n => (
            <div 
                key={n.id} 
                onClick={() => !n.lida && marcarLida(n.id)}
                style={{ 
                    cursor: n.lida ? 'default' : 'pointer',
                    borderBottom: '1px solid var(--border-color)', 
                    paddingBottom: '8px',
                    opacity: n.lida ? 0.6 : 1
                }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                <strong style={{ color: n.lida ? 'var(--text-muted)' : 'var(--text-primary)' }}>
                  {getIcone(n.tipo)}
                  {n.titulo}
                </strong>
                <span>{new Date(n.criado_em).toLocaleDateString()}</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', lineHeight: 1.4, fontWeight: n.lida ? 400 : 500 }}>
                {n.mensagem}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', padding: '10px' }}>
          Nenhuma notificação encontrada.
        </p>
      )}
    </Card>
  );
}
