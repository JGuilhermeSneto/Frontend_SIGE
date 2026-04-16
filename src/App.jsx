import { useState } from 'react';
import './App.css';
import PainelAluno from './pages/PainelAluno';
import Biblioteca from './pages/Biblioteca';
import SaudeAluno from './pages/SaudeAluno';
import PainelSuper from './pages/PainelSuper';

function App() {
  const [currentPage, setCurrentPage] = useState('super');

  // Verifica se roda dentro do Django
  const root = typeof document !== 'undefined' ? document.getElementById('root') : null;
  const inDjangoShell = root?.getAttribute('data-sige-embed') === '1';

  return (
    <div className="sige-dash">
      {inDjangoShell && (
        <div style={{ background: 'var(--accent-violet)', color: 'white', padding: '8px', textAlign: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>
          Rodando como Microfrontend Módulo Vite-React dentro do Django Template
        </div>
      )}

      {/* Menu Simples de Teste no Frontend */}
      <nav style={{ padding: '16px 24px', background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-subtle)', display: 'flex', gap: '16px', overflowX: 'auto' }}>
        <button 
          onClick={() => setCurrentPage('super')}
          style={{ background: currentPage === 'super' ? 'var(--accent-emerald)' : 'transparent', color: currentPage === 'super' ? '#090e1a' : 'var(--text-primary)', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          <i className="fa-solid fa-shield-halved" style={{marginRight: '6px'}}></i> Painel do Gestor
        </button>  
        <button 
          onClick={() => setCurrentPage('painel')}
          style={{ background: currentPage === 'painel' ? 'var(--accent-violet)' : 'transparent', color: currentPage === 'painel' ? 'white' : 'var(--text-primary)', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Painel Acadêmico (Aluno)
        </button>
        <button 
          onClick={() => setCurrentPage('biblioteca')}
          style={{ background: currentPage === 'biblioteca' ? 'var(--accent-cyan)' : 'transparent', color: currentPage === 'biblioteca' ? '#090e1a' : 'var(--text-primary)', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Biblioteca
        </button>
        <button 
          onClick={() => setCurrentPage('saude')}
          style={{ background: currentPage === 'saude' ? 'var(--accent-ruby)' : 'transparent', color: currentPage === 'saude' ? 'white' : 'var(--text-primary)', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Minha Saúde
        </button>
      </nav>

      {/* Roteador Falso */}
      <main style={{ minHeight: '80vh', background: 'var(--bg-base)' }}>
        {currentPage === 'super' && <PainelSuper />}
        {currentPage === 'painel' && <PainelAluno />}
        {currentPage === 'biblioteca' && <Biblioteca />}
        {currentPage === 'saude' && <SaudeAluno />}
      </main>

    </div>
  );
}

export default App;
