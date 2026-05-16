# ⚛️ SIGE — Front-end (React + Vite Premium Client)
### Interface de Alta Performance para Gestão e Análise de Dados

> Este é o cliente web moderno do SIGE, desenvolvido em **React 19** com build ultra-rápido via **Vite**. Ele fornece a interface de alta densidade necessária para operações complexas de gestão escolar.

<br/>

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.7-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

<br/>

[Instalação](#-instala%C3%A7%C3%A3o) · [Integração Django](#-integra%C3%A7%C3%A3o-django) · [Design System](#-design-system--uiux) · [Autenticação JWT](#-autentica%C3%A7%C3%A3o-jwt)

---

## 🏛️ 1. O Papel do Front-end no Ecossistema

O Front-end React é um dos quatro pilares do SIGE, atuando como o terminal de controle para:
1.  **Back-end Django**: Fornece a API REST (DRF) e autenticação.
2.  **Front-end React**: Interface de Single Page Application (SPA) para BI e Gestão.
3.  **Mobile (Expo)**: Compartilha a mesma lógica de consumo de API.
4.  **IoT (ESP32)**: Os dados coletados via hardware são visualizados em tempo real nestes dashboards.

---

## 🚀 2. Instalação & Setup

### Pré-requisitos
- Node.js 20+
- Back-end Django rodando (padrão `http://127.0.0.1:8000`)

### Setup Rápido
```bash
cd frontend_SIGE/Frontend_SIGE
npm install
copy .env.example .env
npm run dev
```

O app estará disponível em `http://localhost:5173`. O Vite utiliza um **proxy inteligente** para encaminhar chamadas de `/api/*` automaticamente para o Django.

---

## 🎨 3. Design System & UI/UX

O Front-end segue rigorosamente o **Design System Premium** do SIGE:
-   **Premium Glassmorphism**: Uso intensivo de transparências, blur e bordas suaves.
-   **Design Tokens**: Cores e espaçamentos sincronizados com o Back-end (Temas: Indigo, Cinza e Azul).
-   **Componentes Card**: Bordas universais e animações magnéticas de elevação no hover.

---

## 🔑 4. Autenticação & Segurança

-   **JWT (JSON Web Token)**: Autenticação persistente com renovação automática de tokens via `Axios Interceptors`.
-   **CSRF Protection**: Integração nativa com o sistema de segurança do Django.
-   **Encryption Aware**: A interface está preparada para exibir dados descriptografados pelo backend (AES-256), garantindo privacidade total.

---

## 🗺️ 5. Roadmap de Evolução

-   **Paridade Visual**: Atualizar todos os componentes para o padrão de bordas 48px e glassmorphism v2.0.
-   **Dashboard IoT**: Implementar widgets de monitoramento em tempo real para os dados de presença RFID.
-   **Offline First**: Implementação de Service Workers para permitir consultas básicas sem conexão.

---
<div align="center">
Interface desenvolvida para transformar dados em inteligência educacional.
</div>
