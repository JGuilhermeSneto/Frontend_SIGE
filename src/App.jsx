import { useState } from 'react';
import './App.css';
import PainelAluno from './pages/PainelAluno';
import Biblioteca from './pages/Biblioteca';
import SaudeAluno from './pages/SaudeAluno';
import PainelSuper from './pages/PainelSuper';

function App() {
  const [currentPage, setCurrentPage] = useState('super');
  const [theme, setTheme] = useState('default');

  // Aplicar tema ao body
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    if (theme === 'default') setTheme('industrial');
    else if (theme === 'industrial') setTheme('corporate');
    else setTheme('default');
  };

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

      {/* Menu Premium de Navegação */}
      <nav style={{ 
        padding: '12px 24px', 
        background: 'var(--bg-surface)', 
        borderBottom: 'var(--border-width) solid var(--border-color)', 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(10px)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ marginRight: '20px', fontWeight: '900', fontSize: '1.2rem', color: 'var(--accent-violet)', display: 'flex', alignItems: 'center', gap: '8px' }}>
             <i className="fa-solid fa-graduation-cap"></i> SIGE <span style={{fontSize: '0.7rem', opacity: 0.5, fontWeight: 'normal'}}>v3.0</span>
          </div>
          
          <button 
            onClick={() => setCurrentPage('super')}
            className={`nav-btn ${currentPage === 'super' ? 'active' : ''}`}
            style={{ 
              background: currentPage === 'super' ? 'rgba(var(--accent-emerald), 0.1)' : 'transparent', 
              color: currentPage === 'super' ? 'var(--accent-emerald)' : 'var(--text-secondary)',
              border: 'none', padding: '10px 18px', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: '700',
              display: 'flex', alignItems: 'center', gap: '8px', transition: '0.3s'
            }}
          >
            <i className="fa-solid fa-shield-halved"></i> Gestão
          </button>  
          <button 
            onClick={() => setCurrentPage('painel')}
            className={`nav-btn ${currentPage === 'painel' ? 'active' : ''}`}
            style={{ 
              background: currentPage === 'painel' ? 'rgba(var(--accent-violet), 0.1)' : 'transparent', 
              color: currentPage === 'painel' ? 'var(--accent-violet)' : 'var(--text-secondary)',
              border: 'none', padding: '10px 18px', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: '700',
              display: 'flex', alignItems: 'center', gap: '8px', transition: '0.3s'
            }}
          >
            <i className="fa-solid fa-user-graduate"></i> Aluno
          </button>
          <button 
            onClick={() => setCurrentPage('biblioteca')}
            className={`nav-btn ${currentPage === 'biblioteca' ? 'active' : ''}`}
            style={{ 
              background: currentPage === 'biblioteca' ? 'rgba(var(--accent-cyan), 0.1)' : 'transparent', 
              color: currentPage === 'biblioteca' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
              border: 'none', padding: '10px 18px', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: '700',
              display: 'flex', alignItems: 'center', gap: '8px', transition: '0.3s'
            }}
          >
            <i className="fa-solid fa-book-bookmark"></i> Biblioteca
          </button>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={toggleTheme}
            style={{
              background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)',
              padding: '8px 14px', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600',
              display: 'flex', alignItems: 'center', gap: '8px'
            }}
          >
            <i className={`fa-solid ${theme === 'default' ? 'fa-moon' : theme === 'industrial' ? 'fa-industry' : 'fa-building-columns'}`}></i>
            {theme === 'default' ? 'Escuro' : theme === 'industrial' ? 'Industrial' : 'Corporate'}
          </button>
        </div>
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
