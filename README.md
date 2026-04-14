# Front-end SIGE (React + Vite)

Cliente web do **SIGE** em React 19, com axios e proxy de desenvolvimento para o Django.

## Pré-requisitos

- Node.js 20+ (recomendado para Vite 8)
- Back-end **SIGE** (Django) rodando quando for testar a API

## Instalação

```bash
cd frontend_SIGE/Frontend_SIGE
npm install
copy .env.example .env
```

Edite o `.env` se precisar:

- **`VITE_API_URL` vazio** (padrão): em `npm run dev`, as chamadas a `/api/...` são encaminhadas pelo Vite para `http://127.0.0.1:8000` (mesma máquina).
- **`VITE_API_URL=http://127.0.0.1:8000`**: o navegador chama o Django direto (útil para depurar CORS ou sem proxy).

## Rodar só o front

```bash
npm run dev
```

Abra o endereço exibido no terminal (geralmente `http://127.0.0.1:5173/`). O Vite está fixo em **porta 5173** e host **127.0.0.1** para combinar com o template Django.

## React dentro do layout SIGE (Django + templates)

Com o back e o Vite no ar, faça login no SIGE e abra **`http://127.0.0.1:8000/app/vite/`**. A página usa o **mesmo `base.html`** do sistema (menu, cabeçalho, CSS do SIGE); só o conteúdo central é o React. O navegador carrega os módulos a partir do servidor de desenvolvimento do Vite (`@vite/client` e `src/main.jsx`).

## Rodar front e Django juntos

1. **Django** (outro terminal, pasta do repositório `SIGE`):

   ```bash
   cd SIGE
   python manage.py runserver
   ```

2. **Vite** (esta pasta):

   ```bash
   npm run dev
   ```

Com o Django em `127.0.0.1:8000`, a página inicial consulta **`GET /api/ping/`** e **`GET /api/dashboard/resumo/`** (dados do banco: totais e turmas). Endpoints diretos: `http://127.0.0.1:8000/api/ping/` e `http://127.0.0.1:8000/api/dashboard/resumo/`.

## Build de produção

```bash
npm run build
npm run preview
```

Configure `VITE_API_URL` para a URL pública da API em produção.

## Estrutura útil

| Caminho | Função |
| :--- | :--- |
| `src/services/api.js` | Cliente axios (base URL, CSRF, erros). |
| `vite.config.js` | Proxy `/api` → Django em desenvolvimento. |

Para mais detalhes do projeto Django, consulte o `README.md` na raiz do repositório **SIGE**.
