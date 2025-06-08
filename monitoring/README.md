# Monitoring Setup - Prometheus + Grafana

## 🎯 Qué incluye

- **Prometheus**: Recolección de métricas
- **Grafana**: Visualización y dashboards
- **Node Exporter**: Métricas del sistema
- **App Metrics**: Métricas custom de la aplicación

## 🚀 Cómo usar

### 1. Levantar la aplicación principal

```bash
# En el directorio raíz
docker-compose up -d
```

### 2. Levantar el stack de monitoring

```bash
# En el directorio monitoring
cd monitoring
docker-compose -f docker-compose.monitoring.yml up -d
```

### 3. Acceder a las herramientas

- **Grafana**: http://localhost:3001 (admin/grafana)
- **Prometheus**: http://localhost:9090
- **App Metrics**: http://localhost:3000/metrics
- **App Health**: http://localhost:3000/health

## 📊 Métricas disponibles

### Métricas de aplicación:

- `http_requests_total` - Total de requests HTTP
- `http_request_duration_seconds` - Duración de requests
- `todo_active_tasks_total` - Tareas activas
- `todo_completed_tasks_total` - Tareas completadas
- `db_connections_total` - Conexiones a BD

### Métricas del sistema:

- CPU, Memory, Disk, Network
- Uptime, Load average
- File descriptors

## 🔧 Configuración

### Agregar nuevas métricas:

1. Edita `backend/middleware/metrics.js`
2. Registra la métrica en tu código
3. Restart la aplicación

### Crear dashboards:

1. Ve a Grafana (localhost:3001)
2. Import dashboard o crea uno nuevo
3. Usa Prometheus como datasource

## 📈 Dashboards recomendados

1. **Application Overview**

   - Request rate
   - Response time
   - Error rate
   - Active/Completed tasks

2. **System Metrics**

   - CPU/Memory usage
   - Disk I/O
   - Network traffic

3. **Database Metrics**
   - Connection pool
   - Query performance
   - Slow queries

## 🚨 Alerting (opcional)

Para configurar alertas:

1. Configura Alertmanager
2. Define reglas en Prometheus
3. Configura notificaciones (Slack, email, etc.)

## 🐳 Para producción

En Railway/producción necesitarás:

1. Servicios externos (Grafana Cloud, New Relic, DataDog)
2. O configurar monitoring como servicios separados
3. Configurar retention de métricas
4. Setup de alerting robusto
