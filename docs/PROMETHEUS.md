# 🔍 Guía de Prometheus - Monitoreo y Métricas

Esta guía explica cómo usar y probar Prometheus para monitorear tu aplicación Todo.

## 📋 Índice

- [Arquitectura de Monitoreo](#arquitectura-de-monitoreo)
- [Iniciando el Stack de Monitoreo](#iniciando-el-stack-de-monitoreo)
- [Interfaces Web](#interfaces-web)
- [Probando Prometheus](#probando-prometheus)
- [Consultas PromQL](#consultas-promql)
- [Métricas Disponibles](#métricas-disponibles)
- [Grafana Dashboard](#grafana-dashboard)
- [Generando Datos de Prueba](#generando-datos-de-prueba)
- [Alertas y Monitoreo](#alertas-y-monitoreo)
- [Troubleshooting](#troubleshooting)

## 🏗️ Arquitectura de Monitoreo

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Prometheus    │
│  (Port 8080)    │────│  (Port 3000)    │────│  (Port 9090)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │                        │
                              │                        │
                       ┌─────────────────┐    ┌─────────────────┐
                       │    MySQL        │    │    Grafana      │
                       │  (Port 3308)    │    │  (Port 3001)    │
                       └─────────────────┘    └─────────────────┘
```

### Componentes:

- **Backend**: Expone métricas en `/metrics`
- **Prometheus**: Recolecta y almacena métricas
- **Grafana**: Visualiza métricas con dashboards
- **Node Exporter**: Métricas del sistema (CPU, memoria, etc.)

## 🚀 Iniciando el Stack de Monitoreo

### 1. Iniciar la Aplicación Principal

```bash
docker-compose up -d
```

### 2. Iniciar el Stack de Monitoreo

```bash
docker-compose -f monitoring/docker-compose.monitoring.yml up -d
```

### 3. Verificar Estados

```bash
docker ps --filter "name=todo-" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
```

Deberías ver:

- `todo-backend`: Backend con métricas
- `todo-prometheus`: Servidor Prometheus
- `todo-grafana`: Dashboard Grafana
- `todo-node-exporter`: Métricas del sistema

## 🌐 Interfaces Web

### URLs de Acceso:

- **Aplicación Todo**: http://localhost:8080
- **Backend API**: http://localhost:3000
- **Métricas Raw**: http://localhost:3000/metrics
- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:3001
- **Node Exporter**: http://localhost:9100

### Credenciales:

- **Grafana**: `admin` / `grafana`

## 🧪 Probando Prometheus

### 1. Verificar Configuración

1. Ve a **Prometheus** → http://localhost:9090
2. **Status → Targets**
3. Verifica que aparezcan:
   - `todo-backend:3000` (UP)
   - `node-exporter:9100` (UP)

### 2. Verificar Métricas Raw

Ve a http://localhost:3000/metrics y deberías ver métricas como:

```
# HELP http_requests_total Total number of HTTP requests
# TYPE http_requests_total counter
http_requests_total{method="GET",route="/",status="200"} 1

# HELP process_resident_memory_bytes Resident memory size in bytes
# TYPE process_resident_memory_bytes gauge
process_resident_memory_bytes 69017600
```

### 3. Interfaz de Prometheus

En http://localhost:9090:

1. **Graph tab**: Para consultas y gráficos
2. **Status → Targets**: Estado de los servicios monitoreados
3. **Status → Configuration**: Configuración de Prometheus

## 📊 Consultas PromQL

### Métricas HTTP Básicas

```promql
# Total de requests HTTP
http_requests_total

# Requests por método
http_requests_total{method="GET"}

# Requests por status code
http_requests_total{status="200"}

# Rate de requests por segundo (últimos 5 min)
rate(http_requests_total[5m])
```

### Métricas de Rendimiento

```promql
# Latencia promedio
rate(http_request_duration_seconds_sum[5m]) / rate(http_request_duration_seconds_count[5m])

# Percentil 95 de latencia
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))

# Percentil 99 de latencia
histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m]))

# Throughput total
sum(rate(http_requests_total[5m]))
```

### Métricas de Sistema

```promql
# Uso de CPU (%)
rate(process_cpu_seconds_total[5m]) * 100

# Memoria utilizada (MB)
process_resident_memory_bytes / (1024 * 1024)

# Event loop lag de Node.js
nodejs_eventloop_lag_seconds

# Heap de Node.js utilizado (MB)
nodejs_heap_size_used_bytes / (1024 * 1024)
```

### Métricas de Aplicación

```promql
# Tareas activas
todo_active_tasks_total

# Tareas completadas
todo_completed_tasks_total

# Conexiones a la base de datos
db_connections_total

# Garbage Collection duration
nodejs_gc_duration_seconds
```

### Métricas de Error

```promql
# Tasa de errores 4xx
rate(http_requests_total{status=~"4.."}[5m])

# Tasa de errores 5xx
rate(http_requests_total{status=~"5.."}[5m])

# Porcentaje de errores
(rate(http_requests_total{status=~"[45].."}[5m]) / rate(http_requests_total[5m])) * 100
```

## 📈 Métricas Disponibles

### Métricas de HTTP

- `http_requests_total`: Contador total de requests
- `http_request_duration_seconds`: Histograma de duración de requests

### Métricas de Node.js

- `nodejs_eventloop_lag_seconds`: Lag del event loop
- `nodejs_heap_size_*_bytes`: Información del heap
- `nodejs_gc_duration_seconds`: Duración del garbage collection
- `nodejs_active_handles_total`: Handles activos
- `nodejs_active_requests_total`: Requests activos

### Métricas de Sistema

- `process_cpu_*_seconds_total`: Uso de CPU
- `process_resident_memory_bytes`: Memoria residente
- `process_virtual_memory_bytes`: Memoria virtual
- `process_open_fds`: File descriptors abiertos

### Métricas de Aplicación

- `todo_active_tasks_total`: Tareas activas
- `todo_completed_tasks_total`: Tareas completadas
- `db_connections_total`: Conexiones a la base de datos

## 📊 Grafana Dashboard

### Acceso

1. Ve a http://localhost:3001
2. Login: `admin` / `grafana`
3. Dashboard pre-configurado disponible

### Paneles Incluidos

- **HTTP Requests**: Rate y total de requests
- **Response Times**: Latencia p50, p95, p99
- **System Metrics**: CPU, memoria, event loop
- **Application Metrics**: Tareas, conexiones DB
- **Error Rates**: Porcentaje de errores

### Personalización

- Puedes crear nuevos dashboards
- Agregar alertas basadas en métricas
- Configurar notificaciones

## 🎯 Generando Datos de Prueba

### Método 1: Usar la Aplicación

1. Ve a http://localhost:8080
2. Crea varios todos
3. Marca algunos como completados
4. Recarga la página varias veces
5. Ve las métricas actualizarse

### Método 2: Llamadas API Directas

```bash
# GET requests
curl http://localhost:3000/api/todos
curl http://localhost:3000/health

# POST request
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Prometheus","completed":false}'

# PUT request
curl -X PUT http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'
```

### Método 3: Script de Carga

Puedes crear un script para generar tráfico:

```bash
# Generar 100 requests
for i in {1..100}; do
  curl -s http://localhost:3000/api/todos > /dev/null
  sleep 0.1
done
```

## 🚨 Alertas y Monitoreo

### Ejemplos de Alertas

#### Alta Latencia

```yaml
- alert: HighLatency
  expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 0.1
  for: 2m
  labels:
    severity: warning
  annotations:
    summary: "Alta latencia detectada"
```

#### Alto Uso de Memoria

```yaml
- alert: HighMemoryUsage
  expr: process_resident_memory_bytes > 100000000
  for: 5m
  labels:
    severity: warning
  annotations:
    summary: "Alto uso de memoria"
```

#### Tasa de Error Alta

```yaml
- alert: HighErrorRate
  expr: (rate(http_requests_total{status=~"[45].."}[5m]) / rate(http_requests_total[5m])) * 100 > 5
  for: 2m
  labels:
    severity: critical
  annotations:
    summary: "Tasa de error alta: {{ $value }}%"
```

## 🔧 Troubleshooting

### Prometheus no Muestra Datos

1. **Verificar targets**:

   ```bash
   curl http://localhost:9090/api/v1/targets
   ```

2. **Verificar métricas del backend**:

   ```bash
   curl http://localhost:3000/metrics
   ```

3. **Logs de Prometheus**:
   ```bash
   docker logs todo-prometheus
   ```

### Grafana no Conecta a Prometheus

1. **Verificar datasource**:

   - Settings → Data Sources → Prometheus
   - URL debe ser: `http://prometheus:9090`

2. **Test connection** en Grafana

### Métricas Faltantes

1. **Verificar middleware**:

   - Asegúrate de que el middleware de métricas esté configurado
   - Verifica que las rutas estén instrumentadas

2. **Logs del backend**:
   ```bash
   docker logs todo-backend
   ```

### Comandos Útiles

```bash
# Ver todos los contenedores
docker ps --filter "name=todo-"

# Reiniciar stack de monitoreo
docker-compose -f monitoring/docker-compose.monitoring.yml restart

# Ver logs
docker logs todo-prometheus
docker logs todo-grafana

# Limpiar y reiniciar
docker-compose -f monitoring/docker-compose.monitoring.yml down
docker-compose -f monitoring/docker-compose.monitoring.yml up -d
```

## 📚 Referencias

- [Prometheus Documentation](https://prometheus.io/docs/)
- [PromQL Tutorial](https://prometheus.io/docs/prometheus/latest/querying/basics/)
- [Grafana Documentation](https://grafana.com/docs/)
- [Node.js prom-client](https://github.com/siimon/prom-client)
