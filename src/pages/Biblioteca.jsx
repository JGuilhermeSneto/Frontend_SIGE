import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Card from '../components/layout/Card';
import Badge from '../components/layout/Badge';

export default function Biblioteca() {
  const [livros, setLivros] = useState([]);
  const [emprestimos, setEmprestimos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/api/biblioteca/acervo/'),
      api.get('/api/biblioteca/meus-livros/')
    ])
    .then(([resAcervo, resEmprestimos]) => {
      setLivros(resAcervo.data);
      setEmprestimos(resEmprestimos.data);
    })
    .catch(err => console.error(err))
    .finally(() => setLoading(false));
  }, []);

  const ativosEReservas = emprestimos.filter(e => ['ATIVO', 'RESERVA'].includes(e.status)).length;

  const reservarLivro = (id) => {
    if (ativosEReservas >= 2) {
      alert("⚠️ Limite de 2 livros simultâneos atingido!");
      return;
    }
    
    api.post(`/api/biblioteca/acervo/${id}/reservar/`)
      .then(res => {
        alert(res.data.detail);
        // Refresh local 
        api.get('/api/biblioteca/meus-livros/').then(r => setEmprestimos(r.data));
        api.get('/api/biblioteca/acervo/').then(r => setLivros(r.data));
      })
      .catch(err => {
        alert(err.response?.data?.detail || "Erro ao reservar.");
      });
  };

  if (loading) return <div style={{padding: '24px'}}>Carregando Biblioteca...</div>;

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '8px', fontSize: '1.8rem' }}>📚 Biblioteca Digital</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
        Limite de reservas simultâneas atingido: 
        <strong style={{ color: ativosEReservas >= 2 ? 'var(--accent-ruby)' : 'var(--accent-emerald)', marginLeft: '6px' }}>
          {ativosEReservas} / 2
        </strong>
      </p>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Meu Acervo Ativo</h2>
        {emprestimos.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>Você não possui livros ativos no momento.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {emprestimos.map(e => (
              <Card key={e.id} title={e.livro_titulo}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Devolução: {e.data_devolucao_prevista}</span>
                  <Badge text={e.status} type={e.status === 'RESERVA' ? 'GESTORES' : 'NOTA'} />
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Catálogo Geral</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
          {livros.map(livro => (
            <Card key={livro.id} title={livro.titulo}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>Autor: {livro.autor}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: livro.exemplares_disponiveis > 0 ? 'var(--accent-emerald)' : 'var(--accent-ruby)' }}>
                  {livro.exemplares_disponiveis > 0 ? `${livro.exemplares_disponiveis} disponíveis` : 'Esgotado'}
                </span>
                <button 
                  onClick={() => reservarLivro(livro.id)}
                  disabled={livro.exemplares_disponiveis === 0 || ativosEReservas >= 2}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    background: livro.exemplares_disponiveis === 0 || ativosEReservas >= 2 ? 'var(--bg-elevated)' : 'var(--accent-violet)',
                    color: livro.exemplares_disponiveis === 0 || ativosEReservas >= 2 ? 'var(--text-muted)' : 'white',
                    cursor: livro.exemplares_disponiveis === 0 || ativosEReservas >= 2 ? 'not-allowed' : 'pointer',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    transition: 'opacity 0.2s'
                  }}
                >
                  Reservar
                </button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
