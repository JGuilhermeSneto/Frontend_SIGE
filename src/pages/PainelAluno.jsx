import React from 'react';
import MuralAvisos from '../components/MuralAvisos';
import Notificacoes from '../components/Notificacoes';

export default function PainelAluno() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem' }}>Meu Painel (React)</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Central do Aluno</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '24px', alignItems: 'start' }}>
        
        {/* Esquerda: Conteúdo Principal / Aulas do dia */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <section>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Dashboard Acadêmico</h2>
            <div style={{ 
              background: 'var(--bg-surface)', 
              border: '1px solid var(--border-subtle)', 
              padding: '24px', 
              borderRadius: 'var(--radius-lg)' 
            }}>
              <p style={{ color: 'var(--text-muted)' }}>Bem-vindo ao SIGE. Utilize o menu superior para acessar o acervo da Biblioteca ou sua Ficha Médica.</p>
            </div>
          </section>
        </div>

        {/* Direita: Murais e Notificações (Barra Lateral Mimetizando o Django) */}
        <aside style={{ display: 'flex', flexDirection: 'column' }}>
          <MuralAvisos />
          <Notificacoes />
        </aside>

      </div>
    </div>
  );
}
