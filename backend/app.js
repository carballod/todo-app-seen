const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const tasksRoutes = require("./routes/tasks");
const { metricsMiddleware, register } = require("./middleware/metrics");
const { requestLogger, errorLogger, logger } = require("./middleware/logger");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(requestLogger);
app.use(metricsMiddleware);

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.use("/api/tasks", tasksRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
  });
}

app.use(errorLogger);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    logger.info(`Servidor corriendo en puerto ${PORT}`);
    logger.info(`Metrics disponibles en http://localhost:${PORT}/metrics`);
    logger.info(`Health check en http://localhost:${PORT}/health`);
  });
}

module.exports = app;
