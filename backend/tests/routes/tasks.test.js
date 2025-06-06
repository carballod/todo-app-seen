const request = require("supertest");
const express = require("express");
const tasksRouter = require("../../routes/tasks");

jest.mock("../../db/connection", () => require("../__mocks__/db-connection"));
const { mockQuery } = require("../__mocks__/db-connection");

const app = express();
app.use(express.json());
app.use("/api/tasks", tasksRouter);

describe("Tasks API Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/tasks", () => {
    it("should return all tasks successfully", async () => {
      const mockTasks = [
        { id: 1, text: "Test task 1", done: false },
        { id: 2, text: "Test task 2", done: true },
      ];

      mockQuery.mockImplementation((query, callback) => {
        callback(null, mockTasks);
      });

      const response = await request(app).get("/api/tasks").expect(200);

      expect(response.body).toEqual(mockTasks);
      expect(mockQuery).toHaveBeenCalledWith(
        "SELECT * FROM tasks",
        expect.any(Function)
      );
    });

    it("should handle database error", async () => {
      mockQuery.mockImplementation((query, callback) => {
        callback(new Error("Database error"), null);
      });

      const response = await request(app).get("/api/tasks").expect(500);

      expect(response.body).toHaveProperty("error", "Error al obtener tareas");
    });
  });

  describe("POST /api/tasks", () => {
    it("should create a new task successfully", async () => {
      const newTask = { text: "Nueva tarea" };
      const mockResult = { insertId: 1 };

      mockQuery.mockImplementation((query, params, callback) => {
        callback(null, mockResult);
      });

      const response = await request(app)
        .post("/api/tasks")
        .send(newTask)
        .expect(201);

      expect(response.body).toEqual({
        id: 1,
        text: "Nueva tarea",
        done: false,
      });
      expect(mockQuery).toHaveBeenCalledWith(
        "INSERT INTO tasks (text, done) VALUES (?, ?)",
        ["Nueva tarea", false],
        expect.any(Function)
      );
    });

    it("should reject empty task text", async () => {
      const response = await request(app)
        .post("/api/tasks")
        .send({ text: "" })
        .expect(400);

      expect(response.body).toHaveProperty("error", "El texto es obligatorio");
    });

    it("should reject missing task text", async () => {
      const response = await request(app)
        .post("/api/tasks")
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty("error", "El texto es obligatorio");
    });

    it("should handle database error on create", async () => {
      mockQuery.mockImplementation((query, params, callback) => {
        callback(new Error("Database error"), null);
      });

      const response = await request(app)
        .post("/api/tasks")
        .send({ text: "Test task" })
        .expect(500);

      expect(response.body).toHaveProperty("error", "Error al crear la tarea");
    });
  });

  describe("PUT /api/tasks/:id", () => {
    it("should update task status successfully", async () => {
      const mockResult = { affectedRows: 1 };

      mockQuery.mockImplementation((query, params, callback) => {
        callback(null, mockResult);
      });

      await request(app).put("/api/tasks/1").send({ done: true }).expect(200);

      expect(mockQuery).toHaveBeenCalledWith(
        "UPDATE tasks SET done = ? WHERE id = ?",
        [true, "1"],
        expect.any(Function)
      );
    });

    it("should return 404 if task not found", async () => {
      const mockResult = { affectedRows: 0 };

      mockQuery.mockImplementation((query, params, callback) => {
        callback(null, mockResult);
      });

      const response = await request(app)
        .put("/api/tasks/999")
        .send({ done: true })
        .expect(404);

      expect(response.body).toHaveProperty("error", "Tarea no encontrada");
    });

    it("should reject invalid done value", async () => {
      const response = await request(app)
        .put("/api/tasks/1")
        .send({ done: "invalid" })
        .expect(400);

      expect(response.body).toHaveProperty(
        "error",
        "El estado 'done' debe ser booleano"
      );
    });
  });

  describe("DELETE /api/tasks/:id", () => {
    it("should delete task successfully", async () => {
      const mockResult = { affectedRows: 1 };

      mockQuery.mockImplementation((query, params, callback) => {
        callback(null, mockResult);
      });

      await request(app).delete("/api/tasks/1").expect(204);

      expect(mockQuery).toHaveBeenCalledWith(
        "DELETE FROM tasks WHERE id = ?",
        ["1"],
        expect.any(Function)
      );
    });

    it("should return 404 if task to delete not found", async () => {
      const mockResult = { affectedRows: 0 };

      mockQuery.mockImplementation((query, params, callback) => {
        callback(null, mockResult);
      });

      const response = await request(app).delete("/api/tasks/999").expect(404);

      expect(response.body).toHaveProperty("error", "Tarea no encontrada");
    });

    it("should handle database error on delete", async () => {
      mockQuery.mockImplementation((query, params, callback) => {
        callback(new Error("Database error"), null);
      });

      const response = await request(app).delete("/api/tasks/1").expect(500);

      expect(response.body).toHaveProperty(
        "error",
        "Error al eliminar la tarea"
      );
    });
  });
});
