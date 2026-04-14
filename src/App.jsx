import { useEffect, useState } from 'react'
import api from './services/api'
import './App.css'

function readSigeEmbedFlag() {
  if (typeof document === 'undefined') return false
  return document.getElementById('root')?.getAttribute('data-sige-embed') === '1'
}

function App() {
  const [inDjangoShell] = useState(readSigeEmbedFlag)
  const [ping, setPing] = useState({
    loading: true,
    data: null,
    error: null,
  })
  const [resumo, setResumo] = useState({
    loading: true,
    data: null,
    error: null,
  })

  useEffect(() => {
    api
      .get('/api/ping/')
      .then((res) => setPing({ loading: false, data: res.data, error: null }))
      .catch((err) =>
        setPing({
          loading: false,
          data: null,
          error:
            err.response?.data?.detail ??
            err.message ??
            'Falha ao contatar o back-end',
        })
      )
  }, [])

  useEffect(() => {
    api
      .get('/api/dashboard/resumo/')
      .then((res) => setResumo({ loading: false, data: res.data, error: null }))
      .catch((err) =>
        setResumo({
          loading: false,
          data: null,
          error:
            err.response?.data?.detail ??
            err.message ??
            'Não foi possível carregar os dados do banco',
        })
      )
  }, [])

  const viteOrigin =
    typeof window !== 'undefined' ? window.location.origin : ''
  const apiBase =
    import.meta.env.VITE_API_URL?.trim() || `${viteOrigin} (proxy → Django)`

  return (
    <div className="sige-dash">
      {inDjangoShell && (
        <div className="sige-shell-notice" role="status">
          <strong>Template SIGE (Django)</strong> — este bloco React roda dentro do{' '}
          <code>base.html</code> (menu e cabeçalho são HTML do servidor). O Vite
          continua em <code>127.0.0.1:5173</code> só para os módulos em dev.
        </div>
      )}
      <header className="sige-dash__header">
        <p className="sige-dash__eyebrow">SIGE · integração</p>
        <h1 className="sige-dash__title">Front-end e back-end lado a lado</h1>
        <p className="sige-dash__lead">
          Esta página roda no <strong>Vite + React</strong>. Os números e a
          tabela abaixo vêm do <strong>Django</strong>, lidos do banco de dados
          real do SIGE.
        </p>
      </header>

      <div className="sige-dash__grid">
        <section className="sige-card" aria-labelledby="lbl-front">
          <h2 id="lbl-front" className="sige-card__title">
            Front-end
          </h2>
          <p className="sige-card__meta">React 19 · Vite</p>
          <dl className="sige-card__dl">
            <div>
              <dt>Origem da página</dt>
              <dd>
                <code>{viteOrigin || '—'}</code>
              </dd>
            </div>
            <div>
              <dt>Chamadas à API</dt>
              <dd>
                <code>{apiBase}</code>
              </dd>
            </div>
          </dl>
        </section>

        <section className="sige-card" aria-labelledby="lbl-back">
          <h2 id="lbl-back" className="sige-card__title">
            Back-end
          </h2>
          <p className="sige-card__meta">Django · Django REST framework</p>
          <dl className="sige-card__dl">
            <div>
              <dt>Health check</dt>
              <dd>
                <code>GET /api/ping/</code>
              </dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>
                {ping.loading && 'Verificando…'}
                {!ping.loading && ping.data && (
                  <span className="sige-badge sige-badge--ok">
                    {ping.data.service} · online
                  </span>
                )}
                {!ping.loading && ping.error && (
                  <span className="sige-badge sige-badge--err">
                    {String(ping.error)}
                  </span>
                )}
              </dd>
            </div>
          </dl>
        </section>
      </div>

      <section
        className="sige-panel"
        aria-labelledby="lbl-dados"
        aria-busy={resumo.loading}
      >
        <div className="sige-panel__head">
          <h2 id="lbl-dados" className="sige-panel__title">
            Dados reais do banco
          </h2>
          <p className="sige-panel__sub">
            Endpoint <code>GET /api/dashboard/resumo/</code> — modelos{' '}
            <code>Turma</code> e <code>Disciplina</code>
          </p>
        </div>

        {resumo.loading && (
          <p className="sige-panel__state">Carregando totais e turmas…</p>
        )}
        {!resumo.loading && resumo.error && (
          <p className="sige-panel__state sige-panel__state--err">
            {String(resumo.error)}
          </p>
        )}
        {!resumo.loading && resumo.data && (
          <>
            <ul className="sige-stats" role="list">
              <li>
                <span className="sige-stats__value">
                  {resumo.data.totais.turmas}
                </span>
                <span className="sige-stats__label">turmas</span>
              </li>
              <li>
                <span className="sige-stats__value">
                  {resumo.data.totais.disciplinas}
                </span>
                <span className="sige-stats__label">disciplinas</span>
              </li>
            </ul>

            <div className="sige-table-wrap">
              <table className="sige-table">
                <caption className="sige-table__cap">
                  Turmas cadastradas (amostra, até 12)
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Turno</th>
                    <th scope="col">Ano</th>
                  </tr>
                </thead>
                <tbody>
                  {resumo.data.turmas.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="sige-table__empty">
                        Nenhuma turma no banco ainda. Cadastre no Django (admin
                        ou telas do SIGE) e atualize esta página.
                      </td>
                    </tr>
                  ) : (
                    resumo.data.turmas.map((t) => (
                      <tr key={t.id}>
                        <td>{t.nome}</td>
                        <td>{t.turno}</td>
                        <td>{t.ano}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>
    </div>
  )
}

export default App
