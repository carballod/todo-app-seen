const express = require("express");
const router = express.Router();
const db = require("../db/connection");

// Obtener todas las tareas
router.get("/", (req, res) => {
  db.query("SELECT * FROM tasks", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al obtener tareas" });
    }
    res.json(results);
  });
});

// Crear una nueva tarea
router.post("/", (req, res) => {
  const { text } = req.body;
if (!text || text.trim() === "") {
  return res.status(400).json({ error: "El texto es obligatorio" });
}
db.query(
  "INSERT INTO tasks (text, done) VALUES (?, ?)",
  [text.trim(), false],

    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error al crear la tarea" });
      }
      res.status(201).json({ id: result.insertId, text: text.trim(), done: false });

    }
  );
});

// Eliminar tarea
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM tasks WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al eliminar la tarea" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    res.sendStatus(204);
  });
});

// Marcar/desmarcar tarea como completada
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { done } = req.body;
  if (typeof done !== "boolean") {
    return res.status(400).json({ error: "El estado 'done' debe ser booleano" });
  }
  db.query("UPDATE tasks SET done = ? WHERE id = ?", [done, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al actualizar la tarea" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    res.sendStatus(200);
  });
});

module.exports = router;
