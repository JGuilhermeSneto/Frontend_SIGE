# Front-end SIGE (React + Vite)

Cliente web do **SIGE** em React 19, com proxy Vite para Django em desenvolvimento.

> Este repositório faz parte do monorepo principal. Consulte `../../README.md` para o fluxo completo de setup.

## Pré-requisitos

- Node.js 20+
- NPM ou Yarn
- Back-end Django rodando em `http://127.0.0.1:8000` para desenvolvimento integrado

## Instalação

```bash
cd frontend_SIGE/Frontend_SIGE
npm install
copy .env.example .env   # Windows
# em Unix/macOS: cp .env.example .env
```

Edite `.env` quando precisar mudar a URL da API.

## Variáveis de ambiente

- `VITE_API_URL=` vazio (padrão): em `npm run dev`, o Vite usa o proxy para encaminhar `/api` para `http://127.0.0.1:8000`.
- `VITE_API_URL=http://127.0.0.1:8000`: o app chama o Django diretamente, sem proxy.

O cliente axios está em `src/services/api.js`.

## 🐳 Execução com Docker (Recomendado)

O frontend agora está integrado ao ecossistema Docker do projeto. Para rodar tudo junto:

1. Vá para a pasta raiz do backend (`SIGE/`).
2. Execute:
   ```bash
   docker-compose up --build
   ```
O frontend estará disponível em `http://localhost:5173`.

## Rodar Django + Vite juntos

1. No backend Django:

```bash
cd ../../SIGE
python manage.py runserver
```

2. No frontend Vite:

```bash
cd frontend_SIGE/Frontend_SIGE
npm run dev
```

3. Use uma destas URLs:

- `http://127.0.0.1:5173/` — front standalone em Vite
- `http://127.0.0.1:8000/app/vite/` — React embutido no layout do SIGE

### O que acontece no dev

- O Vite serve a aplicação React e carrega módulos via `@vite/client`.
- Chamadas para `/api/*` são proxied automaticamente para o Django.
- O Django fornece a página shell em `apps/usuarios/templates/core/app_vite.html`.

## Build de produção

```bash
npm run build
```

O build é gerado em `SIGE/apps/comum/static/vite`. Em produção, configure `VITE_API_URL` para a URL pública do backend e use `python manage.py collectstatic` no Django.

## Segurança em produção

No Django, mantenha:

- `DEBUG=False`
- `ALLOWED_HOSTS=seu-dominio.com`
- `SECRET_KEY` forte e secreto
- `SECURE_SSL_REDIRECT=True`
- `SESSION_COOKIE_SECURE=True`
- `CSRF_COOKIE_SECURE=True`
- `CORS_ALLOWED_ORIGINS=https://seu-dominio.com`
- `CSRF_TRUSTED_ORIGINS=https://seu-dominio.com`

O backend já ativa proteção de headers seguros e cookies seguros quando `DEBUG=False`.

## Autenticação JWT

O projeto adicionou suporte a JWT para a API:

- `POST /api/token/` → obtém `access` e `refresh` tokens usando e-mail e senha
- `POST /api/token/refresh/` → renova o token de acesso

O `src/services/api.js` utiliza o `access` token com o cabeçalho `Authorization: Bearer <token>` e tenta renovar o token automaticamente em caso de `401`.

Guarde `access` e `refresh` no frontend com prudência; este projeto usa armazenamento local para a aplicação React.

## Usar Vite em templates Django

No Django, você pode carregar o mesmo entrypoint do Vite em qualquer template:

```django
{% load static vite_assets %}
{% vite_entry 'src/main.jsx' %}
```

Com `DEBUG=True`, o Vite dev server é usado. Com `DEBUG=False`, o template carrega os assets buildados do Django.

## Notas úteis

- `vite.config.js` define o proxy `/api` → `http://127.0.0.1:8000` em desenvolvimento.
- `src/services/api.js` inclui o token CSRF do cookie e redireciona para `/login` em 401/403.
- O backend expõe `GET /api/ping/` e `GET /api/dashboard/resumo/`.

## 🗺️ Roadmap de Atualização do Frontend (Baseado no Django)

Com as recentes melhorias e implementações concluídas no backend (abril de 2026), o frontend React necessita refletir as seguintes atualizações arquiteturais e funcionais para manter paridade com o sistema base:

### 1. Paridade de "Design System Premium"
- **Temas Refatorados**: O sistema agora opera *apenas* com 3 temas homologados ("Indigo Profundo", "Cinza Industrial", "Azul Corporativo"). Componentes React estilizados via css/tailwind precisam ser ajustados para ler esses Design Tokens, descartando colorações genéricas.
- **Componentes Card**: Replicar a UI do *Mural de Avisos* e das *Notificações*, que agora contam com bordas estilo card unificadas (`--bg-surface`, `radius-lg`) e animações de leve elevação (`translateY`) no hover magnético, além da coloração dinâmica em tags baseada em `publico_alvo`.

### 2. Novos Módulos Integrados
- **Biblioteca Automática:** Consumir a nova rota de Acervo Literário. O app precisa implementar o botão e lógica de "Reservar", tratando os limites (máximo de 2 livros por aluno) exibidos nos endpoints de resposta.
- **Minha Saúde no Painel Aluno:** Mapear nas rotas do React a visualização do perfil de Saúde/Ficha Médica para alunos logados (permissões de API já corrigidas no Backend).

### 3. Notificações Persistentes e Semânticas
- Atualizar a interface de timeline ou sininho de notificações para incluir a tipagem de avisos (ícones por tipo):
  - ⭐️ `NOTA` | ❌ `CHAMADA` | 📝 `CORRECAO` | ✔️ `GABARITO`.
- Validar se a liberação de gabaritos em "Atividades" pelos professores reflete instantaneamente nos cards dos alunos na versão React.

Se o front consumir esses dados via API (ex: `GET /api/dashboard/resumo/`), certifique-se de prever campos como `publico_alvo` ou tipo de notificação estendida.

## Estrutura rápida

| Caminho | Função |
| :--- | :--- |
| `src/services/api.js` | Cliente axios com CSRF e baseURL configurável |
| `vite.config.js` | Dev proxy e build para Django static folder |
| `SIGE/apps/usuarios/templates/core/app_vite.html` | Shell Django que injeta o Vite dev server |

Para as instruções completas do Django, veja `SIGE/README.md`.
