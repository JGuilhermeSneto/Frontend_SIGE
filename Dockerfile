# Estágio 1: Build
FROM node:20-slim AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Estágio 2: Serve
FROM nginx:alpine

# Copia o build do Vite para o diretório padrão do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copia uma configuração customizada do Nginx para lidar com roteamento do React (SPA)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
