# -----------------------------
# 1️⃣ Stage: Build
# -----------------------------
FROM node:20-alpine AS build

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json primero (mejor cache)
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Generar build de producción
RUN npm run build


# -----------------------------
# 2️⃣ Stage: Production (Nginx)
# -----------------------------
FROM nginx:alpine

# Eliminar config por defecto
RUN rm -rf /usr/share/nginx/html/*

# Copiar archivos generados
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer puerto
EXPOSE 80

# Ejecutar nginx
CMD ["nginx", "-g", "daemon off;"]