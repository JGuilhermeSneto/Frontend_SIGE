import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Card from '../components/layout/Card';
import Badge from '../components/layout/Badge';

export default function SaudeAluno() {
  const [ficha, setFicha] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/saude/minha-ficha/')
      .then(res => {
        if (res.data.length > 0) {
          setFicha(res.data[0]);
        }
      })
      .catch(err => console.error("Erro ao carregar Ficha Médica", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{padding: '24px'}}>Carregando Ficha Médica...</div>;

  if (!ficha) {
    return (
      <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
        <Card title={<><i className="fa-solid fa-notes-medical" style={{color: 'var(--accent-ruby)'}}></i> Minha Saúde</>}>
          <p style={{ color: 'var(--text-muted)' }}>Nenhuma Ficha Médica encontrada no sistema para você.</p>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '24px', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <i className="fa-solid fa-notes-medical" style={{color: 'var(--accent-ruby)'}}></i>
        Minha Saúde ({ficha.aluno_nome})
      </h1>

      <div style={{ display: 'grid', gap: '20px' }}>
        {/* Info Básica */}
        <Card>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>TIPO SANGUÍNEO</p>
              <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--accent-ruby)' }}>
                {ficha.tipo_sanguineo || 'Não informado'}
              </p>
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>CONTATO DE EMERGÊNCIA</p>
              <p style={{ fontWeight: '500' }}>{ficha.contato_emergencia_nome || 'N/A'}</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{ficha.contato_emergencia_fone}</p>
            </div>
          </div>
        </Card>

        {/* Alertas Severos */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <Card title={<><i className="fa-solid fa-triangle-exclamation" style={{color: 'var(--accent-amber)'}}></i> Alergias</>}>
            {ficha.alergias ? (
              <p style={{ color: 'var(--text-primary)', lineHeight: 1.5 }}>{ficha.alergias}</p>
            ) : (
              <p style={{ color: 'var(--text-muted)' }}>Sem histórico de alergias.</p>
            )}
          </Card>

          <Card title={<><i className="fa-solid fa-pills" style={{color: 'var(--accent-cyan)'}}></i> Uso Contínuo</>}>
            {ficha.medicamentos_continuos ? (
              <p style={{ color: 'var(--text-primary)', lineHeight: 1.5 }}>{ficha.medicamentos_continuos}</p>
            ) : (
              <p style={{ color: 'var(--text-muted)' }}>Nenhum medicamento declarado.</p>
            )}
          </Card>
        </div>

        {/* Vacinas */}
        <Card title={<><i className="fa-solid fa-syringe" style={{color: 'var(--accent-emerald)'}}></i> Vacinas Registradas</>}>
          {ficha.vacinas && ficha.vacinas.length > 0 ? (
            <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
              {ficha.vacinas.map(v => (
                <li key={v.id} style={{ borderBottom: '1px solid var(--border-subtle)', padding: '12px 0', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 500 }}>{v.nome_vacina}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{v.data_dose}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: 'var(--text-muted)' }}>Sem registros de vacina.</p>
          )}
        </Card>
      </div>
    </div>
  );
}
