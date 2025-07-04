# GRUPO SEEN

# To-Do List App con Docker

Este proyecto es una aplicación de lista de tareas (To-Do List) con backend en Node.js y MySQL, y frontend en HTML/CSS/JS, todo containerizado con Docker Compose y con pipeline de CI/CD.

---

## Tecnologías

- **Backend:** Node.js + Express + MySQL
- **Frontend:** HTML, CSS, JavaScript con Bootstrap
- **Base de datos:** MySQL 8.0
- **Orquestación:** Docker Compose
- **Testing:** Jest + Supertest
- **CI/CD:** GitHub Actions

---

## Funcionalidades

- ✅ **CRUD completo de tareas** (Crear, Leer, Actualizar, Eliminar)
- ✅ **Marcar tareas como completadas**
- ✅ **Interfaz web responsiva**
- ✅ **API RESTful**
- ✅ **Tests automatizados**
- ✅ **Containerización completa**

---

## API Endpoints

| Método   | Endpoint         | Descripción                |
| -------- | ---------------- | -------------------------- |
| `GET`    | `/api/tasks`     | Obtener todas las tareas   |
| `POST`   | `/api/tasks`     | Crear nueva tarea          |
| `PUT`    | `/api/tasks/:id` | Actualizar estado de tarea |
| `DELETE` | `/api/tasks/:id` | Eliminar tarea             |

---

## Requisitos

- Tener instalado [Docker](https://www.docker.com/get-started) y [Docker Compose](https://docs.docker.com/compose/install/)
- Para desarrollo local: [Node.js](https://nodejs.org/) v16+

---

## Cómo correr la aplicación

### 🐳 **Con Docker (Recomendado)**

1. Clonar este repositorio:

   ```bash
   git clone <url-del-repo>
   cd todo-app-docker
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

### 💻 **Desarrollo Local**

Para desarrollo local del backend:

```bash
cd backend
npm install
npm run dev
```

---

## Cómo acceder a la aplicación

- **Frontend:** [http://localhost:8080](http://localhost:8080)
- **API Backend:** [http://localhost:3000/api/tasks](http://localhost:3000/api/tasks)
- **Base de datos:** `localhost:3308` (usuario: `root`, password: `1234`)

---

## **Tests Automatizados**

### **Ejecutar tests:**

```bash
cd backend
npm test                # Ejecutar todos los tests
npm run test:watch      # Tests en modo watch
npm run test:coverage   # Tests con reporte de cobertura
```

### **Tests incluidos:**

- Tests de API endpoints (GET, POST, PUT, DELETE)
- Tests de validación de datos
- Tests de manejo de errores
- Tests de configuración de la aplicación
- Mocks de base de datos

---

## **Estructura del Proyecto**

```
📁 todo-app-docker/
├── 📁 backend/
│   ├── 📁 db/
│   │   ├── connection.js     # Conexión MySQL
│   │   └── init.sql         # Script inicialización
│   ├── 📁 routes/
│   │   └── tasks.js         # Rutas API REST
│   ├── 📁 tests/            # Tests unitarios
│   │   ├── 📁 __mocks__/    # Mocks para testing
│   │   ├── 📁 routes/       # Tests de rutas
│   │   ├── app.test.js      # Tests de aplicación
│   │   └── setup.js         # Configuración tests
│   ├── app.js               # Aplicación Express
│   ├── package.json         # Dependencias
│   ├── jest.config.js       # Configuración Jest
│   └── Dockerfile           # Imagen Docker backend
├── 📁 frontend/
│   ├── index.html           # Página principal
│   ├── styles.css           # Estilos CSS
│   ├── script.js            # Lógica JavaScript
│   └── Dockerfile           # Imagen Docker frontend
├── docker-compose.yml       # Orquestación servicios
├── .gitignore              # Archivos excluidos
└── README.md               # Documentación
```

---

## **Scripts Disponibles**

### **Backend:**

```bash
npm start           # Iniciar servidor producción
npm run dev         # Iniciar servidor desarrollo
npm test           # Ejecutar tests
npm run test:watch # Tests en modo watch
npm run test:coverage # Tests con cobertura
```

### **Docker:**

```bash
docker-compose up --build    # Levantar aplicación
docker-compose down -v       # Detener y limpiar
docker-compose logs backend  # Ver logs del backend
```

---

## **Desarrollo**

### **Agregar nuevas funcionalidades:**

1. Crear nueva branch:

   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```

2. Desarrollar y testear:

   ```bash
   npm test
   ```

3. Commit con mensaje descriptivo:
   ```bash
   git commit -m "feat: agregar nueva funcionalidad"
   ```

---

## Notas importantes

- El frontend está configurado para consumir la API del backend usando la URL `http://backend:3000/api/tasks`.  
  Esto funciona dentro de Docker porque los contenedores están en la misma red de Docker Compose.

- La base de datos MySQL se inicializa con el script `init.sql` ubicado en `backend/db/`.

- El contenedor backend usa el script `wait-for-db.sh` para esperar que la base de datos esté lista antes de arrancar.

- Los tests usan mocks de la base de datos para ejecutarse sin dependencias externas.

---

## Detener la aplicación

Para detener y eliminar contenedores, redes y volúmenes creados:

```bash
docker-compose down -v
```

---

## **Pipeline CI/CD**

### **🔄 Automated Workflow:**

```
Push/PR → 🧪 Tests → 🐳 Build → 📤 Push Images → ✅ Validate → 🔒 Security Scan
```

### **GitHub Actions Pipeline:**

### **🔗 Ver Pipeline:**

Ir a [Actions tab](../../actions) para ver ejecuciones del pipeline.

---

## **Equipo - Grupo Seen**

Este proyecto fue desarrollado por el **Grupo Seen** como parte del trabajo final de DevOps, implementando mejores prácticas de:

- ✅ Desarrollo de aplicaciones web
- ✅ Containerización con Docker
- ✅ Testing automatizado
- ✅ CI/CD con GitHub Actions
- ✅ Control de versiones con Git

---

## **Deploy**

El deploy se realizo en Railway, se puede ver en el siguiente [link](https://todo-app-seen-production.up.railway.app/)
