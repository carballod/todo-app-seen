const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const tasksRoutes = require("./routes/tasks");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", tasksRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
  });
}

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

module.exports = app;
