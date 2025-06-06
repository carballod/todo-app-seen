const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const tasksRoutes = require("./routes/tasks");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", tasksRoutes);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

module.exports = app;
