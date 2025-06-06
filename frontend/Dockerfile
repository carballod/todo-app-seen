# Usamos una imagen base de nginx
FROM nginx:alpine

# Eliminamos la configuración por defecto
RUN rm /etc/nginx/conf.d/default.conf

# Copiamos nuestra propia configuración de nginx
COPY nginx.conf /etc/nginx/conf.d

# Copiamos los archivos del frontend al directorio público de nginx
COPY . /usr/share/nginx/html

# Exponemos el puerto 80
EXPOSE 80
