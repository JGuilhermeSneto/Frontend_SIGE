import React from 'react';
import MuralAvisos from '../components/MuralAvisos';
import Notificacoes from '../components/Notificacoes';

export default function PainelAluno() {
  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '16px' }}>
           <i className="fa-solid fa-user-graduate" style={{color: 'var(--accent-violet)'}}></i>
           Meu Painel Acadêmico
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '4px' }}>Bem-vindo de volta ao portal do aluno SIGE</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '32px', alignItems: 'start' }}>
        
        {/* Esquerda: Conteúdo Principal / Aulas do dia */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <section>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '20px', fontWeight: '700', color: 'var(--text-primary)' }}>Resumo Acadêmico</h2>
            <Card style={{ 
              background: 'linear-gradient(135deg, var(--bg-surface), var(--bg-elevated))',
              position: 'relative',
              overflow: 'hidden'
            }}>
               <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '12rem', color: 'var(--accent-violet)', opacity: 0.03, pointerEvents: 'none' }}>
                  <i className="fa-solid fa-graduation-cap"></i>
               </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, position: 'relative', zIndex: 1 }}>
                Você está conectado ao ecossistema SIGE v3.0. Utilize o menu superior para navegar entre a Biblioteca e o seu Painel de Saúde.
              </p>
              <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
                 <Badge text="Matrícula Ativa" type="SUCCESS" />
                 <Badge text="Semestre 2026.1" type="GLOBAL" />
              </div>
            </Card>
          </section>
        </div>

        {/* Direita: Murais e Notificações */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <MuralAvisos />
          <Notificacoes />
        </aside>
      </div>
    </div>
  );
}
