# Usamos una imagen oficial de Node.js
FROM node:18-alpine

# Instalamos netcat (nc) para poder hacer el chequeo de puerto en el script
RUN apk add --no-cache netcat-openbsd

# Creamos y definimos el directorio de trabajo
WORKDIR /app

# Copiamos package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos todo el código
COPY . .

# Copiamos el script de espera a la base de datos
COPY backend/wait-for-db.sh /wait-for-db.sh

# Damos permisos de ejecución al script
RUN chmod +x /wait-for-db.sh

# Exponemos el puerto que usa el backend
EXPOSE 3000

# Comando para arrancar el backend solo cuando la DB esté lista
CMD ["/wait-for-db.sh", "node", "app.js"]
