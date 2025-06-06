# GRUPO SEEN
# To-Do List App con Docker

Este proyecto es una aplicación de lista de tareas (To-Do List) con backend en Node.js y MySQL, y frontend en HTML/CSS/JS, todo containerizado con Docker Compose.

---

## Tecnologías

- **Backend:** Node.js + Express + MySQL  
- **Frontend:** HTML, CSS, JavaScript  
- **Base de datos:** MySQL 8.0  
- **Orquestación:** Docker Compose  

---

## Requisitos

- Tener instalado [Docker](https://www.docker.com/get-started) y [Docker Compose](https://docs.docker.com/compose/install/)

---

## Cómo correr la aplicación

1. Clonar este repositorio:

   ```bash
   git clone <url-del-repo>
   cd <carpeta-del-proyecto>
   ```

2. Levantar los servicios con Docker Compose:

   ```bash
   docker-compose up --build
   ```

   Esto construirá las imágenes y levantará los contenedores de:

   - Base de datos MySQL (`db`)  
   - Backend Node.js (`backend`)  
   - Frontend (`frontend`)  

3. Esperar unos segundos mientras la base de datos y el backend arrancan.

---

## Cómo acceder a la aplicación

- El frontend estará disponible en:  
  [http://localhost:8080](http://localhost:8080)

- El backend corre dentro de Docker en el puerto 3000, y la API REST está expuesta en:  
  [http://localhost:3000/api/tasks](http://localhost:3000/api/tasks)

---

## Notas importantes

- El frontend está configurado para consumir la API del backend usando la URL `http://backend:3000/api/tasks`.  
  Esto funciona dentro de Docker porque los contenedores están en la misma red de Docker Compose.

- La base de datos MySQL se inicializa con el script `init.sql` ubicado en `backend/db/`.

- El contenedor backend usa el script `wait-for-db.sh` para esperar que la base de datos esté lista antes de arrancar.

---

## Detener la aplicación

Para detener y eliminar contenedores, redes y volúmenes creados:

```bash
docker-compose down -v
```

---

## Dependencias

El backend utiliza el paquete [`cors`](https://www.npmjs.com/package/cors) para permitir solicitudes desde el frontend (habilita CORS). Está incluido en `package.json` y se instala automáticamente al construir la imagen Docker.

Si ejecutás el backend localmente sin Docker, asegurate de instalar las dependencias con:

```bash
npm install
```

y que `cors` esté instalado, por ejemplo con:

```bash
npm install cors
```
