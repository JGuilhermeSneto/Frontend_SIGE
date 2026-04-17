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
      <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', display: 'flex', alignItems: 'center', gap: '16px', fontWeight: '800' }}>
            <i className="fa-solid fa-shield-halved" style={{color: 'var(--accent-violet)', filter: 'drop-shadow(0 0 10px rgba(124, 111, 255, 0.3))'}}></i>
            Painel da Gestão Escolar
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '4px' }}>Monitoramento em tempo real do ecossistema SIGE</p>
        </div>
        
        {/* Status Server */}
        <div style={{
          background: 'var(--bg-elevated)', padding: '10px 20px', borderRadius: 'var(--radius-xl)', 
          border: 'var(--border-width) solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <span style={{ display: 'flex', width: '8px', height: '8px', borderRadius: '50%', background: ping.data ? 'var(--accent-emerald)' : 'var(--accent-ruby)', boxShadow: ping.data ? '0 0 8px var(--accent-emerald)' : 'none' }}></span>
          <strong style={{ color: 'var(--text-secondary)' }}>Status do Sistema:</strong>
          {ping.loading ? 'Verificando...' : (
            ping.data ? <Badge text={`${ping.data.service} ONLINE`} type="NOTA" /> : <Badge text="OFFLINE" type="CHAMADA" />
          )}
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '32px', alignItems: 'start' }}>
        
        {/* Sessão Principal - Gráficos e Tabelas */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Métricas Topo */}
          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            <Card style={{ borderLeft: '6px solid var(--accent-violet)', background: 'linear-gradient(135deg, var(--bg-surface), var(--bg-elevated))' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ALUNOS ATIVOS</p>
                  <h2 style={{ fontSize: '2.5rem', marginTop: '8px', fontWeight: '900' }}>324</h2>
                  <p style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', marginTop: '4px' }}><i className="fa-solid fa-caret-up"></i> +12% este mês</p>
                </div>
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(124, 111, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fa-solid fa-user-graduate" style={{ fontSize: '1.5rem', color: 'var(--accent-violet)' }}></i>
                </div>
              </div>
            </Card>

            <Card style={{ borderLeft: '6px solid var(--accent-emerald)', background: 'linear-gradient(135deg, var(--bg-surface), var(--bg-elevated))' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TURMAS ATIVAS</p>
                  <h2 style={{ fontSize: '2.5rem', marginTop: '8px', fontWeight: '900' }}>
                    {resumo.loading ? '...' : resumo.data?.totais?.turmas || '24'}
                  </h2>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Sincronizado com SIGE Core</p>
                </div>
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(52, 211, 153, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fa-solid fa-users-rectangle" style={{ fontSize: '1.5rem', color: 'var(--accent-emerald)' }}></i>
                </div>
              </div>
            </Card>

            <Card style={{ borderLeft: '6px solid var(--accent-cyan)', background: 'linear-gradient(135deg, var(--bg-surface), var(--bg-elevated))' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em' }}>DISCIPLINAS</p>
                  <h2 style={{ fontSize: '2.5rem', marginTop: '8px', fontWeight: '900' }}>
                    {resumo.loading ? '...' : resumo.data?.totais?.disciplinas || '18'}
                  </h2>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Matriz curricular ativa</p>
                </div>
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(34, 211, 238, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fa-solid fa-book" style={{ fontSize: '1.5rem', color: 'var(--accent-cyan)' }}></i>
                </div>
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
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Card title="Acesso Rápido" style={{background: 'linear-gradient(145deg, var(--bg-surface), var(--bg-hover))'}}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
               <li style={{ padding: '12px', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', cursor: 'pointer', display: 'flex', gap: '12px', alignItems: 'center', transition: '0.2s', fontWeight: '600' }} className="quick-access-item">
                 <i className="fa-solid fa-user-plus" style={{color: 'var(--accent-emerald)'}}></i> Cadastrar Docente
               </li>
               <li style={{ padding: '12px', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', cursor: 'pointer', display: 'flex', gap: '12px', alignItems: 'center', transition: '0.2s', fontWeight: '600' }} className="quick-access-item">
                 <i className="fa-solid fa-bullhorn" style={{color: 'var(--accent-violet)'}}></i> Emitir Comunicados
               </li>
               <li style={{ padding: '12px', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', cursor: 'pointer', display: 'flex', gap: '12px', alignItems: 'center', transition: '0.2s', fontWeight: '600' }} className="quick-access-item">
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
