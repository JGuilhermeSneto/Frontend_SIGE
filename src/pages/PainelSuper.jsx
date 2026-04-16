import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Card from '../components/layout/Card';
import MuralAvisos from '../components/MuralAvisos';
import Badge from '../components/layout/Badge';

export default function PainelSuper() {
  const [resumo, setResumo] = useState({ loading: true, data: null, error: null });
  const [ping, setPing] = useState({ loading: true, data: null, error: null });

  useEffect(() => {
    // Busca dados reais do banco para popular as métricas e tabelas
    api.get('/api/dashboard/resumo/')
      .then((res) => setResumo({ loading: false, data: res.data, error: null }))
      .catch((err) => setResumo({ loading: false, data: null, error: err.message }));

    api.get('/api/ping/')
      .then((res) => setPing({ loading: false, data: res.data, error: null }))
      .catch((err) => setPing({ loading: false, data: null, error: err.message }));
  }, []);

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
      <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <i className="fa-solid fa-shield-halved" style={{color: 'var(--accent-cyan)'}}></i>
            Painel da Gestão Escolar
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Visão Geral (React Mode)</p>
        </div>
        
        {/* Status Server */}
        <div style={{
          background: 'var(--bg-elevated)', padding: '8px 16px', borderRadius: 'var(--radius-lg)', 
          border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem'
        }}>
          <strong>Status System:</strong>
          {ping.loading ? 'Verificando...' : (
            ping.data ? <Badge text={`${ping.data.service} OK`} type="NOTA" /> : <Badge text="Desconectado" type="CHAMADA" />
          )}
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '32px', alignItems: 'start' }}>
        
        {/* Sessão Principal - Gráficos e Tabelas */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Métricas Topo */}
          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <Card style={{ borderLeft: '4px solid var(--accent-violet)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ALUNOS ATIVOS</p>
                  <h2 style={{ fontSize: '2rem', marginTop: '4px' }}>324</h2>
                </div>
                <i className="fa-solid fa-user-graduate" style={{ fontSize: '2rem', color: 'var(--text-muted)', opacity: 0.5 }}></i>
              </div>
            </Card>

            <Card style={{ borderLeft: '4px solid var(--accent-emerald)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>TURMAS (SIGE)</p>
                  <h2 style={{ fontSize: '2rem', marginTop: '4px' }}>
                    {resumo.loading ? '...' : resumo.data?.totais?.turmas || '0'}
                  </h2>
                </div>
                <i className="fa-solid fa-users-rectangle" style={{ fontSize: '2rem', color: 'var(--text-muted)', opacity: 0.5 }}></i>
              </div>
            </Card>

            <Card style={{ borderLeft: '4px solid var(--accent-cyan)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>DISCIPLINAS</p>
                  <h2 style={{ fontSize: '2rem', marginTop: '4px' }}>
                    {resumo.loading ? '...' : resumo.data?.totais?.disciplinas || '0'}
                  </h2>
                </div>
                <i className="fa-solid fa-book" style={{ fontSize: '2rem', color: 'var(--text-muted)', opacity: 0.5 }}></i>
              </div>
            </Card>
          </section>

          {/* Tabela do Banco de Dados Real */}
          <section>
            <Card title={<><i className="fa-solid fa-table-list" style={{color: 'var(--accent-violet)'}}></i> Amostra de Turmas (Banco de Dados)</>}>
              {resumo.loading ? (
                <p style={{ color: 'var(--text-muted)' }}>Carregando malha do Django...</p>
              ) : resumo.error ? (
                <p style={{ color: 'var(--accent-ruby)' }}>Erro: {resumo.error}</p>
              ) : (
                <div style={{ overflowX: 'auto', marginTop: '12px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ background: 'var(--bg-base)', color: 'var(--text-dim)', textAlign: 'left' }}>
                        <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-subtle)' }}>Turma</th>
                        <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-subtle)' }}>Turno</th>
                        <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-subtle)' }}>Ano Relativo</th>
                        <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-subtle)' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resumo.data?.turmas?.map((turma, idx) => (
                        <tr key={turma.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                          <td style={{ padding: '16px', fontWeight: '500' }}>{turma.nome}</td>
                          <td style={{ padding: '16px' }}>{turma.turno}</td>
                          <td style={{ padding: '16px', color: 'var(--text-muted)' }}>{turma.ano}</td>
                          <td style={{ padding: '16px' }}><Badge text="Ativo" type="SUCCESS" /></td>
                        </tr>
                      ))}
                      {resumo.data?.turmas?.length === 0 && (
                        <tr><td colSpan="4" style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>Nenhuma turma inserida no banco original.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </section>
          
        </div>

        {/* Lateral de Sistema / Murais */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Card title="Acesso Rápido" style={{background: 'linear-gradient(145deg, var(--bg-surface), #151e32)'}}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
               <li style={{ padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', display: 'flex', gap: '10px', alignItems: 'center' }}>
                 <i className="fa-solid fa-user-plus" style={{color: 'var(--accent-emerald)'}}></i> Cadastrar Docente
               </li>
               <li style={{ padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', display: 'flex', gap: '10px', alignItems: 'center' }}>
                 <i className="fa-solid fa-bullhorn" style={{color: 'var(--accent-violet)'}}></i> Emitir Comunicados
               </li>
               <li style={{ padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', display: 'flex', gap: '10px', alignItems: 'center' }}>
                 <i className="fa-regular fa-calendar-days" style={{color: 'var(--accent-cyan)'}}></i> Calendário Gerencial
               </li>
            </ul>
          </Card>
          <MuralAvisos />
        </aside>

      </div>
    </div>
  );
}
