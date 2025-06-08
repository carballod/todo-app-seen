const promClient = require("prom-client");

const collectDefaultMetrics = promClient.collectDefaultMetrics;
const register = promClient.register;

collectDefaultMetrics({ register });

const httpRequestDuration = new promClient.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status"],
  buckets: [0.1, 0.5, 1, 2, 5],
});

const httpRequestsTotal = new promClient.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status"],
});

const dbConnectionsTotal = new promClient.Counter({
  name: "db_connections_total",
  help: "Total number of database connections",
  labelNames: ["status"],
});

const activeTasks = new promClient.Gauge({
  name: "todo_active_tasks_total",
  help: "Total number of active tasks",
});

const completedTasks = new promClient.Gauge({
  name: "todo_completed_tasks_total",
  help: "Total number of completed tasks",
});

const metricsMiddleware = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = (Date.now() - start) / 1000;
    const route = req.route ? req.route.path : req.path;

    httpRequestDuration
      .labels(req.method, route, res.statusCode)
      .observe(duration);

    httpRequestsTotal.labels(req.method, route, res.statusCode).inc();
  });

  next();
};

module.exports = {
  register,
  metricsMiddleware,
  dbConnectionsTotal,
  activeTasks,
  completedTasks,
};
